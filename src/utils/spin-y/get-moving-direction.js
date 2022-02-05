import { ORIENTATIONS } from '../../constants/orientations';

export const getMovingDirection = (isStartSpin, allowSpinY, prevPosition, nextPositions, currentMovingDirection) => {
  let movingDirection = ORIENTATIONS.CENTER;

  if (isStartSpin) return currentMovingDirection;

  const differenceInPositionX = Math.abs(prevPosition.x - nextPositions.x);
  const differenceInPositionY = Math.abs(prevPosition.y - nextPositions.y);
  const sensitivity = 10;

  if (differenceInPositionX > sensitivity) movingDirection = ORIENTATIONS.X;

  if (differenceInPositionY > sensitivity && allowSpinY) movingDirection = ORIENTATIONS.Y;

  return movingDirection;
};
