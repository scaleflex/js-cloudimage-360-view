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
 * Position options for the zoom controls toolbar
 */
export type ZoomControlsPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

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
  id?: string;
  title?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  url?: string;
  ctaText?: string;
}

/**
 * Marker visual style
 * - 'dot': Simple circular dot (default)
 * - 'dot-label': Dot with adjacent text label pill
 */
export type MarkerStyle = 'dot' | 'dot-label';

/**
 * Marker theme for hotspot dots
 * - 'default': Standard theme-aware markers
 * - 'inverted': Markers blend with the background
 * - 'brand': Uses brand accent color
 */
export type MarkerTheme = 'default' | 'inverted' | 'brand';

/**
 * Hotspot configuration
 */
export interface Hotspot {
  id: string;
  label?: string;
  markerStyle?: MarkerStyle;
  orientation?: HotspotOrientation;
  containerSize?: [number, number];
  positions: Record<number, HotspotPosition>;
  content?: string;
  data?: PopoverData;
  className?: string;
}

/**
 * Valid hint types for the interaction hints overlay
 */
export type HintType = 'drag' | 'swipe' | 'click' | 'dblclick' | 'pinch' | 'keys' | 'fullscreen';

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
  /** @deprecated Use zoomMax instead. Will be ignored. */
  magnifier?: number | null;
  /** @deprecated Zoom is now always via double-click, Ctrl+scroll, buttons. */
  pointerZoom?: number;
  pinchZoom?: boolean;
  zoomMax?: number;
  zoomStep?: number;
  zoomControls?: boolean;
  zoomControlsPosition?: ZoomControlsPosition;
  scrollHint?: boolean;
  bottomCircle?: boolean;
  bottomCircleOffset?: number;
  initialIconShown?: boolean;
  hide360Logo?: boolean;
  logoSrc?: string;
  imageInfo?: boolean;
  hints?: boolean | HintType[];
  theme?: Theme;
  markerTheme?: MarkerTheme;
  brandColor?: string;
  aspectRatio?: string | null;
  ciToken?: string | null;
  ciFilters?: string | null;
  ciTransformation?: string | null;
  cropAspectRatio?: string | null;
  cropGravity?: string | null;
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
  onHotspotOpen?: (hotspotId: string) => void;
  onHotspotClose?: (hotspotId: string) => void;
  onProductClick?: (productId: string, hotspotId: string) => void;
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
  zoomPan?: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    setZoom: (level: number) => void;
    zoomTowardPoint: (level: number, clientX: number, clientY: number) => void;
    getZoom: () => number;
    isZoomed: () => boolean;
  };
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
  resetZoom: () => void;
  setZoom: (level: number) => void;
  goToFrame: (frame: number, hotspotId?: string) => void;
  getViewer: () => CI360ViewerInstance | null;
}

/**
 * Return type for useCI360 hook
 */
export interface UseCI360Return {
  viewer: CI360ViewerInstance | null;
  isReady: boolean;
  getViewer: () => CI360ViewerInstance | null;
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
