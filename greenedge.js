const header = document.querySelector("[data-header]");

const updateHeader = () => {
  header?.classList.toggle("is-solid", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".ge-reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll("[data-reveal-group]").forEach((group) => {
  group.querySelectorAll(".ge-reveal").forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
  });
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;
    button.textContent = "Thanks - we will be in touch";
    button.disabled = true;
  });
});
