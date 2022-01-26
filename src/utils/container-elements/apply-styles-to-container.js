export const applyStylesToContainer = (container) => {
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.cursor = 'wait';
  container.setAttribute('draggable', 'false');
  container.className = `${container.className} initialized`;
};
