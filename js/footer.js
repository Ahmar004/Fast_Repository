function renderFooter() {
  const footer = document.getElementById("footer");
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const logoSrc = (currentTheme === 'dark') ? 'assets/logo.png' : 'assets/logo_white.png';

  footer.innerHTML = `
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-dark-blue-900 dark:text-gray-400">
      <a href="index.html" class="flex items-center gap-2 hover:underline">
        <img src="${logoSrc}" class="dynamic-logo h-6 w-7" />
      </a>
      <a href="https://chat.whatsapp.com/Fyo2nkT3cbW9iqVJQt02tD" target="_blank" class="hover:underline">Join us on WhatsApp</a>
      <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/CONTRIBUTING.md" target="_blank" class="hover:underline">Contribute</a>
      <a href="https://linktr.ee/ahmar004" target="_blank" class="hover:underline">Contact Site Owner</a>
      <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/LICENSE" target="_blank" class="hover:underline">License</a>
      <a href="https://chat.whatsapp.com/FLOwtSEzKf4KhWCyHwBpwc" target="_blank" class="hover:underline">Give us feedback</a>
    </div>
  `;
}
