// Navigation scroll effect
const nav = document.getElementById('navigation');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll function
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Hero animations on load
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }
});

// Intersection Observer for Projects
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 150);
      });
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const projectsSection = document.getElementById('projects');
if (projectsSection) {
  projectObserver.observe(projectsSection);
}

// Intersection Observer for Skills (Updated to Auto-Parse Percentage from Span)
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skills = document.querySelectorAll('.skill-item');
      skills.forEach((skill, index) => {
        setTimeout(() => {
          skill.classList.add('visible');
          
          // Animate progress bar after element is visible - Auto-parses from .skill-percentage text
          setTimeout(() => {
            const percentageText = skill.querySelector('.skill-percentage').textContent;
            const level = percentageText.replace('%', '').trim(); // e.g., "95" from "95%"
            skill.classList.add('animated');
            skill.style.setProperty('--skill-width', `${level}%`);
          }, 200);
        }, index * 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Add staggered animation to contact social buttons
window.addEventListener('load', () => {
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach((button, index) => {
    button.style.animation = `scaleIn 0.5s ease-out ${index * 0.1}s backwards`;
  });
  
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBlobs = document.querySelectorAll('.hero-bg-blob');
  
  heroBlobs.forEach((blob, index) => {
    const speed = 0.5 + (index * 0.1);
    blob.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add hover effect sound/feedback (optional enhancement)
document.querySelectorAll('.project-card, .skill-tag, .btn').forEach(element => {
  element.addEventListener('mouseenter', () => {
    // You can add haptic feedback or sound effects here
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Initialize Lucide icons on load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});