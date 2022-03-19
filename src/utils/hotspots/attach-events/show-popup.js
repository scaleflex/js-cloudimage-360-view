export const showPopup = (popup, popperInstance) => {
  popup.setAttribute('data-show', '');
  popup.setAttribute('data-cloudimage-360-show', '');

  popperInstance.update();
}