'use strict';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';

import { Viewer } from "./viewer";
import './stylesheets/ci360.scss';

class CI360 {
  static viewers = [];

  static init() {
    const view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');

    for (const container of view360Array) {
      this.viewers.push(new Viewer(container));
      container.classList.add('initialized');
    }
  }
}

if (!Boolean(window.CI360 && window.CI360.notInitOnLoad)) {
  CI360.init();
}

window.CI360 = CI360;