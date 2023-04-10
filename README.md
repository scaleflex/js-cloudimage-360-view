[![Release](https://img.shields.io/github/v/release/scaleflex/js-cloudimage-360-view)](https://github.com/scaleflex/js-cloudimage-360-view/releases)
[![Size](https://img.shields.io/bundlephobia/min/js-cloudimage-360-view)](https://img.shields.io/bundlephobia/min/js-cloudimage-360-view)
[![Download](https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange)](https://img.shields.io/npm/dt/js-cloudimage-360-view?logoColor=orange)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20-Scaleflex%20team-6986fa.svg)](https://www.scaleflex.com/en/home)
[![Cloudimage](https://img.shields.io/badge/Powered%20by-cloudimage-blue)](https://www.cloudimage.io/en/home)

<p align="center">
	<a href="https://www.cloudimage.io/#gh-light-mode-only">
		<img
			alt="cloudimage logo"
			src="https://scaleflex.cloudimg.io/v7/cloudimage.io/LOGO+WITH+SCALEFLEX-01.png?vh=f6080d&w=350">
	</a>
		<a href="https://www.cloudimage.io/#gh-dark-mode-only">
		<img
			alt="cloudimage logo"
			src="https://scaleflex.cloudimg.io/v7/cloudimage.io/cloudimage-logo-light.png?vh=b798ab&w=350">
	</a>
</p>

<h1 align="center">
   JS Cloudimage 360 View
</h1>

<p align="center">
	<strong>
		<a href="#table_of_contents">Docs</a>
		•
		<a href="https://scaleflex.github.io/js-cloudimage-360-view/" target="_blank">Demo</a>
		•
		<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-npne18" target="_blank">Code Sandbox</a>
		•
		<a href="https://youtu.be/zXUgrvZ7FMc" target="_blank">Video Tutorial</a>
		•
		<a href="https://medium.com/cloudimage/e-merchandising-how-can-a-360-view-of-your-products-boost-your-revenue-24b16eb9cd62" target="_blank">Why</a>
	</strong>
</p>
<p align="center">A simple, interactive resource that can be used to provide a virtual tour of your product.</p>
<p align="center">
	<img
		alt="The Lounge"
		src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/demos/assets/a2.gif">
</p>

## <a name="table_of_contents"></a>Table of contents

* [Demo](#demo)
* [Step 1: Installation](#installation)
* [Step 2: Initialize](#initialize)
* [Methods](#methods)
* [Customize elements](#customize-elements)
* [Configuration](#configuration)
* [Controls](#controls)
* [Spin in X and Y axis](#spin_x_y)
* [Hotspots or Markers](#hotspots)
* [Cloudimage responsive integration](#cloudimage-responsive-integration)
* [Lazy loading integration](#lazy-loading)
* [Best practices](#best-practices)
* [Browser support](#browser_support)
* [Filerobot UI Family](#ui_family)
* [Contributing](#contributing)
* [License](#license)


## <a name="demo"></a> Demo

To see the Cloudimage 360 view plugin in action, please check out the
[Demo page](https://scaleflex.github.io/js-cloudimage-360-view/).

## <a name="installation"></a>Step 1: Installation

Add script tag with CDN link to js-cloudimage-360-view lib after all content in body tag

```javascript
<script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"></script>
```

## <a name="initialize"></a>Step 2: Initialize

After adding the js-cloudimage-360-view lib, simply initialize it with **class name "cloudimage-360"**,
**server folder path**, **file name** and amount of images:

```html
<div
   class="cloudimage-360"
   id="gurkha-suv"
   data-folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
   data-filename-x="orange-{index}.jpg"
   data-amount-x="73"
></div>
```

<a href="https://codesandbox.io/s/js-cloudimage-360-view-example-l7ce4h"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

## <a name="methods"></a> Methods

### init

###### Type: **Function**

Initialization of js cloudimage 360 view plugin.

```javascript
window.CI360.init();
```

> NOTE: initialization of the plugin runs on the script load. In case you need to postpone the initialization of the plugin you can disable it with **notInitOnLoad** param
> ```javascript
> <script>window.CI360 = { notInitOnLoad: true }</script>
> <script src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/3.0./js-cloudimage-360-view.min.js"></script>
> <script>window.CI360.init(); // initialize the plugin when you need</script>
> ```

### add

###### Type: **Function**

```javascript
window.CI360.add(idOftheView: string);
```
lazy init cloudimage-360 view by id.
###### arguments
`idOftheView`: string
The id of the new view

<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-vxlmoi"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### update

###### Type: **Function**
```javascript
window.CI360.update(idOftheView, forceUpdate);
```
Update cloudimage 360 viewer instance.<br/>
For any update in source attributes after plugin initialization (e.g. `data-folder`, `data-filename-x`, `data-amount-y`),
the plugin will re-init.
###### arguments
`idOftheView`: string
The id of the new view

`forceUpdate`: bool
Force the view to reinitialize.

```html
<div
   class="cloudimage-360"
   id="gurkha-suv"
   data-folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
   data-filename-x="orange-{index}.jpg"
   data-amount-x="73"
></div>
```
```javascript
window.CI360.update('gurkha-suv');
```

```javascript
window.CI360.update(null, true);
```

<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-n7m04e"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### destroy

###### Type: **Function**

Destroying a cloudimage 360 viewer instance will reset the HTML to its original state.

```javascript
window.CI360.destroy();
```
<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-03pb2t">
	<img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### getActiveIndexByID

###### Type: **Function**

Get the {index} of the image that is being viewed.

```javascript
window.CI360.getActiveIndexByID(idOfInstance: string, oriantation: string);
```
###### arguments
`idOfInstance`: string
The id of the instance

`oriantation`: string
The oriantation of the active index

## <a name="customize-elements"></a> Customize elements

You can customize elements by adding the following classes:

### Example CSS
```css
.cloudimage-360-icons-container {
	top: 5px;
  	right: 5px;
}
.cloudimage-360-fullscreen-modal {
	top: 0;
  	bottom: 0;
}
.cloudimage-360-magnifier-icon {
	background: url(https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/loupe.svg) 50% 50% / cover no-repeat;
}
.cloudimage-360-close-fullscreen-icon {
	background: url(https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/cross.svg) 50% 50% / cover no-repeat;
}
.cloudimage-360-view-360-circle {
  	margin: auto;
}
.cloudimage-360-loader {
	margin: auto;
}
.cloudimage-360-view-360-icon {
	background: url(https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/360_view.svg) 50% 50% / cover no-repeat;
}
.cloudimage-360-box-shadow {
	top: 0;
  	left: 0;
}
.cloudimage-360-img-magnifier-glass {
	border: 3px solid #000;
  	border-radius: 50%;
}
```

## <a name="configuration"></a> Config

### class

###### Type: **String** | Value: **"cloudimage-360"** | _required_

The selector for js-cloudimage-360-view lib.

### data-folder (or folder)

###### Type: **String(url)** | _required_

Your images folder on server.
### data-api-version (or api-version)

###### Type: **String** |Default: **'v7'** | _optional_

Allow to use a specific version of API.

- set a specific version of API
```javascript
data-api-version="v7"
```
- disable API version
```javascript
data-api-version="null"
```
### data-filename-x (or filename-x)

###### Type: **String** | Default: **image-{index}.jpg** | _optional_

The filename pattern for your 360 image. Must include {index}, which the library will replace with a number between 1 and [data-amount-x](#data-amount-x).

### data-filename-y (or filename-y)

###### Type: **String** | Default: **image-y-{index}.jpg** | _optional_
The same for [data-amount-x](#data-amount-x) but for images set in Y-axis.

### data-amount-x (or amount-x)
###### Type: **Number** | Default: **36** | _optional_

Amount of images to load in X-axis for 360 view .

### data-amount-y (or amount-y)

###### Type: **Number** | Default: **0** | _optional_

Amount of images to load in Y-axis for 360 view.

### data-keys (or keys)

###### Type: **Bool** | Default: **false** | _optional_

Support for 360 spin by pressing arrow keys on keyboard.

### data-keys-reverse (or keys-reverse)

###### Type: **Bool** | Default: **false** | _optional_

invert arrow keys on keyboard.

### data-autoplay (or autoplay)

###### Type: **Bool** | Default: **false** | _optional_

Autoplay 360 spin view on load.

### data-play-once (or autoplay)

###### Type: **Bool** | Default: **false** | _optional_

stops the autoplay after one complete cycle.

### data-autoplay-behavior (or autoplay-behavior)

###### Type: **String** | Default: **spin-x** | _optional_

Changing autoplay behavior

Available behaviors (spin-x, spin-y, spin-xy, spin-yx)

### data-fullscreen (or fullscreen)
###### Type: **Bool** | Default: **false** | _optional_

Open 360 spin view in full screen modal.

### data-magnifier (or magnifier)

###### Type: **Number** | Default: **none** | _optional_

Magnifier to zoom image.

### data-ratio (or ratio)
###### Type: **Number** (width / height) or JSON object | Default: **none** | _optional_
#### `ratio`: string

Setting the height relative to the container width according to the provided ratio</br>

```html
<div
   class="cloudimage-360"
   id="gurkha-suv"
   data-folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
   data-filename-x="orange-{index}.jpg"
   data-amount-x="73"
   data-ratio="2"
></div>
```
<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-865iz5"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>
#### `ratio`: JSON
Setting the height relative to the container width at any window size.

In the following example, the height should be 1.3 the container width at window size less than or equal to 567px
and 2.22 at window size less than or equal to 768px.

```html
<div
   class="cloudimage-360"
   id="gurkha-suv"
   data-folder="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/"
   data-filename-x="orange-{index}.jpg"
   data-amount-x="73"
   data-ratio='{
      "576": "1.3",
      "768": "2.22",
      "992": "2.23",
      "1200": "3",
      "2400": "3.2"
   }'
></div>
```
<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-xzx8no"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### data-autoplay-reverse (or autoplay-reverse)

###### Type: **Bool** | Default: **false** | _optional_

Autoplay 360 spin view on load.

### data-disable-drag (or disable-drag)

###### Type: **bool** | Default: **false** | _optional_

disable mouse drag.

### data-speed (or speed)

###### Type: **Number** | Default: **150** | _optional_

Speed of changing frames for autoplay in milliseconds.

### data-drag-speed (or drag-speed)

###### Type: **Number** | Default: **150** | _optional_

Speed Factor of changing frames on drag event.

### data-spin-reverse (or spin-reverse)

###### Type: **Bool** | Default: **false** | _optional_

Spin direction, by default it uses counterclockwise (image indexes from 1 to data-amount-x).

### data-box-shadow (or box-shadow)

###### Type: **String** (e.g. data-box-shadow="inset 0 0 100px #222") | Default: **none** | _optional_

Apply box shadow for container.

### data-bottom-circle (or bottom-circle)

###### Type: **Bool** | Default: **false** | _optional_

Display 360 view line at the bottom of container.

### data-hide-360-logo (or hide-360-logo)

###### Type: **Bool** | Default: **false** | _optional_

Hide 360 view icon.

### data-control-reverse (or control-reverse)

###### Type: **Bool** | Default: **false** | _optional_

Spin direction using controls, by default it uses counterclockwise (image indexes from 1 to data-amount-x).

### data-stop-at-edges (or stop-at-edges)

###### Type: **Bool** | Default: **false** | _optional_

Blocks repeating images after reaching last image (or first image in opposite direction)

### data-bottom-circle-offset (or bottom-circle-offset)

###### Type: **Number** | Default: **5** | _optional_

Bottom offset for 360 view line.

### data-index-zero-base (or index-zero-base)

###### Type: **Number** | _optional_

Left zero padding on filename. For example: index-zero-base="4" => image index will be "0004"

### data-image-list-x (or data-image-list-x)
###### Type: **Array** | _optional_

Option to add list of images in x-oriantation instead of `folder` , `filename-x` & `amount-x`.

example:

```javascript
data-folder="https://scaleflex.cloudimg.io/v7/demo/360-car/"
data-image-list-x='[
   "iris-1.jpeg",
   "iris-4.jpeg",
   "https://scaleflex.cloudimg.io/v7/demo/360-car/iris-12.jpeg",
   "https://scaleflex.cloudimg.io/v7/demo/360-car/iris-15.jpeg"
   ]’
```

### data-image-list-y (or data-image-list-y)

###### Type: **Array** | _optional_

Option to add list of images in y-oriantation instead of `folder` , `filename-y` & `amount-y`.

example:

```javascript
data-folder="https://scaleflex.cloudimg.io/v7/demo/360-car/"
data-image-list-y='[
   "iris-2-y.jpeg",
   "iris-6-y.jpeg",
   "https://scaleflex.cloudimg.io/v7/demo/360-car/iris-8-y.jpeg",
   "https://scaleflex.cloudimg.io/v7/demo/360-car/iris-30-y.jpeg"
   ]’
```
### data-pointer-zoom (or pointer-zoom)

###### Type: **Number** | Default: **none** | _optional_

Option to scale images on click on it to provided value.

example:

```javascript
data-pointer-zoom="3"
```

### data-lazyload (or lazyload)

###### Type: **Bool** | Default: **false** | _optional_

Only 360 view images close to the client's viewport will be loaded, hence accelerating the page loading time. If set to true, an additional script must be included, see [Lazy loading](#lazy-loading)
### data-lazyload-selector (or lazyload-selector)

###### Type: **String** | Default: **lazyload** | _optional_

Helper class to apply lazy-loading depending on library you choose, see [Lazy loading](#lazy-loading)


## <a name="controls"></a> Controls

You can add controls by adding elements with the following classes: **cloudimage-360-left**, **cloudimage-360-right**, **cloudimage-360-top**, **cloudimage-360-bottom

### Example CSS
```css
.cloudimage-360 .cloudimage-360-left, .cloudimage-360 .cloudimage-360-right {
	padding: 8px;
	background: rgba(255, 255, 255, 0.5);
	border: none;
	border-radius: 4px;
}
.cloudimage-360 .cloudimage-360-left:focus, .cloudimage-360 .cloudimage-360-right:focus {
	outline: none;
}
.cloudimage-360 .cloudimage-360-left {
	display: none;
	position: absolute;
	z-index: 100;
	top: calc(50% - 15px);
	left: 20px;
}
.cloudimage-360 .cloudimage-360-right {
	display: none;
	position: absolute;
	z-index: 100;
	top: calc(50% - 15px);
	right: 20px;
}
.cloudimage-360 .cloudimage-360-left:before, .cloudimage-360 .cloudimage-360-right:before {
	content: '';
	display: block;
	width: 30px;
	height: 30px;
	background: 50% 50% / cover no-repeat;
}
.cloudimage-360 .cloudimage-360-left:before {
	background-image: url('https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/assets/img/arrow-left.svg');
}
.cloudimage-360 .cloudimage-360-right:before {
	background-image: url('https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/assets/img/arrow-right.svg');
}
.cloudimage-360 .cloudimage-360-left.not-active, .cloudimage-360 .cloudimage-360-right.not-active {
	opacity: 0.4;
	cursor: default;
}
```
### Example HTML
```html
<div
	class="cloudimage-360"
	data-folder="https://scaleflex.cloudimg.io/v7/demo/360-car/"
	data-filename-x="{index}.jpeg"
>
	<button class="cloudimage-360-left"></button>
	<button class="cloudimage-360-right"></button>
	<button class="cloudimage-360-top"></button>
	<button class="cloudimage-360-bottom"></button>
</div>
```

<a href="https://codesandbox.io/s/js-cloudimage-360-view-examples-npne18"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

## <a name="spin_x_y"/> Spin in X and Y axes
Allow the view to spin in both X, Y axes
### Requirements
We need to provide the `file-name` of the y-axis images using <a href="#data-filename-y-or-filename-y">data-filename-y</a>

Also as we did for the x-axis if we are intializing the view using <a href="#data-folder-or-folder">data-folder</a> and <a href="#data-filename-y-or-filename-y">data-filename-y</a>
so we need to provide <a href="#data-amount-y-or-amount-y">data-amount-y</a> which indicates the number of images on the y-axis.
example:

```javascript
<div
   class="cloudimage-360"
   data-folder="https://scaleflex.cloudimg.io/v7/demo/360-nike/"
   data-filename-x="nike-{index}.jpg"
   data-filename-y="nike-y-{index}.jpg"
   data-amount-x="35"
   data-amount-y="36"
>
</div>
```
<a href="https://codesandbox.io/s/js-cloudimage-360-view-wc9j12?file=/index.html"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a></br>
> Note: We can initilize the view in x, y axes without providing add `data-folder`, `data-amount-y`, `data-amount-y`.</br>
Just we need to provide the <a href="#data-amount-y-or-amount-y">data-amount-y</a>
## <a name="hotspots"/> Hotspots or Markers
Display information about the product on specific areas. Once a hotspot is created it can be used on more than one image.
### Requirements
First, we need to set `data-hotspots` attribute to the view we want to add hotspots or markers on it, to prevent the plugin to init the view without hotspots config.
Also we need to set an `id` attribute, we will need it to link the view with the hotspots config.

### Create hotspots configuration
The hotspots config should be an array of objects, each object in the array indicates a single hotspot config.
For each item in the array, we need to set the positions (X-coord and Y-coord) of the hotspot at every image index we need to show the hotspot on it. <br>hint: To know the current image index we will need to set `data-info="white || black"` attribute.

example:

```js
const HOTSPOTS_CONFIG = [
 {
  positions: [
   { imageIndex: 0, xCoord: 527, yCoord: 319 },
   { imageIndex: 1, xCoord: 524 },
   { imageIndex: 2, xCoord: 520 },
   { imageIndex: 3, xCoord: 498 },
   { imageIndex: 4, xCoord: 470 },
   { imageIndex: 5, xCoord: 441 },
  ]
 }
]
```
In the previous example, we have only set the Ycoord a single time at the image index 0.
So if the coord didn't change there's no need to reset it, it will already take the previous value.

Now we need to set the hotspot variant, we have three types of hotspots (link, popup, and custom), as it will be explained below.
## Variant
### Link
we need to provide the URL of the link and the link title.

example:

```js
const HOTSPOTS_CONFIG = [
 {
  positions,
  variant: {
  title: 'New Gurkha Technical Specifications',
  url: 'https://www.forcegurkha.co.in/specifications/',
  newTab: true
  }
 }
]
```
---
### Popup
Only the property inserted will displayed.
| Property  |Type | Default | Description |
| ------------- | ------------- | ------------- |------------- |
| images  | Array| [] | To display a carousel of images we need an array of objects, each object should include the src and the alt of each image  |
| title  |String| null | Display title underneath the images  |
| description| String | null | Display description underneath the title  |
| moreDetailsUrl | String | null | Display a button underneath the description to navigate to a provided URL |
| moreDetailsTitle  | String | null| Set the title of the more details button  |

   example:
```js
const HOTSPOTS_CONFIG = [
 {
  positions,
  variant: {
   images: [
    { src: 'https://scaleflex.cloudimg.io/v7/demo/360-assets/AIR_SNORKEL_FINAL_JPG.png?vh=88bccb', alt: 'air snorkel' }
   ], // optional
   title: 'Air Intake Snorkel', // optional
   description: 'The snorkel gives the Gurkha an unmatched water-wading ability and ensures ample supply of fresh air for combustion.', // optional
   moreDetailsUrl: 'https://forcegurkha.co.in', // optional
   moreDetailsTitle: 'Read more' // optional
  }
 }
]
```
---
### Custom
Display any element in the DOM in a popup and link it with the hotspot.</br>
We will need to set the variant property value to the id of the element.

example:
```js
const HOTSPOTS_CONFIG = [
 {
  positions,
  variant: 'gurkha-suv'
 }
]
```
## PopupProps
Options to customize the hotspot popup.
### Properties
| Property  | Type | Defaullt |Description |
| ------------- | ------------- | ------------- | ------------- |
| popupSelector |String| null |Set className to the popup wrapper  |
| open |Boolean | false |Open the popup  |
| arrow |Boolean| true |Dipslay an arrow that points toward the hotspot element|
| offset|Array | [0, 0] |Set a distance between the hotspot element and the popup  |
| placement|String| Auto|- we can adjust the position of the hotspot popup relative to the hotspot element. (top - bottom - left - right)|


example:
```js
const HOTSPOTS_CONFIG = [
 {
  positions,
  variant,
  popupProps: {
   popupSelector: 'air-intake-popup', // optional
   offset: [20, 5], // optional
   arrow: false, // optional
   placement: 'bottom' // optional
  },
  indicatorSelector: 'first-hotspot-icon' // optional
 }
]
```
## Responsive hotspots
Now we need to make our hotspots responsive to have an accurate positioning in different screens.
we have to set `initialDimensions` property to every hotspot config. which indicates the dimension of the cloudimage-360 view.<br/>
hint: `data-info` can be used to get view size.

example:
```js
const HOTSPOTS_CONFIG = [
 {
   positions,
   variant,
   popupProps,
   indicatorSelector,
   initialDimensions: [ 1170, 662 ]
 }
]
```
## Add Hotspots
we need this function to link the created config with the 360-view.
```js
window.CI360.addHotspots(idOftheView, hotspotsConfig);
```
example:
```js
window.CI360.addHotspots("gurkha-suv", HOTSPOTS_CONFIG);
```
<a href="https://codesandbox.io/s/competent-bogdan-49b0u6"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### data-responsive (or responsive)

###### Type: **String** (Cloudimage token) | Default: **none** | _required for cloudimage responsive plugin_

Enables cloudimage responsive plugin for 360 view.

## <a name="cloudimage-responsive-integration"/> Cloudimage Responsive Integration

[See how it works (article on Medium)](https://medium.com/cloudimage/responsive-images-in-2019-now-easier-than-ever-b76e5a43c074)

### Requirements

To use the Cloudimage Responsive plugin, you will need a
Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by
registering [here](https://www.cloudimage.io/en/register_page).
Once your token is created, you can configure it as described below.
This token allows you to use 25GB of image cache and 25GB of worldwide
CDN traffic per month for free.

### data-responsive (or responsive)

###### Type: **String** (Cloudimage token) | Default: **none** | _required for cloudimage responsive plugin_

Enables cloudimage responsive plugin for 360 view.

### data-request-responsive-images (or request-responsive-images)

###### Type: **Bool** | Default: **false**

Request new images on resize, based on the container width.

### data-transformation (or transformation)

###### Type: **String** | Default: **none** | _optional_

Applies Cloudimage resize operations to your image, e.g. width, height, crop, face crop, rotate, prevent enlargement...
Multiple transformation operations can be applied to your image, separated by "```&```" (Ampersand).
example:

```html
data-transformation="w=400&h=200&func=fit"
```

[Full documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/image-resizing)

### data-filters (or filters)

###### Type: **String** | Default: **none** | _optional_

Applies Cloudimage filters to your image, e.g. brightness, contrast, greyscale, blur, Sharpen...
Multiple filters can be applied, separated by "```,```" (comma).
example:

```html
data-filters="bright:15,contrast:30"
```

[Full documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/image-filters)

## <a name="lazy-loading"/> Lazy Loading

Lazy loading is not included into js-cloudimage-360-view by default. There are well thought libraries to achieve that. If you enable lazy loading in the configuration, you need to add an additional library like [lazysizes](https://github.com/aFarkas/lazysizes), [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js), [lozad.js](https://github.com/ApoorvSaxena/lozad.js) to handle it.

[Implementation example with lazysizes](https://codesandbox.io/s/js-cloudimage-360-view-examples-ux850x)

[Implementation example with yall.js](https://codesandbox.io/s/js-cloudimage-360-view-xjpdg1)

[Implementation example with lozad.js](https://codesandbox.io/s/js-cloudimage-360-view-examples-8iukcn)

## <a name="best-practices"/> Best practices

* In order to use cloudimage responsive with 360 view, your original (master) images should be stored on a server
or storage bucket (S3, Google Cloud, Azure Blob...) reachable over
HTTP or HTTPS by Cloudimage. If you want to upload your master images to
Cloudimage, contact us at
[hello@cloudimage.io](mailto:hello@cloudimage.io).

## <a name="browser_support"></a> Browser support

Tested in all modern browsers and IE 11, 10, 9.

## <a name="ui_family"></a>Filerobot UI Familiy

* [JS Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [React Cloudimage Responsive](https://github.com/scaleflex/react-cloudimage-responsive)
* [Angular Cloudimage Responsive](https://github.com/scaleflex/ng-cloudimage-responsive)
* [Image Editor](https://github.com/scaleflex/filerobot-image-editor)
* [Uploader](https://github.com/scaleflex/filerobot-uploader)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!

## <a name="license"></a>License
JS Cloudimage 360 View is provided under the [MIT License](https://opensource.org/licenses/MIT)
