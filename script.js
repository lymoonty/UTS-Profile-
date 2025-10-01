// Smooth scrolling to sections
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Update active navigation dot on scroll
window.addEventListener('scroll', () => {
    const sections = ['hero', 'personal', 'education', 'organization', 'hobby', 'skills', 'contact'];
    const navDots = document.querySelectorAll('.nav-dot');
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
        }
    });
    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (sections[index] === current) {
            dot.classList.add('active');
        }
    });
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
observer.observe(skillsSection);

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Berhasil disalin ke clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Gagal menyalin ke clipboard!');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(179, 193, 220, 0.4);
        animation: slideInNotification 0.5s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial scroll event to set active nav
    window.dispatchEvent(new Event('scroll'));
});