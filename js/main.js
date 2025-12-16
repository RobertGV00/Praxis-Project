// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const themeToggle = document.getElementById("themeToggle");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  // Close mobile menu on link click
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mainNav.classList.remove("active");
      });
    });
  }

  // Theme toggle, lightweight, injects style only once
  if (themeToggle) {
    const ensureDarkStyle = () => {
      if (document.getElementById("darkThemeStyle")) return;
      const style = document.createElement("style");
      style.id = "darkThemeStyle";
      style.textContent = `
        body.dark-theme {
          background: #0f0f1e;
        }
        body.dark-theme .header,
        body.dark-theme .nav.active {
          background: #0f0f1e;
        }
        body.dark-theme .section-light {
          background: #14142a;
        }
        body.dark-theme .card,
        body.dark-theme .interactive-container,
        body.dark-theme .tool-block,
        body.dark-theme .test-container,
        body.dark-theme .result-container {
          background: #14142a;
          color: #f8f9fa;
        }
        body.dark-theme .card p,
        body.dark-theme p {
          color: rgba(248,249,250,0.72);
        }
        body.dark-theme .option,
        body.dark-theme .category-score,
        body.dark-theme .analysis-section,
        body.dark-theme .tool-result,
        body.dark-theme .bechdel-item {
          background: #0f0f1e;
          border-color: rgba(255,255,255,0.08);
        }
        body.dark-theme .question-text,
        body.dark-theme h1,
        body.dark-theme h2,
        body.dark-theme h3,
        body.dark-theme h4 {
          color: #f8f9fa;
        }
      `;
      document.head.appendChild(style);
    };

    const setIcon = () => {
      const icon = themeToggle.querySelector("i");
      if (!icon) return;
      icon.className = document.body.classList.contains("dark-theme") ? "fas fa-sun" : "fas fa-moon";
    };

    // Load preference
    const saved = localStorage.getItem("upc_theme");
    if (saved === "dark") {
      ensureDarkStyle();
      document.body.classList.add("dark-theme");
    }
    setIcon();

    themeToggle.addEventListener("click", () => {
      ensureDarkStyle();
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("upc_theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
      setIcon();
    });
  }
});
