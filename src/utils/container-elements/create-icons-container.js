export const createIconsContainer = (innerBox) => {
  const iconsContainer = document.createElement('div');
  iconsContainer.className = 'cloudimage-360-icons-container';
  innerBox.appendChild(iconsContainer);

  return iconsContainer;
};
