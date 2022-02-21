export const getHotspotOriantaion = (orientation) => {
  switch (orientation.toLowerCase()) {
    case 'x-axis':
      return 'x';

    case 'y-axis':
      return 'y';

    default:
      return 'x';
  }
};
