document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-ig-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-ig-track]');
    const prevButton = carousel.querySelector('[data-ig-prev]');
    const nextButton = carousel.querySelector('[data-ig-next]');

    if (!track) {
      return;
    }

    const slides = Array.from(track.children);
    if (slides.length <= 1) {
      return;
    }

    let currentIndex = 0;
    let touchStartX = 0;

    const updateVideos = () => {
      slides.forEach((slide, index) => {
        const video = slide.tagName === 'VIDEO' ? slide : slide.querySelector('video');
        if (!video) {
          return;
        }

        if (index === currentIndex) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const goToSlide = (index) => {
      const slideIndex = (index + slides.length) % slides.length;
      currentIndex = slideIndex;
      track.scrollTo({
        left: slideIndex * track.clientWidth,
        behavior: 'smooth'
      });
      updateVideos();
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
    }

    track.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaX) < 40) {
        return;
      }

      if (deltaX > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    });

    window.addEventListener('resize', () => {
      track.scrollTo({ left: currentIndex * track.clientWidth, behavior: 'auto' });
    });

    updateVideos();
  });
});