export { isSrcPropsChanged } from './image-src/is-src-props-changed';

export { generateImagesPath } from './image-src/generate-images-path';
export { preloadImages } from './load-images/preload-images';
export { preloadOriginalImages } from './load-images/preload-original-images';

export { contain } from './responsive/contain';
export { getImageAspectRatio } from './responsive/get-image-aspect-ratio';

export { getCurrentOriginalImage } from './magnify/get-current-original-image';
export { magnify } from './magnify/magnify';

export { generateZoomInSteps } from './zoom/generate-zoom-in-steps';
export { generateZoomOutSteps } from './zoom/generate-zoom-out-steps';

export { loop } from './auto-play/loop';
export { getSpeedFactor } from './auto-play/get-speed-factor';
export { isCompletedOneCycle } from './auto-play/is-completed-one-cycle';

export { addClass } from './common/add-class';
export { removeClass } from './common/remove-class';

export { getMovingDirection } from './spin-y/get-moving-direction';

export { getItemSkipped } from './controls/get-item-skipped';
export { initControls } from './controls/init-controls';

export * from './container-elements';

export { updateHotspots } from './hotspot/update-hotspots';
export { createHotspots } from './hotspot/elements/create-hotspots';
export { generateHotspotsConfigs } from './hotspot/generate-hotspots-configs';
export { isMouseOnHotspot } from './hotspot/is-mouse-on-hotspot';
export { hideHotspotsIcons } from './hotspot/hide-hotspots-icons';
