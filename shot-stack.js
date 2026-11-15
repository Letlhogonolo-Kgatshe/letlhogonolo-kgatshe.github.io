// Stacked screenshots: the arrow brings the next style to the front.
document.querySelectorAll("[data-stack]").forEach((stack) => {
  const cards = [...stack.querySelectorAll(".stack-card")];
  const label = stack.querySelector(".stack-label");
  let front = 0;
  const show = () => {
    cards.forEach((card, i) => {
      const pos = (i - front + cards.length) % cards.length;
      card.dataset.pos = pos;
      card.setAttribute("aria-hidden", String(pos !== 0));
    });
    label.textContent = `${cards[front].dataset.label} · ${front + 1} of ${cards.length}`;
  };
  stack.querySelector(".stack-next").addEventListener("click", () => {
    front = (front + 1) % cards.length;
    show();
  });
  show();
});
