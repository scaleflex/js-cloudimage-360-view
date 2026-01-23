export const createZoomOutIcon = () => {
  const zoomOut = document.createElement('button');

  zoomOut.className = 'cloudimage-360-button cloudimage-360-zoom-out-button';
  zoomOut.setAttribute('aria-label', 'Zoom out');
  zoomOut.setAttribute('type', 'button');

  // Magnifying glass with minus sign
  zoomOut.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>`;

  return zoomOut;
};
