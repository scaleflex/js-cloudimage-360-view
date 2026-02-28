import type { CSSProperties } from 'react';

/**
 * Autoplay behavior options
 */
export type AutoplayBehavior =
  | 'spin-x'
  | 'spin-y'
  | 'spin-xy'
  | 'spin-yx';

/**
 * Theme options for the viewer
 */
export type Theme = 'light' | 'dark';

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
  // Image source
  folder?: string;
  apiVersion?: string;
  filenameX?: string;
  filenameY?: string | null;
  imageListX?: string | string[] | null;
  imageListY?: string | string[] | null;
  indexZeroBase?: number;
  amountX?: number;
  amountY?: number;

  // Behavior
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

  // UI Features
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
  markerTheme?: MarkerTheme;
  brandColor?: string;

  // Cloudimage CDN
  ciToken?: string | null;
  ciFilters?: string | null;
  ciTransformation?: string | null;

  // Loading
  lazyload?: boolean;

  // Hotspots
  hotspots?: Hotspot[] | null;
  hotspotTrigger?: 'hover' | 'click';
  hotspotTimelineOnClick?: boolean;

  // Container
  /** Aspect ratio for the container (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string | null;

  // CDN crop
  /** Aspect ratio for CDN image cropping (e.g., "16:9", "4:3") — appended as ?ar= param */
  cropAspectRatio?: string | null;
  /** Gravity for CDN image cropping (e.g., "center", "north") — appended as ?gravity= param */
  cropGravity?: string | null;

  // Event callbacks
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
  // Movement
  moveLeft: (stopAtEdges?: boolean, steps?: number) => void;
  moveRight: (stopAtEdges?: boolean, steps?: number) => void;
  moveTop: (stopAtEdges?: boolean, steps?: number) => void;
  moveBottom: (stopAtEdges?: boolean, steps?: number) => void;

  // Playback
  play: () => void;
  stopAutoplay: () => void;

  // Zoom
  toggleZoom: (event?: MouseEvent) => void;
  removeZoom: () => void;

  // Navigation
  animateToFrame: (frame: number, hotspotId?: string) => void;

  // State
  destroy: () => void;
  update: (config: Partial<CI360Config>) => void;

  // Properties
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
  // Container props
  id?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ref methods exposed by CI360Viewer component
 */
export interface CI360ViewerRef {
  /**
   * Move the view to the left
   * @param steps - Number of frames to move (default: 1)
   */
  moveLeft: (steps?: number) => void;

  /**
   * Move the view to the right
   * @param steps - Number of frames to move (default: 1)
   */
  moveRight: (steps?: number) => void;

  /**
   * Move the view upward (Y-axis)
   * @param steps - Number of frames to move (default: 1)
   */
  moveTop: (steps?: number) => void;

  /**
   * Move the view downward (Y-axis)
   * @param steps - Number of frames to move (default: 1)
   */
  moveBottom: (steps?: number) => void;

  /**
   * Start autoplay
   */
  play: () => void;

  /**
   * Stop autoplay
   */
  stop: () => void;

  /**
   * Toggle zoom in
   */
  zoomIn: () => void;

  /**
   * Zoom out
   */
  zoomOut: () => void;

  /**
   * Animate to a specific frame
   * @param frame - Target frame number
   * @param hotspotId - Optional hotspot ID to show after reaching frame
   */
  goToFrame: (frame: number, hotspotId?: string) => void;

  /**
   * Get the underlying CI360 viewer instance for advanced usage
   */
  getViewer: () => CI360ViewerInstance | null;
}

/**
 * Return type for useCI360 hook
 */
export interface UseCI360Return {
  /**
   * The CI360 viewer instance (null during SSR or before initialization)
   */
  viewer: CI360ViewerInstance | null;

  /**
   * Whether the viewer is ready
   */
  isReady: boolean;

  /**
   * Getter function to always get the current viewer instance.
   * Use this in callbacks to avoid stale closure issues.
   */
  getViewer: () => CI360ViewerInstance | null;
}

/**
 * Options for useCI360 hook
 */
export interface UseCI360Options extends CI360Config {
  /**
   * Whether to automatically initialize the viewer
   * @default true
   */
  autoInit?: boolean;
}
