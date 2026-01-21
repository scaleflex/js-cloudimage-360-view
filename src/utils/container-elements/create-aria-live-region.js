export const createAriaLiveRegion = (container) => {
  const liveRegion = document.createElement('div');
  liveRegion.className = 'cloudimage-360-sr-only';
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  container.appendChild(liveRegion);

  return liveRegion;
};

export const announceToScreenReader = (liveRegion, message) => {
  if (!liveRegion) return;

  // Clear and set message to ensure it's announced
  liveRegion.textContent = '';
  // Use setTimeout to ensure the DOM update is processed
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
};
