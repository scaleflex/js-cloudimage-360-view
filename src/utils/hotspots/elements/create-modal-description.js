export const createModalDescription = (description) => {
  const modalDescription = document.createElement('p');

  modalDescription.innerText = description;
  modalDescription.className = 'cloudimage-360-modal-description';

  return modalDescription;
};
