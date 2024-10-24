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
}) => {
  let allImagesLoaded = { x: false, y: false };
  let loadedImagesX = [];
  let loadedImagesY = [];
  const loadX = cdnPathX || configX.imageList.length;
  const loadY = cdnPathY || configY.imageList.length;

  const handleAllImagesLoaded = () => {
    if (allImagesLoaded.x && allImagesLoaded.y) {
      onAllImagesLoad(loadedImagesX, loadedImagesY);
    }
  };

  const loadOrientationImages = ({ cdnPath, config, orientation, loadedImages, onFirstImageLoad }) => {
    const xOrientation = orientation === ORIENTATIONS.X;
    const imageList = config.imageList.length ? config.imageList : generateImagesCdnLinks(cdnPath, config);

    loadImages({
      imagesUrls: imageList,
      onFirstImageLoad,
      onImageLoad: (imageData, index) => {
        onImageLoad?.(imageData, index, orientation);
        loadedImages[index] = imageData;
      },
      onAllImagesLoad: (loadedImagesResult) => {
        loadedImages = loadedImagesResult;
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
      onFirstImageLoad: !loadX ? onFirstImageLoad : undefined,
    });
  } else {
    allImagesLoaded.y = true;
  }
};
