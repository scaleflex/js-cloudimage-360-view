import { useEffect, useRef, useState, useId, type RefObject } from 'react';
import type {
  CI360Config,
  CI360ViewerInstance,
  UseCI360Return,
  UseCI360Options,
} from './types';

// Import CI360 class dynamically to avoid SSR issues
let CI360Class: any = null;

/**
 * Custom hook for integrating CI360 viewer with React
 *
 * @param containerRef - React ref to the container element
 * @param config - CI360 configuration options
 * @returns Object containing viewer instance and ready state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const { viewer, isReady } = useCI360(containerRef, {
 *     folder: 'https://example.com/images/',
 *     filenameX: 'image-{index}.jpg',
 *     amountX: 36,
 *   });
 *
 *   return <div ref={containerRef} />;
 * }
 * ```
 */
export function useCI360(
  containerRef: RefObject<HTMLDivElement | null>,
  config: UseCI360Options
): UseCI360Return {
  const [isReady, setIsReady] = useState(false);
  const viewerRef = useRef<CI360ViewerInstance | null>(null);
  const ci360Ref = useRef<any>(null);
  const uniqueId = useId();

  // Initialize viewer
  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;
    if (config.autoInit === false) return;

    let isMounted = true;
    const container = containerRef.current;

    const initViewer = async () => {
      try {
        // Dynamically import CI360 to avoid SSR issues
        if (!CI360Class) {
          const module = await import('../ci360');
          CI360Class = module.default;
        }

        if (!container || !isMounted) return;

        // Set a unique ID on the container if not present
        if (!container.id) {
          container.id = `ci360-${uniqueId.replace(/:/g, '')}`;
        }

        // Wrap user callbacks to update React state
        const wrappedConfig: CI360Config = {
          ...config,
          onReady: (data) => {
            if (isMounted) {
              setIsReady(true);
              config.onReady?.(data);
            }
          },
        };

        // Create CI360 instance and initialize viewer
        ci360Ref.current = new CI360Class();
        viewerRef.current = ci360Ref.current.init(container, wrappedConfig);
      } catch (error) {
        console.error('Failed to initialize CI360 viewer:', error);
      }
    };

    initViewer();

    // Cleanup on unmount or when dependencies change
    return () => {
      isMounted = false;
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          // Ignore errors during cleanup - element may already be detached
        }
        viewerRef.current = null;
      }
      ci360Ref.current = null;
      setIsReady(false);
    };
  }, [
    config.folder,
    config.filenameX,
    config.filenameY,
    config.imageListX,
    config.imageListY,
    config.amountX,
    config.amountY,
    config.theme,
    uniqueId,
  ]);

  return {
    viewer: viewerRef.current,
    isReady,
  };
}

export default useCI360;
