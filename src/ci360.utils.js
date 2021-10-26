import { AUTOPLAY_BEHAVIOR, TO_START_POINTER_ZOOM } from './ci360.constants';
//TODO [deprecated]: remove filename, amount in the upcoming versions
const get360ViewProps = (image) => ({
  folder: attr(image, 'folder') || attr(image, 'data-folder') || '/',
  filenameX: attr(image, 'filename') || attr(image, 'data-filename') 
  || attr(image, 'filename-x') || attr(image, 'data-filename-x') 
  || 'image-{index}.jpg',
  filenameY: attr(image, 'filename-y') ||
  attr(image, 'data-filename-y') || 'image-y-{index}.jpg',
  imageList: attr(image, 'image-list') || attr(image, 'data-image-list') || null,
  indexZeroBase: parseInt(attr(image, 'index-zero-base') || attr(image, 'data-index-zero-base') || 0, 10),
  amountX: parseInt(attr(image, 'amount') || attr(image, 'data-amount') 
  || attr(image, 'amount-x')  || attr(image, 'data-amount-x') 
  || 36, 10),
  amountY: parseInt(attr(image, 'amount-y') ||
  attr(image, 'data-amount-y') || 0, 10),
  imageOffset: parseInt(attr(image, 'image-offset') || attr(image, 'data-image-offset')),
  speed: parseInt(attr(image, 'speed') || attr(image, 'data-speed') || 80, 10),
  dragSpeed: parseInt(attr(image, 'drag-speed') || attr(image, 'data-drag-speed') || 150, 10),
  keys: isTrue(image, 'keys'),
  boxShadow: attr(image, 'box-shadow') || attr(image, 'data-box-shadow'),
  autoplay: isTrue(image, 'autoplay'),
  autoplayBehavior: attr(image, 'autoplay-behavior')
  || attr(image, 'data-autoplay-behavior') 
  || AUTOPLAY_BEHAVIOR.SPIN_X,
  playOnce: isTrue(image, 'play-once'),
  disablePointerZoom: isTrue(image, 'disable-pointer-zoom'),
  disablePinchZoom: isTrue(image, 'disable-pinch-zoom'),
  onMouseLeave: attr(image, 'on-mouse-leave')
    || attr(image, 'data-on-mouse-leave'),
  toStartPointerZoom: attr(image, 'to-start-pointer-zoom')
    || attr(image, 'data-to-start-pointer-zoom') 
    || TO_START_POINTER_ZOOM.SCROLL_TO_START,
  pointerZoomFactor: parseInt(
    attr(image, 'pointer-zoom-factor')
    || attr(image, 'data-pointer-zoom-factor') 
    || 2, 10),
  pinchZoomFactor: parseInt(
    attr(image, 'pinch-zoom-factor') 
    || attr(image, 'data-pinch-zoom-factor') 
    || 2, 10),
  maxScale: parseFloat(
    attr(image, 'max-scale') 
    || attr(image, 'data-max-scale') 
    || 100, 10),
  autoplayReverse: isTrue(image, 'autoplay-reverse'),
  bottomCircle: isTrue(image, 'bottom-circle'),
  disableDrag: isTrue(image, 'disable-drag'),
  fullscreen: isTrue(image, 'fullscreen') || isTrue(image, 'full-screen'),
  magnifier: ((attr(image, 'magnifier') !== null) || (attr(image, 'data-magnifier') !== null)) &&
    parseInt(attr(image, 'magnifier') || attr(image, 'data-magnifier'), 10),
  magnifyInFullscreen: isTrue(image, 'magnify-in-fullscreen') || isTrue(image, 'magnifier-in-fullscreen'),
  bottomCircleOffset: parseInt(attr(image, 'bottom-circle-offset') || attr(image, 'data-bottom-circle-offset') || 5, 10),
  ratio: parseFloat(attr(image, 'ratio') || attr(image, 'data-ratio') || 0) || false,
  responsive: isTrue(image, 'responsive'),
  ciToken: attr(image, 'responsive') || attr(image, 'data-responsive') || 'demo',
  ciFilters: attr(image, 'filters') 
    || attr(image, 'data-filters'),
  ciTransformation: attr(image, 'transformation') 
    || attr(image, 'data-transformation'),
  lazyload: isTrue(image, 'lazyload'),
  lazySelector: attr(image, 'lazyload-selector') || attr(image, 'data-lazyload-selector') || 'lazyload',
  spinReverse: isTrue(image, 'spin-reverse'),
  controlReverse: isTrue(image, 'control-reverse'),
  stopAtEdges: isTrue(image, 'stop-at-edges'),
  hide360Logo: isTrue(image, 'hide-360-logo'),
  logoSrc: attr(image, 'logo-src') || 'https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/360_view.svg',
});

const isTrue = (image, type) => {
  const imgProp = attr(image, type);
  const imgDataProp = attr(image, `data-${type}`);

  return (imgProp !== null && imgProp !== 'false') || (imgDataProp !== null && imgDataProp !== 'false');
};

const attr = (element, attribute) => element.getAttribute(attribute);

const setView360Icon = (view360Icon, logoSrc) => {
  view360Icon.style.background = `rgba(255,255,255,0.8) url('${logoSrc}') 50% 50% / contain no-repeat`;
}

const magnify = (container, offset = {}, src, glass, zoom) => {
  let w, h, bw;
  const {x: offsetX = 0, y: offsetY = 0} = offset;
  const backgroundSizeX = (container.offsetWidth - (offsetX * 2)) * zoom;
  const backgroundSizeY = (container.offsetHeight - (offsetY * 2)) * zoom;

  glass.setAttribute("class", "cloudimage-360-img-magnifier-glass");
  container.prepend(glass);

  glass.style.backgroundImage = "url('" + src + "')";
  glass.style.backgroundSize = `${backgroundSizeX}px ${backgroundSizeY}px`

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  glass.addEventListener("mousemove", moveMagnifier);
  container.addEventListener("mousemove", moveMagnifier);

  glass.addEventListener("touchmove", moveMagnifier, { passive: true });
  container.addEventListener("touchmove", moveMagnifier, { passive: true });

  function moveMagnifier(e) {
    let pos, x, y;

    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

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

    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";

    const backgroundPosX = (
      (x - offsetX) * zoom
    ) - w + bw;

    const backgroundPosY = (
      (y - offsetY) * zoom
    ) - h + bw;

    glass.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
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
};

const getSizeLimit = (currentSize) => {
  if (currentSize <= 25) return '25';
  if (currentSize <= 50) return '50';

  return (Math.ceil(currentSize / 100) * 100).toString();
};

const getSizeAccordingToPixelRatio = size => {
  const splittedSizes = size.toString().split('x');
  const result = [];

  [].forEach.call(splittedSizes, size => {
    result.push(size * Math.round(window.devicePixelRatio || 1));
  });

  return result.join('x');
};

const getResponsiveWidthOfContainer = width => getSizeLimit(width);

const fit = (contains) => {
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

const isTwoFingers = (event) => (
  event.targetTouches.length === 2
);

const getMaxZoomIntensity = (width, maxScale) => {
  const maxWidth = maxScale * width;
  const maxIntensity = maxWidth - width;

  return maxIntensity;
}

const normalizeZoomFactor = (event, pointerZoomFactor) => {
  const scrollEvent = Math.abs(event.deltaY);
  const zoomFactor  = scrollEvent < 125 ? 
    -pointerZoomFactor * 10 : -pointerZoomFactor ;

  return zoomFactor;
};

const contain = fit(true);

const addClass = (el, className) => {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

const removeClass = (el, className) => {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

const pad = (n, width = 0) => {
  n = n + '';

  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

const debounce = (func, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export {
  get360ViewProps,
  setView360Icon,
  magnify,
  getResponsiveWidthOfContainer,
  getSizeAccordingToPixelRatio,
  contain,
  addClass,
  removeClass,
  pad,
  isTwoFingers,
  getMaxZoomIntensity,
  normalizeZoomFactor,
  debounce
}