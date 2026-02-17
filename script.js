document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li:not(:last-child)'); // Exclude toggle button li
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // --- Dark Mode Logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Mobile Menu ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- Sticky Navbar ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            if (body.classList.contains('dark-mode')) {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            }
        } else {
            navbar.style.boxShadow = 'none'; // Or keep it based on CSS
        }
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = ["a Frontend Developer", "an MCA Student", "a Web Enthusiast", "a Creative Coder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    if (typingText) type();

    // --- Contact Form Handling (Visual Only) ---
    const contactForm = document.querySelector('.contact-form-modern');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Message Sent!';
            btn.style.backgroundColor = '#28a745';
            contactForm.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Smooth Scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // --- Bio Text Parallax Effect ---
    const bioSection = document.querySelector('.about-bio');
    const bioTitle = bioSection.querySelector('h3');
    const bioParagraphs = bioSection.querySelectorAll('p');

    if (bioSection && window.matchMedia("(min-width: 900px)").matches) {
        bioSection.addEventListener('mousemove', (e) => {
            const rect = bioSection.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move title (faster)
            bioTitle.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;

            // Move paragraphs (slower, staggered)
            bioParagraphs.forEach((p, index) => {
                const speed = 0.02 + (index * 0.01);
                p.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        bioSection.addEventListener('mouseleave', () => {
            bioTitle.style.transform = 'translate(0, 0)';
            bioParagraphs.forEach(p => {
                p.style.transform = 'translate(0, 0)';
            });
        });
    }
});

