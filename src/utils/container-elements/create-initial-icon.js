export const createInitialIcon = () => {
  const view360Icon = document.createElement('div');

  view360Icon.className = 'cloudimage-initial-icon';
  view360Icon.innerText = '360°';

  return view360Icon;
};
