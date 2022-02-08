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
## 2.7.5 - 2022-01-08
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
