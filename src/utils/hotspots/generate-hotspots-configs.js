import { configsErrorHandler } from './configs-error-handler';
import { generatePopupConfig } from './generate-popup-config';

export const generateHotspotsConfigs = (hotspotsProps) => {
  const hotspotsConfigs = hotspotsProps.map((hotspotProps) => {
    const {
      variant = {},
      positions = [],
      indicatorSelector = '',
      popupProps = {},
      orientation = 'x',
      initialDimensions = [500, 500],
    } = hotspotProps;

    configsErrorHandler(hotspotProps);

    const popupConfig = generatePopupConfig(popupProps);
    let anchorId = variant?.anchorId;

    if (!anchorId) {
      const uniqueID = Math.floor(Math.random() * 10000);
      anchorId = `cloudimage-360-${uniqueID}`
    }

    const hotspotConfig = {
      variant : { ...variant, anchorId },
      popupProps: popupConfig,
      positions,
      indicatorSelector,
      initialDimensions,
      orientation: orientation.toLowerCase(),
    };

    return hotspotConfig;
  });

  return hotspotsConfigs;
};
