declare module CI360 {
  export interface CI360ViewerConfig {
    folder?: string; // Default: '/'
    apiVersion?: string; // Default: 'v7'
    filenameX?: string; // Default: 'image-{index}.jpg'
    filenameY?: string | null; // Default: null
    imageListX?: string | null; // Default: null
    imageListY?: string | null; // Default: null
    indexZeroBase?: number; // Default: 0
    amountX?: number; // Default: 0
    amountY?: number; // Default: 0
    draggable?: boolean; // Default: true
    swipeable?: boolean; // Default: true
    keys?: boolean; // Default: false
    keysReverse?: boolean; // Default: false
    bottomCircleOffset?: number; // Default: 5
    autoplay?: boolean; // Default: false
    autoplayBehavior?: string; // Default: AUTOPLAY_BEHAVIOR.SPIN_X
    playOnce?: boolean; // Default: false
    speed?: number; // Default: 80
    autoplayReverse?: boolean; // Default: false
    fullscreen?: boolean; // Default: false
    magnifier?: number | null; // Default: null
    ciToken?: string | null; // Default: null
    ciFilters?: string | null; // Default: null
    ciTransformation?: string | null; // Default: null
    lazyload?: boolean; // Default: true
    dragSpeed?: number; // Default: 150
    stopAtEdges?: boolean; // Default: false
    pointerZoom?: number; // Default: 0
    imageInfo?: boolean; // Changed from string to boolean; Default: false
    initialIconShown?: boolean; // Default: true
    bottomCircle?: boolean; // Default: true
    hotspots?: any; // Default: null (type adjusted as needed)
    dragReverse?: boolean; // Default: false
    hide360Logo?: boolean; // Default: false (not documented)
    logoSrc?: string; // Default: Scaleflex 360 logo URL
  }

  // Define the CI360Viewer class with the config type and constructor
  export default class CI360Viewer {
    constructor(container: HTMLElement | string, config?: CI360ViewerConfig, fullscreen?: boolean);
    destroy(): void;
    update(config: CI360ViewerConfig): void;
    viewerConfig: CI360ViewerConfig;
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
