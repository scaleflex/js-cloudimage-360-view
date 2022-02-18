import { setCurrentSlide } from '../set-current-slide';

export const createCarouselDot = (image, imageIndex, popup) => {
  const imageDot = document.createElement('button');

  imageDot.className = 'cloudimage-360-carousel-dot';
  imageDot.onclick = () => setCurrentSlide(image, imageDot, popup);

  if (!imageIndex) {
    imageDot.className += ' active-dot';
    imageDot.setAttribute('data-active-dot', '');
  }

  return imageDot;
};
