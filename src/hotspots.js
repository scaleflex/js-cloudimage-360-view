import { createHotspotsContainer, debounce } from './utils';
import {
  createHotspotElement,
  createPopperElement,
  createPopperModifiers,
  findHotspotsForFrame,
  getLastValidPosition,
} from './utils/hotspots';
import { createPopper } from '@popperjs/core';

class Hotspot {
  constructor(hotspotsConfig, container) {
    this.hotspotsConfig = hotspotsConfig;
    this.container = container;
    this.popper = null;
    this.popperInstance = null;
    this.hotspotsContainer = createHotspotsContainer(this.container);

    this.initHotspots();
  }

  showPopper(hotspotElement, content, id) {
    if (this.popperInstance) {
      this.hidePopper();
    }

    const popperOptions = {
      placement: 'top',
      modifiers: createPopperModifiers(this.container),
    };

    this.popper = createPopperElement(content, id);

    requestAnimationFrame(() => this.popper.setAttribute('data-show', ''));

    this.popperInstance = createPopper(hotspotElement, this.popper, popperOptions);
  }

  // Hide popper with transition
  hidePopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }

    if (this.popper) {
      this.popper.removeAttribute('data-show');
      setTimeout(() => {
        if (this.popper) this.popper.remove();
        this.popper = null;
      }, 200);
    }
  }

  createHotspot(hotspot) {
    const { id, content } = hotspot;
    const hotspotElement = createHotspotElement(id);

    hotspotElement.addEventListener('mouseenter', () => this.showPopper(hotspotElement, content, id));
    hotspotElement.addEventListener('mouseleave', () => this.hidePopper());

    this.hotspotsContainer.appendChild(hotspotElement);
  }

  hideHotspots() {
    this.hotspotsContainer.querySelectorAll('.cloudimage-360-hotspot').forEach((hotspot) => {
      hotspot.style.opacity = 0;
    });
  }

  updateAndShowHotspot(hotspotConfig, activeIndex) {
    const { positions, id } = hotspotConfig;
    const position = positions[activeIndex] || getLastValidPosition(positions, activeIndex);
    const { x, y } = position;
    const hotspot = this.hotspotsContainer.querySelector(`[data-hotspot-id="${id}"]`);

    if (hotspot) {
      hotspot.style.translate = `${x}px ${y}px`;
      hotspot.style.opacity = 1;
    }
  }

  updateHotspotPosition = debounce((activeIndex, orientation) => {
    const frameHotspots = findHotspotsForFrame(this.hotspotsConfig, activeIndex, orientation);
    this.hideHotspots();
    frameHotspots.forEach((hotspot) => this.updateAndShowHotspot(hotspot, activeIndex));
  }, 50);

  createAllHotspots() {
    this.hotspotsConfig.forEach((hotspot) => this.createHotspot(hotspot));
  }

  initHotspots() {
    this.createAllHotspots();
  }
}

export default Hotspot;
