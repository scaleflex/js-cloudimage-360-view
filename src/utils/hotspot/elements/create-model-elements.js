import { createImagesCarousel } from './create-images-carousel';
import { createModalDescription } from './create-modal-description';
import { createModalTitle } from './create-modal-title';

export const createModalElements = (variant, container, popup) => {
  const { images, title, description } = variant;

  const imagesCarouselWrapper = document.createElement('div');
  const modalWrapper = document.createElement('div');

  const [imagesCarousel, carouselDots] = createImagesCarousel(images, popup, container);

  modalWrapper.className = 'cloudimage-360-modal-wrapper';
  imagesCarouselWrapper.className = 'cloudimage-360-images-carousel-wrapper';

  imagesCarouselWrapper.appendChild(imagesCarousel);
  imagesCarouselWrapper.appendChild(carouselDots);

  modalWrapper.appendChild(imagesCarouselWrapper);

  if (title) {
    const modalTitle = createModalTitle(title);

    modalWrapper.appendChild(modalTitle);
  }

  if (description) {
    const modalDescription = createModalDescription(description);

    modalWrapper.appendChild(modalDescription);
  }

  popup.appendChild(modalWrapper);
};
