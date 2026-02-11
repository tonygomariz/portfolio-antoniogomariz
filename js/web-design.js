document.addEventListener('DOMContentLoaded', function() {

  // =========================================
  // 1. FIX DE NAVEGACIÓN "NUCLEAR"
  // =========================================
  const navLinks = document.querySelectorAll('.navbar a');
  
  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.indexOf('index.html') !== -1) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navbar) navbar.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');

        window.location.href = href;
        return false;
      }
    }, true); 
  }

  // =========================================
  // 2. MENÚ MÓVIL (Hamburguesa) - FIX
  // =========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function(e) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navbar.classList.toggle('active');
    }, true);
  }

  if (navbar && menuToggle) {
    const mobileLinks = navbar.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // =========================================
  // 3. LOADER
  // =========================================
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    });
  }
});