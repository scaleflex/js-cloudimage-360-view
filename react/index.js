import { jsx as pe } from "react/jsx-runtime";
import { useState as de, useRef as I, useId as fe, useEffect as ye, forwardRef as Ie, useMemo as Ce, useImperativeHandle as Re } from "react";
let y = null;
function he(c, t) {
  const [d, p] = de(!1), n = I(null), s = I(null), i = fe();
  return ye(() => {
    if (typeof window > "u" || !c.current || t.autoInit === !1) return;
    let l = !0;
    const a = c.current;
    return (async () => {
      try {
        if (y || (y = (await import("./ci360-CJCqgguJ.mjs")).default), !a || !l) return;
        a.id || (a.id = `ci360-${i.replace(/:/g, "")}`);
        const r = {
          ...t,
          onReady: (u) => {
            var m;
            l && (p(!0), (m = t.onReady) == null || m.call(t, u));
          }
        };
        s.current = new y(), n.current = s.current.init(a, r);
      } catch (r) {
        console.error("Failed to initialize CI360 viewer:", r);
      }
    })(), () => {
      if (l = !1, n.current) {
        try {
          n.current.destroy();
        } catch {
        }
        n.current = null;
      }
      s.current = null, p(!1);
    };
  }, [
    t.folder,
    t.filenameX,
    t.filenameY,
    t.imageListX,
    t.imageListY,
    t.amountX,
    t.amountY,
    t.theme,
    i
  ]), {
    viewer: n.current,
    isReady: d
  };
}
const ge = (c, t) => {
  const {
    // Container props
    id: d,
    className: p,
    style: n,
    // Image source
    folder: s,
    apiVersion: i,
    filenameX: l,
    filenameY: a,
    imageListX: f,
    imageListY: r,
    indexZeroBase: u,
    amountX: m,
    amountY: C,
    // Behavior
    draggable: R,
    swipeable: h,
    keys: g,
    keysReverse: L,
    autoplay: S,
    autoplayBehavior: V,
    playOnce: T,
    speed: Z,
    autoplayReverse: F,
    dragSpeed: O,
    dragReverse: X,
    stopAtEdges: Y,
    inertia: b,
    // UI Features
    fullscreen: k,
    magnifier: z,
    pointerZoom: A,
    pinchZoom: B,
    bottomCircle: D,
    bottomCircleOffset: E,
    initialIconShown: x,
    hide360Logo: M,
    logoSrc: N,
    imageInfo: j,
    hints: q,
    theme: v,
    // Cloudimage CDN
    ciToken: w,
    ciFilters: H,
    ciTransformation: P,
    // Loading
    lazyload: $,
    // Hotspots
    hotspots: G,
    hotspotTimelineOnClick: J,
    // Container
    aspectRatio: K,
    // Event callbacks
    onReady: Q,
    onLoad: U,
    onSpin: W,
    onAutoplayStart: _,
    onAutoplayStop: ee,
    onFullscreenOpen: te,
    onFullscreenClose: oe,
    onZoomIn: ne,
    onZoomOut: ae,
    onDragStart: re,
    onDragEnd: se,
    onError: le,
    ...ue
  } = c, ie = I(null), me = Ce(
    () => ({
      // Image source
      folder: s,
      apiVersion: i,
      filenameX: l,
      filenameY: a,
      imageListX: f,
      imageListY: r,
      indexZeroBase: u,
      amountX: m,
      amountY: C,
      // Behavior
      draggable: R,
      swipeable: h,
      keys: g,
      keysReverse: L,
      autoplay: S,
      autoplayBehavior: V,
      playOnce: T,
      speed: Z,
      autoplayReverse: F,
      dragSpeed: O,
      dragReverse: X,
      stopAtEdges: Y,
      inertia: b,
      // UI Features
      fullscreen: k,
      magnifier: z,
      pointerZoom: A,
      pinchZoom: B,
      bottomCircle: D,
      bottomCircleOffset: E,
      initialIconShown: x,
      hide360Logo: M,
      logoSrc: N,
      imageInfo: j,
      hints: q,
      theme: v,
      // Cloudimage CDN
      ciToken: w,
      ciFilters: H,
      ciTransformation: P,
      // Loading
      lazyload: $,
      // Hotspots
      hotspots: G,
      hotspotTimelineOnClick: J,
      // Container
      aspectRatio: K,
      // Event callbacks
      onReady: Q,
      onLoad: U,
      onSpin: W,
      onAutoplayStart: _,
      onAutoplayStop: ee,
      onFullscreenOpen: te,
      onFullscreenClose: oe,
      onZoomIn: ne,
      onZoomOut: ae,
      onDragStart: re,
      onDragEnd: se,
      onError: le
    }),
    [
      // Image source
      s,
      i,
      l,
      a,
      f,
      r,
      u,
      m,
      C,
      // Behavior
      R,
      h,
      g,
      L,
      S,
      V,
      T,
      Z,
      F,
      O,
      X,
      Y,
      b,
      // UI Features
      k,
      z,
      A,
      B,
      D,
      E,
      x,
      M,
      N,
      j,
      q,
      v,
      // Cloudimage CDN
      w,
      H,
      P,
      // Loading
      $,
      // Hotspots
      G,
      J,
      // Container
      K,
      // Event callbacks
      Q,
      U,
      W,
      _,
      ee,
      te,
      oe,
      ne,
      ae,
      re,
      se,
      le
    ]
  ), { viewer: e } = he(ie, me);
  return Re(
    t,
    () => ({
      moveLeft: (o = 1) => e == null ? void 0 : e.moveLeft(!1, o),
      moveRight: (o = 1) => e == null ? void 0 : e.moveRight(!1, o),
      moveTop: (o = 1) => e == null ? void 0 : e.moveTop(!1, o),
      moveBottom: (o = 1) => e == null ? void 0 : e.moveBottom(!1, o),
      play: () => e == null ? void 0 : e.play(),
      stop: () => e == null ? void 0 : e.stopAutoplay(),
      zoomIn: () => e == null ? void 0 : e.toggleZoom(),
      zoomOut: () => e == null ? void 0 : e.removeZoom(),
      goToFrame: (o, ce) => e == null ? void 0 : e.animateToFrame(o, ce),
      getViewer: () => e
    }),
    [e]
  ), /* @__PURE__ */ pe(
    "div",
    {
      ref: ie,
      id: d,
      className: p,
      style: n,
      ...ue
    }
  );
}, Le = Ie(ge);
Le.displayName = "CI360Viewer";
export {
  Le as CI360Viewer,
  Le as CI360ViewerDefault,
  he as useCI360,
  he as useCI360Default
};
//# sourceMappingURL=index.js.map
