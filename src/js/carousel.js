// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.carousel-dot');
  const originalSlides = Array.from(document.querySelectorAll('.carousel-slide'));
  
  let currentIndex = 0;
  const totalSlides = originalSlides.length;
  let isTransitioning = false;

  // Clone slides for infinite loop
  function setupInfiniteLoop() {
    // Clone all slides and add to the end
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
    
    // Clone all slides and add to the beginning
    for (let i = originalSlides.length - 1; i >= 0; i--) {
      const clone = originalSlides[i].cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    }
    
    // Start at the first real slide (after the prepended clones)
    currentIndex = totalSlides;
    updateCarousel(false);
  }

  // Function to get all slides (including clones)
  function getAllSlides() {
    return Array.from(track.querySelectorAll('.carousel-slide'));
  }

  // Function to calculate slide offset for peek carousel
  function getSlideOffset(index) {
    const allSlides = getAllSlides();
    if (allSlides.length === 0) return 0;
    
    const slideWidth = allSlides[0].offsetWidth;
    const computedStyle = window.getComputedStyle(track);
    const gap = parseInt(computedStyle.gap) || 0;
    
    const containerWidth = track.parentElement.offsetWidth;
    const centerOffset = (containerWidth - slideWidth) / 2;
    
    const slideOffset = index * (slideWidth + gap);
    
    return centerOffset - slideOffset;
  }

  // Function to update carousel position
  function updateCarousel(animate = true) {
    const offset = getSlideOffset(currentIndex);
    
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.5s ease-in-out';
    }
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Calculate the real index (accounting for clones)
    const realIndex = ((currentIndex - totalSlides) % totalSlides + totalSlides) % totalSlides;
    
    // Update active slide styling
    const allSlides = getAllSlides();
    allSlides.forEach((slide, index) => {
      const slideInner = slide.querySelector('div');
      const slideRealIndex = ((index - totalSlides) % totalSlides + totalSlides) % totalSlides;
      
      if (slideRealIndex === realIndex) {
        slideInner.classList.remove('bg-[#c3a967]');
        slideInner.classList.add('bg-[#294830]');
        slideInner.style.transform = 'scale(1.1)';
      } else {
        slideInner.classList.remove('bg-[#294830]');
        slideInner.classList.add('bg-[#c3a967]');
        slideInner.style.transform = 'scale(1)';
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === realIndex) {
        dot.classList.remove('bg-[#c3a967]', 'w-2');
        dot.classList.add('bg-[#294830]', 'w-8');
      } else {
        dot.classList.remove('bg-[#294830]', 'w-8');
        dot.classList.add('bg-[#c3a967]', 'w-2');
      }
    });
  }

  // Handle infinite loop wrapping
  function handleInfiniteLoop() {
    const allSlides = getAllSlides();
    
    // If we're at a clone at the beginning, jump to the real slide at the end
    if (currentIndex < totalSlides) {
      currentIndex = currentIndex + totalSlides;
      updateCarousel(false);
    }
    // If we're at a clone at the end, jump to the real slide at the beginning
    else if (currentIndex >= totalSlides * 2) {
      currentIndex = currentIndex - totalSlides;
      updateCarousel(false);
    }
  }

  // Next slide
  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex++;
    updateCarousel(true);
    
    setTimeout(() => {
      handleInfiniteLoop();
      isTransitioning = false;
    }, 500);
  }

  // Previous slide
  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex--;
    updateCarousel(true);
    
    setTimeout(() => {
      handleInfiniteLoop();
      isTransitioning = false;
    }, 500);
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentIndex = totalSlides + index;
      updateCarousel(true);
      
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    });
  });

  // Initialize infinite loop
  setupInfiniteLoop();

  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel(false);
    }, 100);
  });

  // Auto-play (optional)
  let autoplayInterval = setInterval(nextSlide, 5000);

  // Pause autoplay on hover
  const carouselContainer = track.parentElement.parentElement;
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      nextSlide();
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 5000);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      prevSlide();
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  }
});
