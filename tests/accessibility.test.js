import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createAriaLiveRegion,
  announceToScreenReader,
} from '../src/utils/container-elements/create-aria-live-region';
import { createHotspotElement, createPopperElement } from '../src/utils/hotspots';

describe('Accessibility Utilities', () => {
  describe('createAriaLiveRegion', () => {
    it('should create an aria-live region with correct attributes', () => {
      const container = document.createElement('div');
      const liveRegion = createAriaLiveRegion(container);

      expect(liveRegion).toBeInstanceOf(HTMLElement);
      expect(liveRegion.getAttribute('role')).toBe('status');
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
      expect(liveRegion.classList.contains('cloudimage-360-sr-only')).toBe(true);
    });

    it('should append the live region to the container', () => {
      const container = document.createElement('div');
      const liveRegion = createAriaLiveRegion(container);

      expect(container.contains(liveRegion)).toBe(true);
    });
  });

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should set the message in the live region after a timeout', async () => {
      const liveRegion = document.createElement('div');
      const message = 'Image loaded successfully';

      announceToScreenReader(liveRegion, message);

      expect(liveRegion.textContent).toBe('');

      vi.advanceTimersByTime(50);

      expect(liveRegion.textContent).toBe(message);
    });

    it('should clear previous message before setting new one', async () => {
      const liveRegion = document.createElement('div');
      liveRegion.textContent = 'Previous message';

      announceToScreenReader(liveRegion, 'New message');

      // Immediately clears
      expect(liveRegion.textContent).toBe('');

      vi.advanceTimersByTime(50);

      expect(liveRegion.textContent).toBe('New message');
    });

    it('should handle null live region gracefully', () => {
      expect(() => announceToScreenReader(null, 'Test message')).not.toThrow();
    });
  });
});

describe('Hotspot Accessibility', () => {
  describe('createHotspotElement', () => {
    it('should create a button element', () => {
      const hotspot = createHotspotElement('test-id');
      expect(hotspot.tagName).toBe('BUTTON');
    });

    it('should have correct accessibility attributes', () => {
      const hotspot = createHotspotElement('test-id', 'Click for details');

      expect(hotspot.getAttribute('type')).toBe('button');
      expect(hotspot.getAttribute('aria-label')).toBe('Click for details');
      expect(hotspot.getAttribute('aria-haspopup')).toBe('true');
      expect(hotspot.getAttribute('aria-expanded')).toBe('false');
      // aria-describedby is added dynamically when popper is shown
      expect(hotspot.getAttribute('aria-describedby')).toBeNull();
    });

    it('should use default label if not provided', () => {
      const hotspot = createHotspotElement('my-hotspot');
      expect(hotspot.getAttribute('aria-label')).toBe('Hotspot my-hotspot');
    });

    it('should have correct class and data attribute', () => {
      const hotspot = createHotspotElement('test-id');

      expect(hotspot.classList.contains('cloudimage-360-hotspot')).toBe(true);
      expect(hotspot.dataset.hotspotId).toBe('test-id');
      expect(hotspot.id).toBe('test-id');
    });
  });

  describe('createPopperElement', () => {
    afterEach(() => {
      // Clean up any poppers added to body
      document.body.innerHTML = '';
    });

    it('should create a tooltip with correct role', () => {
      const popper = createPopperElement('Test content', 'test-id');

      expect(popper.getAttribute('role')).toBe('tooltip');
      expect(popper.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have correct id for aria-describedby reference', () => {
      const popper = createPopperElement('Test content', 'test-id');

      expect(popper.id).toBe('cloudimage-360-popper-test-id');
    });

    it('should set text content for plain text', () => {
      const popper = createPopperElement('Plain text content', 'test-id');
      expect(popper.textContent).toBe('Plain text content');
    });

    it('should set innerHTML for HTML content', () => {
      const popper = createPopperElement('<strong>Bold</strong> text', 'test-id');
      expect(popper.innerHTML).toBe('<strong>Bold</strong> text');
    });

    it('should be appended to document body', () => {
      const popper = createPopperElement('Test content', 'test-id');
      expect(document.body.contains(popper)).toBe(true);
    });
  });
});

describe('Inner Box Accessibility', () => {
  it('should have role="img" for the inner box', async () => {
    const { createInnerBox } = await import('../src/utils/container-elements/create-inner-box');
    const container = document.createElement('div');
    const innerBox = createInnerBox(container);

    expect(innerBox.getAttribute('role')).toBe('img');
  });

  it('should have descriptive aria-label', async () => {
    const { createInnerBox } = await import('../src/utils/container-elements/create-inner-box');
    const container = document.createElement('div');
    const innerBox = createInnerBox(container);

    expect(innerBox.getAttribute('aria-label')).toContain('360');
    expect(innerBox.getAttribute('aria-label')).toContain('rotate');
  });
});

describe('Button Accessibility', () => {
  it('magnifier button should have aria-label', async () => {
    const { createMagnifierIcon } = await import('../src/utils/container-elements/create-magnifier-icon');
    const button = createMagnifierIcon();

    expect(button.getAttribute('aria-label')).toBe('Magnify image');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('fullscreen button should have aria-label', async () => {
    const { createFullscreenIcon } = await import('../src/utils/container-elements/create-fullscreen-icon');
    const button = createFullscreenIcon();

    expect(button.getAttribute('aria-label')).toBe('View fullscreen');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('close button should have aria-label', async () => {
    const { createCloseIcon } = await import('../src/utils/container-elements/create-close-icon');
    const button = createCloseIcon();

    expect(button.getAttribute('aria-label')).toBe('Close fullscreen');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('buttons should have SVG with aria-hidden', async () => {
    const { createMagnifierIcon } = await import('../src/utils/container-elements/create-magnifier-icon');
    const button = createMagnifierIcon();
    const svg = button.querySelector('svg');

    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
