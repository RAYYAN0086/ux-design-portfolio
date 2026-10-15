const projects = [
  {
    id: "inventory",
    title: "Inventory Management API",
    category: "java",
    categoryLabel: "JAVA BACKEND",
    mark: "{ }",
    summary: "A backend project concept for tracking products, stock levels, and inventory updates through a clean API.",
    details: "A Java-based inventory application concept focused on organizing product records, tracking stock changes, and providing a clear foundation for REST API operations. Add your own repository link and implementation details when ready.",
    technologies: ["Java", "Spring Boot", "REST API", "SQL"]
  },
  {
    id: "taskflow",
    title: "TaskFlow Dashboard",
    category: "fullstack",
    categoryLabel: "FULL STACK",
    mark: "▦",
    summary: "A web app concept for creating tasks, tracking progress, and keeping daily work organized.",
    details: "A full-stack task management application concept with task creation, status tracking, and a responsive overview screen. This card is a starter showcase; replace the description with the features you actually built.",
    technologies: ["React.js", "Java", "Spring Boot", "SQL"]
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    category: "frontend",
    categoryLabel: "FRONTEND",
    mark: "</>",
    summary: "A responsive portfolio experience to share developer skills, education, and project work.",
    details: "This portfolio site demonstrates a responsive layout, interactive project filtering, mobile navigation, and accessible details dialogs using HTML, CSS, and JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"]
  }
];

const profileImage = document.getElementById("profileImage");
const portraitPlaceholder = document.getElementById("portraitPlaceholder");
profileImage.addEventListener("load", () => {
  profileImage.hidden = false;
  portraitPlaceholder.hidden = true;
});
profileImage.addEventListener("error", () => {
  profileImage.hidden = true;
  portraitPlaceholder.hidden = false;
});
if (profileImage.complete) {
  const imageLoaded = profileImage.naturalWidth > 0;
  profileImage.hidden = !imageLoaded;
  portraitPlaceholder.hidden = imageLoaded;
}

const projectGrid = document.getElementById("projectGrid");
const projectCount = document.getElementById("projectCount");
const projectDialog = document.getElementById("projectDialog");
let activeFilter = "all";

function renderProjects() {
  const visibleProjects = projects.filter(project =>
    activeFilter === "all" || project.category === activeFilter
  );
  projectGrid.innerHTML = visibleProjects.map(project => `
    <article class="project-card">
      <div class="project-card-top">
        <span class="project-type">${project.categoryLabel}</span>
        <span class="project-mark" aria-hidden="true">${project.mark}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-card-bottom">
        <div class="project-tags">${project.technologies.slice(0, 3).map(technology => `<span>${technology}</span>`).join("")}</div>
        <button class="project-open" type="button" data-project-id="${project.id}" aria-label="View details for ${project.title}">Details ↗</button>
      </div>
    </article>
  `).join("");
  projectCount.textContent = `${String(visibleProjects.length).padStart(2, "0")} PROJECT${visibleProjects.length === 1 ? "" : "S"}`;
}

document.querySelector(".project-filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-button").forEach(filterButton => {
    const selected = filterButton === button;
    filterButton.classList.toggle("active", selected);
    filterButton.setAttribute("aria-pressed", String(selected));
  });
  renderProjects();
});

projectGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-project-id]");
  if (!button) return;
  const project = projects.find(item => item.id === button.dataset.projectId);
  if (!project) return;
  document.getElementById("dialogTitle").textContent = project.title;
  document.getElementById("dialogDescription").textContent = project.details;
  document.getElementById("dialogTags").innerHTML = project.technologies
    .map(technology => `<span>${technology}</span>`).join("");
  projectDialog.showModal();
});

document.getElementById("dialogClose").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-link, .nav-contact").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const roleElement = document.getElementById("typedRole");
const roles = ["web applications", "Java backends", "useful ideas"];
let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = true;
function typeRole() {
  const currentRole = roles[roleIndex];
  if (deleting) {
    characterIndex -= 1;
    roleElement.textContent = currentRole.slice(0, characterIndex);
    if (characterIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  } else {
    const nextRole = roles[roleIndex];
    characterIndex += 1;
    roleElement.textContent = nextRole.slice(0, characterIndex);
    if (characterIndex >= nextRole.length) {
      deleting = true;
      window.setTimeout(typeRole, 1450);
      return;
    }
  }
  window.setTimeout(typeRole, deleting ? 45 : 75);
}
window.setTimeout(typeRole, 1800);

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
  });
}, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();