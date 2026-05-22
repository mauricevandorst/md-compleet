// Lenis smooth scroll initialisatie
// CDN versie wordt geladen via script tag in HTML

document.addEventListener('DOMContentLoaded', () => {
  // Wacht tot Lenis global beschikbaar is
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Request animation frame voor smooth scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop scroll wanneer gebruiker zelf scrollt
    lenis.on('scroll', (e) => {
      // Je kan hier custom logica toevoegen als je wilt
    });

    // Maak lenis global beschikbaar voor andere scripts
    window.lenis = lenis;
  }
});
