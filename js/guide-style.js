(() => {
  const GUIDE_KEY = "chickenGuideConfig";

  const DEFAULT_CONFIG = {
    pose: "idle",
    hat: "none",
    shirt: "none",
    shoes: "none",
    rotation: 0
  };

  const OPTIONS = {
    poses: [
      { id: "idle", label: "Idle", image: "./assets/mascot-idle.png" },
      { id: "point", label: "Point", image: "./assets/mascot-point.png" }
    ],
    hats: [
      { id: "none", label: "No Hat" },
      { id: "cap", label: "Cap" },
      { id: "crown", label: "Crown" },
      { id: "beanie", label: "Beanie" }
    ],
    shirts: [
      { id: "none", label: "No Shirt" },
      { id: "tee", label: "Tee" },
      { id: "hoodie", label: "Hoodie" },
      { id: "jersey", label: "Jersey" }
    ],
    shoes: [
      { id: "none", label: "No Shoes" },
      { id: "sneakers", label: "Sneakers" },
      { id: "boots", label: "Boots" },
      { id: "skates", label: "Skates" }
    ]
  };

  function ensureStyle() {
    if (document.getElementById("chicken-guide-style")) return;
    const style = document.createElement("style");
    style.id = "chicken-guide-style";
    style.textContent = `
      .guide-avatar {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        filter: drop-shadow(0 18px 26px rgba(0,0,0,0.28));
        transform-style: preserve-3d;
      }

      .guide-avatar-inner {
        position: relative;
        width: min(100%, 360px);
        aspect-ratio: 1 / 1;
        transform-style: preserve-3d;
      }

      .guide-avatar-base {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        user-select: none;
        pointer-events: none;
      }

      .guide-clothing {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
      }

      .guide-hat-cap {
        top: 14%;
        width: 42%;
        height: 14%;
        background: linear-gradient(180deg, color-mix(in srgb, var(--accent, #fff) 85%, white), color-mix(in srgb, var(--accent, #fff) 78%, black 12%));
        border-radius: 999px 999px 28px 28px;
      }

      .guide-hat-cap::after {
        content: '';
        position: absolute;
        right: -8%;
        bottom: -8%;
        width: 42%;
        height: 40%;
        background: color-mix(in srgb, var(--accent, #fff) 82%, black 10%);
        border-radius: 0 999px 999px 999px;
        transform: rotate(14deg);
      }

      .guide-hat-crown {
        top: 10%;
        width: 44%;
        height: 18%;
        background: linear-gradient(180deg, #ffe47d, #f7b400);
        clip-path: polygon(0 100%, 0 52%, 16% 22%, 33% 56%, 50% 10%, 67% 56%, 84% 22%, 100% 52%, 100% 100%);
        border-radius: 10px;
      }

      .guide-hat-beanie {
        top: 13%;
        width: 42%;
        height: 17%;
        background: linear-gradient(180deg, color-mix(in srgb, var(--accent, #fff) 40%, #111), color-mix(in srgb, var(--accent, #fff) 54%, black 34%));
        border-radius: 999px 999px 18px 18px;
      }

      .guide-hat-beanie::after {
        content: '';
        position: absolute;
        left: 50%;
        top: -18%;
        transform: translateX(-50%);
        width: 20%;
        height: 34%;
        background: color-mix(in srgb, var(--accent, #fff) 74%, white);
        border-radius: 999px;
      }

      .guide-shirt-tee,
      .guide-shirt-hoodie,
      .guide-shirt-jersey {
        top: 57%;
        width: 40%;
        height: 20%;
      }

      .guide-shirt-tee {
        background: color-mix(in srgb, var(--accent, #fff) 70%, #e5e5e5);
        border-radius: 22px 22px 26px 26px;
      }

      .guide-shirt-hoodie {
        background: color-mix(in srgb, var(--accent, #fff) 68%, #111 16%);
        border-radius: 20px 20px 32px 32px;
      }

      .guide-shirt-hoodie::before {
        content: '';
        position: absolute;
        top: -24%;
        left: 50%;
        transform: translateX(-50%);
        width: 42%;
        height: 42%;
        border: 3px solid rgba(255,255,255,0.38);
        border-bottom: none;
        border-radius: 999px 999px 0 0;
      }

      .guide-shirt-jersey {
        background: linear-gradient(90deg, color-mix(in srgb, var(--accent, #fff) 84%, white) 0 18%, rgba(255,255,255,0.18) 18% 24%, color-mix(in srgb, var(--accent, #fff) 84%, white) 24% 76%, rgba(255,255,255,0.18) 76% 82%, color-mix(in srgb, var(--accent, #fff) 84%, white) 82% 100%);
        border-radius: 18px 18px 28px 28px;
      }

      .guide-shoes-sneakers,
      .guide-shoes-boots,
      .guide-shoes-skates {
        top: 82%;
        width: 52%;
        height: 10%;
      }

      .guide-shoes-sneakers::before,
      .guide-shoes-sneakers::after,
      .guide-shoes-boots::before,
      .guide-shoes-boots::after,
      .guide-shoes-skates::before,
      .guide-shoes-skates::after {
        content: '';
        position: absolute;
        width: 34%;
        height: 100%;
        border-radius: 999px 999px 14px 14px;
      }

      .guide-shoes-sneakers::before,
      .guide-shoes-boots::before,
      .guide-shoes-skates::before { left: 6%; }
      .guide-shoes-sneakers::after,
      .guide-shoes-boots::after,
      .guide-shoes-skates::after { right: 6%; }

      .guide-shoes-sneakers::before,
      .guide-shoes-sneakers::after {
        background: linear-gradient(180deg, white, color-mix(in srgb, var(--accent, #fff) 68%, #111 12%));
      }

      .guide-shoes-boots::before,
      .guide-shoes-boots::after {
        background: linear-gradient(180deg, #3a3a3a, #0c0c0c);
      }

      .guide-shoes-skates::before,
      .guide-shoes-skates::after {
        background: linear-gradient(180deg, color-mix(in srgb, var(--accent, #fff) 76%, white), #c9c9c9);
        box-shadow: 0 7px 0 -2px #8fd8ff;
      }
    `;
    document.head.appendChild(style);
  }

  function getConfig() {
    try {
      return { ...DEFAULT_CONFIG, ...(JSON.parse(localStorage.getItem(GUIDE_KEY) || "{}")) };
    } catch {
      return { ...DEFAULT_CONFIG };
    }
  }

  function saveConfig(config) {
    const next = { ...DEFAULT_CONFIG, ...config };
    localStorage.setItem(GUIDE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("chicken:guide-change", { detail: next }));
    return next;
  }

  function poseImage(pose) {
    return (OPTIONS.poses.find((entry) => entry.id === pose) || OPTIONS.poses[0]).image;
  }

  function piece(type, id) {
    if (!id || id === "none") return null;
    const node = document.createElement("div");
    node.className = `guide-clothing guide-${type}-${id}`;
    return node;
  }

  function render(container, config = getConfig(), opts = {}) {
    ensureStyle();
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "guide-avatar";
    wrap.style.width = opts.size ? `${opts.size}px` : "100%";
    wrap.style.height = opts.size ? `${opts.size}px` : "100%";
    const inner = document.createElement("div");
    inner.className = "guide-avatar-inner";
    inner.style.transform = `rotateY(${config.rotation || 0}deg)`;

    const img = document.createElement("img");
    img.className = "guide-avatar-base";
    img.src = poseImage(config.pose);
    img.alt = "Chicken guide";
    inner.appendChild(img);

    ["hat", "shirt", "shoes"].forEach((type) => {
      const accessory = piece(type, config[type]);
      if (accessory) inner.appendChild(accessory);
    });

    wrap.appendChild(inner);
    container.appendChild(wrap);
    return wrap;
  }

  window.CHICKEN_GUIDE = {
    options: OPTIONS,
    defaultConfig: DEFAULT_CONFIG,
    getConfig,
    saveConfig,
    render
  };
})();
