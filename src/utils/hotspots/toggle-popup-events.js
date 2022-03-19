import { isTrue } from "../../ci360.utils";
import { getHotspotIcon } from "./get-hotspot-icon";

export const togglePopupEvents = (hotspotsProps, event, isMouseDown) => {
  const iClickOnHotspotIcon = event && isTrue(event.target, 'data-cloudimage-360-hotspot');

  if (iClickOnHotspotIcon) return;

  hotspotsProps.forEach((hotspotProps) => {
    const { variant } = hotspotProps;
    const { anchorId } = variant;

    const hotspotIcon = getHotspotIcon(anchorId);

    hotspotIcon.style.pointerEvents = isMouseDown ? 'none' : 'all';
  });
}
