import { ORIENTATIONS } from './constants';

const adaptOrientation = (orientation) => (orientation === 'x' ? ORIENTATIONS.X : ORIENTATIONS.Y);

export const findHotspotsForFrame = (hotspots, currentFrame, orientation) => {
  return hotspots.filter(
    (hotspot) => adaptOrientation(hotspot.orientation) === orientation && currentFrame in hotspot.positions
  );
};

export const createHotspotElement = (id) => {
  const hotspotElement = document.createElement('span');
  hotspotElement.id = id;
  hotspotElement.className = 'cloudimage-360-hotspot';
  hotspotElement.dataset.hotspotId = id;

  hotspotElement.onclick = (event) => {
    event.stopPropagation();
  };

  return hotspotElement;
};

export const getLastValidPosition = (positions, activeIndex) => {
  let lastValidPosition = null;

  for (let i = activeIndex; i > 0; i--) {
    if (positions[i]) {
      lastValidPosition = positions[i];
      break;
    }
  }
  return lastValidPosition;
};

export const createPopperModifiers = (container) => [
  {
    name: 'offset',
    options: {
      offset: [5, 5],
    },
  },
  {
    name: 'preventOverflow',
    options: {
      boundary: container,
    },
  },
];

export const createPopperElement = (content, id) => {
  const popper = document.createElement('div');
  popper.className = 'cloudimage-360-popper';
  popper.id = id;
  popper.dataset.popperId = id;

  if (typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content)) {
    popper.innerHTML = content;
  } else {
    popper.textContent = content;
  }

  document.body.appendChild(popper);
  return popper;
};
