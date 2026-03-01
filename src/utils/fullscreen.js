export const isFullscreenEnabled = () =>
  document.fullscreenEnabled || document.webkitFullscreenEnabled;

export const getFullscreenElement = () =>
  document.fullscreenElement || document.webkitFullscreenElement;

export const requestFullscreen = (el) => {
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return Promise.reject(new Error('Fullscreen API not supported'));
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  return Promise.reject(new Error('Fullscreen API not supported'));
};
