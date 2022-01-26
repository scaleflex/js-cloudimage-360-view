export const createInnerBox = (container) => {
  const innerBox = document.createElement('div');
  innerBox.className = 'cloudimage-360-inner-box';
  container.appendChild(innerBox);

  return innerBox;
};
