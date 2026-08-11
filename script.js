const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const toast = document.querySelector('[data-toast]');
const toastClose = document.querySelector('[data-toast-close]');
let toastTimer;

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
