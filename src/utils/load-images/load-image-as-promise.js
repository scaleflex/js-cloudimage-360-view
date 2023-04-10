export const loadImageAsPromise = (src, cb) => {
  const image = new Image();
  image.src = src;

  const onImageLoad = () => cb(image);

  image.onload = onImageLoad
  image.onerror = onImageLoad
};
