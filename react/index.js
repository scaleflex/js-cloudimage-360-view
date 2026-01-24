import { jsx as fe } from "react/jsx-runtime";
import { useState as ye, useRef as I, useId as we, useEffect as ve, useCallback as Ie, forwardRef as Ce, useMemo as Re, useImperativeHandle as he } from "react";
let v = null;
function ge(p, o) {
  const [y, d] = ye(!1), n = I(null), s = I(null), u = we();
  ve(() => {
    if (typeof window > "u" || !p.current || o.autoInit === !1) return;
    let l = !0;
    const a = p.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360-BrkIJMCK.mjs")).default), !a || !l) return;
        a.id || (a.id = `ci360-${u.replace(/:/g, "")}`);
        const i = {
          ...o,
          onReady: (m) => {
            var c;
            l && (d(!0), (c = o.onReady) == null || c.call(o, m));
          }
        };
        s.current = new v(), n.current = s.current.init(a, i);
      } catch (i) {
        console.error("Failed to initialize CI360 viewer:", i);
      }
    })(), () => {
      if (l = !1, n.current) {
        try {
          n.current.destroy();
        } catch {
        }
        n.current = null;
      }
      s.current = null, d(!1);
    };
  }, [
    o.folder,
    o.filenameX,
    o.filenameY,
    o.imageListX,
    o.imageListY,
    o.amountX,
    o.amountY,
    o.theme,
    u
  ]);
  const f = Ie(() => n.current, []);
  return {
    viewer: n.current,
    isReady: y,
    getViewer: f
  };
}
const Ve = (p, o) => {
  const {
    // Container props
    id: y,
    className: d,
    style: n,
    // Image source
    folder: s,
    apiVersion: u,
    filenameX: f,
    filenameY: l,
    imageListX: a,
    imageListY: w,
    indexZeroBase: i,
    amountX: m,
    amountY: c,
    // Behavior
    draggable: C,
    swipeable: R,
    keys: h,
    keysReverse: g,
    autoplay: V,
    autoplayBehavior: O,
    playOnce: L,
    speed: S,
    autoplayReverse: T,
    dragSpeed: Z,
    dragReverse: F,
    stopAtEdges: X,
    inertia: Y,
    // UI Features
    fullscreen: b,
    magnifier: k,
    pointerZoom: z,
    pinchZoom: A,
    bottomCircle: B,
    bottomCircleOffset: D,
    initialIconShown: E,
    hide360Logo: x,
    logoSrc: M,
    imageInfo: N,
    hints: j,
    theme: q,
    // Cloudimage CDN
    ciToken: H,
    ciFilters: P,
    ciTransformation: $,
    // Loading
    lazyload: G,
    // Hotspots
    hotspots: J,
    hotspotTimelineOnClick: K,
    // Container
    aspectRatio: Q,
    // Responsive
    responsiveOrientation: U,
    // Event callbacks
    onReady: W,
    onLoad: _,
    onSpin: ee,
    onAutoplayStart: te,
    onAutoplayStop: oe,
    onFullscreenOpen: re,
    onFullscreenClose: ne,
    onZoomIn: ae,
    onZoomOut: ie,
    onDragStart: se,
    onDragEnd: le,
    onError: ue,
    ...pe
  } = p, me = I(null), de = Re(
    () => ({
      // Image source
      folder: s,
      apiVersion: u,
      filenameX: f,
      filenameY: l,
      imageListX: a,
      imageListY: w,
      indexZeroBase: i,
      amountX: m,
      amountY: c,
      // Behavior
      draggable: C,
      swipeable: R,
      keys: h,
      keysReverse: g,
      autoplay: V,
      autoplayBehavior: O,
      playOnce: L,
      speed: S,
      autoplayReverse: T,
      dragSpeed: Z,
      dragReverse: F,
      stopAtEdges: X,
      inertia: Y,
      // UI Features
      fullscreen: b,
      magnifier: k,
      pointerZoom: z,
      pinchZoom: A,
      bottomCircle: B,
      bottomCircleOffset: D,
      initialIconShown: E,
      hide360Logo: x,
      logoSrc: M,
      imageInfo: N,
      hints: j,
      theme: q,
      // Cloudimage CDN
      ciToken: H,
      ciFilters: P,
      ciTransformation: $,
      // Loading
      lazyload: G,
      // Hotspots
      hotspots: J,
      hotspotTimelineOnClick: K,
      // Container
      aspectRatio: Q,
      // Responsive
      responsiveOrientation: U,
      // Event callbacks
      onReady: W,
      onLoad: _,
      onSpin: ee,
      onAutoplayStart: te,
      onAutoplayStop: oe,
      onFullscreenOpen: re,
      onFullscreenClose: ne,
      onZoomIn: ae,
      onZoomOut: ie,
      onDragStart: se,
      onDragEnd: le,
      onError: ue
    }),
    [
      // Image source
      s,
      u,
      f,
      l,
      a,
      w,
      i,
      m,
      c,
      // Behavior
      C,
      R,
      h,
      g,
      V,
      O,
      L,
      S,
      T,
      Z,
      F,
      X,
      Y,
      // UI Features
      b,
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
      // Cloudimage CDN
      H,
      P,
      $,
      // Loading
      G,
      // Hotspots
      J,
      K,
      // Container
      Q,
      // Responsive
      U,
      // Event callbacks
      W,
      _,
      ee,
      te,
      oe,
      re,
      ne,
      ae,
      ie,
      se,
      le,
      ue
    ]
  ), { getViewer: r } = ge(me, de);
  return he(
    o,
    () => ({
      moveLeft: (e = 1) => {
        var t;
        return (t = r()) == null ? void 0 : t.moveLeft(!1, e);
      },
      moveRight: (e = 1) => {
        var t;
        return (t = r()) == null ? void 0 : t.moveRight(!1, e);
      },
      moveTop: (e = 1) => {
        var t;
        return (t = r()) == null ? void 0 : t.moveTop(!1, e);
      },
      moveBottom: (e = 1) => {
        var t;
        return (t = r()) == null ? void 0 : t.moveBottom(!1, e);
      },
      play: () => {
        var e;
        return (e = r()) == null ? void 0 : e.play();
      },
      stop: () => {
        var e;
        return (e = r()) == null ? void 0 : e.stopAutoplay();
      },
      zoomIn: () => {
        var e;
        return (e = r()) == null ? void 0 : e.toggleZoom();
      },
      zoomOut: () => {
        var e;
        return (e = r()) == null ? void 0 : e.removeZoom();
      },
      goToFrame: (e, t) => {
        var ce;
        return (ce = r()) == null ? void 0 : ce.animateToFrame(e, t);
      },
      setOrientation: (e) => {
        var t;
        return (t = r()) == null ? void 0 : t.setOrientation(e);
      },
      getViewer: () => r()
    }),
    [r]
  ), /* @__PURE__ */ fe(
    "div",
    {
      ref: me,
      id: y,
      className: d,
      style: n,
      ...pe
    }
  );
}, Oe = Ce(Ve);
Oe.displayName = "CI360Viewer";
export {
  Oe as CI360Viewer,
  Oe as CI360ViewerDefault,
  ge as useCI360,
  ge as useCI360Default
};
//# sourceMappingURL=index.js.map
