# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

> Date format: YYYY-MM-DD

> If we have some "Breaking changes" we can mark it in message by `**BREAKING**` preffix, like:
> `- **BREAKING**: Some message`

---

## TODOs

> Todo list for future

- ...

---

## 4.4.0 - 2026-02-26

### Added

- Hotspot timeline overlay on image with popover template system
- "Also by Scaleflex" slider with js-cloudimage-3d-view
- Bento grid layout for demo showcases
- Demo redesign with polished hero, playground section, and timeline track visibility

### Fixed

- Wrong id in demo page
- MIT License link formatting in README
- Dependabot security alerts by upgrading dev dependencies

---

## 4.3.0 - 2026-01-23

### Added

- `pointerZoomTrigger` config option (`'click'` or `'dblclick'`, default `'dblclick'`) to control zoom activation
- Zoom-in/zoom-out button pair that toggles in the same position
- Hotspot timeline visible in fullscreen mode with gradient background
- Auto-enable memory management on mobile devices
- Mobile memory optimizations for Safari stability (main-thread canvas, capped DPR, throttled draws)
- `hotspotTrigger` config option (`'hover'` or `'click'`) to control hotspot popup activation

### Fixed

- Mobile Safari memory crashes with multiple viewers
- Timeline dots clickable in fullscreen mode (z-index fix)
- Hotspot popper closing when opening/closing fullscreen
- Fullscreen modal close issues (modal staying visible, drag not working)
- Hotspot modal stuck open bug
- Handle width=0 CDN error and missing iconsContainer crash
- Close ImageBitmap objects to prevent memory leaks on mobile
- Release memory when opening fullscreen to prevent crash on mobile

### Changed

- Default zoom trigger changed from single click to double-click
- Timeline stays visible during interactions (not hidden on drag/zoom)
- Demo page hides heavy sections on mobile to reduce memory usage

---

## 4.2.0 - 2026-01-22

### Added

- Programmatic control demo with play/stop/rotate buttons and frame navigation

---

## 4.1.4 - 2026-01-22

### Fixed

- React ref methods not working correctly
- Hotspot modal not closing properly

---

## 4.1.3 - 2026-01-22

### Added

- `aspectRatio` config option for container sizing
- React wrapper component (`CI360Viewer`) and hook (`useCI360`)
- Hotspot timeline navigation bar
- Hints overlay with drag/click/keys instructions
- CSS theming system with light/dark themes and CSS variables
- Event callbacks for viewer lifecycle (onReady, onLoad, onSpin, onZoomIn, etc.)
- Inertia/momentum after drag release
- Pinch-to-zoom for mobile devices
- Styled hotspot modals with customizable content
- CodeSandbox examples for vanilla JS and React

### Fixed

- Memory leaks with ImageBitmap objects
- Page scrollbars visible in fullscreen mode
- Sanitize hotspot HTML content to prevent XSS attacks
- Close hotspots on drag interaction
- Error handling and accessibility improvements

### Changed

- Switch to IIFE format with embedded CSS for CDN usage
- Added CSS autoprefixer for better browser support

---

## 4.0.0 - 2024-10-29

### Breaking Changes

This release introduces several breaking changes, with deprecated properties and improved functionalities for performance and configurability.

### Deprecated

The following properties and functionalities have been deprecated:

- **Configuration Properties**: `boxShadow`, `lazySelector`, `hide360Logo`, `logoSrc`, `ratio`, `imageInfo`, and `requestResponsiveImages`.
- **Hotspot Properties**: `title`, `url`, `newTab`, `description`, `moreDetailsUrl`, `moreDetailsTitle`, `popupSelector`, `open`, `arrow`, `offset`, `placement`.
- **Control Buttons**: Control buttons have been removed from this version.

### Added

- **360 Canvas Offscreen**: The 360 canvas now operates offscreen, significantly improving performance.
- **Configurable Hotspots**: Hotspots now offer greater customization options.
- **Instance Selection by ID**: Instances can now be selected using their IDs.
- **Lazy Initialization**: Instances can be initialized programmatically, allowing for delayed loading as needed.
- **Independent Y-Axis Spin**: The Y-axis can now spin independently of the X-axis.

### Fixed

- **Lazy Loading**: Enhanced lazy loading functionality.
- **Pointer Zoom**: Improved zoom control with pointer interactions.
- **Drag Speed**: Adjusted drag speed for smoother user control.
- **Autoplay Speed**: Optimized autoplay speed settings.
- **Y-Axis Spin Behavior**: Refined Y-axis spin behavior for smoother operation.
- **Image Loading Speed**: Faster image loading, now performed asynchronously.
- **Magnifier**: Improved the quality of the magnified image.


## 3.2.0 - 2023-09-25

### Added

- Possibility to add hotspots dynamically

## 3.1.1 - 2023-04-19

### Fixed

- Remove CVE vulnerabilities

## 3.1.0 - 2023-04-10

### Added

- possibility to enable/disable the request of new image on resize using `data-request-responsive-images`

### Fixed

- Page scroll, even spin-y is not active

## 3.0.4 - 2022-10-19

### Fixed

- Hotspot icons width

## 3.0.3 - 2022-05-04

### Fixed

- Error on loading original images from image list

## 3.0.2 - 2022-05-04

### Changed

- documentation

## 3.0.1 - 2022-03-28

### Changed

- hotspots icons

### Fixed

- loader is hidden if hide-360-logo is active

## 3.0.0 - 2022-03-25

### Added

- possibility to add makers or hotspots to each image
- possibility add views after init the plugin
- possibility to update views

### Fixed

- hide 360 logo after play once

## 2.7.12 - 2022-03-19

### Changed

- hotspots init method

## 2.7.11 - 2022-03-17

### Fixed

- canvas aspect ratio
- initialization of lazyloading

## 2.7.10 - 2022-03-01

### Fixed

- image quality in fullscreen
- resized image loading

## 2.7.9 - 2022-02-27

### Fixed

- typo in documentation

## 2.7.8 - 2022-02-27

### Added

- possibility to add new view to CI360 views

### Fixed

- re-render method

## 2.7.7 - 2022-02-24

### Fixed

- container width on mobile
- re-render method

## 2.7.6 - 2022-02-20

### Fixed

- drag speed
- responsive canvas width and height

## 2.7.5 - 2022-02-08

### Added

- update method to re-render or re-init the plugin

### Fixed

- drag speed on mobile
- error when drag speed is too high
- error in dependencies

## 2.7.4 - 2022-01-26

### Fixed

- typo in documentation file

## 2.7.3 - 2022-01-26

### Fixed

- typo in documentation file

## 2.7.2 - 2022-01-26

### Added

- possibility to fit container relative to its width or height and maintain the aspect ratio
- possibility to reverse the directions of the keys on the keyboard

### Fixed

- pointer zoom behavior
- error while loading images from lists
- get the active image index

## 2.7.1 - 2021-11-06

### Added

- click to reset mouse zoom
- show 360 logo after play once

### Fixed

- set click as default value to start zoom
- Sass error

### Changed

- pointer zoom behavior

## 2.7.0 - 2021-11-04

### Added

- play once then stop auto-play
- spin in the y-direction
- zoom with mouse wheel
- zoom with fingers on mobile
- possibility to change icons styles

### Fixed

- hide scrollbar in fullscreen mode
- auto-play not working on mobile
- error on init the plugin inside a modal
- removed chrome warning about non-passive events
- images are not resized when window size changes

### Changed

- migrate CDN URL to V7

## 2.6.0 - 2020-09-03

### Feat

- add ability to specify custom 360 view logo

## 2.5.0 - 2020-07-05

### Feat

- possibility to hide 360 view icon

## 2.4.1 - 2020-04-11

### Fixed

- initialize first image using data-image-list #33

## 2.4.0 - 2020-04-09

### Fixed

- problem with first preview image is random #28, #29
