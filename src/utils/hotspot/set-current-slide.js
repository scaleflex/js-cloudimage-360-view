export const setCurrentSlide = (image, imageDot, popup) => {
  const activeDotSelector = '[data-active-dot]';
  const activeImageSelector = '[data-active-image]';

  const previousActiveDot = popup.querySelector(activeDotSelector);
  const previousActiveImage = popup.querySelector(activeImageSelector);

  previousActiveDot.classList.remove('active-dot');
  previousActiveDot.removeAttribute('data-active-dot');

  previousActiveImage.classList.remove('active-image');
  previousActiveImage.removeAttribute('data-active-image');

  image.className += ' active-image';
  image.setAttribute('data-active-image', '');

  imageDot.className += ' active-dot';
  imageDot.setAttribute('data-active-dot', '');
};
