(() => {
  const THEME_KEY = "chickenTheme";
  const OVERRIDES_KEY = "chickenThemeOverrides";
  const CURSOR_KEY = "chickenCursorData";
  const DEFAULT_CURSOR = "./assets/comic.cur";

  const THEMES = {
    chicken: {
      bg: "#181818",
      panel: "rgba(32, 32, 32, 0.68)",
      card: "rgba(255, 255, 255, 0.06)",
      cardHover: "rgba(255, 255, 255, 0.08)",
      grid: "rgba(255, 255, 255, 0.04)",
      border: "rgba(255, 255, 255, 0.08)",
      text: "#ffffff",
      muted: "rgba(255, 255, 255, 0.64)",
      input: "rgba(255, 255, 255, 0.07)",
      accent: "#ffffff",
      accentSoft: "rgba(255, 255, 255, 0.14)",
      themeImage: "",
      themeOverlay: "rgba(0, 0, 0, 0)",
      suggestionBg: "rgba(24, 24, 24, 0.96)",
      suggestionHover: "rgba(255, 255, 255, 0.08)"
    },
    blueprint: {
      bg: "#102338",
      panel: "rgba(18, 45, 72, 0.72)",
      card: "rgba(125, 194, 255, 0.10)",
      cardHover: "rgba(125, 194, 255, 0.16)",
      grid: "rgba(125, 194, 255, 0.08)",
      border: "rgba(125, 194, 255, 0.18)",
      text: "#eef8ff",
      muted: "rgba(214, 240, 255, 0.74)",
      input: "rgba(125, 194, 255, 0.10)",
      accent: "#8ed1ff",
      accentSoft: "rgba(142, 209, 255, 0.18)",
      themeImage: "",
      themeOverlay: "rgba(4, 18, 32, 0.16)",
      suggestionBg: "rgba(10, 30, 50, 0.96)",
      suggestionHover: "rgba(142, 209, 255, 0.14)"
    },
    ember: {
      bg: "#1f1412",
      panel: "rgba(49, 27, 22, 0.78)",
      card: "rgba(255, 156, 102, 0.10)",
      cardHover: "rgba(255, 156, 102, 0.16)",
      grid: "rgba(255, 156, 102, 0.06)",
      border: "rgba(255, 156, 102, 0.18)",
      text: "#fff3ed",
      muted: "rgba(255, 217, 201, 0.72)",
      input: "rgba(255, 156, 102, 0.10)",
      accent: "#ff9c66",
      accentSoft: "rgba(255, 156, 102, 0.18)",
      themeImage: "",
      themeOverlay: "rgba(20, 8, 5, 0.18)",
      suggestionBg: "rgba(38, 17, 12, 0.96)",
      suggestionHover: "rgba(255, 156, 102, 0.14)"
    },
    forest: {
      bg: "#101d17",
      panel: "rgba(23, 47, 37, 0.76)",
      card: "rgba(120, 217, 156, 0.10)",
      cardHover: "rgba(120, 217, 156, 0.16)",
      grid: "rgba(120, 217, 156, 0.06)",
      border: "rgba(120, 217, 156, 0.18)",
      text: "#eefcf4",
      muted: "rgba(205, 243, 219, 0.72)",
      input: "rgba(120, 217, 156, 0.10)",
      accent: "#78d99c",
      accentSoft: "rgba(120, 217, 156, 0.18)",
      themeImage: "",
      themeOverlay: "rgba(6, 18, 11, 0.16)",
      suggestionBg: "rgba(11, 31, 20, 0.96)",
      suggestionHover: "rgba(120, 217, 156, 0.14)"
    },
    hacker: {
      bg: "#040805",
      panel: "rgba(7, 20, 11, 0.82)",
      card: "rgba(34, 255, 136, 0.08)",
      cardHover: "rgba(34, 255, 136, 0.14)",
      grid: "rgba(34, 255, 136, 0.08)",
      border: "rgba(34, 255, 136, 0.20)",
      text: "#dfffe9",
      muted: "rgba(123, 255, 176, 0.74)",
      input: "rgba(34, 255, 136, 0.08)",
      accent: "#22ff88",
      accentSoft: "rgba(34, 255, 136, 0.18)",
      themeImage: "",
      themeOverlay: "rgba(0, 10, 2, 0.24)",
      suggestionBg: "rgba(5, 18, 9, 0.98)",
      suggestionHover: "rgba(34, 255, 136, 0.14)"
    },
    canes: {
      bg: "#32120e",
      panel: "rgba(86, 15, 20, 0.72)",
      card: "rgba(255, 202, 76, 0.12)",
      cardHover: "rgba(255, 202, 76, 0.20)",
      grid: "rgba(255, 233, 175, 0.06)",
      border: "rgba(255, 202, 76, 0.24)",
      text: "#fff7e8",
      muted: "rgba(255, 232, 193, 0.82)",
      input: "rgba(255, 240, 214, 0.10)",
      accent: "#ffd24d",
      accentSoft: "rgba(255, 94, 70, 0.22)",
      themeImage: "url('./assets/canes-theme.jpg')",
      themeOverlay: "rgba(74, 5, 8, 0.42)",
      suggestionBg: "rgba(108, 16, 22, 0.94)",
      suggestionHover: "rgba(255, 210, 77, 0.16)"
    }
  };

  function ensureCursorStyle() {
    if (document.getElementById("chicken-theme-cursor-style")) return;
    const style = document.createElement("style");
    style.id = "chicken-theme-cursor-style";
    style.textContent = `
      body { cursor: var(--cursor-url), auto !important; }
      a, button, input, textarea, select, label, summary { cursor: var(--cursor-url), pointer !important; }
    `;
    document.head.appendChild(style);
  }

  function getThemeName() {
    const saved = localStorage.getItem(THEME_KEY);
    return THEMES[saved] ? saved : "chicken";
  }

  function getThemeOverrides() {
    try {
      return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function getCursorValue() {
    return localStorage.getItem(CURSOR_KEY) || DEFAULT_CURSOR;
  }

  function buildTheme(name = getThemeName()) {
    const theme = { ...(THEMES[name] || THEMES.chicken) };
    const overrides = getThemeOverrides();
    for (const [key, value] of Object.entries(overrides)) {
      if (typeof value === "string" && value.trim()) {
        theme[key] = value.trim();
      }
    }
    return theme;
  }

  function applyTheme(name = getThemeName()) {
    ensureCursorStyle();
    const theme = buildTheme(name);
    const root = document.documentElement;
    root.dataset.theme = name;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--panel", theme.panel);
    root.style.setProperty("--card", theme.card);
    root.style.setProperty("--card-hover", theme.cardHover);
    root.style.setProperty("--grid", theme.grid);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--input", theme.input);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-soft", theme.accentSoft);
    root.style.setProperty("--theme-image", theme.themeImage || "none");
    root.style.setProperty("--theme-overlay", theme.themeOverlay || "rgba(0, 0, 0, 0)");
    root.style.setProperty("--suggestion-bg", theme.suggestionBg || "rgba(24, 24, 24, 0.96)");
    root.style.setProperty("--suggestion-hover", theme.suggestionHover || "rgba(255, 255, 255, 0.08)");
    root.style.setProperty("--cursor-url", `url('${getCursorValue()}')`);
    window.dispatchEvent(new CustomEvent("chicken:theme-change", { detail: { name, theme } }));
  }

  function setTheme(name) {
    const next = THEMES[name] ? name : "chicken";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  function setThemeOverrides(nextOverrides = {}) {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(nextOverrides));
    applyTheme(getThemeName());
  }

  function resetThemeOverrides() {
    localStorage.removeItem(OVERRIDES_KEY);
    applyTheme(getThemeName());
  }

  function setCursorData(value) {
    if (value) {
      localStorage.setItem(CURSOR_KEY, value);
    } else {
      localStorage.removeItem(CURSOR_KEY);
    }
    applyTheme(getThemeName());
  }

  window.CHICKEN_THEMES = THEMES;
  window.applyChickenTheme = applyTheme;
  window.setChickenTheme = setTheme;
  window.getChickenTheme = getThemeName;
  window.getChickenThemeOverrides = getThemeOverrides;
  window.setChickenThemeOverrides = setThemeOverrides;
  window.resetChickenThemeOverrides = resetThemeOverrides;
  window.getChickenCursorValue = getCursorValue;
  window.setChickenCursorValue = setCursorData;
  applyTheme();
})();
