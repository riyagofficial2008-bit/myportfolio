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
