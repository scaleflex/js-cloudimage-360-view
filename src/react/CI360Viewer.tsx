import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  type ForwardRefRenderFunction,
} from 'react';
import { useCI360 } from './useCI360';
import type {
  CI360ViewerProps,
  CI360ViewerRef,
  CI360Config,
} from './types';

/**
 * CI360Viewer React Component
 *
 * A declarative React wrapper for the CI360 360-degree image viewer.
 *
 * @example
 * ```tsx
 * import { CI360Viewer } from 'js-cloudimage-360-view/react';
 * import 'js-cloudimage-360-view/css';
 *
 * function ProductView() {
 *   return (
 *     <CI360Viewer
 *       folder="https://example.com/images/"
 *       filenameX="product-{index}.jpg"
 *       amountX={36}
 *       autoplay
 *       fullscreen
 *     />
 *   );
 * }
 * ```
 *
 * @example With ref for imperative control
 * ```tsx
 * import { useRef } from 'react';
 * import { CI360Viewer, CI360ViewerRef } from 'js-cloudimage-360-view/react';
 *
 * function ProductView() {
 *   const viewerRef = useRef<CI360ViewerRef>(null);
 *
 *   return (
 *     <>
 *       <CI360Viewer
 *         ref={viewerRef}
 *         folder="https://example.com/images/"
 *         filenameX="{index}.jpg"
 *         amountX={36}
 *         onSpin={(e) => console.log(`Frame: ${e.activeImageX}`)}
 *       />
 *       <button onClick={() => viewerRef.current?.play()}>Play</button>
 *       <button onClick={() => viewerRef.current?.stop()}>Stop</button>
 *     </>
 *   );
 * }
 * ```
 */
const CI360ViewerComponent: ForwardRefRenderFunction<
  CI360ViewerRef,
  CI360ViewerProps
> = (props, ref) => {
  const {
    // Container props
    id,
    className,
    style,

    // Image source
    folder,
    apiVersion,
    filenameX,
    filenameY,
    imageListX,
    imageListY,
    indexZeroBase,
    amountX,
    amountY,

    // Behavior
    draggable,
    swipeable,
    keys,
    keysReverse,
    autoplay,
    autoplayBehavior,
    playOnce,
    speed,
    autoplayReverse,
    dragSpeed,
    dragReverse,
    stopAtEdges,
    inertia,

    // UI Features
    fullscreen,
    magnifier,
    pointerZoom,
    pinchZoom,
    bottomCircle,
    bottomCircleOffset,
    initialIconShown,
    hide360Logo,
    logoSrc,
    imageInfo,
    hints,
    theme,

    // Cloudimage CDN
    ciToken,
    ciFilters,
    ciTransformation,

    // Loading
    lazyload,

    // Hotspots
    hotspots,
    hotspotTimelineOnClick,

    // Event callbacks
    onReady,
    onLoad,
    onSpin,
    onAutoplayStart,
    onAutoplayStop,
    onFullscreenOpen,
    onFullscreenClose,
    onZoomIn,
    onZoomOut,
    onDragStart,
    onDragEnd,
    onError,

    ...restProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize config to prevent unnecessary re-initializations
  const config = useMemo<CI360Config>(
    () => ({
      // Image source
      folder,
      apiVersion,
      filenameX,
      filenameY,
      imageListX,
      imageListY,
      indexZeroBase,
      amountX,
      amountY,

      // Behavior
      draggable,
      swipeable,
      keys,
      keysReverse,
      autoplay,
      autoplayBehavior,
      playOnce,
      speed,
      autoplayReverse,
      dragSpeed,
      dragReverse,
      stopAtEdges,
      inertia,

      // UI Features
      fullscreen,
      magnifier,
      pointerZoom,
      pinchZoom,
      bottomCircle,
      bottomCircleOffset,
      initialIconShown,
      hide360Logo,
      logoSrc,
      imageInfo,
      hints,
      theme,

      // Cloudimage CDN
      ciToken,
      ciFilters,
      ciTransformation,

      // Loading
      lazyload,

      // Hotspots
      hotspots,
      hotspotTimelineOnClick,

      // Event callbacks
      onReady,
      onLoad,
      onSpin,
      onAutoplayStart,
      onAutoplayStop,
      onFullscreenOpen,
      onFullscreenClose,
      onZoomIn,
      onZoomOut,
      onDragStart,
      onDragEnd,
      onError,
    }),
    [
      // Image source
      folder,
      apiVersion,
      filenameX,
      filenameY,
      imageListX,
      imageListY,
      indexZeroBase,
      amountX,
      amountY,

      // Behavior
      draggable,
      swipeable,
      keys,
      keysReverse,
      autoplay,
      autoplayBehavior,
      playOnce,
      speed,
      autoplayReverse,
      dragSpeed,
      dragReverse,
      stopAtEdges,
      inertia,

      // UI Features
      fullscreen,
      magnifier,
      pointerZoom,
      pinchZoom,
      bottomCircle,
      bottomCircleOffset,
      initialIconShown,
      hide360Logo,
      logoSrc,
      imageInfo,
      hints,
      theme,

      // Cloudimage CDN
      ciToken,
      ciFilters,
      ciTransformation,

      // Loading
      lazyload,

      // Hotspots
      hotspots,
      hotspotTimelineOnClick,

      // Event callbacks
      onReady,
      onLoad,
      onSpin,
      onAutoplayStart,
      onAutoplayStop,
      onFullscreenOpen,
      onFullscreenClose,
      onZoomIn,
      onZoomOut,
      onDragStart,
      onDragEnd,
      onError,
    ]
  );

  const { viewer } = useCI360(containerRef, config);

  // Expose imperative methods via ref
  useImperativeHandle(
    ref,
    () => ({
      moveLeft: (steps = 1) => viewer?.moveLeft(false, steps),
      moveRight: (steps = 1) => viewer?.moveRight(false, steps),
      moveTop: (steps = 1) => viewer?.moveTop(false, steps),
      moveBottom: (steps = 1) => viewer?.moveBottom(false, steps),
      play: () => viewer?.play(),
      stop: () => viewer?.stopAutoplay(),
      zoomIn: () => viewer?.toggleZoom(),
      zoomOut: () => viewer?.removeZoom(),
      goToFrame: (frame: number, hotspotId?: string) =>
        viewer?.animateToFrame(frame, hotspotId),
      getViewer: () => viewer,
    }),
    [viewer]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={style}
      {...restProps}
    />
  );
};

export const CI360Viewer = forwardRef(CI360ViewerComponent);
CI360Viewer.displayName = 'CI360Viewer';

export default CI360Viewer;
