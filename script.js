// Language switching functionality
let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    
    // Update language and direction
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');
    
    // Update all text content
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language buttons with event listeners
function initLanguageButtons() {
    const enBtn = document.getElementById('en-btn');
    const arBtn = document.getElementById('ar-btn');
    
    if (enBtn) {
        enBtn.addEventListener('click', function() {
            switchLanguage('en');
        });
    }
    
    if (arBtn) {
        arBtn.addEventListener('click', function() {
            switchLanguage('ar');
        });
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language buttons
    initLanguageButtons();
    
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLang);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert(currentLang === 'en' 
                ? 'Thank you for your message! We will get back to you soon.' 
                : 'شكرا لك على رسالتك! سنعود إليك قريبا.');
            
            contactForm.reset();
        });
    }
    
    // Demo form submission handler
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert(currentLang === 'en' 
                ? 'Thank you for your interest! Saeed Al-Rashidi will contact you within 24 hours to schedule your demo.' 
                : 'شكرا لاهتمامك! سيتواصل معك سعيد الراشدي في غضون 24 ساعة لجدولة العرض التوضيحي الخاص بك.');
            
            demoForm.reset();
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards, tech items, and stat items
    document.querySelectorAll('.service-card, .tech-item, .stat-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});