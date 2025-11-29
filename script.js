// Portfolio Animation Script
// This script provides smooth animations for your portfolio, including scroll-based reveals, typing effects, and interactive elements.
// It uses vanilla JavaScript for performance and compatibility. For advanced animations, consider libraries like GSAP or AOS.

// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// 2. Hamburger Menu Toggle Animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open'); // Add 'open' class for CSS animation
});

// Add CSS for hamburger animation (append to your styles.css if not present)
const hamburgerStyle = `
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
.hamburger span { transition: 0.3s; }
`;

// 3. Typing Animation for Hero Title
const heroTitle = document.querySelector('.hero-content h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Adjust speed here
    }
}
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000); // Delay start
});

// 4. Fade-in Animation on Scroll using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS for fade-in (append to your styles.css)
const fadeInStyle = `
section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
section.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// 5. Staggered Animation for Skills Grid
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('skill-animate');
});

// Add CSS for skill animation (append to your styles.css)
const skillStyle = `
.skill-item {
    opacity: 0;
    transform: translateY(20px);
    animation: skillFadeIn 0.6s ease forwards;
}
@keyframes skillFadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// 6. Hover Animation Enhancement for Projects
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px) scale(1.02)';
    });
    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
    });
});

// 7. Modal Animation Enhancements
function openModal(src) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    const modalPdf = document.getElementById("modalPdf");
    modal.style.display = "block";
    modal.classList.add('modal-open'); // Add class for animation
    if (src.toLowerCase().endsWith('.pdf')) {
        modalImg.style.display = "none";
        modalPdf.style.display = "block";
        modalPdf.src = src;
    } else {
        modalPdf.style.display = "none";
        modalImg.style.display = "block";
        modalImg.src = src;
    }
}

function closeModal() {
    const modal = document.getElementById("certModal");
    modal.classList.remove('modal-open');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Match transition duration
}

// Add CSS for modal animation (append to your styles.css)
const modalStyle = `
.modal {
    opacity: 0;
    transition: opacity 0.3s ease;
}
.modal.modal-open {
    opacity: 1;
}
.modal-content {
    transform: scale(0.9);
    transition: transform 0.3s ease;
}
.modal.modal-open .modal-content {
    transform: scale(1);
}
`;

// 8. Form Submission Animation
const form = document.querySelector("[data-form]");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.querySelector("[data-form-btn]");
    btn.innerHTML = '<ion-icon name="checkmark"></ion-icon><span>Sent!</span>';
    btn.style.background = '#28a745';
    setTimeout(() => {
        form.reset();
        btn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
        btn.style.background = 'rgb(11, 240, 99)';
        checkInputs();
    }, 2000);
});

// Inject dynamic styles (optional, or add to CSS file)
const style = document.createElement('style');
style.textContent = hamburgerStyle + fadeInStyle + skillStyle + modalStyle;
document.head.appendChild(style);

// Note: Ensure your HTML includes the necessary classes and IDs. Test on different devices for performance.
// For even better animations, consider using a library like GSAP (https://greensock.com/gsap/) for more complex effects.