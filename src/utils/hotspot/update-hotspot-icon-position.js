export const updateHotspotIconPosition = (container, initialDimensions, icon, xCoord, yCoord) => {
  icon.style.visibility = 'visible';
  icon.style.opacity = 1;
  icon.style.zIndex = 100;

  icon.style.left = `${-icon.offsetWidth / 2}px`;
  icon.style.top = `${-icon.offsetHeight / 2}px`;

  const positionXRatio = container.offsetWidth / initialDimensions[0];
  const positionYRatio = container.offsetHeight / initialDimensions[1];

  const translateX = `${(positionXRatio * xCoord)}px`;
  const translateY = `${(positionYRatio * yCoord)}px`;

  icon.style.transform = `translate3d(${translateX}, ${translateY}, 0)`;
};
