const params = new URLSearchParams(window.location.search);
const slug = params.get("course");

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(data => {
    renderNavbar({
      title: `${data.course_code} – ${data.course_name}`,
      backLink: "index.html"
    });
    renderFooter();
    renderSections(data);
  });

function renderSections(data) {
  const container = document.getElementById("courseContent");

  for (const campus in data.campuses) {
    const items = data.campuses[campus];
    if (!items.length) continue;

    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold mb-3">${campus} Campus</h2>
        <div class="grid gap-4">
          ${items.map(r => `
            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <a href="${r.url}" class="text-blue-500 hover:underline font-medium">
                ${r.title}
              </a>
              <p class="text-sm text-gray-500 mt-1">
                Includes: ${r.includes.join(", ")}
              </p>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (data.youtube.length) {
    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold">YouTube Resources</h2>
        <ul class="mt-2 space-y-1">
          ${data.youtube.map(y => `
            <li>
              <a href="${y.url}" class="text-red-500 hover:underline">${y.title}</a>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  if (data.general.length) {
    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold">General Resources</h2>
        <ul class="mt-2 space-y-1">
          ${data.general.map(g => `
            <li>
              <a href="${g.url}" class="text-blue-500 hover:underline">${g.title}</a>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }
}
