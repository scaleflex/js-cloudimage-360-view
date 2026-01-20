import closeIcon from '../../static/css/icons/close.svg';

export const createCloseIcon = () => {
  const close = document.createElement('button');

  close.className = 'cloudimage-360-button cloudimage-360-close-icon';
  close.setAttribute('aria-label', 'Close fullscreen');
  close.setAttribute('type', 'button');

  close.innerHTML = `<img alt="" src=${closeIcon} aria-hidden="true">`;

  return close;
};
