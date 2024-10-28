import FullscreenIcon from '../../static/css/icons/fullscreen.svg';

export const createFullscreenIcon = () => {
  const fullscreenIcon = document.createElement('div');
  fullscreenIcon.className = 'cloudimage-360-button cloudimage-360-fullscreen-button';

  fullscreenIcon.innerHTML = FullscreenIcon;

  return fullscreenIcon;
};
