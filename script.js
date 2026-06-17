// Typing Effect with Enhanced Animation
const typingElement = document.getElementById('typing');
const phrases = [
  'Software Engineer 💻',
  'AI/ML Enthusiast 🤖',
  'Web Developer 🌐',
  'Tech Innovator ✨'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  
  typingElement.textContent = currentPhrase.substring(0, charIndex);
  
  let typeSpeed = isDeleting ? 40 : 80;
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  typeEffect();
  observeCards();
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      updateActiveNav();
    }
  });
});

// Update active navigation link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Enhanced Hover Effects on Cards
const cardSelectors = '.card, .exp-card, .project-card, .skill-category, .edu-card';
document.querySelectorAll(cardSelectors).forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transition = 'all 0.4s ease';
  });
});

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Scroll-triggered animations for sections
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
}

observeElements();

// Staggered card animations
function observeCards() {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.project-card, .exp-card, .skill-category, .edu-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    cardObserver.observe(card);
  });
}

// Add cursor tracking effect
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  // Create subtle parallax on hero elements
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const offsetX = (mouseX - 0.5) * 20;
    const offsetY = (mouseY - 0.5) * 20;
    heroContent.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});

// Intersection Observer for progress indicators
const createProgressTracking = () => {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => observer.observe(section));
};

createProgressTracking();

// Add CSS for active nav link and animations
const styles = document.createElement('style');
styles.textContent = `
  .nav-links a.active {
    color: #38bdf8;
    border-bottom: 2px solid #38bdf8;
    padding-bottom: 5px;
  }
  
  .in-view {
    animation: slideInUp 0.8s ease-out;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Smooth transitions */
  * {
    scroll-behavior: smooth;
  }
  
  /* Text selection styling */
  ::selection {
    background: rgba(56, 189, 248, 0.3);
    color: #fff;
  }
  
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #38bdf8, #06b6d4);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0ea5e9, #0891b2);
  }
`;
document.head.appendChild(styles);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScroll = debounce(updateActiveNav, 100);
window.addEventListener('scroll', debouncedScroll);
