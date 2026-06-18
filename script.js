const menuIcon = document.getElementById("menuIcon");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");
const topBtn = document.getElementById("topBtn");
const contactForm = document.getElementById("contactForm");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");

  if (navbar.classList.contains("active")) {
    menuIcon.innerHTML = '<i class="ri-close-line"></i>';
  } else {
    menuIcon.innerHTML = '<i class="ri-menu-line"></i>';
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.innerHTML = '<i class="ri-menu-line"></i>';
  });
});

const words = [
  "MERN Stack Developer",
  // "Frontend Developer",
  // "Web Developer",
  "React Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 70 : 120;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1300;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  if (window.scrollY > 400) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

contactForm.addEventListener("submit", (e) => {
  // e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || subject === "" || message === "") {
    alert("Please fill all fields.");
    return;
  }

  alert("Message sent successfully!");
  contactForm.reset();
});

const revealElements = document.querySelectorAll(
  ".about-container, .skill-box, .project-card, .timeline-item, .contact-container"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);






const tabButtons = document.querySelectorAll(".tab-btn");
const showcasePanels = document.querySelectorAll(".showcase-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    showcasePanels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");

    const targetId = button.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});

const viewCertButtons = document.querySelectorAll(".view-cert-btn");
const certificatePopup = document.getElementById("certificatePopup");
const popupCertificate = document.getElementById("popupCertificate");
const closePopup = document.getElementById("closePopup");

viewCertButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const imgPath = button.getAttribute("data-img");
    popupCertificate.src = imgPath;
    certificatePopup.classList.add("active");
  });
});

closePopup.addEventListener("click", () => {
  certificatePopup.classList.remove("active");
  popupCertificate.src = "";
});

certificatePopup.addEventListener("click", (e) => {
  if (e.target === certificatePopup) {
    certificatePopup.classList.remove("active");
    popupCertificate.src = "";
  }
});






const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".projects-grid .project-card");
const viewAllProjectsBtn = document.getElementById("viewAllProjects");

let currentProjectFilter = "all";
let projectsExpanded = false;

function updateProjects() {
  let visibleProjects = [];

  projectCards.forEach((card) => {
    const category = card.getAttribute("data-category");

    if (currentProjectFilter === "all" || category === currentProjectFilter) {
      visibleProjects.push(card);
    } else {
      card.classList.add("hide-project");
    }
  });

  visibleProjects.forEach((card, index) => {
    card.classList.remove("project-animate");

    if (!projectsExpanded && index >= 4) {
      card.classList.add("hide-project");
    } else {
      card.classList.remove("hide-project");

      setTimeout(() => {
        card.classList.add("project-animate");
      }, 20);
    }
  });

  if (visibleProjects.length <= 4) {
    viewAllProjectsBtn.style.display = "none";
  } else {
    viewAllProjectsBtn.style.display = "inline-flex";

    if (projectsExpanded) {
      viewAllProjectsBtn.innerHTML = 'Show Less <i class="ri-arrow-up-line"></i>';
    } else {
      viewAllProjectsBtn.innerHTML = 'View All Projects <i class="ri-arrow-down-line"></i>';
    }
  }
}

projectFilters.forEach((button) => {
  button.addEventListener("click", () => {
    projectFilters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentProjectFilter = button.getAttribute("data-filter");
    projectsExpanded = false;

    updateProjects();
  });
});

viewAllProjectsBtn.addEventListener("click", () => {
  projectsExpanded = !projectsExpanded;
  updateProjects();
});

updateProjects();