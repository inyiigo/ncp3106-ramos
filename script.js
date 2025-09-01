// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for name in hero section
    const typedName = document.getElementById('typed-name');
    if (typedName) {
        const nameText = 'Franco Ramos';
        let i = 0;
        typedName.textContent = '';
        function typeChar() {
            if (i <= nameText.length) {
                typedName.textContent = nameText.substring(0, i);
                i++;
                setTimeout(typeChar, 120);
            }
        }
        typeChar();
    }
    // Educational Timeline grayscale on hover
    const eduTimelineItems = document.querySelectorAll('.edu-timeline-content');
    eduTimelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            eduTimelineItems.forEach(i => {
                if (i !== item) {
                    i.classList.add('grayscale-others');
                    const pic = i.querySelector('.edu-timeline-pic');
                    if (pic) pic.classList.remove('active-timeline');
                } else {
                    const pic = i.querySelector('.edu-timeline-pic');
                    if (pic) pic.classList.add('active-timeline');
                }
            });
        });
        item.addEventListener('mouseleave', function() {
            eduTimelineItems.forEach(i => {
                i.classList.remove('grayscale-others');
                const pic = i.querySelector('.edu-timeline-pic');
                if (pic) pic.classList.remove('active-timeline');
            });
        });
    });
    // About section tab image/carousel switch
    const whoamiTab = document.getElementById('whoami-tab');
    const hobbiesTab = document.getElementById('hobbies-tab');
    const aboutMainImage = document.getElementById('aboutMainImage');
    const hobbiesCarouselWrapper = document.getElementById('hobbiesCarouselWrapper');
    if (whoamiTab && hobbiesTab && aboutMainImage && hobbiesCarouselWrapper) {
        whoamiTab.addEventListener('click', function() {
            aboutMainImage.style.display = '';
            hobbiesCarouselWrapper.style.display = 'none';
        });
        hobbiesTab.addEventListener('click', function() {
            aboutMainImage.style.display = 'none';
            hobbiesCarouselWrapper.style.display = '';
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
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
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Navbar color scheme switching based on scroll/section
const sections = document.querySelectorAll('section[id]');
const getInTouchSection = document.getElementById('contact');

function updateNavbarColor() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const firstSection = sections[0];
  const getInTouchTop = getInTouchSection.offsetTop;
  const getInTouchHeight = getInTouchSection.offsetHeight;
  const navbarHeight = navbar.offsetHeight;

  // At the very top (first page)
  if (scrollY < firstSection.offsetTop + firstSection.offsetHeight - navbarHeight) {
    navbar.classList.add('navbar-light-bg');
    navbar.classList.remove('navbar-dark-bg');
  }
  // In Get in Touch section
  else if (
    scrollY + navbarHeight >= getInTouchTop &&
    scrollY < getInTouchTop + getInTouchHeight
  ) {
    navbar.classList.add('navbar-light-bg');
    navbar.classList.remove('navbar-dark-bg');
    
        // Hamburger toggle fix for Bootstrap navbar
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapseEl = document.getElementById('navbarNav');
        if (navbarToggler && navbarCollapseEl) {
            navbarToggler.addEventListener('click', function() {
                navbarToggler.classList.toggle('active');
            });
            navbarCollapseEl.addEventListener('hidden.bs.collapse', function() {
                navbarToggler.classList.remove('active');
            });
        }
  }
  // All other sections
  else {
    navbar.classList.add('navbar-dark-bg');
    navbar.classList.remove('navbar-light-bg');
  }
}

window.addEventListener('scroll', updateNavbarColor);
window.addEventListener('DOMContentLoaded', updateNavbarColor);

// Active navigation link highlighting
const sectionElements = document.querySelectorAll('section[id]');
    
window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Contact form handling
const contactForm = document.querySelector('.contact-form');
    
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'danger');
            return;
        }
        
        // Simulate form submission
        showAlert('Thank you for your message! I will get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert alert before the form
    const contactSection = document.querySelector('#contact .container');
    contactSection.insertBefore(alertDiv, contactSection.firstChild);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            if (entry.target.classList.contains('slide-right')) {
                entry.target.classList.add('in-view');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .slide-right');
animateElements.forEach(el => {
    observer.observe(el);
});

// Progress bar animation
const progressBars = document.querySelectorAll('.progress-bar');
    
const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect if element exists
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Modal animations
const projectModals = document.querySelectorAll('.modal');
    
projectModals.forEach(modal => {
    modal.addEventListener('show.bs.modal', function() {
        const modalContent = this.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 50);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .skill-card, .project-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-card.animate-in, .project-card.animate-in, .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-content {
        transition: all 0.3s ease;
    }
    
    .navbar-nav .nav-link.active {
        color: #011223 !important;
    }
    
    .navbar-nav .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Initialize tooltips if Bootstrap tooltips are available
if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add loading animation for images
const images = document.querySelectorAll('img');
    
images.forEach(img => {
    const showImage = () => {
        img.style.opacity = '1';
    };

    // Always set transition
    img.style.transition = 'opacity 0.5s ease';

    if (img.complete && img.naturalWidth !== 0) {
        // Image already loaded from cache
        showImage();
    } else {
        // Not loaded yet: start hidden, reveal on load
        img.style.opacity = '0';
        img.addEventListener('load', showImage, { once: true });
        // On error, don't keep it hidden
        img.addEventListener('error', showImage, { once: true });
    }
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe all sections
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Counter animation for skills
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Initialize counter animations when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    const percentage = parseInt(width);
                    animateCounter(bar, percentage);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Spider Web Animation
const spiderWeb = document.getElementById('spiderWeb');
let isOnFirstPage = true;
let mouseX = 0;
let mouseY = 0;
let animationFrame;

console.log('Spider web element:', spiderWeb);
console.log('Spider web classes:', spiderWeb ? spiderWeb.className : 'Not found');

// Mouse move event for spider web following
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    console.log('Mouse moved to:', mouseX, mouseY);
    
    if (isOnFirstPage && spiderWeb) {
        updateSpiderWebPosition();
    }
});

// Update spider web position to follow mouse
function updateSpiderWebPosition() {
    if (!spiderWeb) return;
    
    // Position the spider web around the mouse cursor
    spiderWeb.style.left = (mouseX - 50) + 'px';
    spiderWeb.style.top = (mouseY - 50) + 'px';
    
    // Add some parallax effect based on mouse position
    const lines = spiderWeb.querySelectorAll('.spider-web-line');
    const circles = spiderWeb.querySelectorAll('.spider-web-circle');
    const dots = spiderWeb.querySelectorAll('.spider-web-dot');
    
    lines.forEach((line, index) => {
        const speed = (index + 1) * 0.1;
        const offsetX = (mouseX - window.innerWidth / 2) * speed * 0.01;
        const offsetY = (mouseY - window.innerHeight / 2) * speed * 0.01;
        line.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.1}deg)`;
    });
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.05;
        const offsetX = (mouseX - window.innerWidth / 2) * speed * 0.005;
        const offsetY = (mouseY - window.innerHeight / 2) * speed * 0.005;
        circle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + Math.abs(offsetX) * 0.001})`;
    });
    
    dots.forEach((dot, index) => {
        const speed = (index + 1) * 0.08;
        const offsetX = (mouseX - window.innerWidth / 2) * speed * 0.008;
        const offsetY = (mouseY - window.innerHeight / 2) * speed * 0.008;
        dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    // Request next animation frame
    animationFrame = requestAnimationFrame(updateSpiderWebPosition);
}

// Check scroll position to show/hide spider web
function checkSpiderWebVisibility() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        
        if (isVisible && !isOnFirstPage) {
            // Entering first page
            isOnFirstPage = true;
            if (spiderWeb) {
                spiderWeb.classList.add('active');
                updateSpiderWebPosition();
            }
        } else if (!isVisible && isOnFirstPage) {
            // Leaving first page
            isOnFirstPage = false;
            if (spiderWeb) {
                spiderWeb.classList.remove('active');
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            }
        }
    }
}

// Initialize spider web on page load
if (spiderWeb) {
    spiderWeb.classList.add('active');
    updateSpiderWebPosition();
}

// Test button functionality
const testButton = document.getElementById('testSpiderWeb');
if (testButton) {
    testButton.addEventListener('click', function() {
        console.log('Test button clicked!');
        if (spiderWeb) {
            spiderWeb.classList.toggle('active');
            console.log('Spider web active:', spiderWeb.classList.contains('active'));
            if (spiderWeb.classList.contains('active')) {
                updateSpiderWebPosition();
            }
        }
    });
}

// Add scroll event listener for spider web visibility
window.addEventListener('scroll', checkSpiderWebVisibility);
    
// Initial check
checkSpiderWebVisibility();
    
// Clean up animation frame on page unload
window.addEventListener('beforeunload', function() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

// Timeline hover text effects
const timelineItems = document.querySelectorAll('.timeline-item');
    
timelineItems.forEach(item => {
    const paragraph = item.querySelector('p');
    const originalText = paragraph.getAttribute('data-original-text');
    
    item.addEventListener('mouseenter', function() {
        paragraph.textContent = 'Click for More!';
    });
    
    item.addEventListener('mouseleave', function() {
        paragraph.textContent = originalText;
    });
});

console.log('Portfolio website loaded successfully! 🚀');
});
