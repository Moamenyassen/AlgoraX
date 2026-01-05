import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Resize handling
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mouse interaction
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // Small, elegant size

                // Anti-gravity: slowly moving UP
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = -(Math.random() * 0.5 + 0.2);

                // Color variation (Cyan/Purple/White)
                const colors = ['rgba(0, 240, 255, ', 'rgba(189, 0, 255, ', 'rgba(255, 255, 255, '];
                this.colorBase = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse Interaction (Magnetic Repulsion/Swirl)
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = 200;
                    const force = (maxDistance - distance) / maxDistance;

                    if (distance < maxDistance) {
                        this.x -= forceDirectionX * force * 2;
                        this.y -= forceDirectionY * force * 2;
                    }
                }

                // Reset containment (Wrap around or reset at bottom)
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.colorBase + this.opacity + ')';
                ctx.fill();
            }
        }

        // Init Particles
        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 150); // Responsive count
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        initParticles();

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Subtle trail effect
            // ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Connect nearby particles (Constellation effect)
            connectParticles();

            animationFrameId = requestAnimationFrame(animate);
        };

        const connectParticles = () => {
            for (let a = 0; a < particles.length; a++) {
                // Optimization: only check a subset or purely rely on proximity
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = 'rgba(0, 240, 255,' + (opacityValue * 0.1) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{ background: 'transparent' }} // Let CSS gradient show through
        />
    );
};

export default AntigravityBackground;
