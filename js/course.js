const CAMPUS_KEY = "fast_repo_selected_campus";
const params = new URLSearchParams(window.location.search);
const slug = params.get("course");
const campus = localStorage.getItem(CAMPUS_KEY);

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(data => {
    renderNavbar({
      title: `${data.course_code} – ${data.course_name}`,
      isHome: false
    });
    renderFooter();
    renderSections(data);
  });

function renderSections(data) {
  const container = document.getElementById("courseContent");

  // CAMPUS CARD
  container.innerHTML += `
    <section class="bg-[#ede6d8] dark:bg-[#161b22] rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">
        Resources from ${campus} campus
      </h2>
      ${
        data.campuses[campus]?.length
          ? data.campuses[campus].map(r => `
            <a href="${r.url}" class="block mb-3 underline text-blue-500">
              ${r.title}
            </a>
          `).join("")
          : `<p class="text-gray-500">
              Hmm, it looks like there is a gap between this website and seniors from your campus, as there are no resources received so far related to this subject from your campus. Please become the bridge for that gap and we would really appreciate your efforts in doing so! :)
            </p>`
      }
    </section>
  `;

  // GENERAL CARD
  container.innerHTML += `
    <section class="bg-[#ede6d8] dark:bg-[#161b22] rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">
        Generic resources (YT playlists etc)
      </h2>
      ${
        data.youtube.length || data.general.length
          ? [...data.youtube, ...data.general].map(r => `
              <a href="${r.url}" class="block mb-2 underline">
                ${r.title}
              </a>
            `).join("")
          : `<p class="text-gray-500">
              Hmm, it looks like there is a gap between this website and seniors from your campus. Please become the bridge for this gap and we would really appreciate your efforts in doing so! :)
            </p>`
      }
    </section>
  `;
}
