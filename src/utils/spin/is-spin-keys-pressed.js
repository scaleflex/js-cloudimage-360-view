import { LEFT_RIGHT_KEYS, UP_DOWN_KEYS } from '../constants';

export const isSpinKeysPressed = (keyCode, allowSpinY) => {
  const keys = [...LEFT_RIGHT_KEYS];

  if (allowSpinY) {
    return [...keys, ...UP_DOWN_KEYS].includes(keyCode);
  }

  return keys.includes(keyCode);
};
