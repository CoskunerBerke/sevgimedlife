/* ==========================================================================
   Sevgi Medlife Ankara Güzellik Merkezi JS Logic
   Scripts: Antigravity AI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation Scroll Effect ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 2. Mobile Menu Toggle ---
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // --- 3. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
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


    // --- 4. Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-section');
    const statNums = document.querySelectorAll('.stat-num');
    let animated = false;

    const startCounters = () => {
        statNums.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-val');
                const count = +counter.innerText.replace('+', '').replace('%', '');
                
                // Speed depends on target size
                const speed = target > 500 ? 30 : 2;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    const nextVal = count + increment;
                    if (nextVal >= target) {
                        // Formatting output on completion
                        if (target === 100) {
                            counter.innerText = '%' + target;
                        } else if (target === 1000) {
                            counter.innerText = target + '+';
                        } else {
                            counter.innerText = target;
                        }
                    } else {
                        counter.innerText = nextVal;
                        setTimeout(updateCount, 40);
                    }
                } else {
                    if (target === 100) {
                        counter.innerText = '%' + target;
                    } else if (target === 1000) {
                        counter.innerText = target + '+';
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    };

    // Trigger on scroll using Intersection Observer
    if (statsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    startCounters();
                    animated = true;
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    } else if (statsSection) {
        // Fallback for older browsers
        window.addEventListener('scroll', () => {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight && !animated) {
                startCounters();
                animated = true;
            }
        });
    }


    // --- 5. Interactive Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                const imgAlt = item.querySelector('img').getAttribute('alt');
                
                lightboxImg.setAttribute('src', src);
                lightboxCaption.innerText = imgAlt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable scroll background
            });
        });

        // Close functions
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scroll
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }


    // --- 6. Quick Appointment Form Handler (Hero Section) ---
    const heroContactForm = document.getElementById('heroContactForm');
    const quickFormStatus = document.getElementById('quickFormStatus');

    if (heroContactForm && quickFormStatus) {
        heroContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('quickName').value.trim();
            const phone = document.getElementById('quickPhone').value.trim();
            const service = document.getElementById('quickService').value;

            if (!name || !phone || !service) {
                quickFormStatus.className = 'form-status error';
                quickFormStatus.innerText = 'Lütfen tüm alanları doldurun.';
                return;
            }

            // Simulate sending progress
            quickFormStatus.className = 'form-status';
            quickFormStatus.style.color = 'var(--primary)';
            quickFormStatus.innerText = 'Gönderiliyor...';

            setTimeout(() => {
                quickFormStatus.className = 'form-status success';
                quickFormStatus.innerText = 'Talebiniz alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.';
                heroContactForm.reset();
            }, 1000);
        });
    }


    // --- 7. Full Contact Form Handler ---
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm && contactFormStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !phone || !message) {
                contactFormStatus.className = 'form-status error';
                contactFormStatus.innerText = 'Lütfen zorunlu alanları (Ad, Telefon, Mesaj) doldurun.';
                return;
            }

            contactFormStatus.className = 'form-status';
            contactFormStatus.style.color = 'var(--primary)';
            contactFormStatus.innerText = 'Mesajınız gönderiliyor...';

            setTimeout(() => {
                contactFormStatus.className = 'form-status success';
                contactFormStatus.innerText = 'Mesajınız başarıyla gönderildi. Teşekkür ederiz!';
                contactForm.reset();
            }, 1200);
        });
    }
});
