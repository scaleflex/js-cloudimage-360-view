import { jsx as fe } from "react/jsx-runtime";
import { useState as ye, useRef as I, useId as we, useEffect as ve, useCallback as Ie, forwardRef as Ce, useMemo as he, useImperativeHandle as Re } from "react";
let v = null;
function ge(p, t) {
  const [y, d] = ye(!1), n = I(null), s = I(null), u = we();
  ve(() => {
    if (typeof window > "u" || !p.current || t.autoInit === !1) return;
    let l = !0;
    const a = p.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360--3KbDLtq.mjs")).default), !a || !l) return;
        a.id || (a.id = `ci360-${u.replace(/:/g, "")}`);
        const i = {
          ...t,
          onReady: (m) => {
            var c;
            l && (d(!0), (c = t.onReady) == null || c.call(t, m));
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
    t.folder,
    t.filenameX,
    t.filenameY,
    t.imageListX,
    t.imageListY,
    t.amountX,
    t.amountY,
    t.hotspots,
    t.theme,
    u
  ]);
  const f = Ie(() => n.current, []);
  return {
    viewer: n.current,
    isReady: y,
    getViewer: f
  };
}
const Ve = (p, t) => {
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
    swipeable: h,
    keys: R,
    keysReverse: g,
    autoplay: V,
    autoplayBehavior: L,
    playOnce: S,
    speed: T,
    autoplayReverse: Z,
    dragSpeed: F,
    dragReverse: O,
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
    hotspotTrigger: K,
    hotspotTimelineOnClick: Q,
    // Container
    aspectRatio: U,
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
  } = p, me = I(null), de = he(
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
      swipeable: h,
      keys: R,
      keysReverse: g,
      autoplay: V,
      autoplayBehavior: L,
      playOnce: S,
      speed: T,
      autoplayReverse: Z,
      dragSpeed: F,
      dragReverse: O,
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
      hotspotTrigger: K,
      hotspotTimelineOnClick: Q,
      // Container
      aspectRatio: U,
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
      h,
      R,
      g,
      V,
      L,
      S,
      T,
      Z,
      F,
      O,
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
      Q,
      // Container
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
  return Re(
    t,
    () => ({
      moveLeft: (e = 1) => {
        var o;
        return (o = r()) == null ? void 0 : o.moveLeft(!1, e);
      },
      moveRight: (e = 1) => {
        var o;
        return (o = r()) == null ? void 0 : o.moveRight(!1, e);
      },
      moveTop: (e = 1) => {
        var o;
        return (o = r()) == null ? void 0 : o.moveTop(!1, e);
      },
      moveBottom: (e = 1) => {
        var o;
        return (o = r()) == null ? void 0 : o.moveBottom(!1, e);
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
      goToFrame: (e, o) => {
        var ce;
        return (ce = r()) == null ? void 0 : ce.animateToFrame(e, o);
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
}, Le = Ce(Ve);
Le.displayName = "CI360Viewer";
export {
  Le as CI360Viewer,
  Le as CI360ViewerDefault,
  ge as useCI360,
  ge as useCI360Default
};
//# sourceMappingURL=index.js.map
