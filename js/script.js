/**
 * Nguyễn Trang Booking - Landing Page
 * Xử lý: (1) menu mobile, (2) chọn dot ở hero section, (3) bộ đếm vé đã xuất,
 * (4) bố cục phần Về tôi trên mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroDots();
  initTicketCounter();
  initMobileAboutLayout();
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

/**
 * Trên điện thoại, phần Về tôi chuyển thành bố cục dọc:
 * hình ảnh ở trên, nội dung nằm bên dưới để không bị ép ngang.
 * Chỉ áp dụng cho màn hình <= 768px, không ảnh hưởng desktop.
 */
function initMobileAboutLayout() {
  const about = document.querySelector('.about__inner');
  if (!about) return;

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .about__inner {
        flex-direction: column;
        align-items: center;
        gap: 36px;
      }

      .about__media {
        flex: 0 0 auto;
        width: 190px;
        max-width: 55vw;
      }

      .about__content {
        width: 100%;
        text-align: left;
      }

      .about__content .eyebrow,
      .about__content .section-title {
        text-align: center;
      }

      .about__content .section-title {
        font-size: 28px;
      }

      .about__content .section-desc {
        font-size: 15px;
        line-height: 1.75;
      }

      .about__stats {
        justify-content: center;
        flex-wrap: wrap;
        gap: 24px 30px;
        margin-top: 28px;
      }
    }

    @media (max-width: 480px) {
      .about__inner {
        gap: 28px;
      }

      .about__media {
        width: 170px;
      }

      .about__content .section-title {
        font-size: 25px;
      }

      .about__content .section-desc {
        font-size: 14.5px;
      }

      .about__stats {
        gap: 20px;
      }
    }
  `;

  document.head.appendChild(style);
}
