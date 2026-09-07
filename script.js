const ronaiApps = [
  {
    name: 'KPSS Macerasi',
    shortName: 'K',
    category: 'education',
    label: 'Education',
    platforms: ['Google Play', 'App Store'],
    iconClass: 'icon-kpss',
    description:
      'A Turkish exam-preparation app for KPSS candidates with practice questions, mock tests, study cards, and playful revision flows.',
    features: ['Practice questions', 'Mock exams', 'Progress tracking'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.ronailabs.kpssmacerasi',
    appStore: 'https://apps.apple.com/ch/developer/mahmut-yuce/id6792287157?l=en-GB',
    privacy: 'privacy-kpss.html'
  },
  {
    name: 'Lunara AI',
    shortName: 'L',
    category: 'ai',
    label: 'AI companion',
    platforms: ['Google Play'],
    iconClass: 'icon-lunara',
    description:
      'A text-first AI companion experience with personalization, reporting flows, user controls, and published safety documentation.',
    features: ['Personalized chat', 'Moderation workflows', 'Account deletion support'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.friendlychat.aura',
    appStore: '',
    privacy: 'privacy-aura.html'
  },
  {
    name: 'SeriesGuru',
    shortName: 'S',
    category: 'entertainment',
    label: 'Trivia',
    platforms: ['Google Play', 'App Store'],
    iconClass: 'icon-series',
    description:
      'A TV-series trivia app with quiz packs, points, difficulty levels, badges, and leaderboard-oriented replay value.',
    features: ['Quiz packs', 'Leaderboards', 'Multi-language support'],
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.ronailabs.seriesguru',
    appStore: 'https://apps.apple.com/gb/app/series-guru-tv-show-trivia/id6793951617',
    privacy: 'privacy-seriesguru.html'
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

  links.push(`<a class="button primary" href="${app.privacy}">Privacy</a>`);

  return links.join('');
};

const appCardTemplate = (app, variant = 'compact') => `
  <article class="app-card ${variant === 'full' ? 'app-card-full' : ''} reveal is-visible" data-category="${app.category}">
    <div>
      <header>
        <span class="app-icon ${app.iconClass}" aria-hidden="true">${app.shortName}</span>
        <div>
          <span class="eyebrow subtle">${app.label}</span>
          <h3>${escapeHtml(app.name)}</h3>
        </div>
      </header>
      <p>${escapeHtml(app.description)}</p>
      <div class="app-meta">
        ${app.platforms.map((platform) => `<span class="platform-pill">${platform}</span>`).join('')}
      </div>
      ${variant === 'full' ? `
        <ul class="feature-list">
          ${app.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
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

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = policies.filter((policy) =>
    [policy.title, policy.description, policy.tag].join(' ').toLowerCase().includes(normalizedQuery)
  );

  target.innerHTML = filtered.length
    ? filtered.map(policyTemplate).join('')
    : '<div class="notice">No legal pages matched your search.</div>';
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
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
};

const initTheme = () => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('ronai-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.dataset.theme = theme;

  if (!toggle) return;

  const syncLabel = () => {
    toggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Use light theme' : 'Use dark theme');
  };

  syncLabel();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ronai-theme', root.dataset.theme);
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
      filters.forEach((item) => item.classList.remove('is-active'));
      filter.classList.add('is-active');
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

  elements.forEach((element) => observer.observe(element));
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderHomeApps();
  initSearch();
  initCopyButtons();
  initReveal();
});
