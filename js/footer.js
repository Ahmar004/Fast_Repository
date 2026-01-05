function renderFooter() {
  const footer = document.getElementById("footer");

  footer.innerHTML = `
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <a href="index.html" class="flex items-center gap-2 hover:underline">
        <img src="assets/logo.png" class="h-5 w-5" />
        FAST Repository
      </a>
      <a href="https://chat.whatsapp.com/YOUR_LINK" target="_blank" class="hover:underline">Join WhatsApp</a>
      <a href="https://github.com/YOUR_REPO" target="_blank" class="hover:underline">Contribute</a>
      <a href="#" class="hover:underline">Contact Site Owner</a>
      <a href="#" class="hover:underline">License</a>
    </div>
  `;
}
