export const create360ViewCircleIcon = (circleOffset) => {
  const view360CircleIcon = new Image();

  view360CircleIcon.src = 'https://scaleflex.ultrafast.io/https://scaleflex.api.airstore.io/v1/get/_/2236d56f-914a-5a8b-a3ae-f7bde1c50000/360.svg';

  view360CircleIcon.style.bottom = `${circleOffset}%`;
  view360CircleIcon.className = 'cloudimage-360-view-360-circle';

  return view360CircleIcon;
};
