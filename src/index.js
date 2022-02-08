import 'core-js/features/array/for-each';
import 'core-js/features/array/filter';
import 'core-js/features/array/includes';
import CI360Viewer from './ci360.service';


function init() {
  const viewers = [];
  const view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');

  [].slice.call(view360Array).forEach(container => { viewers.push(new CI360Viewer(container)); });

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

function update(id = null, forceUpdate = false) {
  if (id) {
    try{
      const view = window.CI360._viewers.filter(viewer => viewer.id === id)[0];

      return view.updatePlugin(forceUpdate);
    } catch {
      console.error(`Cloudimage-360: there is no view with such id '${id}'`)
    }
  }

  return window.CI360._viewers.forEach(viewer => { viewer.updatePlugin(forceUpdate); });
}

function isNoViewers() {
  return !(window.CI360._viewers && window.CI360._viewers.length > 0);
}

window.CI360 = window.CI360 || {};
window.CI360.init = init;
window.CI360.destroy = destroy;
window.CI360.getActiveIndexByID = getActiveIndexByID;
window.CI360.update = update;

if (!window.CI360.notInitOnLoad) {
  init();
}