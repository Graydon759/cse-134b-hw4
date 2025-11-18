(function () {
    const STORAGE_KEY = 'site-theme';
  
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    const initialTheme =
      saved === 'light' || saved === 'dark'
        ? saved
        : (prefersDark ? 'dark' : 'light');
  
    document.documentElement.dataset.theme = initialTheme;
  
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
  
    toggleBtn.hidden = false;
  
    function updateButton(theme) {
      const isDark = theme === 'dark';
      toggleBtn.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
      toggleBtn.setAttribute('aria-pressed', String(isDark));
    }
  
    updateButton(initialTheme);
  
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
  
      document.documentElement.dataset.theme = next;
      localStorage.setItem(STORAGE_KEY, next);
      updateButton(next);
    });
  })();

  if ("startViewTransition" in document) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
  
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
  
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (link.hasAttribute("data-no-transition")) return;
  
      event.preventDefault();
  
      document.startViewTransition(() => {
        window.location.href = link.href;
      });
    });
  }
  