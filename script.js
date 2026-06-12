'use strict';

/* ─────────────────────────────────
   CURSOR GLOW
───────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
let cx = window.innerWidth / 2;
let cy = window.innerHeight / 2;
let tcx = cx, tcy = cy;

document.addEventListener('mousemove', e => {
  tcx = e.clientX;
  tcy = e.clientY;
  document.documentElement.style.setProperty('--cx', tcx + 'px');
  document.documentElement.style.setProperty('--cy', tcy + 'px');
});

(function animateCursor() {
  cx += (tcx - cx) * 0.12;
  cy += (tcy - cy) * 0.12;
  if (cursorGlow) {
    cursorGlow.style.left = cx + 'px';
    cursorGlow.style.top  = cy + 'px';
  }
  requestAnimationFrame(animateCursor);
})();

/* ─────────────────────────────────
   SCROLL-REVEAL (AOS-like)
───────────────────────────────── */
const aosElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosElements.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────
   CARD 3D TILT ON MOUSE MOVE
───────────────────────────────── */
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const rotY =  x * 14;
    const rotX = -y * 10;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    card.style.boxShadow = `
      ${-x * 20}px ${-y * 16}px 40px rgba(0,0,0,0.5),
      0 0 0 1px rgba(0,255,156,0.2),
      ${x * 10}px ${y * 10}px 20px rgba(0,255,156,0.06)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

/* ─────────────────────────────────
   AVATAR PARALLAX (subtle)
───────────────────────────────── */
const avatarWrap = document.getElementById('avatarWrap');

document.addEventListener('mousemove', e => {
  if (!avatarWrap) return;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  avatarWrap.style.transform = `translateY(var(--float-offset, 0px)) rotateY(${dx * 4}deg) rotateX(${-dy * 2.5}deg)`;
});

/* Sync floating offset from CSS animation */
(function syncFloat() {
  const now = performance.now();
  const offset = Math.sin(now * 0.001 * Math.PI * 0.4) * 14;
  document.documentElement.style.setProperty('--float-offset', offset + 'px');
  requestAnimationFrame(syncFloat);
})();

/* ─────────────────────────────────
   NAV PILLS – smooth scroll
───────────────────────────────── */
document.querySelectorAll('.nav-pill[data-href]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─────────────────────────────────
   NAV – shrink on scroll
───────────────────────────────── */
const topNav = document.getElementById('topNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    topNav.style.background = 'rgba(5,11,9,0.96)';
    topNav.style.boxShadow  = '0 1px 0 rgba(255,255,255,0.04)';
  } else {
    topNav.style.background = '';
    topNav.style.boxShadow  = '';
  }
}, { passive: true });

/* ─────────────────────────────────
   SERVICE CARD BUTTON RIPPLE
───────────────────────────────── */
document.querySelectorAll('.card-arrow').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:40px; height:40px;
      background:rgba(0,255,156,0.25);
      transform:scale(0); opacity:1;
      animation:ripple .5s ease-out forwards;
      pointer-events:none;
      top:50%; left:50%; margin:-20px;
    `;
    btn.style.position = 'relative';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Inject ripple keyframes once */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform:scale(2.5); opacity:0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ─────────────────────────────────
   TOOL ITEMS – stagger on load
───────────────────────────────── */
document.querySelectorAll('.tool-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  setTimeout(() => {
    el.style.transition = 'opacity .5s ease, transform .5s ease, filter .3s, transform .3s cubic-bezier(0.34,1.56,0.64,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 800 + i * 80);
});

/* ─────────────────────────────────
   TAGLINE HEADING – word reveal
───────────────────────────────── */
const taglineHeading = document.querySelector('.tagline-heading');
if (taglineHeading) {
  const text = taglineHeading.textContent;
  const words = text.split(' ');
  taglineHeading.innerHTML = words.map(
    (w, i) => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(18px);transition:opacity .5s ${i * 40}ms ease, transform .5s ${i * 40}ms ease">${w}&nbsp;</span>`
  ).join('');

  const taglineObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      taglineHeading.querySelectorAll('.word').forEach(w => {
        w.style.opacity = '1';
        w.style.transform = 'translateY(0)';
      });
      taglineObs.disconnect();
    }
  }, { threshold: 0.3 });
  taglineObs.observe(taglineHeading);
}

/* ─────────────────────────────────
   SECTION HEADING GLOW ON SCROLL
───────────────────────────────── */
document.querySelectorAll('.section-heading').forEach(h => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      h.style.textShadow = '0 0 40px rgba(0,255,156,0.2)';
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(h);
});

/* ─────────────────────────────────
   SOCIAL ICONS – magnetic hover
───────────────────────────────── */
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mousemove', e => {
    const rect = icon.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.35;
    icon.style.transform = `translate(${dx}px, ${dy - 6}px) scale(1.1)`;
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});
