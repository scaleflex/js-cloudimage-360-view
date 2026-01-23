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
  'folder',
  'folderX',
  'folderY',
  'filenameX',
  'filenameY',
  'imageListX',
  'imageListY',
  'indexZeroBase',
  'amountX',
  'amountY',
  'hints',
  'theme',
];

export const LEFT_RIGHT_KEYS = [37, 39];
export const UP_DOWN_KEYS = [38, 40];

// Detect mobile for throttle adjustment
const isMobileDevice = typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Touch/mouse throttle: 10ms (100fps) on desktop, 32ms (30fps) on mobile
// Mobile needs slower rate to prevent memory pressure from event closures
export const THROTTLE_TIME = isMobileDevice ? 32 : 10;

// Timing constants
export const DRAG_START_DELAY = 150;
export const ZOOM_TRANSITION_DELAY = 800;
export const POPPER_HIDE_DELAY = 150;
export const POPPER_REMOVE_DELAY = 200;

// Drag calculation constants
export const DRAG_SPEED_DIVISOR = 50;
export const MIN_DRAG_SPEED = 50;

// Zoom constraints
export const MAX_MAGNIFIER_LEVEL = 5;
export const MAX_POINTER_ZOOM = 5;
