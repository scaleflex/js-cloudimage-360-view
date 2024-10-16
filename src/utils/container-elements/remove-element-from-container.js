export const removeElementFromContainer = (container, selector) => {
  const element = container.querySelector(selector);

  if (element) {
    element.parentNode.removeChild(element);
  }
};
