import CI360Viewer from './ci360.service';

class CI360 {
  constructor() {
    this.views = new Map();
    this.initAll = this.initAll.bind(this);
    this.getViews = this.getViews.bind(this);
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

  getViewById(id) {
    return this.views.get(id);
  }

  getViews() {
    return Array.from(this.views.values());
  }
}

export default CI360;
