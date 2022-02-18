import { createHotspotIcon } from './create-hotspot-icon';
import { createPopup } from './create-popup';

export const createHotspots = (container, hotspotsProps) => {
  hotspotsProps.forEach((hotspotProps) => {
    const { popupProps } = hotspotProps;

    createPopup(container, hotspotProps, popupProps);
    createHotspotIcon(container, hotspotProps);
  });
};
