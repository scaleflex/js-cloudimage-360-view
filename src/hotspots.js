import { createHotspotsContainer, POPPER_HIDE_DELAY, POPPER_REMOVE_DELAY } from './utils';
import {
  adaptHotspotConfig,
  calculateHotspotPositions,
  createHotspotElement,
  createPopperElement,
  createPopperOptions,
  findHotspotsForFrame,
} from './utils/hotspots';
import { renderPopoverContent } from './utils/popover-template';
import { createPopper } from '@popperjs/core';

class Hotspot {
  /**
   * @param {Array} hotspotsConfig - Hotspot configuration array
   * @param {HTMLElement} container - Container element
   * @param {number} imageAspectRatio - Image aspect ratio
   * @param {Object} options - Additional options
   * @param {string} options.trigger - 'hover' or 'click' (default: 'hover')
   */
  constructor(hotspotsConfig, container, imageAspectRatio, options = {}) {
    this.container = container;
    this.popper = null;
    this.popperInstance = null;
    this.hotspotsContainer = createHotspotsContainer(this.container);
    this.hotspotsConfig = adaptHotspotConfig(hotspotsConfig);
    this.shouldHidePopper = true;
    this.hidePopper = this.hidePopper.bind(this);
    this.forceHidePopper = this.forceHidePopper.bind(this);
    this.imageAspectRatio = imageAspectRatio;
    this.popperListeners = [];
    this.trigger = options.trigger || 'hover'; // 'hover' or 'click'
    this.onOpen = options.onOpen || null;
    this.onClose = options.onClose || null;
    this.onProductClick = options.onProductClick || null;

    const { containerSize } = hotspotsConfig[0];
    this.initialContainerSize = containerSize || [container.offsetWidth, container.offsetHeight];

    this.initHotspots();
    // Scale positions immediately for the current container size before ResizeObserver fires
    this.updateHotspotsForResize(container.offsetWidth, container.offsetHeight);
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
    // Always clean up existing popper before creating a new one
    // This prevents orphaned DOM elements when hovering the same hotspot repeatedly
    if (this.popperInstance) {
      this.hidePopper();
    }

    const popperOptions = createPopperOptions(this.container);

    this.popper = createPopperElement(content, id, this.container.parentElement);
    // Don't set data-show yet — wait for Popper.js to position the element first
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

    // Delegated click handler for CTA buttons/links with product ID
    if (this.onProductClick) {
      const onProductClick = this.onProductClick;
      const ctaHandler = (e) => {
        const cta = e.target.closest('.ci360-popper-cta[data-product-id]');
        if (!cta) return;
        onProductClick(cta.dataset.productId, id);
      };
      this.popper.addEventListener('click', ctaHandler);
      this.popperListeners.push(
        { element: this.popper, event: 'click', handler: ctaHandler }
      );
    }

    const popperJs = createPopper(hotspotElement, this.popper, popperOptions);

    // Synchronously compute position before revealing the popper.
    // Without this, the element is briefly visible at its default DOM position
    // (e.g. top-left corner) before Popper.js repositions it asynchronously.
    popperJs.forceUpdate();
    this.popper.setAttribute('data-show', '');
    this.shouldHidePopper = false;

    this.popperInstance = {
      ...popperJs,
      keepOpen,
      instanceId: id,
    };

    try { this.onOpen?.(id); } catch (e) { console.warn('onHotspotOpen callback error:', e); }
  }

  checkAndHidePopper() {
    if (this.shouldHidePopper && !this.popperInstance?.keepOpen) {
      if (this.hidePopperTimeout) clearTimeout(this.hidePopperTimeout);
      this.hidePopperTimeout = setTimeout(() => {
        if (this.shouldHidePopper) this.hidePopper();
      }, POPPER_HIDE_DELAY);
    }
  }

  hidePopper() {
    // Clear any pending hide timeout
    if (this.hidePopperTimeout) {
      clearTimeout(this.hidePopperTimeout);
      this.hidePopperTimeout = null;
    }

    const closingId = this.popperInstance?.instanceId;

    this.cleanupPopperListeners();

    if (this.currentHotspotElement) {
      this.currentHotspotElement.setAttribute('aria-expanded', 'false');
      this.currentHotspotElement.removeAttribute('aria-describedby');
      this.currentHotspotElement = null;
    }

    // Capture the Popper.js instance but don't destroy yet — destroying resets
    // position styles, which would cause the element to jump to its default
    // DOM position during the fade-out opacity transition.
    const popperInstanceToDestroy = this.popperInstance;
    this.popperInstance = null;

    if (closingId != null) {
      try { this.onClose?.(closingId); } catch (e) { console.warn('onHotspotClose callback error:', e); }
    }

    if (this.popper) {
      this.popper.removeAttribute('data-show');
      this.popper.setAttribute('aria-hidden', 'true');
      const popperToRemove = this.popper;
      this.popper = null;
      setTimeout(() => {
        popperInstanceToDestroy?.destroy();
        popperToRemove.remove();
      }, POPPER_REMOVE_DELAY);
    } else {
      popperInstanceToDestroy?.destroy();
    }

    // Reset state
    this.shouldHidePopper = true;
  }

  /**
   * Force hide the popper immediately, ignoring keepOpen and shouldHidePopper flags
   * Use this when the user starts dragging or other interactions that should close the modal
   */
  forceHidePopper() {
    this.shouldHidePopper = true;
    if (this.popperInstance) {
      this.popperInstance.keepOpen = false;
    }
    this.hidePopper();
  }

  createHotspot(hotspot) {
    const { id, keepOpen, onClick, label, markerStyle } = hotspot;
    const content = renderPopoverContent(hotspot);
    const hotspotElement = createHotspotElement(id, label, markerStyle);

    if (onClick || (content && this.trigger === 'click')) {
      hotspotElement.style.cursor = 'pointer';
    }

    hotspotElement.onclick = (event) => {
      event.stopPropagation();

      // Handle click trigger for showing popper
      if (content && this.trigger === 'click') {
        // Toggle popper on click
        if (this.popperInstance?.instanceId === id) {
          this.hidePopper();
        } else {
          this.showPopper({ hotspotElement, content, id, keepOpen });
        }
      }

      // Call custom onClick handler if provided
      onClick?.(event, this.popperInstance, id);
    };

    if (content) {
      // Only add hover listeners if trigger is 'hover'
      if (this.trigger === 'hover') {
        hotspotElement.addEventListener('mouseenter', () =>
          this.showPopper({ hotspotElement, content, id, keepOpen })
        );
        hotspotElement.addEventListener('mouseleave', () => {
          this.shouldHidePopper = true;
          this.checkAndHidePopper();
        });

        // Support focus for accessibility (hover mode only — in click mode
        // the focus event fires before onclick, which causes the toggle logic
        // to immediately close the popper that focus just opened).
        hotspotElement.addEventListener('focus', () =>
          this.showPopper({ hotspotElement, content, id, keepOpen })
        );
        hotspotElement.addEventListener('blur', () => {
          this.shouldHidePopper = true;
          this.checkAndHidePopper();
        });
      }
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

  /**
   * Shows the popper for a specific hotspot by ID
   * @param {string} hotspotId - The ID of the hotspot to show
   */
  showHotspotById(hotspotId) {
    const hotspotConfig = this.hotspotsConfig.find((h) => h.id === hotspotId);
    if (!hotspotConfig) return;

    const content = renderPopoverContent(hotspotConfig);
    if (!content) return;

    const hotspotElement = this.hotspotsContainer.querySelector(`[data-hotspot-id="${hotspotId}"]`);
    if (!hotspotElement) return;

    // Only show if the hotspot is currently visible
    if (hotspotElement.style.opacity !== '1') return;

    this.showPopper({
      hotspotElement,
      content,
      id: hotspotId,
      keepOpen: hotspotConfig.keepOpen,
    });
  }

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
    this.hotspotsContainer.innerHTML = '';
  }
}

export default Hotspot;
