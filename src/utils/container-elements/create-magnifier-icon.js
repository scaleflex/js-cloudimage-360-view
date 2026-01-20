import MagnifierIcon from '../../static/css/icons/magnifier.svg';

export const createMagnifierIcon = () => {
  const magnifier = document.createElement('button');

  magnifier.className = 'cloudimage-360-button cloudimage-360-magnifier-button';
  magnifier.setAttribute('aria-label', 'Magnify image');
  magnifier.setAttribute('type', 'button');

  magnifier.innerHTML = `<img alt="" src=${MagnifierIcon} aria-hidden="true">`;

  return magnifier;
};
