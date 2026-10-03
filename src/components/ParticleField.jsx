import { useEffect, useRef } from 'react';

/*
 * Campo de partículas en canvas 2D, sin dependencias.
 * - Densidad según el área de la pantalla (menos partículas en móvil).
 * - Profundidad: las partículas lejanas son más pequeñas, tenues y se mueven menos con el scroll.
 * - El cursor las aparta suavemente y dibuja líneas hacia las cercanas.
 * - DPR limitado a 1.5, pausa con la pestaña oculta, init diferido.
 * - Con prefers-reduced-motion pinta un solo fotograma estático.
 */

const COLORS = ['158,160,255', '34,211,238', '244,245,247'];
const LINK_DIST = 130;
const MOUSE_RADIUS = 170;
const MAX_DPR = 1.5;

const rand = (min, max) => min + Math.random() * (max - min);

function createParticle(w, h) {
  const z = rand(0.25, 1);
  return {
    x: rand(0, w),
    y: rand(0, h),
    z,
    vx: rand(-14, 14) * z,
    vy: rand(-10, 10) * z,
    r: 0.5 + z * 1.3,
    alpha: 0.2 + z * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    phase: rand(0, Math.PI * 2),
    ox: 0,
    oy: 0,
    sx: 0,
    sy: 0,
  };
}

export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: -9999, y: -9999 };

    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;
    let last = 0;
    let time = 0;
    let cancelled = false;

    const targetCount = () => Math.round(Math.min(90, Math.max(26, (w * h) / 16000)));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      if (w && h) {
        for (const p of particles) {
          p.x *= nw / w;
          p.y *= nh / h;
        }
      }
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = targetCount();
      if (particles.length > n) particles.length = n;
      while (particles.length < n) particles.push(createParticle(w, h));
      if (motion.matches) draw();
    }

    function update(dt) {
      const scroll = window.scrollY;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.x = ((p.x % w) + w) % w;
        p.y = ((p.y % h) + h) % h;

        // Parallax: las partículas cercanas se desplazan más con el scroll
        const baseY = (((p.y - scroll * p.z * 0.12) % h) + h) % h;

        // Repulsión suave del cursor, con retorno amortiguado
        let tx = 0;
        let ty = 0;
        const dx = p.x - mouse.x;
        const dy = baseY - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_RADIUS && d > 0.01) {
          const push = (1 - d / MOUSE_RADIUS) ** 2 * 46;
          tx = (dx / d) * push;
          ty = (dy / d) * push;
        }
        const k = Math.min(1, dt * 6);
        p.ox += (tx - p.ox) * k;
        p.oy += (ty - p.oy) * k;
        p.sx = p.x + p.ox;
        p.sy = baseY + p.oy;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const n = particles.length;

      ctx.lineWidth = 0.7;
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.2 * Math.min(a.z, b.z);
            ctx.strokeStyle = `rgba(158,160,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
        const mdx = a.sx - mouse.x;
        const mdy = a.sy - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_RADIUS * 1.25) {
          const alpha = (1 - md / (MOUSE_RADIUS * 1.25)) * 0.4;
          ctx.strokeStyle = `rgba(34,211,238,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const twinkle = motion.matches ? 1 : 0.75 + 0.25 * Math.sin(time * 1.4 + p.phase);
        ctx.fillStyle = `rgba(${p.color},${(p.alpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(t) {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      time += dt;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || motion.matches || document.hidden || cancelled) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onMotionChange() {
      if (motion.matches) {
        stop();
        update(0);
        draw();
      } else {
        start();
      }
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    // Inicio diferido: no compite con el primer render ni el LCP
    const init = () => {
      if (cancelled) return;
      resize();
      if (motion.matches) {
        update(0);
        draw();
      } else {
        start();
      }
    };
    const idle = 'requestIdleCallback' in window;
    const initId = idle ? window.requestIdleCallback(init, { timeout: 800 }) : window.setTimeout(init, 200);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotionChange);

    return () => {
      cancelled = true;
      stop();
      cancelAnimationFrame(resizeRaf);
      if (idle) window.cancelIdleCallback(initId);
      else window.clearTimeout(initId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none fixed inset-0 size-full ${className}`} />;
}
