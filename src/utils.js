export const getAttr = (element, attribute) => element.getAttribute(attribute);

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