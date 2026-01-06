function renderFooter() {
  const footer = document.getElementById("footer");

  footer.innerHTML = `
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <a href="index.html" class="flex items-center gap-2 hover:underline">
        <img src="assets/logo.png" class="h-5 w-5" />
      </a>
      <a href="https://chat.whatsapp.com/Fyo2nkT3cbW9iqVJQt02tD" target="_blank" class="hover:underline">Join on WhatsApp</a>
      <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/CONTRIBUTING.md" target="_blank" class="hover:underline">Contribute</a>
      <a href="https://linktr.ee/ahmar004" target="_blank" class="hover:underline">Contact Site Owner</a>
      <a href="https://github.com/Ahmar004/Fast_Repository/blob/main/LICENSE" target="_blank" class="hover:underline">License</a>
    </div>
  `;
}
