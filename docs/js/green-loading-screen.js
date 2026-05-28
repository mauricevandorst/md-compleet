(function () {
  var OVERLAY_ID = 'green-loading-screen';
  var GREEN = '#294830';
  var HOLD_MS = 180;
  var SLIDE_MS = 520;

  function buildOverlay() {
    if (document.getElementById(OVERLAY_ID)) {
      return null;
    }

    var overlay = document.createElement('div');
    var leftPanel = document.createElement('div');
    var rightPanel = document.createElement('div');

    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');

    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '320';
    overlay.style.display = 'flex';
    overlay.style.overflow = 'hidden';
    overlay.style.pointerEvents = 'none';

    leftPanel.style.width = 'calc(50% + 1px)';
    leftPanel.style.height = '100%';
    leftPanel.style.backgroundColor = GREEN;
    leftPanel.style.transform = 'translate3d(0, 0, 0)';
    leftPanel.style.transition = 'transform ' + SLIDE_MS + 'ms cubic-bezier(0.76, 0, 0.24, 1)';
    leftPanel.style.willChange = 'transform';

    rightPanel.style.width = 'calc(50% + 1px)';
    rightPanel.style.height = '100%';
    rightPanel.style.marginLeft = '-1px';
    rightPanel.style.backgroundColor = GREEN;
    rightPanel.style.transform = 'translate3d(0, 0, 0)';
    rightPanel.style.transition = 'transform ' + SLIDE_MS + 'ms cubic-bezier(0.76, 0, 0.24, 1)';
    rightPanel.style.willChange = 'transform';

    overlay.appendChild(leftPanel);
    overlay.appendChild(rightPanel);

    document.body.appendChild(overlay);
    return {
      overlay: overlay,
      leftPanel: leftPanel,
      rightPanel: rightPanel
    };
  }

  function start() {
    var pieces = buildOverlay();
    if (!pieces) {
      return;
    }

    var overlay = pieces.overlay;
    var leftPanel = pieces.leftPanel;
    var rightPanel = pieces.rightPanel;

    var reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    var release = function () {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      overlay.remove();
    };

    if (reduceMotion) {
      setTimeout(release, 80);
      return;
    }

    setTimeout(function () {
      requestAnimationFrame(function () {
        leftPanel.style.transform = 'translate3d(-100%, 0, 0)';
        rightPanel.style.transform = 'translate3d(100%, 0, 0)';
      });
    }, HOLD_MS);

    setTimeout(release, HOLD_MS + SLIDE_MS + 40);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
