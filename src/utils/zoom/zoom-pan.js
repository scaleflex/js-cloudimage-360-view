const ZOOM_MIN = 1;

export class ZoomPan {
  constructor(container, {
    zoomMax = 5,
    zoomStep = 0.5,
    onZoomChange,
  } = {}) {
    this.container = container;
    this.zoomMax = zoomMax;
    this.zoomStep = zoomStep;
    this.onZoomChange = onZoomChange;

    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.drawWidth = 0;
    this.drawHeight = 0;

    // Mouse drag-to-pan state
    this.isPanning = false;
    this.panStartX = 0;
    this.panStartY = 0;

    // Bind handlers
    this._onWheel = this._onWheel.bind(this);
    this._onDblClick = this._onDblClick.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onGestureStart = this._onGestureStart.bind(this);
    this._onGestureChange = this._onGestureChange.bind(this);
    this._onGestureEnd = this._onGestureEnd.bind(this);

    this._gestureBaseZoom = 1;

    this._attach();
  }

  setDrawSize(w, h, preservePan = false) {
    const prevW = this.drawWidth;
    const prevH = this.drawHeight;
    this.drawWidth = w;
    this.drawHeight = h;

    if (preservePan && prevW && prevH) {
      // Scale pan proportionally to new dimensions (e.g., fullscreen toggle)
      this.panX = (this.panX / prevW) * w;
      this.panY = (this.panY / prevH) * h;
      this._clampPan();
    } else {
      this.panX = w / 2;
      this.panY = h / 2;
    }
  }

  _attach() {
    this.container.addEventListener('wheel', this._onWheel, { passive: false });
    this.container.addEventListener('dblclick', this._onDblClick);

    // Safari proprietary GestureEvent (trackpad pinch)
    if (typeof GestureEvent !== 'undefined') {
      this.container.addEventListener('gesturestart', this._onGestureStart);
      this.container.addEventListener('gesturechange', this._onGestureChange);
      this.container.addEventListener('gestureend', this._onGestureEnd);
    }
  }

  destroy() {
    this.container.removeEventListener('wheel', this._onWheel);
    this.container.removeEventListener('dblclick', this._onDblClick);
    this._stopPanListeners();

    if (typeof GestureEvent !== 'undefined') {
      this.container.removeEventListener('gesturestart', this._onGestureStart);
      this.container.removeEventListener('gesturechange', this._onGestureChange);
      this.container.removeEventListener('gestureend', this._onGestureEnd);
    }
  }

  // --- Public API ---

  zoomIn() {
    this._applyZoom(this.zoom + this.zoomStep);
  }

  zoomOut() {
    this._applyZoom(this.zoom - this.zoomStep);
  }

  resetZoom() {
    this._applyZoom(ZOOM_MIN);
  }

  setZoom(level) {
    this._applyZoom(level);
  }

  zoomTowardPoint(level, clientX, clientY) {
    this._zoomTowardPoint(level, clientX, clientY);
  }

  getZoom() {
    return this.zoom;
  }

  isZoomed() {
    return this.zoom > ZOOM_MIN;
  }

  // --- Mouse pan management ---

  startPan(pageX, pageY) {
    if (this.zoom <= ZOOM_MIN) return false;
    this.isPanning = true;
    this.panStartX = pageX;
    this.panStartY = pageY;
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
    return true;
  }

  _stopPanListeners() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  _onMouseMove(event) {
    if (!this.isPanning) return;

    const dx = event.pageX - this.panStartX;
    const dy = event.pageY - this.panStartY;

    this.panStartX = event.pageX;
    this.panStartY = event.pageY;

    // Subtract to follow mouse direction (like scrolling a viewport)
    this._applyPan(this.panX - dx, this.panY - dy);
  }

  _onMouseUp() {
    this.isPanning = false;
    this._stopPanListeners();
  }

  // --- Ctrl+Scroll zoom ---

  _onWheel(event) {
    if (!event.ctrlKey && !event.metaKey) return;

    event.preventDefault();

    // deltaY > 0 = scroll down = zoom out; deltaY < 0 = scroll up = zoom in
    const direction = event.deltaY > 0 ? -1 : 1;
    const newZoom = this.zoom + direction * this.zoomStep;

    // Calculate zoom target point relative to canvas
    this._zoomTowardPoint(newZoom, event.clientX, event.clientY);
  }

  // --- Double-click toggle ---

  _onDblClick(event) {
    // Skip interactive elements
    if (event.target && event.target.closest) {
      const isInteractive = event.target.closest('.cloudimage-360-button') ||
        event.target.closest('.cloudimage-360-hotspot-timeline') ||
        event.target.closest('.cloudimage-360-hotspot') ||
        event.target.closest('.cloudimage-360-zoom-controls');
      if (isInteractive) return;
    }

    if (this.zoom > ZOOM_MIN) {
      this._applyZoom(ZOOM_MIN);
    } else {
      // Zoom to 2x toward the click point
      this._zoomTowardPoint(2, event.clientX, event.clientY);
    }
  }

  // --- Safari GestureEvent (trackpad pinch) ---

  _onGestureStart(event) {
    event.preventDefault();
    this._gestureBaseZoom = this.zoom;
  }

  _onGestureChange(event) {
    event.preventDefault();
    const newZoom = this._gestureBaseZoom * event.scale;
    // Zoom toward gesture centroid (Safari provides clientX/clientY on GestureEvent)
    this._zoomTowardPoint(newZoom, event.clientX, event.clientY);
  }

  _onGestureEnd(event) {
    event.preventDefault();
  }

  // --- Keyboard ---

  handleKeyZoom(keyCode) {
    // + or = key
    if (keyCode === 187 || keyCode === 107) {
      this.zoomIn();
      return true;
    }
    // - key
    if (keyCode === 189 || keyCode === 109) {
      this.zoomOut();
      return true;
    }
    // 0 key
    if (keyCode === 48 || keyCode === 96) {
      this.resetZoom();
      return true;
    }
    return false;
  }

  handleKeyPan(keyCode, step = 50) {
    if (this.zoom <= ZOOM_MIN) return false;

    let dx = 0;
    let dy = 0;
    switch (keyCode) {
      case 37: dx = -step; break; // left
      case 39: dx = step; break;  // right
      case 38: dy = -step; break; // up
      case 40: dy = step; break;  // down
      default: return false;
    }

    this._applyPan(this.panX + dx, this.panY + dy);
    return true;
  }

  // --- Touch pan (called by GestureRecognizer) ---

  applyTouchPan(dx, dy) {
    if (this.zoom <= ZOOM_MIN) return;
    this._applyPan(this.panX - dx, this.panY - dy);
  }

  applyTouchZoom(newZoom) {
    this._applyZoom(newZoom);
  }

  // --- Internal ---

  _zoomTowardPoint(newZoom, clientX, clientY) {
    const clamped = Math.max(ZOOM_MIN, Math.min(newZoom, this.zoomMax));
    if (clamped === this.zoom) return;

    // Convert client position to canvas-relative position
    const rect = this.container.querySelector('canvas')?.getBoundingClientRect();
    if (rect) {
      const relX = (clientX - rect.left) / rect.width * this.drawWidth;
      const relY = (clientY - rect.top) / rect.height * this.drawHeight;

      // Shift pan toward the target point proportionally
      const zoomRatio = clamped / this.zoom;
      this.panX = relX + (this.panX - relX) * zoomRatio;
      this.panY = relY + (this.panY - relY) * zoomRatio;
    }

    this.zoom = clamped;
    this._clampPan();
    this._emit();
  }

  _applyZoom(newZoom) {
    const clamped = Math.max(ZOOM_MIN, Math.min(newZoom, this.zoomMax));
    if (clamped === this.zoom) return;

    this.zoom = clamped;

    // If zooming out to 1, reset pan to center
    if (this.zoom <= ZOOM_MIN) {
      this.panX = this.drawWidth / 2;
      this.panY = this.drawHeight / 2;
    }

    this._clampPan();
    this._emit();
  }

  _applyPan(newPanX, newPanY) {
    this.panX = newPanX;
    this.panY = newPanY;
    this._clampPan();
    this._emit();
  }

  _clampPan() {
    if (this.zoom <= ZOOM_MIN || !this.drawWidth || !this.drawHeight) return;

    // Visible area in draw coordinates
    const halfVisibleW = this.drawWidth / (2 * this.zoom);
    const halfVisibleH = this.drawHeight / (2 * this.zoom);

    this.panX = Math.max(halfVisibleW, Math.min(this.panX, this.drawWidth - halfVisibleW));
    this.panY = Math.max(halfVisibleH, Math.min(this.panY, this.drawHeight - halfVisibleH));
  }

  _emit() {
    if (typeof this.onZoomChange === 'function') {
      this.onZoomChange(this.zoom, this.panX, this.panY);
    }
  }
}
