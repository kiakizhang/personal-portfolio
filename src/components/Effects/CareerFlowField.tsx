import { useEffect, useMemo, useRef } from "react";

type Props = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  v: number;
  a: number;
  life: number;
  maxLife: number;
  hue: number;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// 简易噪声：用多频正弦叠加，避免引入依赖
const noise2 = (x: number, y: number, t: number) => {
  const n =
    Math.sin(x * 0.012 + t * 0.0006) +
    Math.cos(y * 0.014 - t * 0.0005) +
    Math.sin((x + y) * 0.008 + t * 0.0003) +
    Math.cos((x - y) * 0.006 - t * 0.0004);
  return n / 4; // [-1,1] roughly
};

export default function CareerFlowField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);

  const seeds = useMemo(() => {
    return {
      hueA: 215 + Math.random() * 20, // blue-ish
      hueB: 265 + Math.random() * 20, // purple-ish
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let w = 0;
    let h = 0;
    let running = false;
    let lastTs = 0;

    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const smallScreen = window.matchMedia?.("(max-width: 767px)")?.matches ?? false;
    const isMobile = coarsePointer || smallScreen;

    // 强度 B（适中）
    const baseCount = isMobile ? 140 : 260;
    const spawnOnMove = isMobile ? 2 : 3;
    const fadeAlpha = 0.06; // 越大拖影越短

    const particles: Particle[] = [];

    const pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      active: false,
      lastTs: 0,
    };

    const setCanvasSize = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resetParticle = (p: Particle, x?: number, y?: number) => {
      p.x = x ?? Math.random() * w;
      p.y = y ?? Math.random() * h;
      p.px = p.x;
      p.py = p.y;
      p.v = 0.65 + Math.random() * 0.85;
      p.a = 0.14 + Math.random() * 0.22;
      p.life = 0;
      p.maxLife = 900 + Math.random() * 1500;
      p.hue = Math.random() < 0.5 ? seeds.hueA : seeds.hueB;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < baseCount; i++) {
        const p = {} as Particle;
        resetParticle(p);
        particles.push(p);
      }
    };

    const sampleField = (x: number, y: number, t: number) => {
      // 噪声决定角度，随时间缓慢变化
      const n = noise2(x, y, t);
      const angle = n * Math.PI * 1.6; // [-~2.5,2.5]
      return { vx: Math.cos(angle), vy: Math.sin(angle) };
    };

    const applyPointerSwirl = (x: number, y: number) => {
      if (!pointer.active) return { ax: 0, ay: 0 };
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const r2 = dx * dx + dy * dy;
      const radius = isMobile ? 140 : 180;
      const rr2 = radius * radius;
      if (r2 > rr2) return { ax: 0, ay: 0 };

      // 旋涡 + 推进：让轨迹有转弯感
      const r = Math.sqrt(r2) || 1;
      const nx = dx / r;
      const ny = dy / r;
      // 正交向量（旋涡方向）
      const tx = -ny;
      const ty = nx;
      const strength = (1 - r / radius) * (isMobile ? 0.9 : 1.1);

      // 指针速度越快，扰动越明显（适中上限）
      const speed = clamp(Math.hypot(pointer.dx, pointer.dy) * 0.02, 0.2, 1.3);

      return {
        ax: (tx * 1.2 + pointer.dx * 0.002) * strength * speed,
        ay: (ty * 1.2 + pointer.dy * 0.002) * strength * speed,
      };
    };

    const step = (ts: number) => {
      if (!running) return;
      const dt = Math.min(34, ts - lastTs || 16);
      lastTs = ts;

      // 轻微拖影，形成“闪动流线”
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(9, 15, 29, ${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      // 叠加发光线条
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += dt;

        const { vx, vy } = sampleField(p.x, p.y, ts);
        const swirl = applyPointerSwirl(p.x, p.y);

        const ax = vx + swirl.ax;
        const ay = vy + swirl.ay;

        p.px = p.x;
        p.py = p.y;
        p.x += ax * p.v * (dt / 10);
        p.y += ay * p.v * (dt / 10);

        // 闪动：靠近指针时略亮
        let a = p.a;
        if (pointer.active) {
          const dd = (p.x - pointer.x) * (p.x - pointer.x) + (p.y - pointer.y) * (p.y - pointer.y);
          if (dd < 160 * 160) a = clamp(a + 0.12, 0, 0.55);
        }

        const lifeT = p.life / p.maxLife;
        const alpha = (1 - clamp(lifeT, 0, 1)) * a;

        ctx.strokeStyle = `hsla(${p.hue}, 85%, 70%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // 回收条件
        if (p.life > p.maxLife || p.x < -40 || p.y < -40 || p.x > w + 40 || p.y > h + 40) {
          resetParticle(p, pointer.active ? pointer.x + (Math.random() - 0.5) * 40 : undefined, pointer.active ? pointer.y + (Math.random() - 0.5) * 40 : undefined);
        }
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = performance.now();
      rafRef.current = window.requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        if (inView) start();
        else stop();
      },
      { threshold: 0.08 }
    );
    io.observe(parent);

    const handleResize = () => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = window.requestAnimationFrame(() => {
        setCanvasSize();
        init();
      });
    };

    const setPointerFromEvent = (clientX: number, clientY: number) => {
      const rect = parent.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const now = performance.now();
      const dt = now - pointer.lastTs || 16;
      pointer.dx = (x - pointer.x) / dt * 1000; // px/s
      pointer.dy = (y - pointer.y) / dt * 1000;
      pointer.x = x;
      pointer.y = y;
      pointer.lastTs = now;
      pointer.active = true;

      // 在指针附近补一点粒子，增强“跟随”感
      for (let i = 0; i < spawnOnMove; i++) {
        const p = particles[(Math.random() * particles.length) | 0];
        resetParticle(
          p,
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 50
        );
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen" || e.pointerType === "touch") {
        setPointerFromEvent(e.clientX, e.clientY);
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    setCanvasSize();
    init();

    // 首帧先铺底一层深色，避免透明导致叠加过亮
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(9, 15, 29, 1)";
    ctx.fillRect(0, 0, w, h);

    window.addEventListener("resize", handleResize);
    parent.addEventListener("pointermove", handlePointerMove, { passive: true });
    parent.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
      stop();
    };
  }, [seeds, className]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

