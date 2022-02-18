export const getHotspotPopupNode = (anchorId, open, currentPosition) => {
  const hotspotPopupSelector = `[data-hotspot-popup-id=${anchorId}]`;
  const hotspotPopup = document.querySelector(hotspotPopupSelector);

  if (open && currentPosition) {
    hotspotPopup.setAttribute('data-show', '');
  } else {
    hotspotPopup.removeAttribute('data-show');
  }

  return hotspotPopup;
};
