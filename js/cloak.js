(() => {
  const TITLE_KEY = "chickenCloakTitle";
  const ICON_KEY = "chickenCloakIcon";

const CLOAKS = [
  {
    id: "desmos",
    label: "Desmos",
    title: "Desmos | Graphing Calculator",
    icon: "./assets/cloak-desmos.png",
    url: "https://www.desmos.com/calculator"
  },
  {
    id: "schoology",
    label: "Schoology",
    title: "Home | Schoology",
    icon: "./assets/cloak-schoology.png",
    url: "https://cfisd.schoology.com/home"
  },
  {
    id: "ixl",
    label: "IXL",
    title: "IXL | Dashboard",
    icon: "./assets/cloak-ixl.png",
    url: "https://www.ixl.com/dashboard"
  }
];

  function ensureFaviconLinks() {
    const selectors = [
      "link[rel='icon']",
      "link[rel='shortcut icon']",
      "link[rel='apple-touch-icon']"
    ];
    const links = selectors
      .map((selector) => Array.from(document.querySelectorAll(selector)))
      .flat();

    if (!links.length) {
      const link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
      return [link];
    }

    return links;
  }

  function applySavedCloak() {
    const savedTitle = localStorage.getItem(TITLE_KEY);
    const savedIcon = localStorage.getItem(ICON_KEY);
    if (savedTitle) document.title = savedTitle;
    if (savedIcon) {
      const href = `${savedIcon}${savedIcon.includes("?") ? "&" : "?"}v=${Date.now()}`;
      ensureFaviconLinks().forEach((link) => {
        link.href = href;
      });
    }
  }

  function saveCloak(cloak) {
    localStorage.setItem(TITLE_KEY, cloak.title);
    localStorage.setItem(ICON_KEY, cloak.icon);
    applySavedCloak();
  }

  function resetCloak() {
    localStorage.removeItem(TITLE_KEY);
    localStorage.removeItem(ICON_KEY);
    window.location.reload();
  }

  function wireSettings() {
    const select = document.getElementById("cloakSelect");
    const reset = document.getElementById("cloakReset");
    if (!select || !reset) return;

    CLOAKS.forEach((cloak) => {
      const option = document.createElement("option");
      option.value = cloak.id;
      option.textContent = cloak.label;
      select.appendChild(option);
    });

    const currentTitle = localStorage.getItem(TITLE_KEY);
    const current = CLOAKS.find((cloak) => cloak.title === currentTitle);
    if (current) select.value = current.id;

    select.addEventListener("change", () => {
      const chosen = CLOAKS.find((cloak) => cloak.id === select.value);
      if (!chosen) {
        resetCloak();
        return;
      }
      saveCloak(chosen);
    });

    reset.addEventListener("click", () => {
      select.value = "";
      resetCloak();
    });
  }

  window.CHICKEN_CLOAKS = CLOAKS;
  applySavedCloak();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireSettings, { once: true });
  } else {
    wireSettings();
  }
})();
