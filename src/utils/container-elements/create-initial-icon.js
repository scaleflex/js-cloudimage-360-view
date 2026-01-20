export const createInitialIcon = (logoSrc) => {
  const view360Icon = document.createElement('div');

  view360Icon.className = 'cloudimage-initial-icon';

  if (logoSrc) {
    view360Icon.style.background = `rgba(255,255,255,0.8) url('${logoSrc}') 50% 50% / contain no-repeat`;
  } else {
    view360Icon.innerText = '360°';
  }

  return view360Icon;
};
