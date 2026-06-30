// script.js

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function() {
    // Typing animation for hero subtitle
    const subtitle = document.getElementById("subtitle");
    const texts = ["B.Tech CSE Student", "Java Developer", "Future AI Entrepreneur"];
    // Function to type one text string
    function typeText(text, i, callback) {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            setTimeout(() => typeText(text, i + 1, callback), 100);
        } else if (callback) {
            callback();
        }
    }
    // Type each line sequentially
    function startTypingSequence() {
        typeText(texts[0], 0, () => {
            subtitle.innerHTML += "<br/>";
            typeText(texts[1], 0, () => {
                subtitle.innerHTML += "<br/>";
                typeText(texts[2], 0);
            });
        });
    }
    startTypingSequence();

    // Intersection Observer for scroll reveal and skill bar animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Animate skill bars when skills section is in view
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.progress-bar').forEach(bar => {
                        const level = bar.getAttribute('data-skill-level');
                        bar.style.width = level + '%';
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections marked with 'reveal'
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Theme toggle (light/dark)
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });

    // Back to top button
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form validation (simple)
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }
        // Basic email pattern check
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        alert("Message sent! Thank you.");
        form.reset();
    });
});

// Canvas-based floating particles background
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
// Resize canvas to full window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize particles
let particles = [];
function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        const radius = Math.random() * 3 + 1;
        const color = Math.random() > 0.5
            ? 'rgba(0,229,255,0.7)'
            : 'rgba(195,64,255,0.7)';
        particles.push({ x, y, vx, vy, radius, color });
    }
}
initParticles();

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Hide preloader once page fully loads
window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
});
