// Translations Database
const langData = {
    en: {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-services": "Services",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "hero-title": "Professional Remodeling & Construction Services",
        "hero-subtitle": "Quality craftsmanship for residential and commercial projects.",
        "btn-estimate": "Free Estimate",
        "btn-contact": "Contact Us",
        "about-title": "About Us",
        "about-desc": "ALFA & OMEGA CONSTRUCTION specializes in high-quality remodeling and construction services with professionalism and attention to detail.",
        "feat-quality": "Quality Craftsmanship",
        "feat-pricing": "Fair Pricing",
        "feat-time": "On-time Completion",
        "services-title": "Our Services",
        "projects-title": "Our Projects",
        "proj-residential": "Residential",
        "proj-commercial": "Commercial",
        "proj-remodel": "Remodeling",
        "contact-title": "Contact Us",
        "contact-info-title": "Contact Information",
        "lang-available-text": "We speak English & Spanish",
        "contact-name": "Name",
        "contact-email": "Email",
        "contact-phone": "Phone",
        "contact-msg": "Message",
        "contact-send": "Send Message",
        "footer-desc": "Frame - Cornice - Remodeling",
        "footer-rights": "All Rights Reserved."
    },
    es: {
        "nav-home": "Inicio",
        "nav-about": "Nosotros",
        "nav-services": "Servicios",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "hero-title": "Servicios Profesionales de Remodelación y Construcción",
        "hero-subtitle": "Artesanía de calidad en proyectos residenciales y comerciales.",
        "btn-estimate": "Presupuesto Gratis",
        "btn-contact": "Contáctanos",
        "about-title": "Acerca de Nosotros",
        "about-desc": "ALFA & OMEGA CONSTRUCTION se especializa en remodelaciones y servicios de construcción de alta calidad con profesionalismo y atención al detalle.",
        "feat-quality": "Trabajo de Calidad",
        "feat-pricing": "Precios Justos",
        "feat-time": "Entrega a Tiempo",
        "services-title": "Nuestros Servicios",
        "projects-title": "Nuestros Proyectos",
        "proj-residential": "Residencial",
        "proj-commercial": "Comercial",
        "proj-remodel": "Remodelación",
        "contact-title": "Contáctanos",
        "contact-info-title": "Información de Contacto",
        "lang-available-text": "Hablamos Inglés y Español",
        "contact-name": "Nombre",
        "contact-email": "Correo",
        "contact-phone": "Teléfono",
        "contact-msg": "Mensaje",
        "contact-send": "Enviar Mensaje",
        "footer-desc": "Marco - Cornisa - Remodelación",
        "footer-rights": "Todos los Derechos Reservados."
    }
};

const servicesData = {
    en: [
        "Interior Demolition",
        "Drywall / Sheetrock",
        "Wall & Ceiling Texture",
        "Interior / Exterior Painting",
        "Flooring Installation",
        "Baseboards, Trim & Door",
        "Interior / Exterior Door Installation",
        "Cabinets / Backsplash",
        "Bathroom Remodeling",
        "Siding Installation & Repair",
        "Fence Installation",
        "Deck & Porch Construction",
        "Windows & Exterior"
    ],
    es: [
        "Demolición Interior",
        "Drywall / Sheetrock",
        "Textura de Paredes y Techos",
        "Pintura Interior / Exterior",
        "Instalación de Pisos",
        "Zócalos, Molduras y Puertas",
        "Instalación de Puertas Interior / Exterior",
        "Gabinetes / Backsplash",
        "Remodelación de Baños",
        "Instalación y Reparación de Siding",
        "Instalación de Cercas",
        "Construcción de Decks y Porches",
        "Ventanas y Exterior"
    ]
};

// Application State
let currentLang = 'en';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    renderServices('en');
    initLanguageToggle();
    initContactForm();
    initCallFloat();
    
    // Add page load animation slightly after to ensure smooth rendering
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('appear');
    }, 100);
});

// Update Copyright Year
function initYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let isScrolled = false;
    
    window.addEventListener('scroll', () => {
        const shouldBeScrolled = window.scrollY > 20;
        if (shouldBeScrolled !== isScrolled) {
            navbar.classList.toggle('scrolled', shouldBeScrolled);
            isScrolled = shouldBeScrolled;
        }
    }, { passive: true });

    // Run once on load
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        isScrolled = true;
    }
}

// Mobile Hamburger Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-anim');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Run animation once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Language Toggle Logic
function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateTranslations(currentLang);
        renderServices(currentLang);
    });
}

// Update DOM with translations
function updateTranslations(lang) {
    const dict = langData[lang];
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key]; // If placeholder needs translation
            } else {
                el.innerHTML = dict[key];
            }
        }
    });
}

// Render Services dynamically
function renderServices(lang) {
    const servicesGrid = document.getElementById('services-grid');
    const services = servicesData[lang];
    
    // Clear grid
    servicesGrid.innerHTML = '';
    
    // Simple icon SVG to reuse for all services (can be replaced individually if more specific icons exist)
    const iconSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        
        card.innerHTML = `
            <div class="service-icon">
                ${iconSVG}
            </div>
            <h3 class="service-title">${service}</h3>
        `;
        
        servicesGrid.appendChild(card);
    });
}

// Contact Form Logic
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        );
        
        // Open default SMS app with pre-filled message
        window.location.href = `sms:8327182029?body=${body}`;
        
        // Optional: clear form after submission
        form.reset();
    });
}

// Floating Call Logic
function initCallFloat() {
    const callBtn = document.getElementById('call-float-btn');
    const callOptions = document.getElementById('call-options');
    
    if (callBtn && callOptions) {
        callBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            callOptions.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!callOptions.contains(e.target) && !callBtn.contains(e.target)) {
                callOptions.classList.remove('active');
            }
        });
    }
}
