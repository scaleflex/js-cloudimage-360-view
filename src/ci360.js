import CI360Viewer from './ci360.service';
import { hasConfigChanged } from './utils';

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

  updateView(id, config) {
    const view = this.getViewById(id);
    const updatedConfig = { ...view.viewerConfig, ...config };
    const requireReload = hasConfigChanged(view.viewerConfig, config);

    if (requireReload) {
      view.destroy();
      const container = document.getElementById(id);
      this.init(container, updatedConfig);
    } else {
      view.update(updatedConfig);
    }

    return view;
  }
}

export default CI360;
