'use strict';

import { Viewer } from "../viewer";
import { CONTAINER } from './classes';
import { getAttr, isAboutToEnterViewport } from "../utils/dom-helper";

export class Core {
  /** @type {HTMLElement[]} */
  static containers = [];
  /** @type {Viewer[]} */
  static viewers = [];

  static get hasViewers() {
    return this.viewers.length > 0;
  }

  static get hasContainers() {
    return this.containers.length > 0;
  }

  /**@param {HTMLElement} container */
  static loadContainer(container) {
    const lazyLoad = Boolean(getAttr(container, 'lazyload') || getAttr(container, 'data-lazyload'));
    const lazyLoadWithinRange = parseInt(getAttr(container, 'lazyload-within-range') || getAttr(container, 'data-lazyload-within-range') || 200, 10);

    if (lazyLoad) {
      document.addEventListener('scroll', function listener(event) {
        if (isAboutToEnterViewport(container, lazyLoadWithinRange)) {
          event.currentTarget.removeEventListener(event.type, listener);
          Core.viewers.push(new Viewer(container));
        }
      })
    } else {
      this.viewers.push(new Viewer(container));
    }
  }

  static init() {
    if (this.hasViewers) {
      this.destroy();
    }

    this.containers = document.querySelectorAll(`.${CONTAINER.INDEX}:not(.${CONTAINER.INITIALIZED})`);

    for (const container of this.containers) {
      this.loadContainer(container);
    }
  }

  static destroy() {
    if (!this.hasContainers || !this.hasViewers) { return; }

    for (const viewer of this.viewers) {
      viewer.destroy();
    }
  }

  /**@param {Viewer} viewer */
  static removeViewer(viewer) {
    this.viewers = this.viewers.filter(v => v !== viewer);
  }
}