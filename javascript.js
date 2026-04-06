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

function showPersonalProjectNotice() {
  alert("It's my personal project, can't show you \u{1F605}\u{1F605}");
}

const contactEmail = 'sunnyk7rajput@gmail.com';
const emailModal = document.getElementById('email-modal');
const emailModalFeedback = document.getElementById('email-modal-feedback');

function openEmailModal(event) {
  if (event) {
    event.preventDefault();
  }

  if (!emailModal) {
    window.location.href = `mailto:${contactEmail}`;
    return;
  }

  emailModal.classList.add('visible');
  emailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  clearEmailFeedback();
}

function closeEmailModal() {
  if (!emailModal) {
    return;
  }

  emailModal.classList.remove('visible');
  emailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  clearEmailFeedback();
}

function setEmailFeedback(message, isSuccess = true) {
  if (!emailModalFeedback) {
    return;
  }

  emailModalFeedback.textContent = message;
  emailModalFeedback.classList.toggle('error', !isSuccess);
}

function clearEmailFeedback() {
  if (!emailModalFeedback) {
    return;
  }

  emailModalFeedback.textContent = '';
  emailModalFeedback.classList.remove('error');
}

async function copyEmailAddress() {
  const copied = await copyText(contactEmail);

  if (copied) {
    setEmailFeedback('Email copied. You can paste it anywhere.');
  } else {
    setEmailFeedback(`Copy did not work here. Use this address: ${contactEmail}`, false);
  }
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    // Fall back to the older copy approach below.
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.style.pointerEvents = 'none';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let copied = false;

  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied;
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeEmailModal();
  }
});

// Initialize Lucide icons on load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});
