export const createLoader = (innerBox) => {
  const loader = document.createElement('div');
  loader.className = 'cloudimage-initial-icon';

  // Percentage text element
  const percentageText = document.createElement('span');
  percentageText.className = 'percentage';
  percentageText.innerText = '0%';

  loader.appendChild(percentageText);
  innerBox.appendChild(loader);

  return loader;
};
