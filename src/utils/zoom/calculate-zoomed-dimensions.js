export const calculateZoomedDimensions = (drawWidth, drawHeight, zoomScale) => {
  const zoomedWidth = drawWidth / zoomScale;
  const zoomedHeight = drawHeight / zoomScale;
  return { zoomedWidth, zoomedHeight };
};
