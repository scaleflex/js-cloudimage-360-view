import CI360Viewer from './ci360.service';
import { hasConfigChanged } from './utils';

class CI360 {
  constructor() {
    this.views = new Map();
    this.initAll = this.initAll.bind(this);
    this.getViews = this.getViews.bind(this);
    this.memoryObserver = null;
  }

  generateId() {
    return `ci360-${Math.random().toString(36).slice(2, 11)}`;
  }

  init(container, config, fullscreen) {
    if (!container) return;

    const containerId = container.id || this.generateId();
    if (!container.id) {
      container.id = containerId;
    }

    const instance = new CI360Viewer(container, config, fullscreen);
    this.views.set(containerId, instance);

    return instance;
  }

  initAll(className = 'cloudimage-360') {
    const containers = document.querySelectorAll(`.${className}`);

    [...containers].filter(Boolean).forEach((container) => {
      const containerId = container.id || this.generateId();

      if (!container.id) {
        container.id = containerId;
      }

      const instance = new CI360Viewer(container);
      this.views.set(containerId, instance);
    });
  }

  destroy(id) {
    const view = this.getViewById(id);
    if (view) {
      view.destroy();
      this.views.delete(id);
    }
  }

  destroyAll() {
    this.views.forEach((view) => {
      view.destroy();
    });

    this.views.clear();
  }

  getViewById(id) {
    return this.views.get(id);
  }

  getViews() {
    return Array.from(this.views.values());
  }

  updateView(id, config) {
    const view = this.getViewById(id);

    if (!view) return null;

    const updatedConfig = { ...view.viewerConfig, ...config };

    // Always do a full restart to ensure clean state
    view.destroy();
    const container = document.getElementById(id);
    return this.init(container, updatedConfig);
  }

  /**
   * Enable automatic memory management for mobile devices.
   * Releases memory for off-screen viewers and reloads when they become visible.
   * Call this after initializing all viewers.
   * @param {Object} options - Configuration options
   * @param {string} options.rootMargin - IntersectionObserver rootMargin (default: '200px')
   */
  enableMemoryManagement(options = {}) {
    if (this.memoryObserver) {
      this.memoryObserver.disconnect();
    }

    const rootMargin = options.rootMargin || '200px';

    this.memoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const view = this.getViewById(entry.target.id);
          if (!view) return;

          if (entry.isIntersecting) {
            // Viewer is visible, reload images if memory was released
            if (view.isMemoryReleased) {
              view.reloadImages();
            }
          } else {
            // Viewer is off-screen, release memory
            if (!view.isMemoryReleased && view.isReady) {
              view.releaseMemory();
            }
          }
        });
      },
      { rootMargin }
    );

    // Observe all viewer containers
    this.views.forEach((view, id) => {
      const container = document.getElementById(id);
      if (container) {
        this.memoryObserver.observe(container);
      }
    });
  }

  /**
   * Disable automatic memory management
   */
  disableMemoryManagement() {
    if (this.memoryObserver) {
      this.memoryObserver.disconnect();
      this.memoryObserver = null;
    }
  }
}

export default CI360;
