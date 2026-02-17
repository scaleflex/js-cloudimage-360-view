var ai = Object.defineProperty;
var li = (e, t, i) => t in e ? ai(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var me = (e, t, i) => li(e, typeof t != "symbol" ? t + "" : t, i);
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ci(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var We = "Expected a function", fe = NaN, hi = "[object Symbol]", di = /^\s+|\s+$/g, ui = /^[-+]0x[0-9a-f]+$/i, pi = /^0b[01]+$/i, mi = /^0o[0-7]+$/i, fi = parseInt, vi = typeof Rt == "object" && Rt && Rt.Object === Object && Rt, gi = typeof self == "object" && self && self.Object === Object && self, yi = vi || gi || Function("return this")(), bi = Object.prototype, wi = bi.toString, Ci = Math.max, Ii = Math.min, Kt = function() {
  return yi.Date.now();
};
function xi(e, t, i) {
  var o, s, n, r, a, l, c = 0, h = !1, u = !1, f = !0;
  if (typeof e != "function")
    throw new TypeError(We);
  t = ve(t) || 0, Bt(i) && (h = !!i.leading, u = "maxWait" in i, n = u ? Ci(ve(i.maxWait) || 0, t) : n, f = "trailing" in i ? !!i.trailing : f);
  function p(m) {
    var g = o, I = s;
    return o = s = void 0, c = m, r = e.apply(I, g), r;
  }
  function C(m) {
    return c = m, a = setTimeout(E, t), h ? p(m) : r;
  }
  function b(m) {
    var g = m - l, I = m - c, T = t - g;
    return u ? Ii(T, n - I) : T;
  }
  function v(m) {
    var g = m - l, I = m - c;
    return l === void 0 || g >= t || g < 0 || u && I >= n;
  }
  function E() {
    var m = Kt();
    if (v(m))
      return S(m);
    a = setTimeout(E, b(m));
  }
  function S(m) {
    return a = void 0, f && o ? p(m) : (o = s = void 0, r);
  }
  function w() {
    a !== void 0 && clearTimeout(a), c = 0, o = l = s = a = void 0;
  }
  function y() {
    return a === void 0 ? r : S(Kt());
  }
  function x() {
    var m = Kt(), g = v(m);
    if (o = arguments, s = this, l = m, g) {
      if (a === void 0)
        return C(l);
      if (u)
        return a = setTimeout(E, t), p(l);
    }
    return a === void 0 && (a = setTimeout(E, t)), r;
  }
  return x.cancel = w, x.flush = y, x;
}
function Ei(e, t, i) {
  var o = !0, s = !0;
  if (typeof e != "function")
    throw new TypeError(We);
  return Bt(i) && (o = "leading" in i ? !!i.leading : o, s = "trailing" in i ? !!i.trailing : s), xi(e, t, {
    leading: o,
    maxWait: t,
    trailing: s
  });
}
function Bt(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function Si(e) {
  return !!e && typeof e == "object";
}
function Ti(e) {
  return typeof e == "symbol" || Si(e) && wi.call(e) == hi;
}
function ve(e) {
  if (typeof e == "number")
    return e;
  if (Ti(e))
    return fe;
  if (Bt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Bt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(di, "");
  var i = pi.test(e);
  return i || mi.test(e) ? fi(e.slice(2), i ? 2 : 8) : ui.test(e) ? fe : +e;
}
var Ai = Ei;
const ge = /* @__PURE__ */ ci(Ai), X = {
  SPIN_X: "spin-x",
  SPIN_Y: "spin-y",
  SPIN_XY: "spin-xy",
  SPIN_YX: "spin-yx"
}, ki = [!1, 0, null, void 0, "false", "0", "null", "undefined"], _ = {
  X: "x-axis",
  Y: "y-axis"
}, Li = [37, 39], Oi = [38, 40], Pi = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), ye = Pi ? 32 : 10, Mi = 150, _i = 150, Yi = 200, be = 50, Xi = 50, Ri = 5, Hi = 5, d = {
  folder: "/",
  apiVersion: "v7",
  filenameX: "image-{index}.jpg",
  filenameY: null,
  imageListX: null,
  imageListY: null,
  indexZeroBase: 0,
  amountX: 0,
  amountY: 0,
  speed: 80,
  dragSpeed: 150,
  draggable: !0,
  swipeable: !0,
  keys: !1,
  keysReverse: !1,
  autoplay: !1,
  autoplayBehavior: X.SPIN_X,
  playOnce: !1,
  autoplayReverse: !1,
  pointerZoom: 0,
  pointerZoomTrigger: "dblclick",
  fullscreen: !1,
  magnifier: null,
  bottomCircle: !0,
  bottomCircleOffset: 5,
  ciToken: null,
  ciFilters: null,
  ciTransformation: null,
  lazyload: !0,
  dragReverse: !1,
  stopAtEdges: !1,
  imageInfo: !1,
  initialIconShown: !0,
  hotspots: null,
  hotspotTrigger: "hover",
  hide360Logo: !1,
  logoSrc: null,
  inertia: !1,
  pinchZoom: !0,
  hints: !0,
  theme: null,
  hotspotTimelineOnClick: !0,
  aspectRatio: null,
  zoomControls: !0,
  zoomControlsPosition: "bottom-left",
  scrollHint: !0,
  // Event callbacks
  onReady: null,
  onLoad: null,
  onSpin: null,
  onAutoplayStart: null,
  onAutoplayStop: null,
  onFullscreenOpen: null,
  onFullscreenClose: null,
  onZoomIn: null,
  onZoomOut: null,
  onDragStart: null,
  onDragEnd: null
}, Di = (e) => ({
  folder: k(e, "folder", d.folder),
  apiVersion: k(e, "api-version", d.apiVersion),
  filenameX: k(e, "filename") || k(e, "filename-x") || d.filenameX,
  filenameY: k(e, "filename-y", d.filenameY),
  imageListX: k(e, "image-list-x", d.imageListX),
  imageListY: k(e, "image-list-y", d.imageListY),
  indexZeroBase: parseInt(k(e, "index-zero-base", d.indexZeroBase), 10),
  amountX: parseInt(k(e, "amount-x", d.amountX), 10),
  amountY: parseInt(k(e, "amount-y", d.amountY), 10),
  speed: parseInt(k(e, "speed", d.speed), 10),
  dragSpeed: parseInt(k(e, "drag-speed", d.dragSpeed), 10),
  draggable: M(e, "draggable", d.draggable),
  swipeable: M(e, "swipeable", d.swipeable),
  keys: M(e, "keys", d.keys),
  keysReverse: M(e, "keys-reverse", d.keysReverse),
  autoplay: M(e, "autoplay", d.autoplay),
  autoplayBehavior: k(e, "autoplay-behavior", d.autoplayBehavior),
  playOnce: M(e, "play-once", d.playOnce),
  autoplayReverse: M(e, "autoplay-reverse", d.autoplayReverse),
  pointerZoom: parseFloat(k(e, "pointer-zoom", d.pointerZoom)),
  pointerZoomTrigger: k(e, "pointer-zoom-trigger", d.pointerZoomTrigger),
  fullscreen: M(e, "fullscreen") || M(e, "full-screen", d.fullscreen),
  magnifier: parseFloat(k(e, "magnifier", d.magnifier)),
  bottomCircleOffset: parseInt(
    k(e, "bottom-circle-offset", d.bottomCircleOffset),
    10
  ),
  ciToken: k(e, "responsive", d.ciToken),
  ciFilters: k(e, "filters", d.ciFilters),
  ciTransformation: k(e, "transformation", d.ciTransformation),
  lazyload: M(e, "lazyload", d.lazyload),
  dragReverse: M(e, "drag-reverse", d.dragReverse),
  stopAtEdges: M(e, "stop-at-edges", d.stopAtEdges),
  imageInfo: M(e, "info", d.imageInfo),
  initialIconShown: !ut(e, "initial-icon"),
  bottomCircle: !ut(e, "bottom-circle"),
  hide360Logo: M(e, "hide-360-logo", d.hide360Logo),
  logoSrc: k(e, "logo-src", d.logoSrc),
  inertia: M(e, "inertia", d.inertia),
  pinchZoom: M(e, "pinch-zoom", d.pinchZoom),
  hints: !ut(e, "hints"),
  theme: k(e, "theme", d.theme),
  hotspotTrigger: k(e, "hotspot-trigger", d.hotspotTrigger),
  hotspotTimelineOnClick: !ut(e, "hotspot-timeline-on-click"),
  aspectRatio: k(e, "aspect-ratio", d.aspectRatio),
  zoomControls: !ut(e, "zoom-controls"),
  zoomControlsPosition: k(e, "zoom-controls-position", d.zoomControlsPosition),
  scrollHint: !ut(e, "scroll-hint")
}), Bi = (e) => {
  const t = [];
  e.amountX !== void 0 && e.amountX < 0 && t.push("amountX should be a positive number"), e.amountY !== void 0 && e.amountY < 0 && t.push("amountY should be a positive number"), e.speed !== void 0 && e.speed <= 0 && t.push("speed should be a positive number"), e.dragSpeed !== void 0 && e.dragSpeed <= 0 && t.push("dragSpeed should be a positive number"), e.pointerZoom !== void 0 && e.pointerZoom !== 0 && (e.pointerZoom < 1 || e.pointerZoom > 5) && t.push("pointerZoom should be between 1 and 5 (or 0 to disable)"), e.magnifier !== void 0 && e.magnifier !== null && e.magnifier !== 0 && (e.magnifier < 1 || e.magnifier > 5) && t.push("magnifier should be between 1 and 5 (or 0/null to disable)"), !e.folder && !e.imageListX && !e.imageListY && t.push("Either folder or imageListX/imageListY is required"), e.folder && !e.amountX && !e.imageListX && t.push("amountX is required when using folder (unless imageListX is provided)");
  const i = ["spin-x", "spin-y", "spin-xy", "spin-yx"];
  return e.autoplayBehavior && !i.includes(e.autoplayBehavior) && t.push(`autoplayBehavior should be one of: ${i.join(", ")}`), t.forEach((o) => {
    console.warn(`CloudImage 360: ${o}`);
  }), t.length === 0;
}, zi = (e) => (Bi(e), {
  folder: e.folder || d.folder,
  apiVersion: e.apiVersion || d.apiVersion,
  filenameX: e.filenameX || e.filename || d.filenameX,
  filenameY: e.filenameY || d.filenameY,
  imageListX: e.imageListX || d.imageListX,
  imageListY: e.imageListY || d.imageListY,
  indexZeroBase: parseInt(e.indexZeroBase ?? d.indexZeroBase, 10),
  amountX: parseInt(e.amountX ?? d.amountX, 10),
  amountY: parseInt(e.amountY ?? d.amountY, 10),
  speed: parseInt(e.speed ?? d.speed, 10),
  draggable: e.draggable ?? d.draggable,
  swipeable: e.swipeable ?? d.swipeable,
  dragSpeed: parseInt(e.dragSpeed ?? d.dragSpeed, 10),
  keys: e.keys ?? d.keys,
  keysReverse: e.keysReverse ?? d.keysReverse,
  autoplay: e.autoplay ?? d.autoplay,
  autoplayBehavior: e.autoplayBehavior || d.autoplayBehavior,
  playOnce: e.playOnce ?? d.playOnce,
  autoplayReverse: e.autoplayReverse ?? d.autoplayReverse,
  pointerZoom: parseFloat(e.pointerZoom ?? d.pointerZoom),
  pointerZoomTrigger: e.pointerZoomTrigger || d.pointerZoomTrigger,
  fullscreen: e.fullscreen ?? d.fullscreen,
  magnifier: parseFloat(e.magnifier ?? d.magnifier),
  bottomCircleOffset: parseInt(e.bottomCircleOffset ?? d.bottomCircleOffset, 10),
  ciToken: e.ciToken || d.ciToken,
  ciFilters: e.ciFilters || d.ciFilters,
  ciTransformation: e.ciTransformation || d.ciTransformation,
  lazyload: e.lazyload ?? d.lazyload,
  dragReverse: e.dragReverse ?? d.dragReverse,
  stopAtEdges: e.stopAtEdges ?? d.stopAtEdges,
  imageInfo: e.imageInfo ?? d.imageInfo,
  initialIconShown: e.initialIconShown ?? d.initialIconShown,
  bottomCircle: e.bottomCircle ?? d.bottomCircle,
  hotspots: e.hotspots ?? d.hotspots,
  hotspotTrigger: e.hotspotTrigger || d.hotspotTrigger,
  hide360Logo: e.hide360Logo ?? d.hide360Logo,
  logoSrc: e.logoSrc || d.logoSrc,
  inertia: e.inertia ?? d.inertia,
  pinchZoom: e.pinchZoom ?? d.pinchZoom,
  hints: e.hints ?? d.hints,
  theme: e.theme || d.theme,
  hotspotTimelineOnClick: e.hotspotTimelineOnClick ?? d.hotspotTimelineOnClick,
  aspectRatio: e.aspectRatio || d.aspectRatio,
  zoomControls: e.zoomControls ?? d.zoomControls,
  zoomControlsPosition: e.zoomControlsPosition || d.zoomControlsPosition,
  scrollHint: e.scrollHint ?? d.scrollHint,
  // Event callbacks
  onReady: e.onReady ?? d.onReady,
  onLoad: e.onLoad ?? d.onLoad,
  onSpin: e.onSpin ?? d.onSpin,
  onAutoplayStart: e.onAutoplayStart ?? d.onAutoplayStart,
  onAutoplayStop: e.onAutoplayStop ?? d.onAutoplayStop,
  onFullscreenOpen: e.onFullscreenOpen ?? d.onFullscreenOpen,
  onFullscreenClose: e.onFullscreenClose ?? d.onFullscreenClose,
  onZoomIn: e.onZoomIn ?? d.onZoomIn,
  onZoomOut: e.onZoomOut ?? d.onZoomOut,
  onDragStart: e.onDragStart ?? d.onDragStart,
  onDragEnd: e.onDragEnd ?? d.onDragEnd
}), k = (e, t, i) => e.getAttribute(t) || e.getAttribute(`data-${t}`) || i, M = (e, t, i) => {
  if (!(e.hasAttribute(t) || e.hasAttribute(`data-${t}`))) return i;
  const s = k(e, t, null);
  return s !== "false" && s !== "0";
}, ut = (e, t) => k(e, t, null) === "false", Zi = (e = 1) => {
  const t = Math.round(window.devicePixelRatio || 1);
  return parseInt(e) * t;
}, Fi = (e, t, i) => new URL(e).origin.includes("cloudimg") ? e : `https://${t}.cloudimg.io/${i}${e}`, Ni = ({ ciTransformation: e, responsiveWidth: t, ciFilters: i }) => {
  const o = `width=${t}`, s = e || o, n = i ? `&f=${i}` : "";
  return `${s}${n}`;
}, It = (e, t) => {
  const { folder: i, apiVersion: o, filename: s = "", ciParams: n } = e, { ciToken: r, ciFilters: a, ciTransformation: l } = n || {}, c = `${i}${s}`;
  if (!r || !t) return c;
  const h = ki.includes(o) ? null : o, u = h ? `${h}/` : "", f = Zi(t), p = Fi(c, r, u), C = Ni({
    ciTransformation: l,
    responsiveWidth: f,
    ciFilters: a
  });
  return `${p}${C ? "?" : ""}${C}`;
}, Vi = (e, t, i) => {
  const [o, s] = e.split("?"), n = `${t}=${encodeURIComponent(i)}`;
  if (!s)
    return `${o}?${n}`;
  const r = new URLSearchParams(s);
  return r.set(t, i), `${o}?${r.toString()}`;
}, Wi = (e, t) => Vi(e, "width", t), $e = (e, t = 0) => (e += "", e.length >= t ? e : new Array(t - e.length + 1).join("0") + e), $i = (e, { amount: t = 0, indexZeroBase: i = 0 } = {}) => Array.from({ length: t }, (o, s) => e.replace("{index}", $e(s + 1, i))), ji = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), Ui = ji ? 3 : 6, Gi = ({
  imagesUrls: e,
  onFirstImageLoad: t,
  onImageLoad: i,
  onAllImagesLoad: o,
  onError: s,
  autoplayReverse: n
}) => {
  let r = 0, a = 0;
  const l = e.length, c = [], h = [];
  let u = 0, f = 0;
  const p = [], C = (m, g, I = !1) => {
    const T = {
      message: `Failed to load image: ${m}`,
      url: m,
      index: g,
      isFirstImage: I
    };
    h.push(T), a++, s == null || s({
      error: T,
      errorCount: a,
      totalImages: l,
      errors: h
    });
  }, b = () => {
    r === l && (o == null || o(c, { errorCount: a, errors: h }));
  }, v = () => {
    for (; u < Ui && f < p.length; ) {
      const m = p[f];
      f++, E(e[m], m);
    }
  }, E = (m, g) => {
    u++;
    const I = new Image();
    I.crossOrigin = "anonymous", I.src = m, I.onload = async () => {
      try {
        const T = await createImageBitmap(I), A = {
          src: m,
          bitmapImage: T,
          naturalWidth: I.naturalWidth,
          naturalHeight: I.naturalHeight
        };
        I.onload = null, I.onerror = null, I.src = "", r++, u--, c[g] = A, i == null || i(A, g), b(), v();
      } catch {
        I.onload = null, I.onerror = null, I.src = "", r++, u--, C(m, g), b(), v();
      }
    }, I.onerror = () => {
      I.onload = null, I.onerror = null, I.src = "", r++, u--, C(m, g), b(), v();
    };
  }, S = (m) => {
    for (let g = 0; g < e.length; g++)
      g !== m && p.push(g);
    f = 0, v();
  }, w = new Image(), y = n ? e.length - 1 : 0, x = e[y];
  w.crossOrigin = "anonymous", w.src = x, w.onload = async () => {
    try {
      const m = await createImageBitmap(w), g = {
        src: x,
        bitmapImage: m,
        naturalWidth: w.naturalWidth,
        naturalHeight: w.naturalHeight
      };
      w.onload = null, w.onerror = null, w.src = "", c[y] = g, r++, t == null || t(g), i == null || i(g, y), l === 1 ? b() : S(y);
    } catch {
      w.onload = null, w.onerror = null, w.src = "", r++, C(x, y, !0), l === 1 ? b() : S(y);
    }
  }, w.onerror = () => {
    w.onload = null, w.onerror = null, w.src = "", r++, C(x, y, !0), l === 1 ? b() : S(y);
  };
}, we = ({
  cdnPathX: e,
  cdnPathY: t,
  configX: i,
  configY: o,
  onFirstImageLoad: s,
  onImageLoad: n,
  onAllImagesLoad: r,
  onError: a
}) => {
  let l = { x: !1, y: !1 }, c = [], h = [], u = { errorCount: 0, errors: [] }, f = { errorCount: 0, errors: [] };
  const p = e || i.imageList.length, C = t || o.imageList.length, b = () => {
    if (l.x && l.y) {
      const E = {
        errorCount: u.errorCount + f.errorCount,
        errors: [...u.errors, ...f.errors]
      };
      r == null || r(c, h, E);
    }
  }, v = ({ cdnPath: E, config: S, orientation: w, loadedImages: y, loadStats: x, onFirstImageLoad: m }) => {
    const g = w === _.X, I = S.imageList.length ? S.imageList : $i(E, S);
    Gi({
      imagesUrls: I,
      onFirstImageLoad: m,
      onImageLoad: (T, A) => {
        n == null || n(T, A, w), y[A] = T;
      },
      onError: (T) => {
        a == null || a({ ...T, orientation: w });
      },
      onAllImagesLoad: (T, A) => {
        y.length = 0, T.forEach((L, Y) => {
          L && (y[Y] = L);
        }), x.errorCount = A.errorCount, x.errors = A.errors.map((L) => ({ ...L, orientation: w })), l[g ? "x" : "y"] = !0, b();
      },
      autoplayReverse: S.autoplayReverse
    });
  };
  p ? v({
    cdnPath: e,
    config: i,
    orientation: _.X,
    loadedImages: c,
    loadStats: u,
    onFirstImageLoad: s
  }) : l.x = !0, C ? v({
    cdnPath: t,
    config: o,
    orientation: _.Y,
    loadedImages: h,
    loadStats: f,
    onFirstImageLoad: p ? void 0 : s
  }) : l.y = !0, !p && !C && b();
}, Ki = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1052 156" aria-hidden="true">
  <path fill="currentColor" d="M409.9,145.6c-42.7-1.7-85.5-4.4-128.1-8.4c-21.3-2-42.6-4.3-63.8-7.1c-21.2-2.8-42.4-5.9-63.4-9.7c-21.1-3.8-42-8.2-62.7-13.7c-10.3-2.8-20.6-5.8-30.7-9.4c-10.1-3.5-20.1-7.6-29.5-12.7c-4.7-2.6-9.3-5.4-13.5-8.8c-2.1-1.7-4-3.6-5.8-5.6c-1.8-2-3.3-4.3-4.3-6.8c-1.1-2.5-1.6-5.3-1.4-8c0.2-2.7,1.1-5.4,2.4-7.7c2.7-4.8,6.7-8.5,11-11.7c8.6-6.4,18.4-10.9,28.3-15c9.9-4,20.1-7.3,30.4-10.3c-10.2,3.1-20.4,6.5-30.3,10.5c-9.8,4.1-19.6,8.7-28.1,15.1c-4.2,3.2-8.2,6.9-10.7,11.6c-1.2,2.3-2.1,4.8-2.3,7.5c-0.1,2.6,0.4,5.2,1.4,7.6c2.1,4.8,5.9,8.7,10,12.1c4.1,3.3,8.7,6.1,13.4,8.6c9.4,5,19.4,8.9,29.4,12.4c10.1,3.5,20.4,6.4,30.7,9.1c20.7,5.3,41.6,9.5,62.7,13.2c21,3.6,42.2,6.6,63.4,9.2c21.2,2.6,42.5,4.8,63.7,6.6c42.6,3.7,85.2,6,127.9,7.4L409.9,145.6z"/>
  <path fill="currentColor" d="M977.1,11.6c13.8,4.1,27.4,8.8,40.4,15.2c6.4,3.2,12.7,6.9,18.3,11.5c2.7,2.4,5.3,5,7.3,8c2,3,3.3,6.6,3.3,10.3c0,3.7-1.4,7.2-3.3,10.3c-2,3.1-4.5,5.7-7.3,8.1c-2.7,2.4-5.7,4.4-8.8,6.3c-1.6,0.9-3.1,1.9-4.7,2.7l-2.4,1.3l-2.4,1.2C1004.5,93,990.8,97.8,977,102c-6.9,2.1-13.8,4-20.8,5.8c-7,1.8-14,3.5-21,5c-14.1,3.1-28.2,5.9-42.4,8.3c-28.4,4.9-57,8.8-85.6,12c-57.3,6.4-114.8,10.2-172.4,12.2c-57.6,2-115.2,2.3-172.9,0.8l0.1-4c57.5,1.8,115.1,1.9,172.6,0.2c57.5-1.7,115-5.2,172.3-11.2c28.6-3.1,57.2-6.7,85.6-11.5c14.2-2.4,28.3-5,42.4-8.1c7-1.5,14-3.1,21-4.9c7-1.7,13.9-3.6,20.8-5.7c13.8-4.1,27.4-8.8,40.3-15.2l2.4-1.2l2.4-1.3c1.6-0.8,3.1-1.8,4.7-2.7c3-1.9,6-3.9,8.7-6.2c2.7-2.3,5.2-4.9,7.2-7.9c1.9-3,3.2-6.4,3.3-10c0-3.6-1.2-7-3.1-10c-1.9-3-4.4-5.6-7.1-8c-5.5-4.7-11.7-8.3-18.1-11.6C1004.5,20.6,990.8,15.8,977.1,11.6z"/>
  <g transform="translate(415, 136)">
    <path fill="currentColor" d="M18.1,11.2c-1.8,0-2.8-1.2-2.8-3V8c0.8-0.4,1.7-0.6,2.8-0.6c1.5,0,2.5,0.6,2.5,1.7C20.6,10.2,19.8,11.2,18.1,11.2L18.1,11.2z M18.3,5.7c-1.1,0-2,0.3-2.8,0.7c0.3-1.6,1.5-2.6,3.7-2.6c1.1,0,2.3,0.3,3.1,0.5V2.6c-0.8-0.3-1.9-0.5-3.1-0.5c-4.2,0-6.2,2.1-6.2,5.8c0,3.2,1.8,4.9,5.1,4.9c3.3,0,5-1.7,5-3.6C23,7,21.3,5.7,18.3,5.7L18.3,5.7z"/>
    <path fill="currentColor" d="M39.3,1.8c0.9,0,1.6,0.7,1.6,1.5c0,0.8-0.7,1.6-1.6,1.6c-0.8,0-1.6-0.7-1.6-1.6C37.8,2.5,38.5,1.8,39.3,1.8L39.3,1.8z M39.3,6.3c1.7,0,3.1-1.3,3.1-3c0-1.6-1.4-3-3.1-3c-1.7,0-3.1,1.3-3.1,3C36.2,5,37.6,6.3,39.3,6.3L39.3,6.3z"/>
    <path fill="currentColor" d="M30.3,3.8c2.1,0,2.9,1.4,2.9,3.6c0,2.2-0.8,3.6-2.9,3.6c-2.1,0-2.9-1.5-2.9-3.6C27.4,5.3,28.1,3.8,30.3,3.8L30.3,3.8z M30.2,12.8c3.9,0,5.2-2.6,5.2-5.4c0-2.8-1.3-5.3-5.2-5.3c-3.9,0-5.3,2.6-5.3,5.4C25,10.3,26.3,12.8,30.2,12.8L30.2,12.8z"/>
    <path fill="currentColor" d="M10.9,9.7c0-1.1-0.8-2-2.5-2.5c1.3-0.5,1.9-1.3,1.9-2.3c0-1.7-1.7-2.8-4.6-2.8c-1.5,0-2.7,0.3-3.6,0.8v1.7c0.9-0.4,2.3-0.7,3.4-0.7C7,3.9,8,4.4,8,5.1c0,0.8-0.7,1.3-2.4,1.3H4.3v1.6h1.3c2,0,2.9,0.8,2.9,1.6c0,0.8-1,1.5-2.8,1.5c-1.5,0-2.8-0.3-3.7-0.6v1.7c0.9,0.3,2.1,0.6,3.8,0.6C9.2,12.8,10.9,11.4,10.9,9.7"/>
  </g>
</svg>
`, qi = (e) => {
  const t = document.createElement("div");
  return t.innerHTML = Ki, t.style.bottom = `${e}%`, t.className = "cloudimage-360-view-360-circle", t;
}, Ji = `
<svg width="150" height="87" viewBox="0 0 150 87" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_751_188)">
    <g filter="url(#filter0_d_751_188)">
    <path d="M112.566 15.2227C112.598 15.706 112.529 16.1906 112.364 16.6458C112.198 17.101 111.94 17.5167 111.605 17.8665C111.27 18.2163 110.866 18.4925 110.418 18.6775C109.971 18.8626 109.489 18.9524 109.005 18.9412C108.532 18.955 108.06 18.871 107.621 18.6944C107.181 18.5178 106.782 18.2524 106.45 17.9148C106.117 17.5772 105.858 17.1747 105.688 16.7323C105.518 16.29 105.442 15.8174 105.463 15.344C105.437 14.8591 105.511 14.374 105.68 13.9188C105.849 13.4635 106.109 13.0477 106.445 12.697C106.781 12.3463 107.186 12.0681 107.633 11.8797C108.081 11.6912 108.562 11.5965 109.048 11.6013C111.213 11.5952 112.566 13.1299 112.566 15.2227ZM106.961 15.2895C106.961 16.7574 107.913 17.825 109.03 17.825C110.146 17.825 111.08 16.8059 111.08 15.2652C111.08 14.1551 110.473 12.7053 109.005 12.7053C107.537 12.7053 106.961 14.0884 106.961 15.2895Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M110.164 12.3811C110.552 12.5859 110.861 12.8886 111.093 13.2348C111.506 13.8535 111.681 14.6156 111.681 15.2652C111.681 16.5122 111.13 17.5742 110.261 18.0908C110.603 17.9385 110.912 17.7212 111.171 17.4507C111.448 17.1612 111.662 16.8172 111.799 16.4404C111.936 16.0637 111.993 15.6626 111.966 15.2626L111.965 15.2427V15.2227C111.965 14.3058 111.67 13.5543 111.182 13.0378C110.913 12.7532 110.573 12.5262 110.164 12.3811ZM108.002 18.1944C107.011 17.7212 106.36 16.5793 106.36 15.2895C106.36 14.6064 106.522 13.8357 106.931 13.2157C107.06 13.021 107.212 12.8427 107.389 12.6885C107.204 12.81 107.033 12.9523 106.88 13.1128C106.6 13.4042 106.384 13.7497 106.244 14.128C106.103 14.5062 106.042 14.9093 106.063 15.3122L106.065 15.3415L106.063 15.3708C106.046 15.7615 106.109 16.1517 106.25 16.5168C106.39 16.882 106.604 17.2143 106.878 17.493C107.153 17.7717 107.482 17.9908 107.845 18.1366C107.897 18.1574 107.949 18.1767 108.002 18.1944ZM109.05 11.0002C108.483 10.9951 107.922 11.1058 107.4 11.3256C106.877 11.5459 106.404 11.8711 106.011 12.2811C105.619 12.6912 105.314 13.1773 105.116 13.7096C104.922 14.2327 104.835 14.7894 104.861 15.3466C104.841 15.8928 104.931 16.4375 105.127 16.9478C105.327 17.4673 105.631 17.9401 106.022 18.3366C106.412 18.7331 106.88 19.0448 107.397 19.2522C107.908 19.4577 108.456 19.5564 109.007 19.5425C109.569 19.5533 110.128 19.448 110.648 19.2331C111.173 19.0162 111.646 18.6924 112.039 18.2823C112.432 17.8722 112.735 17.3848 112.929 16.8512C113.121 16.3239 113.202 15.7628 113.167 15.203C113.163 14.035 112.782 12.9803 112.056 12.2121C111.323 11.4362 110.28 10.9976 109.05 11.0002ZM107.934 13.8783C107.689 14.2501 107.562 14.7714 107.562 15.2895C107.562 16.5291 108.34 17.2239 109.03 17.2239C109.716 17.2239 110.479 16.5808 110.479 15.2652C110.479 14.8047 110.35 14.2869 110.093 13.9031C109.851 13.5403 109.507 13.3065 109.005 13.3065C108.495 13.3065 108.163 13.5319 107.934 13.8783Z" fill="white"/>
    <path d="M94.3617 40.718H95.5396C99.9046 40.718 103.369 37.1844 103.369 32.8193V19.5164C103.369 15.1514 99.8353 11.6871 95.5396 11.6871H94.3617C89.9967 11.6871 86.5324 15.2207 86.5324 19.5164V32.8193C86.4631 37.1844 90.0659 40.718 94.3617 40.718ZM91.1052 19.5164C91.1052 17.715 92.5602 16.26 94.3617 16.26H95.5396C97.341 16.26 98.796 17.715 98.796 19.5164V32.8193C98.796 34.6208 97.341 36.0758 95.5396 36.0758H94.3617C92.5602 36.0758 91.1052 34.6208 91.1052 32.8193V19.5164Z" fill="white"/>
    <path d="M74.6152 40.7179C79.2574 40.7179 82.9988 36.9765 82.9988 32.3343C82.9988 27.6922 79.2574 23.9507 74.6152 23.9507C73.9916 23.9507 73.2988 24.02 72.7445 24.1586C73.9223 21.4564 75.7931 18.685 78.7724 16.4678C79.8117 15.7749 80.0195 14.3199 79.2574 13.2806C78.5645 12.2413 77.1095 12.0335 76.0702 12.7956C67.8944 18.8928 66.578 28.0386 66.3701 31.2258C66.3701 31.2258 66.3701 31.2257 66.3701 31.295C66.3009 31.6415 66.3009 31.9879 66.3009 32.4036C66.2316 36.9072 70.0423 40.7179 74.6152 40.7179ZM74.6152 28.4543C76.6938 28.4543 78.3566 30.1865 78.3566 32.1958C78.3566 34.2051 76.6245 35.9372 74.6152 35.9372C72.6752 35.9372 71.0123 34.3436 70.8737 32.4729C70.8737 32.4036 70.943 32.265 70.943 32.1265C70.943 32.1265 70.943 31.9186 71.0123 31.5722C71.2202 29.84 72.8138 28.4543 74.6152 28.4543Z" fill="white"/>
    <path d="M54.3143 36.0758C52.2358 36.0758 50.5729 34.3436 50.5729 32.3343C50.5729 31.0179 49.5336 30.0479 48.2864 30.0479C46.97 30.0479 46 31.0872 46 32.3343C46 36.9765 49.7414 40.718 54.3836 40.718C59.0258 40.718 62.7672 36.9765 62.7672 32.1958C62.7672 29.84 61.7279 27.6229 60.0651 26.0986C61.7279 24.505 62.7672 22.4264 62.7672 20.0014C62.7672 15.3592 59.0258 11.6178 54.3836 11.6178C49.7414 11.6178 46 15.3592 46 20.0014C46 21.3178 47.0393 22.2879 48.2864 22.2879C49.6029 22.2879 50.5729 21.2486 50.5729 20.0014C50.5729 17.9228 52.305 16.26 54.3143 16.26C56.3236 16.26 58.0558 17.9921 58.0558 20.0014C58.0558 22.0107 56.3236 23.7429 54.3143 23.7429C52.9979 23.7429 52.0279 24.7822 52.0279 26.0293C52.0279 27.3458 53.0672 28.3157 54.3143 28.3157C56.3929 28.3157 58.0558 30.0479 58.0558 32.0572C58.1251 34.3436 56.4622 36.0758 54.3143 36.0758Z" fill="white"/>
    </g>
    <g filter="url(#filter1_d_751_188)">
    <path d="M26.8762 25.5149C27.5172 25.2883 28.1927 25.7659 28.1927 26.4458V33.5925C28.1927 34.0014 27.9493 34.3677 27.5768 34.5364C23.692 36.2966 3.80303 46.5259 37.3945 58.1537C37.3945 58.1537 57.0291 63.5205 76.923 63.6974C77.4752 63.7023 77.9231 63.2541 77.9231 62.7018V57.8317C77.9231 57.0995 78.6841 56.6156 79.3472 56.9261L103.851 68.4011C104.598 68.7507 104.624 69.8027 103.897 70.1897L79.3926 83.2187C78.7265 83.5728 77.9231 83.0901 77.9231 82.3357V75.7982C77.9231 75.2459 77.5039 74.797 76.9517 74.7892C68.3815 74.6673 6 72.8926 6 47.0574C6 47.0574 6 32.8966 26.8762 25.5149Z" fill="white"/>
    <path d="M111.768 58.2062C110.979 57.639 111.335 56.0078 112.271 55.7479C118.431 54.037 131.443 49.0118 131.443 41.6445C131.443 34.2279 126.608 31.5583 124.732 30.8016C124.308 30.6306 124 30.2281 124 29.7708V26.2189C124 25.5882 124.573 25.1253 125.18 25.2967C129.233 26.4408 142.336 31.2278 142.336 45.2982C142.336 45.2982 142.336 58.9459 122.524 65.4395C122.224 65.5379 121.887 65.4876 121.63 65.3031L111.768 58.2062Z" fill="white"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_751_188" x="38" y="3" width="83.1749" height="45.718" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="4"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.145098 0 0 0 0 0.160784 0 0 0 0.4 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_751_188"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_751_188" result="shape"/>
    </filter>
    <filter id="filter1_d_751_188" x="4" y="25.2607" width="140.336" height="63.0764" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="3"/>
    <feGaussianBlur stdDeviation="1"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.301961 0 0 0 0 0.360784 0 0 0 0 0.454902 0 0 0 0.4 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_751_188"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_751_188" result="shape"/>
    </filter>
    <clipPath id="clip0_751_188">
    <rect width="150" height="87" fill="white"/>
    </clipPath>
    </defs>
</svg>
`, Qi = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-initial-icon", t.setAttribute("aria-label", "360 degree view - drag to rotate"), e ? (t.style.backgroundImage = `url('${e}')`, t.style.backgroundPosition = "50% 50%", t.style.backgroundSize = "contain", t.style.backgroundRepeat = "no-repeat") : t.innerHTML = Ji, t;
}, to = (e, t) => {
  const { width: i, height: o } = t, s = document.createElement("canvas");
  return s.width = i, s.height = o, s.style.width = "100%", s.style.height = "auto", e.appendChild(s), s;
}, eo = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-close-icon", e.setAttribute("aria-label", "Close fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', e;
}, io = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-fullscreen-button", e.setAttribute("aria-label", "View fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>', e;
}, Ce = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-icons-container", e.appendChild(t), t;
}, oo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-inner-box", t.setAttribute("role", "img"), t.setAttribute("aria-label", "360 degree product view. Use mouse drag or arrow keys to rotate."), e.appendChild(t), t;
}, so = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-loader";
  const i = document.createElement("span");
  return i.className = "percentage", i.innerText = "0%", t.appendChild(i), e.appendChild(t), t;
}, no = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-fullscreen-modal";
  const i = e.cloneNode();
  return i.style.width = "100%", i.style.maxWidth = "100%", i.style.height = "100vh", i.style.maxHeight = "100%", t.appendChild(i), window.document.body.appendChild(t), i;
}, Qt = (e, t) => {
  const i = e.querySelector(t);
  i && i.parentNode.removeChild(i);
}, ro = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-loading-spinner", e;
}, ao = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-hotspot-container", e.appendChild(t), t;
}, lo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-sr-only", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"), t.setAttribute("aria-atomic", "true"), e.appendChild(t), t;
}, co = (e, t) => {
  e && (e.textContent = "", setTimeout(() => {
    e.textContent = t;
  }, 50));
}, je = {
  drag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  swipe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h8"/></svg>',
  click: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>',
  pinch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l4 4"/><path d="M18 6l-4 4"/><path d="M6 18l4-4"/><path d="M18 18l-4-4"/><circle cx="12" cy="12" r="2"/></svg>',
  keys: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m9 10 3 3 3-3"/></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
}, Ie = {
  drag: "Drag to rotate",
  swipe: "Swipe to rotate",
  click: "Click to zoom",
  dblclick: "Double-click to zoom",
  pinch: "Pinch to zoom",
  keys: "Use arrow keys",
  fullscreen: "Click for fullscreen"
}, ho = (e, t = {}) => {
  const i = document.createElement("div");
  i.className = "cloudimage-360-hint-item";
  let o = Ie[e];
  return e === "click" && t.pointerZoomTrigger === "dblclick" && (o = Ie.dblclick), i.innerHTML = `
    ${je[e]}
    <span>${o}</span>
  `, i;
}, xe = (e, t = [], i = {}) => {
  if (!t || t.length === 0) return null;
  const o = document.createElement("div");
  o.className = "cloudimage-360-hints-overlay", o.setAttribute("role", "tooltip"), o.setAttribute("aria-label", "Interaction hints");
  const s = document.createElement("div");
  return s.className = "cloudimage-360-hints-container", t.forEach((n) => {
    je[n] && s.appendChild(ho(n, i));
  }), o.appendChild(s), e.appendChild(o), o;
}, Ee = (e, t) => t ? ["swipe", "pinch"] : ["drag", "click"], Se = (e) => {
  e && e.classList.add("visible");
}, uo = (e) => {
  e && (e.classList.remove("visible"), e.classList.add("hiding"), setTimeout(() => {
    e.classList.remove("hiding");
  }, 300));
}, po = (e) => {
  if (!e || typeof e != "object") return null;
  const t = Object.keys(e).map((o) => parseInt(o, 10)).filter((o) => !isNaN(o)).sort((o, s) => o - s);
  if (t.length === 0) return null;
  const i = Math.floor(t.length / 2);
  return t[i];
}, mo = (e) => {
  const t = [];
  return !e || !Array.isArray(e) || e.forEach((i, o) => {
    const s = po(i.positions);
    s !== null && t.push({
      id: i.id || `hotspot-${o}`,
      frame: s,
      label: i.label || null
    });
  }), t;
}, fo = 400, vo = (e, t, i, o) => {
  const s = document.createElement("button");
  s.className = "cloudimage-360-hotspot-timeline-dot", s.setAttribute("type", "button"), s.setAttribute("aria-label", o || `Go to hotspot at frame ${t + 1}`), s.setAttribute("data-frame", t.toString()), s.setAttribute("data-hotspot-id", e);
  const n = i > 1 ? t / (i - 1) * 100 : 0;
  if (s.style.left = `${n}%`, o) {
    const r = document.createElement("span");
    r.className = "cloudimage-360-hotspot-timeline-tooltip", r.textContent = o, s.appendChild(r);
    let a = null;
    s.addEventListener("mouseenter", () => {
      a = setTimeout(() => {
        r.classList.add("visible");
      }, fo);
    }), s.addEventListener("mouseleave", () => {
      a && (clearTimeout(a), a = null), r.classList.remove("visible");
    }), s.addEventListener("click", () => {
      a && (clearTimeout(a), a = null), r.classList.remove("visible");
    });
  }
  return s;
}, go = (e, t, i) => {
  const o = mo(i);
  if (o.length === 0) return null;
  const s = document.createElement("div");
  s.className = "cloudimage-360-hotspot-timeline", s.setAttribute("role", "navigation"), s.setAttribute("aria-label", "Hotspot timeline navigation");
  const n = document.createElement("div");
  n.className = "cloudimage-360-hotspot-timeline-track";
  const r = document.createElement("div");
  return r.className = "cloudimage-360-hotspot-timeline-indicator", o.forEach(({ id: a, frame: l, label: c }) => {
    const h = vo(a, l, t, c);
    n.appendChild(h);
  }), n.appendChild(r), s.appendChild(n), e.appendChild(s), {
    element: s,
    indicator: r,
    hotspotFrames: o
  };
}, yo = (e, t, i) => {
  if (!e) return;
  const o = i > 1 ? t / (i - 1) * 100 : 0;
  e.style.left = `${o}%`;
}, bo = (e) => {
  e && e.classList.add("visible");
}, wo = (e) => {
  e && e.classList.remove("visible");
}, te = (e, t = []) => {
  if (!e) return t;
  if (Array.isArray(e)) return e;
  try {
    return JSON.parse(e);
  } catch (i) {
    return console.warn("CloudImage 360: Failed to parse JSON:", i.message), t;
  }
}, Co = (e, t) => {
  const [i, o] = e.split("?");
  if (!o) return e;
  const s = new RegExp(`^${t}=|&${t}=`), n = o.split("&").filter((r) => !s.test(r)).join("&");
  return n ? `${i}?${n}` : i;
}, Io = (e) => {
  const t = Co(e, "width"), i = t.includes("?") ? "&" : "?";
  return `${t}${i}width=${150 * devicePixelRatio}`;
}, xo = (e) => {
  const t = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  }, i = (s) => {
    const n = s.getAttribute("data-src");
    n && (s.src = n);
  };
  new IntersectionObserver((s, n) => {
    s.forEach((r) => {
      r.isIntersecting && (i(r.target), n.unobserve(r.target));
    });
  }, t).observe(e);
}, Eo = (e, t) => {
  const i = $e(1, t);
  return e.replace("{index}", i);
}, So = (e, t) => {
  const [i] = e, o = /(https?):\/\//i.test(i);
  return It({
    ...t,
    folder: o ? "" : t.folder,
    filename: i
  });
}, To = (e, t) => {
  const { imageList: i, indexZeroBase: o } = t;
  if (i.length) {
    const s = te(i, null);
    if (s)
      return So(s, t);
  }
  return Eo(e, o);
}, Te = (e, t, i) => {
  const o = new Image();
  return o.setAttribute(t ? "data-src" : "src", e), o.className = i, o.style.cssText = `
    position: ${t ? "absolute" : "static"};
    width: 100%;
    inset: 0;
    height: 100%;
    object-fit: contain;
    object-position: center;
    filter: blur(10px);
  `, o;
}, Ae = (e, t, i) => {
  const { innerBox: o, imageList: s, lazyload: n } = t || {}, [r] = s, a = r || To(e, t), l = Io(a), c = Te(l, n, "cloudimage-lazy"), h = Te(l, !1, "cloudimage-360-placeholder"), u = (f) => {
    Qt(o, ".cloudimage-lazy"), i && i({
      event: f,
      width: c.width,
      height: c.height,
      naturalWidth: c.naturalWidth,
      naturalHeight: c.naturalHeight,
      src: l
    });
  };
  c.onload = u, o.appendChild(c), o.appendChild(h), xo(c);
}, Ao = (e, t, i) => {
  const o = new Image();
  o.src = e, o.onload = (s) => {
    t && t({
      event: s,
      width: o.width,
      height: o.height,
      naturalWidth: o.naturalWidth,
      naturalHeight: o.naturalHeight,
      src: e
    });
  }, o.onerror = (s) => {
    const n = new Error(`Failed to load image: ${e}`);
    n.url = e, n.event = s, i ? i(n) : console.error(n.message);
  };
}, ko = (e, t) => {
  const i = t.getBoundingClientRect(), o = e.touches ? e.touches[0].clientX : e.clientX, s = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: o - i.left,
    y: s - i.top
  };
}, qt = (e, t, i) => {
  const { container: o, w: s, h: n, zoom: r, bw: a, offsetX: l, offsetY: c } = t, h = ko(e, o);
  let u = h.x, f = h.y;
  u = Math.max(s / r, Math.min(u, o.offsetWidth - s / r)), f = Math.max(n / r, Math.min(f, o.offsetHeight - n / r)), i.style.left = `${u - s}px`, i.style.top = `${f - n}px`;
  const p = (u - l) * r - s + a, C = (f - c) * r - n + a;
  i.style.backgroundPosition = `-${p}px -${C}px`;
}, Lo = (e, t, i, o, s, n) => {
  const { x: r = 0, y: a = 0 } = i || {}, l = (t.offsetWidth - r * 2) * n, c = (t.offsetHeight - a * 2) * n;
  if (!s) return;
  s.setAttribute("class", "cloudimage-360-img-magnifier-glass"), t.prepend(s), s.style.backgroundImage = `url('${o.src}')`, s.style.backgroundSize = `${l}px ${c}px`;
  const h = 3, u = s.offsetWidth / 2, f = s.offsetHeight / 2, p = {
    container: t,
    w: u,
    h: f,
    zoom: n,
    bw: h,
    offsetX: r,
    offsetY: a
  };
  qt(e, p, s);
  const C = (v) => {
    qt(v, p, s);
  }, b = (v) => {
    v.preventDefault(), qt(v, p, s);
  };
  s.addEventListener("mousemove", C), t.addEventListener("mousemove", C), t.addEventListener("touchmove", b);
}, Oo = 300, Po = 350;
class Mo {
  /**
   * @param {HTMLElement} element
   * @param {Object} callbacks
   * @param {function(scaleDelta: number, centerX: number, centerY: number): void} callbacks.onPinch
   * @param {function(): void} callbacks.onPinchEnd
   * @param {function(dx: number, dy: number): void} callbacks.onPan
   * @param {function(): void} callbacks.onPanEnd
   * @param {function(x: number, y: number): void} callbacks.onDoubleTap
   * @param {function(): boolean} callbacks.isPanEnabled — return true when zoom > 1
   */
  constructor(t, i) {
    this.el = t, this.cb = i, this.cleanups = [], this._lastPinchDist = 0, this._pinching = !1, this._wasPinching = !1, this._pinchEndTime = 0, this._lastTapTime = 0, this._panStart = null, this._onTouchStart = this._onTouchStart.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), t.addEventListener("touchstart", this._onTouchStart, { passive: !1 }), t.addEventListener("touchmove", this._onTouchMove, { passive: !1 }), t.addEventListener("touchend", this._onTouchEnd), t.addEventListener("touchcancel", this._onTouchEnd), this.cleanups.push(
      () => t.removeEventListener("touchstart", this._onTouchStart),
      () => t.removeEventListener("touchmove", this._onTouchMove),
      () => t.removeEventListener("touchend", this._onTouchEnd),
      () => t.removeEventListener("touchcancel", this._onTouchEnd)
    );
  }
  _dist(t, i) {
    const o = t.clientX - i.clientX, s = t.clientY - i.clientY;
    return Math.sqrt(o * o + s * s);
  }
  _center(t, i) {
    return {
      x: (t.clientX + i.clientX) / 2,
      y: (t.clientY + i.clientY) / 2
    };
  }
  _onTouchStart(t) {
    var i, o;
    if (t.touches.length === 2) {
      t.preventDefault(), this._pinching = !0, this._lastPinchDist = this._dist(t.touches[0], t.touches[1]);
      return;
    }
    t.touches.length === 1 && (((o = (i = this.cb).isPanEnabled) == null ? void 0 : o.call(i)) ?? !1) && (t.preventDefault(), this._panStart = { x: t.touches[0].clientX, y: t.touches[0].clientY });
  }
  _onTouchMove(t) {
    var i, o, s, n;
    if (this._pinching && t.touches.length === 2) {
      t.preventDefault();
      const r = this._dist(t.touches[0], t.touches[1]);
      if (this._lastPinchDist > 0) {
        const a = r / this._lastPinchDist, l = this._center(t.touches[0], t.touches[1]);
        (o = (i = this.cb).onPinch) == null || o.call(i, a, l.x, l.y);
      }
      this._lastPinchDist = r;
      return;
    }
    if (this._panStart && t.touches.length === 1) {
      t.preventDefault();
      const r = t.touches[0].clientX - this._panStart.x, a = t.touches[0].clientY - this._panStart.y;
      this._panStart = { x: t.touches[0].clientX, y: t.touches[0].clientY }, (n = (s = this.cb).onPan) == null || n.call(s, r, a);
    }
  }
  _onTouchEnd(t) {
    var i, o, s, n, r, a, l;
    if (this._pinching && (!t.touches || t.touches.length < 2)) {
      this._pinching = !1, this._wasPinching = !0, this._pinchEndTime = Date.now(), this._lastPinchDist = 0, (o = (i = this.cb).onPinchEnd) == null || o.call(i);
      return;
    }
    if (this._panStart && (!t.touches || t.touches.length === 0) && (this._panStart = null, (n = (s = this.cb).onPanEnd) == null || n.call(s)), !t.touches || t.touches.length === 0) {
      if (this._wasPinching && Date.now() - this._pinchEndTime < Po) {
        this._wasPinching = !1;
        return;
      }
      this._wasPinching = !1;
      const c = Date.now();
      if (c - this._lastTapTime < Oo) {
        this._lastTapTime = 0;
        const h = (r = t.changedTouches) == null ? void 0 : r[0];
        h && ((l = (a = this.cb).onDoubleTap) == null || l.call(a, h.clientX, h.clientY));
      } else
        this._lastTapTime = c;
    }
  }
  destroy() {
    this.cleanups.forEach((t) => t()), this.cleanups = [];
  }
}
const _o = 3e-3;
class Yo {
  /**
   * @param {HTMLElement} viewport — the element that gets transform: scale() translate()
   * @param {HTMLElement} container — the outer bounding box (for clamping)
   * @param {Object} opts
   * @param {number}   opts.zoomMin        — minimum zoom level (default 1)
   * @param {number}   opts.zoomMax        — maximum zoom level
   * @param {string}   opts.toggleTrigger  — 'click' | 'dblclick'
   * @param {function(level: number): void} opts.onZoom — called on zoom change
   * @param {function(): void}              opts.onScrollWithoutZoom — regular scroll intercepted
   */
  constructor(t, i, o) {
    this.viewport = t, this.container = i, this.zoomMin = o.zoomMin ?? 1, this.zoomMax = o.zoomMax ?? 3, this.toggleTrigger = o.toggleTrigger ?? "dblclick", this.onZoomCb = o.onZoom, this.onScrollWithoutZoom = o.onScrollWithoutZoom, this._zoom = 1, this._panX = 0, this._panY = 0, this._enabled = !0, this._dragging = !1, this._dragStart = null, this._safariGestureScale = 1, this._cleanups = [], this._applyTransform(), this._bindWheel(), this._bindToggle(), this._bindMouseDrag(), this._bindSafariGesture(), this._bindTouchGestures();
  }
  // ── Public API ──────────────────────────────────────────
  getZoom() {
    return this._zoom;
  }
  setZoom(t, i, o) {
    var n;
    const s = Math.max(this.zoomMin, Math.min(this.zoomMax, t));
    if (s !== this._zoom) {
      if (i !== void 0 && o !== void 0) {
        const r = this.container.getBoundingClientRect(), a = i - r.left, l = o - r.top, c = (a - this._panX * this._zoom) / this._zoom, h = (l - this._panY * this._zoom) / this._zoom;
        this._panX = (a - c * s) / s, this._panY = (l - h * s) / s;
      }
      this._zoom = s, this._zoom <= 1 ? (this._panX = 0, this._panY = 0) : this._clampPan(), this._applyTransform(), (n = this.onZoomCb) == null || n.call(this, this._zoom);
    }
  }
  resetZoom() {
    var t;
    this._zoom !== 1 && (this._zoom = 1, this._panX = 0, this._panY = 0, this._applyTransform(), (t = this.onZoomCb) == null || t.call(this, 1));
  }
  pan(t, i) {
    this._zoom <= 1 || (this._panX += t / this._zoom, this._panY += i / this._zoom, this._clampPan(), this._applyTransform());
  }
  enable() {
    this._enabled = !0;
  }
  disable() {
    this._enabled = !1;
  }
  destroy() {
    this._cleanups.forEach((t) => t()), this._cleanups = [], this._gesture && (this._gesture.destroy(), this._gesture = null);
  }
  // ── Internal ────────────────────────────────────────────
  _applyTransform() {
    const t = this._zoom, i = this._panX, o = this._panY;
    this.viewport.style.transform = `scale(${t}) translate(${i}px, ${o}px)`, this.viewport.style.setProperty("--zoom", t);
  }
  _clampPan() {
    const t = this._zoom;
    if (t <= 1) {
      this._panX = 0, this._panY = 0;
      return;
    }
    const i = this.container.getBoundingClientRect(), o = i.width, s = i.height, n = -o * (t - 1) / t, r = 0, a = -s * (t - 1) / t, l = 0;
    this._panX = Math.max(n, Math.min(r, this._panX)), this._panY = Math.max(a, Math.min(l, this._panY));
  }
  // ── Ctrl + Scroll Wheel ─────────────────────────────────
  _bindWheel() {
    const t = (i) => {
      var o;
      if (this._enabled)
        if (i.ctrlKey || i.metaKey) {
          i.preventDefault();
          const s = -i.deltaY * _o;
          this.setZoom(this._zoom + s, i.clientX, i.clientY);
        } else this._zoom <= 1 ? (o = this.onScrollWithoutZoom) == null || o.call(this) : (i.preventDefault(), this.pan(-i.deltaX, -i.deltaY));
    };
    this.viewport.addEventListener("wheel", t, { passive: !1 }), this._cleanups.push(() => this.viewport.removeEventListener("wheel", t));
  }
  // ── Click / DblClick Toggle ─────────────────────────────
  _bindToggle() {
    const t = this.toggleTrigger === "click" ? "click" : "dblclick", i = (o) => {
      var s, n;
      if (this._enabled && !((n = (s = o.target).closest) != null && n.call(s, ".cloudimage-360-button, .cloudimage-360-hotspot, .cloudimage-360-hotspot-timeline-dot, .cloudimage-360-zoom-controls")))
        if (this._zoom > 1)
          this.resetZoom();
        else {
          const r = Math.min(2, this.zoomMax);
          this.setZoom(r, o.clientX, o.clientY);
        }
    };
    this.viewport.addEventListener(t, i), this._cleanups.push(() => this.viewport.removeEventListener(t, i));
  }
  // ── Mouse Drag Pan ──────────────────────────────────────
  _bindMouseDrag() {
    const t = (s) => {
      var n, r;
      !this._enabled || this._zoom <= 1 || s.button === 0 && ((r = (n = s.target).closest) != null && r.call(n, ".cloudimage-360-button, .cloudimage-360-hotspot, .cloudimage-360-hotspot-timeline-dot, .cloudimage-360-zoom-controls") || (s.preventDefault(), this._dragging = !0, this._dragStart = { x: s.clientX, y: s.clientY }, this.viewport.classList.add("cloudimage-360-viewport--dragging")));
    }, i = (s) => {
      if (!this._dragging || !this._dragStart) return;
      s.preventDefault();
      const n = s.clientX - this._dragStart.x, r = s.clientY - this._dragStart.y;
      this._dragStart = { x: s.clientX, y: s.clientY }, this.pan(n, r);
    }, o = () => {
      this._dragging && (this._dragging = !1, this._dragStart = null, this.viewport.classList.remove("cloudimage-360-viewport--dragging"));
    };
    this.viewport.addEventListener("mousedown", t), document.addEventListener("mousemove", i), document.addEventListener("mouseup", o), this._cleanups.push(
      () => this.viewport.removeEventListener("mousedown", t),
      () => document.removeEventListener("mousemove", i),
      () => document.removeEventListener("mouseup", o)
    );
  }
  // ── Safari GestureEvent ─────────────────────────────────
  _bindSafariGesture() {
    if (typeof GestureEvent > "u") return;
    const t = (s) => {
      this._enabled && (s.preventDefault(), this._safariGestureScale = this._zoom);
    }, i = (s) => {
      if (!this._enabled) return;
      s.preventDefault();
      const n = this._safariGestureScale * s.scale, r = this.container.getBoundingClientRect();
      this.setZoom(n, r.left + r.width / 2, r.top + r.height / 2);
    }, o = (s) => {
      this._enabled && s.preventDefault();
    };
    this.viewport.addEventListener("gesturestart", t), this.viewport.addEventListener("gesturechange", i), this.viewport.addEventListener("gestureend", o), this._cleanups.push(
      () => this.viewport.removeEventListener("gesturestart", t),
      () => this.viewport.removeEventListener("gesturechange", i),
      () => this.viewport.removeEventListener("gestureend", o)
    );
  }
  // ── Touch Gestures (via GestureRecognizer) ──────────────
  _bindTouchGestures() {
    this._gesture = new Mo(this.viewport, {
      onPinch: (t, i, o) => {
        this._enabled && this.setZoom(this._zoom * t, i, o);
      },
      onPinchEnd: () => {
      },
      onPan: (t, i) => {
        this._enabled && this.pan(t, i);
      },
      onPanEnd: () => {
      },
      onDoubleTap: (t, i) => {
        if (this._enabled)
          if (this._zoom > 1)
            this.resetZoom();
          else {
            const o = Math.min(2, this.zoomMax);
            this.setZoom(o, t, i);
          }
      },
      isPanEnabled: () => this._zoom > 1
    });
  }
}
const Xo = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', Ro = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>', Ho = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
function Do(e, t, i = {}) {
  const o = i.zoomStep ?? 0.5, s = i.position ?? "bottom-left", n = document.createElement("div");
  n.className = "cloudimage-360-zoom-controls", n.setAttribute("data-position", s), n.setAttribute("role", "group"), n.setAttribute("aria-label", "Zoom controls");
  const r = Jt("Zoom in", Xo), a = Jt("Zoom out", Ro), l = Jt("Reset zoom", Ho);
  r.addEventListener("click", (u) => {
    u.stopPropagation();
    const f = t.getZoom(), p = e.getBoundingClientRect();
    t.setZoom(f + o, p.left + p.width / 2, p.top + p.height / 2), c();
  }), a.addEventListener("click", (u) => {
    u.stopPropagation();
    const f = t.getZoom(), p = e.getBoundingClientRect();
    t.setZoom(f - o, p.left + p.width / 2, p.top + p.height / 2), c();
  }), l.addEventListener("click", (u) => {
    u.stopPropagation(), t.resetZoom(), c();
  }), n.appendChild(r), n.appendChild(a), n.appendChild(l), e.appendChild(n);
  function c() {
    const u = t.getZoom();
    r.disabled = u >= t.zoomMax, a.disabled = u <= t.zoomMin, l.disabled = u <= t.zoomMin;
  }
  c();
  function h() {
    n.remove();
  }
  return { element: n, update: c, destroy: h };
}
function Jt(e, t) {
  const i = document.createElement("button");
  return i.type = "button", i.className = "cloudimage-360-button cloudimage-360-zoom-control-button", i.setAttribute("aria-label", e), i.innerHTML = t, i;
}
const Bo = 1500;
class zo {
  /**
   * @param {HTMLElement} container — element to append the toast into
   */
  constructor(t) {
    this._container = t, this._el = null, this._hideTimer = null, this._created = !1;
  }
  show() {
    this._created || (this._el = document.createElement("div"), this._el.className = "cloudimage-360-scroll-hint", this._el.setAttribute("role", "status"), this._el.setAttribute("aria-live", "polite"), this._el.textContent = "Ctrl + scroll or pinch to zoom", this._container.appendChild(this._el), this._created = !0), clearTimeout(this._hideTimer), this._el.offsetWidth, this._el.classList.add("cloudimage-360-scroll-hint--visible"), this._hideTimer = setTimeout(() => {
      this._el.classList.remove("cloudimage-360-scroll-hint--visible");
    }, Bo);
  }
  destroy() {
    clearTimeout(this._hideTimer), this._el && (this._el.remove(), this._el = null), this._created = !1;
  }
}
const ke = (e, { bottom: t, top: i }) => {
  e ? t() : i();
}, Le = (e, { left: t, right: i }) => {
  e ? t() : i();
}, Zo = ({ autoplayBehavior: e, spinY: t, reversed: i, loopTriggers: o }) => {
  switch (e) {
    case X.SPIN_XY:
    case X.SPIN_YX:
      t ? ke(i, o) : Le(i, o);
      break;
    case X.SPIN_Y:
      ke(i, o);
      break;
    case X.SPIN_X:
    default:
      Le(i, o);
  }
}, Fo = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n
}) => {
  const r = (a, l) => {
    const c = l - 1;
    return n ? a === 0 : a === c;
  };
  switch (e) {
    case X.SPIN_XY:
    case X.SPIN_Y:
      return r(i, s);
    case X.SPIN_X:
    case X.SPIN_YX:
    default:
      return r(t, o);
  }
}, No = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n,
  spinDirection: r
}) => {
  const a = t === (n ? 0 : o - 1), l = i === (n ? 0 : s - 1);
  return e === X.SPIN_XY || e === X.SPIN_YX ? r === "x" && a || r === "y" && l : !1;
}, Vo = (e, t, i) => {
  if (!i) return "x";
  if (!t) return "y";
  switch (e) {
    case X.SPIN_XY:
      return "x";
    case X.SPIN_YX:
      return "y";
    case X.SPIN_Y:
      return "y";
    case X.SPIN_X:
    default:
      return "x";
  }
}, Wo = (e) => e === "x" ? "y" : "x", Oe = (e, t) => {
  const i = [...Li];
  return t ? [...i, ...Oi].includes(e) : i.includes(e);
}, Pe = ({ deltaX: e, deltaY: t, reversed: i, allowSpinX: o, allowSpinY: s, threshold: n = 0 }) => {
  const r = o && !s || s && !o ? 0 : n, a = Math.abs(e), l = Math.abs(t);
  return o && a - r > l ? i ? e > 0 ? "left" : "right" : e > 0 ? "right" : "left" : s && l - r > a ? i ? t > 0 ? "up" : "down" : t > 0 ? "down" : "up" : null;
}, $o = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, jo = (e, t = 150) => {
  let i;
  return function(...o) {
    clearTimeout(i), i = setTimeout(() => {
      e.apply(this, o);
    }, t);
  };
}, Ue = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2xldCB0LGMsaSxvLGQsZztzZWxmLm9ubWVzc2FnZT1hc3luYyBzPT57Y29uc3R7YWN0aW9uOmEsb2Zmc2NyZWVuOmUsZGV2aWNlUGl4ZWxSYXRpbzpuLGltYWdlRGF0YTpmLHpvb21TY2FsZTpDLHBvaW50ZXJYOnAscG9pbnRlclk6YixpbWFnZUFzcGVjdFJhdGlvOmwsY29udGFpbmVyV2lkdGg6dyxjb250YWluZXJIZWlnaHQ6dn09cy5kYXRhO3N3aXRjaChhKXtjYXNlImluaXRDYW52YXMiOnIoZSxuKTticmVhaztjYXNlImFkYXB0Q2FudmFzU2l6ZSI6aChsLHcsdik7YnJlYWs7Y2FzZSJkcmF3SW1hZ2VPbkNhbnZhcyI6bShmKTticmVha319O2NvbnN0IHI9KHMsYSk9Pnt0PXMsYz10LmdldENvbnRleHQoIjJkIiksaT1hfSxoPShzLGEsZSk9Pntjb25zdCBuPWEvZTtnPXM+bix0LndpZHRoPWEqaSx0LmhlaWdodD1lKmksYy5zY2FsZShpLGkpLGc/KG89YSxkPWEvcyk6KGQ9ZSxvPWUqcyksYy5pbWFnZVNtb290aGluZ0VuYWJsZWQ9ITAsYy5pbWFnZVNtb290aGluZ1F1YWxpdHk9ImhpZ2gifSxtPShzPXt9KT0+e2NvbnN0e2JpdG1hcEltYWdlOmF9PXM7aWYoIXR8fCFhKXJldHVybjtsZXQgZSxuO2c/KGU9MCxuPSh0LmhlaWdodC9pLWQpLzIpOihlPSh0LndpZHRoL2ktbykvMixuPTApLGMuY2xlYXJSZWN0KDAsMCx0LndpZHRoLHQuaGVpZ2h0KSxjLmRyYXdJbWFnZShhLGUsbixvLGQpfX0pKCk7Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhbnZhcy53b3JrZXItQjN0aWdhRFkuanMubWFwCg==", Uo = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0)), Me = typeof self < "u" && self.Blob && new Blob([Uo(Ue)], { type: "text/javascript;charset=utf-8" });
function Go(e) {
  let t;
  try {
    if (t = Me && (self.URL || self.webkitURL).createObjectURL(Me), !t) throw "";
    const i = new Worker(t, {
      name: e == null ? void 0 : e.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Ue,
      {
        name: e == null ? void 0 : e.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
class Ko {
  constructor() {
    this.canvas = null, this.ctx = null, this.dpr = 1, this.drawWidth = 0, this.drawHeight = 0, this.wideImage = !1;
  }
  /**
   * Mimics worker.postMessage() interface
   */
  postMessage(t) {
    const {
      action: i,
      offscreen: o,
      // Will be a regular canvas on main thread
      devicePixelRatio: s,
      imageData: n,
      zoomScale: r,
      pointerX: a,
      pointerY: l,
      imageAspectRatio: c,
      containerWidth: h,
      containerHeight: u
    } = t;
    switch (i) {
      case "initCanvas":
        this.initCanvas(o, s);
        break;
      case "adaptCanvasSize":
        this.adaptCanvasSize(c, h, u);
        break;
      case "drawImageOnCanvas":
        this.drawImageOnCanvas(n, r, a, l);
        break;
    }
  }
  /**
   * Mimics worker.terminate() - cleans up resources
   */
  terminate() {
    var t, i;
    this.ctx && this.ctx.clearRect(0, 0, ((t = this.canvas) == null ? void 0 : t.width) || 0, ((i = this.canvas) == null ? void 0 : i.height) || 0), this.canvas = null, this.ctx = null;
  }
  initCanvas(t, i) {
    this.canvas = t, this.ctx = t.getContext("2d"), this.dpr = i;
  }
  adaptCanvasSize(t, i, o) {
    if (!this.canvas || !this.ctx) return;
    const s = i / o;
    this.wideImage = t > s, this.canvas.width = i * this.dpr, this.canvas.height = o * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.wideImage ? (this.drawWidth = i, this.drawHeight = i / t) : (this.drawHeight = o, this.drawWidth = o * t), this.ctx.imageSmoothingEnabled = !0, this.ctx.imageSmoothingQuality = "high";
  }
  drawImageOnCanvas(t = {}) {
    const { bitmapImage: i } = t;
    if (!this.canvas || !this.ctx || !i) return;
    let o, s;
    this.wideImage ? (o = 0, s = (this.canvas.height / this.dpr - this.drawHeight) / 2) : (o = (this.canvas.width / this.dpr - this.drawWidth) / 2, s = 0), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.drawImage(i, o, s, this.drawWidth, this.drawHeight);
  }
}
const qo = /* @__PURE__ */ new Set([
  // Basic HTML
  "p",
  "span",
  "div",
  "br",
  "hr",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "button",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "blockquote",
  "pre",
  "code",
  "label",
  "input",
  "select",
  "option",
  "textarea",
  // SVG elements
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "g",
  "text",
  "tspan",
  "defs",
  "use",
  "symbol",
  "clippath",
  "mask",
  "lineargradient",
  "radialgradient",
  "stop"
]), _e = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title", "width", "height"],
  button: ["type", "disabled", "name", "value"],
  input: ["type", "name", "value", "placeholder", "disabled", "readonly", "checked", "min", "max", "step"],
  select: ["name", "disabled", "multiple"],
  option: ["value", "disabled", "selected"],
  textarea: ["name", "placeholder", "disabled", "readonly", "rows", "cols"],
  label: ["for"],
  // SVG attributes
  svg: ["viewbox", "width", "height", "fill", "stroke", "xmlns", "preserveaspectratio"],
  path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "transform"],
  circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
  rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke", "stroke-width"],
  line: ["x1", "y1", "x2", "y2", "stroke", "stroke-width"],
  polyline: ["points", "fill", "stroke", "stroke-width"],
  polygon: ["points", "fill", "stroke", "stroke-width"],
  ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width"],
  g: ["transform", "fill", "stroke"],
  text: ["x", "y", "dx", "dy", "text-anchor", "fill", "font-size", "font-family", "font-weight"],
  tspan: ["x", "y", "dx", "dy"],
  use: ["href", "xlink:href", "x", "y", "width", "height"],
  lineargradient: ["id", "x1", "y1", "x2", "y2", "gradientunits"],
  radialgradient: ["id", "cx", "cy", "r", "fx", "fy", "gradientunits"],
  stop: ["offset", "stop-color", "stop-opacity"],
  clippath: ["id"],
  mask: ["id"],
  "*": ["class", "id", "style"]
}, Jo = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi
], Qo = (e) => {
  if (typeof e != "string")
    return "";
  const t = document.createElement("template");
  t.innerHTML = e;
  const i = (o) => {
    if (Array.from(o.childNodes).forEach(i), o.nodeType === Node.ELEMENT_NODE) {
      const n = o.tagName.toLowerCase();
      if (!qo.has(n)) {
        if (n === "script" || n === "style") {
          o.remove();
          return;
        }
        const l = document.createTextNode(o.textContent);
        o.parentNode.replaceChild(l, o);
        return;
      }
      const r = [
        ..._e[n] || [],
        ..._e["*"] || []
      ];
      if (Array.from(o.attributes).forEach((l) => {
        const c = l.name.toLowerCase();
        if (c.startsWith("on")) {
          o.removeAttribute(l.name);
          return;
        }
        if (!r.includes(c)) {
          o.removeAttribute(l.name);
          return;
        }
        let h = l.value;
        Jo.forEach((u) => {
          u.test(h) && o.removeAttribute(l.name);
        });
      }), n === "a") {
        const l = o.getAttribute("href");
        l && (/^(https?:|mailto:|tel:|#|\/)/i.test(l.trim()) || o.removeAttribute("href")), o.getAttribute("target") === "_blank" && o.setAttribute("rel", "noopener noreferrer");
      }
      if (n === "img") {
        const l = o.getAttribute("src");
        l && (/^(https?:|\/|data:image\/)/i.test(l.trim()) || o.removeAttribute("src"));
      }
    }
  };
  return i(t.content), t.innerHTML;
}, ts = (e) => e === "x" ? _.X : _.Y, es = (e, t, i) => e.filter(
  (o) => ts(o.orientation) === i && t in o.positions
), is = (e, t) => {
  const i = document.createElement("button");
  return i.id = e, i.className = "cloudimage-360-hotspot", i.dataset.hotspotId = e, i.setAttribute("type", "button"), i.setAttribute("aria-label", t || `Hotspot ${e}`), i.setAttribute("aria-haspopup", "true"), i.setAttribute("aria-expanded", "false"), i;
}, os = (e) => {
  const t = Object.entries(e).sort(([n], [r]) => Number(n) - Number(r));
  let i = null, o = null;
  const s = {};
  for (const [n, r] of t)
    if (!r)
      s[n] = { x: i, y: o };
    else {
      const { x: a, y: l } = r;
      a != null && (i = a), l != null && (o = l), s[n] = {
        x: a || i,
        y: l || o
      };
    }
  return s;
}, ss = (e) => [
  {
    name: "offset",
    options: {
      offset: [0, 10]
    }
  },
  {
    name: "preventOverflow",
    options: {
      boundary: e
    }
  }
], ns = (e, t) => {
  const i = document.createElement("div");
  return i.className = "cloudimage-360-popper", i.id = `cloudimage-360-popper-${t}`, i.dataset.popperId = t, i.setAttribute("role", "tooltip"), i.setAttribute("aria-hidden", "false"), typeof e == "string" && /<\/?[a-z][\s\S]*>/i.test(e) ? i.innerHTML = Qo(e) : i.textContent = e, document.body.appendChild(i), i;
}, rs = (e) => {
  const t = [...e];
  return t.forEach((i, o) => {
    const s = { ...os(i.positions) };
    t[o].initialPositions = s, t[o].positions = s;
  }), t;
}, as = ({
  newWidth: e,
  newHeight: t,
  initialContainerSize: i,
  imageAspectRatio: o,
  hotspotsConfig: s
}) => {
  const [n, r] = i;
  let a = e, l = t, c = 0, h = 0;
  const u = e / t;
  o > u ? (l = e / o, h = (t - l) / 2) : (a = t * o, c = (e - a) / 2);
  const p = a / n, C = l / r;
  return s.map((b) => {
    const v = {};
    return Object.entries(b.initialPositions).forEach(([E, S]) => {
      v[E] = {
        x: S.x * p + c,
        y: S.y * C + h
      };
    }), { ...b, positions: v };
  });
};
var R = "top", Z = "bottom", F = "right", H = "left", oe = "auto", At = [R, Z, F, H], pt = "start", St = "end", ls = "clippingParents", Ge = "viewport", Ct = "popper", cs = "reference", Ye = /* @__PURE__ */ At.reduce(function(e, t) {
  return e.concat([t + "-" + pt, t + "-" + St]);
}, []), Ke = /* @__PURE__ */ [].concat(At, [oe]).reduce(function(e, t) {
  return e.concat([t, t + "-" + pt, t + "-" + St]);
}, []), hs = "beforeRead", ds = "read", us = "afterRead", ps = "beforeMain", ms = "main", fs = "afterMain", vs = "beforeWrite", gs = "write", ys = "afterWrite", bs = [hs, ds, us, ps, ms, fs, vs, gs, ys];
function W(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function B(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ot(e) {
  var t = B(e).Element;
  return e instanceof t || e instanceof Element;
}
function z(e) {
  var t = B(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function se(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = B(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function ws(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(i) {
    var o = t.styles[i] || {}, s = t.attributes[i] || {}, n = t.elements[i];
    !z(n) || !W(n) || (Object.assign(n.style, o), Object.keys(s).forEach(function(r) {
      var a = s[r];
      a === !1 ? n.removeAttribute(r) : n.setAttribute(r, a === !0 ? "" : a);
    }));
  });
}
function Cs(e) {
  var t = e.state, i = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, i.popper), t.styles = i, t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow), function() {
    Object.keys(t.elements).forEach(function(o) {
      var s = t.elements[o], n = t.attributes[o] || {}, r = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : i[o]), a = r.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !z(s) || !W(s) || (Object.assign(s.style, a), Object.keys(n).forEach(function(l) {
        s.removeAttribute(l);
      }));
    });
  };
}
const Is = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ws,
  effect: Cs,
  requires: ["computeStyles"]
};
function V(e) {
  return e.split("-")[0];
}
var it = Math.max, zt = Math.min, mt = Math.round;
function ee() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function qe() {
  return !/^((?!chrome|android).)*safari/i.test(ee());
}
function ft(e, t, i) {
  t === void 0 && (t = !1), i === void 0 && (i = !1);
  var o = e.getBoundingClientRect(), s = 1, n = 1;
  t && z(e) && (s = e.offsetWidth > 0 && mt(o.width) / e.offsetWidth || 1, n = e.offsetHeight > 0 && mt(o.height) / e.offsetHeight || 1);
  var r = ot(e) ? B(e) : window, a = r.visualViewport, l = !qe() && i, c = (o.left + (l && a ? a.offsetLeft : 0)) / s, h = (o.top + (l && a ? a.offsetTop : 0)) / n, u = o.width / s, f = o.height / n;
  return {
    width: u,
    height: f,
    top: h,
    right: c + u,
    bottom: h + f,
    left: c,
    x: c,
    y: h
  };
}
function ne(e) {
  var t = ft(e), i = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: i,
    height: o
  };
}
function Je(e, t) {
  var i = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (i && se(i)) {
    var o = t;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function q(e) {
  return B(e).getComputedStyle(e);
}
function xs(e) {
  return ["table", "td", "th"].indexOf(W(e)) >= 0;
}
function Q(e) {
  return ((ot(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ft(e) {
  return W(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (se(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Q(e)
  );
}
function Xe(e) {
  return !z(e) || // https://github.com/popperjs/popper-core/issues/837
  q(e).position === "fixed" ? null : e.offsetParent;
}
function Es(e) {
  var t = /firefox/i.test(ee()), i = /Trident/i.test(ee());
  if (i && z(e)) {
    var o = q(e);
    if (o.position === "fixed")
      return null;
  }
  var s = Ft(e);
  for (se(s) && (s = s.host); z(s) && ["html", "body"].indexOf(W(s)) < 0; ) {
    var n = q(s);
    if (n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].indexOf(n.willChange) !== -1 || t && n.willChange === "filter" || t && n.filter && n.filter !== "none")
      return s;
    s = s.parentNode;
  }
  return null;
}
function kt(e) {
  for (var t = B(e), i = Xe(e); i && xs(i) && q(i).position === "static"; )
    i = Xe(i);
  return i && (W(i) === "html" || W(i) === "body" && q(i).position === "static") ? t : i || Es(e) || t;
}
function re(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function xt(e, t, i) {
  return it(e, zt(t, i));
}
function Ss(e, t, i) {
  var o = xt(e, t, i);
  return o > i ? i : o;
}
function Qe() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ti(e) {
  return Object.assign({}, Qe(), e);
}
function ei(e, t) {
  return t.reduce(function(i, o) {
    return i[o] = e, i;
  }, {});
}
var Ts = function(t, i) {
  return t = typeof t == "function" ? t(Object.assign({}, i.rects, {
    placement: i.placement
  })) : t, ti(typeof t != "number" ? t : ei(t, At));
};
function As(e) {
  var t, i = e.state, o = e.name, s = e.options, n = i.elements.arrow, r = i.modifiersData.popperOffsets, a = V(i.placement), l = re(a), c = [H, F].indexOf(a) >= 0, h = c ? "height" : "width";
  if (!(!n || !r)) {
    var u = Ts(s.padding, i), f = ne(n), p = l === "y" ? R : H, C = l === "y" ? Z : F, b = i.rects.reference[h] + i.rects.reference[l] - r[l] - i.rects.popper[h], v = r[l] - i.rects.reference[l], E = kt(n), S = E ? l === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, w = b / 2 - v / 2, y = u[p], x = S - f[h] - u[C], m = S / 2 - f[h] / 2 + w, g = xt(y, m, x), I = l;
    i.modifiersData[o] = (t = {}, t[I] = g, t.centerOffset = g - m, t);
  }
}
function ks(e) {
  var t = e.state, i = e.options, o = i.element, s = o === void 0 ? "[data-popper-arrow]" : o;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || Je(t.elements.popper, s) && (t.elements.arrow = s));
}
const Ls = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: As,
  effect: ks,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function vt(e) {
  return e.split("-")[1];
}
var Os = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ps(e, t) {
  var i = e.x, o = e.y, s = t.devicePixelRatio || 1;
  return {
    x: mt(i * s) / s || 0,
    y: mt(o * s) / s || 0
  };
}
function Re(e) {
  var t, i = e.popper, o = e.popperRect, s = e.placement, n = e.variation, r = e.offsets, a = e.position, l = e.gpuAcceleration, c = e.adaptive, h = e.roundOffsets, u = e.isFixed, f = r.x, p = f === void 0 ? 0 : f, C = r.y, b = C === void 0 ? 0 : C, v = typeof h == "function" ? h({
    x: p,
    y: b
  }) : {
    x: p,
    y: b
  };
  p = v.x, b = v.y;
  var E = r.hasOwnProperty("x"), S = r.hasOwnProperty("y"), w = H, y = R, x = window;
  if (c) {
    var m = kt(i), g = "clientHeight", I = "clientWidth";
    if (m === B(i) && (m = Q(i), q(m).position !== "static" && a === "absolute" && (g = "scrollHeight", I = "scrollWidth")), m = m, s === R || (s === H || s === F) && n === St) {
      y = Z;
      var T = u && m === x && x.visualViewport ? x.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        m[g]
      );
      b -= T - o.height, b *= l ? 1 : -1;
    }
    if (s === H || (s === R || s === Z) && n === St) {
      w = F;
      var A = u && m === x && x.visualViewport ? x.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        m[I]
      );
      p -= A - o.width, p *= l ? 1 : -1;
    }
  }
  var L = Object.assign({
    position: a
  }, c && Os), Y = h === !0 ? Ps({
    x: p,
    y: b
  }, B(i)) : {
    x: p,
    y: b
  };
  if (p = Y.x, b = Y.y, l) {
    var O;
    return Object.assign({}, L, (O = {}, O[y] = S ? "0" : "", O[w] = E ? "0" : "", O.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + b + "px)" : "translate3d(" + p + "px, " + b + "px, 0)", O));
  }
  return Object.assign({}, L, (t = {}, t[y] = S ? b + "px" : "", t[w] = E ? p + "px" : "", t.transform = "", t));
}
function Ms(e) {
  var t = e.state, i = e.options, o = i.gpuAcceleration, s = o === void 0 ? !0 : o, n = i.adaptive, r = n === void 0 ? !0 : n, a = i.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: V(t.placement),
    variation: vt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: s,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Re(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: r,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Re(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const _s = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ms,
  data: {}
};
var Ht = {
  passive: !0
};
function Ys(e) {
  var t = e.state, i = e.instance, o = e.options, s = o.scroll, n = s === void 0 ? !0 : s, r = o.resize, a = r === void 0 ? !0 : r, l = B(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return n && c.forEach(function(h) {
    h.addEventListener("scroll", i.update, Ht);
  }), a && l.addEventListener("resize", i.update, Ht), function() {
    n && c.forEach(function(h) {
      h.removeEventListener("scroll", i.update, Ht);
    }), a && l.removeEventListener("resize", i.update, Ht);
  };
}
const Xs = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ys,
  data: {}
};
var Rs = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Dt(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Rs[t];
  });
}
var Hs = {
  start: "end",
  end: "start"
};
function He(e) {
  return e.replace(/start|end/g, function(t) {
    return Hs[t];
  });
}
function ae(e) {
  var t = B(e), i = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: i,
    scrollTop: o
  };
}
function le(e) {
  return ft(Q(e)).left + ae(e).scrollLeft;
}
function Ds(e, t) {
  var i = B(e), o = Q(e), s = i.visualViewport, n = o.clientWidth, r = o.clientHeight, a = 0, l = 0;
  if (s) {
    n = s.width, r = s.height;
    var c = qe();
    (c || !c && t === "fixed") && (a = s.offsetLeft, l = s.offsetTop);
  }
  return {
    width: n,
    height: r,
    x: a + le(e),
    y: l
  };
}
function Bs(e) {
  var t, i = Q(e), o = ae(e), s = (t = e.ownerDocument) == null ? void 0 : t.body, n = it(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), r = it(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -o.scrollLeft + le(e), l = -o.scrollTop;
  return q(s || i).direction === "rtl" && (a += it(i.clientWidth, s ? s.clientWidth : 0) - n), {
    width: n,
    height: r,
    x: a,
    y: l
  };
}
function ce(e) {
  var t = q(e), i = t.overflow, o = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(i + s + o);
}
function ii(e) {
  return ["html", "body", "#document"].indexOf(W(e)) >= 0 ? e.ownerDocument.body : z(e) && ce(e) ? e : ii(Ft(e));
}
function Et(e, t) {
  var i;
  t === void 0 && (t = []);
  var o = ii(e), s = o === ((i = e.ownerDocument) == null ? void 0 : i.body), n = B(o), r = s ? [n].concat(n.visualViewport || [], ce(o) ? o : []) : o, a = t.concat(r);
  return s ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(Et(Ft(r)))
  );
}
function ie(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function zs(e, t) {
  var i = ft(e, !1, t === "fixed");
  return i.top = i.top + e.clientTop, i.left = i.left + e.clientLeft, i.bottom = i.top + e.clientHeight, i.right = i.left + e.clientWidth, i.width = e.clientWidth, i.height = e.clientHeight, i.x = i.left, i.y = i.top, i;
}
function De(e, t, i) {
  return t === Ge ? ie(Ds(e, i)) : ot(t) ? zs(t, i) : ie(Bs(Q(e)));
}
function Zs(e) {
  var t = Et(Ft(e)), i = ["absolute", "fixed"].indexOf(q(e).position) >= 0, o = i && z(e) ? kt(e) : e;
  return ot(o) ? t.filter(function(s) {
    return ot(s) && Je(s, o) && W(s) !== "body";
  }) : [];
}
function Fs(e, t, i, o) {
  var s = t === "clippingParents" ? Zs(e) : [].concat(t), n = [].concat(s, [i]), r = n[0], a = n.reduce(function(l, c) {
    var h = De(e, c, o);
    return l.top = it(h.top, l.top), l.right = zt(h.right, l.right), l.bottom = zt(h.bottom, l.bottom), l.left = it(h.left, l.left), l;
  }, De(e, r, o));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function oi(e) {
  var t = e.reference, i = e.element, o = e.placement, s = o ? V(o) : null, n = o ? vt(o) : null, r = t.x + t.width / 2 - i.width / 2, a = t.y + t.height / 2 - i.height / 2, l;
  switch (s) {
    case R:
      l = {
        x: r,
        y: t.y - i.height
      };
      break;
    case Z:
      l = {
        x: r,
        y: t.y + t.height
      };
      break;
    case F:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case H:
      l = {
        x: t.x - i.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var c = s ? re(s) : null;
  if (c != null) {
    var h = c === "y" ? "height" : "width";
    switch (n) {
      case pt:
        l[c] = l[c] - (t[h] / 2 - i[h] / 2);
        break;
      case St:
        l[c] = l[c] + (t[h] / 2 - i[h] / 2);
        break;
    }
  }
  return l;
}
function Tt(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = o === void 0 ? e.placement : o, n = i.strategy, r = n === void 0 ? e.strategy : n, a = i.boundary, l = a === void 0 ? ls : a, c = i.rootBoundary, h = c === void 0 ? Ge : c, u = i.elementContext, f = u === void 0 ? Ct : u, p = i.altBoundary, C = p === void 0 ? !1 : p, b = i.padding, v = b === void 0 ? 0 : b, E = ti(typeof v != "number" ? v : ei(v, At)), S = f === Ct ? cs : Ct, w = e.rects.popper, y = e.elements[C ? S : f], x = Fs(ot(y) ? y : y.contextElement || Q(e.elements.popper), l, h, r), m = ft(e.elements.reference), g = oi({
    reference: m,
    element: w,
    placement: s
  }), I = ie(Object.assign({}, w, g)), T = f === Ct ? I : m, A = {
    top: x.top - T.top + E.top,
    bottom: T.bottom - x.bottom + E.bottom,
    left: x.left - T.left + E.left,
    right: T.right - x.right + E.right
  }, L = e.modifiersData.offset;
  if (f === Ct && L) {
    var Y = L[s];
    Object.keys(A).forEach(function(O) {
      var $ = [F, Z].indexOf(O) >= 0 ? 1 : -1, j = [R, Z].indexOf(O) >= 0 ? "y" : "x";
      A[O] += Y[j] * $;
    });
  }
  return A;
}
function Ns(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = i.boundary, n = i.rootBoundary, r = i.padding, a = i.flipVariations, l = i.allowedAutoPlacements, c = l === void 0 ? Ke : l, h = vt(o), u = h ? a ? Ye : Ye.filter(function(C) {
    return vt(C) === h;
  }) : At, f = u.filter(function(C) {
    return c.indexOf(C) >= 0;
  });
  f.length === 0 && (f = u);
  var p = f.reduce(function(C, b) {
    return C[b] = Tt(e, {
      placement: b,
      boundary: s,
      rootBoundary: n,
      padding: r
    })[V(b)], C;
  }, {});
  return Object.keys(p).sort(function(C, b) {
    return p[C] - p[b];
  });
}
function Vs(e) {
  if (V(e) === oe)
    return [];
  var t = Dt(e);
  return [He(e), t, He(t)];
}
function Ws(e) {
  var t = e.state, i = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var s = i.mainAxis, n = s === void 0 ? !0 : s, r = i.altAxis, a = r === void 0 ? !0 : r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, u = i.rootBoundary, f = i.altBoundary, p = i.flipVariations, C = p === void 0 ? !0 : p, b = i.allowedAutoPlacements, v = t.options.placement, E = V(v), S = E === v, w = l || (S || !C ? [Dt(v)] : Vs(v)), y = [v].concat(w).reduce(function(J, N) {
      return J.concat(V(N) === oe ? Ns(t, {
        placement: N,
        boundary: h,
        rootBoundary: u,
        padding: c,
        flipVariations: C,
        allowedAutoPlacements: b
      }) : N);
    }, []), x = t.rects.reference, m = t.rects.popper, g = /* @__PURE__ */ new Map(), I = !0, T = y[0], A = 0; A < y.length; A++) {
      var L = y[A], Y = V(L), O = vt(L) === pt, $ = [R, Z].indexOf(Y) >= 0, j = $ ? "width" : "height", P = Tt(t, {
        placement: L,
        boundary: h,
        rootBoundary: u,
        altBoundary: f,
        padding: c
      }), D = $ ? O ? F : H : O ? Z : R;
      x[j] > m[j] && (D = Dt(D));
      var st = Dt(D), U = [];
      if (n && U.push(P[Y] <= 0), a && U.push(P[D] <= 0, P[st] <= 0), U.every(function(J) {
        return J;
      })) {
        T = L, I = !1;
        break;
      }
      g.set(L, U);
    }
    if (I)
      for (var nt = C ? 3 : 1, gt = function(N) {
        var et = y.find(function(at) {
          var G = g.get(at);
          if (G)
            return G.slice(0, N).every(function(lt) {
              return lt;
            });
        });
        if (et)
          return T = et, "break";
      }, tt = nt; tt > 0; tt--) {
        var rt = gt(tt);
        if (rt === "break") break;
      }
    t.placement !== T && (t.modifiersData[o]._skip = !0, t.placement = T, t.reset = !0);
  }
}
const $s = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ws,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Be(e, t, i) {
  return i === void 0 && (i = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - i.y,
    right: e.right - t.width + i.x,
    bottom: e.bottom - t.height + i.y,
    left: e.left - t.width - i.x
  };
}
function ze(e) {
  return [R, F, Z, H].some(function(t) {
    return e[t] >= 0;
  });
}
function js(e) {
  var t = e.state, i = e.name, o = t.rects.reference, s = t.rects.popper, n = t.modifiersData.preventOverflow, r = Tt(t, {
    elementContext: "reference"
  }), a = Tt(t, {
    altBoundary: !0
  }), l = Be(r, o), c = Be(a, s, n), h = ze(l), u = ze(c);
  t.modifiersData[i] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: h,
    hasPopperEscaped: u
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": u
  });
}
const Us = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: js
};
function Gs(e, t, i) {
  var o = V(e), s = [H, R].indexOf(o) >= 0 ? -1 : 1, n = typeof i == "function" ? i(Object.assign({}, t, {
    placement: e
  })) : i, r = n[0], a = n[1];
  return r = r || 0, a = (a || 0) * s, [H, F].indexOf(o) >= 0 ? {
    x: a,
    y: r
  } : {
    x: r,
    y: a
  };
}
function Ks(e) {
  var t = e.state, i = e.options, o = e.name, s = i.offset, n = s === void 0 ? [0, 0] : s, r = Ke.reduce(function(h, u) {
    return h[u] = Gs(u, t.rects, n), h;
  }, {}), a = r[t.placement], l = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[o] = r;
}
const qs = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ks
};
function Js(e) {
  var t = e.state, i = e.name;
  t.modifiersData[i] = oi({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Qs = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Js,
  data: {}
};
function tn(e) {
  return e === "x" ? "y" : "x";
}
function en(e) {
  var t = e.state, i = e.options, o = e.name, s = i.mainAxis, n = s === void 0 ? !0 : s, r = i.altAxis, a = r === void 0 ? !1 : r, l = i.boundary, c = i.rootBoundary, h = i.altBoundary, u = i.padding, f = i.tether, p = f === void 0 ? !0 : f, C = i.tetherOffset, b = C === void 0 ? 0 : C, v = Tt(t, {
    boundary: l,
    rootBoundary: c,
    padding: u,
    altBoundary: h
  }), E = V(t.placement), S = vt(t.placement), w = !S, y = re(E), x = tn(y), m = t.modifiersData.popperOffsets, g = t.rects.reference, I = t.rects.popper, T = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, A = typeof T == "number" ? {
    mainAxis: T,
    altAxis: T
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, T), L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, Y = {
    x: 0,
    y: 0
  };
  if (m) {
    if (n) {
      var O, $ = y === "y" ? R : H, j = y === "y" ? Z : F, P = y === "y" ? "height" : "width", D = m[y], st = D + v[$], U = D - v[j], nt = p ? -I[P] / 2 : 0, gt = S === pt ? g[P] : I[P], tt = S === pt ? -I[P] : -g[P], rt = t.elements.arrow, J = p && rt ? ne(rt) : {
        width: 0,
        height: 0
      }, N = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Qe(), et = N[$], at = N[j], G = xt(0, g[P], J[P]), lt = w ? g[P] / 2 - nt - G - et - A.mainAxis : gt - G - et - A.mainAxis, Nt = w ? -g[P] / 2 + nt + G + at + A.mainAxis : tt + G + at + A.mainAxis, ct = t.elements.arrow && kt(t.elements.arrow), Vt = ct ? y === "y" ? ct.clientTop || 0 : ct.clientLeft || 0 : 0, Lt = (O = L == null ? void 0 : L[y]) != null ? O : 0, Wt = D + lt - Lt - Vt, $t = D + Nt - Lt, Ot = xt(p ? zt(st, Wt) : st, D, p ? it(U, $t) : U);
      m[y] = Ot, Y[y] = Ot - D;
    }
    if (a) {
      var Pt, jt = y === "x" ? R : H, Ut = y === "x" ? Z : F, K = m[x], ht = x === "y" ? "height" : "width", Mt = K + v[jt], _t = K - v[Ut], yt = [R, H].indexOf(E) !== -1, Yt = (Pt = L == null ? void 0 : L[x]) != null ? Pt : 0, Xt = yt ? Mt : K - g[ht] - I[ht] - Yt + A.altAxis, bt = yt ? K + g[ht] + I[ht] - Yt - A.altAxis : _t, dt = p && yt ? Ss(Xt, K, bt) : xt(p ? Xt : Mt, K, p ? bt : _t);
      m[x] = dt, Y[x] = dt - K;
    }
    t.modifiersData[o] = Y;
  }
}
const on = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: en,
  requiresIfExists: ["offset"]
};
function sn(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function nn(e) {
  return e === B(e) || !z(e) ? ae(e) : sn(e);
}
function rn(e) {
  var t = e.getBoundingClientRect(), i = mt(t.width) / e.offsetWidth || 1, o = mt(t.height) / e.offsetHeight || 1;
  return i !== 1 || o !== 1;
}
function an(e, t, i) {
  i === void 0 && (i = !1);
  var o = z(t), s = z(t) && rn(t), n = Q(t), r = ft(e, s, i), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (o || !o && !i) && ((W(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ce(n)) && (a = nn(t)), z(t) ? (l = ft(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : n && (l.x = le(n))), {
    x: r.left + a.scrollLeft - l.x,
    y: r.top + a.scrollTop - l.y,
    width: r.width,
    height: r.height
  };
}
function ln(e) {
  var t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(n) {
    t.set(n.name, n);
  });
  function s(n) {
    i.add(n.name);
    var r = [].concat(n.requires || [], n.requiresIfExists || []);
    r.forEach(function(a) {
      if (!i.has(a)) {
        var l = t.get(a);
        l && s(l);
      }
    }), o.push(n);
  }
  return e.forEach(function(n) {
    i.has(n.name) || s(n);
  }), o;
}
function cn(e) {
  var t = ln(e);
  return bs.reduce(function(i, o) {
    return i.concat(t.filter(function(s) {
      return s.phase === o;
    }));
  }, []);
}
function hn(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(i) {
      Promise.resolve().then(function() {
        t = void 0, i(e());
      });
    })), t;
  };
}
function dn(e) {
  var t = e.reduce(function(i, o) {
    var s = i[o.name];
    return i[o.name] = s ? Object.assign({}, s, o, {
      options: Object.assign({}, s.options, o.options),
      data: Object.assign({}, s.data, o.data)
    }) : o, i;
  }, {});
  return Object.keys(t).map(function(i) {
    return t[i];
  });
}
var Ze = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Fe() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function un(e) {
  e === void 0 && (e = {});
  var t = e, i = t.defaultModifiers, o = i === void 0 ? [] : i, s = t.defaultOptions, n = s === void 0 ? Ze : s;
  return function(a, l, c) {
    c === void 0 && (c = n);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ze, n),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, u = [], f = !1, p = {
      state: h,
      setOptions: function(E) {
        var S = typeof E == "function" ? E(h.options) : E;
        b(), h.options = Object.assign({}, n, h.options, S), h.scrollParents = {
          reference: ot(a) ? Et(a) : a.contextElement ? Et(a.contextElement) : [],
          popper: Et(l)
        };
        var w = cn(dn([].concat(o, h.options.modifiers)));
        return h.orderedModifiers = w.filter(function(y) {
          return y.enabled;
        }), C(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var E = h.elements, S = E.reference, w = E.popper;
          if (Fe(S, w)) {
            h.rects = {
              reference: an(S, kt(w), h.options.strategy === "fixed"),
              popper: ne(w)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(A) {
              return h.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var y = 0; y < h.orderedModifiers.length; y++) {
              if (h.reset === !0) {
                h.reset = !1, y = -1;
                continue;
              }
              var x = h.orderedModifiers[y], m = x.fn, g = x.options, I = g === void 0 ? {} : g, T = x.name;
              typeof m == "function" && (h = m({
                state: h,
                options: I,
                name: T,
                instance: p
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: hn(function() {
        return new Promise(function(v) {
          p.forceUpdate(), v(h);
        });
      }),
      destroy: function() {
        b(), f = !0;
      }
    };
    if (!Fe(a, l))
      return p;
    p.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function C() {
      h.orderedModifiers.forEach(function(v) {
        var E = v.name, S = v.options, w = S === void 0 ? {} : S, y = v.effect;
        if (typeof y == "function") {
          var x = y({
            state: h,
            name: E,
            instance: p,
            options: w
          }), m = function() {
          };
          u.push(x || m);
        }
      });
    }
    function b() {
      u.forEach(function(v) {
        return v();
      }), u = [];
    }
    return p;
  };
}
var pn = [Xs, Qs, _s, Is, qs, $s, on, Ls, Us], mn = /* @__PURE__ */ un({
  defaultModifiers: pn
});
class fn {
  /**
   * @param {Array} hotspotsConfig - Hotspot configuration array
   * @param {HTMLElement} container - Container element
   * @param {number} imageAspectRatio - Image aspect ratio
   * @param {Object} options - Additional options
   * @param {string} options.trigger - 'hover' or 'click' (default: 'hover')
   */
  constructor(t, i, o, s = {}) {
    me(this, "updateHotspotPosition", (t, i) => {
      this.currentActiveIndex = t, this.currentOrientation = i;
      const o = es(this.hotspotsConfig, t, i);
      this.hideHotspots(), o.forEach((s) => this.updateAndShowHotspot(s, t));
    });
    this.container = i, this.popper = null, this.popperInstance = null, this.hotspotsContainer = ao(this.container), this.hotspotsConfig = rs(t), this.shouldHidePopper = !0, this.hidePopper = this.hidePopper.bind(this), this.forceHidePopper = this.forceHidePopper.bind(this), this.imageAspectRatio = o, this.hotspotElements = /* @__PURE__ */ new Map(), this.popperListeners = [], this.trigger = s.trigger || "hover";
    const { containerSize: n } = t[0];
    this.initialContainerSize = n || [i.offsetWidth, i.offsetHeight], this.initHotspots(), this.observeContainerResize();
  }
  observeContainerResize() {
    this.resizeObserver = new ResizeObserver(() => {
      const t = this.container.offsetWidth, i = this.container.offsetHeight;
      this.updateHotspotsForResize(t, i);
    }), this.resizeObserver.observe(this.container);
  }
  updateHotspotsForResize(t, i) {
    this.hotspotsConfig = as({
      newWidth: t,
      newHeight: i,
      initialContainerSize: this.initialContainerSize,
      imageAspectRatio: this.imageAspectRatio,
      hotspotsConfig: this.hotspotsConfig
    }), this.updateHotspotPosition(this.currentActiveIndex, this.currentOrientation);
  }
  cleanupPopperListeners() {
    this.popperListeners.forEach(({ element: t, event: i, handler: o }) => {
      t.removeEventListener(i, o);
    }), this.popperListeners = [];
  }
  showPopper({ hotspotElement: t, content: i, id: o, keepOpen: s }) {
    this.popperInstance && this.hidePopper();
    const n = {
      placement: "top",
      modifiers: ss(this.container)
    };
    this.popper = ns(i, o), this.popper.setAttribute("data-show", ""), this.currentHotspotElement = t, t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-describedby", `cloudimage-360-popper-${o}`);
    const r = () => {
      this.shouldHidePopper = !1;
    }, a = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, l = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, c = () => {
      this.shouldHidePopper = !1, this.hidePopperTimeout && clearTimeout(this.hidePopperTimeout);
    };
    this.popper.addEventListener("mouseenter", r), this.popper.addEventListener("mouseleave", a), t.addEventListener("mouseleave", l), t.addEventListener("mouseenter", c), this.popperListeners.push(
      { element: this.popper, event: "mouseenter", handler: r },
      { element: this.popper, event: "mouseleave", handler: a },
      { element: t, event: "mouseleave", handler: l },
      { element: t, event: "mouseenter", handler: c }
    ), this.popperInstance = {
      ...mn(t, this.popper, n),
      keepOpen: s,
      instanceId: o
    };
  }
  checkAndHidePopper() {
    var t;
    this.shouldHidePopper && !((t = this.popperInstance) != null && t.keepOpen) && (this.hidePopperTimeout = setTimeout(() => {
      this.shouldHidePopper && this.hidePopper();
    }, _i));
  }
  hidePopper() {
    if (this.hidePopperTimeout && (clearTimeout(this.hidePopperTimeout), this.hidePopperTimeout = null), this.cleanupPopperListeners(), this.currentHotspotElement && (this.currentHotspotElement.setAttribute("aria-expanded", "false"), this.currentHotspotElement.removeAttribute("aria-describedby"), this.currentHotspotElement = null), this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null), this.popper) {
      this.popper.removeAttribute("data-show"), this.popper.setAttribute("aria-hidden", "true");
      const t = this.popper;
      this.popper = null, setTimeout(() => {
        t.remove();
      }, Yi);
    }
    this.shouldHidePopper = !0;
  }
  /**
   * Force hide the popper immediately, ignoring keepOpen and shouldHidePopper flags
   * Use this when the user starts dragging or other interactions that should close the modal
   */
  forceHidePopper() {
    this.shouldHidePopper = !0, this.popperInstance && (this.popperInstance.keepOpen = !1), this.hidePopper();
  }
  createHotspot(t) {
    const { id: i, content: o, keepOpen: s, onClick: n, label: r } = t, a = is(i, r);
    (n || o && this.trigger === "click") && (a.style.cursor = "pointer"), a.onclick = (l) => {
      var c;
      l.stopPropagation(), o && this.trigger === "click" && (((c = this.popperInstance) == null ? void 0 : c.instanceId) === i ? this.hidePopper() : this.showPopper({ hotspotElement: a, content: o, id: i, keepOpen: s })), n == null || n(l, this.popperInstance, i);
    }, o && (this.trigger === "hover" && (a.addEventListener(
      "mouseenter",
      () => this.showPopper({ hotspotElement: a, content: o, id: i, keepOpen: s })
    ), a.addEventListener("mouseleave", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    })), a.addEventListener(
      "focus",
      () => this.showPopper({ hotspotElement: a, content: o, id: i, keepOpen: s })
    ), a.addEventListener("blur", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    })), this.hotspotsContainer.appendChild(a);
  }
  hideHotspots() {
    this.hotspotsContainer.querySelectorAll(".cloudimage-360-hotspot").forEach((t) => {
      t.style.opacity = 0, t.style.pointerEvents = "none";
    });
  }
  updateAndShowHotspot(t, i) {
    const { positions: o, id: s } = t, { x: n, y: r } = o[i] ?? {}, a = this.hotspotsContainer.querySelector(`[data-hotspot-id="${s}"]`);
    a && (a.style.translate = `${n}px ${r}px`, a.style.opacity = 1, a.style.pointerEvents = "all");
  }
  /**
   * Shows the popper for a specific hotspot by ID
   * @param {string} hotspotId - The ID of the hotspot to show
   */
  showHotspotById(t) {
    const i = this.hotspotsConfig.find((s) => s.id === t);
    if (!i || !i.content) return;
    const o = this.hotspotsContainer.querySelector(`[data-hotspot-id="${t}"]`);
    o && o.style.opacity === "1" && this.showPopper({
      hotspotElement: o,
      content: i.content,
      id: t,
      keepOpen: i.keepOpen
    });
  }
  createAllHotspots() {
    this.hotspotsConfig.forEach((t) => this.createHotspot(t));
  }
  initHotspots() {
    this.createAllHotspots();
  }
  destroy() {
    this.hidePopperTimeout && clearTimeout(this.hidePopperTimeout), this.resizeObserver.disconnect(), this.hidePopper(), this.hotspotElements.clear(), this.hotspotsContainer.innerHTML = "";
  }
}
const Ne = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class Zt {
  constructor(t, i, o) {
    this.container = t, this.isClicked = !1, this.fullscreenView = !!o, this.imagesX = [], this.imagesY = [];
    const s = Math.round(window.devicePixelRatio || 1);
    this.devicePixelRatio = Ne ? Math.min(s, 2) : s, this.id = t.id, this.movementStart = { x: 0, y: 0 }, this.draggingDirection = null, this.isReady = !1, this.velocityX = 0, this.velocityY = 0, this.lastDragTime = 0, this.lastDragX = 0, this.lastDragY = 0, this.inertiaAnimationId = null, this.hasInteracted = !1, this.touchDevice = $o(), this.dragJustEnded = !1, this.zoomPan = null, this.zoomControlsUI = null, this.scrollHintToast = null, this.useMainThreadCanvas = Ne, this.canvasWorker = this.useMainThreadCanvas ? new Ko() : new Go(), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null, this.isAnimatingToFrame = !1, this.onMoveHandler = this.onMoveHandler.bind(this), this.destroy = this.destroy.bind(this), this.init(this.container, i);
  }
  /**
   * Close ImageBitmap objects to free GPU memory
   * @param {Array} images - Array of image objects with bitmapImage property
   */
  closeImageBitmaps(t) {
    !t || !Array.isArray(t) || t.forEach((i) => {
      var o;
      (o = i == null ? void 0 : i.bitmapImage) != null && o.close && i.bitmapImage.close();
    });
  }
  emit(t, i = {}) {
    const o = this[t];
    typeof o == "function" && o({ ...i, viewerId: this.id });
  }
  announce(t) {
    co(this.ariaLiveRegion, t);
  }
  mouseDown(t) {
    if (!this.isReady || this.glass || this.isZoomed) return;
    const i = t.target;
    if (i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline-dot") || i.closest(".cloudimage-360-hotspot") || i.closest(".cloudimage-360-zoom-controls")))
      return;
    const { pageX: o, pageY: s } = t;
    this.hideHints(), this.hideHotspotPopper(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.autoplayJustStopped = !1, (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1, this.autoplayJustStopped = !0), this.movementStart = { x: o, y: s }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = o, this.lastDragY = s);
  }
  mouseUp() {
    this.isReady && (!this.isZoomed && !this.autoplayJustStopped && this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.isDragging && (this.emit("onDragEnd"), this.dragJustEnded = !0), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1, this.innerBox.style.cursor = "grab");
  }
  startInertia() {
    const o = this.fullscreenView ? document.body : this.container, s = this.dragSpeed / be, n = s * (this.amountX / o.offsetWidth), r = s * (this.amountY / o.offsetHeight), a = () => {
      if (this.velocityX *= 0.95, this.velocityY *= 0.95, Math.abs(this.velocityX) < 0.01 && Math.abs(this.velocityY) < 0.01) {
        this.inertiaAnimationId = null;
        return;
      }
      const l = this.velocityX * 16, c = this.velocityY * 16, h = Pe({
        deltaX: l,
        deltaY: c,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY
      });
      if (h) {
        const u = this.allowSpinX ? Math.max(1, Math.abs(Math.round(l * n))) : 0, f = this.allowSpinY ? Math.max(1, Math.abs(Math.round(c * r))) : 0;
        (u > 0 || f > 0) && this.onMoveHandler(h, u, f);
      }
      this.inertiaAnimationId = requestAnimationFrame(a);
    };
    this.inertiaAnimationId = requestAnimationFrame(a);
  }
  drag(t, i) {
    if (!this.isReady || !this.isClicked) return;
    const o = t - this.movementStart.x, s = i - this.movementStart.y;
    if (this.inertia) {
      const f = performance.now(), p = f - this.lastDragTime;
      p > 0 && p < 100 && (this.velocityX = (t - this.lastDragX) / p, this.velocityY = (i - this.lastDragY) / p), this.lastDragTime = f, this.lastDragX = t, this.lastDragY = i;
    }
    this.draggingDirection = Pe({
      deltaX: o,
      deltaY: s,
      reversed: this.dragReverse,
      allowSpinX: this.allowSpinX,
      allowSpinY: this.allowSpinY
    }) || this.draggingDirection;
    const n = this.fullscreenView ? document.body : this.container, r = this.dragSpeed / be, a = r * (this.amountX / n.offsetWidth), l = r * (this.amountY / n.offsetHeight), c = this.allowSpinX ? Math.abs(Math.round(o * a)) : 0, h = this.allowSpinY ? Math.abs(Math.round(s * l)) : 0;
    (this.allowSpinX && c !== 0 || this.allowSpinY && h !== 0) && (this.hasInteracted = !0, this.hideHotspotPopper(), this.onMoveHandler(this.draggingDirection, c, h), this.movementStart = { x: t, y: i }, setTimeout(() => {
      this.isDragging || (this.isDragging = !0, this.emit("onDragStart"));
    }, Mi));
  }
  mouseMove(t) {
    !this.isReady || !this.isClicked || this.glass || this.isZoomed || (this.hideAllIcons(), this.drag(t.pageX, t.pageY));
  }
  mouseClick(t) {
    if (!this.isReady || this.isDragging) return;
    const i = t.target;
    if (!(i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline-dot") || i.closest(".cloudimage-360-hotspot") || i.closest(".cloudimage-360-zoom-controls")))) {
      if (this.dragJustEnded) {
        this.dragJustEnded = !1;
        return;
      }
      if (this.autoplayJustStopped) {
        this.autoplayJustStopped = !1;
        return;
      }
      if (this.glass && this.magnified) {
        this.removeGlass();
        return;
      }
    }
  }
  mouseDblClick() {
  }
  loadHigherQualityImages(t, i) {
    const o = It(this.srcXConfig, t), s = this.allowSpinY ? It(this.srcYConfig, t) : null;
    we({
      cdnPathX: o,
      cdnPathY: s,
      configX: this.srcXConfig,
      configY: this.srcYConfig,
      onAllImagesLoad: (n, r) => {
        this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = n, this.imagesY = r, i();
      },
      onError: (n) => this.emit("onError", n)
    });
  }
  hideHotspots() {
    this.hotspotsInstance && this.hotspotsInstance.hideHotspots();
  }
  hideHotspotPopper() {
    this.hotspotsInstance && this.hotspotsInstance.forceHidePopper();
  }
  initZoom() {
    this.pointerZoom && (this.zoomPan = new Yo(this.viewport, this.innerBox, {
      zoomMin: 1,
      zoomMax: this.pointerZoom,
      toggleTrigger: this.pointerZoomTrigger,
      onZoom: (t) => {
        var o;
        const i = this.isZoomed;
        this.isZoomed = t > 1, this.isZoomed && !i ? (this.hideAllIcons(), this.emit("onZoomIn", { zoomLevel: t }), this.announce("Zoomed in. Drag to pan. Double-click or press Esc to zoom out.")) : !this.isZoomed && i && (this.showAllIcons(), this.emit("onZoomOut"), this.announce("Zoomed out")), (o = this.zoomControlsUI) == null || o.update();
      },
      onScrollWithoutZoom: () => {
        var t;
        (t = this.scrollHintToast) == null || t.show();
      }
    }), this.zoomControlsEnabled && (this.zoomControlsUI = Do(this.innerBox, this.zoomPan, {
      zoomStep: 0.5,
      position: this.zoomControlsPosition
    }), this.zoomControlsUI.element.classList.add("visible")), this.scrollHintEnabled && (this.scrollHintToast = new zo(this.innerBox)));
  }
  mouseLeave() {
    var t;
    this.isZoomed && ((t = this.zoomPan) == null || t.resetZoom());
  }
  touchOutside(t) {
    if (!this.glass) return;
    !this.canvas.contains(t.target) && this.removeGlass();
  }
  touchStart(t) {
    if (!this.isReady || this.glass || !t.touches || !t.touches.length) return;
    const i = t.target;
    if (i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline-dot") || i.closest(".cloudimage-360-hotspot") || i.closest(".cloudimage-360-zoom-controls")) || (this.hideHints(), this.isZoomed) || t.touches.length >= 2 || t.touches.length > 1) return;
    const { pageX: o, pageY: s } = t.touches[0];
    this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), this.hideAllIcons(), this.hideHotspotPopper(), this.movementStart = { x: o, y: s }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = o, this.lastDragY = s);
  }
  touchEnd(t) {
    this.isReady && (this.isZoomed || (this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1));
  }
  touchMove(t) {
    if (!this.isReady || this.glass || this.isZoomed || !this.isClicked || !t.touches || !t.touches[0]) return;
    const { pageX: i, pageY: o } = t.touches[0];
    t.preventDefault(), this.drag(i, o);
  }
  keyDown(t) {
    if (!this.isReady) return;
    const { keyCode: i } = t, o = this.keysReverse;
    switch (this.autoplay && this.stopAutoplay(), Oe(i, this.allowSpinY) && (this.hasInteracted = !0, this.hideAllIcons(), this.hideHints()), i) {
      case 37:
        o ? this.moveLeft() : this.moveRight();
        break;
      case 39:
        o ? this.moveRight() : this.moveLeft();
        break;
      case 38:
        this.allowSpinY && (t.preventDefault(), o ? this.moveTop() : this.moveBottom());
        break;
      case 40:
        this.allowSpinY && (t.preventDefault(), o ? this.moveBottom() : this.moveTop());
        break;
    }
  }
  keyUp(t) {
    const { keyCode: i } = t;
    Oe(i, this.allowSpinY) && this.showAllIcons();
  }
  moveActiveXIndexUp(t) {
    this.orientation = _.X, this.activeImageX = (this.activeImageX + t) % this.amountX;
  }
  moveActiveXIndexDown(t) {
    this.orientation = _.X, this.activeImageX = (this.activeImageX - t + this.amountX) % this.amountX;
  }
  moveActiveYIndexUp(t) {
    this.orientation = _.Y, this.activeImageY = (this.activeImageY + t) % this.amountY;
  }
  moveActiveYIndexDown(t) {
    this.orientation = _.Y, this.activeImageY = (this.activeImageY - t + this.amountY) % this.amountY;
  }
  moveRight(t, i = 1) {
    t && this.activeImageX >= this.imagesX.length - 1 || (this.moveActiveXIndexUp(i), this.updateView());
  }
  moveLeft(t, i = 1) {
    t && this.activeImageX <= 0 || (this.moveActiveXIndexDown(i), this.updateView());
  }
  moveTop(t, i = 1) {
    t && this.activeImageY >= this.imagesY.length - 1 || (this.moveActiveYIndexUp(i), this.updateView());
  }
  moveBottom(t, i = 1) {
    t && this.activeImageY <= 0 || (this.moveActiveYIndexDown(i), this.updateView());
  }
  onMoveHandler(t, i = 1, o = 1) {
    t === "right" ? this.moveRight(this.stopAtEdges, i) : t === "left" ? this.moveLeft(this.stopAtEdges, i) : t === "up" ? this.moveTop(this.stopAtEdges, o) : t === "down" && this.moveBottom(this.stopAtEdges, o), this.emit("onSpin", {
      direction: t,
      activeImageX: this.activeImageX,
      activeImageY: this.activeImageY,
      amountX: this.amountX,
      amountY: this.amountY
    });
  }
  updateView() {
    const t = this.orientation === _.X ? this.activeImageX : this.activeImageY, i = this.orientation === _.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];
    this.hotspotsInstance && !this.autoplay && this.hotspotsInstance.updateHotspotPosition(t, this.orientation), this.hotspotTimelineIndicator && this.orientation === _.X && this.updateHotspotTimelinePosition(), this.drawImageOnCanvas(i);
  }
  updatePercentageInLoader(t = 0) {
    this.loader && (this.loader.innerText = t + "%");
  }
  adaptCanvasSize(t) {
    const { naturalWidth: i, naturalHeight: o } = t;
    this.imageAspectRatio = i / o;
    const s = this.fullscreenView ? window.innerWidth : this.canvas.clientWidth, n = this.fullscreenView ? window.innerHeight : this.canvas.clientHeight;
    this.canvasWorker.postMessage({
      action: "adaptCanvasSize",
      devicePixelRatio: this.devicePixelRatio,
      imageAspectRatio: this.imageAspectRatio,
      containerWidth: s,
      containerHeight: n
    });
  }
  drawImageOnCanvas(t) {
    this.pendingDrawData = { imageData: t }, this.drawFrameRequested || (this.drawFrameRequested = !0, requestAnimationFrame(() => {
      if (this.drawFrameRequested = !1, this.pendingDrawData) {
        const { imageData: i } = this.pendingDrawData;
        this.canvasWorker.postMessage({
          action: "drawImageOnCanvas",
          imageData: i,
          zoomScale: 1,
          pointerX: 0,
          pointerY: 0
        });
      }
    }));
  }
  pushImageToSet(t, i, o) {
    o === _.X ? this.imagesX[i] = t : this.imagesY[i] = t;
  }
  calculatePercentage() {
    const t = this.amountX + this.amountY, i = this.imagesX.length + this.imagesY.length;
    return Math.round(i / t * 100);
  }
  onImageLoad(t, i, o) {
    this.pushImageToSet(t, i, o), this.updatePercentageInLoader(this.calculatePercentage());
  }
  onFirstImageLoaded(t, i) {
    this.createContainers(t), this.adaptCanvasSize(i), this.drawImageOnCanvas(i);
  }
  onAllImagesLoaded() {
    if (this.addAllIcons(), this.isReady = !0, this.amountX = this.imagesX.length, this.amountY = this.imagesY.length, this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0, this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0, this.hotspots && (this.hotspotsInstance = new fn(this.hotspots, this.viewport || this.innerBox, this.imageAspectRatio, {
      trigger: this.hotspotTrigger
    }), this.addHotspotTimeline(), this.showHotspotTimeline()), this.emit("onLoad", { imagesX: this.imagesX.length, imagesY: this.imagesY.length }), this.emit("onReady"), this.announce("360 degree view loaded. Use mouse drag or arrow keys to rotate."), this.hints !== !1 && !this.autoplay) {
      const t = this.hints === !0 || this.hints === void 0 ? Ee(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = xe(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Se(this.hintsOverlay));
    }
    this.autoplay && (this.hideAllIcons(), jo(this.play.bind(this))());
  }
  magnify(t) {
    t.stopPropagation();
    const { src: i } = this.orientation === _.Y ? this.imagesY[this.activeImageY] : this.imagesX[this.activeImageX], s = (this.fullscreenView ? document.body : this.container).offsetWidth * this.magnifier, n = Wi(i, s);
    this.showLoadingSpinner(), this.createGlass(), Ao(n, (l) => {
      this.hideLoadingSpinner(), this.magnified = !0, Lo(t, this.innerBox, this.offset, l, this.glass, this.magnifier);
    }, (l) => {
      this.hideLoadingSpinner(), this.removeGlass(), this.emit("onError", {
        error: { message: l.message, url: l.url },
        errorCount: 1,
        totalImages: 1,
        errors: [{ message: l.message, url: l.url }]
      });
    });
  }
  openFullscreenModal(t) {
    t.stopPropagation(), this.hideHotspotPopper(), this.releaseMemory(), window.document.body.style.overflow = "hidden";
    const i = no(this.container);
    this.fullscreenInstance = new Zt(i, this.viewerConfig, !0), this.fullscreenInstance.originalViewer = this, this.boundResizeHandler = () => {
      this.fullscreenInstance && this.closeFullscreenModal(new Event("resize"));
    }, window.addEventListener("resize", this.boundResizeHandler), this.emit("onFullscreenOpen"), this.announce("Opened fullscreen mode. Press Escape to exit.");
  }
  closeFullscreenModal(t) {
    t.stopPropagation();
    const i = this.originalViewer || this, o = this.fullscreenView ? this : i.fullscreenInstance;
    if (i.boundResizeHandler && (window.removeEventListener("resize", i.boundResizeHandler), i.boundResizeHandler = null), o) {
      o.hideHotspotPopper();
      const s = o.container.parentNode;
      s && s.parentNode && s.parentNode.removeChild(s), o.destroy(), i.fullscreenInstance && (i.fullscreenInstance = null);
    }
    window.document.body.style.overflow = "visible", i.reloadImages(), i.emit("onFullscreenClose"), i.announce("Exited fullscreen mode");
  }
  play() {
    if (this.isClicked) return;
    this.hide360ViewCircleIcon(), this.emit("onAutoplayStart");
    const t = this.speed * 36 / (this.amountX + this.amountY), i = {
      left: this.moveLeft.bind(this),
      right: this.moveRight.bind(this),
      top: this.moveTop.bind(this),
      bottom: this.moveBottom.bind(this)
    };
    this.loopTimeoutId = window.setInterval(() => {
      if (this.playOnce && Fo({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse
      })) {
        this.stopAutoplay();
        return;
      }
      No({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse,
        spinDirection: this.spinDirection
      }) && (this.spinDirection = Wo(this.spinDirection));
      const n = this.spinDirection === "y";
      Zo({
        autoplayBehavior: this.autoplayBehavior,
        spinY: n,
        reversed: this.autoplayReverse,
        loopTriggers: i
      });
    }, t);
  }
  stopAutoplay() {
    if (this.showAllIcons(), this.autoplay = !1, window.clearTimeout(this.loopTimeoutId), this.loopTimeoutId = null, this.emit("onAutoplayStop"), this.hints !== !1 && !this.hintsOverlay && !this.hintsHidden) {
      const t = this.hints === !0 ? Ee(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = xe(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Se(this.hintsOverlay));
    }
  }
  destroy() {
    this.stopAutoplay(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.removeEvents(), this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = [], this.imagesY = [], this.canvasWorker && (this.canvasWorker.terminate(), this.canvasWorker = null), this.zoomPan && (this.zoomPan.destroy(), this.zoomPan = null), this.zoomControlsUI && (this.zoomControlsUI.destroy(), this.zoomControlsUI = null), this.scrollHintToast && (this.scrollHintToast.destroy(), this.scrollHintToast = null), this.hotspotsInstance && this.hotspotsInstance.destroy(), this.hintsOverlay && this.hintsOverlay.parentNode && (this.hintsOverlay.parentNode.removeChild(this.hintsOverlay), this.hintsOverlay = null), this.hotspotTimeline && this.hotspotTimeline.parentNode && (this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null), this.container && (this.container.classList.remove("ci360-theme-dark"), this.container.innerHTML = "");
  }
  /**
   * Release memory by closing ImageBitmap objects without destroying the viewer.
   * Useful for freeing memory when the viewer scrolls off-screen on mobile.
   * Call reloadImages() to restore the images when the viewer becomes visible again.
   */
  releaseMemory() {
    this.stopAutoplay(), this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = [], this.imagesY = [], this.isMemoryReleased = !0;
  }
  /**
   * Reload images after memory was released.
   * Call this when the viewer becomes visible again after releaseMemory() was called.
   */
  reloadImages() {
    if (!this.isMemoryReleased) return;
    this.isMemoryReleased = !1;
    const t = this.container.offsetWidth;
    this.loadHigherQualityImages(t, () => {
      this.updateView();
    });
  }
  addInitialIcon() {
    this.initialIcon || this.hide360Logo || (this.initialIcon = Qi(this.logoSrc), this.innerBox.appendChild(this.initialIcon));
  }
  showInitialIcon() {
    !this.initialIcon || this.hasInteracted || (this.initialIcon.style.opacity = 1);
  }
  hideInitialIcon() {
    this.initialIcon && (this.initialIcon.style.opacity = 0);
  }
  createGlass() {
    this.hideAllIcons(), this.glass = document.createElement("div"), this.innerBox.appendChild(this.glass), this.innerBox.style.cursor = "default";
  }
  removeGlass() {
    this.showAllIcons(), this.innerBox.removeChild(this.glass), this.glass = null, this.magnified = !1;
  }
  addFullscreenIcon() {
    this.fullscreen && (this.fullscreenIcon = io(), this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenIcon));
  }
  addCloseFullscreenIcon() {
    this.fullscreenCloseIcon = eo(), this.fullscreenCloseIcon.onclick = this.closeFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenCloseIcon);
  }
  showFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 1);
  }
  hideFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 0);
  }
  add360ViewCircleIcon() {
    this.view360CircleIcon || (this.view360CircleIcon = qi(this.bottomCircleOffset), this.innerBox.appendChild(this.view360CircleIcon));
  }
  show360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 1);
  }
  hide360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 0);
  }
  addLoadingSpinner() {
    this.loadingSpinner = ro(), this.innerBox.appendChild(this.loadingSpinner);
  }
  showLoadingSpinner() {
    this.loadingSpinner && (this.hideAllIcons(), this.loadingSpinner.style.opacity = 1);
  }
  hideLoadingSpinner() {
    this.loadingSpinner && (this.loadingSpinner.style.opacity = 0);
  }
  hideHints() {
    !this.hintsOverlay || this.hintsHidden || (this.hintsHidden = !0, uo(this.hintsOverlay));
  }
  addHotspotTimeline() {
    if (!this.hotspots || this.hotspotTimeline) return;
    const t = go(this.container, this.amountX, this.hotspots);
    if (!t) return;
    this.hotspotTimeline = t.element, this.hotspotTimelineIndicator = t.indicator, this.hotspotTimeline.querySelectorAll(".cloudimage-360-hotspot-timeline-dot").forEach((o) => {
      o.addEventListener("click", (s) => {
        s.stopPropagation(), this.hideAllIcons(), this.hideHints();
        const n = parseInt(o.getAttribute("data-frame"), 10), r = o.getAttribute("data-hotspot-id");
        isNaN(n) || this.animateToFrame(n, r);
      });
    }), this.updateHotspotTimelinePosition();
  }
  showHotspotTimeline() {
    bo(this.hotspotTimeline);
  }
  hideHotspotTimeline() {
    wo(this.hotspotTimeline);
  }
  updateHotspotTimelinePosition() {
    yo(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
  }
  /**
   * Animates the viewer to a target frame, optionally showing a hotspot popup on arrival
   * @param {number} targetFrame - The frame to animate to
   * @param {string} [hotspotId] - Optional hotspot ID to show popup for after animation
   */
  animateToFrame(t, i) {
    if (this.hotspotsInstance && this.hotspotsInstance.hidePopper(), this.isAnimatingToFrame || t === this.activeImageX) {
      t === this.activeImageX && i && this.hotspotsInstance && this.hotspotTimelineOnClick && this.hotspotsInstance.showHotspotById(i);
      return;
    }
    this.isAnimatingToFrame = !0, this.hasInteracted = !0, (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null);
    const o = this.activeImageX, s = (t - o + this.amountX) % this.amountX, n = (o - t + this.amountX) % this.amountX, r = s <= n, a = r ? s : n;
    if (a === 0) {
      this.isAnimatingToFrame = !1;
      return;
    }
    const l = 30;
    let c = a;
    const h = () => {
      if (c <= 0) {
        this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
          this.hotspotsInstance.showHotspotById(i);
        }, 50);
        return;
      }
      r ? this.moveRight() : this.moveLeft(), c--, c > 0 ? setTimeout(h, l) : (this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
        this.hotspotsInstance.showHotspotById(i);
      }, 50));
    };
    h();
  }
  remove360ViewCircleIcon() {
    this.view360CircleIcon && (this.innerBox.removeChild(this.view360CircleIcon), this.view360CircleIcon = null);
  }
  addAllIcons() {
    this.removeLoader(), this.iconsContainer && (this.innerBox.style.cursor = "grab", this.addLoadingSpinner(), this.initZoom(), this.fullscreenView || this.addFullscreenIcon(), this.initialIconShown && this.addInitialIcon(), this.bottomCircle && this.add360ViewCircleIcon());
  }
  showAllIcons() {
    this.showInitialIcon(), this.show360ViewCircleIcon(), this.showFullscreenIcon(), this.showHotspotTimeline();
  }
  hideAllIcons() {
    this.hideInitialIcon(), this.hide360ViewCircleIcon(), this.hideFullscreenIcon();
  }
  removeLoader() {
    this.loader && (this.innerBox.removeChild(this.loader), this.loader = null);
  }
  attachEvents(t, i, o) {
    t && this.addMouseEvents(), i && this.addTouchEvents(), o && this.addKeyboardEvents(), this.addEscKeyHandler();
  }
  removeEvents() {
    this.removeMouseEvents(), this.removeTouchEvents(), this.removeKeyboardEvents(), this.removeEscKeyHandler();
  }
  addMouseEvents() {
    this.boundMouseClick = this.mouseClick.bind(this), this.boundMouseDblClick = this.mouseDblClick.bind(this), this.boundMouseDown = this.mouseDown.bind(this), this.boundMouseMove = ge(this.mouseMove.bind(this), ye), this.boundMouseUp = this.mouseUp.bind(this), this.boundMouseLeave = this.mouseLeave.bind(this), this.innerBox.addEventListener("click", this.boundMouseClick), this.innerBox.addEventListener("dblclick", this.boundMouseDblClick), this.innerBox.addEventListener("mousedown", this.boundMouseDown), this.innerBox.addEventListener("mouseleave", this.boundMouseLeave), document.addEventListener("mousemove", this.boundMouseMove), document.addEventListener("mouseup", this.boundMouseUp);
  }
  addTouchEvents() {
    this.boundTouchOutside = this.touchOutside.bind(this), this.boundTouchStart = this.touchStart.bind(this), this.boundTouchEnd = this.touchEnd.bind(this), this.boundTouchMove = ge(this.touchMove.bind(this), ye), document.addEventListener("touchstart", this.boundTouchOutside), this.container.addEventListener("touchstart", this.boundTouchStart), this.container.addEventListener("touchend", this.boundTouchEnd), this.container.addEventListener("touchmove", this.boundTouchMove);
  }
  addKeyboardEvents() {
    this.boundKeyDown = this.keyDown.bind(this), this.boundKeyUp = this.keyUp.bind(this), document.addEventListener("keydown", this.boundKeyDown), document.addEventListener("keyup", this.boundKeyUp);
  }
  addEscKeyHandler() {
    this.boundEscHandler = (t) => {
      var i;
      t.keyCode === 27 && (this.fullscreenView ? this.closeFullscreenModal(t) : this.isZoomed ? (i = this.zoomPan) == null || i.resetZoom() : this.glass && this.removeGlass());
    }, document.addEventListener("keydown", this.boundEscHandler);
  }
  removeEscKeyHandler() {
    document.removeEventListener("keydown", this.boundEscHandler);
  }
  removeMouseEvents() {
    this.innerBox.removeEventListener("click", this.boundMouseClick), this.innerBox.removeEventListener("dblclick", this.boundMouseDblClick), this.innerBox.removeEventListener("mousedown", this.boundMouseDown), this.innerBox.removeEventListener("mouseleave", this.boundMouseLeave), document.removeEventListener("mousemove", this.boundMouseMove), document.removeEventListener("mouseup", this.boundMouseUp);
  }
  removeTouchEvents() {
    document.removeEventListener("touchstart", this.boundTouchOutside), this.container.removeEventListener("touchstart", this.boundTouchStart), this.container.removeEventListener("touchend", this.boundTouchEnd), this.container.removeEventListener("touchmove", this.boundTouchMove);
  }
  removeKeyboardEvents() {
    document.removeEventListener("keydown", this.boundKeyDown), document.removeEventListener("keyup", this.boundKeyUp);
  }
  createContainers(t) {
    if (this.iconsContainer = Ce(this.innerBox), this.viewport = document.createElement("div"), this.viewport.className = "cloudimage-360-viewport", this.innerBox.appendChild(this.viewport), this.canvas = to(this.viewport, t), this.loader = so(this.innerBox), this.ariaLiveRegion = lo(this.innerBox), this.useMainThreadCanvas)
      this.canvasWorker.postMessage({
        action: "initCanvas",
        offscreen: this.canvas,
        devicePixelRatio: this.devicePixelRatio
      });
    else {
      const i = this.canvas.transferControlToOffscreen();
      this.canvasWorker.postMessage(
        {
          action: "initCanvas",
          offscreen: i,
          devicePixelRatio: this.devicePixelRatio
        },
        [i]
      );
    }
    this.fullscreenView && this.addCloseFullscreenIcon(), Qt(this.innerBox, ".cloudimage-360-placeholder");
  }
  update(t) {
    this.isReady && (this.stopAutoplay(), Qt(this.innerBox, ".cloudimage-360-icons-container"), this.init(this.container, t, !0), this.iconsContainer = Ce(this.innerBox), this.onAllImagesLoaded());
  }
  init(t, i, o) {
    const s = i ? zi(i) : Di(t), {
      folder: n,
      apiVersion: r,
      filenameX: a,
      filenameY: l,
      imageListX: c,
      imageListY: h,
      indexZeroBase: u,
      amountX: f,
      amountY: p,
      draggable: C = !0,
      swipeable: b = !0,
      keys: v,
      keysReverse: E,
      bottomCircleOffset: S,
      autoplay: w,
      autoplayBehavior: y,
      playOnce: x,
      speed: m,
      autoplayReverse: g,
      fullscreen: I,
      magnifier: T,
      ciToken: A,
      ciFilters: L,
      ciTransformation: Y,
      lazyload: O,
      dragSpeed: $,
      stopAtEdges: j,
      pointerZoom: P,
      pointerZoomTrigger: D = "dblclick",
      imageInfo: st = "black",
      initialIconShown: U,
      bottomCircle: nt,
      hotspots: gt,
      hotspotTrigger: tt = "hover",
      dragReverse: rt,
      hide360Logo: J,
      logoSrc: N,
      inertia: et,
      pinchZoom: at,
      hints: G,
      theme: lt,
      hotspotTimelineOnClick: Nt = !0,
      aspectRatio: ct,
      zoomControls: Vt = !0,
      zoomControlsPosition: Lt = "bottom-left",
      scrollHint: Wt = !0,
      // Event callbacks
      onReady: $t,
      onLoad: Ot,
      onSpin: Pt,
      onAutoplayStart: jt,
      onAutoplayStop: Ut,
      onFullscreenOpen: K,
      onFullscreenClose: ht,
      onZoomIn: Mt,
      onZoomOut: _t,
      onDragStart: yt,
      onDragEnd: Yt,
      onError: Xt
    } = s, bt = { ciToken: A, ciFilters: L, ciTransformation: Y }, dt = te(c, []), Gt = te(h, []);
    if (this.viewerConfig = s, this.amountX = dt.length || f, this.amountY = Gt.length || p, this.allowSpinX = !!this.amountX, this.allowSpinY = !!this.amountY, this.activeImageX = g ? this.amountX - 1 : 0, this.activeImageY = g ? this.amountY - 1 : 0, this.bottomCircleOffset = S, this.autoplay = w, this.autoplayBehavior = y, this.playOnce = x, this.speed = m, this.autoplayReverse = g, this.fullscreen = I, this.magnifier = T > 1 ? Math.min(T, Ri) : 0, this.dragSpeed = Math.max($, Xi), this.stopAtEdges = j, this.ciParams = bt, this.apiVersion = r, this.pointerZoom = P > 1 ? Math.min(P, Hi) : null, this.pointerZoomTrigger = D, this.keysReverse = E, this.info = st, this.keys = v, this.innerBox = this.innerBox ?? oo(this.container), ct && (this.container.style.aspectRatio = ct), this.initialIconShown = U, this.bottomCircle = nt, this.spinDirection = Vo(this.autoplayBehavior, this.allowSpinX, this.allowSpinY), this.dragReverse = rt, this.hotspots = gt, this.hotspotTrigger = tt, this.hide360Logo = J, this.logoSrc = N, this.inertia = et, this.pinchZoom = at, this.hints = G, this.hotspotTimelineOnClick = Nt, this.zoomControlsEnabled = Vt, this.zoomControlsPosition = Lt, this.scrollHintEnabled = Wt, lt === "dark" ? this.container.classList.add("ci360-theme-dark") : lt === "light" && this.container.classList.remove("ci360-theme-dark"), this.onReady = $t, this.onLoad = Ot, this.onSpin = Pt, this.onAutoplayStart = jt, this.onAutoplayStop = Ut, this.onFullscreenOpen = K, this.onFullscreenClose = ht, this.onZoomIn = Mt, this.onZoomOut = _t, this.onDragStart = yt, this.onDragEnd = Yt, this.onError = Xt, this.srcXConfig = {
      folder: n,
      filename: a,
      imageList: dt,
      container: t,
      innerBox: this.innerBox,
      apiVersion: r,
      ciParams: bt,
      lazyload: O,
      amount: this.amountX,
      indexZeroBase: u,
      autoplayReverse: g,
      orientation: _.X
    }, this.srcYConfig = {
      ...this.srcXConfig,
      filename: l,
      imageList: Gt,
      orientation: _.Y,
      amount: this.amountY
    }, o && this.removeEvents(), this.attachEvents(C, b, v), o) return;
    const he = (this.fullscreenView ? document.body : this.container).offsetWidth, de = this.allowSpinX && !dt.length ? It(this.srcXConfig, he) : null, ue = this.allowSpinY && !Gt.length ? It(this.srcYConfig, he) : null, pe = (si) => {
      we({
        cdnPathX: de,
        cdnPathY: ue,
        configX: this.srcXConfig,
        configY: this.srcYConfig,
        onImageLoad: (wt, ni, ri) => this.onImageLoad(wt, ni, ri),
        onFirstImageLoad: (wt) => this.onFirstImageLoaded(si, wt),
        onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        onError: (wt) => this.emit("onError", wt)
      });
    };
    this.allowSpinX ? Ae(de, this.srcXConfig, pe) : this.allowSpinY && Ae(ue, this.srcYConfig, pe);
  }
}
const Ve = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class gn {
  constructor() {
    this.views = /* @__PURE__ */ new Map(), this.initAll = this.initAll.bind(this), this.getViews = this.getViews.bind(this), this.memoryObserver = null, this.memoryManagementAutoEnabled = !1;
  }
  generateId() {
    return `ci360-${Math.random().toString(36).slice(2, 11)}`;
  }
  init(t, i, o) {
    if (!t) return;
    const s = t.id || this.generateId();
    t.id || (t.id = s);
    const n = new Zt(t, i, o);
    return this.views.set(s, n), Ve && !this.memoryManagementAutoEnabled && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100)), n;
  }
  initAll(t = "cloudimage-360") {
    [...document.querySelectorAll(`.${t}`)].filter(Boolean).forEach((o) => {
      const s = o.id || this.generateId();
      o.id || (o.id = s);
      const n = new Zt(o);
      this.views.set(s, n);
    }), Ve && !this.memoryManagementAutoEnabled && this.views.size > 0 && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100));
  }
  destroy(t) {
    const i = this.getViewById(t);
    i && (i.destroy(), this.views.delete(t));
  }
  destroyAll() {
    this.views.forEach((t) => {
      t.destroy();
    }), this.views.clear();
  }
  getViewById(t) {
    return this.views.get(t);
  }
  getViews() {
    return Array.from(this.views.values());
  }
  updateView(t, i) {
    const o = this.getViewById(t);
    if (!o) return null;
    const s = { ...o.viewerConfig, ...i };
    o.destroy();
    const n = document.getElementById(t);
    return this.init(n, s);
  }
  /**
   * Enable automatic memory management for mobile devices.
   * Releases memory for off-screen viewers and reloads when they become visible.
   * Also releases memory when the page is backgrounded (visibilitychange).
   * Call this after initializing all viewers.
   * @param {Object} options - Configuration options
   * @param {string} options.rootMargin - IntersectionObserver rootMargin (default: '200px')
   */
  enableMemoryManagement(t = {}) {
    this.memoryObserver && this.memoryObserver.disconnect();
    const i = t.rootMargin || "200px";
    this.memoryObserver = new IntersectionObserver(
      (o) => {
        o.forEach((s) => {
          const n = this.getViewById(s.target.id);
          n && (s.isIntersecting ? n.isMemoryReleased && n.reloadImages() : !n.isMemoryReleased && n.isReady && n.releaseMemory());
        });
      },
      { rootMargin: i }
    ), this.views.forEach((o, s) => {
      const n = document.getElementById(s);
      n && this.memoryObserver.observe(n);
    }), this.boundVisibilityHandler = () => {
      document.hidden ? this.views.forEach((o) => {
        !o.isMemoryReleased && o.isReady && o.releaseMemory();
      }) : this.views.forEach((o, s) => {
        if (o.isMemoryReleased) {
          const n = document.getElementById(s);
          if (n) {
            const r = n.getBoundingClientRect();
            r.top < window.innerHeight && r.bottom > 0 && o.reloadImages();
          }
        }
      });
    }, document.addEventListener("visibilitychange", this.boundVisibilityHandler);
  }
  /**
   * Disable automatic memory management
   */
  disableMemoryManagement() {
    this.memoryObserver && (this.memoryObserver.disconnect(), this.memoryObserver = null), this.boundVisibilityHandler && (document.removeEventListener("visibilitychange", this.boundVisibilityHandler), this.boundVisibilityHandler = null);
  }
}
export {
  gn as default
};
//# sourceMappingURL=ci360-BhkJxl_F.mjs.map
