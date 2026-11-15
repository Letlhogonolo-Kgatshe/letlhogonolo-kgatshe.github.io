// Site style switcher: Quiet, Showcase or Midnight (the default).
// The choice is remembered in this browser only. The page head applies it
// before anything is drawn, so there is no flash of the wrong style.
(function () {
  var STYLES = ['quiet', 'showcase', 'midnight'];
  var THEME_COLOR = { quiet: '#f6f6f4', showcase: '#ffffff', midnight: '#0b1020' };
  var root = document.documentElement;

  function loadFonts(style) {
    if (style !== 'showcase' || document.getElementById('font-showcase')) return;
    var link = document.createElement('link');
    link.id = 'font-showcase';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  function apply(style, save) {
    if (STYLES.indexOf(style) < 0) style = 'midnight';
    root.setAttribute('data-style', style);
    loadFonts(style);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[style]);
    document.querySelectorAll('[data-style-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-style-set') === style));
    });
    if (save) { try { localStorage.setItem('site-style', style); } catch (e) { /* private mode: still switches */ } }
  }

  apply(root.getAttribute('data-style'), false);
  document.querySelectorAll('[data-style-set]').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-style-set'), true); });
  });
})();
