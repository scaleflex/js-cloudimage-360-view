import { AUTOPLAY_BEHAVIOR } from './utils/constants';

// Default values object
const DEFAULTS_VALUES = {
  folder: '/',
  apiVersion: 'v7',
  filenameX: 'image-{index}.jpg',
  filenameY: 'image-y-{index}.jpg',
  imageListX: null,
  imageListY: null,
  indexZeroBase: 0,
  amountX: 0,
  amountY: 0,
  speed: 80,
  dragSpeed: 150,
  keys: false,
  keysReverse: false,
  boxShadow: null,
  autoplay: false,
  autoplayBehavior: AUTOPLAY_BEHAVIOR.SPIN_X,
  playOnce: false,
  autoplayReverse: false,
  pointerZoom: 0,
  bottomCircle: false,
  fullscreen: false,
  magnifier: null,
  bottomCircleOffset: 5,
  ciToken: null,
  ciFilters: null,
  ciTransformation: null,
  lazyload: false,
  lazySelector: 'lazyload',
  spinReverse: false,
  controlReverse: false,
  stopAtEdges: false,
  logoSrc: 'https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/360_view.svg',
  imageInfo: false,
  initialIconHidden: true,
  bottomCircleHidden: true,
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
  keys: isTrue(image, 'keys', DEFAULTS_VALUES.keys),
  keysReverse: isTrue(image, 'keys-reverse', DEFAULTS_VALUES.keysReverse),
  boxShadow: getAttr(image, 'box-shadow', DEFAULTS_VALUES.boxShadow),
  autoplay: isTrue(image, 'autoplay', DEFAULTS_VALUES.autoplay),
  autoplayBehavior: getAttr(image, 'autoplay-behavior', DEFAULTS_VALUES.autoplayBehavior),
  playOnce: isTrue(image, 'play-once', DEFAULTS_VALUES.playOnce),
  autoplayReverse: isTrue(image, 'autoplay-reverse', DEFAULTS_VALUES.autoplayReverse),
  pointerZoom: parseFloat(getAttr(image, 'pointer-zoom', DEFAULTS_VALUES.pointerZoom), 10),
  bottomCircle: isTrue(image, 'bottom-circle', DEFAULTS_VALUES.bottomCircle),
  fullscreen: isTrue(image, 'fullscreen') || isTrue(image, 'full-screen', DEFAULTS_VALUES.fullscreen),
  magnifier: parseFloat(getAttr(image, 'magnifier', DEFAULTS_VALUES.magnifier), 10),
  bottomCircleOffset: parseInt(
    getAttr(image, 'bottom-circle-offset', DEFAULTS_VALUES.bottomCircleOffset),
    10
  ),
  ciToken: getAttr(image, 'responsive', DEFAULTS_VALUES.ciToken),
  ciFilters: getAttr(image, 'filters', DEFAULTS_VALUES.ciFilters),
  ciTransformation: getAttr(image, 'transformation', DEFAULTS_VALUES.ciTransformation),
  lazyload: isTrue(image, 'lazyload', DEFAULTS_VALUES.lazyload),
  lazySelector: getAttr(image, 'lazyload-selector', DEFAULTS_VALUES.lazySelector),
  spinReverse: isTrue(image, 'spin-reverse', DEFAULTS_VALUES.spinReverse),
  controlReverse: isTrue(image, 'control-reverse', DEFAULTS_VALUES.controlReverse),
  stopAtEdges: isTrue(image, 'stop-at-edges', DEFAULTS_VALUES.stopAtEdges),
  logoSrc: getAttr(image, 'logo-src', DEFAULTS_VALUES.logoSrc),
  imageInfo: isTrue(image, 'info', DEFAULTS_VALUES.imageInfo),
  initialIconHidden: isFalse(image, 'initial-icon'),
  bottomCircleHidden: isFalse(image, 'bottom-circle'),
});

const adaptConfig = (config) => ({
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
  dragSpeed: parseInt(config.dragSpeed ?? DEFAULTS_VALUES.dragSpeed, 10),
  keys: config.keys ?? DEFAULTS_VALUES.keys,
  keysReverse: config.keysReverse ?? DEFAULTS_VALUES.keysReverse,
  boxShadow: config.boxShadow || DEFAULTS_VALUES.boxShadow,
  autoplay: config.autoplay ?? DEFAULTS_VALUES.autoplay,
  autoplayBehavior: config.autoplayBehavior || DEFAULTS_VALUES.autoplayBehavior,
  playOnce: config.playOnce ?? DEFAULTS_VALUES.playOnce,
  autoplayReverse: config.autoplayReverse ?? DEFAULTS_VALUES.autoplayReverse,
  pointerZoom: parseFloat(config.pointerZoom ?? DEFAULTS_VALUES.pointerZoom, 10),
  bottomCircle: config.bottomCircle ?? DEFAULTS_VALUES.bottomCircle,
  fullscreen: config.fullscreen ?? DEFAULTS_VALUES.fullscreen,
  magnifier: parseFloat(config.magnifier ?? DEFAULTS_VALUES.magnifier, 10),
  bottomCircleOffset: parseInt(config.bottomCircleOffset ?? DEFAULTS_VALUES.bottomCircleOffset, 10),
  ciToken: config.ciToken || DEFAULTS_VALUES.ciToken,
  ciFilters: config.ciFilters || DEFAULTS_VALUES.ciFilters,
  ciTransformation: config.ciTransformation || DEFAULTS_VALUES.ciTransformation,
  lazyload: config.lazyload ?? DEFAULTS_VALUES.lazyload,
  lazySelector: config.lazySelector || DEFAULTS_VALUES.lazySelector,
  spinReverse: config.spinReverse ?? DEFAULTS_VALUES.spinReverse,
  controlReverse: config.controlReverse ?? DEFAULTS_VALUES.controlReverse,
  stopAtEdges: config.stopAtEdges ?? DEFAULTS_VALUES.stopAtEdges,
  logoSrc: config.logoSrc || DEFAULTS_VALUES.logoSrc,
  imageInfo: config.imageInfo ?? DEFAULTS_VALUES.imageInfo,
  initialIconHidden: config.initialIconHidden ?? DEFAULTS_VALUES.initialIconHidden,
  bottomCircleHidden: config.bottomCircleHidden ?? DEFAULTS_VALUES.bottomCircleHidden,
});

// Helper functions
const getAttr = (element, attribute, defaultValue) =>
  element.getAttribute(attribute) || element.getAttribute(`data-${attribute}`) || defaultValue;

const isTrue = (image, type) => {
  const imgProp = getAttr(image, type) || getAttr(image, `data-${type}`);

  return imgProp !== null && imgProp !== 'false';
};

const isFalse = (image, type) => {
  const imgProp = getAttr(image, type, null);
  return imgProp === 'false';
};

export { adaptConfig, getConfigFromImage };
