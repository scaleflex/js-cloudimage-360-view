import { getHotspotPopupNode } from './get-hotspot-popup-node';
import { createPopperInstance } from './create-popper-instace';
import { attachPopupEvents } from './attach-popup-events';
import { prepareHotspotsPositions } from './prepare-hotspots-positions';
import { getHotspotIcon } from './get-hotspot-icon';
import { updateHotspotIconPosition } from './update-hotspot-icon-position';
import { hideHotspotIcon } from './hide-hotspot-icon';
import { getHotspotOriantaion } from './get-hotspot-orientation';

export const updateHotspots = (container, hotspotsProps, activeImageX = 0, activeImageY = 0, movingDirection = 'x-axis') => {
  hotspotsProps.forEach((hotspotProps) => {
    const {
      popupProps, hotspots, initialDimensions, orientation, variant
    } = hotspotProps;

    const hotspotOriantaion = getHotspotOriantaion(movingDirection);
    const currentImage = orientation === 'x' ? activeImageX : activeImageY;

    const { open } = popupProps;
    const { anchorId } = variant;

    const popup = getHotspotPopupNode(anchorId, open);
    const hotspotIcon = getHotspotIcon(anchorId);
    const hotspotsPositions = prepareHotspotsPositions(hotspots);

    const popperInstance = createPopperInstance(popup, popupProps, container);

    popperInstance.state.elements.reference = hotspotIcon;
    popperInstance.update();

    attachPopupEvents(hotspotIcon, popup, popperInstance, open);

    const currentPosition = hotspotsPositions
      .find((hotspotPosition) => hotspotPosition.imageIndex === currentImage);

    if (currentPosition && hotspotOriantaion === orientation) {
      const { xCoord = 0, yCoord = 0 } = currentPosition;

      updateHotspotIconPosition(container, initialDimensions, hotspotIcon, xCoord, yCoord);
    } else {
      hideHotspotIcon(hotspotIcon);
    }
  });
};
