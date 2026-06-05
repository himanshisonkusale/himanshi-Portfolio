import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  decay: number;
}

export const RippleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isMoved: false });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      
      if (!mouse.isMoved) {
        // Snap immediately on first movement
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isMoved = true;
      }

      // Add new particles based on movement
      const speed = Math.hypot(e.clientX - mouse.x, e.clientY - mouse.y);
      const count = Math.min(Math.floor(speed / 4) + 1, 5);

      for (let i = 0; i < count; i++) {
        // Scatter slightly along the path
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8;
        particlesRef.current.push({
          x: e.clientX + Math.cos(angle) * radius,
          y: e.clientY + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          alpha: 1.0,
          size: Math.random() * 12 + 6,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      
      // Interpolate main custom cursor position
      mouse.x = lerp(mouse.x, mouse.targetX, 0.15);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.15);

      // 1. Draw glowing background particle trail
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw radial gradient for glowing soft blue particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(147, 197, 253, ${p.alpha * 0.25})`); // --accent color
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${p.alpha * 0.08})`);
        gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Luxury Custom Cursor (only if mouse has moved)
      if (mouse.isMoved) {
        // Draw Outer Lerping Ring
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)'; // Accent color
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Inner Direct Dot
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.arc(mouse.targetX, mouse.targetY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-full h-full mix-blend-screen"
    />
  );
};
