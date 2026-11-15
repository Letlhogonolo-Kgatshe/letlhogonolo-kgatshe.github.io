// Style screenshots stacked exactly on top of each other: one shows at a time,
// the arrows (or the Left and Right keys on a focused arrow) move between them.
document.querySelectorAll("[data-stack]").forEach((stack) => {
  const cards = [...stack.querySelectorAll(".stack-card")];
  const label = stack.querySelector(".stack-label");
  let front = 0;
  const show = () => {
    cards.forEach((card, i) => {
      const on = i === front;
      card.dataset.pos = on ? 0 : 1;
      card.setAttribute("aria-hidden", String(!on));
    });
    label.textContent = `${cards[front].dataset.label} · ${front + 1} of ${cards.length}`;
  };
  const step = (by) => { front = (front + by + cards.length) % cards.length; show(); };
  stack.querySelector(".stack-next").addEventListener("click", () => step(1));
  stack.querySelector(".stack-prev").addEventListener("click", () => step(-1));
  stack.querySelector(".stack-bar").addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  show();
});
