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
  if (!(window.CI360._viewers && window.CI360._viewers.length > 0)) return;

  [].slice.call(window.CI360._viewers).forEach(viewer => { viewer.destroy(); });

  window.CI360._viewers = [];
}

window.CI360 = window.CI360 || {};
window.CI360.init = init;
window.CI360.destroy = destroy;

if (!window.CI360.notInitOnLoad) {
  init();
}