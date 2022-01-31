export const createCanvas = (innerBox) => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.fontSize = '0';
  innerBox.appendChild(canvas);

  return canvas;
};
