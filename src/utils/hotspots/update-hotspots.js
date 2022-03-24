import { prepareHotspotsPositions } from './prepare-hotspots-positions';
import { getHotspotIcon } from './get-hotspot-icon';
import { updateHotspotIconPosition } from './update-hotspot-icon-position';
import { hideHotspotIcon } from './hide-hotspot-icon';
import { getHotspotOriantaion } from './get-hotspot-orientation';

export const updateHotspots = (container, hotspotsProps, activeImageX = 0, activeImageY = 0, movingDirection = 'x-axis') => {
  hotspotsProps.forEach((hotspotProps) => {
    const { positions, initialDimensions, orientation, variant
    } = hotspotProps;
    const { anchorId } = variant;

    const hotspotOriantaion = getHotspotOriantaion(movingDirection);
    const currentImageIndex = orientation === 'x' ? activeImageX : activeImageY;

    const hotspotsPositions = prepareHotspotsPositions(positions);

    const currentPosition = hotspotsPositions
      .find((hotspotPosition) => hotspotPosition.imageIndex === currentImageIndex);

    const hotspotIcon = getHotspotIcon(anchorId);

    if (currentPosition && hotspotOriantaion === orientation) {
      const { xCoord = 0, yCoord = 0 } = currentPosition;

      updateHotspotIconPosition(container, initialDimensions, hotspotIcon, xCoord, yCoord);
    } else {
      hideHotspotIcon(hotspotIcon);
    }
  });
};
