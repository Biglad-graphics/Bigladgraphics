'use strict';

/* Scroll reveal */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

/* Nav scroll background */
const nav = document.getElementById('topNav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50 ? 'rgba(8,8,14,.97)' : '';
  nav.style.boxShadow  = window.scrollY > 50 ? '0 1px 0 rgba(255,255,255,.04)' : '';
}, { passive: true });

/* Nav smooth scroll */
document.querySelectorAll('.nav-pill[data-href]').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = document.querySelector(btn.dataset.href);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Tool items fade-in stagger */
document.querySelectorAll('.tool').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  setTimeout(() => {
    el.style.transition = 'opacity .45s ease, transform .45s ease, filter .3s, transform .3s cubic-bezier(.34,1.56,.64,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 650 + i * 75);
});

/* Tagline word reveal */
const th = document.querySelector('.tagline-h');
if (th) {
  th.innerHTML = th.textContent.trim().split(' ').map(
    (w, i) => `<span style="display:inline-block;opacity:0;transform:translateY(12px);transition:opacity .45s ${i*32}ms ease,transform .45s ${i*32}ms ease">${w}&nbsp;</span>`
  ).join('');
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting)
      th.querySelectorAll('span').forEach(s => { s.style.opacity='1'; s.style.transform='translateY(0)'; });
  }, { threshold: 0.3 }).observe(th);
}

/* Gentle mascot sway on mouse move */
const mw = document.getElementById('mascotWrap');
let raf;
document.addEventListener('mousemove', e => {
  if (!mw) return;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const dx = (e.clientX / window.innerWidth  - .5) * 4;
    const dy = (e.clientY / window.innerHeight - .5) * 2.5;
    mw.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg)`;
    mw.style.transition = 'transform .55s ease';
  });
});

/* Card arrow ripple */
document.querySelectorAll('.c-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const r = document.createElement('span');
    r.style.cssText = 'position:absolute;border-radius:50%;width:32px;height:32px;background:rgba(255,32,32,.2);transform:scale(0);opacity:1;animation:rpl .42s ease-out forwards;pointer-events:none;top:50%;left:50%;margin:-16px';
    btn.style.position = 'relative';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 450);
  });
});
const ss = document.createElement('style');
ss.textContent = '@keyframes rpl{to{transform:scale(2.5);opacity:0}}';
document.head.appendChild(ss);
