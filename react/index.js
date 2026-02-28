import { jsx as Ce } from "react/jsx-runtime";
import { useState as Ie, useRef as C, useId as Re, useEffect as he, useCallback as ge, forwardRef as Ve, useMemo as Le, useImperativeHandle as Se } from "react";
let v = null;
function Te(c, t) {
  const [y, d] = Ie(!1), n = C(null), i = C(null), u = Re();
  he(() => {
    if (typeof window > "u" || !c.current || t.autoInit === !1) return;
    let l = !0;
    const a = c.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360-BYB2MAi0.mjs")).default), !a || !l) return;
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
  const f = ge(() => n.current, []);
  return {
    viewer: n.current,
    isReady: y,
    getViewer: f
  };
}
const Oe = (c, t) => {
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
    pointerZoom: A,
    pinchZoom: z,
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
    ciFilters: G,
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
    onAutoplayStop: ne,
    onFullscreenOpen: ae,
    onFullscreenClose: se,
    onZoomIn: ie,
    onZoomOut: le,
    onDragStart: ue,
    onDragEnd: me,
    onHotspotOpen: pe,
    onHotspotClose: ce,
    onError: de,
    ...we
  } = c, fe = C(null), ve = Le(
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
      pointerZoom: A,
      pinchZoom: z,
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
      ciFilters: G,
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
      onAutoplayStop: ne,
      onFullscreenOpen: ae,
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
      A,
      z,
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
      G,
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
      ne,
      ae,
      se,
      ie,
      le,
      ue,
      me,
      pe,
      ce,
      de
    ]
  ), { getViewer: r } = Te(fe, ve);
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
  ), /* @__PURE__ */ Ce(
    "div",
    {
      ref: fe,
      id: y,
      className: d,
      style: n,
      ...we
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
