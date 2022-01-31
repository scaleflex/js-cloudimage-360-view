export const createCarouselImage = (imageSrc, imageIndex) => {
  const carouselImage = document.createElement('img');
  carouselImage.className = 'cloudimage-360-carousel-image';

  carouselImage.setAttribute('src', imageSrc);

  if (!imageIndex) {
    carouselImage.setAttribute('data-active-image', '');
    carouselImage.className += ' active-image';
  }

  return carouselImage;
};
