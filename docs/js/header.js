// Header scroll animatie en menu functionaliteit

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const logoContainer = document.getElementById('logo-container');
  const logoImg = logoContainer.querySelector('img');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const dienstenToggle = document.getElementById('diensten-toggle');
  const dienstenSubmenu = document.getElementById('diensten-submenu');
  const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
  
  let isMenuOpen = false;
  let isSubmenuOpen = false;

  const getTopScale = () => (desktopMediaQuery.matches ? 0.9 : 0.75);
  const getHiddenScale = () => (desktopMediaQuery.matches ? 0.75 : 0.75);

  const setLogoState = (hideLogo) => {
    if (hideLogo) {
      logoContainer.style.transform = `translateY(-40px) scale(${getHiddenScale()})`;
      logoImg.style.opacity = '0';
      return;
    }

    logoContainer.style.transform = `scale(${getTopScale()})`;
    logoImg.style.opacity = '1';
  };

  // Logo scroll animatie
  window.addEventListener('scroll', () => {
    // Skip scroll animatie als menu open is
    if (isMenuOpen) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 10) {
      // Scroll naar beneden - verplaats logo omhoog met transform
      setLogoState(true);
      header.classList.add('shadow-lg');
    } else {
      // Terug naar boven - herstel standaard staat
      setLogoState(false);
      header.classList.remove('shadow-lg');
    }
  });

  desktopMediaQuery.addEventListener('change', () => {
    if (isMenuOpen || window.scrollY > 10) {
      return;
    }

    setLogoState(false);
  });

  // Hamburger menu toggle
  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      // Open menu
      mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
      mobileMenu.classList.add('translate-y-0', 'opacity-100');
      setLogoState(true);
      header.classList.remove('shadow-lg');
      
      // Animeer hamburger naar X
      const line1 = menuToggle.querySelector('.menu-line-1');
      const line2 = menuToggle.querySelector('.menu-line-2');
      const line3 = menuToggle.querySelector('.menu-line-3');
      
      line1.classList.add('rotate-45', 'translate-y-2');
      line2.classList.add('opacity-0');
      line3.classList.add('-rotate-45', '-translate-y-2');
      
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      // Sluit menu
      mobileMenu.classList.add('-translate-y-full', 'opacity-0');
      mobileMenu.classList.remove('translate-y-0', 'opacity-100');
      
      // Herstel logo grootte en zichtbaarheid op basis van scroll positie
      if (window.scrollY > 10) {
        setLogoState(true);
        header.classList.add('shadow-lg');
      } else {
        setLogoState(false);
        header.classList.remove('shadow-lg');
      }
      
      // Animeer X terug naar hamburger
      const line1 = menuToggle.querySelector('.menu-line-1');
      const line2 = menuToggle.querySelector('.menu-line-2');
      const line3 = menuToggle.querySelector('.menu-line-3');
      
      line1.classList.remove('rotate-45', 'translate-y-2');
      line2.classList.remove('opacity-0');
      line3.classList.remove('-rotate-45', '-translate-y-2');
      
      menuToggle.setAttribute('aria-expanded', 'false');
      
      // Sluit ook submenu
      if (isSubmenuOpen) {
        dienstenSubmenu.style.maxHeight = '0';
        dienstenToggle.querySelector('svg').classList.remove('rotate-180');
        isSubmenuOpen = false;
      }
    }
  });

  // Diensten submenu toggle
  dienstenToggle.addEventListener('click', () => {
    isSubmenuOpen = !isSubmenuOpen;
    const arrow = dienstenToggle.querySelector('svg');
    
    if (isSubmenuOpen) {
      // Open submenu
      dienstenSubmenu.style.maxHeight = dienstenSubmenu.scrollHeight + 'px';
      arrow.classList.add('rotate-180');
    } else {
      // Sluit submenu
      dienstenSubmenu.style.maxHeight = '0';
      arrow.classList.remove('rotate-180');
    }
  });

  // Sluit menu bij klikken op links
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        menuToggle.click();
      }
    });
  });

  // Sluit menu bij klikken buiten menu
  document.addEventListener('click', (e) => {
    if (isMenuOpen && 
        !mobileMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.click();
    }
  });
});
