// JavaScript Document

/*

TemplateMo 600 Prism Flux

https://templatemo.com/tm-600-prism-flux

*/

// Portfolio data for carousel

const portfolioData = [
  {
    id: 1,
    title: "Teams App",
    description:
      "Teams App je vježbovni projekt koji replicira osnovne funkcionalnosti timske suradnje i komunikacije putem moderne web aplikacije.",
    image: "images/portfolio1.png",
    tech: ["Html", "CSS", "JavaScript", "Webflow", "Design"],
  },
  {
    id: 2,
    title: "OPG Mlađen",
    description:
      "Portfolio OPG Mlađen predstavlja jednostavan web projekt dizajniran za prikaz i promociju obiteljskog poljoprivrednog gospodarstva.",
    image: "images/portfolio2.png",
    tech: ["Html", "CSS", "JavaScript", "Webflow", "Design"],
  },
  {
    id: 3,
    title: "Chat App",
    description:
      "Chat App je web aplikacija napravljena kao vježba za razvoj real-time komunikacije pomoću modernih web tehnologija.",
    image: "images/portfolio3.png",
    tech: ["Html", "CSS", "JavaScript", "Webflow", "Design"],
  },
  {
    id: 4,
    title: "Sebenico bar",
    description:
      "Sebenico Bar je web stranica kreirana za promociju lokalnog bara, s fokusom na ponudu pića i ugodnu atmosferu.",
    image: "images/portfolio4.png",
    tech: ["Html", "CSS", "JavaScript", "Design"],
  },
  {
    id: 5,
    title: "OPG Bakmaz",
    description:
      "OPG Bakmaz je web projekt razvijen za predstavljanje i promociju obiteljskog poljoprivrednog gospodarstva Bakmaz.",
    image: "images/portfolio5.png",
    tech: ["Html", "CSS", "JavaScript", "Design"],
  },
];

// Skills data

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById("header");
  if (section) {
    const headerHeight = header.offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Initialize particles for philosophy section
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random horizontal position
    particle.style.left = Math.random() * 100 + "%";

    // Start particles at random vertical positions throughout the section
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay for natural movement
    particle.style.animationDelay = Math.random() * 20 + "s";

    // Random animation duration for variety
    particle.style.animationDuration = 18 + Math.random() * 8 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");

function createCarouselItem(data, index) {
  const item = document.createElement("div");
  item.className = "carousel-item";
  item.dataset.index = index;

  const techBadges = data.tech
    .map((tech) => `<span class="tech-badge">${tech}</span>`)
    .join("");

  item.innerHTML = `
                <div class="card">
                    <div class="card-number">0${data.id}</div>
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                    <div class="card-tech">${techBadges}</div>
                    <button class="card-cta" onclick="scrollToSection('about')">Posjeti</button>
                </div>
            `;

  return item;
}

function initCarousel() {
  // Create carousel items
  portfolioData.forEach((data, index) => {
    const item = createCarouselItem(data, index);
    carousel.appendChild(item);

    // Create indicator
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const totalItems = items.length;
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  items.forEach((item, index) => {
    // Calculate relative position
    let offset = index - currentIndex;

    // Wrap around for continuous rotation
    if (offset > totalItems / 2) {
      offset -= totalItems;
    } else if (offset < -totalItems / 2) {
      offset += totalItems;
    }

    const absOffset = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    // Reset transform
    item.style.transform = "";
    item.style.opacity = "";
    item.style.zIndex = "";
    item.style.transition = "all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)";

    // Adjust spacing based on screen size
    let spacing1 = 400;
    let spacing2 = 600;
    let spacing3 = 750;

    if (isMobile) {
      spacing1 = 280; // Was 400, now 100px closer
      spacing2 = 420; // Was 600, now 180px closer
      spacing3 = 550; // Was 750, now 200px closer
    } else if (isTablet) {
      spacing1 = 340;
      spacing2 = 520;
      spacing3 = 650;
    }

    if (absOffset === 0) {
      // Center item
      item.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
      item.style.opacity = "1";
      item.style.zIndex = "10";
    } else if (absOffset === 1) {
      // Side items
      const translateX = sign * spacing1;
      const rotation = isMobile ? 25 : 30;
      const scale = isMobile ? 0.88 : 0.85;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.8";
      item.style.zIndex = "5";
    } else if (absOffset === 2) {
      // Further side items
      const translateX = sign * spacing2;
      const rotation = isMobile ? 35 : 40;
      const scale = isMobile ? 0.75 : 0.7;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.5";
      item.style.zIndex = "3";
    } else if (absOffset === 3) {
      // Even further items
      const translateX = sign * spacing3;
      const rotation = isMobile ? 40 : 45;
      const scale = isMobile ? 0.65 : 0.6;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.3";
      item.style.zIndex = "2";
    } else {
      // Hidden items (behind)
      item.style.transform =
        "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
      item.style.opacity = "0";
      item.style.zIndex = "1";
    }
  });

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex =
    (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Initialize hexagonal skills grid

// Event listeners
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Auto-rotate carousel
setInterval(nextSlide, 5000);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 250);
});

// Initialize on load

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Update active navigation on scroll
function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

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
        const href = link.getAttribute("href").substring(1);
        if (href === sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Animated counter for stats
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((number) => {
        if (!number.classList.contains("animated")) {
          number.classList.add("animated");
          animateCounter(number);
        }
      });
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Show success message
  alert(
    `Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`
  );

  // Reset form
  contactForm.reset();
});

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }, 1500);
});

/* Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            } 
        }); */

/* Polušaj */

/* ------------------ USLUGE (skills) ------------------ */

// Popis usluga
const skillsData = [
  {
    name: "Dizajn web stranice",
    icon: "🎨",
    level: 100,
    category: "frontend",
    desc: "Dizajn web stranice u skladu s tvojim brendom — biramo boje, tipografiju i raspored elemenata kako bi stranica bila pregledna i privlačna.",
  },
  {
    name: "Izrada web stranice",
    icon: "⚙️",
    level: 100,
    category: "frontend",
    desc: "Dizajn pretvaramo u brze web stranice koje se savršeno prilagođavaju svim uređajima, uz osnovnu SEO optimizaciju.",
  },
  {
    name: "Dizajn objava za društvene mreže",
    icon: "🖼️",
    level: 100,
    category: "backend",
    desc: "Dizajniramo vizuale koji prate tvoj stil i ton komunikacije — objave, storyji i oglasi izgledaju skladno i prepoznatljivo na svakoj platformi.",
  },
  {
    name: "Uređivanje i optimizacija profila",
    icon: "🪄",
    level: 100,
    category: "backend",
    desc: "Bio, istaknute priče, vizualna usklađenost i osnovne postavke za bolju vidljivost.",
  },
  {
    name: "Dizajn logotipa",
    icon: "✨",
    level: 100,
    category: "cloud",
    desc: "Jedinstven logotip prilagođen tvom brendu — u više verzija i formatima spremnim za svaku primjenu.",
  },
  {
    name: "Tekstovi za web stranice",
    icon: "💻",
    level: 100,
    category: "emerging",
    desc: "Naslovi i tekstovi koji jasno prenose poruku brenda i potiču posjetitelje na akciju.",
  },
  {
    name: "Tekstovi za društvene mreže",
    icon: "📱",
    level: 100,
    category: "emerging",
    desc: "Kratke i zanimljive objave uz ton brenda i prijedloge hashtagova.",
  },
  {
    name: "Slogani i brend poruke",
    icon: "💬",
    level: 100,
    category: "emerging",
    desc: "Jednolinijske poruke i slogani koji se pamte i prenose osobnost brenda.",
  },
];

// Inicijalizacija prikaza kartica
function initSkillsGrid() {
  const skillsGrid = document.getElementById("skillsGrid");
  const categoryTabs = document.querySelectorAll(".category-tab");

  function displaySkills(category = "all") {
    skillsGrid.innerHTML = "";

    const filteredSkills =
      category === "all"
        ? skillsData
        : skillsData.filter((skill) => skill.category === category);

    filteredSkills.forEach((skill, index) => {
      const hexagon = document.createElement("div");
      hexagon.className = "skill-hexagon";
      hexagon.style.animationDelay = `${index * 0.1}s`;

      hexagon.innerHTML = `
        <div class="hexagon-inner">
          <div class="hexagon-content">
            <div class="skill-icon-hex">${skill.icon}</div>
            <div class="skill-name-hex">${skill.name}</div>
            <div class="skill-level">
              <div class="skill-level-fill" style="width: ${skill.level}%"></div>
            </div>
          </div>
        </div>
      `;

      // klik otvara modal
      hexagon.addEventListener("click", () =>
        openServiceModal(skillsData.indexOf(skill))
      );

      skillsGrid.appendChild(hexagon);
    });
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      displaySkills(tab.dataset.category);
    });
  });

  displaySkills("all");
}

/* ------------------ MODAL ------------------ */

const modalEl = document.getElementById("serviceModal");
const modalIcon = document.getElementById("serviceIcon");
const modalTit = document.getElementById("serviceTitle");
const modalDesc = document.getElementById("serviceDesc");

// === FOCUS MANAGEMENT ZA MODAL ===
let lastFocusedEl = null; // ➊ dodaj iznad funkcija

function openServiceModal(idx) {
  const item = skillsData[idx];
  if (!item) return;

  // zapamti koji je element imao fokus prije otvaranja
  lastFocusedEl = document.activeElement;

  // upiši sadržaj u modal
  modalIcon.textContent = item.icon || "✨";
  modalTit.textContent = item.name;
  modalDesc.textContent = item.desc || "";

  // otvori modal
  modalEl.classList.add("is-open");
  modalEl.removeAttribute("aria-hidden"); // više nije skriven
  document.documentElement.style.overflow = "hidden";

  // fokus stavi u modal (dialog ili, ako ga nema, na X)
  const dialog = modalEl.querySelector(".service-modal__dialog");
  const closeBt = modalEl.querySelector(".service-modal__close");
  (dialog || closeBt).focus();
}

function closeServiceModal() {
  // ukloni fokus iz modala prije skrivenja
  const active = document.activeElement;
  if (modalEl.contains(active)) active.blur();

  // zatvori modal
  modalEl.classList.remove("is-open");
  modalEl.setAttribute("aria-hidden", "true"); // sada je skriven
  document.documentElement.style.overflow = "";

  // vrati fokus na element koji je bio aktivan prije otvaranja
  if (lastFocusedEl) {
    lastFocusedEl.focus();
    lastFocusedEl = null;
  }
}

modalEl.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeServiceModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalEl.classList.contains("is-open")) {
    closeServiceModal();
  }
});
initCarousel();
initSkillsGrid();
initParticles();
