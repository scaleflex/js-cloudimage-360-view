/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

export const fillEmptyCoordWithPrevious = (hotspots, hotspotIndex, coord) => {
  const coordIndexes = new Array(hotspotIndex);

  const intialValue = '0%';

  for (let i = coordIndexes.length - 1; i > -1; i--) {
    const previousXCoord = hotspots[i]?.[coord];

    if (previousXCoord) {
      return previousXCoord;
    }
  }

  return intialValue;
};
