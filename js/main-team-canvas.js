// ============================================
// INTERACTIVE CANVAS BACKGROUND FOR TEAM SECTION
// ============================================
const teamCanvas = document.getElementById('teamCanvas');
const teamSection = document.querySelector('.team-section');

if (teamCanvas && teamSection) {
    const ctx = teamCanvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let canvasWidth, canvasHeight;

    // Resize canvas to match section
    function resizeCanvas() {
        canvasWidth = teamSection.offsetWidth;
        canvasHeight = teamSection.offsetHeight;
        teamCanvas.width = canvasWidth;
        teamCanvas.height = canvasHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x > canvasWidth || this.x < 0) this.speedX *= -1;
            if (this.y > canvasHeight || this.y < 0) this.speedY *= -1;

            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvasWidth * canvasHeight) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    // Mouse move event
    teamSection.addEventListener('mousemove', (e) => {
        const rect = teamSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
}

// ============================================
// STANDARD SCROLL ANIMATIONS FOR TEAM SECTION
// ============================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const teamCards = document.querySelectorAll('.team-card');

    // Simple, smooth fade-in animations for all screen sizes
    teamCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 1
        });

        // Add active class when card is in view
        ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => card.classList.add('active'),
            onLeave: () => card.classList.remove('active'),
            onEnterBack: () => card.classList.add('active'),
            onLeaveBack: () => card.classList.remove('active')
        });
    });

    // Animate section header
    gsap.from('.team-section .section-header', {
        scrollTrigger: {
            trigger: '.team-section',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Animate scroll indicator
    gsap.from('.scroll-indicator', {
        scrollTrigger: {
            trigger: '.scroll-indicator',
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1
        },
        opacity: 0,
        y: 20,
        duration: 0.5
    });
}
