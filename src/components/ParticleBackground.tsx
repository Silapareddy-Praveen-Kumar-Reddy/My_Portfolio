import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 70;
const MAX_DISTANCE = 140;       // line draw distance between particles
const MOUSE_RADIUS = 180;       // cursor interaction radius
const SPEED = 0.45;
const DOT_COLOR = "rgba(96,200,220,";    // teal-ish dots
const LINE_COLOR = "rgba(80,180,210,";   // connecting line color

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
            ctx.strokeStyle = `${LINE_COLOR}${(alpha * 0.45).toFixed(3)})`;
            ctx.lineWidth = 0.8;
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
          ctx.strokeStyle = `${LINE_COLOR}${(alpha * 0.7).toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${DOT_COLOR}0.8)`;
        ctx.fill();
      }

      // Draw cursor dot
      if (mx > 0) {
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,220,255,0.55)";
        ctx.fill();
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
