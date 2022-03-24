import { createCarouselDot } from './create-carousel-dot';
import { createCarouselImage } from './create-carousel-image';

export const createImagesCarousel = (images, popup, container) => {
  const imagesCarousel = document.createElement('div');
  const carouselDots = document.createElement('div');

  imagesCarousel.className = 'cloudimage-360-images-carousel';
  imagesCarousel.style.maxWidth = `${container.offsetWidth}px`;

  carouselDots.className = 'cloudimage-360-carousel-dots';

  images.forEach((image, imageIndex) => {
    const carouselImage = createCarouselImage(image, imageIndex);
    const carouselDot = createCarouselDot(carouselImage, imageIndex, popup);

    carouselDots.appendChild(carouselDot);
    imagesCarousel.appendChild(carouselImage);
  });


  return [imagesCarousel, carouselDots];
};
