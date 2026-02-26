import { CSSProperties, RefObject, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Autoplay behavior options
 */
export type AutoplayBehavior = 'spin-x' | 'spin-y' | 'spin-xy' | 'spin-yx';

/**
 * Theme options for the viewer
 */
export type Theme = 'light' | 'dark';

/**
 * Hotspot trigger mode - hover or click
 */
export type HotspotTrigger = 'hover' | 'click';

/**
 * Hotspot orientation
 */
export type HotspotOrientation = 'x' | 'y';

/**
 * Hotspot position
 */
export interface HotspotPosition {
  x: number;
  y: number;
}

/**
 * Structured popover data for the built-in product-card template.
 * Priority: content (raw HTML) > data (built-in template) > nothing.
 */
export interface PopoverData {
  title?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  url?: string;
  ctaText?: string;
}

/**
 * Hotspot configuration
 */
export interface Hotspot {
  id: string;
  label?: string;
  orientation?: HotspotOrientation;
  containerSize?: [number, number];
  positions: Record<number, HotspotPosition>;
  content?: string;
  data?: PopoverData;
  className?: string;
}

/**
 * Hint configuration
 */
export interface Hint {
  text: string;
  icon?: 'drag' | 'scroll' | 'pinch' | 'keys';
}

/**
 * Spin event data
 */
export interface SpinEventData {
  viewerId: string;
  direction: 'left' | 'right' | 'up' | 'down';
  activeImageX: number;
  activeImageY: number;
  amountX: number;
  amountY: number;
}

/**
 * Load event data
 */
export interface LoadEventData {
  viewerId: string;
  imagesX: number;
  imagesY: number;
}

/**
 * Zoom event data
 */
export interface ZoomEventData {
  viewerId: string;
  zoomLevel: number;
}

/**
 * Error event data
 */
export interface ErrorEventData {
  viewerId: string;
  error: { message: string; url?: string };
  errorCount: number;
  totalImages: number;
  errors: Array<{ message: string; url?: string }>;
}

/**
 * Base event data (common to all events)
 */
export interface BaseEventData {
  viewerId: string;
}

/**
 * CI360 Configuration options
 */
export interface CI360Config {
  folder?: string;
  apiVersion?: string;
  filenameX?: string;
  filenameY?: string | null;
  imageListX?: string | string[] | null;
  imageListY?: string | string[] | null;
  indexZeroBase?: number;
  amountX?: number;
  amountY?: number;
  draggable?: boolean;
  swipeable?: boolean;
  keys?: boolean;
  keysReverse?: boolean;
  autoplay?: boolean;
  autoplayBehavior?: AutoplayBehavior;
  playOnce?: boolean;
  speed?: number;
  autoplayReverse?: boolean;
  dragSpeed?: number;
  dragReverse?: boolean;
  stopAtEdges?: boolean;
  inertia?: boolean;
  fullscreen?: boolean;
  magnifier?: number | null;
  pointerZoom?: number;
  pinchZoom?: boolean;
  bottomCircle?: boolean;
  bottomCircleOffset?: number;
  initialIconShown?: boolean;
  hide360Logo?: boolean;
  logoSrc?: string;
  imageInfo?: boolean;
  hints?: boolean | Hint[];
  theme?: Theme;
  ciToken?: string | null;
  ciFilters?: string | null;
  ciTransformation?: string | null;
  lazyload?: boolean;
  hotspots?: Hotspot[] | null;
  hotspotTrigger?: HotspotTrigger;
  hotspotTimelineOnClick?: boolean;
  onReady?: (data: BaseEventData) => void;
  onLoad?: (data: LoadEventData) => void;
  onSpin?: (data: SpinEventData) => void;
  onAutoplayStart?: (data: BaseEventData) => void;
  onAutoplayStop?: (data: BaseEventData) => void;
  onFullscreenOpen?: (data: BaseEventData) => void;
  onFullscreenClose?: (data: BaseEventData) => void;
  onZoomIn?: (data: ZoomEventData) => void;
  onZoomOut?: (data: BaseEventData) => void;
  onDragStart?: (data: BaseEventData) => void;
  onDragEnd?: (data: BaseEventData) => void;
  onError?: (data: ErrorEventData) => void;
}

/**
 * CI360 Viewer Instance methods available from the native viewer
 */
export interface CI360ViewerInstance {
  moveLeft: (stopAtEdges?: boolean, steps?: number) => void;
  moveRight: (stopAtEdges?: boolean, steps?: number) => void;
  moveTop: (stopAtEdges?: boolean, steps?: number) => void;
  moveBottom: (stopAtEdges?: boolean, steps?: number) => void;
  play: () => void;
  stopAutoplay: () => void;
  toggleZoom: (event?: MouseEvent) => void;
  removeZoom: () => void;
  animateToFrame: (frame: number, hotspotId?: string) => void;
  destroy: () => void;
  update: (config: Partial<CI360Config>) => void;
  isReady: boolean;
  activeImageX: number;
  activeImageY: number;
  amountX: number;
  amountY: number;
  isZoomed: boolean;
  viewerConfig: CI360Config;
}

/**
 * Props for the CI360Viewer React component
 */
export interface CI360ViewerProps extends CI360Config {
  id?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ref methods exposed by CI360Viewer component
 */
export interface CI360ViewerRef {
  moveLeft: (steps?: number) => void;
  moveRight: (steps?: number) => void;
  moveTop: (steps?: number) => void;
  moveBottom: (steps?: number) => void;
  play: () => void;
  stop: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  goToFrame: (frame: number, hotspotId?: string) => void;
  getViewer: () => CI360ViewerInstance | null;
}

/**
 * Return type for useCI360 hook
 */
export interface UseCI360Return {
  viewer: CI360ViewerInstance | null;
  isReady: boolean;
}

/**
 * Options for useCI360 hook
 */
export interface UseCI360Options extends CI360Config {
  autoInit?: boolean;
}

/**
 * CI360Viewer React Component
 */
export declare const CI360Viewer: ForwardRefExoticComponent<CI360ViewerProps & RefAttributes<CI360ViewerRef>>;
export default CI360Viewer;

/**
 * useCI360 Hook for advanced control
 */
export declare function useCI360(
  containerRef: RefObject<HTMLDivElement | null>,
  config: UseCI360Options
): UseCI360Return;
