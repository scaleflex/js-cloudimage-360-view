var li = Object.defineProperty;
var ci = (e, t, i) => t in e ? li(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var pe = (e, t, i) => ci(e, typeof t != "symbol" ? t + "" : t, i);
var Ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = "Expected a function", me = NaN, di = "[object Symbol]", ui = /^\s+|\s+$/g, pi = /^[-+]0x[0-9a-f]+$/i, mi = /^0b[01]+$/i, fi = /^0o[0-7]+$/i, vi = parseInt, gi = typeof Ht == "object" && Ht && Ht.Object === Object && Ht, yi = typeof self == "object" && self && self.Object === Object && self, bi = gi || yi || Function("return this")(), wi = Object.prototype, Ii = wi.toString, Ci = Math.max, xi = Math.min, qt = function() {
  return bi.Date.now();
};
function Oi(e, t, i) {
  var s, o, n, a, r, l, c = 0, h = !1, u = !1, f = !0;
  if (typeof e != "function")
    throw new TypeError(je);
  t = fe(t) || 0, Ft(i) && (h = !!i.leading, u = "maxWait" in i, n = u ? Ci(fe(i.maxWait) || 0, t) : n, f = "trailing" in i ? !!i.trailing : f);
  function p(m) {
    var g = s, C = o;
    return s = o = void 0, c = m, a = e.apply(C, g), a;
  }
  function I(m) {
    return c = m, r = setTimeout(O, t), h ? p(m) : a;
  }
  function b(m) {
    var g = m - l, C = m - c, A = t - g;
    return u ? xi(A, n - C) : A;
  }
  function v(m) {
    var g = m - l, C = m - c;
    return l === void 0 || g >= t || g < 0 || u && C >= n;
  }
  function O() {
    var m = qt();
    if (v(m))
      return E(m);
    r = setTimeout(O, b(m));
  }
  function E(m) {
    return r = void 0, f && s ? p(m) : (s = o = void 0, a);
  }
  function w() {
    r !== void 0 && clearTimeout(r), c = 0, s = l = o = r = void 0;
  }
  function y() {
    return r === void 0 ? a : E(qt());
  }
  function x() {
    var m = qt(), g = v(m);
    if (s = arguments, o = this, l = m, g) {
      if (r === void 0)
        return I(l);
      if (u)
        return r = setTimeout(O, t), p(l);
    }
    return r === void 0 && (r = setTimeout(O, t)), a;
  }
  return x.cancel = w, x.flush = y, x;
}
function Ei(e, t, i) {
  var s = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(je);
  return Ft(i) && (s = "leading" in i ? !!i.leading : s, o = "trailing" in i ? !!i.trailing : o), Oi(e, t, {
    leading: s,
    maxWait: t,
    trailing: o
  });
}
function Ft(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function Ai(e) {
  return !!e && typeof e == "object";
}
function Si(e) {
  return typeof e == "symbol" || Ai(e) && Ii.call(e) == di;
}
function fe(e) {
  if (typeof e == "number")
    return e;
  if (Si(e))
    return me;
  if (Ft(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Ft(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(ui, "");
  var i = mi.test(e);
  return i || fi.test(e) ? vi(e.slice(2), i ? 2 : 8) : pi.test(e) ? me : +e;
}
var Li = Ei;
const ve = /* @__PURE__ */ hi(Li), X = {
  SPIN_X: "spin-x",
  SPIN_Y: "spin-y",
  SPIN_XY: "spin-xy",
  SPIN_YX: "spin-yx"
}, Ti = [!1, 0, null, void 0, "false", "0", "null", "undefined"], Y = {
  X: "x-axis",
  Y: "y-axis"
}, ki = [37, 39], Mi = [38, 40], Pi = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), ge = Pi ? 32 : 10, Yi = 150, Zt = 800, Ri = 150, Xi = 200, ye = 50, Hi = 50, Zi = 5, be = 5, d = {
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
  folder: L(e, "folder", d.folder),
  apiVersion: L(e, "api-version", d.apiVersion),
  filenameX: L(e, "filename") || L(e, "filename-x") || d.filenameX,
  filenameY: L(e, "filename-y", d.filenameY),
  imageListX: L(e, "image-list-x", d.imageListX),
  imageListY: L(e, "image-list-y", d.imageListY),
  indexZeroBase: parseInt(L(e, "index-zero-base", d.indexZeroBase), 10),
  amountX: parseInt(L(e, "amount-x", d.amountX), 10),
  amountY: parseInt(L(e, "amount-y", d.amountY), 10),
  speed: parseInt(L(e, "speed", d.speed), 10),
  dragSpeed: parseInt(L(e, "drag-speed", d.dragSpeed), 10),
  draggable: P(e, "draggable", d.draggable),
  swipeable: P(e, "swipeable", d.swipeable),
  keys: P(e, "keys", d.keys),
  keysReverse: P(e, "keys-reverse", d.keysReverse),
  autoplay: P(e, "autoplay", d.autoplay),
  autoplayBehavior: L(e, "autoplay-behavior", d.autoplayBehavior),
  playOnce: P(e, "play-once", d.playOnce),
  autoplayReverse: P(e, "autoplay-reverse", d.autoplayReverse),
  pointerZoom: parseFloat(L(e, "pointer-zoom", d.pointerZoom)),
  pointerZoomTrigger: L(e, "pointer-zoom-trigger", d.pointerZoomTrigger),
  fullscreen: P(e, "fullscreen") || P(e, "full-screen", d.fullscreen),
  magnifier: parseFloat(L(e, "magnifier", d.magnifier)),
  bottomCircleOffset: parseInt(
    L(e, "bottom-circle-offset", d.bottomCircleOffset),
    10
  ),
  ciToken: L(e, "responsive", d.ciToken),
  ciFilters: L(e, "filters", d.ciFilters),
  ciTransformation: L(e, "transformation", d.ciTransformation),
  lazyload: P(e, "lazyload", d.lazyload),
  dragReverse: P(e, "drag-reverse", d.dragReverse),
  stopAtEdges: P(e, "stop-at-edges", d.stopAtEdges),
  imageInfo: P(e, "info", d.imageInfo),
  initialIconShown: !Dt(e, "initial-icon"),
  bottomCircle: !Dt(e, "bottom-circle"),
  hide360Logo: P(e, "hide-360-logo", d.hide360Logo),
  logoSrc: L(e, "logo-src", d.logoSrc),
  inertia: P(e, "inertia", d.inertia),
  pinchZoom: P(e, "pinch-zoom", d.pinchZoom),
  hints: !Dt(e, "hints"),
  theme: L(e, "theme", d.theme),
  hotspotTrigger: L(e, "hotspot-trigger", d.hotspotTrigger),
  hotspotTimelineOnClick: !Dt(e, "hotspot-timeline-on-click"),
  aspectRatio: L(e, "aspect-ratio", d.aspectRatio)
}), Bi = (e) => {
  const t = [];
  e.amountX !== void 0 && e.amountX < 0 && t.push("amountX should be a positive number"), e.amountY !== void 0 && e.amountY < 0 && t.push("amountY should be a positive number"), e.speed !== void 0 && e.speed <= 0 && t.push("speed should be a positive number"), e.dragSpeed !== void 0 && e.dragSpeed <= 0 && t.push("dragSpeed should be a positive number"), e.pointerZoom !== void 0 && e.pointerZoom !== 0 && (e.pointerZoom < 1 || e.pointerZoom > 5) && t.push("pointerZoom should be between 1 and 5 (or 0 to disable)"), e.magnifier !== void 0 && e.magnifier !== null && e.magnifier !== 0 && (e.magnifier < 1 || e.magnifier > 5) && t.push("magnifier should be between 1 and 5 (or 0/null to disable)"), !e.folder && !e.imageListX && !e.imageListY && t.push("Either folder or imageListX/imageListY is required"), e.folder && !e.amountX && !e.imageListX && t.push("amountX is required when using folder (unless imageListX is provided)");
  const i = ["spin-x", "spin-y", "spin-xy", "spin-yx"];
  return e.autoplayBehavior && !i.includes(e.autoplayBehavior) && t.push(`autoplayBehavior should be one of: ${i.join(", ")}`), t.forEach((s) => {
    console.warn(`CloudImage 360: ${s}`);
  }), t.length === 0;
}, Wi = (e) => (Bi(e), {
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
}), L = (e, t, i) => e.getAttribute(t) || e.getAttribute(`data-${t}`) || i, P = (e, t, i) => {
  if (!(e.hasAttribute(t) || e.hasAttribute(`data-${t}`))) return i;
  const o = L(e, t, null);
  return o !== "false" && o !== "0";
}, Dt = (e, t) => L(e, t, null) === "false", Fi = (e = 1) => {
  const t = Math.round(window.devicePixelRatio || 1);
  return parseInt(e) * t;
}, Vi = (e, t, i) => new URL(e).origin.includes("cloudimg") ? e : `https://${t}.cloudimg.io/${i}${e}`, Ni = ({ ciTransformation: e, responsiveWidth: t, ciFilters: i }) => {
  const s = `width=${t}`, o = e || s, n = i ? `&f=${i}` : "";
  return `${o}${n}`;
}, Ot = (e, t) => {
  const { folder: i, apiVersion: s, filename: o = "", ciParams: n } = e, { ciToken: a, ciFilters: r, ciTransformation: l } = n || {}, c = `${i}${o}`;
  if (!a || !t) return c;
  const h = Ti.includes(s) ? null : s, u = h ? `${h}/` : "", f = Fi(t), p = Vi(c, a, u), I = Ni({
    ciTransformation: l,
    responsiveWidth: f,
    ciFilters: r
  });
  return `${p}${I ? "?" : ""}${I}`;
}, zi = (e, t, i) => {
  const [s, o] = e.split("?"), n = `${t}=${encodeURIComponent(i)}`;
  if (!o)
    return `${s}?${n}`;
  const a = new URLSearchParams(o);
  return a.set(t, i), `${s}?${a.toString()}`;
}, $i = (e, t) => zi(e, "width", t), Ge = (e, t = 0) => (e += "", e.length >= t ? e : new Array(t - e.length + 1).join("0") + e), ji = (e, { amount: t = 0, indexZeroBase: i = 0 } = {}) => Array.from({ length: t }, (s, o) => e.replace("{index}", Ge(o + 1, i))), Gi = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), _i = Gi ? 3 : 6, Ui = ({
  imagesUrls: e,
  onFirstImageLoad: t,
  onImageLoad: i,
  onAllImagesLoad: s,
  onError: o,
  autoplayReverse: n
}) => {
  let a = 0, r = 0;
  const l = e.length, c = [], h = [];
  let u = 0, f = 0;
  const p = [], I = (m, g, C = !1) => {
    const A = {
      message: `Failed to load image: ${m}`,
      url: m,
      index: g,
      isFirstImage: C
    };
    h.push(A), r++, o == null || o({
      error: A,
      errorCount: r,
      totalImages: l,
      errors: h
    });
  }, b = () => {
    a === l && (s == null || s(c, { errorCount: r, errors: h }));
  }, v = () => {
    for (; u < _i && f < p.length; ) {
      const m = p[f];
      f++, O(e[m], m);
    }
  }, O = (m, g) => {
    u++;
    const C = new Image();
    C.crossOrigin = "anonymous", C.src = m, C.onload = async () => {
      try {
        const A = await createImageBitmap(C), S = {
          src: m,
          bitmapImage: A,
          naturalWidth: C.naturalWidth,
          naturalHeight: C.naturalHeight
        };
        C.onload = null, C.onerror = null, C.src = "", a++, u--, c[g] = S, i == null || i(S, g), b(), v();
      } catch {
        C.onload = null, C.onerror = null, C.src = "", a++, u--, I(m, g), b(), v();
      }
    }, C.onerror = () => {
      C.onload = null, C.onerror = null, C.src = "", a++, u--, I(m, g), b(), v();
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
      w.onload = null, w.onerror = null, w.src = "", c[y] = g, a++, t == null || t(g), i == null || i(g, y), l === 1 ? b() : E(y);
    } catch {
      w.onload = null, w.onerror = null, w.src = "", a++, I(x, y, !0), l === 1 ? b() : E(y);
    }
  }, w.onerror = () => {
    w.onload = null, w.onerror = null, w.src = "", a++, I(x, y, !0), l === 1 ? b() : E(y);
  };
}, we = ({
  cdnPathX: e,
  cdnPathY: t,
  configX: i,
  configY: s,
  onFirstImageLoad: o,
  onImageLoad: n,
  onAllImagesLoad: a,
  onError: r
}) => {
  let l = { x: !1, y: !1 }, c = [], h = [], u = { errorCount: 0, errors: [] }, f = { errorCount: 0, errors: [] };
  const p = e || i.imageList.length, I = t || s.imageList.length, b = () => {
    if (l.x && l.y) {
      const O = {
        errorCount: u.errorCount + f.errorCount,
        errors: [...u.errors, ...f.errors]
      };
      a == null || a(c, h, O);
    }
  }, v = ({ cdnPath: O, config: E, orientation: w, loadedImages: y, loadStats: x, onFirstImageLoad: m }) => {
    const g = w === Y.X, C = E.imageList.length ? E.imageList : ji(O, E);
    Ui({
      imagesUrls: C,
      onFirstImageLoad: m,
      onImageLoad: (A, S) => {
        n == null || n(A, S, w), y[S] = A;
      },
      onError: (A) => {
        r == null || r({ ...A, orientation: w });
      },
      onAllImagesLoad: (A, S) => {
        y.length = 0, A.forEach((T, R) => {
          T && (y[R] = T);
        }), x.errorCount = S.errorCount, x.errors = S.errors.map((T) => ({ ...T, orientation: w })), l[g ? "x" : "y"] = !0, b();
      },
      autoplayReverse: E.autoplayReverse
    });
  };
  p ? v({
    cdnPath: e,
    config: i,
    orientation: Y.X,
    loadedImages: c,
    loadStats: u,
    onFirstImageLoad: o
  }) : l.x = !0, I ? v({
    cdnPath: t,
    config: s,
    orientation: Y.Y,
    loadedImages: h,
    loadStats: f,
    onFirstImageLoad: p ? void 0 : o
  }) : l.y = !0, !p && !I && b();
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
}, ts = (e, t) => {
  const { width: i, height: s } = t, o = document.createElement("canvas");
  return o.width = i, o.height = s, o.style.width = "100%", o.style.height = "auto", e.appendChild(o), o;
}, es = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-close-icon", e.setAttribute("aria-label", "Close fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', e;
}, is = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-fullscreen-button", e.setAttribute("aria-label", "View fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>', e;
}, Ie = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-icons-container", e.appendChild(t), t;
}, ss = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-inner-box", t.setAttribute("role", "img"), t.setAttribute("aria-label", "360 degree product view. Use mouse drag or arrow keys to rotate."), e.appendChild(t), t;
}, os = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-magnifier-button", e.setAttribute("aria-label", "Magnify image"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>', e;
}, ns = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-zoom-out-button", e.setAttribute("aria-label", "Zoom out"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>', e;
}, rs = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-loader";
  const i = document.createElement("span");
  return i.className = "percentage", i.innerText = "0%", t.appendChild(i), e.appendChild(t), t;
}, as = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-fullscreen-modal";
  const i = e.cloneNode();
  return i.style.width = "100%", i.style.maxWidth = "100%", i.style.height = "100vh", i.style.maxHeight = "100%", t.appendChild(i), window.document.body.appendChild(t), i;
}, te = (e, t) => {
  const i = e.querySelector(t);
  i && i.parentNode.removeChild(i);
}, ls = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-loading-spinner", e;
}, cs = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-360-transition-overlay", e;
}, hs = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-hotspot-container", e.appendChild(t), t;
}, ds = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-sr-only", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"), t.setAttribute("aria-atomic", "true"), e.appendChild(t), t;
}, us = (e, t) => {
  e && (e.textContent = "", setTimeout(() => {
    e.textContent = t;
  }, 50));
}, _e = {
  drag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  swipe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h8"/></svg>',
  click: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>',
  pinch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l4 4"/><path d="M18 6l-4 4"/><path d="M6 18l4-4"/><path d="M18 18l-4-4"/><circle cx="12" cy="12" r="2"/></svg>',
  keys: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m9 10 3 3 3-3"/></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
}, Ce = {
  drag: "Drag to rotate",
  swipe: "Swipe to rotate",
  click: "Click to zoom",
  dblclick: "Double-click to zoom",
  pinch: "Pinch to zoom",
  keys: "Use arrow keys",
  fullscreen: "Click for fullscreen"
}, ps = (e, t = {}) => {
  const i = document.createElement("div");
  i.className = "cloudimage-360-hint-item";
  let s = Ce[e];
  return e === "click" && t.pointerZoomTrigger === "dblclick" && (s = Ce.dblclick), i.innerHTML = `
    ${_e[e]}
    <span>${s}</span>
  `, i;
}, xe = (e, t = [], i = {}) => {
  if (!t || t.length === 0) return null;
  const s = document.createElement("div");
  s.className = "cloudimage-360-hints-overlay", s.setAttribute("role", "tooltip"), s.setAttribute("aria-label", "Interaction hints");
  const o = document.createElement("div");
  return o.className = "cloudimage-360-hints-container", t.forEach((n) => {
    _e[n] && o.appendChild(ps(n, i));
  }), s.appendChild(o), e.appendChild(s), s;
}, Oe = (e, t) => t ? ["swipe", "pinch"] : ["drag", "click"], Ee = (e) => {
  e && e.classList.add("visible");
}, ms = (e) => {
  e && (e.classList.remove("visible"), e.classList.add("hiding"), setTimeout(() => {
    e.classList.remove("hiding");
  }, 300));
}, fs = (e) => {
  if (!e || typeof e != "object") return null;
  const t = Object.keys(e).map((s) => parseInt(s, 10)).filter((s) => !isNaN(s)).sort((s, o) => s - o);
  if (t.length === 0) return null;
  const i = Math.floor(t.length / 2);
  return t[i];
}, vs = (e) => {
  const t = [];
  return !e || !Array.isArray(e) || e.forEach((i, s) => {
    const o = fs(i.positions);
    o !== null && t.push({
      id: i.id || `hotspot-${s}`,
      frame: o,
      label: i.label || null
    });
  }), t;
}, gs = 400, ys = (e, t, i, s) => {
  const o = document.createElement("button");
  o.className = "cloudimage-360-hotspot-timeline-dot", o.setAttribute("type", "button"), o.setAttribute("aria-label", s || `Go to hotspot at frame ${t + 1}`), o.setAttribute("data-frame", t.toString()), o.setAttribute("data-hotspot-id", e);
  const n = i > 1 ? t / (i - 1) * 100 : 0;
  if (o.style.left = `${n}%`, s) {
    const a = document.createElement("span");
    a.className = "cloudimage-360-hotspot-timeline-tooltip", a.textContent = s, o.appendChild(a);
    let r = null;
    o.addEventListener("mouseenter", () => {
      r = setTimeout(() => {
        a.classList.add("visible");
      }, gs);
    }), o.addEventListener("mouseleave", () => {
      r && (clearTimeout(r), r = null), a.classList.remove("visible");
    }), o.addEventListener("click", () => {
      r && (clearTimeout(r), r = null), a.classList.remove("visible");
    });
  }
  return o;
}, bs = (e, t, i) => {
  const s = vs(i);
  if (s.length === 0) return null;
  const o = document.createElement("div");
  o.className = "cloudimage-360-hotspot-timeline", o.setAttribute("role", "navigation"), o.setAttribute("aria-label", "Hotspot timeline navigation");
  const n = document.createElement("div");
  n.className = "cloudimage-360-hotspot-timeline-track";
  const a = document.createElement("div");
  return a.className = "cloudimage-360-hotspot-timeline-indicator", s.forEach(({ id: r, frame: l, label: c }) => {
    const h = ys(r, l, t, c);
    n.appendChild(h);
  }), n.appendChild(a), o.appendChild(n), e.appendChild(o), {
    element: o,
    indicator: a,
    hotspotFrames: s
  };
}, ws = (e, t, i) => {
  if (!e) return;
  const s = i > 1 ? t / (i - 1) * 100 : 0;
  e.style.left = `${s}%`;
}, Is = (e) => {
  e && e.classList.add("visible");
}, Cs = (e) => {
  e && e.classList.remove("visible");
}, ee = (e, t = []) => {
  if (!e) return t;
  if (Array.isArray(e)) return e;
  try {
    return JSON.parse(e);
  } catch (i) {
    return console.warn("CloudImage 360: Failed to parse JSON:", i.message), t;
  }
}, xs = (e, t) => {
  const [i, s] = e.split("?");
  if (!s) return e;
  const o = new RegExp(`^${t}=|&${t}=`), n = s.split("&").filter((a) => !o.test(a)).join("&");
  return n ? `${i}?${n}` : i;
}, Os = (e) => {
  const t = xs(e, "width"), i = t.includes("?") ? "&" : "?";
  return `${t}${i}width=${150 * devicePixelRatio}`;
}, Es = (e) => {
  const t = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  }, i = (o) => {
    const n = o.getAttribute("data-src");
    n && (o.src = n);
  };
  new IntersectionObserver((o, n) => {
    o.forEach((a) => {
      a.isIntersecting && (i(a.target), n.unobserve(a.target));
    });
  }, t).observe(e);
}, As = (e, t) => {
  const i = Ge(1, t);
  return e.replace("{index}", i);
}, Ss = (e, t) => {
  const [i] = e, s = /(https?):\/\//i.test(i);
  return Ot({
    ...t,
    folder: s ? "" : t.folder,
    filename: i
  });
}, Ls = (e, t) => {
  const { imageList: i, indexZeroBase: s } = t;
  if (i.length) {
    const o = ee(i, null);
    if (o)
      return Ss(o, t);
  }
  return As(e, s);
}, Ae = (e, t, i) => {
  const s = new Image();
  return s.setAttribute(t ? "data-src" : "src", e), s.className = i, s.style.cssText = `
    position: ${t ? "absolute" : "static"};
    width: 100%;
    inset: 0;
    height: 100%;
    object-fit: contain;
    object-position: center;
    filter: blur(10px);
  `, s;
}, Se = (e, t, i) => {
  const { innerBox: s, imageList: o, lazyload: n } = t || {}, [a] = o, r = a || Ls(e, t), l = Os(r), c = Ae(l, n, "cloudimage-lazy"), h = Ae(l, !1, "cloudimage-360-placeholder"), u = (f) => {
    te(s, ".cloudimage-lazy"), i && i({
      event: f,
      width: c.width,
      height: c.height,
      naturalWidth: c.naturalWidth,
      naturalHeight: c.naturalHeight,
      src: l
    });
  };
  c.onload = u, s.appendChild(c), s.appendChild(h), Es(c);
}, Ts = (e, t, i) => {
  const s = new Image();
  s.src = e, s.onload = (o) => {
    t && t({
      event: o,
      width: s.width,
      height: s.height,
      naturalWidth: s.naturalWidth,
      naturalHeight: s.naturalHeight,
      src: e
    });
  }, s.onerror = (o) => {
    const n = new Error(`Failed to load image: ${e}`);
    n.url = e, n.event = o, i ? i(n) : console.error(n.message);
  };
}, ks = (e, t) => {
  const i = t.getBoundingClientRect(), s = e.touches ? e.touches[0].clientX : e.clientX, o = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: s - i.left,
    y: o - i.top
  };
}, Jt = (e, t, i) => {
  const { container: s, w: o, h: n, zoom: a, bw: r, offsetX: l, offsetY: c } = t, h = ks(e, s);
  let u = h.x, f = h.y;
  u = Math.max(o / a, Math.min(u, s.offsetWidth - o / a)), f = Math.max(n / a, Math.min(f, s.offsetHeight - n / a)), i.style.left = `${u - o}px`, i.style.top = `${f - n}px`;
  const p = (u - l) * a - o + r, I = (f - c) * a - n + r;
  i.style.backgroundPosition = `-${p}px -${I}px`;
}, Ms = (e, t, i, s, o, n) => {
  const { x: a = 0, y: r = 0 } = i || {}, l = (t.offsetWidth - a * 2) * n, c = (t.offsetHeight - r * 2) * n;
  if (!o) return;
  o.setAttribute("class", "cloudimage-360-img-magnifier-glass"), t.prepend(o), o.style.backgroundImage = `url('${s.src}')`, o.style.backgroundSize = `${l}px ${c}px`;
  const h = 3, u = o.offsetWidth / 2, f = o.offsetHeight / 2, p = {
    container: t,
    w: u,
    h: f,
    zoom: n,
    bw: h,
    offsetX: a,
    offsetY: r
  };
  Jt(e, p, o);
  const I = (v) => {
    Jt(v, p, o);
  }, b = (v) => {
    v.preventDefault(), Jt(v, p, o);
  };
  o.addEventListener("mousemove", I), t.addEventListener("mousemove", I), t.addEventListener("touchmove", b);
}, Ps = (e, t, i) => {
  const { clientX: s, clientY: o } = e, n = t.getBoundingClientRect(), a = t.width / (n.width * i), r = t.height / (n.height * i), l = (s - n.left) * a, c = (o - n.top) * r;
  return { offsetX: l, offsetY: c };
}, Ys = (e, t, i) => {
  const s = e / i, o = t / i;
  return { zoomedWidth: s, zoomedHeight: o };
}, Rs = ({
  pointerX: e,
  pointerY: t,
  imageData: i,
  zoomedWidth: s,
  zoomedHeight: o,
  drawWidth: n,
  drawHeight: a
}) => {
  const { naturalWidth: r, naturalHeight: l } = i;
  let c = e / n * r - s / 2, h = t / a * l - o / 2;
  const u = Math.max(0, r - s), f = Math.max(0, l - o);
  return c = Math.max(0, Math.min(c, u)), h = Math.max(0, Math.min(h, f)), { zoomOffsetX: c, zoomOffsetY: h };
}, Le = (e, { bottom: t, top: i }) => {
  e ? t() : i();
}, Te = (e, { left: t, right: i }) => {
  e ? t() : i();
}, Xs = ({ autoplayBehavior: e, spinY: t, reversed: i, loopTriggers: s }) => {
  switch (e) {
    case X.SPIN_XY:
    case X.SPIN_YX:
      t ? Le(i, s) : Te(i, s);
      break;
    case X.SPIN_Y:
      Le(i, s);
      break;
    case X.SPIN_X:
    default:
      Te(i, s);
  }
}, Hs = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: s,
  amountY: o,
  autoplayReverse: n
}) => {
  const a = (r, l) => {
    const c = l - 1;
    return n ? r === 0 : r === c;
  };
  switch (e) {
    case X.SPIN_XY:
    case X.SPIN_Y:
      return a(i, o);
    case X.SPIN_X:
    case X.SPIN_YX:
    default:
      return a(t, s);
  }
}, Zs = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: s,
  amountY: o,
  autoplayReverse: n,
  spinDirection: a
}) => {
  const r = t === (n ? 0 : s - 1), l = i === (n ? 0 : o - 1);
  return e === X.SPIN_XY || e === X.SPIN_YX ? a === "x" && r || a === "y" && l : !1;
}, Ds = (e, t, i) => {
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
}, Bs = (e) => e === "x" ? "y" : "x", ke = (e, t) => {
  const i = [...ki];
  return t ? [...i, ...Mi].includes(e) : i.includes(e);
}, Me = ({ deltaX: e, deltaY: t, reversed: i, allowSpinX: s, allowSpinY: o, threshold: n = 0 }) => {
  const a = s && !o || o && !s ? 0 : n, r = Math.abs(e), l = Math.abs(t);
  return s && r - a > l ? i ? e > 0 ? "left" : "right" : e > 0 ? "right" : "left" : o && l - a > r ? i ? t > 0 ? "up" : "down" : t > 0 ? "down" : "up" : null;
}, Ws = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, Fs = (e, t = 150) => {
  let i;
  return function(...s) {
    clearTimeout(i), i = setTimeout(() => {
      e.apply(this, s);
    }, t);
  };
}, Ue = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHY9KHQsYSxlKT0+e2NvbnN0IHM9dC9lLG49YS9lO3JldHVybnt6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpufX0sej0oe3BvaW50ZXJYOnQscG9pbnRlclk6YSxpbWFnZURhdGE6ZSx6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpuLGRyYXdXaWR0aDppLGRyYXdIZWlnaHQ6Y30pPT57Y29uc3R7bmF0dXJhbFdpZHRoOmcsbmF0dXJhbEhlaWdodDp1fT1lO2xldCBmPXQvaSpnLXMvMixtPWEvYyp1LW4vMjtjb25zdCB4PU1hdGgubWF4KDAsZy1zKSxPPU1hdGgubWF4KDAsdS1uKTtyZXR1cm4gZj1NYXRoLm1heCgwLE1hdGgubWluKGYseCkpLG09TWF0aC5tYXgoMCxNYXRoLm1pbihtLE8pKSx7em9vbU9mZnNldFg6Zix6b29tT2Zmc2V0WTptfX07bGV0IG8saCxyLGQsbCx3O3NlbGYub25tZXNzYWdlPWFzeW5jIHQ9Pntjb25zdHthY3Rpb246YSxvZmZzY3JlZW46ZSxkZXZpY2VQaXhlbFJhdGlvOnMsaW1hZ2VEYXRhOm4sem9vbVNjYWxlOmkscG9pbnRlclg6Yyxwb2ludGVyWTpnLGltYWdlQXNwZWN0UmF0aW86dSxjb250YWluZXJXaWR0aDpmLGNvbnRhaW5lckhlaWdodDptfT10LmRhdGE7c3dpdGNoKGEpe2Nhc2UiaW5pdENhbnZhcyI6QyhlLHMpO2JyZWFrO2Nhc2UiYWRhcHRDYW52YXNTaXplIjpwKHUsZixtKTticmVhaztjYXNlImRyYXdJbWFnZU9uQ2FudmFzIjpJKG4saSxjLGcpO2JyZWFrfX07Y29uc3QgQz0odCxhKT0+e289dCxoPW8uZ2V0Q29udGV4dCgiMmQiKSxyPWF9LHA9KHQsYSxlKT0+e2NvbnN0IHM9YS9lO3c9dD5zLG8ud2lkdGg9YSpyLG8uaGVpZ2h0PWUqcixoLnNjYWxlKHIsciksdz8oZD1hLGw9YS90KToobD1lLGQ9ZSp0KSxoLmltYWdlU21vb3RoaW5nRW5hYmxlZD0hMCxoLmltYWdlU21vb3RoaW5nUXVhbGl0eT0iaGlnaCJ9LEk9KHQ9e30sYT0xLGU9MCxzPTApPT57Y29uc3R7Yml0bWFwSW1hZ2U6bn09dDtpZighb3x8IW4pcmV0dXJuO2xldCBpLGM7aWYodz8oaT0wLGM9KG8uaGVpZ2h0L3ItbCkvMik6KGk9KG8ud2lkdGgvci1kKS8yLGM9MCksaC5jbGVhclJlY3QoMCwwLG8ud2lkdGgsby5oZWlnaHQpLGEhPT0xKXtjb25zdHtuYXR1cmFsV2lkdGg6ZyxuYXR1cmFsSGVpZ2h0OnV9PXQse3pvb21lZFdpZHRoOmYsem9vbWVkSGVpZ2h0Om19PXYoZyx1LGEpLHt6b29tT2Zmc2V0WDp4LHpvb21PZmZzZXRZOk99PXooe3BvaW50ZXJYOmUscG9pbnRlclk6cyxpbWFnZURhdGE6dCx6b29tZWRXaWR0aDpmLHpvb21lZEhlaWdodDptLGRyYXdXaWR0aDpkLGRyYXdIZWlnaHQ6bH0pO2guZHJhd0ltYWdlKG4seCxPLGYsbSxpLGMsZCxsKX1lbHNlIGguZHJhd0ltYWdlKG4saSxjLGQsbCl9fSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FudmFzLndvcmtlci1DZzBma3BEMS5qcy5tYXAK", Vs = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0)), Pe = typeof self < "u" && self.Blob && new Blob([Vs(Ue)], { type: "text/javascript;charset=utf-8" });
function Ns(e) {
  let t;
  try {
    if (t = Pe && (self.URL || self.webkitURL).createObjectURL(Pe), !t) throw "";
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
class zs {
  constructor() {
    this.canvas = null, this.ctx = null, this.dpr = 1, this.drawWidth = 0, this.drawHeight = 0, this.wideImage = !1;
  }
  /**
   * Mimics worker.postMessage() interface
   */
  postMessage(t) {
    const {
      action: i,
      offscreen: s,
      // Will be a regular canvas on main thread
      devicePixelRatio: o,
      imageData: n,
      zoomScale: a,
      pointerX: r,
      pointerY: l,
      imageAspectRatio: c,
      containerWidth: h,
      containerHeight: u
    } = t;
    switch (i) {
      case "initCanvas":
        this.initCanvas(s, o);
        break;
      case "adaptCanvasSize":
        this.adaptCanvasSize(c, h, u);
        break;
      case "drawImageOnCanvas":
        this.drawImageOnCanvas(n, a, r, l);
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
  adaptCanvasSize(t, i, s) {
    if (!this.canvas || !this.ctx) return;
    const o = i / s;
    this.wideImage = t > o, this.canvas.width = i * this.dpr, this.canvas.height = s * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.wideImage ? (this.drawWidth = i, this.drawHeight = i / t) : (this.drawHeight = s, this.drawWidth = s * t), this.ctx.imageSmoothingEnabled = !0, this.ctx.imageSmoothingQuality = "high";
  }
  drawImageOnCanvas(t = {}, i = 1, s = 0, o = 0) {
    const { bitmapImage: n } = t;
    if (!this.canvas || !this.ctx || !n) return;
    let a, r;
    if (this.wideImage ? (a = 0, r = (this.canvas.height / this.dpr - this.drawHeight) / 2) : (a = (this.canvas.width / this.dpr - this.drawWidth) / 2, r = 0), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), i !== 1) {
      const { naturalWidth: l, naturalHeight: c } = t, { zoomedWidth: h, zoomedHeight: u } = Ys(l, c, i), { zoomOffsetX: f, zoomOffsetY: p } = Rs({
        pointerX: s,
        pointerY: o,
        imageData: t,
        zoomedWidth: h,
        zoomedHeight: u,
        drawWidth: this.drawWidth,
        drawHeight: this.drawHeight
      });
      this.ctx.drawImage(
        n,
        f,
        p,
        h,
        u,
        a,
        r,
        this.drawWidth,
        this.drawHeight
      );
    } else
      this.ctx.drawImage(n, a, r, this.drawWidth, this.drawHeight);
  }
}
const $s = /* @__PURE__ */ new Set([
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
]), Ye = {
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
}, js = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi
], Gs = (e) => {
  if (typeof e != "string")
    return "";
  const t = document.createElement("template");
  t.innerHTML = e;
  const i = (s) => {
    if (Array.from(s.childNodes).forEach(i), s.nodeType === Node.ELEMENT_NODE) {
      const n = s.tagName.toLowerCase();
      if (!$s.has(n)) {
        if (n === "script" || n === "style") {
          s.remove();
          return;
        }
        const l = document.createTextNode(s.textContent);
        s.parentNode.replaceChild(l, s);
        return;
      }
      const a = [
        ...Ye[n] || [],
        ...Ye["*"] || []
      ];
      if (Array.from(s.attributes).forEach((l) => {
        const c = l.name.toLowerCase();
        if (c.startsWith("on")) {
          s.removeAttribute(l.name);
          return;
        }
        if (!a.includes(c)) {
          s.removeAttribute(l.name);
          return;
        }
        let h = l.value;
        js.forEach((u) => {
          u.test(h) && s.removeAttribute(l.name);
        });
      }), n === "a") {
        const l = s.getAttribute("href");
        l && (/^(https?:|mailto:|tel:|#|\/)/i.test(l.trim()) || s.removeAttribute("href")), s.getAttribute("target") === "_blank" && s.setAttribute("rel", "noopener noreferrer");
      }
      if (n === "img") {
        const l = s.getAttribute("src");
        l && (/^(https?:|\/|data:image\/)/i.test(l.trim()) || s.removeAttribute("src"));
      }
    }
  };
  return i(t.content), t.innerHTML;
}, _s = (e) => e === "x" ? Y.X : Y.Y, Us = (e, t, i) => e.filter(
  (s) => _s(s.orientation) === i && t in s.positions
), Ks = (e, t) => {
  const i = document.createElement("button");
  return i.id = e, i.className = "cloudimage-360-hotspot", i.dataset.hotspotId = e, i.setAttribute("type", "button"), i.setAttribute("aria-label", t || `Hotspot ${e}`), i.setAttribute("aria-haspopup", "true"), i.setAttribute("aria-expanded", "false"), i;
}, qs = (e) => {
  const t = Object.entries(e).sort(([n], [a]) => Number(n) - Number(a));
  let i = null, s = null;
  const o = {};
  for (const [n, a] of t)
    if (!a)
      o[n] = { x: i, y: s };
    else {
      const { x: r, y: l } = a;
      r != null && (i = r), l != null && (s = l), o[n] = {
        x: r || i,
        y: l || s
      };
    }
  return o;
}, Js = (e) => ({
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
}), Qs = (e, t) => {
  const i = document.createElement("div");
  return i.className = "cloudimage-360-popper", i.id = `cloudimage-360-popper-${t}`, i.dataset.popperId = t, i.setAttribute("role", "tooltip"), i.setAttribute("aria-hidden", "false"), typeof e == "string" && /<\/?[a-z][\s\S]*>/i.test(e) ? i.innerHTML = Gs(e) : i.textContent = e, document.body.appendChild(i), i;
}, to = (e) => {
  const t = [...e];
  return t.forEach((i, s) => {
    const o = { ...qs(i.positions) };
    t[s].initialPositions = o, t[s].positions = o;
  }), t;
}, eo = ({
  newWidth: e,
  newHeight: t,
  initialContainerSize: i,
  imageAspectRatio: s,
  hotspotsConfig: o
}) => {
  const [n, a] = i;
  let r = e, l = t, c = 0, h = 0;
  const u = e / t;
  s > u ? (l = e / s, h = (t - l) / 2) : (r = t * s, c = (e - r) / 2);
  const p = r / n, I = l / a;
  return o.map((b) => {
    const v = {};
    return Object.entries(b.initialPositions).forEach(([O, E]) => {
      v[O] = {
        x: E.x * p + c,
        y: E.y * I + h
      };
    }), { ...b, positions: v };
  });
};
function io(e) {
  const t = [];
  e.image && t.push(
    `<div class="ci360-popper-image-wrapper"><img class="ci360-popper-image" src="${Qt(e.image)}" alt="${Qt(e.title || "")}"></div>`
  );
  const i = [];
  if (e.title && i.push(`<h3 class="ci360-popper-title">${Ct(e.title)}</h3>`), e.originalPrice || e.price) {
    let s = "";
    e.originalPrice && (s += `<span class="ci360-popper-original-price">${Ct(e.originalPrice)}</span>`), e.price && (s += `<span class="ci360-popper-price">${Ct(e.price)}</span>`), i.push(`<div class="ci360-popper-price-row">${s}</div>`);
  }
  if (e.description && i.push(`<p class="ci360-popper-description">${Ct(e.description)}</p>`), e.url && so(e.url)) {
    const s = e.ctaText || "View details";
    i.push(
      `<a class="ci360-popper-cta" href="${Qt(e.url)}">${Ct(String(s))}</a>`
    );
  }
  return i.length > 0 && t.push(`<div class="ci360-popper-body">${i.join("")}</div>`), t.join("");
}
function Re(e) {
  return e.content ? e.content : e.data ? io(e.data) : "";
}
function Ct(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Qt(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function so(e) {
  const t = e.replace(/[\s\x00-\x1f]/g, "");
  return /^https?:\/\//i.test(t) || /^\/(?!\/)/.test(t) || /^#/.test(t);
}
var H = "top", F = "bottom", V = "right", Z = "left", oe = "auto", Tt = [H, F, V, Z], mt = "start", St = "end", oo = "clippingParents", Ke = "viewport", xt = "popper", no = "reference", Xe = /* @__PURE__ */ Tt.reduce(function(e, t) {
  return e.concat([t + "-" + mt, t + "-" + St]);
}, []), qe = /* @__PURE__ */ [].concat(Tt, [oe]).reduce(function(e, t) {
  return e.concat([t, t + "-" + mt, t + "-" + St]);
}, []), ro = "beforeRead", ao = "read", lo = "afterRead", co = "beforeMain", ho = "main", uo = "afterMain", po = "beforeWrite", mo = "write", fo = "afterWrite", vo = [ro, ao, lo, co, ho, uo, po, mo, fo];
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
function st(e) {
  var t = B(e).Element;
  return e instanceof t || e instanceof Element;
}
function W(e) {
  var t = B(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ne(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = B(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function go(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(i) {
    var s = t.styles[i] || {}, o = t.attributes[i] || {}, n = t.elements[i];
    !W(n) || !$(n) || (Object.assign(n.style, s), Object.keys(o).forEach(function(a) {
      var r = o[a];
      r === !1 ? n.removeAttribute(a) : n.setAttribute(a, r === !0 ? "" : r);
    }));
  });
}
function yo(e) {
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
    Object.keys(t.elements).forEach(function(s) {
      var o = t.elements[s], n = t.attributes[s] || {}, a = Object.keys(t.styles.hasOwnProperty(s) ? t.styles[s] : i[s]), r = a.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !W(o) || !$(o) || (Object.assign(o.style, r), Object.keys(n).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const bo = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: go,
  effect: yo,
  requires: ["computeStyles"]
};
function z(e) {
  return e.split("-")[0];
}
var it = Math.max, Vt = Math.min, ft = Math.round;
function ie() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Je() {
  return !/^((?!chrome|android).)*safari/i.test(ie());
}
function vt(e, t, i) {
  t === void 0 && (t = !1), i === void 0 && (i = !1);
  var s = e.getBoundingClientRect(), o = 1, n = 1;
  t && W(e) && (o = e.offsetWidth > 0 && ft(s.width) / e.offsetWidth || 1, n = e.offsetHeight > 0 && ft(s.height) / e.offsetHeight || 1);
  var a = st(e) ? B(e) : window, r = a.visualViewport, l = !Je() && i, c = (s.left + (l && r ? r.offsetLeft : 0)) / o, h = (s.top + (l && r ? r.offsetTop : 0)) / n, u = s.width / o, f = s.height / n;
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
function re(e) {
  var t = vt(e), i = e.offsetWidth, s = e.offsetHeight;
  return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: i,
    height: s
  };
}
function Qe(e, t) {
  var i = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (i && ne(i)) {
    var s = t;
    do {
      if (s && e.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function q(e) {
  return B(e).getComputedStyle(e);
}
function wo(e) {
  return ["table", "td", "th"].indexOf($(e)) >= 0;
}
function Q(e) {
  return ((st(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function zt(e) {
  return $(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ne(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Q(e)
  );
}
function He(e) {
  return !W(e) || // https://github.com/popperjs/popper-core/issues/837
  q(e).position === "fixed" ? null : e.offsetParent;
}
function Io(e) {
  var t = /firefox/i.test(ie()), i = /Trident/i.test(ie());
  if (i && W(e)) {
    var s = q(e);
    if (s.position === "fixed")
      return null;
  }
  var o = zt(e);
  for (ne(o) && (o = o.host); W(o) && ["html", "body"].indexOf($(o)) < 0; ) {
    var n = q(o);
    if (n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].indexOf(n.willChange) !== -1 || t && n.willChange === "filter" || t && n.filter && n.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function kt(e) {
  for (var t = B(e), i = He(e); i && wo(i) && q(i).position === "static"; )
    i = He(i);
  return i && ($(i) === "html" || $(i) === "body" && q(i).position === "static") ? t : i || Io(e) || t;
}
function ae(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Et(e, t, i) {
  return it(e, Vt(t, i));
}
function Co(e, t, i) {
  var s = Et(e, t, i);
  return s > i ? i : s;
}
function ti() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ei(e) {
  return Object.assign({}, ti(), e);
}
function ii(e, t) {
  return t.reduce(function(i, s) {
    return i[s] = e, i;
  }, {});
}
var xo = function(t, i) {
  return t = typeof t == "function" ? t(Object.assign({}, i.rects, {
    placement: i.placement
  })) : t, ei(typeof t != "number" ? t : ii(t, Tt));
};
function Oo(e) {
  var t, i = e.state, s = e.name, o = e.options, n = i.elements.arrow, a = i.modifiersData.popperOffsets, r = z(i.placement), l = ae(r), c = [Z, V].indexOf(r) >= 0, h = c ? "height" : "width";
  if (!(!n || !a)) {
    var u = xo(o.padding, i), f = re(n), p = l === "y" ? H : Z, I = l === "y" ? F : V, b = i.rects.reference[h] + i.rects.reference[l] - a[l] - i.rects.popper[h], v = a[l] - i.rects.reference[l], O = kt(n), E = O ? l === "y" ? O.clientHeight || 0 : O.clientWidth || 0 : 0, w = b / 2 - v / 2, y = u[p], x = E - f[h] - u[I], m = E / 2 - f[h] / 2 + w, g = Et(y, m, x), C = l;
    i.modifiersData[s] = (t = {}, t[C] = g, t.centerOffset = g - m, t);
  }
}
function Eo(e) {
  var t = e.state, i = e.options, s = i.element, o = s === void 0 ? "[data-popper-arrow]" : s;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Qe(t.elements.popper, o) && (t.elements.arrow = o));
}
const Ao = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Oo,
  effect: Eo,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function gt(e) {
  return e.split("-")[1];
}
var So = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Lo(e, t) {
  var i = e.x, s = e.y, o = t.devicePixelRatio || 1;
  return {
    x: ft(i * o) / o || 0,
    y: ft(s * o) / o || 0
  };
}
function Ze(e) {
  var t, i = e.popper, s = e.popperRect, o = e.placement, n = e.variation, a = e.offsets, r = e.position, l = e.gpuAcceleration, c = e.adaptive, h = e.roundOffsets, u = e.isFixed, f = a.x, p = f === void 0 ? 0 : f, I = a.y, b = I === void 0 ? 0 : I, v = typeof h == "function" ? h({
    x: p,
    y: b
  }) : {
    x: p,
    y: b
  };
  p = v.x, b = v.y;
  var O = a.hasOwnProperty("x"), E = a.hasOwnProperty("y"), w = Z, y = H, x = window;
  if (c) {
    var m = kt(i), g = "clientHeight", C = "clientWidth";
    if (m === B(i) && (m = Q(i), q(m).position !== "static" && r === "absolute" && (g = "scrollHeight", C = "scrollWidth")), m = m, o === H || (o === Z || o === V) && n === St) {
      y = F;
      var A = u && m === x && x.visualViewport ? x.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        m[g]
      );
      b -= A - s.height, b *= l ? 1 : -1;
    }
    if (o === Z || (o === H || o === F) && n === St) {
      w = V;
      var S = u && m === x && x.visualViewport ? x.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        m[C]
      );
      p -= S - s.width, p *= l ? 1 : -1;
    }
  }
  var T = Object.assign({
    position: r
  }, c && So), R = h === !0 ? Lo({
    x: p,
    y: b
  }, B(i)) : {
    x: p,
    y: b
  };
  if (p = R.x, b = R.y, l) {
    var k;
    return Object.assign({}, T, (k = {}, k[y] = E ? "0" : "", k[w] = O ? "0" : "", k.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + b + "px)" : "translate3d(" + p + "px, " + b + "px, 0)", k));
  }
  return Object.assign({}, T, (t = {}, t[y] = E ? b + "px" : "", t[w] = O ? p + "px" : "", t.transform = "", t));
}
function To(e) {
  var t = e.state, i = e.options, s = i.gpuAcceleration, o = s === void 0 ? !0 : s, n = i.adaptive, a = n === void 0 ? !0 : n, r = i.roundOffsets, l = r === void 0 ? !0 : r, c = {
    placement: z(t.placement),
    variation: gt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ze(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ze(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const ko = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: To,
  data: {}
};
var Bt = {
  passive: !0
};
function Mo(e) {
  var t = e.state, i = e.instance, s = e.options, o = s.scroll, n = o === void 0 ? !0 : o, a = s.resize, r = a === void 0 ? !0 : a, l = B(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return n && c.forEach(function(h) {
    h.addEventListener("scroll", i.update, Bt);
  }), r && l.addEventListener("resize", i.update, Bt), function() {
    n && c.forEach(function(h) {
      h.removeEventListener("scroll", i.update, Bt);
    }), r && l.removeEventListener("resize", i.update, Bt);
  };
}
const Po = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Mo,
  data: {}
};
var Yo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Wt(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Yo[t];
  });
}
var Ro = {
  start: "end",
  end: "start"
};
function De(e) {
  return e.replace(/start|end/g, function(t) {
    return Ro[t];
  });
}
function le(e) {
  var t = B(e), i = t.pageXOffset, s = t.pageYOffset;
  return {
    scrollLeft: i,
    scrollTop: s
  };
}
function ce(e) {
  return vt(Q(e)).left + le(e).scrollLeft;
}
function Xo(e, t) {
  var i = B(e), s = Q(e), o = i.visualViewport, n = s.clientWidth, a = s.clientHeight, r = 0, l = 0;
  if (o) {
    n = o.width, a = o.height;
    var c = Je();
    (c || !c && t === "fixed") && (r = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: n,
    height: a,
    x: r + ce(e),
    y: l
  };
}
function Ho(e) {
  var t, i = Q(e), s = le(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, n = it(i.scrollWidth, i.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = it(i.scrollHeight, i.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), r = -s.scrollLeft + ce(e), l = -s.scrollTop;
  return q(o || i).direction === "rtl" && (r += it(i.clientWidth, o ? o.clientWidth : 0) - n), {
    width: n,
    height: a,
    x: r,
    y: l
  };
}
function he(e) {
  var t = q(e), i = t.overflow, s = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(i + o + s);
}
function si(e) {
  return ["html", "body", "#document"].indexOf($(e)) >= 0 ? e.ownerDocument.body : W(e) && he(e) ? e : si(zt(e));
}
function At(e, t) {
  var i;
  t === void 0 && (t = []);
  var s = si(e), o = s === ((i = e.ownerDocument) == null ? void 0 : i.body), n = B(s), a = o ? [n].concat(n.visualViewport || [], he(s) ? s : []) : s, r = t.concat(a);
  return o ? r : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    r.concat(At(zt(a)))
  );
}
function se(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Zo(e, t) {
  var i = vt(e, !1, t === "fixed");
  return i.top = i.top + e.clientTop, i.left = i.left + e.clientLeft, i.bottom = i.top + e.clientHeight, i.right = i.left + e.clientWidth, i.width = e.clientWidth, i.height = e.clientHeight, i.x = i.left, i.y = i.top, i;
}
function Be(e, t, i) {
  return t === Ke ? se(Xo(e, i)) : st(t) ? Zo(t, i) : se(Ho(Q(e)));
}
function Do(e) {
  var t = At(zt(e)), i = ["absolute", "fixed"].indexOf(q(e).position) >= 0, s = i && W(e) ? kt(e) : e;
  return st(s) ? t.filter(function(o) {
    return st(o) && Qe(o, s) && $(o) !== "body";
  }) : [];
}
function Bo(e, t, i, s) {
  var o = t === "clippingParents" ? Do(e) : [].concat(t), n = [].concat(o, [i]), a = n[0], r = n.reduce(function(l, c) {
    var h = Be(e, c, s);
    return l.top = it(h.top, l.top), l.right = Vt(h.right, l.right), l.bottom = Vt(h.bottom, l.bottom), l.left = it(h.left, l.left), l;
  }, Be(e, a, s));
  return r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
function oi(e) {
  var t = e.reference, i = e.element, s = e.placement, o = s ? z(s) : null, n = s ? gt(s) : null, a = t.x + t.width / 2 - i.width / 2, r = t.y + t.height / 2 - i.height / 2, l;
  switch (o) {
    case H:
      l = {
        x: a,
        y: t.y - i.height
      };
      break;
    case F:
      l = {
        x: a,
        y: t.y + t.height
      };
      break;
    case V:
      l = {
        x: t.x + t.width,
        y: r
      };
      break;
    case Z:
      l = {
        x: t.x - i.width,
        y: r
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var c = o ? ae(o) : null;
  if (c != null) {
    var h = c === "y" ? "height" : "width";
    switch (n) {
      case mt:
        l[c] = l[c] - (t[h] / 2 - i[h] / 2);
        break;
      case St:
        l[c] = l[c] + (t[h] / 2 - i[h] / 2);
        break;
    }
  }
  return l;
}
function Lt(e, t) {
  t === void 0 && (t = {});
  var i = t, s = i.placement, o = s === void 0 ? e.placement : s, n = i.strategy, a = n === void 0 ? e.strategy : n, r = i.boundary, l = r === void 0 ? oo : r, c = i.rootBoundary, h = c === void 0 ? Ke : c, u = i.elementContext, f = u === void 0 ? xt : u, p = i.altBoundary, I = p === void 0 ? !1 : p, b = i.padding, v = b === void 0 ? 0 : b, O = ei(typeof v != "number" ? v : ii(v, Tt)), E = f === xt ? no : xt, w = e.rects.popper, y = e.elements[I ? E : f], x = Bo(st(y) ? y : y.contextElement || Q(e.elements.popper), l, h, a), m = vt(e.elements.reference), g = oi({
    reference: m,
    element: w,
    placement: o
  }), C = se(Object.assign({}, w, g)), A = f === xt ? C : m, S = {
    top: x.top - A.top + O.top,
    bottom: A.bottom - x.bottom + O.bottom,
    left: x.left - A.left + O.left,
    right: A.right - x.right + O.right
  }, T = e.modifiersData.offset;
  if (f === xt && T) {
    var R = T[o];
    Object.keys(S).forEach(function(k) {
      var j = [V, F].indexOf(k) >= 0 ? 1 : -1, G = [H, F].indexOf(k) >= 0 ? "y" : "x";
      S[k] += R[G] * j;
    });
  }
  return S;
}
function Wo(e, t) {
  t === void 0 && (t = {});
  var i = t, s = i.placement, o = i.boundary, n = i.rootBoundary, a = i.padding, r = i.flipVariations, l = i.allowedAutoPlacements, c = l === void 0 ? qe : l, h = gt(s), u = h ? r ? Xe : Xe.filter(function(I) {
    return gt(I) === h;
  }) : Tt, f = u.filter(function(I) {
    return c.indexOf(I) >= 0;
  });
  f.length === 0 && (f = u);
  var p = f.reduce(function(I, b) {
    return I[b] = Lt(e, {
      placement: b,
      boundary: o,
      rootBoundary: n,
      padding: a
    })[z(b)], I;
  }, {});
  return Object.keys(p).sort(function(I, b) {
    return p[I] - p[b];
  });
}
function Fo(e) {
  if (z(e) === oe)
    return [];
  var t = Wt(e);
  return [De(e), t, De(t)];
}
function Vo(e) {
  var t = e.state, i = e.options, s = e.name;
  if (!t.modifiersData[s]._skip) {
    for (var o = i.mainAxis, n = o === void 0 ? !0 : o, a = i.altAxis, r = a === void 0 ? !0 : a, l = i.fallbackPlacements, c = i.padding, h = i.boundary, u = i.rootBoundary, f = i.altBoundary, p = i.flipVariations, I = p === void 0 ? !0 : p, b = i.allowedAutoPlacements, v = t.options.placement, O = z(v), E = O === v, w = l || (E || !I ? [Wt(v)] : Fo(v)), y = [v].concat(w).reduce(function(J, N) {
      return J.concat(z(N) === oe ? Wo(t, {
        placement: N,
        boundary: h,
        rootBoundary: u,
        padding: c,
        flipVariations: I,
        allowedAutoPlacements: b
      }) : N);
    }, []), x = t.rects.reference, m = t.rects.popper, g = /* @__PURE__ */ new Map(), C = !0, A = y[0], S = 0; S < y.length; S++) {
      var T = y[S], R = z(T), k = gt(T) === mt, j = [H, F].indexOf(R) >= 0, G = j ? "width" : "height", M = Lt(t, {
        placement: T,
        boundary: h,
        rootBoundary: u,
        altBoundary: f,
        padding: c
      }), D = j ? k ? V : Z : k ? F : H;
      x[G] > m[G] && (D = Wt(D));
      var ot = Wt(D), _ = [];
      if (n && _.push(M[R] <= 0), r && _.push(M[D] <= 0, M[ot] <= 0), _.every(function(J) {
        return J;
      })) {
        A = T, C = !1;
        break;
      }
      g.set(T, _);
    }
    if (C)
      for (var nt = I ? 3 : 1, yt = function(N) {
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
        var rt = yt(tt);
        if (rt === "break") break;
      }
    t.placement !== A && (t.modifiersData[s]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const No = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Vo,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function We(e, t, i) {
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
function Fe(e) {
  return [H, V, F, Z].some(function(t) {
    return e[t] >= 0;
  });
}
function zo(e) {
  var t = e.state, i = e.name, s = t.rects.reference, o = t.rects.popper, n = t.modifiersData.preventOverflow, a = Lt(t, {
    elementContext: "reference"
  }), r = Lt(t, {
    altBoundary: !0
  }), l = We(a, s), c = We(r, o, n), h = Fe(l), u = Fe(c);
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
const $o = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: zo
};
function jo(e, t, i) {
  var s = z(e), o = [Z, H].indexOf(s) >= 0 ? -1 : 1, n = typeof i == "function" ? i(Object.assign({}, t, {
    placement: e
  })) : i, a = n[0], r = n[1];
  return a = a || 0, r = (r || 0) * o, [Z, V].indexOf(s) >= 0 ? {
    x: r,
    y: a
  } : {
    x: a,
    y: r
  };
}
function Go(e) {
  var t = e.state, i = e.options, s = e.name, o = i.offset, n = o === void 0 ? [0, 0] : o, a = qe.reduce(function(h, u) {
    return h[u] = jo(u, t.rects, n), h;
  }, {}), r = a[t.placement], l = r.x, c = r.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[s] = a;
}
const _o = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Go
};
function Uo(e) {
  var t = e.state, i = e.name;
  t.modifiersData[i] = oi({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Ko = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Uo,
  data: {}
};
function qo(e) {
  return e === "x" ? "y" : "x";
}
function Jo(e) {
  var t = e.state, i = e.options, s = e.name, o = i.mainAxis, n = o === void 0 ? !0 : o, a = i.altAxis, r = a === void 0 ? !1 : a, l = i.boundary, c = i.rootBoundary, h = i.altBoundary, u = i.padding, f = i.tether, p = f === void 0 ? !0 : f, I = i.tetherOffset, b = I === void 0 ? 0 : I, v = Lt(t, {
    boundary: l,
    rootBoundary: c,
    padding: u,
    altBoundary: h
  }), O = z(t.placement), E = gt(t.placement), w = !E, y = ae(O), x = qo(y), m = t.modifiersData.popperOffsets, g = t.rects.reference, C = t.rects.popper, A = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, S = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (m) {
    if (n) {
      var k, j = y === "y" ? H : Z, G = y === "y" ? F : V, M = y === "y" ? "height" : "width", D = m[y], ot = D + v[j], _ = D - v[G], nt = p ? -C[M] / 2 : 0, yt = E === mt ? g[M] : C[M], tt = E === mt ? -C[M] : -g[M], rt = t.elements.arrow, J = p && rt ? re(rt) : {
        width: 0,
        height: 0
      }, N = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ti(), et = N[j], at = N[G], U = Et(0, g[M], J[M]), lt = w ? g[M] / 2 - nt - U - et - S.mainAxis : yt - U - et - S.mainAxis, $t = w ? -g[M] / 2 + nt + U + at + S.mainAxis : tt + U + at + S.mainAxis, ct = t.elements.arrow && kt(t.elements.arrow), jt = ct ? y === "y" ? ct.clientTop || 0 : ct.clientLeft || 0 : 0, Mt = (k = T == null ? void 0 : T[y]) != null ? k : 0, Gt = D + lt - Mt - jt, _t = D + $t - Mt, Pt = Et(p ? Vt(ot, Gt) : ot, D, p ? it(_, _t) : _);
      m[y] = Pt, R[y] = Pt - D;
    }
    if (r) {
      var Yt, Ut = y === "x" ? H : Z, Kt = y === "x" ? F : V, K = m[x], ht = x === "y" ? "height" : "width", Rt = K + v[Ut], Xt = K - v[Kt], dt = [H, Z].indexOf(O) !== -1, ut = (Yt = T == null ? void 0 : T[x]) != null ? Yt : 0, pt = dt ? Rt : K - g[ht] - C[ht] - ut + S.altAxis, bt = dt ? K + g[ht] + C[ht] - ut - S.altAxis : Xt, wt = p && dt ? Co(pt, K, bt) : Et(p ? pt : Rt, K, p ? bt : Xt);
      m[x] = wt, R[x] = wt - K;
    }
    t.modifiersData[s] = R;
  }
}
const Qo = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Jo,
  requiresIfExists: ["offset"]
};
function tn(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function en(e) {
  return e === B(e) || !W(e) ? le(e) : tn(e);
}
function sn(e) {
  var t = e.getBoundingClientRect(), i = ft(t.width) / e.offsetWidth || 1, s = ft(t.height) / e.offsetHeight || 1;
  return i !== 1 || s !== 1;
}
function on(e, t, i) {
  i === void 0 && (i = !1);
  var s = W(t), o = W(t) && sn(t), n = Q(t), a = vt(e, o, i), r = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (s || !s && !i) && (($(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  he(n)) && (r = en(t)), W(t) ? (l = vt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : n && (l.x = ce(n))), {
    x: a.left + r.scrollLeft - l.x,
    y: a.top + r.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function nn(e) {
  var t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), s = [];
  e.forEach(function(n) {
    t.set(n.name, n);
  });
  function o(n) {
    i.add(n.name);
    var a = [].concat(n.requires || [], n.requiresIfExists || []);
    a.forEach(function(r) {
      if (!i.has(r)) {
        var l = t.get(r);
        l && o(l);
      }
    }), s.push(n);
  }
  return e.forEach(function(n) {
    i.has(n.name) || o(n);
  }), s;
}
function rn(e) {
  var t = nn(e);
  return vo.reduce(function(i, s) {
    return i.concat(t.filter(function(o) {
      return o.phase === s;
    }));
  }, []);
}
function an(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(i) {
      Promise.resolve().then(function() {
        t = void 0, i(e());
      });
    })), t;
  };
}
function ln(e) {
  var t = e.reduce(function(i, s) {
    var o = i[s.name];
    return i[s.name] = o ? Object.assign({}, o, s, {
      options: Object.assign({}, o.options, s.options),
      data: Object.assign({}, o.data, s.data)
    }) : s, i;
  }, {});
  return Object.keys(t).map(function(i) {
    return t[i];
  });
}
var Ve = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ne() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return !t.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function cn(e) {
  e === void 0 && (e = {});
  var t = e, i = t.defaultModifiers, s = i === void 0 ? [] : i, o = t.defaultOptions, n = o === void 0 ? Ve : o;
  return function(r, l, c) {
    c === void 0 && (c = n);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ve, n),
      modifiersData: {},
      elements: {
        reference: r,
        popper: l
      },
      attributes: {},
      styles: {}
    }, u = [], f = !1, p = {
      state: h,
      setOptions: function(O) {
        var E = typeof O == "function" ? O(h.options) : O;
        b(), h.options = Object.assign({}, n, h.options, E), h.scrollParents = {
          reference: st(r) ? At(r) : r.contextElement ? At(r.contextElement) : [],
          popper: At(l)
        };
        var w = rn(ln([].concat(s, h.options.modifiers)));
        return h.orderedModifiers = w.filter(function(y) {
          return y.enabled;
        }), I(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var O = h.elements, E = O.reference, w = O.popper;
          if (Ne(E, w)) {
            h.rects = {
              reference: on(E, kt(w), h.options.strategy === "fixed"),
              popper: re(w)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(S) {
              return h.modifiersData[S.name] = Object.assign({}, S.data);
            });
            for (var y = 0; y < h.orderedModifiers.length; y++) {
              if (h.reset === !0) {
                h.reset = !1, y = -1;
                continue;
              }
              var x = h.orderedModifiers[y], m = x.fn, g = x.options, C = g === void 0 ? {} : g, A = x.name;
              typeof m == "function" && (h = m({
                state: h,
                options: C,
                name: A,
                instance: p
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: an(function() {
        return new Promise(function(v) {
          p.forceUpdate(), v(h);
        });
      }),
      destroy: function() {
        b(), f = !0;
      }
    };
    if (!Ne(r, l))
      return p;
    p.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function I() {
      h.orderedModifiers.forEach(function(v) {
        var O = v.name, E = v.options, w = E === void 0 ? {} : E, y = v.effect;
        if (typeof y == "function") {
          var x = y({
            state: h,
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
var hn = [Po, Ko, ko, bo, _o, No, Qo, Ao, $o], dn = /* @__PURE__ */ cn({
  defaultModifiers: hn
});
class un {
  /**
   * @param {Array} hotspotsConfig - Hotspot configuration array
   * @param {HTMLElement} container - Container element
   * @param {number} imageAspectRatio - Image aspect ratio
   * @param {Object} options - Additional options
   * @param {string} options.trigger - 'hover' or 'click' (default: 'hover')
   */
  constructor(t, i, s, o = {}) {
    pe(this, "updateHotspotPosition", (t, i) => {
      this.currentActiveIndex = t, this.currentOrientation = i;
      const s = Us(this.hotspotsConfig, t, i);
      this.hideHotspots(), s.forEach((o) => this.updateAndShowHotspot(o, t));
    });
    this.container = i, this.popper = null, this.popperInstance = null, this.hotspotsContainer = hs(this.container), this.hotspotsConfig = to(t), this.shouldHidePopper = !0, this.hidePopper = this.hidePopper.bind(this), this.forceHidePopper = this.forceHidePopper.bind(this), this.imageAspectRatio = s, this.hotspotElements = /* @__PURE__ */ new Map(), this.popperListeners = [], this.trigger = o.trigger || "hover";
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
    this.hotspotsConfig = eo({
      newWidth: t,
      newHeight: i,
      initialContainerSize: this.initialContainerSize,
      imageAspectRatio: this.imageAspectRatio,
      hotspotsConfig: this.hotspotsConfig
    }), this.updateHotspotPosition(this.currentActiveIndex, this.currentOrientation);
  }
  cleanupPopperListeners() {
    this.popperListeners.forEach(({ element: t, event: i, handler: s }) => {
      t.removeEventListener(i, s);
    }), this.popperListeners = [];
  }
  showPopper({ hotspotElement: t, content: i, id: s, keepOpen: o }) {
    this.popperInstance && this.hidePopper();
    const n = Js(this.container);
    this.popper = Qs(i, s), this.popper.setAttribute("data-show", ""), this.currentHotspotElement = t, t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-describedby", `cloudimage-360-popper-${s}`);
    const a = () => {
      this.shouldHidePopper = !1;
    }, r = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, l = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, c = () => {
      this.shouldHidePopper = !1, this.hidePopperTimeout && clearTimeout(this.hidePopperTimeout);
    };
    this.popper.addEventListener("mouseenter", a), this.popper.addEventListener("mouseleave", r), t.addEventListener("mouseleave", l), t.addEventListener("mouseenter", c), this.popperListeners.push(
      { element: this.popper, event: "mouseenter", handler: a },
      { element: this.popper, event: "mouseleave", handler: r },
      { element: t, event: "mouseleave", handler: l },
      { element: t, event: "mouseenter", handler: c }
    ), this.popperInstance = {
      ...dn(t, this.popper, n),
      keepOpen: o,
      instanceId: s
    };
  }
  checkAndHidePopper() {
    var t;
    this.shouldHidePopper && !((t = this.popperInstance) != null && t.keepOpen) && (this.hidePopperTimeout = setTimeout(() => {
      this.shouldHidePopper && this.hidePopper();
    }, Ri));
  }
  hidePopper() {
    if (this.hidePopperTimeout && (clearTimeout(this.hidePopperTimeout), this.hidePopperTimeout = null), this.cleanupPopperListeners(), this.currentHotspotElement && (this.currentHotspotElement.setAttribute("aria-expanded", "false"), this.currentHotspotElement.removeAttribute("aria-describedby"), this.currentHotspotElement = null), this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null), this.popper) {
      this.popper.removeAttribute("data-show"), this.popper.setAttribute("aria-hidden", "true");
      const t = this.popper;
      this.popper = null, setTimeout(() => {
        t.remove();
      }, Xi);
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
    const { id: i, keepOpen: s, onClick: o, label: n } = t, a = Re(t), r = Ks(i, n);
    (o || a && this.trigger === "click") && (r.style.cursor = "pointer"), r.onclick = (l) => {
      var c;
      l.stopPropagation(), a && this.trigger === "click" && (((c = this.popperInstance) == null ? void 0 : c.instanceId) === i ? this.hidePopper() : this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: s })), o == null || o(l, this.popperInstance, i);
    }, a && (this.trigger === "hover" && (r.addEventListener(
      "mouseenter",
      () => this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: s })
    ), r.addEventListener("mouseleave", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    })), r.addEventListener(
      "focus",
      () => this.showPopper({ hotspotElement: r, content: a, id: i, keepOpen: s })
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
    const { positions: s, id: o } = t, { x: n, y: a } = s[i] ?? {}, r = this.hotspotsContainer.querySelector(`[data-hotspot-id="${o}"]`);
    r && (r.style.translate = `${n}px ${a}px`, r.style.opacity = 1, r.style.pointerEvents = "all");
  }
  /**
   * Shows the popper for a specific hotspot by ID
   * @param {string} hotspotId - The ID of the hotspot to show
   */
  showHotspotById(t) {
    const i = this.hotspotsConfig.find((n) => n.id === t);
    if (!i) return;
    const s = Re(i);
    if (!s) return;
    const o = this.hotspotsContainer.querySelector(`[data-hotspot-id="${t}"]`);
    o && o.style.opacity === "1" && this.showPopper({
      hotspotElement: o,
      content: s,
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
const ze = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class Nt {
  constructor(t, i, s) {
    this.container = t, this.isClicked = !1, this.fullscreenView = !!s, this.imagesX = [], this.imagesY = [];
    const o = Math.round(window.devicePixelRatio || 1);
    this.devicePixelRatio = ze ? Math.min(o, 2) : o, this.id = t.id, this.movementStart = { x: 0, y: 0 }, this.draggingDirection = null, this.isReady = !1, this.velocityX = 0, this.velocityY = 0, this.lastDragTime = 0, this.lastDragX = 0, this.lastDragY = 0, this.inertiaAnimationId = null, this.hasInteracted = !1, this.currentZoomScale = 1, this.touchDevice = Ws(), this.dragJustEnded = !1, this.isPinching = !1, this.initialPinchDistance = 0, this.pinchZoomLevel = 1, this.pinchZoomEmitted = !1, this.lastEmittedZoom = 1, this.panOffsetX = 0, this.panOffsetY = 0, this.useMainThreadCanvas = ze, this.canvasWorker = this.useMainThreadCanvas ? new zs() : new Ns(), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null, this.isAnimatingToFrame = !1, this.onMoveHandler = this.onMoveHandler.bind(this), this.destroy = this.destroy.bind(this), this.init(this.container, i);
  }
  /**
   * Close ImageBitmap objects to free GPU memory
   * @param {Array} images - Array of image objects with bitmapImage property
   */
  closeImageBitmaps(t) {
    !t || !Array.isArray(t) || t.forEach((i) => {
      var s;
      (s = i == null ? void 0 : i.bitmapImage) != null && s.close && i.bitmapImage.close();
    });
  }
  emit(t, i = {}) {
    const s = this[t];
    typeof s == "function" && s({ ...i, viewerId: this.id });
  }
  announce(t) {
    us(this.ariaLiveRegion, t);
  }
  mouseDown(t) {
    if (!this.isReady || this.glass) return;
    const i = t.target;
    if (i && i.closest && (i.closest(".cloudimage-360-button") || i.closest(".cloudimage-360-hotspot-timeline") || i.closest(".cloudimage-360-hotspot")))
      return;
    const { pageX: s, pageY: o } = t;
    this.hideHints(), this.hideHotspotPopper(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.autoplayJustStopped = !1, (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1, this.autoplayJustStopped = !0), this.movementStart = { x: s, y: o }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = s, this.lastDragY = o);
  }
  mouseUp() {
    this.isReady && (!this.isZoomed && !this.autoplayJustStopped && this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.isDragging && (this.emit("onDragEnd"), this.dragJustEnded = !0), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1, this.innerBox.style.cursor = "grab");
  }
  startInertia() {
    const s = this.fullscreenView ? document.body : this.container, o = this.dragSpeed / ye, n = o * (this.amountX / s.offsetWidth), a = o * (this.amountY / s.offsetHeight), r = () => {
      if (this.velocityX *= 0.95, this.velocityY *= 0.95, Math.abs(this.velocityX) < 0.01 && Math.abs(this.velocityY) < 0.01) {
        this.inertiaAnimationId = null;
        return;
      }
      const l = this.velocityX * 16, c = this.velocityY * 16, h = Me({
        deltaX: l,
        deltaY: c,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY
      });
      if (h) {
        const u = this.allowSpinX ? Math.max(1, Math.abs(Math.round(l * n))) : 0, f = this.allowSpinY ? Math.max(1, Math.abs(Math.round(c * a))) : 0;
        (u > 0 || f > 0) && this.onMoveHandler(h, u, f);
      }
      this.inertiaAnimationId = requestAnimationFrame(r);
    };
    this.inertiaAnimationId = requestAnimationFrame(r);
  }
  drag(t, i) {
    if (!this.isReady || !this.isClicked) return;
    const s = t - this.movementStart.x, o = i - this.movementStart.y;
    if (this.inertia) {
      const f = performance.now(), p = f - this.lastDragTime;
      p > 0 && p < 100 && (this.velocityX = (t - this.lastDragX) / p, this.velocityY = (i - this.lastDragY) / p), this.lastDragTime = f, this.lastDragX = t, this.lastDragY = i;
    }
    this.draggingDirection = Me({
      deltaX: s,
      deltaY: o,
      reversed: this.dragReverse,
      allowSpinX: this.allowSpinX,
      allowSpinY: this.allowSpinY
    }) || this.draggingDirection;
    const n = this.fullscreenView ? document.body : this.container, a = this.dragSpeed / ye, r = a * (this.amountX / n.offsetWidth), l = a * (this.amountY / n.offsetHeight), c = this.allowSpinX ? Math.abs(Math.round(s * r)) : 0, h = this.allowSpinY ? Math.abs(Math.round(o * l)) : 0;
    (this.allowSpinX && c !== 0 || this.allowSpinY && h !== 0) && (this.hasInteracted = !0, this.hideHotspotPopper(), this.onMoveHandler(this.draggingDirection, c, h), this.movementStart = { x: t, y: i }, setTimeout(() => {
      this.isDragging || (this.isDragging = !0, this.emit("onDragStart"));
    }, Yi));
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
    const s = Ot(this.srcXConfig, t), o = this.allowSpinY ? Ot(this.srcYConfig, t) : null;
    we({
      cdnPathX: s,
      cdnPathY: o,
      configX: this.srcXConfig,
      configY: this.srcYConfig,
      onAllImagesLoad: (n, a) => {
        this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = n, this.imagesY = a, i();
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
      }, Zt);
    else {
      let i = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;
      this.hideHotspots(), this.showLoadingSpinner(), this.loadHigherQualityImages(i, () => {
        this.showTransitionOverlay(), setTimeout(() => {
          this.applyZoom(t);
        }, Zt);
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
      }, Zt);
    });
  }
  zoomOut(t) {
    this.isZoomed && (t == null || t.stopPropagation(), this.showTransitionOverlay(), setTimeout(() => {
      this.removeZoom();
    }, Zt));
  }
  mouseLeave() {
    this.isZoomed && this.removeZoom();
  }
  applyZoom(t) {
    const { offsetX: i, offsetY: s } = Ps(t, this.canvas, this.devicePixelRatio);
    this.isZoomed || (this.isZoomed = !0, this.hideAllIcons(), this.hideLoadingSpinner(), this.hideTransitionOverlay(), this.showZoomOutIcon(), this.emit("onZoomIn", { zoomLevel: this.pointerZoom }), this.announce("Zoomed in. Move mouse to pan. Click to zoom out.")), this.updateView(this.pointerZoom, i, s);
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
      const n = t.touches[0], a = t.touches[1];
      if (this.initialPinchDistance = this.getPinchDistance(n, a), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), !this.isZoomed && this.pinchZoomLevel === 1) {
        const r = (this.fullscreenView ? document.body : this.container).offsetWidth;
        this.hideHotspots(), this.loadHigherQualityImages(r, () => {
        });
      }
      return;
    }
    if (t.touches.length > 1) return;
    const { pageX: s, pageY: o } = t.touches[0];
    this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), this.hideAllIcons(), this.hideHotspotPopper(), this.movementStart = { x: s, y: o }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = s, this.lastDragY = o);
  }
  getPinchDistance(t, i) {
    const s = t.pageX - i.pageX, o = t.pageY - i.pageY;
    return Math.sqrt(s * s + o * o);
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
      const o = t.touches[0], n = t.touches[1], a = this.getPinchDistance(o, n);
      if (this.initialPinchDistance === 0) {
        this.initialPinchDistance = a;
        return;
      }
      const r = a / this.initialPinchDistance, l = Math.max(1, Math.min(this.pinchZoomLevel * r, be));
      if (this.initialPinchDistance = a, this.pinchZoomLevel = l, !this.canvas) return;
      const c = this.canvas.getBoundingClientRect(), h = c.width / 2 * this.devicePixelRatio, u = c.height / 2 * this.devicePixelRatio;
      l > 1 ? (this.isZoomed = !0, this.hideAllIcons(), this.updateView(l, h, u), (!this.pinchZoomEmitted || l > this.lastEmittedZoom) && (this.emit("onZoomIn", { zoomLevel: l }), this.pinchZoomEmitted = !0, this.lastEmittedZoom = l)) : (this.isZoomed = !1, this.panOffsetX = 0, this.panOffsetY = 0, this.updateView());
      return;
    }
    if (!this.isClicked || !t.touches || !t.touches[0]) return;
    const { pageX: i, pageY: s } = t.touches[0];
    if (t.preventDefault(), this.isZoomed && this.pinchZoomLevel > 1) {
      const o = i - this.movementStart.x, n = s - this.movementStart.y;
      this.panOffsetX -= o * this.devicePixelRatio, this.panOffsetY -= n * this.devicePixelRatio, this.movementStart = { x: i, y: s }, this.updateView(this.pinchZoomLevel, this.panOffsetX, this.panOffsetY);
      return;
    }
    this.drag(i, s);
  }
  keyDown(t) {
    if (!this.isReady) return;
    const { keyCode: i } = t, s = this.keysReverse;
    switch (this.autoplay && this.stopAutoplay(), ke(i, this.allowSpinY) && (this.hasInteracted = !0, this.hideAllIcons(), this.hideHints()), i) {
      case 37:
        s ? this.moveLeft() : this.moveRight();
        break;
      case 39:
        s ? this.moveRight() : this.moveLeft();
        break;
      case 38:
        this.allowSpinY && (t.preventDefault(), s ? this.moveTop() : this.moveBottom());
        break;
      case 40:
        this.allowSpinY && (t.preventDefault(), s ? this.moveBottom() : this.moveTop());
        break;
    }
  }
  keyUp(t) {
    const { keyCode: i } = t;
    ke(i, this.allowSpinY) && this.showAllIcons();
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
  onMoveHandler(t, i = 1, s = 1) {
    t === "right" ? this.moveRight(this.stopAtEdges, i) : t === "left" ? this.moveLeft(this.stopAtEdges, i) : t === "up" ? this.moveTop(this.stopAtEdges, s) : t === "down" && this.moveBottom(this.stopAtEdges, s), this.emit("onSpin", {
      direction: t,
      activeImageX: this.activeImageX,
      activeImageY: this.activeImageY,
      amountX: this.amountX,
      amountY: this.amountY
    });
  }
  updateView(t, i, s) {
    const o = this.orientation === Y.X ? this.activeImageX : this.activeImageY, n = this.orientation === Y.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];
    this.hotspotsInstance && !this.isZoomed && !this.autoplay && this.hotspotsInstance.updateHotspotPosition(o, this.orientation), this.hotspotTimelineIndicator && this.orientation === Y.X && this.updateHotspotTimelinePosition(), this.drawImageOnCanvas(n, t, i, s);
  }
  updatePercentageInLoader(t = 0) {
    this.loader && (this.loader.innerText = t + "%");
  }
  adaptCanvasSize(t) {
    const { naturalWidth: i, naturalHeight: s } = t;
    this.imageAspectRatio = i / s;
    const o = this.fullscreenView ? window.innerWidth : this.canvas.clientWidth, n = this.fullscreenView ? window.innerHeight : this.canvas.clientHeight;
    this.canvasWorker.postMessage({
      action: "adaptCanvasSize",
      devicePixelRatio: this.devicePixelRatio,
      imageAspectRatio: this.imageAspectRatio,
      containerWidth: o,
      containerHeight: n
    });
  }
  drawImageOnCanvas(t, i = 1, s = 0, o = 0) {
    this.pendingDrawData = { imageData: t, zoomScale: i, pointerX: s, pointerY: o }, this.drawFrameRequested || (this.drawFrameRequested = !0, requestAnimationFrame(() => {
      if (this.drawFrameRequested = !1, this.pendingDrawData) {
        const { imageData: n, zoomScale: a, pointerX: r, pointerY: l } = this.pendingDrawData;
        this.canvasWorker.postMessage({
          action: "drawImageOnCanvas",
          imageData: n,
          zoomScale: a,
          pointerX: r,
          pointerY: l
        });
      }
    }));
  }
  pushImageToSet(t, i, s) {
    s === Y.X ? this.imagesX[i] = t : this.imagesY[i] = t;
  }
  calculatePercentage() {
    const t = this.amountX + this.amountY, i = this.imagesX.length + this.imagesY.length;
    return Math.round(i / t * 100);
  }
  onImageLoad(t, i, s) {
    this.pushImageToSet(t, i, s), this.updatePercentageInLoader(this.calculatePercentage());
  }
  onFirstImageLoaded(t, i) {
    this.createContainers(t), this.adaptCanvasSize(i), this.drawImageOnCanvas(i);
  }
  onAllImagesLoaded() {
    if (this.addAllIcons(), this.isReady = !0, this.amountX = this.imagesX.length, this.amountY = this.imagesY.length, this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0, this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0, this.hotspots && (this.hotspotsInstance = new un(this.hotspots, this.innerBox, this.imageAspectRatio, {
      trigger: this.hotspotTrigger
    }), this.hotspotsInstance.updateHotspotPosition(this.activeImageX, this.orientation), this.addHotspotTimeline(), this.showHotspotTimeline()), this.emit("onLoad", { imagesX: this.imagesX.length, imagesY: this.imagesY.length }), this.emit("onReady"), this.announce("360 degree view loaded. Use mouse drag or arrow keys to rotate."), this.hints !== !1 && !this.autoplay) {
      const t = this.hints === !0 || this.hints === void 0 ? Oe(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = xe(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Ee(this.hintsOverlay));
    }
    this.autoplay && (this.hideAllIcons(), Fs(this.play.bind(this))());
  }
  magnify(t) {
    t.stopPropagation();
    const { src: i } = this.orientation === Y.Y ? this.imagesY[this.activeImageY] : this.imagesX[this.activeImageX], o = (this.fullscreenView ? document.body : this.container).offsetWidth * this.magnifier, n = $i(i, o);
    this.showLoadingSpinner(), this.createGlass(), Ts(n, (l) => {
      this.hideLoadingSpinner(), this.magnified = !0, Ms(t, this.innerBox, this.offset, l, this.glass, this.magnifier);
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
    const i = as(this.container);
    this.fullscreenInstance = new Nt(i, this.viewerConfig, !0), this.fullscreenInstance.originalViewer = this, this.boundResizeHandler = () => {
      this.fullscreenInstance && this.closeFullscreenModal(new Event("resize"));
    }, window.addEventListener("resize", this.boundResizeHandler), this.emit("onFullscreenOpen"), this.announce("Opened fullscreen mode. Press Escape to exit.");
  }
  closeFullscreenModal(t) {
    t.stopPropagation();
    const i = this.originalViewer || this, s = this.fullscreenView ? this : i.fullscreenInstance;
    if (i.boundResizeHandler && (window.removeEventListener("resize", i.boundResizeHandler), i.boundResizeHandler = null), s) {
      s.hideHotspotPopper();
      const o = s.container.parentNode;
      o && o.parentNode && o.parentNode.removeChild(o), s.destroy(), i.fullscreenInstance && (i.fullscreenInstance = null);
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
      if (this.playOnce && Hs({
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
      Zs({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse,
        spinDirection: this.spinDirection
      }) && (this.spinDirection = Bs(this.spinDirection));
      const n = this.spinDirection === "y";
      Xs({
        autoplayBehavior: this.autoplayBehavior,
        spinY: n,
        reversed: this.autoplayReverse,
        loopTriggers: i
      });
    }, t);
  }
  stopAutoplay() {
    if (this.showAllIcons(), this.autoplay = !1, window.clearTimeout(this.loopTimeoutId), this.loopTimeoutId = null, this.emit("onAutoplayStop"), this.hints !== !1 && !this.hintsOverlay && !this.hintsHidden) {
      const t = this.hints === !0 ? Oe(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = xe(this.innerBox, t, {
        pointerZoomTrigger: this.pointerZoomTrigger
      }), Ee(this.hintsOverlay));
    }
  }
  destroy() {
    this.stopAutoplay(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.removeEvents(), this.closeImageBitmaps(this.imagesX), this.closeImageBitmaps(this.imagesY), this.imagesX = [], this.imagesY = [], this.canvasWorker && (this.canvasWorker.terminate(), this.canvasWorker = null), this.hotspotsInstance && this.hotspotsInstance.destroy(), this.hintsOverlay && this.hintsOverlay.parentNode && (this.hintsOverlay.parentNode.removeChild(this.hintsOverlay), this.hintsOverlay = null), this.hotspotTimeline && this.hotspotTimeline.parentNode && (this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null), this.innerBox && this.innerBox.classList.remove("has-hotspot-timeline"), this.container && (this.container.classList.remove("ci360-theme-dark"), this.container.innerHTML = "");
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
  addMagnifierIcon() {
    this.pointerZoom && (this.magnifierIcon = os(), this.magnifierIcon.onclick = this.zoomIn.bind(this), this.iconsContainer.appendChild(this.magnifierIcon), this.zoomOutIcon = ns(), this.zoomOutIcon.onclick = this.zoomOut.bind(this), this.zoomOutIcon.style.display = "none", this.iconsContainer.appendChild(this.zoomOutIcon));
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
    this.fullscreen && (this.fullscreenIcon = is(), this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenIcon));
  }
  addCloseFullscreenIcon() {
    this.fullscreenCloseIcon = es(), this.fullscreenCloseIcon.onclick = this.closeFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenCloseIcon);
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
    this.loadingSpinner = ls(), this.innerBox.appendChild(this.loadingSpinner);
  }
  showLoadingSpinner() {
    this.loadingSpinner && (this.hideAllIcons(), this.loadingSpinner.style.opacity = 1);
  }
  createTransitionOverlay() {
    this.transitionOverlay = cs(), this.innerBox.appendChild(this.transitionOverlay);
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
    !this.hintsOverlay || this.hintsHidden || (this.hintsHidden = !0, ms(this.hintsOverlay));
  }
  addHotspotTimeline() {
    if (!this.hotspots || this.hotspotTimeline) return;
    const t = bs(this.innerBox, this.amountX, this.hotspots);
    if (!t) return;
    this.hotspotTimeline = t.element, this.hotspotTimelineIndicator = t.indicator, this.innerBox.classList.add("has-hotspot-timeline"), this.hotspotTimeline.querySelectorAll(".cloudimage-360-hotspot-timeline-dot").forEach((s) => {
      s.addEventListener("click", (o) => {
        o.stopPropagation(), this.hideAllIcons(), this.hideHints();
        const n = parseInt(s.getAttribute("data-frame"), 10), a = s.getAttribute("data-hotspot-id");
        isNaN(n) || this.animateToFrame(n, a);
      });
    }), this.updateHotspotTimelinePosition();
  }
  showHotspotTimeline() {
    Is(this.hotspotTimeline);
  }
  hideHotspotTimeline() {
    Cs(this.hotspotTimeline);
  }
  updateHotspotTimelinePosition() {
    ws(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
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
    const s = this.activeImageX, o = (t - s + this.amountX) % this.amountX, n = (s - t + this.amountX) % this.amountX, a = o <= n, r = a ? o : n;
    if (r === 0) {
      this.isAnimatingToFrame = !1;
      return;
    }
    const l = 30;
    let c = r;
    const h = () => {
      if (c <= 0) {
        this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
          this.hotspotsInstance.showHotspotById(i);
        }, 50);
        return;
      }
      a ? this.moveRight() : this.moveLeft(), c--, c > 0 ? setTimeout(h, l) : (this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
        this.hotspotsInstance.showHotspotById(i);
      }, 50));
    };
    h();
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
  attachEvents(t, i, s) {
    t && this.addMouseEvents(), i && this.addTouchEvents(), s && this.addKeyboardEvents(), this.addEscKeyHandler();
  }
  removeEvents() {
    this.removeMouseEvents(), this.removeTouchEvents(), this.removeKeyboardEvents(), this.removeEscKeyHandler();
  }
  addMouseEvents() {
    this.boundMouseClick = this.mouseClick.bind(this), this.boundMouseDblClick = this.mouseDblClick.bind(this), this.boundMouseDown = this.mouseDown.bind(this), this.boundMouseMove = ve(this.mouseMove.bind(this), ge), this.boundMouseUp = this.mouseUp.bind(this), this.boundMouseLeave = this.mouseLeave.bind(this), this.innerBox.addEventListener("click", this.boundMouseClick), this.innerBox.addEventListener("dblclick", this.boundMouseDblClick), this.innerBox.addEventListener("mousedown", this.boundMouseDown), this.innerBox.addEventListener("mouseleave", this.boundMouseLeave), document.addEventListener("mousemove", this.boundMouseMove), document.addEventListener("mouseup", this.boundMouseUp);
  }
  addTouchEvents() {
    this.boundTouchOutside = this.touchOutside.bind(this), this.boundTouchStart = this.touchStart.bind(this), this.boundTouchEnd = this.touchEnd.bind(this), this.boundTouchMove = ve(this.touchMove.bind(this), ge), document.addEventListener("touchstart", this.boundTouchOutside), this.container.addEventListener("touchstart", this.boundTouchStart), this.container.addEventListener("touchend", this.boundTouchEnd), this.container.addEventListener("touchmove", this.boundTouchMove);
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
    if (this.iconsContainer = Ie(this.innerBox), this.canvas = ts(this.innerBox, t), this.loader = rs(this.innerBox), this.ariaLiveRegion = ds(this.innerBox), this.useMainThreadCanvas)
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
    this.fullscreenView && this.addCloseFullscreenIcon(), te(this.innerBox, ".cloudimage-360-placeholder");
  }
  update(t) {
    this.isReady && (this.stopAutoplay(), te(this.innerBox, ".cloudimage-360-icons-container"), this.init(this.container, t, !0), this.iconsContainer = Ie(this.innerBox), this.onAllImagesLoaded());
  }
  init(t, i, s) {
    const o = i ? Wi(i) : Di(t), {
      folder: n,
      apiVersion: a,
      filenameX: r,
      filenameY: l,
      imageListX: c,
      imageListY: h,
      indexZeroBase: u,
      amountX: f,
      amountY: p,
      draggable: I = !0,
      swipeable: b = !0,
      keys: v,
      keysReverse: O,
      bottomCircleOffset: E,
      autoplay: w,
      autoplayBehavior: y,
      playOnce: x,
      speed: m,
      autoplayReverse: g,
      fullscreen: C,
      magnifier: A,
      ciToken: S,
      ciFilters: T,
      ciTransformation: R,
      lazyload: k,
      dragSpeed: j,
      stopAtEdges: G,
      pointerZoom: M,
      pointerZoomTrigger: D = "dblclick",
      imageInfo: ot = "black",
      initialIconShown: _,
      bottomCircle: nt,
      hotspots: yt,
      hotspotTrigger: tt = "hover",
      dragReverse: rt,
      hide360Logo: J,
      logoSrc: N,
      inertia: et,
      pinchZoom: at,
      hints: U,
      theme: lt,
      hotspotTimelineOnClick: $t = !0,
      aspectRatio: ct,
      // Event callbacks
      onReady: jt,
      onLoad: Mt,
      onSpin: Gt,
      onAutoplayStart: _t,
      onAutoplayStop: Pt,
      onFullscreenOpen: Yt,
      onFullscreenClose: Ut,
      onZoomIn: Kt,
      onZoomOut: K,
      onDragStart: ht,
      onDragEnd: Rt,
      onError: Xt
    } = o, dt = { ciToken: S, ciFilters: T, ciTransformation: R }, ut = ee(c, []), pt = ee(h, []);
    if (this.viewerConfig = o, this.amountX = ut.length || f, this.amountY = pt.length || p, this.allowSpinX = !!this.amountX, this.allowSpinY = !!this.amountY, this.activeImageX = g ? this.amountX - 1 : 0, this.activeImageY = g ? this.amountY - 1 : 0, this.bottomCircleOffset = E, this.autoplay = w, this.autoplayBehavior = y, this.playOnce = x, this.speed = m, this.autoplayReverse = g, this.fullscreen = C, this.magnifier = A > 1 ? Math.min(A, Zi) : 0, this.dragSpeed = Math.max(j, Hi), this.stopAtEdges = G, this.ciParams = dt, this.apiVersion = a, this.pointerZoom = M > 1 ? Math.min(M, be) : null, this.pointerZoomTrigger = D, this.keysReverse = O, this.info = ot, this.keys = v, this.innerBox = this.innerBox ?? ss(this.container), ct && (this.container.style.aspectRatio = ct), this.initialIconShown = _, this.bottomCircle = nt, this.spinDirection = Ds(this.autoplayBehavior, this.allowSpinX, this.allowSpinY), this.dragReverse = rt, this.hotspots = yt, this.hotspotTrigger = tt, this.hide360Logo = J, this.logoSrc = N, this.inertia = et, this.pinchZoom = at, this.hints = U, this.hotspotTimelineOnClick = $t, lt === "dark" ? this.container.classList.add("ci360-theme-dark") : lt === "light" && this.container.classList.remove("ci360-theme-dark"), this.onReady = jt, this.onLoad = Mt, this.onSpin = Gt, this.onAutoplayStart = _t, this.onAutoplayStop = Pt, this.onFullscreenOpen = Yt, this.onFullscreenClose = Ut, this.onZoomIn = Kt, this.onZoomOut = K, this.onDragStart = ht, this.onDragEnd = Rt, this.onError = Xt, this.srcXConfig = {
      folder: n,
      filename: r,
      imageList: ut,
      container: t,
      innerBox: this.innerBox,
      apiVersion: a,
      ciParams: dt,
      lazyload: k,
      amount: this.amountX,
      indexZeroBase: u,
      autoplayReverse: g,
      orientation: Y.X
    }, this.srcYConfig = {
      ...this.srcXConfig,
      filename: l,
      imageList: pt,
      orientation: Y.Y,
      amount: this.amountY
    }, s && this.removeEvents(), this.attachEvents(I, b, v), s) return;
    const bt = (this.fullscreenView ? document.body : this.container).offsetWidth, wt = this.allowSpinX && !ut.length ? Ot(this.srcXConfig, bt) : null, de = this.allowSpinY && !pt.length ? Ot(this.srcYConfig, bt) : null, ue = (ni) => {
      we({
        cdnPathX: wt,
        cdnPathY: de,
        configX: this.srcXConfig,
        configY: this.srcYConfig,
        onImageLoad: (It, ri, ai) => this.onImageLoad(It, ri, ai),
        onFirstImageLoad: (It) => this.onFirstImageLoaded(ni, It),
        onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        onError: (It) => this.emit("onError", It)
      });
    };
    this.allowSpinX ? Se(wt, this.srcXConfig, ue) : this.allowSpinY && Se(de, this.srcYConfig, ue);
  }
}
const $e = typeof navigator < "u" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
class mn {
  constructor() {
    this.views = /* @__PURE__ */ new Map(), this.initAll = this.initAll.bind(this), this.getViews = this.getViews.bind(this), this.memoryObserver = null, this.memoryManagementAutoEnabled = !1;
  }
  generateId() {
    return `ci360-${Math.random().toString(36).slice(2, 11)}`;
  }
  init(t, i, s) {
    if (!t) return;
    const o = t.id || this.generateId();
    t.id || (t.id = o);
    const n = new Nt(t, i, s);
    return this.views.set(o, n), $e && !this.memoryManagementAutoEnabled && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100)), n;
  }
  initAll(t = "cloudimage-360") {
    [...document.querySelectorAll(`.${t}`)].filter(Boolean).forEach((s) => {
      const o = s.id || this.generateId();
      s.id || (s.id = o);
      const n = new Nt(s);
      this.views.set(o, n);
    }), $e && !this.memoryManagementAutoEnabled && this.views.size > 0 && (this.memoryManagementAutoEnabled = !0, setTimeout(() => this.enableMemoryManagement(), 100));
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
    const s = this.getViewById(t);
    if (!s) return null;
    const o = { ...s.viewerConfig, ...i };
    s.destroy();
    const n = document.getElementById(t);
    return this.init(n, o);
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
      (s) => {
        s.forEach((o) => {
          const n = this.getViewById(o.target.id);
          n && (o.isIntersecting ? n.isMemoryReleased && n.reloadImages() : !n.isMemoryReleased && n.isReady && n.releaseMemory());
        });
      },
      { rootMargin: i }
    ), this.views.forEach((s, o) => {
      const n = document.getElementById(o);
      n && this.memoryObserver.observe(n);
    }), this.boundVisibilityHandler = () => {
      document.hidden ? this.views.forEach((s) => {
        !s.isMemoryReleased && s.isReady && s.releaseMemory();
      }) : this.views.forEach((s, o) => {
        if (s.isMemoryReleased) {
          const n = document.getElementById(o);
          if (n) {
            const a = n.getBoundingClientRect();
            a.top < window.innerHeight && a.bottom > 0 && s.reloadImages();
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
  mn as default
};
//# sourceMappingURL=ci360--3KbDLtq.mjs.map
