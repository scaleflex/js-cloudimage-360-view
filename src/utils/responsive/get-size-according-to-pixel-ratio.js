const getSizeAccordingToPixelRatio = (size = 1) => {
  const pixelRatio = Math.round(window.devicePixelRatio || 1);
  return parseInt(size) * pixelRatio;
};

export default getSizeAccordingToPixelRatio;
