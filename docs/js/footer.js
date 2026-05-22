// Dynamic year for copyright
function updateCopyrightYear() {
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', updateCopyrightYear);
