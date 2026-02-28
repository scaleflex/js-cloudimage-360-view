var ui = Object.defineProperty;
var pi = (e, t, i) => t in e ? ui(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var ge = (e, t, i) => pi(e, typeof t != "symbol" ? t + "" : t, i);
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ke = "Expected a function", ye = NaN, fi = "[object Symbol]", vi = /^\s+|\s+$/g, gi = /^[-+]0x[0-9a-f]+$/i, yi = /^0b[01]+$/i, bi = /^0o[0-7]+$/i, wi = parseInt, Ci = typeof Rt == "object" && Rt && Rt.Object === Object && Rt, Ii = typeof self == "object" && self && self.Object === Object && self, xi = Ci || Ii || Function("return this")(), Oi = Object.prototype, Ei = Oi.toString, Ai = Math.max, ki = Math.min, Qt = function() {
  return xi.Date.now();
};
function Si(e, t, i) {
  var o, s, n, l, a, r, h = 0, c = !1, u = !1, f = !0;
  if (typeof e != "function")
    throw new TypeError(Ke);
  t = be(t) || 0, Wt(i) && (c = !!i.leading, u = "maxWait" in i, n = u ? Ai(be(i.maxWait) || 0, t) : n, f = "trailing" in i ? !!i.trailing : f);
  function p(m) {
    var g = o, I = s;
    return o = s = void 0, h = m, l = e.apply(I, g), l;
  }
  function C(m) {
    return h = m, a = setTimeout(O, t), c ? p(m) : l;
  }
  function b(m) {
    var g = m - r, I = m - h, A = t - g;
    return u ? ki(A, n - I) : A;
  }
  function v(m) {
    var g = m - r, I = m - h;
    return r === void 0 || g >= t || g < 0 || u && I >= n;
  }
  function O() {
    var m = Qt();
    if (v(m))
      return E(m);
    a = setTimeout(O, b(m));
  }
  function E(m) {
    return a = void 0, f && o ? p(m) : (o = s = void 0, l);
  }
  function w() {
    a !== void 0 && clearTimeout(a), h = 0, o = r = s = a = void 0;
  }
  function y() {
    return a === void 0 ? l : E(Qt());
  }
  function x() {
    var m = Qt(), g = v(m);
    if (o = arguments, s = this, r = m, g) {
      if (a === void 0)
        return C(r);
      if (u)
        return a = setTimeout(O, t), p(r);
    }
    return a === void 0 && (a = setTimeout(O, t)), l;
  }
  return x.cancel = w, x.flush = y, x;
}
function Ti(e, t, i) {
  var o = !0, s = !0;
  if (typeof e != "function")
    throw new TypeError(Ke);
  return Wt(i) && (o = "leading" in i ? !!i.leading : o, s = "trailing" in i ? !!i.trailing : s), Si(e, t, {
    leading: o,
    maxWait: t,
    trailing: s
  });
}
function Wt(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function Li(e) {
  return !!e && typeof e == "object";
}
function Pi(e) {
  return typeof e == "symbol" || Li(e) && Ei.call(e) == fi;
}
function be(e) {
  if (typeof e == "number")
    return e;
  if (Pi(e))
    return ye;
  if (Wt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Wt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(vi, "");
  var i = yi.test(e);
  return i || bi.test(e) ? wi(e.slice(2), i ? 2 : 8) : gi.test(e) ? ye : +e;
}
var Mi = Ti;
const we = /* @__PURE__ */ mi(Mi), R = {
  SPIN_X: "spin-x",
  SPIN_Y: "spin-y",
  SPIN_XY: "spin-xy",
  SPIN_YX: "spin-yx"
}, Yi = [!1, 0, null, void 0, "false", "0", "null", "undefined"], Y = {
  X: "x-axis",
  Y: "y-axis"
}, Hi = [37, 39], Ri = [38, 40], Xi = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), Ce = Xi ? 32 : 10, Zi = 150, Xt = 800, Di = 150, Bi = 200, Ie = 50, Wi = 50, Fi = 5, xe = 5, d = {
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
  autoplayBehavior: R.SPIN_X,
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
  markerTheme: null,
  brandColor: null,
  hotspotTimelineOnClick: !0,
  aspectRatio: null,
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
  onDragEnd: null,
  onHotspotOpen: null,
  onHotspotClose: null
}, Vi = (e) => ({
  folder: S(e, "folder", d.folder),
  apiVersion: S(e, "api-version", d.apiVersion),
  filenameX: S(e, "filename") || S(e, "filename-x") || d.filenameX,
  filenameY: S(e, "filename-y", d.filenameY),
  imageListX: S(e, "image-list-x", d.imageListX),
  imageListY: S(e, "image-list-y", d.imageListY),
  indexZeroBase: parseInt(S(e, "index-zero-base", d.indexZeroBase), 10),
  amountX: parseInt(S(e, "amount-x", d.amountX), 10),
  amountY: parseInt(S(e, "amount-y", d.amountY), 10),
  speed: parseInt(S(e, "speed", d.speed), 10),
  dragSpeed: parseInt(S(e, "drag-speed", d.dragSpeed), 10),
  draggable: M(e, "draggable", d.draggable),
  swipeable: M(e, "swipeable", d.swipeable),
  keys: M(e, "keys", d.keys),
  keysReverse: M(e, "keys-reverse", d.keysReverse),
  autoplay: M(e, "autoplay", d.autoplay),
  autoplayBehavior: S(e, "autoplay-behavior", d.autoplayBehavior),
  playOnce: M(e, "play-once", d.playOnce),
  autoplayReverse: M(e, "autoplay-reverse", d.autoplayReverse),
  pointerZoom: parseFloat(S(e, "pointer-zoom", d.pointerZoom)),
  pointerZoomTrigger: S(e, "pointer-zoom-trigger", d.pointerZoomTrigger),
  fullscreen: M(e, "fullscreen") || M(e, "full-screen", d.fullscreen),
  magnifier: parseFloat(S(e, "magnifier", d.magnifier)),
  bottomCircleOffset: parseInt(
    S(e, "bottom-circle-offset", d.bottomCircleOffset),
    10
  ),
  ciToken: S(e, "responsive", d.ciToken),
  ciFilters: S(e, "filters", d.ciFilters),
  ciTransformation: S(e, "transformation", d.ciTransformation),
  lazyload: M(e, "lazyload", d.lazyload),
  dragReverse: M(e, "drag-reverse", d.dragReverse),
  stopAtEdges: M(e, "stop-at-edges", d.stopAtEdges),
  imageInfo: M(e, "info", d.imageInfo),
  initialIconShown: !Zt(e, "initial-icon"),
  bottomCircle: !Zt(e, "bottom-circle"),
  hide360Logo: M(e, "hide-360-logo", d.hide360Logo),
  logoSrc: S(e, "logo-src", d.logoSrc),
  inertia: M(e, "inertia", d.inertia),
  pinchZoom: M(e, "pinch-zoom", d.pinchZoom),
  hints: !Zt(e, "hints"),
  theme: S(e, "theme", d.theme),
  markerTheme: S(e, "marker-theme", d.markerTheme),
  brandColor: S(e, "brand-color", d.brandColor),
  hotspotTrigger: S(e, "hotspot-trigger", d.hotspotTrigger),
  hotspotTimelineOnClick: !Zt(e, "hotspot-timeline-on-click"),
  aspectRatio: S(e, "aspect-ratio", d.aspectRatio)
}), Ni = (e) => {
  const t = [];
  e.amountX !== void 0 && e.amountX < 0 && t.push("amountX should be a positive number"), e.amountY !== void 0 && e.amountY < 0 && t.push("amountY should be a positive number"), e.speed !== void 0 && e.speed <= 0 && t.push("speed should be a positive number"), e.dragSpeed !== void 0 && e.dragSpeed <= 0 && t.push("dragSpeed should be a positive number"), e.pointerZoom !== void 0 && e.pointerZoom !== 0 && (e.pointerZoom < 1 || e.pointerZoom > 5) && t.push("pointerZoom should be between 1 and 5 (or 0 to disable)"), e.magnifier !== void 0 && e.magnifier !== null && e.magnifier !== 0 && (e.magnifier < 1 || e.magnifier > 5) && t.push("magnifier should be between 1 and 5 (or 0/null to disable)"), !e.folder && !e.imageListX && !e.imageListY && t.push("Either folder or imageListX/imageListY is required"), e.folder && !e.amountX && !e.imageListX && t.push("amountX is required when using folder (unless imageListX is provided)");
  const i = ["spin-x", "spin-y", "spin-xy", "spin-yx"];
  return e.autoplayBehavior && !i.includes(e.autoplayBehavior) && t.push(`autoplayBehavior should be one of: ${i.join(", ")}`), t.forEach((o) => {
    console.warn(`CloudImage 360: ${o}`);
  }), t.length === 0;
}, zi = (e) => (Ni(e), {
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
  markerTheme: e.markerTheme || d.markerTheme,
  brandColor: e.brandColor || d.brandColor,
  hotspotTimelineOnClick: e.hotspotTimelineOnClick ?? d.hotspotTimelineOnClick,
  aspectRatio: e.aspectRatio || d.aspectRatio,
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
  onDragEnd: e.onDragEnd ?? d.onDragEnd,
  onHotspotOpen: e.onHotspotOpen ?? d.onHotspotOpen,
  onHotspotClose: e.onHotspotClose ?? d.onHotspotClose
}), S = (e, t, i) => e.getAttribute(t) || e.getAttribute(`data-${t}`) || i, M = (e, t, i) => {
  if (!(e.hasAttribute(t) || e.hasAttribute(`data-${t}`))) return i;
  const s = S(e, t, null);
  return s !== "false" && s !== "0";
}, Zt = (e, t) => S(e, t, null) === "false", $i = (e = 1) => {
  const t = Math.round(window.devicePixelRatio || 1);
  return parseInt(e) * t;
}, ji = (e, t, i) => new URL(e).origin.includes("cloudimg") ? e : `https://${t}.cloudimg.io/${i}${e}`, Gi = ({ ciTransformation: e, responsiveWidth: t, ciFilters: i }) => {
  const o = `width=${t}`, s = e || o, n = i ? `&f=${i}` : "";
  return `${s}${n}`;
}, Ct = (e, t) => {
  const { folder: i, apiVersion: o, filename: s = "", ciParams: n } = e, { ciToken: l, ciFilters: a, ciTransformation: r } = n || {}, h = `${i}${s}`;
  if (!l || !t) return h;
  const c = Yi.includes(o) ? null : o, u = c ? `${c}/` : "", f = $i(t), p = ji(h, l, u), C = Gi({
    ciTransformation: r,
    responsiveWidth: f,
    ciFilters: a
  });
  return `${p}${C ? "?" : ""}${C}`;
}, _i = (e, t, i) => {
  const [o, s] = e.split("?"), n = `${t}=${encodeURIComponent(i)}`;
  if (!s)
    return `${o}?${n}`;
  const l = new URLSearchParams(s);
  return l.set(t, i), `${o}?${l.toString()}`;
}, Ui = (e, t) => _i(e, "width", t), qe = (e, t = 0) => (e += "", e.length >= t ? e : new Array(t - e.length + 1).join("0") + e), Ki = (e, { amount: t = 0, indexZeroBase: i = 0 } = {}) => Array.from({ length: t }, (o, s) => e.replace("{index}", qe(s + 1, i))), qi = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), Ji = qi ? 3 : 6, Qi = ({
  imagesUrls: e,
  onFirstImageLoad: t,
  onImageLoad: i,
  onAllImagesLoad: o,
  onError: s,
  autoplayReverse: n
}) => {
  let l = 0, a = 0;
  const r = e.length, h = [], c = [];
  let u = 0, f = 0;
  const p = [], C = (m, g, I = !1) => {
    const A = {
      message: `Failed to load image: ${m}`,
      url: m,
      index: g,
      isFirstImage: I
    };
    c.push(A), a++, s == null || s({
      error: A,
      errorCount: a,
      totalImages: r,
      errors: c
    });
  }, b = () => {
    l === r && (o == null || o(h, { errorCount: a, errors: c }));
  }, v = () => {
    for (; u < Ji && f < p.length; ) {
      const m = p[f];
      f++, O(e[m], m);
    }
  }, O = (m, g) => {
    u++;
    const I = new Image();
    I.crossOrigin = "anonymous", I.src = m, I.onload = async () => {
      try {
        const A = await createImageBitmap(I), k = {
          src: m,
          bitmapImage: A,
          naturalWidth: I.naturalWidth,
          naturalHeight: I.naturalHeight
        };
        I.onload = null, I.onerror = null, I.src = "", l++, u--, h[g] = k, i == null || i(k, g), b(), v();
      } catch {
        I.onload = null, I.onerror = null, I.src = "", l++, u--, C(m, g), b(), v();
      }
    }, I.onerror = () => {
      I.onload = null, I.onerror = null, I.src = "", l++, u--, C(m, g), b(), v();
    };
  }, E = (m) => {
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
      w.onload = null, w.onerror = null, w.src = "", h[y] = g, l++, t == null || t(g), i == null || i(g, y), r === 1 ? b() : E(y);
    } catch {
      w.onload = null, w.onerror = null, w.src = "", l++, C(x, y, !0), r === 1 ? b() : E(y);
    }
  }, w.onerror = () => {
    w.onload = null, w.onerror = null, w.src = "", l++, C(x, y, !0), r === 1 ? b() : E(y);
  };
}, Oe = ({
  cdnPathX: e,
  cdnPathY: t,
  configX: i,
  configY: o,
  onFirstImageLoad: s,
  onImageLoad: n,
  onAllImagesLoad: l,
  onError: a
}) => {
  let r = { x: !1, y: !1 }, h = [], c = [], u = { errorCount: 0, errors: [] }, f = { errorCount: 0, errors: [] };
  const p = e || i.imageList.length, C = t || o.imageList.length, b = () => {
    if (r.x && r.y) {
      const O = {
        errorCount: u.errorCount + f.errorCount,
        errors: [...u.errors, ...f.errors]
      };
      l == null || l(h, c, O);
    }
  }, v = ({ cdnPath: O, config: E, orientation: w, loadedImages: y, loadStats: x, onFirstImageLoad: m }) => {
    const g = w === Y.X, I = E.imageList.length ? E.imageList : Ki(O, E);
    Qi({
      imagesUrls: I,
      onFirstImageLoad: m,
      onImageLoad: (A, k) => {
        n == null || n(A, k, w), y[k] = A;
      },
      onError: (A) => {
        a == null || a({ ...A, orientation: w });
      },
      onAllImagesLoad: (A, k) => {
        y.length = 0, A.forEach((T, H) => {
          T && (y[H] = T);
        }), x.errorCount = k.errorCount, x.errors = k.errors.map((T) => ({ ...T, orientation: w })), r[g ? "x" : "y"] = !0, b();
      },
      autoplayReverse: E.autoplayReverse
    });
  };
  p ? v({
    cdnPath: e,
    config: i,
    orientation: Y.X,
    loadedImages: h,
    loadStats: u,
    onFirstImageLoad: s
  }) : r.x = !0, C ? v({
    cdnPath: t,
    config: o,
    orientation: Y.Y,
    loadedImages: c,
    loadStats: f,
    onFirstImageLoad: p ? void 0 : s
  }) : r.y = !0, !p && !C && b();
}, to = `
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
`, eo = (e) => {
  const t = document.createElement("div");
  return t.innerHTML = to, t.style.bottom = `${e}%`, t.className = "cloudimage-360-view-360-circle", t;
}, io = `
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
`, oo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-initial-icon", t.setAttribute("aria-label", "360 degree view - drag to rotate"), e ? (t.style.backgroundImage = `url('${e}')`, t.style.backgroundPosition = "50% 50%", t.style.backgroundSize = "contain", t.style.backgroundRepeat = "no-repeat") : t.innerHTML = io, t;
}, so = (e, t) => {
  const { width: i, height: o } = t, s = document.createElement("canvas");
  return s.width = i, s.height = o, s.style.width = "100%", s.style.height = "auto", e.appendChild(s), s;
}, no = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-close-icon", e.setAttribute("aria-label", "Close fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', e;
}, ro = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-fullscreen-button", e.setAttribute("aria-label", "View fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>', e;
}, Ee = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-icons-container", e.appendChild(t), t;
}, ao = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-inner-box", t.setAttribute("role", "img"), t.setAttribute("aria-label", "360 degree product view. Use mouse drag or arrow keys to rotate."), e.appendChild(t), t;
}, lo = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-magnifier-button", e.setAttribute("aria-label", "Magnify image"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>', e;
}, co = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-zoom-out-button", e.setAttribute("aria-label", "Zoom out"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>', e;
}, ho = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-loader";
  const i = document.createElement("span");
  return i.className = "percentage", i.innerText = "0%", t.appendChild(i), e.appendChild(t), t;
}, uo = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-fullscreen-modal";
  const i = e.cloneNode();
  return i.style.width = "100%", i.style.maxWidth = "100%", i.style.height = "100vh", i.style.maxHeight = "100%", t.appendChild(i), window.document.body.appendChild(t), i;
}, ie = (e, t) => {
  const i = e.querySelector(t);
  i && i.parentNode.removeChild(i);
}, po = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-loading-spinner", e;
}, mo = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-360-transition-overlay", e;
}, fo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-hotspot-container", e.appendChild(t), t;
}, vo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-sr-only", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"), t.setAttribute("aria-atomic", "true"), e.appendChild(t), t;
}, go = (e, t) => {
  e && (e.textContent = "", setTimeout(() => {
    e.textContent = t;
  }, 50));
}, Je = {
  drag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  swipe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h8"/></svg>',
  click: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>',
  pinch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l4 4"/><path d="M18 6l-4 4"/><path d="M6 18l4-4"/><path d="M18 18l-4-4"/><circle cx="12" cy="12" r="2"/></svg>',
  keys: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m9 10 3 3 3-3"/></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
}, Ae = {
  drag: "Drag to rotate",
  swipe: "Swipe to rotate",
  click: "Click to zoom",
  dblclick: "Double-click to zoom",
  pinch: "Pinch to zoom",
  keys: "Use arrow keys",
  fullscreen: "Click for fullscreen"
}, yo = (e, t = {}) => {
  const i = document.createElement("div");
  i.className = "cloudimage-360-hint-item";
  let o = Ae[e];
  return e === "click" && t.pointerZoomTrigger === "dblclick" && (o = Ae.dblclick), i.innerHTML = `
    ${Je[e]}
    <span>${o}</span>
  `, i;
}, ke = (e, t = [], i = {}) => {
  if (!t || t.length === 0) return null;
  const o = document.createElement("div");
  o.className = "cloudimage-360-hints-overlay", o.setAttribute("role", "tooltip"), o.setAttribute("aria-label", "Interaction hints");
  const s = document.createElement("div");
  return s.className = "cloudimage-360-hints-container", t.forEach((n) => {
    Je[n] && s.appendChild(yo(n, i));
  }), o.appendChild(s), e.appendChild(o), o;
}, Se = (e, t) => t ? ["swipe", "pinch"] : ["drag", "click"], Te = (e) => {
  e && e.classList.add("visible");
}, bo = (e) => {
  e && (e.classList.remove("visible"), e.classList.add("hiding"), setTimeout(() => {
    e.classList.remove("hiding");
  }, 300));
}, wo = (e) => {
  if (!e || typeof e != "object") return null;
  const t = Object.keys(e).map((o) => parseInt(o, 10)).filter((o) => !isNaN(o)).sort((o, s) => o - s);
  if (t.length === 0) return null;
  const i = Math.floor(t.length / 2);
  return t[i];
}, Co = (e) => {
  const t = [];
  return !e || !Array.isArray(e) || e.forEach((i, o) => {
    const s = wo(i.positions);
    s !== null && t.push({
      id: i.id || `hotspot-${o}`,
      frame: s,
      label: i.label || null
    });
  }), t;
}, Io = 400, xo = (e, t, i, o) => {
  const s = document.createElement("button");
  s.className = "cloudimage-360-hotspot-timeline-dot", s.setAttribute("type", "button"), s.setAttribute("aria-label", o || `Go to hotspot at frame ${t + 1}`), s.setAttribute("data-frame", t.toString()), s.setAttribute("data-hotspot-id", e);
  const n = i > 1 ? t / (i - 1) * 100 : 0;
  if (s.style.left = `${n}%`, o) {
    const l = document.createElement("span");
    l.className = "cloudimage-360-hotspot-timeline-tooltip", l.textContent = o, s.appendChild(l);
    let a = null;
    s.addEventListener("mouseenter", () => {
      a = setTimeout(() => {
        l.classList.add("visible");
      }, Io);
    }), s.addEventListener("mouseleave", () => {
      a && (clearTimeout(a), a = null), l.classList.remove("visible");
    }), s.addEventListener("click", () => {
      a && (clearTimeout(a), a = null), l.classList.remove("visible");
    });
  }
  return s;
}, Oo = (e, t, i) => {
  const o = Co(i);
  if (o.length === 0) return null;
  const s = document.createElement("div");
  s.className = "cloudimage-360-hotspot-timeline", s.setAttribute("role", "navigation"), s.setAttribute("aria-label", "Hotspot timeline navigation");
  const n = document.createElement("div");
  n.className = "cloudimage-360-hotspot-timeline-track";
  const l = document.createElement("div");
  return l.className = "cloudimage-360-hotspot-timeline-indicator", o.forEach(({ id: a, frame: r, label: h }) => {
    const c = xo(a, r, t, h);
    n.appendChild(c);
  }), n.appendChild(l), s.appendChild(n), e.appendChild(s), {
    element: s,
    indicator: l,
    hotspotFrames: o
  };
}, Eo = (e, t, i) => {
  if (!e) return;
  const o = i > 1 ? t / (i - 1) * 100 : 0;
  e.style.left = `${o}%`;
}, Ao = (e) => {
  e && e.classList.add("visible");
}, ko = (e) => {
  e && e.classList.remove("visible");
}, oe = (e, t = []) => {
  if (!e) return t;
  if (Array.isArray(e)) return e;
  try {
    return JSON.parse(e);
  } catch (i) {
    return console.warn("CloudImage 360: Failed to parse JSON:", i.message), t;
  }
}, So = (e, t) => {
  const [i, o] = e.split("?");
  if (!o) return e;
  const s = new RegExp(`^${t}=|&${t}=`), n = o.split("&").filter((l) => !s.test(l)).join("&");
  return n ? `${i}?${n}` : i;
}, To = (e) => {
  const t = So(e, "width"), i = t.includes("?") ? "&" : "?";
  return `${t}${i}width=${150 * devicePixelRatio}`;
}, Lo = (e) => {
  const t = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  }, i = (s) => {
    const n = s.getAttribute("data-src");
    n && (s.src = n);
  };
  new IntersectionObserver((s, n) => {
    s.forEach((l) => {
      l.isIntersecting && (i(l.target), n.unobserve(l.target));
    });
  }, t).observe(e);
}, Po = (e, t) => {
  const i = qe(1, t);
  return e.replace("{index}", i);
}, Mo = (e, t) => {
  const [i] = e, o = /(https?):\/\//i.test(i);
  return Ct({
    ...t,
    folder: o ? "" : t.folder,
    filename: i
  });
}, Yo = (e, t) => {
  const { imageList: i, indexZeroBase: o } = t;
  if (i.length) {
    const s = oe(i, null);
    if (s)
      return Mo(s, t);
  }
  return Po(e, o);
}, Le = (e, t, i) => {
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
}, Pe = (e, t, i) => {
  const { innerBox: o, imageList: s, lazyload: n } = t || {}, [l] = s, a = l || Yo(e, t), r = To(a), h = Le(r, n, "cloudimage-lazy"), c = Le(r, !1, "cloudimage-360-placeholder"), u = (f) => {
    ie(o, ".cloudimage-lazy"), i && i({
      event: f,
      width: h.width,
      height: h.height,
      naturalWidth: h.naturalWidth,
      naturalHeight: h.naturalHeight,
      src: r
    });
  };
  h.onload = u, o.appendChild(h), o.appendChild(c), Lo(h);
}, Ho = (e, t, i) => {
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
}, Ro = (e, t) => {
  const i = t.getBoundingClientRect(), o = e.touches ? e.touches[0].clientX : e.clientX, s = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: o - i.left,
    y: s - i.top
  };
}, te = (e, t, i) => {
  const { container: o, w: s, h: n, zoom: l, bw: a, offsetX: r, offsetY: h } = t, c = Ro(e, o);
  let u = c.x, f = c.y;
  u = Math.max(s / l, Math.min(u, o.offsetWidth - s / l)), f = Math.max(n / l, Math.min(f, o.offsetHeight - n / l)), i.style.left = `${u - s}px`, i.style.top = `${f - n}px`;
  const p = (u - r) * l - s + a, C = (f - h) * l - n + a;
  i.style.backgroundPosition = `-${p}px -${C}px`;
}, Xo = (e, t, i, o, s, n) => {
  const { x: l = 0, y: a = 0 } = i || {}, r = (t.offsetWidth - l * 2) * n, h = (t.offsetHeight - a * 2) * n;
  if (!s) return;
  s.setAttribute("class", "cloudimage-360-img-magnifier-glass"), t.prepend(s), s.style.backgroundImage = `url('${o.src}')`, s.style.backgroundSize = `${r}px ${h}px`;
  const c = 3, u = s.offsetWidth / 2, f = s.offsetHeight / 2, p = {
    container: t,
    w: u,
    h: f,
    zoom: n,
    bw: c,
    offsetX: l,
    offsetY: a
  };
  te(e, p, s);
  const C = (v) => {
    te(v, p, s);
  }, b = (v) => {
    v.preventDefault(), te(v, p, s);
  };
  s.addEventListener("mousemove", C), t.addEventListener("mousemove", C), t.addEventListener("touchmove", b);
}, Zo = (e, t, i) => {
  const { clientX: o, clientY: s } = e, n = t.getBoundingClientRect(), l = t.width / (n.width * i), a = t.height / (n.height * i), r = (o - n.left) * l, h = (s - n.top) * a;
  return { offsetX: r, offsetY: h };
}, Do = (e, t, i) => {
  const o = e / i, s = t / i;
  return { zoomedWidth: o, zoomedHeight: s };
}, Bo = ({
  pointerX: e,
  pointerY: t,
  imageData: i,
  zoomedWidth: o,
  zoomedHeight: s,
  drawWidth: n,
  drawHeight: l
}) => {
  const { naturalWidth: a, naturalHeight: r } = i;
  let h = e / n * a - o / 2, c = t / l * r - s / 2;
  const u = Math.max(0, a - o), f = Math.max(0, r - s);
  return h = Math.max(0, Math.min(h, u)), c = Math.max(0, Math.min(c, f)), { zoomOffsetX: h, zoomOffsetY: c };
}, Me = (e, { bottom: t, top: i }) => {
  e ? t() : i();
}, Ye = (e, { left: t, right: i }) => {
  e ? t() : i();
}, Wo = ({ autoplayBehavior: e, spinY: t, reversed: i, loopTriggers: o }) => {
  switch (e) {
    case R.SPIN_XY:
    case R.SPIN_YX:
      t ? Me(i, o) : Ye(i, o);
      break;
    case R.SPIN_Y:
      Me(i, o);
      break;
    case R.SPIN_X:
    default:
      Ye(i, o);
  }
}, Fo = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n
}) => {
  const l = (a, r) => {
    const h = r - 1;
    return n ? a === 0 : a === h;
  };
  switch (e) {
    case R.SPIN_XY:
    case R.SPIN_Y:
      return l(i, s);
    case R.SPIN_X:
    case R.SPIN_YX:
    default:
      return l(t, o);
  }
}, Vo = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n,
  spinDirection: l
}) => {
  const a = t === (n ? 0 : o - 1), r = i === (n ? 0 : s - 1);
  return e === R.SPIN_XY || e === R.SPIN_YX ? l === "x" && a || l === "y" && r : !1;
}, No = (e, t, i) => {
  if (!i) return "x";
  if (!t) return "y";
  switch (e) {
    case R.SPIN_XY:
      return "x";
    case R.SPIN_YX:
      return "y";
    case R.SPIN_Y:
      return "y";
    case R.SPIN_X:
    default:
      return "x";
  }
}, zo = (e) => e === "x" ? "y" : "x", He = (e, t) => {
  const i = [...Hi];
  return t ? [...i, ...Ri].includes(e) : i.includes(e);
}, Re = ({ deltaX: e, deltaY: t, reversed: i, allowSpinX: o, allowSpinY: s, threshold: n = 0 }) => {
  const l = o && !s || s && !o ? 0 : n, a = Math.abs(e), r = Math.abs(t);
  return o && a - l > r ? i ? e > 0 ? "left" : "right" : e > 0 ? "right" : "left" : s && r - l > a ? i ? t > 0 ? "up" : "down" : t > 0 ? "down" : "up" : null;
}, $o = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, jo = (e, t = 150) => {
  let i;
  return function(...o) {
    clearTimeout(i), i = setTimeout(() => {
      e.apply(this, o);
    }, t);
  };
}, Qe = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHY9KHQsYSxlKT0+e2NvbnN0IHM9dC9lLG49YS9lO3JldHVybnt6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpufX0sej0oe3BvaW50ZXJYOnQscG9pbnRlclk6YSxpbWFnZURhdGE6ZSx6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpuLGRyYXdXaWR0aDppLGRyYXdIZWlnaHQ6Y30pPT57Y29uc3R7bmF0dXJhbFdpZHRoOmcsbmF0dXJhbEhlaWdodDp1fT1lO2xldCBmPXQvaSpnLXMvMixtPWEvYyp1LW4vMjtjb25zdCB4PU1hdGgubWF4KDAsZy1zKSxPPU1hdGgubWF4KDAsdS1uKTtyZXR1cm4gZj1NYXRoLm1heCgwLE1hdGgubWluKGYseCkpLG09TWF0aC5tYXgoMCxNYXRoLm1pbihtLE8pKSx7em9vbU9mZnNldFg6Zix6b29tT2Zmc2V0WTptfX07bGV0IG8saCxyLGQsbCx3O3NlbGYub25tZXNzYWdlPWFzeW5jIHQ9Pntjb25zdHthY3Rpb246YSxvZmZzY3JlZW46ZSxkZXZpY2VQaXhlbFJhdGlvOnMsaW1hZ2VEYXRhOm4sem9vbVNjYWxlOmkscG9pbnRlclg6Yyxwb2ludGVyWTpnLGltYWdlQXNwZWN0UmF0aW86dSxjb250YWluZXJXaWR0aDpmLGNvbnRhaW5lckhlaWdodDptfT10LmRhdGE7c3dpdGNoKGEpe2Nhc2UiaW5pdENhbnZhcyI6QyhlLHMpO2JyZWFrO2Nhc2UiYWRhcHRDYW52YXNTaXplIjpwKHUsZixtKTticmVhaztjYXNlImRyYXdJbWFnZU9uQ2FudmFzIjpJKG4saSxjLGcpO2JyZWFrfX07Y29uc3QgQz0odCxhKT0+e289dCxoPW8uZ2V0Q29udGV4dCgiMmQiKSxyPWF9LHA9KHQsYSxlKT0+e2NvbnN0IHM9YS9lO3c9dD5zLG8ud2lkdGg9YSpyLG8uaGVpZ2h0PWUqcixoLnNjYWxlKHIsciksdz8oZD1hLGw9YS90KToobD1lLGQ9ZSp0KSxoLmltYWdlU21vb3RoaW5nRW5hYmxlZD0hMCxoLmltYWdlU21vb3RoaW5nUXVhbGl0eT0iaGlnaCJ9LEk9KHQ9e30sYT0xLGU9MCxzPTApPT57Y29uc3R7Yml0bWFwSW1hZ2U6bn09dDtpZighb3x8IW4pcmV0dXJuO2xldCBpLGM7aWYodz8oaT0wLGM9KG8uaGVpZ2h0L3ItbCkvMik6KGk9KG8ud2lkdGgvci1kKS8yLGM9MCksaC5jbGVhclJlY3QoMCwwLG8ud2lkdGgsby5oZWlnaHQpLGEhPT0xKXtjb25zdHtuYXR1cmFsV2lkdGg6ZyxuYXR1cmFsSGVpZ2h0OnV9PXQse3pvb21lZFdpZHRoOmYsem9vbWVkSGVpZ2h0Om19PXYoZyx1LGEpLHt6b29tT2Zmc2V0WDp4LHpvb21PZmZzZXRZOk99PXooe3BvaW50ZXJYOmUscG9pbnRlclk6cyxpbWFnZURhdGE6dCx6b29tZWRXaWR0aDpmLHpvb21lZEhlaWdodDptLGRyYXdXaWR0aDpkLGRyYXdIZWlnaHQ6bH0pO2guZHJhd0ltYWdlKG4seCxPLGYsbSxpLGMsZCxsKX1lbHNlIGguZHJhd0ltYWdlKG4saSxjLGQsbCl9fSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FudmFzLndvcmtlci1DZzBma3BEMS5qcy5tYXAK", Go = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0)), Xe = typeof self < "u" && self.Blob && new Blob([Go(Qe)], { type: "text/javascript;charset=utf-8" });
function _o(e) {
  let t;
  try {
    if (t = Xe && (self.URL || self.webkitURL).createObjectURL(Xe), !t) throw "";
    const i = new Worker(t, {
      name: e == null ? void 0 : e.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Qe,
      {
        name: e == null ? void 0 : e.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
class Uo {
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
      zoomScale: l,
      pointerX: a,
      pointerY: r,
      imageAspectRatio: h,
      containerWidth: c,
      containerHeight: u
    } = t;
    switch (i) {
      case "initCanvas":
        this.initCanvas(o, s);
        break;
      case "adaptCanvasSize":
        this.adaptCanvasSize(h, c, u);
        break;
      case "drawImageOnCanvas":
        this.drawImageOnCanvas(n, l, a, r);
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
  drawImageOnCanvas(t = {}, i = 1, o = 0, s = 0) {
    const { bitmapImage: n } = t;
    if (!this.canvas || !this.ctx || !n) return;
    let l, a;
    if (this.wideImage ? (l = 0, a = (this.canvas.height / this.dpr - this.drawHeight) / 2) : (l = (this.canvas.width / this.dpr - this.drawWidth) / 2, a = 0), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), i !== 1) {
      const { naturalWidth: r, naturalHeight: h } = t, { zoomedWidth: c, zoomedHeight: u } = Do(r, h, i), { zoomOffsetX: f, zoomOffsetY: p } = Bo({
        pointerX: o,
        pointerY: s,
        imageData: t,
        zoomedWidth: c,
        zoomedHeight: u,
        drawWidth: this.drawWidth,
        drawHeight: this.drawHeight
      });
      this.ctx.drawImage(
        n,
        f,
        p,
        c,
        u,
        l,
        a,
        this.drawWidth,
        this.drawHeight
      );
    } else
      this.ctx.drawImage(n, l, a, this.drawWidth, this.drawHeight);
  }
}
const Ko = /* @__PURE__ */ new Set([
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
]), Ze = {
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
}, qo = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi
], Jo = (e) => {
  if (typeof e != "string")
    return "";
  const t = document.createElement("template");
  t.innerHTML = e;
  const i = (o) => {
    if (Array.from(o.childNodes).forEach(i), o.nodeType === Node.ELEMENT_NODE) {
      const n = o.tagName.toLowerCase();
      if (!Ko.has(n)) {
        if (n === "script" || n === "style") {
          o.remove();
          return;
        }
        const r = document.createTextNode(o.textContent);
        o.parentNode.replaceChild(r, o);
        return;
      }
      const l = [
        ...Ze[n] || [],
        ...Ze["*"] || []
      ];
      if (Array.from(o.attributes).forEach((r) => {
        const h = r.name.toLowerCase();
        if (h.startsWith("on")) {
          o.removeAttribute(r.name);
          return;
        }
        if (!l.includes(h)) {
          o.removeAttribute(r.name);
          return;
        }
        let c = r.value;
        qo.forEach((u) => {
          u.test(c) && o.removeAttribute(r.name);
        });
      }), n === "a") {
        const r = o.getAttribute("href");
        r && (/^(https?:|mailto:|tel:|#|\/)/i.test(r.trim()) || o.removeAttribute("href")), o.getAttribute("target") === "_blank" && o.setAttribute("rel", "noopener noreferrer");
      }
      if (n === "img") {
        const r = o.getAttribute("src");
        r && (/^(https?:|\/|data:image\/)/i.test(r.trim()) || o.removeAttribute("src"));
      }
    }
  };
  return i(t.content), t.innerHTML;
}, Qo = (e) => e === "y" ? Y.Y : Y.X, ts = (e, t, i) => e.filter(
  (o) => Qo(o.orientation) === i && t in o.positions
), es = (e, t, i) => {
  const o = document.createElement("button");
  if (o.id = e, o.className = "cloudimage-360-hotspot cloudimage-360-hotspot--pulse", o.dataset.hotspotId = e, o.setAttribute("type", "button"), o.setAttribute("aria-label", t || `Hotspot ${e}`), o.setAttribute("aria-haspopup", "true"), o.setAttribute("aria-expanded", "false"), i === "dot-label" && t) {
    o.classList.add("cloudimage-360-hotspot--dot-label");
    const s = document.createElement("span");
    s.className = "cloudimage-360-hotspot-label", s.textContent = t, o.appendChild(s);
  }
  return o;
}, is = (e) => {
  const t = Object.entries(e).sort(([n], [l]) => Number(n) - Number(l));
  let i = null, o = null;
  const s = {};
  for (const [n, l] of t)
    if (!l)
      s[n] = { x: i, y: o };
    else {
      const { x: a, y: r } = l;
      a != null && (i = a), r != null && (o = r), s[n] = {
        x: a || i,
        y: r || o
      };
    }
  return s;
}, os = (e) => ({
  placement: "top",
  modifiers: [
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
    },
    {
      name: "flip",
      options: {
        boundary: e,
        fallbackPlacements: ["bottom", "right", "left"]
      }
    }
  ]
}), ss = (e, t) => {
  const i = document.createElement("div");
  return i.className = "cloudimage-360-popper", i.id = `cloudimage-360-popper-${t}`, i.dataset.popperId = t, i.setAttribute("role", "tooltip"), i.setAttribute("aria-hidden", "false"), typeof e == "string" && /<\/?[a-z][\s\S]*>/i.test(e) ? i.innerHTML = Jo(e) : i.textContent = e, document.body.appendChild(i), i;
}, ns = (e) => {
  const t = [...e];
  return t.forEach((i, o) => {
    const s = { ...is(i.positions) };
    t[o].initialPositions = s, t[o].positions = s;
  }), t;
}, rs = ({
  newWidth: e,
  newHeight: t,
  initialContainerSize: i,
  imageAspectRatio: o,
  hotspotsConfig: s
}) => {
  const [n, l] = i;
  let a = e, r = t, h = 0, c = 0;
  const u = e / t;
  o > u ? (r = e / o, c = (t - r) / 2) : (a = t * o, h = (e - a) / 2);
  const p = a / n, C = r / l;
  return s.map((b) => {
    const v = {};
    return Object.entries(b.initialPositions).forEach(([O, E]) => {
      v[O] = {
        x: E.x * p + h,
        y: E.y * C + c
      };
    }), { ...b, positions: v };
  });
};
function as(e) {
  const t = [];
  e.image && t.push(
    `<div class="ci360-popper-image-wrapper"><img class="ci360-popper-image" src="${ee(e.image)}" alt="${ee(e.title || "")}"></div>`
  );
  const i = [];
  if (e.title && i.push(`<h3 class="ci360-popper-title">${bt(e.title)}</h3>`), e.originalPrice || e.price) {
    let o = "";
    e.originalPrice && (o += `<span class="ci360-popper-original-price">${bt(e.originalPrice)}</span>`), e.price && (o += `<span class="ci360-popper-price">${bt(e.price)}</span>`), i.push(`<div class="ci360-popper-price-row">${o}</div>`);
  }
  if (e.description && i.push(`<p class="ci360-popper-description">${bt(e.description)}</p>`), e.url && ls(e.url)) {
    const o = e.ctaText || "View details";
    i.push(
      `<a class="ci360-popper-cta" href="${ee(e.url)}">${bt(String(o))}</a>`
    );
  }
  return i.length > 0 && t.push(`<div class="ci360-popper-body">${i.join("")}</div>`), t.join("");
}
function De(e) {
  return e.content ? e.content : e.data ? as(e.data) : "";
}
function bt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function ee(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ls(e) {
  const t = e.replace(/[\s\x00-\x1f]/g, "");
  return /^https?:\/\//i.test(t) || /^\/(?!\/)/.test(t) || /^#/.test(t);
}
var X = "top", F = "bottom", V = "right", Z = "left", re = "auto", At = [X, F, V, Z], dt = "start", Ot = "end", cs = "clippingParents", ti = "viewport", wt = "popper", hs = "reference", Be = /* @__PURE__ */ At.reduce(function(e, t) {
  return e.concat([t + "-" + dt, t + "-" + Ot]);
}, []), ei = /* @__PURE__ */ [].concat(At, [re]).reduce(function(e, t) {
  return e.concat([t, t + "-" + dt, t + "-" + Ot]);
}, []), ds = "beforeRead", us = "read", ps = "afterRead", ms = "beforeMain", fs = "main", vs = "afterMain", gs = "beforeWrite", ys = "write", bs = "afterWrite", ws = [ds, us, ps, ms, fs, vs, gs, ys, bs];
function $(e) {
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
function W(e) {
  var t = B(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ae(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = B(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Cs(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(i) {
    var o = t.styles[i] || {}, s = t.attributes[i] || {}, n = t.elements[i];
    !W(n) || !$(n) || (Object.assign(n.style, o), Object.keys(s).forEach(function(l) {
      var a = s[l];
      a === !1 ? n.removeAttribute(l) : n.setAttribute(l, a === !0 ? "" : a);
    }));
  });
}
function Is(e) {
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
      var s = t.elements[o], n = t.attributes[o] || {}, l = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : i[o]), a = l.reduce(function(r, h) {
        return r[h] = "", r;
      }, {});
      !W(s) || !$(s) || (Object.assign(s.style, a), Object.keys(n).forEach(function(r) {
        s.removeAttribute(r);
      }));
    });
  };
}
const xs = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Cs,
  effect: Is,
  requires: ["computeStyles"]
};
function z(e) {
  return e.split("-")[0];
}
var it = Math.max, Ft = Math.min, ut = Math.round;
function se() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ii() {
  return !/^((?!chrome|android).)*safari/i.test(se());
}
function pt(e, t, i) {
  t === void 0 && (t = !1), i === void 0 && (i = !1);
  var o = e.getBoundingClientRect(), s = 1, n = 1;
  t && W(e) && (s = e.offsetWidth > 0 && ut(o.width) / e.offsetWidth || 1, n = e.offsetHeight > 0 && ut(o.height) / e.offsetHeight || 1);
  var l = ot(e) ? B(e) : window, a = l.visualViewport, r = !ii() && i, h = (o.left + (r && a ? a.offsetLeft : 0)) / s, c = (o.top + (r && a ? a.offsetTop : 0)) / n, u = o.width / s, f = o.height / n;
  return {
    width: u,
    height: f,
    top: c,
    right: h + u,
    bottom: c + f,
    left: h,
    x: h,
    y: c
  };
}
function le(e) {
  var t = pt(e), i = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: i,
    height: o
  };
}
function oi(e, t) {
  var i = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (i && ae(i)) {
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
function Os(e) {
  return ["table", "td", "th"].indexOf($(e)) >= 0;
}
function Q(e) {
  return ((ot(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Nt(e) {
  return $(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ae(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Q(e)
  );
}
function We(e) {
  return !W(e) || // https://github.com/popperjs/popper-core/issues/837
  q(e).position === "fixed" ? null : e.offsetParent;
}
function Es(e) {
  var t = /firefox/i.test(se()), i = /Trident/i.test(se());
  if (i && W(e)) {
    var o = q(e);
    if (o.position === "fixed")
      return null;
  }
  var s = Nt(e);
  for (ae(s) && (s = s.host); W(s) && ["html", "body"].indexOf($(s)) < 0; ) {
    var n = q(s);
    if (n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].indexOf(n.willChange) !== -1 || t && n.willChange === "filter" || t && n.filter && n.filter !== "none")
      return s;
    s = s.parentNode;
  }
  return null;
}
function kt(e) {
  for (var t = B(e), i = We(e); i && Os(i) && q(i).position === "static"; )
    i = We(i);
  return i && ($(i) === "html" || $(i) === "body" && q(i).position === "static") ? t : i || Es(e) || t;
}
function ce(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function It(e, t, i) {
  return it(e, Ft(t, i));
}
function As(e, t, i) {
  var o = It(e, t, i);
  return o > i ? i : o;
}
function si() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ni(e) {
  return Object.assign({}, si(), e);
}
function ri(e, t) {
  return t.reduce(function(i, o) {
    return i[o] = e, i;
  }, {});
}
var ks = function(t, i) {
  return t = typeof t == "function" ? t(Object.assign({}, i.rects, {
    placement: i.placement
  })) : t, ni(typeof t != "number" ? t : ri(t, At));
};
function Ss(e) {
  var t, i = e.state, o = e.name, s = e.options, n = i.elements.arrow, l = i.modifiersData.popperOffsets, a = z(i.placement), r = ce(a), h = [Z, V].indexOf(a) >= 0, c = h ? "height" : "width";
  if (!(!n || !l)) {
    var u = ks(s.padding, i), f = le(n), p = r === "y" ? X : Z, C = r === "y" ? F : V, b = i.rects.reference[c] + i.rects.reference[r] - l[r] - i.rects.popper[c], v = l[r] - i.rects.reference[r], O = kt(n), E = O ? r === "y" ? O.clientHeight || 0 : O.clientWidth || 0 : 0, w = b / 2 - v / 2, y = u[p], x = E - f[c] - u[C], m = E / 2 - f[c] / 2 + w, g = It(y, m, x), I = r;
    i.modifiersData[o] = (t = {}, t[I] = g, t.centerOffset = g - m, t);
  }
}
function Ts(e) {
  var t = e.state, i = e.options, o = i.element, s = o === void 0 ? "[data-popper-arrow]" : o;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || oi(t.elements.popper, s) && (t.elements.arrow = s));
}
const Ls = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ss,
  effect: Ts,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function mt(e) {
  return e.split("-")[1];
}
var Ps = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ms(e, t) {
  var i = e.x, o = e.y, s = t.devicePixelRatio || 1;
  return {
    x: ut(i * s) / s || 0,
    y: ut(o * s) / s || 0
  };
}
function Fe(e) {
  var t, i = e.popper, o = e.popperRect, s = e.placement, n = e.variation, l = e.offsets, a = e.position, r = e.gpuAcceleration, h = e.adaptive, c = e.roundOffsets, u = e.isFixed, f = l.x, p = f === void 0 ? 0 : f, C = l.y, b = C === void 0 ? 0 : C, v = typeof c == "function" ? c({
    x: p,
    y: b
  }) : {
    x: p,
    y: b
  };
  p = v.x, b = v.y;
  var O = l.hasOwnProperty("x"), E = l.hasOwnProperty("y"), w = Z, y = X, x = window;
  if (h) {
    var m = kt(i), g = "clientHeight", I = "clientWidth";
    if (m === B(i) && (m = Q(i), q(m).position !== "static" && a === "absolute" && (g = "scrollHeight", I = "scrollWidth")), m = m, s === X || (s === Z || s === V) && n === Ot) {
      y = F;
      var A = u && m === x && x.visualViewport ? x.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        m[g]
      );
      b -= A - o.height, b *= r ? 1 : -1;
    }
    if (s === Z || (s === X || s === F) && n === Ot) {
      w = V;
      var k = u && m === x && x.visualViewport ? x.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        m[I]
      );
      p -= k - o.width, p *= r ? 1 : -1;
    }
  }
  var T = Object.assign({
    position: a
  }, h && Ps), H = c === !0 ? Ms({
    x: p,
    y: b
  }, B(i)) : {
    x: p,
    y: b
  };
  if (p = H.x, b = H.y, r) {
    var L;
    return Object.assign({}, T, (L = {}, L[y] = E ? "0" : "", L[w] = O ? "0" : "", L.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + b + "px)" : "translate3d(" + p + "px, " + b + "px, 0)", L));
  }
  return Object.assign({}, T, (t = {}, t[y] = E ? b + "px" : "", t[w] = O ? p + "px" : "", t.transform = "", t));
}
function Ys(e) {
  var t = e.state, i = e.options, o = i.gpuAcceleration, s = o === void 0 ? !0 : o, n = i.adaptive, l = n === void 0 ? !0 : n, a = i.roundOffsets, r = a === void 0 ? !0 : a, h = {
    placement: z(t.placement),
    variation: mt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: s,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Fe(Object.assign({}, h, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: l,
    roundOffsets: r
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Fe(Object.assign({}, h, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: r
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Hs = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ys,
  data: {}
};
var Dt = {
  passive: !0
};
function Rs(e) {
  var t = e.state, i = e.instance, o = e.options, s = o.scroll, n = s === void 0 ? !0 : s, l = o.resize, a = l === void 0 ? !0 : l, r = B(t.elements.popper), h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return n && h.forEach(function(c) {
    c.addEventListener("scroll", i.update, Dt);
  }), a && r.addEventListener("resize", i.update, Dt), function() {
    n && h.forEach(function(c) {
      c.removeEventListener("scroll", i.update, Dt);
    }), a && r.removeEventListener("resize", i.update, Dt);
  };
}
const Xs = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Rs,
  data: {}
};
var Zs = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Bt(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Zs[t];
  });
}
var Ds = {
  start: "end",
  end: "start"
};
function Ve(e) {
  return e.replace(/start|end/g, function(t) {
    return Ds[t];
  });
}
function he(e) {
  var t = B(e), i = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: i,
    scrollTop: o
  };
}
function de(e) {
  return pt(Q(e)).left + he(e).scrollLeft;
}
function Bs(e, t) {
  var i = B(e), o = Q(e), s = i.visualViewport, n = o.clientWidth, l = o.clientHeight, a = 0, r = 0;
  if (s) {
    n = s.width, l = s.height;
    var h = ii();
    (h || !h && t === "fixed") && (a = s.offsetLeft, r = s.offsetTop);
  }
  return {
    width: n,
    height: l,
    x: a + de(e),
    y: r
  };
}
function Ws(e) {
  var t, i = Q(e), o = he(e), s = (t = e.ownerDocument) == null ? void 0 : t.body, n = it(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), l = it(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -o.scrollLeft + de(e), r = -o.scrollTop;
  return q(s || i).direction === "rtl" && (a += it(i.clientWidth, s ? s.clientWidth : 0) - n), {
    width: n,
    height: l,
    x: a,
    y: r
  };
}
function ue(e) {
  var t = q(e), i = t.overflow, o = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(i + s + o);
}
function ai(e) {
  return ["html", "body", "#document"].indexOf($(e)) >= 0 ? e.ownerDocument.body : W(e) && ue(e) ? e : ai(Nt(e));
}
function xt(e, t) {
  var i;
  t === void 0 && (t = []);
  var o = ai(e), s = o === ((i = e.ownerDocument) == null ? void 0 : i.body), n = B(o), l = s ? [n].concat(n.visualViewport || [], ue(o) ? o : []) : o, a = t.concat(l);
  return s ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(xt(Nt(l)))
  );
}
function ne(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Fs(e, t) {
  var i = pt(e, !1, t === "fixed");
  return i.top = i.top + e.clientTop, i.left = i.left + e.clientLeft, i.bottom = i.top + e.clientHeight, i.right = i.left + e.clientWidth, i.width = e.clientWidth, i.height = e.clientHeight, i.x = i.left, i.y = i.top, i;
}
function Ne(e, t, i) {
  return t === ti ? ne(Bs(e, i)) : ot(t) ? Fs(t, i) : ne(Ws(Q(e)));
}
function Vs(e) {
  var t = xt(Nt(e)), i = ["absolute", "fixed"].indexOf(q(e).position) >= 0, o = i && W(e) ? kt(e) : e;
  return ot(o) ? t.filter(function(s) {
    return ot(s) && oi(s, o) && $(s) !== "body";
  }) : [];
}
function Ns(e, t, i, o) {
  var s = t === "clippingParents" ? Vs(e) : [].concat(t), n = [].concat(s, [i]), l = n[0], a = n.reduce(function(r, h) {
    var c = Ne(e, h, o);
    return r.top = it(c.top, r.top), r.right = Ft(c.right, r.right), r.bottom = Ft(c.bottom, r.bottom), r.left = it(c.left, r.left), r;
  }, Ne(e, l, o));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function li(e) {
  var t = e.reference, i = e.element, o = e.placement, s = o ? z(o) : null, n = o ? mt(o) : null, l = t.x + t.width / 2 - i.width / 2, a = t.y + t.height / 2 - i.height / 2, r;
  switch (s) {
    case X:
      r = {
        x: l,
        y: t.y - i.height
      };
      break;
    case F:
      r = {
        x: l,
        y: t.y + t.height
      };
      break;
    case V:
      r = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Z:
      r = {
        x: t.x - i.width,
        y: a
      };
      break;
    default:
      r = {
        x: t.x,
        y: t.y
      };
  }
  var h = s ? ce(s) : null;
  if (h != null) {
    var c = h === "y" ? "height" : "width";
    switch (n) {
      case dt:
        r[h] = r[h] - (t[c] / 2 - i[c] / 2);
        break;
      case Ot:
        r[h] = r[h] + (t[c] / 2 - i[c] / 2);
        break;
    }
  }
  return r;
}
function Et(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = o === void 0 ? e.placement : o, n = i.strategy, l = n === void 0 ? e.strategy : n, a = i.boundary, r = a === void 0 ? cs : a, h = i.rootBoundary, c = h === void 0 ? ti : h, u = i.elementContext, f = u === void 0 ? wt : u, p = i.altBoundary, C = p === void 0 ? !1 : p, b = i.padding, v = b === void 0 ? 0 : b, O = ni(typeof v != "number" ? v : ri(v, At)), E = f === wt ? hs : wt, w = e.rects.popper, y = e.elements[C ? E : f], x = Ns(ot(y) ? y : y.contextElement || Q(e.elements.popper), r, c, l), m = pt(e.elements.reference), g = li({
    reference: m,
    element: w,
    placement: s
  }), I = ne(Object.assign({}, w, g)), A = f === wt ? I : m, k = {
    top: x.top - A.top + O.top,
    bottom: A.bottom - x.bottom + O.bottom,
    left: x.left - A.left + O.left,
    right: A.right - x.right + O.right
  }, T = e.modifiersData.offset;
  if (f === wt && T) {
    var H = T[s];
    Object.keys(k).forEach(function(L) {
      var j = [V, F].indexOf(L) >= 0 ? 1 : -1, G = [X, F].indexOf(L) >= 0 ? "y" : "x";
      k[L] += H[G] * j;
    });
  }
  return k;
}
function zs(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = i.boundary, n = i.rootBoundary, l = i.padding, a = i.flipVariations, r = i.allowedAutoPlacements, h = r === void 0 ? ei : r, c = mt(o), u = c ? a ? Be : Be.filter(function(C) {
    return mt(C) === c;
  }) : At, f = u.filter(function(C) {
    return h.indexOf(C) >= 0;
  });
  f.length === 0 && (f = u);
  var p = f.reduce(function(C, b) {
    return C[b] = Et(e, {
      placement: b,
      boundary: s,
      rootBoundary: n,
      padding: l
    })[z(b)], C;
  }, {});
  return Object.keys(p).sort(function(C, b) {
    return p[C] - p[b];
  });
}
function $s(e) {
  if (z(e) === re)
    return [];
  var t = Bt(e);
  return [Ve(e), t, Ve(t)];
}
function js(e) {
  var t = e.state, i = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var s = i.mainAxis, n = s === void 0 ? !0 : s, l = i.altAxis, a = l === void 0 ? !0 : l, r = i.fallbackPlacements, h = i.padding, c = i.boundary, u = i.rootBoundary, f = i.altBoundary, p = i.flipVariations, C = p === void 0 ? !0 : p, b = i.allowedAutoPlacements, v = t.options.placement, O = z(v), E = O === v, w = r || (E || !C ? [Bt(v)] : $s(v)), y = [v].concat(w).reduce(function(J, N) {
      return J.concat(z(N) === re ? zs(t, {
        placement: N,
        boundary: c,
        rootBoundary: u,
        padding: h,
        flipVariations: C,
        allowedAutoPlacements: b
      }) : N);
    }, []), x = t.rects.reference, m = t.rects.popper, g = /* @__PURE__ */ new Map(), I = !0, A = y[0], k = 0; k < y.length; k++) {
      var T = y[k], H = z(T), L = mt(T) === dt, j = [X, F].indexOf(H) >= 0, G = j ? "width" : "height", P = Et(t, {
        placement: T,
        boundary: c,
        rootBoundary: u,
        altBoundary: f,
        padding: h
      }), D = j ? L ? V : Z : L ? F : X;
      x[G] > m[G] && (D = Bt(D));
      var st = Bt(D), _ = [];
      if (n && _.push(P[H] <= 0), a && _.push(P[D] <= 0, P[st] <= 0), _.every(function(J) {
        return J;
      })) {
        A = T, I = !1;
        break;
      }
      g.set(T, _);
    }
    if (I)
      for (var nt = C ? 3 : 1, ft = function(N) {
        var et = y.find(function(at) {
          var U = g.get(at);
          if (U)
            return U.slice(0, N).every(function(lt) {
              return lt;
            });
        });
        if (et)
          return A = et, "break";
      }, tt = nt; tt > 0; tt--) {
        var rt = ft(tt);
        if (rt === "break") break;
      }
    t.placement !== A && (t.modifiersData[o]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const Gs = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: js,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ze(e, t, i) {
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
function $e(e) {
  return [X, V, F, Z].some(function(t) {
    return e[t] >= 0;
  });
}
function _s(e) {
  var t = e.state, i = e.name, o = t.rects.reference, s = t.rects.popper, n = t.modifiersData.preventOverflow, l = Et(t, {
    elementContext: "reference"
  }), a = Et(t, {
    altBoundary: !0
  }), r = ze(l, o), h = ze(a, s, n), c = $e(r), u = $e(h);
  t.modifiersData[i] = {
    referenceClippingOffsets: r,
    popperEscapeOffsets: h,
    isReferenceHidden: c,
    hasPopperEscaped: u
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": u
  });
}
const Us = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: _s
};
function Ks(e, t, i) {
  var o = z(e), s = [Z, X].indexOf(o) >= 0 ? -1 : 1, n = typeof i == "function" ? i(Object.assign({}, t, {
    placement: e
  })) : i, l = n[0], a = n[1];
  return l = l || 0, a = (a || 0) * s, [Z, V].indexOf(o) >= 0 ? {
    x: a,
    y: l
  } : {
    x: l,
    y: a
  };
}
function qs(e) {
  var t = e.state, i = e.options, o = e.name, s = i.offset, n = s === void 0 ? [0, 0] : s, l = ei.reduce(function(c, u) {
    return c[u] = Ks(u, t.rects, n), c;
  }, {}), a = l[t.placement], r = a.x, h = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += r, t.modifiersData.popperOffsets.y += h), t.modifiersData[o] = l;
}
const Js = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qs
};
function Qs(e) {
  var t = e.state, i = e.name;
  t.modifiersData[i] = li({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const tn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Qs,
  data: {}
};
function en(e) {
  return e === "x" ? "y" : "x";
}
function on(e) {
  var t = e.state, i = e.options, o = e.name, s = i.mainAxis, n = s === void 0 ? !0 : s, l = i.altAxis, a = l === void 0 ? !1 : l, r = i.boundary, h = i.rootBoundary, c = i.altBoundary, u = i.padding, f = i.tether, p = f === void 0 ? !0 : f, C = i.tetherOffset, b = C === void 0 ? 0 : C, v = Et(t, {
    boundary: r,
    rootBoundary: h,
    padding: u,
    altBoundary: c
  }), O = z(t.placement), E = mt(t.placement), w = !E, y = ce(O), x = en(y), m = t.modifiersData.popperOffsets, g = t.rects.reference, I = t.rects.popper, A = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, k = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, H = {
    x: 0,
    y: 0
  };
  if (m) {
    if (n) {
      var L, j = y === "y" ? X : Z, G = y === "y" ? F : V, P = y === "y" ? "height" : "width", D = m[y], st = D + v[j], _ = D - v[G], nt = p ? -I[P] / 2 : 0, ft = E === dt ? g[P] : I[P], tt = E === dt ? -I[P] : -g[P], rt = t.elements.arrow, J = p && rt ? le(rt) : {
        width: 0,
        height: 0
      }, N = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : si(), et = N[j], at = N[G], U = It(0, g[P], J[P]), lt = w ? g[P] / 2 - nt - U - et - k.mainAxis : ft - U - et - k.mainAxis, St = w ? -g[P] / 2 + nt + U + at + k.mainAxis : tt + U + at + k.mainAxis, ct = t.elements.arrow && kt(t.elements.arrow), zt = ct ? y === "y" ? ct.clientTop || 0 : ct.clientLeft || 0 : 0, Tt = (L = T == null ? void 0 : T[y]) != null ? L : 0, $t = D + lt - Tt - zt, jt = D + St - Tt, Lt = It(p ? Ft(st, $t) : st, D, p ? it(_, jt) : _);
      m[y] = Lt, H[y] = Lt - D;
    }
    if (a) {
      var Pt, Gt = y === "x" ? X : Z, _t = y === "x" ? F : V, K = m[x], ht = x === "y" ? "height" : "width", Mt = K + v[Gt], Yt = K - v[_t], vt = [X, Z].indexOf(O) !== -1, Ut = (Pt = T == null ? void 0 : T[x]) != null ? Pt : 0, Kt = vt ? Mt : K - g[ht] - I[ht] - Ut + k.altAxis, Ht = vt ? K + g[ht] + I[ht] - Ut - k.altAxis : Yt, gt = p && vt ? As(Kt, K, Ht) : It(p ? Kt : Mt, K, p ? Ht : Yt);
      m[x] = gt, H[x] = gt - K;
    }
    t.modifiersData[o] = H;
  }
}
const sn = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: on,
  requiresIfExists: ["offset"]
};
function nn(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function rn(e) {
  return e === B(e) || !W(e) ? he(e) : nn(e);
}
function an(e) {
  var t = e.getBoundingClientRect(), i = ut(t.width) / e.offsetWidth || 1, o = ut(t.height) / e.offsetHeight || 1;
  return i !== 1 || o !== 1;
}
function ln(e, t, i) {
  i === void 0 && (i = !1);
  var o = W(t), s = W(t) && an(t), n = Q(t), l = pt(e, s, i), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, r = {
    x: 0,
    y: 0
  };
  return (o || !o && !i) && (($(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ue(n)) && (a = rn(t)), W(t) ? (r = pt(t, !0), r.x += t.clientLeft, r.y += t.clientTop) : n && (r.x = de(n))), {
    x: l.left + a.scrollLeft - r.x,
    y: l.top + a.scrollTop - r.y,
    width: l.width,
    height: l.height
  };
}
function cn(e) {
  var t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(n) {
    t.set(n.name, n);
  });
  function s(n) {
    i.add(n.name);
    var l = [].concat(n.requires || [], n.requiresIfExists || []);
    l.forEach(function(a) {
      if (!i.has(a)) {
        var r = t.get(a);
        r && s(r);
      }
    }), o.push(n);
  }
  return e.forEach(function(n) {
    i.has(n.name) || s(n);
  }), o;
}
function hn(e) {
  var t = cn(e);
  return ws.reduce(function(i, o) {
    return i.concat(t.filter(function(s) {
      return s.phase === o;
    }));
  }, []);
}
function dn(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(i) {
      Promise.resolve().then(function() {
        t = void 0, i(e());
      });
    })), t;
  };
}
function un(e) {
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
var je = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ge() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function pn(e) {
  e === void 0 && (e = {});
  var t = e, i = t.defaultModifiers, o = i === void 0 ? [] : i, s = t.defaultOptions, n = s === void 0 ? je : s;
  return function(a, r, h) {
    h === void 0 && (h = n);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, je, n),
      modifiersData: {},
      elements: {
        reference: a,
        popper: r
      },
      attributes: {},
      styles: {}
    }, u = [], f = !1, p = {
      state: c,
      setOptions: function(O) {
        var E = typeof O == "function" ? O(c.options) : O;
        b(), c.options = Object.assign({}, n, c.options, E), c.scrollParents = {
          reference: ot(a) ? xt(a) : a.contextElement ? xt(a.contextElement) : [],
          popper: xt(r)
        };
        var w = hn(un([].concat(o, c.options.modifiers)));
        return c.orderedModifiers = w.filter(function(y) {
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
          var O = c.elements, E = O.reference, w = O.popper;
          if (Ge(E, w)) {
            c.rects = {
              reference: ln(E, kt(w), c.options.strategy === "fixed"),
              popper: le(w)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(k) {
              return c.modifiersData[k.name] = Object.assign({}, k.data);
            });
            for (var y = 0; y < c.orderedModifiers.length; y++) {
              if (c.reset === !0) {
                c.reset = !1, y = -1;
                continue;
              }
              var x = c.orderedModifiers[y], m = x.fn, g = x.options, I = g === void 0 ? {} : g, A = x.name;
              typeof m == "function" && (c = m({
                state: c,
                options: I,
                name: A,
                instance: p
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: dn(function() {
        return new Promise(function(v) {
          p.forceUpdate(), v(c);
        });
      }),
      destroy: function() {
        b(), f = !0;
      }
    };
    if (!Ge(a, r))
      return p;
    p.setOptions(h).then(function(v) {
      !f && h.onFirstUpdate && h.onFirstUpdate(v);
    });
    function C() {
      c.orderedModifiers.forEach(function(v) {
        var O = v.name, E = v.options, w = E === void 0 ? {} : E, y = v.effect;
        if (typeof y == "function") {
          var x = y({
            state: c,
            name: O,
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
var mn = [Xs, tn, Hs, xs, Js, Gs, sn, Ls, Us], fn = /* @__PURE__ */ pn({
  defaultModifiers: mn
});
class vn {
  /**
   * @param {Array} hotspotsConfig - Hotspot configuration array
   * @param {HTMLElement} container - Container element
   * @param {number} imageAspectRatio - Image aspect ratio
   * @param {Object} options - Additional options
   * @param {string} options.trigger - 'hover' or 'click' (default: 'hover')
   */
  constructor(t, i, o, s = {}) {
    ge(this, "updateHotspotPosition", (t, i) => {
      this.currentActiveIndex = t, this.currentOrientation = i;
      const o = ts(this.hotspotsConfig, t, i);
      this.hideHotspots(), o.forEach((s) => this.updateAndShowHotspot(s, t));
    });
    this.container = i, this.popper = null, this.popperInstance = null, this.hotspotsContainer = fo(this.container), this.hotspotsConfig = ns(t), this.shouldHidePopper = !0, this.hidePopper = this.hidePopper.bind(this), this.forceHidePopper = this.forceHidePopper.bind(this), this.imageAspectRatio = o, this.hotspotElements = /* @__PURE__ */ new Map(), this.popperListeners = [], this.trigger = s.trigger || "hover", this.onOpen = s.onOpen || null, this.onClose = s.onClose || null;
    const { containerSize: n } = t[0];
    this.initialContainerSize = n || [i.offsetWidth, i.offsetHeight], this.initHotspots(), this.updateHotspotsForResize(i.offsetWidth, i.offsetHeight), this.observeContainerResize();
  }
  observeContainerResize() {
    this.resizeObserver = new ResizeObserver(() => {
      const t = this.container.offsetWidth, i = this.container.offsetHeight;
      this.updateHotspotsForResize(t, i);
    }), this.resizeObserver.observe(this.container);
  }
  updateHotspotsForResize(t, i) {
    this.hotspotsConfig = rs({
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
    var c;
    this.popperInstance && this.hidePopper();
    const n = os(this.container);
    this.popper = ss(i, o), this.popper.setAttribute("data-show", ""), this.currentHotspotElement = t, t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-describedby", `cloudimage-360-popper-${o}`);
    const l = () => {
      this.shouldHidePopper = !1;
    }, a = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, r = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, h = () => {
      this.shouldHidePopper = !1, this.hidePopperTimeout && clearTimeout(this.hidePopperTimeout);
    };
    this.popper.addEventListener("mouseenter", l), this.popper.addEventListener("mouseleave", a), t.addEventListener("mouseleave", r), t.addEventListener("mouseenter", h), this.popperListeners.push(
      { element: this.popper, event: "mouseenter", handler: l },
      { element: this.popper, event: "mouseleave", handler: a },
      { element: t, event: "mouseleave", handler: r },
      { element: t, event: "mouseenter", handler: h }
    ), this.popperInstance = {
      ...fn(t, this.popper, n),
      keepOpen: s,
      instanceId: o
    };
    try {
      (c = this.onOpen) == null || c.call(this, o);
    } catch (u) {
      console.warn("onHotspotOpen callback error:", u);
    }
  }
  checkAndHidePopper() {
    var t;
    this.shouldHidePopper && !((t = this.popperInstance) != null && t.keepOpen) && (this.hidePopperTimeout = setTimeout(() => {
      this.shouldHidePopper && this.hidePopper();
    }, Di));
  }
  hidePopper() {
    var i, o;
    this.hidePopperTimeout && (clearTimeout(this.hidePopperTimeout), this.hidePopperTimeout = null);
    const t = (i = this.popperInstance) == null ? void 0 : i.instanceId;
    if (this.cleanupPopperListeners(), this.currentHotspotElement && (this.currentHotspotElement.setAttribute("aria-expanded", "false"), this.currentHotspotElement.removeAttribute("aria-describedby"), this.currentHotspotElement = null), this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null), t != null)
      try {
        (o = this.onClose) == null || o.call(this, t);
      } catch (s) {
        console.warn("onHotspotClose callback error:", s);
      }
    if (this.popper) {
      this.popper.removeAttribute("data-show"), this.popper.setAttribute("aria-hidden", "true");
      const s = this.popper;
      this.popper = null, setTimeout(() => {
        s.remove();
      }, Bi);
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
    const { id: i, keepOpen: o, onClick: s, label: n, markerStyle: l } = t, a = De(t), r = es(i, n, l);
    (s || a && this.trigger === "click") && (r.style.cursor = "pointer"), r.onclick = (h) => {
      var c;
      h.stopPropagation(), a && this.trigger === "click" && (((c = this.popperInstance) == null ? void 0 : c.instanceId) === i ? this.hidePopper() : this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: o })), s == null || s(h, this.popperInstance, i);
    }, a && this.trigger === "hover" && (r.addEventListener(
      "mouseenter",
      () => this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: o })
    ), r.addEventListener("mouseleave", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }), r.addEventListener(
      "focus",
      () => this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: o })
    ), r.addEventListener("blur", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    })), this.hotspotsContainer.appendChild(r);
  }
  hideHotspots() {
    this.hotspotsContainer.querySelectorAll(".cloudimage-360-hotspot").forEach((t) => {
      t.style.opacity = 0, t.style.pointerEvents = "none";
    });
  }
  updateAndShowHotspot(t, i) {
    const { positions: o, id: s } = t, { x: n, y: l } = o[i] ?? {}, a = this.hotspotsContainer.querySelector(`[data-hotspot-id="${s}"]`);
    a && (a.style.translate = `${n}px ${l}px`, a.style.opacity = 1, a.style.pointerEvents = "all");
  }
  /**
   * Shows the popper for a specific hotspot by ID
   * @param {string} hotspotId - The ID of the hotspot to show
   */
  showHotspotById(t) {
    const i = this.hotspotsConfig.find((n) => n.id === t);
    if (!i) return;
    const o = De(i);
    if (!o) return;
    const s = this.hotspotsContainer.querySelector(`[data-hotspot-id="${t}"]`);
    s && s.style.opacity === "1" && this.showPopper({
      hotspotElement: s,
      content: o,
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
const _e = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class Vt {
  constructor(t, i, o) {
    this.container = t, this.isClicked = !1, this.fullscreenView = !!o, this.imagesX = [], this.imagesY = [];
    const s = Math.round(window.devicePixelRatio || 1);
    this.devicePixelRatio = _e ? Math.min(s, 2) : s, this.id = t.id, this.movementStart = { x: 0, y: 0 }, this.draggingDirection = null, this.isReady = !1, this.velocityX = 0, this.velocityY = 0, this.lastDragTime = 0, this.lastDragX = 0, this.lastDragY = 0, this.inertiaAnimationId = null, this.hasInteracted = !1, this.currentZoomScale = 1, this.touchDevice = $o(), this.dragJustEnded = !1, this.isPinching = !1, this.initialPinchDistance = 0, this.pinchZoomLevel = 1, this.pinchZoomEmitted = !1, this.lastEmittedZoom = 1, this.panOffsetX = 0, this.panOffsetY = 0, this.useMainThreadCanvas = _e, this.canvasWorker = this.useMainThreadCanvas ? new Uo() : new _o(), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null, this.isAnimatingToFrame = !1, this.onMoveHandler = this.onMoveHandler.bind(this), this.destroy = this.destroy.bind(this), this.init(this.container, i);
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
    go(this.ariaLiveRegion, t);
  }
  mouseDown(t) {
    if (!this.isReady || this.glass) return;
    const i = t.target;
    if (i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline") || i.closest(".cloudimage-360-hotspot")))
      return;
    const { pageX: o, pageY: s } = t;
    this.hideHints(), this.hideHotspotPopper(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.autoplayJustStopped = !1, (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1, this.autoplayJustStopped = !0), this.movementStart = { x: o, y: s }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = o, this.lastDragY = s);
  }
  mouseUp() {
    this.isReady && (!this.isZoomed && !this.autoplayJustStopped && this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.isDragging && (this.emit("onDragEnd"), this.dragJustEnded = !0), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1, this.innerBox.style.cursor = "grab");
  }
  startInertia() {
    const o = this.fullscreenView ? document.body : this.container, s = this.dragSpeed / Ie, n = s * (this.amountX / o.offsetWidth), l = s * (this.amountY / o.offsetHeight), a = () => {
      if (this.velocityX *= 0.95, this.velocityY *= 0.95, Math.abs(this.velocityX) < 0.01 && Math.abs(this.velocityY) < 0.01) {
        this.inertiaAnimationId = null;
        return;
      }
      const r = this.velocityX * 16, h = this.velocityY * 16, c = Re({
        deltaX: r,
        deltaY: h,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY
      });
      if (c) {
        const u = this.allowSpinX ? Math.max(1, Math.abs(Math.round(r * n))) : 0, f = this.allowSpinY ? Math.max(1, Math.abs(Math.round(h * l))) : 0;
        (u > 0 || f > 0) && this.onMoveHandler(c, u, f);
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
    this.draggingDirection = Re({
      deltaX: o,
      deltaY: s,
      reversed: this.dragReverse,
      allowSpinX: this.allowSpinX,
      allowSpinY: this.allowSpinY
    }) || this.draggingDirection;
    const n = this.fullscreenView ? document.body : this.container, l = this.dragSpeed / Ie, a = l * (this.amountX / n.offsetWidth), r = l * (this.amountY / n.offsetHeight), h = this.allowSpinX ? Math.abs(Math.round(o * a)) : 0, c = this.allowSpinY ? Math.abs(Math.round(s * r)) : 0;
    (this.allowSpinX && h !== 0 || this.allowSpinY && c !== 0) && (this.hasInteracted = !0, this.hideHotspotPopper(), this.onMoveHandler(this.draggingDirection, h, c), this.movementStart = { x: t, y: i }, setTimeout(() => {
      this.isDragging || (this.isDragging = !0, this.emit("onDragStart"));
    }, Zi));
  }
  mouseMove(t) {
    !this.isReady || !this.isClicked && !this.isZoomed || this.glass || (this.isZoomed || this.hideAllIcons(), this.drag(t.pageX, t.pageY), this.isZoomed && this.applyZoom(t));
  }
  mouseClick(t) {
    if (!this.isReady || this.isDragging) return;
    const i = t.target;
    if (!(i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline") || i.closest(".cloudimage-360-hotspot")))) {
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
      this.pointerZoomTrigger === "click" && this.pointerZoom && !this.glass && !this.touchDevice && this.toggleZoom(t);
    }
  }
  mouseDblClick(t) {
    if (!this.isReady) return;
    const i = t.target;
    i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline") || i.closest(".cloudimage-360-hotspot")) || this.pointerZoomTrigger === "dblclick" && this.pointerZoom && !this.glass && !this.touchDevice && this.toggleZoom(t);
  }
  loadHigherQualityImages(t, i) {
    const o = Ct(this.srcXConfig, t), s = this.allowSpinY ? Ct(this.srcYConfig, t) : null;
    Oe({
      cdnPathX: o,
      cdnPathY: s,
      configX: this.srcXConfig,
      configY: this.srcYConfig,
      onAllImagesLoad: (n, l) => {
        this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = n, this.imagesY = l, i();
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
  toggleZoom(t) {
    if (this.isZoomed)
      this.showTransitionOverlay(), setTimeout(() => {
        this.removeZoom();
      }, Xt);
    else {
      let i = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;
      this.hideHotspots(), this.showLoadingSpinner(), this.loadHigherQualityImages(i, () => {
        this.showTransitionOverlay(), setTimeout(() => {
          this.applyZoom(t);
        }, Xt);
      });
    }
  }
  removeZoom() {
    this.isZoomed = !1, this.updateView(), this.showAllIcons(), this.hideZoomOutIcon(), this.hideTransitionOverlay(), this.emit("onZoomOut"), this.announce("Zoomed out");
  }
  zoomIn(t) {
    if (this.isZoomed || !this.pointerZoom) return;
    t == null || t.stopPropagation();
    let i = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;
    this.hideHotspots(), this.hideAllIcons(), this.showLoadingSpinner(), this.loadHigherQualityImages(i, () => {
      this.showTransitionOverlay(), setTimeout(() => {
        this.applyZoom(t);
      }, Xt);
    });
  }
  zoomOut(t) {
    this.isZoomed && (t == null || t.stopPropagation(), this.showTransitionOverlay(), setTimeout(() => {
      this.removeZoom();
    }, Xt));
  }
  mouseLeave() {
    this.isZoomed && this.removeZoom();
  }
  applyZoom(t) {
    const { offsetX: i, offsetY: o } = Zo(t, this.canvas, this.devicePixelRatio);
    this.isZoomed || (this.isZoomed = !0, this.hideAllIcons(), this.hideLoadingSpinner(), this.hideTransitionOverlay(), this.showZoomOutIcon(), this.emit("onZoomIn", { zoomLevel: this.pointerZoom }), this.announce("Zoomed in. Move mouse to pan. Click to zoom out.")), this.updateView(this.pointerZoom, i, o);
  }
  touchOutside(t) {
    if (!this.glass) return;
    !this.canvas.contains(t.target) && this.removeGlass();
  }
  touchStart(t) {
    if (!this.isReady || this.glass || !t.touches || !t.touches.length) return;
    const i = t.target;
    if (i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline") || i.closest(".cloudimage-360-hotspot")))
      return;
    if (this.hideHints(), t.touches.length === 2 && this.pinchZoom && !this.isDragging) {
      t.preventDefault(), this.isPinching = !0, this.isClicked = !1, this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null);
      const n = t.touches[0], l = t.touches[1];
      if (this.initialPinchDistance = this.getPinchDistance(n, l), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), !this.isZoomed && this.pinchZoomLevel === 1) {
        const a = (this.fullscreenView ? document.body : this.container).offsetWidth;
        this.hideHotspots(), this.loadHigherQualityImages(a, () => {
        });
      }
      return;
    }
    if (t.touches.length > 1) return;
    const { pageX: o, pageY: s } = t.touches[0];
    this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), this.hideAllIcons(), this.hideHotspotPopper(), this.movementStart = { x: o, y: s }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = o, this.lastDragY = s);
  }
  getPinchDistance(t, i) {
    const o = t.pageX - i.pageX, s = t.pageY - i.pageY;
    return Math.sqrt(o * o + s * s);
  }
  getPinchCenter(t, i) {
    return {
      x: (t.pageX + i.pageX) / 2,
      y: (t.pageY + i.pageY) / 2
    };
  }
  touchEnd(t) {
    if (this.isReady) {
      if (this.isPinching) {
        if (!t.touches || t.touches.length < 2) {
          if (this.isPinching = !1, this.initialPinchDistance = 0, this.pinchZoomLevel <= 1) {
            const i = this.pinchZoomEmitted;
            this.pinchZoomLevel = 1, this.pinchZoomEmitted = !1, this.lastEmittedZoom = 1, this.isZoomed = !1, this.panOffsetX = 0, this.panOffsetY = 0, this.showAllIcons(), this.updateView(), i && this.emit("onZoomOut");
          } else if (this.canvas) {
            const i = this.canvas.getBoundingClientRect();
            this.panOffsetX = i.width / 2 * this.devicePixelRatio, this.panOffsetY = i.height / 2 * this.devicePixelRatio;
          }
        }
        return;
      }
      this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1;
    }
  }
  touchMove(t) {
    if (!this.isReady || this.glass) return;
    if (this.isPinching && t.touches.length === 2) {
      t.preventDefault();
      const s = t.touches[0], n = t.touches[1], l = this.getPinchDistance(s, n);
      if (this.initialPinchDistance === 0) {
        this.initialPinchDistance = l;
        return;
      }
      const a = l / this.initialPinchDistance, r = Math.max(1, Math.min(this.pinchZoomLevel * a, xe));
      if (this.initialPinchDistance = l, this.pinchZoomLevel = r, !this.canvas) return;
      const h = this.canvas.getBoundingClientRect(), c = h.width / 2 * this.devicePixelRatio, u = h.height / 2 * this.devicePixelRatio;
      r > 1 ? (this.isZoomed = !0, this.hideAllIcons(), this.updateView(r, c, u), (!this.pinchZoomEmitted || r > this.lastEmittedZoom) && (this.emit("onZoomIn", { zoomLevel: r }), this.pinchZoomEmitted = !0, this.lastEmittedZoom = r)) : (this.isZoomed = !1, this.panOffsetX = 0, this.panOffsetY = 0, this.updateView());
      return;
    }
    if (!this.isClicked || !t.touches || !t.touches[0]) return;
    const { pageX: i, pageY: o } = t.touches[0];
    if (t.preventDefault(), this.isZoomed && this.pinchZoomLevel > 1) {
      const s = i - this.movementStart.x, n = o - this.movementStart.y;
      this.panOffsetX -= s * this.devicePixelRatio, this.panOffsetY -= n * this.devicePixelRatio, this.movementStart = { x: i, y: o }, this.updateView(this.pinchZoomLevel, this.panOffsetX, this.panOffsetY);
      return;
    }
    this.drag(i, o);
  }
  keyDown(t) {
    if (!this.isReady) return;
    const { keyCode: i } = t, o = this.keysReverse;
    switch (this.autoplay && this.stopAutoplay(), He(i, this.allowSpinY) && (this.hasInteracted = !0, this.hideAllIcons(), this.hideHints()), i) {
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
    He(i, this.allowSpinY) && this.showAllIcons();
  }
  moveActiveXIndexUp(t) {
    this.orientation = Y.X, this.activeImageX = (this.activeImageX + t) % this.amountX;
  }
  moveActiveXIndexDown(t) {
    this.orientation = Y.X, this.activeImageX = (this.activeImageX - t + this.amountX) % this.amountX;
  }
  moveActiveYIndexUp(t) {
    this.orientation = Y.Y, this.activeImageY = (this.activeImageY + t) % this.amountY;
  }
  moveActiveYIndexDown(t) {
    this.orientation = Y.Y, this.activeImageY = (this.activeImageY - t + this.amountY) % this.amountY;
  }
  moveRight(t, i = 1) {
    t && this.activeImageX >= this.imagesX.length - 1 || (this.moveActiveXIndexUp(i), this.isZoomed || this.updateView());
  }
  moveLeft(t, i = 1) {
    t && this.activeImageX <= 0 || (this.moveActiveXIndexDown(i), this.isZoomed || this.updateView());
  }
  moveTop(t, i = 1) {
    t && this.activeImageY >= this.imagesY.length - 1 || (this.moveActiveYIndexUp(i), this.isZoomed || this.updateView());
  }
  moveBottom(t, i = 1) {
    t && this.activeImageY <= 0 || (this.moveActiveYIndexDown(i), this.isZoomed || this.updateView());
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
  updateView(t, i, o) {
    const s = this.orientation === Y.X ? this.activeImageX : this.activeImageY, n = this.orientation === Y.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];
    this.hotspotsInstance && !this.isZoomed && !this.autoplay && this.hotspotsInstance.updateHotspotPosition(s, this.orientation), this.hotspotTimelineIndicator && this.orientation === Y.X && this.updateHotspotTimelinePosition(), this.drawImageOnCanvas(n, t, i, o);
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
  drawImageOnCanvas(t, i = 1, o = 0, s = 0) {
    this.pendingDrawData = { imageData: t, zoomScale: i, pointerX: o, pointerY: s }, this.drawFrameRequested || (this.drawFrameRequested = !0, requestAnimationFrame(() => {
      if (this.drawFrameRequested = !1, this.pendingDrawData) {
        const { imageData: n, zoomScale: l, pointerX: a, pointerY: r } = this.pendingDrawData;
        this.canvasWorker.postMessage({
          action: "drawImageOnCanvas",
          imageData: n,
          zoomScale: l,
          pointerX: a,
          pointerY: r
        });
      }
    }));
  }
  pushImageToSet(t, i, o) {
    o === Y.X ? this.imagesX[i] = t : this.imagesY[i] = t;
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
    if (this.addAllIcons(), this.isReady = !0, this.amountX = this.imagesX.length, this.amountY = this.imagesY.length, this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0, this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0, this.hotspots && (this.hotspotsInstance = new vn(this.hotspots, this.innerBox, this.imageAspectRatio, {
      trigger: this.hotspotTrigger,
      onOpen: onHotspotOpen,
      onClose: onHotspotClose
    }), this.hotspotsInstance.updateHotspotPosition(this.activeImageX, this.orientation), this.addHotspotTimeline(), this.showHotspotTimeline()), this.emit("onLoad", { imagesX: this.imagesX.length, imagesY: this.imagesY.length }), this.emit("onReady"), this.announce("360 degree view loaded. Use mouse drag or arrow keys to rotate."), this.hints !== !1 && !this.autoplay) {
      const t = this.hints === !0 || this.hints === void 0 ? Se(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = ke(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Te(this.hintsOverlay));
    }
    this.autoplay && (this.hideAllIcons(), jo(this.play.bind(this))());
  }
  magnify(t) {
    t.stopPropagation();
    const { src: i } = this.orientation === Y.Y ? this.imagesY[this.activeImageY] : this.imagesX[this.activeImageX], s = (this.fullscreenView ? document.body : this.container).offsetWidth * this.magnifier, n = Ui(i, s);
    this.showLoadingSpinner(), this.createGlass(), Ho(n, (r) => {
      this.hideLoadingSpinner(), this.magnified = !0, Xo(t, this.innerBox, this.offset, r, this.glass, this.magnifier);
    }, (r) => {
      this.hideLoadingSpinner(), this.removeGlass(), this.emit("onError", {
        error: { message: r.message, url: r.url },
        errorCount: 1,
        totalImages: 1,
        errors: [{ message: r.message, url: r.url }]
      });
    });
  }
  openFullscreenModal(t) {
    t.stopPropagation(), this.hideHotspotPopper(), this.releaseMemory(), window.document.body.style.overflow = "hidden";
    const i = uo(this.container);
    this.fullscreenInstance = new Vt(i, this.viewerConfig, !0), this.fullscreenInstance.originalViewer = this, this.boundResizeHandler = () => {
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
      Vo({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse,
        spinDirection: this.spinDirection
      }) && (this.spinDirection = zo(this.spinDirection));
      const n = this.spinDirection === "y";
      Wo({
        autoplayBehavior: this.autoplayBehavior,
        spinY: n,
        reversed: this.autoplayReverse,
        loopTriggers: i
      });
    }, t);
  }
  stopAutoplay() {
    if (this.showAllIcons(), this.autoplay = !1, window.clearTimeout(this.loopTimeoutId), this.loopTimeoutId = null, this.emit("onAutoplayStop"), this.hints !== !1 && !this.hintsOverlay && !this.hintsHidden) {
      const t = this.hints === !0 ? Se(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = ke(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Te(this.hintsOverlay));
    }
  }
  destroy() {
    this.stopAutoplay(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.removeEvents(), this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = [], this.imagesY = [], this.canvasWorker && (this.canvasWorker.terminate(), this.canvasWorker = null), this.hotspotsInstance && this.hotspotsInstance.destroy(), this.hintsOverlay && this.hintsOverlay.parentNode && (this.hintsOverlay.parentNode.removeChild(this.hintsOverlay), this.hintsOverlay = null), this.hotspotTimeline && this.hotspotTimeline.parentNode && (this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null), this.innerBox && this.innerBox.classList.remove("has-hotspot-timeline"), this.container && (this.container.classList.remove("ci360-theme-dark", "ci360-hotspot-marker-inverted", "ci360-hotspot-marker-brand"), this.container.style.removeProperty("--ci360-hotspot-brand-color"), this.container.innerHTML = "");
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
    this.initialIcon || this.hide360Logo || (this.initialIcon = oo(this.logoSrc), this.innerBox.appendChild(this.initialIcon));
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
  addMagnifierIcon() {
    this.pointerZoom && (this.magnifierIcon = lo(), this.magnifierIcon.onclick = this.zoomIn.bind(this), this.iconsContainer.appendChild(this.magnifierIcon), this.zoomOutIcon = co(), this.zoomOutIcon.onclick = this.zoomOut.bind(this), this.zoomOutIcon.style.display = "none", this.iconsContainer.appendChild(this.zoomOutIcon));
  }
  showMagnifierIcon() {
    this.magnifierIcon && (this.magnifierIcon.style.display = "", this.magnifierIcon.style.visibility = "visible", this.magnifierIcon.style.opacity = 1);
  }
  hideMagnifierIcon() {
    this.magnifierIcon && (this.magnifierIcon.style.display = "none", this.magnifierIcon.style.visibility = "hidden", this.magnifierIcon.style.opacity = 0);
  }
  showZoomOutIcon() {
    this.zoomOutIcon && (this.zoomOutIcon.style.display = "", this.zoomOutIcon.style.visibility = "visible", this.zoomOutIcon.style.opacity = 1);
  }
  hideZoomOutIcon() {
    this.zoomOutIcon && (this.zoomOutIcon.style.display = "none", this.zoomOutIcon.style.visibility = "hidden", this.zoomOutIcon.style.opacity = 0);
  }
  addFullscreenIcon() {
    this.fullscreen && (this.fullscreenIcon = ro(), this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenIcon));
  }
  addCloseFullscreenIcon() {
    this.fullscreenCloseIcon = no(), this.fullscreenCloseIcon.onclick = this.closeFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenCloseIcon);
  }
  showFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 1);
  }
  hideFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 0);
  }
  add360ViewCircleIcon() {
    this.view360CircleIcon || (this.view360CircleIcon = eo(this.bottomCircleOffset), this.innerBox.appendChild(this.view360CircleIcon));
  }
  show360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 1);
  }
  hide360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 0);
  }
  addLoadingSpinner() {
    this.loadingSpinner = po(), this.innerBox.appendChild(this.loadingSpinner);
  }
  showLoadingSpinner() {
    this.loadingSpinner && (this.hideAllIcons(), this.loadingSpinner.style.opacity = 1);
  }
  createTransitionOverlay() {
    this.transitionOverlay = mo(), this.innerBox.appendChild(this.transitionOverlay);
  }
  showTransitionOverlay() {
    this.transitionOverlay && (this.hideAllIcons(), this.transitionOverlay.style.opacity = 1);
  }
  hideTransitionOverlay() {
    this.transitionOverlay && (this.transitionOverlay.style.opacity = 0);
  }
  hideLoadingSpinner() {
    this.loadingSpinner && (this.loadingSpinner.style.opacity = 0);
  }
  hideHints() {
    !this.hintsOverlay || this.hintsHidden || (this.hintsHidden = !0, bo(this.hintsOverlay));
  }
  addHotspotTimeline() {
    if (!this.hotspots || this.hotspotTimeline) return;
    const t = Oo(this.innerBox, this.amountX, this.hotspots);
    if (!t) return;
    this.hotspotTimeline = t.element, this.hotspotTimelineIndicator = t.indicator, this.innerBox.classList.add("has-hotspot-timeline"), this.hotspotTimeline.querySelectorAll(".cloudimage-360-hotspot-timeline-dot").forEach((o) => {
      o.addEventListener("click", (s) => {
        s.stopPropagation(), this.hideAllIcons(), this.hideHints();
        const n = parseInt(o.getAttribute("data-frame"), 10), l = o.getAttribute("data-hotspot-id");
        isNaN(n) || this.animateToFrame(n, l);
      });
    }), this.updateHotspotTimelinePosition();
  }
  showHotspotTimeline() {
    Ao(this.hotspotTimeline);
  }
  hideHotspotTimeline() {
    ko(this.hotspotTimeline);
  }
  updateHotspotTimelinePosition() {
    Eo(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
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
    const o = this.activeImageX, s = (t - o + this.amountX) % this.amountX, n = (o - t + this.amountX) % this.amountX, l = s <= n, a = l ? s : n;
    if (a === 0) {
      this.isAnimatingToFrame = !1;
      return;
    }
    const r = 30;
    let h = a;
    const c = () => {
      if (h <= 0) {
        this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
          this.hotspotsInstance.showHotspotById(i);
        }, 50);
        return;
      }
      l ? this.moveRight() : this.moveLeft(), h--, h > 0 ? setTimeout(c, r) : (this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
        this.hotspotsInstance.showHotspotById(i);
      }, 50));
    };
    c();
  }
  remove360ViewCircleIcon() {
    this.view360CircleIcon && (this.innerBox.removeChild(this.view360CircleIcon), this.view360CircleIcon = null);
  }
  addAllIcons() {
    this.removeLoader(), this.iconsContainer && (this.innerBox.style.cursor = "grab", this.pointerZoom && (this.createTransitionOverlay(), this.addLoadingSpinner()), !this.fullscreenView && !this.touchDevice && this.addMagnifierIcon(), this.fullscreenView || this.addFullscreenIcon(), this.initialIconShown && this.addInitialIcon(), this.bottomCircle && this.add360ViewCircleIcon());
  }
  showAllIcons() {
    this.showInitialIcon(), this.show360ViewCircleIcon(), this.showMagnifierIcon(), this.showFullscreenIcon(), this.showHotspotTimeline();
  }
  hideAllIcons() {
    this.hideInitialIcon(), this.hide360ViewCircleIcon(), this.hideMagnifierIcon(), this.hideZoomOutIcon(), this.hideFullscreenIcon();
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
    this.boundMouseClick = this.mouseClick.bind(this), this.boundMouseDblClick = this.mouseDblClick.bind(this), this.boundMouseDown = this.mouseDown.bind(this), this.boundMouseMove = we(this.mouseMove.bind(this), Ce), this.boundMouseUp = this.mouseUp.bind(this), this.boundMouseLeave = this.mouseLeave.bind(this), this.innerBox.addEventListener("click", this.boundMouseClick), this.innerBox.addEventListener("dblclick", this.boundMouseDblClick), this.innerBox.addEventListener("mousedown", this.boundMouseDown), this.innerBox.addEventListener("mouseleave", this.boundMouseLeave), document.addEventListener("mousemove", this.boundMouseMove), document.addEventListener("mouseup", this.boundMouseUp);
  }
  addTouchEvents() {
    this.boundTouchOutside = this.touchOutside.bind(this), this.boundTouchStart = this.touchStart.bind(this), this.boundTouchEnd = this.touchEnd.bind(this), this.boundTouchMove = we(this.touchMove.bind(this), Ce), document.addEventListener("touchstart", this.boundTouchOutside), this.container.addEventListener("touchstart", this.boundTouchStart), this.container.addEventListener("touchend", this.boundTouchEnd), this.container.addEventListener("touchmove", this.boundTouchMove);
  }
  addKeyboardEvents() {
    this.boundKeyDown = this.keyDown.bind(this), this.boundKeyUp = this.keyUp.bind(this), document.addEventListener("keydown", this.boundKeyDown), document.addEventListener("keyup", this.boundKeyUp);
  }
  addEscKeyHandler() {
    this.boundEscHandler = (t) => {
      t.keyCode === 27 && (this.fullscreenView ? this.closeFullscreenModal(t) : this.isZoomed ? this.removeZoom() : this.glass && this.removeGlass());
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
    if (this.iconsContainer = Ee(this.innerBox), this.canvas = so(this.innerBox, t), this.loader = ho(this.innerBox), this.ariaLiveRegion = vo(this.innerBox), this.useMainThreadCanvas)
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
    this.fullscreenView && this.addCloseFullscreenIcon(), ie(this.innerBox, ".cloudimage-360-placeholder");
  }
  update(t) {
    this.isReady && (this.stopAutoplay(), ie(this.innerBox, ".cloudimage-360-icons-container"), this.init(this.container, t, !0), this.iconsContainer = Ee(this.innerBox), this.onAllImagesLoaded());
  }
  init(t, i, o) {
    const s = i ? zi(i) : Vi(t), {
      folder: n,
      apiVersion: l,
      filenameX: a,
      filenameY: r,
      imageListX: h,
      imageListY: c,
      indexZeroBase: u,
      amountX: f,
      amountY: p,
      draggable: C = !0,
      swipeable: b = !0,
      keys: v,
      keysReverse: O,
      bottomCircleOffset: E,
      autoplay: w,
      autoplayBehavior: y,
      playOnce: x,
      speed: m,
      autoplayReverse: g,
      fullscreen: I,
      magnifier: A,
      ciToken: k,
      ciFilters: T,
      ciTransformation: H,
      lazyload: L,
      dragSpeed: j,
      stopAtEdges: G,
      pointerZoom: P,
      pointerZoomTrigger: D = "dblclick",
      imageInfo: st = "black",
      initialIconShown: _,
      bottomCircle: nt,
      hotspots: ft,
      hotspotTrigger: tt = "hover",
      dragReverse: rt,
      hide360Logo: J,
      logoSrc: N,
      inertia: et,
      pinchZoom: at,
      hints: U,
      theme: lt,
      markerTheme: St,
      brandColor: ct,
      hotspotTimelineOnClick: zt = !0,
      aspectRatio: Tt,
      // Event callbacks
      onReady: $t,
      onLoad: jt,
      onSpin: Lt,
      onAutoplayStart: Pt,
      onAutoplayStop: Gt,
      onFullscreenOpen: _t,
      onFullscreenClose: K,
      onZoomIn: ht,
      onZoomOut: Mt,
      onDragStart: Yt,
      onDragEnd: vt,
      onHotspotOpen: Ut,
      onHotspotClose: Kt,
      onError: Ht
    } = s, gt = { ciToken: k, ciFilters: T, ciTransformation: H }, qt = oe(h, []), Jt = oe(c, []);
    if (this.viewerConfig = s, this.amountX = qt.length || f, this.amountY = Jt.length || p, this.allowSpinX = !!this.amountX, this.allowSpinY = !!this.amountY, this.activeImageX = g ? this.amountX - 1 : 0, this.activeImageY = g ? this.amountY - 1 : 0, this.bottomCircleOffset = E, this.autoplay = w, this.autoplayBehavior = y, this.playOnce = x, this.speed = m, this.autoplayReverse = g, this.fullscreen = I, this.magnifier = A > 1 ? Math.min(A, Fi) : 0, this.dragSpeed = Math.max(j, Wi), this.stopAtEdges = G, this.ciParams = gt, this.apiVersion = l, this.pointerZoom = P > 1 ? Math.min(P, xe) : null, this.pointerZoomTrigger = D, this.keysReverse = O, this.info = st, this.keys = v, this.innerBox = this.innerBox ?? ao(this.container), this.container.style.aspectRatio = Tt || "", this.initialIconShown = _, this.bottomCircle = nt, this.spinDirection = No(this.autoplayBehavior, this.allowSpinX, this.allowSpinY), this.dragReverse = rt, this.hotspots = ft, this.hotspotTrigger = tt, this.hide360Logo = J, this.logoSrc = N, this.inertia = et, this.pinchZoom = at, this.hints = U, this.hotspotTimelineOnClick = zt, lt === "dark" ? this.container.classList.add("ci360-theme-dark") : lt === "light" && this.container.classList.remove("ci360-theme-dark"), this.container.classList.remove("ci360-hotspot-marker-inverted", "ci360-hotspot-marker-brand"), St === "inverted" ? this.container.classList.add("ci360-hotspot-marker-inverted") : St === "brand" && (this.container.classList.add("ci360-hotspot-marker-brand"), ct && this.container.style.setProperty("--ci360-hotspot-brand-color", ct)), this.onReady = $t, this.onLoad = jt, this.onSpin = Lt, this.onAutoplayStart = Pt, this.onAutoplayStop = Gt, this.onFullscreenOpen = _t, this.onFullscreenClose = K, this.onZoomIn = ht, this.onZoomOut = Mt, this.onDragStart = Yt, this.onDragEnd = vt, this.onError = Ht, this.srcXConfig = {
      folder: n,
      filename: a,
      imageList: qt,
      container: t,
      innerBox: this.innerBox,
      apiVersion: l,
      ciParams: gt,
      lazyload: L,
      amount: this.amountX,
      indexZeroBase: u,
      autoplayReverse: g,
      orientation: Y.X
    }, this.srcYConfig = {
      ...this.srcXConfig,
      filename: r,
      imageList: Jt,
      orientation: Y.Y,
      amount: this.amountY
    }, o && this.removeEvents(), this.attachEvents(C, b, v), o) return;
    const pe = (this.fullscreenView ? document.body : this.container).offsetWidth, me = this.allowSpinX && !qt.length ? Ct(this.srcXConfig, pe) : null, fe = this.allowSpinY && !Jt.length ? Ct(this.srcYConfig, pe) : null, ve = (ci) => {
      Oe({
        cdnPathX: me,
        cdnPathY: fe,
        configX: this.srcXConfig,
        configY: this.srcYConfig,
        onImageLoad: (yt, hi, di) => this.onImageLoad(yt, hi, di),
        onFirstImageLoad: (yt) => this.onFirstImageLoaded(ci, yt),
        onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        onError: (yt) => this.emit("onError", yt)
      });
    };
    this.allowSpinX ? Pe(me, this.srcXConfig, ve) : this.allowSpinY && Pe(fe, this.srcYConfig, ve);
  }
}
const Ue = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class yn {
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
    const n = new Vt(t, i, o);
    return this.views.set(s, n), Ue && !this.memoryManagementAutoEnabled && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100)), n;
  }
  initAll(t = "cloudimage-360") {
    [...document.querySelectorAll(`.${t}`)].filter(Boolean).forEach((o) => {
      const s = o.id || this.generateId();
      o.id || (o.id = s);
      const n = new Vt(o);
      this.views.set(s, n);
    }), Ue && !this.memoryManagementAutoEnabled && this.views.size > 0 && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100));
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
            const l = n.getBoundingClientRect();
            l.top < window.innerHeight && l.bottom > 0 && o.reloadImages();
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
  yn as default
};
//# sourceMappingURL=ci360-DwbrNm7H.mjs.map
