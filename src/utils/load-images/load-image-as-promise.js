export const loadImageAsPromise = async (src, index, cb) => {
  const image = new Image();

  image.src = src;

  return new Promise((reslove) => {
    image.onload = () => {
      reslove(image);

      if (cb) {
        cb(image, index);
      }
    };

    image.onerror = () => {
      reslove(image);

      if (cb) {
        cb(image, index);
      }
    };
  });
};
