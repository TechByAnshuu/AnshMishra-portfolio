import { useEffect, useRef } from "react";

export function FloatingDots({
    count = 50,
    color = "white",
    minRadius = 1,
    maxRadius = 3,
    minSpeed = 0.5,
    maxSpeed = 2,
    className = "",
}) {
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const animationRef = useRef(null);

    const initDots = (width, height) => {
        const dots = [];
        for (let i = 0; i < count; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * (maxRadius - minRadius) + minRadius,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            });
        }
        return dots;
    };

    const drawDots = (ctx, dots, width, height) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = color;
        dots.forEach((dot) => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    const updateDots = (dots, width, height) => {
        return dots.map((dot) => {
            const y = dot.y - dot.speed;
            if (y < -dot.radius * 2) {
                return { ...dot, x: Math.random() * width, y: height + dot.radius };
            }
            return { ...dot, y };
        });
    };

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const width = canvas.width;
        const height = canvas.height;
        dotsRef.current = updateDots(dotsRef.current, width, height);
        drawDots(ctx, dotsRef.current, width, height);
        animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const { width, height } = parent.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        dotsRef.current = initDots(width, height);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        handleResize();
        animationRef.current = requestAnimationFrame(animate);
        window.addEventListener("resize", handleResize);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [count, color, minRadius, maxRadius, minSpeed, maxSpeed]);

    return (
        <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />
    );
}
