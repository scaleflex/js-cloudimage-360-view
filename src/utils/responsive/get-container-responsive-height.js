export const getContainerResponsiveHeight = (container, width, containerHeight) => {
  if (containerHeight) {
    if (width < containerHeight) {
      return width;
    }

    return containerHeight;
  }

  return container.offsetWidth;
};
