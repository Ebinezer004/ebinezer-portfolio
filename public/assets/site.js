document.documentElement.classList.add("js");

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const navLinks = [...nav.querySelectorAll("a")];
const compactLayout = window.matchMedia("(max-width: 700px)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
}

function adaptMenu() {
  menu.hidden = !compactLayout.matches;
  setMenu(false);
}

menu.addEventListener("click", () => {
  setMenu(menu.getAttribute("aria-expanded") === "false");
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});
compactLayout.addEventListener("change", adaptMenu);
adaptMenu();

for (const link of document.querySelectorAll("[data-open-details]")) {
  link.addEventListener("click", () => {
    const details = document.querySelector(link.hash);
    details.open = true;
  });
}

function openLinkedDetails() {
  const details = document.getElementById(location.hash.slice(1));
  if (details?.matches("details")) details.open = true;
}

window.addEventListener("hashchange", openLinkedDetails);
openLinkedDetails();

const sections = navLinks.map((link) => document.getElementById(link.hash.slice(1)));
let navFrame = 0;

function updateActiveSection() {
  const marker = window.innerHeight * 0.34;
  const active = sections.findLastIndex((section) => section.getBoundingClientRect().top <= marker);
  navLinks.forEach((link, index) => {
    if (index === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  navFrame = 0;
}

window.addEventListener("scroll", () => {
  if (!navFrame) navFrame = requestAnimationFrame(updateActiveSection);
}, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

const canvas = document.getElementById("pipeline");
const ctx = canvas.getContext("2d");
const stageButtons = [...document.querySelectorAll("[data-stage]")];
const description = document.getElementById("map-description");

const stages = [
  { x: 90, values: [104, 168, 232, 296, 360], description: "Preprocess student records and engineer features for the prediction model." },
  { x: 270, values: [126, 197, 268, 339], description: "Use LogisticRegressionCV and threshold optimization to predict placement readiness." },
  { x: 464, values: [96, 164, 232, 300, 368], description: "Use SHAP to explain individual predictions and identify skill gaps." },
  { x: 650, values: [136, 232, 328], description: "Deliver predictions, practice tools, and a personalized 12-week roadmap in a React and FastAPI app." },
];
const connections = [
  [[0, 0], [0, 2], [1, 0], [1, 1], [1, 3], [2, 0], [2, 1], [2, 2], [3, 1], [3, 2], [3, 3], [4, 0], [4, 2], [4, 3]],
  [[0, 0], [0, 3], [1, 0], [1, 1], [1, 2], [1, 4], [2, 0], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3], [3, 4]],
  [[0, 0], [0, 2], [1, 0], [1, 1], [2, 0], [2, 1], [2, 2], [3, 1], [3, 2], [4, 0], [4, 2]],
];
let activeStage = 0;

function drawPath(x1, y1, x2, y2) {
  const midpoint = (x1 + x2) / 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(midpoint, y1, midpoint, y2, x2, y2);
  ctx.stroke();
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
}

function drawPipeline() {
  if (!ctx) return;

  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const width = 740;
  const height = 470;
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  const activeX = stages[activeStage].x;
  const glow = ctx.createLinearGradient(activeX - 46, 0, activeX + 46, 0);
  glow.addColorStop(0, "#dafe8200");
  glow.addColorStop(.5, "#dafe8222");
  glow.addColorStop(1, "#dafe8200");
  ctx.fillStyle = glow;
  ctx.fillRect(activeX - 46, 0, 92, height);

  const speckles = Array.from({ length: 104 }, (_, index) => ({
    x: (index * 173 + 31) % width,
    y: (index * index * 19 + 13) % height,
    alpha: index % 9 === 0 ? .55 : .19,
  }));
  for (const point of speckles) {
    ctx.fillStyle = `rgba(203, 233, 171, ${point.alpha})`;
    ctx.fillRect(point.x, point.y, 2, 2);
  }

  stages.forEach(({ x }, index) => {
    const selected = index === activeStage;
    ctx.lineWidth = 1;
    ctx.strokeStyle = selected ? "#c6e57b77" : "#b1d39945";
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(x, 52);
    ctx.lineTo(x, height - 52);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeRect(x - 4, 36, 8, 8);
    ctx.strokeRect(x - 4, height - 44, 8, 8);
  });

  connections.forEach((pairs, index) => {
    const from = stages[index];
    const to = stages[index + 1];
    const relevant = index === activeStage || index + 1 === activeStage;
    pairs.forEach(([start, end], pairIndex) => {
      ctx.strokeStyle = relevant ? (pairIndex % 3 === 0 ? "#e0f794b0" : "#a6d08d63") : "#7d9e7660";
      ctx.lineWidth = relevant ? 1.8 : 1.05;
      drawPath(from.x, from.values[start], to.x, to.values[end]);
    });
  });

  stages.forEach(({ x, values }, index) => {
    const selected = index === activeStage;
    values.forEach((y) => {
      ctx.strokeStyle = selected ? "#e0f79491" : "#9ebc946c";
      ctx.lineWidth = 1;
      drawCircle(x, y, selected ? 19 : 14);
      ctx.stroke();
      ctx.fillStyle = selected ? "#e0f794" : "#89ae79";
      drawCircle(x, y, selected ? 7 : 5);
      ctx.fill();
    });
  });
}

for (const button of stageButtons) {
  button.addEventListener("click", () => {
    activeStage = Number(button.dataset.stage);
    for (const stageButton of stageButtons) {
      stageButton.setAttribute("aria-pressed", String(button === stageButton));
    }
    description.textContent = stages[activeStage].description;
    drawPipeline();
  });
}

drawPipeline();
