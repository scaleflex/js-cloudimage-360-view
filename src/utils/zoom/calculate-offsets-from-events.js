export const calculateOffsetFromEvent = (event, canvas, devicePixelRatio) => {
  const { clientX, clientY } = event;
  const canvasRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / (canvasRect.width * devicePixelRatio);
  const scaleY = canvas.height / (canvasRect.height * devicePixelRatio);

  const offsetX = (clientX - canvasRect.left) * scaleX;
  const offsetY = (clientY - canvasRect.top) * scaleY;

  return { offsetX, offsetY };
};
