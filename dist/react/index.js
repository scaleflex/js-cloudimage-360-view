import { jsx as Ze } from "react/jsx-runtime";
import { useState as ge, useRef as I, useId as Le, useEffect as Oe, useCallback as ke, forwardRef as Pe, useMemo as be, useImperativeHandle as Ae } from "react";
let v = null;
function Fe(d, t) {
  const [C, f] = ge(!1), n = I(null), i = I(null), m = Le();
  Oe(() => {
    if (typeof window > "u" || !d.current || t.autoInit === !1) return;
    let l = !0;
    const a = d.current;
    return (async () => {
      try {
        if (v || (v = (await import("./ci360-DiDt_kvA.mjs")).default), !a || !l) return;
        a.id || (a.id = `ci360-${m.replace(/:/g, "")}`);
        const s = {
          ...t,
          onReady: (u) => {
            var p;
            l && (f(!0), (p = t.onReady) == null || p.call(t, u));
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
      i.current = null, f(!1);
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
    m
  ]);
  const y = ke(() => n.current, []);
  return {
    viewer: n.current,
    isReady: C,
    getViewer: y
  };
}
const Xe = (d, t) => {
  const {
    // Container props
    id: C,
    className: f,
    style: n,
    // Image source
    folder: i,
    apiVersion: m,
    filenameX: y,
    filenameY: l,
    imageListX: a,
    imageListY: w,
    indexZeroBase: s,
    amountX: u,
    amountY: p,
    // Behavior
    draggable: R,
    swipeable: h,
    keys: z,
    keysReverse: V,
    autoplay: S,
    autoplayBehavior: T,
    playOnce: Z,
    speed: g,
    autoplayReverse: L,
    dragSpeed: O,
    dragReverse: k,
    stopAtEdges: P,
    inertia: b,
    // UI Features
    fullscreen: A,
    magnifier: F,
    pointerZoom: X,
    pinchZoom: Y,
    zoomMax: x,
    zoomStep: B,
    zoomControls: D,
    zoomControlsPosition: E,
    scrollHint: H,
    bottomCircle: M,
    bottomCircleOffset: G,
    initialIconShown: N,
    hide360Logo: j,
    logoSrc: q,
    imageInfo: $,
    hints: J,
    theme: K,
    markerTheme: Q,
    brandColor: U,
    // Cloudimage CDN
    ciToken: W,
    ciFilters: _,
    ciTransformation: ee,
    cropAspectRatio: oe,
    cropGravity: te,
    // Loading
    lazyload: re,
    // Hotspots
    hotspots: ne,
    hotspotTrigger: ae,
    hotspotTimelineOnClick: se,
    // Container
    aspectRatio: ie,
    // Event callbacks
    onReady: le,
    onLoad: me,
    onSpin: ue,
    onAutoplayStart: pe,
    onAutoplayStop: ce,
    onFullscreenOpen: de,
    onFullscreenClose: fe,
    onZoomIn: ye,
    onZoomOut: Ce,
    onDragStart: we,
    onDragEnd: ve,
    onHotspotOpen: Ie,
    onHotspotClose: Re,
    onProductClick: he,
    onError: ze,
    ...Se
  } = d, Ve = I(null), Te = be(
    () => ({
      // Image source
      folder: i,
      apiVersion: m,
      filenameX: y,
      filenameY: l,
      imageListX: a,
      imageListY: w,
      indexZeroBase: s,
      amountX: u,
      amountY: p,
      // Behavior
      draggable: R,
      swipeable: h,
      keys: z,
      keysReverse: V,
      autoplay: S,
      autoplayBehavior: T,
      playOnce: Z,
      speed: g,
      autoplayReverse: L,
      dragSpeed: O,
      dragReverse: k,
      stopAtEdges: P,
      inertia: b,
      // UI Features
      fullscreen: A,
      magnifier: F,
      pointerZoom: X,
      pinchZoom: Y,
      zoomMax: x,
      zoomStep: B,
      zoomControls: D,
      zoomControlsPosition: E,
      scrollHint: H,
      bottomCircle: M,
      bottomCircleOffset: G,
      initialIconShown: N,
      hide360Logo: j,
      logoSrc: q,
      imageInfo: $,
      hints: J,
      theme: K,
      markerTheme: Q,
      brandColor: U,
      // Cloudimage CDN
      ciToken: W,
      ciFilters: _,
      ciTransformation: ee,
      cropAspectRatio: oe,
      cropGravity: te,
      // Loading
      lazyload: re,
      // Hotspots
      hotspots: ne,
      hotspotTrigger: ae,
      hotspotTimelineOnClick: se,
      // Container
      aspectRatio: ie,
      // Event callbacks
      onReady: le,
      onLoad: me,
      onSpin: ue,
      onAutoplayStart: pe,
      onAutoplayStop: ce,
      onFullscreenOpen: de,
      onFullscreenClose: fe,
      onZoomIn: ye,
      onZoomOut: Ce,
      onDragStart: we,
      onDragEnd: ve,
      onHotspotOpen: Ie,
      onHotspotClose: Re,
      onProductClick: he,
      onError: ze
    }),
    [
      // Image source
      i,
      m,
      y,
      l,
      a,
      w,
      s,
      u,
      p,
      // Behavior
      R,
      h,
      z,
      V,
      S,
      T,
      Z,
      g,
      L,
      O,
      k,
      P,
      b,
      // UI Features
      A,
      F,
      X,
      Y,
      x,
      B,
      D,
      E,
      H,
      M,
      G,
      N,
      j,
      q,
      $,
      J,
      K,
      Q,
      U,
      // Cloudimage CDN
      W,
      _,
      ee,
      oe,
      te,
      // Loading
      re,
      // Hotspots
      ne,
      ae,
      se,
      // Container
      ie,
      // Event callbacks
      le,
      me,
      ue,
      pe,
      ce,
      de,
      fe,
      ye,
      Ce,
      we,
      ve,
      Ie,
      Re,
      he,
      ze
    ]
  ), { getViewer: r } = Fe(Ve, Te);
  return Ae(
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
        var e, o;
        return (o = (e = r()) == null ? void 0 : e.zoomPan) == null ? void 0 : o.zoomIn();
      },
      zoomOut: () => {
        var e, o;
        return (o = (e = r()) == null ? void 0 : e.zoomPan) == null ? void 0 : o.zoomOut();
      },
      resetZoom: () => {
        var e, o;
        return (o = (e = r()) == null ? void 0 : e.zoomPan) == null ? void 0 : o.resetZoom();
      },
      setZoom: (e) => {
        var o, c;
        return (c = (o = r()) == null ? void 0 : o.zoomPan) == null ? void 0 : c.setZoom(e);
      },
      goToFrame: (e, o) => {
        var c;
        return (c = r()) == null ? void 0 : c.animateToFrame(e, o);
      },
      getViewer: () => r()
    }),
    [r]
  ), /* @__PURE__ */ Ze(
    "div",
    {
      ref: Ve,
      id: C,
      className: f,
      style: n,
      ...Se
    }
  );
}, Ye = Pe(Xe);
Ye.displayName = "CI360Viewer";
export {
  Ye as CI360Viewer,
  Ye as CI360ViewerDefault,
  Fe as useCI360,
  Fe as useCI360Default
};
//# sourceMappingURL=index.js.map
