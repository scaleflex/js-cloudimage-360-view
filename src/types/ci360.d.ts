declare module CI360 {
  export interface CI360ViewerConfig {
    folder?: string;
    apiVersion?: string;
    filenameX?: string;
    filenameY?: string;
    imageListX?: string | null;
    imageListY?: string | null;
    indexZeroBase?: number;
    amountX?: number;
    amountY?: number;
    draggable?: boolean;
    swipeable?: boolean;
    keys?: boolean;
    keysReverse?: boolean;
    bottomCircle?: boolean;
    bottomCircleOffset?: number;
    autoplay?: boolean;
    autoplayBehavior?: string;
    playOnce?: boolean;
    speed?: number;
    autoplayReverse?: boolean;
    fullscreen?: boolean;
    magnifier?: number | null;
    ciToken?: string | null;
    ciFilters?: string | null;
    ciTransformation?: string | null;
    lazyload?: boolean;
    dragSpeed?: number;
    stopAtEdges?: boolean;
    logoSrc?: string;
    pointerZoom?: number;
    imageInfo?: string;
    initialIconHidden?: boolean;
    bottomCircleHidden?: boolean;
  }

  // Define the CI360Viewer class with the config type and constructor
  export default class CI360Viewer {
    constructor(container: HTMLElement | string, config?: CI360ViewerConfig, fullscreen?: boolean);
  }

  // Define the CI360 class
  export class CI360 {
    instances: CI360Viewer[];
    initAll: (className?: string) => void;
    getInstances: () => CI360Viewer[];
    init: (container: HTMLElement | string, config?: CI360ViewerConfig, fullscreen?: boolean) => CI360Viewer;
    constructor();
  }
}
