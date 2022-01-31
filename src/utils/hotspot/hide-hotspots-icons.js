import { hideHotspotIcon } from './hide-hotspot-icon';

export const hideHotspotsIcons = () => {
  const hotspotIconSelector = '[data-hotspot-icon-id]';
  const hotspotIcons = document.querySelectorAll(hotspotIconSelector) || [];

  hotspotIcons.forEach((hotspotIcon) => {
    hideHotspotIcon(hotspotIcon);
  });
};
