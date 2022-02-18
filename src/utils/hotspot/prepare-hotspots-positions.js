import { fillEmptyCoordWithPrevious } from './fill-empty-coord-with-previous';

export const prepareHotspotsPositions = (hotspots) => hotspots.reduce((accumulate, current, currentIndex) => {
  const isIncludesXcoord = !!current?.xCoord;
  const isIncludesYcoord = !!current?.yCoord;

  if (!isIncludesXcoord) {
    current.xCoord = fillEmptyCoordWithPrevious(hotspots, currentIndex, 'xCoord');
  }

  if (!isIncludesYcoord) {
    current.yCoord = fillEmptyCoordWithPrevious(hotspots, currentIndex, 'yCoord');
  }

  accumulate.push(current);

  return accumulate;
}, []);
