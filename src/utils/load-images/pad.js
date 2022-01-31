export const pad = (n, width = 0) => {
  n += '';

  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};
