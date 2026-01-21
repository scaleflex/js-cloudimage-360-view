import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadImages } from '../src/utils/load-images/load-images';

describe('loadImages', () => {
  let originalImage;
  let mockCreateImageBitmap;

  beforeEach(() => {
    originalImage = global.Image;
    mockCreateImageBitmap = vi.fn().mockResolvedValue({ width: 100, height: 100 });
    global.createImageBitmap = mockCreateImageBitmap;

    // Mock Image class
    global.Image = class {
      constructor() {
        this.crossOrigin = '';
        setTimeout(() => {
          if (this.src && this.src.includes('error')) {
            this.onerror && this.onerror(new Event('error'));
          } else {
            Object.defineProperty(this, 'naturalWidth', { value: 1600 });
            Object.defineProperty(this, 'naturalHeight', { value: 1200 });
            this.onload && this.onload(new Event('load'));
          }
        }, 10);
      }
    };
  });

  afterEach(() => {
    global.Image = originalImage;
    delete global.createImageBitmap;
    vi.clearAllMocks();
  });

  it('should call onFirstImageLoad when first image loads', async () => {
    const onFirstImageLoad = vi.fn();
    const onImageLoad = vi.fn();
    const onAllImagesLoad = vi.fn();

    const imagesUrls = ['https://example.com/image1.jpg'];

    loadImages({
      imagesUrls,
      onFirstImageLoad,
      onImageLoad,
      onAllImagesLoad,
      autoplayReverse: false,
    });

    await vi.waitFor(() => {
      expect(onFirstImageLoad).toHaveBeenCalled();
    });

    expect(onFirstImageLoad).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://example.com/image1.jpg',
        naturalWidth: 1600,
        naturalHeight: 1200,
      })
    );
  });

  it('should call onAllImagesLoad when all images are loaded', async () => {
    const onFirstImageLoad = vi.fn();
    const onImageLoad = vi.fn();
    const onAllImagesLoad = vi.fn();

    const imagesUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    loadImages({
      imagesUrls,
      onFirstImageLoad,
      onImageLoad,
      onAllImagesLoad,
      autoplayReverse: false,
    });

    await vi.waitFor(
      () => {
        expect(onAllImagesLoad).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );

    const [loadedImages, stats] = onAllImagesLoad.mock.calls[0];
    expect(loadedImages).toHaveLength(3);
    expect(stats.errorCount).toBe(0);
    expect(stats.errors).toHaveLength(0);
  });

  it('should call onError callback when an image fails to load', async () => {
    const onFirstImageLoad = vi.fn();
    const onImageLoad = vi.fn();
    const onAllImagesLoad = vi.fn();
    const onError = vi.fn();

    const imagesUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/error-image.jpg',
      'https://example.com/image3.jpg',
    ];

    loadImages({
      imagesUrls,
      onFirstImageLoad,
      onImageLoad,
      onAllImagesLoad,
      onError,
      autoplayReverse: false,
    });

    await vi.waitFor(
      () => {
        expect(onAllImagesLoad).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );

    expect(onError).toHaveBeenCalled();
    const errorCall = onError.mock.calls[0][0];
    expect(errorCall.error.url).toContain('error-image');
    expect(errorCall.errorCount).toBeGreaterThan(0);

    const [loadedImages, stats] = onAllImagesLoad.mock.calls[0];
    expect(stats.errorCount).toBe(1);
    expect(stats.errors).toHaveLength(1);
  });

  it('should load first image from end when autoplayReverse is true', async () => {
    const onFirstImageLoad = vi.fn();
    const onImageLoad = vi.fn();
    const onAllImagesLoad = vi.fn();

    const imagesUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    loadImages({
      imagesUrls,
      onFirstImageLoad,
      onImageLoad,
      onAllImagesLoad,
      autoplayReverse: true,
    });

    await vi.waitFor(() => {
      expect(onFirstImageLoad).toHaveBeenCalled();
    });

    expect(onFirstImageLoad).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://example.com/image3.jpg',
      })
    );
  });

  it('should continue loading other images even if first image fails', async () => {
    const onFirstImageLoad = vi.fn();
    const onImageLoad = vi.fn();
    const onAllImagesLoad = vi.fn();
    const onError = vi.fn();

    const imagesUrls = [
      'https://example.com/error-first.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    loadImages({
      imagesUrls,
      onFirstImageLoad,
      onImageLoad,
      onAllImagesLoad,
      onError,
      autoplayReverse: false,
    });

    await vi.waitFor(
      () => {
        expect(onAllImagesLoad).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );

    expect(onFirstImageLoad).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();

    const [loadedImages, stats] = onAllImagesLoad.mock.calls[0];
    // First image failed, so we should have 2 successful images
    const successfulImages = loadedImages.filter(Boolean);
    expect(successfulImages).toHaveLength(2);
    expect(stats.errorCount).toBe(1);
  });
});
