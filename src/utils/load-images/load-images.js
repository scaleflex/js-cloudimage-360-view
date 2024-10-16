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
    img.src = url;

    img.onload = () => {
      loadedCount++;
      loadedImages[index] = img;
      onImageLoad?.(img, index);

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
  firstImg.src = imagesUrls[autoplayReverse ? imagesUrls.length - 1 : 0];
  firstImg.onload = () => {
    loadedImages[0] = firstImg;
    loadedCount++;
    onFirstImageLoad?.(firstImg);
    onImageLoad?.(firstImg, 0);

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
