// ============================================
// MODERN TECH FACEWORK - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // THEME SWITCHER (Day/Night Mode)
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Get saved theme or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        currentTheme = theme;
    }

    // ============================================
    // LANGUAGE SWITCHER
    // ============================================
    const langButtons = document.querySelectorAll('.lang-btn');
    const body = document.body;

    // Set initial language (default to English)
    let currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);

    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        body.setAttribute('lang', lang);

        // Update button states
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-th]');
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe feature cards, team cards, and role cards
    const animateElements = document.querySelectorAll('.feature-card, .team-card, .role-card, .launcher-card');
    animateElements.forEach(el => observer.observe(el));

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(255, 255, 255, 1)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 1)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            nav.style.padding = '0.75rem 0';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // CODE TYPING ANIMATION
    // ============================================
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalCode = codeContent.innerHTML;
        codeContent.innerHTML = '';

        let i = 0;
        function typeCode() {
            if (i < originalCode.length) {
                codeContent.innerHTML += originalCode.charAt(i);
                i++;
                setTimeout(typeCode, 20);
            }
        }

        // Start typing after a delay
        setTimeout(typeCode, 1000);
    }

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

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // TEAM CAROUSEL AUTO-SCROLL
    // ============================================
    const teamScrollContainer = document.querySelector('.team-scroll-container');

    if (teamScrollContainer) {
        let scrollSpeed = 1; // pixels per frame
        let isScrolling = true;
        let userInteracting = false;
        let autoScrollInterval;

        // Auto-scroll function
        function autoScroll() {
            if (isScrolling && !userInteracting) {
                teamScrollContainer.scrollLeft += scrollSpeed;

                // Reset to beginning for infinite loop
                const maxScroll = teamScrollContainer.scrollWidth / 2;
                if (teamScrollContainer.scrollLeft >= maxScroll) {
                    teamScrollContainer.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }

        // Start auto-scrolling
        autoScroll();

        // Pause on hover
        teamScrollContainer.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        teamScrollContainer.addEventListener('mouseleave', () => {
            isScrolling = true;
        });

        // Detect manual scrolling
        let scrollTimeout;
        teamScrollContainer.addEventListener('scroll', () => {
            userInteracting = true;
            clearTimeout(scrollTimeout);

            // Resume auto-scroll after user stops scrolling for 2 seconds
            scrollTimeout = setTimeout(() => {
                userInteracting = false;
            }, 2000);
        });

        // Touch support for mobile
        teamScrollContainer.addEventListener('touchstart', () => {
            userInteracting = true;
            isScrolling = false;
        });

        teamScrollContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                userInteracting = false;
                isScrolling = true;
            }, 2000);
        });
    }

    // ============================================
    // PRESENTATION LAUNCHER
    // ============================================
    const launcherCards = document.querySelectorAll('.launcher-card');

    launcherCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            if (target === 'full') {
                // Hide launcher and show full presentation
                document.querySelector('.presentation-launcher').style.display = 'none';
                document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Hide launcher and navigate to specific section
                document.querySelector('.presentation-launcher').style.display = 'none';
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Enable presentation mode
            document.body.classList.add('presentation-mode');
        });
    });

    // ============================================
    // TEAM CAROUSEL
    // ============================================
    const teamCards = document.querySelectorAll('.team-card-large');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showCard(index) {
        teamCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }

    if (prevBtn && nextBtn && teamCards.length > 0) {
        // Show first card on load
        showCard(0);

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + teamCards.length) % teamCards.length;
            showCard(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % teamCards.length;
            showCard(currentIndex);
        });

        // Indicator click
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showCard(currentIndex);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + teamCards.length) % teamCards.length;
                showCard(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % teamCards.length;
                showCard(currentIndex);
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        const carousel = document.querySelector('.team-carousel');
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left
                    currentIndex = (currentIndex + 1) % teamCards.length;
                    showCard(currentIndex);
                }
                if (touchEndX > touchStartX + 50) {
                    // Swipe right
                    currentIndex = (currentIndex - 1 + teamCards.length) % teamCards.length;
                    showCard(currentIndex);
                }
            }
        }
    }

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🚀 HealthAte', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #14b8a6 0%, #fb923c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%c💚 Your wellness journey starts here', 'font-size: 14px; color: #a0a0b0;');
    console.log('%c📧 Email us at info@healthate.com', 'font-size: 14px; color: #14b8a6;');
});
