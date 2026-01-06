const CAMPUS_KEY = "fast_repo_selected_campus";
let allCourses = [];

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    allCourses = data;
    renderCourses(data);
  });

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", e => {
  if (!ensureCampus()) return;
  const q = e.target.value.toLowerCase();
  renderCourses(allCourses.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q) ||
    c.slug.toLowerCase().includes(q)
  ));
});

function renderCourses(courses) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("a");
    card.href = `course.html?course=${course.slug}`;
    card.className =
      "bg-white dark:bg-gray-900 border rounded-xl p-5 hover:shadow-lg transition";

    card.innerHTML = `
      <h2 class="font-semibold">${course.name}</h2>
      <p class="text-sm text-gray-500">${course.code} • ${course.slug}</p>
    `;

    card.onclick = e => {
      if (!ensureCampus()) {
        e.preventDefault();
      }
    };

    container.appendChild(card);
  });
}

function ensureCampus() {
  if (localStorage.getItem(CAMPUS_KEY)) return true;
  showReminder();
  return false;
}

function showReminder() {
  if (document.getElementById("campusReminder")) return;

  const overlay = document.createElement("div");
  overlay.id = "campusReminder";
  overlay.className =
    "fixed inset-0 bg-black/30 flex items-center justify-center z-50";

  overlay.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md text-center relative">
      <button class="absolute top-2 right-3 text-xl">&times;</button>
      <p class="text-lg font-medium">
        Hey Buddy, please select your campus from the top right corner first,
        so we gather up the right resources for ya!
      </p>
    </div>
  `;

  overlay.onclick = e => {
    if (e.target === overlay || e.target.tagName === "BUTTON")
      overlay.remove();
  };

  document.body.appendChild(overlay);
}
