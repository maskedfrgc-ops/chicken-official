(function () {
  const faviconOptions = [
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/checking-you-out-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/fire-punch-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/hold-up-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/mewing-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/partying-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/praying-please-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/raised-eyebrow-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/rose-in-teeth-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/shock-blue-emoji-blue.png',
    'https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/favicon/shrug-blue-emoji-blue.png'
  ];

  const defaultFavicon = faviconOptions[0];

  function ensureLink(rel) {
    let link = document.head.querySelector('link[rel="' + rel + '"][data-arcady-favicon]');

    if (!link) {
      link = document.head.querySelector('link[rel="' + rel + '"]');
    }

    if (!link) {
      link = document.createElement('link');
      document.head.appendChild(link);
    }

    link.rel = rel;
    link.setAttribute('data-arcady-favicon', 'true');
    return link;
  }

  function setFavicon(url) {
    const faviconUrl = url || defaultFavicon;
    const iconLink = ensureLink('icon');
    const shortcutIconLink = ensureLink('shortcut icon');
    const appleTouchIconLink = ensureLink('apple-touch-icon');

    iconLink.type = 'image/png';
    shortcutIconLink.type = 'image/png';

    iconLink.href = faviconUrl;
    shortcutIconLink.href = faviconUrl;
    appleTouchIconLink.href = faviconUrl;

    syncNavLogoFavicon(faviconUrl);
  }

  function syncNavLogoFavicon(url) {
    const navLogos = document.querySelectorAll('.nav-logo');

    navLogos.forEach(function (navLogo) {
      let faviconImage = navLogo.querySelector('.nav-logo-favicon');

      if (!faviconImage) {
        faviconImage = document.createElement('img');
        faviconImage.className = 'nav-logo-favicon';
        faviconImage.alt = 'Arcady favicon';
        navLogo.insertBefore(faviconImage, navLogo.firstChild);
      }

      faviconImage.src = url || defaultFavicon;
    });
  }

  function getStoredFavicon() {
    try {
      return localStorage.getItem('tabFavicon');
    } catch (error) {
      return null;
    }
  }

  function getRandomFavicon() {
    const randomIndex = Math.floor(Math.random() * faviconOptions.length);
    return faviconOptions[randomIndex] || defaultFavicon;
  }

  function applyPageFavicon() {
    const storedFavicon = getStoredFavicon();

    if (storedFavicon) {
      setFavicon(storedFavicon);
      return storedFavicon;
    }

    const randomFavicon = getRandomFavicon();
    setFavicon(randomFavicon);
    return randomFavicon;
  }

  window.ArcadyFavicon = {
    apply: applyPageFavicon,
    defaultIcon: defaultFavicon,
    options: faviconOptions.slice(),
    set: setFavicon
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPageFavicon, { once: true });
  } else {
    applyPageFavicon();
  }
})();
