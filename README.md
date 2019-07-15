[![Release](https://img.shields.io/badge/release-v2.1.0-blue.svg)](https://github.com/scaleflex/js-cloudimage-360-view/releases)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg)](https://www.scaleflex.it/en/home)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Engage%20your%20customers%20with%20a%20stunning%20360%20viewvof%20your%20products&url=https://scaleflex.github.io/js-cloudimage-360-view/&via=cloudimage&hashtags=images,cloudimage)

<p align="center">
	<img
		height="175"
		alt="The Lounge"
		src="https://demo.cloudimg.io/height/350/n/https://scaleflex.airstore.io/filerobot/filerobot-cloudimage.png?sanitize=true">
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
		<a href="https://codesandbox.io/s/6479n17j73?fontsize=14&module=%2Findex.html" target="_blank">Code Sandbox</a>
		•
		<a href="https://youtu.be/zXUgrvZ7FMc" target="_blank">Video Tutorial</a>
		•
		<a href="https://medium.com/cloudimage/e-merchandising-how-can-a-360-view-of-your-products-boost-your-revenue-24b16eb9cd62" target="_blank">Why</a>
	</strong>
</p>

A simple, interactive resource that can be used to provide a virtual tour of your product.

<p align="center">
	<img
		alt="The Lounge"
		src="https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/filerobot/js-cloudimage-360-view/demo-chair-500.gif?sanitize=true">
</p>

powered by [Cloudimage](https://www.cloudimage.io/)
([Watch the video here](https://www.youtube.com/watch?time_continue=2&v=JFZSE1vYb0k))

## <a name="table_of_contents"></a>Table of contents

* [Demo](#demo)
* [Step 1: Installation](#installation)
* [Step 2: Initialize](#initialize)
* [Configuration](#configuration)
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
<script src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.1.0/js-cloudimage-360-view.min.js"></script>
```

You may also use major version number instead of fixed version to have the latest version available.

```javascript
<script src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2/js-cloudimage-360-view.min.js"></script>
```

## <a name="initialize"></a>Step 2: Initialize

After adding the js-cloudimage-360-view lib, simply initialize it with **class name "cloudimage-360"**,
**server folder path**, **file name** and amount of images:

```html
<div
   class="cloudimage-360"
   data-folder="https://scaleflex.cloudimg.io/crop/1920x700/n/https://scaleflex.airstore.io/demo/360-car/"
   data-filename="iris-{index}.jpeg"
   data-amount="36"
></div>
```

<a href="https://codesandbox.io/s/6479n17j73?fontsize=14&module=%2Findex.html"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

## <a name="configuration"></a> Config

### class

###### Type: **String** | Value: **"cloudimage-360"** | _required_

The selector for js-cloudimage-360-view lib.

### data-folder (or folder)

###### Type: **String(url)** | _required_

Your images folder on server.

### data-filename (or filename)

###### Type: **String** | Default: **image-{index}.jpg** | _optional_

The filename pattern for your 360 image.  Must include {index}, which the library will replace with a number between 1 and [data-amount](#data-amount).

### <a name="data-amount"></a> data-amount (or amount)

###### Type: **Number** | Default: **36** | _optional_

Amount of images to load for 360 view.

### data-keys (or keys)

###### Type: **Bool** | Default: **false** | _optional_

Support for 360 spin by pressing arrow keys on keyboard.

### data-autoplay (or autoplay)

###### Type: **Bool** | Default: **false** | _optional_

Autoplay 360 spin view on load.

### data-full-screen (or full-screen)

###### Type: **Bool** | Default: **false** | _optional_

Open 360 spin view in full screen modal.

### data-magnifier (or magnifier)

###### Type: **Number** | Default: **none** | _optional_

Magnifier to zoom image.

### data-ratio (or ratio)

###### Type: **Number** (height / width) | Default: **none** | _optional_

Prevents page from jumping.

### data-autoplay-reverse (or autoplay-reverse)

###### Type: **Bool** | Default: **false** | _optional_

Autoplay 360 spin view on load.

### data-speed (or speed)

###### Type: **Number** | Default: **150** | _optional_

Speed of changing frames for autoplay in milliseconds.

### data-drag-speed (or drag-speed)

###### Type: **Number** | Default: **150** | _optional_

Speed Factor of changing frames on drag event.

### data-spin-reverse (or spin-reverse)

###### Type: **Bool** | Default: **false** | _optional_

Spin direction, by default it uses counterclockwise (image indexes from 1 to data-amount).

### data-box-shadow (or box-shadow)

###### Type: **String** (e.g. data-box-shadow="inset 0 0 100px #222") | Default: **none** | _optional_

Apply box shadow for container.

### data-bottom-circle (or bottom-circle)

###### Type: **Bool** | Default: **false** | _optional_

Display 360 view line at the bottom of container.

### data-bottom-circle-offset (or bottom-circle-offset)

###### Type: **Number** | Default: **5** | _optional_

Bottom offset for 360 view line.

### data-lazyload (or lazyload)

###### Type: **Bool** | Default: **false** | _optional_

Only 360 view images close to the client's viewport will be loaded, hence accelerating the page loading time. If set to true, an additional script must be included, see [Lazy loading](#lazy-loading)

### data-lazyload-selector (or lazyload-selector)

###### Type: **String** | Default: **lazyload** | _optional_

Helper class to apply lazy-loading depending on library you choose, see [Lazy loading](#lazy-loading)

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

### data-filters (or filters)

###### Type: **String** | Default: **q35** | _optional_

Applies default Cloudimage filters to your image, e.g. fcontrast, fpixelate, fgaussian, backtransparent,
rotation...  Multiple filters can be applied, separated by "```.```" (dot).

[Full documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation/en/filters/)

## <a name="lazy-loading"/> Lazy Loading

Lazy loading is not included into js-cloudimage-360-view by default. There are well thought libraries to achieve that. If you enable lazy loading in the configuration, you need to add an additional library like [lazysizes](https://github.com/aFarkas/lazysizes), [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js), [lozad.js](https://github.com/ApoorvSaxena/lozad.js) to handle it.

[Implementation example with lazysizes](https://codesandbox.io/s/w7vx5w1ln7?fontsize=14)

[Implementation example with yall.js](https://codesandbox.io/s/ym2xrk87xv?fontsize=14)

[Implementation example with lozad.js](https://codesandbox.io/s/0185934m8p?fontsize=14)

to save API calls you man want to use one of our cdn bundles:

CDN link to js-cloudimage-360-view 1.1.0 + lazysizes 4.1.7

```javascript
<script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js"></script>
```

CDN link to js-cloudimage-360-view 1.1.0 + yall.js 3.1.1

```javascript
<script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.yall.min.js"></script>
```

CDN link to js-cloudimage-360-view 1.1.0 + lozad.js 1.9.0

```javascript
<script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lozad.min.js"></script>
```


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

