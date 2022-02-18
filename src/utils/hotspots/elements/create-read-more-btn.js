export const createReadMoreBtn = (moreDetailsUrl, moreDetailsTitle) => {
  const readMoreBtn = document.createElement('a');

  readMoreBtn.href = moreDetailsUrl;
  readMoreBtn.innerText = moreDetailsTitle;

  readMoreBtn.className = 'cloudimage-360-modal-more-details';
  readMoreBtn.target = '_blank';

  return readMoreBtn;
}