// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("year").textContent = new Date().getFullYear();

// Module marks from the academic transcript (Jan 2024 – Jun 2026)
const modules = [
  { name: "IT Professional Practice", year: 2024, mark: 79 },
  { name: "Mathematical Principles for CS", year: 2024, mark: 76 },
  { name: "Network Engineering 1A", year: 2024, mark: 90 },
  { name: "Network Engineering 1B", year: 2024, mark: 84 },
  { name: "Programming Logic and Design", year: 2024, mark: 75 },
  { name: "Programming 1A", year: 2024, mark: 91 },
  { name: "Programming 1B", year: 2024, mark: 91 },
  { name: "Principles of Security", year: 2024, mark: 92 },
  { name: "Cloud Development A", year: 2025, mark: 80 },
  { name: "Cloud Development B", year: 2025, mark: 93 },
  { name: "Information Systems 1B", year: 2025, mark: 82 },
  { name: "Information Systems 2A", year: 2025, mark: 79 },
  { name: "Information Systems 2B", year: 2025, mark: 75 },
  { name: "Information Systems 2C", year: 2025, mark: 86 },
  { name: "Programming 2B", year: 2025, mark: 88 },
  { name: "Programming 2A", year: 2025, mark: 75 },
  { name: "Information Systems 3A", year: 2026, mark: 76 },
  { name: "Introduction to Research for ICT", year: 2026, mark: 65 },
  { name: "Programming 3A", year: 2026, mark: 83 },
  { name: "Programming 3C", year: 2026, mark: 89 },
];

// Yearly summary cards
const years = [2024, 2025, 2026];
document.getElementById("year-avgs").innerHTML = years
  .map((y) => {
    const rows = modules.filter((m) => m.year === y);
    const avg = rows.reduce((s, m) => s + m.mark, 0) / rows.length;
    const dist = rows.filter((m) => m.mark >= 75).length;
    const label = y === 2026 ? `${y} (first semester)` : y;
    return `
      <div class="year">
        <div class="year-top"><span class="year-label">${label}</span><span class="year-avg">${avg.toFixed(1)}%</span></div>
        <div class="year-meta">${dist}/${rows.length} distinctions · ${rows.length * 15} credits</div>
        <div class="year-bar"><span style="width:${avg}%"></span></div>
      </div>`;
  })
  .join("");

// Full module list, sorted by mark, behind a toggle
document.getElementById("marks-rows").innerHTML = [...modules]
  .sort((a, b) => b.mark - a.mark)
  .map(
    (m) => `
    <div class="bar-row">
      <span class="bar-label">${m.name}<small>${m.year}</small></span>
      <div class="bar-track"><div class="bar-fill${m.mark < 75 ? " pass" : ""}" style="width:${m.mark}%"></div></div>
      <span class="bar-value">${m.mark}%</span>
    </div>`
  )
  .join("");

const moduleToggle = document.getElementById("toggle-modules");
const chart = document.getElementById("marks-chart");
moduleToggle.addEventListener("click", () => {
  const show = chart.hidden;
  chart.hidden = !show;
  moduleToggle.setAttribute("aria-expanded", show);
  moduleToggle.textContent = show ? "Hide module list" : "Show all 20 modules";
});

// Reveal sections on scroll
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll(".section").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
