(() => {
  "use strict";

  const root = document.documentElement;
  const menuButton = document.getElementById("menuToggle");
  const menu = document.getElementById("navLinks");
  const themeButton = document.getElementById("themeToggle");

  // Theme: dark by default, with an optional saved preference.
  let savedTheme = "dark";
  try {
    const preference = localStorage.getItem("portfolio-theme");
    if (preference === "light" || preference === "dark") savedTheme = preference;
  } catch (_) { /* Storage can be unavailable in private browsing. */ }

  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.textContent = theme === "dark" ? "☼" : "☾";
    themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#080d1b" : "#f6f8fc");
    try { localStorage.setItem("portfolio-theme", theme); } catch (_) { /* No persistence available. */ }
  }
  setTheme(savedTheme);
  themeButton.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Responsive navigation.
  function closeMenu() {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });

  // Project filtering. Projects remain visible if JavaScript is disabled.
  const buttons = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll(".project-card[data-category]");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projects.forEach(project => {
        project.hidden = selected !== "all" && project.dataset.category !== selected;
      });
    });
  });

  // Reveal effects are progressive enhancements with an accessible fallback.
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    root.classList.add("js");
    reveals.forEach(item => observer.observe(item));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
