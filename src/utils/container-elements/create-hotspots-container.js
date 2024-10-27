export const createHotspotsContainer = (container) => {
  const hotspotContainer = document.createElement('div');
  hotspotContainer.className = 'cloudimage-360-hotspot-container';
  container.appendChild(hotspotContainer);

  return hotspotContainer;
};
