import { configsErrorHandler } from './configs-error-handler';
import { generatePopupConfig } from './generate-popup-config';

export const generateHotspotsConfigs = (hotspotsProps) => {
  const hotspotsConfigs = hotspotsProps.map((hotspotProps) => {
    const {
      variant = {},
      hotspots = [],
      indicatorClass = '',
      popupProps = {},
      orientation = 'x',
      initialDimensions = [500, 500],
    } = hotspotProps;

    configsErrorHandler(hotspotProps);

    const popupConfig = generatePopupConfig(popupProps);

    const hotspotConfig = {
      variant,
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
