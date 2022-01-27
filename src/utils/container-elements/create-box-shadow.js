export const createBoxShadow = (boxShadow, innerBox) => {
  const nextBoxShadow = document.createElement('div');

  nextBoxShadow.className = 'cloudimage-360-box-shadow';
  nextBoxShadow.style.boxShadow = boxShadow;
  innerBox.appendChild(nextBoxShadow);

  return nextBoxShadow;
};
