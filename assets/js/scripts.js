// Animation GSAP pour la page d'accueil
gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1, delay: 0.5 });
gsap.from(".hero p", { opacity: 0, y: 50, duration: 1, delay: 1 });
gsap.from(".cta-button", { opacity: 0, scale: 0.5, duration: 1, delay: 1.5 });

// Animation GSAP pour la timeline
gsap.from(".timeline-item", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
    },
});




// Animation GSAP pour les projets
gsap.from(".projet-item", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".projet-grid",
        start: "top 80%",
    },
});

// Fonction pour ajuster la transparence en fonction du défilement
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('header, .hero, .experiences, .projets, .apropos');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Ajuste la transparence en fonction de la position de défilement
        if (scrollPosition > sectionTop - window.innerHeight / 2 && scrollPosition < sectionTop + sectionHeight) {
            section.style.background = 'rgba(255, 255, 255, 0.4)'; // Moins transparent
        } else {
            section.style.background = 'rgba(255, 255, 255, 0.3)'; // Plus transparent
        }
    });
});

// Fonction pour ajuster la transparence au survol
document.querySelectorAll('header, .hero, .experiences, .projets, .apropos').forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.background = 'rgba(255, 255, 255, 0.4)'; // Presque opaque au survol
    });

    section.addEventListener('mouseleave', () => {
        section.style.background = 'rgba(255, 255, 255, 0.3)'; // Retour à la transparence initiale
    });
});

// Ajout du fond animé avec un réseau de particules
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    canvas.id = "network-animation";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 80; // Nombre de points du réseau

    // Générer les particules
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 3 + 1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les particules
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#00ffcc";
            ctx.fill();
        });

        // Connecter les particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 204, ${1 - distance / 100})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        update();
    }

    function update() {
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            // Gérer les rebonds
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        requestAnimationFrame(draw);
    }

    draw();

    // Redimensionner le canvas si la fenêtre change de taille
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

