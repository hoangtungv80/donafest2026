/* =============================================
   DONATEAM 2026 — GTA VI Theme JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ====== PRELOADER ======
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('loaded'), 1600);
    });
    setTimeout(() => preloader.classList.add('loaded'), 2500);

    // ====== NAVBAR ======
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ====== MOBILE NAV ======
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ====== PARTICLES (GTA VI COLORS) ======
    const particlesContainer = document.getElementById('particles');
    const particleColors = ['pink', 'teal', 'orange', 'purple'];

    function createParticles() {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.classList.add(particleColors[Math.floor(Math.random() * particleColors.length)]);
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 5) + 's';
            const size = (1 + Math.random() * 3) + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ====== COUNTDOWN ======
    const eventDate = new Date('2026-08-15T09:30:00+07:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(d).padStart(2, '0');
        document.getElementById('hours').textContent = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ====== STAT COUNTER ANIMATION ======
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                    counter.dataset.animated = 'true';
                }
            }
            requestAnimationFrame(update);
        });
    }

    // ====== SCROLL ANIMATIONS ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.aosDelay) || 0;
                setTimeout(() => entry.target.classList.add('aos-animate'), delay);
                if (entry.target.classList.contains('stat-card')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // ====== SCHEDULE TABS ======
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleDays = document.querySelectorAll('.schedule-day');

    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;
            scheduleTabs.forEach(t => t.classList.remove('active'));
            scheduleDays.forEach(d => d.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`day-${day}`).classList.add('active');

            // Re-trigger animations
            document.querySelectorAll(`#day-${day} [data-aos]`).forEach(item => {
                item.classList.remove('aos-animate');
                setTimeout(() => {
                    const d = parseInt(item.dataset.aosDelay) || 0;
                    setTimeout(() => item.classList.add('aos-animate'), d);
                }, 50);
            });
        });
    });

    // ====== SMOOTH SCROLL ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ====== REGISTER BUTTON GLOW PULSE ======
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        setInterval(() => {
            registerBtn.style.transform = 'translateY(-3px) scale(1.03)';
            setTimeout(() => { registerBtn.style.transform = ''; }, 400);
        }, 4000);
    }

    // ====== HERO PARALLAX SLIDER (AUTO SLIDE 2S) ======
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlideIndex = 0;
        setInterval(() => {
            heroSlides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
            heroSlides[currentSlideIndex].classList.add('active');
        }, 2000);
    }
});
