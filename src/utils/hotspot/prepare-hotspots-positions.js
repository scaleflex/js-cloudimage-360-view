import { fillPreviousCoordWithPrevious } from './fill-previous-coord-with-previous';

export const prepareHotspotsPositions = (hotspots) => hotspots.reduce((accumulate, current, currentIndex) => {
  const isIncludesXcoord = !!current?.xCoord;
  const isIncludesYcoord = !!current?.yCoord;

  if (!isIncludesXcoord) {
    current.xCoord = fillPreviousCoordWithPrevious(hotspots, currentIndex, 'xCoord');
  }

  if (!isIncludesYcoord) {
    current.yCoord = fillPreviousCoordWithPrevious(hotspots, currentIndex, 'yCoord');
  }

  accumulate.push(current);

  return accumulate;
}, []);
