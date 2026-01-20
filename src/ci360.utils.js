import { AUTOPLAY_BEHAVIOR } from './utils/constants';

// Logo URL for 360 view branding
const LOGO_SRC = 'https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/360_view.svg';

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
  fullscreen: false,
  magnifier: null,
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
  hide360Logo: false,
  logoSrc: LOGO_SRC,
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
  fullscreen: isTrue(image, 'fullscreen') || isTrue(image, 'full-screen', DEFAULTS_VALUES.fullscreen),
  magnifier: parseFloat(getAttr(image, 'magnifier', DEFAULTS_VALUES.magnifier)),
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
  if (config.magnifier !== undefined && config.magnifier !== null && config.magnifier !== 0 && (config.magnifier < 1 || config.magnifier > 5)) {
    warnings.push('magnifier should be between 1 and 5 (or 0/null to disable)');
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
    fullscreen: config.fullscreen ?? DEFAULTS_VALUES.fullscreen,
    magnifier: parseFloat(config.magnifier ?? DEFAULTS_VALUES.magnifier),
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
    hide360Logo: config.hide360Logo ?? DEFAULTS_VALUES.hide360Logo,
    logoSrc: config.logoSrc || DEFAULTS_VALUES.logoSrc,
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
