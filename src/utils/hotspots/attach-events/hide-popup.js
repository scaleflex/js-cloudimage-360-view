export const hidePopup = (popup, isVisible) => {
  if (!isVisible) {
    popup.removeAttribute('data-show');
    popup.removeAttribute('data-cloudimage-360-show');
  }
};