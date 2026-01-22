import { useRef, useState } from 'react';
import { CI360Viewer, CI360ViewerRef, SpinEventData } from 'js-cloudimage-360-view/react';
// Import CI360 CSS
import '../../../src/static/css/style.css';

function BasicExample() {
  return (
    <div className="demo-section">
      <h2>Basic Usage</h2>
      <p>Simple 360 viewer with autoplay and fullscreen support.</p>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        autoplay
        speed={150}
        fullscreen
        aspectRatio="1/1"
        style={{ width: '100%', maxWidth: 400 }}
      />
    </div>
  );
}

function RefControlExample() {
  const viewerRef = useRef<CI360ViewerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const handleSpin = (data: SpinEventData) => {
    setCurrentFrame(data.activeImageX);
  };

  return (
    <div className="demo-section">
      <h2>Imperative Control with Ref</h2>
      <p>Control the viewer programmatically using ref methods.</p>
      <CI360Viewer
        ref={viewerRef}
        folder="https://scaleflex.cloudimg.io/v7/demo/360-nike/"
        filenameX="nike-{index}.jpg"
        amountX={35}
        onSpin={handleSpin}
        aspectRatio="16/9"
        style={{ width: '100%', maxWidth: 800 }}
      />
      <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => viewerRef.current?.play()}>Play</button>
        <button onClick={() => viewerRef.current?.stop()}>Stop</button>
        <button onClick={() => viewerRef.current?.moveLeft(5)}>Left 5</button>
        <button onClick={() => viewerRef.current?.moveRight(5)}>Right 5</button>
        <button onClick={() => viewerRef.current?.goToFrame(17)}>Go to Frame 17</button>
      </div>
      <p style={{ marginTop: 8 }}>Current Frame: {currentFrame}</p>
    </div>
  );
}

function TwoAxisExample() {
  return (
    <div className="demo-section">
      <h2>Two-Axis Rotation (X and Y)</h2>
      <p>Drag horizontally and vertically to rotate on both axes.</p>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/360-nike/"
        filenameX="nike-{index}.jpg"
        filenameY="nike-y-{index}.jpg"
        amountX={35}
        amountY={36}
        autoplayBehavior="spin-xy"
        keys
        fullscreen
        aspectRatio="16/9"
        style={{ width: '100%', maxWidth: 800 }}
      />
    </div>
  );
}

function ZoomExample() {
  return (
    <div className="demo-section">
      <h2>Pointer Zoom</h2>
      <p>Click to zoom in and move mouse to pan. Click again to zoom out.</p>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        pointerZoom={3}
        fullscreen
        aspectRatio="1/1"
        style={{ width: '100%', maxWidth: 400 }}
      />
    </div>
  );
}

function InertiaExample() {
  return (
    <div className="demo-section">
      <h2>Inertia & Pinch Zoom</h2>
      <p>Drag and release to see momentum effect. On touch devices, use pinch to zoom.</p>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        inertia
        pinchZoom
        fullscreen
        aspectRatio="1/1"
        style={{ width: '100%', maxWidth: 400 }}
      />
    </div>
  );
}

function EventsExample() {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (name: string) => {
    setEvents((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${name}`]);
  };

  return (
    <div className="demo-section">
      <h2>Events</h2>
      <p>All events are logged below the viewer.</p>
      <CI360Viewer
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        autoplay
        playOnce
        fullscreen
        onReady={() => addEvent('onReady')}
        onLoad={(data) => addEvent(`onLoad (${data.imagesX} images)`)}
        onAutoplayStart={() => addEvent('onAutoplayStart')}
        onAutoplayStop={() => addEvent('onAutoplayStop')}
        onDragStart={() => addEvent('onDragStart')}
        onDragEnd={() => addEvent('onDragEnd')}
        onZoomIn={(data) => addEvent(`onZoomIn (level: ${data.zoomLevel})`)}
        onZoomOut={() => addEvent('onZoomOut')}
        pointerZoom={2}
        aspectRatio="1/1"
        style={{ width: '100%', maxWidth: 400 }}
      />
      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: '#f5f5f5',
          borderRadius: 4,
          fontFamily: 'monospace',
          fontSize: 12,
          minHeight: 100,
        }}
      >
        {events.length === 0 ? (
          <span style={{ color: '#999' }}>Events will appear here...</span>
        ) : (
          events.map((event, i) => <div key={i}>{event}</div>)
        )}
      </div>
    </div>
  );
}

function ThemeExample() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Use key to force complete remount when theme changes
  return (
    <div className="demo-section">
      <h2>Themes</h2>
      <p>Toggle between light and dark themes.</p>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTheme('light')} disabled={theme === 'light'}>
          Light Theme
        </button>
        <button onClick={() => setTheme('dark')} disabled={theme === 'dark'} style={{ marginLeft: 8 }}>
          Dark Theme
        </button>
      </div>
      <CI360Viewer
        key={theme}
        folder="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile/"
        filenameX="product-{index}.jpg"
        amountX={60}
        theme={theme}
        hints
        fullscreen
        aspectRatio="1/1"
        style={{ width: '100%', maxWidth: 400 }}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>CI360 React Demo</h1>
      <BasicExample />
      <RefControlExample />
      <TwoAxisExample />
      <ZoomExample />
      <InertiaExample />
      <EventsExample />
      <ThemeExample />
    </div>
  );
}

export default App;
