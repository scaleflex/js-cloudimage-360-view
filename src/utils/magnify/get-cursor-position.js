export const getCursorPosition = (event = window.event, container) => {
  let x = 0;
  let y = 0;

  const a = container.getBoundingClientRect();

  x = event.pageX - a.left;
  y = event.pageY - a.top;
  x -= window.pageXOffset;
  y -= window.pageYOffset;

  return { x, y };
};
