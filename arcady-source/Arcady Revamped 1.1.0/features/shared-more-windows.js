(function () {
  const navLinks = document.querySelector(".nav-links");
  const settingsButton = document.getElementById("settings-btn");

  if (!navLinks || !settingsButton || document.getElementById("nav-more-btn")) {
    return;
  }

  const inPagesFolder = /\/Pages\//.test(location.pathname);
  const assetPrefix = inPagesFolder ? "../" : "./";
  const scheduleImagePath = assetPrefix + "features/bell scheduale.jpg";
  const menuImagePath = assetPrefix + "features/MSApril2026Menu_page-0001.jpg";
  const petStateKey = "arcadyHomePetState";
  const petAssetsBase = 'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/pets/';
  const petFollowOverlayId = "page-pet-follow-overlay";
  let topWindowZIndex = 2200;

  const inlineLiveTv = document.querySelector(
    ".home-live-hub #home-live-tv-panel, .home-page-shell #home-live-tv-panel"
  );
  const inlineSchedule = document.querySelector("section.home-live-schedule-panel");

  const bellButtonAttrs = inlineSchedule
    ? 'data-scroll-target=".home-live-schedule-panel"'
    : 'data-window-target="schedule-window"';
  const broadcastButtonAttrs = inlineLiveTv
    ? 'data-scroll-target="#home-live-tv-panel"'
    : 'data-window-target="broadcast-window"';

  settingsButton.insertAdjacentHTML(
    "beforebegin",
    [
      '<div class="nav-more">',
      '  <button id="nav-more-btn" class="nav-menu-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="nav-more-menu">',
      '    <i data-lucide="ellipsis"></i>',
      "  </button>",
      '  <div id="nav-more-menu" class="nav-more-menu glass" hidden>',
      '    <button class="nav-more-item" type="button" ' + broadcastButtonAttrs + ">",
      '      <i data-lucide="monitor-play"></i> Brodcast',
      "    </button>",
      '    <button class="nav-more-item" type="button" ' + bellButtonAttrs + ">",
      '      <i data-lucide="bell"></i> Bell Schedule',
      "    </button>",
      '    <button class="nav-more-item" type="button" data-window-target="menu-window">',
      '      <i data-lucide="clipboard-list"></i> Lunch Menu',
      "    </button>",
      '    <button class="nav-more-item" type="button" data-window-target="selfie-window">',
      '      <i data-lucide="camera"></i> Selfie Studio',
      '    </button>',
      '    <button class="nav-more-item" type="button" data-window-target="voice-window">',
      '      <i data-lucide="mic"></i> Voice Studio',
      '    </button>',      "  </div>",
      "</div>"
    ].join("")
  );

  const scheduleSectionHtml =
    '<section class="floating-window glass is-schedule is-hidden" id="schedule-window" data-window hidden>' +
    '  <div class="desktop-window-bar" data-window-handle>' +
    '    <div class="desktop-window-caption">' +
    '      <div class="desktop-window-eyebrow">Quick Window</div>' +
    '      <div class="desktop-window-title">Bell Schedule Menu</div>' +
    "    </div>" +
    '    <div class="desktop-window-actions">' +
    '      <button class="desktop-window-control" type="button" data-window-close="schedule-window" aria-label="Close bell schedule window"><i data-lucide="x"></i></button>' +
    "    </div>" +
    "  </div>" +
    '  <div class="desktop-window-body schedule-window-body">' +
    '    <div class="home-live-schedule-frame">' +
    '      <img src="' +
    scheduleImagePath +
    '" alt="School bell schedule" class="bell-schedule-image">' +
    "    </div>" +
    "  </div>" +
    '  <div class="desktop-window-resize-hint" aria-hidden="true"></div>' +
    "</section>";

  const broadcastSectionHtml =
    '<section class="floating-window glass is-broadcast is-hidden" id="broadcast-window" data-window hidden>' +
    '  <div class="desktop-window-bar" data-window-handle>' +
    '    <div class="desktop-window-caption">' +
    '      <div class="desktop-window-eyebrow">Live Window</div>' +
    '      <div class="desktop-window-title">Brodcast</div>' +
    "    </div>" +
    '    <div class="desktop-window-actions">' +
    '      <button class="desktop-window-control" type="button" data-window-close="broadcast-window" aria-label="Close broadcast window"><i data-lucide="x"></i></button>' +
    "    </div>" +
    "  </div>" +
    '  <div class="desktop-window-body broadcast-window-body">' +
    '    <section class="home-live-tv-panel" id="home-live-tv-panel">' +
    '      <div class="home-live-tv-head">' +
    "        <div>" +
    '          <div class="home-live-tv-kicker">Live TV</div>' +
    '          <h3 class="home-live-tv-title" id="home-live-tv-title">Static Broadcast</h3>' +
    "        </div>" +
    '        <div class="home-live-tv-meta" id="home-live-tv-meta">No live broadcast right now. Static mode is on until the owner goes live.</div>' +
    "      </div>" +
    '      <div class="home-live-tv-screen">' +
    '        <div class="home-live-tv-static" id="home-live-tv-static" aria-hidden="true"></div>' +
    '        <img class="home-live-tv-image" id="home-live-tv-image" alt="Live TV image broadcast" hidden>' +
    '        <video class="home-live-tv-video" id="home-live-tv-video" playsinline webkit-playsinline autoplay loop controls preload="auto"></video>' +
    '        <iframe class="home-live-tv-embed" id="home-live-tv-embed" title="Live TV YouTube broadcast" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen hidden></iframe>' +
    "      </div>" +
    "    </section>" +
    "  </div>" +
    '  <div class="desktop-window-resize-hint" aria-hidden="true"></div>' +
    "</section>";

  const menuSectionHtml =
    '<section class="floating-window glass is-menu is-hidden" id="menu-window" data-window hidden>' +
    '  <div class="desktop-window-bar" data-window-handle>' +
    '    <div class="desktop-window-caption">' +
    '      <div class="desktop-window-eyebrow">More Window</div>' +
    '      <div class="desktop-window-title">Lunch Menu</div>' +
    '    </div>' +
    '    <div class="desktop-window-actions">' +
    '      <button class="desktop-window-control" type="button" data-window-close="menu-window" aria-label="Close lunch menu window"><i data-lucide="x"></i></button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-body menu-window-body">' +
    '    <div class="menu-window-panel">' +
    '      <img src="' + menuImagePath + '" alt="April 2026 lunch menu" class="menu-window-image">' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-resize-hint" aria-hidden="true"></div>' +
    '</section>';

  const selfieSectionHtml =
    '<section class="floating-window glass is-selfie is-hidden" id="selfie-window" data-window hidden>' +
    '  <div class="desktop-window-bar" data-window-handle>' +
    '    <div class="desktop-window-caption">' +
    '      <div class="desktop-window-eyebrow">Selfie Studio</div>' +
    '      <div class="desktop-window-title">Photo Selfie App</div>' +
    '    </div>' +
    '    <div class="desktop-window-actions">' +
    '      <button class="desktop-window-control" type="button" data-window-close="selfie-window" aria-label="Close selfie studio window"><i data-lucide="x"></i></button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-body selfie-window-body">' +
    '    <div class="selfie-studio-grid">' +
    '      <div class="selfie-preview-panel">' +
    '        <video id="selfie-video" autoplay muted playsinline class="selfie-video"></video>' +
    '        <canvas id="selfie-canvas" class="selfie-canvas" hidden></canvas>' +
    '        <canvas id="selfie-doodle-canvas" class="selfie-doodle-canvas"></canvas>' +
    '        <div id="selfie-props-layer" class="selfie-props-layer" aria-hidden="true"></div>' +
    '      </div>' +
    '      <div class="selfie-controls">' +
    '        <div class="selfie-control-row">' +
    '          <button type="button" id="selfie-capture-btn" class="selfie-btn">Capture</button>' +
    '          <button type="button" id="selfie-reset-btn" class="selfie-btn secondary">Reset</button>' +
    '          <button type="button" id="selfie-flip-btn" class="selfie-btn secondary">Invert Camera</button>' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <label class="selfie-label" for="selfie-filter-select">Filter</label>' +
    '          <select id="selfie-filter-select" class="selfie-select">' +
    '            <option value="none">None</option>' +
    '            <option value="grayscale(100%)">Grayscale</option>' +
    '            <option value="sepia(90%)">Sepia</option>' +
    '            <option value="invert(100%)">Invert</option>' +
    '            <option value="blur(2px)">Blur</option>' +
    '            <option value="saturate(1.8)">Glow</option>' +
    '          </select>' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <label class="selfie-label" for="selfie-upload-input">Upload Photo</label>' +
    '          <input id="selfie-upload-input" class="selfie-file-input" type="file" accept="image/*">' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <label class="selfie-label" for="selfie-brush-color">Brush</label>' +
    '          <input id="selfie-brush-color" class="selfie-color-input" type="color" value="#ff3b82">' +
    '          <select id="selfie-brush-size" class="selfie-select">' +
    '            <option value="4">Thin</option>' +
    '            <option value="8" selected>Medium</option>' +
    '            <option value="14">Thick</option>' +
    '            <option value="22">Bold</option>' +
    '          </select>' +
    '          <button type="button" id="selfie-clear-draw-btn" class="selfie-btn secondary">Clear Doodle</button>' +
    '        </div>' +
    '        <div class="selfie-control-row selfie-props-row">' +
    '          <span class="selfie-label">Props</span>' +
    '          <button type="button" class="selfie-prop-btn" data-selfie-prop="glasses">Glasses</button>' +
    '          <button type="button" class="selfie-prop-btn" data-selfie-prop="cat-ears">Cat Ears</button>' +
    '          <button type="button" class="selfie-prop-btn" data-selfie-prop="bow">Bow</button>' +
    '          <button type="button" class="selfie-prop-btn" data-selfie-prop="headband">Headband</button>' +
    '          <button type="button" id="selfie-clear-props-btn" class="selfie-btn secondary">Clear Props</button>' +
    '        </div>' +
    '        <div class="selfie-control-row selfie-action-row">' +
    '          <a id="selfie-download-btn" class="selfie-btn accent selfie-download-link" hidden download="arcady-selfie.png">Download Photo</a>' +
    '        </div>' +
    '        <p class="selfie-status" id="selfie-status">Use your device camera or upload a photo. Draw, add props, then click Capture.</p>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-resize-hint" aria-hidden="true"></div>' +
    '</section>';

  const voiceSectionHtml =
    '<section class="floating-window glass is-voice is-hidden" id="voice-window" data-window hidden>' +
    '  <div class="desktop-window-bar" data-window-handle>' +
    '    <div class="desktop-window-caption">' +
    '      <div class="desktop-window-eyebrow">Voice Studio</div>' +
    '      <div class="desktop-window-title">Voice Remix Lab</div>' +
    '    </div>' +
    '    <div class="desktop-window-actions">' +
    '      <button class="desktop-window-control" type="button" data-window-close="voice-window" aria-label="Close voice studio window"><i data-lucide="x"></i></button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-body voice-window-body">' +
    '    <div class="voice-studio-grid">' +
    '      <div class="voice-preview-panel">' +
    '        <div id="voice-meter" class="voice-meter">Ready to record your voice.</div>' +
    '        <canvas id="voice-waveform" class="voice-waveform" aria-label="Voice waveform visualization"></canvas>' +
    '        <audio id="voice-player" controls class="voice-player" hidden></audio>' +
    '      </div>' +
    '      <div class="voice-controls">' +
    '        <div class="selfie-control-row">' +
    '          <button type="button" id="voice-record-btn" class="selfie-btn">Record</button>' +
    '          <button type="button" id="voice-stop-btn" class="selfie-btn secondary" disabled>Stop</button>' +
    '          <button type="button" id="voice-play-btn" class="selfie-btn secondary" disabled>Play</button>' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <label class="selfie-label" for="voice-pitch">Pitch</label>' +
    '          <input id="voice-pitch" type="range" min="0.5" max="2" step="0.05" value="1" class="selfie-select">' +
    '          <span id="voice-pitch-value" class="selfie-label">1.00x</span>' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <label class="selfie-label" for="voice-tone-select">Tone</label>' +
    '          <select id="voice-tone-select" class="selfie-select">' +
    '            <option value="none">Normal</option>' +
    '            <option value="warm">Warm</option>' +
    '            <option value="bright">Bright</option>' +
    '            <option value="bass">Bass</option>' +
    '            <option value="robot">Robot</option>' +
    '          </select>' +
    '        </div>' +
    '        <div class="selfie-control-row">' +
    '          <button type="button" id="voice-remix-btn" class="selfie-btn accent" disabled>Remix</button>' +
    '          <button type="button" id="voice-clear-btn" class="selfie-btn secondary" disabled>Clear</button>' +
    '        </div>' +
    '        <div class="selfie-control-row selfie-action-row">' +
    '          <a id="voice-download-btn" class="selfie-btn accent selfie-download-link" hidden download="arcady-voice.mp3">Download MP3</a>' +
    '        </div>' +
    '        <p class="selfie-status" id="voice-status">Record your voice, change pitch and tone, then remix.</p>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="desktop-window-resize-hint" aria-hidden="true"></div>' +
    '</section>';

  const followOverlayHtml =
    '<div id="' + petFollowOverlayId + '" class="page-pet-follow is-hidden" hidden>' +
    '  <img id="page-pet-follow-image" class="page-pet-follow-image" alt="Your pet companion" src="' + petAssetsBase + 'froggy.png">' +
    '</div>';

  const needScheduleWindow = !document.getElementById("schedule-window") && !inlineSchedule;
  const needBroadcastWindow = !document.getElementById("broadcast-window") && !inlineLiveTv;
  const needMenuWindow = !document.getElementById("menu-window");
  const needSelfieWindow = !document.getElementById("selfie-window");
  const needVoiceWindow = !document.getElementById("voice-window");
  const needPetFollowOverlay = !document.getElementById(petFollowOverlayId);

  if (needScheduleWindow) {
    document.body.insertAdjacentHTML("beforeend", scheduleSectionHtml);
  }
  if (needBroadcastWindow) {
    document.body.insertAdjacentHTML("beforeend", broadcastSectionHtml);
  }
  if (needMenuWindow) {
    document.body.insertAdjacentHTML("beforeend", menuSectionHtml);
  }
  if (needSelfieWindow) {
    document.body.insertAdjacentHTML("beforeend", selfieSectionHtml);
  }
  if (needVoiceWindow) {
    document.body.insertAdjacentHTML("beforeend", voiceSectionHtml);
  }
  if (needPetFollowOverlay) {
    document.body.insertAdjacentHTML("beforeend", followOverlayHtml);
  }

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons({ parent: document.body });
  }

  const pagePetFollowElement = document.getElementById(petFollowOverlayId);
  let petFollowTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let petFollowCurrent = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let petFollowAnimationFrame = null;
  let selfieStudioInitialized = false;
  let selfieInvertCamera = false;
  let voiceStudioInitialized = false;
  let voiceMediaRecorder = null;
  let voiceMicStream = null;
  let voiceChunks = [];
  let voiceBlob = null;
  let voiceAudioContext = null;
  let voiceAudioSource = null;
  let voiceFilterNode = null;
  let voicePlaybackRate = 1;
  let voiceTone = 'none';
  let activeProp = 'none';
  let isDrawing = false;
  let lastPointer = { x: 0, y: 0 };

  function getPetImagePath(state) {
    if (state && state.imageFile) {
      return petAssetsBase + state.imageFile;
    }
    if (state && state.image) {
      return state.image;
    }
    return petAssetsBase + 'froggy.png';
  }

  function loadSharedPetState() {
    const saved = localStorage.getItem(petStateKey);
    if (!saved) {
      return { hatched: false, name: '', age: 0, hunger: 100, affection: 50, adventure: false, imageFile: 'froggy.png', image: petAssetsBase + 'froggy.png', lastActive: Date.now() };
    }
    try {
      const parsed = JSON.parse(saved);
      return Object.assign({ hatched: false, name: '', age: 0, hunger: 100, affection: 50, adventure: false, imageFile: 'froggy.png', image: petAssetsBase + 'froggy.png', lastActive: Date.now() }, parsed);
    } catch (error) {
      console.warn('Failed to load shared pet state:', error);
      return { hatched: false, name: '', age: 0, hunger: 100, affection: 50, adventure: false, imageFile: 'froggy.png', image: petAssetsBase + 'froggy.png', lastActive: Date.now() };
    }
  }

  function animatePetFollow() {
    if (!pagePetFollowElement) {
      petFollowAnimationFrame = null;
      return;
    }
    const deltaX = petFollowTarget.x - petFollowCurrent.x;
    const deltaY = petFollowTarget.y - petFollowCurrent.y;
    petFollowCurrent.x += deltaX * 0.16;
    petFollowCurrent.y += deltaY * 0.16;
    pagePetFollowElement.style.transform = `translate3d(${petFollowCurrent.x}px, ${petFollowCurrent.y}px, 0)`;
    petFollowAnimationFrame = requestAnimationFrame(animatePetFollow);
  }

  function updateSharedPetFollow(state) {
    if (!pagePetFollowElement) {
      return;
    }
    const image = document.getElementById('page-pet-follow-image');
    if (image) {
      image.src = getPetImagePath(state);
      image.alt = state.name ? `${state.name} companion` : 'Your pet companion';
    }

    if (state.hatched && state.adventure) {
      pagePetFollowElement.hidden = false;
      pagePetFollowElement.classList.remove('is-hidden');
      if (!petFollowAnimationFrame) {
        petFollowAnimationFrame = requestAnimationFrame(animatePetFollow);
      }
      return;
    }

    pagePetFollowElement.hidden = true;
    pagePetFollowElement.classList.add('is-hidden');
    if (petFollowAnimationFrame) {
      cancelAnimationFrame(petFollowAnimationFrame);
      petFollowAnimationFrame = null;
    }
  }

  window.addEventListener('pointermove', function (event) {
    petFollowTarget.x = event.clientX + 18;
    petFollowTarget.y = event.clientY + 18;
  }, { passive: true });

  window.addEventListener('resize', function () {
    petFollowCurrent = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    petFollowTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  });

  window.addEventListener('storage', function (event) {
    if (event.key !== petStateKey) {
      return;
    }
    updateSharedPetFollow(loadSharedPetState());
  });

  window.addEventListener('arcadyPetStateChanged', function () {
    updateSharedPetFollow(loadSharedPetState());
  });

  updateSharedPetFollow(loadSharedPetState());

  function getSelfieFilterString(filterValue) {
    const filter = filterValue === 'blur(2px)' ? 'blur(2px)' : filterValue || 'none';
    if (!selfieInvertCamera) {
      return filter;
    }
    return filter === 'none' ? 'invert(1)' : filter + ' invert(1)';
  }

  function setSelfieStatus(message) {
    const status = document.getElementById('selfie-status');
    if (status) {
      status.textContent = message;
    }
  }

  function applySelfieFilter(filterValue) {
    const selfieVideo = document.getElementById('selfie-video');
    const selfieCanvas = document.getElementById('selfie-canvas');
    const filter = getSelfieFilterString(filterValue || 'none');

    if (selfieVideo) {
      selfieVideo.style.filter = filter;
    }
    if (selfieCanvas) {
      selfieCanvas.style.filter = filter;
    }
  }

  function captureSelfie() {
    const selfieVideo = document.getElementById('selfie-video');
    const selfieCanvas = document.getElementById('selfie-canvas');
    const filterSelect = document.getElementById('selfie-filter-select');
    const downloadButton = document.getElementById('selfie-download-btn');

    if (!selfieCanvas) {
      return;
    }

    const readyForVideoCapture = selfieVideo && !selfieVideo.hidden && selfieVideo.readyState >= 2;
    const ctx = selfieCanvas.getContext('2d');
    if (!ctx) {
      return;
    }

    if (readyForVideoCapture) {
      selfieCanvas.width = selfieVideo.videoWidth || 640;
      selfieCanvas.height = selfieVideo.videoHeight || 480;
      if (filterSelect) {
        ctx.filter = getSelfieFilterString(filterSelect.value);
      }
      ctx.drawImage(selfieVideo, 0, 0, selfieCanvas.width, selfieCanvas.height);
      drawOverlayOnCanvas(selfieCanvas);
    } else if (!selfieCanvas.hidden) {
      if (filterSelect) {
        ctx.filter = getSelfieFilterString(filterSelect.value);
      }
      drawOverlayOnCanvas(selfieCanvas);
    } else {
      setSelfieStatus('No camera or photo available to capture.');
      return;
    }

    selfieCanvas.hidden = false;

    if (downloadButton) {
      downloadButton.hidden = false;
      downloadButton.href = selfieCanvas.toDataURL('image/png');
      downloadButton.setAttribute('download', 'arcady-selfie.png');
    }

    setSelfieStatus('Saved your selfie preview. Tap Download to save locally or adjust your doodles and props.');
  }

  function clearDoodleCanvas() {
    const doodleCanvas = document.getElementById('selfie-doodle-canvas');
    if (!doodleCanvas) {
      return;
    }
    const ctx = doodleCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, doodleCanvas.width, doodleCanvas.height);
    }
  }

  function updatePropOverlay() {
    const propsLayer = document.getElementById('selfie-props-layer');
    if (!propsLayer) {
      return;
    }
    const propEmoji = {
      none: '',
      glasses: '🕶️',
      'cat-ears': '😺',
      bow: '🎀',
      headband: '🎗️'
    };
    propsLayer.textContent = propEmoji[activeProp] || '';
  }

  function drawPropsOnCanvas(ctx, width, height) {
    if (activeProp === 'none') {
      return;
    }
    const emojiMap = {
      glasses: '🕶️',
      'cat-ears': '😺',
      bow: '🎀',
      headband: '🎗️'
    };
    const emoji = emojiMap[activeProp] || '';
    if (!emoji) {
      return;
    }
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.max(48, Math.round(width * 0.18))}px sans-serif`;
    ctx.fillText(emoji, width / 2, height * 0.18);
    ctx.restore();
  }

  function drawOverlayOnCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const doodleCanvas = document.getElementById('selfie-doodle-canvas');
    if (!ctx) {
      return;
    }
    if (doodleCanvas) {
      ctx.drawImage(doodleCanvas, 0, 0, canvas.width, canvas.height);
    }
    drawPropsOnCanvas(ctx, canvas.width, canvas.height);
  }

  function resetSelfieStudio() {
    const selfieCanvas = document.getElementById('selfie-canvas');
    const downloadButton = document.getElementById('selfie-download-btn');
    const filterSelect = document.getElementById('selfie-filter-select');
    const selfieVideo = document.getElementById('selfie-video');
    const propsLayer = document.getElementById('selfie-props-layer');

    selfieInvertCamera = false;

    if (selfieCanvas) {
      selfieCanvas.hidden = true;
      const ctx = selfieCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, selfieCanvas.width, selfieCanvas.height);
      }
    }
    if (downloadButton) {
      downloadButton.hidden = true;
      downloadButton.removeAttribute('href');
    }
    if (filterSelect) {
      filterSelect.value = 'none';
    }
    if (selfieVideo) {
      selfieVideo.hidden = false;
      applySelfieFilter('none');
    }
    if (propsLayer) {
      activeProp = 'none';
      updatePropOverlay();
    }
    clearDoodleCanvas();
    setSelfieStatus('Use your device camera or upload a photo. Draw, add props, then capture.');
  }

  function stopSelfieStream() {
    const selfieVideo = document.getElementById('selfie-video');
    if (!selfieVideo || !selfieVideo.srcObject) {
      return;
    }
    const stream = selfieVideo.srcObject;
    if (stream.getTracks) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    selfieVideo.srcObject = null;
  }

  function startSelfieStream() {
    const selfieVideo = document.getElementById('selfie-video');
    if (!selfieVideo) {
      return;
    }
    stopSelfieStream();
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setSelfieStatus('Camera API unavailable. Upload a photo instead.');
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        selfieVideo.srcObject = stream;
        selfieVideo.hidden = false;
        selfieVideo.play().catch(function () {});
        setSelfieStatus('Camera is active. Choose a filter, draw, add props, then capture.');
      })
      .catch(function () {
        setSelfieStatus('Camera access is unavailable. Upload a photo instead.');
      });
  }

  function toggleCameraInvertMode() {
    selfieInvertCamera = !selfieInvertCamera;
    const filterSelect = document.getElementById('selfie-filter-select');
    const currentFilter = filterSelect ? filterSelect.value : 'none';
    applySelfieFilter(currentFilter);
    setSelfieStatus(selfieInvertCamera ? 'Camera view inverted. Capture your photo to save it.' : 'Camera inversion removed. Capture your photo to save it.');
  }

  function setActiveProp(prop) {
    activeProp = prop || 'none';
    updatePropOverlay();
    setSelfieStatus(prop === 'none' ? 'Props cleared.' : `Added ${prop.replace('-', ' ')}.`);
  }

  function setupDoodleCanvas() {
    const doodleCanvas = document.getElementById('selfie-doodle-canvas');
    const brushColorInput = document.getElementById('selfie-brush-color');
    const brushSizeSelect = document.getElementById('selfie-brush-size');

    if (!doodleCanvas || !brushColorInput || !brushSizeSelect) {
      return;
    }

    const resizeDoodleCanvas = function () {
      const rect = doodleCanvas.getBoundingClientRect();
      doodleCanvas.width = rect.width;
      doodleCanvas.height = rect.height;
    };

    const ctx = doodleCanvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    resizeDoodleCanvas();
    window.addEventListener('resize', resizeDoodleCanvas);

    doodleCanvas.addEventListener('pointerdown', function (event) {
      isDrawing = true;
      lastPointer = { x: event.offsetX, y: event.offsetY };
      doodleCanvas.setPointerCapture(event.pointerId);
    });

    doodleCanvas.addEventListener('pointermove', function (event) {
      if (!isDrawing) {
        return;
      }
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.strokeStyle = brushColorInput.value || '#ff3b82';
      ctx.lineWidth = Number(brushSizeSelect.value) || 8;
      ctx.beginPath();
      ctx.moveTo(lastPointer.x, lastPointer.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPointer = { x, y };
    });

    doodleCanvas.addEventListener('pointerup', function (event) {
      isDrawing = false;
      doodleCanvas.releasePointerCapture(event.pointerId);
    });

    doodleCanvas.addEventListener('pointercancel', function (event) {
      isDrawing = false;
      if (doodleCanvas.hasPointerCapture(event.pointerId)) {
        doodleCanvas.releasePointerCapture(event.pointerId);
      }
    });
  }

  function initializeSelfieStudio() {
    if (selfieStudioInitialized) {
      return;
    }

    const selfieVideo = document.getElementById('selfie-video');
    const selfieUpload = document.getElementById('selfie-upload-input');
    const filterSelect = document.getElementById('selfie-filter-select');
    const captureButton = document.getElementById('selfie-capture-btn');
    const resetButton = document.getElementById('selfie-reset-btn');
    const downloadButton = document.getElementById('selfie-download-btn');
    const flipButton = document.getElementById('selfie-flip-btn');
    const clearDrawButton = document.getElementById('selfie-clear-draw-btn');
    const clearPropsButton = document.getElementById('selfie-clear-props-btn');
    const propButtons = Array.from(document.querySelectorAll('.selfie-prop-btn'));

    if (!selfieVideo || !captureButton || !filterSelect || !resetButton || !selfieUpload || !downloadButton) {
      return;
    }

    resetSelfieStudio();

    captureButton.addEventListener('click', captureSelfie);
    resetButton.addEventListener('click', resetSelfieStudio);
    filterSelect.addEventListener('change', function () {
      applySelfieFilter(filterSelect.value);
      if (!selfieVideo.hidden) {
        setSelfieStatus('Filter updated. Capture a new selfie to apply it to the image.');
      }
    });

    selfieUpload.addEventListener('change', function () {
      const file = selfieUpload.files && selfieUpload.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        const image = new Image();
        image.onload = function () {
          const selfieCanvas = document.getElementById('selfie-canvas');
          const selfieVideoElement = document.getElementById('selfie-video');
          if (!selfieCanvas) {
            return;
          }
          selfieCanvas.width = image.width;
          selfieCanvas.height = image.height;
          const ctx = selfieCanvas.getContext('2d');
          if (!ctx) {
            return;
          }
          ctx.filter = getSelfieFilterString(filterSelect.value);
          ctx.drawImage(image, 0, 0, selfieCanvas.width, selfieCanvas.height);
          drawOverlayOnCanvas(selfieCanvas);
          selfieCanvas.hidden = false;
          if (selfieVideoElement) {
            selfieVideoElement.hidden = true;
          }
          const downloadButtonEl = document.getElementById('selfie-download-btn');
          if (downloadButtonEl) {
            downloadButtonEl.hidden = false;
            downloadButtonEl.href = selfieCanvas.toDataURL('image/png');
            downloadButtonEl.setAttribute('download', 'arcady-selfie.png');
          }
          setSelfieStatus('Uploaded photo is ready. Use filters, draw, or add props.');
        };
        if (typeof reader.result === 'string') {
          image.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    });

    if (flipButton) {
      flipButton.addEventListener('click', function () {
        toggleCameraInvertMode();
      });
    }
    if (clearDrawButton) {
      clearDrawButton.addEventListener('click', function () {
        clearDoodleCanvas();
        setSelfieStatus('Doodles cleared. Draw again or capture your photo.');
      });
    }
    if (clearPropsButton) {
      clearPropsButton.addEventListener('click', function () {
        setActiveProp('none');
      });
    }
    propButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const prop = button.dataset.selfieProp;
        setActiveProp(prop);
        propButtons.forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
      });
    });

    downloadButton.addEventListener('click', function () {
      setSelfieStatus('Your selfie is downloading. Enjoy!');
    });

    downloadButton.addEventListener('mouseenter', function () {
      const selfieCanvas = document.getElementById('selfie-canvas');
      if (selfieCanvas && !selfieCanvas.hidden) {
        setSelfieStatus('Ready to save your selfie.');
      }
    });

    selfieStudioInitialized = true;

    setupDoodleCanvas();
    updatePropOverlay();

    startSelfieStream();
  }

  function updateVoiceStatus(message) {
    const status = document.getElementById('voice-status');
    if (status) {
      status.textContent = message;
    }
  }

  function getVoiceAudioContext() {
    if (!voiceAudioContext) {
      voiceAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return voiceAudioContext;
  }

  function setupVoiceAudioGraph() {
    const voicePlayer = document.getElementById('voice-player');
    if (!voicePlayer || voiceAudioSource || !window.AudioContext && !window.webkitAudioContext) {
      return;
    }

    try {
      voiceAudioSource = getVoiceAudioContext().createMediaElementSource(voicePlayer);
      voiceFilterNode = getVoiceAudioContext().createBiquadFilter();
      voiceFilterNode.type = 'allpass';
      voiceFilterNode.frequency.value = 1000;
      voiceFilterNode.gain.value = 0;
      voiceAudioSource.connect(voiceFilterNode).connect(getVoiceAudioContext().destination);
    } catch (error) {
      console.warn('Voice audio graph unavailable:', error);
    }
  }

  function updateVoicePlaybackSettings() {
    const pitchInput = document.getElementById('voice-pitch');
    const pitchValue = document.getElementById('voice-pitch-value');
    const toneSelect = document.getElementById('voice-tone-select');
    const voicePlayer = document.getElementById('voice-player');

    voicePlaybackRate = pitchInput ? Number(pitchInput.value) : 1;
    voiceTone = toneSelect ? toneSelect.value : 'none';

    if (voicePlayer) {
      voicePlayer.playbackRate = voicePlaybackRate;
    }
    if (pitchValue) {
      pitchValue.textContent = voicePlaybackRate.toFixed(2) + 'x';
    }

    setupVoiceAudioGraph();
    if (voiceFilterNode) {
      switch (voiceTone) {
        case 'warm':
          voiceFilterNode.type = 'peaking';
          voiceFilterNode.frequency.value = 500;
          voiceFilterNode.gain.value = 4;
          break;
        case 'bright':
          voiceFilterNode.type = 'highshelf';
          voiceFilterNode.frequency.value = 3000;
          voiceFilterNode.gain.value = 6;
          break;
        case 'bass':
          voiceFilterNode.type = 'lowshelf';
          voiceFilterNode.frequency.value = 200;
          voiceFilterNode.gain.value = 8;
          break;
        case 'robot':
          voiceFilterNode.type = 'allpass';
          voiceFilterNode.frequency.value = 1000;
          voiceFilterNode.gain.value = 8;
          break;
        default:
          voiceFilterNode.type = 'allpass';
          voiceFilterNode.frequency.value = 1000;
          voiceFilterNode.gain.value = 0;
          break;
      }
    }

    updateVoiceStatus('Pitch and tone updated. Press Play or Remix when ready.');
  }

  function setVoiceDownload(blob, fileName) {
    const downloadButton = document.getElementById('voice-download-btn');
    if (!downloadButton || !blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    downloadButton.href = url;
    downloadButton.download = fileName;
    downloadButton.hidden = false;
  }

  function encodeWav(audioBuffer) {
    const channels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length * channels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    function writeString(offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    function floatTo16BitPCM(output, offset, input) {
      for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * channels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * 2, true);
    view.setUint16(32, channels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, audioBuffer.length * channels * 2, true);

    if (channels === 2) {
      const left = audioBuffer.getChannelData(0);
      const right = audioBuffer.getChannelData(1);
      let offset = 44;
      for (let i = 0; i < audioBuffer.length; i++) {
        let sample = Math.max(-1, Math.min(1, left[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
        sample = Math.max(-1, Math.min(1, right[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
      }
    } else {
      floatTo16BitPCM(view, 44, audioBuffer.getChannelData(0));
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  function remixVoiceAudio() {
    if (!voiceBlob) {
      updateVoiceStatus('Record a voice clip first, then remix it.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      getVoiceAudioContext().decodeAudioData(reader.result, function (buffer) {
        const offline = new OfflineAudioContext(buffer.numberOfChannels, Math.ceil(buffer.length / voicePlaybackRate), buffer.sampleRate);
        const source = offline.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = voicePlaybackRate;

        const remixFilter = offline.createBiquadFilter();
        switch (voiceTone) {
          case 'warm':
            remixFilter.type = 'peaking';
            remixFilter.frequency.value = 500;
            remixFilter.gain.value = 4;
            break;
          case 'bright':
            remixFilter.type = 'highshelf';
            remixFilter.frequency.value = 3000;
            remixFilter.gain.value = 6;
            break;
          case 'bass':
            remixFilter.type = 'lowshelf';
            remixFilter.frequency.value = 200;
            remixFilter.gain.value = 8;
            break;
          case 'robot':
            remixFilter.type = 'allpass';
            remixFilter.frequency.value = 1200;
            remixFilter.gain.value = 8;
            break;
          default:
            remixFilter.type = 'allpass';
            remixFilter.frequency.value = 1000;
            remixFilter.gain.value = 0;
            break;
        }

        source.connect(remixFilter).connect(offline.destination);
        source.start(0);

        offline.startRendering().then(function (rendered) {
          const remixBlob = encodeWav(rendered);
          setVoiceDownload(remixBlob, 'arcady-voice-remix.wav');
          const voicePlayer = document.getElementById('voice-player');
          if (voicePlayer) {
            voicePlayer.src = URL.createObjectURL(remixBlob);
            voicePlayer.hidden = false;
          }
          updateVoiceStatus('Remix ready. Download your new clip or play it back.');
        });
      });
    };
    reader.readAsArrayBuffer(voiceBlob);
  }

  function clearVoiceStudio() {
    const recordButton = document.getElementById('voice-record-btn');
    const stopButton = document.getElementById('voice-stop-btn');
    const playButton = document.getElementById('voice-play-btn');
    const remixButton = document.getElementById('voice-remix-btn');
    const clearButton = document.getElementById('voice-clear-btn');
    const downloadButton = document.getElementById('voice-download-btn');
    const voicePlayer = document.getElementById('voice-player');

    if (voiceMediaRecorder && voiceMediaRecorder.state !== 'inactive') {
      voiceMediaRecorder.stop();
    }
    if (voiceMicStream) {
      voiceMicStream.getTracks().forEach(function (track) {
        track.stop();
      });
      voiceMicStream = null;
    }

    voiceBlob = null;
    voiceChunks = [];
    if (voicePlayer) {
      voicePlayer.pause();
      voicePlayer.removeAttribute('src');
      voicePlayer.hidden = true;
      voicePlayer.load();
    }
    if (downloadButton) {
      downloadButton.hidden = true;
      downloadButton.removeAttribute('href');
    }
    if (recordButton) {
      recordButton.disabled = false;
    }
    if (stopButton) {
      stopButton.disabled = true;
    }
    if (playButton) {
      playButton.disabled = true;
    }
    if (remixButton) {
      remixButton.disabled = true;
    }
    if (clearButton) {
      clearButton.disabled = true;
    }
    updateVoiceStatus('Cleared voice session. Record a new clip to begin.');
  }

  function startVoiceRecording() {
    const recordButton = document.getElementById('voice-record-btn');
    const stopButton = document.getElementById('voice-stop-btn');
    const playButton = document.getElementById('voice-play-btn');
    const remixButton = document.getElementById('voice-remix-btn');
    const clearButton = document.getElementById('voice-clear-btn');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      updateVoiceStatus('Microphone access is unavailable in this browser.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      voiceMicStream = stream;
      const mimeTypes = ['audio/mpeg', 'audio/webm;codecs=opus', 'audio/webm'];
      let selectedType = '';
      for (let i = 0; i < mimeTypes.length; i += 1) {
        if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mimeTypes[i])) {
          selectedType = mimeTypes[i];
          break;
        }
      }
      try {
        voiceMediaRecorder = new MediaRecorder(stream, selectedType ? { mimeType: selectedType } : undefined);
      } catch (error) {
        voiceMediaRecorder = new MediaRecorder(stream);
      }
      voiceChunks = [];
      voiceMediaRecorder.ondataavailable = function (event) {
        if (event.data && event.data.size) {
          voiceChunks.push(event.data);
        }
      };
      voiceMediaRecorder.onstop = function () {
        voiceBlob = new Blob(voiceChunks, { type: voiceChunks[0] ? voiceChunks[0].type : 'audio/webm' });
        const voicePlayer = document.getElementById('voice-player');
        if (voicePlayer) {
          voicePlayer.src = URL.createObjectURL(voiceBlob);
          voicePlayer.hidden = false;
        }
        let downloadName = 'arcady-voice.wav';
        if (voiceBlob.type === 'audio/mpeg') {
          downloadName = 'arcady-voice.mp3';
        } else if (voiceBlob.type.indexOf('webm') >= 0) {
          downloadName = 'arcady-voice.webm';
        }
        setVoiceDownload(voiceBlob, downloadName);
        if (playButton) {
          playButton.disabled = false;
        }
        if (remixButton) {
          remixButton.disabled = false;
        }
        if (clearButton) {
          clearButton.disabled = false;
        }
        updateVoiceStatus('Recording complete. Play it back, remix it, or download your clip.');
      };

      voiceMediaRecorder.start();
      updateVoiceStatus('Recording voice...');
      if (recordButton) {
        recordButton.disabled = true;
      }
      if (stopButton) {
        stopButton.disabled = false;
      }
      if (playButton) {
        playButton.disabled = true;
      }
      if (remixButton) {
        remixButton.disabled = true;
      }
      if (clearButton) {
        clearButton.disabled = true;
      }
    }).catch(function () {
      updateVoiceStatus('Microphone permissions denied or unavailable.');
    });
  }

  function stopVoiceRecording() {
    const stopButton = document.getElementById('voice-stop-btn');
    if (voiceMediaRecorder && voiceMediaRecorder.state !== 'inactive') {
      voiceMediaRecorder.stop();
    }
    if (stopButton) {
      stopButton.disabled = true;
    }
    updateVoiceStatus('Stopping recording and preparing your clip...');
  }

  function initializeVoiceStudio() {
    if (voiceStudioInitialized) {
      return;
    }

    const recordButton = document.getElementById('voice-record-btn');
    const stopButton = document.getElementById('voice-stop-btn');
    const playButton = document.getElementById('voice-play-btn');
    const pitchInput = document.getElementById('voice-pitch');
    const toneSelect = document.getElementById('voice-tone-select');
    const remixButton = document.getElementById('voice-remix-btn');
    const clearButton = document.getElementById('voice-clear-btn');
    const downloadButton = document.getElementById('voice-download-btn');
    const voicePlayer = document.getElementById('voice-player');

    if (!recordButton || !stopButton || !playButton || !pitchInput || !toneSelect || !remixButton || !clearButton || !downloadButton || !voicePlayer) {
      return;
    }

    recordButton.addEventListener('click', startVoiceRecording);
    stopButton.addEventListener('click', stopVoiceRecording);
    playButton.addEventListener('click', function () {
      if (voicePlayer) {
        setupVoiceAudioGraph();
        updateVoicePlaybackSettings();
        voicePlayer.play().catch(function () {
          updateVoiceStatus('Unable to play audio automatically. Click play again if needed.');
        });
      }
    });
    pitchInput.addEventListener('input', updateVoicePlaybackSettings);
    toneSelect.addEventListener('change', updateVoicePlaybackSettings);
    remixButton.addEventListener('click', remixVoiceAudio);
    clearButton.addEventListener('click', clearVoiceStudio);
    voicePlayer.addEventListener('ended', function () {
      updateVoiceStatus('Playback finished. Try another tone or remix.');
    });

    resetVoiceStudio();
    voiceStudioInitialized = true;
  }

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  const moreMenuButton = document.getElementById("nav-more-btn");
  const moreMenu = document.getElementById("nav-more-menu");
  const floatingWindows = Array.from(document.querySelectorAll("[data-window]"));

  function setMoreMenuOpen(open) {
    moreMenuButton.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      moreMenu.hidden = false;
      requestAnimationFrame(() => moreMenu.classList.add("is-open"));
      return;
    }
    moreMenu.classList.remove("is-open");
    window.setTimeout(() => {
      if (!moreMenu.classList.contains("is-open")) {
        moreMenu.hidden = true;
      }
    }, 220);
  }

  function bringWindowToFront(windowElement) {
    topWindowZIndex += 1;
    windowElement.style.zIndex = String(topWindowZIndex);
  }

  function clampWindowPosition(windowElement) {
    if (!windowElement || windowElement.hidden) {
      return;
    }

    const minGap = 12;
    const minTop = 12;
    const width = windowElement.offsetWidth;
    const height = windowElement.offsetHeight;
    const maxLeft = Math.max(minGap, window.innerWidth - width - minGap);
    const maxTop = Math.max(minTop, window.innerHeight - height - minGap);
    const nextLeft = Math.min(Math.max(windowElement.offsetLeft, minGap), maxLeft);
    const nextTop = Math.min(Math.max(windowElement.offsetTop, minTop), maxTop);

    windowElement.style.left = nextLeft + "px";
    windowElement.style.top = nextTop + "px";
  }

  function centerFloatingWindow(windowElement) {
    const width = windowElement.offsetWidth || parseFloat(getComputedStyle(windowElement).width) || 640;
    const height = windowElement.offsetHeight || parseFloat(getComputedStyle(windowElement).height) || 480;
    const left = Math.max(12, Math.round((window.innerWidth - width) / 2));
    const top = Math.max(104, Math.round((window.innerHeight - height) / 2));

    windowElement.style.left = left + "px";
    windowElement.style.top = top + "px";
    windowElement.dataset.positioned = "true";
  }

  function openFloatingWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement) {
      return;
    }

    windowElement.hidden = false;
    windowElement.classList.remove("is-hidden");
    windowElement.classList.add("is-open");

    if (!windowElement.dataset.positioned) {
      centerFloatingWindow(windowElement);
    } else {
      clampWindowPosition(windowElement);
    }

    bringWindowToFront(windowElement);

    if (windowId === 'selfie-window') {
      initializeSelfieStudio();
    }
    if (windowId === 'voice-window') {
      initializeVoiceStudio();
    }
  }

  function closeFloatingWindow(windowElement) {
    if (!windowElement) {
      return;
    }

    const liveTvVideo = windowElement.querySelector(".home-live-tv-video");
    if (liveTvVideo && !liveTvVideo.paused) {
      liveTvVideo.pause();
    }
    if (windowElement.id === 'selfie-window') {
      stopSelfieStream();
    }

    windowElement.hidden = true;
    windowElement.classList.remove("is-open");
    windowElement.classList.add("is-hidden");
  }

  moreMenuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    setMoreMenuOpen(!moreMenu.classList.contains("is-open"));
  });

  moreMenu.querySelectorAll("[data-window-target], [data-scroll-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      const scrollSel = button.getAttribute("data-scroll-target");
      if (scrollSel) {
        const target = document.querySelector(scrollSel);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setMoreMenuOpen(false);
        return;
      }
      openFloatingWindow(button.dataset.windowTarget);
      setMoreMenuOpen(false);
    });
  });

  floatingWindows.forEach(function (windowElement) {
    const handle = windowElement.querySelector("[data-window-handle]");
    const closeButton = windowElement.querySelector("[data-window-close]");

    windowElement.addEventListener("pointerdown", function () {
      bringWindowToFront(windowElement);
    });

    if (closeButton) {
      closeButton.addEventListener("click", function () {
        closeFloatingWindow(windowElement);
      });
    }

    if (!handle) {
      return;
    }

    handle.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || event.target.closest("button")) {
        return;
      }

      event.preventDefault();
      handle.setPointerCapture(event.pointerId);
      const startRect = windowElement.getBoundingClientRect();
      const pointerOffsetX = event.clientX - startRect.left;
      const pointerOffsetY = event.clientY - startRect.top;

      bringWindowToFront(windowElement);
      windowElement.classList.add("is-dragging");
      windowElement.dataset.positioned = "true";
      document.body.style.userSelect = "none";

      const onPointerMove = function (moveEvent) {
        windowElement.style.left = moveEvent.clientX - pointerOffsetX + "px";
        windowElement.style.top = moveEvent.clientY - pointerOffsetY + "px";
        clampWindowPosition(windowElement);
      };

      const stopDragging = function () {
        windowElement.classList.remove("is-dragging");
        document.body.style.userSelect = "";
        if (handle.hasPointerCapture(event.pointerId)) {
          handle.releasePointerCapture(event.pointerId);
        }
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", stopDragging);
        document.removeEventListener("pointercancel", stopDragging);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", stopDragging);
      document.addEventListener("pointercancel", stopDragging);
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-more")) {
      setMoreMenuOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    setMoreMenuOpen(false);

    const openWindows = floatingWindows.filter(function (windowElement) {
      return !windowElement.hidden;
    });

    if (!openWindows.length) {
      return;
    }

    const topWindow = openWindows
      .slice()
      .sort(function (a, b) {
        return Number(a.style.zIndex || 0) - Number(b.style.zIndex || 0);
      })
      .pop();

    closeFloatingWindow(topWindow);
  });

  window.addEventListener("resize", function () {
    floatingWindows.forEach(clampWindowPosition);
  });
})();
