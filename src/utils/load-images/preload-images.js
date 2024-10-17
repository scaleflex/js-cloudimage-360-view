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
  let imagesXUrls = [];
  let imagesYUrls = [];
  let allImagesLoaded = { x: false, y: false };
  let loadedImagesX = [];
  let loadedImagesY = [];

  const handleAllImagesLoaded = () => {
    if (allImagesLoaded.x && allImagesLoaded.y) {
      onAllImagesLoad(loadedImagesX, loadedImagesY);
    }
  };

  const loadImagesForOrientation = (cdnPath, config, orientation) => {
    let imagesUrls = [];

    if (config.imageList) {
      try {
        const images = JSON.parse(config.imageList);
        // imagesUrls = prepareImagesFromList(images, config);
      } catch (error) {
        console.error(`Wrong format in image-list attribute for ${orientation}: ${error.message}`);
      }
    } else {
      imagesUrls = generateImagesCdnLinks(cdnPath, config);
    }

    return imagesUrls;
  };

  // Load X Images
  if (cdnPathX) {
    imagesXUrls = loadImagesForOrientation(cdnPathX, configX, ORIENTATIONS.X);

    loadImages({
      imagesUrls: imagesXUrls,
      onFirstImageLoad,
      onImageLoad: (img, index) => {
        onImageLoad?.(img, index, ORIENTATIONS.X);
        loadedImagesX[index] = img;
      },
      onAllImagesLoad: (loadedImages) => {
        loadedImagesX = loadedImages;
        allImagesLoaded.x = true;
        handleAllImagesLoaded();
      },
      autoplayReverse: configX.autoplayReverse,
    });
  } else {
    allImagesLoaded.x = true;
  }

  // Load Y Images
  if (cdnPathY) {
    imagesYUrls = loadImagesForOrientation(cdnPathY, configY, ORIENTATIONS.Y);

    loadImages({
      imagesUrls: imagesYUrls,
      onImageLoad: (img, index) => {
        onImageLoad?.(img, index, ORIENTATIONS.Y);
        loadedImagesY[index] = img;
      },
      onAllImagesLoad: (loadedImages) => {
        loadedImagesY = loadedImages;
        allImagesLoaded.y = true;
        handleAllImagesLoaded();
      },
      autoplayReverse: configY.autoplayReverse,
    });
  } else {
    allImagesLoaded.y = true;
  }
};
