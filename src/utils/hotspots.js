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

  return hotspotElement;
};

export const fillEmptyPositions = (positions) => {
  const sortedEntries = Object.entries(positions).sort(([keyA], [keyB]) => Number(keyA) - Number(keyB));

  let lastValidX = null;
  let lastValidY = null;

  const updatedPositions = {};

  for (const [key, pos] of sortedEntries) {
    if (!pos) {
      updatedPositions[key] = { x: lastValidX, y: lastValidY };
    } else {
      const { x, y } = pos;

      if (x !== null && x !== undefined) {
        lastValidX = x;
      }

      if (y !== null && y !== undefined) {
        lastValidY = y;
      }

      updatedPositions[key] = {
        x: x || lastValidX,
        y: y || lastValidY,
      };
    }
  }

  return updatedPositions;
};

export const createPopperModifiers = (container) => [
  {
    name: 'offset',
    options: {
      offset: [0, 10],
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
  popper.id = `cloudimage-360-popper-${id}`;
  popper.dataset.popperId = id;

  if (typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content)) {
    popper.innerHTML = content;
  } else {
    popper.textContent = content;
  }

  document.body.appendChild(popper);
  return popper;
};

export const adaptHotspotConfig = (hotspotsConfig) => {
  const updatedHotspotConfig = [...hotspotsConfig];

  updatedHotspotConfig.forEach((hotspot, index) => {
    const updatedPositions = { ...fillEmptyPositions(hotspot.positions) };
    updatedHotspotConfig[index].initialPositions = updatedPositions;
    updatedHotspotConfig[index].positions = updatedPositions;
  });

  return updatedHotspotConfig;
};

export const calculateHotspotPositions = ({
  newWidth,
  newHeight,
  initialContainerSize,
  imageAspectRatio,
  hotspotsConfig,
}) => {
  const [initialWidth, initialHeight] = initialContainerSize;
  let width = newWidth;
  let height = newHeight;
  let offsetX = 0;
  let offsetY = 0;
  const containerAspectRatio = newWidth / newHeight;
  const wideContainer = imageAspectRatio > containerAspectRatio;

  if (wideContainer) {
    height = newWidth / imageAspectRatio;
    offsetY = (newHeight - height) / 2;
  } else {
    width = newHeight * imageAspectRatio;
    offsetX = (newWidth - width) / 2;
  }

  const widthRatio = width / initialWidth;
  const heightRatio = height / initialHeight;

  return hotspotsConfig.map((hotspot) => {
    const updatedPositions = {};

    Object.entries(hotspot.initialPositions).forEach(([key, initialPosition]) => {
      updatedPositions[key] = {
        x: initialPosition.x * widthRatio + offsetX,
        y: initialPosition.y * heightRatio + offsetY,
      };
    });

    return { ...hotspot, positions: updatedPositions };
  });
};
