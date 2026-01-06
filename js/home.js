const CAMPUS_KEY = "fast_repo_selected_campus";
let allCourses = [];

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    allCourses = data;
    renderCourses(data);
  });

document.getElementById("searchInput").addEventListener("input", e => {
  if (!checkCampus()) return;
  const q = e.target.value.toLowerCase();
  renderCourses(
    allCourses.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
    )
  );
});

function renderCourses(courses) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  courses.forEach(course => {
    container.innerHTML += `
      <a onclick="openCourse('${course.slug}')"
        class="cursor-pointer bg-[#ede6d8] dark:bg-[#161b22] border rounded-xl p-5 hover:shadow">
        <h2 class="font-semibold">${course.name}</h2>
        <p class="text-sm text-gray-500">${course.code} • ${course.slug}</p>
      </a>
    `;
  });
}

function checkCampus() {
  if (!localStorage.getItem(CAMPUS_KEY)) {
    document.getElementById("campusPrompt").classList.remove("hidden");
    return false;
  }
  return true;
}

function openCourse(slug) {
  if (!checkCampus()) return;
  location.href = `course.html?course=${slug}`;
}

function closePrompt() {
  document.getElementById("campusPrompt").classList.add("hidden");
}
