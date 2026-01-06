const params = new URLSearchParams(window.location.search);
const slug = params.get("course");
const selectedCampus = localStorage.getItem("fast_repo_selected_campus");

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(data => {
    renderNavbar({ 
        title: data.course_name, 
        isCoursePage: true, 
        courseCode: data.course_code 
    });
    renderFooter();
    renderSections(data);
  });

function renderSections(data) {
  const container = document.getElementById("courseContent");
  const items = data.campuses[selectedCampus] || [];
  
  // Compartment 1: Campus Resources
  let campusHTML = `
    <div class="bg-[#fcfaf2] dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
      <div class="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
      <h2 class="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-8 flex items-center gap-2">
         Resources from ${selectedCampus} Campus
      </h2>
      <div class="grid gap-6">
  `;

  if (items.length === 0) {
    campusHTML += `
      <p class="text-lg font-bold text-gray-600 dark:text-gray-400 leading-relaxed italic py-10">
        Hmm, it looks like there is a gap between this website and seniors from your campus, as there are no resources received so far related to this subject from your campus. Please become the bridge for that gap and we would really appreciate your efforts in doing so! :)
      </p>`;
  } else {
    campusHTML += items.map(r => `
      <div class="bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex justify-between items-center group hover:border-blue-500 transition-colors">
        <div>
          <a href="${r.url}" class="text-lg font-black text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors">${r.title}</a>
          <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Includes: ${r.includes.join(", ")}</p>
        </div>
        <a href="${r.url}" class="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">↓</a>
      </div>
    `).join("");
  }
  campusHTML += `</div></div>`;

  // Compartment 2: Generic Resources
  const hasGeneric = data.youtube.length > 0 || data.general.length > 0;
  let genericHTML = `
    <div class="bg-[#fcfaf2] dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
      <div class="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
      <h2 class="text-xs font-black uppercase tracking-[0.2em] text-green-600 mb-8">
         Generic resources (YT playlists etc)
      </h2>
      <div class="grid gap-4">
  `;

  if (!hasGeneric) {
    genericHTML += `
      <p class="text-lg font-bold text-gray-600 dark:text-gray-400 leading-relaxed italic py-10">
        Hmm, it looks like there is a gap between this website and seniors from your campus. Please become the bridge for this gap and we would really appreciate your efforts in doing so! :)
      </p>`;
  } else {
    genericHTML += [
      ...data.youtube.map(y => ({ ...y, type: 'YouTube', color: 'text-red-500' })),
      ...data.general.map(g => ({ ...g, type: 'General', color: 'text-blue-500' }))
    ].map(item => `
      <a href="${item.url}" target="_blank" class="flex items-center justify-between p-4 bg-white dark:bg-[#0d1117] rounded-xl border border-gray-100 dark:border-gray-800 hover:scale-[1.01] transition-transform">
        <span class="font-bold text-sm">${item.title}</span>
        <span class="text-[9px] font-black uppercase ${item.color}">${item.type}</span>
      </a>
    `).join("");
  }
  genericHTML += `</div></div>`;

  container.innerHTML = campusHTML + genericHTML;
}