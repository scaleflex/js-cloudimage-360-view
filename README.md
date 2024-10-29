<p align="center">
    <a href="https://www.cloudimage.io/#gh-light-mode-only">
    <img
      alt="cloudimage logo"
      src="https://scaleflex.cloudimg.io/v7/cloudimage.io/LOGO+WITH+SCALEFLEX-01.png?vh=f6080d&w=350">
  </a>
</p>
<p align="center"><h1 align="center">JS Cloudimage 360 View
</h1></p>
<p align="center">
  <em>360 Views, Infinite Possibilities: Unleash the Power of js-cloudimage-360-view!</em>
</p>
<p align="center">
  <a href="https://github.com/scaleflex/js-cloudimage-360-view/releases">
    <img src="https://img.shields.io/github/v/release/scaleflex/js-cloudimage-360-view" alt="Release">
  </a>
  <a href="https://img.shields.io/bundlephobia/min/js-cloudimage-360-view">
    <img src="https://img.shields.io/bundlephobia/min/js-cloudimage-360-view" alt="Size">
  </a>
  <a href="https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange">
    <img src="https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange" alt="Download">
  </a>
  <a href="#contributing">
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg" alt="Contributions welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://www.scaleflex.com/en/home">
    <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20-Scaleflex%20team-6986fa.svg" alt="Scaleflex team">
  </a>
  <a href="https://www.cloudimage.io/en/home">
    <img src="https://img.shields.io/badge/Powered%20by-cloudimage-blue" alt="Cloudimage">
  </a>
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
  <!-- default option, no dependency badges. -->
</p>
<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [⚙️ Installation](#installation)
    - [Option 1: Add via CDN](#option-1-add-via-cdn)
    - [Option 2: Install with Package Manager](#option-2-install-with-package-manager)
  - [🛠️ Usage](#-usage)
  - [⚙️ Configuration Options](#configuration-options)
    - [Method 1: Initialization via JavaScript Code](#method-1-initialization-via-javascript-code)
    - [Method 2: Initialization via Data Attributes](#method-2-initialization-via-data-attributes)
- [🗺️ Hotspots or Markers Configuration](#-hotspots-or-markers-configuration)
- [🗺️ Cloudimage responsive integration](#-cloudimage-responsive-integration)
- [🔧 Methods](#-methods)
  - [getViewById](#getviewbyidid)
  - [getViews](#getviews)
  - [updateView](#updateviewid-config)
  - [onMoveHandler](#onmovehandlermovingdirection-itemsSkippedX-itemsSkippedY)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 Overview

The js-cloudimage-360-view project revolutionizes interactive 360-degree image viewing experiences. With robust build and deployment scripts, it simplifies development processes. Key features include viewer initialization, hotspot functionality, and dynamic configuration utilities. Ideal for e-commerce platforms and virtual tours, it offers immersive and engaging user experiences.

---
## 👾 Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Image Viewing**  | <ul><li>Enables interactive 360-degree image viewing with smooth transitions</li><li>Supports high-resolution images for detailed visualization</li><li>Touch and drag navigation for user-friendly experiences</li></ul> |
| 🔩 | **Customization**  | <ul><li>Offers customizable settings for rotation speed, direction, and initial angle</li><li>Supports multiple display modes and responsive adjustments</li><li>Adaptable to various website designs for seamless integration</li></ul> |
| 📄 | **Documentation** | <ul><li>Comprehensive guides on installation and usage</li><li>Step-by-step instructions for integration and configuration</li><li>Provides examples to help users implement the plugin quickly</li></ul> |
| 🔌 | **Framework Support**  | <ul><li>Easily integrates with popular JavaScript frameworks</li><li>Includes clear instructions for setup in React, Vue, Angular, and vanilla JavaScript</li><li>Adjustable settings to adapt to project requirements</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized for fast loading and minimal resource consumption</li><li>Utilizes lazy loading and caching to improve load times</li><li>Lightweight script ensures minimal impact on page performance</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Minimal dependencies for essential functionality only</li></ul> |

---

## 🚀 Getting Started

 ## ⚙️ Installation

You can install `js-cloudimage-360-view` using one of the following methods:

 ### Option 1: Add via CDN

Include the CDN link to the `js-cloudimage-360-view` library at the end of your `<body>` tag:

```code
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"></script>
```

This is the quickest way to get started without additional setup.
 #### Option 2: Install with Package Manager

You can add `js-cloudimage-360-view` to your project using either npm or Yarn:

For npm:

```sh
npm install js-cloudimage-360-view
```

For Yarn:

```sh
yarn add js-cloudimage-360-view
```

Then, import it in your JavaScript file:

```javascript
import CloudImage360 from 'js-cloudimage-360-view';
```

OR

```javascript
window.CI360
```


Choose the method that best suits your project setup, and refer to the documentation for configuration options and usage examples.

### 🛠️ Usage

To use `js-cloudimage-360-view`, you need to initialize an instance of the viewer. You can either initialize a specific view or initialize all instances with a common selector.

#### Initialize a Single View

To initialize a single 360-degree view, use the following code:

```javascript
const cloudimage360 = new CloudImage360();

const suvCarContainer = document.getElementById('gurkha-suv');

const config = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/',
  filenameX: 'orange-{index}.jpg',
  amountX: 73,
  responsive: 'scaleflex',
};

instance.init(suvCarContainer, config);
```

#### Initialize All Instances

To initialize all instances with a common selector, use the following code:

```javascript
instance.initAll('.cloudimage-360');
```

This will apply the 360-degree viewer to all elements matching the specified selector.


### ⚙️ Configuration Options

When initializing the `js-cloudimage-360-view`, you can customize various configuration options. Below is a list of available options, their required status, default values, and the corresponding data attributes you can use in HTML.

#### Method 1: Initialization via JavaScript Code
To initialize a view programmatically, use the following configuration options:


#### Method 2: Initialization via Data Attributes
You can also initialize the view using HTML data attributes, which correspond to the configuration options listed below.

For example:
```html
<div id="gurkha-suv"
     data-folder="/path/to/images/"
     data-api-version="v7"
     data-amount-x="73"
     data-speed="80"
     data-draggable="true">
</div>
```
| Option               | Data Attribute            | Required | Default Value                                   | Description                                       |
| ---------------------| --------------------------| -------- | ----------------------------------------------- | ------------------------------------------------- |
| `folder`             | `data-folder`             | Yes       | `'/'`                                          | The path to the folder containing the images.     |
| `apiVersion`         | `data-api-version`        | No       | `'v7'`                                        | The API version to use.                           |
| `filenameX`         | `data-filename-x`         | Yes      | `'image-{index}.jpg'`                         | The filename pattern for the X-axis images.      |
| `filenameY`         | `data-filename-y`         | No       | `null`                                        | The filename pattern for the Y-axis images (optional). |
| `imageListX`        | `data-image-list-x`       | No       | `null`                                        | An array of images for the X-axis (optional).    |
| `imageListY`        | `data-image-list-y`       | No       | `null`                                        | An array of images for the Y-axis (optional).    |
| `indexZeroBase`      | `data-index-zero-base`    | No       | `0`                                           | Whether the index starts from 0.                  |
| `amountX`           | `data-amount-x`           | Yes      | `0`                                           | Total number of X-axis images.                    |
| `amountY`           | `data-amount-y`           | No       | `0`                                           | Total number of Y-axis images (optional).         |
| `speed`             | `data-speed`              | No       | `80`                                          | The speed of the rotation in milliseconds.        |
| `dragSpeed`         | `data-drag-speed`         | No       | `150`                                         | The speed when dragging the image.                |
| `draggable`         | `data-draggable`          | No       | `true`                                        | Enables dragging functionality.                    |
| `swipeable`         | `data-swipeable`          | No       | `true`                                        | Enables swipe functionality on touch devices.     |
| `keys`              | `data-keys`               | No       | `false`                                       | Enables keyboard navigation.                       |
| `keysReverse`       | `data-keys-reverse`       | No       | `false`                                       | Reverses keyboard navigation controls.             |
| `autoplay`          | `data-autoplay`           | No       | `false`                                       | Automatically plays the rotation.                 |
| `autoplayBehavior`   | `data-autoplay-behavior`  | No       | `AUTOPLAY_BEHAVIOR.SPIN_X`                    | Defines how autoplay behaves.                      |
| `playOnce`          | `data-play-once`          | No       | `false`                                       | Plays the animation only once.                    |
| `autoplayReverse`    | `data-autoplay-reverse`   | No       | `false`                                       | Plays the autoplay in reverse.                     |
| `pointerZoom`       | `data-pointer-zoom`       | No       | `0`                                           | Defines the zoom level on pointer hover.          |
| `fullscreen`        | `data-fullscreen`         | No       | `false`                                       | Enables fullscreen mode.                          |
| `magnifier`         | `data-magnifier`          | No       | `null`                                        | Defines the magnification level (optional).       |
| `bottomCircle`      | `data-bottom-circle`       | No       | `true`                                        | Displays the bottom circle navigation.             |
| `bottomCircleOffset` | `data-bottom-circle-offset`| No      | `5`                                           | The offset of the bottom circle from the container.|
| `ciToken`           | `data-responsive`          | No       | `null`                                        | Token for Cloudimage API authentication (optional). [🗺️ Cloudimage responsive integration](#-cloudimage-responsive-integration)  |
| `ciFilters`         | `data-filters`            | No       | `null`                                        | Filters applied to Cloudimage images (optional).  |
| `ciTransformation`  | `data-transformation`      | No       | `null`                                        | Transformations for Cloudimage images (optional). |
| `lazyload`          | `data-lazyload`           | No       | `true`                                        | Enables lazy loading of images.                   |
| `dragReverse`       | `data-drag-reverse`       | No       | `false`                                       | Reverses drag direction.                          |
| `stopAtEdges`       | `data-stop-at-edges`      | No       | `false`                                       | Stops the rotation at the edges.                  |
| `imageInfo`         | `data-info`               | No       | `false`                                       | Displays image information.                        |
| `initialIconShown`  | `data-initial-icon`       | No       | `true`                                        | Shows the initial icon on load.                   |


The library will automatically read these attributes to configure the instance.

### 🗺️ Hotspots or Markers Configuration

An array defines the configuration for hotspots or markers that can be displayed on the 360 view. Each hotspot can provide additional information or interactivity.
#### Hotspot Configuration Structure
Each hotspot configuration consists of the following properties:

| Property              | Required | Description                                                                                           |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `id`                  | Yes      | A unique identifier for the hotspot.                                                                  |
| `orientation`         | Yes      | The orientation of the hotspot (e.g., `'x'` for X-axis).                                            |
| `containerSize`       | Yes      | An array defining the width and height of the container in pixels (e.g., `[width, height]`). This size represents the dimensions of the container when you first start setting the hotspots.       |
| `positions`           | Yes      | An object where keys are indices (image indexes) representing the position of the hotspot for specific images. |
| `content`             | Yes      | HTML content to display in the tooltip when the hotspot is hovered or clicked.                       |
| `onClick`             | No       | A function that defines the behavior when the hotspot is clicked (optional).                        |

#### Positions
The `positions` property is an object where:
- The key is the index of the image in the 360 view (e.g., 6, 7, 8, ...).
- The value is an object with `x` and `y` properties, representing the coordinates of the hotspot on the image.

If either the `x` or `y` value is `null`, it means that the hotspot will take the coordinates from the previous defined position for that index.

For example:
```javascript
positions: {
  6: { x: 607, y: 246 },
  7: { x: 619, y: null }, // y is null, so it takes the previous y (246)
  8: { x: 630, y: null }, // y is null, so it takes the previous y (246)
  9: { x: 637, y: null }, // y is null, so it takes the previous y (246)
  10: { x: 642, y: null }, // y is null, so it takes the previous y (246)
},
```

#### Example Hotspot Configuration
Here's an example configuration for multiple hotspots:
```javascript
const GURKHA_SUV_HOTSPOTS_CONFIG = [
  {
    id: 'hotspot-1',
    orientation: 'x',
    containerSize: [1170, 663],
    positions: {
      0: { x: 527, y: 319 },
      1: { x: 527, y: 319 },
      2: { x: 527, y: null }, // Takes the previous position
      3: { x: 498, y: null }, // Takes the previous y (319)
      4: { x: 470, y: null }, // Takes the previous y (319)
      // Additional positions...
    },
    content: '<div class="tooltip">Info about Hotspot 1</div>',
  },
  // Additional hotspots...
];
```
In the example above, the keys (0, 1, 2, 3, 4, ...) represent image indexes. If the `y` value is `null`, it inherits the `y` coordinate from the previous defined position. This allows for easier configuration and reduces redundancy.

### 🎨 Styling
The following class names are used for styling various elements within the 360-degree viewer and hotspot functionality. Each class serves a specific purpose in controlling the appearance and behavior of the component.
| Class Name                             | Description                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `cloudimage-360-transition-overlay`        | Applies styling for the overlay that appears during transitions.                                        |
| `cloudimage-360-button`                | Styles the main button for interacting with the 360 view.                                               |
| `cloudimage-360-magnifier-button`     | Styles the button that activates the magnifier feature within the 360 view.                             |
| `cloudimage-loading-spinner`           | Styles the loading spinner displayed while the images are being loaded.                                 |
| `cloudimage-initial-icon`              | Styles the initial icon displayed before the 360 view is fully loaded.                                  |
| `cloudimage-360-icons-container`       | Styles the container for all icons associated with the 360 view (e.g., buttons, overlays).              |
| `cloudimage-360-hotspot-container`     | Styles the container that holds the hotspots or markers in the 360 view.                                |
| `cloudimage-360-fullscreen-modal`     | Styles the modal that appears when the 360 view is in fullscreen mode.                                  |
| `cloudimage-360-fullscreen-button`    | Styles the button that toggles the fullscreen mode of the 360 view.                                     |
| `cloudimage-360-close-icon`           | Styles the close icon used to exit the fullscreen view.                                                |
| `cloudimage-360-view-360-circle`      | Styles the circular view area of the 360 images.                                                       |
| `cloudimage-360-popper`                | Styles the popper element for displaying tooltips or additional information on hover or click.          |
| `cloudimage-360-hotspot`               | Styles individual hotspots within the 360 view, allowing for customizable appearance and behavior.       |

Customize these class names in your CSS files to match your application's design requirements.


## Methods

### `getViewById(id)`
Returns the view object associated with the specified ID.

```javascript
getViewById(id)
```

### `getViews()`
Returns an array of all the view objects currently available.

```javascript
getViews()
```

### `updateView(id, config)`
Updates the configuration of an existing view identified by its ID. If the configuration has changed significantly, the view will be destroyed and reinitialized; otherwise, it will simply be updated.

```javascript
updateView(id, config)
```

### View Methods

#### `onMoveHandler(movingDirection, itemsSkippedX = 1, itemsSkippedY = 1)`
Handles the movement of items in the view. It takes a direction and the number of items to skip horizontally and vertically.

```javascript
onMoveHandler(movingDirection, itemsSkippedX = 1, itemsSkippedY = 1)
```

 **Parameters:**
- `movingDirection`: A string indicating the direction of movement (`'right'`, `'left'`, `'top'`, or `'bottom'`).
- `itemsSkippedX`: The number of items to skip in the horizontal direction (default is 1).
- `itemsSkippedY`: The number of items to skip in the vertical direction (default is 1).

---

## Cloudimage Responsive Integration

### Overview

Integrating Cloudimage for responsive images enhances the loading speed and performance of your website. This service delivers optimized images over a Content Delivery Network (CDN), ensuring that your images are served quickly and efficiently, regardless of the user's location.

### How It Works

To see how Cloudimage transforms image delivery for responsive design, check out the [full article on Medium](https://medium.com/cloudimage/responsive-images-in-2019-now-easier-than-ever-b76e5a43c074). The article details the importance of responsive images in modern web development and how Cloudimage simplifies the process.

### Requirements

Before you start using the Cloudimage Responsive plugin, make sure you have the following:

- **Cloudimage Token**: You'll need a unique Cloudimage token to deliver your images over their CDN.

  **Getting Your Token**:
  - Register at the [Cloudimage website](https://cloudimage.io).
  - After registration, you'll receive a token that allows you to access their services.

  The token grants you **25GB of image cache** and **25GB of worldwide CDN traffic per month** for free. This is perfect for startups and small projects looking to enhance their website's performance without incurring costs.


## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/Scaleflex/js-cloudimage-360-view/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Scaleflex/js-cloudimage-360-view/issues)**: Submit bugs found or log feature requests for the `js-cloudimage-360-view` project.
- **💡 [Submit Pull Requests](https://github.com/Scaleflex/js-cloudimage-360-view/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Scaleflex/js-cloudimage-360-view
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Scaleflex/js-cloudimage-360-view/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Scaleflex/js-cloudimage-360-view">
   </a>
</p>
</details>

---

## 🎗 License

JS Cloudimage 360 View is provided under the [MIT License](https://opensource.org/licenses/MIT)
