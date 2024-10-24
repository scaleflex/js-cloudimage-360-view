export const loadImages = ({
  imagesUrls,
  onFirstImageLoad,
  onImageLoad,
  onAllImagesLoad,
  autoplayReverse,
}) => {
  let loadedCount = 0;
  const totalImages = imagesUrls.length;
  const loadedImages = [];

  const loadImage = (url, index) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onload = async () => {
      const bitmapImage = await createImageBitmap(img);

      const imageData = {
        src: url,
        bitmapImage,
        naturalWidth: firstImg.naturalWidth,
        naturalHeight: firstImg.naturalHeight,
      };

      loadedCount++;
      loadedImages[index] = imageData;

      onImageLoad?.(imageData, index);

      if (loadedCount === totalImages) {
        onAllImagesLoad?.(loadedImages);
      }
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${url}`);
      loadedCount++;

      if (loadedCount === totalImages) {
        onAllImagesLoad?.(loadedImages);
      }
    };
  };

  const firstImg = new Image();
  const src = imagesUrls[autoplayReverse ? imagesUrls.length - 1 : 0];
  firstImg.crossOrigin = 'anonymous';
  firstImg.src = src;
  firstImg.onload = async () => {
    const bitmapImage = await createImageBitmap(firstImg);

    const imageData = {
      src,
      bitmapImage,
      naturalWidth: firstImg.naturalWidth,
      naturalHeight: firstImg.naturalHeight,
    };

    loadedImages[0] = imageData;
    loadedCount++;

    onFirstImageLoad?.(imageData);
    onImageLoad?.(imageData, 0);

    for (let i = 1; i < imagesUrls.length; i++) {
      loadImage(imagesUrls[i], i);
    }
  };

  firstImg.onerror = () => {
    console.error(`Failed to load first image: ${imagesUrls[0]}`);
    loadedCount++;

    for (let i = 1; i < imagesUrls.length; i++) {
      loadImage(imagesUrls[i], i);
    }
  };
};

export default loadImages;
