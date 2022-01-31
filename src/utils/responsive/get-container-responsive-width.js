export const getContainerResponsiveWidth = (parentEl, containerWidth) => {
  if (containerWidth) {
    if (parentEl.offsetWidth < containerWidth) {
      return parentEl.offsetWidth;
    }

    return containerWidth;
  }

  return parentEl.offsetWidth;
};
