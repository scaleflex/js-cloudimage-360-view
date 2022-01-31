import { createImagesCarousel } from './create-images-carousel';
import { createModalDescription } from './create-modal-description';
import { createModalTitle } from './create-modal-title';

export const createModalElements = (variant, container, popup) => {
  const { images, title, description } = variant;

  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'cloudimage-360-modal-wrapper';

  if (images) {
    const imagesCarouselWrapper = document.createElement('div');
    const [imagesCarousel, carouselDots] = createImagesCarousel(images, popup, container);

    imagesCarouselWrapper.appendChild(imagesCarousel);
    imagesCarouselWrapper.appendChild(carouselDots);

    modalWrapper.appendChild(imagesCarouselWrapper);
    imagesCarouselWrapper.className = 'cloudimage-360-images-carousel-wrapper';
  }

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
