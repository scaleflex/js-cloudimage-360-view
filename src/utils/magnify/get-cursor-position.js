export const getCursorPosition = (e, container) => {
  const rect = container.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  return {
    x: x - rect.left,
    y: y - rect.top,
  };
};
