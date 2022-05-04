export const create360ViewCircleIcon = (circleOffset) => {
  const view360CircleIcon = new Image();

  view360CircleIcon.src = 'https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/assets/img/360.svg';

  view360CircleIcon.style.bottom = `${circleOffset}%`;
  view360CircleIcon.className = 'cloudimage-360-view-360-circle';

  return view360CircleIcon;
};
