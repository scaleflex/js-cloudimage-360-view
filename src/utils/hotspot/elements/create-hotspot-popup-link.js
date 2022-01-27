export const createHotspotPopupLink = (variant) => {
  const {
    url, title, newTab,
  } = variant;

  const hyperLink = document.createElement('a');

  hyperLink.href = url;
  hyperLink.innerText = title;

  if (newTab) {
    hyperLink.target = '_blank';
  }

  return hyperLink;
};
