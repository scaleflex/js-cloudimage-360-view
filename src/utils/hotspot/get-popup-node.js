export const getPopupNode = (popupId) => {
  const popupSelector = 'data-CI-360-anchor';

  const popupNode = document.querySelector(`[${popupSelector}=${popupId}]`);

  return popupNode;
};
