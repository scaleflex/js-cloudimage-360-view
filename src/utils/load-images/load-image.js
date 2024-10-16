export const loadImage = (url, callback) => {
  const image = new Image();

  image.src = url;
  image.onload = (event) => {
    if (callback) {
      callback({
        event: event,
        width: image.width,
        height: image.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        src: url,
      });
    }
  };

  image.onerror = function () {};
};
