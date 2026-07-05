const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const announcement = document.querySelector("[data-announcement]");
const announcementClose = document.querySelector("[data-announcement-close]");
const quoteForm = document.querySelector("[data-quote-form]");
const header = document.querySelector(".bw-header");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
    });
  });
}

if (announcement && announcementClose) {
  announcementClose.addEventListener("click", () => {
    announcement.hidden = true;
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(quoteForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const address = String(data.get("address") || "").trim();
    const error = quoteForm.querySelector("[data-form-error]");
    const fields = quoteForm.querySelector("[data-form-fields]");
    const success = quoteForm.querySelector("[data-form-success]");

    if (!error || !fields || !success) return;

    error.hidden = true;
    error.textContent = "";

    if (!name) {
      error.textContent = "Please add your name so we know who to call.";
      error.hidden = false;
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      error.textContent = "Please enter a valid email address.";
      error.hidden = false;
      return;
    }

    if (!phone && !address) {
      error.textContent = "Add a phone number or address so we can reach you.";
      error.hidden = false;
      return;
    }

    fields.hidden = true;
    success.hidden = false;
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealSelectors = [
  ".bw-section-heading",
  ".bw-feature-card",
  ".bw-service-card",
  ".bw-process-grid article",
  ".bw-plan-card",
  ".bw-results-image",
  ".bw-result-stats > div",
  ".bw-gallery-heading",
  ".bw-gallery-grid > div",
  ".bw-review-grid article",
  ".bw-area-grid > div",
  ".bw-contact-copy",
  ".bw-form",
];

const revealGroups = [
  ".bw-service-grid",
  ".bw-process-grid",
  ".bw-plan-grid",
  ".bw-result-stats",
  ".bw-gallery-grid",
  ".bw-review-grid",
  ".bw-area-grid",
  ".bw-contact-grid",
];

const revealItems = [...document.querySelectorAll(revealSelectors.join(","))];

revealItems.forEach((item) => {
  item.classList.add("bw-reveal");

  if (item.matches(".bw-area-image, .bw-form")) {
    item.classList.add("bw-reveal-right");
  } else if (item.matches(".bw-contact-copy")) {
    item.classList.add("bw-reveal-left");
  } else if (item.matches(".bw-gallery-grid > div, .bw-results-image")) {
    item.classList.add("bw-reveal-scale");
  }
});

revealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((group) => {
    group.querySelectorAll(".bw-reveal").forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index, 6) * 70}ms`;
    });
  });
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
