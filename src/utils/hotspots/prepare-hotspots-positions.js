import { fillEmptyCoordWithPrevious } from './fill-empty-coord-with-previous';

export const prepareHotspotsPositions = (positions) => positions.reduce((accumulate, current, currentIndex) => {
  const isIncludesXcoord = !!current?.xCoord;
  const isIncludesYcoord = !!current?.yCoord;

  if (!isIncludesXcoord) {
    current.xCoord = fillEmptyCoordWithPrevious(positions, currentIndex, 'xCoord');
  }

  if (!isIncludesYcoord) {
    current.yCoord = fillEmptyCoordWithPrevious(positions, currentIndex, 'yCoord');
  }

  accumulate.push(current);

  return accumulate;
}, []);
