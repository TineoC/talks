// Content patches for the containers.day deck.
//
// index.html is generated output (Claude Design export) and must not be
// hand-edited — a re-export would drop the change. These fixes are applied to
// the rendered DOM instead. When the deck is next re-exported with them baked
// in, delete the matching entry here.
//
// Same two constraints as theme-toggle.js: the bundle replaces documentElement
// when it mounts, and slides render lazily as you navigate — so both passes run
// again on a rAF-debounced observer.
(function () {
  'use strict';


  // Exact source text -> replacement. Matched against a trimmed text node.
  var REWRITES = [
    ['Release Communications Shadow · Kubernetes 1.37', 'Contributor Communications - SIG Contribex'],
    ['Kubernetes v1.37 Sneak Peek', 'K8s v1.37 Release Communications Shadow'],
  ];

  // Lines the deck styles with --text-muted that should read at full strength.
  var EMPHASIZE = [
    '"Lo veremos cuando tengamos más tiempo."',
    'Necesitaba verlo con mis propios ojos.',
  ];

  // These rules can't live in addons/head.html: the bundle replaces
  // documentElement when it mounts, dropping any <style> injected into the
  // original head. Re-appending from the observer below outlives the swap.
  // White on the dark theme; the light theme's own primary text color there,
  // since white would vanish on a bright page.
  var STYLE_ID = 'deck-patches-style';
  var CSS =
    '[data-force-contrast]{color:#fff !important}' +
    '[data-theme="light"] [data-force-contrast]{color:var(--text-primary) !important}';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function rewrite() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var text = node.nodeValue.trim();
      if (!text) continue;
      for (var i = 0; i < REWRITES.length; i++) {
        if (text === REWRITES[i][0]) node.nodeValue = node.nodeValue.replace(REWRITES[i][0], REWRITES[i][1]);
      }
      if (EMPHASIZE.indexOf(text) >= 0) {
        var el = node.parentElement;
        if (el && !el.hasAttribute('data-force-contrast')) el.setAttribute('data-force-contrast', '');
      }
    }
  }

  function run() {
    if (!document.body) return;
    ensureStyle();
    rewrite();
  }

  run();

  // A poll, not a MutationObserver: the bundle rewrites the document wholesale
  // when it mounts, which disconnects observers registered against the original
  // one — the timer survives because it lives on window. Slides also render
  // lazily as you navigate, so this has to keep running, not just fire once.
  // ponytail: full-document TreeWalker every 400ms; scope it to the active
  // slide if the deck ever grows enough for this to show up in a profile.
  setInterval(run, 400);
})();
