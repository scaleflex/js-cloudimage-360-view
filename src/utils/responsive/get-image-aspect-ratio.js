export const getImageAspectRatio = (image, providedRatio) => {
  try {
    let imageAspectRatio = image.width / image.height;

    if (typeof providedRatio === 'number') {
      imageAspectRatio = providedRatio;
    }

    if (providedRatio && typeof providedRatio === 'object') {
      const mediaQueries = Object.keys(providedRatio)
        .sort((a, b) => a - b);

      const activeMedia = mediaQueries.find((mediaQuery) => (
        window.innerWidth <= parseInt(mediaQuery, 10)
      ));

      if (activeMedia) {
        imageAspectRatio = providedRatio[activeMedia];
      }
    }

    return imageAspectRatio;
  } catch {
    return 1;
  }
}