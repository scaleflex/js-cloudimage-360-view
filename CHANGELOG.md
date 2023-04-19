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

-------------

## TODOs
> Todo list for future

- ...

-------------
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
