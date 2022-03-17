export { isPropsChangeRequireReload } from './image-src/is-props-change-require-reload';

export { generateImagesPath } from './image-src/generate-images-path';
export { preloadImages } from './load-images/preload-images';
export { preloadOriginalImages } from './load-images/preload-original-images';
export { initLazyload } from './load-images/lazyload/init-lazyload'

export { contain } from './responsive/contain';
export { getImageAspectRatio } from './responsive/get-image-aspect-ratio';

export { getCurrentOriginalImage } from './magnify/get-current-original-image';
export { magnify } from './magnify/magnify';

export { generateZoomInSteps } from './zoom/generate-zoom-in-steps';
export { generateZoomOutSteps } from './zoom/generate-zoom-out-steps';

export { loop } from './auto-play/loop';
export { getSpeedFactor } from './auto-play/get-speed-factor';
export { isCompletedOneCycle } from './auto-play/is-completed-one-cycle';

export { addClass } from './class-names/add-class';
export { removeClass } from './class-names/remove-class';

export { getMovingDirection } from './spin-y/get-moving-direction';

export { getItemSkipped } from './controls/get-item-skipped';
export { initControls } from './controls/init-controls';

export * from './container-elements';

export { updateHotspots } from './hotspots/update-hotspots';
export { createHotspots } from './hotspots/elements/create-hotspots';
export { generateHotspotsConfigs } from './hotspots/generate-hotspots-configs';
export { isMouseOnHotspot } from './hotspots/is-mouse-on-hotspot';
export { hideHotspotsIcons } from './hotspots/hide-hotspots-icons';
