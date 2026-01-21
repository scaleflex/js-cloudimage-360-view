import { createHotspotsContainer, POPPER_HIDE_DELAY, POPPER_REMOVE_DELAY } from './utils';
import {
  adaptHotspotConfig,
  calculateHotspotPositions,
  createHotspotElement,
  createPopperElement,
  createPopperModifiers,
  findHotspotsForFrame,
} from './utils/hotspots';
import { createPopper } from '@popperjs/core';

class Hotspot {
  constructor(hotspotsConfig, container, imageAspectRatio) {
    this.container = container;
    this.popper = null;
    this.popperInstance = null;
    this.hotspotsContainer = createHotspotsContainer(this.container);
    this.hotspotsConfig = adaptHotspotConfig(hotspotsConfig);
    this.shouldHidePopper = true;
    this.hidePopper = this.hidePopper.bind(this);
    this.imageAspectRatio = imageAspectRatio;
    this.hotspotElements = new Map();
    this.popperListeners = [];

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
    this.hotspotsConfig = calculateHotspotPositions({
      newWidth,
      newHeight,
      initialContainerSize: this.initialContainerSize,
      imageAspectRatio: this.imageAspectRatio,
      hotspotsConfig: this.hotspotsConfig,
    });

    this.updateHotspotPosition(this.currentActiveIndex, this.currentOrientation);
  }

  cleanupPopperListeners() {
    this.popperListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.popperListeners = [];
  }

  showPopper({ hotspotElement, content, id, keepOpen }) {
    if (this.popperInstance && this.popperInstance.instanceId !== id) {
      this.hidePopper();
    }

    const popperOptions = {
      placement: 'top',
      modifiers: createPopperModifiers(this.container),
    };

    this.popper = createPopperElement(content, id);
    this.popper.setAttribute('data-show', '');
    this.currentHotspotElement = hotspotElement;
    hotspotElement.setAttribute('aria-expanded', 'true');
    hotspotElement.setAttribute('aria-describedby', `cloudimage-360-popper-${id}`);

    const popperEnterHandler = () => {
      this.shouldHidePopper = false;
    };
    const popperLeaveHandler = () => {
      this.shouldHidePopper = true;
      this.checkAndHidePopper();
    };
    const hotspotLeaveHandler = () => {
      this.shouldHidePopper = true;
      this.checkAndHidePopper();
    };
    const hotspotEnterHandler = () => {
      this.shouldHidePopper = false;
      if (this.hidePopperTimeout) clearTimeout(this.hidePopperTimeout);
    };

    this.popper.addEventListener('mouseenter', popperEnterHandler);
    this.popper.addEventListener('mouseleave', popperLeaveHandler);
    hotspotElement.addEventListener('mouseleave', hotspotLeaveHandler);
    hotspotElement.addEventListener('mouseenter', hotspotEnterHandler);

    this.popperListeners.push(
      { element: this.popper, event: 'mouseenter', handler: popperEnterHandler },
      { element: this.popper, event: 'mouseleave', handler: popperLeaveHandler },
      { element: hotspotElement, event: 'mouseleave', handler: hotspotLeaveHandler },
      { element: hotspotElement, event: 'mouseenter', handler: hotspotEnterHandler }
    );

    this.popperInstance = {
      ...createPopper(hotspotElement, this.popper, popperOptions),
      keepOpen,
      instanceId: id,
    };
  }

  checkAndHidePopper() {
    if (this.shouldHidePopper && !this.popperInstance?.keepOpen) {
      this.hidePopperTimeout = setTimeout(() => {
        if (this.shouldHidePopper) this.hidePopper();
      }, POPPER_HIDE_DELAY);
    }
  }

  hidePopper() {
    this.cleanupPopperListeners();

    if (this.currentHotspotElement) {
      this.currentHotspotElement.setAttribute('aria-expanded', 'false');
      this.currentHotspotElement.removeAttribute('aria-describedby');
      this.currentHotspotElement = null;
    }

    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }

    if (this.popper) {
      this.popper.removeAttribute('data-show');
      this.popper.setAttribute('aria-hidden', 'true');
      const popperToRemove = this.popper;
      this.popper = null;
      setTimeout(() => {
        popperToRemove.remove();
      }, POPPER_REMOVE_DELAY);
    }
  }

  createHotspot(hotspot) {
    const { id, content, keepOpen, onClick, label } = hotspot;
    const hotspotElement = createHotspotElement(id, label);

    if (onClick) {
      hotspotElement.style.cursor = 'pointer';
    }

    hotspotElement.onclick = (event) => {
      event.stopPropagation();
      onClick?.(event, this.popperInstance, id);
    };

    if (content) {
      hotspotElement.addEventListener('mouseenter', () =>
        this.showPopper({ hotspotElement, content, id, keepOpen })
      );
      hotspotElement.addEventListener('focus', () =>
        this.showPopper({ hotspotElement, content, id, keepOpen })
      );
      hotspotElement.addEventListener('blur', () => {
        this.shouldHidePopper = true;
        this.checkAndHidePopper();
      });
    }

    this.hotspotsContainer.appendChild(hotspotElement);
  }

  hideHotspots() {
    this.hotspotsContainer.querySelectorAll('.cloudimage-360-hotspot').forEach((hotspot) => {
      hotspot.style.opacity = 0;
      hotspot.style.pointerEvents = 'none';
    });
  }

  updateAndShowHotspot(hotspotConfig, activeIndex) {
    const { positions, id } = hotspotConfig;
    const { x, y } = positions[activeIndex] ?? {};

    const hotspot = this.hotspotsContainer.querySelector(`[data-hotspot-id="${id}"]`);

    if (hotspot) {
      hotspot.style.translate = `${x}px ${y}px`;
      hotspot.style.opacity = 1;
      hotspot.style.pointerEvents = 'all';
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
    if (this.hidePopperTimeout) {
      clearTimeout(this.hidePopperTimeout);
    }

    this.resizeObserver.disconnect();
    this.hidePopper();
    this.hotspotElements.clear();
    this.hotspotsContainer.innerHTML = '';
  }
}

export default Hotspot;
