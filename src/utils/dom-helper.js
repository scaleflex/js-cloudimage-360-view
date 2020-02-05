/**
 * @param {HTMLElement} element 
 * @param {String} attribute atribute name
 */
export const getAttr = (element, attribute) => element.getAttribute(attribute);

export const setDefault = (value, defaultValue) => {
  return value === undefined || value === null ? defaultValue : value;
}

/**
 * @param {HTMLElement} element 
 * @param {String} attribute atribute name
 */
export const isTrue = (element, attribute) => {
  const value = getAttr(element, attribute);

  if (element.hasAttribute(attribute) && (value === null || value === undefined || value === '')) {
    return true;
  }

  if (typeof value === 'string') {
    const trimmedString = value.trim();
    return trimmedString !== 'false' && trimmedString !== '';
  }

  return Boolean(value);
};

export const magnify = (container, src, glass, zoom) => {
  let w, h;

  glass.style.backgroundImage = `url("${src}")`;
  glass.style.backgroundSize = `${container.offsetWidth * zoom}px ${container.offsetHeight * zoom}px`;

  const bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  glass.addEventListener("mousemove", moveMagnifier);
  container.addEventListener("mousemove", moveMagnifier);

  glass.addEventListener("touchmove", moveMagnifier);
  container.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    e.preventDefault();

    const pos = getCursorPos(e);
    let x = pos.x;
    let y = pos.y;

    if (x > container.offsetWidth - (w / zoom)) {
      x = container.offsetWidth - (w / zoom);
    }

    if (x < w / zoom) {
      x = w / zoom;
    }

    if (y > container.offsetHeight - (h / zoom)) {
      y = container.offsetHeight - (h / zoom);
    }

    if (y < h / zoom) {
      y = h / zoom;
    }

    glass.style.left = `${x - w}px`;
    glass.style.top = `${y - h}px`;

    glass.style.backgroundPosition = `-${(x * zoom) - (w + bw)}px -${(y * zoom) - (h + bw)}px`;

  }

  function getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;
    a = container.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x, y };
  }
}

export const getClientHitPoint = ({ clientX, clientY, touches }) => {
  let point;

  if (touches != undefined) {
    point = { clientX, clientY } = event.touches[0];
  } else {
    point = { clientX, clientY };
  }

  return point;
}

/**
 * @param {HTMLElement} element 
 * @param {Number} distanceBeforeDetection  pixels
 * */
export const isAboutToEnterViewport = (element, distanceBeforeDetection = 200) => {
  const { top, left } = element.getBoundingClientRect();

  const elementTop = top - distanceBeforeDetection;
  const elementLeft = left - distanceBeforeDetection;

  const elementWidth = element.clientWidth;
  const elementHeight = element.clientHeight;

  const documentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const documentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (
    (elementTop < documentHeight &&
      elementTop + elementHeight > 0) &&
    (elementLeft < documentWidth &&
      elementLeft + elementWidth > 0)
  );
};

/** @param {HTMLElement} element */
export const isInViewport = (element) => {
  const clientRect = element.getBoundingClientRect();

  return (
    clientRect.top >= 0 &&
    clientRect.left >= 0 &&
    clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    clientRect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export const fit = (contains) => {
  return (parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) => {
    const childRatio = childWidth / childHeight
    const parentRatio = parentWidth / parentHeight
    let width = parentWidth * scale
    let height = parentHeight * scale

    if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
      height = width / childRatio
    } else {
      width = height * childRatio
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY
    }
  }
};

export const contain = fit(true);

export const getSizeLimit = (currentSize) => {
  if (currentSize <= 25) return '25';
  if (currentSize <= 50) return '50';

  return (Math.ceil(currentSize / 100) * 100).toString();
};

export const getSizeAccordingToPixelRatio = size => {
  const splittedSizes = size.toString().split('x');
  const result = [];

  [].forEach.call(splittedSizes, size => {
    result.push(size * Math.round(window.devicePixelRatio || 1));
  });

  return result.join('x');
};

export const getResponsiveWidthOfContainer = width => getSizeLimit(width);