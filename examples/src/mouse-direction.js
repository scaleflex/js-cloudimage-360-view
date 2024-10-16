import throttle from 'lodash.throttle';

export class MouseDirection {
  constructor(canvas, threshold = 5, isClicked) {
    this.canvas = canvas;
    this.previousX = 0;
    this.previousY = 0;
    this.threshold = threshold;
    this.direction = '';

    this.canvas.addEventListener('mousemove', throttle(this.handleMouseMove.bind(this), 1000));
  }

  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Mouse X relative to canvas
    const mouseY = event.clientY - rect.top; // Mouse Y relative to canvas

    const deltaX = mouseX - this.previousX;
    const deltaY = mouseY - this.previousY;

    let direction = '';

    // Determine dominant axis of movement
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal movement is dominant
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      // Vertical movement is dominant
      direction = deltaY > 0 ? 'down' : 'up';
    }

    // Log the direction if it has changed significantly
    if (direction) {
      this.direction = direction;
    }

    // Update the previous mouse position for the next calculation
    this.previousX = mouseX;
    this.previousY = mouseY;
  }
}
