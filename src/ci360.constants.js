const TO_START_POINTER_ZOOM = {
  SCROLL_TO_START: 'scroll',
  CLICK_TO_START: 'click'
}

const MOUSE_LEAVE_ACTIONS = {
  RESET_ZOOM: 'resetZoom'
}

const ORIENTATIONS = {
  X: 'x-axis',
  Y: 'y-axis',
  CENTER: 'center'
}

const AUTOPLAY_BEHAVIOR = {
  SPIN_X: 'spin-x',
  SPIN_Y: 'spin-y',
  SPIN_XY: 'spin-xy',
  SPIN_YX: 'spin-yx'
}

const ORGINAL_SIZE_REGEX = /width=\d+|w=\d+|h=\d+|&width=\d+|&w=\d+|&h=\d+|func=\w+|\?$/g
const AND_SYMBOL_REGEX = /\?&/g

export { 
  TO_START_POINTER_ZOOM,
  MOUSE_LEAVE_ACTIONS,
  ORIENTATIONS,
  AUTOPLAY_BEHAVIOR,
  ORGINAL_SIZE_REGEX,
  AND_SYMBOL_REGEX
}