export const createCanvas = (innerBox, event) => {
  const { width, height } = event;
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  canvas.style.width = '100%';
  canvas.style.height = 'auto';

  innerBox.appendChild(canvas);

  return canvas;
};
