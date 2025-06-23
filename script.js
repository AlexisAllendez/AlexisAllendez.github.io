// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    setupNavbar();
    setupSmoothScrolling();
    setupAnimations();
    setupFormValidation();
    setupContactForm();
    setupScrollEffects();
    setupLoadingAnimations();
}

// ===== NAVBAR FUNCTIONALITY =====
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Intersection Observer for scroll animations with better options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on element type
                const element = entry.target;
                const animationType = element.dataset.animation || 'fade-in-up';
                element.classList.add(`animate-${animationType}`);
                
                // Add delay for staggered animations
                if (element.dataset.delay) {
                    element.style.animationDelay = element.dataset.delay;
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Section observer for full section animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe different types of elements with specific animations
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const credentialItems = document.querySelectorAll('.credential-item');
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const sections = document.querySelectorAll('section:not(#home)');
    
    // Animate sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Service cards with staggered animation
    serviceCards.forEach((card, index) => {
        card.dataset.animation = 'fade-in-up';
        card.dataset.delay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Testimonial cards with staggered animation
    testimonialCards.forEach((card, index) => {
        card.dataset.animation = 'fade-in-up';
        card.dataset.delay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Credential items with slide animation
    credentialItems.forEach((item, index) => {
        item.dataset.animation = 'slide-in-left';
        item.dataset.delay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Section titles with fade animation
    sectionTitles.forEach(title => {
        title.dataset.animation = 'fade-in-down';
        observer.observe(title);
    });
    
    // Section subtitles with fade animation
    sectionSubtitles.forEach(subtitle => {
        subtitle.dataset.animation = 'fade-in-up';
        subtitle.dataset.delay = '0.3s';
        observer.observe(subtitle);
    });
    
    // Floating cards animation
    animateFloatingCards();
    
    // Initial animation for hero section
    animateHeroSection();
}

function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate-fade-in-left');
        }, 300);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animate-fade-in-right');
        }, 500);
    }
}

// ===== FLOATING CARDS ANIMATION =====
function animateFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('is-invalid');
    
    // Validation rules
    switch(field.id) {
        case 'nombre':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
            break;
            
        case 'telefono':
            if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
            break;
            
        case 'servicio':
            if (!value) {
                isValid = false;
                errorMessage = 'Por favor selecciona un servicio';
            }
            break;
            
        case 'mensaje':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ===== FORM SUBMISSION =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showLoadingState(submitBtn);
            simulateFormSubmission(submitBtn);
        }
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Store original text for restoration
    button.dataset.originalText = originalText;
}

function simulateFormSubmission(button) {
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage();
        resetForm();
        restoreButton(button);
    }, 2000);
}

function showSuccessMessage() {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong>¡Mensaje enviado!</strong> Te contactaremos pronto.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function resetForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    
    // Clear any error styling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        const errorDiv = input.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    });
}

function restoreButton(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    // Progress bar for scroll
    createScrollProgressBar();
}

function createScrollProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== LOADING ANIMATIONS =====
function setupLoadingAnimations() {
    // Add loading class to elements
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .credential-item');
    elements.forEach(el => {
        el.classList.add('loading');
    });
    
    // Trigger loading animation
    setTimeout(() => {
        elements.forEach(el => {
            el.classList.add('loaded');
        });
    }, 100);
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ADDITIONAL STYLES FOR FORM VALIDATION =====
const additionalStyles = `
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .navbar-nav .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .navbar-nav .nav-link.active::after {
        width: 100% !important;
    }
    
    .alert {
        border-radius: var(--border-radius);
        border: none;
        box-shadow: var(--shadow);
    }
    
    .alert-success {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        color: #155724;
    }
    
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
window.addEventListener('scroll', throttle(function() {
    updateActiveNavLink();
}, 100));

// Debounce resize events
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments if needed
}, 250));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

// Add focus management for better accessibility
const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// ===== ANALYTICS (PLACEHOLDER) =====
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contactForm') {
        trackEvent('form_submit', {
            form_name: 'contact_form',
            service: document.getElementById('servicio').value
        });
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_class: e.target.className
        });
    }
}); 