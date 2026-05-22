// Header scroll animatie en menu functionaliteit

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const logoContainer = document.getElementById('logo-container');
  const logoImg = logoContainer.querySelector('img');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const dienstenToggle = document.getElementById('diensten-toggle');
  const dienstenSubmenu = document.getElementById('diensten-submenu');
  
  let isMenuOpen = false;
  let isSubmenuOpen = false;
  let lastScroll = 0;

  // Logo scroll animatie
  window.addEventListener('scroll', () => {
    // Skip scroll animatie als menu open is
    if (isMenuOpen) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 10) {
      // Scroll naar beneden - zelfde gedrag als mobile menu open
      logoContainer.classList.remove('scale-75', 'self-baseline');
      logoContainer.classList.add('scale-75', 'self-center');
      logoImg.classList.add('opacity-0');
      header.classList.add('shadow-lg');
    } else {
      // Terug naar boven - herstel standaard staat
      logoContainer.classList.remove('scale-75', 'self-center');
      logoContainer.classList.add('scale-75', 'self-baseline');
      logoImg.classList.remove('opacity-0');
      header.classList.remove('shadow-lg');
    }
    
    lastScroll = scrollY;
  });

  // Hamburger menu toggle
  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      // Open menu
      mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
      mobileMenu.classList.add('translate-y-0', 'opacity-100');
      logoContainer.classList.remove('scale-75');
      logoContainer.classList.add('scale-75', 'self-center');
      logoContainer.classList.remove('self-baseline');
      logoImg.classList.add('opacity-0');
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
      logoContainer.classList.remove('scale-75', 'self-center');
      
      // Herstel logo grootte en zichtbaarheid op basis van scroll positie
      if (window.scrollY > 10) {
        logoContainer.classList.add('scale-75', 'self-center');
        logoImg.classList.add('opacity-0');
        header.classList.add('shadow-lg');
      } else {
        logoContainer.classList.add('scale-75', 'self-baseline');
        logoImg.classList.remove('opacity-0');
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
