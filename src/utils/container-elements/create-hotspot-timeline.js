/**
 * Calculates the middle frame for a hotspot's visibility range
 * @param {Object} positions - Object with frame numbers as keys
 * @returns {number|null} The middle frame number, or null if no valid positions
 */
const calculateMiddleFrame = (positions) => {
  if (!positions || typeof positions !== 'object') return null;

  const frames = Object.keys(positions)
    .map((key) => parseInt(key, 10))
    .filter((frame) => !isNaN(frame))
    .sort((a, b) => a - b);

  if (frames.length === 0) return null;

  // Return the median frame (middle of the sorted array)
  const middleIndex = Math.floor(frames.length / 2);
  return frames[middleIndex];
};

/**
 * Collects one middle frame per hotspot
 * @param {Array} hotspotsConfig - Array of hotspot configurations
 * @returns {Array<{id: string, frame: number, label: string|null}>} Array of hotspot data
 */
const collectHotspotMiddleFrames = (hotspotsConfig) => {
  const hotspotFrames = [];

  if (!hotspotsConfig || !Array.isArray(hotspotsConfig)) return hotspotFrames;

  hotspotsConfig.forEach((hotspot, index) => {
    const middleFrame = calculateMiddleFrame(hotspot.positions);
    if (middleFrame !== null) {
      hotspotFrames.push({
        id: hotspot.id || `hotspot-${index}`,
        frame: middleFrame,
        label: hotspot.label || null,
      });
    }
  });

  return hotspotFrames;
};

/** Delay in ms before showing the tooltip on hover */
const TOOLTIP_SHOW_DELAY = 400;

/**
 * Creates a timeline dot element for a hotspot with optional tooltip
 * @param {string} hotspotId - The hotspot ID
 * @param {number} frame - The frame index
 * @param {number} amountX - Total number of frames
 * @param {string|null} label - Optional label for tooltip
 * @returns {HTMLElement} The dot element
 */
const createTimelineDot = (hotspotId, frame, amountX, label) => {
  const dot = document.createElement('button');
  dot.className = 'cloudimage-360-hotspot-timeline-dot';
  dot.setAttribute('type', 'button');
  dot.setAttribute('aria-label', label || `Go to hotspot at frame ${frame + 1}`);
  dot.setAttribute('data-frame', frame.toString());
  dot.setAttribute('data-hotspot-id', hotspotId);

  // Position dot as percentage along the track
  const percentage = amountX > 1 ? (frame / (amountX - 1)) * 100 : 0;
  dot.style.left = `${percentage}%`;

  // Add tooltip if label is provided
  if (label) {
    const tooltip = document.createElement('span');
    tooltip.className = 'cloudimage-360-hotspot-timeline-tooltip';
    tooltip.textContent = label;
    dot.appendChild(tooltip);

    let showTimeout = null;

    dot.addEventListener('mouseenter', () => {
      showTimeout = setTimeout(() => {
        tooltip.classList.add('visible');
      }, TOOLTIP_SHOW_DELAY);
    });

    dot.addEventListener('mouseleave', () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
      }
      tooltip.classList.remove('visible');
    });

    // Also hide on click (since user is navigating away)
    dot.addEventListener('click', () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
      }
      tooltip.classList.remove('visible');
    });
  }

  return dot;
};

/**
 * Creates the hotspot timeline element with track, indicator, and dots
 * @param {HTMLElement} container - The main container to append to
 * @param {number} amountX - Total number of frames
 * @param {Array} hotspotsConfig - Array of hotspot configurations
 * @returns {Object|null} Object containing element and indicator, or null if no hotspots
 */
export const createHotspotTimeline = (container, amountX, hotspotsConfig) => {
  const hotspotFrames = collectHotspotMiddleFrames(hotspotsConfig);

  // Don't create timeline if no hotspots have positions
  if (hotspotFrames.length === 0) return null;

  // Create main timeline container
  const timeline = document.createElement('div');
  timeline.className = 'cloudimage-360-hotspot-timeline';
  timeline.setAttribute('role', 'navigation');
  timeline.setAttribute('aria-label', 'Hotspot timeline navigation');

  // Create the track (background line)
  const track = document.createElement('div');
  track.className = 'cloudimage-360-hotspot-timeline-track';

  // Create the current position indicator
  const indicator = document.createElement('div');
  indicator.className = 'cloudimage-360-hotspot-timeline-indicator';

  // Create one dot per hotspot at its middle frame
  hotspotFrames.forEach(({ id, frame, label }) => {
    const dot = createTimelineDot(id, frame, amountX, label);
    track.appendChild(dot);
  });

  track.appendChild(indicator);
  timeline.appendChild(track);
  container.appendChild(timeline);

  return {
    element: timeline,
    indicator,
    hotspotFrames,
  };
};

/**
 * Updates the timeline indicator position based on current frame
 * @param {HTMLElement} indicator - The indicator element
 * @param {number} currentFrame - The current frame index
 * @param {number} amountX - Total number of frames
 */
export const updateTimelineIndicator = (indicator, currentFrame, amountX) => {
  if (!indicator) return;

  const percentage = amountX > 1 ? (currentFrame / (amountX - 1)) * 100 : 0;
  indicator.style.left = `${percentage}%`;
};

/**
 * Shows the timeline with fade-in animation
 * @param {HTMLElement} timeline - The timeline element
 */
export const showHotspotTimeline = (timeline) => {
  if (!timeline) return;
  timeline.classList.add('visible');
};

/**
 * Hides the timeline with fade-out animation
 * @param {HTMLElement} timeline - The timeline element
 */
export const hideHotspotTimeline = (timeline) => {
  if (!timeline) return;
  timeline.classList.remove('visible');
};
