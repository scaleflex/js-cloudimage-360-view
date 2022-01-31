export const createLoader = (innerBox) => {
  const loader = document.createElement('div');
  loader.className = 'cloudimage-360-loader';

  innerBox.appendChild(loader);

  return loader;
};
