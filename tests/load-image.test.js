import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadImage } from '../src/utils/load-images/load-image';

describe('loadImage', () => {
  let originalImage;

  beforeEach(() => {
    originalImage = global.Image;

    // Mock Image class
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.src && this.src.includes('error')) {
            this.onerror && this.onerror(new Event('error'));
          } else {
            Object.defineProperty(this, 'width', { value: 800 });
            Object.defineProperty(this, 'height', { value: 600 });
            Object.defineProperty(this, 'naturalWidth', { value: 1600 });
            Object.defineProperty(this, 'naturalHeight', { value: 1200 });
            this.onload && this.onload(new Event('load'));
          }
        }, 0);
      }
    };
  });

  afterEach(() => {
    global.Image = originalImage;
  });

  it('should call callback with image data on successful load', async () => {
    const callback = vi.fn();
    const url = 'https://example.com/image.jpg';

    loadImage(url, callback);

    await vi.waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });

    expect(callback).toHaveBeenCalledWith({
      event: expect.any(Event),
      width: 800,
      height: 600,
      naturalWidth: 1600,
      naturalHeight: 1200,
      src: url,
    });
  });

  it('should call onError callback when image fails to load', async () => {
    const callback = vi.fn();
    const onError = vi.fn();
    const url = 'https://example.com/error-image.jpg';

    loadImage(url, callback, onError);

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });

    expect(callback).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Failed to load image'),
      url: url,
    }));
  });

  it('should log error to console if no onError callback provided', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const callback = vi.fn();
    const url = 'https://example.com/error-image.jpg';

    loadImage(url, callback);

    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to load image'));
    consoleSpy.mockRestore();
  });

  it('should work without callback', async () => {
    const url = 'https://example.com/image.jpg';

    // Should not throw
    expect(() => loadImage(url)).not.toThrow();
  });
});
