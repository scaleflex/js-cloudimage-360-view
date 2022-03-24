export const createCarouselImage = (image, imageIndex) => {
  const carouselImage = document.createElement('img');
  carouselImage.className = 'cloudimage-360-carousel-image';

  carouselImage.setAttribute('src', image.src || '');
  carouselImage.setAttribute('alt', image.alt || 'more-info');

  if (!imageIndex) {
    carouselImage.setAttribute('data-active-image', '');
    carouselImage.className += ' active-image';
  }

  return carouselImage;
};
