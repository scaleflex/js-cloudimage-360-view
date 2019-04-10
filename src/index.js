import 'core-js/features/array/for-each';
import 'core-js/features/array/filter';
import 'core-js/features/array/includes';
import CI360Viewer from './ci360.service';


function init() {
  const view360Array = document.querySelectorAll('.cloudimage-360');

  [].slice.call(view360Array).forEach(container => { new CI360Viewer(container); });
}

window.CI360 = {
  init
};

init();