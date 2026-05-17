(() => {
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
  if (document.getElementById("chicken-cursor-accent")) return;

  const style = document.createElement("style");
  style.id = "chicken-cursor-accent-style";
  style.textContent = `
    #chicken-cursor-accent {
      position: fixed;
      left: 0;
      top: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9997;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, color-mix(in srgb, var(--accent-soft, rgba(255,255,255,0.14)) 100%, transparent) 0%, transparent 72%);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent, #ffffff) 55%, transparent);
      mix-blend-mode: screen;
      opacity: 0.9;
      transition: transform 0.08s linear, opacity 0.2s ease;
    }

    body:has(a:hover, button:hover, input:hover, textarea:hover, select:hover) #chicken-cursor-accent {
      transform: translate(-50%, -50%) scale(1.24);
    }
  `;
  document.head.appendChild(style);

  const accent = document.createElement("div");
  accent.id = "chicken-cursor-accent";
  accent.setAttribute("aria-hidden", "true");
  document.body.appendChild(accent);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let raf = null;

  function paint() {
    accent.style.left = `${x}px`;
    accent.style.top = `${y}px`;
    raf = null;
  }

  function queuePaint() {
    if (raf !== null) return;
    raf = window.requestAnimationFrame(paint);
  }

  window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
    accent.style.opacity = "0.9";
    queuePaint();
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    accent.style.opacity = "0";
  });

  window.addEventListener("mouseenter", () => {
    accent.style.opacity = "0.9";
  });
})();
