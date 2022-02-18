export const getPopupNode = (popupId) => {
  const popupSelector = 'data-cloudimage-360-hotspots';

  const popupNode = document.querySelector(`[${popupSelector}=${popupId}]`);

  return popupNode;
};
