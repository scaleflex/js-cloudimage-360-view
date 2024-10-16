export const AUTOPLAY_BEHAVIOR = {
  SPIN_X: 'spin-x',
  SPIN_Y: 'spin-y',
  SPIN_XY: 'spin-xy',
  SPIN_YX: 'spin-yx',
};

export const FALSY_VALUES = [false, 0, null, undefined, 'false', '0', 'null', 'undefined'];

export const ORIENTATIONS = {
  X: 'x-axis',
  Y: 'y-axis',
  CENTER: 'center',
};

export const PROPS_REQUIRE_RELOAD = [
  'folder', //images source
  'filenameX', //images source
  'filenameY', //images source
  'apiVersion', //images source
  'imageListX', //images source
  'imageListY', //images source
  'indexZeroBase', //images source
  'lazySelector', //images source
  'keys', // events
  'stopAtEdges', // events
  'disableDrag', // events
  'controlReverse', // events
  'disableDrag', // events
];

export const LEFT_RIGHT_KEYS = [37, 39];
export const UP_DOWN_KEYS = [38, 40];

export const THROTTLE_TIME = 10;
