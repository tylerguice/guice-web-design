const scrollToPageTop = () => {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.documentElement.style.scrollBehavior = previousBehavior;
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const header = document.querySelector(".site-header");

const updateHeaderState = () => {
  header?.classList.toggle("is-solid", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

window.addEventListener("load", () => {
  if (!window.location.hash || window.location.hash === "#top") {
    requestAnimationFrame(scrollToPageTop);
    window.setTimeout(scrollToPageTop, 50);
    window.setTimeout(updateHeaderState, 60);
  }
});

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToPageTop();
    history.replaceState(null, "", window.location.pathname + window.location.search);
  });
});
