export const createMagnifierIcon = () => {
  const magnifier = document.createElement('button');

  magnifier.className = 'cloudimage-360-button cloudimage-360-magnifier-button';
  magnifier.setAttribute('aria-label', 'Magnify image');
  magnifier.setAttribute('type', 'button');

  magnifier.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>`;

  return magnifier;
};
