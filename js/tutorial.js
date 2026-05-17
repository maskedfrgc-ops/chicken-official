(() => {
  const STORAGE = {
    active: "chickenTourActive",
    step: "chickenTourStep",
    done: "chickenTourDone",
    mascot: "chickenTourMascot"
  };

  const MASCOTS = [
    "./assets/mascot-idle.png",
    "./assets/mascot-point.png"
  ];

  const STEPS = [
    {
      page: "index.html",
      selector: '[data-tour-target="home-search"]',
      title: "welcome to chicken",
      text: "I am your little chicken guide. I will walk you through the whole site, show you every main tab, and finish by explaining how the proxy works."
    },
    {
      page: "index.html",
      selector: '[data-tour-target="games-tab"]',
      title: "games first",
      text: "Start with the games tab. That is where the main Chicken game library lives, and it is usually the best place to start exploring."
    },
    {
      page: "games.html",
      selector: '[data-tour-target="games-search"]',
      title: "browse games",
      text: "This page is your game hub. Use the search bar for fast suggestions, and if some games do not work yet that is okay, just let me know and I will get on it."
    },
    {
      page: "games.html",
      selector: '[data-tour-target="apps-tab"]',
      title: "next up apps",
      text: "When you want websites and app-style links instead of games, head over to the apps tab right here."
    },
    {
      page: "apps.html",
      selector: '[data-tour-target="apps-search"]',
      title: "apps page",
      text: "Apps works a lot like games. Search in the middle, click a card, and it will open through the site flow instead of feeling like a random file dump."
    },
    {
      page: "apps.html",
      selector: '[data-tour-target="chat-tab"]',
      title: "say hi in chat",
      text: "This tab takes you to chat, where people can talk publicly and keep their profile saved between visits."
    },
    {
      page: "chat.html",
      selector: '[data-tour-target="chat-panel"]',
      title: "live chat",
      text: "Chat is for talking with other people on the site. Pick a username, set your picture, and your account details stay saved on your browser."
    },
    {
      page: "chat.html",
      selector: '[data-tour-target="settings-tab"]',
      title: "settings tour",
      text: "Now let me show you settings, because that is where all the site controls and customization options live."
    },
    {
      page: "settings.html",
      selector: '[data-tour-target="cloak-settings"]',
      title: "tab cloaks",
      text: "Tab cloaks let you swap the tab title and icon so the site can look like something else in your browser."
    },
    {
      page: "settings.html",
      selector: '[data-tour-target="theme-settings"]',
      title: "themes",
      text: "Themes recolor the whole site, including home, search areas, and suggestion menus, so you can make Chicken feel however you want."
    },
    {
      page: "settings.html",
      selector: '[data-tour-target="proxy-settings"]',
      title: "proxy choices",
      text: "This is where you choose the proxy backend. Home search uses this choice when it opens the browser page."
    },
    {
      page: "settings.html",
      selector: '[data-tour-target="tutorial-settings"]',
      title: "replay anytime",
      text: "If you ever want this walkthrough again, use the tutorial button here and I will guide you through everything from the start."
    },
    {
      page: "search.html",
      selector: '[data-tour-target="browser-search"]',
      title: "using the proxy",
      text: "On the browser page, type a search or a full URL here. This is the main place where the proxy tries to load pages through UV."
    },
    {
      page: "search.html",
      selector: '[data-tour-target="browser-status"]',
      title: "watch the status",
      text: "If the status says proxy mode active or ready, UV is working. If it says direct mode, the site fell back and some pages may refuse to connect."
    },
    {
      page: "index.html",
      selector: '[data-tour-target="home-tab"]',
      title: "you are set",
      text: "That is the full tour. The home tab always brings you back here, and now you know how to move through Chicken from top to bottom."
    }
  ];

  const currentPage = (() => {
    const last = window.location.pathname.split("/").pop();
    return last || "index.html";
  })();

  let tourRoot;
  let scrim;
  let panel;
  let titleEl;
  let textEl;
  let progressEl;
  let mascotEl;
  let pointerEl;
  let nextButton;
  let skipButton;
  let swapButton;
  let typingTimer = null;
  let highlighted = null;
  let typedDone = true;

  function ensureStyles() {
    if (document.getElementById("chicken-tour-styles")) return;
    const style = document.createElement("style");
    style.id = "chicken-tour-styles";
    style.textContent = `
      .chicken-tour-root {
        position: fixed;
        inset: 0;
        z-index: 9998;
        pointer-events: none;
      }

      .chicken-tour-root[hidden] {
        display: none !important;
      }

      .chicken-tour-scrim {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
      }

      .chicken-tour-panel {
        position: fixed;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        width: min(920px, calc(100vw - 48px));
        background: rgba(19, 19, 19, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 28px;
        padding: 18px 18px 18px 16px;
        display: grid;
        grid-template-columns: 110px minmax(0, 1fr);
        gap: 16px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(24px);
        pointer-events: auto;
      }

      .chicken-tour-mascot-box {
        width: 110px;
        height: 110px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .chicken-tour-mascot-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .chicken-tour-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .chicken-tour-speaker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: rgba(255, 255, 255, 0.7);
        font: 600 13px/1 'Montserrat', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }

      .chicken-tour-title {
        color: #fff;
        font: 700 27px/1.05 'Montserrat', sans-serif;
      }

      .chicken-tour-text {
        min-height: 72px;
        color: rgba(255, 255, 255, 0.88);
        font: 500 15px/1.6 'Montserrat', sans-serif;
      }

      .chicken-tour-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      .chicken-tour-progress {
        color: rgba(255, 255, 255, 0.58);
        font: 500 13px/1.4 'Montserrat', sans-serif;
      }

      .chicken-tour-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .chicken-tour-btn {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        padding: 10px 16px;
        font: 600 14px/1 'Montserrat', sans-serif;
      }

      .chicken-tour-btn.primary {
        background: rgba(255, 255, 255, 0.16);
      }

      .chicken-tour-target {
        position: relative !important;
        z-index: 10000 !important;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.82), 0 0 0 14px rgba(255, 255, 255, 0.08) !important;
        border-radius: 22px !important;
      }

      .chicken-tour-pointer {
        position: fixed;
        width: 42px;
        height: 42px;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }

      .chicken-tour-pointer::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.16);
        border: 1px solid rgba(255, 255, 255, 0.4);
        animation: chicken-tour-pulse 1.6s ease-in-out infinite;
      }

      .chicken-tour-pointer::after {
        content: '';
        position: absolute;
        left: 8px;
        top: 5px;
        width: 18px;
        height: 24px;
        background: rgba(255, 255, 255, 0.72);
        clip-path: polygon(0 0, 100% 55%, 58% 62%, 76% 100%, 56% 100%, 42% 66%, 0 100%);
        filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
      }

      @keyframes chicken-tour-pulse {
        0%, 100% { transform: scale(0.92); opacity: 0.55; }
        50% { transform: scale(1.08); opacity: 1; }
      }

      @media (max-width: 760px) {
        .chicken-tour-panel {
          grid-template-columns: 88px minmax(0, 1fr);
          width: min(100vw - 24px, 720px);
          bottom: 12px;
          padding: 14px;
        }

        .chicken-tour-mascot-box {
          width: 88px;
          height: 88px;
        }

        .chicken-tour-title {
          font-size: 22px;
        }

        .chicken-tour-text {
          min-height: 94px;
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildUI() {
    ensureStyles();
    if (tourRoot) return;

    tourRoot = document.createElement("div");
    tourRoot.className = "chicken-tour-root";
    tourRoot.hidden = true;
    tourRoot.innerHTML = `
      <div class="chicken-tour-scrim"></div>
      <div class="chicken-tour-pointer" aria-hidden="true"></div>
      <div class="chicken-tour-panel">
        <div class="chicken-tour-mascot-box">
          <img alt="Chicken mascot" />
        </div>
        <div class="chicken-tour-copy">
          <div class="chicken-tour-speaker">chicken guide</div>
          <div class="chicken-tour-title"></div>
          <div class="chicken-tour-text"></div>
          <div class="chicken-tour-footer">
            <div class="chicken-tour-progress"></div>
            <div class="chicken-tour-actions">
              <button class="chicken-tour-btn" type="button" data-tour-action="swap">swap mascot</button>
              <button class="chicken-tour-btn" type="button" data-tour-action="skip">skip</button>
              <button class="chicken-tour-btn primary" type="button" data-tour-action="next">next</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(tourRoot);

    scrim = tourRoot.querySelector(".chicken-tour-scrim");
    panel = tourRoot.querySelector(".chicken-tour-panel");
    pointerEl = tourRoot.querySelector(".chicken-tour-pointer");
    mascotEl = tourRoot.querySelector("img");
    titleEl = tourRoot.querySelector(".chicken-tour-title");
    textEl = tourRoot.querySelector(".chicken-tour-text");
    progressEl = tourRoot.querySelector(".chicken-tour-progress");
    swapButton = tourRoot.querySelector('[data-tour-action="swap"]');
    skipButton = tourRoot.querySelector('[data-tour-action="skip"]');
    nextButton = tourRoot.querySelector('[data-tour-action="next"]');

    swapButton.addEventListener("click", cycleMascot);
    skipButton.addEventListener("click", () => stop(true));
    nextButton.addEventListener("click", handleNext);
    window.addEventListener("resize", refreshPosition);
    window.addEventListener("scroll", refreshPosition, { passive: true });
  }

  function getStepIndex() {
    const raw = Number(localStorage.getItem(STORAGE.step) || 0);
    return Number.isFinite(raw) ? Math.max(0, Math.min(raw, STEPS.length - 1)) : 0;
  }

  function setStepIndex(index) {
    localStorage.setItem(STORAGE.step, String(index));
  }

  function getMascotIndex() {
    const raw = Number(localStorage.getItem(STORAGE.mascot) || 0);
    return Number.isFinite(raw) ? ((raw % MASCOTS.length) + MASCOTS.length) % MASCOTS.length : 0;
  }

  function setMascot() {
    mascotEl.src = MASCOTS[getMascotIndex()];
  }

  function cycleMascot() {
    const next = (getMascotIndex() + 1) % MASCOTS.length;
    localStorage.setItem(STORAGE.mascot, String(next));
    setMascot();
  }

  function clearHighlight() {
    if (highlighted) {
      highlighted.classList.remove("chicken-tour-target");
      highlighted = null;
    }
  }

  function typeText(text) {
    window.clearInterval(typingTimer);
    typedDone = false;
    textEl.textContent = "";
    let index = 0;
    typingTimer = window.setInterval(() => {
      index += 1;
      textEl.textContent = text.slice(0, index);
      if (index >= text.length) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        typedDone = true;
      }
    }, 18);
  }

  function finishTyping() {
    const step = STEPS[getStepIndex()];
    if (!step) return;
    if (typingTimer) {
      window.clearInterval(typingTimer);
      typingTimer = null;
    }
    textEl.textContent = step.text;
    typedDone = true;
  }

  function refreshPosition() {
    const step = STEPS[getStepIndex()];
    if (!step || !step.selector) {
      pointerEl.style.display = "none";
      return;
    }

    const target = document.querySelector(step.selector);
    if (!target) {
      pointerEl.style.display = "none";
      return;
    }

    const rect = target.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;

    if (/tab|settings/.test(step.selector)) {
      x = rect.left - 26;
    } else if (step.selector.includes("status")) {
      y = rect.bottom + 22;
    } else {
      y = rect.top - 20;
    }

    pointerEl.style.display = "block";
    pointerEl.style.left = `${x}px`;
    pointerEl.style.top = `${y}px`;
  }

  function bindTargetAdvance(step, target) {
    if (!target || target.dataset.tourBound === step.title) return;
    target.dataset.tourBound = step.title;
    if (target.tagName === "A") {
      target.addEventListener("click", () => {
        setStepIndex(getStepIndex() + 1);
      }, { once: true });
    }
  }

  function renderStep() {
    if (localStorage.getItem(STORAGE.active) !== "1") return;
    const step = STEPS[getStepIndex()];
    if (!step) {
      stop(false);
      return;
    }

    if (step.page !== currentPage) {
      window.location.href = `./${step.page}`;
      return;
    }

    buildUI();
    tourRoot.hidden = false;
    setMascot();
    clearHighlight();

    titleEl.textContent = step.title;
    progressEl.textContent = `step ${getStepIndex() + 1} of ${STEPS.length}`;
    nextButton.textContent = getStepIndex() === STEPS.length - 1 ? "finish" : "next";
    typeText(step.text);

    if (step.selector) {
      const target = document.querySelector(step.selector);
      if (target) {
        target.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
        target.classList.add("chicken-tour-target");
        highlighted = target;
        bindTargetAdvance(step, target);
      }
    }

    window.setTimeout(refreshPosition, 180);
  }

  function handleNext() {
    if (!typedDone) {
      finishTyping();
      return;
    }

    const nextIndex = getStepIndex() + 1;
    if (nextIndex >= STEPS.length) {
      stop(false);
      window.location.href = "./index.html";
      return;
    }

    setStepIndex(nextIndex);
    renderStep();
  }

  function stop(skipped) {
    window.clearInterval(typingTimer);
    typingTimer = null;
    clearHighlight();
    localStorage.removeItem(STORAGE.active);
    localStorage.removeItem(STORAGE.step);
    localStorage.setItem(STORAGE.done, "1");
    if (tourRoot) {
      tourRoot.hidden = true;
    }
    if (skipped) {
      textEl && (textEl.textContent = "");
    }
  }

  function start(force = false) {
    localStorage.setItem(STORAGE.active, "1");
    localStorage.setItem(STORAGE.step, "0");
    if (force) {
      localStorage.removeItem(STORAGE.done);
    }
    if (currentPage !== "index.html") {
      window.location.href = "./index.html";
      return;
    }
    renderStep();
  }

  function maybeStart() {
    buildUI();
    if (localStorage.getItem(STORAGE.active) === "1") {
      renderStep();
      return;
    }
    if (currentPage === "index.html" && localStorage.getItem(STORAGE.done) !== "1") {
      window.setTimeout(() => start(false), 850);
    }
  }

  window.ChickenTour = {
    start(force = true) {
      start(force);
    },
    stop() {
      stop(true);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", maybeStart, { once: true });
  } else {
    maybeStart();
  }
})();
