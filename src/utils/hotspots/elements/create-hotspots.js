import { createPopperInstance } from '../create-popper-instace';
import { createHotspotIcon } from './create-hotspot-icon';
import { createPopup } from './create-popup';

export const createHotspots = (container, hotspotsProps) => {
  hotspotsProps.forEach((hotspotProps) => {
    const { popupProps } = hotspotProps;

    const popup = createPopup(container, hotspotProps, popupProps);
    const popperInstance = createPopperInstance(popup, popupProps, container);
    const hotspotIcon = createHotspotIcon(container, hotspotProps, popup, popperInstance);

    popperInstance.state.elements.reference = hotspotIcon;
    popperInstance.update();
  });
};
