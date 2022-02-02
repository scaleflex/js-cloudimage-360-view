import 'core-js/features/array/for-each';
import 'core-js/features/array/filter';
import 'core-js/features/array/includes';
import CI360Viewer from './ci360.service';
import { attr } from './ci360.utils';

window.CI360 = {
  hotspots: {
    ['mercedes-car']: [
      {
        variant: {
          images: [
            'https://scaleflex.cloudimg.io/v7/demo/360-demo-assets/mustang-interior.png?vh=e4ba53',
            'https://scaleflex.cloudimg.io/v7/demo/360-demo-assets/image.png?vh=ab84b0',
            'https://scaleflex.cloudimg.io/v7/demo/360-demo-assets/image-2.png?vh=20405b',
          ],
          title: 'Mustang with 20 IN MAX wheels',
          description: 'Drivers of the 2019 Mercedes Bullitt enjoy standard Ebony leather seats with Dark Highland Green accent stitching.',
          moreDetailsUrl: 'https://www.google.com',
        },
        popupProps: { arrow: true, popupSelector: 'test' },
        initialDimensions: [ 1381, 777 ],
        hotspots: [
          { imageIndex: 1, xCoord: 877, yCoord: 319 },
          { imageIndex: 2, xCoord: 857 },
          { imageIndex: 3, xCoord: 825 },
          { imageIndex: 4, xCoord: 784 },
          { imageIndex: 5, xCoord: 739, yCoord: 325 },
          { imageIndex: 6, xCoord: 692 },
          { imageIndex: 7, xCoord: 640 },
          { imageIndex: 8, xCoord: 592 },
          { imageIndex: 9, xCoord: 557 },
          { imageIndex: 10, xCoord: 517 },
        ],
      },
      {
        variant: { title: 'AMG wheels' },
        popupProps: { arrow: true },
        initialDimensions: [ 1381, 777 ],
        hotspots: [
          { imageIndex: 35, xCoord: 818, yCoord: 535 },
          { imageIndex: 36, xCoord: 761, yCoord: 542 },
          { imageIndex: 1, xCoord: 691, yCoord: 545 },
          { imageIndex: 2, xCoord: 624, yCoord: 546 },
          { imageIndex: 3, xCoord: 547, yCoord: 549 },
          { imageIndex: 4, xCoord: 486, yCoord: 549 },
          { imageIndex: 5, xCoord: 425, yCoord: 545 },
          { imageIndex: 6, xCoord: 381, yCoord: 533 },
          { imageIndex: 7, xCoord: 350, yCoord: 524 },
          { imageIndex: 8, xCoord: 332, yCoord: 513 },
        ],
      },
      {
        variant: {
          title: 'buy AMG rear spoiler',
          url: 'https://www.performmaster.com/amg-aerodynamic/rear-spoiler-mercedes-amg/',
          newTab: true
        },
        popupProps: { arrow: true },
        initialDimensions: [ 1381, 777 ],
        hotspots: [
          { imageIndex: 9, xCoord: 1003, yCoord: 342 },
          { imageIndex: 10, xCoord: 941, yCoord: 342 },
          { imageIndex: 11, xCoord: 870, yCoord: 342 },
          { imageIndex: 12, xCoord: 793, yCoord: 342 },
          { imageIndex: 13, xCoord: 717, yCoord: 342 },
          { imageIndex: 14, xCoord: 641, yCoord: 342 },
          { imageIndex: 15, xCoord: 572, yCoord: 341 },
        ],
      },
    ]
}}

function init() {
  const viewers = [];
  const view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');
  const hotspotsConfigs = window.CI360.hotspots|| {};

  [].slice.call(view360Array).forEach(container => {
    const hotspotInstanceName = attr(container, 'hotspot-instance') ||
      attr(container, 'data-hotspot-instance');

    const hotspotConfig = hotspotsConfigs[hotspotInstanceName] ? hotspotsConfigs[hotspotInstanceName] : null;

    viewers.push(new CI360Viewer(container, false, hotspotConfig));
  })

  window.CI360._viewers = viewers;
}

function destroy() {
  if (isNoViewers()) return;

  window.CI360._viewers.forEach(viewer => { viewer.destroy(); });

  window.CI360._viewers = [];
}

function getActiveIndexByID(id, oriantation) {
  if (isNoViewers()) return;

  let currentViewer = window.CI360._viewers.filter(viewer => viewer.id === id)[0];

  if (oriantation === 'y') {
    return currentViewer && (currentViewer.activeImageY - 1);
  }

  return currentViewer && (currentViewer.activeImageX - 1);
}

function isNoViewers() {
  return !(window.CI360._viewers && window.CI360._viewers.length > 0);
}

window.CI360 = window.CI360 || {};
window.CI360.init = init;
window.CI360.destroy = destroy;
window.CI360.getActiveIndexByID = getActiveIndexByID;

if (!window.CI360.notInitOnLoad) {
  init();
}