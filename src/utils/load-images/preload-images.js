import { ORIENTATIONS } from '../constants';
import { generateImagesCdnLinks } from './generate-images-cdn-links';
import { loadImages } from './load-images';

export const preloadImages = ({
  cdnPathX,
  cdnPathY,
  configX,
  configY,
  onFirstImageLoad,
  onImageLoad,
  onAllImagesLoad,
  onError,
}) => {
  let allImagesLoaded = { x: false, y: false };
  let loadedImagesX = [];
  let loadedImagesY = [];
  let loadStatsX = { errorCount: 0, errors: [] };
  let loadStatsY = { errorCount: 0, errors: [] };
  const loadX = cdnPathX || configX.imageList.length;
  const loadY = cdnPathY || configY.imageList.length;

  const handleAllImagesLoaded = () => {
    if (allImagesLoaded.x && allImagesLoaded.y) {
      const combinedStats = {
        errorCount: loadStatsX.errorCount + loadStatsY.errorCount,
        errors: [...loadStatsX.errors, ...loadStatsY.errors],
      };
      onAllImagesLoad?.(loadedImagesX, loadedImagesY, combinedStats);
    }
  };

  const loadOrientationImages = ({ cdnPath, config, orientation, loadedImages, loadStats, onFirstImageLoad }) => {
    const xOrientation = orientation === ORIENTATIONS.X;
    const imageList = config.imageList.length ? config.imageList : generateImagesCdnLinks(cdnPath, config);

    loadImages({
      imagesUrls: imageList,
      onFirstImageLoad,
      onImageLoad: (imageData, index) => {
        onImageLoad?.(imageData, index, orientation);
        loadedImages[index] = imageData;
      },
      onError: (errorInfo) => {
        onError?.({ ...errorInfo, orientation });
      },
      onAllImagesLoad: (loadedImagesResult, stats) => {
        loadedImages.length = 0;
        loadedImagesResult.forEach((img, i) => {
          if (img) loadedImages[i] = img;
        });
        loadStats.errorCount = stats.errorCount;
        loadStats.errors = stats.errors.map((e) => ({ ...e, orientation }));
        allImagesLoaded[xOrientation ? 'x' : 'y'] = true;
        handleAllImagesLoaded();
      },
      autoplayReverse: config.autoplayReverse,
    });
  };

  if (loadX) {
    loadOrientationImages({
      cdnPath: cdnPathX,
      config: configX,
      orientation: ORIENTATIONS.X,
      loadedImages: loadedImagesX,
      loadStats: loadStatsX,
      onFirstImageLoad,
    });
  } else {
    allImagesLoaded.x = true;
  }

  if (loadY) {
    loadOrientationImages({
      cdnPath: cdnPathY,
      config: configY,
      orientation: ORIENTATIONS.Y,
      loadedImages: loadedImagesY,
      loadStats: loadStatsY,
      onFirstImageLoad: !loadX ? onFirstImageLoad : undefined,
    });
  } else {
    allImagesLoaded.y = true;
  }

  // Handle edge case where neither X nor Y images need loading
  if (!loadX && !loadY) {
    handleAllImagesLoaded();
  }
};
