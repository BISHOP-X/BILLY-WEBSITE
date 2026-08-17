const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const toast = document.querySelector('[data-toast]');
const toastClose = document.querySelector('[data-toast-close]');
const rotatingWords = Array.from(document.querySelectorAll('[data-service-rotator] .service-word'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;
let rotationTimer;
let activeWordIndex = 0;

function closeMenu() {
  menu?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const open = menu?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

function showStoreNotice() {
  window.clearTimeout(toastTimer);
  toast?.classList.add('visible');
  toastTimer = window.setTimeout(() => toast?.classList.remove('visible'), 5000);
}

document.querySelectorAll('[data-store]').forEach((button) => {
  button.addEventListener('click', showStoreNotice);
});

toastClose?.addEventListener('click', () => toast?.classList.remove('visible'));

function rotateServiceWord() {
  const currentWord = rotatingWords[activeWordIndex];
  activeWordIndex = (activeWordIndex + 1) % rotatingWords.length;
  const nextWord = rotatingWords[activeWordIndex];

  currentWord.classList.remove('is-active');
  currentWord.classList.add('is-exiting');
  nextWord.classList.add('is-active');

  window.setTimeout(() => {
    currentWord.classList.add('is-resetting');
    currentWord.classList.remove('is-exiting');
    window.requestAnimationFrame(() => currentWord.classList.remove('is-resetting'));
  }, 650);
}

function startServiceRotation() {
  if (reduceMotion.matches || rotatingWords.length < 2 || rotationTimer) return;
  rotationTimer = window.setInterval(rotateServiceWord, 2800);
}

function stopServiceRotation() {
  window.clearInterval(rotationTimer);
  rotationTimer = undefined;
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopServiceRotation();
  else startServiceRotation();
});

reduceMotion.addEventListener?.('change', () => {
  stopServiceRotation();
  startServiceRotation();
});

startServiceRotation();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
