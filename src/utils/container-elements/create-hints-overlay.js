const HINT_ICONS = {
  drag: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  swipe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h8"/></svg>`,
  click: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>`,
  pinch: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l4 4"/><path d="M18 6l-4 4"/><path d="M6 18l4-4"/><path d="M18 18l-4-4"/><circle cx="12" cy="12" r="2"/></svg>`,
  keys: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m9 10 3 3 3-3"/></svg>`,
  fullscreen: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,
};

const HINT_LABELS = {
  drag: 'Drag to rotate',
  swipe: 'Swipe to rotate',
  click: 'Click to zoom',
  dblclick: 'Double-click to zoom',
  pinch: 'Pinch to zoom',
  keys: 'Use arrow keys',
  fullscreen: 'Click for fullscreen',
};

const createHintItem = (type, options = {}) => {
  const item = document.createElement('div');
  item.className = 'cloudimage-360-hint-item';

  // Use appropriate label for click/dblclick based on pointerZoomTrigger
  let label = HINT_LABELS[type];
  if (type === 'click' && options.pointerZoomTrigger === 'dblclick') {
    label = HINT_LABELS.dblclick;
  }

  item.innerHTML = `
    ${HINT_ICONS[type]}
    <span>${label}</span>
  `;
  return item;
};

export const createHintsOverlay = (container, hints = [], options = {}) => {
  if (!hints || hints.length === 0) return null;

  const overlay = document.createElement('div');
  overlay.className = 'cloudimage-360-hints-overlay';
  overlay.setAttribute('role', 'tooltip');
  overlay.setAttribute('aria-label', 'Interaction hints');

  const hintsContainer = document.createElement('div');
  hintsContainer.className = 'cloudimage-360-hints-container';

  hints.forEach((hint) => {
    if (HINT_ICONS[hint]) {
      hintsContainer.appendChild(createHintItem(hint, options));
    }
  });

  overlay.appendChild(hintsContainer);
  container.appendChild(overlay);

  return overlay;
};

export const getHintsForConfig = (config, isTouchDevice) => {
  // Default hints: drag and click for desktop, swipe for mobile
  if (isTouchDevice) {
    return ['swipe'];
  }
  return ['drag', 'click'];
};

export const showHintsOverlay = (overlay) => {
  if (!overlay) return;
  overlay.classList.add('visible');
};

export const hideHintsOverlay = (overlay) => {
  if (!overlay) return;
  overlay.classList.remove('visible');
  overlay.classList.add('hiding');

  // Remove after animation completes
  setTimeout(() => {
    overlay.classList.remove('hiding');
  }, 300);
};
