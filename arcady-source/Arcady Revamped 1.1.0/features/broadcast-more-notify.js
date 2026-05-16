(function () {
  var TOAST_LINGER_MS = 11000;

  function hasInlineHomeLiveTv() {
    return !!(
      document.querySelector(".home-page-shell #home-live-tv-panel") ||
      document.querySelector(".home-live-hub #home-live-tv-panel")
    );
  }

  function getNavMore() {
    return document.querySelector(".nav-more");
  }

  function getMoreBtn() {
    return document.getElementById("nav-more-btn");
  }

  var toastEl = null;
  var hideTimer = null;

  function clearNotify() {
    var wrap = getNavMore();
    if (wrap) {
      wrap.classList.remove("nav-more-broadcast-pulse");
    }
    if (toastEl) {
      toastEl.classList.remove("is-visible");
      window.setTimeout(function () {
        if (toastEl && !toastEl.classList.contains("is-visible")) {
          toastEl.setAttribute("hidden", "");
        }
      }, 320);
    }
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function ensureMoreBtnObserver() {
    var btn = getMoreBtn();
    if (!btn || btn.dataset.arcadyBroadcastObserved) {
      return;
    }
    btn.dataset.arcadyBroadcastObserved = "1";
    var moreBtnObserver = new MutationObserver(function () {
      if (btn.getAttribute("aria-expanded") === "true") {
        clearNotify();
      }
    });
    moreBtnObserver.observe(btn, { attributes: true, attributeFilter: ["aria-expanded"] });
  }

  function showBroadcastNotify(detail) {
    if (hasInlineHomeLiveTv()) {
      return;
    }

    var wrap = getNavMore();
    var btn = getMoreBtn();
    if (!wrap || !btn) {
      return;
    }

    ensureMoreBtnObserver();

    var label = detail && detail.label ? String(detail.label).trim() : "";
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "nav-more-broadcast-toast glass";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      toastEl.innerHTML =
        '<div class="nav-more-broadcast-toast-body">' +
        '<span class="nav-more-broadcast-toast-title">Live broadcast started</span>' +
        '<span class="nav-more-broadcast-toast-hint">Open <strong>More</strong>, then <strong>Brodcast</strong>, to watch.</span>' +
        '<span class="nav-more-broadcast-toast-label"></span>' +
        "</div>" +
        '<button type="button" class="nav-more-broadcast-toast-close" aria-label="Dismiss notification">\u00d7</button>';
      toastEl.setAttribute("hidden", "");
      wrap.appendChild(toastEl);

      toastEl.querySelector(".nav-more-broadcast-toast-close").addEventListener("click", function (event) {
        event.stopPropagation();
        clearNotify();
      });

      toastEl.addEventListener("click", function (event) {
        if (event.target.closest(".nav-more-broadcast-toast-close")) {
          return;
        }
        btn.click();
      });
    }

    var labelSpan = toastEl.querySelector(".nav-more-broadcast-toast-label");
    if (labelSpan) {
      labelSpan.textContent = label ? "\u201c" + label + "\u201d" : "";
      labelSpan.hidden = !label;
    }

    wrap.classList.add("nav-more-broadcast-pulse");
    toastEl.removeAttribute("hidden");
    window.requestAnimationFrame(function () {
      toastEl.classList.add("is-visible");
    });

    if (hideTimer) {
      window.clearTimeout(hideTimer);
    }
    hideTimer = window.setTimeout(function () {
      clearNotify();
    }, TOAST_LINGER_MS);
  }

  window.addEventListener("arcady:broadcast-started", function (event) {
    showBroadcastNotify((event && event.detail) || {});
  });

  window.addEventListener("arcady:broadcast-stopped", function () {
    clearNotify();
  });

  document.addEventListener(
    "click",
    function (event) {
      if (
        event.target.closest('[data-window-target="broadcast-window"]') ||
        event.target.closest('[data-scroll-target="#home-live-tv-panel"]')
      ) {
        clearNotify();
      }
    },
    false
  );

  ensureMoreBtnObserver();
})();
