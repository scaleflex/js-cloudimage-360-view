export const getHotspotPopupNode = (anchorId, open) => {
  const hotspotPopupSelector = `[data-hotspot-popup-id=${anchorId}]`;
  const hotspotPopup = document.querySelector(hotspotPopupSelector);

  if (open) {
    hotspotPopup.setAttribute('data-show', '');
  }

  return hotspotPopup;
};
