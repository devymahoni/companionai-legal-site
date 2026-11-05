/* Deliberate motion, manual app selection, and reduced-motion support. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const choices = [...document.querySelectorAll('[data-hero-app]')];
  const screen = document.querySelector('[data-hero-screen]');
  const caption = document.querySelector('[data-hero-caption]');
  const link = document.querySelector('[data-hero-link]');
  const art = document.querySelector('.hero-art');
  const motionToggle = document.querySelector('[data-motion-toggle]');
  const motionImage = document.querySelector('[data-motion-image]');
  const scenes = {
    cartube: { image: 'assets/app-icons/cartube.webp', link: 'app-cartube.html', caption: 'CarTube · Your videos, AirPlay, and selectable GPS dials.', icon: true },
    kpss: { image: 'assets/app-screens/kpss-1.jpg', link: 'app-kpss.html', caption: 'KPSS Macerasi · Practice questions, mock exams, and study progress.' },
    lunara: { image: 'assets/app-screens/lunara-1.png', link: 'app-lunara.html', caption: 'Lunara AI · Personalized AI companionship with user controls.' },
    seriesguru: { image: 'assets/app-screens/seriesguru-1.jpg', link: 'app-seriesguru.html', caption: 'SeriesGuru · TV trivia, quiz packs, points, and leaderboards.' }
  };
  let selected = 1;
  let manuallyPaused = false;
  let changeTimer;
  const isPaused = () => manuallyPaused || reduceMotion.matches;
  const select = (index) => {
    selected = (index + choices.length) % choices.length;
    const key = choices[selected].dataset.heroApp;
    const scene = scenes[key];
    choices.forEach((choice, i) => {
      choice.classList.toggle('is-selected', i === selected);
      choice.setAttribute('aria-pressed', String(i === selected));
    });
    // Commit the final semantic state immediately, even during rapid selection.
    screen.src = scene.image;
    screen.dataset.screenKind = key;
    screen.parentElement.classList.toggle('is-icon', Boolean(scene.icon));
    const companion = document.querySelector('.hero-screen-secondary img');
    companion.src = key === 'lunara' ? scenes.kpss.image : scenes.lunara.image;
    companion.dataset.screenKind = key === 'lunara' ? 'kpss' : 'lunara';
    caption.textContent = scene.caption;
    link.href = scene.link;
    window.clearTimeout(changeTimer);
    art.classList.remove('is-changing');
    if (!isPaused()) {
      requestAnimationFrame(() => {
        art.classList.add('is-changing');
        changeTimer = window.setTimeout(() => art.classList.remove('is-changing'), 460);
      });
    }
  };
  choices.forEach((choice, index) => choice.addEventListener('click', () => select(index)));
  document.querySelectorAll('[data-hero-step]').forEach((button) => button.addEventListener('click', () => select(selected + Number(button.dataset.heroStep))));
  const syncMotion = () => {
    const paused = isPaused();
    document.documentElement.toggleAttribute('data-motion-paused', paused);
    motionImage.src = paused ? motionImage.dataset.static : motionImage.dataset.animated;
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.disabled = reduceMotion.matches;
    motionToggle.setAttribute('aria-label', reduceMotion.matches ? 'Reduced motion is enabled on your device' : (paused ? 'Resume animations' : 'Pause animations'));
    motionToggle.querySelector('img').src = `assets/icons/${paused ? 'play' : 'pause'}.svg`;
  };
  motionToggle.addEventListener('click', () => { manuallyPaused = !isPaused(); syncMotion(); });
  reduceMotion.addEventListener('change', syncMotion);
  syncMotion();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
