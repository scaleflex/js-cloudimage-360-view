export const createPopupArrow = () => {
  const popupArrow = document.createElement('div');

  popupArrow.setAttribute('data-popper-arrow', '');
  popupArrow.setAttribute('data-cloudimage-360-hotspot', '');

  popupArrow.className = 'cloudimage-360-popup-arrow';

  return popupArrow;
};
