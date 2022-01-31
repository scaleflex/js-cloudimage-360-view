import { configsErrorHandler } from './configs-error-handler';
import { generatePopupConfig } from './generate-popup-config';

export const generateHotspotsConfigs = (hotspotsProps) => {
  const hotspotsConfigs = hotspotsProps.map((hotspotProps) => {
    const {
      variant = {},
      hotspots = [],
      indicatorSelector = '',
      popupProps = {},
      orientation = 'x',
      initialDimensions = [500, 500],
    } = hotspotProps;

    configsErrorHandler(hotspotProps);

    const popupConfig = generatePopupConfig(popupProps);
    const uniqueID = Math.floor(Math.random() * 10000);
    const anchorId = variant?.anchorId || `cloudimage-${uniqueID}`;

    const hotspotConfig = {
      variant : { ...variant, anchorId },
      popupProps: popupConfig,
      hotspots,
      indicatorSelector,
      initialDimensions,
      orientation: orientation.toLowerCase(),
    };

    return hotspotConfig;
  });

  return hotspotsConfigs;
};
