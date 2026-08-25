/**
 * Nguyễn Trang Booking - Landing Page
 * Xử lý: (1) menu mobile, (2) chọn dot ở hero section, (3) bộ đếm vé đã xuất.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroDots();
  initTicketCounter();
});

/** Bật/tắt menu điều hướng trên mobile khi bấm nút hamburger. */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Mở menu');
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

/**
 * Đếm số vé đã xuất từ 1 lên 10.000+ khi phần Về tôi xuất hiện.
 * Chạy một lần duy nhất rồi dừng ở 10.000+.
 */
function initTicketCounter() {
  const counter = document.querySelector('.js-counter');
  if (!counter) return;

  const target = Number(counter.dataset.target) || 10000;
  const suffix = counter.dataset.suffix || '';
  let started = false;

  const startCounter = () => {
    if (started) return;
    started = true;

    const duration = 2200;
    const startTime = performance.now();

    const formatNumber = (value) => value.toLocaleString('vi-VN');

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease-out: chạy nhanh lúc đầu và chậm dần khi gần 10.000.
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(1 + (target - 1) * eased);

      counter.textContent = `${formatNumber(value)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = `${formatNumber(target)}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  };

  // Chỉ bắt đầu khi người dùng cuộn đến phần Về tôi.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounter();
        obs.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(counter);
  } else {
    startCounter();
  }
}
