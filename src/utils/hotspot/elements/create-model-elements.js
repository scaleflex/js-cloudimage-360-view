import { createImagesCarousel } from './create-images-carousel';
import { createModalDescription } from './create-modal-description';
import { createModalTitle } from './create-modal-title';
import { createReadMoreBtn } from './create-read-more-btn';

export const createModalElements = (variant, container, popup) => {
  const {
    images,
    title,
    description,
    moreDetailsUrl,
    moreDetailsTitle = 'Read more'
  } = variant;

  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'cloudimage-360-modal-wrapper';

  if (images) {
    const imagesCarouselWrapper = document.createElement('div');
    const [imagesCarousel, carouselDots] = createImagesCarousel(images, popup, container);

    imagesCarouselWrapper.appendChild(imagesCarousel);

    if (images.length > 1) {
      imagesCarouselWrapper.appendChild(carouselDots);
    }

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

  if (moreDetailsUrl) {
    const readMoreBtn = createReadMoreBtn(moreDetailsUrl, moreDetailsTitle);

    modalWrapper.appendChild(readMoreBtn);
  }

  popup.appendChild(modalWrapper);
};
