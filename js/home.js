let allCourses = [];

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    allCourses = data;
    renderCourses(data);
  });

function checkCampusAndAct(callback) {
  const campus = localStorage.getItem("fast_repo_selected_campus");
  if (!campus) {
    showReminder();
    return false;
  }
  return true;
}

function showReminder() {
  const modal = document.getElementById("campusModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function hideReminder() {
  const modal = document.getElementById("campusModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.getElementById("searchInput").addEventListener("input", e => {
  if (!checkCampusAndAct()) {
    e.target.value = "";
    return;
  }
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
  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-1";
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <span class="text-[10px] font-black px-2 py-1 bg-blue-500/10 text-blue-600 rounded-md uppercase tracking-widest">${course.code}</span>
        <span class="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transition-colors">→</span>
      </div>
      <h2 class="font-black text-lg text-gray-800 dark:text-gray-100 leading-tight">${course.name}</h2>
      <p class="text-xs font-bold text-gray-400 mt-2 uppercase tracking-tighter">${course.slug}</p>
    `;
    card.onclick = () => {
      if (checkCampusAndAct()) {
        window.location.href = `course.html?course=${course.slug}`;
      }
    };
    container.appendChild(card);
  });
}