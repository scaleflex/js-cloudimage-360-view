// Detect mobile for concurrency limits
const isMobile = typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Limit concurrent image loads to prevent memory spikes
// Mobile: 3 concurrent (critical for Safari memory limits)
// Desktop: 6 concurrent
const MAX_CONCURRENT_LOADS = isMobile ? 3 : 6;

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

  // Queue management for controlled concurrency
  let activeLoads = 0;
  let nextIndexToLoad = 0;
  const indicesToLoad = [];

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

  // Process next image in queue
  const loadNextInQueue = () => {
    while (activeLoads < MAX_CONCURRENT_LOADS && nextIndexToLoad < indicesToLoad.length) {
      const index = indicesToLoad[nextIndexToLoad];
      nextIndexToLoad++;
      loadImageWithConcurrency(imagesUrls[index], index);
    }
  };

  const loadImageWithConcurrency = (url, index) => {
    activeLoads++;
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

        // Clean up Image element to help garbage collection on mobile
        img.onload = null;
        img.onerror = null;
        img.src = '';

        loadedCount++;
        activeLoads--;
        loadedImages[index] = imageData;

        onImageLoad?.(imageData, index);
        checkAllLoaded();

        // Load next image in queue
        loadNextInQueue();
      } catch (err) {
        img.onload = null;
        img.onerror = null;
        img.src = '';
        loadedCount++;
        activeLoads--;
        handleError(url, index);
        checkAllLoaded();
        loadNextInQueue();
      }
    };

    img.onerror = () => {
      img.onload = null;
      img.onerror = null;
      img.src = '';
      loadedCount++;
      activeLoads--;
      handleError(url, index);
      checkAllLoaded();
      loadNextInQueue();
    };
  };

  // Build queue of indices to load (excluding first image)
  const startLoadingRemaining = (firstIndex) => {
    for (let i = 0; i < imagesUrls.length; i++) {
      if (i !== firstIndex) {
        indicesToLoad.push(i);
      }
    }
    nextIndexToLoad = 0;
    loadNextInQueue();
  };

  // Load first image immediately (for fast initial render)
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

      // Clean up Image element
      firstImg.onload = null;
      firstImg.onerror = null;
      firstImg.src = '';

      loadedImages[firstIndex] = imageData;
      loadedCount++;

      onFirstImageLoad?.(imageData);
      onImageLoad?.(imageData, firstIndex);

      // Check if this was the only image
      if (totalImages === 1) {
        checkAllLoaded();
      } else {
        // Load remaining images with concurrency limit
        startLoadingRemaining(firstIndex);
      }
    } catch (err) {
      firstImg.onload = null;
      firstImg.onerror = null;
      firstImg.src = '';
      loadedCount++;
      handleError(src, firstIndex, true);

      if (totalImages === 1) {
        checkAllLoaded();
      } else {
        startLoadingRemaining(firstIndex);
      }
    }
  };

  firstImg.onerror = () => {
    firstImg.onload = null;
    firstImg.onerror = null;
    firstImg.src = '';
    loadedCount++;
    handleError(src, firstIndex, true);

    if (totalImages === 1) {
      checkAllLoaded();
    } else {
      startLoadingRemaining(firstIndex);
    }
  };
};

export default loadImages;
