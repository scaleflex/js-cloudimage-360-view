export const createCloseIcon = () => {
  const close = document.createElement('button');

  close.className = 'cloudimage-360-button cloudimage-360-close-icon';
  close.setAttribute('aria-label', 'Close fullscreen');
  close.setAttribute('type', 'button');

  close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  return close;
};
