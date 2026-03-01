import { ORIENTATIONS } from './constants';
import { sanitizeHtml } from './sanitize-html';

const adaptOrientation = (orientation) => (orientation === 'y' ? ORIENTATIONS.Y : ORIENTATIONS.X);

export const findHotspotsForFrame = (hotspots, currentFrame, orientation) => {
  return hotspots.filter(
    (hotspot) => adaptOrientation(hotspot.orientation) === orientation && currentFrame in hotspot.positions
  );
};

export const createHotspotElement = (id, label, markerStyle) => {
  const hotspotElement = document.createElement('button');
  hotspotElement.id = id;
  hotspotElement.className = 'cloudimage-360-hotspot cloudimage-360-hotspot--pulse';
  hotspotElement.dataset.hotspotId = id;
  hotspotElement.setAttribute('type', 'button');
  hotspotElement.setAttribute('aria-label', label || `Hotspot ${id}`);
  hotspotElement.setAttribute('aria-haspopup', 'true');
  hotspotElement.setAttribute('aria-expanded', 'false');
  // aria-describedby is added dynamically when popper is shown

  if (markerStyle === 'dot-label' && label) {
    hotspotElement.classList.add('cloudimage-360-hotspot--dot-label');
    const labelSpan = document.createElement('span');
    labelSpan.className = 'cloudimage-360-hotspot-label';
    labelSpan.textContent = label;
    hotspotElement.appendChild(labelSpan);
  }

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

export const createPopperOptions = (container) => ({
  placement: 'top',
  modifiers: [
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
    {
      name: 'flip',
      options: {
        boundary: container,
        fallbackPlacements: ['bottom', 'right', 'left'],
      },
    },
  ],
});

export const createPopperElement = (content, id, parentElement) => {
  const popper = document.createElement('div');
  popper.className = 'cloudimage-360-popper';
  popper.id = `cloudimage-360-popper-${id}`;
  popper.dataset.popperId = id;
  popper.setAttribute('role', 'tooltip');
  popper.setAttribute('aria-hidden', 'false');

  if (typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content)) {
    // Sanitize HTML content to prevent XSS attacks
    popper.innerHTML = sanitizeHtml(content);
  } else {
    popper.textContent = content;
  }

  (parentElement || document.body).appendChild(popper);
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
