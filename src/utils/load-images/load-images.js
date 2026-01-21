export const loadImages = ({
  imagesUrls,
  onFirstImageLoad,
  onImageLoad,
  onAllImagesLoad,
  onError,
  autoplayReverse,
}) => {
  let loadedCount = 0;
  let errorCount = 0;
  const totalImages = imagesUrls.length;
  const loadedImages = [];
  const errors = [];

  const handleError = (url, index, isFirstImage = false) => {
    const error = {
      message: `Failed to load image: ${url}`,
      url,
      index,
      isFirstImage,
    };
    errors.push(error);
    errorCount++;

    onError?.({
      error,
      errorCount,
      totalImages,
      errors,
    });
  };

  const checkAllLoaded = () => {
    if (loadedCount === totalImages) {
      onAllImagesLoad?.(loadedImages, { errorCount, errors });
    }
  };

  const loadImage = (url, index) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onload = async () => {
      try {
        const bitmapImage = await createImageBitmap(img);

        const imageData = {
          src: url,
          bitmapImage,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        };

        loadedCount++;
        loadedImages[index] = imageData;

        onImageLoad?.(imageData, index);
        checkAllLoaded();
      } catch (err) {
        loadedCount++;
        handleError(url, index);
        checkAllLoaded();
      }
    };

    img.onerror = () => {
      loadedCount++;
      handleError(url, index);
      checkAllLoaded();
    };
  };

  const firstImg = new Image();
  const firstIndex = autoplayReverse ? imagesUrls.length - 1 : 0;
  const src = imagesUrls[firstIndex];
  firstImg.crossOrigin = 'anonymous';
  firstImg.src = src;

  firstImg.onload = async () => {
    try {
      const bitmapImage = await createImageBitmap(firstImg);

      const imageData = {
        src,
        bitmapImage,
        naturalWidth: firstImg.naturalWidth,
        naturalHeight: firstImg.naturalHeight,
      };

      loadedImages[firstIndex] = imageData;
      loadedCount++;

      onFirstImageLoad?.(imageData);
      onImageLoad?.(imageData, firstIndex);

      // Load remaining images
      for (let i = 0; i < imagesUrls.length; i++) {
        if (i !== firstIndex) {
          loadImage(imagesUrls[i], i);
        }
      }

      // Check if this was the only image
      checkAllLoaded();
    } catch (err) {
      loadedCount++;
      handleError(src, firstIndex, true);

      // Still try to load other images
      for (let i = 0; i < imagesUrls.length; i++) {
        if (i !== firstIndex) {
          loadImage(imagesUrls[i], i);
        }
      }

      checkAllLoaded();
    }
  };

  firstImg.onerror = () => {
    loadedCount++;
    handleError(src, firstIndex, true);

    // Still try to load other images
    for (let i = 0; i < imagesUrls.length; i++) {
      if (i !== firstIndex) {
        loadImage(imagesUrls[i], i);
      }
    }

    checkAllLoaded();
  };
};

export default loadImages;
