export const getHotspotPopupNode = (anchorId) => {
  const hotspotPopupSelector = `[data-hotspot-popup-id=${anchorId}]`;
  const hotspotPopup = document.querySelector(hotspotPopupSelector);

  return hotspotPopup;
};
