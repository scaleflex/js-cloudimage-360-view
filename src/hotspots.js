import { createHotspotsContainer } from './utils';
import {
  adaptHotspotConfig,
  createHotspotElement,
  createPopperElement,
  createPopperModifiers,
  findHotspotsForFrame,
} from './utils/hotspots';
import { createPopper } from '@popperjs/core';

class Hotspot {
  constructor(hotspotsConfig, container) {
    this.container = container;
    this.popper = null;
    this.popperInstance = null;
    this.hotspotsContainer = createHotspotsContainer(this.container);
    this.hideHotspots = this.hideHotspots.bind(this);
    this.hotspotsConfig = adaptHotspotConfig(hotspotsConfig);

    const { containerSize } = hotspotsConfig[0];
    this.initialContainerSize = containerSize || [container.offsetWidth, container.offsetHeight];

    this.initHotspots();
    this.observeContainerResize();
  }

  observeContainerResize() {
    this.resizeObserver = new ResizeObserver(() => {
      const newWidth = this.container.offsetWidth;
      const newHeight = this.container.offsetHeight;
      this.updateHotspotsForResize(newWidth, newHeight);
    });
    this.resizeObserver.observe(this.container);
  }

  updateHotspotsForResize(newWidth, newHeight) {
    const [initialWidth, initialHeight] = this.initialContainerSize;
    const widthRatio = newWidth / initialWidth;
    const heightRatio = newHeight / initialHeight;

    this.hotspotsConfig.forEach((hotspot) => {
      const updatedPositions = {};

      Object.entries(hotspot.initialPositions).forEach(([key, initialPosition]) => {
        const scaledX = initialPosition.x * widthRatio;
        const scaledY = initialPosition.y * heightRatio;

        updatedPositions[key] = {
          x: scaledX,
          y: scaledY,
        };
      });

      hotspot.positions = updatedPositions;
    });

    this.updateHotspotPosition(this.currentActiveIndex, this.currentOrientation);
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
    const { x, y } = positions[activeIndex] ?? {};

    const hotspot = this.hotspotsContainer.querySelector(`[data-hotspot-id="${id}"]`);

    if (hotspot) {
      hotspot.style.translate = `${x}px ${y}px`;
      hotspot.style.opacity = 1;
    }
  }

  updateHotspotPosition = (activeIndex, orientation) => {
    this.currentActiveIndex = activeIndex;
    this.currentOrientation = orientation;
    const frameHotspots = findHotspotsForFrame(this.hotspotsConfig, activeIndex, orientation);
    this.hideHotspots();

    frameHotspots.forEach((hotspot) => this.updateAndShowHotspot(hotspot, activeIndex));
  };

  createAllHotspots() {
    this.hotspotsConfig.forEach((hotspot) => this.createHotspot(hotspot));
  }

  initHotspots() {
    this.createAllHotspots();
  }

  destroy() {
    this.resizeObserver.disconnect();
    this.hidePopper();

    this.hotspotsContainer.innerHTML = '';
  }
}

export default Hotspot;
