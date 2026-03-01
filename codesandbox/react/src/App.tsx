import { useRef, useState } from 'react';
import { CI360Viewer, CI360ViewerRef } from 'js-cloudimage-360-view/react';
import 'js-cloudimage-360-view/css';

// Example 1: Basic viewer with autoplay
function BasicExample() {
  return (
    <div className="example">
      <h2>Basic Example with Autoplay</h2>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
        filenameX="orange-{index}.jpg"
        amountX={73}
        aspectRatio="16/9"
        autoplay
        fullscreen
        bottomCircle
        hints
        style={{ width: '100%' }}
      />
      <div className="features">
        <span className="feature-tag">Autoplay</span>
        <span className="feature-tag">Fullscreen</span>
        <span className="feature-tag">73 Frames</span>
      </div>
    </div>
  );
}

// Example 2: Ref control with buttons
function RefControlExample() {
  const viewerRef = useRef<CI360ViewerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <div className="example">
      <h2>Programmatic Control via Ref</h2>
      <CI360Viewer
        ref={viewerRef}
        folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
        filenameX="orange-{index}.jpg"
        amountX={73}
        aspectRatio="16/9"
        fullscreen
        inertia
        onSpin={(data) => setCurrentFrame(data.activeImageX)}
        style={{ width: '100%' }}
      />
      <div className="frame-indicator">Current Frame: {currentFrame + 1} / 73</div>
      <div className="controls">
        <button onClick={() => viewerRef.current?.play()}>Play</button>
        <button onClick={() => viewerRef.current?.stop()}>Stop</button>
        <button onClick={() => viewerRef.current?.moveLeft(5)}>Rotate Left</button>
        <button onClick={() => viewerRef.current?.moveRight(5)}>Rotate Right</button>
        <button onClick={() => viewerRef.current?.goToFrame(0)}>Go to Start</button>
        <button onClick={() => viewerRef.current?.goToFrame(36)}>Go to Middle</button>
      </div>
      <div className="features">
        <span className="feature-tag">Ref Control</span>
        <span className="feature-tag">Inertia</span>
        <span className="feature-tag">onSpin Event</span>
      </div>
    </div>
  );
}

// Example 3: Zoom features
function ZoomExample() {
  return (
    <div className="example">
      <h2>Zoom</h2>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        aspectRatio="1/1"
        zoomMax={3}
        fullscreen
        style={{ width: '100%' }}
      />
      <div className="features">
        <span className="feature-tag">Zoom (3x max)</span>
        <span className="feature-tag">60 Frames</span>
        <span className="feature-tag">Double-click to zoom</span>
      </div>
    </div>
  );
}

// Example 4: Event callbacks
function EventsExample() {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents((prev) => [...prev.slice(-4), event]);
  };

  return (
    <div className="example">
      <h2>Event Callbacks</h2>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
        filenameX="orange-{index}.jpg"
        amountX={73}
        fullscreen
        onReady={() => addEvent('onReady')}
        onLoad={() => addEvent('onLoad')}
        onAutoplayStart={() => addEvent('onAutoplayStart')}
        onAutoplayStop={() => addEvent('onAutoplayStop')}
        onDragStart={() => addEvent('onDragStart')}
        onDragEnd={() => addEvent('onDragEnd')}
        onZoomIn={() => addEvent('onZoomIn')}
        onZoomOut={() => addEvent('onZoomOut')}
        aspectRatio="16/9"
        style={{ width: '100%' }}
      />
      <div className="event-log">
        <strong>Events:</strong> {events.length > 0 ? events.join(' → ') : 'Interact to see events'}
      </div>
      <div className="features">
        <span className="feature-tag">onReady</span>
        <span className="feature-tag">onLoad</span>
        <span className="feature-tag">onDragStart/End</span>
        <span className="feature-tag">onZoom</span>
      </div>
    </div>
  );
}

// Example 5: Theme toggle
function ThemeExample() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="example">
      <h2>Theme Toggle</h2>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
        filenameX="orange-{index}.jpg"
        amountX={73}
        fullscreen
        theme={theme}
        aspectRatio="16/9"
        style={{ width: '100%' }}
      />
      <div className="controls">
        <button
          className={theme === 'light' ? 'active' : ''}
          onClick={() => setTheme('light')}
        >
          Light Theme
        </button>
        <button
          className={theme === 'dark' ? 'active' : ''}
          onClick={() => setTheme('dark')}
        >
          Dark Theme
        </button>
      </div>
      <div className="features">
        <span className="feature-tag">Light Theme</span>
        <span className="feature-tag">Dark Theme</span>
        <span className="feature-tag">Dynamic Switch</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>CloudImage 360 View - React</h1>
        <p>Interactive 360-degree product viewer - Version 4.1.3</p>
      </header>

      <main>
        <BasicExample />
        <RefControlExample />
        <ZoomExample />
        <EventsExample />
        <ThemeExample />
      </main>

      <footer>
        <a
          href="https://github.com/scaleflex/js-cloudimage-360-view"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
        <span>|</span>
        <a
          href="https://scaleflex.github.io/js-cloudimage-360-view/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </footer>
    </div>
  );
}
