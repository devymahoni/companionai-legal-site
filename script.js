const ronaiApps = [
  {
    name: 'CarTube: Car Screen Mirror', shortName: 'C',
    category: 'entertainment', label: 'Video & GPS dials', platforms: ['iOS'],
    iconClass: 'icon-series', icon: 'assets/app-icons/cartube.webp',
    screenshot: 'assets/app-icons/cartube.webp',
    description: 'Your own videos, supported streams, Picture-in-Picture, AirPlay and selectable GPS dials. CarPlay features depend on compatible iOS and vehicle support.',
    features: ['Classic dial free', 'Premium dial styles', 'Ad-free Premium'],
    googlePlay: '', appStore: '', privacy: 'privacy-cartube.html', detail: 'app-cartube.html',
    terms: 'terms-cartube.html'
  },
  {
    name: 'KPSS Macerasi',
    shortName: 'K',
    category: 'education',
    label: 'Education',
    platforms: ['Google Play', 'App Store'],
    iconClass: 'icon-kpss',
    icon: 'assets/app-icons/kpss-local.webp',
    screenshot: 'assets/app-screens/kpss-1.jpg',
    description:
      'A Turkish exam-preparation app for KPSS candidates with practice questions, mock tests, study cards, and playful revision flows.',
    features: ['Practice questions', 'Mock exams', 'Progress tracking'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.ronailabs.kpssmacerasi',
    appStore: 'https://apps.apple.com/tr/app/kpss-maceras%C4%B1-soru-deneme/id6792287155',
    privacy: 'privacy-kpss.html',
    detail: 'app-kpss.html'
  },
  {
    name: 'Lunara AI',
    shortName: 'L',
    category: 'ai',
    label: 'AI companion',
    platforms: ['Google Play'],
    iconClass: 'icon-lunara',
    icon: 'assets/app-icons/lunara-local.webp',
    screenshot: 'assets/app-screens/lunara-1.png',
    description:
      'A text-first AI companion experience with personalization, reporting flows, user controls, and published safety documentation.',
    features: ['Personalized chat', 'Moderation workflows', 'Account deletion support'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.friendlychat.aura',
    appStore: '',
    privacy: 'privacy-aura.html',
    detail: 'app-lunara.html'
  },
  {
    name: 'SeriesGuru',
    shortName: 'S',
    category: 'entertainment',
    label: 'Trivia',
    platforms: ['Google Play', 'App Store'],
    iconClass: 'icon-series',
    icon: 'assets/app-icons/seriesguru-local.webp',
    screenshot: 'assets/app-screens/seriesguru-1.jpg',
    description:
      'A TV-series trivia app with quiz packs, points, difficulty levels, badges, and leaderboard-oriented replay value.',
    features: ['Quiz packs', 'Leaderboards', 'Multi-language support'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.ronailabs.seriesguru',
    appStore: 'https://apps.apple.com/gb/app/series-guru-tv-show-trivia/id6793951617',
    privacy: 'privacy-seriesguru.html',
    detail: 'app-seriesguru.html'
  }
];

const policies = [
  {
    title: 'Privacy Policy',
    description: 'How Ronaillabs collects, uses, stores, shares, and protects personal data.',
    href: 'privacy.html',
    tag: 'Core policy'
  },
  {
    title: 'Terms of Service',
    description: 'Usage rules, subscriptions, account responsibilities, AI notices, and legal terms.',
    href: 'terms.html',
    tag: 'Core policy'
  },
  {
    title: 'Cookie Policy',
    description: 'Website cookies, similar technologies, analytics, preferences, and user controls.',
    href: 'cookies.html',
    tag: 'Website'
  },
  {
    title: 'Account Deletion',
    description: 'Instructions for deleting an account and associated app data.',
    href: 'account-deletion.html',
    tag: 'User rights'
  },
  {
    title: 'Child Safety Standards',
    description: 'Published safety standards, reporting channels, and prohibited child-safety content.',
    href: 'child-safety.html',
    tag: 'Safety'
  },
  {
    title: 'Contact',
    description: 'Support, privacy, legal, and app-store compliance contact channels.',
    href: 'contact.html',
    tag: 'Support'
  }
];

// Search covers every existing product policy and common Turkish queries.
const policyKeywords = {
  'privacy.html': 'gizlilik veri privacy',
  'terms.html': 'kosullar sartlar sozlesme terms',
  'cookies.html': 'cerez cookie',
  'account-deletion.html': 'hesap silme hesap sil veri silme account deletion delete',
  'child-safety.html': 'cocuk guvenligi safety',
  'contact.html': 'iletisim destek yardim support contact'
};
policies.forEach((policy) => { policy.keywords = policyKeywords[policy.href] || ''; });
ronaiApps.forEach((app) => {
  policies.push({ title: `${app.name} Privacy`, description: app.description, href: app.privacy, tag: 'App policy', keywords: `${app.name} gizlilik privacy` });
  if (app.terms) policies.push({ title: `${app.name} Terms`, description: 'Product-specific terms of use.', href: app.terms, tag: 'App policy', keywords: `${app.name} kosullar sozlesme terms` });
});
const normalizeSearch = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').trim();

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));

const createStoreLinks = (app) => {
  const links = [];

  if (app.detail) {
    links.push(`<a class="button primary" href="${app.detail}">View app</a>`);
  }

  if (app.googlePlay) {
    links.push(
      `<a class="button secondary store" href="${app.googlePlay}" target="_blank" rel="noopener noreferrer">Google Play</a>`
    );
  }

  if (app.appStore) {
    links.push(
      `<a class="button secondary store" href="${app.appStore}" target="_blank" rel="noopener noreferrer">App Store</a>`
    );
  }

  links.push(`<a class="button secondary" href="${app.privacy}">Privacy</a>`);

  if (app.terms) links.push(`<a class="button secondary" href="${app.terms}">Terms</a>`);
  return links.join('');
};

const appCardTemplate = (app, variant = 'compact') => `
  <article class="app-card ${variant === 'full' ? 'app-card-full' : ''} reveal is-visible" data-category="${app.category}">
    ${variant === 'full' ? `
      <div class="app-preview" aria-hidden="true">
        <img src="${app.screenshot}" alt="" loading="lazy" />
      </div>
    ` : ''}
    <header>
      <span class="app-icon ${app.iconClass}" aria-hidden="true">
        <img src="${app.icon}" alt="" loading="lazy" />
      </span>
      <div>
        <span class="eyebrow subtle">${app.label}</span>
        <h3>${escapeHtml(app.name)}</h3>
        <div class="app-meta">
          ${app.platforms.map((platform) => `<span class="platform-pill">${platform}</span>`).join('')}
        </div>
      </div>
    </header>
    <p>${escapeHtml(app.description)}</p>
    ${variant === 'full' ? `
      <ul class="feature-list">
        ${app.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
      </ul>
    ` : ''}
    <div class="actions">
      ${createStoreLinks(app)}
    </div>
  </article>
`;

const policyTemplate = (policy) => `
  <a class="policy-card" href="${policy.href}" data-policy-card>
    <span class="eyebrow subtle">${policy.tag}</span>
    <h3>${escapeHtml(policy.title)}</h3>
    <p>${escapeHtml(policy.description)}</p>
    <small>Open page</small>
  </a>
`;

const renderHomeApps = () => {
  const target = document.querySelector('[data-home-apps]');
  if (!target) return;
  target.innerHTML = ronaiApps.map((app) => appCardTemplate(app)).join('');
};

const renderPolicies = (query = '') => {
  const target = document.querySelector('[data-policy-results]');
  if (!target) return;

  const normalizedQuery = normalizeSearch(query);
  let filtered = policies.filter((policy) =>
    normalizeSearch([policy.title, policy.description, policy.tag, policy.keywords || ''].join(' ')).includes(normalizedQuery)
  );
  if (!normalizedQuery && target.dataset.policyLimit) {
    const initial = ['privacy.html', 'terms.html', 'account-deletion.html'];
    filtered = initial.map((href) => policies.find((policy) => policy.href === href));
  }
  target.innerHTML = filtered.length
    ? filtered.map(policyTemplate).join('')
    : '<div class="notice">No legal pages matched your search. Try an app name, privacy, or account deletion.</div>';
};

const renderApps = (query = '', category = 'all') => {
  const target = document.querySelector('[data-app-list]');
  if (!target) return;

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = ronaiApps.filter((app) => {
    const matchesCategory = category === 'all' || app.category === category;
    const matchesSearch = [app.name, app.label, app.description, app.platforms.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  target.innerHTML = filtered.length
    ? filtered.map((app) => appCardTemplate(app, 'full')).join('')
    : '<div class="notice">No apps matched this filter.</div>';
};

const initNavigation = () => {
  const normalizePath = (path) => (path.split('/').pop() || 'index').replace(/\.html$/, '');
  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const path = normalizePath(link.getAttribute('href'));
    const isAppDetail = currentPath.startsWith('app-') && path === 'apps';
    if (path === currentPath || isAppDetail) link.setAttribute('aria-current', 'page');
  });
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;
  if (!menu.id) menu.id = 'main-menu';
  toggle.setAttribute('aria-controls', menu.id);
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false); toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
};

const initTheme = () => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let savedTheme;
  try { savedTheme = localStorage.getItem('ronai-theme'); } catch { /* Storage may be disabled. */ }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (prefersDark ? 'dark' : 'light');
  if (!toggle) return;
  const syncLabel = () => toggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Use light theme' : 'Use dark theme');
  syncLabel();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('ronai-theme', root.dataset.theme); } catch { /* Theme remains usable without storage. */ }
    syncLabel();
  });
};

const initSearch = () => {
  const policySearch = document.querySelector('[data-policy-search]');
  const appSearch = document.querySelector('[data-app-search]');
  const filters = document.querySelectorAll('[data-app-filter]');
  let activeCategory = 'all';

  renderPolicies();
  renderApps();

  policySearch?.addEventListener('input', (event) => renderPolicies(event.target.value));
  appSearch?.addEventListener('input', (event) => renderApps(event.target.value, activeCategory));

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      filters.forEach((item) => { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); });
      filter.classList.add('is-active');
      filter.setAttribute('aria-pressed', 'true');
      activeCategory = filter.dataset.appFilter;
      renderApps(appSearch?.value || '', activeCategory);
    });
  });
};

const initCopyButtons = () => {
  const toast = document.querySelector('[data-toast]');
  let timeout;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied to clipboard');
      } catch {
        showToast(value);
      }
    });
  });
};

const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  elements.forEach((element) => {
    if (document.body.classList.contains('studio-home')) { element.classList.remove('is-visible'); element.setAttribute('data-reveal-ready', ''); }
    observer.observe(element);
  });
};

const initShowcaseMotion = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-tilt-scene]').forEach((scene) => {
    scene.addEventListener('pointermove', (event) => {
      const rect = scene.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
      scene.style.setProperty('--tilt-x', `${y.toFixed(2)}deg`);
      scene.style.setProperty('--tilt-y', `${x.toFixed(2)}deg`);
    });

    scene.addEventListener('pointerleave', () => {
      scene.style.setProperty('--tilt-x', '0deg');
      scene.style.setProperty('--tilt-y', '0deg');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderHomeApps();
  initSearch();
  initCopyButtons();
  initReveal();
  initShowcaseMotion();
});
