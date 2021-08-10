const get360ViewProps = (image) => ({
  folder: attr(image, 'folder') || attr(image, 'data-folder') || '/',
  filename: attr(image, 'filename') || attr(image, 'data-filename') || 'image-{index}.jpg',
  imageList: attr(image, 'image-list') || attr(image, 'data-image-list') || null,
  indexZeroBase: parseInt(attr(image, 'index-zero-base') || attr(image, 'data-index-zero-base') || 0, 10),
  amount: parseInt(attr(image, 'amount') || attr(image, 'data-amount') || 36, 10),
  imageOffset: parseInt(attr(image, 'image-offset') || attr(image, 'data-image-offset')),
  speed: parseInt(attr(image, 'speed') || attr(image, 'data-speed') || 80, 10),
  dragSpeed: parseInt(attr(image, 'drag-speed') || attr(image, 'data-drag-speed') || 150, 10),
  keys: isTrue(image, 'keys'),
  boxShadow: attr(image, 'box-shadow') || attr(image, 'data-box-shadow'),
  autoplay: isTrue(image, 'autoplay'),
  playOnce: isTrue(image, 'playOnce'),
  scrollZoom: isTrue(image, 'scrollZoom'),
  zoomFactor: parseInt(attr(image, 'zoom-factor') || attr(image, 'data-zoom-factor') || 1, 10),
  autoplayReverse: isTrue(image, 'autoplay-reverse'),
  bottomCircle: isTrue(image, 'bottom-circle'),
  disableDrag: isTrue(image, 'disable-drag'),
  fullScreen: isTrue(image, 'full-screen'),
  magnifier: ((attr(image, 'magnifier') !== null) || (attr(image, 'data-magnifier') !== null)) &&
    parseInt(attr(image, 'magnifier') || attr(image, 'data-magnifier'), 10),
  bottomCircleOffset: parseInt(attr(image, 'bottom-circle-offset') || attr(image, 'data-bottom-circle-offset') || 5, 10),
  ratio: parseFloat(attr(image, 'ratio') || attr(image, 'data-ratio') || 0) || false,
  responsive: isTrue(image, 'responsive'),
  ciToken: attr(image, 'responsive') || attr(image, 'data-responsive') || 'demo',
  ciSize: attr(image, 'size') || attr(image, 'data-size'),
  ciOperation: attr(image, 'operation') || attr(image, 'data-operation') || 'width',
  ciFilters: attr(image, 'filters') || attr(image, 'data-filters') || 'q35',
  lazyload: isTrue(image, 'lazyload'),
  lazySelector: attr(image, 'lazyload-selector') || attr(image, 'data-lazyload-selector') || 'lazyload',
  spinReverse: isTrue(image, 'spin-reverse'),
  controlReverse: isTrue(image, 'control-reverse'),
  stopAtEdges: isTrue(image, 'stop-at-edges'),
  hide360Logo: isTrue(image, 'hide-360-logo'),
  logoSrc: attr(image, 'logo-src') || 'https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/360_view.svg',
  magnifyIconSelector: attr(image, 'magnify-icon-selector') || attr(image, 'data-magnify-icon-selector') || 'magnify-icon',
  fullscreenIconSelector: attr(image, 'fullscreen-icon-selector') || attr(image, 'data-fullscreen-icon-selector') || 'fullscreen-icon',
});

const isTrue = (image, type) => {
  const imgProp = attr(image, type);
  const imgDataProp = attr(image, `data-${type}`);

  return (imgProp !== null && imgProp !== 'false') || (imgDataProp !== null && imgDataProp !== 'false');
};

const attr = (element, attribute) => element.getAttribute(attribute);

const set360ViewIconStyles = (view360Icon) => {
  view360Icon.style.position = 'absolute';
  view360Icon.style.top = '0';
  view360Icon.style.bottom = '0';
  view360Icon.style.left = '0';
  view360Icon.style.right = '0';
  view360Icon.style.width = '100px';
  view360Icon.style.height = '100px';
  view360Icon.style.margin = 'auto';
  view360Icon.style.backgroundColor = 'rgba(255,255,255,0.8)';
  view360Icon.style.borderRadius = '50%';
  view360Icon.style.boxShadow = 'rgb(255, 255, 255, 0.5) 0px 0px 4px';
  view360Icon.style.transition = '0.5s all';
  view360Icon.style.color = 'rgb(80,80,80)';
  view360Icon.style.textAlign = 'center';
  view360Icon.style.lineHeight = '100px';
  view360Icon.style.zIndex = '2';
};

const setView360Icon = (view360Icon, logoSrc) => {
  view360Icon.style.background = `rgba(255,255,255,0.8) url('${logoSrc}') 50% 50% / contain no-repeat`;
}

const set360ViewCircleIconStyles = (view360CircleIcon, bottomCircleOffset) => {
  view360CircleIcon.src = `https://scaleflex.ultrafast.io/https://scaleflex.api.airstore.io/v1/get/_/2236d56f-914a-5a8b-a3ae-f7bde1c50000/360.svg`;
  view360CircleIcon.style.position = 'absolute';
  view360CircleIcon.style.top = 'auto';
  view360CircleIcon.style.bottom = bottomCircleOffset + '%';
  view360CircleIcon.style.left = '0';
  view360CircleIcon.style.right = '0';
  view360CircleIcon.style.width = '80%';
  view360CircleIcon.style.height = 'auto';
  view360CircleIcon.style.margin = 'auto';
  view360CircleIcon.style.transition = '0.5s all';
  view360CircleIcon.style.zIndex = '2';
};

const setLoaderStyles = (loader) => {
  loader.className = 'cloudimage-360-loader';
  loader.style.position = 'absolute';
  loader.style.zIndex = '100';
  loader.style.top = '0';
  loader.style.left = '0';
  loader.style.right = '0';
  loader.style.width = '0%';
  loader.style.height = '8px';
  loader.style.background = 'rgb(165,175,184)';
};

const setBoxShadowStyles = (boxShadow, boxShadowValue) => {
  boxShadow.className = 'cloudimage-360-box-shadow';
  boxShadow.style.position = 'absolute';
  boxShadow.style.zIndex = '99';
  boxShadow.style.top = '0';
  boxShadow.style.left = '0';
  boxShadow.style.right = '0';
  boxShadow.style.bottom = '0';
  boxShadow.style.boxShadow = boxShadowValue;
};

const setMagnifyIconStyles = (magnifyIcon, fullScreen, magnifySelector) => {
  magnifyIcon.style.position = 'absolute';
  magnifyIcon.style.top = fullScreen ? '35px' : '5px';
  magnifyIcon.style.right = '5px';
  magnifyIcon.style.width = '25px';
  magnifyIcon.style.height = '25px';
  magnifyIcon.style.zIndex = '101';
  magnifyIcon.style.cursor = 'pointer';
  magnifyIcon.style.background = `url('https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/loupe.svg') 50% 50% / cover no-repeat`;
  magnifyIcon.className = magnifySelector;
};

const setFullScreenModalStyles = (fullScreenModal) => {
  fullScreenModal.style.position = 'fixed';
  fullScreenModal.style.top = '0';
  fullScreenModal.style.bottom = '0';
  fullScreenModal.style.left = '0';
  fullScreenModal.style.right = '0';
  fullScreenModal.style.width = '100%';
  fullScreenModal.style.height = '100%';
  fullScreenModal.style.zIndex = '999';
  fullScreenModal.style.background = '#fff';
};

const setFullScreenIconStyles = (fullScreenIcon, fullscreenSelector) => {
  fullScreenIcon.style.position = 'absolute';
  fullScreenIcon.style.top = '5px';
  fullScreenIcon.style.right = '5px';
  fullScreenIcon.style.width = '25px';
  fullScreenIcon.style.height = '25px';
  fullScreenIcon.style.zIndex = '101';
  fullScreenIcon.style.cursor = 'pointer';
  fullScreenIcon.style.background = `url('https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/full_screen.svg') 50% 50% / cover no-repeat`;
  fullScreenIcon.className = fullscreenSelector;
};

const setCloseFullScreenViewStyles = (closeFullScreenIcon) => {
  closeFullScreenIcon.style.position = 'absolute';
  closeFullScreenIcon.style.top = '5px';
  closeFullScreenIcon.style.right = '5px';
  closeFullScreenIcon.style.width = '25px';
  closeFullScreenIcon.style.height = '25px';
  closeFullScreenIcon.style.zIndex = '101';
  closeFullScreenIcon.style.cursor = 'pointer';
  closeFullScreenIcon.style.background = `url('https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/cross.svg') 50% 50% / cover no-repeat`;
};

const magnify = (container, src, glass, zoom) => {
  let w, h, bw;
  glass.setAttribute("class", "img-magnifier-glass");
  container.prepend(glass);

  glass.style.backgroundColor = '#fff';
  glass.style.backgroundImage = "url('" + src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (container.offsetWidth * zoom) + "px " + (container.offsetHeight * zoom) + "px";
  glass.style.position = 'absolute';
  glass.style.border = '3px solid #000';
  glass.style.borderRadius = '50%';
  glass.style.cursor = 'wait';
  glass.style.lineHeight = '200px';
  glass.style.textAlign = 'center';
  glass.style.zIndex = '1000';

  glass.style.width = '250px';
  glass.style.height = '250px';
  glass.style.top = '-75px';
  glass.style.right = '-85px';

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  glass.addEventListener("mousemove", moveMagnifier);
  container.addEventListener("mousemove", moveMagnifier);

  glass.addEventListener("touchmove", moveMagnifier);
  container.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    let pos, x, y;

    e.preventDefault();

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

    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
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

export {
  get360ViewProps,
  set360ViewIconStyles,
  set360ViewCircleIconStyles,
  setLoaderStyles,
  setBoxShadowStyles,
  setView360Icon,
  magnify,
  setMagnifyIconStyles,
  setFullScreenModalStyles,
  setFullScreenIconStyles,
  setCloseFullScreenViewStyles,
  getResponsiveWidthOfContainer,
  getSizeAccordingToPixelRatio,
  contain,
  addClass,
  removeClass,
  pad
}