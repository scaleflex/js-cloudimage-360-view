export const createInnerBox = (container) => {
  const innerBox = document.createElement('div');
  innerBox.className = 'cloudimage-360-inner-box';
  innerBox.setAttribute('role', 'img');
  innerBox.setAttribute('aria-label', '360 degree product view. Use mouse drag or arrow keys to rotate.');
  container.appendChild(innerBox);

  return innerBox;
};
