const CAMPUS_KEY = "fast_repo_selected_campus";

function renderNavbar({ title, isHome = false }) {
  const nav = document.getElementById("navbar");
  const selectedCampus = localStorage.getItem(CAMPUS_KEY);

  nav.innerHTML = `
    <div class="flex items-center justify-between px-6 py-4">
      
      <!-- LEFT -->
      <div class="flex items-center gap-3">
        <a href="index.html">
          <img src="assets/logo.png" class="h-9 w-9" />
        </a>

        ${!isHome ? `
          <h1 class="text-lg md:text-xl font-semibold">
            ${title}
          </h1>
        ` : `
          <div>
            <h1 class="text-lg md:text-xl font-semibold">
              Open-source FAST Repository
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              – By a Fastian and for the Fastians!
            </p>
          </div>
        `}
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-3 relative">

        <!-- CAMPUS -->
        <button id="campusBtn" class="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10">
          <img src="assets/locationEmoji.png" class="h-6 w-6" />
        </button>

        <div id="campusMenu"
          class="hidden absolute right-20 top-14 w-64 bg-white dark:bg-[#161b22] rounded-xl shadow-lg p-4 z-50">
          <p class="font-semibold mb-2">Select Campus:</p>
          ${["Islamabad","Lahore","Karachi","Chiniot-Faisalabad","Peshawar","Multan"]
            .map(c => `
              <button class="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onclick="selectCampus('${c}')">
                ${c}
              </button>
            `).join("")}
        </div>

        <!-- THEME -->
        <button onclick="toggleTheme()" class="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10">
          <span class="dark:hidden">🌙</span>
          <span class="hidden dark:inline">💡</span>
        </button>

        <!-- MENU -->
        <button id="menuBtn" class="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10">
          ☰
        </button>

        <div id="menuDropdown"
          class="hidden absolute right-0 top-14 w-48 bg-white dark:bg-[#161b22] rounded-xl shadow-lg z-50">
          <a href="index.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
          <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/CONTRIBUTING.md" target="_blank" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Contribute</a>
          <a href="https://chat.whatsapp.com/Fyo2nkT3cbW9iqVJQt02tD" target="_blank" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Join WhatsApp</a>
        </div>

      </div>
    </div>
  `;

  // MENU LOGIC
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menuDropdown");
  const campusBtn = document.getElementById("campusBtn");
  const campusMenu = document.getElementById("campusMenu");

  menuBtn.onclick = e => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
    campusMenu.classList.add("hidden");
  };

  campusBtn.onclick = e => {
    e.stopPropagation();
    campusMenu.classList.toggle("hidden");
    menu.classList.add("hidden");
  };

  document.addEventListener("click", () => {
    menu.classList.add("hidden");
    campusMenu.classList.add("hidden");
  });
}

function selectCampus(campus) {
  localStorage.setItem(CAMPUS_KEY, campus);
  location.reload();
}
