import FullscreenIcon from '../../static/css/icons/fullscreen.svg';

export const createFullscreenIcon = () => {
  const fullscreenIcon = document.createElement('button');

  fullscreenIcon.className = 'cloudimage-360-button cloudimage-360-fullscreen-button';
  fullscreenIcon.setAttribute('aria-label', 'View fullscreen');
  fullscreenIcon.setAttribute('type', 'button');

  fullscreenIcon.innerHTML = `<img alt="" src=${FullscreenIcon} aria-hidden="true">`;

  return fullscreenIcon;
};
