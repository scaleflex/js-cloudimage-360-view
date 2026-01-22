var ei = Object.defineProperty;
var ii = (e, t, i) => t in e ? ei(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var ce = (e, t, i) => ii(e, typeof t != "symbol" ? t + "" : t, i);
var Mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Be = "Expected a function", he = NaN, si = "[object Symbol]", ni = /^\s+|\s+$/g, ri = /^[-+]0x[0-9a-f]+$/i, ai = /^0b[01]+$/i, li = /^0o[0-7]+$/i, ci = parseInt, hi = typeof Mt == "object" && Mt && Mt.Object === Object && Mt, di = typeof self == "object" && self && self.Object === Object && self, ui = hi || di || Function("return this")(), pi = Object.prototype, fi = pi.toString, mi = Math.max, vi = Math.min, Kt = function() {
  return ui.Date.now();
};
function gi(e, t, i) {
  var o, s, n, l, r, a, c = 0, h = !1, p = !1, f = !0;
  if (typeof e != "function")
    throw new TypeError(Be);
  t = de(t) || 0, Wt(i) && (h = !!i.leading, p = "maxWait" in i, n = p ? mi(de(i.maxWait) || 0, t) : n, f = "trailing" in i ? !!i.trailing : f);
  function u(y) {
    var O = o, S = s;
    return o = s = void 0, c = y, l = e.apply(S, O), l;
  }
  function I(y) {
    return c = y, r = setTimeout(m, t), h ? u(y) : l;
  }
  function g(y) {
    var O = y - a, S = y - c, E = t - O;
    return p ? vi(E, n - S) : E;
  }
  function v(y) {
    var O = y - a, S = y - c;
    return a === void 0 || O >= t || O < 0 || p && S >= n;
  }
  function m() {
    var y = Kt();
    if (v(y))
      return b(y);
    r = setTimeout(m, g(y));
  }
  function b(y) {
    return r = void 0, f && o ? u(y) : (o = s = void 0, l);
  }
  function x() {
    r !== void 0 && clearTimeout(r), c = 0, o = a = s = r = void 0;
  }
  function w() {
    return r === void 0 ? l : b(Kt());
  }
  function C() {
    var y = Kt(), O = v(y);
    if (o = arguments, s = this, a = y, O) {
      if (r === void 0)
        return I(a);
      if (p)
        return r = setTimeout(m, t), u(a);
    }
    return r === void 0 && (r = setTimeout(m, t)), l;
  }
  return C.cancel = x, C.flush = w, C;
}
function yi(e, t, i) {
  var o = !0, s = !0;
  if (typeof e != "function")
    throw new TypeError(Be);
  return Wt(i) && (o = "leading" in i ? !!i.leading : o, s = "trailing" in i ? !!i.trailing : s), gi(e, t, {
    leading: o,
    maxWait: t,
    trailing: s
  });
}
function Wt(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function bi(e) {
  return !!e && typeof e == "object";
}
function wi(e) {
  return typeof e == "symbol" || bi(e) && fi.call(e) == si;
}
function de(e) {
  if (typeof e == "number")
    return e;
  if (wi(e))
    return he;
  if (Wt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Wt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(ni, "");
  var i = ai.test(e);
  return i || li.test(e) ? ci(e.slice(2), i ? 2 : 8) : ri.test(e) ? he : +e;
}
var Ii = yi;
const ue = /* @__PURE__ */ oi(Ii), H = {
  SPIN_X: "spin-x",
  SPIN_Y: "spin-y",
  SPIN_XY: "spin-xy",
  SPIN_YX: "spin-yx"
}, xi = [!1, 0, null, void 0, "false", "0", "null", "undefined"], P = {
  X: "x-axis",
  Y: "y-axis"
}, Ci = [37, 39], Oi = [38, 40], pe = 10, Ei = 150, fe = 800, Si = 150, Ai = 200, me = 50, Li = 50, ki = 5, ve = 5, Ti = "https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/360_view.svg", d = {
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
  autoplayBehavior: H.SPIN_X,
  playOnce: !1,
  autoplayReverse: !1,
  pointerZoom: 0,
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
  logoSrc: Ti,
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
}, Yi = (e) => ({
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
  draggable: X(e, "draggable", d.draggable),
  swipeable: X(e, "swipeable", d.swipeable),
  keys: X(e, "keys", d.keys),
  keysReverse: X(e, "keys-reverse", d.keysReverse),
  autoplay: X(e, "autoplay", d.autoplay),
  autoplayBehavior: L(e, "autoplay-behavior", d.autoplayBehavior),
  playOnce: X(e, "play-once", d.playOnce),
  autoplayReverse: X(e, "autoplay-reverse", d.autoplayReverse),
  pointerZoom: parseFloat(L(e, "pointer-zoom", d.pointerZoom)),
  fullscreen: X(e, "fullscreen") || X(e, "full-screen", d.fullscreen),
  magnifier: parseFloat(L(e, "magnifier", d.magnifier)),
  bottomCircleOffset: parseInt(
    L(e, "bottom-circle-offset", d.bottomCircleOffset),
    10
  ),
  ciToken: L(e, "responsive", d.ciToken),
  ciFilters: L(e, "filters", d.ciFilters),
  ciTransformation: L(e, "transformation", d.ciTransformation),
  lazyload: X(e, "lazyload", d.lazyload),
  dragReverse: X(e, "drag-reverse", d.dragReverse),
  stopAtEdges: X(e, "stop-at-edges", d.stopAtEdges),
  imageInfo: X(e, "info", d.imageInfo),
  initialIconShown: !Dt(e, "initial-icon"),
  bottomCircle: !Dt(e, "bottom-circle"),
  hide360Logo: X(e, "hide-360-logo", d.hide360Logo),
  logoSrc: L(e, "logo-src", d.logoSrc),
  inertia: X(e, "inertia", d.inertia),
  pinchZoom: X(e, "pinch-zoom", d.pinchZoom),
  hints: !Dt(e, "hints"),
  theme: L(e, "theme", d.theme),
  hotspotTrigger: L(e, "hotspot-trigger", d.hotspotTrigger),
  hotspotTimelineOnClick: !Dt(e, "hotspot-timeline-on-click"),
  aspectRatio: L(e, "aspect-ratio", d.aspectRatio)
}), Xi = (e) => {
  const t = [];
  e.amountX !== void 0 && e.amountX < 0 && t.push("amountX should be a positive number"), e.amountY !== void 0 && e.amountY < 0 && t.push("amountY should be a positive number"), e.speed !== void 0 && e.speed <= 0 && t.push("speed should be a positive number"), e.dragSpeed !== void 0 && e.dragSpeed <= 0 && t.push("dragSpeed should be a positive number"), e.pointerZoom !== void 0 && e.pointerZoom !== 0 && (e.pointerZoom < 1 || e.pointerZoom > 5) && t.push("pointerZoom should be between 1 and 5 (or 0 to disable)"), e.magnifier !== void 0 && e.magnifier !== null && e.magnifier !== 0 && (e.magnifier < 1 || e.magnifier > 5) && t.push("magnifier should be between 1 and 5 (or 0/null to disable)"), !e.folder && !e.imageListX && !e.imageListY && t.push("Either folder or imageListX/imageListY is required"), e.folder && !e.amountX && !e.imageListX && t.push("amountX is required when using folder (unless imageListX is provided)");
  const i = ["spin-x", "spin-y", "spin-xy", "spin-yx"];
  return e.autoplayBehavior && !i.includes(e.autoplayBehavior) && t.push(`autoplayBehavior should be one of: ${i.join(", ")}`), t.forEach((o) => {
    console.warn(`CloudImage 360: ${o}`);
  }), t.length === 0;
}, Pi = (e) => (Xi(e), {
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
}), L = (e, t, i) => e.getAttribute(t) || e.getAttribute(`data-${t}`) || i, X = (e, t, i) => {
  if (!(e.hasAttribute(t) || e.hasAttribute(`data-${t}`))) return i;
  const s = L(e, t, null);
  return s !== "false" && s !== "0";
}, Dt = (e, t) => L(e, t, null) === "false", Ri = (e = 1) => {
  const t = Math.round(window.devicePixelRatio || 1);
  return parseInt(e) * t;
}, Hi = (e, t, i) => new URL(e).origin.includes("cloudimg") ? e : `https://${t}.cloudimg.io/${i}${e}`, Mi = ({ ciTransformation: e, responsiveWidth: t, ciFilters: i }) => {
  const o = `width=${t}`, s = e || o, n = i ? `&f=${i}` : "";
  return `${s}${n}`;
}, Ot = (e, t) => {
  const { folder: i, apiVersion: o, filename: s = "", ciParams: n } = e, { ciToken: l, ciFilters: r, ciTransformation: a } = n || {}, c = `${i}${s}`;
  if (!l || !t) return c;
  const h = xi.includes(o) ? null : o, p = h ? `${h}/` : "", f = Ri(t), u = Hi(c, l, p), I = Mi({
    ciTransformation: a,
    responsiveWidth: f,
    ciFilters: r
  });
  return `${u}${I ? "?" : ""}${I}`;
}, Di = (e, t, i) => {
  const [o, s] = e.split("?"), n = `${t}=${encodeURIComponent(i)}`;
  if (!s)
    return `${o}?${n}`;
  const l = new URLSearchParams(s);
  return l.set(t, i), `${o}?${l.toString()}`;
}, Zi = (e, t) => Di(e, "width", t), We = (e, t = 0) => (e += "", e.length >= t ? e : new Array(t - e.length + 1).join("0") + e), Bi = (e, { amount: t = 0, indexZeroBase: i = 0 } = {}) => Array.from({ length: t }, (o, s) => e.replace("{index}", We(s + 1, i))), Wi = ({
  imagesUrls: e,
  onFirstImageLoad: t,
  onImageLoad: i,
  onAllImagesLoad: o,
  onError: s,
  autoplayReverse: n
}) => {
  let l = 0, r = 0;
  const a = e.length, c = [], h = [], p = (m, b, x = !1) => {
    const w = {
      message: `Failed to load image: ${m}`,
      url: m,
      index: b,
      isFirstImage: x
    };
    h.push(w), r++, s == null || s({
      error: w,
      errorCount: r,
      totalImages: a,
      errors: h
    });
  }, f = () => {
    l === a && (o == null || o(c, { errorCount: r, errors: h }));
  }, u = (m, b) => {
    const x = new Image();
    x.crossOrigin = "anonymous", x.src = m, x.onload = async () => {
      try {
        const w = await createImageBitmap(x), C = {
          src: m,
          bitmapImage: w,
          naturalWidth: x.naturalWidth,
          naturalHeight: x.naturalHeight
        };
        l++, c[b] = C, i == null || i(C, b), f();
      } catch {
        l++, p(m, b), f();
      }
    }, x.onerror = () => {
      l++, p(m, b), f();
    };
  }, I = new Image(), g = n ? e.length - 1 : 0, v = e[g];
  I.crossOrigin = "anonymous", I.src = v, I.onload = async () => {
    try {
      const m = await createImageBitmap(I), b = {
        src: v,
        bitmapImage: m,
        naturalWidth: I.naturalWidth,
        naturalHeight: I.naturalHeight
      };
      c[g] = b, l++, t == null || t(b), i == null || i(b, g);
      for (let x = 0; x < e.length; x++)
        x !== g && u(e[x], x);
      f();
    } catch {
      l++, p(v, g, !0);
      for (let b = 0; b < e.length; b++)
        b !== g && u(e[b], b);
      f();
    }
  }, I.onerror = () => {
    l++, p(v, g, !0);
    for (let m = 0; m < e.length; m++)
      m !== g && u(e[m], m);
    f();
  };
}, ge = ({
  cdnPathX: e,
  cdnPathY: t,
  configX: i,
  configY: o,
  onFirstImageLoad: s,
  onImageLoad: n,
  onAllImagesLoad: l,
  onError: r
}) => {
  let a = { x: !1, y: !1 }, c = [], h = [], p = { errorCount: 0, errors: [] }, f = { errorCount: 0, errors: [] };
  const u = e || i.imageList.length, I = t || o.imageList.length, g = () => {
    if (a.x && a.y) {
      const m = {
        errorCount: p.errorCount + f.errorCount,
        errors: [...p.errors, ...f.errors]
      };
      l == null || l(c, h, m);
    }
  }, v = ({ cdnPath: m, config: b, orientation: x, loadedImages: w, loadStats: C, onFirstImageLoad: y }) => {
    const O = x === P.X, S = b.imageList.length ? b.imageList : Bi(m, b);
    Wi({
      imagesUrls: S,
      onFirstImageLoad: y,
      onImageLoad: (E, A) => {
        n == null || n(E, A, x), w[A] = E;
      },
      onError: (E) => {
        r == null || r({ ...E, orientation: x });
      },
      onAllImagesLoad: (E, A) => {
        w.length = 0, E.forEach((k, R) => {
          k && (w[R] = k);
        }), C.errorCount = A.errorCount, C.errors = A.errors.map((k) => ({ ...k, orientation: x })), a[O ? "x" : "y"] = !0, g();
      },
      autoplayReverse: b.autoplayReverse
    });
  };
  u ? v({
    cdnPath: e,
    config: i,
    orientation: P.X,
    loadedImages: c,
    loadStats: p,
    onFirstImageLoad: s
  }) : a.x = !0, I ? v({
    cdnPath: t,
    config: o,
    orientation: P.Y,
    loadedImages: h,
    loadStats: f,
    onFirstImageLoad: u ? void 0 : s
  }) : a.y = !0, !u && !I && g();
}, Fi = `
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
`, Ni = (e) => {
  const t = document.createElement("div");
  return t.innerHTML = Fi, t.style.bottom = `${e}%`, t.className = "cloudimage-360-view-360-circle", t;
}, Vi = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <!-- Circular arrows -->
  <path d="M 75 50 A 25 25 0 1 1 50 25" stroke="currentColor" stroke-width="3"/>
  <path d="M 25 50 A 25 25 0 1 1 50 75" stroke="currentColor" stroke-width="3"/>
  <!-- Arrow heads -->
  <path d="M 50 25 L 56 31 M 50 25 L 56 19" stroke="currentColor" stroke-width="3"/>
  <path d="M 50 75 L 44 69 M 50 75 L 44 81" stroke="currentColor" stroke-width="3"/>
  <!-- 360 text -->
  <text x="50" y="54" text-anchor="middle" font-size="16" font-weight="600" fill="currentColor" stroke="none" font-family="system-ui, -apple-system, sans-serif">360°</text>
</svg>
`, ji = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-initial-icon", t.setAttribute("aria-label", "360 degree view - drag to rotate"), e ? (t.style.backgroundImage = `url('${e}')`, t.style.backgroundPosition = "50% 50%", t.style.backgroundSize = "contain", t.style.backgroundRepeat = "no-repeat") : t.innerHTML = Vi, t;
}, $i = (e, t) => {
  const { width: i, height: o } = t, s = document.createElement("canvas");
  return s.width = i, s.height = o, s.style.width = "100%", s.style.height = "auto", e.appendChild(s), s;
}, zi = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-close-icon", e.setAttribute("aria-label", "Close fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', e;
}, Gi = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-fullscreen-button", e.setAttribute("aria-label", "View fullscreen"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>', e;
}, ye = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-icons-container", e.appendChild(t), t;
}, Ui = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-inner-box", t.setAttribute("role", "img"), t.setAttribute("aria-label", "360 degree product view. Use mouse drag or arrow keys to rotate."), e.appendChild(t), t;
}, Ki = () => {
  const e = document.createElement("button");
  return e.className = "cloudimage-360-button cloudimage-360-magnifier-button", e.setAttribute("aria-label", "Magnify image"), e.setAttribute("type", "button"), e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>', e;
}, _i = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-initial-icon";
  const i = document.createElement("span");
  return i.className = "percentage", i.innerText = "0%", t.appendChild(i), e.appendChild(t), t;
}, Ji = (e) => {
  const t = document.createElement("div");
  t.className = "cloudimage-360-fullscreen-modal";
  const i = e.cloneNode();
  return i.style.width = "100%", i.style.maxWidth = "100%", i.style.height = "100vh", i.style.maxHeight = "100%", t.appendChild(i), window.document.body.appendChild(t), i;
}, Jt = (e, t) => {
  const i = e.querySelector(t);
  i && i.parentNode.removeChild(i);
}, qi = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-loading-spinner", e;
}, Qi = () => {
  const e = document.createElement("div");
  return e.className = "cloudimage-360-transition-overlay", e;
}, to = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-hotspot-container", e.appendChild(t), t;
}, eo = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-sr-only", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"), t.setAttribute("aria-atomic", "true"), e.appendChild(t), t;
}, io = (e, t) => {
  e && (e.textContent = "", setTimeout(() => {
    e.textContent = t;
  }, 50));
}, Fe = {
  drag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  swipe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h8"/></svg>',
  click: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>',
  pinch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l4 4"/><path d="M18 6l-4 4"/><path d="M6 18l4-4"/><path d="M18 18l-4-4"/><circle cx="12" cy="12" r="2"/></svg>',
  keys: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m9 10 3 3 3-3"/></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
}, oo = {
  drag: "Drag to rotate",
  swipe: "Swipe to rotate",
  click: "Click to zoom",
  pinch: "Pinch to zoom",
  keys: "Use arrow keys",
  fullscreen: "Click for fullscreen"
}, so = (e) => {
  const t = document.createElement("div");
  return t.className = "cloudimage-360-hint-item", t.innerHTML = `
    ${Fe[e]}
    <span>${oo[e]}</span>
  `, t;
}, be = (e, t = []) => {
  if (!t || t.length === 0) return null;
  const i = document.createElement("div");
  i.className = "cloudimage-360-hints-overlay", i.setAttribute("role", "tooltip"), i.setAttribute("aria-label", "Interaction hints");
  const o = document.createElement("div");
  return o.className = "cloudimage-360-hints-container", t.forEach((s) => {
    Fe[s] && o.appendChild(so(s));
  }), i.appendChild(o), e.appendChild(i), i;
}, we = (e, t) => t ? ["swipe"] : ["drag", "click"], Ie = (e) => {
  e && e.classList.add("visible");
}, no = (e) => {
  e && (e.classList.remove("visible"), e.classList.add("hiding"), setTimeout(() => {
    e.classList.remove("hiding");
  }, 300));
}, ro = (e) => {
  if (!e || typeof e != "object") return null;
  const t = Object.keys(e).map((o) => parseInt(o, 10)).filter((o) => !isNaN(o)).sort((o, s) => o - s);
  if (t.length === 0) return null;
  const i = Math.floor(t.length / 2);
  return t[i];
}, ao = (e) => {
  const t = [];
  return !e || !Array.isArray(e) || e.forEach((i, o) => {
    const s = ro(i.positions);
    s !== null && t.push({
      id: i.id || `hotspot-${o}`,
      frame: s,
      label: i.label || null
    });
  }), t;
}, lo = 400, co = (e, t, i, o) => {
  const s = document.createElement("button");
  s.className = "cloudimage-360-hotspot-timeline-dot", s.setAttribute("type", "button"), s.setAttribute("aria-label", o || `Go to hotspot at frame ${t + 1}`), s.setAttribute("data-frame", t.toString()), s.setAttribute("data-hotspot-id", e);
  const n = i > 1 ? t / (i - 1) * 100 : 0;
  if (s.style.left = `${n}%`, o) {
    const l = document.createElement("span");
    l.className = "cloudimage-360-hotspot-timeline-tooltip", l.textContent = o, s.appendChild(l);
    let r = null;
    s.addEventListener("mouseenter", () => {
      r = setTimeout(() => {
        l.classList.add("visible");
      }, lo);
    }), s.addEventListener("mouseleave", () => {
      r && (clearTimeout(r), r = null), l.classList.remove("visible");
    }), s.addEventListener("click", () => {
      r && (clearTimeout(r), r = null), l.classList.remove("visible");
    });
  }
  return s;
}, ho = (e, t, i) => {
  const o = ao(i);
  if (o.length === 0) return null;
  const s = document.createElement("div");
  s.className = "cloudimage-360-hotspot-timeline", s.setAttribute("role", "navigation"), s.setAttribute("aria-label", "Hotspot timeline navigation");
  const n = document.createElement("div");
  n.className = "cloudimage-360-hotspot-timeline-track";
  const l = document.createElement("div");
  return l.className = "cloudimage-360-hotspot-timeline-indicator", o.forEach(({ id: r, frame: a, label: c }) => {
    const h = co(r, a, t, c);
    n.appendChild(h);
  }), n.appendChild(l), s.appendChild(n), e.appendChild(s), {
    element: s,
    indicator: l,
    hotspotFrames: o
  };
}, uo = (e, t, i) => {
  if (!e) return;
  const o = i > 1 ? t / (i - 1) * 100 : 0;
  e.style.left = `${o}%`;
}, po = (e) => {
  e && e.classList.add("visible");
}, fo = (e) => {
  e && e.classList.remove("visible");
}, qt = (e, t = []) => {
  if (!e) return t;
  try {
    return JSON.parse(e);
  } catch (i) {
    return console.warn("CloudImage 360: Failed to parse JSON:", i.message), t;
  }
}, mo = (e, t) => {
  const [i, o] = e.split("?");
  if (!o) return e;
  const s = new RegExp(`^${t}=|&${t}=`), n = o.split("&").filter((l) => !s.test(l)).join("&");
  return n ? `${i}?${n}` : i;
}, vo = (e) => {
  const t = mo(e, "width"), i = t.includes("?") ? "&" : "?";
  return `${t}${i}width=${150 * devicePixelRatio}`;
}, go = (e) => {
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
}, yo = (e, t) => {
  const i = We(1, t);
  return e.replace("{index}", i);
}, bo = (e, t) => {
  const [i] = e, o = /(https?):\/\//i.test(i);
  return Ot({
    ...t,
    folder: o ? "" : t.folder,
    filename: i
  });
}, wo = (e, t) => {
  const { imageList: i, indexZeroBase: o } = t;
  if (i.length) {
    const s = qt(i, null);
    if (s)
      return bo(s, t);
  }
  return yo(e, o);
}, xe = (e, t, i) => {
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
}, Ce = (e, t, i) => {
  const { innerBox: o, imageList: s, lazyload: n } = t || {}, [l] = s, r = l || wo(e, t), a = vo(r), c = xe(a, n, "cloudimage-lazy"), h = xe(a, !1, "cloudimage-360-placeholder"), p = (f) => {
    Jt(o, ".cloudimage-lazy"), i && i({
      event: f,
      width: c.width,
      height: c.height,
      naturalWidth: c.naturalWidth,
      naturalHeight: c.naturalHeight,
      src: a
    });
  };
  c.onload = p, o.appendChild(c), o.appendChild(h), go(c);
}, Io = (e, t, i) => {
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
}, xo = (e, t) => {
  const i = t.getBoundingClientRect(), o = e.touches ? e.touches[0].clientX : e.clientX, s = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: o - i.left,
    y: s - i.top
  };
}, _t = (e, t, i) => {
  const { container: o, w: s, h: n, zoom: l, bw: r, offsetX: a, offsetY: c } = t, h = xo(e, o);
  let p = h.x, f = h.y;
  p = Math.max(s / l, Math.min(p, o.offsetWidth - s / l)), f = Math.max(n / l, Math.min(f, o.offsetHeight - n / l)), i.style.left = `${p - s}px`, i.style.top = `${f - n}px`;
  const u = (p - a) * l - s + r, I = (f - c) * l - n + r;
  i.style.backgroundPosition = `-${u}px -${I}px`;
}, Co = (e, t, i, o, s, n) => {
  const { x: l = 0, y: r = 0 } = i || {}, a = (t.offsetWidth - l * 2) * n, c = (t.offsetHeight - r * 2) * n;
  if (!s) return;
  s.setAttribute("class", "cloudimage-360-img-magnifier-glass"), t.prepend(s), s.style.backgroundImage = `url('${o.src}')`, s.style.backgroundSize = `${a}px ${c}px`;
  const h = 3, p = s.offsetWidth / 2, f = s.offsetHeight / 2, u = {
    container: t,
    w: p,
    h: f,
    zoom: n,
    bw: h,
    offsetX: l,
    offsetY: r
  };
  _t(e, u, s);
  const I = (v) => {
    _t(v, u, s);
  }, g = (v) => {
    v.preventDefault(), _t(v, u, s);
  };
  s.addEventListener("mousemove", I), t.addEventListener("mousemove", I), t.addEventListener("touchmove", g);
}, Oo = (e, t, i) => {
  const { clientX: o, clientY: s } = e, n = t.getBoundingClientRect(), l = t.width / (n.width * i), r = t.height / (n.height * i), a = (o - n.left) * l, c = (s - n.top) * r;
  return { offsetX: a, offsetY: c };
}, Oe = (e, { bottom: t, top: i }) => {
  e ? t() : i();
}, Ee = (e, { left: t, right: i }) => {
  e ? t() : i();
}, Eo = ({ autoplayBehavior: e, spinY: t, reversed: i, loopTriggers: o }) => {
  switch (e) {
    case H.SPIN_XY:
    case H.SPIN_YX:
      t ? Oe(i, o) : Ee(i, o);
      break;
    case H.SPIN_Y:
      Oe(i, o);
      break;
    case H.SPIN_X:
    default:
      Ee(i, o);
  }
}, So = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n
}) => {
  const l = (r, a) => {
    const c = a - 1;
    return n ? r === 0 : r === c;
  };
  switch (e) {
    case H.SPIN_XY:
    case H.SPIN_Y:
      return l(i, s);
    case H.SPIN_X:
    case H.SPIN_YX:
    default:
      return l(t, o);
  }
}, Ao = ({
  autoplayBehavior: e,
  activeImageX: t,
  activeImageY: i,
  amountX: o,
  amountY: s,
  autoplayReverse: n,
  spinDirection: l
}) => {
  const r = t === (n ? 0 : o - 1), a = i === (n ? 0 : s - 1);
  return e === H.SPIN_XY || e === H.SPIN_YX ? l === "x" && r || l === "y" && a : !1;
}, Lo = (e, t, i) => {
  if (!i) return "x";
  if (!t) return "y";
  switch (e) {
    case H.SPIN_XY:
      return "x";
    case H.SPIN_YX:
      return "y";
    case H.SPIN_Y:
      return "y";
    case H.SPIN_X:
    default:
      return "x";
  }
}, ko = (e) => e === "x" ? "y" : "x", Se = (e, t) => {
  const i = [...Ci];
  return t ? [...i, ...Oi].includes(e) : i.includes(e);
}, Ae = ({ deltaX: e, deltaY: t, reversed: i, allowSpinX: o, allowSpinY: s, threshold: n = 0 }) => {
  const l = o && !s || s && !o ? 0 : n, r = Math.abs(e), a = Math.abs(t);
  return o && r - l > a ? i ? e > 0 ? "left" : "right" : e > 0 ? "right" : "left" : s && a - l > r ? i ? t > 0 ? "up" : "down" : t > 0 ? "down" : "up" : null;
}, To = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, Yo = (e, t = 150) => {
  let i;
  return function(...o) {
    clearTimeout(i), i = setTimeout(() => {
      e.apply(this, o);
    }, t);
  };
}, Ne = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHY9KHQsYSxlKT0+e2NvbnN0IHM9dC9lLG49YS9lO3JldHVybnt6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpufX0sej0oe3BvaW50ZXJYOnQscG9pbnRlclk6YSxpbWFnZURhdGE6ZSx6b29tZWRXaWR0aDpzLHpvb21lZEhlaWdodDpuLGRyYXdXaWR0aDppLGRyYXdIZWlnaHQ6Y30pPT57Y29uc3R7bmF0dXJhbFdpZHRoOmcsbmF0dXJhbEhlaWdodDp1fT1lO2xldCBmPXQvaSpnLXMvMixtPWEvYyp1LW4vMjtjb25zdCB4PU1hdGgubWF4KDAsZy1zKSxPPU1hdGgubWF4KDAsdS1uKTtyZXR1cm4gZj1NYXRoLm1heCgwLE1hdGgubWluKGYseCkpLG09TWF0aC5tYXgoMCxNYXRoLm1pbihtLE8pKSx7em9vbU9mZnNldFg6Zix6b29tT2Zmc2V0WTptfX07bGV0IG8saCxyLGQsbCx3O3NlbGYub25tZXNzYWdlPWFzeW5jIHQ9Pntjb25zdHthY3Rpb246YSxvZmZzY3JlZW46ZSxkZXZpY2VQaXhlbFJhdGlvOnMsaW1hZ2VEYXRhOm4sem9vbVNjYWxlOmkscG9pbnRlclg6Yyxwb2ludGVyWTpnLGltYWdlQXNwZWN0UmF0aW86dSxjb250YWluZXJXaWR0aDpmLGNvbnRhaW5lckhlaWdodDptfT10LmRhdGE7c3dpdGNoKGEpe2Nhc2UiaW5pdENhbnZhcyI6QyhlLHMpO2JyZWFrO2Nhc2UiYWRhcHRDYW52YXNTaXplIjpwKHUsZixtKTticmVhaztjYXNlImRyYXdJbWFnZU9uQ2FudmFzIjpJKG4saSxjLGcpO2JyZWFrfX07Y29uc3QgQz0odCxhKT0+e289dCxoPW8uZ2V0Q29udGV4dCgiMmQiKSxyPWF9LHA9KHQsYSxlKT0+e2NvbnN0IHM9YS9lO3c9dD5zLG8ud2lkdGg9YSpyLG8uaGVpZ2h0PWUqcixoLnNjYWxlKHIsciksdz8oZD1hLGw9YS90KToobD1lLGQ9ZSp0KSxoLmltYWdlU21vb3RoaW5nRW5hYmxlZD0hMCxoLmltYWdlU21vb3RoaW5nUXVhbGl0eT0iaGlnaCJ9LEk9KHQ9e30sYT0xLGU9MCxzPTApPT57Y29uc3R7Yml0bWFwSW1hZ2U6bn09dDtpZighb3x8IW4pcmV0dXJuO2xldCBpLGM7aWYodz8oaT0wLGM9KG8uaGVpZ2h0L3ItbCkvMik6KGk9KG8ud2lkdGgvci1kKS8yLGM9MCksaC5jbGVhclJlY3QoMCwwLG8ud2lkdGgsby5oZWlnaHQpLGEhPT0xKXtjb25zdHtuYXR1cmFsV2lkdGg6ZyxuYXR1cmFsSGVpZ2h0OnV9PXQse3pvb21lZFdpZHRoOmYsem9vbWVkSGVpZ2h0Om19PXYoZyx1LGEpLHt6b29tT2Zmc2V0WDp4LHpvb21PZmZzZXRZOk99PXooe3BvaW50ZXJYOmUscG9pbnRlclk6cyxpbWFnZURhdGE6dCx6b29tZWRXaWR0aDpmLHpvb21lZEhlaWdodDptLGRyYXdXaWR0aDpkLGRyYXdIZWlnaHQ6bH0pO2guZHJhd0ltYWdlKG4seCxPLGYsbSxpLGMsZCxsKX1lbHNlIGguZHJhd0ltYWdlKG4saSxjLGQsbCl9fSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FudmFzLndvcmtlci1DZzBma3BEMS5qcy5tYXAK", Xo = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0)), Le = typeof self < "u" && self.Blob && new Blob([Xo(Ne)], { type: "text/javascript;charset=utf-8" });
function Po(e) {
  let t;
  try {
    if (t = Le && (self.URL || self.webkitURL).createObjectURL(Le), !t) throw "";
    const i = new Worker(t, {
      name: e == null ? void 0 : e.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Ne,
      {
        name: e == null ? void 0 : e.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
const Ro = /* @__PURE__ */ new Set([
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
]), ke = {
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
}, Ho = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi
], Mo = (e) => {
  if (typeof e != "string")
    return "";
  const t = document.createElement("template");
  t.innerHTML = e;
  const i = (o) => {
    if (Array.from(o.childNodes).forEach(i), o.nodeType === Node.ELEMENT_NODE) {
      const n = o.tagName.toLowerCase();
      if (!Ro.has(n)) {
        if (n === "script" || n === "style") {
          o.remove();
          return;
        }
        const a = document.createTextNode(o.textContent);
        o.parentNode.replaceChild(a, o);
        return;
      }
      const l = [
        ...ke[n] || [],
        ...ke["*"] || []
      ];
      if (Array.from(o.attributes).forEach((a) => {
        const c = a.name.toLowerCase();
        if (c.startsWith("on")) {
          o.removeAttribute(a.name);
          return;
        }
        if (!l.includes(c)) {
          o.removeAttribute(a.name);
          return;
        }
        let h = a.value;
        Ho.forEach((p) => {
          p.test(h) && o.removeAttribute(a.name);
        });
      }), n === "a") {
        const a = o.getAttribute("href");
        a && (/^(https?:|mailto:|tel:|#|\/)/i.test(a.trim()) || o.removeAttribute("href")), o.getAttribute("target") === "_blank" && o.setAttribute("rel", "noopener noreferrer");
      }
      if (n === "img") {
        const a = o.getAttribute("src");
        a && (/^(https?:|\/|data:image\/)/i.test(a.trim()) || o.removeAttribute("src"));
      }
    }
  };
  return i(t.content), t.innerHTML;
}, Do = (e) => e === "x" ? P.X : P.Y, Zo = (e, t, i) => e.filter(
  (o) => Do(o.orientation) === i && t in o.positions
), Bo = (e, t) => {
  const i = document.createElement("button");
  return i.id = e, i.className = "cloudimage-360-hotspot", i.dataset.hotspotId = e, i.setAttribute("type", "button"), i.setAttribute("aria-label", t || `Hotspot ${e}`), i.setAttribute("aria-haspopup", "true"), i.setAttribute("aria-expanded", "false"), i;
}, Wo = (e) => {
  const t = Object.entries(e).sort(([n], [l]) => Number(n) - Number(l));
  let i = null, o = null;
  const s = {};
  for (const [n, l] of t)
    if (!l)
      s[n] = { x: i, y: o };
    else {
      const { x: r, y: a } = l;
      r != null && (i = r), a != null && (o = a), s[n] = {
        x: r || i,
        y: a || o
      };
    }
  return s;
}, Fo = (e) => [
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
], No = (e, t) => {
  const i = document.createElement("div");
  return i.className = "cloudimage-360-popper", i.id = `cloudimage-360-popper-${t}`, i.dataset.popperId = t, i.setAttribute("role", "tooltip"), i.setAttribute("aria-hidden", "false"), typeof e == "string" && /<\/?[a-z][\s\S]*>/i.test(e) ? i.innerHTML = Mo(e) : i.textContent = e, document.body.appendChild(i), i;
}, Vo = (e) => {
  const t = [...e];
  return t.forEach((i, o) => {
    const s = { ...Wo(i.positions) };
    t[o].initialPositions = s, t[o].positions = s;
  }), t;
}, jo = ({
  newWidth: e,
  newHeight: t,
  initialContainerSize: i,
  imageAspectRatio: o,
  hotspotsConfig: s
}) => {
  const [n, l] = i;
  let r = e, a = t, c = 0, h = 0;
  const p = e / t;
  o > p ? (a = e / o, h = (t - a) / 2) : (r = t * o, c = (e - r) / 2);
  const u = r / n, I = a / l;
  return s.map((g) => {
    const v = {};
    return Object.entries(g.initialPositions).forEach(([m, b]) => {
      v[m] = {
        x: b.x * u + c,
        y: b.y * I + h
      };
    }), { ...g, positions: v };
  });
};
var M = "top", F = "bottom", N = "right", D = "left", ee = "auto", kt = [M, F, N, D], dt = "start", At = "end", $o = "clippingParents", Ve = "viewport", Ct = "popper", zo = "reference", Te = /* @__PURE__ */ kt.reduce(function(e, t) {
  return e.concat([t + "-" + dt, t + "-" + At]);
}, []), je = /* @__PURE__ */ [].concat(kt, [ee]).reduce(function(e, t) {
  return e.concat([t, t + "-" + dt, t + "-" + At]);
}, []), Go = "beforeRead", Uo = "read", Ko = "afterRead", _o = "beforeMain", Jo = "main", qo = "afterMain", Qo = "beforeWrite", ts = "write", es = "afterWrite", is = [Go, Uo, Ko, _o, Jo, qo, Qo, ts, es];
function z(e) {
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
function ie(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = B(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function os(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(i) {
    var o = t.styles[i] || {}, s = t.attributes[i] || {}, n = t.elements[i];
    !W(n) || !z(n) || (Object.assign(n.style, o), Object.keys(s).forEach(function(l) {
      var r = s[l];
      r === !1 ? n.removeAttribute(l) : n.setAttribute(l, r === !0 ? "" : r);
    }));
  });
}
function ss(e) {
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
      var s = t.elements[o], n = t.attributes[o] || {}, l = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : i[o]), r = l.reduce(function(a, c) {
        return a[c] = "", a;
      }, {});
      !W(s) || !z(s) || (Object.assign(s.style, r), Object.keys(n).forEach(function(a) {
        s.removeAttribute(a);
      }));
    });
  };
}
const ns = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: os,
  effect: ss,
  requires: ["computeStyles"]
};
function $(e) {
  return e.split("-")[0];
}
var ot = Math.max, Ft = Math.min, ut = Math.round;
function Qt() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function $e() {
  return !/^((?!chrome|android).)*safari/i.test(Qt());
}
function pt(e, t, i) {
  t === void 0 && (t = !1), i === void 0 && (i = !1);
  var o = e.getBoundingClientRect(), s = 1, n = 1;
  t && W(e) && (s = e.offsetWidth > 0 && ut(o.width) / e.offsetWidth || 1, n = e.offsetHeight > 0 && ut(o.height) / e.offsetHeight || 1);
  var l = st(e) ? B(e) : window, r = l.visualViewport, a = !$e() && i, c = (o.left + (a && r ? r.offsetLeft : 0)) / s, h = (o.top + (a && r ? r.offsetTop : 0)) / n, p = o.width / s, f = o.height / n;
  return {
    width: p,
    height: f,
    top: h,
    right: c + p,
    bottom: h + f,
    left: c,
    x: c,
    y: h
  };
}
function oe(e) {
  var t = pt(e), i = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: i,
    height: o
  };
}
function ze(e, t) {
  var i = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (i && ie(i)) {
    var o = t;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function J(e) {
  return B(e).getComputedStyle(e);
}
function rs(e) {
  return ["table", "td", "th"].indexOf(z(e)) >= 0;
}
function Q(e) {
  return ((st(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Vt(e) {
  return z(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ie(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Q(e)
  );
}
function Ye(e) {
  return !W(e) || // https://github.com/popperjs/popper-core/issues/837
  J(e).position === "fixed" ? null : e.offsetParent;
}
function as(e) {
  var t = /firefox/i.test(Qt()), i = /Trident/i.test(Qt());
  if (i && W(e)) {
    var o = J(e);
    if (o.position === "fixed")
      return null;
  }
  var s = Vt(e);
  for (ie(s) && (s = s.host); W(s) && ["html", "body"].indexOf(z(s)) < 0; ) {
    var n = J(s);
    if (n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].indexOf(n.willChange) !== -1 || t && n.willChange === "filter" || t && n.filter && n.filter !== "none")
      return s;
    s = s.parentNode;
  }
  return null;
}
function Tt(e) {
  for (var t = B(e), i = Ye(e); i && rs(i) && J(i).position === "static"; )
    i = Ye(i);
  return i && (z(i) === "html" || z(i) === "body" && J(i).position === "static") ? t : i || as(e) || t;
}
function se(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Et(e, t, i) {
  return ot(e, Ft(t, i));
}
function ls(e, t, i) {
  var o = Et(e, t, i);
  return o > i ? i : o;
}
function Ge() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ue(e) {
  return Object.assign({}, Ge(), e);
}
function Ke(e, t) {
  return t.reduce(function(i, o) {
    return i[o] = e, i;
  }, {});
}
var cs = function(t, i) {
  return t = typeof t == "function" ? t(Object.assign({}, i.rects, {
    placement: i.placement
  })) : t, Ue(typeof t != "number" ? t : Ke(t, kt));
};
function hs(e) {
  var t, i = e.state, o = e.name, s = e.options, n = i.elements.arrow, l = i.modifiersData.popperOffsets, r = $(i.placement), a = se(r), c = [D, N].indexOf(r) >= 0, h = c ? "height" : "width";
  if (!(!n || !l)) {
    var p = cs(s.padding, i), f = oe(n), u = a === "y" ? M : D, I = a === "y" ? F : N, g = i.rects.reference[h] + i.rects.reference[a] - l[a] - i.rects.popper[h], v = l[a] - i.rects.reference[a], m = Tt(n), b = m ? a === "y" ? m.clientHeight || 0 : m.clientWidth || 0 : 0, x = g / 2 - v / 2, w = p[u], C = b - f[h] - p[I], y = b / 2 - f[h] / 2 + x, O = Et(w, y, C), S = a;
    i.modifiersData[o] = (t = {}, t[S] = O, t.centerOffset = O - y, t);
  }
}
function ds(e) {
  var t = e.state, i = e.options, o = i.element, s = o === void 0 ? "[data-popper-arrow]" : o;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || ze(t.elements.popper, s) && (t.elements.arrow = s));
}
const us = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: hs,
  effect: ds,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ft(e) {
  return e.split("-")[1];
}
var ps = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function fs(e, t) {
  var i = e.x, o = e.y, s = t.devicePixelRatio || 1;
  return {
    x: ut(i * s) / s || 0,
    y: ut(o * s) / s || 0
  };
}
function Xe(e) {
  var t, i = e.popper, o = e.popperRect, s = e.placement, n = e.variation, l = e.offsets, r = e.position, a = e.gpuAcceleration, c = e.adaptive, h = e.roundOffsets, p = e.isFixed, f = l.x, u = f === void 0 ? 0 : f, I = l.y, g = I === void 0 ? 0 : I, v = typeof h == "function" ? h({
    x: u,
    y: g
  }) : {
    x: u,
    y: g
  };
  u = v.x, g = v.y;
  var m = l.hasOwnProperty("x"), b = l.hasOwnProperty("y"), x = D, w = M, C = window;
  if (c) {
    var y = Tt(i), O = "clientHeight", S = "clientWidth";
    if (y === B(i) && (y = Q(i), J(y).position !== "static" && r === "absolute" && (O = "scrollHeight", S = "scrollWidth")), y = y, s === M || (s === D || s === N) && n === At) {
      w = F;
      var E = p && y === C && C.visualViewport ? C.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        y[O]
      );
      g -= E - o.height, g *= a ? 1 : -1;
    }
    if (s === D || (s === M || s === F) && n === At) {
      x = N;
      var A = p && y === C && C.visualViewport ? C.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        y[S]
      );
      u -= A - o.width, u *= a ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: r
  }, c && ps), R = h === !0 ? fs({
    x: u,
    y: g
  }, B(i)) : {
    x: u,
    y: g
  };
  if (u = R.x, g = R.y, a) {
    var T;
    return Object.assign({}, k, (T = {}, T[w] = b ? "0" : "", T[x] = m ? "0" : "", T.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + g + "px)" : "translate3d(" + u + "px, " + g + "px, 0)", T));
  }
  return Object.assign({}, k, (t = {}, t[w] = b ? g + "px" : "", t[x] = m ? u + "px" : "", t.transform = "", t));
}
function ms(e) {
  var t = e.state, i = e.options, o = i.gpuAcceleration, s = o === void 0 ? !0 : o, n = i.adaptive, l = n === void 0 ? !0 : n, r = i.roundOffsets, a = r === void 0 ? !0 : r, c = {
    placement: $(t.placement),
    variation: ft(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: s,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Xe(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: l,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Xe(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const vs = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ms,
  data: {}
};
var Zt = {
  passive: !0
};
function gs(e) {
  var t = e.state, i = e.instance, o = e.options, s = o.scroll, n = s === void 0 ? !0 : s, l = o.resize, r = l === void 0 ? !0 : l, a = B(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return n && c.forEach(function(h) {
    h.addEventListener("scroll", i.update, Zt);
  }), r && a.addEventListener("resize", i.update, Zt), function() {
    n && c.forEach(function(h) {
      h.removeEventListener("scroll", i.update, Zt);
    }), r && a.removeEventListener("resize", i.update, Zt);
  };
}
const ys = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: gs,
  data: {}
};
var bs = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Bt(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return bs[t];
  });
}
var ws = {
  start: "end",
  end: "start"
};
function Pe(e) {
  return e.replace(/start|end/g, function(t) {
    return ws[t];
  });
}
function ne(e) {
  var t = B(e), i = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: i,
    scrollTop: o
  };
}
function re(e) {
  return pt(Q(e)).left + ne(e).scrollLeft;
}
function Is(e, t) {
  var i = B(e), o = Q(e), s = i.visualViewport, n = o.clientWidth, l = o.clientHeight, r = 0, a = 0;
  if (s) {
    n = s.width, l = s.height;
    var c = $e();
    (c || !c && t === "fixed") && (r = s.offsetLeft, a = s.offsetTop);
  }
  return {
    width: n,
    height: l,
    x: r + re(e),
    y: a
  };
}
function xs(e) {
  var t, i = Q(e), o = ne(e), s = (t = e.ownerDocument) == null ? void 0 : t.body, n = ot(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), l = ot(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), r = -o.scrollLeft + re(e), a = -o.scrollTop;
  return J(s || i).direction === "rtl" && (r += ot(i.clientWidth, s ? s.clientWidth : 0) - n), {
    width: n,
    height: l,
    x: r,
    y: a
  };
}
function ae(e) {
  var t = J(e), i = t.overflow, o = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(i + s + o);
}
function _e(e) {
  return ["html", "body", "#document"].indexOf(z(e)) >= 0 ? e.ownerDocument.body : W(e) && ae(e) ? e : _e(Vt(e));
}
function St(e, t) {
  var i;
  t === void 0 && (t = []);
  var o = _e(e), s = o === ((i = e.ownerDocument) == null ? void 0 : i.body), n = B(o), l = s ? [n].concat(n.visualViewport || [], ae(o) ? o : []) : o, r = t.concat(l);
  return s ? r : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    r.concat(St(Vt(l)))
  );
}
function te(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Cs(e, t) {
  var i = pt(e, !1, t === "fixed");
  return i.top = i.top + e.clientTop, i.left = i.left + e.clientLeft, i.bottom = i.top + e.clientHeight, i.right = i.left + e.clientWidth, i.width = e.clientWidth, i.height = e.clientHeight, i.x = i.left, i.y = i.top, i;
}
function Re(e, t, i) {
  return t === Ve ? te(Is(e, i)) : st(t) ? Cs(t, i) : te(xs(Q(e)));
}
function Os(e) {
  var t = St(Vt(e)), i = ["absolute", "fixed"].indexOf(J(e).position) >= 0, o = i && W(e) ? Tt(e) : e;
  return st(o) ? t.filter(function(s) {
    return st(s) && ze(s, o) && z(s) !== "body";
  }) : [];
}
function Es(e, t, i, o) {
  var s = t === "clippingParents" ? Os(e) : [].concat(t), n = [].concat(s, [i]), l = n[0], r = n.reduce(function(a, c) {
    var h = Re(e, c, o);
    return a.top = ot(h.top, a.top), a.right = Ft(h.right, a.right), a.bottom = Ft(h.bottom, a.bottom), a.left = ot(h.left, a.left), a;
  }, Re(e, l, o));
  return r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
function Je(e) {
  var t = e.reference, i = e.element, o = e.placement, s = o ? $(o) : null, n = o ? ft(o) : null, l = t.x + t.width / 2 - i.width / 2, r = t.y + t.height / 2 - i.height / 2, a;
  switch (s) {
    case M:
      a = {
        x: l,
        y: t.y - i.height
      };
      break;
    case F:
      a = {
        x: l,
        y: t.y + t.height
      };
      break;
    case N:
      a = {
        x: t.x + t.width,
        y: r
      };
      break;
    case D:
      a = {
        x: t.x - i.width,
        y: r
      };
      break;
    default:
      a = {
        x: t.x,
        y: t.y
      };
  }
  var c = s ? se(s) : null;
  if (c != null) {
    var h = c === "y" ? "height" : "width";
    switch (n) {
      case dt:
        a[c] = a[c] - (t[h] / 2 - i[h] / 2);
        break;
      case At:
        a[c] = a[c] + (t[h] / 2 - i[h] / 2);
        break;
    }
  }
  return a;
}
function Lt(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = o === void 0 ? e.placement : o, n = i.strategy, l = n === void 0 ? e.strategy : n, r = i.boundary, a = r === void 0 ? $o : r, c = i.rootBoundary, h = c === void 0 ? Ve : c, p = i.elementContext, f = p === void 0 ? Ct : p, u = i.altBoundary, I = u === void 0 ? !1 : u, g = i.padding, v = g === void 0 ? 0 : g, m = Ue(typeof v != "number" ? v : Ke(v, kt)), b = f === Ct ? zo : Ct, x = e.rects.popper, w = e.elements[I ? b : f], C = Es(st(w) ? w : w.contextElement || Q(e.elements.popper), a, h, l), y = pt(e.elements.reference), O = Je({
    reference: y,
    element: x,
    placement: s
  }), S = te(Object.assign({}, x, O)), E = f === Ct ? S : y, A = {
    top: C.top - E.top + m.top,
    bottom: E.bottom - C.bottom + m.bottom,
    left: C.left - E.left + m.left,
    right: E.right - C.right + m.right
  }, k = e.modifiersData.offset;
  if (f === Ct && k) {
    var R = k[s];
    Object.keys(A).forEach(function(T) {
      var G = [N, F].indexOf(T) >= 0 ? 1 : -1, U = [M, F].indexOf(T) >= 0 ? "y" : "x";
      A[T] += R[U] * G;
    });
  }
  return A;
}
function Ss(e, t) {
  t === void 0 && (t = {});
  var i = t, o = i.placement, s = i.boundary, n = i.rootBoundary, l = i.padding, r = i.flipVariations, a = i.allowedAutoPlacements, c = a === void 0 ? je : a, h = ft(o), p = h ? r ? Te : Te.filter(function(I) {
    return ft(I) === h;
  }) : kt, f = p.filter(function(I) {
    return c.indexOf(I) >= 0;
  });
  f.length === 0 && (f = p);
  var u = f.reduce(function(I, g) {
    return I[g] = Lt(e, {
      placement: g,
      boundary: s,
      rootBoundary: n,
      padding: l
    })[$(g)], I;
  }, {});
  return Object.keys(u).sort(function(I, g) {
    return u[I] - u[g];
  });
}
function As(e) {
  if ($(e) === ee)
    return [];
  var t = Bt(e);
  return [Pe(e), t, Pe(t)];
}
function Ls(e) {
  var t = e.state, i = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var s = i.mainAxis, n = s === void 0 ? !0 : s, l = i.altAxis, r = l === void 0 ? !0 : l, a = i.fallbackPlacements, c = i.padding, h = i.boundary, p = i.rootBoundary, f = i.altBoundary, u = i.flipVariations, I = u === void 0 ? !0 : u, g = i.allowedAutoPlacements, v = t.options.placement, m = $(v), b = m === v, x = a || (b || !I ? [Bt(v)] : As(v)), w = [v].concat(x).reduce(function(q, V) {
      return q.concat($(V) === ee ? Ss(t, {
        placement: V,
        boundary: h,
        rootBoundary: p,
        padding: c,
        flipVariations: I,
        allowedAutoPlacements: g
      }) : V);
    }, []), C = t.rects.reference, y = t.rects.popper, O = /* @__PURE__ */ new Map(), S = !0, E = w[0], A = 0; A < w.length; A++) {
      var k = w[A], R = $(k), T = ft(k) === dt, G = [M, F].indexOf(R) >= 0, U = G ? "width" : "height", Y = Lt(t, {
        placement: k,
        boundary: h,
        rootBoundary: p,
        altBoundary: f,
        padding: c
      }), Z = G ? T ? N : D : T ? F : M;
      C[U] > y[U] && (Z = Bt(Z));
      var nt = Bt(Z), K = [];
      if (n && K.push(Y[R] <= 0), r && K.push(Y[Z] <= 0, Y[nt] <= 0), K.every(function(q) {
        return q;
      })) {
        E = k, S = !1;
        break;
      }
      O.set(k, K);
    }
    if (S)
      for (var rt = I ? 3 : 1, mt = function(V) {
        var et = w.find(function(lt) {
          var j = O.get(lt);
          if (j)
            return j.slice(0, V).every(function(vt) {
              return vt;
            });
        });
        if (et)
          return E = et, "break";
      }, tt = rt; tt > 0; tt--) {
        var at = mt(tt);
        if (at === "break") break;
      }
    t.placement !== E && (t.modifiersData[o]._skip = !0, t.placement = E, t.reset = !0);
  }
}
const ks = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ls,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function He(e, t, i) {
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
function Me(e) {
  return [M, N, F, D].some(function(t) {
    return e[t] >= 0;
  });
}
function Ts(e) {
  var t = e.state, i = e.name, o = t.rects.reference, s = t.rects.popper, n = t.modifiersData.preventOverflow, l = Lt(t, {
    elementContext: "reference"
  }), r = Lt(t, {
    altBoundary: !0
  }), a = He(l, o), c = He(r, s, n), h = Me(a), p = Me(c);
  t.modifiersData[i] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: c,
    isReferenceHidden: h,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": p
  });
}
const Ys = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Ts
};
function Xs(e, t, i) {
  var o = $(e), s = [D, M].indexOf(o) >= 0 ? -1 : 1, n = typeof i == "function" ? i(Object.assign({}, t, {
    placement: e
  })) : i, l = n[0], r = n[1];
  return l = l || 0, r = (r || 0) * s, [D, N].indexOf(o) >= 0 ? {
    x: r,
    y: l
  } : {
    x: l,
    y: r
  };
}
function Ps(e) {
  var t = e.state, i = e.options, o = e.name, s = i.offset, n = s === void 0 ? [0, 0] : s, l = je.reduce(function(h, p) {
    return h[p] = Xs(p, t.rects, n), h;
  }, {}), r = l[t.placement], a = r.x, c = r.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += c), t.modifiersData[o] = l;
}
const Rs = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ps
};
function Hs(e) {
  var t = e.state, i = e.name;
  t.modifiersData[i] = Je({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Ms = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Hs,
  data: {}
};
function Ds(e) {
  return e === "x" ? "y" : "x";
}
function Zs(e) {
  var t = e.state, i = e.options, o = e.name, s = i.mainAxis, n = s === void 0 ? !0 : s, l = i.altAxis, r = l === void 0 ? !1 : l, a = i.boundary, c = i.rootBoundary, h = i.altBoundary, p = i.padding, f = i.tether, u = f === void 0 ? !0 : f, I = i.tetherOffset, g = I === void 0 ? 0 : I, v = Lt(t, {
    boundary: a,
    rootBoundary: c,
    padding: p,
    altBoundary: h
  }), m = $(t.placement), b = ft(t.placement), x = !b, w = se(m), C = Ds(w), y = t.modifiersData.popperOffsets, O = t.rects.reference, S = t.rects.popper, E = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, A = typeof E == "number" ? {
    mainAxis: E,
    altAxis: E
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, E), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (y) {
    if (n) {
      var T, G = w === "y" ? M : D, U = w === "y" ? F : N, Y = w === "y" ? "height" : "width", Z = y[w], nt = Z + v[G], K = Z - v[U], rt = u ? -S[Y] / 2 : 0, mt = b === dt ? O[Y] : S[Y], tt = b === dt ? -S[Y] : -O[Y], at = t.elements.arrow, q = u && at ? oe(at) : {
        width: 0,
        height: 0
      }, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ge(), et = V[G], lt = V[U], j = Et(0, O[Y], q[Y]), vt = x ? O[Y] / 2 - rt - j - et - A.mainAxis : mt - j - et - A.mainAxis, Yt = x ? -O[Y] / 2 + rt + j + lt + A.mainAxis : tt + j + lt + A.mainAxis, gt = t.elements.arrow && Tt(t.elements.arrow), jt = gt ? w === "y" ? gt.clientTop || 0 : gt.clientLeft || 0 : 0, Xt = (T = k == null ? void 0 : k[w]) != null ? T : 0, $t = Z + vt - Xt - jt, zt = Z + Yt - Xt, Pt = Et(u ? Ft(nt, $t) : nt, Z, u ? ot(K, zt) : K);
      y[w] = Pt, R[w] = Pt - Z;
    }
    if (r) {
      var Rt, Gt = w === "x" ? M : D, Ut = w === "x" ? F : N, _ = y[C], ct = C === "y" ? "height" : "width", Ht = _ + v[Gt], yt = _ - v[Ut], it = [M, D].indexOf(m) !== -1, ht = (Rt = k == null ? void 0 : k[C]) != null ? Rt : 0, bt = it ? Ht : _ - O[ct] - S[ct] - ht + A.altAxis, wt = it ? _ + O[ct] + S[ct] - ht - A.altAxis : yt, It = u && it ? ls(bt, _, wt) : Et(u ? bt : Ht, _, u ? wt : yt);
      y[C] = It, R[C] = It - _;
    }
    t.modifiersData[o] = R;
  }
}
const Bs = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Zs,
  requiresIfExists: ["offset"]
};
function Ws(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Fs(e) {
  return e === B(e) || !W(e) ? ne(e) : Ws(e);
}
function Ns(e) {
  var t = e.getBoundingClientRect(), i = ut(t.width) / e.offsetWidth || 1, o = ut(t.height) / e.offsetHeight || 1;
  return i !== 1 || o !== 1;
}
function Vs(e, t, i) {
  i === void 0 && (i = !1);
  var o = W(t), s = W(t) && Ns(t), n = Q(t), l = pt(e, s, i), r = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (o || !o && !i) && ((z(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ae(n)) && (r = Fs(t)), W(t) ? (a = pt(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : n && (a.x = re(n))), {
    x: l.left + r.scrollLeft - a.x,
    y: l.top + r.scrollTop - a.y,
    width: l.width,
    height: l.height
  };
}
function js(e) {
  var t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(n) {
    t.set(n.name, n);
  });
  function s(n) {
    i.add(n.name);
    var l = [].concat(n.requires || [], n.requiresIfExists || []);
    l.forEach(function(r) {
      if (!i.has(r)) {
        var a = t.get(r);
        a && s(a);
      }
    }), o.push(n);
  }
  return e.forEach(function(n) {
    i.has(n.name) || s(n);
  }), o;
}
function $s(e) {
  var t = js(e);
  return is.reduce(function(i, o) {
    return i.concat(t.filter(function(s) {
      return s.phase === o;
    }));
  }, []);
}
function zs(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(i) {
      Promise.resolve().then(function() {
        t = void 0, i(e());
      });
    })), t;
  };
}
function Gs(e) {
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
var De = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ze() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Us(e) {
  e === void 0 && (e = {});
  var t = e, i = t.defaultModifiers, o = i === void 0 ? [] : i, s = t.defaultOptions, n = s === void 0 ? De : s;
  return function(r, a, c) {
    c === void 0 && (c = n);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, De, n),
      modifiersData: {},
      elements: {
        reference: r,
        popper: a
      },
      attributes: {},
      styles: {}
    }, p = [], f = !1, u = {
      state: h,
      setOptions: function(m) {
        var b = typeof m == "function" ? m(h.options) : m;
        g(), h.options = Object.assign({}, n, h.options, b), h.scrollParents = {
          reference: st(r) ? St(r) : r.contextElement ? St(r.contextElement) : [],
          popper: St(a)
        };
        var x = $s(Gs([].concat(o, h.options.modifiers)));
        return h.orderedModifiers = x.filter(function(w) {
          return w.enabled;
        }), I(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var m = h.elements, b = m.reference, x = m.popper;
          if (Ze(b, x)) {
            h.rects = {
              reference: Vs(b, Tt(x), h.options.strategy === "fixed"),
              popper: oe(x)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(A) {
              return h.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var w = 0; w < h.orderedModifiers.length; w++) {
              if (h.reset === !0) {
                h.reset = !1, w = -1;
                continue;
              }
              var C = h.orderedModifiers[w], y = C.fn, O = C.options, S = O === void 0 ? {} : O, E = C.name;
              typeof y == "function" && (h = y({
                state: h,
                options: S,
                name: E,
                instance: u
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: zs(function() {
        return new Promise(function(v) {
          u.forceUpdate(), v(h);
        });
      }),
      destroy: function() {
        g(), f = !0;
      }
    };
    if (!Ze(r, a))
      return u;
    u.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function I() {
      h.orderedModifiers.forEach(function(v) {
        var m = v.name, b = v.options, x = b === void 0 ? {} : b, w = v.effect;
        if (typeof w == "function") {
          var C = w({
            state: h,
            name: m,
            instance: u,
            options: x
          }), y = function() {
          };
          p.push(C || y);
        }
      });
    }
    function g() {
      p.forEach(function(v) {
        return v();
      }), p = [];
    }
    return u;
  };
}
var Ks = [ys, Ms, vs, ns, Rs, ks, Bs, us, Ys], _s = /* @__PURE__ */ Us({
  defaultModifiers: Ks
});
class Js {
  /**
   * @param {Array} hotspotsConfig - Hotspot configuration array
   * @param {HTMLElement} container - Container element
   * @param {number} imageAspectRatio - Image aspect ratio
   * @param {Object} options - Additional options
   * @param {string} options.trigger - 'hover' or 'click' (default: 'hover')
   */
  constructor(t, i, o, s = {}) {
    ce(this, "updateHotspotPosition", (t, i) => {
      this.currentActiveIndex = t, this.currentOrientation = i;
      const o = Zo(this.hotspotsConfig, t, i);
      this.hideHotspots(), o.forEach((s) => this.updateAndShowHotspot(s, t));
    });
    this.container = i, this.popper = null, this.popperInstance = null, this.hotspotsContainer = to(this.container), this.hotspotsConfig = Vo(t), this.shouldHidePopper = !0, this.hidePopper = this.hidePopper.bind(this), this.forceHidePopper = this.forceHidePopper.bind(this), this.imageAspectRatio = o, this.hotspotElements = /* @__PURE__ */ new Map(), this.popperListeners = [], this.trigger = s.trigger || "hover";
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
    this.hotspotsConfig = jo({
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
      modifiers: Fo(this.container)
    };
    this.popper = No(i, o), this.popper.setAttribute("data-show", ""), this.currentHotspotElement = t, t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-describedby", `cloudimage-360-popper-${o}`);
    const l = () => {
      this.shouldHidePopper = !1;
    }, r = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, a = () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    }, c = () => {
      this.shouldHidePopper = !1, this.hidePopperTimeout && clearTimeout(this.hidePopperTimeout);
    };
    this.popper.addEventListener("mouseenter", l), this.popper.addEventListener("mouseleave", r), t.addEventListener("mouseleave", a), t.addEventListener("mouseenter", c), this.popperListeners.push(
      { element: this.popper, event: "mouseenter", handler: l },
      { element: this.popper, event: "mouseleave", handler: r },
      { element: t, event: "mouseleave", handler: a },
      { element: t, event: "mouseenter", handler: c }
    ), this.popperInstance = {
      ..._s(t, this.popper, n),
      keepOpen: s,
      instanceId: o
    };
  }
  checkAndHidePopper() {
    var t;
    this.shouldHidePopper && !((t = this.popperInstance) != null && t.keepOpen) && (this.hidePopperTimeout = setTimeout(() => {
      this.shouldHidePopper && this.hidePopper();
    }, Si));
  }
  hidePopper() {
    if (this.hidePopperTimeout && (clearTimeout(this.hidePopperTimeout), this.hidePopperTimeout = null), this.cleanupPopperListeners(), this.currentHotspotElement && (this.currentHotspotElement.setAttribute("aria-expanded", "false"), this.currentHotspotElement.removeAttribute("aria-describedby"), this.currentHotspotElement = null), this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null), this.popper) {
      this.popper.removeAttribute("data-show"), this.popper.setAttribute("aria-hidden", "true");
      const t = this.popper;
      this.popper = null, setTimeout(() => {
        t.remove();
      }, Ai);
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
    const { id: i, content: o, keepOpen: s, onClick: n, label: l } = t, r = Bo(i, l);
    (n || o && this.trigger === "click") && (r.style.cursor = "pointer"), r.onclick = (a) => {
      var c;
      a.stopPropagation(), o && this.trigger === "click" && (((c = this.popperInstance) == null ? void 0 : c.instanceId) === i ? this.hidePopper() : this.showPopper({ hotspotElement: r, content: o, id: i, keepOpen: s })), n == null || n(a, this.popperInstance, i);
    }, o && (this.trigger === "hover" && (r.addEventListener(
      "mouseenter",
      () => this.showPopper({ hotspotElement: r, content: o, id: i, keepOpen: s })
    ), r.addEventListener("mouseleave", () => {
      this.shouldHidePopper = !0, this.checkAndHidePopper();
    })), r.addEventListener(
      "focus",
      () => this.showPopper({ hotspotElement: r, content: o, id: i, keepOpen: s })
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
    const { positions: o, id: s } = t, { x: n, y: l } = o[i] ?? {}, r = this.hotspotsContainer.querySelector(`[data-hotspot-id="${s}"]`);
    r && (r.style.translate = `${n}px ${l}px`, r.style.opacity = 1, r.style.pointerEvents = "all");
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
class Nt {
  constructor(t, i, o) {
    this.container = t, this.isClicked = !1, this.fullscreenView = !!o, this.imagesX = [], this.imagesY = [], this.devicePixelRatio = Math.round(window.devicePixelRatio || 1), this.id = t.id, this.movementStart = { x: 0, y: 0 }, this.draggingDirection = null, this.isReady = !1, this.velocityX = 0, this.velocityY = 0, this.lastDragTime = 0, this.lastDragX = 0, this.lastDragY = 0, this.inertiaAnimationId = null, this.hasInteracted = !1, this.currentZoomScale = 1, this.touchDevice = To(), this.dragJustEnded = !1, this.isPinching = !1, this.initialPinchDistance = 0, this.pinchZoomLevel = 1, this.pinchZoomEmitted = !1, this.lastEmittedZoom = 1, this.panOffsetX = 0, this.panOffsetY = 0, this.canvasWorker = new Po(), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null, this.isAnimatingToFrame = !1, this.onMoveHandler = this.onMoveHandler.bind(this), this.destroy = this.destroy.bind(this), this.init(this.container, i);
  }
  emit(t, i = {}) {
    const o = this[t];
    typeof o == "function" && o({ ...i, viewerId: this.id });
  }
  announce(t) {
    io(this.ariaLiveRegion, t);
  }
  mouseDown(t) {
    if (!this.isReady || this.glass) return;
    const { pageX: i, pageY: o } = t;
    this.hideHints(), this.hideHotspotPopper(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.autoplayJustStopped = !1, (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1, this.autoplayJustStopped = !0), this.movementStart = { x: i, y: o }, this.isClicked = !0, this.isDragging = !1, this.inertia && (this.velocityX = 0, this.velocityY = 0, this.lastDragTime = performance.now(), this.lastDragX = i, this.lastDragY = o);
  }
  mouseUp() {
    this.isReady && (!this.isZoomed && !this.autoplayJustStopped && this.showAllIcons(), this.inertia && this.isDragging && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) && this.startInertia(), this.isDragging && (this.emit("onDragEnd"), this.dragJustEnded = !0), this.movementStart = { x: 0, y: 0 }, this.isClicked = !1, this.isDragging = !1, this.innerBox.style.cursor = "grab");
  }
  startInertia() {
    const o = this.fullscreenView ? document.body : this.container, s = this.dragSpeed / me, n = s * (this.amountX / o.offsetWidth), l = s * (this.amountY / o.offsetHeight), r = () => {
      if (this.velocityX *= 0.95, this.velocityY *= 0.95, Math.abs(this.velocityX) < 0.01 && Math.abs(this.velocityY) < 0.01) {
        this.inertiaAnimationId = null;
        return;
      }
      const a = this.velocityX * 16, c = this.velocityY * 16, h = Ae({
        deltaX: a,
        deltaY: c,
        reversed: this.dragReverse,
        allowSpinX: this.allowSpinX,
        allowSpinY: this.allowSpinY
      });
      if (h) {
        const p = this.allowSpinX ? Math.max(1, Math.abs(Math.round(a * n))) : 0, f = this.allowSpinY ? Math.max(1, Math.abs(Math.round(c * l))) : 0;
        (p > 0 || f > 0) && this.onMoveHandler(h, p, f);
      }
      this.inertiaAnimationId = requestAnimationFrame(r);
    };
    this.inertiaAnimationId = requestAnimationFrame(r);
  }
  drag(t, i) {
    if (!this.isReady || !this.isClicked) return;
    const o = t - this.movementStart.x, s = i - this.movementStart.y;
    if (this.inertia) {
      const f = performance.now(), u = f - this.lastDragTime;
      u > 0 && u < 100 && (this.velocityX = (t - this.lastDragX) / u, this.velocityY = (i - this.lastDragY) / u), this.lastDragTime = f, this.lastDragX = t, this.lastDragY = i;
    }
    this.draggingDirection = Ae({
      deltaX: o,
      deltaY: s,
      reversed: this.dragReverse,
      allowSpinX: this.allowSpinX,
      allowSpinY: this.allowSpinY
    }) || this.draggingDirection;
    const n = this.fullscreenView ? document.body : this.container, l = this.dragSpeed / me, r = l * (this.amountX / n.offsetWidth), a = l * (this.amountY / n.offsetHeight), c = this.allowSpinX ? Math.abs(Math.round(o * r)) : 0, h = this.allowSpinY ? Math.abs(Math.round(s * a)) : 0;
    (this.allowSpinX && c !== 0 || this.allowSpinY && h !== 0) && (this.hasInteracted = !0, this.hideHotspotPopper(), this.onMoveHandler(this.draggingDirection, c, h), this.movementStart = { x: t, y: i }, setTimeout(() => {
      this.isDragging || (this.isDragging = !0, this.emit("onDragStart"));
    }, Ei));
  }
  mouseMove(t) {
    !this.isReady || !this.isClicked && !this.isZoomed || this.glass || (this.hideAllIcons(), this.drag(t.pageX, t.pageY), this.isZoomed && this.applyZoom(t));
  }
  mouseClick(t) {
    if (!(!this.isReady || this.isDragging)) {
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
      this.pointerZoom && !this.glass && !this.touchDevice && this.toggleZoom(t);
    }
  }
  loadHigherQualityImages(t, i) {
    const o = Ot(this.srcXConfig, t), s = this.allowSpinY ? Ot(this.srcYConfig, t) : null;
    ge({
      cdnPathX: o,
      cdnPathY: s,
      configX: this.srcXConfig,
      configY: this.srcYConfig,
      onAllImagesLoad: (n, l) => {
        this.imagesX = n, this.imagesY = l, i();
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
      }, fe);
    else {
      let i = (this.fullscreenView || this.pointerZoom ? document.body : this.container).offsetWidth;
      this.hideHotspots(), this.showLoadingSpinner(), this.loadHigherQualityImages(i, () => {
        this.showTransitionOverlay(), setTimeout(() => {
          this.applyZoom(t);
        }, fe);
      });
    }
  }
  removeZoom() {
    this.isZoomed = !1, this.updateView(), this.showAllIcons(), this.hideTransitionOverlay(), this.emit("onZoomOut"), this.announce("Zoomed out");
  }
  mouseLeave() {
    this.isZoomed && this.removeZoom();
  }
  applyZoom(t) {
    const { offsetX: i, offsetY: o } = Oo(t, this.canvas, this.devicePixelRatio);
    this.isZoomed = !0, this.hideAllIcons(), this.hideLoadingSpinner(), this.hideTransitionOverlay(), this.updateView(this.pointerZoom, i, o), this.emit("onZoomIn", { zoomLevel: this.pointerZoom }), this.announce("Zoomed in. Move mouse to pan. Click to zoom out.");
  }
  touchOutside(t) {
    if (!this.glass) return;
    !this.canvas.contains(t.target) && this.removeGlass();
  }
  touchStart(t) {
    if (!this.isReady || this.glass || !t.touches || !t.touches.length) return;
    const i = t.target;
    if (i && i.closest && i.closest(".cloudimage-360-button")) return;
    if (this.hideHints(), t.touches.length === 2 && this.pinchZoom && !this.isDragging) {
      t.preventDefault(), this.isPinching = !0, this.isClicked = !1, this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null);
      const n = t.touches[0], l = t.touches[1];
      if (this.initialPinchDistance = this.getPinchDistance(n, l), (this.autoplay || this.loopTimeoutId) && (this.stopAutoplay(), this.autoplay = !1), !this.isZoomed && this.pinchZoomLevel === 1) {
        const r = (this.fullscreenView ? document.body : this.container).offsetWidth;
        this.hideHotspots(), this.loadHigherQualityImages(r, () => {
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
      const r = l / this.initialPinchDistance, a = Math.max(1, Math.min(this.pinchZoomLevel * r, ve));
      if (this.initialPinchDistance = l, this.pinchZoomLevel = a, !this.canvas) return;
      const c = this.canvas.getBoundingClientRect(), h = c.width / 2 * this.devicePixelRatio, p = c.height / 2 * this.devicePixelRatio;
      a > 1 ? (this.isZoomed = !0, this.hideAllIcons(), this.updateView(a, h, p), (!this.pinchZoomEmitted || a > this.lastEmittedZoom) && (this.emit("onZoomIn", { zoomLevel: a }), this.pinchZoomEmitted = !0, this.lastEmittedZoom = a)) : (this.isZoomed = !1, this.panOffsetX = 0, this.panOffsetY = 0, this.updateView());
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
    switch (this.autoplay && this.stopAutoplay(), Se(i, this.allowSpinY) && (this.hasInteracted = !0, this.hideAllIcons(), this.hideHints()), i) {
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
    Se(i, this.allowSpinY) && this.showAllIcons();
  }
  moveActiveXIndexUp(t) {
    this.orientation = P.X, this.activeImageX = (this.activeImageX + t) % this.amountX;
  }
  moveActiveXIndexDown(t) {
    this.orientation = P.X, this.activeImageX = (this.activeImageX - t + this.amountX) % this.amountX;
  }
  moveActiveYIndexUp(t) {
    this.orientation = P.Y, this.activeImageY = (this.activeImageY + t) % this.amountY;
  }
  moveActiveYIndexDown(t) {
    this.orientation = P.Y, this.activeImageY = (this.activeImageY - t + this.amountY) % this.amountY;
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
    const s = this.orientation === P.X ? this.activeImageX : this.activeImageY, n = this.orientation === P.X ? this.imagesX[this.activeImageX] : this.imagesY[this.activeImageY];
    this.hotspotsInstance && !this.isZoomed && !this.autoplay && this.hotspotsInstance.updateHotspotPosition(s, this.orientation), this.hotspotTimelineIndicator && this.orientation === P.X && this.updateHotspotTimelinePosition(), this.drawImageOnCanvas(n, t, i, o);
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
    this.canvasWorker.postMessage({
      action: "drawImageOnCanvas",
      imageData: t,
      zoomScale: i,
      pointerX: o,
      pointerY: s
    });
  }
  pushImageToSet(t, i, o) {
    o === P.X ? this.imagesX[i] = t : this.imagesY[i] = t;
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
    if (this.addAllIcons(), this.isReady = !0, this.amountX = this.imagesX.length, this.amountY = this.imagesY.length, this.activeImageX = this.autoplayReverse ? this.amountX - 1 : 0, this.activeImageY = this.autoplayReverse ? this.amountY - 1 : 0, this.hotspots && (this.hotspotsInstance = new Js(this.hotspots, this.innerBox, this.imageAspectRatio, {
      trigger: this.hotspotTrigger
    }), this.addHotspotTimeline(), this.showHotspotTimeline()), this.emit("onLoad", { imagesX: this.imagesX.length, imagesY: this.imagesY.length }), this.emit("onReady"), this.announce("360 degree view loaded. Use mouse drag or arrow keys to rotate."), this.hints !== !1 && !this.autoplay) {
      const t = this.hints === !0 || this.hints === void 0 ? we(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = be(this.innerBox, t), Ie(this.hintsOverlay));
    }
    this.autoplay && (this.hideAllIcons(), Yo(this.play.bind(this))());
  }
  magnify(t) {
    t.stopPropagation();
    const { src: i } = this.orientation === P.Y ? this.imagesY[this.activeImageY] : this.imagesX[this.activeImageX], s = (this.fullscreenView ? document.body : this.container).offsetWidth * this.magnifier, n = Zi(i, s);
    this.showLoadingSpinner(), this.createGlass(), Io(n, (a) => {
      this.hideLoadingSpinner(), this.magnified = !0, Co(t, this.innerBox, this.offset, a, this.glass, this.magnifier);
    }, (a) => {
      this.hideLoadingSpinner(), this.removeGlass(), this.emit("onError", {
        error: { message: a.message, url: a.url },
        errorCount: 1,
        totalImages: 1,
        errors: [{ message: a.message, url: a.url }]
      });
    });
  }
  openFullscreenModal(t) {
    t.stopPropagation(), window.document.body.style.overflow = "hidden";
    const i = Ji(this.container);
    new Nt(i, this.viewerConfig, !0), this.emit("onFullscreenOpen"), this.announce("Opened fullscreen mode. Press Escape to exit.");
  }
  closeFullscreenModal(t) {
    t.stopPropagation(), document.body.removeChild(this.container.parentNode), window.document.body.style.overflow = "visible", this.emit("onFullscreenClose"), this.announce("Exited fullscreen mode");
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
      if (this.playOnce && So({
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
      Ao({
        autoplayBehavior: this.autoplayBehavior,
        activeImageX: this.activeImageX,
        activeImageY: this.activeImageY,
        amountX: this.amountX,
        amountY: this.amountY,
        autoplayReverse: this.autoplayReverse,
        spinDirection: this.spinDirection
      }) && (this.spinDirection = ko(this.spinDirection));
      const n = this.spinDirection === "y";
      Eo({
        autoplayBehavior: this.autoplayBehavior,
        spinY: n,
        reversed: this.autoplayReverse,
        loopTriggers: i
      });
    }, t);
  }
  stopAutoplay() {
    if (this.showAllIcons(), this.autoplay = !1, window.clearTimeout(this.loopTimeoutId), this.loopTimeoutId = null, this.emit("onAutoplayStop"), this.hints !== !1 && !this.hintsOverlay && !this.hintsHidden) {
      const t = this.hints === !0 ? we(this.viewerConfig, this.touchDevice) : this.hints;
      t && t.length > 0 && (this.hintsOverlay = be(this.innerBox, t), Ie(this.hintsOverlay));
    }
  }
  destroy() {
    this.stopAutoplay(), this.inertiaAnimationId && (cancelAnimationFrame(this.inertiaAnimationId), this.inertiaAnimationId = null), this.removeEvents(), this.canvasWorker && (this.canvasWorker.terminate(), this.canvasWorker = null), this.hotspotsInstance && this.hotspotsInstance.destroy(), this.hintsOverlay && this.hintsOverlay.parentNode && (this.hintsOverlay.parentNode.removeChild(this.hintsOverlay), this.hintsOverlay = null), this.hotspotTimeline && this.hotspotTimeline.parentNode && (this.hotspotTimeline.parentNode.removeChild(this.hotspotTimeline), this.hotspotTimeline = null, this.hotspotTimelineIndicator = null), this.container && (this.container.classList.remove("ci360-theme-dark"), this.container.innerHTML = "");
  }
  addInitialIcon() {
    this.initialIcon || this.hide360Logo || (this.initialIcon = ji(this.logoSrc), this.innerBox.appendChild(this.initialIcon));
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
    this.magnifier && (this.magnifierIcon = Ki(), this.magnifierIcon.onclick = this.magnify.bind(this), this.iconsContainer.appendChild(this.magnifierIcon));
  }
  showMagnifierIcon() {
    this.magnifierIcon && (this.magnifierIcon.style.visibility = "visible", this.magnifierIcon.style.opacity = 1);
  }
  hideMagnifierIcon() {
    this.magnifierIcon && (this.magnifierIcon.style.visibility = "hidden", this.magnifierIcon.style.opacity = 0);
  }
  addFullscreenIcon() {
    this.fullscreen && (this.fullscreenIcon = Gi(), this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenIcon));
  }
  addCloseFullscreenIcon() {
    this.fullscreenCloseIcon = zi(), this.fullscreenCloseIcon.onclick = this.closeFullscreenModal.bind(this), this.iconsContainer.appendChild(this.fullscreenCloseIcon);
  }
  showFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 1);
  }
  hideFullscreenIcon() {
    this.fullscreenIcon && (this.fullscreenIcon.style.opacity = 0);
  }
  add360ViewCircleIcon() {
    this.view360CircleIcon || (this.view360CircleIcon = Ni(this.bottomCircleOffset), this.innerBox.appendChild(this.view360CircleIcon));
  }
  show360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 1);
  }
  hide360ViewCircleIcon() {
    this.view360CircleIcon && (this.view360CircleIcon.style.opacity = 0);
  }
  addLoadingSpinner() {
    this.loadingSpinner = qi(), this.innerBox.appendChild(this.loadingSpinner);
  }
  showLoadingSpinner() {
    this.loadingSpinner && (this.hideAllIcons(), this.loadingSpinner.style.opacity = 1);
  }
  createTransitionOverlay() {
    this.transitionOverlay = Qi(), this.innerBox.appendChild(this.transitionOverlay);
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
    !this.hintsOverlay || this.hintsHidden || (this.hintsHidden = !0, no(this.hintsOverlay));
  }
  addHotspotTimeline() {
    if (!this.hotspots || this.hotspotTimeline) return;
    const t = ho(this.container, this.amountX, this.hotspots);
    if (!t) return;
    this.hotspotTimeline = t.element, this.hotspotTimelineIndicator = t.indicator, this.hotspotTimeline.querySelectorAll(".cloudimage-360-hotspot-timeline-dot").forEach((o) => {
      o.addEventListener("click", (s) => {
        s.stopPropagation();
        const n = parseInt(o.getAttribute("data-frame"), 10), l = o.getAttribute("data-hotspot-id");
        isNaN(n) || this.animateToFrame(n, l);
      });
    }), this.updateHotspotTimelinePosition();
  }
  showHotspotTimeline() {
    po(this.hotspotTimeline);
  }
  hideHotspotTimeline() {
    fo(this.hotspotTimeline);
  }
  updateHotspotTimelinePosition() {
    uo(this.hotspotTimelineIndicator, this.activeImageX, this.amountX);
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
    const o = this.activeImageX, s = (t - o + this.amountX) % this.amountX, n = (o - t + this.amountX) % this.amountX, l = s <= n, r = l ? s : n;
    if (r === 0) {
      this.isAnimatingToFrame = !1;
      return;
    }
    const a = 30;
    let c = r;
    const h = () => {
      if (c <= 0) {
        this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
          this.hotspotsInstance.showHotspotById(i);
        }, 50);
        return;
      }
      l ? this.moveRight() : this.moveLeft(), c--, c > 0 ? setTimeout(h, a) : (this.isAnimatingToFrame = !1, i && this.hotspotsInstance && this.hotspotTimelineOnClick && setTimeout(() => {
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
    this.hideInitialIcon(), this.hide360ViewCircleIcon(), this.hideMagnifierIcon(), this.hideFullscreenIcon(), this.hideHotspotTimeline();
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
    this.boundMouseClick = this.mouseClick.bind(this), this.boundMouseDown = this.mouseDown.bind(this), this.boundMouseMove = ue(this.mouseMove.bind(this), pe), this.boundMouseUp = this.mouseUp.bind(this), this.boundMouseLeave = this.mouseLeave.bind(this), this.innerBox.addEventListener("click", this.boundMouseClick), this.innerBox.addEventListener("mousedown", this.boundMouseDown), this.innerBox.addEventListener("mouseleave", this.boundMouseLeave), document.addEventListener("mousemove", this.boundMouseMove), document.addEventListener("mouseup", this.boundMouseUp);
  }
  addTouchEvents() {
    this.boundTouchOutside = this.touchOutside.bind(this), this.boundTouchStart = this.touchStart.bind(this), this.boundTouchEnd = this.touchEnd.bind(this), this.boundTouchMove = ue(this.touchMove.bind(this), pe), document.addEventListener("touchstart", this.boundTouchOutside), this.container.addEventListener("touchstart", this.boundTouchStart), this.container.addEventListener("touchend", this.boundTouchEnd), this.container.addEventListener("touchmove", this.boundTouchMove);
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
    this.innerBox.removeEventListener("click", this.boundMouseClick), this.innerBox.removeEventListener("mousedown", this.boundMouseDown), this.innerBox.removeEventListener("mouseleave", this.boundMouseLeave), document.removeEventListener("mousemove", this.boundMouseMove), document.removeEventListener("mouseup", this.boundMouseUp);
  }
  removeTouchEvents() {
    document.removeEventListener("touchstart", this.boundTouchOutside), this.container.removeEventListener("touchstart", this.boundTouchStart), this.container.removeEventListener("touchend", this.boundTouchEnd), this.container.removeEventListener("touchmove", this.boundTouchMove);
  }
  removeKeyboardEvents() {
    document.removeEventListener("keydown", this.boundKeyDown), document.removeEventListener("keyup", this.boundKeyUp);
  }
  createContainers(t) {
    this.iconsContainer = ye(this.innerBox), this.canvas = $i(this.innerBox, t), this.loader = _i(this.innerBox), this.ariaLiveRegion = eo(this.innerBox);
    const i = this.canvas.transferControlToOffscreen();
    this.canvasWorker.postMessage(
      {
        action: "initCanvas",
        offscreen: i,
        devicePixelRatio: this.devicePixelRatio
      },
      [i]
    ), this.fullscreenView && this.addCloseFullscreenIcon(), Jt(this.innerBox, ".cloudimage-360-placeholder");
  }
  update(t) {
    this.isReady && (this.stopAutoplay(), Jt(this.innerBox, ".cloudimage-360-icons-container"), this.init(this.container, t, !0), this.iconsContainer = ye(this.innerBox), this.onAllImagesLoaded());
  }
  init(t, i, o) {
    const s = i ? Pi(i) : Yi(t), {
      folder: n,
      apiVersion: l,
      filenameX: r,
      filenameY: a,
      imageListX: c,
      imageListY: h,
      indexZeroBase: p,
      amountX: f,
      amountY: u,
      draggable: I = !0,
      swipeable: g = !0,
      keys: v,
      keysReverse: m,
      bottomCircleOffset: b,
      autoplay: x,
      autoplayBehavior: w,
      playOnce: C,
      speed: y,
      autoplayReverse: O,
      fullscreen: S,
      magnifier: E,
      ciToken: A,
      ciFilters: k,
      ciTransformation: R,
      lazyload: T,
      dragSpeed: G,
      stopAtEdges: U,
      pointerZoom: Y,
      imageInfo: Z = "black",
      initialIconShown: nt,
      bottomCircle: K,
      hotspots: rt,
      hotspotTrigger: mt = "hover",
      dragReverse: tt,
      hide360Logo: at,
      logoSrc: q,
      inertia: V,
      pinchZoom: et,
      hints: lt,
      theme: j,
      hotspotTimelineOnClick: vt = !0,
      aspectRatio: Yt,
      // Event callbacks
      onReady: gt,
      onLoad: jt,
      onSpin: Xt,
      onAutoplayStart: $t,
      onAutoplayStop: zt,
      onFullscreenOpen: Pt,
      onFullscreenClose: Rt,
      onZoomIn: Gt,
      onZoomOut: Ut,
      onDragStart: _,
      onDragEnd: ct,
      onError: Ht
    } = s, yt = { ciToken: A, ciFilters: k, ciTransformation: R }, it = qt(c, []), ht = qt(h, []);
    if (this.viewerConfig = s, this.amountX = it.length || f, this.amountY = ht.length || u, this.allowSpinX = !!this.amountX, this.allowSpinY = !!this.amountY, this.activeImageX = O ? this.amountX - 1 : 0, this.activeImageY = O ? this.amountY - 1 : 0, this.bottomCircleOffset = b, this.autoplay = x, this.autoplayBehavior = w, this.playOnce = C, this.speed = y, this.autoplayReverse = O, this.fullscreen = S, this.magnifier = E > 1 ? Math.min(E, ki) : 0, this.dragSpeed = Math.max(G, Li), this.stopAtEdges = U, this.ciParams = yt, this.apiVersion = l, this.pointerZoom = Y > 1 ? Math.min(Y, ve) : null, this.keysReverse = m, this.info = Z, this.keys = v, this.innerBox = this.innerBox ?? Ui(this.container), Yt && (this.container.style.aspectRatio = Yt), this.initialIconShown = nt, this.bottomCircle = K, this.spinDirection = Lo(this.autoplayBehavior, this.allowSpinX, this.allowSpinY), this.dragReverse = tt, this.hotspots = rt, this.hotspotTrigger = mt, this.hide360Logo = at, this.logoSrc = q, this.inertia = V, this.pinchZoom = et, this.hints = lt, this.hotspotTimelineOnClick = vt, j === "dark" ? this.container.classList.add("ci360-theme-dark") : j === "light" && this.container.classList.remove("ci360-theme-dark"), this.onReady = gt, this.onLoad = jt, this.onSpin = Xt, this.onAutoplayStart = $t, this.onAutoplayStop = zt, this.onFullscreenOpen = Pt, this.onFullscreenClose = Rt, this.onZoomIn = Gt, this.onZoomOut = Ut, this.onDragStart = _, this.onDragEnd = ct, this.onError = Ht, this.srcXConfig = {
      folder: n,
      filename: r,
      imageList: it,
      container: t,
      innerBox: this.innerBox,
      apiVersion: l,
      ciParams: yt,
      lazyload: T,
      amount: this.amountX,
      indexZeroBase: p,
      autoplayReverse: O,
      orientation: P.X
    }, this.srcYConfig = {
      ...this.srcXConfig,
      filename: a,
      imageList: ht,
      orientation: P.Y,
      amount: this.amountY
    }, o && this.removeEvents(), this.attachEvents(I, g, v), o) return;
    const bt = (this.fullscreenView ? document.body : this.container).offsetWidth, wt = this.allowSpinX && !it.length ? Ot(this.srcXConfig, bt) : null, It = this.allowSpinY && !ht.length ? Ot(this.srcYConfig, bt) : null, le = (qe) => {
      ge({
        cdnPathX: wt,
        cdnPathY: It,
        configX: this.srcXConfig,
        configY: this.srcYConfig,
        onImageLoad: (xt, Qe, ti) => this.onImageLoad(xt, Qe, ti),
        onFirstImageLoad: (xt) => this.onFirstImageLoaded(qe, xt),
        onAllImagesLoad: this.onAllImagesLoaded.bind(this),
        onError: (xt) => this.emit("onError", xt)
      });
    };
    this.allowSpinX ? Ce(wt, this.srcXConfig, le) : this.allowSpinY && Ce(It, this.srcYConfig, le);
  }
}
class Qs {
  constructor() {
    this.views = /* @__PURE__ */ new Map(), this.initAll = this.initAll.bind(this), this.getViews = this.getViews.bind(this);
  }
  generateId() {
    return `ci360-${Math.random().toString(36).slice(2, 11)}`;
  }
  init(t, i, o) {
    if (!t) return;
    const s = t.id || this.generateId();
    t.id || (t.id = s);
    const n = new Nt(t, i, o);
    return this.views.set(s, n), n;
  }
  initAll(t = "cloudimage-360") {
    [...document.querySelectorAll(`.${t}`)].filter(Boolean).forEach((o) => {
      const s = o.id || this.generateId();
      o.id || (o.id = s);
      const n = new Nt(o);
      this.views.set(s, n);
    });
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
}
export {
  Qs as default
};
//# sourceMappingURL=ci360-gJ2zmyqE.mjs.map
