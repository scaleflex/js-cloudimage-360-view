import { jsx as de } from "react/jsx-runtime";
import { useState as fe, useRef as I, useId as ye, useEffect as we, useCallback as ve, forwardRef as Ie, useMemo as Ce, useImperativeHandle as Re } from "react";
let v = null;
function he(p, t) {
  const [y, d] = fe(!1), n = I(null), s = I(null), u = ye();
  we(() => {
    if (typeof window > "u" || !p.current || t.autoInit === !1) return;
    let l = !0;
    const a = p.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360-CX3-2b14.mjs")).default), !a || !l) return;
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
    t.theme,
    u
  ]);
  const f = ve(() => n.current, []);
  return {
    viewer: n.current,
    isReady: y,
    getViewer: f
  };
}
const ge = (p, t) => {
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
    hotspotTimelineOnClick: K,
    // Container
    aspectRatio: Q,
    // Event callbacks
    onReady: U,
    onLoad: W,
    onSpin: _,
    onAutoplayStart: ee,
    onAutoplayStop: te,
    onFullscreenOpen: oe,
    onFullscreenClose: re,
    onZoomIn: ne,
    onZoomOut: ae,
    onDragStart: ie,
    onDragEnd: se,
    onError: le,
    ...ce
  } = p, ue = I(null), pe = Ce(
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
      hotspotTimelineOnClick: K,
      // Container
      aspectRatio: Q,
      // Event callbacks
      onReady: U,
      onLoad: W,
      onSpin: _,
      onAutoplayStart: ee,
      onAutoplayStop: te,
      onFullscreenOpen: oe,
      onFullscreenClose: re,
      onZoomIn: ne,
      onZoomOut: ae,
      onDragStart: ie,
      onDragEnd: se,
      onError: le
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
      // Container
      Q,
      // Event callbacks
      U,
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
      le
    ]
  ), { getViewer: r } = he(ue, pe);
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
        var me;
        return (me = r()) == null ? void 0 : me.animateToFrame(e, o);
      },
      getViewer: () => r()
    }),
    [r]
  ), /* @__PURE__ */ de(
    "div",
    {
      ref: ue,
      id: y,
      className: d,
      style: n,
      ...ce
    }
  );
}, Ve = Ie(ge);
Ve.displayName = "CI360Viewer";
export {
  Ve as CI360Viewer,
  Ve as CI360ViewerDefault,
  he as useCI360,
  he as useCI360Default
};
//# sourceMappingURL=index.js.map
