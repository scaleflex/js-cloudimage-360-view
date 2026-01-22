export const createFullscreenModal = (container) => {
  const fullscreenModal = document.createElement('div');

  fullscreenModal.className = 'cloudimage-360-fullscreen-modal';

  const fullscreenContainer = container.cloneNode();

  // Reset any dimension constraints from the original container
  fullscreenContainer.style.width = '100%';
  fullscreenContainer.style.maxWidth = '100%';
  fullscreenContainer.style.height = '100vh';
  fullscreenContainer.style.maxHeight = '100%';

  fullscreenModal.appendChild(fullscreenContainer);

  window.document.body.appendChild(fullscreenModal);

  return fullscreenContainer;
};
