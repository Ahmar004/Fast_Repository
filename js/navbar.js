function renderNavbar({ title, backLink = null }) {
  const nav = document.getElementById("navbar");

  nav.innerHTML = `
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <a href="index.html">
          <img src="assets/logo.png" class="h-9 w-9" />
        </a>
        ${backLink ? `
          <a href="${backLink}" class="text-sm text-blue-400 hover:underline">
            ← Back
          </a>
        ` : ""}
        <h1 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
          ${title}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="toggleTheme()" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="dark:hidden">🌙</span>
          <span class="hidden dark:inline">💡</span>
        </button>

        <div class="relative">
          <button onclick="this.nextElementSibling.classList.toggle('hidden')"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            ☰
          </button>

          <div class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
            <a href="index.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
            <a href="https://github.com/YOUR_REPO" target="_blank" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Contribute</a>
            <a href="https://chat.whatsapp.com/YOUR_LINK" target="_blank" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Join WhatsApp</a>
            <a href="https://chat.whatsapp.com/FEEDBACK_LINK" target="_blank" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Give Feedback</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
