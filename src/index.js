'use strict';

import { Viewer } from "./viewer";
import './stylesheets/ci360.scss';

class CI360 {
  static viewers = [];

  static test() {
    const s = new Viewer();
    console.log(s);
  }

  static init() {
    console.log('CI360 initialized !');

    const view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');

    for (const container of view360Array) {
      console.log(container);

      this.viewers.push(new Viewer(container));
      container.classList.add('initialized');
    }
  }
}

if (!Boolean(window.CI360 && window.CI360.notInitOnLoad)) {
  CI360.init();
}

window.CI360 = CI360;