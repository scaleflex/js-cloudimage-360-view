import { jsx as Re } from "react/jsx-runtime";
import { useState as Ce, useRef as R, useId as Ie, useEffect as he, useCallback as ge, forwardRef as Ve, useMemo as Le, useImperativeHandle as Se } from "react";
let w = null;
function Te(c, t) {
  const [y, d] = Ce(!1), a = R(null), i = R(null), u = Ie();
  he(() => {
    if (typeof window > "u" || !c.current || t.autoInit === !1) return;
    let l = !0;
    const n = c.current;
    return (async () => {
      try {
        if (w || (w = (await import("./ci360-CAu4PLFX.mjs")).default), !n || !l) return;
        n.id || (n.id = `ci360-${u.replace(/:/g, "")}`);
        const s = {
          ...t,
          onReady: (m) => {
            var p;
            l && (d(!0), (p = t.onReady) == null || p.call(t, m));
          }
        };
        i.current = new w(), a.current = i.current.init(n, s);
      } catch (s) {
        console.error("Failed to initialize CI360 viewer:", s);
      }
    })(), () => {
      if (l = !1, a.current) {
        try {
          a.current.destroy();
        } catch {
        }
        a.current = null;
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
    t.cropAspectRatio,
    t.cropGravity,
    u
  ]);
  const f = ge(() => a.current, []);
  return {
    viewer: a.current,
    isReady: y,
    getViewer: f
  };
}
const Oe = (c, t) => {
  const {
    // Container props
    id: y,
    className: d,
    style: a,
    // Image source
    folder: i,
    apiVersion: u,
    filenameX: f,
    filenameY: l,
    imageListX: n,
    imageListY: v,
    indexZeroBase: s,
    amountX: m,
    amountY: p,
    // Behavior
    draggable: C,
    swipeable: I,
    keys: h,
    keysReverse: g,
    autoplay: V,
    autoplayBehavior: L,
    playOnce: S,
    speed: T,
    autoplayReverse: O,
    dragSpeed: Z,
    dragReverse: A,
    stopAtEdges: F,
    inertia: X,
    // UI Features
    fullscreen: Y,
    magnifier: b,
    pointerZoom: k,
    pinchZoom: z,
    bottomCircle: B,
    bottomCircleOffset: D,
    initialIconShown: E,
    hide360Logo: x,
    logoSrc: H,
    imageInfo: G,
    hints: M,
    theme: N,
    // Cloudimage CDN
    ciToken: j,
    ciFilters: q,
    ciTransformation: P,
    cropAspectRatio: $,
    cropGravity: J,
    // Loading
    lazyload: K,
    // Hotspots
    hotspots: Q,
    hotspotTrigger: U,
    hotspotTimelineOnClick: W,
    // Container
    aspectRatio: _,
    // Event callbacks
    onReady: ee,
    onLoad: te,
    onSpin: oe,
    onAutoplayStart: re,
    onAutoplayStop: ae,
    onFullscreenOpen: ne,
    onFullscreenClose: se,
    onZoomIn: ie,
    onZoomOut: le,
    onDragStart: ue,
    onDragEnd: me,
    onHotspotOpen: pe,
    onHotspotClose: ce,
    onError: de,
    ...ve
  } = c, fe = R(null), we = Le(
    () => ({
      // Image source
      folder: i,
      apiVersion: u,
      filenameX: f,
      filenameY: l,
      imageListX: n,
      imageListY: v,
      indexZeroBase: s,
      amountX: m,
      amountY: p,
      // Behavior
      draggable: C,
      swipeable: I,
      keys: h,
      keysReverse: g,
      autoplay: V,
      autoplayBehavior: L,
      playOnce: S,
      speed: T,
      autoplayReverse: O,
      dragSpeed: Z,
      dragReverse: A,
      stopAtEdges: F,
      inertia: X,
      // UI Features
      fullscreen: Y,
      magnifier: b,
      pointerZoom: k,
      pinchZoom: z,
      bottomCircle: B,
      bottomCircleOffset: D,
      initialIconShown: E,
      hide360Logo: x,
      logoSrc: H,
      imageInfo: G,
      hints: M,
      theme: N,
      // Cloudimage CDN
      ciToken: j,
      ciFilters: q,
      ciTransformation: P,
      cropAspectRatio: $,
      cropGravity: J,
      // Loading
      lazyload: K,
      // Hotspots
      hotspots: Q,
      hotspotTrigger: U,
      hotspotTimelineOnClick: W,
      // Container
      aspectRatio: _,
      // Event callbacks
      onReady: ee,
      onLoad: te,
      onSpin: oe,
      onAutoplayStart: re,
      onAutoplayStop: ae,
      onFullscreenOpen: ne,
      onFullscreenClose: se,
      onZoomIn: ie,
      onZoomOut: le,
      onDragStart: ue,
      onDragEnd: me,
      onHotspotOpen: pe,
      onHotspotClose: ce,
      onError: de
    }),
    [
      // Image source
      i,
      u,
      f,
      l,
      n,
      v,
      s,
      m,
      p,
      // Behavior
      C,
      I,
      h,
      g,
      V,
      L,
      S,
      T,
      O,
      Z,
      A,
      F,
      X,
      // UI Features
      Y,
      b,
      k,
      z,
      B,
      D,
      E,
      x,
      H,
      G,
      M,
      N,
      // Cloudimage CDN
      j,
      q,
      P,
      $,
      J,
      // Loading
      K,
      // Hotspots
      Q,
      U,
      W,
      // Container
      _,
      // Event callbacks
      ee,
      te,
      oe,
      re,
      ae,
      ne,
      se,
      ie,
      le,
      ue,
      me,
      pe,
      ce,
      de
    ]
  ), { getViewer: r } = Te(fe, we);
  return Se(
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
        var ye;
        return (ye = r()) == null ? void 0 : ye.animateToFrame(e, o);
      },
      getViewer: () => r()
    }),
    [r]
  ), /* @__PURE__ */ Re(
    "div",
    {
      ref: fe,
      id: y,
      className: d,
      style: a,
      ...ve
    }
  );
}, Ze = Ve(Oe);
Ze.displayName = "CI360Viewer";
export {
  Ze as CI360Viewer,
  Ze as CI360ViewerDefault,
  Te as useCI360,
  Te as useCI360Default
};
//# sourceMappingURL=index.js.map
