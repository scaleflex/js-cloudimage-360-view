import { jsx as we } from "react/jsx-runtime";
import { useState as ve, useRef as C, useId as Ce, useEffect as Ie, useCallback as Re, forwardRef as he, useMemo as ge, useImperativeHandle as Ve } from "react";
let v = null;
function Le(c, t) {
  const [y, d] = ve(!1), n = C(null), i = C(null), u = Ce();
  Ie(() => {
    if (typeof window > "u" || !c.current || t.autoInit === !1) return;
    let l = !0;
    const a = c.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360-BVEX7yX9.mjs")).default), !a || !l) return;
        a.id || (a.id = `ci360-${u.replace(/:/g, "")}`);
        const s = {
          ...t,
          onReady: (m) => {
            var p;
            l && (d(!0), (p = t.onReady) == null || p.call(t, m));
          }
        };
        i.current = new v(), n.current = i.current.init(a, s);
      } catch (s) {
        console.error("Failed to initialize CI360 viewer:", s);
      }
    })(), () => {
      if (l = !1, n.current) {
        try {
          n.current.destroy();
        } catch {
        }
        n.current = null;
      }
      i.current = null, d(!1);
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
    t.aspectRatio,
    u
  ]);
  const f = Re(() => n.current, []);
  return {
    viewer: n.current,
    isReady: y,
    getViewer: f
  };
}
const Se = (c, t) => {
  const {
    // Container props
    id: y,
    className: d,
    style: n,
    // Image source
    folder: i,
    apiVersion: u,
    filenameX: f,
    filenameY: l,
    imageListX: a,
    imageListY: w,
    indexZeroBase: s,
    amountX: m,
    amountY: p,
    // Behavior
    draggable: I,
    swipeable: R,
    keys: h,
    keysReverse: g,
    autoplay: V,
    autoplayBehavior: L,
    playOnce: S,
    speed: T,
    autoplayReverse: O,
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
    logoSrc: H,
    imageInfo: M,
    hints: N,
    theme: j,
    // Cloudimage CDN
    ciToken: q,
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
    onZoomOut: se,
    onDragStart: ie,
    onDragEnd: le,
    onHotspotOpen: ue,
    onHotspotClose: me,
    onError: pe,
    ...fe
  } = c, ce = C(null), ye = ge(
    () => ({
      // Image source
      folder: i,
      apiVersion: u,
      filenameX: f,
      filenameY: l,
      imageListX: a,
      imageListY: w,
      indexZeroBase: s,
      amountX: m,
      amountY: p,
      // Behavior
      draggable: I,
      swipeable: R,
      keys: h,
      keysReverse: g,
      autoplay: V,
      autoplayBehavior: L,
      playOnce: S,
      speed: T,
      autoplayReverse: O,
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
      logoSrc: H,
      imageInfo: M,
      hints: N,
      theme: j,
      // Cloudimage CDN
      ciToken: q,
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
      onZoomOut: se,
      onDragStart: ie,
      onDragEnd: le,
      onHotspotOpen: ue,
      onHotspotClose: me,
      onError: pe
    }),
    [
      // Image source
      i,
      u,
      f,
      l,
      a,
      w,
      s,
      m,
      p,
      // Behavior
      I,
      R,
      h,
      g,
      V,
      L,
      S,
      T,
      O,
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
      H,
      M,
      N,
      j,
      // Cloudimage CDN
      q,
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
      se,
      ie,
      le,
      ue,
      me,
      pe
    ]
  ), { getViewer: r } = Le(ce, ye);
  return Ve(
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
        var de;
        return (de = r()) == null ? void 0 : de.animateToFrame(e, o);
      },
      getViewer: () => r()
    }),
    [r]
  ), /* @__PURE__ */ we(
    "div",
    {
      ref: ce,
      id: y,
      className: d,
      style: n,
      ...fe
    }
  );
}, Te = he(Se);
Te.displayName = "CI360Viewer";
export {
  Te as CI360Viewer,
  Te as CI360ViewerDefault,
  Le as useCI360,
  Le as useCI360Default
};
//# sourceMappingURL=index.js.map
