document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Sticky Header Blur Effect
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
            header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = 'none';
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate Hamburger
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            // Reset hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Custom Cursor (Desktop Only)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(min-width: 1024px)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with delay (using CSS transition or simple animation)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects for cursor
        document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Typing Effect
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const words = ['Solutions', 'Quality', 'Scale', 'Innovate'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 100 : 200);
            }
        };
        type();
    }

    // Number Counter Animation
    const statsSection = document.querySelector('.about-stats-grid');
    let hasAnimated = false;

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.innerText.replace(/[0-9]/g, '');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCounter();
                });
                hasAnimated = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // Form Handling
    const form = document.getElementById('contactForm');
    if (form) {
        const formStatus = document.getElementById('form-status');
        const allInputs = form.querySelectorAll('input, textarea');

        const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = '';
            formStatus.className = '';
            allInputs.forEach(input => input.classList.remove('invalid'));

            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();

            let errors = [];
            if (!name) {
                errors.push('Full Name is required.');
                form.querySelector('#name').classList.add('invalid');
            }
            if (!email) {
                errors.push('Email is required.');
                form.querySelector('#email').classList.add('invalid');
            } else if (!validateEmail(email)) {
                errors.push('Email is invalid.');
                form.querySelector('#email').classList.add('invalid');
            }
            if (!subject) {
                errors.push('Subject is required.');
                form.querySelector('#subject').classList.add('invalid');
            }
            if (!message) {
                errors.push('Message is required.');
                form.querySelector('#message').classList.add('invalid');
            }

            if (errors.length > 0) {
                formStatus.textContent = errors.join(' ');
                formStatus.classList.add('error');
                return;
            }
            
            const recipientEmail = 'chuyongglean@gmail.com';
            const mailtoSubject = encodeURIComponent(subject);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nFrom: ${email}\n\nMessage:\n${message}`
            );
            
            window.location.href = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

            formStatus.textContent = 'Opening your email client to send the message...';
            formStatus.classList.add('success');
            
            setTimeout(() => {
                form.reset();
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
        });
    }

    // Copyright Year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
