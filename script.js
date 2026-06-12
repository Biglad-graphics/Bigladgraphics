'use strict';

/* Scroll reveal */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

/* Nav scroll bg */
const nav = document.getElementById('topNav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50 ? 'rgba(8,8,14,.97)' : '';
  nav.style.boxShadow  = window.scrollY > 50 ? '0 1px 0 rgba(255,255,255,.04)' : '';
}, { passive: true });

/* Tool stagger */
document.querySelectorAll('.tool').forEach((el, i) => {
  el.style.opacity = '0'; el.style.transform = 'translateY(12px)';
  setTimeout(() => {
    el.style.transition = 'opacity .45s ease, transform .45s ease, filter .3s, transform .3s cubic-bezier(.34,1.56,.64,1)';
    el.style.opacity = '1'; el.style.transform = 'translateY(0)';
  }, 650 + i * 75);
});

/* Mascot sway */
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

/* Stats counter */
const statNums = document.querySelectorAll('.stat-num[data-target]');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1800; const step = 16;
    const inc = target / (dur / step);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, target);
      el.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(timer);
    }, step);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(el => countObs.observe(el));

/* Gallery filters */
const filterBtns = document.querySelectorAll('.gf-btn');
const galleryItems = document.querySelectorAll('.g-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = f === 'all' || item.dataset.cat === f;
      item.style.transition = 'opacity .3s ease, transform .3s ease';
      if (show) { item.classList.remove('hidden'); item.style.opacity = '1'; item.style.transform = ''; }
      else { item.style.opacity = '0'; item.style.transform = 'scale(.95)'; setTimeout(() => item.classList.add('hidden'), 300); }
    });
  });
});

/* Lightbox */
const lb = document.getElementById('lightbox');
const lbOverlay = document.getElementById('lbOverlay');
const lbClose = document.getElementById('lbClose');
const lbPreview = document.getElementById('lbPreview');

document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('click', () => {
    const thumb = item.querySelector('.g-thumb');
    if (thumb && lbPreview) {
      lbPreview.innerHTML = '';
      const clone = thumb.cloneNode(true);
      clone.style.height = '100%';
      lbPreview.appendChild(clone);
    }
    if (lb) { lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  });
});

function closeLightbox() {
  if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}
if (lbOverlay) lbOverlay.addEventListener('click', closeLightbox);
if (lbClose)   lbClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* WhatsApp quote form */
const qForm = document.getElementById('quoteForm');
if (qForm) {
  qForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = qForm.querySelector('[name=name]').value.trim();
    const phone = qForm.querySelector('[name=phone]').value.trim();
    const type  = qForm.querySelector('[name=type]').value;
    const desc  = qForm.querySelector('[name=desc]').value.trim();
    const msg = `Hi Biglad! 👋\n\nName: ${name}\nPhone/Email: ${phone}\nProject Type: ${type}\n\nProject Details:\n${desc}`;
    window.open(`https://wa.me/2349036997098?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

/* Feedback form → WhatsApp */
const fbForm = document.getElementById('feedbackForm');
if (fbForm) {
  fbForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = fbForm.querySelector('[name=fb-name]').value.trim();
    const contact = fbForm.querySelector('[name=fb-contact]').value.trim();
    const msg     = fbForm.querySelector('[name=fb-msg]').value.trim();
    const text = `Hi Biglad! 📝 Feedback\n\nFrom: ${name}\nContact: ${contact}\n\n${msg}`;
    window.open(`https://wa.me/2349036997098?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* Mobile nav */
const burger    = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
function closeMobile() { if (mobileNav) mobileNav.classList.remove('open'); }

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
