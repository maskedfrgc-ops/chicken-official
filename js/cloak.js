(() => {
  const TITLE_KEY = "chickenCloakTitle";
  const ICON_KEY = "chickenCloakIcon";

  const CLOAKS = [
    {
      id: "classlink",
      label: "ClassLink",
      title: "ClassLink LaunchPad",
      icon: "https://www.google.com/s2/favicons?domain=myapps.classlink.com&sz=64",
      url: "https://myapps.classlink.com/home"
    },
    {
      id: "ixl",
      label: "IXL",
      title: "IXL | Dashboard",
      icon: "https://www.google.com/s2/favicons?domain=www.ixl.com&sz=64",
      url: "https://www.ixl.com/dashboard"
    },
    {
      id: "schoology",
      label: "Schoology",
      title: "Home | Schoology",
      icon: "https://www.google.com/s2/favicons?domain=cfisd.schoology.com&sz=64",
      url: "https://cfisd.schoology.com/home"
    },
    {
      id: "desmos",
      label: "Desmos",
      title: "Desmos | Graphing Calculator",
      icon: "https://www.google.com/s2/favicons?domain=www.desmos.com&sz=64",
      url: "https://www.desmos.com/calculator"
    }
  ];

  function ensureFavicon() {
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    return link;
  }

  function applySavedCloak() {
    const savedTitle = localStorage.getItem(TITLE_KEY);
    const savedIcon = localStorage.getItem(ICON_KEY);
    if (savedTitle) document.title = savedTitle;
    if (savedIcon) ensureFavicon().href = savedIcon;
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
