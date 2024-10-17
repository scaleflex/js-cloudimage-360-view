export const createTransitionOverlay = () => {
  const transitionOverlay = document.createElement('div');

  transitionOverlay.className = 'cloudimage-transition-overlay';

  return transitionOverlay;
};
