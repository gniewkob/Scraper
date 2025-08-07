(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function() {
      const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });
})();
