import { hostname } from "node:os";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import express from "express";
import wisp from "wisp-server-node";
import { WebSocketServer } from "ws";

import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const app = express();
const storePath = path.resolve("data/chat-store.json");
const sessions = new Map();
const wss = new WebSocketServer({ noServer: true });

app.use(express.json({ limit: "6mb" }));

app.use(express.static("."));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

async function readChatStore() {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const data = JSON.parse(raw);
    return {
      accounts: Array.isArray(data.accounts) ? data.accounts : [],
      messages: Array.isArray(data.messages) ? data.messages : [],
    };
  } catch {
    return { accounts: [], messages: [] };
  }
}

async function writeChatStore(data) {
  await fs.writeFile(storePath, JSON.stringify(data, null, 2), "utf8");
}

function sanitizeAccount(account) {
  return {
    id: account.id,
    username: account.username,
    avatar: account.avatar || "",
  };
}

function sanitizeMessage(message, account) {
  return {
    id: message.id,
    text: message.text,
    createdAt: message.createdAt,
    userId: account.id,
    username: account.username,
    avatar: account.avatar || "",
  };
}

function broadcast(payload) {
  const data = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(data);
    }
  }
}

async function resolveSession(token) {
  if (!token) return null;
  const accountId = sessions.get(token);
  if (!accountId) return null;
  const store = await readChatStore();
  return store.accounts.find((account) => account.id === accountId) || null;
}

app.get("/api/chat/bootstrap", async (req, res) => {
  const token = req.query.token ? String(req.query.token) : "";
  const store = await readChatStore();
  const sessionAccount = await resolveSession(token);
  const accountsById = new Map(store.accounts.map((account) => [account.id, account]));
  const messages = store.messages
    .slice(-150)
    .map((message) => sanitizeMessage(message, accountsById.get(message.userId) || { id: "unknown", username: "unknown", avatar: "" }));

  res.json({
    account: sessionAccount ? sanitizeAccount(sessionAccount) : null,
    messages,
  });
});

app.post("/api/chat/register", async (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "").trim();
  const avatar = String(req.body?.avatar || "");

  if (username.length < 3) {
    res.status(400).json({ error: "Username must be at least 3 characters." });
    return;
  }

  if (password.length < 3) {
    res.status(400).json({ error: "Password must be at least 3 characters." });
    return;
  }

  const store = await readChatStore();
  const exists = store.accounts.some((account) => account.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    res.status(409).json({ error: "That username is already taken." });
    return;
  }

  const account = {
    id: randomUUID(),
    username,
    password,
    avatar,
    createdAt: new Date().toISOString(),
  };

  store.accounts.push(account);
  await writeChatStore(store);

  const token = randomUUID();
  sessions.set(token, account.id);
  res.json({ token, account: sanitizeAccount(account) });
});

app.post("/api/chat/login", async (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "").trim();
  const store = await readChatStore();
  const account = store.accounts.find(
    (entry) => entry.username.toLowerCase() === username.toLowerCase() && entry.password === password,
  );

  if (!account) {
    res.status(401).json({ error: "Wrong username or password." });
    return;
  }

  const token = randomUUID();
  sessions.set(token, account.id);
  res.json({ token, account: sanitizeAccount(account) });
});

app.post("/api/chat/logout", async (req, res) => {
  const token = String(req.body?.token || "");
  sessions.delete(token);
  res.json({ ok: true });
});

wss.on("connection", (socket, request, account) => {
  socket.account = account;

  socket.on("message", async (raw) => {
    let payload;
    try {
      payload = JSON.parse(String(raw));
    } catch {
      return;
    }

    if (payload.type !== "message") return;

    const text = String(payload.text || "").trim();
    if (!text) return;

    const store = await readChatStore();
    const liveAccount = store.accounts.find((entry) => entry.id === socket.account.id);
    if (!liveAccount) return;

    const message = {
      id: randomUUID(),
      userId: liveAccount.id,
      text: text.slice(0, 1000),
      createdAt: new Date().toISOString(),
    };

    store.messages.push(message);
    store.messages = store.messages.slice(-300);
    await writeChatStore(store);

    broadcast({
      type: "message",
      message: sanitizeMessage(message, liveAccount),
    });
  });
});

app.use((req, res) => {
  res.status(404);
  res.sendFile("404.html", { root: "." });
});

const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url?.startsWith("/chat-ws")) {
    const target = new URL(req.url, "http://localhost");
    const token = target.searchParams.get("token") || "";
    const accountId = sessions.get(token);

    if (!accountId) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    readChatStore().then((store) => {
      const account = store.accounts.find((entry) => entry.id === accountId);
      if (!account) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }

      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req, account);
      });
    }).catch(() => {
      socket.destroy();
    });
    return;
  }

  if (req.url && req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
    return;
  }

  socket.end();
});

let port = parseInt(process.env.PORT || "", 10);
if (Number.isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();
  console.log("Listening on:");
  console.log(`  http://localhost:${address.port}`);
  console.log(`  http://${hostname()}:${address.port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  server.close();
  process.exit(0);
}

server.listen({ port });
