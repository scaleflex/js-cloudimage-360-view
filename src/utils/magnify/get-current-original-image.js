import { ORIENTATIONS } from '../../constants/orientations';
import { AND_SYMBOL_REGEX, ORGINAL_SIZE_REGEX } from '../../constants/regex';

export const getCurrentOriginalImage = (movingDirection, imagesX, imagesY, activeImageX, activeImageY) => {
  const currentImage = new Image();

  const originalImagesXSrcs = imagesX.map((image) => image.src
    .replace(ORGINAL_SIZE_REGEX, '')
    .replace(AND_SYMBOL_REGEX, '?'));

  const originalImagesYSrcs = imagesY.map((image) => image.src
    .replace(ORGINAL_SIZE_REGEX, '')
    .replace(AND_SYMBOL_REGEX, '?'));

  currentImage.src = originalImagesXSrcs[activeImageX - 1];

  if (movingDirection === ORIENTATIONS.Y) {
    currentImage.src = originalImagesYSrcs[activeImageY - 1];
  }

  return currentImage;
};
