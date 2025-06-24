// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Light/Dark mode toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// On load, set theme from localStorage
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
  setTheme(!body.classList.contains('dark-mode'));
});

// Contact form validation and message
const form = document.querySelector('.contact-form');
const formMsg = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      formMsg.textContent = "Thanks for your message! I'll get back to you soon.";
      formMsg.style.color = "#4CAF50";
      form.reset();
    } else {
      formMsg.textContent = "Oops! Something went wrong. Please try again.";
      formMsg.style.color = "#F44336";
    }
  });
}

// (Optional) Responsive mobile menu toggle
// Uncomment below if you add a hamburger menu in the future
const nav = document.querySelector('nav');
let menuBtn = document.querySelector('.menu-btn');
if (!menuBtn && nav) {
  menuBtn = document.createElement('button');
  menuBtn.className = 'menu-btn';
  menuBtn.innerHTML = '&#9776;';
  nav.prepend(menuBtn);
}
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });
}

// --- Typing animation for multiple roles ---
const typedRole = document.getElementById('typed-role');
const roles = [
  'Aspiring Software Developer',
  'Full-Stack Developer',
  'Open-Source Contributor',
  'Tech Enthusiast'
];
let roleIndex = 0;
let roleCharIndex = 0;
let typingForward = true;

function typeRoleLoop() {
  if (!typedRole) return;
  const roleText = roles[roleIndex];
  if (typingForward) {
    if (roleCharIndex < roleText.length) {
      typedRole.textContent += roleText[roleCharIndex];
      roleCharIndex++;
      setTimeout(typeRoleLoop, 80);
    } else {
      typingForward = false;
      setTimeout(typeRoleLoop, 1200);
    }
  } else {
    if (roleCharIndex > 0) {
      typedRole.textContent = roleText.slice(0, roleCharIndex - 1);
      roleCharIndex--;
      setTimeout(typeRoleLoop, 40);
    } else {
      typingForward = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRoleLoop, 400);
    }
  }
}
typeRoleLoop();
// Always show the blinking cursor
const cursor = document.querySelector('.typed-cursor');
if (cursor) cursor.style.display = '';

// --- Like Button Logic ---
const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');

if (likeBtn && likeCount) {
  // Get saved like count and liked state
  let count = parseInt(localStorage.getItem('likeCount') || '0', 10);
  let liked = localStorage.getItem('likedPortfolio') === 'true';

  likeCount.textContent = count;
  if (liked) {
    likeBtn.classList.add('liked');
    likeBtn.disabled = true;
  }

  likeBtn.addEventListener('click', function(e) {
    if (!liked) {
      count++;
      likeCount.textContent = count;
      localStorage.setItem('likeCount', count);
      localStorage.setItem('likedPortfolio', 'true');
      // Animation: remove and re-add .liked to restart animation if needed
      likeBtn.classList.remove('liked');
      void likeBtn.offsetWidth; // force reflow
      likeBtn.classList.add('liked');
      likeBtn.disabled = true;
      liked = true;
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = likeBtn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      likeBtn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
  });
}

// --- Project Card Click Animation ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    card.classList.remove('clicked');
    void card.offsetWidth; // force reflow to restart animation
    card.classList.add('clicked');
    card.addEventListener('animationend', function handler() {
      card.classList.remove('clicked');
      card.removeEventListener('animationend', handler);
    });
  });
}); 