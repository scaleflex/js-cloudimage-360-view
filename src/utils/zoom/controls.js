const ZOOM_IN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`;

const ZOOM_OUT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`;

const ZOOM_RESET_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;

export const createZoomControls = (container, {
  position = 'bottom-right',
  onZoomIn,
  onZoomOut,
  onReset,
  zoomMax = 5,
} = {}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'cloudimage-360-zoom-controls';
  wrapper.setAttribute('data-position', position);
  wrapper.setAttribute('role', 'toolbar');
  wrapper.setAttribute('aria-label', 'Zoom controls');

  // Zoom in button
  const btnIn = document.createElement('button');
  btnIn.className = 'cloudimage-360-zoom-btn cloudimage-360-zoom-btn-in';
  btnIn.setAttribute('aria-label', 'Zoom in');
  btnIn.innerHTML = ZOOM_IN_SVG;
  btnIn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onZoomIn === 'function') onZoomIn();
  });

  // Zoom out button
  const btnOut = document.createElement('button');
  btnOut.className = 'cloudimage-360-zoom-btn cloudimage-360-zoom-btn-out';
  btnOut.setAttribute('aria-label', 'Zoom out');
  btnOut.innerHTML = ZOOM_OUT_SVG;
  btnOut.disabled = true; // Initially at 1x
  btnOut.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onZoomOut === 'function') onZoomOut();
  });

  // Reset button
  const btnReset = document.createElement('button');
  btnReset.className = 'cloudimage-360-zoom-btn cloudimage-360-zoom-btn-reset';
  btnReset.setAttribute('aria-label', 'Reset zoom');
  btnReset.innerHTML = ZOOM_RESET_SVG;
  btnReset.disabled = true; // Initially at 1x
  btnReset.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onReset === 'function') onReset();
  });

  wrapper.appendChild(btnIn);
  wrapper.appendChild(btnOut);
  wrapper.appendChild(btnReset);
  container.appendChild(wrapper);

  return {
    element: wrapper,
    updateState(zoom) {
      btnIn.disabled = zoom >= zoomMax;
      btnOut.disabled = zoom <= 1;
      btnReset.disabled = zoom <= 1;
    },
    show() {
      wrapper.classList.add('visible');
    },
    hide() {
      wrapper.classList.remove('visible');
    },
    destroy() {
      if (wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    },
  };
};
