import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 70;
const MAX_DISTANCE = 150;       // line draw distance between particles
const MOUSE_RADIUS = 200;       // cursor interaction radius
const SPEED = 0.45;
const DOT_COLOR  = "rgba(0,230,255,";    // sharp cyan dots
const LINE_COLOR = "rgba(0,210,255,";    // vivid cyan lines
const MOUSE_LINE = "rgba(80,200,255,";   // slightly warmer mouse lines

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const init = () => {
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        radius: Math.random() * 2 + 1.5,
      }));
    };
    init();

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update positions
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const alpha = 1 - dist / MAX_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `${LINE_COLOR}${(alpha * 0.85).toFixed(3)})`;
            ctx.lineWidth = alpha * 1.4 + 0.3;   // thicker near particles
            ctx.stroke();
          }
        }
      }

      // Draw dots + mouse attraction lines
      for (const p of pts) {
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);

        // Draw line from particle to mouse if close
        if (distMouse < MOUSE_RADIUS) {
          const alpha = 1 - distMouse / MOUSE_RADIUS;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `${MOUSE_LINE}${(alpha * 0.95).toFixed(3)})`;
          ctx.lineWidth = alpha * 2.0 + 0.4;     // bold near cursor
          ctx.stroke();
        }

        // Draw dot with glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,220,255,0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${DOT_COLOR}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw cursor dot
      if (mx > 0) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(80,200,255,0.9)";
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180,240,255,0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
