export class GestureRecognizer {
  constructor(container, {
    onPinchZoom,
    onPan,
    onDoubleTap,
    getZoom,
    zoomMax = 5,
  } = {}) {
    this.container = container;
    this.onPinchZoom = onPinchZoom;
    this.onPan = onPan;
    this.onDoubleTap = onDoubleTap;
    this.getZoom = getZoom;
    this.zoomMax = zoomMax;

    // Touch state
    this.isPinching = false;
    this.initialPinchDistance = 0;
    this.pinchBaseZoom = 1;
    this.lastTouchX = 0;
    this.lastTouchY = 0;

    // Double-tap detection
    this.lastTapTime = 0;
    this.lastTapX = 0;
    this.lastTapY = 0;

    // Bind handlers
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this._attach();
  }

  _attach() {
    this.container.addEventListener('touchstart', this._onTouchStart, { passive: false });
    this.container.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this.container.addEventListener('touchend', this._onTouchEnd, { passive: false });
  }

  destroy() {
    this.container.removeEventListener('touchstart', this._onTouchStart);
    this.container.removeEventListener('touchmove', this._onTouchMove);
    this.container.removeEventListener('touchend', this._onTouchEnd);
  }

  _getPinchDistance(t1, t2) {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  _onTouchStart(event) {
    if (!event.touches) return;

    // Two-finger pinch start
    if (event.touches.length === 2) {
      event.preventDefault();
      this.isPinching = true;
      this.initialPinchDistance = this._getPinchDistance(event.touches[0], event.touches[1]);
      this.pinchBaseZoom = typeof this.getZoom === 'function' ? this.getZoom() : 1;
      return;
    }

    // Single finger - track for pan and double-tap
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this.lastTouchX = touch.pageX;
      this.lastTouchY = touch.pageY;

      // Double-tap detection
      const now = Date.now();
      const dt = now - this.lastTapTime;
      const dx = Math.abs(touch.pageX - this.lastTapX);
      const dy = Math.abs(touch.pageY - this.lastTapY);

      if (dt < 300 && dx < 30 && dy < 30) {
        // Double-tap detected
        event.preventDefault();
        event.stopPropagation(); // Prevent service touchStart from setting drag state
        this.lastTapTime = 0;
        if (typeof this.onDoubleTap === 'function') {
          this.onDoubleTap(touch.clientX, touch.clientY);
        }
        return;
      }

      this.lastTapTime = now;
      this.lastTapX = touch.pageX;
      this.lastTapY = touch.pageY;
    }
  }

  _onTouchMove(event) {
    if (!event.touches) return;

    // Pinch zoom
    if (this.isPinching && event.touches.length === 2) {
      event.preventDefault();

      const currentDistance = this._getPinchDistance(event.touches[0], event.touches[1]);
      if (this.initialPinchDistance === 0) {
        this.initialPinchDistance = currentDistance;
        return;
      }

      const scale = currentDistance / this.initialPinchDistance;
      const newZoom = Math.max(1, Math.min(this.pinchBaseZoom * scale, this.zoomMax));

      // Compute pinch centroid so zoom anchors between fingers
      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      if (typeof this.onPinchZoom === 'function') {
        this.onPinchZoom(newZoom, centerX, centerY);
      }
      return;
    }

    // Single finger pan when zoomed
    if (event.touches.length === 1) {
      const currentZoom = typeof this.getZoom === 'function' ? this.getZoom() : 1;
      if (currentZoom <= 1) return; // Let 360 rotation handle it

      event.preventDefault();
      const touch = event.touches[0];
      const dx = touch.pageX - this.lastTouchX;
      const dy = touch.pageY - this.lastTouchY;
      this.lastTouchX = touch.pageX;
      this.lastTouchY = touch.pageY;

      if (typeof this.onPan === 'function') {
        this.onPan(dx, dy);
      }
    }
  }

  _onTouchEnd(event) {
    if (this.isPinching) {
      // End pinch when fewer than 2 fingers remain
      if (!event.touches || event.touches.length < 2) {
        this.isPinching = false;
        this.initialPinchDistance = 0;

        // If we have one finger remaining, update tracking position
        if (event.touches && event.touches.length === 1) {
          this.lastTouchX = event.touches[0].pageX;
          this.lastTouchY = event.touches[0].pageY;
        }
      }
    }
  }
}
