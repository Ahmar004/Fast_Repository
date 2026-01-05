const params = new URLSearchParams(window.location.search);
const slug = params.get("course");

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("courseTitle").innerText =
      `${data.course_name} (${data.course_code})`;

    renderSections(data);
  });

function renderSections(data) {
  const container = document.getElementById("courseContent");

  // Campus resources
  for (const campus in data.campuses) {
    const items = data.campuses[campus];
    if (items.length === 0) continue;

    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold">${campus} Campus</h2>
        <ul class="mt-3 space-y-2">
          ${items.map(r => `
            <li class="bg-white p-4 rounded shadow">
              <a href="${r.url}" class="text-blue-600 font-medium underline">
                ${r.title}
              </a>
              <p class="text-sm text-gray-500">
                Includes: ${r.includes.join(", ")}
              </p>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  // YouTube
  if (data.youtube.length > 0) {
    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold">YouTube Playlists</h2>
        <ul class="mt-3">
          ${data.youtube.map(y => `
            <li>
              <a href="${y.url}" class="text-red-600 underline">
                ${y.title}
              </a>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  // General
  if (data.general.length > 0) {
    container.innerHTML += `
      <section>
        <h2 class="text-xl font-semibold">General Resources</h2>
        <ul class="mt-3">
          ${data.general.map(g => `
            <li>
              <a href="${g.url}" class="text-blue-600 underline">
                ${g.title}
              </a>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }
}
