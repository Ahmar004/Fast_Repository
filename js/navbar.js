const CAMPUS_KEY = "fast_repo_selected_campus";
const CAMPUSES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Chiniot-Faisalabad",
  "Peshawar",
  "Multan"
];

function renderNavbar({ title, isHome = false }) {
  const nav = document.getElementById("navbar");

  nav.innerHTML = `
    <div class="relative bg-[#0b0f14] text-gray-100">
      <div class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        <!-- Left -->
        <div class="flex items-center gap-3">
          <a href="index.html">
            <img src="assets/logo.png" class="h-9 w-9" />
          </a>

          ${!isHome ? `
            <h1 class="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-semibold">
              ${title}
            </h1>
          ` : `
            <h1 class="text-lg md:text-xl font-semibold">${title}</h1>
            <p class="text-sm text-gray-400 ml-2 hidden md:block">
              – By a Fastian and for the Fastians!
            </p>
          `}
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3">

          <!-- Campus selector -->
          <div class="relative">
            <button id="campusBtn" class="p-2 rounded hover:bg-gray-800">
              <img src="assets/locationEmoji.png" class="h-5 w-5" />
            </button>

            <div id="campusMenu"
              class="hidden absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg z-50 p-3">
              <p class="text-sm font-semibold mb-2">Select Campus:</p>
              ${CAMPUSES.map(c => `
                <button data-campus="${c}"
                  class="campus-option w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                  ${c}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Theme -->
          <button onclick="toggleTheme()" class="p-2 rounded hover:bg-gray-800">
            <span class="dark:hidden">🌙</span>
            <span class="hidden dark:inline">💡</span>
          </button>

          <!-- Menu -->
          <div class="relative">
            <button id="menuBtn" class="p-2 rounded hover:bg-gray-800">☰</button>
            <div id="menuDropdown"
              class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50">
              <a href="index.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
              <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/CONTRIBUTING.md" target="_blank"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Contribute</a>
              <a href="https://chat.whatsapp.com/Fyo2nkT3cbW9iqVJQt02tD" target="_blank"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Join on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setupNavbarLogic();
}

function setupNavbarLogic() {
  const campusBtn = document.getElementById("campusBtn");
  const campusMenu = document.getElementById("campusMenu");
  const menuBtn = document.getElementById("menuBtn");
  const menuDropdown = document.getElementById("menuDropdown");

  campusBtn.onclick = () => campusMenu.classList.toggle("hidden");
  menuBtn.onclick = () => menuDropdown.classList.toggle("hidden");

  document.addEventListener("click", e => {
    if (!campusBtn.contains(e.target) && !campusMenu.contains(e.target))
      campusMenu.classList.add("hidden");

    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target))
      menuDropdown.classList.add("hidden");
  });

  document.querySelectorAll(".campus-option").forEach(btn => {
    btn.onclick = () => {
      localStorage.setItem(CAMPUS_KEY, btn.dataset.campus);
      location.reload();
    };
  });
}
