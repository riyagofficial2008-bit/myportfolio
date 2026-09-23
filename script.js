// ==========================================================================
// 3D Wireframe Cube Cinematic Opening Intro
// ==========================================================================
(function init3DCubeIntro() {
  const overlay = document.getElementById("introOverlay");
  const skipBtn = document.getElementById("introSkipBtn");
  const statusText = document.getElementById("hudStatusText");
  const canvas = document.getElementById("introParticles");

  if (!overlay) return;

  document.body.classList.add("intro-active");

  let introFinished = false;
  let animFrameId = null;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Particle System
  let ctx = null;
  let particles = [];
  let width = 0;
  let height = 0;

  if (canvas && !prefersReducedMotion) {
    ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Spawn ~42 cyber particles
    const particleCount = Math.min(48, Math.floor(window.innerWidth / 28));
    const colors = ["rgba(109, 231, 255,", "rgba(91, 140, 255,", "rgba(166, 108, 255,"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.2 - Math.random() * 0.6,
        radius: 1 + Math.random() * 2,
        baseAlpha: 0.2 + Math.random() * 0.55,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const renderParticles = () => {
      if (introFinished) return;
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.16;
            ctx.strokeStyle = `rgba(109, 231, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.15;
        ctx.fillStyle = `${p.colorPrefix} ${Math.max(0.05, Math.min(currentAlpha, 1))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(109, 231, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameId = requestAnimationFrame(renderParticles);
    };

    animFrameId = requestAnimationFrame(renderParticles);
  }

  // Finish intro and transition to portfolio
  function finishIntro(instant = false) {
    if (introFinished) return;
    introFinished = true;

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    if (instant || prefersReducedMotion) {
      overlay.classList.add("hidden");
      document.body.classList.remove("intro-active");
      revealHero();
      return;
    }

    overlay.classList.add("fade-out");

    setTimeout(() => {
      overlay.classList.add("hidden");
      document.body.classList.remove("intro-active");
      revealHero();
    }, 650);
  }

  function revealHero() {
    // Ensure hero elements reveal smoothly
    document.querySelectorAll(".hero .reveal").forEach(el => {
      el.classList.add("visible");
    });
  }

  // Event Listeners for skip
  if (skipBtn) {
    skipBtn.addEventListener("click", () => finishIntro(false));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && !introFinished) {
      finishIntro(false);
      window.removeEventListener("keydown", handleKeyDown);
    }
  };
  window.addEventListener("keydown", handleKeyDown);

  // Timeline Sequence
  if (prefersReducedMotion) {
    setTimeout(() => finishIntro(true), 300);
    return;
  }

  // Telemetry updates
  setTimeout(() => {
    if (!introFinished && statusText) {
      statusText.textContent = "SYNCHRONIZING 3D MATRIX...";
    }
  }, 1400);

  setTimeout(() => {
    if (!introFinished && statusText) {
      statusText.textContent = "NEURAL CORE ACTIVE // LAUNCHING";
    }
  }, 2300);

  // Accelerate and dissolve sequence
  setTimeout(() => {
    if (!introFinished) {
      overlay.classList.add("fade-out");
    }
  }, 2850);

  // Final cleanup and reveal
  setTimeout(() => {
    finishIntro(false);
  }, 3450);
})();

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

// Theme toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";
  localStorage.setItem("riya-theme", body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("riya-theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☾";
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Custom cursor
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
window.addEventListener("mousemove", e => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});
document.querySelectorAll("a, button, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => ring.classList.add("hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
});

// Interactive AI console
const commands = {
  whoami: "Curious builder. AI/ML student. Professional experimenter.",
  skills: "Python • C • HTML/CSS • JavaScript • Git/GitHub • ML • Data Science • Excel",
  mission: "Learn deeply → build boldly → ship useful things → keep improving.",
  funfact: "I like turning random ideas into projects just to see if I can."
};
const consoleCommand = document.getElementById("consoleCommand");
const consoleOutput = document.getElementById("consoleOutput");
document.querySelectorAll("[data-command]").forEach(btn => {
  btn.addEventListener("click", () => {
    const cmd = btn.dataset.command;
    consoleCommand.textContent = cmd;
    consoleOutput.textContent = commands[cmd];
  });
});

// Project concept modal
const projectData = {
  "Study Buddy AI": {
    title: "Study Buddy AI",
    category: "Python • AI • Education",
    description: "An AI-powered study assistant that helps students turn their notes into simple summaries, quick quizzes, and revision questions. The goal is to make studying more organized and interactive."
  },
  "Skill Quest": {
    title: "Skill Quest",
    category: "HTML • CSS • JavaScript • Game UX",
    description: "A gamified learning dashboard that turns coding practice into missions, XP, levels, and progress tracking. It is designed to make learning programming more engaging."
  },
  "DataLens": {
    title: "DataLens",
    category: "Python • Data Science • Visualization",
    description: "An interactive data exploration tool that helps users understand datasets through simple visualizations, patterns, and insights."
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalDescription = document.getElementById("modalDescription");

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".demo-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const projectName = link.dataset.project;
    const project = projectData[projectName];
    if (project) {
      modalTitle.textContent = project.title;
      if (modalTech) modalTech.textContent = project.category;
      if (modalDescription) modalDescription.textContent = project.description;
    } else {
      modalTitle.textContent = projectName;
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOk").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
window.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  // Real email configured for portfolio contact
  const YOUR_EMAIL = "riyagofficial@gmail.com";

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const bodyText = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${bodyText}`;
});

// Small typing effect in the hero eyebrow
const phrases = ["B.TECH • AI/ML • BUILDER", "PYTHON • WEB • DATA", "CURIOUS • CREATIVE • LEARNING"];
const eyebrow = document.querySelector(".hero .eyebrow");
let phraseIndex = 0;
setInterval(() => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  eyebrow.animate([{opacity:1},{opacity:.15},{opacity:1}], {duration:500});
  setTimeout(() => eyebrow.textContent = phrases[phraseIndex], 250);
}, 3200);
