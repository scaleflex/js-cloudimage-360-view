declare module CI360 {
  export interface CI360ViewerConfig {
    folder?: string; // Default: '/'
    apiVersion?: string; // Default: 'v7'
    filenameX?: string; // Default: 'image-{index}.jpg'
    filenameY?: string | null; // Default: null
    imageListX?: string | string[] | null; // Default: null
    imageListY?: string | string[] | null; // Default: null
    indexZeroBase?: number; // Default: 0
    amountX?: number; // Default: 0
    amountY?: number; // Default: 0
    draggable?: boolean; // Default: true
    swipeable?: boolean; // Default: true
    keys?: boolean; // Default: false
    keysReverse?: boolean; // Default: false
    bottomCircleOffset?: number; // Default: 5
    autoplay?: boolean; // Default: false
    autoplayBehavior?: string; // Default: 'spin-x'
    playOnce?: boolean; // Default: false
    speed?: number; // Default: 80
    autoplayReverse?: boolean; // Default: false
    fullscreen?: boolean; // Default: false
    /** @deprecated Use zoomMax instead. */
    magnifier?: number | null; // Default: null
    /** @deprecated Zoom is now always via double-click, Ctrl+scroll, buttons. */
    pointerZoom?: number; // Default: 0
    pinchZoom?: boolean; // Default: true
    zoomMax?: number; // Default: 5
    zoomStep?: number; // Default: 0.5
    zoomControls?: boolean; // Default: true
    zoomControlsPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'; // Default: 'bottom-right'
    scrollHint?: boolean; // Default: true
    ciToken?: string | null; // Default: null
    ciFilters?: string | null; // Default: null
    ciTransformation?: string | null; // Default: null
    lazyload?: boolean; // Default: true
    dragSpeed?: number; // Default: 150
    dragReverse?: boolean; // Default: false
    stopAtEdges?: boolean; // Default: false
    inertia?: boolean; // Default: false
    imageInfo?: boolean; // Default: false
    initialIconShown?: boolean; // Default: true
    bottomCircle?: boolean; // Default: true
    hide360Logo?: boolean; // Default: false
    logoSrc?: string; // Default: Scaleflex 360 logo URL
    hints?: boolean | any[]; // Default: true
    theme?: 'light' | 'dark' | null; // Default: null
    markerTheme?: 'default' | 'inverted' | 'brand' | null; // Default: null
    brandColor?: string | null; // Default: null
    hotspots?: any[] | null; // Default: null
    hotspotTrigger?: 'hover' | 'click'; // Default: 'hover'
    hotspotTimelineOnClick?: boolean; // Default: true
    aspectRatio?: string | null; // Default: null — CSS container aspect-ratio e.g. "16 / 9"
    cropAspectRatio?: string | null; // Default: null — CDN crop ratio e.g. "16:9"
    cropGravity?: string | null; // Default: null — CDN crop gravity e.g. "center"
    // Event callbacks
    onReady?: (data: { viewerId: string }) => void;
    onLoad?: (data: { viewerId: string; imagesX: number; imagesY: number }) => void;
    onSpin?: (data: { viewerId: string; direction: string; activeImageX: number; activeImageY: number; amountX: number; amountY: number }) => void;
    onAutoplayStart?: (data: { viewerId: string }) => void;
    onAutoplayStop?: (data: { viewerId: string }) => void;
    onFullscreenOpen?: (data: { viewerId: string }) => void;
    onFullscreenClose?: (data: { viewerId: string }) => void;
    onZoomIn?: (data: { viewerId: string; zoomLevel: number }) => void;
    onZoomOut?: (data: { viewerId: string }) => void;
    onDragStart?: (data: { viewerId: string }) => void;
    onDragEnd?: (data: { viewerId: string }) => void;
    onHotspotOpen?: (hotspotId: string) => void;
    onHotspotClose?: (hotspotId: string) => void;
    onProductClick?: (productId: string, hotspotId: string) => void;
    onError?: (data: { viewerId: string; error: { message: string; url?: string }; errorCount: number; totalImages: number; errors: Array<{ message: string; url?: string }> }) => void;
  }

  // Define the CI360Viewer class with the config type and constructor
  export default class CI360Viewer {
    constructor(container: HTMLElement | string, config?: CI360ViewerConfig, fullscreen?: boolean);
    destroy(): void;
    update(config: CI360ViewerConfig): void;
    moveLeft(stopAtEdges?: boolean, steps?: number): void;
    moveRight(stopAtEdges?: boolean, steps?: number): void;
    moveTop(stopAtEdges?: boolean, steps?: number): void;
    moveBottom(stopAtEdges?: boolean, steps?: number): void;
    play(): void;
    stopAutoplay(): void;
    toggleZoom(): void;
    removeZoom(): void;
    animateToFrame(frame: number, hotspotId?: string): void;
    zoomPan?: {
      zoomIn(): void;
      zoomOut(): void;
      resetZoom(): void;
      setZoom(level: number): void;
      zoomTowardPoint(level: number, clientX: number, clientY: number): void;
      getZoom(): number;
      isZoomed(): boolean;
    };
    viewerConfig: CI360ViewerConfig;
    isReady: boolean;
    activeImageX: number;
    activeImageY: number;
    amountX: number;
    amountY: number;
    isZoomed: boolean;
  }

  // Define the CI360 class
  export class CI360 {
    views: Map<string, CI360Viewer>;
    instances: CI360Viewer[];
    initAll: (className?: string) => void;
    getInstances: () => CI360Viewer[];
    init: (
      container: HTMLElement | string,
      config?: CI360ViewerConfig,
      fullscreen?: boolean
    ) => CI360Viewer | undefined;
    getViewById: (id: string) => CI360Viewer | undefined;
    getViews: () => CI360Viewer[];
    updateView: (id: string, config: CI360ViewerConfig) => CI360Viewer | undefined;
    destroy: (id: string) => void;
    destroyAll: () => void;
    constructor();
  }
}
