let allCourses = [];

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    allCourses = data;
    renderCourses(data);
  });

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = allCourses.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q) ||
    c.slug.toLowerCase().includes(q)
  );
  renderCourses(filtered);
});

function renderCourses(courses) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  if (courses.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No courses found.</p>";
    return;
  }

  courses.forEach(course => {
    container.innerHTML += `
      <a href="course.html?course=${course.slug}"
         class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-lg transition">
        <h2 class="font-semibold">${course.name}</h2>
        <p class="text-sm text-gray-500">${course.code} • ${course.slug}</p>
      </a>
    `;
  });
}
