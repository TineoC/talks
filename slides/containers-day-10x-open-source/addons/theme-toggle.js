// Light/dark toggle for the containers.day deck.
//
// The deck's own stylesheet already defines a full [data-theme="light"] token
// set; nothing in the exported bundle ever opts into it. This adds the opt-in:
// `t` toggles, the choice persists, and `?theme=light` forces light on load
// (handy for a projector that washes out the dark theme).
//
// Two constraints come from the bundle: it replaces documentElement wholesale
// once it finishes unpacking, and it does so asynchronously. So the attribute
// is re-applied whenever the root element is swapped, and the key handler
// lives on window, which survives the swap.
(function () {
  'use strict';

  var STORAGE_KEY = 'containers-day:theme';
  var current = 'dark';

  function stored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // private mode / file:// — fall through to the default
    }
  }

  function persist(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* not fatal — the theme still applies for this session */
    }
  }

  // A few cards carry an inline "white glass" background (rgba(255,255,255,α))
  // instead of the --bg-glass token, so they turn white-on-white in light mode
  // — the career.log terminal on the cover is the visible one. Inline styles
  // can't be overridden by a stylesheet on their own, and matching them with an
  // attribute selector depends on exact spacing, so tag them here and let CSS
  // (addons/head.html) restyle the tagged elements.
  function tagGlass() {
    var els = document.querySelectorAll('[style*="rgba(255"]');
    for (var i = 0; i < els.length; i++) {
      var style = els[i].getAttribute('style') || '';
      var m = style.match(/background(?:-color)?:\s*rgba\(255,\s*255,\s*255,\s*(0?\.\d+|\d)\)/);
      if (m && parseFloat(m[1]) <= 0.2) els[i].setAttribute('data-glass-surface', '');
    }
  }

  function apply(theme) {
    var root = document.documentElement;
    if (!root) return;
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    tagGlass();
  }

  var forced = /[?&]theme=light\b/.test(window.location.search) ? 'light' : null;
  current = forced || (stored() === 'light' ? 'light' : 'dark');
  apply(current);

  // Two things need re-applying: documentElement is replaced wholesale when the
  // bundle mounts the deck (dropping the attribute set above), and slides are
  // rendered lazily as you navigate (bringing in untagged glass cards). One
  // rAF-debounced observer covers both.
  var scheduled = false;
  new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      apply(current);
    });
  }).observe(document, { childList: true, subtree: true });

  // Capture phase, and the event is swallowed: the deck runtime advances a
  // slide on any key, so a bubbling handler would toggle the theme AND jump
  // forward. Capturing on window runs before the runtime's own listener.
  window.addEventListener(
    'keydown',
    function (e) {
      if (e.key !== 't' && e.key !== 'T') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var el = e.target;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      current = current === 'light' ? 'dark' : 'light';
      apply(current);
      persist(current);
    },
    true
  );
})();
