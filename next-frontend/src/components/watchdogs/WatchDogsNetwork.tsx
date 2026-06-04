'use client';

import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    phase: number;
    speed: number;
    active: boolean;
    activeTick: number;
}

interface Packet {
    from: number;
    to: number;
    progress: number;
    speed: number;
}

const ACCENT = '0, 212, 255';
const COLS = 20;
const ROWS = 13;
const JITTER = 0.06;
const MAX_PACKETS = 28;

export default function WatchDogsNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf: number;
        const start = Date.now();
        let nodes: Node[] = [];
        let edges: [number, number][] = [];
        let packets: Packet[] = [];
        let packetClock = 0;

        const build = () => {
            nodes = [];
            edges = [];
            packets = [];

            const cw = canvas.width / COLS;
            const ch = canvas.height / ROWS;

            for (let r = 0; r <= ROWS; r++) {
                for (let c = 0; c <= COLS; c++) {
                    nodes.push({
                        x: c * cw + (Math.random() - 0.5) * cw * JITTER,
                        y: r * ch + (Math.random() - 0.5) * ch * JITTER,
                        phase: Math.random() * Math.PI * 2,
                        speed: Math.random() * 0.014 + 0.007,
                        active: false,
                        activeTick: 0,
                    });
                }
            }

            const stride = COLS + 1;
            for (let r = 0; r <= ROWS; r++) {
                for (let c = 0; c <= COLS; c++) {
                    const i = r * stride + c;
                    if (c < COLS) edges.push([i, i + 1]);
                    if (r < ROWS) edges.push([i, i + stride]);
                    if (c < COLS && r < ROWS && Math.random() < 0.22)
                        edges.push([i, i + stride + 1]);
                    if (c > 0 && r < ROWS && Math.random() < 0.22)
                        edges.push([i, i + stride - 1]);
                }
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            build();
        };
        resize();
        window.addEventListener('resize', resize);

        const spawnPacket = () => {
            if (!edges.length || packets.length >= MAX_PACKETS) return;
            const [a, b] = edges[Math.floor(Math.random() * edges.length)];
            const flip = Math.random() < 0.5;
            packets.push({
                from: flip ? b : a,
                to: flip ? a : b,
                progress: 0,
                speed: Math.random() * 0.016 + 0.009,
            });
        };

        const tick = () => {
            const elapsed = Date.now() - start;
            const fade = Math.min(1, elapsed / 1400);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach((n) => {
                n.phase += n.speed;
                if (n.active) {
                    n.activeTick--;
                    if (n.activeTick <= 0) n.active = false;
                }
            });

            if (Math.random() < 0.04) {
                const n = nodes[Math.floor(Math.random() * nodes.length)];
                n.active = true;
                n.activeTick = 50 + Math.floor(Math.random() * 80);
            }

            packetClock++;
            if (packetClock >= 6) {
                packetClock = 0;
                spawnPacket();
            }

            // Grid edges
            edges.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(nodes[a].x, nodes[a].y);
                ctx.lineTo(nodes[b].x, nodes[b].y);
                ctx.strokeStyle = `rgba(${ACCENT}, ${0.45 * fade})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            });

            // Packets with glowing trail
            packets = packets.filter((p) => {
                p.progress += p.speed;
                if (p.progress >= 1) return false;

                const na = nodes[p.from];
                const nb = nodes[p.to];
                const x = na.x + (nb.x - na.x) * p.progress;
                const y = na.y + (nb.y - na.y) * p.progress;
                const tp = Math.max(0, p.progress - 0.14);
                const tx = na.x + (nb.x - na.x) * tp;
                const ty = na.y + (nb.y - na.y) * tp;

                const grad = ctx.createLinearGradient(tx, ty, x, y);
                grad.addColorStop(0, `rgba(${ACCENT}, 0)`);
                grad.addColorStop(1, `rgba(${ACCENT}, ${0.85 * fade})`);
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(x, y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.4;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${ACCENT}, ${fade})`;
                ctx.fill();

                return true;
            });

            // Nodes
            nodes.forEach((n) => {
                const pulse = 0.5 + 0.5 * Math.sin(n.phase);

                if (n.active) {
                    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
                    glow.addColorStop(0, `rgba(${ACCENT}, ${0.3 * fade})`);
                    glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
                    ctx.fillStyle = glow;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 3 + pulse, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${ACCENT}, ${(0.6 + 0.4 * pulse) * fade})`;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${ACCENT}, ${(0.28 + 0.12 * pulse) * fade})`;
                    ctx.fill();
                }
            });

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
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 1 }}
        />
    );
}
