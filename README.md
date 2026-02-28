<p align="center">
  <a href="https://www.scaleflex.com/en/home">
    <img width="350" src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/logo_scaleflex_on_white_bg.jpg?vh=91b12d&w=700" alt="Cloudimage logo">
  </a>
</p>

<h1 align="center">JS Cloudimage 360 View</h1>

<p align="center">
  <strong>A powerful JavaScript library for creating interactive 360-degree product views</strong>
</p>

<p align="center">
  <a href="https://github.com/scaleflex/js-cloudimage-360-view/releases">
    <img src="https://img.shields.io/github/v/release/scaleflex/js-cloudimage-360-view" alt="Release">
  </a>
  <a href="https://img.shields.io/bundlephobia/min/js-cloudimage-360-view">
    <img src="https://img.shields.io/bundlephobia/min/js-cloudimage-360-view" alt="Size">
  </a>
  <a href="https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange">
    <img src="https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange" alt="Downloads">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://www.cloudimage.io/en/home">
    <img src="https://img.shields.io/badge/Powered%20by-Cloudimage-blue" alt="Cloudimage">
  </a>
</p>

<p align="center">
  <a href="https://scaleflex.github.io/js-cloudimage-360-view/">View Demo</a> ·
  <a href="https://codesandbox.io/p/sandbox/github/scaleflex/js-cloudimage-360-view/tree/master/codesandbox/react">React CodeSandbox</a> ·
  <a href="https://codesandbox.io/p/sandbox/github/scaleflex/js-cloudimage-360-view/tree/master/codesandbox/vanilla">Vanilla CodeSandbox</a> ·
  <a href="https://github.com/scaleflex/js-cloudimage-360-view/issues">Report Bug</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [React / Next.js](#react--nextjs)
- [Configuration Options](#configuration-options)
- [Event Callbacks](#event-callbacks)
- [Hotspots](#hotspots)
- [Interaction Hints](#interaction-hints)
- [Styling & Theming](#styling--theming)
- [Methods](#methods)
- [Cloudimage Integration](#cloudimage-integration)
- [Browser Support](#browser-support)
- [Migration Guide (v3 → v4)](#migration-guide-v3--v4)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Overview

JS Cloudimage 360 View enables you to create stunning, interactive 360-degree product views for your website. Perfect for e-commerce platforms, virtual tours, and product showcases, it provides an immersive viewing experience that lets users explore products from every angle.

### Why Choose This Library?

- **Easy Integration** - Get started in minutes with CDN or npm
- **Fully Customizable** - CSS variables, callbacks, and extensive configuration options
- **Mobile-Friendly** - Touch and swipe support out of the box
- **Performance Optimized** - Lazy loading, responsive images, and efficient rendering
- **Feature Rich** - Hotspots, zoom, fullscreen, autoplay, and more

---

## Features

| Feature | Description |
|---------|-------------|
| **360° Rotation** | Smooth horizontal and vertical rotation with customizable speed |
| **Touch & Drag** | Intuitive mouse and touch controls with inertia/momentum |
| **Pinch-to-Zoom** | Natural pinch gesture zooming on mobile devices |
| **Autoplay** | Automatic rotation with configurable behavior and direction |
| **Zoom** | Pointer zoom and magnifier glass for detailed views |
| **Fullscreen** | Immersive fullscreen mode with ESC key support |
| **Hotspots** | Interactive markers with tooltips for highlighting features |
| **Keyboard Navigation** | Arrow key support for accessibility |
| **Lazy Loading** | Optimized loading for better performance |
| **Responsive** | Works on all screen sizes with Cloudimage CDN integration |
| **Theming** | CSS variables for easy customization |
| **Event Callbacks** | Hook into viewer lifecycle and user interactions |

---

## Quick Start

Add the library via CDN and create your first 360 viewer in seconds:

```html
<!-- Add the library (CSS is auto-injected) -->
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/4.5.3/js-cloudimage-360-view.min.js?vh=35cf56&func=proxy"></script>

<!-- Create a container with data attributes -->
<div
  class="cloudimage-360"
  data-folder="https://scaleflex.cloudimg.io/v7/demo/360-car/"
  data-filename-x="car-{index}.jpg"
  data-amount-x="36"
></div>

<!-- Initialize -->
<script>
  const viewer = new window.CI360();
  viewer.initAll();
</script>
```

---

## Installation

### Option 1: CDN (Recommended for Quick Setup)

```html
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/4.5.3/js-cloudimage-360-view.min.js?vh=35cf56&func=proxy"></script>
```

> **Note:** CSS is automatically injected by the script - no separate stylesheet needed.

### Option 2: Package Manager

```bash
# npm
npm install js-cloudimage-360-view

# yarn
yarn add js-cloudimage-360-view

# pnpm
pnpm add js-cloudimage-360-view
```

Then import in your JavaScript:

```javascript
import CI360 from 'js-cloudimage-360-view';
import 'js-cloudimage-360-view/css';
```

---

## Usage

### Method 1: Data Attributes (Declarative)

The simplest way to create a 360 viewer using HTML data attributes:

```html
<div
  id="my-360-viewer"
  class="cloudimage-360"
  data-folder="https://your-domain.com/images/"
  data-filename-x="{index}.jpg"
  data-amount-x="36"
  data-autoplay
  data-fullscreen
  data-magnifier="2"
></div>

<script>
  const viewer = new CI360();
  viewer.initAll(); // Initializes all elements with class "cloudimage-360"
</script>
```

### Method 2: JavaScript Configuration (Programmatic)

For more control, initialize with a JavaScript configuration object:

```javascript
const viewer = new CI360();

const container = document.getElementById('product-viewer');

const config = {
  folder: 'https://your-domain.com/images/',
  filenameX: 'product-{index}.jpg',
  amountX: 36,
  autoplay: true,
  speed: 100,
  dragSpeed: 150,
  fullscreen: true,
  magnifier: 2,
  pointerZoom: 2,
  inertia: true,

  // Event callbacks
  onReady: () => console.log('Viewer ready!'),
  onSpin: (e) => console.log(`Frame: ${e.activeImageX + 1}/${e.amountX}`),
};

viewer.init(container, config);
```

### X and Y Axis Rotation

Support 360° rotation on both axes for full product exploration:

```javascript
const config = {
  folder: 'https://your-domain.com/images/',
  filenameX: 'product-x-{index}.jpg',
  filenameY: 'product-y-{index}.jpg',
  amountX: 36,
  amountY: 18,
  autoplayBehavior: 'spin-xy', // Options: 'spin-x', 'spin-y', 'spin-xy', 'spin-yx'
};
```

---

## React / Next.js

The library provides a React wrapper for seamless integration with React and Next.js applications.

### Installation

```bash
npm install js-cloudimage-360-view
```

### Basic Usage

```tsx
import { CI360Viewer } from 'js-cloudimage-360-view/react';
import 'js-cloudimage-360-view/css';

function ProductView() {
  return (
    <CI360Viewer
      folder="https://example.com/images/"
      filenameX="product-{index}.jpg"
      amountX={36}
      autoplay
      fullscreen
      aspectRatio="16/9"
      style={{ width: '100%', maxWidth: 800 }}
    />
  );
}
```

### Imperative Control with Ref

Use a ref to control the viewer programmatically:

```tsx
import { useRef } from 'react';
import { CI360Viewer, CI360ViewerRef } from 'js-cloudimage-360-view/react';
import 'js-cloudimage-360-view/css';

function ProductView() {
  const viewerRef = useRef<CI360ViewerRef>(null);

  return (
    <>
      <CI360Viewer
        ref={viewerRef}
        folder="https://example.com/images/"
        filenameX="{index}.jpg"
        amountX={36}
        onSpin={(e) => console.log(`Frame: ${e.activeImageX}`)}
      />
      <button onClick={() => viewerRef.current?.play()}>Play</button>
      <button onClick={() => viewerRef.current?.stop()}>Stop</button>
      <button onClick={() => viewerRef.current?.goToFrame(17)}>Go to Frame 17</button>
    </>
  );
}
```

### Available Ref Methods

| Method | Description |
|--------|-------------|
| `play()` | Start autoplay |
| `stop()` | Stop autoplay |
| `moveLeft(steps?)` | Move left by specified frames (default: 1) |
| `moveRight(steps?)` | Move right by specified frames (default: 1) |
| `moveTop(steps?)` | Move up on Y-axis (default: 1) |
| `moveBottom(steps?)` | Move down on Y-axis (default: 1) |
| `zoomIn()` | Toggle zoom in |
| `zoomOut()` | Zoom out |
| `goToFrame(frame, hotspotId?)` | Animate to specific frame |
| `getViewer()` | Get underlying viewer instance |

### With Hotspots

```tsx
import { CI360Viewer, Hotspot } from 'js-cloudimage-360-view/react';

const hotspots: Hotspot[] = [
  {
    id: 'feature-1',
    label: 'Engine',
    orientation: 'x',
    containerSize: [1200, 800],
    positions: { 0: { x: 500, y: 300 } },
    content: '<div>Engine details</div>',
  },
];

function ProductView() {
  return (
    <CI360Viewer
      folder="https://example.com/images/"
      filenameX="{index}.jpg"
      amountX={36}
      hotspots={hotspots}
    />
  );
}
```

### Next.js (SSR)

For Next.js applications, use dynamic import to disable server-side rendering:

```tsx
import dynamic from 'next/dynamic';
import 'js-cloudimage-360-view/css';

const CI360Viewer = dynamic(
  () => import('js-cloudimage-360-view/react').then(mod => mod.CI360Viewer),
  { ssr: false }
);

export default function ProductPage() {
  return (
    <CI360Viewer
      folder="https://example.com/images/"
      filenameX="{index}.jpg"
      amountX={36}
    />
  );
}
```

### useCI360 Hook

For advanced use cases, you can use the `useCI360` hook directly:

```tsx
import { useRef } from 'react';
import { useCI360 } from 'js-cloudimage-360-view/react';

function CustomViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewer, isReady } = useCI360(containerRef, {
    folder: 'https://example.com/images/',
    filenameX: '{index}.jpg',
    amountX: 36,
    onReady: () => console.log('Viewer ready!'),
  });

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', maxWidth: 800, aspectRatio: '16/9' }} />
      {isReady && <p>Viewer is ready!</p>}
    </div>
  );
}
```

### TypeScript Support

The React wrapper is fully typed. Import types as needed:

```tsx
import type {
  CI360ViewerProps,
  CI360ViewerRef,
  CI360Config,
  SpinEventData,
  Hotspot,
} from 'js-cloudimage-360-view/react';
```

---

## Configuration Options

All options can be set via JavaScript config or HTML data attributes.

### Image Source Options

| Option | Data Attribute | Default | Description |
|--------|----------------|---------|-------------|
| `folder` | `data-folder` | `'/'` | Path to the folder containing images |
| `filenameX` | `data-filename-x` | `'image-{index}.jpg'` | Filename pattern for X-axis images. Use `{index}` as placeholder |
| `filenameY` | `data-filename-y` | `null` | Filename pattern for Y-axis images |
| `imageListX` | `data-image-list-x` | `null` | Array of image URLs for X-axis (alternative to folder/filename) |
| `imageListY` | `data-image-list-y` | `null` | Array of image URLs for Y-axis |
| `amountX` | `data-amount-x` | `0` | Total number of X-axis images |
| `amountY` | `data-amount-y` | `0` | Total number of Y-axis images |
| `indexZeroBase` | `data-index-zero-base` | `0` | Starting index for image filenames |

### Behavior Options

| Option | Data Attribute | Default | Description |
|--------|----------------|---------|-------------|
| `autoplay` | `data-autoplay` | `false` | Enable automatic rotation |
| `autoplayBehavior` | `data-autoplay-behavior` | `'spin-x'` | Autoplay pattern: `'spin-x'`, `'spin-y'`, `'spin-xy'`, `'spin-yx'` |
| `autoplayReverse` | `data-autoplay-reverse` | `false` | Reverse autoplay direction |
| `playOnce` | `data-play-once` | `false` | Stop after one complete rotation |
| `speed` | `data-speed` | `80` | Autoplay speed (ms between frames) |
| `inertia` | `data-inertia` | `false` | Enable momentum after drag release |

### Control Options

| Option | Data Attribute | Default | Description |
|--------|----------------|---------|-------------|
| `draggable` | `data-draggable` | `true` | Enable mouse drag rotation |
| `swipeable` | `data-swipeable` | `true` | Enable touch swipe rotation |
| `dragSpeed` | `data-drag-speed` | `150` | Drag sensitivity |
| `dragReverse` | `data-drag-reverse` | `false` | Reverse drag direction |
| `keys` | `data-keys` | `false` | Enable keyboard arrow navigation |
| `keysReverse` | `data-keys-reverse` | `false` | Reverse keyboard direction |
| `stopAtEdges` | `data-stop-at-edges` | `false` | Stop rotation at first/last frame |
| `pinchZoom` | `data-pinch-zoom` | `true` | Enable pinch-to-zoom on touch devices |

### Display Options

| Option | Data Attribute | Default | Description |
|--------|----------------|---------|-------------|
| `aspectRatio` | `data-aspect-ratio` | `null` | Aspect ratio for the container (e.g., `"16/9"`, `"4/3"`, `"1/1"`) |
| `fullscreen` | `data-fullscreen` | `false` | Show fullscreen button |
| `magnifier` | `data-magnifier` | `null` | Magnifier zoom level (1-5) |
| `pointerZoom` | `data-pointer-zoom` | `0` | Pointer zoom level on click (1-5) |
| `bottomCircle` | `data-bottom-circle` | `true` | Show 360° progress indicator |
| `bottomCircleOffset` | `data-bottom-circle-offset` | `5` | Progress indicator offset (px) |
| `initialIconShown` | `data-initial-icon` | `true` | Show 360° icon on load |
| `lazyload` | `data-lazyload` | `true` | Enable lazy loading |
| `hints` | `data-hints` | `true` | Show interaction hints on load |
| `theme` | `data-theme` | `null` | Color theme: `'light'` or `'dark'` |
| `hotspotTrigger` | `data-hotspot-trigger` | `'hover'` | Hotspot trigger mode: `'hover'` or `'click'` |
| `hotspotTimelineOnClick` | `data-hotspot-timeline-on-click` | `true` | Show hotspot popup when clicking timeline dot |

### Cloudimage CDN Options

| Option | Data Attribute | Default | Description |
|--------|----------------|---------|-------------|
| `ciToken` | `data-responsive` | `null` | Cloudimage token for responsive images |
| `ciFilters` | `data-filters` | `null` | Cloudimage filters |
| `ciTransformation` | `data-transformation` | `null` | Cloudimage transformations |

---

## Event Callbacks

Hook into viewer events for custom functionality. Callbacks are only available via JavaScript configuration.

| Callback | Event Data | Description |
|----------|------------|-------------|
| `onReady` | `{ viewerId }` | Viewer initialized and ready |
| `onLoad` | `{ viewerId, imagesX, imagesY }` | All images loaded |
| `onSpin` | `{ viewerId, direction, activeImageX, activeImageY, amountX, amountY }` | Each rotation frame |
| `onAutoplayStart` | `{ viewerId }` | Autoplay started |
| `onAutoplayStop` | `{ viewerId }` | Autoplay stopped |
| `onDragStart` | `{ viewerId }` | User started dragging |
| `onDragEnd` | `{ viewerId }` | User stopped dragging |
| `onZoomIn` | `{ viewerId, zoomLevel }` | Pointer zoom activated |
| `onZoomOut` | `{ viewerId }` | Pointer zoom deactivated |
| `onFullscreenOpen` | `{ viewerId }` | Fullscreen mode opened |
| `onFullscreenClose` | `{ viewerId }` | Fullscreen mode closed |

### Example

```javascript
const config = {
  folder: 'https://example.com/images/',
  filenameX: '{index}.jpg',
  amountX: 36,

  onReady: (e) => {
    console.log(`Viewer ${e.viewerId} is ready`);
  },

  onSpin: (e) => {
    // Update custom progress indicator
    const progress = ((e.activeImageX + 1) / e.amountX * 100).toFixed(0);
    document.getElementById('progress').textContent = `${progress}%`;
  },

  onFullscreenOpen: () => {
    // Pause background video when entering fullscreen
    document.getElementById('bg-video')?.pause();
  },
};
```

---

## Hotspots

Add interactive markers to highlight product features.

### Configuration

```javascript
const hotspots = [
  {
    id: 'feature-1',
    orientation: 'x',
    containerSize: [1200, 800], // Reference container size for positioning
    positions: {
      0: { x: 500, y: 300 },
      1: { x: 520, y: 300 },
      2: { x: 540, y: null }, // null inherits from previous frame
      3: { x: 560, y: null },
      // ... positions for frames where hotspot is visible
    },
    content: '<div class="tooltip"><strong>Premium Feature</strong><p>Description here</p></div>',
    onClick: () => {
      console.log('Hotspot clicked!');
    },
  },
];

const config = {
  folder: 'https://example.com/images/',
  filenameX: '{index}.jpg',
  amountX: 36,
  hotspots: hotspots,
};
```

### Hotspot Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier |
| `orientation` | Yes | `'x'` or `'y'` axis |
| `containerSize` | Yes | `[width, height]` reference dimensions |
| `positions` | Yes | Object mapping frame index to `{ x, y }` coordinates |
| `content` | Yes | HTML content for the tooltip |
| `label` | No | Short label for the hotspot (used in timeline tooltips) |
| `onClick` | No | Click handler function |

### Hotspot Timeline

When hotspots are configured, a timeline navigation bar automatically appears below the viewer. This timeline shows:

- **Position indicator** - Shows current rotation position
- **Hotspot dots** - One dot per hotspot at its center frame position
- **Hover tooltips** - If a hotspot has a `label`, hovering over its dot shows a tooltip

Clicking a dot animates the viewer to that hotspot's position and optionally shows its popup.

#### Timeline Tooltips

Tooltips display the hotspot's `label` property when hovering over a timeline dot:

```javascript
const hotspots = [
  {
    id: 'engine',
    label: 'Engine Bay',  // This text appears in the tooltip
    orientation: 'x',
    containerSize: [1200, 800],
    positions: { 0: { x: 500, y: 300 }, /* ... */ },
    content: '<div>Full hotspot content here</div>',
  },
];
```

**Tooltip behavior:**
- Appears after a **400ms hover delay** to prevent accidental triggers
- Positioned above the dot with an arrow pointer
- Hidden on mouse leave or click (navigation)

#### Timeline Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `hotspotTimelineOnClick` | `true` | Show hotspot popup when clicking a timeline dot |

```javascript
const config = {
  hotspots: [...],
  hotspotTimelineOnClick: true,  // Show popup on click (default)
  // or
  hotspotTimelineOnClick: false, // Only navigate, don't show popup
};
```

#### Timeline CSS Variables

Customize the timeline appearance with CSS variables:

```css
:root {
  /* Timeline track */
  --ci360-timeline-height: 6px;
  --ci360-timeline-track-bg: rgba(0, 0, 0, 0.12);

  /* Hotspot dots */
  --ci360-timeline-dot-size: 18px;
  --ci360-timeline-dot-color: var(--ci360-hotspot-color);
  --ci360-timeline-dot-border: 2px solid #fff;

  /* Position indicator */
  --ci360-timeline-indicator-size: 12px;
  --ci360-timeline-indicator-color: #333333;

  /* Tooltip styling (matches theme) */
  --ci360-timeline-tooltip-bg: rgba(255, 255, 255, 0.95);
  --ci360-timeline-tooltip-color: #333333;
}

/* Dark theme uses dark tooltip */
.ci360-theme-dark {
  --ci360-timeline-tooltip-bg: rgba(40, 40, 45, 0.95);
  --ci360-timeline-tooltip-color: #e0e0e0;
}
```

**Custom tooltip styling example:**

```css
/* Increase tooltip font size */
.cloudimage-360-hotspot-timeline-tooltip {
  font-size: 14px;
  padding: 8px 16px;
}

/* Brand-colored tooltip */
.my-viewer {
  --ci360-timeline-tooltip-bg: #2563eb;
  --ci360-timeline-tooltip-color: #ffffff;
}
```

---

## Interaction Hints

The viewer displays helpful hints at the bottom showing users how to interact with the 360° view. Hints are automatically generated based on enabled features and hide after the first interaction.

### Configuration

```javascript
const config = {
  // Auto-detect hints based on enabled features (default)
  hints: true,

  // Disable hints
  hints: false,

  // Custom hints array
  hints: ['drag', 'click', 'keys'],
};
```

### Available Hint Types

| Type | Desktop | Mobile | Description |
|------|---------|--------|-------------|
| `drag` | ✓ | - | "Drag to rotate" |
| `swipe` | - | ✓ | "Swipe to rotate" |
| `click` | ✓ | - | "Click to zoom" (when pointerZoom enabled) |
| `pinch` | - | ✓ | "Pinch to zoom" (when pinchZoom enabled) |
| `keys` | ✓ | - | "Use arrow keys" (when keys enabled) |

---

## Styling & Theming

### Built-in Themes

Apply a theme by setting the `theme` option or using the `ci360-theme-dark` class:

```javascript
// Via config
const config = {
  theme: 'dark', // or 'light'
  // ...other options
};

// Or via HTML
<div class="cloudimage-360 ci360-theme-dark" ...></div>
```

### CSS Variables (Recommended)

The easiest way to customize the viewer appearance:

```css
:root {
  /* Buttons */
  --ci360-button-bg: #f0f0f0;
  --ci360-button-bg-hover: #e0e0e0;
  --ci360-button-size: 40px;
  --ci360-button-border-radius: 6px;
  --ci360-button-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Icons */
  --ci360-icon-color: #37414b;
  --ci360-icon-color-hover: #1a1f24;
  --ci360-icon-size: 20px;

  /* 360° Indicator */
  --ci360-initial-icon-bg: rgba(255, 255, 255, 0.9);
  --ci360-initial-icon-color: #505050;
  --ci360-initial-icon-size: 80px;
  --ci360-initial-icon-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* Loading Spinner */
  --ci360-spinner-color: #fff;
  --ci360-spinner-accent: #a3a3a3;
  --ci360-spinner-size: 30px;

  /* Fullscreen */
  --ci360-fullscreen-bg: #fff;

  /* Magnifier */
  --ci360-magnifier-size: 250px;
  --ci360-magnifier-border: 2px solid rgba(0, 0, 0, 0.3);
  --ci360-magnifier-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);

  /* Hotspots */
  --ci360-hotspot-color: #00aaff;
  --ci360-hotspot-border: 1px solid #fff;
  --ci360-hotspot-size: 18px;

  /* Tooltips */
  --ci360-popper-bg: rgba(255, 255, 255, 0.95);
  --ci360-popper-color: #333;
  --ci360-popper-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  --ci360-popper-border-radius: 6px;

  /* Hints Overlay */
  --ci360-hints-bg: rgba(0, 0, 0, 0.75);
  --ci360-hints-color: #ffffff;
  --ci360-hints-font-size: 14px;
  --ci360-hints-border-radius: 12px;

  /* Bottom Circle Indicator */
  --ci360-circle-color-start: rgba(0, 0, 0, 0.05);
  --ci360-circle-color-mid: rgba(0, 0, 0, 0.3);
  --ci360-circle-color-end: rgba(0, 0, 0, 0.05);
  --ci360-circle-dot-color: rgba(0, 0, 0, 0.4);

  /* Other */
  --ci360-focus-color: #0066cc;
  --ci360-overlay-bg: rgba(255, 255, 255, 1);
}
```

### Custom Dark Theme Example

If you prefer to customize beyond the built-in dark theme:

```css
.my-dark-viewer {
  --ci360-button-bg: rgba(30, 30, 35, 0.9);
  --ci360-button-bg-hover: rgba(45, 45, 50, 0.95);
  --ci360-icon-color: #e0e0e0;
  --ci360-icon-color-hover: #ffffff;
  --ci360-fullscreen-bg: #1a1a1f;
  --ci360-initial-icon-bg: rgba(30, 30, 35, 0.9);
  --ci360-initial-icon-color: #e0e0e0;
  --ci360-popper-bg: rgba(40, 40, 45, 0.95);
  --ci360-popper-color: #e0e0e0;
  --ci360-hints-bg: rgba(255, 255, 255, 0.12);
  --ci360-circle-color-mid: rgba(255, 255, 255, 0.25);
  --ci360-circle-dot-color: rgba(255, 255, 255, 0.4);
  --ci360-overlay-bg: rgba(26, 26, 31, 1);
}
```

### Scope to Specific Viewer

```css
#my-special-viewer {
  --ci360-button-bg: #4a90d9;
  --ci360-icon-color: #ffffff;
  --ci360-hotspot-color: #ff6b6b;
}
```

### CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.cloudimage-360` | Main container |
| `.cloudimage-360-inner-box` | Inner container |
| `.cloudimage-360-button` | Control buttons |
| `.cloudimage-360-icons-container` | Button container |
| `.cloudimage-initial-icon` | 360° indicator icon |
| `.cloudimage-360-view-360-circle` | Bottom progress indicator |
| `.cloudimage-loading-spinner` | Loading spinner |
| `.cloudimage-360-fullscreen-modal` | Fullscreen container |
| `.cloudimage-360-img-magnifier-glass` | Magnifier element |
| `.cloudimage-360-hotspot` | Hotspot marker |
| `.cloudimage-360-popper` | Hotspot tooltip |
| `.cloudimage-360-hints-overlay` | Hints overlay container |
| `.cloudimage-360-hints-container` | Hints content box |
| `.cloudimage-360-hotspot-timeline` | Hotspot timeline container |
| `.cloudimage-360-hotspot-timeline-track` | Timeline track |
| `.cloudimage-360-hotspot-timeline-dot` | Timeline hotspot dot |
| `.cloudimage-360-hotspot-timeline-indicator` | Timeline position indicator |
| `.cloudimage-360-hotspot-timeline-tooltip` | Timeline dot tooltip (appears on hover) |
| `.ci360-theme-dark` | Dark theme class |

---

## Methods

### Instance Methods

```javascript
const viewer = new CI360();

// Initialize all viewers with class "cloudimage-360"
viewer.initAll();

// Initialize a specific container
viewer.init(containerElement, config);

// Get a viewer by its container ID
const view = viewer.getViewById('my-viewer');

// Get all viewer instances
const allViews = viewer.getViews();

// Update a viewer's configuration
viewer.updateView('my-viewer', { speed: 50, autoplay: true });
```

### View Methods

```javascript
const view = viewer.getViewById('my-viewer');

// Playback control
view.play();                    // Start autoplay
view.stopAutoplay();            // Stop autoplay

// Rotation (stopAtEdges: boolean, steps: number)
view.moveLeft(false, 5);        // Rotate left by 5 frames
view.moveRight(false, 5);       // Rotate right by 5 frames
view.moveTop(false, 1);         // Rotate up by 1 frame (Y-axis)
view.moveBottom(false, 1);      // Rotate down by 1 frame (Y-axis)

// Navigation
view.animateToFrame(36);        // Animate to frame 36
view.animateToFrame(10, 'hotspot-1'); // Go to frame and show hotspot

// UI control
view.hideAllIcons();            // Hide all overlay icons

// State
view.activeImageX;              // Current X-axis frame (0-indexed)
view.activeImageY;              // Current Y-axis frame (0-indexed)
view.amountX;                   // Total X-axis frames
view.amountY;                   // Total Y-axis frames

// Cleanup
view.destroy();                 // Destroy the viewer
```

---

## Cloudimage Integration

Enhance performance with [Cloudimage](https://cloudimage.io) CDN for responsive, optimized images.

### Setup

1. Register at [cloudimage.io](https://cloudimage.io) to get your token
2. Add the token to your viewer configuration:

```javascript
const config = {
  folder: 'https://your-domain.com/images/',
  filenameX: '{index}.jpg',
  amountX: 36,
  ciToken: 'your-cloudimage-token', // or use data-responsive attribute
};
```

### Benefits

- **25GB free CDN traffic** per month
- **Automatic optimization** - WebP, AVIF conversion
- **Responsive images** - Serve the right size for each device
- **Global CDN** - Fast delivery worldwide
- **Image transformations** - Resize, crop, filters on-the-fly

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 69+ |
| Firefox | 105+ |
| Safari | 16.4+ |
| Edge | 79+ |
| iOS Safari | 16.4+ |
| Android Chrome | 69+ |

> **Note:** This library uses OffscreenCanvas for optimal performance, which requires the browser versions listed above.

---

## Mobile Considerations

### Memory Limitations

Mobile browsers (especially Safari) have strict memory limits that can cause tab crashes when loading many high-resolution images. The library includes built-in optimizations for mobile that are **automatically enabled**:

- **Sequential image loading** (3 concurrent on mobile vs 6 on desktop)
- **Main-thread canvas rendering** (avoids OffscreenCanvas memory issues on Safari)
- **Reduced touch event rate** (30fps vs 100fps on desktop)
- **Capped device pixel ratio** (max 2x on mobile)
- **Automatic memory management** (releases off-screen viewers, frees memory when page backgrounded)

### Recommended Settings for Mobile

| Setting | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| `amountX` | 60-100+ | 30-40 max | Each image uses ~4MB GPU memory |
| `pointerZoom` | ✅ | ❌ | Loads higher-res images |
| `magnifier` | ✅ | ❌ | Loads higher-res images |

### Detecting Mobile Devices

The library automatically detects mobile devices, but you can also adjust your configuration:

```javascript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

const viewer = new CI360();
viewer.init(container, {
  folder: 'https://example.com/images/',
  filenameX: '{index}.jpg',
  amountX: isMobile ? 36 : 72,           // Fewer images on mobile
  pointerZoom: isMobile ? false : 2,     // Disable zoom on mobile
  magnifier: isMobile ? false : 3,       // Disable magnifier on mobile
});
```

### Memory Management API

Memory management is **automatically enabled on mobile**. For desktop or manual control:

```javascript
const viewer = new CI360();
viewer.initAll();

// Manually enable (already auto-enabled on mobile)
viewer.enableMemoryManagement();

// Disable if needed
viewer.disableMemoryManagement();
```

This uses IntersectionObserver to:
- Release memory when viewers scroll off-screen
- Reload images when viewers become visible again
- Release all viewer memory when the page is backgrounded

---

## Migration Guide (v3 → v4)

Version 4 introduces significant improvements in performance, customization, and developer experience. This guide helps you upgrade from v3.

### Breaking Changes

#### 1. CSS Handling

For CDN users, CSS is now auto-injected (same as v3):

```html
<!-- v4: Just include the script -->
<script src=".../js-cloudimage-360-view.min.js"></script>
```

For npm/bundler users, import CSS separately:

```javascript
import CI360 from 'js-cloudimage-360-view';
import 'js-cloudimage-360-view/css';
```

#### 2. Initialization API Changed

```javascript
// v3
window.CI360.init();
window.CI360.add('my-viewer');
window.CI360.update('my-viewer', true);
window.CI360.destroy();

// v4
const viewer = new CI360();
viewer.initAll();                           // Initialize all
viewer.init(container, config);             // Initialize specific container
viewer.updateView('my-viewer', newConfig);  // Update with new config
viewer.getViewById('my-viewer').destroy();  // Destroy specific viewer
```

#### 3. Browser Requirements Changed

v4 uses OffscreenCanvas for performance, requiring newer browsers:

| Browser | v3 | v4 |
|---------|-----|-----|
| Safari | 12+ | **16.4+** |
| iOS Safari | 12+ | **16.4+** |
| Firefox | 55+ | **105+** |
| Chrome | 60+ | 69+ |

### Deprecated Configuration Options

The following options have been removed in v4:

| v3 Option | v4 Alternative |
|-----------|----------------|
| `data-box-shadow` | Use CSS: `.cloudimage-360 { box-shadow: ... }` |
| `data-ratio` | Container automatically maintains aspect ratio |
| `data-lazy-selector` | Use `data-lazyload` (boolean) |
| `data-hide-360-logo` | Use `data-initial-icon` (boolean, inverted) |
| `data-logo-src` | Custom logos not supported; use CSS to hide |
| `data-image-info` | Removed |
| `data-request-responsive-images` | Removed |
| `data-disable-drag` | Use `data-draggable` (inverted: `draggable="false"`) |
| `data-spin-reverse` | Use `data-drag-reverse` and `data-autoplay-reverse` |

### Hotspot Configuration Changes

Hotspot properties have been simplified:

```javascript
// v3 - Multiple specific properties
const hotspot = {
  id: 'feature-1',
  title: 'Feature Title',
  description: 'Description text',
  url: 'https://example.com',
  newTab: true,
  moreDetailsUrl: 'https://example.com/details',
  moreDetailsTitle: 'Learn More',
  popupSelector: '#custom-popup',
  arrow: true,
  placement: 'top',
  offset: [0, 10],
  positions: { 0: { x: 100, y: 200 } },
};

// v4 - Flexible HTML content
const hotspot = {
  id: 'feature-1',
  orientation: 'x',
  containerSize: [1200, 800],
  positions: { 0: { x: 100, y: 200 } },
  content: `
    <div class="my-tooltip">
      <h3>Feature Title</h3>
      <p>Description text</p>
      <a href="https://example.com" target="_blank">Learn More</a>
    </div>
  `,
  onClick: () => console.log('Clicked!'),
};
```

| v3 Property | v4 Alternative |
|-------------|----------------|
| `title`, `description` | Use `content` with HTML |
| `url`, `newTab` | Include `<a>` tag in `content` |
| `moreDetailsUrl`, `moreDetailsTitle` | Include in `content` HTML |
| `popupSelector` | Use `content` with your HTML |
| `arrow`, `placement`, `offset` | Popper.js handles positioning automatically |
| `open` | Removed; hotspots open on click/hover |

### New Features in v4

Take advantage of these new capabilities:

#### CSS Variables for Theming

```css
:root {
  --ci360-button-bg: #f0f0f0;
  --ci360-icon-color: #333;
  --ci360-hotspot-color: #00aaff;
}
```

#### Built-in Themes

```html
<div class="cloudimage-360 ci360-theme-dark" ...></div>
```

#### Event Callbacks

```javascript
const config = {
  onReady: (e) => console.log('Ready'),
  onSpin: (e) => console.log(`Frame: ${e.activeImageX}`),
  onFullscreenOpen: () => console.log('Fullscreen'),
};
```

#### Interaction Hints

```javascript
const config = {
  hints: true,  // Auto-detect hints
  // or
  hints: ['drag', 'click', 'keys'],  // Custom hints
};
```

#### Pinch-to-Zoom (Mobile)

```javascript
const config = {
  pinchZoom: true,  // Enabled by default
};
```

### Quick Migration Checklist

- [ ] Add CSS file import alongside JS
- [ ] Update initialization code to use `new CI360()`
- [ ] Replace `data-disable-drag` with `data-draggable="false"`
- [ ] Replace `data-spin-reverse` with `data-drag-reverse`
- [ ] Replace `data-hide-360-logo` with `data-initial-icon="false"`
- [ ] Update hotspot configs to use `content` instead of individual properties
- [ ] Test on Safari 16.4+ (older versions not supported)
- [ ] Consider adding CSS variables for customization
- [ ] Consider adding event callbacks for analytics/tracking

---

## Contributing

We welcome contributions! Here's how you can help:

- **[Report bugs](https://github.com/Scaleflex/js-cloudimage-360-view/issues)** - Found a bug? Let us know!
- **[Request features](https://github.com/Scaleflex/js-cloudimage-360-view/issues)** - Have an idea? Share it!
- **[Submit PRs](https://github.com/Scaleflex/js-cloudimage-360-view/pulls)** - Code contributions are welcome!
- **[Join discussions](https://github.com/Scaleflex/js-cloudimage-360-view/discussions)** - Ask questions, share insights

### Development Setup

```bash
git clone https://github.com/Scaleflex/js-cloudimage-360-view.git
cd js-cloudimage-360-view
npm install
npm run dev
```

<details>
<summary><strong>Contributors</strong></summary>
<br>
<a href="https://github.com/Scaleflex/js-cloudimage-360-view/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Scaleflex/js-cloudimage-360-view" alt="Contributors">
</a>
</details>

---

## Support

If this library helped your project, consider buying me a coffee!

<a href="https://buymeacoffee.com/dzmitry.stramavus">
  <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee">
</a>

---

## License

This project is licensed under the [MIT License]([https://opensource.org/licenses/MIT](https://github.com/scaleflex/js-cloudimage-360-view/blob/master/LICENSE)).

---

<p align="center">
  Made with care by the <a href="https://www.scaleflex.com">Scaleflex</a> team
</p>
