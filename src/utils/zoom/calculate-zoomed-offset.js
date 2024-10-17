export const calculateZoomOffsets = ({
  pointerX,
  pointerY,
  image,
  zoomedWidth,
  zoomedHeight,
  drawWidth,
  drawHeight,
}) => {
  let zoomOffsetX = (pointerX / drawWidth) * image.naturalWidth - zoomedWidth / 2;
  let zoomOffsetY = (pointerY / drawHeight) * image.naturalHeight - zoomedHeight / 2;

  // Calculate max offset values
  const maxOffsetX = Math.max(0, image.naturalWidth - zoomedWidth);
  const maxOffsetY = Math.max(0, image.naturalHeight - zoomedHeight);

  // Clamp zoom offsets to the valid range
  zoomOffsetX = Math.max(0, Math.min(zoomOffsetX, maxOffsetX));
  zoomOffsetY = Math.max(0, Math.min(zoomOffsetY, maxOffsetY));

  return { zoomOffsetX, zoomOffsetY };
};
