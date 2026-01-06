function renderNavbar({ title, isCoursePage = false, courseCode = "" }) {
  const nav = document.getElementById("navbar");
  const selectedCampus = localStorage.getItem("fast_repo_selected_campus");
  
  // Detect current theme to set initial logo
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const logoSrc = (currentTheme === 'dark') ? 'assets/logo.png' : 'assets/logo_white.png';
  
  nav.innerHTML = `
    <div class="flex items-center justify-between px-4 md:px-8 py-3 bg-lightNav dark:bg-darkNav transition-colors">
      <div class="flex items-center gap-4 flex-1">
        <a href="index.html" class="shrink-0">
          <img src="${logoSrc}" class="dynamic-logo h-10 w-10 hover:scale-105 transition-transform" />
        </a>
        ${!isCoursePage ? `
          <div class="hidden md:block">
            <h1 class="text-[20px] font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">${title}</h1>
            <p class="text-[12px] font-bold text-black-500 dark:text-gray-400 uppercase tracking-widest">- By a Fastian and for the Fastians!</p>
          </div>
        ` : ""}
      </div>

      ${isCoursePage ? `
        <div class="flex flex-col items-center text-center flex-1">
          <h2 class="text-xl font-black italic text-blue-600 dark:text-blue-400 leading-none">${courseCode}</h2>
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-tighter truncate max-w-[150px] md:max-w-none">${title}</p>
        </div>
      ` : ""}

      <div class="flex items-center gap-1 md:gap-3 flex-1 justify-end">
        <div class="relative location-container">
          <button id="locBtn" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <img src="assets/locationEmoji.png" class="h-8 w-5 pt-2 object-contain" />
          </button>
          <div id="locMenu" class="hidden absolute right-0 mt-3 w-56 bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder rounded-2xl shadow-2xl z-50 overflow-hidden">
            <p class="px-4 py-3 text-[10px] font-black uppercase text-gray-400 border-b border-lightBorder dark:border-darkBorder tracking-widest">Select Campus:</p>
            <div class="flex flex-col">
              ${["Islamabad", "Lahore", "Karachi", "Chiniot-Faisalabad", "Peshawar", "Multan"].map(c => `
                <button onclick="pickCampus('${c}')" class="px-4 py-3 text-left text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors border-b last:border-0 border-lightBorder dark:border-darkBorder">
                  ${c} ${selectedCampus === c ? '✓' : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span class="dark:hidden text-xl">🌙</span>
          <span class="hidden dark:inline text-xl">💡</span>
        </button>

        <div class="relative menu-container">
          <button id="menuBtn" class="p-2 text-2xl hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">☰</button>
          <div id="menuContent" class="hidden absolute right-0 mt-3 w-48 bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder rounded-xl shadow-xl z-50 overflow-hidden">
            <a href="index.html" class="block px-4 py-3 text-sm font-bold hover:bg-lightPage dark:hover:bg-gray-800 border-b border-lightBorder dark:border-darkBorder">Home</a>
            <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/CONTRIBUTING.md" target="_blank" class="block px-4 py-3 text-sm font-bold hover:bg-lightPage dark:hover:bg-gray-800 border-b border-lightBorder dark:border-darkBorder">Contribute</a>
            <a href="https://chat.whatsapp.com/FLOwtSEzKf4KhWCyHwBpwc" target="_blank" class="block px-4 py-3 text-sm font-bold hover:bg-lightPage dark:hover:bg-gray-800 border-b border-lightBorder dark:border-darkBorder">Give us feedback</a>
            <a href="https://linktr.ee/ahmar004" target="_blank" class="block px-4 py-3 text-sm font-bold hover:bg-lightPage dark:hover:bg-gray-800 border-b border-lightBorder dark:border-darkBorder">Contact Site Owner</a>
            <a href="https://chat.whatsapp.com/Fyo2nkT3cbW9iqVJQt02tD" target="_blank" class="block px-4 py-3 text-sm font-bold hover:bg-lightPage dark:hover:bg-gray-800 border-b border-lightBorder dark:border-darkBorder">Join us on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.addEventListener('click', (e) => {
    const locBtn = document.getElementById('locBtn');
    const locMenu = document.getElementById('locMenu');
    const menuBtn = document.getElementById('menuBtn');
    const menuContent = document.getElementById('menuContent');

    if (locBtn && !locBtn.contains(e.target) && !locMenu.contains(e.target)) locMenu.classList.add('hidden');
    else if (locBtn && locBtn.contains(e.target)) locMenu.classList.toggle('hidden');

    if (menuBtn && !menuBtn.contains(e.target) && !menuContent.contains(e.target)) menuContent.classList.add('hidden');
    else if (menuBtn && menuBtn.contains(e.target)) menuContent.classList.toggle('hidden');
  });
}

function pickCampus(campus) {
  localStorage.setItem("fast_repo_selected_campus", campus);
  window.location.reload();
}