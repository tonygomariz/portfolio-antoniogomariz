document.addEventListener('DOMContentLoaded', function () {

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
  // 2. MENÚ MÓVIL (Hamburguesa)
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


  // =========================================
  // 3. CERRAR MENÚ AL HACER CLICK EN UN LINK
  // =========================================
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
  // 4. FUNCIONALIDAD LIGHTBOX Y LOADER
  // =========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
  let currentIndex = 0;

  function openLightbox(index) {
    if (index < 0 || index >= triggers.length) return;
    currentIndex = index;
    const imgUrl = triggers[currentIndex].getAttribute('href');
    if (lightboxImg) lightboxImg.src = imgUrl;
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = ''; 
    setTimeout(() => { if(lightboxImg) lightboxImg.src = ''; }, 300); 
  }

  function showNext() { currentIndex = (currentIndex + 1) % triggers.length; openLightbox(currentIndex); }
  function showPrev() { currentIndex = (currentIndex - 1 + triggers.length) % triggers.length; openLightbox(currentIndex); }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => { e.preventDefault(); openLightbox(index); });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    });
  }

  // =========================================
  // 5. FIT HERO TITLE (VERSIÓN DEFINITIVA)
  // =========================================
  function fitHeroTitle() {
    const title = document.querySelector('.hero-title');
    const container = document.querySelector('.hero-image-container');
    if (!title || !container) return;

    // Usamos el ancho real del contenedor de la imagen (restando el padding de la sección si es necesario)
    const targetWidth = container.getBoundingClientRect().width;
    
    // Reset temporal para medir el ancho sin restricciones
    title.style.fontSize = '100px'; 
    title.style.display = 'inline-block';
    
    const currentWidth = title.getBoundingClientRect().width;
    
    // Calculamos el multiplicador para llegar al targetWidth exacto
    const scaleFactor = targetWidth / currentWidth;
    const finalFontSize = 100 * scaleFactor;

    // Aplicamos el tamaño de fuente calculado
    title.style.fontSize = finalFontSize + 'px';
    title.style.display = 'block';
  }

  // Ejecución inicial y en cada resize
  window.addEventListener('load', fitHeroTitle);
  window.addEventListener('resize', fitHeroTitle);
  
  // Pequeño delay por si las fuentes tardan en renderizar
  setTimeout(fitHeroTitle, 100);
});