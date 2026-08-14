// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll to Section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 52; // Header offset
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Experience Spec Timeline Accordion (Only one active at a time)
function toggleSpec(id) {
  const selectedCard = document.getElementById(id);
  const allCards = document.querySelectorAll('.spec-card');
  
  const wasActive = selectedCard.classList.contains('active');
  
  // Close all cards
  allCards.forEach(card => {
    card.classList.remove('active');
  });
  
  // If the clicked card wasn't active, activate it
  if (!wasActive) {
    selectedCard.classList.add('active');
  }
}

// Spark AI Console Simulator Logic
const simOutput = document.getElementById('sim-output');
const simTypingText = document.getElementById('sim-typing-text');
let typingInterval = null;

const responses = {
  experience: `[SISWIT Pvt. Ltd.] January 2026 - Present
- Position: Frontend & Full-Stack Developer & Team Lead
- Responsibilities: Developing CRM/ERP SaaS modules, Supabase Auth, PostgreSQL RLS policies, Razorpay billing systems, and leading a team of 4 developers.
[Impact College, Patna] 2024 - 2027
- Degree: Bachelor of Computer Applications (BCA) - 2nd Year
- Performance: 7.04 / 10 CGPA`,
  
  skills: `[Languages] JavaScript, TypeScript, Java, SQL, Python, HTML/CSS
[Frontend] React 19, Vite, Tailwind CSS, Vanilla JS
[Backend] Supabase (Auth, RLS), PostgreSQL, Firebase, Firestore, REST APIs
[AI/ML] OpenRouter, Mistral, n8n, local llama.cpp, GGUF inference
[Payments] Razorpay subscription lifecycles, billing flows
[DevOps] Git, GitHub, Netlify, offline Android dev`,
  
  projects: `1. Spark - AI Assistant (React, Tailwind, Firebase, OpenRouter, Mistral)
   - Live AI conversational assistant with persistent history.
2. Nex - Offline AI (Android, Java, llama.cpp, GGUF, TinyLlama)
   - Running lightweight models on-device without cloud dependecies.
3. Visuals by Pritam (React 19, TypeScript, Supabase)
   - Video editor portfolio featuring custom 49MB video encoder.
4. BalanceX (Android, SQLite)
   - Accounting ledger utility for daily transactions.`,
  
  'team-lead': `[Leadership & Governance] Development Team Lead at SISWIT
- Manage task delegation, deadlines, and features for 4 developers.
- Conduct strict code reviews and maintain clean, testable system code.
- Bridge client requirements with technical database schema implementation.
- Mentor junior engineers in React, Supabase, and Postgres debug processes.`
};

function triggerSimulator(command) {
  // Clear any existing typing interval
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  
  simTypingText.textContent = '';
  const commandStr = `sunny-portfolio --${command}`;
  let index = 0;
  
  // Disable buttons during typing
  setSimButtonsState(true);
  
  typingInterval = setInterval(() => {
    if (index < commandStr.length) {
      simTypingText.textContent += commandStr.charAt(index);
      index++;
      scrollSimulator();
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
      
      // Append the command line and response output to simulator logs
      setTimeout(() => {
        appendSimLogs(commandStr, responses[command]);
        simTypingText.textContent = '';
        setSimButtonsState(false);
      }, 300);
    }
  }, 35);
}

function appendSimLogs(cmd, responseText) {
  const cmdLine = document.createElement('div');
  cmdLine.className = 'line-command';
  cmdLine.textContent = cmd;
  
  const respLine = document.createElement('div');
  respLine.className = 'line-response';
  respLine.textContent = responseText;
  
  simOutput.appendChild(cmdLine);
  simOutput.appendChild(respLine);
  
  scrollSimulator();
}

function scrollSimulator() {
  simOutput.parentElement.scrollTop = simOutput.parentElement.scrollHeight;
}

function setSimButtonsState(disabled) {
  const buttons = document.querySelectorAll('.sim-btn');
  buttons.forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '0.5' : '1';
    btn.style.pointerEvents = disabled ? 'none' : 'auto';
  });
}

// Skills Filter Matrix Logic
let activeFilter = null;

function toggleSkillFilter(skillName) {
  const allChips = document.querySelectorAll('.skill-chip');
  const allCards = document.querySelectorAll('.bento-card');
  
  let chipClicked = null;
  allChips.forEach(chip => {
    if (chip.textContent.toLowerCase().includes(skillName.toLowerCase()) || 
        (skillName === 'tailwind-css' && chip.textContent.toLowerCase().includes('tailwind')) ||
        (skillName === 'llama.cpp' && chip.textContent.toLowerCase().includes('llama')) ||
        (skillName === 'saas' && chip.textContent.toLowerCase().includes('multi-tenant')) ||
        (skillName === 'role-based-access' && chip.textContent.toLowerCase().includes('role-based'))) {
      chipClicked = chip;
    }
  });

  if (!chipClicked) return;
  
  const isAlreadyActive = chipClicked.classList.contains('active');
  
  // Reset all chips
  allChips.forEach(chip => chip.classList.remove('active'));
  
  if (isAlreadyActive) {
    // Disable filter
    activeFilter = null;
    allCards.forEach(card => {
      card.classList.remove('dimmed');
      card.classList.remove('highlighted');
    });
  } else {
    // Enable filter
    chipClicked.classList.add('active');
    activeFilter = skillName;
    
    allCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags') || '';
      if (cardTags.includes(skillName)) {
        card.classList.remove('dimmed');
        card.classList.add('highlighted');
      } else {
        card.classList.add('dimmed');
        card.classList.remove('highlighted');
      }
    });
  }
}

// macOS macOS Style Modal logic
const emailModal = document.getElementById('email-modal');
const emailFeedback = document.getElementById('email-modal-feedback');
const contactEmail = 'sunnyk7rajput@gmail.com';

function openEmailModal(event) {
  if (event) {
    event.preventDefault();
  }
  
  emailModal.classList.add('visible');
  emailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (emailFeedback) {
    emailFeedback.textContent = '';
  }
}

function closeEmailModal() {
  emailModal.classList.remove('visible');
  emailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

async function copyEmailAddress() {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(contactEmail);
      showFeedback('Address copied successfully!');
      return;
    }
  } catch (err) {
    // Fall back
  }
  
  // Fall back select method
  const textArea = document.createElement('textarea');
  textArea.value = contactEmail;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const success = document.execCommand('copy');
    if (success) {
      showFeedback('Address copied successfully!');
    } else {
      showFeedback('Copy failed. Manual copy: ' + contactEmail);
    }
  } catch (err) {
    showFeedback('Copy failed. Manual copy: ' + contactEmail);
  }
  document.body.removeChild(textArea);
}

function showFeedback(msg) {
  if (emailFeedback) {
    emailFeedback.textContent = msg;
    setTimeout(() => {
      if (emailFeedback.textContent === msg) {
        emailFeedback.textContent = '';
      }
    }, 3000);
  }
}

// Key listener to close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEmailModal();
  }
});

// High performance intersection observer for animation trigger
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = [
    document.querySelector('.about-header-block'),
    ...document.querySelectorAll('.stat-card'),
    document.querySelector('.experience-sticky-info'),
    ...document.querySelectorAll('.spec-card'),
    document.querySelector('.projects-header-centered'),
    ...document.querySelectorAll('.bento-card'),
    document.querySelector('.skills-header-centered'),
    ...document.querySelectorAll('.skill-category-card'),
    document.querySelector('.contact-box'),
    ...document.querySelectorAll('.contact-link-item')
  ];
  
  revealElements.forEach(el => {
    if (el) {
      el.classList.add('reveal-init');
    }
  });

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (el) {
      revealObserver.observe(el);
    }
  });
});
