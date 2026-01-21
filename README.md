<p align="center">
  <a href="https://www.scaleflex.com/en/home">
    <img src="https://scaleflex.cloudimg.io/v7/cloudimage.io/LOGO+WITH+SCALEFLEX-01.png?vh=f6080d&w=350" alt="Cloudimage logo">
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
  <a href="https://github.com/scaleflex/js-cloudimage-360-view/issues">Report Bug</a> ·
  <a href="https://github.com/scaleflex/js-cloudimage-360-view/issues">Request Feature</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration Options](#configuration-options)
- [Event Callbacks](#event-callbacks)
- [Hotspots](#hotspots)
- [Interaction Hints](#interaction-hints)
- [Styling & Theming](#styling--theming)
- [Methods](#methods)
- [Cloudimage Integration](#cloudimage-integration)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
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
<!-- Add CSS and JS -->
<link rel="stylesheet" href="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.css">
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js"></script>

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
<link rel="stylesheet" href="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.css">
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js"></script>
```

> **Important:** Both CSS and JS files are required for proper functionality.

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
| `fullscreen` | `data-fullscreen` | `false` | Show fullscreen button |
| `magnifier` | `data-magnifier` | `null` | Magnifier zoom level (1-5) |
| `pointerZoom` | `data-pointer-zoom` | `0` | Pointer zoom level on click (1-5) |
| `bottomCircle` | `data-bottom-circle` | `true` | Show 360° progress indicator |
| `bottomCircleOffset` | `data-bottom-circle-offset` | `5` | Progress indicator offset (px) |
| `initialIconShown` | `data-initial-icon` | `true` | Show 360° icon on load |
| `lazyload` | `data-lazyload` | `true` | Enable lazy loading |
| `hints` | `data-hints` | `true` | Show interaction hints on load |
| `theme` | `data-theme` | `null` | Color theme: `'light'` or `'dark'` |

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
| `onClick` | No | Click handler function |

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

// Programmatically rotate the view
view.onMoveHandler('right', 1, 0); // Move right by 1 frame
view.onMoveHandler('left', 5, 0);  // Move left by 5 frames
view.onMoveHandler('up', 0, 1);    // Move up by 1 frame (Y-axis)
view.onMoveHandler('down', 0, 1);  // Move down by 1 frame (Y-axis)

// Destroy the viewer
view.destroy();
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

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">
  Made with care by the <a href="https://www.scaleflex.com">Scaleflex</a> team
</p>
