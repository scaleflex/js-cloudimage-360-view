import MagnifierIcon from '../../static/css/icons/magnifier.svg';

export const createMagnifierIcon = () => {
  const magnifier = document.createElement('div');

  magnifier.className = 'cloudimage-360-button cloudimage-360-magnifier-button';

  magnifier.innerHTML = MagnifierIcon;

  return magnifier;
};
