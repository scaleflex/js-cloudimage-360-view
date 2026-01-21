import { GURKHA_SUV_HOTSPOTS_CONFIG } from './hotspots-config.constant';

const NIKE_PLUGIN = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/360-nike/',
  filenameX: 'nike-{index}.jpg',
  filenameY: 'nike-y-{index}.jpg',
  amountX: '35',
  amountY: '36',
  autoplayBehavior: 'spin-xy',
};

const EARBUDS_PLUGIN = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/earbuds/',
  filenameX: '{index}.jpg',
  amountX: '233',
  amountY: undefined,
  filenameY: undefined,
};

const SPIN_DIRECTION_PROPS = ['filename-y', 'data-amount-y', 'data-autoplay-behavior'];

const PLUGIN_PROPS = {
  folder: {
    label: 'data-folder',
    value: 'https://scaleflex.cloudimg.io/v7/demo/earbuds/',
    isRequired: true,
    isUrl: true,
  },
  filenameX: { label: 'data-filename-x', value: '{index}.jpg' },
  filenameY: { label: 'data-filename-y' },
  amountY: { label: 'data-amount-y', isRequired: false },
  amountX: { label: 'data-amount-x', value: 233, isRequired: true },
  speed: { label: 'data-speed', value: 100, isRequired: false },
  dragSpeed: { label: 'data-drag-speed', value: 120, isRequired: false },
  autoplay: { label: 'data-autoplay', isRequired: false },
  pointerZoom: { label: 'data-pointer-zoom', value: 1.5, isRequired: false },
  autoplayBehavior: { label: 'data-autoplay-behavior', value: 'spin-xy', isRequired: false },
  magnifier: { label: 'data-magnifier', value: 1.5, isRequired: false },
  autoplayReverse: { label: 'data-autoplay-reverse', isRequired: false },
  playOnce: { label: 'data-play-once', isRequired: false },
  keys: { label: 'data-keys', isRequired: false },
  keysReverse: { label: 'data-keys-reverse', isRequired: false },
  draggable: { label: 'data-draggable', isRequired: false },
  swipeable: { label: 'data-swipeable', isRequired: false },
  fullscreen: { label: 'data-fullscreen', isRequired: false },
  dragReverse: { label: 'data-drag-reverse', isRequired: false },
  stopAtEdges: { label: 'data-stop-at-edges', isRequired: false },
  bottomCircle: { label: 'data-bottom-circle', isRequired: false },
  inertia: { label: 'data-inertia', isRequired: false },
};

const PROPERTIES_COLORS = {
  NAME: '#7B9200',
  URL: '#2D88CB',
};

const URL_PROPERTIES = ['folder', 'class'];

export {
  NIKE_PLUGIN,
  EARBUDS_PLUGIN,
  SPIN_DIRECTION_PROPS,
  PLUGIN_PROPS,
  PROPERTIES_COLORS,
  URL_PROPERTIES,
  GURKHA_SUV_HOTSPOTS_CONFIG,
};
