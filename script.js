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
  { code: "ITPP5112", name: "IT Professional Practice", year: 2024, mark: 79 },
  { code: "MAPC5112", name: "Mathematical Principles for CS", year: 2024, mark: 76 },
  { code: "NWEG5111", name: "Network Engineering 1A", year: 2024, mark: 90 },
  { code: "NWEG5122", name: "Network Engineering 1B", year: 2024, mark: 84 },
  { code: "PRLD5121", name: "Programming Logic and Design", year: 2024, mark: 75 },
  { code: "PROG5121", name: "Programming 1A", year: 2024, mark: 91 },
  { code: "PROG6112", name: "Programming 1B", year: 2024, mark: 91 },
  { code: "PRSE6212", name: "Principles of Security", year: 2024, mark: 92 },
  { code: "CLDV6211", name: "Cloud Development A", year: 2025, mark: 80 },
  { code: "CLDV6212", name: "Cloud Development B", year: 2025, mark: 93 },
  { code: "INSY6112", name: "Information Systems 1B", year: 2025, mark: 82 },
  { code: "INSY6211", name: "Information Systems 2A", year: 2025, mark: 79 },
  { code: "INSY6212", name: "Information Systems 2B", year: 2025, mark: 75 },
  { code: "INSY7213", name: "Information Systems 2C", year: 2025, mark: 86 },
  { code: "PROG6212", name: "Programming 2B", year: 2025, mark: 88 },
  { code: "PROG6221", name: "Programming 2A", year: 2025, mark: 75 },
  { code: "INSY7311", name: "Information Systems 3A", year: 2026, mark: 76 },
  { code: "IRIT7311", name: "Introduction to Research for ICT", year: 2026, mark: 65 },
  { code: "PROG7311", name: "Programming 3A", year: 2026, mark: 83 },
  { code: "PROG7313", name: "Programming 3C", year: 2026, mark: 89 },
];

const chart = document.getElementById("marks-chart");
const summary = document.getElementById("chart-summary");
let chartVisible = false;

function renderChart(year) {
  const rows = modules
    .filter((m) => year === "all" || m.year === Number(year))
    .sort((a, b) => b.mark - a.mark);

  chart.innerHTML = rows
    .map(
      (m) => `
      <div class="bar-row" title="${m.code} · ${m.name} · ${m.year}">
        <span class="bar-label"><code>${m.code}</code>${m.name}</span>
        <div class="bar-track"><div class="bar-fill${m.mark < 75 ? " pass" : ""}" data-w="${m.mark}"></div></div>
        <span class="bar-value">${m.mark}%</span>
      </div>`
    )
    .join("");

  const avg = rows.reduce((s, m) => s + m.mark, 0) / rows.length;
  const dist = rows.filter((m) => m.mark >= 75).length;
  summary.textContent = `avg ${avg.toFixed(1)}% · ${dist}/${rows.length} distinctions`;

  if (chartVisible) requestAnimationFrame(growBars);
}

function growBars() {
  chart.querySelectorAll(".bar-fill").forEach((el) => (el.style.width = el.dataset.w + "%"));
}

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-selected", c === chip);
    });
    renderChart(chip.dataset.year);
  })
);

renderChart("all");

// Animate bars and section reveals on scroll
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const chartObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      chartVisible = true;
      growBars();
      chartObserver.disconnect();
    }
  }, { threshold: 0.2 });
  chartObserver.observe(chart);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".section, .stats").forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
} else {
  chartVisible = true;
  growBars();
}
