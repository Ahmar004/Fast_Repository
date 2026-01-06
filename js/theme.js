const THEME_KEY = "fast_repo_theme";
const CAMPUS_KEY = "fast_repo_selected_campus";

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem(THEME_KEY, theme);
  updateLogos(theme); // Added this line
}

function updateLogos(theme) {
  const logos = document.querySelectorAll('.dynamic-logo');
  logos.forEach(img => {
    // assets/logo.png for Dark Mode, assets/logo_white.png for Light Mode
    img.src = theme === 'dark' ? 'assets/logo.png' : 'assets/logo_white.png';
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(saved);
})();