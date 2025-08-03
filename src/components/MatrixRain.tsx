'use client';

import { useEffect, useRef } from 'react';
import { RainDrop } from '../data/types';
import { chars, fontSize } from '../data/constants';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<RainDrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const columns = Math.floor(canvas.width / fontSize);

    const initDrops = () => {
      dropsRef.current = [];
      for (let i = 0; i < columns; i++) {
        if (Math.random() < 0.1) {
          dropsRef.current.push({
            x: i * fontSize,
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: Math.random() * 0.5 + 0.1
          });
        }
      }
    };

    initDrops();

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      dropsRef.current.forEach((drop) => {
        ctx.fillStyle = `rgba(0, 255, 0, ${drop.opacity})`;
        ctx.fillText(drop.char, drop.x, drop.y);

        drop.y += drop.speed;
        
        if (Math.random() < 0.02) {
          drop.char = chars[Math.floor(Math.random() * chars.length)];
        }

        if (drop.y > canvas.height) {
          drop.y = -fontSize;
          drop.x = Math.floor(Math.random() * columns) * fontSize;
          drop.speed = Math.random() * 3 + 1;
          drop.opacity = Math.random() * 0.5 + 0.1;
        }
      });

      if (Math.random() < 0.03 && dropsRef.current.length < columns * 0.3) {
        dropsRef.current.push({
          x: Math.floor(Math.random() * columns) * fontSize,
          y: -fontSize,
          speed: Math.random() * 3 + 1,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.5 + 0.1
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 1 }}
    />
  );
};

export default MatrixRain;