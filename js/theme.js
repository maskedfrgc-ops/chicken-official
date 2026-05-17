(() => {
  const THEME_KEY = "chickenTheme";
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
      accentSoft: "rgba(255, 255, 255, 0.14)"
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
      accentSoft: "rgba(142, 209, 255, 0.18)"
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
      accentSoft: "rgba(255, 156, 102, 0.18)"
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
      accentSoft: "rgba(120, 217, 156, 0.18)"
    }
  };

  function getThemeName() {
    const saved = localStorage.getItem(THEME_KEY);
    return THEMES[saved] ? saved : "chicken";
  }

  function applyTheme(name = getThemeName()) {
    const theme = THEMES[name] || THEMES.chicken;
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
  }

  function setTheme(name) {
    const next = THEMES[name] ? name : "chicken";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  window.CHICKEN_THEMES = THEMES;
  window.applyChickenTheme = applyTheme;
  window.setChickenTheme = setTheme;
  window.getChickenTheme = getThemeName;
  applyTheme();
})();
