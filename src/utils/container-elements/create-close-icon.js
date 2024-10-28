import closeIcon from '../../static/css/icons/close.svg';

export const createCloseIcon = () => {
  const close = document.createElement('div');

  close.className = 'cloudimage-360-button cloudimage-360-close-icon';

  close.innerHTML = closeIcon;

  return close;
};
