// Year footer (if you already had this, keep it)
document.getElementById('year').textContent = new Date().getFullYear();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Tabs
(function () {
  const root = document.getElementById('home-tabs');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

  function activate(targetId) {
    // targetId can be 'about', 'projects', 'posts' OR full panel id 'panel-...'
    const panelId = targetId.startsWith('panel-') ? targetId : `panel-${targetId}`;
    const tabId = `tab-${targetId.replace('panel-','')}`;

    tabs.forEach(t => {
      const isActive = t.id === tabId;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      t.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(p => {
      p.hidden = p.id !== panelId;
    });

    // update hash without jumping
    if (history.replaceState) history.replaceState(null, '', `#${panelId}`);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab.dataset.panel));
    tab.addEventListener('keydown', (e) => {
      // arrow key navigation
      const i = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(i + 1) % tabs.length].focus();
      if (e.key === 'ArrowLeft') tabs[(i - 1 + tabs.length) % tabs.length].focus();
      if (e.key === 'Enter' || e.key === ' ') activate(tab.dataset.panel);
    });
  });

  // On load: honor hash (#panel-projects etc.)
  const fromHash = location.hash.replace('#','');
  if (fromHash && root.querySelector(`#${fromHash}`)) {
    activate(fromHash);
  } else {
    activate('about');
  }

  // If user changes hash manually
  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#','');
    if (id && root.querySelector(`#${id}`)) activate(id);
  });
})();