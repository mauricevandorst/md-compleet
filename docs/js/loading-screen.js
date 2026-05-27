document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflow = 'hidden';

  const left = document.getElementById('loading-left');
  const right = document.getElementById('loading-right');
  const leftBrand = document.getElementById('loading-brand-left');
  const rightBrand = document.getElementById('loading-brand-right');
  const leftLogo = left ? left.querySelector('img') : null;
  const rightLogo = right ? right.querySelector('img') : null;
  const leftName = leftBrand && leftBrand.children[0] ? leftBrand.children[0] : null;
  const rightName = rightBrand && rightBrand.children[0] ? rightBrand.children[0] : null;
  const leftSubtitle = leftBrand && leftBrand.children[1] ? leftBrand.children[1] : null;
  const rightSubtitle = rightBrand && rightBrand.children[1] ? rightBrand.children[1] : null;

  if (
    !leftLogo ||
    !rightLogo ||
    !leftBrand ||
    !rightBrand ||
    !leftName ||
    !rightName ||
    !leftSubtitle ||
    !rightSubtitle
  ) {
    return;
  }

  leftLogo.style.opacity = '0';
  rightLogo.style.opacity = '0';
  leftLogo.style.transformOrigin = 'right center';
  rightLogo.style.transformOrigin = 'left center';
  leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.7)';
  rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.7)';
  leftLogo.style.filter = 'drop-shadow(0 0 0 rgba(195, 169, 103, 0))';
  rightLogo.style.filter = 'drop-shadow(0 0 0 rgba(195, 169, 103, 0))';
  leftLogo.style.willChange = 'transform, opacity, filter';
  rightLogo.style.willChange = 'transform, opacity, filter';

  leftBrand.style.opacity = '1';
  rightBrand.style.opacity = '1';

  [leftName, rightName].forEach(function (name) {
    name.style.opacity = '0';
    name.style.transform = 'translate3d(0, 26px, 0) skewY(6deg) scale(0.95)';
    name.style.letterSpacing = '0.36em';
    name.style.filter = 'blur(6px)';
    name.style.willChange = 'transform, opacity, filter, letter-spacing';
  });

  [leftSubtitle, rightSubtitle].forEach(function (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translate3d(0, 24px, 0)';
    subtitle.style.clipPath = 'inset(0 0 100% 0)';
    subtitle.style.filter = 'blur(2px)';
    subtitle.style.willChange = 'transform, opacity, clip-path, filter';
  });
});

window.addEventListener('load', function () {
  const screen = document.getElementById('loading-screen');
  const left = document.getElementById('loading-left');
  const right = document.getElementById('loading-right');
  const leftBrand = document.getElementById('loading-brand-left');
  const rightBrand = document.getElementById('loading-brand-right');
  const leftLogo = left ? left.querySelector('img') : null;
  const rightLogo = right ? right.querySelector('img') : null;
  const leftName = leftBrand && leftBrand.children[0] ? leftBrand.children[0] : null;
  const rightName = rightBrand && rightBrand.children[0] ? rightBrand.children[0] : null;
  const leftSubtitle = leftBrand && leftBrand.children[1] ? leftBrand.children[1] : null;
  const rightSubtitle = rightBrand && rightBrand.children[1] ? rightBrand.children[1] : null;

  if (
    !screen ||
    !left ||
    !right ||
    !leftLogo ||
    !rightLogo ||
    !leftName ||
    !rightName ||
    !leftSubtitle ||
    !rightSubtitle
  ) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function closeLoadingScreen() {

    const easing = 'cubic-bezier(0.76, 0, 0.24, 1)';
    left.style.transition = 'transform 0.9s ' + easing;
    right.style.transition = 'transform 0.9s ' + easing;

    left.style.transform = 'translateX(-100%)';
    right.style.transform = 'translateX(100%)';

    setTimeout(function () {
      screen.remove();
      document.body.style.overflow = '';
    }, 950);
  }

  if (reduceMotion) {
    [leftLogo, rightLogo, leftName, rightName, leftSubtitle, rightSubtitle].forEach(function (element) {
      element.style.transition = 'none';
      element.style.opacity = '1';
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.filter = 'none';
    });
    leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
    rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
    leftSubtitle.style.clipPath = 'inset(0 0 0 0)';
    rightSubtitle.style.clipPath = 'inset(0 0 0 0)';
    setTimeout(closeLoadingScreen, 120);
    return;
  }

  requestAnimationFrame(function () {
    leftLogo.style.transition = 'transform 0.45s cubic-bezier(0.25, 1.35, 0.45, 1), opacity 0.35s ease-out, filter 0.5s ease-out';
    rightLogo.style.transition = 'transform 0.45s cubic-bezier(0.25, 1.35, 0.45, 1), opacity 0.35s ease-out, filter 0.5s ease-out';
    leftLogo.style.opacity = '1';
    rightLogo.style.opacity = '1';
    leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1.08)';
    rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1.08)';
    leftLogo.style.filter = 'drop-shadow(0 0 12px rgba(195, 169, 103, 0.3))';
    rightLogo.style.filter = 'drop-shadow(0 0 12px rgba(195, 169, 103, 0.3))';

    setTimeout(function () {
      leftLogo.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.9, 0.25, 1)';
      rightLogo.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.9, 0.25, 1)';
      leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.96)';
      rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.96)';
    }, 260);

    setTimeout(function () {
      leftLogo.style.transition = 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out';
      rightLogo.style.transition = 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out';
      leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
      rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
      leftLogo.style.filter = 'drop-shadow(0 0 22px rgba(195, 169, 103, 0.38))';
      rightLogo.style.filter = 'drop-shadow(0 0 22px rgba(195, 169, 103, 0.38))';
    }, 500);

    setTimeout(function () {
      leftName.style.transition = 'transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.6s ease-out, letter-spacing 0.62s cubic-bezier(0.16, 1, 0.3, 1)';
      rightName.style.transition = 'transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.6s ease-out, letter-spacing 0.62s cubic-bezier(0.16, 1, 0.3, 1)';

      leftName.style.opacity = '1';
      rightName.style.opacity = '1';
      leftName.style.transform = 'translate3d(0, 0, 0) skewY(0deg) scale(1)';
      rightName.style.transform = 'translate3d(0, 0, 0) skewY(0deg) scale(1)';
      leftName.style.letterSpacing = '0.22em';
      rightName.style.letterSpacing = '0.22em';
      leftName.style.filter = 'blur(0)';
      rightName.style.filter = 'blur(0)';
    }, 650);

    setTimeout(function () {
      leftSubtitle.style.transition = 'clip-path 0.62s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.45s ease-out, filter 0.5s ease-out';
      leftSubtitle.style.opacity = '1';
      leftSubtitle.style.transform = 'translate3d(0, 0, 0)';
      leftSubtitle.style.clipPath = 'inset(0 0 0 0)';
      leftSubtitle.style.filter = 'blur(0)';
    }, 1020);

    setTimeout(function () {
      rightSubtitle.style.transition = 'clip-path 0.62s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.45s ease-out, filter 0.5s ease-out';
      rightSubtitle.style.opacity = '1';
      rightSubtitle.style.transform = 'translate3d(0, 0, 0)';
      rightSubtitle.style.clipPath = 'inset(0 0 0 0)';
      rightSubtitle.style.filter = 'blur(0)';
    }, 1020);

    setTimeout(closeLoadingScreen, 1960);
  });
});
