(function () {
  const runtimeConfig = window.ARCADY_ADMIN_FIREBASE || {};
  const firebaseConfig = runtimeConfig.firebaseConfig || {};
  const appName = "arcady-floating-chat";
  const chatRootPath = "arcadyAdmin/homepageChat";
  const chatPath = chatRootPath + "/messages";
  const chatBansDevicesPath = chatRootPath + "/bans/devices";
  const chatBansNicknamesPath = chatRootPath + "/bans/nicknames";
  const messageLimit = 60;
  const maxImageBytes = 750 * 1024;
  const protectedNickname = decodeValue("QXJjYWR5");
  const protectedNicknameKey = String(protectedNickname || "").trim().toLowerCase();
  const launcher = document.getElementById("chat-btn");

  if (!launcher) {
    return;
  }

  const state = {
    db: null,
    ready: false,
    sending: false,
    selectedImage: null,
    messages: [],
    open: false,
    ownerUnlocked: readOwnerAccess(),
    deviceId: getDeviceId(),
    chatBans: {
      devices: {},
      nicknames: {}
    }
  };

  const els = {};

  init();

  function init() {
    buildPanel();
    bindUi();
    renderMessages();
    syncNicknameInput();
    updateComposerState();
    setStatus(readNickname() ? "Connecting homepage chat..." : "Save a nickname to join the chat.");
    initFirebase();
  }

  function buildPanel() {
    const panel = document.createElement("section");
    panel.className = "floating-chat-panel glass";
    panel.id = "floating-chat-panel";
    panel.innerHTML = `
      <div class="home-chat-header">
        <div>
          <div class="home-chat-kicker">Arcady Chat</div>
          <h3 class="home-chat-title">Homepage chat</h3>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div class="home-chat-status" id="floating-chat-status">Connecting homepage chat...</div>
          <button class="floating-chat-close" id="floating-chat-close" type="button" aria-label="Close chat">x</button>
        </div>
      </div>
      <div class="floating-chat-nickname-row">
        <input id="floating-chat-nickname" class="floating-chat-nickname-input" type="text" maxlength="24" placeholder="Set a nickname">
        <button id="floating-chat-nickname-save" class="floating-chat-nickname-save" type="button">Save</button>
      </div>
      <div class="home-chat-feed" id="floating-chat-feed" aria-live="polite">
        <div class="home-chat-empty">No messages yet. Save a nickname and be the first one to say something.</div>
      </div>
      <div class="home-chat-compose">
        <div class="home-chat-compose-row">
          <input id="floating-chat-input" class="home-chat-input" type="text" maxlength="400" placeholder="Save a nickname to unlock chat">
          <label for="floating-chat-image-input" class="home-chat-attach" id="floating-chat-attach">Image</label>
          <input id="floating-chat-image-input" type="file" accept="image/*" hidden>
          <button id="floating-chat-send" class="home-chat-send" type="button">Send</button>
        </div>
        <div class="home-chat-compose-meta">
          <div class="home-chat-file" id="floating-chat-file">No image selected</div>
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    els.panel = panel;
    els.status = panel.querySelector("#floating-chat-status");
    els.feed = panel.querySelector("#floating-chat-feed");
    els.nicknameInput = panel.querySelector("#floating-chat-nickname");
    els.nicknameSave = panel.querySelector("#floating-chat-nickname-save");
    els.close = panel.querySelector("#floating-chat-close");
    els.input = panel.querySelector("#floating-chat-input");
    els.attach = panel.querySelector("#floating-chat-attach");
    els.imageInput = panel.querySelector("#floating-chat-image-input");
    els.sendButton = panel.querySelector("#floating-chat-send");
    els.fileMeta = panel.querySelector("#floating-chat-file");
  }

  function bindUi() {
    launcher.addEventListener("click", togglePanel);
    els.close.addEventListener("click", closePanel);
    els.nicknameSave.addEventListener("click", saveNickname);
    els.nicknameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        saveNickname();
      }
    });
    els.sendButton.addEventListener("click", sendMessage);
    els.input.addEventListener("input", updateComposerState);
    els.feed.addEventListener("click", handleFeedActionClick);
    els.input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });
    els.imageInput.addEventListener("change", handleImageSelection);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePanel();
      }
    });
    window.addEventListener("arcady:nickname-change", function () {
      syncNicknameInput();
      updateComposerState();
      setStatus(readNickname() ? (state.ready ? "Chat live. Say something." : "Connecting homepage chat...") : "Save a nickname to join the chat.");
    });
    window.addEventListener("arcady:owner-access-change", function (event) {
      state.ownerUnlocked = !!(event && event.detail && event.detail.unlocked);
      renderMessages(state.open);
    });
    window.addEventListener("storage", function (event) {
      if (event.key === "arcadyVisitorNickname") {
        syncNicknameInput();
        updateComposerState();
      } else if (event.key === "arcadyOwnerUnlocked") {
        state.ownerUnlocked = readOwnerAccess();
        renderMessages(state.open);
      }
    });
  }

  function togglePanel() {
    state.open = !state.open;
    els.panel.classList.toggle("is-open", state.open);
    if (state.open) {
      renderMessages(true);
      if (els.input && !els.input.disabled) {
        els.input.focus();
      }
    }
  }

  function closePanel() {
    state.open = false;
    if (els.panel) {
      els.panel.classList.remove("is-open");
    }
  }

  function syncNicknameInput() {
    if (els.nicknameInput) {
      els.nicknameInput.value = readNickname();
    }
  }

  function saveNickname() {
    const nickname = String(els.nicknameInput && els.nicknameInput.value || "").trim().slice(0, 24);
    localStorage.setItem("arcadyVisitorNickname", nickname);
    window.dispatchEvent(new CustomEvent("arcady:nickname-change", {
      detail: { nickname: nickname }
    }));
  }

  async function initFirebase() {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId || !firebaseConfig.databaseURL) {
      setStatus("Homepage chat is offline right now.");
      return;
    }

    try {
      await ensureFirebaseSdk();

      let app = null;
      try {
        app = window.firebase.app(appName);
      } catch (error) {
        app = window.firebase.initializeApp(firebaseConfig, appName);
      }

      state.db = app.database();
      state.ready = true;
      updateComposerState();
      setStatus(readNickname() ? "Chat live. Say something." : "Save a nickname to join the chat.");
      subscribeToBans();
      subscribeToMessages();
    } catch (error) {
      console.error("Arcady floating chat failed to initialize:", error);
      setStatus("Homepage chat could not connect.");
      updateComposerState();
    }
  }

  function ensureFirebaseSdk() {
    if (window.firebase && typeof window.firebase.initializeApp === "function" && typeof window.firebase.database === "function") {
      return Promise.resolve();
    }

    return loadScript("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js")
      .then(function () {
        return loadScript("https://www.gstatic.com/firebasejs/11.4.0/firebase-database-compat.js");
      });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function subscribeToMessages() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatPath).limitToLast(messageLimit).on("value", function (snapshot) {
      const next = [];
      snapshot.forEach(function (child) {
        next.push(normalizeMessage(child.val(), child.key));
      });
      next.sort(function (a, b) {
        return Number(a.createdAt || 0) - Number(b.createdAt || 0);
      });
      state.messages = next;
      renderMessages(state.open);
    });
  }

  function subscribeToBans() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatBansDevicesPath).on("value", function (snapshot) {
      state.chatBans.devices = snapshot.val() || {};
      updateComposerState();
      renderMessages(state.open);
    });

    state.db.ref(chatBansNicknamesPath).on("value", function (snapshot) {
      state.chatBans.nicknames = snapshot.val() || {};
      updateComposerState();
      renderMessages(state.open);
    });
  }

  function normalizeMessage(record, id) {
    return {
      id: String(record && record.id || id || ""),
      nickname: String(record && record.nickname || "Guest").trim() || "Guest",
      nicknameKey: normalizeNicknameKey(record && record.nicknameKey || record && record.nickname || ""),
      deviceId: String(record && record.deviceId || "").trim(),
      text: String(record && record.text || "").trim(),
      imageDataUrl: String(record && record.imageDataUrl || "").trim(),
      createdAt: Number(record && record.createdAt || 0),
      editedAt: Number(record && record.editedAt || 0)
    };
  }

  function readNickname() {
    return String(localStorage.getItem("arcadyVisitorNickname") || "").trim().slice(0, 24);
  }

  function normalizeNicknameKey(value) {
    return String(value || "").trim().toLowerCase().slice(0, 24);
  }

  function decodeValue(value) {
    try {
      return window.atob(String(value || ""));
    } catch (error) {
      return "";
    }
  }

  function getNicknameKey() {
    return normalizeNicknameKey(readNickname());
  }

  function getDeviceId() {
    const existing = localStorage.getItem("arcadyAdminDeviceId");
    if (existing) {
      return existing;
    }

    const created = "device-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("arcadyAdminDeviceId", created);
    return created;
  }

  function readOwnerAccess() {
    if (window.ARCADY_OWNER_ACCESS === true) {
      return true;
    }
    return sessionStorage.getItem("arcadyOwnerUnlocked") === "true";
  }

  function isProtectedNickname(value) {
    return normalizeNicknameKey(value) === protectedNicknameKey;
  }

  function displayNickname(value) {
    return String(value || "Guest");
  }

  function isCurrentUserChatBanned() {
    return !!state.chatBans.devices[state.deviceId] || !!state.chatBans.nicknames[getNicknameKey()];
  }

  function isMessageChatBanned(message) {
    if (!message) {
      return false;
    }
    return !!(message.deviceId && state.chatBans.devices[message.deviceId]) || !!(message.nicknameKey && state.chatBans.nicknames[message.nicknameKey]);
  }

  function handleImageSelection(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      clearSelectedImage();
      return;
    }

    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      clearSelectedImage();
      setStatus("Pick an image file.");
      return;
    }

    if (Number(file.size || 0) > maxImageBytes) {
      clearSelectedImage();
      setStatus("Keep images under 750 KB.");
      return;
    }

    state.selectedImage = file;
    updateComposerState();
    els.fileMeta.textContent = "Image ready: " + file.name;
  }

  function clearSelectedImage() {
    state.selectedImage = null;
    if (els.imageInput) {
      els.imageInput.value = "";
    }
    if (els.fileMeta) {
      els.fileMeta.textContent = "No image selected";
    }
    updateComposerState();
  }

  function updateComposerState() {
    const nickname = readNickname();
    const banned = isCurrentUserChatBanned();
    const canUseChat = state.ready && !state.sending && !banned && !!nickname;
    const hasDraft = !!String(els.input && els.input.value || "").trim() || !!state.selectedImage;

    if (els.input) {
      els.input.disabled = !canUseChat;
      els.input.placeholder = banned
        ? "You are banned from the chat"
        : !nickname
        ? "Save a nickname above to unlock chat"
        : (!state.ready ? "Connecting chat..." : "Type a message");
    }

    if (els.imageInput) {
      els.imageInput.disabled = !canUseChat;
    }

    if (els.attach) {
      els.attach.classList.toggle("is-disabled", !canUseChat);
    }

    if (els.sendButton) {
      els.sendButton.disabled = !(canUseChat && nickname && hasDraft);
      els.sendButton.textContent = state.sending ? "Sending..." : "Send";
    }
  }

  async function sendMessage() {
    const nickname = readNickname();
    if (!nickname) {
      setStatus("Save a nickname first.");
      updateComposerState();
      return;
    }

    if (isCurrentUserChatBanned()) {
      setStatus("You are banned from the chat.");
      updateComposerState();
      return;
    }

    if (!state.ready || !state.db || state.sending) {
      return;
    }

    const text = String(els.input.value || "").trim().slice(0, 400);
    if (!text && !state.selectedImage) {
      setStatus("Write a message or add an image.");
      updateComposerState();
      return;
    }

    state.sending = true;
    updateComposerState();
    setStatus("Sending message...");

    try {
      let imageDataUrl = "";
      if (state.selectedImage) {
        imageDataUrl = await readFileAsDataUrl(state.selectedImage);
      }

      const ref = state.db.ref(chatPath).push();
      await ref.set({
        id: ref.key,
        deviceId: state.deviceId,
        nickname: nickname,
        nicknameKey: getNicknameKey(),
        text: text,
        imageDataUrl: imageDataUrl,
        createdAt: Date.now()
      });

      els.input.value = "";
      clearSelectedImage();
      setStatus("Chat live. Say something.");
    } catch (error) {
      console.error("Arcady floating chat send failed:", error);
      setStatus("That message could not send.");
    } finally {
      state.sending = false;
      updateComposerState();
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result || ""));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderMessages(shouldScroll) {
    if (!els.feed) {
      return;
    }

    const stickToBottom = shouldScroll || isNearBottom(els.feed);

    if (!state.messages.length) {
      els.feed.innerHTML = '<div class="home-chat-empty">No messages yet. Save a nickname and be the first one to say something.</div>';
      return;
    }

    els.feed.innerHTML = state.messages.map(function (message) {
      const banned = isMessageChatBanned(message);
      const protectedMessage = isProtectedNickname(message.nickname) || isProtectedNickname(message.nicknameKey);
      const shownNickname = displayNickname(message.nickname);
      const ownerActions = state.ownerUnlocked ? (
        '<div class="home-chat-message-actions">' +
          '<button class="home-chat-action-button" type="button" data-chat-edit="' + escapeAttribute(message.id) + '">Edit</button>' +
          '<button class="home-chat-action-button is-danger" type="button" data-chat-delete="' + escapeAttribute(message.id) + '">Delete</button>' +
          '<button class="home-chat-action-button is-danger" type="button" data-chat-ban="' + escapeAttribute(message.id) + '"' + (protectedMessage ? ' disabled' : '') + '>' + (protectedMessage ? 'Arcady Protected' : (banned ? 'Unban' : 'Ban')) + '</button>' +
        '</div>'
      ) : "";
      return (
        '<article class="home-chat-message">' +
          '<div class="home-chat-message-head">' +
            '<div>' +
              '<div class="home-chat-message-name">' + escapeHtml(shownNickname) + '</div>' +
              (banned ? '<div class="home-chat-message-badge">Chat banned</div>' : '') +
            '</div>' +
            '<div class="home-chat-message-time">' + escapeHtml(formatMessageTime(message)) + '</div>' +
          '</div>' +
          (message.text ? '<div class="home-chat-message-text">' + escapeHtml(message.text) + '</div>' : '') +
          (message.imageDataUrl ? '<img class="home-chat-message-image" src="' + escapeAttribute(message.imageDataUrl) + '" alt="Chat image from ' + escapeAttribute(shownNickname) + '" loading="lazy">' : '') +
          ownerActions +
        '</article>'
      );
    }).join("");

    if (stickToBottom) {
      els.feed.scrollTop = els.feed.scrollHeight;
    }
  }

  function formatTime(timestamp) {
    if (!timestamp) {
      return "just now";
    }
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (error) {
      return "just now";
    }
  }

  function formatMessageTime(message) {
    const baseTime = formatTime(message && message.createdAt);
    if (message && message.editedAt) {
      return baseTime + " • edited";
    }
    return baseTime;
  }

  function handleFeedActionClick(event) {
    if (!state.ownerUnlocked || !state.db) {
      return;
    }

    const editButton = event.target.closest("[data-chat-edit]");
    if (editButton) {
      editChatMessage(editButton.getAttribute("data-chat-edit"));
      return;
    }

    const deleteButton = event.target.closest("[data-chat-delete]");
    if (deleteButton) {
      deleteChatMessage(deleteButton.getAttribute("data-chat-delete"));
      return;
    }

    const banButton = event.target.closest("[data-chat-ban]");
    if (banButton) {
      banChatAuthor(banButton.getAttribute("data-chat-ban"));
    }
  }

  function findMessage(messageId) {
    return state.messages.find(function (message) {
      return message.id === String(messageId || "");
    }) || null;
  }

  async function editChatMessage(messageId) {
    const message = findMessage(messageId);
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }

    const nextText = prompt("Edit this chat message:", message.text || "");
    if (nextText == null) {
      return;
    }

    const trimmed = String(nextText || "").trim().slice(0, 400);
    if (!trimmed && !message.imageDataUrl) {
      setStatus("Image-free messages need some text.");
      return;
    }

    await state.db.ref(chatPath + "/" + message.id).update({
      text: trimmed,
      editedAt: Date.now()
    });
    setStatus("Chat message updated.");
  }

  async function deleteChatMessage(messageId) {
    const message = findMessage(messageId);
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }

    if (!window.confirm('Delete the message from "' + message.nickname + '"?')) {
      return;
    }

    await state.db.ref(chatPath + "/" + message.id).remove();
    setStatus("Chat message deleted.");
  }

  async function banChatAuthor(messageId) {
    const message = findMessage(messageId);
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }

    if (isProtectedNickname(message.nickname) || isProtectedNickname(message.nicknameKey)) {
      setStatus("Arcady is protected and cannot be chat banned.");
      return;
    }

    if (isMessageChatBanned(message)) {
      await unbanChatAuthor(message);
      setStatus('Chat unbanned "' + displayNickname(message.nickname) + '".');
      return;
    }

    const nicknameKey = message.nicknameKey || normalizeNicknameKey(message.nickname);
    const payload = {
      nickname: message.nickname,
      nicknameKey: nicknameKey,
      bannedAt: Date.now(),
      bannedBy: readNickname() || "Owner"
    };

    if (message.deviceId) {
      payload.deviceId = message.deviceId;
      await state.db.ref(chatBansDevicesPath + "/" + message.deviceId).set(payload);
    } else if (nicknameKey) {
      await state.db.ref(chatBansNicknamesPath + "/" + nicknameKey).set(payload);
    } else {
      setStatus("That message has no ban target.");
      return;
    }

    setStatus('Chat banned "' + displayNickname(message.nickname) + '".');
  }

  async function unbanChatAuthor(message) {
    const nicknameKey = message.nicknameKey || normalizeNicknameKey(message.nickname);
    const removals = [];

    if (message.deviceId) {
      removals.push(state.db.ref(chatBansDevicesPath + "/" + message.deviceId).remove());
    }
    if (nicknameKey) {
      removals.push(state.db.ref(chatBansNicknamesPath + "/" + nicknameKey).remove());
    }

    await Promise.all(removals);
  }

  function isNearBottom(element) {
    if (!element) {
      return true;
    }
    return element.scrollHeight - element.scrollTop - element.clientHeight < 80;
  }

  function setStatus(message) {
    if (els.status) {
      els.status.textContent = message;
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();
