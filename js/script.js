/**
 * Flight Booking - Landing Page
 * Xử lý: (1) menu mobile, (2) chọn dot ở hero section.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroDots();
});

/** Bật/tắt menu điều hướng trên mobile khi bấm nút hamburger. */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Bấm chọn 1 mục thì tự đóng menu (trải nghiệm tốt hơn trên mobile).
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/** Cho phép bấm vào dot để đổi trạng thái active (demo slider). */
function initHeroDots() {
  const dots = document.querySelectorAll('.hero__dot');
  if (!dots.length) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dots.forEach((d) => {
        d.classList.remove('hero__dot--active');
        d.setAttribute('aria-selected', 'false');
      });
      dot.classList.add('hero__dot--active');
      dot.setAttribute('aria-selected', 'true');
    });
  });
}
