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
    c.code.toLowerCase().includes(q)
  );
  renderCourses(filtered);
});

function renderCourses(courses) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  if (courses.length === 0) {
    container.innerHTML = "<p>No courses found.</p>";
    return;
  }

  courses.forEach(course => {
    container.innerHTML += `
      <a href="course.html?course=${course.slug}"
         class="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
        <h2 class="text-lg font-semibold">${course.name}</h2>
        <p class="text-sm text-gray-500">${course.code}</p>
      </a>
    `;
  });
}
