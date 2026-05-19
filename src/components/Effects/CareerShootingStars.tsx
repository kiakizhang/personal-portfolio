import { useEffect, useMemo, useRef } from "react";

type Props = {
  enabled: boolean;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
  w: number;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function CareerShootingStars({ enabled, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);

  const stars = useMemo<Star[]>(() => {
    // 固定星点，避免每次渲染重置（轻量、稳定）
    const s: Star[] = [];
    // 轻量：只生成少量星点，且半径很小
    const count = 70;
    for (let i = 0; i < count; i++) {
      s.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.35 + 0.15,
      });
    }
    return s;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // 动效降级：移动端（粗指针）或 reduce motion 时完全不启用
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const shouldEnable = enabled && !reduceMotion && !coarsePointer;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const meteors: Meteor[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;
    let lastTs = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastMoveTs = 0;
    let lastSpawnTs = 0;
    let running = false;

    const setCanvasSize = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      // 上限防止超高DPR导致性能开销过大
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStars = () => {
      // 星点：轻量静态（在 canvas 上补一层点状质感）
      for (const s of stars) {
        const x = s.x * w;
        const y = s.y * h;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const spawnMeteor = (x: number, y: number, dx: number, dy: number) => {
      // 归一化方向，稍加斜率（更像流星）
      const mag = Math.hypot(dx, dy) || 1;
      const ndx = dx / mag;
      const ndy = dy / mag;

      // 让流星更“斜向下”，即使鼠标水平移动也会有轻微下坠
      const vx = ndx * 900 + 180;
      const vy = ndy * 900 + 260;

      meteors.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 850 + Math.random() * 450,
        len: 140 + Math.random() * 120,
        w: 1 + Math.random() * 1.4,
      });
      // 控制上限，避免堆积
      if (meteors.length > 18) meteors.splice(0, meteors.length - 18);
    };

    const tick = (ts: number) => {
      if (!running) return;
      const dt = Math.min(34, ts - lastTs || 16);
      lastTs = ts;

      ctx.clearRect(0, 0, w, h);
      drawStars();

      // 绘制流星
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        const t = clamp(m.life / m.maxLife, 0, 1);

        m.x += (m.vx * dt) / 1000;
        m.y += (m.vy * dt) / 1000;

        const alpha = 1 - t;
        const tailX = m.x - (m.vx / 1000) * (m.len);
        const tailY = m.y - (m.vy / 1000) * (m.len);

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(147,197,253,${0.9 * alpha})`); // blue-300
        grad.addColorStop(0.5, `rgba(167,139,250,${0.55 * alpha})`); // purple-400
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = m.w;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // 超出范围或生命结束即回收
        if (t >= 1 || m.x > w + 200 || m.y > h + 200) {
          meteors.splice(i, 1);
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = performance.now();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ctx.clearRect(0, 0, w, h);
      drawStars();
    };

    // 仅在视口内运行
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        if (!shouldEnable) {
          stop();
          return;
        }
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
        // 重绘一次星点即可
        ctx.clearRect(0, 0, w, h);
        drawStars();
      });
    };

    const handleMove = (e: MouseEvent) => {
      if (!shouldEnable) return;
      const now = performance.now();
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastMouseX;
      const dy = y - lastMouseY;
      const dt = now - lastMoveTs || 16;
      lastMouseX = x;
      lastMouseY = y;
      lastMoveTs = now;

      const speed = Math.hypot(dx, dy) / dt; // px/ms
      // 低频：只有速度足够且过了冷却才生成
      if (speed > 0.35 && now - lastSpawnTs > 190) {
        lastSpawnTs = now;
        // 让流星从鼠标附近随机偏移一点，避免太“跟手”
        spawnMeteor(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 24, dx, dy);
      }
    };

    setCanvasSize();
    drawStars();

    window.addEventListener("resize", handleResize);
    parent.addEventListener("mousemove", handleMove);

    // 初始：若不启用则保持静态星点
    if (!shouldEnable) stop();

    return () => {
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMove);
      stop();
    };
  }, [enabled, stars]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}

