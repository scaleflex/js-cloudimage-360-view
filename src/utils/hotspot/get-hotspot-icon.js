export const getHotspotIcon = (anchorId) => {
  const hotspotIconSelector = `[data-hotspot-icon-id=${anchorId}]`;
  const hotspotIcon = document.querySelector(hotspotIconSelector);

  return hotspotIcon;
};
