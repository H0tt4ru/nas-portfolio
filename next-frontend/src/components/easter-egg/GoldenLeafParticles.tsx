'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    w: number;
    h: number;
    opacity: number;
    color: string;
}

const COLORS = ['#C8A44A', '#D4AF37', '#E8C85A', '#B89030', '#F0D060'];

export default function GoldenLeafParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf: number;
        const particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const spawn = (randomY = false): Particle => ({
            x: Math.random() * canvas.width,
            y: randomY ? Math.random() * canvas.height : -20,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 1.2 + 0.4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.04,
            w: Math.random() * 8 + 4,
            h: Math.random() * 3 + 1.5,
            opacity: Math.random() * 0.3 + 0.15,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });

        for (let i = 0; i < 20; i++) particles.push(spawn(true));

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < 0.1) particles.push(spawn());

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.vx += (Math.random() - 0.5) * 0.04;

                if (p.y > canvas.height + 20) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#7A5010';
                ctx.lineWidth = 0.4;
                ctx.globalAlpha = p.opacity * 0.5;
                ctx.beginPath();
                ctx.moveTo(-p.w / 2, 0);
                ctx.lineTo(p.w / 2, 0);
                ctx.stroke();
                ctx.restore();
            }

            raf = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9998]"
            style={{ animation: 'er-fade-in 0.8s ease forwards' }}
        />
    );;
}
