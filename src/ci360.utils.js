import { AUTOPLAY_BEHAVIOR } from './utils/constants';


// Default values object
const DEFAULTS_VALUES = {
  folder: '/',
  apiVersion: 'v7',
  filenameX: 'image-{index}.jpg',
  filenameY: null,
  imageListX: null,
  imageListY: null,
  indexZeroBase: 0,
  amountX: 0,
  amountY: 0,
  speed: 80,
  dragSpeed: 150,
  draggable: true,
  swipeable: true,
  keys: false,
  keysReverse: false,
  autoplay: false,
  autoplayBehavior: AUTOPLAY_BEHAVIOR.SPIN_X,
  playOnce: false,
  autoplayReverse: false,
  pointerZoom: 0,
  pointerZoomTrigger: 'dblclick',
  fullscreen: false,
  magnifier: null,
  zoomMax: 5,
  zoomStep: 0.5,
  zoomControls: true,
  zoomControlsPosition: 'bottom-right',
  scrollHint: true,
  bottomCircle: true,
  bottomCircleOffset: 5,
  ciToken: null,
  ciFilters: null,
  ciTransformation: null,
  lazyload: true,
  dragReverse: false,
  stopAtEdges: false,
  imageInfo: false,
  initialIconShown: true,
  hotspots: null,
  hotspotTrigger: 'hover',
  hide360Logo: false,
  logoSrc: null,
  inertia: false,
  pinchZoom: true,
  hints: true,
  theme: null,
  markerTheme: null,
  brandColor: null,
  hotspotTimelineOnClick: true,
  aspectRatio: null,
  cropAspectRatio: null,
  cropGravity: null,
  // Event callbacks
  onReady: null,
  onLoad: null,
  onSpin: null,
  onAutoplayStart: null,
  onAutoplayStop: null,
  onFullscreenOpen: null,
  onFullscreenClose: null,
  onZoomIn: null,
  onZoomOut: null,
  onDragStart: null,
  onDragEnd: null,
  onHotspotOpen: null,
  onHotspotClose: null,
  onProductClick: null,
  onError: null,
};

const getConfigFromImage = (image) => ({
  folder: getAttr(image, 'folder', DEFAULTS_VALUES.folder),
  apiVersion: getAttr(image, 'api-version', DEFAULTS_VALUES.apiVersion),
  filenameX: getAttr(image, 'filename') || getAttr(image, 'filename-x') || DEFAULTS_VALUES.filenameX,
  filenameY: getAttr(image, 'filename-y', DEFAULTS_VALUES.filenameY),
  imageListX: getAttr(image, 'image-list-x', DEFAULTS_VALUES.imageListX),
  imageListY: getAttr(image, 'image-list-y', DEFAULTS_VALUES.imageListY),
  indexZeroBase: parseInt(getAttr(image, 'index-zero-base', DEFAULTS_VALUES.indexZeroBase), 10),
  amountX: parseInt(getAttr(image, 'amount-x', DEFAULTS_VALUES.amountX), 10),
  amountY: parseInt(getAttr(image, 'amount-y', DEFAULTS_VALUES.amountY), 10),
  speed: parseInt(getAttr(image, 'speed', DEFAULTS_VALUES.speed), 10),
  dragSpeed: parseInt(getAttr(image, 'drag-speed', DEFAULTS_VALUES.dragSpeed), 10),
  draggable: isTrue(image, 'draggable', DEFAULTS_VALUES.draggable),
  swipeable: isTrue(image, 'swipeable', DEFAULTS_VALUES.swipeable),
  keys: isTrue(image, 'keys', DEFAULTS_VALUES.keys),
  keysReverse: isTrue(image, 'keys-reverse', DEFAULTS_VALUES.keysReverse),
  autoplay: isTrue(image, 'autoplay', DEFAULTS_VALUES.autoplay),
  autoplayBehavior: getAttr(image, 'autoplay-behavior', DEFAULTS_VALUES.autoplayBehavior),
  playOnce: isTrue(image, 'play-once', DEFAULTS_VALUES.playOnce),
  autoplayReverse: isTrue(image, 'autoplay-reverse', DEFAULTS_VALUES.autoplayReverse),
  pointerZoom: parseFloat(getAttr(image, 'pointer-zoom', DEFAULTS_VALUES.pointerZoom)),
  pointerZoomTrigger: getAttr(image, 'pointer-zoom-trigger', DEFAULTS_VALUES.pointerZoomTrigger),
  fullscreen: isTrue(image, 'fullscreen') || isTrue(image, 'full-screen', DEFAULTS_VALUES.fullscreen),
  magnifier: getAttr(image, 'magnifier', null) != null ? parseFloat(getAttr(image, 'magnifier', null)) : null,
  zoomMax: parseFloat(getAttr(image, 'zoom-max', DEFAULTS_VALUES.zoomMax)),
  zoomStep: parseFloat(getAttr(image, 'zoom-step', DEFAULTS_VALUES.zoomStep)),
  zoomControls: !isFalse(image, 'zoom-controls'),
  zoomControlsPosition: getAttr(image, 'zoom-controls-position', DEFAULTS_VALUES.zoomControlsPosition),
  scrollHint: !isFalse(image, 'scroll-hint'),
  bottomCircleOffset: parseInt(
    getAttr(image, 'bottom-circle-offset', DEFAULTS_VALUES.bottomCircleOffset),
    10
  ),
  ciToken: getAttr(image, 'responsive', DEFAULTS_VALUES.ciToken),
  ciFilters: getAttr(image, 'filters', DEFAULTS_VALUES.ciFilters),
  ciTransformation: getAttr(image, 'transformation', DEFAULTS_VALUES.ciTransformation),
  lazyload: isTrue(image, 'lazyload', DEFAULTS_VALUES.lazyload),
  dragReverse: isTrue(image, 'drag-reverse', DEFAULTS_VALUES.dragReverse),
  stopAtEdges: isTrue(image, 'stop-at-edges', DEFAULTS_VALUES.stopAtEdges),
  imageInfo: isTrue(image, 'info', DEFAULTS_VALUES.imageInfo),
  initialIconShown: !isFalse(image, 'initial-icon'),
  bottomCircle: !isFalse(image, 'bottom-circle'),
  hide360Logo: isTrue(image, 'hide-360-logo', DEFAULTS_VALUES.hide360Logo),
  logoSrc: getAttr(image, 'logo-src', DEFAULTS_VALUES.logoSrc),
  inertia: isTrue(image, 'inertia', DEFAULTS_VALUES.inertia),
  pinchZoom: isTrue(image, 'pinch-zoom', DEFAULTS_VALUES.pinchZoom),
  hints: !isFalse(image, 'hints'),
  theme: getAttr(image, 'theme', DEFAULTS_VALUES.theme),
  markerTheme: getAttr(image, 'marker-theme', DEFAULTS_VALUES.markerTheme),
  brandColor: getAttr(image, 'brand-color', DEFAULTS_VALUES.brandColor),
  hotspotTrigger: getAttr(image, 'hotspot-trigger', DEFAULTS_VALUES.hotspotTrigger),
  hotspotTimelineOnClick: !isFalse(image, 'hotspot-timeline-on-click'),
  aspectRatio: getAttr(image, 'aspect-ratio', DEFAULTS_VALUES.aspectRatio),
  cropAspectRatio: getAttr(image, 'crop-aspect-ratio', DEFAULTS_VALUES.cropAspectRatio),
  cropGravity: getAttr(image, 'crop-gravity', DEFAULTS_VALUES.cropGravity),
});

const validateConfig = (config) => {
  const warnings = [];

  // Validate numeric ranges
  if (config.amountX !== undefined && config.amountX < 0) {
    warnings.push('amountX should be a positive number');
  }
  if (config.amountY !== undefined && config.amountY < 0) {
    warnings.push('amountY should be a positive number');
  }
  if (config.speed !== undefined && config.speed <= 0) {
    warnings.push('speed should be a positive number');
  }
  if (config.dragSpeed !== undefined && config.dragSpeed <= 0) {
    warnings.push('dragSpeed should be a positive number');
  }
  if (config.pointerZoom !== undefined && config.pointerZoom !== 0 && (config.pointerZoom < 1 || config.pointerZoom > 5)) {
    warnings.push('pointerZoom should be between 1 and 5 (or 0 to disable)');
  }
  if (config.magnifier !== undefined && config.magnifier !== null && config.magnifier !== 0) {
    warnings.push('magnifier option is deprecated and will be ignored. Use zoomMax instead.');
  }
  if (config.pointerZoomTrigger === 'click') {
    warnings.push('pointerZoomTrigger: "click" is deprecated. Zoom is now always triggered by double-click. Use dblclick trigger or the new zoom controls.');
  }

  // Validate required combinations
  if (!config.folder && !config.imageListX && !config.imageListY) {
    warnings.push('Either folder or imageListX/imageListY is required');
  }
  if (config.folder && !config.amountX && !config.imageListX) {
    warnings.push('amountX is required when using folder (unless imageListX is provided)');
  }

  // Validate autoplayBehavior values
  const validBehaviors = ['spin-x', 'spin-y', 'spin-xy', 'spin-yx'];
  if (config.autoplayBehavior && !validBehaviors.includes(config.autoplayBehavior)) {
    warnings.push(`autoplayBehavior should be one of: ${validBehaviors.join(', ')}`);
  }

  // Log warnings
  warnings.forEach((warning) => {
    console.warn(`CloudImage 360: ${warning}`);
  });

  return warnings.length === 0;
};

const adaptConfig = (config) => {
  validateConfig(config);

  return {
    folder: config.folder || DEFAULTS_VALUES.folder,
    apiVersion: config.apiVersion || DEFAULTS_VALUES.apiVersion,
    filenameX: config.filenameX || config.filename || DEFAULTS_VALUES.filenameX,
    filenameY: config.filenameY || DEFAULTS_VALUES.filenameY,
    imageListX: config.imageListX || DEFAULTS_VALUES.imageListX,
    imageListY: config.imageListY || DEFAULTS_VALUES.imageListY,
    indexZeroBase: parseInt(config.indexZeroBase ?? DEFAULTS_VALUES.indexZeroBase, 10),
    amountX: parseInt(config.amountX ?? DEFAULTS_VALUES.amountX, 10),
    amountY: parseInt(config.amountY ?? DEFAULTS_VALUES.amountY, 10),
    speed: parseInt(config.speed ?? DEFAULTS_VALUES.speed, 10),
    draggable: config.draggable ?? DEFAULTS_VALUES.draggable,
    swipeable: config.swipeable ?? DEFAULTS_VALUES.swipeable,
    dragSpeed: parseInt(config.dragSpeed ?? DEFAULTS_VALUES.dragSpeed, 10),
    keys: config.keys ?? DEFAULTS_VALUES.keys,
    keysReverse: config.keysReverse ?? DEFAULTS_VALUES.keysReverse,
    autoplay: config.autoplay ?? DEFAULTS_VALUES.autoplay,
    autoplayBehavior: config.autoplayBehavior || DEFAULTS_VALUES.autoplayBehavior,
    playOnce: config.playOnce ?? DEFAULTS_VALUES.playOnce,
    autoplayReverse: config.autoplayReverse ?? DEFAULTS_VALUES.autoplayReverse,
    pointerZoom: parseFloat(config.pointerZoom ?? DEFAULTS_VALUES.pointerZoom),
    pointerZoomTrigger: config.pointerZoomTrigger || DEFAULTS_VALUES.pointerZoomTrigger,
    fullscreen: config.fullscreen ?? DEFAULTS_VALUES.fullscreen,
    magnifier: config.magnifier != null ? parseFloat(config.magnifier) : null,
    zoomMax: parseFloat(config.zoomMax ?? DEFAULTS_VALUES.zoomMax),
    zoomStep: parseFloat(config.zoomStep ?? DEFAULTS_VALUES.zoomStep),
    zoomControls: config.zoomControls ?? DEFAULTS_VALUES.zoomControls,
    zoomControlsPosition: config.zoomControlsPosition || DEFAULTS_VALUES.zoomControlsPosition,
    scrollHint: config.scrollHint ?? DEFAULTS_VALUES.scrollHint,
    bottomCircleOffset: parseInt(config.bottomCircleOffset ?? DEFAULTS_VALUES.bottomCircleOffset, 10),
    ciToken: config.ciToken || DEFAULTS_VALUES.ciToken,
    ciFilters: config.ciFilters || DEFAULTS_VALUES.ciFilters,
    ciTransformation: config.ciTransformation || DEFAULTS_VALUES.ciTransformation,
    lazyload: config.lazyload ?? DEFAULTS_VALUES.lazyload,
    dragReverse: config.dragReverse ?? DEFAULTS_VALUES.dragReverse,
    stopAtEdges: config.stopAtEdges ?? DEFAULTS_VALUES.stopAtEdges,
    imageInfo: config.imageInfo ?? DEFAULTS_VALUES.imageInfo,
    initialIconShown: config.initialIconShown ?? DEFAULTS_VALUES.initialIconShown,
    bottomCircle: config.bottomCircle ?? DEFAULTS_VALUES.bottomCircle,
    hotspots: config.hotspots ?? DEFAULTS_VALUES.hotspots,
    hotspotTrigger: config.hotspotTrigger || DEFAULTS_VALUES.hotspotTrigger,
    hide360Logo: config.hide360Logo ?? DEFAULTS_VALUES.hide360Logo,
    logoSrc: config.logoSrc || DEFAULTS_VALUES.logoSrc,
    inertia: config.inertia ?? DEFAULTS_VALUES.inertia,
    pinchZoom: config.pinchZoom ?? DEFAULTS_VALUES.pinchZoom,
    hints: config.hints ?? DEFAULTS_VALUES.hints,
    theme: config.theme || DEFAULTS_VALUES.theme,
    markerTheme: config.markerTheme || DEFAULTS_VALUES.markerTheme,
    brandColor: config.brandColor || DEFAULTS_VALUES.brandColor,
    hotspotTimelineOnClick: config.hotspotTimelineOnClick ?? DEFAULTS_VALUES.hotspotTimelineOnClick,
    aspectRatio: config.aspectRatio || DEFAULTS_VALUES.aspectRatio,
    cropAspectRatio: config.cropAspectRatio || DEFAULTS_VALUES.cropAspectRatio,
    cropGravity: config.cropGravity || DEFAULTS_VALUES.cropGravity,
    // Event callbacks
    onReady: config.onReady ?? DEFAULTS_VALUES.onReady,
    onLoad: config.onLoad ?? DEFAULTS_VALUES.onLoad,
    onSpin: config.onSpin ?? DEFAULTS_VALUES.onSpin,
    onAutoplayStart: config.onAutoplayStart ?? DEFAULTS_VALUES.onAutoplayStart,
    onAutoplayStop: config.onAutoplayStop ?? DEFAULTS_VALUES.onAutoplayStop,
    onFullscreenOpen: config.onFullscreenOpen ?? DEFAULTS_VALUES.onFullscreenOpen,
    onFullscreenClose: config.onFullscreenClose ?? DEFAULTS_VALUES.onFullscreenClose,
    onZoomIn: config.onZoomIn ?? DEFAULTS_VALUES.onZoomIn,
    onZoomOut: config.onZoomOut ?? DEFAULTS_VALUES.onZoomOut,
    onDragStart: config.onDragStart ?? DEFAULTS_VALUES.onDragStart,
    onDragEnd: config.onDragEnd ?? DEFAULTS_VALUES.onDragEnd,
    onHotspotOpen: config.onHotspotOpen ?? DEFAULTS_VALUES.onHotspotOpen,
    onHotspotClose: config.onHotspotClose ?? DEFAULTS_VALUES.onHotspotClose,
    onProductClick: config.onProductClick ?? DEFAULTS_VALUES.onProductClick,
    onError: config.onError ?? DEFAULTS_VALUES.onError,
  };
};


// Helper functions
const getAttr = (element, attribute, defaultValue) =>
  element.getAttribute(attribute) || element.getAttribute(`data-${attribute}`) || defaultValue;

const isTrue = (image, type, defaultValue) => {
  const hasAttribute = image.hasAttribute(type) || image.hasAttribute(`data-${type}`);

  if (!hasAttribute) return defaultValue;

  const value = getAttr(image, type, null);
  return value !== 'false' && value !== '0';
};

const isFalse = (image, type) => {
  const imgProp = getAttr(image, type, null);
  return imgProp === 'false';
};

export { adaptConfig, getConfigFromImage };
