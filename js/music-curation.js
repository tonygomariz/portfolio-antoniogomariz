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
    // 3. CARRUSEL
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
  
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      slides[index].classList.add('active');
      currentSlide = index;
    }
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
    }
  
    // =========================================
    // 4. LIGHTBOX
    // =========================================
    const lightbox = document.getElementById('musicLightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevLightboxBtn = document.querySelector('.prev-lightbox');
    const nextLightboxBtn = document.querySelector('.next-lightbox');
    
    let currentLightboxIndex = 0;
    
    const slideImages = Array.from(slides).map(slide => {
      return slide.querySelector('img').src;
    });
    
    function openLightbox(index) {
      lightboxImg.src = slideImages[index];
      lightbox.classList.add('active');
      currentLightboxIndex = index;
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightboxFn() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    slides.forEach((slide, index) => {
      slide.querySelector('img').addEventListener('click', () => {
        openLightbox(index);
      });
    });
    
    if (closeLightbox) {
      closeLightbox.addEventListener('click', closeLightboxFn);
    }
    
    if (lightbox) {
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          closeLightboxFn();
        }
      });
    }
    
    if (prevLightboxBtn) {
      prevLightboxBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + slideImages.length) % slideImages.length;
        lightboxImg.src = slideImages[currentLightboxIndex];
      });
    }
    
    if (nextLightboxBtn) {
      nextLightboxBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % slideImages.length;
        lightboxImg.src = slideImages[currentLightboxIndex];
      });
    }
    
    document.addEventListener('keydown', function(e) {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightboxFn();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextLightboxBtn.click();
      }
    });

    // --- Loader ---
    const loader = document.querySelector('.loader');
    if (loader) {
      window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      });
    }
  });