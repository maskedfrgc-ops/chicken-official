(function () {
  if (window.ARCADY_MUSIC_PLAYER_BOOTED) {
    return;
  }
  window.ARCADY_MUSIC_PLAYER_BOOTED = true;

  const MUSIC_API_URL = "https://api.github.com/repos/arcady-web/arcady-web.github.io/contents/features/actual-music?ref=main";
  const MUSIC_CDN_BASE = "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/actual-music/";
  const REQUEST_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeAkpO7rEEYsM9CsEB3DTLCw2IByCr-OsfNqN6gk-ga24HgqA/viewform";
  const STORAGE_KEYS = {
    favorites: "arcadyMusicFavorites",
    lastTrack: "arcadyMusicLastTrack",
    lastVolume: "arcadyMusicVolume",
    playback: "arcadyMusicPlayback"
  };
  const FALLBACK_TRACKS = [
    "CUCO Lover Is a Day Audio.mp3",
    "Cuco Hydrocodone Official Lyric Video.mp3",
    "Epstein Fuck Niggas (EFN).mp3",
    "Laufey From The Start Official Music Video.mp3",
    "Sienna.mp3",
    "Tyler, The Creator - See You Again (Audio) ft. Kali Uchis.mp3",
    "Powfu - death bed (coffee for your head) (Official Video) ft. beabadoobee.mp3",
    "Laufey - Lover Girl (Official Music Video).mp3",
    "505.mp3",
    "stephanie.mp3",
    "Super Shy - New Jeans.mp3",
    "Nope your too late i already died.mp3",
    "Cradles.mp3",
    "Lovefool.mp3",
    "No Surprises.mp3",
    "Notion.mp3",
    "No Surprises.mp3",
    "Lovefool.mp3",
    "YoungBoy Never Broke Again - Preach (Official Audio).mp3",
    "King Von - Took Her To The O.mp3",
  ].map(function (fileName) {
    return {
      file: fileName,
      url: MUSIC_CDN_BASE + encodeURIComponent(fileName)
    };
  });

  let popoutWindow = null;

  mountPlayer(window, {
    popout: false
  });

  function mountPlayer(targetWindow, options) {
    if (!targetWindow || targetWindow.closed) {
      return null;
    }

    const popout = !!(options && options.popout);
    const doc = prepareDocument(targetWindow, popout);
    const mountKey = popout ? "__ARCADY_POP_MUSIC_MOUNTED__" : "__ARCADY_INLINE_MUSIC_MOUNTED__";

    if (targetWindow[mountKey]) {
      if (popout) {
        targetWindow.focus();
      }
      return targetWindow[mountKey];
    }

    injectStyles(doc, popout);

    const state = {
      popout: popout,
      win: targetWindow,
      doc: doc,
      favorites: new Set(readStoredJson(STORAGE_KEYS.favorites, [])),
      tracks: buildTrackList(FALLBACK_TRACKS),
      query: "",
      filterMode: "all",
      playbackSnapshot: readPlaybackSnapshot(),
      currentTrackId: "",
      pendingResumeTime: 0,
      pendingResumePlay: false,
      lastPlaybackSavedAt: 0,
      controls: {}
    };

    state.currentTrackId = String(
      (state.playbackSnapshot && state.playbackSnapshot.trackId) ||
      localStorage.getItem(STORAGE_KEYS.lastTrack) ||
      ""
    ).trim();
    state.pendingResumeTime = Number(state.playbackSnapshot && state.playbackSnapshot.time || 0);
    state.pendingResumePlay = !!(state.playbackSnapshot && state.playbackSnapshot.playing);

    const root = doc.createElement("div");
    root.className = popout ? "arcady-music-root is-popout" : "arcady-music-root";
    root.innerHTML = popout ? buildPopoutMarkup() : buildInlineMarkup();
    doc.body.appendChild(root);

    state.root = root;
    state.controls.orb = root.querySelector("[data-music-orb]");
    state.controls.panel = root.querySelector("[data-music-panel]");
    state.controls.close = root.querySelector("[data-music-close]");
    state.controls.popout = root.querySelector("[data-music-popout]");
    state.controls.search = root.querySelector("[data-music-search]");
    state.controls.requestLink = root.querySelector("[data-music-request-link]");
    state.controls.libraryStatus = root.querySelector("[data-music-library-status]");
    state.controls.count = root.querySelector("[data-music-count]");
    state.controls.list = root.querySelector("[data-music-list]");
    state.controls.currentTitle = root.querySelector("[data-music-current-title]");
    state.controls.currentMeta = root.querySelector("[data-music-current-meta]");
    state.controls.playToggle = root.querySelector("[data-music-play-toggle]");
    state.controls.prev = root.querySelector("[data-music-prev]");
    state.controls.next = root.querySelector("[data-music-next]");
    state.controls.favoriteCurrent = root.querySelector("[data-music-favorite-current]");
    state.controls.audio = root.querySelector("[data-music-audio]");
    state.controls.filters = Array.prototype.slice.call(root.querySelectorAll("[data-music-filter]"));

    targetWindow[mountKey] = state;

    bindUi(state);
    hydrateAudioState(state);
    renderAll(state);
    loadRemoteTracks(state);

    if (popout) {
      targetWindow.addEventListener("beforeunload", function () {
        if (popoutWindow === targetWindow) {
          popoutWindow = null;
        }
      });
      targetWindow.focus();
    }

    return state;
  }

  function prepareDocument(targetWindow, popout) {
    const doc = targetWindow.document;

    if (popout) {
      doc.open();
      doc.write(
        "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Arcady Music Player</title></head><body></body></html>"
      );
      doc.close();
    }

    return doc;
  }

  function buildInlineMarkup() {
    return (
      '<button class="arcady-music-orb" type="button" data-music-orb aria-label="Open music player">' +
        '<span class="arcady-music-orb-bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
      "</button>" +
      buildPanelMarkup(false)
    );
  }

  function buildPopoutMarkup() {
    return buildPanelMarkup(true);
  }

  function buildPanelMarkup(isPopout) {
    return (
      '<section class="arcady-music-panel' + (isPopout ? " is-open is-popout" : "") + '" data-music-panel>' +
        '<div class="arcady-music-panel-shell">' +
          '<div class="arcady-music-head">' +
            '<div>' +
              '<div class="arcady-music-kicker">Arcady Audio</div>' +
              '<h2 class="arcady-music-title">Music Player</h2>' +
            "</div>" +
            '<div class="arcady-music-head-actions">' +
              (isPopout ? "" : '<button class="arcady-music-head-button" type="button" data-music-popout>Pop Out</button>') +
              (isPopout ? "" : '<button class="arcady-music-head-button" type="button" data-music-close>Close</button>') +
            "</div>" +
          "</div>" +
          '<section class="arcady-music-now">' +
            '<div class="arcady-music-current-title" data-music-current-title>No song selected</div>' +
            '<div class="arcady-music-current-meta" data-music-current-meta>Pick a track from the Arcady library.</div>' +
            '<div class="arcady-music-control-row">' +
              '<button class="arcady-music-button" type="button" data-music-prev>Prev</button>' +
              '<button class="arcady-music-button is-primary" type="button" data-music-play-toggle>Play</button>' +
              '<button class="arcady-music-button" type="button" data-music-next>Next</button>' +
              '<button class="arcady-music-button" type="button" data-music-favorite-current>Save</button>' +
            "</div>" +
            '<audio class="arcady-music-audio" data-music-audio controls preload="none"></audio>' +
          "</section>" +
          '<section class="arcady-music-library">' +
            '<label class="arcady-music-label" for="arcady-music-search-' + (isPopout ? "pop" : "inline") + '">Search Music</label>' +
            '<input id="arcady-music-search-' + (isPopout ? "pop" : "inline") + '" class="arcady-music-input" type="text" data-music-search placeholder="Search by title">' +
            '<div class="arcady-music-filter-row">' +
              '<button class="arcady-music-filter is-active" type="button" data-music-filter="all">All Songs</button>' +
              '<button class="arcady-music-filter" type="button" data-music-filter="favorites">Favorites</button>' +
            "</div>" +
            '<div class="arcady-music-meta-row">' +
              '<div class="arcady-music-library-status" data-music-library-status>Loading Arcady tracks...</div>' +
              '<div class="arcady-music-count" data-music-count>0 songs</div>' +
            "</div>" +
            '<div class="arcady-music-list" data-music-list></div>' +
          "</section>" +
          '<section class="arcady-music-request-card">' +
            '<div class="arcady-music-label">Request A Song</div>' +
            '<div class="arcady-music-request-status">Use the Arcady request form to submit a song.</div>' +
            '<button class="arcady-music-button is-primary" type="button" data-music-request-link>Open Request Form</button>' +
          "</section>" +
        "</div>" +
      "</section>"
    );
  }

  function bindUi(state) {
    const controls = state.controls;

    if (controls.orb) {
      controls.orb.addEventListener("click", function () {
        controls.panel.classList.toggle("is-open");
      });
    }

    if (controls.close) {
      controls.close.addEventListener("click", function () {
        controls.panel.classList.remove("is-open");
      });
    }

    if (controls.popout) {
      controls.popout.addEventListener("click", function () {
        openPopoutWindow();
      });
    }

    if (controls.search) {
      controls.search.addEventListener("input", function () {
        state.query = String(controls.search.value || "").trim().toLowerCase();
        renderTrackList(state);
      });
    }

    controls.filters.forEach(function (button) {
      button.addEventListener("click", function () {
        state.filterMode = button.getAttribute("data-music-filter") === "favorites" ? "favorites" : "all";
        renderTrackList(state);
      });
    });

    if (controls.prev) {
      controls.prev.addEventListener("click", function () {
        playRelativeTrack(state, -1);
      });
    }

    if (controls.next) {
      controls.next.addEventListener("click", function () {
        playRelativeTrack(state, 1);
      });
    }

    if (controls.playToggle) {
      controls.playToggle.addEventListener("click", function () {
        togglePlayback(state);
      });
    }

    if (controls.favoriteCurrent) {
      controls.favoriteCurrent.addEventListener("click", function () {
        const currentTrack = getCurrentTrack(state);
        if (!currentTrack) {
          return;
        }
        toggleFavorite(state, currentTrack.id);
      });
    }

    if (controls.audio) {
      controls.audio.addEventListener("play", function () {
        persistPlaybackState(state, true);
        renderNowPlaying(state);
        renderTrackList(state);
      });
      controls.audio.addEventListener("pause", function () {
        persistPlaybackState(state, true);
        renderNowPlaying(state);
        renderTrackList(state);
      });
      controls.audio.addEventListener("ended", function () {
        playRelativeTrack(state, 1);
      });
      controls.audio.addEventListener("timeupdate", function () {
        persistPlaybackState(state);
      });
      controls.audio.addEventListener("volumechange", function () {
        localStorage.setItem(STORAGE_KEYS.lastVolume, String(clamp(controls.audio.volume, 0, 1)));
      });
    }

    if (controls.requestLink) {
      controls.requestLink.addEventListener("click", function () {
        window.open(REQUEST_FORM_URL, "_blank", "noopener,noreferrer");
      });
    }

    if (controls.list) {
      controls.list.addEventListener("click", function (event) {
        const playButton = event.target.closest("[data-track-id]");
        if (playButton) {
          const trackId = playButton.getAttribute("data-track-id");
          const action = playButton.getAttribute("data-track-action");

          if (action === "favorite") {
            toggleFavorite(state, trackId);
            return;
          }

          selectTrack(state, trackId, true);
        }
      });
    }

    state.win.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && controls.panel && !state.popout) {
        controls.panel.classList.remove("is-open");
      }
    });

    state.win.addEventListener("pagehide", function () {
      persistPlaybackState(state, true);
    });

    state.win.addEventListener("beforeunload", function () {
      persistPlaybackState(state, true);
    });
  }

  function hydrateAudioState(state) {
    const audio = state.controls.audio;
    if (!audio) {
      return;
    }

    const storedVolume = Number(localStorage.getItem(STORAGE_KEYS.lastVolume));
    audio.defaultMuted = false;
    audio.muted = false;
    audio.volume = Number.isFinite(storedVolume) && storedVolume > 0 ? clamp(storedVolume, 0, 1) : 0.85;

    if (state.currentTrackId) {
      selectTrack(state, state.currentTrackId, false);
      restorePlaybackState(state);
    }
  }

  async function loadRemoteTracks(state) {
    state.controls.libraryStatus.textContent = "Loading Arcady tracks...";

    try {
      const response = await fetch(MUSIC_API_URL, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load Arcady music library.");
      }

      const data = await response.json();
      const tracks = buildTrackList((Array.isArray(data) ? data : []).map(function (item) {
        if (!item || item.type !== "file" || !/\.mp3$/i.test(String(item.name || ""))) {
          return null;
        }

        return {
          file: item.name,
          url: MUSIC_CDN_BASE + encodeURIComponent(String(item.name || ""))
        };
      }));

      if (tracks.length) {
        state.tracks = tracks;
        if (state.currentTrackId && !getCurrentTrack(state)) {
          selectTrack(state, state.currentTrackId, false);
          restorePlaybackState(state);
        }
      }

      state.controls.libraryStatus.textContent = "Loaded from Arcady actual-music.";
    } catch (error) {
      console.warn("Arcady music library fallback in use:", error);
      state.controls.libraryStatus.textContent = "Using built-in Arcady fallback tracks.";
    }

    renderAll(state);
  }

  function renderAll(state) {
    renderNowPlaying(state);
    renderTrackList(state);
  }

  function renderNowPlaying(state) {
    const controls = state.controls;
    const currentTrack = getCurrentTrack(state);
    const isPlaying = !!(controls.audio && currentTrack && !controls.audio.paused);

    controls.currentTitle.textContent = currentTrack ? currentTrack.label : "No song selected";
    controls.currentMeta.textContent = currentTrack
      ? (isPlaying ? "Now playing from Arcady actual-music." : "Ready to play.")
      : "Pick a track from the Arcady library.";
    controls.playToggle.textContent = isPlaying ? "Pause" : "Play";
    controls.favoriteCurrent.textContent = currentTrack && isFavorite(state, currentTrack.id) ? "Saved" : "Save";
  }

  function renderTrackList(state) {
    const query = state.query;
    const matches = state.tracks.filter(function (track) {
      if (state.filterMode === "favorites" && !isFavorite(state, track.id)) {
        return false;
      }
      if (!query) {
        return true;
      }
      return track.label.toLowerCase().indexOf(query) !== -1;
    });

    state.controls.filters.forEach(function (button) {
      const isActive = button.getAttribute("data-music-filter") === state.filterMode;
      button.classList.toggle("is-active", isActive);
    });

    state.controls.count.textContent = matches.length + (matches.length === 1 ? " song" : " songs");

    if (!matches.length) {
      state.controls.list.innerHTML =
        '<div class="arcady-music-empty">No songs match that search yet. Try another title or save some favorites.</div>';
      return;
    }

    state.controls.list.innerHTML = matches.map(function (track) {
      const currentTrack = getCurrentTrack(state);
      const isCurrent = currentTrack && currentTrack.id === track.id;
      const saved = isFavorite(state, track.id);
      return (
        '<article class="arcady-music-track' + (isCurrent ? " is-current" : "") + '">' +
          '<div class="arcady-music-track-copy">' +
            '<div class="arcady-music-track-title">' + escapeHtml(track.label) + "</div>" +
            '<div class="arcady-music-track-meta">' + (saved ? "Saved favorite" : "Arcady library track") + "</div>" +
          "</div>" +
          '<div class="arcady-music-track-actions">' +
            '<button class="arcady-music-chip" type="button" data-track-action="play" data-track-id="' + escapeHtml(track.id) + '">' + (isCurrent ? "Replay" : "Play") + "</button>" +
            '<button class="arcady-music-chip' + (saved ? " is-active" : "") + '" type="button" data-track-action="favorite" data-track-id="' + escapeHtml(track.id) + '">' + (saved ? "Saved" : "Save") + "</button>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function selectTrack(state, trackId, autoplay) {
    const track = state.tracks.find(function (item) {
      return item.id === trackId;
    });
    if (!track || !state.controls.audio) {
      return;
    }

    state.currentTrackId = track.id;
    localStorage.setItem(STORAGE_KEYS.lastTrack, track.id);
    state.controls.audio.defaultMuted = false;
    state.controls.audio.muted = false;

    if (state.controls.audio.src !== track.url) {
      state.controls.audio.src = track.url;
    }

    if (autoplay) {
      const playPromise = state.controls.audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          state.controls.currentMeta.textContent = "Press play to start audio on this page.";
        });
      }
    } else {
      state.controls.audio.load();
    }

    persistPlaybackState(state, true);
    renderNowPlaying(state);
    renderTrackList(state);
  }

  function togglePlayback(state) {
    const audio = state.controls.audio;
    if (!audio) {
      return;
    }

    if (!state.currentTrackId && state.tracks.length) {
      selectTrack(state, state.tracks[0].id, true);
      return;
    }

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          state.controls.currentMeta.textContent = "Press play again if your browser blocked autoplay.";
        });
      }
    } else {
      audio.pause();
    }
  }

  function playRelativeTrack(state, offset) {
    if (!state.tracks.length) {
      return;
    }

    const currentIndex = Math.max(0, state.tracks.findIndex(function (track) {
      return track.id === state.currentTrackId;
    }));
    const nextIndex = (currentIndex + offset + state.tracks.length) % state.tracks.length;
    selectTrack(state, state.tracks[nextIndex].id, true);
  }

  function toggleFavorite(state, trackId) {
    if (!trackId) {
      return;
    }

    if (state.favorites.has(trackId)) {
      state.favorites.delete(trackId);
    } else {
      state.favorites.add(trackId);
    }

    writeStoredJson(STORAGE_KEYS.favorites, Array.from(state.favorites));
    renderNowPlaying(state);
    renderTrackList(state);
  }

  function isFavorite(state, trackId) {
    return state.favorites.has(trackId);
  }

  function getCurrentTrack(state) {
    return state.tracks.find(function (track) {
      return track.id === state.currentTrackId;
    }) || null;
  }

  function openPopoutWindow() {
    if (popoutWindow && !popoutWindow.closed) {
      popoutWindow.focus();
      return;
    }

    popoutWindow = window.open("", "ArcadyMusicPlayer", "width=460,height=760,resizable=yes,scrollbars=no");

    if (!popoutWindow) {
      return;
    }

    mountPlayer(popoutWindow, {
      popout: true
    });
  }

  function buildTrackList(items) {
    return (Array.isArray(items) ? items : []).reduce(function (list, item) {
      if (!item || !item.url) {
        return list;
      }

      const url = String(item.url || "").trim();
      if (!url) {
        return list;
      }

      const file = String(item.file || url.split("/").pop() || "").trim();
      const label = formatTrackLabel(file);
      list.push({
        id: url,
        url: url,
        file: file,
        label: label
      });
      return list;
    }, []);
  }

  function formatTrackLabel(file) {
    const decoded = decodeSafe(String(file || ""));
    return decoded
      .replace(/\.mp3$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Track";
  }

  function decodeSafe(value) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  }

  function readStoredJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStoredJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readPlaybackSnapshot() {
    const saved = readStoredJson(STORAGE_KEYS.playback, null);
    if (!saved || typeof saved !== "object") {
      return null;
    }

    return {
      trackId: String(saved.trackId || "").trim(),
      time: Math.max(0, Number(saved.time || 0) || 0),
      playing: saved.playing === true
    };
  }

  function persistPlaybackState(state, force) {
    const audio = state.controls.audio;
    if (!audio || !state.currentTrackId) {
      return;
    }

    const now = Date.now();
    if (!force && now - state.lastPlaybackSavedAt < 800) {
      return;
    }
    state.lastPlaybackSavedAt = now;

    writeStoredJson(STORAGE_KEYS.playback, {
      trackId: state.currentTrackId,
      time: Math.max(0, Number(audio.currentTime || 0) || 0),
      playing: !audio.paused,
      updatedAt: now
    });
  }

  function restorePlaybackState(state) {
    const audio = state.controls.audio;
    if (!audio || !state.currentTrackId) {
      return;
    }

    const resumeTime = Math.max(0, Number(state.pendingResumeTime || 0) || 0);
    const resumePlay = state.pendingResumePlay === true;

    if (!resumeTime && !resumePlay) {
      return;
    }

    const applyResume = function () {
      audio.defaultMuted = false;
      audio.muted = false;

      if (resumeTime > 0) {
        try {
          audio.currentTime = resumeTime;
        } catch (error) {
        }
      }

      state.pendingResumeTime = 0;

      if (resumePlay) {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            state.controls.currentMeta.textContent = "Playback was restored. Press play if the browser paused it.";
          });
        }
      }

      state.pendingResumePlay = false;
      persistPlaybackState(state, true);
      renderNowPlaying(state);
    };

    if (audio.readyState >= 1) {
      applyResume();
      return;
    }

    audio.addEventListener("loadedmetadata", applyResume, {
      once: true
    });
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function injectStyles(doc, popout) {
    const styleId = popout ? "arcady-music-popout-styles" : "arcady-music-styles";
    if (doc.getElementById(styleId)) {
      return;
    }

    const style = doc.createElement("style");
    style.id = styleId;
    style.textContent = `
      body {
        ${popout ? "margin: 0; min-height: 100vh; background: radial-gradient(circle at top, rgba(84, 174, 255, 0.34), rgba(5, 10, 24, 0.98) 60%); color: #f6fbff;" : ""}
      }

      .arcady-music-root {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147482600;
        font-family: "Fredoka", system-ui, -apple-system, sans-serif;
      }

      .arcady-music-root.is-popout {
        position: static;
        min-height: 100vh;
        pointer-events: auto;
      }

      .arcady-music-orb {
        position: fixed;
        left: 18px;
        bottom: 18px;
        width: 62px;
        height: 62px;
        border: 1px solid rgba(255, 255, 255, 0.36);
        border-radius: 999px;
        background:
          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.18) 42%, rgba(74, 222, 128, 0.22) 70%, rgba(22, 163, 74, 0.62)),
          linear-gradient(135deg, rgba(134, 239, 172, 0.68), rgba(21, 128, 61, 0.76));
        box-shadow: 0 14px 35px rgba(2, 12, 27, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(18px) saturate(180%);
        -webkit-backdrop-filter: blur(18px) saturate(180%);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        pointer-events: auto;
        transition: transform 0.22s ease, box-shadow 0.22s ease;
      }

      .arcady-music-orb:hover {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 18px 42px rgba(2, 12, 27, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.75);
      }

      .arcady-music-orb-bars {
        display: inline-flex;
        align-items: end;
        gap: 4px;
        height: 22px;
      }

      .arcady-music-orb-bars span {
        width: 5px;
        border-radius: 999px;
        background: rgba(5, 26, 43, 0.86);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.45);
        animation: arcady-music-bars 1.2s ease-in-out infinite;
      }

      .arcady-music-orb-bars span:nth-child(1) {
        height: 12px;
      }

      .arcady-music-orb-bars span:nth-child(2) {
        height: 20px;
        animation-delay: 0.12s;
      }

      .arcady-music-orb-bars span:nth-child(3) {
        height: 15px;
        animation-delay: 0.24s;
      }

      .arcady-music-panel {
        position: fixed;
        left: 18px;
        top: 18px;
        bottom: 92px;
        width: min(360px, calc(100vw - 24px));
        opacity: 0;
        transform: translateY(16px) scale(0.98);
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        pointer-events: none;
        overflow: hidden;
      }

      .arcady-music-panel.is-open,
      .arcady-music-panel.is-popout {
        opacity: 1;
        transform: translateY(0) scale(1);
        visibility: visible;
        pointer-events: auto;
      }

      .arcady-music-panel.is-popout {
        position: relative;
        left: auto;
        bottom: auto;
        width: min(100vw, 100%);
        max-height: none;
        min-height: 100vh;
        padding: 18px;
      }

      .arcady-music-panel-shell {
        display: grid;
        gap: 14px;
        padding: 14px;
        height: 100%;
        max-height: calc(100dvh - 110px);
        border-radius: 28px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.09)),
          radial-gradient(circle at top left, rgba(125, 211, 252, 0.25), transparent 48%);
        box-shadow: 0 26px 60px rgba(2, 12, 27, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.55);
        backdrop-filter: blur(24px) saturate(185%);
        -webkit-backdrop-filter: blur(24px) saturate(185%);
        color: #f8fcff;
        overflow: auto;
      }

      .arcady-music-head,
      .arcady-music-meta-row,
      .arcady-music-control-row,
      .arcady-music-request-row,
      .arcady-music-filter-row,
      .arcady-music-track,
      .arcady-music-track-actions {
        display: flex;
        align-items: center;
      }

      .arcady-music-head,
      .arcady-music-meta-row,
      .arcady-music-track {
        justify-content: space-between;
      }

      .arcady-music-head-actions,
      .arcady-music-control-row,
      .arcady-music-request-row,
      .arcady-music-filter-row,
      .arcady-music-track-actions {
        gap: 8px;
      }

      .arcady-music-kicker {
        font-size: 0.72rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        opacity: 0.72;
      }

      .arcady-music-title {
        margin: 4px 0 0;
        font-size: 1.28rem;
      }

      .arcady-music-head-button,
      .arcady-music-button,
      .arcady-music-filter,
      .arcady-music-chip {
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.14);
        color: inherit;
        padding: 0.58rem 0.78rem;
        font: inherit;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
      }

      .arcady-music-head-button:hover,
      .arcady-music-button:hover,
      .arcady-music-filter:hover,
      .arcady-music-chip:hover {
        background: rgba(255, 255, 255, 0.22);
        transform: translateY(-1px);
      }

      .arcady-music-button.is-primary,
      .arcady-music-filter.is-active,
      .arcady-music-chip.is-active {
        background: rgba(74, 222, 128, 0.24);
        border-color: rgba(134, 239, 172, 0.55);
      }

      .arcady-music-now,
      .arcady-music-library,
      .arcady-music-request-card {
        display: grid;
        gap: 10px;
        padding: 12px;
        border-radius: 20px;
        background: rgba(7, 14, 28, 0.28);
        border: 1px solid rgba(255, 255, 255, 0.12);
      }

      .arcady-music-current-title {
        font-size: 0.98rem;
        font-weight: 700;
      }

      .arcady-music-current-meta,
      .arcady-music-library-status,
      .arcady-music-request-status,
      .arcady-music-track-meta,
      .arcady-music-request-meta {
        font-size: 0.82rem;
        opacity: 0.78;
      }

      .arcady-music-label {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        opacity: 0.82;
      }

      .arcady-music-input,
      .arcady-music-audio {
        width: 100%;
      }

      .arcady-music-input {
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.12);
        color: inherit;
        padding: 0.72rem 0.82rem;
        font: inherit;
        font-size: 0.92rem;
      }

      .arcady-music-input::placeholder {
        color: rgba(248, 252, 255, 0.62);
      }

      .arcady-music-input:focus {
        outline: none;
        border-color: rgba(125, 211, 252, 0.55);
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
      }

      .arcady-music-list,
      .arcady-music-request-list {
        display: grid;
        gap: 10px;
        max-height: 220px;
        overflow: auto;
        padding-right: 4px;
      }

      .arcady-music-track,
      .arcady-music-request-item,
      .arcady-music-empty {
        padding: 10px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .arcady-music-track.is-current {
        background: rgba(56, 189, 248, 0.14);
        border-color: rgba(125, 211, 252, 0.34);
      }

      .arcady-music-track-copy {
        min-width: 0;
        padding-right: 10px;
      }

      .arcady-music-track-title,
      .arcady-music-request-name {
        font-weight: 700;
        font-size: 0.92rem;
        word-break: break-word;
      }

      .arcady-music-empty {
        text-align: center;
        opacity: 0.78;
      }

      .arcady-music-empty.is-tight {
        padding: 10px 12px;
      }

      .arcady-music-request-row .arcady-music-input {
        flex: 1 1 auto;
      }

      @keyframes arcady-music-bars {
        0%, 100% { transform: scaleY(0.8); }
        50% { transform: scaleY(1.18); }
      }

      @media (max-width: 640px) {
        .arcady-music-panel {
          left: 12px;
          right: 12px;
          top: 12px;
          bottom: 86px;
          width: auto;
        }

        .arcady-music-panel-shell {
          padding: 12px;
          max-height: calc(100dvh - 104px);
        }

        .arcady-music-head,
        .arcady-music-request-row,
        .arcady-music-track {
          flex-direction: column;
          align-items: stretch;
        }

        .arcady-music-track-actions,
        .arcady-music-control-row {
          flex-wrap: wrap;
        }

        .arcady-music-head-actions {
          margin-top: 10px;
        }
      }
    `;
    doc.head.appendChild(style);
  }
})();
