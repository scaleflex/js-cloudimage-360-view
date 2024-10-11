import { useState } from 'react';
import { AUTOPLAY_BEHAVIOR } from '../../constants/auto-play-behavior';

export const isCompletedOneCycle = (autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed) => {
  switch (autoplayBehavior) {
    case AUTOPLAY_BEHAVIOR.SPIN_XY:
    case AUTOPLAY_BEHAVIOR.SPIN_Y: {
      const isReachedTheEdge = isReversed ? (activeImageY === 1) : (activeImageY === amountY);
      if (isReachedTheEdge) return true;
      return false;
    }

    case AUTOPLAY_BEHAVIOR.SPIN_X:
    case AUTOPLAY_BEHAVIOR.SPIN_YX:
    default: {
      const isReachedTheEdge = isReversed ? (activeImageX === 1) : (activeImageX === amountX);
      if (isReachedTheEdge) return true;
      return false;
    }
  }
};

// Adding play/pause button control

const AutoplayComponent = ({ autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed }) => {
  const [isPaused, setIsPaused] = useState(false); // State to track whether autoplay is paused or not

  const handleImageClick = () => {
    setIsPaused(true); // Pause autoplay when image is clicked
  };

  const handlePlayClick = () => {
    setIsPaused(false); // Resume autoplay when "Play" button is clicked
  };

  const handleAutoplay = () => {
    if (isPaused) return; // Skip autoplay logic if paused

    // Existing autoplay logic
    const completedCycle = isCompletedOneCycle(autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed);

    if (completedCycle) {
      // Handle behavior when one cycle is completed
      console.log("Completed one cycle");
    } else {
      // Handle behavior when cycle is ongoing
      console.log("Autoplay is ongoing");
    }
  };

  // Call handleAutoplay as part of component's behavior (simulating autoplay behavior here)
  handleAutoplay();

  return (
    <div>
      {/* Image area */}
      <div onClick={handleImageClick} style={{ pointerEvents: isPaused ? 'none' : 'auto' }}>
        {/* Placeholder for image content */}
        <img src="activeImage.jpg" alt="Autoplay Image" />
      </div>

      {/* Play button appears when paused */}
      {isPaused && (
        <button onClick={handlePlayClick} style={{ marginTop: '20px' }}>
          Play
        </button>
      )}
    </div>
  );
};
