'use strict';

import { Viewer } from "../viewer";
import { CONTAINER } from './classes';

export class CI360 {
  static viewers = [];

  static init() {
    const view360Array = document.querySelectorAll(`.${CONTAINER.INDEX}:not(.${CONTAINER.INITIALIZED})`);

    for (const container of view360Array) {
      this.viewers.push(new Viewer(container));
      container.classList.add(CONTAINER.INITIALIZED);
    }
  }
}