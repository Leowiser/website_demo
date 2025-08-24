// Footer year
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Tabs behaviour + deep links
(function () {
  const root = document.getElementById('home-tabs');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

  function activate(target) {
    const panelId = target.startsWith('panel-') ? target : `panel-${target}`;
    const tabId = `tab-${panelId.replace('panel-','')}`;

    tabs.forEach(t => {
      const on = t.id === tabId;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(p => p.hidden = (p.id !== panelId));

    if (history.replaceState) history.replaceState(null, '', `#${panelId}`);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab.dataset.panel));
    tab.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(i + 1) % tabs.length].focus();
      if (e.key === 'ArrowLeft') tabs[(i - 1 + tabs.length) % tabs.length].focus();
      if (e.key === 'Enter' || e.key === ' ') activate(tab.dataset.panel);
    });
  });

  // Open the correct tab on load from hash or default to About
  const fromHash = location.hash.replace('#','');
  if (fromHash && root.querySelector(`#${fromHash}`)) activate(fromHash);
  else activate('about');

  // Respond to manual hash changes
  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#','');
    if (id && root.querySelector(`#${id}`)) activate(id);
  });
})();
// Shrink hero on scroll
(function(){
  const hero = document.getElementById('hero');
  if (!hero) return;

  let ticking = false;
  const trigger = () => {
    // Start shrinking after a small scroll, feel free to tune 80
    const shouldShrink = window.scrollY > 50;
    hero.classList.toggle('is-shrink', shouldShrink);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(trigger);
      ticking = true;
    }
  }, { passive: true });
})();