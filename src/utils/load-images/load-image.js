export const loadImage = (url, callback, onError) => {
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

  image.onerror = (event) => {
    const error = new Error(`Failed to load image: ${url}`);
    error.url = url;
    error.event = event;

    if (onError) {
      onError(error);
    } else {
      console.error(error.message);
    }
  };
};
