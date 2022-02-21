export const isMouseOnHotspot = () => {
  const hotspotElementsSelector = '[data-cloudimage-360-show]';

  const hostpotElements = document.querySelectorAll(hotspotElementsSelector);

  return !!hostpotElements.length;
};
