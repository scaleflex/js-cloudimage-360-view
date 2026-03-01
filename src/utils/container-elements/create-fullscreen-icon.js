const MAXIMIZE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`;

const MINIMIZE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`;

export const createFullscreenIcon = () => {
  const fullscreenIcon = document.createElement('button');

  fullscreenIcon.className = 'cloudimage-360-button cloudimage-360-fullscreen-button';
  fullscreenIcon.setAttribute('aria-label', 'View fullscreen');
  fullscreenIcon.setAttribute('type', 'button');

  fullscreenIcon.innerHTML = MAXIMIZE_SVG;

  return fullscreenIcon;
};

export const setFullscreenIconState = (button, isFullscreen) => {
  if (!button) return;

  button.innerHTML = isFullscreen ? MINIMIZE_SVG : MAXIMIZE_SVG;
  button.setAttribute('aria-label', isFullscreen ? 'Exit fullscreen' : 'View fullscreen');
};
