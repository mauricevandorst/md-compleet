// Header scroll animatie en menu functionaliteit

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const logoContainer = document.getElementById('logo-container');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const menuClose = document.getElementById('mobile-menu-close');
  const dienstenToggle = document.getElementById('diensten-toggle');
  const dienstenSubmenu = document.getElementById('diensten-submenu');
  const mobileMenuTagline = document.getElementById('mobile-menu-tagline');
  const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
  
  if (!header || !logoContainer || !menuToggle || !mobileMenu || !mobileMenuPanel || !dienstenToggle || !dienstenSubmenu) {
    return;
  }

  const logoImg = logoContainer.querySelector('img');
  const line1 = menuToggle.querySelector('.menu-line-1');
  const line2 = menuToggle.querySelector('.menu-line-2');
  const line3 = menuToggle.querySelector('.menu-line-3');
  const mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
  
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

  const setHamburgerState = (open) => {
    line1.classList.toggle('rotate-45', open);
    line1.classList.toggle('translate-y-2', open);
    line2.classList.toggle('opacity-0', open);
    line3.classList.toggle('-rotate-45', open);
    line3.classList.toggle('-translate-y-2', open);
  };

  const closeSubmenu = () => {
    dienstenSubmenu.style.maxHeight = '0';
    dienstenSubmenu.classList.remove('pb-3');
    dienstenToggle.querySelector('svg').classList.remove('rotate-180');
    isSubmenuOpen = false;
  };

  const closeMenu = () => {
    isMenuOpen = false;
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
    mobileMenuPanel.classList.add('translate-x-[110%]', 'rotate-[1.5deg]', 'scale-[0.98]');
    mobileMenuPanel.classList.remove('translate-x-0', 'rotate-0', 'scale-100');
    mobileMenuItems.forEach((item) => {
      item.classList.add('opacity-0', 'translate-x-6');
      item.classList.remove('opacity-100', 'translate-x-0');
      item.style.transitionDelay = '0ms';
    });
    if (mobileMenuTagline) {
      mobileMenuTagline.classList.add('opacity-0', 'translate-y-6');
      mobileMenuTagline.classList.remove('opacity-100', 'translate-y-0');
      mobileMenuTagline.style.transitionDelay = '0ms';
    }
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    setHamburgerState(false);
    menuToggle.setAttribute('aria-expanded', 'false');
    closeSubmenu();

    if (window.scrollY > 10) {
      setLogoState(true);
      header.classList.add('shadow-lg');
    } else {
      setLogoState(false);
      header.classList.remove('shadow-lg');
    }
  };

  const openMenu = () => {
    isMenuOpen = true;
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    mobileMenuPanel.classList.remove('translate-x-[110%]', 'rotate-[1.5deg]', 'scale-[0.98]');
    mobileMenuPanel.classList.add('translate-x-0', 'rotate-0', 'scale-100');
    mobileMenuItems.forEach((item, index) => {
      item.style.transitionDelay = `${100 + index * 55}ms`;
      item.classList.remove('opacity-0', 'translate-x-6');
      item.classList.add('opacity-100', 'translate-x-0');
    });
    if (mobileMenuTagline) {
      mobileMenuTagline.style.transitionDelay = '420ms';
      mobileMenuTagline.classList.remove('opacity-0', 'translate-y-6');
      mobileMenuTagline.classList.add('opacity-100', 'translate-y-0');
    }
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    mobileMenu.scrollTop = 0;
    setHamburgerState(true);
    menuToggle.setAttribute('aria-expanded', 'true');
    setLogoState(true);
    header.classList.remove('shadow-lg');
  };

  desktopMediaQuery.addEventListener('change', () => {
    if (desktopMediaQuery.matches && isMenuOpen) {
      closeMenu();
      return;
    }

    if (!isMenuOpen && window.scrollY <= 10) {
      setLogoState(false);
    }
  });

  // Hamburger menu toggle
  menuToggle.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Diensten submenu toggle
  dienstenToggle.addEventListener('click', () => {
    isSubmenuOpen = !isSubmenuOpen;
    const arrow = dienstenToggle.querySelector('svg');
    
    if (isSubmenuOpen) {
      // Open submenu
      dienstenSubmenu.style.maxHeight = dienstenSubmenu.scrollHeight + 'px';
      dienstenSubmenu.classList.add('pb-3');
      arrow.classList.add('rotate-180');
    } else {
      // Sluit submenu
      closeSubmenu();
    }
  });

  // Sluit menu bij klikken op links
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });
});
