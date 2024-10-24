export const calculateZoomOffsets = ({
  pointerX,
  pointerY,
  imageData,
  zoomedWidth,
  zoomedHeight,
  drawWidth,
  drawHeight,
}) => {
  const { naturalWidth, naturalHeight } = imageData;
  let zoomOffsetX = (pointerX / drawWidth) * naturalWidth - zoomedWidth / 2;
  let zoomOffsetY = (pointerY / drawHeight) * naturalHeight - zoomedHeight / 2;

  // Calculate max offset values
  const maxOffsetX = Math.max(0, naturalWidth - zoomedWidth);
  const maxOffsetY = Math.max(0, naturalHeight - zoomedHeight);

  // Clamp zoom offsets to the valid range
  zoomOffsetX = Math.max(0, Math.min(zoomOffsetX, maxOffsetX));
  zoomOffsetY = Math.max(0, Math.min(zoomOffsetY, maxOffsetY));

  return { zoomOffsetX, zoomOffsetY };
};
