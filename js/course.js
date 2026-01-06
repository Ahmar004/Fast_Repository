const CAMPUS_KEY = "fast_repo_selected_campus";
const selectedCampus = localStorage.getItem(CAMPUS_KEY);

const params = new URLSearchParams(window.location.search);
const slug = params.get("course");

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(data => {
    renderNavbar({
      title: `${data.course_code} – ${data.course_name}`,
      isHome: false
    });
    renderFooter();
    renderCourse(data);
  });

function renderCourse(data) {
  const container = document.getElementById("courseContent");
  container.innerHTML = "";

  const campusItems = data.campuses[selectedCampus] || [];

  container.innerHTML += `
    <section class="bg-white dark:bg-gray-900 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">
        Resources from ${selectedCampus} campus
      </h2>

      ${
        campusItems.length
          ? campusItems.map(r => `
              <div class="border rounded-lg p-4 mb-3">
                <a href="${r.url}" class="text-blue-500 font-medium hover:underline">
                  ${r.title}
                </a>
                <p class="text-sm text-gray-500 mt-1">
                  Includes: ${r.includes.join(", ")}
                </p>
              </div>
            `).join("")
          : `<p class="text-gray-500">
              Hmm, it looks like there is a gap between this website and seniors
              from your campus. Please become the bridge for that gap! 🙂
            </p>`
      }
    </section>
  `;

  container.innerHTML += `
    <section class="bg-white dark:bg-gray-900 rounded-xl p-6 mt-8">
      <h2 class="text-xl font-semibold mb-4">
        Generic resources (YT playlists etc)
      </h2>

      ${
        data.general.length
          ? data.general.map(g => `
              <a href="${g.url}" class="block text-blue-500 hover:underline mb-2">
                ${g.title}
              </a>
            `).join("")
          : `<p class="text-gray-500">
              Hmm, it looks like there is a gap between this website and seniors.
              Please help us bridge it! 🙂
            </p>`
      }
    </section>
  `;
}
