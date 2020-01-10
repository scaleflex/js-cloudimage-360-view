'use strict';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';
import { CI360 } from './ci360';

if (!(window.CI360 && window.CI360.notInitOnLoad)) {
  CI360.init();
}

window.CI360 = CI360;