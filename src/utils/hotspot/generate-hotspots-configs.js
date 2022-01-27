import { configsErrorHandler } from './configs-error-handler';
import { generatePopupConfig } from './generate-popup-config';

export const generateHotspotsConfigs = (hotspotsProps) => {
  const hotspotsConfigs = hotspotsProps.map((hotspotProps) => {
    const uniqueID = Math.floor(Math.random() * 10000);
    const defaultAnchorId = `cloudimage-${uniqueID}`;

    const {
      variant,
      hotspots = [],
      indicatorClass = '',
      popupProps = {},
      orientation = 'x',
      initialDimensions = [500, 500],
    } = hotspotProps;

    const nextAnchorId = variant?.anchorId || defaultAnchorId;

    configsErrorHandler(hotspotProps);

    const popupConfig = generatePopupConfig(popupProps);

    const hotspotConfig = {
      variant: { ...variant, anchorId: nextAnchorId },
      popupProps: popupConfig,
      hotspots,
      indicatorClass,
      initialDimensions,
      orientation: orientation.toLowerCase(),
    };

    return hotspotConfig;
  });

  return hotspotsConfigs;
};
