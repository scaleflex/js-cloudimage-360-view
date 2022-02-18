export const createModalTitle = (title) => {
  const modalTitle = document.createElement('h4');

  modalTitle.innerText = title;
  modalTitle.className = 'cloudimage-360-modal-title';

  return modalTitle;
};
