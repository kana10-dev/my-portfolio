/* ===========================
   1. Canvas Particle Background
=========================== */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 72;
  const MAX_DIST = 130;
  const ACCENT = '124, 106, 247'; // RGB of --accent

  let W, H, particles, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r  = Math.random() * 1.8 + 0.8;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.55)`;
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animId = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    cancelAnimationFrame(animId);
    loop();
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = W;
      if (p.y > H) p.y = H;
    });
  });

  init();
})();


/* ===========================
   2. Typing Effect
=========================== */
(function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  // ← 表示したいテキストをここで編集できます
  const roles = [
    'Frontend Developer',
    'TypeScript / React',
    'Docker & Git',
    'UI Enthusiast',
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
      setTimeout(tick, 45);
    }
  }

  // 少し遅らせてから開始（hero の fade-in と合わせる）
  setTimeout(tick, 900);
})();


/* ===========================
   3. Scroll Reveal
=========================== */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ===========================
   4. Active Nav & Scroll Shrink
=========================== */
(function initNav() {
  const nav      = document.querySelector('nav');
  const sections = [...document.querySelectorAll('section[id]')];
  const links    = [...document.querySelectorAll('.nav-links a')];

  function onScroll() {
    // Nav shrink
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active section detection
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });

    links.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期状態にも適用
})();


/* ===========================
   5. Card 3D Tilt on Hover
=========================== */
(function initTilt() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5; // -0.5 ~ 0.5
      const y = (e.clientY - top)  / height - 0.5;

      card.style.transform = `
        perspective(700px)
        rotateX(${-y * 10}deg)
        rotateY(${x * 10}deg)
        translateY(-4px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ===========================
   6. Contact Form (Formspree)
=========================== */
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const ENDPOINT = 'https://formspree.io/f/xkovzavj';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name:    form.querySelector('#name').value,
      email:   form.querySelector('#email').value,
      message: form.querySelector('#message').value,
    };

    try {
      const res = await fetch(ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (res.ok) {
        form.innerHTML = `
          <div class="form-success">
            <span class="success-icon">✓</span>
            <p>メッセージを送信しました。ありがとうございます！</p>
          </div>
        `;
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      // エラーメッセージを表示
      let err = form.querySelector('.form-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'form-error';
        form.appendChild(err);
      }
      err.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
    }
  });
})();
