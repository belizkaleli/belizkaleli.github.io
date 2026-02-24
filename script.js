// ===========================
// Initialize Lucide Icons
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    lucide.createIcons();
    initSidebar();
    initSmoothScroll();
    initActiveLinks();
});

// ===========================
// Theme Toggle
// ===========================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        console.log('Switching theme from', currentTheme, 'to', newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Reinitialize icons after theme change
        setTimeout(() => {
            lucide.createIcons();
        }, 10);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    let icon = themeToggle.querySelector('i');
    if (!icon) return;

    // Remove old icon
    icon.remove();

    // Create new icon with correct type
    const newIcon = document.createElement('i');
    if (theme === 'dark') {
        newIcon.setAttribute('data-lucide', 'sun');
    } else {
        newIcon.setAttribute('data-lucide', 'moon');
    }
    themeToggle.appendChild(newIcon);
}

// ===========================
// Sidebar Navigation
// ===========================

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking on a link on mobile
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// ===========================
// Smooth Scroll
// ===========================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================
// Active Link Highlighting
// ===========================

function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
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
                link.textContent = 'Copied!';
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
// Link Placeholder Handler
// ===========================

document.querySelectorAll('.item-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
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
// Console Message
// ===========================

console.log(`
%c████████████████████████████████████████
█                                      █
█   Beliz Kaleli                       █
█   Cybersecurity Research Engineer    █
█                                      █
████████████████████████████████████████
`,
'color: #ff6b35; font-family: monospace; font-size: 12px; font-weight: bold;'
);
