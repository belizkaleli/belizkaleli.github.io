// ===========================
// Initialize Lucide Icons
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
});

// ===========================
// Navigation
// ===========================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// Smooth Scroll
// ===========================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// Scroll Animations
// ===========================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .about-expertise,
        .expertise-card,
        .skills-section,
        .timeline-item,
        .publication-card,
        .talk-card,
        .award-card,
        .contact-card,
        .availability
    `);

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add staggered delay
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

// ===========================
// Parallax Effect for Hero Grid
// ===========================

const heroGrid = document.querySelector('.hero-grid');

if (heroGrid) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            heroGrid.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===========================
// Dynamic Grid Animation
// ===========================

// Add mouse movement parallax to hero content
const heroContent = document.querySelector('.hero-content');

if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;

            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ===========================
// Copy Email on Click
// ===========================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        const email = link.textContent.trim();

        if (email.includes('@')) {
            e.preventDefault();

            try {
                await navigator.clipboard.writeText(email);

                // Show feedback
                const originalText = link.textContent;
                link.textContent = 'Email copied!';
                link.style.color = 'var(--color-accent-primary)';

                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            } catch (err) {
                // If clipboard API fails, open mailto link
                window.location.href = link.href;
            }
        }
    });
});

// ===========================
// Publication/Talk Link Analytics
// ===========================

document.querySelectorAll('.pub-link, .talk-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent navigation for demo purposes
        if (link.getAttribute('href') === '#') {
            e.preventDefault();

            // Visual feedback
            const originalColor = link.style.color;
            link.style.color = 'var(--color-accent-primary)';

            setTimeout(() => {
                link.style.color = originalColor;
            }, 300);
        }
    });
});

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener('keydown', (e) => {
    // Alt + Arrow keys to navigate between sections
    if (e.altKey) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });

        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let targetSection;

            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetSection = sections[currentIndex + 1];
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetSection = sections[currentIndex - 1];
            }

            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ===========================
// Performance: Reduce animations on low-end devices
// ===========================

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--transition-base', '0.15s');
    document.documentElement.style.setProperty('--transition-slow', '0.25s');
}

// ===========================
// Console Message
// ===========================

console.log(`
%c████████████████████████████████████████
█                                      █
█   Beliz Kaleli                       █
█   Cybersecurity Research Engineer    █
█                                      █
█   Interested in the code?            █
█   Check out the repo or get in touch █
█                                      █
████████████████████████████████████████
`,
'color: #00d9ff; font-family: monospace; font-size: 12px; font-weight: bold;'
);

console.log(
    '%cSecurity Tip: Never paste code into the console unless you understand what it does!',
    'color: #ff006e; font-size: 14px; font-weight: bold; background: #1a1f3a; padding: 10px; border-left: 4px solid #ff006e;'
);

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// Easter Egg: Konami Code
// ===========================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add fun animation or effect
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);

    console.log('%c🎮 Konami Code Activated! 🎮', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
}

// ===========================
// Preload Critical Resources
// ===========================

// Preload fonts
const fontPreload = document.createElement('link');
fontPreload.rel = 'preload';
fontPreload.as = 'font';
fontPreload.type = 'font/woff2';
fontPreload.crossOrigin = 'anonymous';

// ===========================
// Service Worker Registration (Optional)
// ===========================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker for offline functionality
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}
