export const addClass = (el, className) => {
  const element = el || {};
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
};
