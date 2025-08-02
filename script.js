console.log("Northstar Politics website loaded!");

// Compass spinning functionality
function spinCompass() {
  const logoWrapper = document.querySelector('.logo-wrapper');
  const logo = document.getElementById('logo');
  
  // Add spinning class to trigger animation
  logoWrapper.classList.add('spinning');
  
  // Remove spinning class after animation completes
  setTimeout(() => {
    logoWrapper.classList.remove('spinning');
  }, 2000);
  
  console.log("Compass spinning!");
}

// Add some subtle hover effects
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo');
  
  // Add a subtle glow effect on hover
  logo.addEventListener('mouseenter', function() {
    this.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3)) brightness(1.1)';
  });
  
  logo.addEventListener('mouseleave', function() {
    this.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
  });
  
  console.log("All interactions ready!");
}); 