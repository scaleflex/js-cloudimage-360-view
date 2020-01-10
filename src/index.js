'use strict';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';
import { Core } from './core';

if (!(window.CI360 && window.CI360.notInitOnLoad)) {
  Core.init();
}

window.CI360 = Core;