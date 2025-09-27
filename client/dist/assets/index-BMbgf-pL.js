(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) n(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const a of o.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function n(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = r(l);
    fetch(l.href, o);
  }
})();
function Nf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var kc = { exports: {} },
  Ql = {},
  Sc = { exports: {} },
  F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pn = Symbol.for("react.element"),
  kf = Symbol.for("react.portal"),
  Sf = Symbol.for("react.fragment"),
  Cf = Symbol.for("react.strict_mode"),
  _f = Symbol.for("react.profiler"),
  Ef = Symbol.for("react.provider"),
  Pf = Symbol.for("react.context"),
  Rf = Symbol.for("react.forward_ref"),
  Lf = Symbol.for("react.suspense"),
  zf = Symbol.for("react.memo"),
  Mf = Symbol.for("react.lazy"),
  ei = Symbol.iterator;
function Tf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ei && e[ei]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Cc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  _c = Object.assign,
  Ec = {};
function Lr(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Ec),
    (this.updater = r || Cc));
}
Lr.prototype.isReactComponent = {};
Lr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Lr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Pc() {}
Pc.prototype = Lr.prototype;
function Yo(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Ec),
    (this.updater = r || Cc));
}
var Ko = (Yo.prototype = new Pc());
Ko.constructor = Yo;
_c(Ko, Lr.prototype);
Ko.isPureReactComponent = !0;
var ti = Array.isArray,
  Rc = Object.prototype.hasOwnProperty,
  Xo = { current: null },
  Lc = { key: !0, ref: !0, __self: !0, __source: !0 };
function zc(e, t, r) {
  var n,
    l = {},
    o = null,
    a = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Rc.call(t, n) && !Lc.hasOwnProperty(n) && (l[n] = t[n]);
  var c = arguments.length - 2;
  if (c === 1) l.children = r;
  else if (1 < c) {
    for (var i = Array(c), u = 0; u < c; u++) i[u] = arguments[u + 2];
    l.children = i;
  }
  if (e && e.defaultProps)
    for (n in ((c = e.defaultProps), c)) l[n] === void 0 && (l[n] = c[n]);
  return {
    $$typeof: Pn,
    type: e,
    key: o,
    ref: a,
    props: l,
    _owner: Xo.current,
  };
}
function Af(e, t) {
  return {
    $$typeof: Pn,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Zo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Pn;
}
function If(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var ri = /\/+/g;
function gs(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? If("" + e.key)
    : t.toString(36);
}
function ol(e, t, r, n, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (o) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Pn:
          case kf:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (l = l(a)),
      (e = n === "" ? "." + gs(a, 0) : n),
      ti(l)
        ? ((r = ""),
          e != null && (r = e.replace(ri, "$&/") + "/"),
          ol(l, t, r, "", function (u) {
            return u;
          }))
        : l != null &&
          (Zo(l) &&
            (l = Af(
              l,
              r +
                (!l.key || (a && a.key === l.key)
                  ? ""
                  : ("" + l.key).replace(ri, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((a = 0), (n = n === "" ? "." : n + ":"), ti(e)))
    for (var c = 0; c < e.length; c++) {
      o = e[c];
      var i = n + gs(o, c);
      a += ol(o, t, r, i, l);
    }
  else if (((i = Tf(e)), typeof i == "function"))
    for (e = i.call(e), c = 0; !(o = e.next()).done; )
      ((o = o.value), (i = n + gs(o, c++)), (a += ol(o, t, r, i, l)));
  else if (o === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return a;
}
function Fn(e, t, r) {
  if (e == null) return e;
  var n = [],
    l = 0;
  return (
    ol(e, n, "", "", function (o) {
      return t.call(r, o, l++);
    }),
    n
  );
}
function Of(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = r));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ne = { current: null },
  al = { transition: null },
  Df = {
    ReactCurrentDispatcher: Ne,
    ReactCurrentBatchConfig: al,
    ReactCurrentOwner: Xo,
  };
function Mc() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = {
  map: Fn,
  forEach: function (e, t, r) {
    Fn(
      e,
      function () {
        t.apply(this, arguments);
      },
      r,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Fn(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Fn(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Zo(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
F.Component = Lr;
F.Fragment = Sf;
F.Profiler = _f;
F.PureComponent = Yo;
F.StrictMode = Cf;
F.Suspense = Lf;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Df;
F.act = Mc;
F.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var n = _c({}, e.props),
    l = e.key,
    o = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (a = Xo.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var c = e.type.defaultProps;
    for (i in t)
      Rc.call(t, i) &&
        !Lc.hasOwnProperty(i) &&
        (n[i] = t[i] === void 0 && c !== void 0 ? c[i] : t[i]);
  }
  var i = arguments.length - 2;
  if (i === 1) n.children = r;
  else if (1 < i) {
    c = Array(i);
    for (var u = 0; u < i; u++) c[u] = arguments[u + 2];
    n.children = c;
  }
  return { $$typeof: Pn, type: e.type, key: l, ref: o, props: n, _owner: a };
};
F.createContext = function (e) {
  return (
    (e = {
      $$typeof: Pf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Ef, _context: e }),
    (e.Consumer = e)
  );
};
F.createElement = zc;
F.createFactory = function (e) {
  var t = zc.bind(null, e);
  return ((t.type = e), t);
};
F.createRef = function () {
  return { current: null };
};
F.forwardRef = function (e) {
  return { $$typeof: Rf, render: e };
};
F.isValidElement = Zo;
F.lazy = function (e) {
  return { $$typeof: Mf, _payload: { _status: -1, _result: e }, _init: Of };
};
F.memo = function (e, t) {
  return { $$typeof: zf, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function (e) {
  var t = al.transition;
  al.transition = {};
  try {
    e();
  } finally {
    al.transition = t;
  }
};
F.unstable_act = Mc;
F.useCallback = function (e, t) {
  return Ne.current.useCallback(e, t);
};
F.useContext = function (e) {
  return Ne.current.useContext(e);
};
F.useDebugValue = function () {};
F.useDeferredValue = function (e) {
  return Ne.current.useDeferredValue(e);
};
F.useEffect = function (e, t) {
  return Ne.current.useEffect(e, t);
};
F.useId = function () {
  return Ne.current.useId();
};
F.useImperativeHandle = function (e, t, r) {
  return Ne.current.useImperativeHandle(e, t, r);
};
F.useInsertionEffect = function (e, t) {
  return Ne.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function (e, t) {
  return Ne.current.useLayoutEffect(e, t);
};
F.useMemo = function (e, t) {
  return Ne.current.useMemo(e, t);
};
F.useReducer = function (e, t, r) {
  return Ne.current.useReducer(e, t, r);
};
F.useRef = function (e) {
  return Ne.current.useRef(e);
};
F.useState = function (e) {
  return Ne.current.useState(e);
};
F.useSyncExternalStore = function (e, t, r) {
  return Ne.current.useSyncExternalStore(e, t, r);
};
F.useTransition = function () {
  return Ne.current.useTransition();
};
F.version = "18.3.1";
Sc.exports = F;
var y = Sc.exports;
const Gs = Nf(y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $f = y,
  Ff = Symbol.for("react.element"),
  Uf = Symbol.for("react.fragment"),
  Bf = Object.prototype.hasOwnProperty,
  Wf = $f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Hf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tc(e, t, r) {
  var n,
    l = {},
    o = null,
    a = null;
  (r !== void 0 && (o = "" + r),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (a = t.ref));
  for (n in t) Bf.call(t, n) && !Hf.hasOwnProperty(n) && (l[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) l[n] === void 0 && (l[n] = t[n]);
  return {
    $$typeof: Ff,
    type: e,
    key: o,
    ref: a,
    props: l,
    _owner: Wf.current,
  };
}
Ql.Fragment = Uf;
Ql.jsx = Tc;
Ql.jsxs = Tc;
kc.exports = Ql;
var s = kc.exports,
  Ac = { exports: {} },
  Te = {},
  Ic = { exports: {} },
  Oc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(j, O) {
    var D = j.length;
    j.push(O);
    e: for (; 0 < D; ) {
      var G = (D - 1) >>> 1,
        te = j[G];
      if (0 < l(te, O)) ((j[G] = O), (j[D] = te), (D = G));
      else break e;
    }
  }
  function r(j) {
    return j.length === 0 ? null : j[0];
  }
  function n(j) {
    if (j.length === 0) return null;
    var O = j[0],
      D = j.pop();
    if (D !== O) {
      j[0] = D;
      e: for (var G = 0, te = j.length, ae = te >>> 1; G < ae; ) {
        var le = 2 * (G + 1) - 1,
          vt = j[le],
          Ke = le + 1,
          K = j[Ke];
        if (0 > l(vt, D))
          Ke < te && 0 > l(K, vt)
            ? ((j[G] = K), (j[Ke] = D), (G = Ke))
            : ((j[G] = vt), (j[le] = D), (G = le));
        else if (Ke < te && 0 > l(K, D)) ((j[G] = K), (j[Ke] = D), (G = Ke));
        else break e;
      }
    }
    return O;
  }
  function l(j, O) {
    var D = j.sortIndex - O.sortIndex;
    return D !== 0 ? D : j.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var a = Date,
      c = a.now();
    e.unstable_now = function () {
      return a.now() - c;
    };
  }
  var i = [],
    u = [],
    p = 1,
    f = null,
    g = 3,
    v = !1,
    x = !1,
    w = !1,
    N = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(j) {
    for (var O = r(u); O !== null; ) {
      if (O.callback === null) n(u);
      else if (O.startTime <= j)
        (n(u), (O.sortIndex = O.expirationTime), t(i, O));
      else break;
      O = r(u);
    }
  }
  function b(j) {
    if (((w = !1), d(j), !x))
      if (r(i) !== null) ((x = !0), W(C));
      else {
        var O = r(u);
        O !== null && L(b, O.startTime - j);
      }
  }
  function C(j, O) {
    ((x = !1), w && ((w = !1), h(k), (k = -1)), (v = !0));
    var D = g;
    try {
      for (
        d(O), f = r(i);
        f !== null && (!(f.expirationTime > O) || (j && !S()));

      ) {
        var G = f.callback;
        if (typeof G == "function") {
          ((f.callback = null), (g = f.priorityLevel));
          var te = G(f.expirationTime <= O);
          ((O = e.unstable_now()),
            typeof te == "function" ? (f.callback = te) : f === r(i) && n(i),
            d(O));
        } else n(i);
        f = r(i);
      }
      if (f !== null) var ae = !0;
      else {
        var le = r(u);
        (le !== null && L(b, le.startTime - O), (ae = !1));
      }
      return ae;
    } finally {
      ((f = null), (g = D), (v = !1));
    }
  }
  var R = !1,
    E = null,
    k = -1,
    P = 5,
    M = -1;
  function S() {
    return !(e.unstable_now() - M < P);
  }
  function z() {
    if (E !== null) {
      var j = e.unstable_now();
      M = j;
      var O = !0;
      try {
        O = E(!0, j);
      } finally {
        O ? ne() : ((R = !1), (E = null));
      }
    } else R = !1;
  }
  var ne;
  if (typeof m == "function")
    ne = function () {
      m(z);
    };
  else if (typeof MessageChannel < "u") {
    var Ie = new MessageChannel(),
      oe = Ie.port2;
    ((Ie.port1.onmessage = z),
      (ne = function () {
        oe.postMessage(null);
      }));
  } else
    ne = function () {
      N(z, 0);
    };
  function W(j) {
    ((E = j), R || ((R = !0), ne()));
  }
  function L(j, O) {
    k = N(function () {
      j(e.unstable_now());
    }, O);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (j) {
      j.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || v || ((x = !0), W(C));
    }),
    (e.unstable_forceFrameRate = function (j) {
      0 > j || 125 < j
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (P = 0 < j ? Math.floor(1e3 / j) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(i);
    }),
    (e.unstable_next = function (j) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = g;
      }
      var D = g;
      g = O;
      try {
        return j();
      } finally {
        g = D;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (j, O) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var D = g;
      g = j;
      try {
        return O();
      } finally {
        g = D;
      }
    }),
    (e.unstable_scheduleCallback = function (j, O, D) {
      var G = e.unstable_now();
      switch (
        (typeof D == "object" && D !== null
          ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? G + D : G))
          : (D = G),
        j)
      ) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return (
        (te = D + te),
        (j = {
          id: p++,
          callback: O,
          priorityLevel: j,
          startTime: D,
          expirationTime: te,
          sortIndex: -1,
        }),
        D > G
          ? ((j.sortIndex = D),
            t(u, j),
            r(i) === null &&
              j === r(u) &&
              (w ? (h(k), (k = -1)) : (w = !0), L(b, D - G)))
          : ((j.sortIndex = te), t(i, j), x || v || ((x = !0), W(C))),
        j
      );
    }),
    (e.unstable_shouldYield = S),
    (e.unstable_wrapCallback = function (j) {
      var O = g;
      return function () {
        var D = g;
        g = O;
        try {
          return j.apply(this, arguments);
        } finally {
          g = D;
        }
      };
    }));
})(Oc);
Ic.exports = Oc;
var Vf = Ic.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qf = y,
  Me = Vf;
function _(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1;
    r < arguments.length;
    r++
  )
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Dc = new Set(),
  dn = {};
function tr(e, t) {
  (kr(e, t), kr(e + "Capture", t));
}
function kr(e, t) {
  for (dn[e] = t, e = 0; e < t.length; e++) Dc.add(t[e]);
}
var dt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ys = Object.prototype.hasOwnProperty,
  Qf =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ni = {},
  li = {};
function Gf(e) {
  return Ys.call(li, e)
    ? !0
    : Ys.call(ni, e)
      ? !1
      : Qf.test(e)
        ? (li[e] = !0)
        : ((ni[e] = !0), !1);
}
function Yf(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return n
        ? !1
        : r !== null
          ? !r.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Kf(e, t, r, n) {
  if (t === null || typeof t > "u" || Yf(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ke(e, t, r, n, l, o, a) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = l),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = a));
}
var ge = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ge[e] = new ke(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ge[t] = new ke(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ge[e] = new ke(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ge[e] = new ke(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ge[e] = new ke(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ge[e] = new ke(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ge[e] = new ke(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ge[e] = new ke(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ge[e] = new ke(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Jo = /[\-:]([a-z])/g;
function ea(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Jo, ea);
    ge[t] = new ke(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Jo, ea);
    ge[t] = new ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Jo, ea);
  ge[t] = new ke(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ge[e] = new ke(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ge.xlinkHref = new ke(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ge[e] = new ke(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ta(e, t, r, n) {
  var l = ge.hasOwnProperty(t) ? ge[t] : null;
  (l !== null
    ? l.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Kf(t, r, l, n) && (r = null),
    n || l === null
      ? Gf(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
      : l.mustUseProperty
        ? (e[l.propertyName] = r === null ? (l.type === 3 ? !1 : "") : r)
        : ((t = l.attributeName),
          (n = l.attributeNamespace),
          r === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (r = l === 3 || (l === 4 && r === !0) ? "" : "" + r),
              n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var gt = qf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Un = Symbol.for("react.element"),
  or = Symbol.for("react.portal"),
  ar = Symbol.for("react.fragment"),
  ra = Symbol.for("react.strict_mode"),
  Ks = Symbol.for("react.profiler"),
  $c = Symbol.for("react.provider"),
  Fc = Symbol.for("react.context"),
  na = Symbol.for("react.forward_ref"),
  Xs = Symbol.for("react.suspense"),
  Zs = Symbol.for("react.suspense_list"),
  la = Symbol.for("react.memo"),
  jt = Symbol.for("react.lazy"),
  Uc = Symbol.for("react.offscreen"),
  si = Symbol.iterator;
function Dr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (si && e[si]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ee = Object.assign,
  xs;
function Kr(e) {
  if (xs === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      xs = (t && t[1]) || "";
    }
  return (
    `
` +
    xs +
    e
  );
}
var ys = !1;
function vs(e, t) {
  if (!e || ys) return "";
  ys = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          n = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      e();
    }
  } catch (u) {
    if (u && n && typeof u.stack == "string") {
      for (
        var l = u.stack.split(`
`),
          o = n.stack.split(`
`),
          a = l.length - 1,
          c = o.length - 1;
        1 <= a && 0 <= c && l[a] !== o[c];

      )
        c--;
      for (; 1 <= a && 0 <= c; a--, c--)
        if (l[a] !== o[c]) {
          if (a !== 1 || c !== 1)
            do
              if ((a--, c--, 0 > c || l[a] !== o[c])) {
                var i =
                  `
` + l[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    i.includes("<anonymous>") &&
                    (i = i.replace("<anonymous>", e.displayName)),
                  i
                );
              }
            while (1 <= a && 0 <= c);
          break;
        }
    }
  } finally {
    ((ys = !1), (Error.prepareStackTrace = r));
  }
  return (e = e ? e.displayName || e.name : "") ? Kr(e) : "";
}
function Xf(e) {
  switch (e.tag) {
    case 5:
      return Kr(e.type);
    case 16:
      return Kr("Lazy");
    case 13:
      return Kr("Suspense");
    case 19:
      return Kr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = vs(e.type, !1)), e);
    case 11:
      return ((e = vs(e.type.render, !1)), e);
    case 1:
      return ((e = vs(e.type, !0)), e);
    default:
      return "";
  }
}
function Js(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ar:
      return "Fragment";
    case or:
      return "Portal";
    case Ks:
      return "Profiler";
    case ra:
      return "StrictMode";
    case Xs:
      return "Suspense";
    case Zs:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Fc:
        return (e.displayName || "Context") + ".Consumer";
      case $c:
        return (e._context.displayName || "Context") + ".Provider";
      case na:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case la:
        return (
          (t = e.displayName || null),
          t !== null ? t : Js(e.type) || "Memo"
        );
      case jt:
        ((t = e._payload), (e = e._init));
        try {
          return Js(e(t));
        } catch {}
    }
  return null;
}
function Zf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Js(t);
    case 8:
      return t === ra ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ot(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Bc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Jf(e) {
  var t = Bc(e) ? "checked" : "value",
    r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    n = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof r < "u" &&
    typeof r.get == "function" &&
    typeof r.set == "function"
  ) {
    var l = r.get,
      o = r.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (a) {
          ((n = "" + a), o.call(this, a));
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (a) {
          n = "" + a;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Bn(e) {
  e._valueTracker || (e._valueTracker = Jf(e));
}
function Wc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = "";
  return (
    e && (n = Bc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function wl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function eo(e, t) {
  var r = t.checked;
  return ee({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function oi(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  ((r = Ot(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Hc(e, t) {
  ((t = t.checked), t != null && ta(e, "checked", t, !1));
}
function to(e, t) {
  Hc(e, t);
  var r = Ot(t.value),
    n = t.type;
  if (r != null)
    n === "number"
      ? ((r === 0 && e.value === "") || e.value != r) && (e.value = "" + r)
      : e.value !== "" + r && (e.value = "" + r);
  else if (n === "submit" || n === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? ro(e, t.type, r)
    : t.hasOwnProperty("defaultValue") && ro(e, t.type, Ot(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function ai(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var n = t.type;
    if (
      !(
        (n !== "submit" && n !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((r = e.name),
    r !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    r !== "" && (e.name = r));
}
function ro(e, t, r) {
  (t !== "number" || wl(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var Xr = Array.isArray;
function yr(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < r.length; l++) t["$" + r[l]] = !0;
    for (r = 0; r < e.length; r++)
      ((l = t.hasOwnProperty("$" + e[r].value)),
        e[r].selected !== l && (e[r].selected = l),
        l && n && (e[r].defaultSelected = !0));
  } else {
    for (r = "" + Ot(r), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === r) {
        ((e[l].selected = !0), n && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function no(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return ee({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function ii(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error(_(92));
      if (Xr(r)) {
        if (1 < r.length) throw Error(_(93));
        r = r[0];
      }
      t = r;
    }
    (t == null && (t = ""), (r = t));
  }
  e._wrapperState = { initialValue: Ot(r) };
}
function Vc(e, t) {
  var r = Ot(t.value),
    n = Ot(t.defaultValue);
  (r != null &&
    ((r = "" + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = "" + n));
}
function ci(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function qc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? qc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Wn,
  Qc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, r, n, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, r, n, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Wn = Wn || document.createElement("div"),
          Wn.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Wn.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function fn(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var tn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  em = ["Webkit", "ms", "Moz", "O"];
Object.keys(tn).forEach(function (e) {
  em.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (tn[t] = tn[e]));
  });
});
function Gc(e, t, r) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : r || typeof t != "number" || t === 0 || (tn.hasOwnProperty(e) && tn[e])
      ? ("" + t).trim()
      : t + "px";
}
function Yc(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf("--") === 0,
        l = Gc(r, t[r], n);
      (r === "float" && (r = "cssFloat"), n ? e.setProperty(r, l) : (e[r] = l));
    }
}
var tm = ee(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function so(e, t) {
  if (t) {
    if (tm[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
  }
}
function oo(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ao = null;
function sa(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var io = null,
  vr = null,
  wr = null;
function ui(e) {
  if ((e = zn(e))) {
    if (typeof io != "function") throw Error(_(280));
    var t = e.stateNode;
    t && ((t = Zl(t)), io(e.stateNode, e.type, t));
  }
}
function Kc(e) {
  vr ? (wr ? wr.push(e) : (wr = [e])) : (vr = e);
}
function Xc() {
  if (vr) {
    var e = vr,
      t = wr;
    if (((wr = vr = null), ui(e), t)) for (e = 0; e < t.length; e++) ui(t[e]);
  }
}
function Zc(e, t) {
  return e(t);
}
function Jc() {}
var ws = !1;
function eu(e, t, r) {
  if (ws) return e(t, r);
  ws = !0;
  try {
    return Zc(e, t, r);
  } finally {
    ((ws = !1), (vr !== null || wr !== null) && (Jc(), Xc()));
  }
}
function mn(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = Zl(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((n = !n.disabled) ||
        ((e = e.type),
        (n = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !n));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(_(231, t, typeof r));
  return r;
}
var co = !1;
if (dt)
  try {
    var $r = {};
    (Object.defineProperty($r, "passive", {
      get: function () {
        co = !0;
      },
    }),
      window.addEventListener("test", $r, $r),
      window.removeEventListener("test", $r, $r));
  } catch {
    co = !1;
  }
function rm(e, t, r, n, l, o, a, c, i) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (p) {
    this.onError(p);
  }
}
var rn = !1,
  bl = null,
  jl = !1,
  uo = null,
  nm = {
    onError: function (e) {
      ((rn = !0), (bl = e));
    },
  };
function lm(e, t, r, n, l, o, a, c, i) {
  ((rn = !1), (bl = null), rm.apply(nm, arguments));
}
function sm(e, t, r, n, l, o, a, c, i) {
  if ((lm.apply(this, arguments), rn)) {
    if (rn) {
      var u = bl;
      ((rn = !1), (bl = null));
    } else throw Error(_(198));
    jl || ((jl = !0), (uo = u));
  }
}
function rr(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (r = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function tu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function di(e) {
  if (rr(e) !== e) throw Error(_(188));
}
function om(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = rr(e)), t === null)) throw Error(_(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var l = r.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((n = l.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === r) return (di(l), e);
        if (o === n) return (di(l), t);
        o = o.sibling;
      }
      throw Error(_(188));
    }
    if (r.return !== n.return) ((r = l), (n = o));
    else {
      for (var a = !1, c = l.child; c; ) {
        if (c === r) {
          ((a = !0), (r = l), (n = o));
          break;
        }
        if (c === n) {
          ((a = !0), (n = l), (r = o));
          break;
        }
        c = c.sibling;
      }
      if (!a) {
        for (c = o.child; c; ) {
          if (c === r) {
            ((a = !0), (r = o), (n = l));
            break;
          }
          if (c === n) {
            ((a = !0), (n = o), (r = l));
            break;
          }
          c = c.sibling;
        }
        if (!a) throw Error(_(189));
      }
    }
    if (r.alternate !== n) throw Error(_(190));
  }
  if (r.tag !== 3) throw Error(_(188));
  return r.stateNode.current === r ? e : t;
}
function ru(e) {
  return ((e = om(e)), e !== null ? nu(e) : null);
}
function nu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = nu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var lu = Me.unstable_scheduleCallback,
  fi = Me.unstable_cancelCallback,
  am = Me.unstable_shouldYield,
  im = Me.unstable_requestPaint,
  se = Me.unstable_now,
  cm = Me.unstable_getCurrentPriorityLevel,
  oa = Me.unstable_ImmediatePriority,
  su = Me.unstable_UserBlockingPriority,
  Nl = Me.unstable_NormalPriority,
  um = Me.unstable_LowPriority,
  ou = Me.unstable_IdlePriority,
  Gl = null,
  et = null;
function dm(e) {
  if (et && typeof et.onCommitFiberRoot == "function")
    try {
      et.onCommitFiberRoot(Gl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Qe = Math.clz32 ? Math.clz32 : pm,
  fm = Math.log,
  mm = Math.LN2;
function pm(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((fm(e) / mm) | 0)) | 0);
}
var Hn = 64,
  Vn = 4194304;
function Zr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function kl(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    a = r & 268435455;
  if (a !== 0) {
    var c = a & ~l;
    c !== 0 ? (n = Zr(c)) : ((o &= a), o !== 0 && (n = Zr(o)));
  } else ((a = r & ~l), a !== 0 ? (n = Zr(a)) : o !== 0 && (n = Zr(o)));
  if (n === 0) return 0;
  if (
    t !== 0 &&
    t !== n &&
    !(t & l) &&
    ((l = n & -n), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((n & 4 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= n; 0 < t; )
      ((r = 31 - Qe(t)), (l = 1 << r), (n |= e[r]), (t &= ~l));
  return n;
}
function hm(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function gm(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var a = 31 - Qe(o),
      c = 1 << a,
      i = l[a];
    (i === -1
      ? (!(c & r) || c & n) && (l[a] = hm(c, t))
      : i <= t && (e.expiredLanes |= c),
      (o &= ~c));
  }
}
function fo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function au() {
  var e = Hn;
  return ((Hn <<= 1), !(Hn & 4194240) && (Hn = 64), e);
}
function bs(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function Rn(e, t, r) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Qe(t)),
    (e[t] = r));
}
function xm(e, t) {
  var r = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var l = 31 - Qe(r),
      o = 1 << l;
    ((t[l] = 0), (n[l] = -1), (e[l] = -1), (r &= ~o));
  }
}
function aa(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r; ) {
    var n = 31 - Qe(r),
      l = 1 << n;
    ((l & t) | (e[n] & t) && (e[n] |= t), (r &= ~l));
  }
}
var H = 0;
function iu(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var cu,
  ia,
  uu,
  du,
  fu,
  mo = !1,
  qn = [],
  Pt = null,
  Rt = null,
  Lt = null,
  pn = new Map(),
  hn = new Map(),
  kt = [],
  ym =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function mi(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Pt = null;
      break;
    case "dragenter":
    case "dragleave":
      Rt = null;
      break;
    case "mouseover":
    case "mouseout":
      Lt = null;
      break;
    case "pointerover":
    case "pointerout":
      pn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      hn.delete(t.pointerId);
  }
}
function Fr(e, t, r, n, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = zn(t)), t !== null && ia(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function vm(e, t, r, n, l) {
  switch (t) {
    case "focusin":
      return ((Pt = Fr(Pt, e, t, r, n, l)), !0);
    case "dragenter":
      return ((Rt = Fr(Rt, e, t, r, n, l)), !0);
    case "mouseover":
      return ((Lt = Fr(Lt, e, t, r, n, l)), !0);
    case "pointerover":
      var o = l.pointerId;
      return (pn.set(o, Fr(pn.get(o) || null, e, t, r, n, l)), !0);
    case "gotpointercapture":
      return (
        (o = l.pointerId),
        hn.set(o, Fr(hn.get(o) || null, e, t, r, n, l)),
        !0
      );
  }
  return !1;
}
function mu(e) {
  var t = Vt(e.target);
  if (t !== null) {
    var r = rr(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = tu(r)), t !== null)) {
          ((e.blockedOn = t),
            fu(e.priority, function () {
              uu(r);
            }));
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function il(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = po(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      ((ao = n), r.target.dispatchEvent(n), (ao = null));
    } else return ((t = zn(r)), t !== null && ia(t), (e.blockedOn = r), !1);
    t.shift();
  }
  return !0;
}
function pi(e, t, r) {
  il(e) && r.delete(t);
}
function wm() {
  ((mo = !1),
    Pt !== null && il(Pt) && (Pt = null),
    Rt !== null && il(Rt) && (Rt = null),
    Lt !== null && il(Lt) && (Lt = null),
    pn.forEach(pi),
    hn.forEach(pi));
}
function Ur(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    mo ||
      ((mo = !0),
      Me.unstable_scheduleCallback(Me.unstable_NormalPriority, wm)));
}
function gn(e) {
  function t(l) {
    return Ur(l, e);
  }
  if (0 < qn.length) {
    Ur(qn[0], e);
    for (var r = 1; r < qn.length; r++) {
      var n = qn[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    Pt !== null && Ur(Pt, e),
      Rt !== null && Ur(Rt, e),
      Lt !== null && Ur(Lt, e),
      pn.forEach(t),
      hn.forEach(t),
      r = 0;
    r < kt.length;
    r++
  )
    ((n = kt[r]), n.blockedOn === e && (n.blockedOn = null));
  for (; 0 < kt.length && ((r = kt[0]), r.blockedOn === null); )
    (mu(r), r.blockedOn === null && kt.shift());
}
var br = gt.ReactCurrentBatchConfig,
  Sl = !0;
function bm(e, t, r, n) {
  var l = H,
    o = br.transition;
  br.transition = null;
  try {
    ((H = 1), ca(e, t, r, n));
  } finally {
    ((H = l), (br.transition = o));
  }
}
function jm(e, t, r, n) {
  var l = H,
    o = br.transition;
  br.transition = null;
  try {
    ((H = 4), ca(e, t, r, n));
  } finally {
    ((H = l), (br.transition = o));
  }
}
function ca(e, t, r, n) {
  if (Sl) {
    var l = po(e, t, r, n);
    if (l === null) (Ls(e, t, n, Cl, r), mi(e, n));
    else if (vm(l, e, t, r, n)) n.stopPropagation();
    else if ((mi(e, n), t & 4 && -1 < ym.indexOf(e))) {
      for (; l !== null; ) {
        var o = zn(l);
        if (
          (o !== null && cu(o),
          (o = po(e, t, r, n)),
          o === null && Ls(e, t, n, Cl, r),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && n.stopPropagation();
    } else Ls(e, t, n, null, r);
  }
}
var Cl = null;
function po(e, t, r, n) {
  if (((Cl = null), (e = sa(n)), (e = Vt(e)), e !== null))
    if (((t = rr(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = tu(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Cl = e), null);
}
function pu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (cm()) {
        case oa:
          return 1;
        case su:
          return 4;
        case Nl:
        case um:
          return 16;
        case ou:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var _t = null,
  ua = null,
  cl = null;
function hu() {
  if (cl) return cl;
  var e,
    t = ua,
    r = t.length,
    n,
    l = "value" in _t ? _t.value : _t.textContent,
    o = l.length;
  for (e = 0; e < r && t[e] === l[e]; e++);
  var a = r - e;
  for (n = 1; n <= a && t[r - n] === l[o - n]; n++);
  return (cl = l.slice(e, 1 < n ? 1 - n : void 0));
}
function ul(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Qn() {
  return !0;
}
function hi() {
  return !1;
}
function Ae(e) {
  function t(r, n, l, o, a) {
    ((this._reactName = r),
      (this._targetInst = l),
      (this.type = n),
      (this.nativeEvent = o),
      (this.target = a),
      (this.currentTarget = null));
    for (var c in e)
      e.hasOwnProperty(c) && ((r = e[c]), (this[c] = r ? r(o) : o[c]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Qn
        : hi),
      (this.isPropagationStopped = hi),
      this
    );
  }
  return (
    ee(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != "unknown" && (r.returnValue = !1),
          (this.isDefaultPrevented = Qn));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
          (this.isPropagationStopped = Qn));
      },
      persist: function () {},
      isPersistent: Qn,
    }),
    t
  );
}
var zr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  da = Ae(zr),
  Ln = ee({}, zr, { view: 0, detail: 0 }),
  Nm = Ae(Ln),
  js,
  Ns,
  Br,
  Yl = ee({}, Ln, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: fa,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Br &&
            (Br && e.type === "mousemove"
              ? ((js = e.screenX - Br.screenX), (Ns = e.screenY - Br.screenY))
              : (Ns = js = 0),
            (Br = e)),
          js);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ns;
    },
  }),
  gi = Ae(Yl),
  km = ee({}, Yl, { dataTransfer: 0 }),
  Sm = Ae(km),
  Cm = ee({}, Ln, { relatedTarget: 0 }),
  ks = Ae(Cm),
  _m = ee({}, zr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Em = Ae(_m),
  Pm = ee({}, zr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Rm = Ae(Pm),
  Lm = ee({}, zr, { data: 0 }),
  xi = Ae(Lm),
  zm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Mm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Tm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Am(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Tm[e]) ? !!t[e] : !1;
}
function fa() {
  return Am;
}
var Im = ee({}, Ln, {
    key: function (e) {
      if (e.key) {
        var t = zm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ul(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Mm[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fa,
    charCode: function (e) {
      return e.type === "keypress" ? ul(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ul(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Om = Ae(Im),
  Dm = ee({}, Yl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  yi = Ae(Dm),
  $m = ee({}, Ln, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fa,
  }),
  Fm = Ae($m),
  Um = ee({}, zr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bm = Ae(Um),
  Wm = ee({}, Yl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Hm = Ae(Wm),
  Vm = [9, 13, 27, 32],
  ma = dt && "CompositionEvent" in window,
  nn = null;
dt && "documentMode" in document && (nn = document.documentMode);
var qm = dt && "TextEvent" in window && !nn,
  gu = dt && (!ma || (nn && 8 < nn && 11 >= nn)),
  vi = " ",
  wi = !1;
function xu(e, t) {
  switch (e) {
    case "keyup":
      return Vm.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function yu(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var ir = !1;
function Qm(e, t) {
  switch (e) {
    case "compositionend":
      return yu(t);
    case "keypress":
      return t.which !== 32 ? null : ((wi = !0), vi);
    case "textInput":
      return ((e = t.data), e === vi && wi ? null : e);
    default:
      return null;
  }
}
function Gm(e, t) {
  if (ir)
    return e === "compositionend" || (!ma && xu(e, t))
      ? ((e = hu()), (cl = ua = _t = null), (ir = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Ym = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function bi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Ym[e.type] : t === "textarea";
}
function vu(e, t, r, n) {
  (Kc(n),
    (t = _l(t, "onChange")),
    0 < t.length &&
      ((r = new da("onChange", "change", null, r, n)),
      e.push({ event: r, listeners: t })));
}
var ln = null,
  xn = null;
function Km(e) {
  Ru(e, 0);
}
function Kl(e) {
  var t = dr(e);
  if (Wc(t)) return e;
}
function Xm(e, t) {
  if (e === "change") return t;
}
var wu = !1;
if (dt) {
  var Ss;
  if (dt) {
    var Cs = "oninput" in document;
    if (!Cs) {
      var ji = document.createElement("div");
      (ji.setAttribute("oninput", "return;"),
        (Cs = typeof ji.oninput == "function"));
    }
    Ss = Cs;
  } else Ss = !1;
  wu = Ss && (!document.documentMode || 9 < document.documentMode);
}
function Ni() {
  ln && (ln.detachEvent("onpropertychange", bu), (xn = ln = null));
}
function bu(e) {
  if (e.propertyName === "value" && Kl(xn)) {
    var t = [];
    (vu(t, xn, e, sa(e)), eu(Km, t));
  }
}
function Zm(e, t, r) {
  e === "focusin"
    ? (Ni(), (ln = t), (xn = r), ln.attachEvent("onpropertychange", bu))
    : e === "focusout" && Ni();
}
function Jm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Kl(xn);
}
function ep(e, t) {
  if (e === "click") return Kl(t);
}
function tp(e, t) {
  if (e === "input" || e === "change") return Kl(t);
}
function rp(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ye = typeof Object.is == "function" ? Object.is : rp;
function yn(e, t) {
  if (Ye(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var l = r[n];
    if (!Ys.call(t, l) || !Ye(e[l], t[l])) return !1;
  }
  return !0;
}
function ki(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Si(e, t) {
  var r = ki(e);
  e = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = ki(r);
  }
}
function ju(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? ju(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Nu() {
  for (var e = window, t = wl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = wl(e.document);
  }
  return t;
}
function pa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function np(e) {
  var t = Nu(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    ju(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && pa(r)) {
      if (
        ((t = n.start),
        (e = n.end),
        e === void 0 && (e = t),
        "selectionStart" in r)
      )
        ((r.selectionStart = t),
          (r.selectionEnd = Math.min(e, r.value.length)));
      else if (
        ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = r.textContent.length,
          o = Math.min(n.start, l);
        ((n = n.end === void 0 ? o : Math.min(n.end, l)),
          !e.extend && o > n && ((l = n), (n = o), (o = l)),
          (l = Si(r, o)));
        var a = Si(r, n);
        l &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > n
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
      ((e = t[r]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var lp = dt && "documentMode" in document && 11 >= document.documentMode,
  cr = null,
  ho = null,
  sn = null,
  go = !1;
function Ci(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  go ||
    cr == null ||
    cr !== wl(n) ||
    ((n = cr),
    "selectionStart" in n && pa(n)
      ? (n = { start: n.selectionStart, end: n.selectionEnd })
      : ((n = (
          (n.ownerDocument && n.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (n = {
          anchorNode: n.anchorNode,
          anchorOffset: n.anchorOffset,
          focusNode: n.focusNode,
          focusOffset: n.focusOffset,
        })),
    (sn && yn(sn, n)) ||
      ((sn = n),
      (n = _l(ho, "onSelect")),
      0 < n.length &&
        ((t = new da("onSelect", "select", null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = cr))));
}
function Gn(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r["Webkit" + e] = "webkit" + t),
    (r["Moz" + e] = "moz" + t),
    r
  );
}
var ur = {
    animationend: Gn("Animation", "AnimationEnd"),
    animationiteration: Gn("Animation", "AnimationIteration"),
    animationstart: Gn("Animation", "AnimationStart"),
    transitionend: Gn("Transition", "TransitionEnd"),
  },
  _s = {},
  ku = {};
dt &&
  ((ku = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete ur.animationend.animation,
    delete ur.animationiteration.animation,
    delete ur.animationstart.animation),
  "TransitionEvent" in window || delete ur.transitionend.transition);
function Xl(e) {
  if (_s[e]) return _s[e];
  if (!ur[e]) return e;
  var t = ur[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in ku) return (_s[e] = t[r]);
  return e;
}
var Su = Xl("animationend"),
  Cu = Xl("animationiteration"),
  _u = Xl("animationstart"),
  Eu = Xl("transitionend"),
  Pu = new Map(),
  _i =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function $t(e, t) {
  (Pu.set(e, t), tr(t, [e]));
}
for (var Es = 0; Es < _i.length; Es++) {
  var Ps = _i[Es],
    sp = Ps.toLowerCase(),
    op = Ps[0].toUpperCase() + Ps.slice(1);
  $t(sp, "on" + op);
}
$t(Su, "onAnimationEnd");
$t(Cu, "onAnimationIteration");
$t(_u, "onAnimationStart");
$t("dblclick", "onDoubleClick");
$t("focusin", "onFocus");
$t("focusout", "onBlur");
$t(Eu, "onTransitionEnd");
kr("onMouseEnter", ["mouseout", "mouseover"]);
kr("onMouseLeave", ["mouseout", "mouseover"]);
kr("onPointerEnter", ["pointerout", "pointerover"]);
kr("onPointerLeave", ["pointerout", "pointerover"]);
tr(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
tr(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
tr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
tr(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
tr(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
tr(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Jr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ap = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jr));
function Ei(e, t, r) {
  var n = e.type || "unknown-event";
  ((e.currentTarget = r), sm(n, t, void 0, e), (e.currentTarget = null));
}
function Ru(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      l = n.event;
    n = n.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var a = n.length - 1; 0 <= a; a--) {
          var c = n[a],
            i = c.instance,
            u = c.currentTarget;
          if (((c = c.listener), i !== o && l.isPropagationStopped())) break e;
          (Ei(l, c, u), (o = i));
        }
      else
        for (a = 0; a < n.length; a++) {
          if (
            ((c = n[a]),
            (i = c.instance),
            (u = c.currentTarget),
            (c = c.listener),
            i !== o && l.isPropagationStopped())
          )
            break e;
          (Ei(l, c, u), (o = i));
        }
    }
  }
  if (jl) throw ((e = uo), (jl = !1), (uo = null), e);
}
function q(e, t) {
  var r = t[bo];
  r === void 0 && (r = t[bo] = new Set());
  var n = e + "__bubble";
  r.has(n) || (Lu(t, e, 2, !1), r.add(n));
}
function Rs(e, t, r) {
  var n = 0;
  (t && (n |= 4), Lu(r, e, n, t));
}
var Yn = "_reactListening" + Math.random().toString(36).slice(2);
function vn(e) {
  if (!e[Yn]) {
    ((e[Yn] = !0),
      Dc.forEach(function (r) {
        r !== "selectionchange" && (ap.has(r) || Rs(r, !1, e), Rs(r, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Yn] || ((t[Yn] = !0), Rs("selectionchange", !1, t));
  }
}
function Lu(e, t, r, n) {
  switch (pu(t)) {
    case 1:
      var l = bm;
      break;
    case 4:
      l = jm;
      break;
    default:
      l = ca;
  }
  ((r = l.bind(null, t, r, e)),
    (l = void 0),
    !co ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    n
      ? l !== void 0
        ? e.addEventListener(t, r, { capture: !0, passive: l })
        : e.addEventListener(t, r, !0)
      : l !== void 0
        ? e.addEventListener(t, r, { passive: l })
        : e.addEventListener(t, r, !1));
}
function Ls(e, t, r, n, l) {
  var o = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var a = n.tag;
      if (a === 3 || a === 4) {
        var c = n.stateNode.containerInfo;
        if (c === l || (c.nodeType === 8 && c.parentNode === l)) break;
        if (a === 4)
          for (a = n.return; a !== null; ) {
            var i = a.tag;
            if (
              (i === 3 || i === 4) &&
              ((i = a.stateNode.containerInfo),
              i === l || (i.nodeType === 8 && i.parentNode === l))
            )
              return;
            a = a.return;
          }
        for (; c !== null; ) {
          if (((a = Vt(c)), a === null)) return;
          if (((i = a.tag), i === 5 || i === 6)) {
            n = o = a;
            continue e;
          }
          c = c.parentNode;
        }
      }
      n = n.return;
    }
  eu(function () {
    var u = o,
      p = sa(r),
      f = [];
    e: {
      var g = Pu.get(e);
      if (g !== void 0) {
        var v = da,
          x = e;
        switch (e) {
          case "keypress":
            if (ul(r) === 0) break e;
          case "keydown":
          case "keyup":
            v = Om;
            break;
          case "focusin":
            ((x = "focus"), (v = ks));
            break;
          case "focusout":
            ((x = "blur"), (v = ks));
            break;
          case "beforeblur":
          case "afterblur":
            v = ks;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = gi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Sm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Fm;
            break;
          case Su:
          case Cu:
          case _u:
            v = Em;
            break;
          case Eu:
            v = Bm;
            break;
          case "scroll":
            v = Nm;
            break;
          case "wheel":
            v = Hm;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Rm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = yi;
        }
        var w = (t & 4) !== 0,
          N = !w && e === "scroll",
          h = w ? (g !== null ? g + "Capture" : null) : g;
        w = [];
        for (var m = u, d; m !== null; ) {
          d = m;
          var b = d.stateNode;
          if (
            (d.tag === 5 &&
              b !== null &&
              ((d = b),
              h !== null && ((b = mn(m, h)), b != null && w.push(wn(m, b, d)))),
            N)
          )
            break;
          m = m.return;
        }
        0 < w.length &&
          ((g = new v(g, x, null, r, p)), f.push({ event: g, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          g &&
            r !== ao &&
            (x = r.relatedTarget || r.fromElement) &&
            (Vt(x) || x[ft]))
        )
          break e;
        if (
          (v || g) &&
          ((g =
            p.window === p
              ? p
              : (g = p.ownerDocument)
                ? g.defaultView || g.parentWindow
                : window),
          v
            ? ((x = r.relatedTarget || r.toElement),
              (v = u),
              (x = x ? Vt(x) : null),
              x !== null &&
                ((N = rr(x)), x !== N || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((v = null), (x = u)),
          v !== x)
        ) {
          if (
            ((w = gi),
            (b = "onMouseLeave"),
            (h = "onMouseEnter"),
            (m = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = yi),
              (b = "onPointerLeave"),
              (h = "onPointerEnter"),
              (m = "pointer")),
            (N = v == null ? g : dr(v)),
            (d = x == null ? g : dr(x)),
            (g = new w(b, m + "leave", v, r, p)),
            (g.target = N),
            (g.relatedTarget = d),
            (b = null),
            Vt(p) === u &&
              ((w = new w(h, m + "enter", x, r, p)),
              (w.target = d),
              (w.relatedTarget = N),
              (b = w)),
            (N = b),
            v && x)
          )
            t: {
              for (w = v, h = x, m = 0, d = w; d; d = nr(d)) m++;
              for (d = 0, b = h; b; b = nr(b)) d++;
              for (; 0 < m - d; ) ((w = nr(w)), m--);
              for (; 0 < d - m; ) ((h = nr(h)), d--);
              for (; m--; ) {
                if (w === h || (h !== null && w === h.alternate)) break t;
                ((w = nr(w)), (h = nr(h)));
              }
              w = null;
            }
          else w = null;
          (v !== null && Pi(f, g, v, w, !1),
            x !== null && N !== null && Pi(f, N, x, w, !0));
        }
      }
      e: {
        if (
          ((g = u ? dr(u) : window),
          (v = g.nodeName && g.nodeName.toLowerCase()),
          v === "select" || (v === "input" && g.type === "file"))
        )
          var C = Xm;
        else if (bi(g))
          if (wu) C = tp;
          else {
            C = Jm;
            var R = Zm;
          }
        else
          (v = g.nodeName) &&
            v.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (C = ep);
        if (C && (C = C(e, u))) {
          vu(f, C, r, p);
          break e;
        }
        (R && R(e, g, u),
          e === "focusout" &&
            (R = g._wrapperState) &&
            R.controlled &&
            g.type === "number" &&
            ro(g, "number", g.value));
      }
      switch (((R = u ? dr(u) : window), e)) {
        case "focusin":
          (bi(R) || R.contentEditable === "true") &&
            ((cr = R), (ho = u), (sn = null));
          break;
        case "focusout":
          sn = ho = cr = null;
          break;
        case "mousedown":
          go = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((go = !1), Ci(f, r, p));
          break;
        case "selectionchange":
          if (lp) break;
        case "keydown":
        case "keyup":
          Ci(f, r, p);
      }
      var E;
      if (ma)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        ir
          ? xu(e, r) && (k = "onCompositionEnd")
          : e === "keydown" && r.keyCode === 229 && (k = "onCompositionStart");
      (k &&
        (gu &&
          r.locale !== "ko" &&
          (ir || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && ir && (E = hu())
            : ((_t = p),
              (ua = "value" in _t ? _t.value : _t.textContent),
              (ir = !0))),
        (R = _l(u, k)),
        0 < R.length &&
          ((k = new xi(k, e, null, r, p)),
          f.push({ event: k, listeners: R }),
          E ? (k.data = E) : ((E = yu(r)), E !== null && (k.data = E)))),
        (E = qm ? Qm(e, r) : Gm(e, r)) &&
          ((u = _l(u, "onBeforeInput")),
          0 < u.length &&
            ((p = new xi("onBeforeInput", "beforeinput", null, r, p)),
            f.push({ event: p, listeners: u }),
            (p.data = E))));
    }
    Ru(f, t);
  });
}
function wn(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function _l(e, t) {
  for (var r = t + "Capture", n = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    (l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = mn(e, r)),
      o != null && n.unshift(wn(e, o, l)),
      (o = mn(e, t)),
      o != null && n.push(wn(e, o, l))),
      (e = e.return));
  }
  return n;
}
function nr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Pi(e, t, r, n, l) {
  for (var o = t._reactName, a = []; r !== null && r !== n; ) {
    var c = r,
      i = c.alternate,
      u = c.stateNode;
    if (i !== null && i === n) break;
    (c.tag === 5 &&
      u !== null &&
      ((c = u),
      l
        ? ((i = mn(r, o)), i != null && a.unshift(wn(r, i, c)))
        : l || ((i = mn(r, o)), i != null && a.push(wn(r, i, c)))),
      (r = r.return));
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var ip = /\r\n?/g,
  cp = /\u0000|\uFFFD/g;
function Ri(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      ip,
      `
`,
    )
    .replace(cp, "");
}
function Kn(e, t, r) {
  if (((t = Ri(t)), Ri(e) !== t && r)) throw Error(_(425));
}
function El() {}
var xo = null,
  yo = null;
function vo(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var wo = typeof setTimeout == "function" ? setTimeout : void 0,
  up = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Li = typeof Promise == "function" ? Promise : void 0,
  dp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Li < "u"
        ? function (e) {
            return Li.resolve(null).then(e).catch(fp);
          }
        : wo;
function fp(e) {
  setTimeout(function () {
    throw e;
  });
}
function zs(e, t) {
  var r = t,
    n = 0;
  do {
    var l = r.nextSibling;
    if ((e.removeChild(r), l && l.nodeType === 8))
      if (((r = l.data), r === "/$")) {
        if (n === 0) {
          (e.removeChild(l), gn(t));
          return;
        }
        n--;
      } else (r !== "$" && r !== "$?" && r !== "$!") || n++;
    r = l;
  } while (r);
  gn(t);
}
function zt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function zi(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Mr = Math.random().toString(36).slice(2),
  Je = "__reactFiber$" + Mr,
  bn = "__reactProps$" + Mr,
  ft = "__reactContainer$" + Mr,
  bo = "__reactEvents$" + Mr,
  mp = "__reactListeners$" + Mr,
  pp = "__reactHandles$" + Mr;
function Vt(e) {
  var t = e[Je];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if ((t = r[ft] || r[Je])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = zi(e); e !== null; ) {
          if ((r = e[Je])) return r;
          e = zi(e);
        }
      return t;
    }
    ((e = r), (r = e.parentNode));
  }
  return null;
}
function zn(e) {
  return (
    (e = e[Je] || e[ft]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function dr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function Zl(e) {
  return e[bn] || null;
}
var jo = [],
  fr = -1;
function Ft(e) {
  return { current: e };
}
function Q(e) {
  0 > fr || ((e.current = jo[fr]), (jo[fr] = null), fr--);
}
function V(e, t) {
  (fr++, (jo[fr] = e.current), (e.current = t));
}
var Dt = {},
  we = Ft(Dt),
  _e = Ft(!1),
  Kt = Dt;
function Sr(e, t) {
  var r = e.type.contextTypes;
  if (!r) return Dt;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
    return n.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in r) l[o] = t[o];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Ee(e) {
  return ((e = e.childContextTypes), e != null);
}
function Pl() {
  (Q(_e), Q(we));
}
function Mi(e, t, r) {
  if (we.current !== Dt) throw Error(_(168));
  (V(we, t), V(_e, r));
}
function zu(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != "function"))
    return r;
  n = n.getChildContext();
  for (var l in n) if (!(l in t)) throw Error(_(108, Zf(e) || "Unknown", l));
  return ee({}, r, n);
}
function Rl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Dt),
    (Kt = we.current),
    V(we, e),
    V(_e, _e.current),
    !0
  );
}
function Ti(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(_(169));
  (r
    ? ((e = zu(e, t, Kt)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      Q(_e),
      Q(we),
      V(we, e))
    : Q(_e),
    V(_e, r));
}
var ot = null,
  Jl = !1,
  Ms = !1;
function Mu(e) {
  ot === null ? (ot = [e]) : ot.push(e);
}
function hp(e) {
  ((Jl = !0), Mu(e));
}
function Ut() {
  if (!Ms && ot !== null) {
    Ms = !0;
    var e = 0,
      t = H;
    try {
      var r = ot;
      for (H = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      ((ot = null), (Jl = !1));
    } catch (l) {
      throw (ot !== null && (ot = ot.slice(e + 1)), lu(oa, Ut), l);
    } finally {
      ((H = t), (Ms = !1));
    }
  }
  return null;
}
var mr = [],
  pr = 0,
  Ll = null,
  zl = 0,
  Oe = [],
  De = 0,
  Xt = null,
  at = 1,
  it = "";
function Wt(e, t) {
  ((mr[pr++] = zl), (mr[pr++] = Ll), (Ll = e), (zl = t));
}
function Tu(e, t, r) {
  ((Oe[De++] = at), (Oe[De++] = it), (Oe[De++] = Xt), (Xt = e));
  var n = at;
  e = it;
  var l = 32 - Qe(n) - 1;
  ((n &= ~(1 << l)), (r += 1));
  var o = 32 - Qe(t) + l;
  if (30 < o) {
    var a = l - (l % 5);
    ((o = (n & ((1 << a) - 1)).toString(32)),
      (n >>= a),
      (l -= a),
      (at = (1 << (32 - Qe(t) + l)) | (r << l) | n),
      (it = o + e));
  } else ((at = (1 << o) | (r << l) | n), (it = e));
}
function ha(e) {
  e.return !== null && (Wt(e, 1), Tu(e, 1, 0));
}
function ga(e) {
  for (; e === Ll; )
    ((Ll = mr[--pr]), (mr[pr] = null), (zl = mr[--pr]), (mr[pr] = null));
  for (; e === Xt; )
    ((Xt = Oe[--De]),
      (Oe[De] = null),
      (it = Oe[--De]),
      (Oe[De] = null),
      (at = Oe[--De]),
      (Oe[De] = null));
}
var ze = null,
  Le = null,
  Y = !1,
  qe = null;
function Au(e, t) {
  var r = $e(5, null, null, 0);
  ((r.elementType = "DELETED"),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
}
function Ai(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ze = e), (Le = zt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ze = e), (Le = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = Xt !== null ? { id: at, overflow: it } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = $e(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (ze = e),
            (Le = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function No(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ko(e) {
  if (Y) {
    var t = Le;
    if (t) {
      var r = t;
      if (!Ai(e, t)) {
        if (No(e)) throw Error(_(418));
        t = zt(r.nextSibling);
        var n = ze;
        t && Ai(e, t)
          ? Au(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (Y = !1), (ze = e));
      }
    } else {
      if (No(e)) throw Error(_(418));
      ((e.flags = (e.flags & -4097) | 2), (Y = !1), (ze = e));
    }
  }
}
function Ii(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ze = e;
}
function Xn(e) {
  if (e !== ze) return !1;
  if (!Y) return (Ii(e), (Y = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !vo(e.type, e.memoizedProps))),
    t && (t = Le))
  ) {
    if (No(e)) throw (Iu(), Error(_(418)));
    for (; t; ) (Au(e, t), (t = zt(t.nextSibling)));
  }
  if ((Ii(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Le = zt(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = ze ? zt(e.stateNode.nextSibling) : null;
  return !0;
}
function Iu() {
  for (var e = Le; e; ) e = zt(e.nextSibling);
}
function Cr() {
  ((Le = ze = null), (Y = !1));
}
function xa(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var gp = gt.ReactCurrentBatchConfig;
function Wr(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error(_(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(_(147, e));
      var l = n,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (a) {
            var c = l.refs;
            a === null ? delete c[o] : (c[o] = a);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!r._owner) throw Error(_(290, e));
  }
  return e;
}
function Zn(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      _(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Oi(e) {
  var t = e._init;
  return t(e._payload);
}
function Ou(e) {
  function t(h, m) {
    if (e) {
      var d = h.deletions;
      d === null ? ((h.deletions = [m]), (h.flags |= 16)) : d.push(m);
    }
  }
  function r(h, m) {
    if (!e) return null;
    for (; m !== null; ) (t(h, m), (m = m.sibling));
    return null;
  }
  function n(h, m) {
    for (h = new Map(); m !== null; )
      (m.key !== null ? h.set(m.key, m) : h.set(m.index, m), (m = m.sibling));
    return h;
  }
  function l(h, m) {
    return ((h = It(h, m)), (h.index = 0), (h.sibling = null), h);
  }
  function o(h, m, d) {
    return (
      (h.index = d),
      e
        ? ((d = h.alternate),
          d !== null
            ? ((d = d.index), d < m ? ((h.flags |= 2), m) : d)
            : ((h.flags |= 2), m))
        : ((h.flags |= 1048576), m)
    );
  }
  function a(h) {
    return (e && h.alternate === null && (h.flags |= 2), h);
  }
  function c(h, m, d, b) {
    return m === null || m.tag !== 6
      ? ((m = Fs(d, h.mode, b)), (m.return = h), m)
      : ((m = l(m, d)), (m.return = h), m);
  }
  function i(h, m, d, b) {
    var C = d.type;
    return C === ar
      ? p(h, m, d.props.children, b, d.key)
      : m !== null &&
          (m.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === jt &&
              Oi(C) === m.type))
        ? ((b = l(m, d.props)), (b.ref = Wr(h, m, d)), (b.return = h), b)
        : ((b = xl(d.type, d.key, d.props, null, h.mode, b)),
          (b.ref = Wr(h, m, d)),
          (b.return = h),
          b);
  }
  function u(h, m, d, b) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== d.containerInfo ||
      m.stateNode.implementation !== d.implementation
      ? ((m = Us(d, h.mode, b)), (m.return = h), m)
      : ((m = l(m, d.children || [])), (m.return = h), m);
  }
  function p(h, m, d, b, C) {
    return m === null || m.tag !== 7
      ? ((m = Yt(d, h.mode, b, C)), (m.return = h), m)
      : ((m = l(m, d)), (m.return = h), m);
  }
  function f(h, m, d) {
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return ((m = Fs("" + m, h.mode, d)), (m.return = h), m);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Un:
          return (
            (d = xl(m.type, m.key, m.props, null, h.mode, d)),
            (d.ref = Wr(h, null, m)),
            (d.return = h),
            d
          );
        case or:
          return ((m = Us(m, h.mode, d)), (m.return = h), m);
        case jt:
          var b = m._init;
          return f(h, b(m._payload), d);
      }
      if (Xr(m) || Dr(m))
        return ((m = Yt(m, h.mode, d, null)), (m.return = h), m);
      Zn(h, m);
    }
    return null;
  }
  function g(h, m, d, b) {
    var C = m !== null ? m.key : null;
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return C !== null ? null : c(h, m, "" + d, b);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Un:
          return d.key === C ? i(h, m, d, b) : null;
        case or:
          return d.key === C ? u(h, m, d, b) : null;
        case jt:
          return ((C = d._init), g(h, m, C(d._payload), b));
      }
      if (Xr(d) || Dr(d)) return C !== null ? null : p(h, m, d, b, null);
      Zn(h, d);
    }
    return null;
  }
  function v(h, m, d, b, C) {
    if ((typeof b == "string" && b !== "") || typeof b == "number")
      return ((h = h.get(d) || null), c(m, h, "" + b, C));
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case Un:
          return (
            (h = h.get(b.key === null ? d : b.key) || null),
            i(m, h, b, C)
          );
        case or:
          return (
            (h = h.get(b.key === null ? d : b.key) || null),
            u(m, h, b, C)
          );
        case jt:
          var R = b._init;
          return v(h, m, d, R(b._payload), C);
      }
      if (Xr(b) || Dr(b)) return ((h = h.get(d) || null), p(m, h, b, C, null));
      Zn(m, b);
    }
    return null;
  }
  function x(h, m, d, b) {
    for (
      var C = null, R = null, E = m, k = (m = 0), P = null;
      E !== null && k < d.length;
      k++
    ) {
      E.index > k ? ((P = E), (E = null)) : (P = E.sibling);
      var M = g(h, E, d[k], b);
      if (M === null) {
        E === null && (E = P);
        break;
      }
      (e && E && M.alternate === null && t(h, E),
        (m = o(M, m, k)),
        R === null ? (C = M) : (R.sibling = M),
        (R = M),
        (E = P));
    }
    if (k === d.length) return (r(h, E), Y && Wt(h, k), C);
    if (E === null) {
      for (; k < d.length; k++)
        ((E = f(h, d[k], b)),
          E !== null &&
            ((m = o(E, m, k)),
            R === null ? (C = E) : (R.sibling = E),
            (R = E)));
      return (Y && Wt(h, k), C);
    }
    for (E = n(h, E); k < d.length; k++)
      ((P = v(E, h, k, d[k], b)),
        P !== null &&
          (e && P.alternate !== null && E.delete(P.key === null ? k : P.key),
          (m = o(P, m, k)),
          R === null ? (C = P) : (R.sibling = P),
          (R = P)));
    return (
      e &&
        E.forEach(function (S) {
          return t(h, S);
        }),
      Y && Wt(h, k),
      C
    );
  }
  function w(h, m, d, b) {
    var C = Dr(d);
    if (typeof C != "function") throw Error(_(150));
    if (((d = C.call(d)), d == null)) throw Error(_(151));
    for (
      var R = (C = null), E = m, k = (m = 0), P = null, M = d.next();
      E !== null && !M.done;
      k++, M = d.next()
    ) {
      E.index > k ? ((P = E), (E = null)) : (P = E.sibling);
      var S = g(h, E, M.value, b);
      if (S === null) {
        E === null && (E = P);
        break;
      }
      (e && E && S.alternate === null && t(h, E),
        (m = o(S, m, k)),
        R === null ? (C = S) : (R.sibling = S),
        (R = S),
        (E = P));
    }
    if (M.done) return (r(h, E), Y && Wt(h, k), C);
    if (E === null) {
      for (; !M.done; k++, M = d.next())
        ((M = f(h, M.value, b)),
          M !== null &&
            ((m = o(M, m, k)),
            R === null ? (C = M) : (R.sibling = M),
            (R = M)));
      return (Y && Wt(h, k), C);
    }
    for (E = n(h, E); !M.done; k++, M = d.next())
      ((M = v(E, h, k, M.value, b)),
        M !== null &&
          (e && M.alternate !== null && E.delete(M.key === null ? k : M.key),
          (m = o(M, m, k)),
          R === null ? (C = M) : (R.sibling = M),
          (R = M)));
    return (
      e &&
        E.forEach(function (z) {
          return t(h, z);
        }),
      Y && Wt(h, k),
      C
    );
  }
  function N(h, m, d, b) {
    if (
      (typeof d == "object" &&
        d !== null &&
        d.type === ar &&
        d.key === null &&
        (d = d.props.children),
      typeof d == "object" && d !== null)
    ) {
      switch (d.$$typeof) {
        case Un:
          e: {
            for (var C = d.key, R = m; R !== null; ) {
              if (R.key === C) {
                if (((C = d.type), C === ar)) {
                  if (R.tag === 7) {
                    (r(h, R.sibling),
                      (m = l(R, d.props.children)),
                      (m.return = h),
                      (h = m));
                    break e;
                  }
                } else if (
                  R.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === jt &&
                    Oi(C) === R.type)
                ) {
                  (r(h, R.sibling),
                    (m = l(R, d.props)),
                    (m.ref = Wr(h, R, d)),
                    (m.return = h),
                    (h = m));
                  break e;
                }
                r(h, R);
                break;
              } else t(h, R);
              R = R.sibling;
            }
            d.type === ar
              ? ((m = Yt(d.props.children, h.mode, b, d.key)),
                (m.return = h),
                (h = m))
              : ((b = xl(d.type, d.key, d.props, null, h.mode, b)),
                (b.ref = Wr(h, m, d)),
                (b.return = h),
                (h = b));
          }
          return a(h);
        case or:
          e: {
            for (R = d.key; m !== null; ) {
              if (m.key === R)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === d.containerInfo &&
                  m.stateNode.implementation === d.implementation
                ) {
                  (r(h, m.sibling),
                    (m = l(m, d.children || [])),
                    (m.return = h),
                    (h = m));
                  break e;
                } else {
                  r(h, m);
                  break;
                }
              else t(h, m);
              m = m.sibling;
            }
            ((m = Us(d, h.mode, b)), (m.return = h), (h = m));
          }
          return a(h);
        case jt:
          return ((R = d._init), N(h, m, R(d._payload), b));
      }
      if (Xr(d)) return x(h, m, d, b);
      if (Dr(d)) return w(h, m, d, b);
      Zn(h, d);
    }
    return (typeof d == "string" && d !== "") || typeof d == "number"
      ? ((d = "" + d),
        m !== null && m.tag === 6
          ? (r(h, m.sibling), (m = l(m, d)), (m.return = h), (h = m))
          : (r(h, m), (m = Fs(d, h.mode, b)), (m.return = h), (h = m)),
        a(h))
      : r(h, m);
  }
  return N;
}
var _r = Ou(!0),
  Du = Ou(!1),
  Ml = Ft(null),
  Tl = null,
  hr = null,
  ya = null;
function va() {
  ya = hr = Tl = null;
}
function wa(e) {
  var t = Ml.current;
  (Q(Ml), (e._currentValue = t));
}
function So(e, t, r) {
  for (; e !== null; ) {
    var n = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
        : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
      e === r)
    )
      break;
    e = e.return;
  }
}
function jr(e, t) {
  ((Tl = e),
    (ya = hr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ce = !0), (e.firstContext = null)));
}
function Ue(e) {
  var t = e._currentValue;
  if (ya !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), hr === null)) {
      if (Tl === null) throw Error(_(308));
      ((hr = e), (Tl.dependencies = { lanes: 0, firstContext: e }));
    } else hr = hr.next = e;
  return t;
}
var qt = null;
function ba(e) {
  qt === null ? (qt = [e]) : qt.push(e);
}
function $u(e, t, r, n) {
  var l = t.interleaved;
  return (
    l === null ? ((r.next = r), ba(t)) : ((r.next = l.next), (l.next = r)),
    (t.interleaved = r),
    mt(e, n)
  );
}
function mt(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (r = e.alternate),
      r !== null && (r.childLanes |= t),
      (r = e),
      (e = e.return));
  return r.tag === 3 ? r.stateNode : null;
}
var Nt = !1;
function ja(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Fu(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function ct(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Mt(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), B & 2)) {
    var l = n.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (n.pending = t),
      mt(e, r)
    );
  }
  return (
    (l = n.interleaved),
    l === null ? ((t.next = t), ba(n)) : ((t.next = l.next), (l.next = t)),
    (n.interleaved = t),
    mt(e, r)
  );
}
function dl(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), aa(e, r));
  }
}
function Di(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var l = null,
      o = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var a = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        (o === null ? (l = o = a) : (o = o.next = a), (r = r.next));
      } while (r !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    ((r = {
      baseState: n.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = r));
    return;
  }
  ((e = r.lastBaseUpdate),
    e === null ? (r.firstBaseUpdate = t) : (e.next = t),
    (r.lastBaseUpdate = t));
}
function Al(e, t, r, n) {
  var l = e.updateQueue;
  Nt = !1;
  var o = l.firstBaseUpdate,
    a = l.lastBaseUpdate,
    c = l.shared.pending;
  if (c !== null) {
    l.shared.pending = null;
    var i = c,
      u = i.next;
    ((i.next = null), a === null ? (o = u) : (a.next = u), (a = i));
    var p = e.alternate;
    p !== null &&
      ((p = p.updateQueue),
      (c = p.lastBaseUpdate),
      c !== a &&
        (c === null ? (p.firstBaseUpdate = u) : (c.next = u),
        (p.lastBaseUpdate = i)));
  }
  if (o !== null) {
    var f = l.baseState;
    ((a = 0), (p = u = i = null), (c = o));
    do {
      var g = c.lane,
        v = c.eventTime;
      if ((n & g) === g) {
        p !== null &&
          (p = p.next =
            {
              eventTime: v,
              lane: 0,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null,
            });
        e: {
          var x = e,
            w = c;
          switch (((g = t), (v = r), w.tag)) {
            case 1:
              if (((x = w.payload), typeof x == "function")) {
                f = x.call(v, f, g);
                break e;
              }
              f = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = w.payload),
                (g = typeof x == "function" ? x.call(v, f, g) : x),
                g == null)
              )
                break e;
              f = ee({}, f, g);
              break e;
            case 2:
              Nt = !0;
          }
        }
        c.callback !== null &&
          c.lane !== 0 &&
          ((e.flags |= 64),
          (g = l.effects),
          g === null ? (l.effects = [c]) : g.push(c));
      } else
        ((v = {
          eventTime: v,
          lane: g,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null,
        }),
          p === null ? ((u = p = v), (i = f)) : (p = p.next = v),
          (a |= g));
      if (((c = c.next), c === null)) {
        if (((c = l.shared.pending), c === null)) break;
        ((g = c),
          (c = g.next),
          (g.next = null),
          (l.lastBaseUpdate = g),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (p === null && (i = f),
      (l.baseState = i),
      (l.firstBaseUpdate = u),
      (l.lastBaseUpdate = p),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((a |= l.lane), (l = l.next));
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    ((Jt |= a), (e.lanes = a), (e.memoizedState = f));
  }
}
function $i(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        l = n.callback;
      if (l !== null) {
        if (((n.callback = null), (n = r), typeof l != "function"))
          throw Error(_(191, l));
        l.call(n);
      }
    }
}
var Mn = {},
  tt = Ft(Mn),
  jn = Ft(Mn),
  Nn = Ft(Mn);
function Qt(e) {
  if (e === Mn) throw Error(_(174));
  return e;
}
function Na(e, t) {
  switch ((V(Nn, t), V(jn, e), V(tt, Mn), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : lo(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = lo(t, e)));
  }
  (Q(tt), V(tt, t));
}
function Er() {
  (Q(tt), Q(jn), Q(Nn));
}
function Uu(e) {
  Qt(Nn.current);
  var t = Qt(tt.current),
    r = lo(t, e.type);
  t !== r && (V(jn, e), V(tt, r));
}
function ka(e) {
  jn.current === e && (Q(tt), Q(jn));
}
var X = Ft(0);
function Il(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        r !== null &&
        ((r = r.dehydrated), r === null || r.data === "$?" || r.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var Ts = [];
function Sa() {
  for (var e = 0; e < Ts.length; e++)
    Ts[e]._workInProgressVersionPrimary = null;
  Ts.length = 0;
}
var fl = gt.ReactCurrentDispatcher,
  As = gt.ReactCurrentBatchConfig,
  Zt = 0,
  Z = null,
  ue = null,
  fe = null,
  Ol = !1,
  on = !1,
  kn = 0,
  xp = 0;
function xe() {
  throw Error(_(321));
}
function Ca(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!Ye(e[r], t[r])) return !1;
  return !0;
}
function _a(e, t, r, n, l, o) {
  if (
    ((Zt = o),
    (Z = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (fl.current = e === null || e.memoizedState === null ? bp : jp),
    (e = r(n, l)),
    on)
  ) {
    o = 0;
    do {
      if (((on = !1), (kn = 0), 25 <= o)) throw Error(_(301));
      ((o += 1),
        (fe = ue = null),
        (t.updateQueue = null),
        (fl.current = Np),
        (e = r(n, l)));
    } while (on);
  }
  if (
    ((fl.current = Dl),
    (t = ue !== null && ue.next !== null),
    (Zt = 0),
    (fe = ue = Z = null),
    (Ol = !1),
    t)
  )
    throw Error(_(300));
  return e;
}
function Ea() {
  var e = kn !== 0;
  return ((kn = 0), e);
}
function Ze() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (fe === null ? (Z.memoizedState = fe = e) : (fe = fe.next = e), fe);
}
function Be() {
  if (ue === null) {
    var e = Z.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ue.next;
  var t = fe === null ? Z.memoizedState : fe.next;
  if (t !== null) ((fe = t), (ue = e));
  else {
    if (e === null) throw Error(_(310));
    ((ue = e),
      (e = {
        memoizedState: ue.memoizedState,
        baseState: ue.baseState,
        baseQueue: ue.baseQueue,
        queue: ue.queue,
        next: null,
      }),
      fe === null ? (Z.memoizedState = fe = e) : (fe = fe.next = e));
  }
  return fe;
}
function Sn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Is(e) {
  var t = Be(),
    r = t.queue;
  if (r === null) throw Error(_(311));
  r.lastRenderedReducer = e;
  var n = ue,
    l = n.baseQueue,
    o = r.pending;
  if (o !== null) {
    if (l !== null) {
      var a = l.next;
      ((l.next = o.next), (o.next = a));
    }
    ((n.baseQueue = l = o), (r.pending = null));
  }
  if (l !== null) {
    ((o = l.next), (n = n.baseState));
    var c = (a = null),
      i = null,
      u = o;
    do {
      var p = u.lane;
      if ((Zt & p) === p)
        (i !== null &&
          (i = i.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (n = u.hasEagerState ? u.eagerState : e(n, u.action)));
      else {
        var f = {
          lane: p,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (i === null ? ((c = i = f), (a = n)) : (i = i.next = f),
          (Z.lanes |= p),
          (Jt |= p));
      }
      u = u.next;
    } while (u !== null && u !== o);
    (i === null ? (a = n) : (i.next = c),
      Ye(n, t.memoizedState) || (Ce = !0),
      (t.memoizedState = n),
      (t.baseState = a),
      (t.baseQueue = i),
      (r.lastRenderedState = n));
  }
  if (((e = r.interleaved), e !== null)) {
    l = e;
    do ((o = l.lane), (Z.lanes |= o), (Jt |= o), (l = l.next));
    while (l !== e);
  } else l === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function Os(e) {
  var t = Be(),
    r = t.queue;
  if (r === null) throw Error(_(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    l = r.pending,
    o = t.memoizedState;
  if (l !== null) {
    r.pending = null;
    var a = (l = l.next);
    do ((o = e(o, a.action)), (a = a.next));
    while (a !== l);
    (Ye(o, t.memoizedState) || (Ce = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (r.lastRenderedState = o));
  }
  return [o, n];
}
function Bu() {}
function Wu(e, t) {
  var r = Z,
    n = Be(),
    l = t(),
    o = !Ye(n.memoizedState, l);
  if (
    (o && ((n.memoizedState = l), (Ce = !0)),
    (n = n.queue),
    Pa(qu.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || o || (fe !== null && fe.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      Cn(9, Vu.bind(null, r, n, l, t), void 0, null),
      me === null)
    )
      throw Error(_(349));
    Zt & 30 || Hu(r, t, l);
  }
  return l;
}
function Hu(e, t, r) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = Z.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Z.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
}
function Vu(e, t, r, n) {
  ((t.value = r), (t.getSnapshot = n), Qu(t) && Gu(e));
}
function qu(e, t, r) {
  return r(function () {
    Qu(t) && Gu(e);
  });
}
function Qu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !Ye(e, r);
  } catch {
    return !0;
  }
}
function Gu(e) {
  var t = mt(e, 1);
  t !== null && Ge(t, e, 1, -1);
}
function Fi(e) {
  var t = Ze();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sn,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = wp.bind(null, Z, e)),
    [t.memoizedState, e]
  );
}
function Cn(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = Z.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Z.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Yu() {
  return Be().memoizedState;
}
function ml(e, t, r, n) {
  var l = Ze();
  ((Z.flags |= e),
    (l.memoizedState = Cn(1 | t, r, void 0, n === void 0 ? null : n)));
}
function es(e, t, r, n) {
  var l = Be();
  n = n === void 0 ? null : n;
  var o = void 0;
  if (ue !== null) {
    var a = ue.memoizedState;
    if (((o = a.destroy), n !== null && Ca(n, a.deps))) {
      l.memoizedState = Cn(t, r, o, n);
      return;
    }
  }
  ((Z.flags |= e), (l.memoizedState = Cn(1 | t, r, o, n)));
}
function Ui(e, t) {
  return ml(8390656, 8, e, t);
}
function Pa(e, t) {
  return es(2048, 8, e, t);
}
function Ku(e, t) {
  return es(4, 2, e, t);
}
function Xu(e, t) {
  return es(4, 4, e, t);
}
function Zu(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Ju(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null),
    es(4, 4, Zu.bind(null, t, e), r)
  );
}
function Ra() {}
function ed(e, t) {
  var r = Be();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Ca(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function td(e, t) {
  var r = Be();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Ca(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function rd(e, t, r) {
  return Zt & 21
    ? (Ye(r, t) || ((r = au()), (Z.lanes |= r), (Jt |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ce = !0)), (e.memoizedState = r));
}
function yp(e, t) {
  var r = H;
  ((H = r !== 0 && 4 > r ? r : 4), e(!0));
  var n = As.transition;
  As.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((H = r), (As.transition = n));
  }
}
function nd() {
  return Be().memoizedState;
}
function vp(e, t, r) {
  var n = At(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    ld(e))
  )
    sd(t, r);
  else if (((r = $u(e, t, r, n)), r !== null)) {
    var l = je();
    (Ge(r, e, n, l), od(r, t, n));
  }
}
function wp(e, t, r) {
  var n = At(e),
    l = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (ld(e)) sd(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var a = t.lastRenderedState,
          c = o(a, r);
        if (((l.hasEagerState = !0), (l.eagerState = c), Ye(c, a))) {
          var i = t.interleaved;
          (i === null
            ? ((l.next = l), ba(t))
            : ((l.next = i.next), (i.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((r = $u(e, t, l, n)),
      r !== null && ((l = je()), Ge(r, e, n, l), od(r, t, n)));
  }
}
function ld(e) {
  var t = e.alternate;
  return e === Z || (t !== null && t === Z);
}
function sd(e, t) {
  on = Ol = !0;
  var r = e.pending;
  (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t));
}
function od(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), aa(e, r));
  }
}
var Dl = {
    readContext: Ue,
    useCallback: xe,
    useContext: xe,
    useEffect: xe,
    useImperativeHandle: xe,
    useInsertionEffect: xe,
    useLayoutEffect: xe,
    useMemo: xe,
    useReducer: xe,
    useRef: xe,
    useState: xe,
    useDebugValue: xe,
    useDeferredValue: xe,
    useTransition: xe,
    useMutableSource: xe,
    useSyncExternalStore: xe,
    useId: xe,
    unstable_isNewReconciler: !1,
  },
  bp = {
    readContext: Ue,
    useCallback: function (e, t) {
      return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ue,
    useEffect: Ui,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        ml(4194308, 4, Zu.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return ml(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ml(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = Ze();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (r.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, r) {
      var n = Ze();
      return (
        (t = r !== void 0 ? r(t) : t),
        (n.memoizedState = n.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (n.queue = e),
        (e = e.dispatch = vp.bind(null, Z, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ze();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Fi,
    useDebugValue: Ra,
    useDeferredValue: function (e) {
      return (Ze().memoizedState = e);
    },
    useTransition: function () {
      var e = Fi(!1),
        t = e[0];
      return ((e = yp.bind(null, e[1])), (Ze().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = Z,
        l = Ze();
      if (Y) {
        if (r === void 0) throw Error(_(407));
        r = r();
      } else {
        if (((r = t()), me === null)) throw Error(_(349));
        Zt & 30 || Hu(n, t, r);
      }
      l.memoizedState = r;
      var o = { value: r, getSnapshot: t };
      return (
        (l.queue = o),
        Ui(qu.bind(null, n, o, e), [e]),
        (n.flags |= 2048),
        Cn(9, Vu.bind(null, n, o, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = Ze(),
        t = me.identifierPrefix;
      if (Y) {
        var r = it,
          n = at;
        ((r = (n & ~(1 << (32 - Qe(n) - 1))).toString(32) + r),
          (t = ":" + t + "R" + r),
          (r = kn++),
          0 < r && (t += "H" + r.toString(32)),
          (t += ":"));
      } else ((r = xp++), (t = ":" + t + "r" + r.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  jp = {
    readContext: Ue,
    useCallback: ed,
    useContext: Ue,
    useEffect: Pa,
    useImperativeHandle: Ju,
    useInsertionEffect: Ku,
    useLayoutEffect: Xu,
    useMemo: td,
    useReducer: Is,
    useRef: Yu,
    useState: function () {
      return Is(Sn);
    },
    useDebugValue: Ra,
    useDeferredValue: function (e) {
      var t = Be();
      return rd(t, ue.memoizedState, e);
    },
    useTransition: function () {
      var e = Is(Sn)[0],
        t = Be().memoizedState;
      return [e, t];
    },
    useMutableSource: Bu,
    useSyncExternalStore: Wu,
    useId: nd,
    unstable_isNewReconciler: !1,
  },
  Np = {
    readContext: Ue,
    useCallback: ed,
    useContext: Ue,
    useEffect: Pa,
    useImperativeHandle: Ju,
    useInsertionEffect: Ku,
    useLayoutEffect: Xu,
    useMemo: td,
    useReducer: Os,
    useRef: Yu,
    useState: function () {
      return Os(Sn);
    },
    useDebugValue: Ra,
    useDeferredValue: function (e) {
      var t = Be();
      return ue === null ? (t.memoizedState = e) : rd(t, ue.memoizedState, e);
    },
    useTransition: function () {
      var e = Os(Sn)[0],
        t = Be().memoizedState;
      return [e, t];
    },
    useMutableSource: Bu,
    useSyncExternalStore: Wu,
    useId: nd,
    unstable_isNewReconciler: !1,
  };
function He(e, t) {
  if (e && e.defaultProps) {
    ((t = ee({}, t)), (e = e.defaultProps));
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function Co(e, t, r, n) {
  ((t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : ee({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r));
}
var ts = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? rr(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = je(),
      l = At(e),
      o = ct(n, l);
    ((o.payload = t),
      r != null && (o.callback = r),
      (t = Mt(e, o, l)),
      t !== null && (Ge(t, e, l, n), dl(t, e, l)));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = je(),
      l = At(e),
      o = ct(n, l);
    ((o.tag = 1),
      (o.payload = t),
      r != null && (o.callback = r),
      (t = Mt(e, o, l)),
      t !== null && (Ge(t, e, l, n), dl(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = je(),
      n = At(e),
      l = ct(r, n);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = Mt(e, l, n)),
      t !== null && (Ge(t, e, n, r), dl(t, e, n)));
  },
};
function Bi(e, t, r, n, l, o, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(n, o, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !yn(r, n) || !yn(l, o)
        : !0
  );
}
function ad(e, t, r) {
  var n = !1,
    l = Dt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Ue(o))
      : ((l = Ee(t) ? Kt : we.current),
        (n = t.contextTypes),
        (o = (n = n != null) ? Sr(e, l) : Dt)),
    (t = new t(r, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ts),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Wi(e, t, r, n) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && ts.enqueueReplaceState(t, t.state, null));
}
function _o(e, t, r, n) {
  var l = e.stateNode;
  ((l.props = r), (l.state = e.memoizedState), (l.refs = {}), ja(e));
  var o = t.contextType;
  (typeof o == "object" && o !== null
    ? (l.context = Ue(o))
    : ((o = Ee(t) ? Kt : we.current), (l.context = Sr(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Co(e, t, o, r), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && ts.enqueueReplaceState(l, l.state, null),
      Al(e, r, l, n),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308));
}
function Pr(e, t) {
  try {
    var r = "",
      n = t;
    do ((r += Xf(n)), (n = n.return));
    while (n);
    var l = r;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ds(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function Eo(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var kp = typeof WeakMap == "function" ? WeakMap : Map;
function id(e, t, r) {
  ((r = ct(-1, r)), (r.tag = 3), (r.payload = { element: null }));
  var n = t.value;
  return (
    (r.callback = function () {
      (Fl || ((Fl = !0), (Do = n)), Eo(e, t));
    }),
    r
  );
}
function cd(e, t, r) {
  ((r = ct(-1, r)), (r.tag = 3));
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var l = t.value;
    ((r.payload = function () {
      return n(l);
    }),
      (r.callback = function () {
        Eo(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (r.callback = function () {
        (Eo(e, t),
          typeof n != "function" &&
            (Tt === null ? (Tt = new Set([this])) : Tt.add(this)));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    r
  );
}
function Hi(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new kp();
    var l = new Set();
    n.set(t, l);
  } else ((l = n.get(t)), l === void 0 && ((l = new Set()), n.set(t, l)));
  l.has(r) || (l.add(r), (e = Dp.bind(null, e, t, r)), t.then(e, e));
}
function Vi(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function qi(e, t, r, n, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (r.flags |= 131072),
          (r.flags &= -52805),
          r.tag === 1 &&
            (r.alternate === null
              ? (r.tag = 17)
              : ((t = ct(-1, 1)), (t.tag = 2), Mt(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var Sp = gt.ReactCurrentOwner,
  Ce = !1;
function be(e, t, r, n) {
  t.child = e === null ? Du(t, null, r, n) : _r(t, e.child, r, n);
}
function Qi(e, t, r, n, l) {
  r = r.render;
  var o = t.ref;
  return (
    jr(t, l),
    (n = _a(e, t, r, n, o, l)),
    (r = Ea()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        pt(e, t, l))
      : (Y && r && ha(t), (t.flags |= 1), be(e, t, n, l), t.child)
  );
}
function Gi(e, t, r, n, l) {
  if (e === null) {
    var o = r.type;
    return typeof o == "function" &&
      !Da(o) &&
      o.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), ud(e, t, o, n, l))
      : ((e = xl(r.type, null, n, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var a = o.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : yn), r(a, n) && e.ref === t.ref)
    )
      return pt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = It(o, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function ud(e, t, r, n, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (yn(o, n) && e.ref === t.ref)
      if (((Ce = !1), (t.pendingProps = n = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ce = !0);
      else return ((t.lanes = e.lanes), pt(e, t, l));
  }
  return Po(e, t, r, n, l);
}
function dd(e, t, r) {
  var n = t.pendingProps,
    l = n.children,
    o = e !== null ? e.memoizedState : null;
  if (n.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        V(xr, Re),
        (Re |= r));
    else {
      if (!(r & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | r : r),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          V(xr, Re),
          (Re |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = o !== null ? o.baseLanes : r),
        V(xr, Re),
        (Re |= n));
    }
  else
    (o !== null ? ((n = o.baseLanes | r), (t.memoizedState = null)) : (n = r),
      V(xr, Re),
      (Re |= n));
  return (be(e, t, l, r), t.child);
}
function fd(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Po(e, t, r, n, l) {
  var o = Ee(r) ? Kt : we.current;
  return (
    (o = Sr(t, o)),
    jr(t, l),
    (r = _a(e, t, r, n, o, l)),
    (n = Ea()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        pt(e, t, l))
      : (Y && n && ha(t), (t.flags |= 1), be(e, t, r, l), t.child)
  );
}
function Yi(e, t, r, n, l) {
  if (Ee(r)) {
    var o = !0;
    Rl(t);
  } else o = !1;
  if ((jr(t, l), t.stateNode === null))
    (pl(e, t), ad(t, r, n), _o(t, r, n, l), (n = !0));
  else if (e === null) {
    var a = t.stateNode,
      c = t.memoizedProps;
    a.props = c;
    var i = a.context,
      u = r.contextType;
    typeof u == "object" && u !== null
      ? (u = Ue(u))
      : ((u = Ee(r) ? Kt : we.current), (u = Sr(t, u)));
    var p = r.getDerivedStateFromProps,
      f =
        typeof p == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    (f ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((c !== n || i !== u) && Wi(t, a, n, u)),
      (Nt = !1));
    var g = t.memoizedState;
    ((a.state = g),
      Al(t, n, a, l),
      (i = t.memoizedState),
      c !== n || g !== i || _e.current || Nt
        ? (typeof p == "function" && (Co(t, r, p, n), (i = t.memoizedState)),
          (c = Nt || Bi(t, r, c, n, g, i, u))
            ? (f ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = i)),
          (a.props = n),
          (a.state = i),
          (a.context = u),
          (n = c))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (n = !1)));
  } else {
    ((a = t.stateNode),
      Fu(e, t),
      (c = t.memoizedProps),
      (u = t.type === t.elementType ? c : He(t.type, c)),
      (a.props = u),
      (f = t.pendingProps),
      (g = a.context),
      (i = r.contextType),
      typeof i == "object" && i !== null
        ? (i = Ue(i))
        : ((i = Ee(r) ? Kt : we.current), (i = Sr(t, i))));
    var v = r.getDerivedStateFromProps;
    ((p =
      typeof v == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((c !== f || g !== i) && Wi(t, a, n, i)),
      (Nt = !1),
      (g = t.memoizedState),
      (a.state = g),
      Al(t, n, a, l));
    var x = t.memoizedState;
    c !== f || g !== x || _e.current || Nt
      ? (typeof v == "function" && (Co(t, r, v, n), (x = t.memoizedState)),
        (u = Nt || Bi(t, r, u, n, g, x, i) || !1)
          ? (p ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(n, x, i),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(n, x, i)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (c === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (c === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = x)),
        (a.props = n),
        (a.state = x),
        (a.context = i),
        (n = u))
      : (typeof a.componentDidUpdate != "function" ||
          (c === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (c === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return Ro(e, t, r, n, o, l);
}
function Ro(e, t, r, n, l, o) {
  fd(e, t);
  var a = (t.flags & 128) !== 0;
  if (!n && !a) return (l && Ti(t, r, !1), pt(e, t, o));
  ((n = t.stateNode), (Sp.current = t));
  var c =
    a && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = _r(t, e.child, null, o)), (t.child = _r(t, null, c, o)))
      : be(e, t, c, o),
    (t.memoizedState = n.state),
    l && Ti(t, r, !0),
    t.child
  );
}
function md(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Mi(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Mi(e, t.context, !1),
    Na(e, t.containerInfo));
}
function Ki(e, t, r, n, l) {
  return (Cr(), xa(l), (t.flags |= 256), be(e, t, r, n), t.child);
}
var Lo = { dehydrated: null, treeContext: null, retryLane: 0 };
function zo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pd(e, t, r) {
  var n = t.pendingProps,
    l = X.current,
    o = !1,
    a = (t.flags & 128) !== 0,
    c;
  if (
    ((c = a) ||
      (c = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    c
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    V(X, l & 1),
    e === null)
  )
    return (
      ko(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = n.children),
          (e = n.fallback),
          o
            ? ((n = t.mode),
              (o = t.child),
              (a = { mode: "hidden", children: a }),
              !(n & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = a))
                : (o = ls(a, n, 0, null)),
              (e = Yt(e, n, r, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = zo(r)),
              (t.memoizedState = Lo),
              e)
            : La(t, a))
    );
  if (((l = e.memoizedState), l !== null && ((c = l.dehydrated), c !== null)))
    return Cp(e, t, a, n, c, l, r);
  if (o) {
    ((o = n.fallback), (a = t.mode), (l = e.child), (c = l.sibling));
    var i = { mode: "hidden", children: n.children };
    return (
      !(a & 1) && t.child !== l
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = i),
          (t.deletions = null))
        : ((n = It(l, i)), (n.subtreeFlags = l.subtreeFlags & 14680064)),
      c !== null ? (o = It(c, o)) : ((o = Yt(o, a, r, null)), (o.flags |= 2)),
      (o.return = t),
      (n.return = t),
      (n.sibling = o),
      (t.child = n),
      (n = o),
      (o = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? zo(r)
          : {
              baseLanes: a.baseLanes | r,
              cachePool: null,
              transitions: a.transitions,
            }),
      (o.memoizedState = a),
      (o.childLanes = e.childLanes & ~r),
      (t.memoizedState = Lo),
      n
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (n = It(o, { mode: "visible", children: n.children })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n),
    (t.memoizedState = null),
    n
  );
}
function La(e, t) {
  return (
    (t = ls({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Jn(e, t, r, n) {
  return (
    n !== null && xa(n),
    _r(t, e.child, null, r),
    (e = La(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Cp(e, t, r, n, l, o, a) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = Ds(Error(_(422)))), Jn(e, t, a, n))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = n.fallback),
          (l = t.mode),
          (n = ls({ mode: "visible", children: n.children }, l, 0, null)),
          (o = Yt(o, l, a, null)),
          (o.flags |= 2),
          (n.return = t),
          (o.return = t),
          (n.sibling = o),
          (t.child = n),
          t.mode & 1 && _r(t, e.child, null, a),
          (t.child.memoizedState = zo(a)),
          (t.memoizedState = Lo),
          o);
  if (!(t.mode & 1)) return Jn(e, t, a, null);
  if (l.data === "$!") {
    if (((n = l.nextSibling && l.nextSibling.dataset), n)) var c = n.dgst;
    return (
      (n = c),
      (o = Error(_(419))),
      (n = Ds(o, n, void 0)),
      Jn(e, t, a, n)
    );
  }
  if (((c = (a & e.childLanes) !== 0), Ce || c)) {
    if (((n = me), n !== null)) {
      switch (a & -a) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (n.suspendedLanes | a) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), mt(e, l), Ge(n, e, l, -1)));
    }
    return (Oa(), (n = Ds(Error(_(421)))), Jn(e, t, a, n));
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = $p.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Le = zt(l.nextSibling)),
      (ze = t),
      (Y = !0),
      (qe = null),
      e !== null &&
        ((Oe[De++] = at),
        (Oe[De++] = it),
        (Oe[De++] = Xt),
        (at = e.id),
        (it = e.overflow),
        (Xt = t)),
      (t = La(t, n.children)),
      (t.flags |= 4096),
      t);
}
function Xi(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  (n !== null && (n.lanes |= t), So(e.return, t, r));
}
function $s(e, t, r, n, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: r,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = n),
      (o.tail = r),
      (o.tailMode = l));
}
function hd(e, t, r) {
  var n = t.pendingProps,
    l = n.revealOrder,
    o = n.tail;
  if ((be(e, t, n.children, r), (n = X.current), n & 2))
    ((n = (n & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xi(e, r, t);
        else if (e.tag === 19) Xi(e, r, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    n &= 1;
  }
  if ((V(X, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (r = t.child, l = null; r !== null; )
          ((e = r.alternate),
            e !== null && Il(e) === null && (l = r),
            (r = r.sibling));
        ((r = l),
          r === null
            ? ((l = t.child), (t.child = null))
            : ((l = r.sibling), (r.sibling = null)),
          $s(t, !1, l, r, o));
        break;
      case "backwards":
        for (r = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Il(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = r), (r = l), (l = e));
        }
        $s(t, !0, r, null, o);
        break;
      case "together":
        $s(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function pl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function pt(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Jt |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (
      e = t.child, r = It(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (r = r.sibling = It(e, e.pendingProps)),
        (r.return = t));
    r.sibling = null;
  }
  return t.child;
}
function _p(e, t, r) {
  switch (t.tag) {
    case 3:
      (md(t), Cr());
      break;
    case 5:
      Uu(t);
      break;
    case 1:
      Ee(t.type) && Rl(t);
      break;
    case 4:
      Na(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        l = t.memoizedProps.value;
      (V(Ml, n._currentValue), (n._currentValue = l));
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (V(X, X.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
            ? pd(e, t, r)
            : (V(X, X.current & 1),
              (e = pt(e, t, r)),
              e !== null ? e.sibling : null);
      V(X, X.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return hd(e, t, r);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        V(X, X.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), dd(e, t, r));
  }
  return pt(e, t, r);
}
var gd, Mo, xd, yd;
gd = function (e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      ((r.child.return = r), (r = r.child));
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    ((r.sibling.return = r.return), (r = r.sibling));
  }
};
Mo = function () {};
xd = function (e, t, r, n) {
  var l = e.memoizedProps;
  if (l !== n) {
    ((e = t.stateNode), Qt(tt.current));
    var o = null;
    switch (r) {
      case "input":
        ((l = eo(e, l)), (n = eo(e, n)), (o = []));
        break;
      case "select":
        ((l = ee({}, l, { value: void 0 })),
          (n = ee({}, n, { value: void 0 })),
          (o = []));
        break;
      case "textarea":
        ((l = no(e, l)), (n = no(e, n)), (o = []));
        break;
      default:
        typeof l.onClick != "function" &&
          typeof n.onClick == "function" &&
          (e.onclick = El);
    }
    so(r, n);
    var a;
    r = null;
    for (u in l)
      if (!n.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null)
        if (u === "style") {
          var c = l[u];
          for (a in c) c.hasOwnProperty(a) && (r || (r = {}), (r[a] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (dn.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in n) {
      var i = n[u];
      if (
        ((c = l != null ? l[u] : void 0),
        n.hasOwnProperty(u) && i !== c && (i != null || c != null))
      )
        if (u === "style")
          if (c) {
            for (a in c)
              !c.hasOwnProperty(a) ||
                (i && i.hasOwnProperty(a)) ||
                (r || (r = {}), (r[a] = ""));
            for (a in i)
              i.hasOwnProperty(a) &&
                c[a] !== i[a] &&
                (r || (r = {}), (r[a] = i[a]));
          } else (r || (o || (o = []), o.push(u, r)), (r = i));
        else
          u === "dangerouslySetInnerHTML"
            ? ((i = i ? i.__html : void 0),
              (c = c ? c.__html : void 0),
              i != null && c !== i && (o = o || []).push(u, i))
            : u === "children"
              ? (typeof i != "string" && typeof i != "number") ||
                (o = o || []).push(u, "" + i)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (dn.hasOwnProperty(u)
                  ? (i != null && u === "onScroll" && q("scroll", e),
                    o || c === i || (o = []))
                  : (o = o || []).push(u, i));
    }
    r && (o = o || []).push("style", r);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
yd = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function Hr(e, t) {
  if (!Y)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null; )
          (t.alternate !== null && (r = t), (t = t.sibling));
        r === null ? (e.tail = null) : (r.sibling = null);
        break;
      case "collapsed":
        r = e.tail;
        for (var n = null; r !== null; )
          (r.alternate !== null && (n = r), (r = r.sibling));
        n === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function ye(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    r = 0,
    n = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((r |= l.lanes | l.childLanes),
        (n |= l.subtreeFlags & 14680064),
        (n |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((r |= l.lanes | l.childLanes),
        (n |= l.subtreeFlags),
        (n |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= n), (e.childLanes = r), t);
}
function Ep(e, t, r) {
  var n = t.pendingProps;
  switch ((ga(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ye(t), null);
    case 1:
      return (Ee(t.type) && Pl(), ye(t), null);
    case 3:
      return (
        (n = t.stateNode),
        Er(),
        Q(_e),
        Q(we),
        Sa(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (Xn(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), qe !== null && (Uo(qe), (qe = null)))),
        Mo(e, t),
        ye(t),
        null
      );
    case 5:
      ka(t);
      var l = Qt(Nn.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        (xd(e, t, r, n, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(_(166));
          return (ye(t), null);
        }
        if (((e = Qt(tt.current)), Xn(t))) {
          ((n = t.stateNode), (r = t.type));
          var o = t.memoizedProps;
          switch (((n[Je] = t), (n[bn] = o), (e = (t.mode & 1) !== 0), r)) {
            case "dialog":
              (q("cancel", n), q("close", n));
              break;
            case "iframe":
            case "object":
            case "embed":
              q("load", n);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Jr.length; l++) q(Jr[l], n);
              break;
            case "source":
              q("error", n);
              break;
            case "img":
            case "image":
            case "link":
              (q("error", n), q("load", n));
              break;
            case "details":
              q("toggle", n);
              break;
            case "input":
              (oi(n, o), q("invalid", n));
              break;
            case "select":
              ((n._wrapperState = { wasMultiple: !!o.multiple }),
                q("invalid", n));
              break;
            case "textarea":
              (ii(n, o), q("invalid", n));
          }
          (so(r, o), (l = null));
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var c = o[a];
              a === "children"
                ? typeof c == "string"
                  ? n.textContent !== c &&
                    (o.suppressHydrationWarning !== !0 &&
                      Kn(n.textContent, c, e),
                    (l = ["children", c]))
                  : typeof c == "number" &&
                    n.textContent !== "" + c &&
                    (o.suppressHydrationWarning !== !0 &&
                      Kn(n.textContent, c, e),
                    (l = ["children", "" + c]))
                : dn.hasOwnProperty(a) &&
                  c != null &&
                  a === "onScroll" &&
                  q("scroll", n);
            }
          switch (r) {
            case "input":
              (Bn(n), ai(n, o, !0));
              break;
            case "textarea":
              (Bn(n), ci(n));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (n.onclick = El);
          }
          ((n = l), (t.updateQueue = n), n !== null && (t.flags |= 4));
        } else {
          ((a = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = qc(r)),
            e === "http://www.w3.org/1999/xhtml"
              ? r === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == "string"
                  ? (e = a.createElement(r, { is: n.is }))
                  : ((e = a.createElement(r)),
                    r === "select" &&
                      ((a = e),
                      n.multiple
                        ? (a.multiple = !0)
                        : n.size && (a.size = n.size)))
              : (e = a.createElementNS(e, r)),
            (e[Je] = t),
            (e[bn] = n),
            gd(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((a = oo(r, n)), r)) {
              case "dialog":
                (q("cancel", e), q("close", e), (l = n));
                break;
              case "iframe":
              case "object":
              case "embed":
                (q("load", e), (l = n));
                break;
              case "video":
              case "audio":
                for (l = 0; l < Jr.length; l++) q(Jr[l], e);
                l = n;
                break;
              case "source":
                (q("error", e), (l = n));
                break;
              case "img":
              case "image":
              case "link":
                (q("error", e), q("load", e), (l = n));
                break;
              case "details":
                (q("toggle", e), (l = n));
                break;
              case "input":
                (oi(e, n), (l = eo(e, n)), q("invalid", e));
                break;
              case "option":
                l = n;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!n.multiple }),
                  (l = ee({}, n, { value: void 0 })),
                  q("invalid", e));
                break;
              case "textarea":
                (ii(e, n), (l = no(e, n)), q("invalid", e));
                break;
              default:
                l = n;
            }
            (so(r, l), (c = l));
            for (o in c)
              if (c.hasOwnProperty(o)) {
                var i = c[o];
                o === "style"
                  ? Yc(e, i)
                  : o === "dangerouslySetInnerHTML"
                    ? ((i = i ? i.__html : void 0), i != null && Qc(e, i))
                    : o === "children"
                      ? typeof i == "string"
                        ? (r !== "textarea" || i !== "") && fn(e, i)
                        : typeof i == "number" && fn(e, "" + i)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (dn.hasOwnProperty(o)
                          ? i != null && o === "onScroll" && q("scroll", e)
                          : i != null && ta(e, o, i, a));
              }
            switch (r) {
              case "input":
                (Bn(e), ai(e, n, !1));
                break;
              case "textarea":
                (Bn(e), ci(e));
                break;
              case "option":
                n.value != null && e.setAttribute("value", "" + Ot(n.value));
                break;
              case "select":
                ((e.multiple = !!n.multiple),
                  (o = n.value),
                  o != null
                    ? yr(e, !!n.multiple, o, !1)
                    : n.defaultValue != null &&
                      yr(e, !!n.multiple, n.defaultValue, !0));
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = El);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ye(t), null);
    case 6:
      if (e && t.stateNode != null) yd(e, t, e.memoizedProps, n);
      else {
        if (typeof n != "string" && t.stateNode === null) throw Error(_(166));
        if (((r = Qt(Nn.current)), Qt(tt.current), Xn(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[Je] = t),
            (o = n.nodeValue !== r) && ((e = ze), e !== null))
          )
            switch (e.tag) {
              case 3:
                Kn(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Kn(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          ((n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[Je] = t),
            (t.stateNode = n));
      }
      return (ye(t), null);
    case 13:
      if (
        (Q(X),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Y && Le !== null && t.mode & 1 && !(t.flags & 128))
          (Iu(), Cr(), (t.flags |= 98560), (o = !1));
        else if (((o = Xn(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(_(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(_(317));
            o[Je] = t;
          } else
            (Cr(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ye(t), (o = !1));
        } else (qe !== null && (Uo(qe), (qe = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || X.current & 1 ? de === 0 && (de = 3) : Oa())),
          t.updateQueue !== null && (t.flags |= 4),
          ye(t),
          null);
    case 4:
      return (
        Er(),
        Mo(e, t),
        e === null && vn(t.stateNode.containerInfo),
        ye(t),
        null
      );
    case 10:
      return (wa(t.type._context), ye(t), null);
    case 17:
      return (Ee(t.type) && Pl(), ye(t), null);
    case 19:
      if ((Q(X), (o = t.memoizedState), o === null)) return (ye(t), null);
      if (((n = (t.flags & 128) !== 0), (a = o.rendering), a === null))
        if (n) Hr(o, !1);
        else {
          if (de !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Il(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    Hr(o, !1),
                    n = a.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;

                )
                  ((o = r),
                    (e = n),
                    (o.flags &= 14680066),
                    (a = o.alternate),
                    a === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = a.childLanes),
                        (o.lanes = a.lanes),
                        (o.child = a.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = a.memoizedProps),
                        (o.memoizedState = a.memoizedState),
                        (o.updateQueue = a.updateQueue),
                        (o.type = a.type),
                        (e = a.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling));
                return (V(X, (X.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null &&
            se() > Rr &&
            ((t.flags |= 128), (n = !0), Hr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = Il(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              Hr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !a.alternate && !Y)
            )
              return (ye(t), null);
          } else
            2 * se() - o.renderingStartTime > Rr &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), Hr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((r = o.last),
            r !== null ? (r.sibling = a) : (t.child = a),
            (o.last = a));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = se()),
          (t.sibling = null),
          (r = X.current),
          V(X, n ? (r & 1) | 2 : r & 1),
          t)
        : (ye(t), null);
    case 22:
    case 23:
      return (
        Ia(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? Re & 1073741824 && (ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ye(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function Pp(e, t) {
  switch ((ga(t), t.tag)) {
    case 1:
      return (
        Ee(t.type) && Pl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Er(),
        Q(_e),
        Q(we),
        Sa(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (ka(t), null);
    case 13:
      if ((Q(X), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(_(340));
        Cr();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (Q(X), null);
    case 4:
      return (Er(), null);
    case 10:
      return (wa(t.type._context), null);
    case 22:
    case 23:
      return (Ia(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var el = !1,
  ve = !1,
  Rp = typeof WeakSet == "function" ? WeakSet : Set,
  T = null;
function gr(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == "function")
      try {
        r(null);
      } catch (n) {
        re(e, t, n);
      }
    else r.current = null;
}
function To(e, t, r) {
  try {
    r();
  } catch (n) {
    re(e, t, n);
  }
}
var Zi = !1;
function Lp(e, t) {
  if (((xo = Sl), (e = Nu()), pa(e))) {
    if ("selectionStart" in e)
      var r = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        r = ((r = e.ownerDocument) && r.defaultView) || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var l = n.anchorOffset,
            o = n.focusNode;
          n = n.focusOffset;
          try {
            (r.nodeType, o.nodeType);
          } catch {
            r = null;
            break e;
          }
          var a = 0,
            c = -1,
            i = -1,
            u = 0,
            p = 0,
            f = e,
            g = null;
          t: for (;;) {
            for (
              var v;
              f !== r || (l !== 0 && f.nodeType !== 3) || (c = a + l),
                f !== o || (n !== 0 && f.nodeType !== 3) || (i = a + n),
                f.nodeType === 3 && (a += f.nodeValue.length),
                (v = f.firstChild) !== null;

            )
              ((g = f), (f = v));
            for (;;) {
              if (f === e) break t;
              if (
                (g === r && ++u === l && (c = a),
                g === o && ++p === n && (i = a),
                (v = f.nextSibling) !== null)
              )
                break;
              ((f = g), (g = f.parentNode));
            }
            f = v;
          }
          r = c === -1 || i === -1 ? null : { start: c, end: i };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (yo = { focusedElem: e, selectionRange: r }, Sl = !1, T = t; T !== null; )
    if (((t = T), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (T = e));
    else
      for (; T !== null; ) {
        t = T;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var w = x.memoizedProps,
                    N = x.memoizedState,
                    h = t.stateNode,
                    m = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : He(t.type, w),
                      N,
                    );
                  h.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var d = t.stateNode.containerInfo;
                d.nodeType === 1
                  ? (d.textContent = "")
                  : d.nodeType === 9 &&
                    d.documentElement &&
                    d.removeChild(d.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(_(163));
            }
        } catch (b) {
          re(t, t.return, b);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (T = e));
          break;
        }
        T = t.return;
      }
  return ((x = Zi), (Zi = !1), x);
}
function an(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var l = (n = n.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        ((l.destroy = void 0), o !== void 0 && To(t, r, o));
      }
      l = l.next;
    } while (l !== n);
  }
}
function rs(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function Ao(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function vd(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), vd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Je], delete t[bn], delete t[bo], delete t[mp], delete t[pp])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function wd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ji(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || wd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Io(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode),
      t
        ? r.nodeType === 8
          ? r.parentNode.insertBefore(e, t)
          : r.insertBefore(e, t)
        : (r.nodeType === 8
            ? ((t = r.parentNode), t.insertBefore(e, r))
            : ((t = r), t.appendChild(e)),
          (r = r._reactRootContainer),
          r != null || t.onclick !== null || (t.onclick = El)));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Io(e, t, r), e = e.sibling; e !== null; )
      (Io(e, t, r), (e = e.sibling));
}
function Oo(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Oo(e, t, r), e = e.sibling; e !== null; )
      (Oo(e, t, r), (e = e.sibling));
}
var pe = null,
  Ve = !1;
function wt(e, t, r) {
  for (r = r.child; r !== null; ) (bd(e, t, r), (r = r.sibling));
}
function bd(e, t, r) {
  if (et && typeof et.onCommitFiberUnmount == "function")
    try {
      et.onCommitFiberUnmount(Gl, r);
    } catch {}
  switch (r.tag) {
    case 5:
      ve || gr(r, t);
    case 6:
      var n = pe,
        l = Ve;
      ((pe = null),
        wt(e, t, r),
        (pe = n),
        (Ve = l),
        pe !== null &&
          (Ve
            ? ((e = pe),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : pe.removeChild(r.stateNode)));
      break;
    case 18:
      pe !== null &&
        (Ve
          ? ((e = pe),
            (r = r.stateNode),
            e.nodeType === 8
              ? zs(e.parentNode, r)
              : e.nodeType === 1 && zs(e, r),
            gn(e))
          : zs(pe, r.stateNode));
      break;
    case 4:
      ((n = pe),
        (l = Ve),
        (pe = r.stateNode.containerInfo),
        (Ve = !0),
        wt(e, t, r),
        (pe = n),
        (Ve = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ve &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        l = n = n.next;
        do {
          var o = l,
            a = o.destroy;
          ((o = o.tag),
            a !== void 0 && (o & 2 || o & 4) && To(r, t, a),
            (l = l.next));
        } while (l !== n);
      }
      wt(e, t, r);
      break;
    case 1:
      if (
        !ve &&
        (gr(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == "function")
      )
        try {
          ((n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount());
        } catch (c) {
          re(r, t, c);
        }
      wt(e, t, r);
      break;
    case 21:
      wt(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((ve = (n = ve) || r.memoizedState !== null), wt(e, t, r), (ve = n))
        : wt(e, t, r);
      break;
    default:
      wt(e, t, r);
  }
}
function ec(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    (r === null && (r = e.stateNode = new Rp()),
      t.forEach(function (n) {
        var l = Fp.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(l, l));
      }));
  }
}
function We(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var l = r[n];
      try {
        var o = e,
          a = t,
          c = a;
        e: for (; c !== null; ) {
          switch (c.tag) {
            case 5:
              ((pe = c.stateNode), (Ve = !1));
              break e;
            case 3:
              ((pe = c.stateNode.containerInfo), (Ve = !0));
              break e;
            case 4:
              ((pe = c.stateNode.containerInfo), (Ve = !0));
              break e;
          }
          c = c.return;
        }
        if (pe === null) throw Error(_(160));
        (bd(o, a, l), (pe = null), (Ve = !1));
        var i = l.alternate;
        (i !== null && (i.return = null), (l.return = null));
      } catch (u) {
        re(l, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (jd(t, e), (t = t.sibling));
}
function jd(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((We(t, e), Xe(e), n & 4)) {
        try {
          (an(3, e, e.return), rs(3, e));
        } catch (w) {
          re(e, e.return, w);
        }
        try {
          an(5, e, e.return);
        } catch (w) {
          re(e, e.return, w);
        }
      }
      break;
    case 1:
      (We(t, e), Xe(e), n & 512 && r !== null && gr(r, r.return));
      break;
    case 5:
      if (
        (We(t, e),
        Xe(e),
        n & 512 && r !== null && gr(r, r.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          fn(l, "");
        } catch (w) {
          re(e, e.return, w);
        }
      }
      if (n & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          a = r !== null ? r.memoizedProps : o,
          c = e.type,
          i = e.updateQueue;
        if (((e.updateQueue = null), i !== null))
          try {
            (c === "input" && o.type === "radio" && o.name != null && Hc(l, o),
              oo(c, a));
            var u = oo(c, o);
            for (a = 0; a < i.length; a += 2) {
              var p = i[a],
                f = i[a + 1];
              p === "style"
                ? Yc(l, f)
                : p === "dangerouslySetInnerHTML"
                  ? Qc(l, f)
                  : p === "children"
                    ? fn(l, f)
                    : ta(l, p, f, u);
            }
            switch (c) {
              case "input":
                to(l, o);
                break;
              case "textarea":
                Vc(l, o);
                break;
              case "select":
                var g = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var v = o.value;
                v != null
                  ? yr(l, !!o.multiple, v, !1)
                  : g !== !!o.multiple &&
                    (o.defaultValue != null
                      ? yr(l, !!o.multiple, o.defaultValue, !0)
                      : yr(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[bn] = o;
          } catch (w) {
            re(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((We(t, e), Xe(e), n & 4)) {
        if (e.stateNode === null) throw Error(_(162));
        ((l = e.stateNode), (o = e.memoizedProps));
        try {
          l.nodeValue = o;
        } catch (w) {
          re(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (We(t, e), Xe(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          gn(t.containerInfo);
        } catch (w) {
          re(e, e.return, w);
        }
      break;
    case 4:
      (We(t, e), Xe(e));
      break;
    case 13:
      (We(t, e),
        Xe(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Ta = se())),
        n & 4 && ec(e));
      break;
    case 22:
      if (
        ((p = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((ve = (u = ve) || p), We(t, e), (ve = u)) : We(t, e),
        Xe(e),
        n & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !p && e.mode & 1)
        )
          for (T = e, p = e.child; p !== null; ) {
            for (f = T = p; T !== null; ) {
              switch (((g = T), (v = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  an(4, g, g.return);
                  break;
                case 1:
                  gr(g, g.return);
                  var x = g.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    ((n = g), (r = g.return));
                    try {
                      ((t = n),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount());
                    } catch (w) {
                      re(n, r, w);
                    }
                  }
                  break;
                case 5:
                  gr(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    rc(f);
                    continue;
                  }
              }
              v !== null ? ((v.return = g), (T = v)) : rc(f);
            }
            p = p.sibling;
          }
        e: for (p = null, f = e; ; ) {
          if (f.tag === 5) {
            if (p === null) {
              p = f;
              try {
                ((l = f.stateNode),
                  u
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((c = f.stateNode),
                      (i = f.memoizedProps.style),
                      (a =
                        i != null && i.hasOwnProperty("display")
                          ? i.display
                          : null),
                      (c.style.display = Gc("display", a))));
              } catch (w) {
                re(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (p === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (w) {
                re(e, e.return, w);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            ((f.child.return = f), (f = f.child));
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            (p === f && (p = null), (f = f.return));
          }
          (p === f && (p = null),
            (f.sibling.return = f.return),
            (f = f.sibling));
        }
      }
      break;
    case 19:
      (We(t, e), Xe(e), n & 4 && ec(e));
      break;
    case 21:
      break;
    default:
      (We(t, e), Xe(e));
  }
}
function Xe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (wd(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(_(160));
      }
      switch (n.tag) {
        case 5:
          var l = n.stateNode;
          n.flags & 32 && (fn(l, ""), (n.flags &= -33));
          var o = Ji(e);
          Oo(e, o, l);
          break;
        case 3:
        case 4:
          var a = n.stateNode.containerInfo,
            c = Ji(e);
          Io(e, c, a);
          break;
        default:
          throw Error(_(161));
      }
    } catch (i) {
      re(e, e.return, i);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function zp(e, t, r) {
  ((T = e), Nd(e));
}
function Nd(e, t, r) {
  for (var n = (e.mode & 1) !== 0; T !== null; ) {
    var l = T,
      o = l.child;
    if (l.tag === 22 && n) {
      var a = l.memoizedState !== null || el;
      if (!a) {
        var c = l.alternate,
          i = (c !== null && c.memoizedState !== null) || ve;
        c = el;
        var u = ve;
        if (((el = a), (ve = i) && !u))
          for (T = l; T !== null; )
            ((a = T),
              (i = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? nc(l)
                : i !== null
                  ? ((i.return = a), (T = i))
                  : nc(l));
        for (; o !== null; ) ((T = o), Nd(o), (o = o.sibling));
        ((T = l), (el = c), (ve = u));
      }
      tc(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (T = o)) : tc(e);
  }
}
function tc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ve || rs(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !ve)
                if (r === null) n.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : He(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    l,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && $i(t, o, n);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                $i(t, a, r);
              }
              break;
            case 5:
              var c = t.stateNode;
              if (r === null && t.flags & 4) {
                r = c;
                var i = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    i.autoFocus && r.focus();
                    break;
                  case "img":
                    i.src && (r.src = i.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var p = u.memoizedState;
                  if (p !== null) {
                    var f = p.dehydrated;
                    f !== null && gn(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(_(163));
          }
        ve || (t.flags & 512 && Ao(t));
      } catch (g) {
        re(t, t.return, g);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      ((r.return = t.return), (T = r));
      break;
    }
    T = t.return;
  }
}
function rc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      ((r.return = t.return), (T = r));
      break;
    }
    T = t.return;
  }
}
function nc(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            rs(4, t);
          } catch (i) {
            re(t, r, i);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == "function") {
            var l = t.return;
            try {
              n.componentDidMount();
            } catch (i) {
              re(t, l, i);
            }
          }
          var o = t.return;
          try {
            Ao(t);
          } catch (i) {
            re(t, o, i);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Ao(t);
          } catch (i) {
            re(t, a, i);
          }
      }
    } catch (i) {
      re(t, t.return, i);
    }
    if (t === e) {
      T = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      ((c.return = t.return), (T = c));
      break;
    }
    T = t.return;
  }
}
var Mp = Math.ceil,
  $l = gt.ReactCurrentDispatcher,
  za = gt.ReactCurrentOwner,
  Fe = gt.ReactCurrentBatchConfig,
  B = 0,
  me = null,
  ie = null,
  he = 0,
  Re = 0,
  xr = Ft(0),
  de = 0,
  _n = null,
  Jt = 0,
  ns = 0,
  Ma = 0,
  cn = null,
  Se = null,
  Ta = 0,
  Rr = 1 / 0,
  st = null,
  Fl = !1,
  Do = null,
  Tt = null,
  tl = !1,
  Et = null,
  Ul = 0,
  un = 0,
  $o = null,
  hl = -1,
  gl = 0;
function je() {
  return B & 6 ? se() : hl !== -1 ? hl : (hl = se());
}
function At(e) {
  return e.mode & 1
    ? B & 2 && he !== 0
      ? he & -he
      : gp.transition !== null
        ? (gl === 0 && (gl = au()), gl)
        : ((e = H),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : pu(e.type))),
          e)
    : 1;
}
function Ge(e, t, r, n) {
  if (50 < un) throw ((un = 0), ($o = null), Error(_(185)));
  (Rn(e, r, n),
    (!(B & 2) || e !== me) &&
      (e === me && (!(B & 2) && (ns |= r), de === 4 && St(e, he)),
      Pe(e, n),
      r === 1 && B === 0 && !(t.mode & 1) && ((Rr = se() + 500), Jl && Ut())));
}
function Pe(e, t) {
  var r = e.callbackNode;
  gm(e, t);
  var n = kl(e, e === me ? he : 0);
  if (n === 0)
    (r !== null && fi(r), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && fi(r), t === 1))
      (e.tag === 0 ? hp(lc.bind(null, e)) : Mu(lc.bind(null, e)),
        dp(function () {
          !(B & 6) && Ut();
        }),
        (r = null));
    else {
      switch (iu(n)) {
        case 1:
          r = oa;
          break;
        case 4:
          r = su;
          break;
        case 16:
          r = Nl;
          break;
        case 536870912:
          r = ou;
          break;
        default:
          r = Nl;
      }
      r = Ld(r, kd.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = r));
  }
}
function kd(e, t) {
  if (((hl = -1), (gl = 0), B & 6)) throw Error(_(327));
  var r = e.callbackNode;
  if (Nr() && e.callbackNode !== r) return null;
  var n = kl(e, e === me ? he : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = Bl(e, n);
  else {
    t = n;
    var l = B;
    B |= 2;
    var o = Cd();
    (me !== e || he !== t) && ((st = null), (Rr = se() + 500), Gt(e, t));
    do
      try {
        Ip();
        break;
      } catch (c) {
        Sd(e, c);
      }
    while (!0);
    (va(),
      ($l.current = o),
      (B = l),
      ie !== null ? (t = 0) : ((me = null), (he = 0), (t = de)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = fo(e)), l !== 0 && ((n = l), (t = Fo(e, l)))), t === 1)
    )
      throw ((r = _n), Gt(e, 0), St(e, n), Pe(e, se()), r);
    if (t === 6) St(e, n);
    else {
      if (
        ((l = e.current.alternate),
        !(n & 30) &&
          !Tp(l) &&
          ((t = Bl(e, n)),
          t === 2 && ((o = fo(e)), o !== 0 && ((n = o), (t = Fo(e, o)))),
          t === 1))
      )
        throw ((r = _n), Gt(e, 0), St(e, n), Pe(e, se()), r);
      switch (((e.finishedWork = l), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          Ht(e, Se, st);
          break;
        case 3:
          if (
            (St(e, n), (n & 130023424) === n && ((t = Ta + 500 - se()), 10 < t))
          ) {
            if (kl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & n) !== n)) {
              (je(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = wo(Ht.bind(null, e, Se, st), t);
            break;
          }
          Ht(e, Se, st);
          break;
        case 4:
          if ((St(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, l = -1; 0 < n; ) {
            var a = 31 - Qe(n);
            ((o = 1 << a), (a = t[a]), a > l && (l = a), (n &= ~o));
          }
          if (
            ((n = l),
            (n = se() - n),
            (n =
              (120 > n
                ? 120
                : 480 > n
                  ? 480
                  : 1080 > n
                    ? 1080
                    : 1920 > n
                      ? 1920
                      : 3e3 > n
                        ? 3e3
                        : 4320 > n
                          ? 4320
                          : 1960 * Mp(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = wo(Ht.bind(null, e, Se, st), n);
            break;
          }
          Ht(e, Se, st);
          break;
        case 5:
          Ht(e, Se, st);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return (Pe(e, se()), e.callbackNode === r ? kd.bind(null, e) : null);
}
function Fo(e, t) {
  var r = cn;
  return (
    e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256),
    (e = Bl(e, t)),
    e !== 2 && ((t = Se), (Se = r), t !== null && Uo(t)),
    e
  );
}
function Uo(e) {
  Se === null ? (Se = e) : Se.push.apply(Se, e);
}
function Tp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var l = r[n],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!Ye(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
      ((r.return = t), (t = r));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function St(e, t) {
  for (
    t &= ~Ma,
      t &= ~ns,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var r = 31 - Qe(t),
      n = 1 << r;
    ((e[r] = -1), (t &= ~n));
  }
}
function lc(e) {
  if (B & 6) throw Error(_(327));
  Nr();
  var t = kl(e, 0);
  if (!(t & 1)) return (Pe(e, se()), null);
  var r = Bl(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = fo(e);
    n !== 0 && ((t = n), (r = Fo(e, n)));
  }
  if (r === 1) throw ((r = _n), Gt(e, 0), St(e, t), Pe(e, se()), r);
  if (r === 6) throw Error(_(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Ht(e, Se, st),
    Pe(e, se()),
    null
  );
}
function Aa(e, t) {
  var r = B;
  B |= 1;
  try {
    return e(t);
  } finally {
    ((B = r), B === 0 && ((Rr = se() + 500), Jl && Ut()));
  }
}
function er(e) {
  Et !== null && Et.tag === 0 && !(B & 6) && Nr();
  var t = B;
  B |= 1;
  var r = Fe.transition,
    n = H;
  try {
    if (((Fe.transition = null), (H = 1), e)) return e();
  } finally {
    ((H = n), (Fe.transition = r), (B = t), !(B & 6) && Ut());
  }
}
function Ia() {
  ((Re = xr.current), Q(xr));
}
function Gt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), up(r)), ie !== null))
    for (r = ie.return; r !== null; ) {
      var n = r;
      switch ((ga(n), n.tag)) {
        case 1:
          ((n = n.type.childContextTypes), n != null && Pl());
          break;
        case 3:
          (Er(), Q(_e), Q(we), Sa());
          break;
        case 5:
          ka(n);
          break;
        case 4:
          Er();
          break;
        case 13:
          Q(X);
          break;
        case 19:
          Q(X);
          break;
        case 10:
          wa(n.type._context);
          break;
        case 22:
        case 23:
          Ia();
      }
      r = r.return;
    }
  if (
    ((me = e),
    (ie = e = It(e.current, null)),
    (he = Re = t),
    (de = 0),
    (_n = null),
    (Ma = ns = Jt = 0),
    (Se = cn = null),
    qt !== null)
  ) {
    for (t = 0; t < qt.length; t++)
      if (((r = qt[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var l = n.next,
          o = r.pending;
        if (o !== null) {
          var a = o.next;
          ((o.next = l), (n.next = a));
        }
        r.pending = n;
      }
    qt = null;
  }
  return e;
}
function Sd(e, t) {
  do {
    var r = ie;
    try {
      if ((va(), (fl.current = Dl), Ol)) {
        for (var n = Z.memoizedState; n !== null; ) {
          var l = n.queue;
          (l !== null && (l.pending = null), (n = n.next));
        }
        Ol = !1;
      }
      if (
        ((Zt = 0),
        (fe = ue = Z = null),
        (on = !1),
        (kn = 0),
        (za.current = null),
        r === null || r.return === null)
      ) {
        ((de = 1), (_n = t), (ie = null));
        break;
      }
      e: {
        var o = e,
          a = r.return,
          c = r,
          i = t;
        if (
          ((t = he),
          (c.flags |= 32768),
          i !== null && typeof i == "object" && typeof i.then == "function")
        ) {
          var u = i,
            p = c,
            f = p.tag;
          if (!(p.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var g = p.alternate;
            g
              ? ((p.updateQueue = g.updateQueue),
                (p.memoizedState = g.memoizedState),
                (p.lanes = g.lanes))
              : ((p.updateQueue = null), (p.memoizedState = null));
          }
          var v = Vi(a);
          if (v !== null) {
            ((v.flags &= -257),
              qi(v, a, c, o, t),
              v.mode & 1 && Hi(o, u, t),
              (t = v),
              (i = u));
            var x = t.updateQueue;
            if (x === null) {
              var w = new Set();
              (w.add(i), (t.updateQueue = w));
            } else x.add(i);
            break e;
          } else {
            if (!(t & 1)) {
              (Hi(o, u, t), Oa());
              break e;
            }
            i = Error(_(426));
          }
        } else if (Y && c.mode & 1) {
          var N = Vi(a);
          if (N !== null) {
            (!(N.flags & 65536) && (N.flags |= 256),
              qi(N, a, c, o, t),
              xa(Pr(i, c)));
            break e;
          }
        }
        ((o = i = Pr(i, c)),
          de !== 4 && (de = 2),
          cn === null ? (cn = [o]) : cn.push(o),
          (o = a));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var h = id(o, i, t);
              Di(o, h);
              break e;
            case 1:
              c = i;
              var m = o.type,
                d = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof m.getDerivedStateFromError == "function" ||
                  (d !== null &&
                    typeof d.componentDidCatch == "function" &&
                    (Tt === null || !Tt.has(d))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var b = cd(o, c, t);
                Di(o, b);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Ed(r);
    } catch (C) {
      ((t = C), ie === r && r !== null && (ie = r = r.return));
      continue;
    }
    break;
  } while (!0);
}
function Cd() {
  var e = $l.current;
  return (($l.current = Dl), e === null ? Dl : e);
}
function Oa() {
  ((de === 0 || de === 3 || de === 2) && (de = 4),
    me === null || (!(Jt & 268435455) && !(ns & 268435455)) || St(me, he));
}
function Bl(e, t) {
  var r = B;
  B |= 2;
  var n = Cd();
  (me !== e || he !== t) && ((st = null), Gt(e, t));
  do
    try {
      Ap();
      break;
    } catch (l) {
      Sd(e, l);
    }
  while (!0);
  if ((va(), (B = r), ($l.current = n), ie !== null)) throw Error(_(261));
  return ((me = null), (he = 0), de);
}
function Ap() {
  for (; ie !== null; ) _d(ie);
}
function Ip() {
  for (; ie !== null && !am(); ) _d(ie);
}
function _d(e) {
  var t = Rd(e.alternate, e, Re);
  ((e.memoizedProps = e.pendingProps),
    t === null ? Ed(e) : (ie = t),
    (za.current = null));
}
function Ed(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = Pp(r, t)), r !== null)) {
        ((r.flags &= 32767), (ie = r));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((de = 6), (ie = null));
        return;
      }
    } else if (((r = Ep(r, t, Re)), r !== null)) {
      ie = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ie = t;
      return;
    }
    ie = t = e;
  } while (t !== null);
  de === 0 && (de = 5);
}
function Ht(e, t, r) {
  var n = H,
    l = Fe.transition;
  try {
    ((Fe.transition = null), (H = 1), Op(e, t, r, n));
  } finally {
    ((Fe.transition = l), (H = n));
  }
  return null;
}
function Op(e, t, r, n) {
  do Nr();
  while (Et !== null);
  if (B & 6) throw Error(_(327));
  r = e.finishedWork;
  var l = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error(_(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = r.lanes | r.childLanes;
  if (
    (xm(e, o),
    e === me && ((ie = me = null), (he = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      tl ||
      ((tl = !0),
      Ld(Nl, function () {
        return (Nr(), null);
      })),
    (o = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || o)
  ) {
    ((o = Fe.transition), (Fe.transition = null));
    var a = H;
    H = 1;
    var c = B;
    ((B |= 4),
      (za.current = null),
      Lp(e, r),
      jd(r, e),
      np(yo),
      (Sl = !!xo),
      (yo = xo = null),
      (e.current = r),
      zp(r),
      im(),
      (B = c),
      (H = a),
      (Fe.transition = o));
  } else e.current = r;
  if (
    (tl && ((tl = !1), (Et = e), (Ul = l)),
    (o = e.pendingLanes),
    o === 0 && (Tt = null),
    dm(r.stateNode),
    Pe(e, se()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      ((l = t[r]), n(l.value, { componentStack: l.stack, digest: l.digest }));
  if (Fl) throw ((Fl = !1), (e = Do), (Do = null), e);
  return (
    Ul & 1 && e.tag !== 0 && Nr(),
    (o = e.pendingLanes),
    o & 1 ? (e === $o ? un++ : ((un = 0), ($o = e))) : (un = 0),
    Ut(),
    null
  );
}
function Nr() {
  if (Et !== null) {
    var e = iu(Ul),
      t = Fe.transition,
      r = H;
    try {
      if (((Fe.transition = null), (H = 16 > e ? 16 : e), Et === null))
        var n = !1;
      else {
        if (((e = Et), (Et = null), (Ul = 0), B & 6)) throw Error(_(331));
        var l = B;
        for (B |= 4, T = e.current; T !== null; ) {
          var o = T,
            a = o.child;
          if (T.flags & 16) {
            var c = o.deletions;
            if (c !== null) {
              for (var i = 0; i < c.length; i++) {
                var u = c[i];
                for (T = u; T !== null; ) {
                  var p = T;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      an(8, p, o);
                  }
                  var f = p.child;
                  if (f !== null) ((f.return = p), (T = f));
                  else
                    for (; T !== null; ) {
                      p = T;
                      var g = p.sibling,
                        v = p.return;
                      if ((vd(p), p === u)) {
                        T = null;
                        break;
                      }
                      if (g !== null) {
                        ((g.return = v), (T = g));
                        break;
                      }
                      T = v;
                    }
                }
              }
              var x = o.alternate;
              if (x !== null) {
                var w = x.child;
                if (w !== null) {
                  x.child = null;
                  do {
                    var N = w.sibling;
                    ((w.sibling = null), (w = N));
                  } while (w !== null);
                }
              }
              T = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) ((a.return = o), (T = a));
          else
            e: for (; T !== null; ) {
              if (((o = T), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    an(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                ((h.return = o.return), (T = h));
                break e;
              }
              T = o.return;
            }
        }
        var m = e.current;
        for (T = m; T !== null; ) {
          a = T;
          var d = a.child;
          if (a.subtreeFlags & 2064 && d !== null) ((d.return = a), (T = d));
          else
            e: for (a = m; T !== null; ) {
              if (((c = T), c.flags & 2048))
                try {
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      rs(9, c);
                  }
                } catch (C) {
                  re(c, c.return, C);
                }
              if (c === a) {
                T = null;
                break e;
              }
              var b = c.sibling;
              if (b !== null) {
                ((b.return = c.return), (T = b));
                break e;
              }
              T = c.return;
            }
        }
        if (
          ((B = l), Ut(), et && typeof et.onPostCommitFiberRoot == "function")
        )
          try {
            et.onPostCommitFiberRoot(Gl, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      ((H = r), (Fe.transition = t));
    }
  }
  return !1;
}
function sc(e, t, r) {
  ((t = Pr(r, t)),
    (t = id(e, t, 1)),
    (e = Mt(e, t, 1)),
    (t = je()),
    e !== null && (Rn(e, 1, t), Pe(e, t)));
}
function re(e, t, r) {
  if (e.tag === 3) sc(e, e, r);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        sc(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof n.componentDidCatch == "function" &&
            (Tt === null || !Tt.has(n)))
        ) {
          ((e = Pr(r, e)),
            (e = cd(t, e, 1)),
            (t = Mt(t, e, 1)),
            (e = je()),
            t !== null && (Rn(t, 1, e), Pe(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Dp(e, t, r) {
  var n = e.pingCache;
  (n !== null && n.delete(t),
    (t = je()),
    (e.pingedLanes |= e.suspendedLanes & r),
    me === e &&
      (he & r) === r &&
      (de === 4 || (de === 3 && (he & 130023424) === he && 500 > se() - Ta)
        ? Gt(e, 0)
        : (Ma |= r)),
    Pe(e, t));
}
function Pd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Vn), (Vn <<= 1), !(Vn & 130023424) && (Vn = 4194304))
      : (t = 1));
  var r = je();
  ((e = mt(e, t)), e !== null && (Rn(e, t, r), Pe(e, r)));
}
function $p(e) {
  var t = e.memoizedState,
    r = 0;
  (t !== null && (r = t.retryLane), Pd(e, r));
}
function Fp(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        l = e.memoizedState;
      l !== null && (r = l.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(_(314));
  }
  (n !== null && n.delete(t), Pd(e, r));
}
var Rd;
Rd = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || _e.current) Ce = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return ((Ce = !1), _p(e, t, r));
      Ce = !!(e.flags & 131072);
    }
  else ((Ce = !1), Y && t.flags & 1048576 && Tu(t, zl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      (pl(e, t), (e = t.pendingProps));
      var l = Sr(t, we.current);
      (jr(t, r), (l = _a(null, t, n, e, l, r)));
      var o = Ea();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ee(n) ? ((o = !0), Rl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            ja(t),
            (l.updater = ts),
            (t.stateNode = l),
            (l._reactInternals = t),
            _o(t, n, e, r),
            (t = Ro(null, t, n, !0, o, r)))
          : ((t.tag = 0), Y && o && ha(t), be(null, t, l, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (pl(e, t),
          (e = t.pendingProps),
          (l = n._init),
          (n = l(n._payload)),
          (t.type = n),
          (l = t.tag = Bp(n)),
          (e = He(n, e)),
          l)
        ) {
          case 0:
            t = Po(null, t, n, e, r);
            break e;
          case 1:
            t = Yi(null, t, n, e, r);
            break e;
          case 11:
            t = Qi(null, t, n, e, r);
            break e;
          case 14:
            t = Gi(null, t, n, He(n.type, e), r);
            break e;
        }
        throw Error(_(306, n, ""));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (l = t.pendingProps),
        (l = t.elementType === n ? l : He(n, l)),
        Po(e, t, n, l, r)
      );
    case 1:
      return (
        (n = t.type),
        (l = t.pendingProps),
        (l = t.elementType === n ? l : He(n, l)),
        Yi(e, t, n, l, r)
      );
    case 3:
      e: {
        if ((md(t), e === null)) throw Error(_(387));
        ((n = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          Fu(e, t),
          Al(t, n, null, r));
        var a = t.memoizedState;
        if (((n = a.element), o.isDehydrated))
          if (
            ((o = {
              element: n,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((l = Pr(Error(_(423)), t)), (t = Ki(e, t, n, r, l)));
            break e;
          } else if (n !== l) {
            ((l = Pr(Error(_(424)), t)), (t = Ki(e, t, n, r, l)));
            break e;
          } else
            for (
              Le = zt(t.stateNode.containerInfo.firstChild),
                ze = t,
                Y = !0,
                qe = null,
                r = Du(t, null, n, r),
                t.child = r;
              r;

            )
              ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
        else {
          if ((Cr(), n === l)) {
            t = pt(e, t, r);
            break e;
          }
          be(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Uu(t),
        e === null && ko(t),
        (n = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (a = l.children),
        vo(n, l) ? (a = null) : o !== null && vo(n, o) && (t.flags |= 32),
        fd(e, t),
        be(e, t, a, r),
        t.child
      );
    case 6:
      return (e === null && ko(t), null);
    case 13:
      return pd(e, t, r);
    case 4:
      return (
        Na(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = _r(t, null, n, r)) : be(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (l = t.pendingProps),
        (l = t.elementType === n ? l : He(n, l)),
        Qi(e, t, n, l, r)
      );
    case 7:
      return (be(e, t, t.pendingProps, r), t.child);
    case 8:
      return (be(e, t, t.pendingProps.children, r), t.child);
    case 12:
      return (be(e, t, t.pendingProps.children, r), t.child);
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (a = l.value),
          V(Ml, n._currentValue),
          (n._currentValue = a),
          o !== null)
        )
          if (Ye(o.value, a)) {
            if (o.children === l.children && !_e.current) {
              t = pt(e, t, r);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var c = o.dependencies;
              if (c !== null) {
                a = o.child;
                for (var i = c.firstContext; i !== null; ) {
                  if (i.context === n) {
                    if (o.tag === 1) {
                      ((i = ct(-1, r & -r)), (i.tag = 2));
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var p = u.pending;
                        (p === null
                          ? (i.next = i)
                          : ((i.next = p.next), (p.next = i)),
                          (u.pending = i));
                      }
                    }
                    ((o.lanes |= r),
                      (i = o.alternate),
                      i !== null && (i.lanes |= r),
                      So(o.return, r, t),
                      (c.lanes |= r));
                    break;
                  }
                  i = i.next;
                }
              } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((a = o.return), a === null)) throw Error(_(341));
                ((a.lanes |= r),
                  (c = a.alternate),
                  c !== null && (c.lanes |= r),
                  So(a, r, t),
                  (a = o.sibling));
              } else a = o.child;
              if (a !== null) a.return = o;
              else
                for (a = o; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((o = a.sibling), o !== null)) {
                    ((o.return = a.return), (a = o));
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        (be(e, t, l.children, r), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (n = t.pendingProps.children),
        jr(t, r),
        (l = Ue(l)),
        (n = n(l)),
        (t.flags |= 1),
        be(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (l = He(n, t.pendingProps)),
        (l = He(n.type, l)),
        Gi(e, t, n, l, r)
      );
    case 15:
      return ud(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (l = t.pendingProps),
        (l = t.elementType === n ? l : He(n, l)),
        pl(e, t),
        (t.tag = 1),
        Ee(n) ? ((e = !0), Rl(t)) : (e = !1),
        jr(t, r),
        ad(t, n, l),
        _o(t, n, l, r),
        Ro(null, t, n, !0, e, r)
      );
    case 19:
      return hd(e, t, r);
    case 22:
      return dd(e, t, r);
  }
  throw Error(_(156, t.tag));
};
function Ld(e, t) {
  return lu(e, t);
}
function Up(e, t, r, n) {
  ((this.tag = e),
    (this.key = r),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = n),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function $e(e, t, r, n) {
  return new Up(e, t, r, n);
}
function Da(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Bp(e) {
  if (typeof e == "function") return Da(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === na)) return 11;
    if (e === la) return 14;
  }
  return 2;
}
function It(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = $e(e.tag, t, e.key, e.mode)),
        (r.elementType = e.elementType),
        (r.type = e.type),
        (r.stateNode = e.stateNode),
        (r.alternate = e),
        (e.alternate = r))
      : ((r.pendingProps = t),
        (r.type = e.type),
        (r.flags = 0),
        (r.subtreeFlags = 0),
        (r.deletions = null)),
    (r.flags = e.flags & 14680064),
    (r.childLanes = e.childLanes),
    (r.lanes = e.lanes),
    (r.child = e.child),
    (r.memoizedProps = e.memoizedProps),
    (r.memoizedState = e.memoizedState),
    (r.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (r.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (r.sibling = e.sibling),
    (r.index = e.index),
    (r.ref = e.ref),
    r
  );
}
function xl(e, t, r, n, l, o) {
  var a = 2;
  if (((n = e), typeof e == "function")) Da(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case ar:
        return Yt(r.children, l, o, t);
      case ra:
        ((a = 8), (l |= 8));
        break;
      case Ks:
        return (
          (e = $e(12, r, t, l | 2)),
          (e.elementType = Ks),
          (e.lanes = o),
          e
        );
      case Xs:
        return ((e = $e(13, r, t, l)), (e.elementType = Xs), (e.lanes = o), e);
      case Zs:
        return ((e = $e(19, r, t, l)), (e.elementType = Zs), (e.lanes = o), e);
      case Uc:
        return ls(r, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case $c:
              a = 10;
              break e;
            case Fc:
              a = 9;
              break e;
            case na:
              a = 11;
              break e;
            case la:
              a = 14;
              break e;
            case jt:
              ((a = 16), (n = null));
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = $e(a, r, t, l)),
    (t.elementType = e),
    (t.type = n),
    (t.lanes = o),
    t
  );
}
function Yt(e, t, r, n) {
  return ((e = $e(7, e, n, t)), (e.lanes = r), e);
}
function ls(e, t, r, n) {
  return (
    (e = $e(22, e, n, t)),
    (e.elementType = Uc),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Fs(e, t, r) {
  return ((e = $e(6, e, null, t)), (e.lanes = r), e);
}
function Us(e, t, r) {
  return (
    (t = $e(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Wp(e, t, r, n, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = bs(0)),
    (this.expirationTimes = bs(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = bs(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function $a(e, t, r, n, l, o, a, c, i) {
  return (
    (e = new Wp(e, t, r, c, i)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = $e(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ja(o),
    e
  );
}
function Hp(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: or,
    key: n == null ? null : "" + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function zd(e) {
  if (!e) return Dt;
  e = e._reactInternals;
  e: {
    if (rr(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ee(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Ee(r)) return zu(e, r, t);
  }
  return t;
}
function Md(e, t, r, n, l, o, a, c, i) {
  return (
    (e = $a(r, n, !0, e, l, o, a, c, i)),
    (e.context = zd(null)),
    (r = e.current),
    (n = je()),
    (l = At(r)),
    (o = ct(n, l)),
    (o.callback = t ?? null),
    Mt(r, o, l),
    (e.current.lanes = l),
    Rn(e, l, n),
    Pe(e, n),
    e
  );
}
function ss(e, t, r, n) {
  var l = t.current,
    o = je(),
    a = At(l);
  return (
    (r = zd(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = ct(o, a)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = Mt(l, t, a)),
    e !== null && (Ge(e, l, a, o), dl(e, l, a)),
    a
  );
}
function Wl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function oc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Fa(e, t) {
  (oc(e, t), (e = e.alternate) && oc(e, t));
}
function Vp() {
  return null;
}
var Td =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ua(e) {
  this._internalRoot = e;
}
os.prototype.render = Ua.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  ss(e, t, null, null);
};
os.prototype.unmount = Ua.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (er(function () {
      ss(null, e, null, null);
    }),
      (t[ft] = null));
  }
};
function os(e) {
  this._internalRoot = e;
}
os.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = du();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < kt.length && t !== 0 && t < kt[r].priority; r++);
    (kt.splice(r, 0, e), r === 0 && mu(e));
  }
};
function Ba(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function as(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function ac() {}
function qp(e, t, r, n, l) {
  if (l) {
    if (typeof n == "function") {
      var o = n;
      n = function () {
        var u = Wl(a);
        o.call(u);
      };
    }
    var a = Md(t, n, e, 0, null, !1, !1, "", ac);
    return (
      (e._reactRootContainer = a),
      (e[ft] = a.current),
      vn(e.nodeType === 8 ? e.parentNode : e),
      er(),
      a
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof n == "function") {
    var c = n;
    n = function () {
      var u = Wl(i);
      c.call(u);
    };
  }
  var i = $a(e, 0, !1, null, null, !1, !1, "", ac);
  return (
    (e._reactRootContainer = i),
    (e[ft] = i.current),
    vn(e.nodeType === 8 ? e.parentNode : e),
    er(function () {
      ss(t, i, r, n);
    }),
    i
  );
}
function is(e, t, r, n, l) {
  var o = r._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var c = l;
      l = function () {
        var i = Wl(a);
        c.call(i);
      };
    }
    ss(t, a, e, l);
  } else a = qp(r, t, e, l, n);
  return Wl(a);
}
cu = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Zr(t.pendingLanes);
        r !== 0 &&
          (aa(t, r | 1), Pe(t, se()), !(B & 6) && ((Rr = se() + 500), Ut()));
      }
      break;
    case 13:
      (er(function () {
        var n = mt(e, 1);
        if (n !== null) {
          var l = je();
          Ge(n, e, 1, l);
        }
      }),
        Fa(e, 1));
  }
};
ia = function (e) {
  if (e.tag === 13) {
    var t = mt(e, 134217728);
    if (t !== null) {
      var r = je();
      Ge(t, e, 134217728, r);
    }
    Fa(e, 134217728);
  }
};
uu = function (e) {
  if (e.tag === 13) {
    var t = At(e),
      r = mt(e, t);
    if (r !== null) {
      var n = je();
      Ge(r, e, t, n);
    }
    Fa(e, t);
  }
};
du = function () {
  return H;
};
fu = function (e, t) {
  var r = H;
  try {
    return ((H = e), t());
  } finally {
    H = r;
  }
};
io = function (e, t, r) {
  switch (t) {
    case "input":
      if ((to(e, r), (t = r.name), r.type === "radio" && t != null)) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (
          r = r.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < r.length;
          t++
        ) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var l = Zl(n);
            if (!l) throw Error(_(90));
            (Wc(n), to(n, l));
          }
        }
      }
      break;
    case "textarea":
      Vc(e, r);
      break;
    case "select":
      ((t = r.value), t != null && yr(e, !!r.multiple, t, !1));
  }
};
Zc = Aa;
Jc = er;
var Qp = { usingClientEntryPoint: !1, Events: [zn, dr, Zl, Kc, Xc, Aa] },
  Vr = {
    findFiberByHostInstance: Vt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Gp = {
    bundleType: Vr.bundleType,
    version: Vr.version,
    rendererPackageName: Vr.rendererPackageName,
    rendererConfig: Vr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: gt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = ru(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Vr.findFiberByHostInstance || Vp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var rl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!rl.isDisabled && rl.supportsFiber)
    try {
      ((Gl = rl.inject(Gp)), (et = rl));
    } catch {}
}
Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qp;
Te.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ba(t)) throw Error(_(200));
  return Hp(e, t, null, r);
};
Te.createRoot = function (e, t) {
  if (!Ba(e)) throw Error(_(299));
  var r = !1,
    n = "",
    l = Td;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = $a(e, 1, !1, null, null, r, !1, n, l)),
    (e[ft] = t.current),
    vn(e.nodeType === 8 ? e.parentNode : e),
    new Ua(t)
  );
};
Te.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(_(188))
      : ((e = Object.keys(e).join(",")), Error(_(268, e)));
  return ((e = ru(t)), (e = e === null ? null : e.stateNode), e);
};
Te.flushSync = function (e) {
  return er(e);
};
Te.hydrate = function (e, t, r) {
  if (!as(t)) throw Error(_(200));
  return is(null, e, t, !0, r);
};
Te.hydrateRoot = function (e, t, r) {
  if (!Ba(e)) throw Error(_(405));
  var n = (r != null && r.hydratedSources) || null,
    l = !1,
    o = "",
    a = Td;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (l = !0),
      r.identifierPrefix !== void 0 && (o = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (a = r.onRecoverableError)),
    (t = Md(t, null, e, 1, r ?? null, l, !1, o, a)),
    (e[ft] = t.current),
    vn(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      ((r = n[e]),
        (l = r._getVersion),
        (l = l(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, l])
          : t.mutableSourceEagerHydrationData.push(r, l));
  return new os(t);
};
Te.render = function (e, t, r) {
  if (!as(t)) throw Error(_(200));
  return is(null, e, t, !1, r);
};
Te.unmountComponentAtNode = function (e) {
  if (!as(e)) throw Error(_(40));
  return e._reactRootContainer
    ? (er(function () {
        is(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[ft] = null));
        });
      }),
      !0)
    : !1;
};
Te.unstable_batchedUpdates = Aa;
Te.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!as(r)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return is(e, t, r, !1, n);
};
Te.version = "18.3.1-next-f1338f8080-20240426";
function Ad() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ad);
    } catch (e) {
      console.error(e);
    }
}
(Ad(), (Ac.exports = Te));
var Id = Ac.exports,
  Od,
  ic = Id;
((Od = ic.createRoot), ic.hydrateRoot);
/**
 * react-router v7.8.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var cc = "popstate";
function Yp(e = {}) {
  function t(n, l) {
    let { pathname: o, search: a, hash: c } = n.location;
    return Bo(
      "",
      { pathname: o, search: a, hash: c },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function r(n, l) {
    return typeof l == "string" ? l : En(l);
  }
  return Xp(t, r, null, e);
}
function J(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function rt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Kp() {
  return Math.random().toString(36).substring(2, 10);
}
function uc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Bo(e, t, r = null, n) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? Tr(t) : t),
    state: r,
    key: (t && t.key) || n || Kp(),
  };
}
function En({ pathname: e = "/", search: t = "", hash: r = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
    e
  );
}
function Tr(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((t.hash = e.substring(r)), (e = e.substring(0, r)));
    let n = e.indexOf("?");
    (n >= 0 && ((t.search = e.substring(n)), (e = e.substring(0, n))),
      e && (t.pathname = e));
  }
  return t;
}
function Xp(e, t, r, n = {}) {
  let { window: l = document.defaultView, v5Compat: o = !1 } = n,
    a = l.history,
    c = "POP",
    i = null,
    u = p();
  u == null && ((u = 0), a.replaceState({ ...a.state, idx: u }, ""));
  function p() {
    return (a.state || { idx: null }).idx;
  }
  function f() {
    c = "POP";
    let N = p(),
      h = N == null ? null : N - u;
    ((u = N), i && i({ action: c, location: w.location, delta: h }));
  }
  function g(N, h) {
    c = "PUSH";
    let m = Bo(w.location, N, h);
    u = p() + 1;
    let d = uc(m, u),
      b = w.createHref(m);
    try {
      a.pushState(d, "", b);
    } catch (C) {
      if (C instanceof DOMException && C.name === "DataCloneError") throw C;
      l.location.assign(b);
    }
    o && i && i({ action: c, location: w.location, delta: 1 });
  }
  function v(N, h) {
    c = "REPLACE";
    let m = Bo(w.location, N, h);
    u = p();
    let d = uc(m, u),
      b = w.createHref(m);
    (a.replaceState(d, "", b),
      o && i && i({ action: c, location: w.location, delta: 0 }));
  }
  function x(N) {
    return Zp(N);
  }
  let w = {
    get action() {
      return c;
    },
    get location() {
      return e(l, a);
    },
    listen(N) {
      if (i) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(cc, f),
        (i = N),
        () => {
          (l.removeEventListener(cc, f), (i = null));
        }
      );
    },
    createHref(N) {
      return t(l, N);
    },
    createURL: x,
    encodeLocation(N) {
      let h = x(N);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: g,
    replace: v,
    go(N) {
      return a.go(N);
    },
  };
  return w;
}
function Zp(e, t = !1) {
  let r = "http://localhost";
  (typeof window < "u" &&
    (r =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    J(r, "No window.location.(origin|href) available to create URL"));
  let n = typeof e == "string" ? e : En(e);
  return (
    (n = n.replace(/ $/, "%20")),
    !t && n.startsWith("//") && (n = r + n),
    new URL(n, r)
  );
}
function Dd(e, t, r = "/") {
  return Jp(e, t, r, !1);
}
function Jp(e, t, r, n) {
  let l = typeof t == "string" ? Tr(t) : t,
    o = ht(l.pathname || "/", r);
  if (o == null) return null;
  let a = $d(e);
  eh(a);
  let c = null;
  for (let i = 0; c == null && i < a.length; ++i) {
    let u = dh(o);
    c = ch(a[i], u, n);
  }
  return c;
}
function $d(e, t = [], r = [], n = "", l = !1) {
  let o = (a, c, i = l, u) => {
    let p = {
      relativePath: u === void 0 ? a.path || "" : u,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: c,
      route: a,
    };
    if (p.relativePath.startsWith("/")) {
      if (!p.relativePath.startsWith(n) && i) return;
      (J(
        p.relativePath.startsWith(n),
        `Absolute route path "${p.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (p.relativePath = p.relativePath.slice(n.length)));
    }
    let f = ut([n, p.relativePath]),
      g = r.concat(p);
    (a.children &&
      a.children.length > 0 &&
      (J(
        a.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${f}".`,
      ),
      $d(a.children, t, g, f, i)),
      !(a.path == null && !a.index) &&
        t.push({ path: f, score: ah(f, a.index), routesMeta: g }));
  };
  return (
    e.forEach((a, c) => {
      var i;
      if (a.path === "" || !((i = a.path) != null && i.includes("?"))) o(a, c);
      else for (let u of Fd(a.path)) o(a, c, !0, u);
    }),
    t
  );
}
function Fd(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t,
    l = r.endsWith("?"),
    o = r.replace(/\?$/, "");
  if (n.length === 0) return l ? [o, ""] : [o];
  let a = Fd(n.join("/")),
    c = [];
  return (
    c.push(...a.map((i) => (i === "" ? o : [o, i].join("/")))),
    l && c.push(...a),
    c.map((i) => (e.startsWith("/") && i === "" ? "/" : i))
  );
}
function eh(e) {
  e.sort((t, r) =>
    t.score !== r.score
      ? r.score - t.score
      : ih(
          t.routesMeta.map((n) => n.childrenIndex),
          r.routesMeta.map((n) => n.childrenIndex),
        ),
  );
}
var th = /^:[\w-]+$/,
  rh = 3,
  nh = 2,
  lh = 1,
  sh = 10,
  oh = -2,
  dc = (e) => e === "*";
function ah(e, t) {
  let r = e.split("/"),
    n = r.length;
  return (
    r.some(dc) && (n += oh),
    t && (n += nh),
    r
      .filter((l) => !dc(l))
      .reduce((l, o) => l + (th.test(o) ? rh : o === "" ? lh : sh), n)
  );
}
function ih(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, l) => n === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function ch(e, t, r = !1) {
  let { routesMeta: n } = e,
    l = {},
    o = "/",
    a = [];
  for (let c = 0; c < n.length; ++c) {
    let i = n[c],
      u = c === n.length - 1,
      p = o === "/" ? t : t.slice(o.length) || "/",
      f = Hl(
        { path: i.relativePath, caseSensitive: i.caseSensitive, end: u },
        p,
      ),
      g = i.route;
    if (
      (!f &&
        u &&
        r &&
        !n[n.length - 1].route.index &&
        (f = Hl(
          { path: i.relativePath, caseSensitive: i.caseSensitive, end: !1 },
          p,
        )),
      !f)
    )
      return null;
    (Object.assign(l, f.params),
      a.push({
        params: l,
        pathname: ut([o, f.pathname]),
        pathnameBase: hh(ut([o, f.pathnameBase])),
        route: g,
      }),
      f.pathnameBase !== "/" && (o = ut([o, f.pathnameBase])));
  }
  return a;
}
function Hl(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = uh(e.path, e.caseSensitive, e.end),
    l = t.match(r);
  if (!l) return null;
  let o = l[0],
    a = o.replace(/(.)\/+$/, "$1"),
    c = l.slice(1);
  return {
    params: n.reduce((u, { paramName: p, isOptional: f }, g) => {
      if (p === "*") {
        let x = c[g] || "";
        a = o.slice(0, o.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const v = c[g];
      return (
        f && !v ? (u[p] = void 0) : (u[p] = (v || "").replace(/%2F/g, "/")),
        u
      );
    }, {}),
    pathname: o,
    pathnameBase: a,
    pattern: e,
  };
}
function uh(e, t = !1, r = !0) {
  rt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let n = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (a, c, i) => (
            n.push({ paramName: c, isOptional: i != null }),
            i ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (n.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), n]
  );
}
function dh(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      rt(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function ht(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length,
    n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function fh(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: l = "",
  } = typeof e == "string" ? Tr(e) : e;
  return {
    pathname: r ? (r.startsWith("/") ? r : mh(r, t)) : t,
    search: gh(n),
    hash: xh(l),
  };
}
function mh(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? r.length > 1 && r.pop() : l !== "." && r.push(l);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Bs(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function ph(e) {
  return e.filter(
    (t, r) => r === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Ud(e) {
  let t = ph(e);
  return t.map((r, n) => (n === t.length - 1 ? r.pathname : r.pathnameBase));
}
function Bd(e, t, r, n = !1) {
  let l;
  typeof e == "string"
    ? (l = Tr(e))
    : ((l = { ...e }),
      J(
        !l.pathname || !l.pathname.includes("?"),
        Bs("?", "pathname", "search", l),
      ),
      J(
        !l.pathname || !l.pathname.includes("#"),
        Bs("#", "pathname", "hash", l),
      ),
      J(!l.search || !l.search.includes("#"), Bs("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    a = o ? "/" : l.pathname,
    c;
  if (a == null) c = r;
  else {
    let f = t.length - 1;
    if (!n && a.startsWith("..")) {
      let g = a.split("/");
      for (; g[0] === ".."; ) (g.shift(), (f -= 1));
      l.pathname = g.join("/");
    }
    c = f >= 0 ? t[f] : "/";
  }
  let i = fh(l, c),
    u = a && a !== "/" && a.endsWith("/"),
    p = (o || a === ".") && r.endsWith("/");
  return (!i.pathname.endsWith("/") && (u || p) && (i.pathname += "/"), i);
}
var ut = (e) => e.join("/").replace(/\/\/+/g, "/"),
  hh = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  gh = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  xh = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function yh(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var Wd = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Wd);
var vh = ["GET", ...Wd];
new Set(vh);
var Ar = y.createContext(null);
Ar.displayName = "DataRouter";
var cs = y.createContext(null);
cs.displayName = "DataRouterState";
y.createContext(!1);
var Hd = y.createContext({ isTransitioning: !1 });
Hd.displayName = "ViewTransition";
var wh = y.createContext(new Map());
wh.displayName = "Fetchers";
var bh = y.createContext(null);
bh.displayName = "Await";
var nt = y.createContext(null);
nt.displayName = "Navigation";
var Tn = y.createContext(null);
Tn.displayName = "Location";
var xt = y.createContext({ outlet: null, matches: [], isDataRoute: !1 });
xt.displayName = "Route";
var Wa = y.createContext(null);
Wa.displayName = "RouteError";
function jh(e, { relative: t } = {}) {
  J(An(), "useHref() may be used only in the context of a <Router> component.");
  let { basename: r, navigator: n } = y.useContext(nt),
    { hash: l, pathname: o, search: a } = In(e, { relative: t }),
    c = o;
  return (
    r !== "/" && (c = o === "/" ? r : ut([r, o])),
    n.createHref({ pathname: c, search: a, hash: l })
  );
}
function An() {
  return y.useContext(Tn) != null;
}
function yt() {
  return (
    J(
      An(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    y.useContext(Tn).location
  );
}
var Vd =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function qd(e) {
  y.useContext(nt).static || y.useLayoutEffect(e);
}
function Ha() {
  let { isDataRoute: e } = y.useContext(xt);
  return e ? Ah() : Nh();
}
function Nh() {
  J(
    An(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = y.useContext(Ar),
    { basename: t, navigator: r } = y.useContext(nt),
    { matches: n } = y.useContext(xt),
    { pathname: l } = yt(),
    o = JSON.stringify(Ud(n)),
    a = y.useRef(!1);
  return (
    qd(() => {
      a.current = !0;
    }),
    y.useCallback(
      (i, u = {}) => {
        if ((rt(a.current, Vd), !a.current)) return;
        if (typeof i == "number") {
          r.go(i);
          return;
        }
        let p = Bd(i, JSON.parse(o), l, u.relative === "path");
        (e == null &&
          t !== "/" &&
          (p.pathname = p.pathname === "/" ? t : ut([t, p.pathname])),
          (u.replace ? r.replace : r.push)(p, u.state, u));
      },
      [t, r, o, l, e],
    )
  );
}
y.createContext(null);
function In(e, { relative: t } = {}) {
  let { matches: r } = y.useContext(xt),
    { pathname: n } = yt(),
    l = JSON.stringify(Ud(r));
  return y.useMemo(() => Bd(e, JSON.parse(l), n, t === "path"), [e, l, n, t]);
}
function kh(e, t) {
  return Qd(e, t);
}
function Qd(e, t, r, n, l) {
  var m;
  J(
    An(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: o } = y.useContext(nt),
    { matches: a } = y.useContext(xt),
    c = a[a.length - 1],
    i = c ? c.params : {},
    u = c ? c.pathname : "/",
    p = c ? c.pathnameBase : "/",
    f = c && c.route;
  {
    let d = (f && f.path) || "";
    Gd(
      u,
      !f || d.endsWith("*") || d.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d === "/" ? "*" : `${d}/*`}">.`,
    );
  }
  let g = yt(),
    v;
  if (t) {
    let d = typeof t == "string" ? Tr(t) : t;
    (J(
      p === "/" || ((m = d.pathname) == null ? void 0 : m.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${d.pathname}" was given in the \`location\` prop.`,
    ),
      (v = d));
  } else v = g;
  let x = v.pathname || "/",
    w = x;
  if (p !== "/") {
    let d = p.replace(/^\//, "").split("/");
    w = "/" + x.replace(/^\//, "").split("/").slice(d.length).join("/");
  }
  let N = Dd(e, { pathname: w });
  (rt(
    f || N != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `,
  ),
    rt(
      N == null ||
        N[N.length - 1].route.element !== void 0 ||
        N[N.length - 1].route.Component !== void 0 ||
        N[N.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let h = Ph(
    N &&
      N.map((d) =>
        Object.assign({}, d, {
          params: Object.assign({}, i, d.params),
          pathname: ut([
            p,
            o.encodeLocation
              ? o.encodeLocation(d.pathname).pathname
              : d.pathname,
          ]),
          pathnameBase:
            d.pathnameBase === "/"
              ? p
              : ut([
                  p,
                  o.encodeLocation
                    ? o.encodeLocation(d.pathnameBase).pathname
                    : d.pathnameBase,
                ]),
        }),
      ),
    a,
    r,
    n,
    l,
  );
  return t && h
    ? y.createElement(
        Tn.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...v,
            },
            navigationType: "POP",
          },
        },
        h,
      )
    : h;
}
function Sh() {
  let e = Th(),
    t = yh(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    n = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: n },
    o = { padding: "2px 4px", backgroundColor: n },
    a = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (a = y.createElement(
      y.Fragment,
      null,
      y.createElement("p", null, "💿 Hey developer 👋"),
      y.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        y.createElement("code", { style: o }, "ErrorBoundary"),
        " or",
        " ",
        y.createElement("code", { style: o }, "errorElement"),
        " prop on your route.",
      ),
    )),
    y.createElement(
      y.Fragment,
      null,
      y.createElement("h2", null, "Unexpected Application Error!"),
      y.createElement("h3", { style: { fontStyle: "italic" } }, t),
      r ? y.createElement("pre", { style: l }, r) : null,
      a,
    )
  );
}
var Ch = y.createElement(Sh, null),
  _h = class extends y.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.unstable_onError
        ? this.props.unstable_onError(e, t)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      return this.state.error !== void 0
        ? y.createElement(
            xt.Provider,
            { value: this.props.routeContext },
            y.createElement(Wa.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function Eh({ routeContext: e, match: t, children: r }) {
  let n = y.useContext(Ar);
  return (
    n &&
      n.static &&
      n.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (n.staticContext._deepestRenderedBoundaryId = t.route.id),
    y.createElement(xt.Provider, { value: e }, r)
  );
}
function Ph(e, t = [], r = null, n = null, l = null) {
  if (e == null) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else return null;
  }
  let o = e,
    a = r == null ? void 0 : r.errors;
  if (a != null) {
    let u = o.findIndex(
      (p) => p.route.id && (a == null ? void 0 : a[p.route.id]) !== void 0,
    );
    (J(
      u >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`,
    ),
      (o = o.slice(0, Math.min(o.length, u + 1))));
  }
  let c = !1,
    i = -1;
  if (r)
    for (let u = 0; u < o.length; u++) {
      let p = o[u];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (i = u),
        p.route.id)
      ) {
        let { loaderData: f, errors: g } = r,
          v =
            p.route.loader &&
            !f.hasOwnProperty(p.route.id) &&
            (!g || g[p.route.id] === void 0);
        if (p.route.lazy || v) {
          ((c = !0), i >= 0 ? (o = o.slice(0, i + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  return o.reduceRight((u, p, f) => {
    let g,
      v = !1,
      x = null,
      w = null;
    r &&
      ((g = a && p.route.id ? a[p.route.id] : void 0),
      (x = p.route.errorElement || Ch),
      c &&
        (i < 0 && f === 0
          ? (Gd(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (v = !0),
            (w = null))
          : i === f &&
            ((v = !0), (w = p.route.hydrateFallbackElement || null))));
    let N = t.concat(o.slice(0, f + 1)),
      h = () => {
        let m;
        return (
          g
            ? (m = x)
            : v
              ? (m = w)
              : p.route.Component
                ? (m = y.createElement(p.route.Component, null))
                : p.route.element
                  ? (m = p.route.element)
                  : (m = u),
          y.createElement(Eh, {
            match: p,
            routeContext: { outlet: u, matches: N, isDataRoute: r != null },
            children: m,
          })
        );
      };
    return r && (p.route.ErrorBoundary || p.route.errorElement || f === 0)
      ? y.createElement(_h, {
          location: r.location,
          revalidation: r.revalidation,
          component: x,
          error: g,
          children: h(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          unstable_onError: n,
        })
      : h();
  }, null);
}
function Va(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Rh(e) {
  let t = y.useContext(Ar);
  return (J(t, Va(e)), t);
}
function Lh(e) {
  let t = y.useContext(cs);
  return (J(t, Va(e)), t);
}
function zh(e) {
  let t = y.useContext(xt);
  return (J(t, Va(e)), t);
}
function qa(e) {
  let t = zh(e),
    r = t.matches[t.matches.length - 1];
  return (
    J(r.route.id, `${e} can only be used on routes that contain a unique "id"`),
    r.route.id
  );
}
function Mh() {
  return qa("useRouteId");
}
function Th() {
  var n;
  let e = y.useContext(Wa),
    t = Lh("useRouteError"),
    r = qa("useRouteError");
  return e !== void 0 ? e : (n = t.errors) == null ? void 0 : n[r];
}
function Ah() {
  let { router: e } = Rh("useNavigate"),
    t = qa("useNavigate"),
    r = y.useRef(!1);
  return (
    qd(() => {
      r.current = !0;
    }),
    y.useCallback(
      async (l, o = {}) => {
        (rt(r.current, Vd),
          r.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : await e.navigate(l, { fromRouteId: t, ...o })));
      },
      [e, t],
    )
  );
}
var fc = {};
function Gd(e, t, r) {
  !t && !fc[e] && ((fc[e] = !0), rt(!1, r));
}
y.memo(Ih);
function Ih({ routes: e, future: t, state: r, unstable_onError: n }) {
  return Qd(e, void 0, r, n, t);
}
function en(e) {
  J(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Oh({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: n = "POP",
  navigator: l,
  static: o = !1,
}) {
  J(
    !An(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let a = e.replace(/^\/*/, "/"),
    c = y.useMemo(
      () => ({ basename: a, navigator: l, static: o, future: {} }),
      [a, l, o],
    );
  typeof r == "string" && (r = Tr(r));
  let {
      pathname: i = "/",
      search: u = "",
      hash: p = "",
      state: f = null,
      key: g = "default",
    } = r,
    v = y.useMemo(() => {
      let x = ht(i, a);
      return x == null
        ? null
        : {
            location: { pathname: x, search: u, hash: p, state: f, key: g },
            navigationType: n,
          };
    }, [a, i, u, p, f, g, n]);
  return (
    rt(
      v != null,
      `<Router basename="${a}"> is not able to match the URL "${i}${u}${p}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    v == null
      ? null
      : y.createElement(
          nt.Provider,
          { value: c },
          y.createElement(Tn.Provider, { children: t, value: v }),
        )
  );
}
function Dh({ children: e, location: t }) {
  return kh(Wo(e), t);
}
function Wo(e, t = []) {
  let r = [];
  return (
    y.Children.forEach(e, (n, l) => {
      if (!y.isValidElement(n)) return;
      let o = [...t, l];
      if (n.type === y.Fragment) {
        r.push.apply(r, Wo(n.props.children, o));
        return;
      }
      (J(
        n.type === en,
        `[${typeof n.type == "string" ? n.type : n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        J(
          !n.props.index || !n.props.children,
          "An index route cannot have child routes.",
        ));
      let a = {
        id: n.props.id || o.join("-"),
        caseSensitive: n.props.caseSensitive,
        element: n.props.element,
        Component: n.props.Component,
        index: n.props.index,
        path: n.props.path,
        loader: n.props.loader,
        action: n.props.action,
        hydrateFallbackElement: n.props.hydrateFallbackElement,
        HydrateFallback: n.props.HydrateFallback,
        errorElement: n.props.errorElement,
        ErrorBoundary: n.props.ErrorBoundary,
        hasErrorBoundary:
          n.props.hasErrorBoundary === !0 ||
          n.props.ErrorBoundary != null ||
          n.props.errorElement != null,
        shouldRevalidate: n.props.shouldRevalidate,
        handle: n.props.handle,
        lazy: n.props.lazy,
      };
      (n.props.children && (a.children = Wo(n.props.children, o)), r.push(a));
    }),
    r
  );
}
var yl = "get",
  vl = "application/x-www-form-urlencoded";
function us(e) {
  return e != null && typeof e.tagName == "string";
}
function $h(e) {
  return us(e) && e.tagName.toLowerCase() === "button";
}
function Fh(e) {
  return us(e) && e.tagName.toLowerCase() === "form";
}
function Uh(e) {
  return us(e) && e.tagName.toLowerCase() === "input";
}
function Bh(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Wh(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Bh(e);
}
var nl = null;
function Hh() {
  if (nl === null)
    try {
      (new FormData(document.createElement("form"), 0), (nl = !1));
    } catch {
      nl = !0;
    }
  return nl;
}
var Vh = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Ws(e) {
  return e != null && !Vh.has(e)
    ? (rt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vl}"`,
      ),
      null)
    : e;
}
function qh(e, t) {
  let r, n, l, o, a;
  if (Fh(e)) {
    let c = e.getAttribute("action");
    ((n = c ? ht(c, t) : null),
      (r = e.getAttribute("method") || yl),
      (l = Ws(e.getAttribute("enctype")) || vl),
      (o = new FormData(e)));
  } else if ($h(e) || (Uh(e) && (e.type === "submit" || e.type === "image"))) {
    let c = e.form;
    if (c == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let i = e.getAttribute("formaction") || c.getAttribute("action");
    if (
      ((n = i ? ht(i, t) : null),
      (r = e.getAttribute("formmethod") || c.getAttribute("method") || yl),
      (l =
        Ws(e.getAttribute("formenctype")) ||
        Ws(c.getAttribute("enctype")) ||
        vl),
      (o = new FormData(c, e)),
      !Hh())
    ) {
      let { name: u, type: p, value: f } = e;
      if (p === "image") {
        let g = u ? `${u}.` : "";
        (o.append(`${g}x`, "0"), o.append(`${g}y`, "0"));
      } else u && o.append(u, f);
    }
  } else {
    if (us(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((r = yl), (n = null), (l = vl), (a = e));
  }
  return (
    o && l === "text/plain" && ((a = o), (o = void 0)),
    { action: n, method: r.toLowerCase(), encType: l, formData: o, body: a }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Qa(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Qh(e, t, r) {
  let n =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    n.pathname === "/"
      ? (n.pathname = `_root.${r}`)
      : t && ht(n.pathname, t) === "/"
        ? (n.pathname = `${t.replace(/\/$/, "")}/_root.${r}`)
        : (n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`),
    n
  );
}
async function Gh(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let r = await import(e.module);
    return ((t[e.id] = r), r);
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Yh(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function Kh(e, t, r) {
  let n = await Promise.all(
    e.map(async (l) => {
      let o = t.routes[l.route.id];
      if (o) {
        let a = await Gh(o, r);
        return a.links ? a.links() : [];
      }
      return [];
    }),
  );
  return eg(
    n
      .flat(1)
      .filter(Yh)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" },
      ),
  );
}
function mc(e, t, r, n, l, o) {
  let a = (i, u) => (r[u] ? i.route.id !== r[u].route.id : !0),
    c = (i, u) => {
      var p;
      return (
        r[u].pathname !== i.pathname ||
        (((p = r[u].route.path) == null ? void 0 : p.endsWith("*")) &&
          r[u].params["*"] !== i.params["*"])
      );
    };
  return o === "assets"
    ? t.filter((i, u) => a(i, u) || c(i, u))
    : o === "data"
      ? t.filter((i, u) => {
          var f;
          let p = n.routes[i.route.id];
          if (!p || !p.hasLoader) return !1;
          if (a(i, u) || c(i, u)) return !0;
          if (i.route.shouldRevalidate) {
            let g = i.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin,
              ),
              currentParams: ((f = r[0]) == null ? void 0 : f.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: i.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof g == "boolean") return g;
          }
          return !0;
        })
      : [];
}
function Xh(e, t, { includeHydrateFallback: r } = {}) {
  return Zh(
    e
      .map((n) => {
        let l = t.routes[n.route.id];
        if (!l) return [];
        let o = [l.module];
        return (
          l.clientActionModule && (o = o.concat(l.clientActionModule)),
          l.clientLoaderModule && (o = o.concat(l.clientLoaderModule)),
          r &&
            l.hydrateFallbackModule &&
            (o = o.concat(l.hydrateFallbackModule)),
          l.imports && (o = o.concat(l.imports)),
          o
        );
      })
      .flat(1),
  );
}
function Zh(e) {
  return [...new Set(e)];
}
function Jh(e) {
  let t = {},
    r = Object.keys(e).sort();
  for (let n of r) t[n] = e[n];
  return t;
}
function eg(e, t) {
  let r = new Set();
  return (
    new Set(t),
    e.reduce((n, l) => {
      let o = JSON.stringify(Jh(l));
      return (r.has(o) || (r.add(o), n.push({ key: o, link: l })), n);
    }, [])
  );
}
function Yd() {
  let e = y.useContext(Ar);
  return (
    Qa(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function tg() {
  let e = y.useContext(cs);
  return (
    Qa(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Ga = y.createContext(void 0);
Ga.displayName = "FrameworkContext";
function Kd() {
  let e = y.useContext(Ga);
  return (
    Qa(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function rg(e, t) {
  let r = y.useContext(Ga),
    [n, l] = y.useState(!1),
    [o, a] = y.useState(!1),
    {
      onFocus: c,
      onBlur: i,
      onMouseEnter: u,
      onMouseLeave: p,
      onTouchStart: f,
    } = t,
    g = y.useRef(null);
  (y.useEffect(() => {
    if ((e === "render" && a(!0), e === "viewport")) {
      let w = (h) => {
          h.forEach((m) => {
            a(m.isIntersecting);
          });
        },
        N = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        g.current && N.observe(g.current),
        () => {
          N.disconnect();
        }
      );
    }
  }, [e]),
    y.useEffect(() => {
      if (n) {
        let w = setTimeout(() => {
          a(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [n]));
  let v = () => {
      l(!0);
    },
    x = () => {
      (l(!1), a(!1));
    };
  return r
    ? e !== "intent"
      ? [o, g, {}]
      : [
          o,
          g,
          {
            onFocus: qr(c, v),
            onBlur: qr(i, x),
            onMouseEnter: qr(u, v),
            onMouseLeave: qr(p, x),
            onTouchStart: qr(f, v),
          },
        ]
    : [!1, g, {}];
}
function qr(e, t) {
  return (r) => {
    (e && e(r), r.defaultPrevented || t(r));
  };
}
function ng({ page: e, ...t }) {
  let { router: r } = Yd(),
    n = y.useMemo(() => Dd(r.routes, e, r.basename), [r.routes, e, r.basename]);
  return n ? y.createElement(sg, { page: e, matches: n, ...t }) : null;
}
function lg(e) {
  let { manifest: t, routeModules: r } = Kd(),
    [n, l] = y.useState([]);
  return (
    y.useEffect(() => {
      let o = !1;
      return (
        Kh(e, t, r).then((a) => {
          o || l(a);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, r]),
    n
  );
}
function sg({ page: e, matches: t, ...r }) {
  let n = yt(),
    { manifest: l, routeModules: o } = Kd(),
    { basename: a } = Yd(),
    { loaderData: c, matches: i } = tg(),
    u = y.useMemo(() => mc(e, t, i, l, n, "data"), [e, t, i, l, n]),
    p = y.useMemo(() => mc(e, t, i, l, n, "assets"), [e, t, i, l, n]),
    f = y.useMemo(() => {
      if (e === n.pathname + n.search + n.hash) return [];
      let x = new Set(),
        w = !1;
      if (
        (t.forEach((h) => {
          var d;
          let m = l.routes[h.route.id];
          !m ||
            !m.hasLoader ||
            ((!u.some((b) => b.route.id === h.route.id) &&
              h.route.id in c &&
              (d = o[h.route.id]) != null &&
              d.shouldRevalidate) ||
            m.hasClientLoader
              ? (w = !0)
              : x.add(h.route.id));
        }),
        x.size === 0)
      )
        return [];
      let N = Qh(e, a, "data");
      return (
        w &&
          x.size > 0 &&
          N.searchParams.set(
            "_routes",
            t
              .filter((h) => x.has(h.route.id))
              .map((h) => h.route.id)
              .join(","),
          ),
        [N.pathname + N.search]
      );
    }, [a, c, n, l, u, t, e, o]),
    g = y.useMemo(() => Xh(p, l), [p, l]),
    v = lg(p);
  return y.createElement(
    y.Fragment,
    null,
    f.map((x) =>
      y.createElement("link", {
        key: x,
        rel: "prefetch",
        as: "fetch",
        href: x,
        ...r,
      }),
    ),
    g.map((x) =>
      y.createElement("link", { key: x, rel: "modulepreload", href: x, ...r }),
    ),
    v.map(({ key: x, link: w }) =>
      y.createElement("link", { key: x, nonce: r.nonce, ...w }),
    ),
  );
}
function og(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var Xd =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Xd && (window.__reactRouterVersion = "7.8.2");
} catch {}
function ag({ basename: e, children: t, window: r }) {
  let n = y.useRef();
  n.current == null && (n.current = Yp({ window: r, v5Compat: !0 }));
  let l = n.current,
    [o, a] = y.useState({ action: l.action, location: l.location }),
    c = y.useCallback(
      (i) => {
        y.startTransition(() => a(i));
      },
      [a],
    );
  return (
    y.useLayoutEffect(() => l.listen(c), [l, c]),
    y.createElement(Oh, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: l,
    })
  );
}
var Zd = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ct = y.forwardRef(function (
    {
      onClick: t,
      discover: r = "render",
      prefetch: n = "none",
      relative: l,
      reloadDocument: o,
      replace: a,
      state: c,
      target: i,
      to: u,
      preventScrollReset: p,
      viewTransition: f,
      ...g
    },
    v,
  ) {
    let { basename: x } = y.useContext(nt),
      w = typeof u == "string" && Zd.test(u),
      N,
      h = !1;
    if (typeof u == "string" && w && ((N = u), Xd))
      try {
        let P = new URL(window.location.href),
          M = u.startsWith("//") ? new URL(P.protocol + u) : new URL(u),
          S = ht(M.pathname, x);
        M.origin === P.origin && S != null
          ? (u = S + M.search + M.hash)
          : (h = !0);
      } catch {
        rt(
          !1,
          `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let m = jh(u, { relative: l }),
      [d, b, C] = rg(n, g),
      R = dg(u, {
        replace: a,
        state: c,
        target: i,
        preventScrollReset: p,
        relative: l,
        viewTransition: f,
      });
    function E(P) {
      (t && t(P), P.defaultPrevented || R(P));
    }
    let k = y.createElement("a", {
      ...g,
      ...C,
      href: N || m,
      onClick: h || o ? t : E,
      ref: og(v, b),
      target: i,
      "data-discover": !w && r === "render" ? "true" : void 0,
    });
    return d && !w
      ? y.createElement(y.Fragment, null, k, y.createElement(ng, { page: m }))
      : k;
  });
Ct.displayName = "Link";
var ig = y.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: l = !1,
    style: o,
    to: a,
    viewTransition: c,
    children: i,
    ...u
  },
  p,
) {
  let f = In(a, { relative: u.relative }),
    g = yt(),
    v = y.useContext(cs),
    { navigator: x, basename: w } = y.useContext(nt),
    N = v != null && gg(f) && c === !0,
    h = x.encodeLocation ? x.encodeLocation(f).pathname : f.pathname,
    m = g.pathname,
    d =
      v && v.navigation && v.navigation.location
        ? v.navigation.location.pathname
        : null;
  (r ||
    ((m = m.toLowerCase()),
    (d = d ? d.toLowerCase() : null),
    (h = h.toLowerCase())),
    d && w && (d = ht(d, w) || d));
  const b = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
  let C = m === h || (!l && m.startsWith(h) && m.charAt(b) === "/"),
    R =
      d != null &&
      (d === h || (!l && d.startsWith(h) && d.charAt(h.length) === "/")),
    E = { isActive: C, isPending: R, isTransitioning: N },
    k = C ? t : void 0,
    P;
  typeof n == "function"
    ? (P = n(E))
    : (P = [
        n,
        C ? "active" : null,
        R ? "pending" : null,
        N ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let M = typeof o == "function" ? o(E) : o;
  return y.createElement(
    Ct,
    {
      ...u,
      "aria-current": k,
      className: P,
      ref: p,
      style: M,
      to: a,
      viewTransition: c,
    },
    typeof i == "function" ? i(E) : i,
  );
});
ig.displayName = "NavLink";
var cg = y.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: r,
      reloadDocument: n,
      replace: l,
      state: o,
      method: a = yl,
      action: c,
      onSubmit: i,
      relative: u,
      preventScrollReset: p,
      viewTransition: f,
      ...g
    },
    v,
  ) => {
    let x = pg(),
      w = hg(c, { relative: u }),
      N = a.toLowerCase() === "get" ? "get" : "post",
      h = typeof c == "string" && Zd.test(c),
      m = (d) => {
        if ((i && i(d), d.defaultPrevented)) return;
        d.preventDefault();
        let b = d.nativeEvent.submitter,
          C = (b == null ? void 0 : b.getAttribute("formmethod")) || a;
        x(b || d.currentTarget, {
          fetcherKey: t,
          method: C,
          navigate: r,
          replace: l,
          state: o,
          relative: u,
          preventScrollReset: p,
          viewTransition: f,
        });
      };
    return y.createElement("form", {
      ref: v,
      method: N,
      action: w,
      onSubmit: n ? i : m,
      ...g,
      "data-discover": !h && e === "render" ? "true" : void 0,
    });
  },
);
cg.displayName = "Form";
function ug(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Jd(e) {
  let t = y.useContext(Ar);
  return (J(t, ug(e)), t);
}
function dg(
  e,
  {
    target: t,
    replace: r,
    state: n,
    preventScrollReset: l,
    relative: o,
    viewTransition: a,
  } = {},
) {
  let c = Ha(),
    i = yt(),
    u = In(e, { relative: o });
  return y.useCallback(
    (p) => {
      if (Wh(p, t)) {
        p.preventDefault();
        let f = r !== void 0 ? r : En(i) === En(u);
        c(e, {
          replace: f,
          state: n,
          preventScrollReset: l,
          relative: o,
          viewTransition: a,
        });
      }
    },
    [i, c, u, r, n, t, e, l, o, a],
  );
}
var fg = 0,
  mg = () => `__${String(++fg)}__`;
function pg() {
  let { router: e } = Jd("useSubmit"),
    { basename: t } = y.useContext(nt),
    r = Mh();
  return y.useCallback(
    async (n, l = {}) => {
      let { action: o, method: a, encType: c, formData: i, body: u } = qh(n, t);
      if (l.navigate === !1) {
        let p = l.fetcherKey || mg();
        await e.fetch(p, r, l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: i,
          body: u,
          formMethod: l.method || a,
          formEncType: l.encType || c,
          flushSync: l.flushSync,
        });
      } else
        await e.navigate(l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: i,
          body: u,
          formMethod: l.method || a,
          formEncType: l.encType || c,
          replace: l.replace,
          state: l.state,
          fromRouteId: r,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [e, t, r],
  );
}
function hg(e, { relative: t } = {}) {
  let { basename: r } = y.useContext(nt),
    n = y.useContext(xt);
  J(n, "useFormAction must be used inside a RouteContext");
  let [l] = n.matches.slice(-1),
    o = { ...In(e || ".", { relative: t }) },
    a = yt();
  if (e == null) {
    o.search = a.search;
    let c = new URLSearchParams(o.search),
      i = c.getAll("index");
    if (i.some((p) => p === "")) {
      (c.delete("index"),
        i.filter((f) => f).forEach((f) => c.append("index", f)));
      let p = c.toString();
      o.search = p ? `?${p}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (o.pathname = o.pathname === "/" ? r : ut([r, o.pathname])),
    En(o)
  );
}
function gg(e, { relative: t } = {}) {
  let r = y.useContext(Hd);
  J(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: n } = Jd("useViewTransitionState"),
    l = In(e, { relative: t });
  if (!r.isTransitioning) return !1;
  let o = ht(r.currentLocation.pathname, n) || r.currentLocation.pathname,
    a = ht(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Hl(l.pathname, a) != null || Hl(l.pathname, o) != null;
}
const ef = y.createContext(void 0),
  xg = (e, t) => {
    switch (t.type) {
      case "ADD_TO_CART": {
        const n = e.items.find((o) => o.id === t.payload.id)
            ? e.items.map((o) =>
                o.id === t.payload.id ? { ...o, quantity: o.quantity + 1 } : o,
              )
            : [...e.items, { ...t.payload, quantity: 1 }],
          l = n.reduce((o, a) => o + a.price * a.quantity, 0);
        return { ...e, items: n, total: l };
      }
      case "REMOVE_FROM_CART": {
        const r = e.items.filter((l) => l.id !== t.payload),
          n = r.reduce((l, o) => l + o.price * o.quantity, 0);
        return { ...e, items: r, total: n };
      }
      case "UPDATE_QUANTITY": {
        const r = e.items
            .map((l) =>
              l.id === t.payload.id
                ? { ...l, quantity: t.payload.quantity }
                : l,
            )
            .filter((l) => l.quantity > 0),
          n = r.reduce((l, o) => l + o.price * o.quantity, 0);
        return { ...e, items: r, total: n };
      }
      case "CLEAR_CART":
        return { ...e, items: [], total: 0 };
      case "TOGGLE_CART":
        return { ...e, isOpen: !e.isOpen };
      case "SET_PAYMENT_LOADING":
        return { ...e, paymentLoading: t.payload };
      case "SET_PAYMENT_ERROR":
        return { ...e, paymentError: t.payload };
      case "SET_CURRENT_ORDER":
        return { ...e, currentOrder: t.payload };
      default:
        return e;
    }
  },
  yg = {
    items: [],
    isOpen: !1,
    total: 0,
    paymentLoading: !1,
    paymentError: null,
    currentOrder: null,
  },
  vg = ({ children: e }) => {
    const [t, r] = y.useReducer(xg, yg),
      n = (f) => {
        r({ type: "ADD_TO_CART", payload: f });
      },
      l = (f) => {
        r({ type: "REMOVE_FROM_CART", payload: f });
      },
      o = (f, g) => {
        r({ type: "UPDATE_QUANTITY", payload: { id: f, quantity: g } });
      },
      a = () => {
        r({ type: "CLEAR_CART" });
      },
      c = () => {
        r({ type: "TOGGLE_CART" });
      },
      i = async (f) => {
        try {
          (r({ type: "SET_PAYMENT_LOADING", payload: !0 }),
            r({ type: "SET_PAYMENT_ERROR", payload: null }));
          const v = await fetch(
            "http://localhost:3001/api/payment/create-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: t.total,
                currency: "INR",
                receipt: `order_${Date.now()}`,
                customer_details: f,
              }),
            },
          );
          if (!v.ok) throw new Error("Failed to create order");
          const x = await v.json();
          if (!x.success) throw new Error(x.error || "Failed to create order");
          const w = {
            order_id: x.data.order_id,
            amount: x.data.amount,
            currency: x.data.currency,
            receipt: x.data.receipt,
          };
          return (
            r({ type: "SET_CURRENT_ORDER", payload: w }),
            r({ type: "SET_PAYMENT_LOADING", payload: !1 }),
            w
          );
        } catch (g) {
          const v = g instanceof Error ? g.message : "Failed to create order";
          throw (
            r({ type: "SET_PAYMENT_ERROR", payload: v }),
            r({ type: "SET_PAYMENT_LOADING", payload: !1 }),
            g
          );
        }
      },
      u = async (f, g) => {
        try {
          (r({ type: "SET_PAYMENT_LOADING", payload: !0 }),
            r({ type: "SET_PAYMENT_ERROR", payload: null }));
          const v = "http://localhost:3001/api";
          console.log("Sending payment verification request with order_id:", g);
          const x = await fetch(`${v}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: f.razorpay_order_id,
              razorpay_payment_id: f.razorpay_payment_id,
              razorpay_signature: f.razorpay_signature,
              order_id: g,
            }),
          });
          if (!x.ok) throw new Error("Payment verification failed");
          const w = await x.json();
          if (!w.success)
            throw new Error(w.error || "Payment verification failed");
          return (
            r({ type: "SET_PAYMENT_LOADING", payload: !1 }),
            {
              payment_id: w.data.payment_id,
              order_id: w.data.order_id,
              amount: w.data.amount,
              currency: w.data.currency,
              status: w.data.status,
              method: w.data.method,
            }
          );
        } catch (v) {
          const x =
            v instanceof Error ? v.message : "Payment verification failed";
          throw (
            r({ type: "SET_PAYMENT_ERROR", payload: x }),
            r({ type: "SET_PAYMENT_LOADING", payload: !1 }),
            v
          );
        }
      },
      p = () => {
        r({ type: "SET_PAYMENT_ERROR", payload: null });
      };
    return s.jsx(ef.Provider, {
      value: {
        state: t,
        addToCart: n,
        removeFromCart: l,
        updateQuantity: o,
        clearCart: a,
        toggleCart: c,
        createRazorpayOrder: i,
        processPayment: u,
        clearPaymentError: p,
      },
      children: e,
    });
  },
  ds = () => {
    const e = y.useContext(ef);
    if (e === void 0)
      throw new Error("useCart must be used within a CartProvider");
    return e;
  },
  tf = y.createContext(void 0),
  wg = "http://localhost:3001/api",
  lr = async (e, t = {}) => {
    const r = await fetch(`${wg}${e}`, {
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": "Qw33Qw33",
        ...t.headers,
      },
      ...t,
    });
    if (!r.ok) {
      const n = await r.json();
      throw new Error(n.error || "API request failed");
    }
    return r.json();
  },
  bg = "admin123",
  jg = ({ children: e }) => {
    const [t, r] = y.useState(!1),
      [n, l] = y.useState(null),
      [o, a] = y.useState(!1),
      [c, i] = y.useState([]),
      [u, p] = y.useState([]),
      [f, g] = y.useState(!1),
      [v, x] = y.useState(null),
      w = async (P) => {
        try {
          (a(!0),
            l(null),
            await new Promise((M) => setTimeout(M, 1e3)),
            P === bg
              ? (r(!0), localStorage.setItem("admin_authenticated", "true"))
              : l("Incorrect password. Please try again."));
        } catch {
          l("Login failed. Please try again.");
        } finally {
          a(!1);
        }
      },
      N = () => {
        (r(!1), l(null), localStorage.removeItem("admin_authenticated"));
      };
    y.useEffect(() => {
      const P = localStorage.getItem("admin_authenticated") === "true";
      r(P);
    }, []);
    const h = y.useCallback(async () => {
        try {
          (g(!0), x(null));
          const P = await lr("/products");
          i(P.data.data || []);
        } catch (P) {
          (x(P instanceof Error ? P.message : "Failed to fetch products"),
            console.error("Error fetching products:", P));
        } finally {
          g(!1);
        }
      }, []),
      m = async (P) => {
        try {
          (g(!0), x(null));
          const M = await lr("/products", {
            method: "POST",
            body: JSON.stringify(P),
          });
          i((S) => [...S, M.data]);
        } catch (M) {
          throw (
            x(M instanceof Error ? M.message : "Failed to add product"),
            console.error("Error adding product:", M),
            M
          );
        } finally {
          g(!1);
        }
      },
      d = async (P, M) => {
        try {
          (g(!0), x(null));
          const S = await lr(`/products/${P}`, {
            method: "PUT",
            body: JSON.stringify(M),
          });
          i((z) => z.map((ne) => (ne.id === P ? S.data : ne)));
        } catch (S) {
          throw (
            x(S instanceof Error ? S.message : "Failed to update product"),
            console.error("Error updating product:", S),
            S
          );
        } finally {
          g(!1);
        }
      },
      b = async (P) => {
        try {
          (g(!0),
            x(null),
            await lr(`/products/${P}`, { method: "DELETE" }),
            i((M) => M.filter((S) => S.id !== P)));
        } catch (M) {
          throw (
            x(M instanceof Error ? M.message : "Failed to delete product"),
            console.error("Error deleting product:", M),
            M
          );
        } finally {
          g(!1);
        }
      },
      C = y.useCallback(async () => {
        try {
          (g(!0), x(null));
          const P = await lr("/orders");
          p(P.data.data || []);
        } catch (P) {
          (x(P instanceof Error ? P.message : "Failed to fetch orders"),
            console.error("Error fetching orders:", P));
        } finally {
          g(!1);
        }
      }, []),
      R = y.useCallback(async (P, M) => {
        try {
          (g(!0), x(null));
          const S = await lr(`/orders/${P}`, {
            method: "PUT",
            body: JSON.stringify(M),
          });
          p((z) => z.map((ne) => (ne.id === P ? S.data : ne)));
        } catch (S) {
          throw (
            x(S instanceof Error ? S.message : "Failed to update order"),
            console.error("Error updating order:", S),
            S
          );
        } finally {
          g(!1);
        }
      }, []);
    y.useEffect(() => {
      (h(), C());
    }, [h, C]);
    const E = (P) => {
        const M = {
          ...P,
          id: Date.now().toString(),
          order_number: `SS${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        p((S) => [...S, M]);
      },
      k = (P, M) => {
        p((S) => S.map((z) => (z.id === P ? { ...z, order_status: M } : z)));
      };
    return s.jsx(tf.Provider, {
      value: {
        isAuthenticated: t,
        authError: n,
        isAuthLoading: o,
        login: w,
        logout: N,
        products: c,
        orders: u,
        loading: f,
        error: v,
        addProduct: m,
        updateProduct: d,
        deleteProduct: b,
        fetchProducts: h,
        fetchOrders: C,
        updateOrder: R,
        addOrder: E,
        updateOrderStatus: k,
      },
      children: e,
    });
  },
  Ya = () => {
    const e = y.useContext(tf);
    if (e === void 0)
      throw new Error("useAdmin must be used within an AdminProvider");
    return e;
  },
  rf = y.createContext(void 0),
  Ng = "http://localhost:3001/api",
  Hs = async (e, t = {}) => {
    const r = await fetch(`${Ng}${e}`, {
      headers: { "Content-Type": "application/json", ...t.headers },
      ...t,
    });
    if (!r.ok) {
      const n = await r.json();
      throw new Error(n.error || "API request failed");
    }
    return r.json();
  },
  kg = ({ children: e }) => {
    const [t, r] = y.useState([]),
      [n, l] = y.useState(!1),
      [o, a] = y.useState(null),
      c = async () => {
        try {
          (l(!0), a(null));
          const f = await Hs("/products?limit=50");
          r(f.data.data || []);
        } catch (f) {
          (a(f instanceof Error ? f.message : "Failed to fetch products"),
            console.error("Error fetching products:", f));
        } finally {
          l(!1);
        }
      },
      i = (f) => t.find((g) => g.id === f) || null,
      u = async (f) => {
        try {
          return (
            (await Hs(`/products/search?q=${encodeURIComponent(f)}`)).data || []
          );
        } catch (g) {
          return (console.error("Error searching products:", g), []);
        }
      },
      p = async (f) => {
        try {
          return (
            (await Hs(`/products/category/${encodeURIComponent(f)}`)).data || []
          );
        } catch (g) {
          return (console.error("Error fetching products by category:", g), []);
        }
      };
    return (
      y.useEffect(() => {
        c();
      }, []),
      s.jsx(rf.Provider, {
        value: {
          products: t,
          loading: n,
          error: o,
          fetchProducts: c,
          getProductById: i,
          searchProducts: u,
          getProductsByCategory: p,
        },
        children: e,
      })
    );
  },
  Sg = () => {
    const e = y.useContext(rf);
    if (e === void 0)
      throw new Error("useProducts must be used within a ProductProvider");
    return e;
  };
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Cg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  _g = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, r, n) =>
      n ? n.toUpperCase() : r.toLowerCase(),
    ),
  pc = (e) => {
    const t = _g(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  nf = (...e) =>
    e
      .filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r)
      .join(" ")
      .trim(),
  Eg = (e) => {
    for (const t in e)
      if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
  };
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Pg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rg = y.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: n,
      className: l = "",
      children: o,
      iconNode: a,
      ...c
    },
    i,
  ) =>
    y.createElement(
      "svg",
      {
        ref: i,
        ...Pg,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: n ? (Number(r) * 24) / Number(t) : r,
        className: nf("lucide", l),
        ...(!o && !Eg(c) && { "aria-hidden": "true" }),
        ...c,
      },
      [
        ...a.map(([u, p]) => y.createElement(u, p)),
        ...(Array.isArray(o) ? o : [o]),
      ],
    ),
);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const U = (e, t) => {
  const r = y.forwardRef(({ className: n, ...l }, o) =>
    y.createElement(Rg, {
      ref: o,
      iconNode: t,
      className: nf(`lucide-${Cg(pc(e))}`, `lucide-${e}`, n),
      ...l,
    }),
  );
  return ((r.displayName = pc(e)), r);
};
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Lg = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  zg = U("arrow-right", Lg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mg = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
  ],
  hc = U("award", Mg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tg = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
    ],
    ["path", { d: "M3 10h18", key: "8toen8" }],
  ],
  lf = U("calendar", Tg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ag = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  Qr = U("chevron-down", Ag);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ig = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  Gr = U("chevron-up", Ig);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Og = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Dg = U("circle-check-big", Og);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $g = [
    [
      "rect",
      { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
    ],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
  ],
  fs = U("credit-card", $g);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Fg = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  Ug = U("eye-off", Fg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bg = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  sf = U("eye", Bg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wg = [
    [
      "path",
      {
        d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        key: "1jg4f8",
      },
    ],
  ],
  of = U("facebook", Wg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hg = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
        key: "mvr1a0",
      },
    ],
  ],
  Vg = U("heart", Hg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qg = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ],
  Qg = U("house", qg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gg = [
    [
      "rect",
      {
        width: "20",
        height: "20",
        x: "2",
        y: "2",
        rx: "5",
        ry: "5",
        key: "2e1cvw",
      },
    ],
    [
      "path",
      { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" },
    ],
    ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }],
  ],
  af = U("instagram", Gg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yg = [
    [
      "path",
      {
        d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
        key: "nnexq3",
      },
    ],
    [
      "path",
      { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" },
    ],
  ],
  ms = U("leaf", Yg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kg = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  Xg = U("loader-circle", Kg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zg = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ],
  Jg = U("lock", Zg);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const e0 = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  t0 = U("log-out", e0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r0 = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  Ka = U("mail", r0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const n0 = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  cf = U("map-pin", n0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const l0 = [
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 18h16", key: "19g7jn" }],
    ["path", { d: "M4 6h16", key: "1o0s65" }],
  ],
  s0 = U("menu", l0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const o0 = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s",
      },
    ],
  ],
  Vl = U("message-circle", o0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const a0 = [["path", { d: "M5 12h14", key: "1ays0h" }]],
  i0 = U("minus", a0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c0 = [
    [
      "path",
      {
        d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
        key: "1a0edw",
      },
    ],
    ["path", { d: "M12 22V12", key: "d0xqtd" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
    ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ],
  ql = U("package", c0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const u0 = [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ],
  Xa = U("phone", u0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const d0 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ],
  Ho = U("plus", d0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const f0 = [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc",
      },
    ],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3",
      },
    ],
    ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ],
  m0 = U("refresh-cw", f0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const p0 = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476",
      },
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
  ],
  h0 = U("save", p0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const g0 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  x0 = U("search", g0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const y0 = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  v0 = U("settings", y0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const w0 = [
    ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
    ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
    [
      "path",
      {
        d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
        key: "o988cm",
      },
    ],
  ],
  Vo = U("shopping-bag", w0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b0 = [
    ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
    ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
    [
      "path",
      {
        d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
        key: "9zh506",
      },
    ],
  ],
  j0 = U("shopping-cart", b0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const N0 = [
    [
      "path",
      {
        d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        key: "1m0v6g",
      },
    ],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        key: "ohrbg2",
      },
    ],
  ],
  k0 = U("square-pen", N0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const S0 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  C0 = U("trash-2", S0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _0 = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  uf = U("user", _0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const E0 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ],
  P0 = U("users", E0);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R0 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  ps = U("x", R0),
  gc = "rzp_test_RIfIBUXi654lRw";
class Vs {
  static async openCheckout(t) {
    return new Promise((r, n) => {
      if (!window.Razorpay) {
        n(new Error("Razorpay SDK not loaded"));
        return;
      }
      const l = {
        ...t,
        key: gc,
        handler: (a) => {
          r(a);
        },
        modal: {
          ondismiss: () => {
            n(new Error("Payment cancelled by user"));
          },
        },
      };
      new window.Razorpay(l).open();
    });
  }
  static createCheckoutOptions(
    t,
    r,
    n,
    l,
    o,
    a,
    c = "SukhSanchaar Ayurvedic Products",
  ) {
    return {
      key: gc,
      amount: r,
      currency: n,
      name: "SukhSanchaar",
      description: c,
      order_id: t,
      prefill: { name: l, email: o, contact: a },
      notes: { source: "sukhsanchaar_web", order_id: t },
      theme: { color: "#8B4513" },
      handler: () => {},
    };
  }
  static isAvailable() {
    return typeof window < "u" && !!window.Razorpay;
  }
}
const L0 = ({ onClose: e }) => {
    const {
        state: t,
        clearCart: r,
        toggleCart: n,
        processPayment: l,
        clearPaymentError: o,
      } = ds(),
      { addOrder: a } = Ya(),
      c = Ha(),
      [i, u] = y.useState({
        customerName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
      }),
      f = ((N) => {
        switch (N) {
          case "Delhi":
            return 50;
          case "Rajasthan":
            return 100;
          default:
            return 0;
        }
      })(i.state),
      g = t.total,
      v = g + f,
      x = (N) => {
        u((h) => ({ ...h, [N.target.name]: N.target.value }));
      },
      w = async () => {
        if (
          !i.customerName ||
          !i.email ||
          !i.phone ||
          !i.addressLine1 ||
          !i.city ||
          !i.state
        ) {
          alert("Please fill in all required fields");
          return;
        }
        if (!Vs.isAvailable()) {
          alert("Payment service is not available. Please try again later.");
          return;
        }
        try {
          o();
          const N = {
              customer_name: i.customerName,
              customer_email: i.email,
              customer_phone: i.phone,
              shipping_address: {
                street:
                  i.addressLine1 +
                  (i.addressLine2 ? `, ${i.addressLine2}` : ""),
                city: i.city,
                state: i.state,
                pincode: "",
                country: i.country,
              },
              items: t.items.map((oe) => ({
                product_id: oe.id,
                quantity: oe.quantity,
              })),
              notes: `Order for ${t.items.length} item(s) - SukhSanchaar`,
            },
            m = await fetch("http://localhost:3001/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(N),
            });
          if (!m.ok) throw new Error("Failed to create order");
          const d = await m.json();
          if (!d.success) throw new Error(d.error || "Failed to create order");
          const b = d.data;
          console.log("Order created in database:", b);
          const R = await fetch(
            "http://localhost:3001/api/payment/create-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: v,
                currency: "INR",
                receipt: `order_${Date.now()}`,
                customer_details: {
                  name: i.customerName,
                  email: i.email,
                  phone: i.phone,
                  address:
                    i.addressLine1 +
                    (i.addressLine2 ? `, ${i.addressLine2}` : ""),
                },
              }),
            },
          );
          if (!R.ok) throw new Error("Failed to create Razorpay order");
          const E = await R.json();
          if (!E.success)
            throw new Error(E.error || "Failed to create Razorpay order");
          const k = {
              order_id: E.data.order_id,
              amount: E.data.amount,
              currency: E.data.currency,
              receipt: E.data.receipt,
            },
            P = `${i.addressLine1}${i.addressLine2 ? ", " + i.addressLine2 : ""}, ${i.city}, ${i.state}, ${i.country}`,
            S = `SukhSanchaar Order - ${t.items.map((oe) => `${oe.name} x${oe.quantity}`).join(", ")} | Address: ${P} | Total: ₹${v}`,
            z = Vs.createCheckoutOptions(
              k.order_id,
              v * 100,
              k.currency,
              i.customerName,
              i.email,
              i.phone,
              S,
            ),
            ne = await Vs.openCheckout(z);
          if (
            (console.log(
              "Processing payment verification with order_id:",
              b.id,
            ),
            (await l(ne, b.id)).status === "captured")
          ) {
            const oe = {
              customer_name: i.customerName,
              customer_email: i.email,
              customer_phone: i.phone,
              shipping_address: {
                street:
                  i.addressLine1 +
                  (i.addressLine2 ? `, ${i.addressLine2}` : ""),
                city: i.city,
                state: i.state,
                pincode: "",
                country: i.country,
              },
              items: t.items.map((W) => ({
                product_id: W.id,
                product_name: W.name,
                product_image: W.image || "",
                quantity: W.quantity,
                unit_price: W.price,
                total_price: W.price * W.quantity,
              })),
              subtotal: t.total,
              tax_amount: 0,
              shipping_amount: f,
              total_amount: v,
              payment_status: "paid",
              order_status: "confirmed",
              payment_method: "razorpay",
              notes: `Order for ${t.items.length} item(s) - SukhSanchaar`,
            };
            (a(oe), r(), n(), e(), c("/payment-success"));
          } else throw new Error("Payment not captured");
        } catch (N) {
          (console.error("Payment error:", N),
            N instanceof Error &&
              N.message !== "Payment cancelled by user" &&
              alert(`Payment failed: ${N.message}`));
        }
      };
    return s.jsx("div", {
      className:
        "fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4",
      children: s.jsxs("div", {
        className:
          "bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col",
        children: [
          s.jsxs("div", {
            className:
              "flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0",
            children: [
              s.jsxs("h2", {
                className:
                  "font-playfair text-2xl font-bold text-antique-brown flex items-center gap-2",
                children: [s.jsx(fs, { className: "w-6 h-6" }), "Checkout"],
              }),
              s.jsx("button", {
                onClick: e,
                className:
                  "p-2 hover:bg-gray-100 rounded-full transition-colors",
                children: s.jsx(ps, { className: "w-5 h-5 text-gray-600" }),
              }),
            ],
          }),
          s.jsxs("div", {
            className: "flex-1 overflow-y-auto p-6 space-y-4",
            children: [
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Full Name *",
                  }),
                  s.jsx("input", {
                    type: "text",
                    name: "customerName",
                    value: i.customerName,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Enter your full name",
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Email *",
                  }),
                  s.jsx("input", {
                    type: "email",
                    name: "email",
                    value: i.email,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Enter your email",
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Phone Number *",
                  }),
                  s.jsx("input", {
                    type: "tel",
                    name: "phone",
                    value: i.phone,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Enter your phone number",
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Address Line 1 *",
                  }),
                  s.jsx("input", {
                    type: "text",
                    name: "addressLine1",
                    value: i.addressLine1,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Street address, building, apartment",
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Address Line 2",
                  }),
                  s.jsx("input", {
                    type: "text",
                    name: "addressLine2",
                    value: i.addressLine2,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Apartment, suite, unit, etc. (optional)",
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsx("label", {
                        className:
                          "block font-noto font-semibold text-antique-brown mb-2",
                        children: "City *",
                      }),
                      s.jsx("input", {
                        type: "text",
                        name: "city",
                        value: i.city,
                        onChange: x,
                        className:
                          "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                        placeholder: "Enter your city",
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("label", {
                        className:
                          "block font-noto font-semibold text-antique-brown mb-2",
                        children: "State *",
                      }),
                      s.jsxs("select", {
                        name: "state",
                        value: i.state,
                        onChange: x,
                        className:
                          "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                        children: [
                          s.jsx("option", {
                            value: "",
                            children: "Select State",
                          }),
                          s.jsx("option", {
                            value: "Delhi",
                            children: "Delhi (₹50 shipping)",
                          }),
                          s.jsx("option", {
                            value: "Rajasthan",
                            children: "Rajasthan (₹100 shipping)",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("label", {
                    className:
                      "block font-noto font-semibold text-antique-brown mb-2",
                    children: "Country",
                  }),
                  s.jsx("input", {
                    type: "text",
                    name: "country",
                    value: i.country,
                    onChange: x,
                    className:
                      "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                    placeholder: "Country",
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "bg-cream-50 p-4 rounded-lg border border-cream-200",
                children: [
                  s.jsx("h3", {
                    className:
                      "font-lora font-semibold text-antique-brown mb-2",
                    children: "Order Summary",
                  }),
                  s.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      t.items.map((N) =>
                        s.jsxs(
                          "div",
                          {
                            className: "flex justify-between font-noto text-sm",
                            children: [
                              s.jsxs("span", {
                                children: [N.name, " x ", N.quantity],
                              }),
                              s.jsxs("span", {
                                children: ["₹", N.price * N.quantity],
                              }),
                            ],
                          },
                          N.id,
                        ),
                      ),
                      s.jsx("div", {
                        className: "border-t border-black pt-2 mt-2",
                        children: s.jsxs("div", {
                          className: "flex justify-between font-noto text-sm",
                          children: [
                            s.jsx("span", { children: "Subtotal" }),
                            s.jsxs("span", { children: ["₹", g] }),
                          ],
                        }),
                      }),
                      f > 0 &&
                        s.jsxs("div", {
                          className: "flex justify-between font-noto text-sm",
                          children: [
                            s.jsxs("span", {
                              children: ["Shipping (", i.state, ")"],
                            }),
                            s.jsxs("span", { children: ["₹", f] }),
                          ],
                        }),
                      s.jsxs("div", {
                        className:
                          "border-t border-cream-300 pt-2 flex justify-between font-semibold",
                        children: [
                          s.jsx("span", { children: "Total" }),
                          s.jsxs("span", {
                            className: "text-ayur-red",
                            children: ["₹", v],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsx("p", {
                className: "text-xs text-gray-500 text-center font-noto",
                children:
                  "Your payment is secured by Razorpay. Shipping details will be sent via WhatsApp.",
              }),
            ],
          }),
          s.jsxs("div", {
            className:
              "flex-shrink-0 p-6 border-t border-gray-200 bg-white rounded-b-xl",
            children: [
              t.paymentError &&
                s.jsxs("div", {
                  className:
                    "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4",
                  children: [
                    s.jsx("p", {
                      className: "font-semibold",
                      children: "Payment Error",
                    }),
                    s.jsx("p", { children: t.paymentError }),
                    s.jsx("button", {
                      onClick: o,
                      className:
                        "mt-2 text-red-600 hover:text-red-800 underline text-xs",
                      children: "Dismiss",
                    }),
                  ],
                }),
              s.jsx("button", {
                onClick: w,
                disabled: t.paymentLoading,
                className:
                  "w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed",
                children: t.paymentLoading
                  ? "Processing..."
                  : `Pay ₹${v} with Razorpay`,
              }),
            ],
          }),
        ],
      }),
    });
  },
  z0 = () => {
    const {
        state: e,
        toggleCart: t,
        removeFromCart: r,
        updateQuantity: n,
      } = ds(),
      [l, o] = Gs.useState(!1);
    return e.isOpen
      ? s.jsxs(s.Fragment, {
          children: [
            s.jsx("div", {
              className: "fixed inset-0 bg-black/50 z-50 backdrop-blur-sm",
              onClick: t,
            }),
            s.jsx("div", {
              className:
                "fixed right-0 top-0 h-full w-full max-w-md bg-cream-50 shadow-2xl z-50 transform transition-transform animate-slide-up",
              children: s.jsxs("div", {
                className: "flex flex-col h-full",
                children: [
                  s.jsxs("div", {
                    className:
                      "flex items-center justify-between p-6 border-b border-cream-200",
                    children: [
                      s.jsxs("h2", {
                        className:
                          "font-playfair text-2xl font-bold text-antique-brown flex items-center gap-2",
                        children: [
                          s.jsx(Vo, { className: "w-6 h-6" }),
                          "Your Cart",
                        ],
                      }),
                      s.jsx("button", {
                        onClick: t,
                        className:
                          "p-2 hover:bg-cream-200 rounded-full transition-colors",
                        children: s.jsx(ps, {
                          className: "w-5 h-5 text-antique-brown",
                        }),
                      }),
                    ],
                  }),
                  s.jsx("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children:
                      e.items.length === 0
                        ? s.jsxs("div", {
                            className: "text-center py-12",
                            children: [
                              s.jsx(Vo, {
                                className:
                                  "w-16 h-16 text-cream-200 mx-auto mb-4",
                              }),
                              s.jsx("p", {
                                className:
                                  "font-lora text-antique-brown/70 text-lg",
                                children: "Your cart is empty",
                              }),
                              s.jsx("p", {
                                className:
                                  "font-noto text-antique-brown/50 text-sm mt-2",
                                children: "Add some Ayurvedic goodness!",
                              }),
                            ],
                          })
                        : s.jsx("div", {
                            className: "space-y-4",
                            children: e.items.map((a) =>
                              s.jsxs(
                                "div",
                                {
                                  className:
                                    "flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-cream-200",
                                  children: [
                                    s.jsx("img", {
                                      src: a.image,
                                      alt: a.name,
                                      className:
                                        "w-16 h-16 object-cover rounded-md",
                                    }),
                                    s.jsxs("div", {
                                      className: "flex-1",
                                      children: [
                                        s.jsx("h3", {
                                          className:
                                            "font-lora font-semibold text-antique-brown",
                                          children: a.name,
                                        }),
                                        s.jsxs("div", {
                                          className:
                                            "flex items-center gap-2 mt-1",
                                          children: [
                                            s.jsxs("span", {
                                              className:
                                                "font-noto font-bold text-ayur-red",
                                              children: ["₹", a.price],
                                            }),
                                            s.jsxs("span", {
                                              className:
                                                "font-noto text-sm text-gray-500 line-through",
                                              children: ["₹", a.mrp],
                                            }),
                                          ],
                                        }),
                                        s.jsxs("div", {
                                          className:
                                            "flex items-center justify-between mt-2",
                                          children: [
                                            s.jsxs("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                s.jsx("button", {
                                                  onClick: () =>
                                                    n(a.id, a.quantity - 1),
                                                  className:
                                                    "p-1 bg-cream-200 hover:bg-cream-300 rounded-full transition-colors",
                                                  children: s.jsx(i0, {
                                                    className:
                                                      "w-3 h-3 text-antique-brown",
                                                  }),
                                                }),
                                                s.jsx("span", {
                                                  className:
                                                    "font-noto font-semibold text-antique-brown px-2",
                                                  children: a.quantity,
                                                }),
                                                s.jsx("button", {
                                                  onClick: () =>
                                                    n(a.id, a.quantity + 1),
                                                  className:
                                                    "p-1 bg-cream-200 hover:bg-cream-300 rounded-full transition-colors",
                                                  children: s.jsx(Ho, {
                                                    className:
                                                      "w-3 h-3 text-antique-brown",
                                                  }),
                                                }),
                                              ],
                                            }),
                                            s.jsx("button", {
                                              onClick: () => r(a.id),
                                              className:
                                                "text-ayur-red hover:text-ayur-red/80 font-noto text-sm transition-colors",
                                              children: "Remove",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                a.id,
                              ),
                            ),
                          }),
                  }),
                  e.items.length > 0 &&
                    s.jsxs("div", {
                      className: "border-t border-cream-200 p-6 bg-white",
                      children: [
                        s.jsxs("div", {
                          className: "flex justify-between items-center mb-4",
                          children: [
                            s.jsx("span", {
                              className:
                                "font-lora text-lg font-semibold text-antique-brown",
                              children: "Total:",
                            }),
                            s.jsxs("span", {
                              className:
                                "font-playfair text-2xl font-bold text-ayur-red",
                              children: ["₹", e.total],
                            }),
                          ],
                        }),
                        s.jsx("button", {
                          onClick: () => o(!0),
                          className:
                            "w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                          children: "Proceed to Checkout",
                        }),
                      ],
                    }),
                ],
              }),
            }),
            l && s.jsx(L0, { onClose: () => o(!1) }),
          ],
        })
      : null;
  },
  M0 = () => {
    const e = yt(),
      { state: t, toggleCart: r } = ds();
    return e.pathname === "/admin"
      ? null
      : s.jsxs(s.Fragment, {
          children: [
            s.jsx("nav", {
              className:
                "bg-gradient-to-r from-aged-paper/95 via-vintage-beige/95 to-cream-100/95 backdrop-blur-sm border-b border-heritage-gold/20 sticky top-0 z-40 shadow-lg",
              children: s.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                  s.jsxs("div", {
                    className: "flex justify-between items-center py-4",
                    children: [
                      s.jsxs(Ct, {
                        to: "/",
                        className: "flex items-center space-x-3 group",
                        children: [
                          s.jsx("div", {
                            className:
                              "p-2 bg-gradient-to-br from-ayur-red via-ayur-red-dark to-heritage-gold/80 rounded-full group-hover:scale-105 transition-transform shadow-lg border border-heritage-gold/30",
                            children: s.jsx(ms, {
                              className: "w-6 h-6 text-white",
                            }),
                          }),
                          s.jsxs("div", {
                            children: [
                              s.jsx("span", {
                                className:
                                  "font-playfair text-3xl font-bold text-transparent bg-gradient-to-r from-antique-brown-dark to-botanical-green-dark bg-clip-text",
                                children: "Sanchaaar",
                              }),
                              s.jsx("p", {
                                className:
                                  "font-noto text-xs text-heritage-gold -mt-1",
                                children: "Since 1890",
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "hidden md:flex items-center space-x-8",
                        children: [
                          s.jsx(Ct, {
                            to: "/",
                            className: `font-lora text-lg text-antique-brown-dark hover:text-heritage-gold transition-colors ${e.pathname === "/" ? "text-heritage-gold font-semibold" : ""}`,
                            children: "Home",
                          }),
                          s.jsx(Ct, {
                            to: "/about",
                            className: `font-lora text-lg text-antique-brown-dark hover:text-heritage-gold transition-colors ${e.pathname === "/about" ? "text-heritage-gold font-semibold" : ""}`,
                            children: "About Us",
                          }),
                        ],
                      }),
                      s.jsxs("button", {
                        onClick: r,
                        className:
                          "relative p-3 bg-gradient-to-br from-ayur-red to-ayur-red-dark text-white rounded-full hover:from-ayur-red-dark hover:to-heritage-gold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group border border-heritage-gold/30",
                        children: [
                          s.jsx(j0, {
                            className:
                              "w-6 h-6 group-hover:scale-105 transition-transform",
                          }),
                          t.items.length > 0 &&
                            s.jsx("span", {
                              className:
                                "absolute -top-2 -right-2 bg-gradient-to-br from-heritage-gold to-ayur-gold text-antique-brown-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce-gentle border-2 border-white shadow-lg",
                              children: t.items.reduce(
                                (n, l) => n + l.quantity,
                                0,
                              ),
                            }),
                        ],
                      }),
                    ],
                  }),
                  s.jsx("div", {
                    className: "md:hidden pb-4",
                    children: s.jsxs("div", {
                      className: "flex space-x-6",
                      children: [
                        s.jsx(Ct, {
                          to: "/",
                          className: `font-lora text-antique-brown-dark hover:text-heritage-gold transition-colors ${e.pathname === "/" ? "text-heritage-gold font-semibold" : ""}`,
                          children: "Home",
                        }),
                        s.jsx(Ct, {
                          to: "/about",
                          className: `font-lora text-antique-brown-dark hover:text-heritage-gold transition-colors ${e.pathname === "/about" ? "text-heritage-gold font-semibold" : ""}`,
                          children: "About Us",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            s.jsx(z0, {}),
            t.items.length > 0 &&
              !t.isOpen &&
              s.jsxs("button", {
                onClick: r,
                className:
                  "fixed bottom-6 right-6 z-50 bg-gradient-to-r from-ayur-red to-ayur-red-dark text-white px-6 py-4 rounded-full font-noto font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 border-2 border-heritage-gold/30 animate-pulse-gentle group",
                children: [
                  s.jsx(fs, {
                    className:
                      "w-6 h-6 group-hover:scale-110 transition-transform",
                  }),
                  s.jsx("span", { children: "Pay & Checkout" }),
                  s.jsx("div", {
                    className:
                      "bg-heritage-gold text-antique-brown-dark text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg",
                    children: t.items.reduce((n, l) => n + l.quantity, 0),
                  }),
                ],
              }),
          ],
        });
  },
  T0 = () =>
    yt().pathname === "/admin"
      ? null
      : s.jsx("footer", {
          className: "bg-black text-cream-50 py-12 ",
          children: s.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              s.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsxs("div", {
                        className: "flex items-center space-x-2 mb-4",
                        children: [
                          s.jsx("div", {
                            className: "p-2 bg-ayur-red rounded-full",
                            children: s.jsx(ms, {
                              className: "w-6 h-6 text-white",
                            }),
                          }),
                          s.jsx("span", {
                            className: "font-playfair text-2xl font-bold",
                            children: "Vedic Herbs",
                          }),
                        ],
                      }),
                      s.jsx("p", {
                        className:
                          "font-lora text-cream-100 mb-4 leading-relaxed",
                        children:
                          "Traditional Ayurvedic remedies crafted with pure herbs and ancient wisdom since 1890. Your journey to natural wellness begins here.",
                      }),
                      s.jsxs("div", {
                        className: "flex space-x-4",
                        children: [
                          s.jsx("a", {
                            href: "#",
                            className:
                              "p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors",
                            children: s.jsx(of, { className: "w-5 h-5" }),
                          }),
                          s.jsx("a", {
                            href: "#",
                            className:
                              "p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors",
                            children: s.jsx(af, { className: "w-5 h-5" }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("h3", {
                        className: "font-playfair text-xl font-bold mb-6",
                        children: "Contact Us",
                      }),
                      s.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          s.jsxs("div", {
                            className: "flex items-center space-x-3",
                            children: [
                              s.jsx(Xa, {
                                className:
                                  "w-5 h-5 text-ayur-gold flex-shrink-0",
                              }),
                              s.jsxs("div", {
                                children: [
                                  s.jsx("p", {
                                    className:
                                      "font-noto text-sm text-cream-200",
                                    children: "Call us",
                                  }),
                                  s.jsx("a", {
                                    href: "tel:+919876543210",
                                    className:
                                      "font-lora hover:text-ayur-gold transition-colors",
                                    children: "+91 98765 43210",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          s.jsxs("div", {
                            className: "flex items-center space-x-3",
                            children: [
                              s.jsx(Ka, {
                                className:
                                  "w-5 h-5 text-ayur-gold flex-shrink-0",
                              }),
                              s.jsxs("div", {
                                children: [
                                  s.jsx("p", {
                                    className:
                                      "font-noto text-sm text-cream-200",
                                    children: "Email us",
                                  }),
                                  s.jsx("a", {
                                    href: "mailto:info@vedicherbs.com",
                                    className:
                                      "font-lora hover:text-ayur-gold transition-colors",
                                    children: "info@vedicherbs.com",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          s.jsxs("div", {
                            className: "flex items-center space-x-3",
                            children: [
                              s.jsx(Vl, {
                                className:
                                  "w-5 h-5 text-ayur-gold flex-shrink-0",
                              }),
                              s.jsxs("div", {
                                children: [
                                  s.jsx("p", {
                                    className:
                                      "font-noto text-sm text-cream-200",
                                    children: "WhatsApp",
                                  }),
                                  s.jsx("a", {
                                    href: "https://wa.me/919876543210",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className:
                                      "font-lora hover:text-ayur-gold transition-colors",
                                    children: "Chat with us",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("h3", {
                        className: "font-playfair text-xl font-bold mb-6",
                        children: "Heritage & Quality",
                      }),
                      s.jsxs("div", {
                        className: "space-y-3 font-lora",
                        children: [
                          s.jsxs("p", {
                            className: "text-cream-100 leading-relaxed",
                            children: [
                              s.jsx("span", {
                                className: "text-ayur-gold font-semibold",
                                children: "Since 1890",
                              }),
                              " - Four generations of Ayurvedic expertise, bringing you authentic herbal remedies crafted with traditional methods.",
                            ],
                          }),
                          s.jsx("div", {
                            className:
                              "bg-ayur-red/10 p-4 rounded-lg border border-ayur-red/20",
                            children: s.jsx("p", {
                              className: "text-sm text-cream-200 italic",
                              children:
                                '"Pure herbs, ancient wisdom, modern wellness - your trusted companion on the path to natural health."',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsx("div", {
                className: "border-t border-cream-200/20 mt-8 pt-8",
                children: s.jsxs("div", {
                  className:
                    "flex flex-col md:flex-row justify-between items-center",
                  children: [
                    s.jsx("p", {
                      className: "font-noto text-cream-200 text-sm",
                      children:
                        "© 2024 Vedic Herbs. All rights reserved. Crafted with love and ancient wisdom.",
                    }),
                    s.jsxs("div", {
                      className:
                        "flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 font-noto text-sm",
                      children: [
                        s.jsx("a", {
                          href: "#",
                          className:
                            "text-cream-200 hover:text-ayur-gold transition-colors",
                          children: "Privacy Policy",
                        }),
                        s.jsx("a", {
                          href: "https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/terms",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "text-cream-200 hover:text-ayur-gold transition-colors",
                          children: "Terms of Service",
                        }),
                        s.jsx("a", {
                          href: "https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/shipping",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "text-cream-200 hover:text-ayur-gold transition-colors",
                          children: "Shipping Policy",
                        }),
                        s.jsx("a", {
                          href: "https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/refund",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "text-cream-200 hover:text-ayur-gold transition-colors",
                          children: "Refund Policy",
                        }),
                        s.jsx("a", {
                          href: "/admin",
                          className:
                            "text-cream-200 hover:text-ayur-gold transition-colors",
                          children: "Admin",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
  A0 = () => {
    const e = () => {
        var r;
        (r = document.getElementById("products")) == null ||
          r.scrollIntoView({ behavior: "smooth" });
      },
      t = () => {
        var r;
        (r = document.getElementById("about")) == null ||
          r.scrollIntoView({ behavior: "smooth" });
      };
    return s.jsxs("section", {
      className:
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-aged-paper via-vintage-beige to-cream-200 bg-parchment",
      children: [
        s.jsx("div", {
          className: "absolute top-0 left-0 w-80 h-80 opacity-8",
          children: s.jsx("svg", {
            viewBox: "0 0 200 200",
            className: "w-full h-full text-botanical-green",
            children: s.jsxs("g", {
              fill: "currentColor",
              opacity: "0.12",
              children: [
                s.jsx("path", {
                  d: "M50 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z",
                }),
                s.jsx("path", {
                  d: "M20 50c0-8 7-15 15-15 13 0 35 15 35 15s-22 15-35 15c-8 0-15-7-15-15zm20 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z",
                }),
                s.jsx("circle", {
                  cx: "150",
                  cy: "150",
                  r: "25",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                }),
                s.jsx("path", {
                  d: "M125 150h50M150 125v50",
                  stroke: "currentColor",
                  strokeWidth: "1",
                }),
                s.jsx("circle", {
                  cx: "30",
                  cy: "170",
                  r: "3",
                  fill: "#D4AF37",
                  opacity: "0.4",
                }),
                s.jsx("circle", {
                  cx: "170",
                  cy: "30",
                  r: "4",
                  fill: "#C9A66B",
                  opacity: "0.3",
                }),
              ],
            }),
          }),
        }),
        s.jsx("div", {
          className: "absolute top-0 right-0 w-80 h-80 opacity-8 rotate-180",
          children: s.jsx("svg", {
            viewBox: "0 0 200 200",
            className: "w-full h-full text-botanical-green",
            children: s.jsxs("g", {
              fill: "currentColor",
              opacity: "0.12",
              children: [
                s.jsx("path", {
                  d: "M50 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z",
                }),
                s.jsx("path", {
                  d: "M20 50c0-8 7-15 15-15 13 0 35 15 35 15s-22 15-35 15c-8 0-15-7-15-15zm20 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z",
                }),
                s.jsx("circle", {
                  cx: "150",
                  cy: "150",
                  r: "20",
                  fill: "none",
                  stroke: "#D4AF37",
                  strokeWidth: "1.5",
                  opacity: "0.3",
                }),
              ],
            }),
          }),
        }),
        s.jsx("div", {
          className: "absolute bottom-0 left-0 w-64 h-64 opacity-8",
          children: s.jsx("svg", {
            viewBox: "0 0 150 150",
            className: "w-full h-full text-botanical-green",
            children: s.jsxs("g", {
              opacity: "0.15",
              children: [
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "35",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                }),
                s.jsx("path", {
                  d: "M75 40v70M40 75h70",
                  stroke: "currentColor",
                  strokeWidth: "1",
                }),
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "15",
                  fill: "none",
                  stroke: "#D4AF37",
                  strokeWidth: "1",
                  opacity: "0.4",
                }),
                s.jsx("path", {
                  d: "M60 60l30 30M90 60l-30 30",
                  stroke: "#C9A66B",
                  strokeWidth: "0.5",
                  opacity: "0.3",
                }),
              ],
            }),
          }),
        }),
        s.jsx("div", {
          className: "absolute bottom-0 right-0 w-64 h-64 opacity-8 rotate-90",
          children: s.jsx("svg", {
            viewBox: "0 0 150 150",
            className: "w-full h-full text-botanical-green",
            children: s.jsxs("g", {
              opacity: "0.15",
              children: [
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "35",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                }),
                s.jsx("path", {
                  d: "M75 40v70M40 75h70",
                  stroke: "currentColor",
                  strokeWidth: "1",
                }),
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "20",
                  fill: "none",
                  stroke: "#D4AF37",
                  strokeWidth: "1.5",
                  opacity: "0.4",
                }),
              ],
            }),
          }),
        }),
        s.jsx("div", {
          className: "absolute top-1/4 left-1/4 w-8 h-8 animate-float",
          children: s.jsxs("svg", {
            viewBox: "0 0 32 32",
            className: "w-full h-full text-heritage-gold opacity-20",
            children: [
              s.jsx("circle", {
                cx: "16",
                cy: "16",
                r: "12",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",
              }),
              s.jsx("circle", {
                cx: "16",
                cy: "16",
                r: "4",
                fill: "currentColor",
              }),
            ],
          }),
        }),
        s.jsx("div", {
          className: "absolute top-3/4 right-1/4 w-6 h-6 animate-float",
          style: { animationDelay: "1s" },
          children: s.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-full h-full text-ayur-gold opacity-25",
            children: s.jsx("path", {
              d: "M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z",
              fill: "currentColor",
            }),
          }),
        }),
        s.jsxs("div", {
          className:
            "relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl animate-fade-in",
          children: [
            s.jsx("div", {
              className: "flex justify-center mb-12",
              children: s.jsxs("div", {
                className: "relative",
                children: [
                  s.jsx("div", {
                    className:
                      "w-32 h-32 bg-gradient-to-br from-ayur-red via-ayur-red-dark to-ayur-red-light rounded-full flex items-center justify-center shadow-2xl animate-bounce-gentle border-4 border-heritage-gold/30",
                    children: s.jsx(ms, { className: "w-14 h-14 text-white" }),
                  }),
                  s.jsx("div", {
                    className:
                      "absolute inset-0 w-32 h-32 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-ping opacity-20",
                  }),
                  s.jsx("div", {
                    className:
                      "absolute -inset-2 w-36 h-36 border border-heritage-gold/20 rounded-full animate-glow",
                  }),
                ],
              }),
            }),
            s.jsxs("h1", {
              className:
                "font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold text-antique-brown-dark mb-8 leading-tight drop-shadow-lg",
              children: [
                "135 Years of",
                s.jsx("br", {}),
                s.jsx("span", {
                  className:
                    "text-transparent bg-gradient-to-r from-ayur-red via-ayur-red-dark to-heritage-gold bg-clip-text",
                  children: "Ayurvedic Heritage",
                }),
              ],
            }),
            s.jsx("p", {
              className:
                "font-lora text-xl sm:text-2xl lg:text-3xl text-antique-brown-dark/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-sm",
              children: "Since 1890 – Pure, Potent, Proven Remedies",
            }),
            s.jsxs("div", {
              className: "flex items-center justify-center mb-12",
              children: [
                s.jsx("div", {
                  className:
                    "w-24 h-px bg-gradient-to-r from-transparent via-heritage-gold to-transparent",
                }),
                s.jsx("div", {
                  className:
                    "mx-4 w-3 h-3 bg-heritage-gold rounded-full animate-glow",
                }),
                s.jsx("div", {
                  className:
                    "w-24 h-px bg-gradient-to-r from-transparent via-heritage-gold to-transparent",
                }),
              ],
            }),
            s.jsxs("div", {
              className:
                "flex flex-col sm:flex-row gap-6 justify-center items-center",
              children: [
                s.jsxs("button", {
                  onClick: e,
                  className:
                    "group bg-gradient-to-r from-ayur-red to-ayur-red-dark text-white px-12 py-5 rounded-full font-noto font-semibold text-xl hover:from-ayur-red-dark hover:to-ayur-red transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 flex items-center gap-3 border border-heritage-gold/20",
                  children: [
                    "Shop Now",
                    s.jsx(zg, {
                      className:
                        "w-6 h-6 group-hover:translate-x-2 transition-transform",
                    }),
                  ],
                }),
                s.jsx("button", {
                  onClick: t,
                  className:
                    "group border-2 border-heritage-gold text-heritage-gold px-12 py-5 rounded-full font-noto font-semibold text-xl hover:bg-gradient-to-r hover:from-heritage-gold hover:to-ayur-gold hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 bg-vintage-beige/20 backdrop-blur-sm",
                  children: "Learn More",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  I0 = () =>
    s.jsxs("section", {
      id: "about",
      className:
        "py-24 bg-gradient-to-br from-white via-vintage-beige/20 to-aged-paper relative overflow-hidden bg-botanical",
      children: [
        s.jsx("div", {
          className:
            "absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent shadow-lg",
        }),
        s.jsxs("div", {
          className: "absolute inset-0 opacity-8",
          children: [
            s.jsx("div", {
              className: "absolute top-20 left-20 w-40 h-40",
              children: s.jsx("svg", {
                viewBox: "0 0 100 100",
                className: "w-full h-full text-botanical-green",
                children: s.jsxs("g", {
                  opacity: "0.12",
                  children: [
                    s.jsx("circle", {
                      cx: "50",
                      cy: "50",
                      r: "25",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                    }),
                    s.jsx("path", {
                      d: "M25 50h50M50 25v50",
                      stroke: "currentColor",
                      strokeWidth: "0.8",
                    }),
                    s.jsx("circle", {
                      cx: "50",
                      cy: "50",
                      r: "10",
                      fill: "none",
                      stroke: "#D4AF37",
                      strokeWidth: "1",
                      opacity: "0.4",
                    }),
                    s.jsx("circle", {
                      cx: "50",
                      cy: "50",
                      r: "3",
                      fill: "#C9A66B",
                      opacity: "0.3",
                    }),
                  ],
                }),
              }),
            }),
            s.jsx("div", {
              className: "absolute bottom-20 right-20 w-48 h-48",
              children: s.jsx("svg", {
                viewBox: "0 0 120 120",
                className: "w-full h-full text-botanical-green",
                children: s.jsxs("g", {
                  opacity: "0.12",
                  children: [
                    s.jsx("path", {
                      d: "M60 20c-12 0-22 10-22 22 0 20 22 50 22 50s22-30 22-50c0-12-10-22-22-22z",
                      fill: "currentColor",
                    }),
                    s.jsx("circle", {
                      cx: "60",
                      cy: "42",
                      r: "8",
                      fill: "none",
                      stroke: "#D4AF37",
                      strokeWidth: "1.5",
                      opacity: "0.4",
                    }),
                    s.jsx("circle", {
                      cx: "60",
                      cy: "42",
                      r: "3",
                      fill: "#C9A66B",
                      opacity: "0.5",
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        s.jsx("div", {
          className:
            "absolute top-1/3 right-1/3 w-4 h-4 animate-float opacity-25",
          children: s.jsxs("svg", {
            viewBox: "0 0 16 16",
            className: "w-full h-full text-heritage-gold",
            children: [
              s.jsx("circle", {
                cx: "8",
                cy: "8",
                r: "6",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",
              }),
              s.jsx("circle", {
                cx: "8",
                cy: "8",
                r: "2",
                fill: "currentColor",
              }),
            ],
          }),
        }),
        s.jsxs("div", {
          className:
            "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
          children: [
            s.jsxs("div", {
              className: "flex items-center justify-center mb-8",
              children: [
                s.jsx("div", {
                  className:
                    "w-20 h-px bg-gradient-to-r from-transparent via-heritage-gold to-ayur-gold",
                }),
                s.jsx("div", {
                  className:
                    "mx-4 w-4 h-4 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-glow shadow-lg",
                }),
                s.jsx("div", {
                  className:
                    "w-20 h-px bg-gradient-to-r from-ayur-gold via-heritage-gold to-transparent",
                }),
              ],
            }),
            s.jsxs("p", {
              className:
                "font-lora text-2xl sm:text-3xl text-antique-brown-dark leading-relaxed mb-12 animate-fade-in drop-shadow-sm",
              children: [
                s.jsx("strong", { children: "Sanchaaar" }),
                " has been dedicated to authentic Ayurvedic formulations for over a century, carrying forward a legacy of wellness and trust.",
              ],
            }),
            s.jsx(Ct, {
              to: "/about",
              className:
                "inline-block border-2 border-heritage-gold text-heritage-gold px-10 py-4 rounded-full font-noto font-semibold text-lg hover:bg-gradient-to-r hover:from-heritage-gold hover:to-ayur-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 bg-vintage-beige/20 backdrop-blur-sm",
              children: "Read More",
            }),
            s.jsxs("div", {
              className: "flex items-center justify-center mt-12",
              children: [
                s.jsx("div", {
                  className:
                    "w-20 h-px bg-gradient-to-r from-transparent via-heritage-gold to-ayur-gold",
                }),
                s.jsx("div", {
                  className:
                    "mx-4 w-4 h-4 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-glow shadow-lg",
                }),
                s.jsx("div", {
                  className:
                    "w-20 h-px bg-gradient-to-r from-ayur-gold via-heritage-gold to-transparent",
                }),
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className:
            "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent shadow-lg",
        }),
      ],
    }),
  O0 = ({ className: e = "" }) =>
    s.jsx("div", {
      className: `relative ${e}`,
      children: s.jsx("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: s.jsx("path", {
          d: "M7.5 0L9.183 5.182L15 5.182L10.409 8.386L12.092 13.568L7.5 10.364L2.908 13.568L4.591 8.386L0 5.182L5.817 5.182L7.5 0Z",
          fill: "#FFD700",
        }),
      }),
    }),
  D0 = ({ className: e = "" }) =>
    s.jsx("div", {
      className: `relative ${e}`,
      children: s.jsx("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: s.jsx("path", {
          d: "M7.5 0L9.183 5.182L15 5.182L10.409 8.386L12.092 13.568L7.5 10.364L2.908 13.568L4.591 8.386L0 5.182L5.817 5.182L7.5 0Z",
          fill: "#FFD700",
        }),
      }),
    }),
  $0 = ({ className: e = "" }) =>
    s.jsx("div", {
      className: `relative ${e}`,
      children: s.jsx("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: s.jsx("path", {
          d: "M7.5 0L9.183 5.182L15 5.182L10.409 8.386L12.092 13.568L7.5 10.364L2.908 13.568L4.591 8.386L0 5.182L5.817 5.182L7.5 0Z",
          fill: "#FFD700",
        }),
      }),
    }),
  F0 = ({ className: e = "" }) =>
    s.jsx("div", {
      className: `relative ${e}`,
      children: s.jsx("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: s.jsx("path", {
          d: "M7.5 0L9.183 5.182L15 5.182L10.409 8.386L12.092 13.568L7.5 10.364L2.908 13.568L4.591 8.386L0 5.182L5.817 5.182L7.5 0Z",
          fill: "#FFD700",
        }),
      }),
    }),
  U0 = ({ isModalOpen: e, setIsModalOpen: t, product: r }) => {
    var g, v;
    const { addToCart: n } = ds(),
      [l, o] = y.useState(1),
      a = () => {
        (t(!1), o(1));
      },
      c = () => {
        o((x) => x + 1);
      },
      i = () => {
        o((x) => Math.max(1, x - 1));
      },
      u = () => {
        if (r) {
          const x = {
            id: r.id,
            name: r.name,
            price: r.price,
            mrp: r.original_price || r.price,
            image: r.image_url,
            description: r.description,
          };
          for (let w = 0; w < l; w++) n(x);
          a();
        }
      },
      p = (x) => {
        x.target === x.currentTarget && a();
      };
    if (
      (Gs.useEffect(() => {
        e && r && o(1);
      }, [e, r]),
      Gs.useEffect(() => {
        if (e) {
          const x = document.body.style.overflow,
            w = document.body.style.position;
          ((document.body.style.overflow = "hidden"),
            (document.body.style.position = "relative"));
          const N = (m) => {
            m.key === "Escape" && a();
          };
          document.addEventListener("keydown", N);
          const h = document.querySelector('[data-modal="product-modal"]');
          return (
            h && h.focus(),
            () => {
              ((document.body.style.overflow = x),
                (document.body.style.position = w),
                document.removeEventListener("keydown", N));
            }
          );
        }
      }, [e]),
      !e)
    )
      return null;
    const f = s.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[9999]",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
      },
      onClick: p,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "modal-title",
      children: s.jsxs("div", {
        className:
          "bg-gray-50 rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden relative",
        style: { position: "relative", transform: "none" },
        "data-modal": "product-modal",
        tabIndex: -1,
        onClick: (x) => x.stopPropagation(),
        children: [
          s.jsx("button", {
            onClick: a,
            className:
              "absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10",
            style: { position: "absolute" },
            "aria-label": "Close modal",
            children: s.jsx("svg", {
              className: "w-5 h-5",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: s.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M6 18L18 6M6 6l12 12",
              }),
            }),
          }),
          s.jsxs("div", {
            className: "flex-1 flex overflow-hidden min-h-0",
            children: [
              s.jsx("div", {
                className:
                  "w-full lg:w-1/2 bg-[#e3e5fa] flex items-center justify-center p-4 lg:p-8",
                children: s.jsxs("div", {
                  className: "relative w-full max-w-md lg:max-w-lg h-auto",
                  children: [
                    s.jsx("div", {
                      className:
                        "absolute w-full h-full top-0 left-0 rounded-full rotate-[-5.00deg] bg-[linear-gradient(286deg,rgba(129,138,249,1)_0%,rgba(129,138,249,0)_100%)] opacity-10",
                    }),
                    s.jsx("div", {
                      className:
                        "absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-[-175.00deg] blur-[50px] bg-[linear-gradient(286deg,rgba(129,138,249,1)_0%,rgba(130,136,215,1)_100%)] opacity-10",
                    }),
                    s.jsxs("div", {
                      className: "relative w-full h-auto",
                      children: [
                        s.jsx("div", {
                          className:
                            "absolute w-1/2 h-4 bottom-0 left-1/2 transform -translate-x-1/2 bg-[#818af9] rounded-full blur-[50px]",
                        }),
                        s.jsx("img", {
                          className: "w-full h-auto object-contain",
                          alt: "Product Image",
                          src: "src/Icons/proto1-removebg-preview.png",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "w-full lg:w-1/2 flex flex-col overflow-hidden",
                children: s.jsxs("div", {
                  className:
                    "flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
                  children: [
                    (r == null ? void 0 : r.original_price) &&
                      r.original_price > r.price &&
                      s.jsx("div", {
                        className:
                          "inline-flex items-start gap-2.5 px-2 py-1 bg-red-500 rounded mb-4",
                        children: s.jsx("div", {
                          className:
                            "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0.72px] leading-[normal]",
                          children: "SALE",
                        }),
                      }),
                    s.jsx("h1", {
                      id: "modal-title",
                      className:
                        "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-[normal] mb-4",
                      children: (r == null ? void 0 : r.name) || "Product Name",
                    }),
                    s.jsx("div", {
                      className:
                        "flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 mb-6",
                      children: s.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [
                          s.jsx("div", {
                            className:
                              "[font-family:'Manrope-Medium',Helvetica] font-medium text-[#4fcc97] text-xs text-center tracking-[1.98px] leading-[15px]",
                            children:
                              ((g = r == null ? void 0 : r.category) == null
                                ? void 0
                                : g.toUpperCase()) || "AYURVEDIC",
                          }),
                          s.jsx("img", {
                            className: "w-px h-2 object-cover",
                            alt: "Line",
                            src: "src/Icons/Line21.svg",
                          }),
                          s.jsxs("div", {
                            className: "flex items-center gap-1",
                            children: [
                              s.jsx(D0, {
                                className: "!relative !w-[15px] !h-[15px]",
                              }),
                              s.jsx(O0, {
                                className: "!relative !w-[15px] !h-[15px]",
                              }),
                              s.jsx($0, {
                                className: "!relative !w-[15px] !h-[15px]",
                              }),
                              s.jsx(F0, {
                                className: "!relative !w-[15px] !h-[15px]",
                              }),
                            ],
                          }),
                          s.jsx("div", {
                            className:
                              "bg-[linear-gradient(92deg,rgba(23,28,36,1)_0%,rgba(40,50,63,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Manrope-Medium',Helvetica] font-medium text-transparent text-xs text-center tracking-[0.24px] leading-[15px]",
                            children:
                              r != null && r.rating
                                ? `${r.rating} (${r.review_count || 0} reviews)`
                                : "4.9 (2130 reviews)",
                          }),
                        ],
                      }),
                    }),
                    s.jsxs("div", {
                      className: "flex flex-col gap-4 lg:gap-6 pb-24",
                      children: [
                        s.jsxs("div", {
                          className: "flex flex-col gap-3",
                          children: [
                            s.jsx("div", {
                              className:
                                "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]",
                              children: "Description:",
                            }),
                            s.jsx("p", {
                              className:
                                "[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]",
                              children:
                                (r == null ? void 0 : r.description) ||
                                "Premium Ayurvedic product crafted with traditional wisdom and modern quality standards.",
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          className: "flex items-center gap-4 lg:gap-6",
                          children: [
                            s.jsx("img", {
                              className:
                                "w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg border-2 border-[#818af9]",
                              alt: "Product Thumbnail",
                              src:
                                (r == null ? void 0 : r.image_url) ||
                                "src/Icons/Rectangle3782.png",
                            }),
                            r != null && r.images && r.images.length > 0
                              ? r.images.slice(0, 2).map((x, w) =>
                                  s.jsx(
                                    "img",
                                    {
                                      className:
                                        "w-10 h-10 lg:w-11 lg:h-11 object-cover rounded-lg border border-gray-300",
                                      alt: "Product Thumbnail",
                                      src: x,
                                    },
                                    w,
                                  ),
                                )
                              : s.jsxs(s.Fragment, {
                                  children: [
                                    s.jsx("img", {
                                      className:
                                        "w-10 h-10 lg:w-11 lg:h-11 object-cover rounded-lg border border-gray-300",
                                      alt: "Product Thumbnail",
                                      src: "src/Icons/Rectangle3783.png",
                                    }),
                                    s.jsx("img", {
                                      className:
                                        "w-10 h-10 lg:w-11 lg:h-11 object-cover rounded-lg border border-gray-300",
                                      alt: "Product Thumbnail",
                                      src: "src/Icons/Rectangle3784.png",
                                    }),
                                  ],
                                }),
                          ],
                        }),
                        s.jsxs("div", {
                          className: "flex flex-col gap-4",
                          children: [
                            s.jsx("div", {
                              className:
                                "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]",
                              children: "Weight:",
                            }),
                            s.jsx("div", {
                              className: "flex flex-wrap gap-2 lg:gap-3",
                              children: s.jsx("div", {
                                className:
                                  "px-3 py-2 bg-[#818af9] rounded-[10px] border-2 border-solid border-[#f1e5e538]",
                                children: s.jsx("div", {
                                  className:
                                    "[font-family:'Manrope-Bold',Helvetica] font-bold text-[#ffffff] text-sm lg:text-xs tracking-[0] leading-[normal]",
                                  children:
                                    (r == null ? void 0 : r.weight) || "100ml",
                                }),
                              }),
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          className: "flex flex-col gap-3",
                          children: [
                            s.jsx("div", {
                              className:
                                "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]",
                              children: "Ingredients:",
                            }),
                            s.jsx("div", {
                              className:
                                "[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]",
                              children:
                                r != null &&
                                r.ingredients &&
                                r.ingredients.length > 0
                                  ? r.ingredients.join(", ")
                                  : "Premium Ayurvedic ingredients",
                            }),
                          ],
                        }),
                        (r == null ? void 0 : r.benefits) &&
                          r.benefits.length > 0 &&
                          s.jsxs("div", {
                            className: "flex flex-col gap-3",
                            children: [
                              s.jsx("div", {
                                className:
                                  "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]",
                                children: "Benefits:",
                              }),
                              s.jsx("div", {
                                className:
                                  "[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]",
                                children: r.benefits.join(", "),
                              }),
                            ],
                          }),
                        (r == null ? void 0 : r.usage_instructions) &&
                          s.jsxs("div", {
                            className: "flex flex-col gap-3",
                            children: [
                              s.jsx("div", {
                                className:
                                  "[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]",
                                children: "Usage Instructions:",
                              }),
                              s.jsx("div", {
                                className:
                                  "[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]",
                                children: r.usage_instructions,
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          s.jsx("div", {
            className: `absolute bottom-4 left-1/2 transform -translate-x-1/2 
             w-[95%] max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 
              lg:py-2 lg:px-4`,
            children: s.jsxs("div", {
              className:
                "flex flex-col sm:flex-row items-center gap-4 lg:gap-8",
              children: [
                s.jsxs("div", {
                  className: "flex items-center gap-4 flex-1",
                  children: [
                    s.jsx("img", {
                      className:
                        "w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg flex-shrink-0",
                      alt: "Product",
                      src:
                        (r == null ? void 0 : r.image_url) ||
                        "src/Icons/Rectangle3764.png",
                    }),
                    s.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-0",
                      children: [
                        s.jsx("p", {
                          className:
                            "font-semibold text-black text-sm lg:text-base truncate",
                          children:
                            (r == null ? void 0 : r.name) || "Product Name",
                        }),
                        s.jsx("div", {
                          className:
                            "font-medium text-green-600 text-xs tracking-wide",
                          children:
                            ((v = r == null ? void 0 : r.category) == null
                              ? void 0
                              : v.toUpperCase()) || "AYURVEDIC",
                        }),
                        s.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            s.jsxs("span", {
                              className: "font-bold text-lg text-indigo-600",
                              children: [
                                "₹",
                                (r == null ? void 0 : r.price) || "0",
                              ],
                            }),
                            (r == null ? void 0 : r.original_price) &&
                              r.original_price > r.price &&
                              s.jsxs("span", {
                                className: "text-sm text-gray-500 line-through",
                                children: ["₹", r.original_price],
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "flex items-center gap-4 lg:gap-8",
                  children: [
                    s.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        s.jsx("span", {
                          className: "font-semibold text-sm text-gray-800",
                          children: "Qty:",
                        }),
                        s.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            s.jsx("button", {
                              onClick: i,
                              className:
                                "w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded transition-colors",
                              children: s.jsx("img", {
                                className: "w-4 h-4",
                                alt: "Minus",
                                src: "src/Icons/minus-square.svg",
                              }),
                            }),
                            s.jsx("div", {
                              className:
                                "w-12 h-10 flex items-center justify-center bg-white rounded-md border border-gray-300",
                              children: s.jsx("span", {
                                className: "font-normal text-gray-800",
                                children: l,
                              }),
                            }),
                            s.jsx("button", {
                              onClick: c,
                              className:
                                "w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded transition-colors",
                              children: s.jsx("img", {
                                className: "w-4 h-4",
                                alt: "Plus",
                                src: "src/Icons/plus-square.svg",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsx("button", {
                      onClick: u,
                      className:
                        "px-6 py-3 bg-indigo-500 rounded-md hover:bg-indigo-600 transition-colors whitespace-nowrap",
                      children: s.jsx("span", {
                        className: "font-bold text-white text-sm",
                        children: "ADD TO CART",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    });
    return Id.createPortal(f, document.body);
  },
  B0 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function W0(e) {
  const [t, r] = y.useState(!1),
    n = () => {
      r(!0);
    },
    { src: l, alt: o, style: a, className: c, ...i } = e;
  return t
    ? s.jsx("div", {
        className: `inline-block bg-gray-100 text-center align-middle ${c ?? ""}`,
        style: a,
        children: s.jsx("div", {
          className: "flex items-center justify-center w-full h-full",
          children: s.jsx("img", {
            src: B0,
            alt: "Error loading image",
            ...i,
            "data-original-url": l,
          }),
        }),
      })
    : s.jsx("img", {
        src: l,
        alt: o,
        className: c,
        style: a,
        ...i,
        onError: n,
      });
}
function xc(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function H0(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((l) => {
      const o = xc(l, t);
      return (!r && typeof o == "function" && (r = !0), o);
    });
    if (r)
      return () => {
        for (let l = 0; l < n.length; l++) {
          const o = n[l];
          typeof o == "function" ? o() : xc(e[l], null);
        }
      };
  };
}
function V0(e) {
  const t = Q0(e),
    r = y.forwardRef((n, l) => {
      const { children: o, ...a } = n,
        c = y.Children.toArray(o),
        i = c.find(Y0);
      if (i) {
        const u = i.props.children,
          p = c.map((f) =>
            f === i
              ? y.Children.count(u) > 1
                ? y.Children.only(null)
                : y.isValidElement(u)
                  ? u.props.children
                  : null
              : f,
          );
        return s.jsx(t, {
          ...a,
          ref: l,
          children: y.isValidElement(u) ? y.cloneElement(u, void 0, p) : null,
        });
      }
      return s.jsx(t, { ...a, ref: l, children: o });
    });
  return ((r.displayName = `${e}.Slot`), r);
}
var q0 = V0("Slot");
function Q0(e) {
  const t = y.forwardRef((r, n) => {
    const { children: l, ...o } = r;
    if (y.isValidElement(l)) {
      const a = X0(l),
        c = K0(o, l.props);
      return (
        l.type !== y.Fragment && (c.ref = n ? H0(n, a) : a),
        y.cloneElement(l, c)
      );
    }
    return y.Children.count(l) > 1 ? y.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var G0 = Symbol("radix.slottable");
function Y0(e) {
  return (
    y.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === G0
  );
}
function K0(e, t) {
  const r = { ...t };
  for (const n in t) {
    const l = e[n],
      o = t[n];
    /^on[A-Z]/.test(n)
      ? l && o
        ? (r[n] = (...c) => {
            const i = o(...c);
            return (l(...c), i);
          })
        : l && (r[n] = l)
      : n === "style"
        ? (r[n] = { ...l, ...o })
        : n === "className" && (r[n] = [l, o].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function X0(e) {
  var n, l;
  let t =
      (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : n.get,
    r = t && "isReactWarning" in t && t.isReactWarning;
  return r
    ? e.ref
    : ((t =
        (l = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : l.get),
      (r = t && "isReactWarning" in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref);
}
function df(e) {
  var t,
    r,
    n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var l = e.length;
      for (t = 0; t < l; t++)
        e[t] && (r = df(e[t])) && (n && (n += " "), (n += r));
    } else for (r in e) e[r] && (n && (n += " "), (n += r));
  return n;
}
function ff() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++)
    (e = arguments[r]) && (t = df(e)) && (n && (n += " "), (n += t));
  return n;
}
const yc = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  vc = ff,
  Z0 = (e, t) => (r) => {
    var n;
    if ((t == null ? void 0 : t.variants) == null)
      return vc(
        e,
        r == null ? void 0 : r.class,
        r == null ? void 0 : r.className,
      );
    const { variants: l, defaultVariants: o } = t,
      a = Object.keys(l).map((u) => {
        const p = r == null ? void 0 : r[u],
          f = o == null ? void 0 : o[u];
        if (p === null) return null;
        const g = yc(p) || yc(f);
        return l[u][g];
      }),
      c =
        r &&
        Object.entries(r).reduce((u, p) => {
          let [f, g] = p;
          return (g === void 0 || (u[f] = g), u);
        }, {}),
      i =
        t == null || (n = t.compoundVariants) === null || n === void 0
          ? void 0
          : n.reduce((u, p) => {
              let { class: f, className: g, ...v } = p;
              return Object.entries(v).every((x) => {
                let [w, N] = x;
                return Array.isArray(N)
                  ? N.includes({ ...o, ...c }[w])
                  : { ...o, ...c }[w] === N;
              })
                ? [...u, f, g]
                : u;
            }, []);
    return vc(
      e,
      a,
      i,
      r == null ? void 0 : r.class,
      r == null ? void 0 : r.className,
    );
  },
  Za = "-",
  J0 = (e) => {
    const t = tx(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = e;
    return {
      getClassGroupId: (a) => {
        const c = a.split(Za);
        return (c[0] === "" && c.length !== 1 && c.shift(), mf(c, t) || ex(a));
      },
      getConflictingClassGroupIds: (a, c) => {
        const i = r[a] || [];
        return c && n[a] ? [...i, ...n[a]] : i;
      },
    };
  },
  mf = (e, t) => {
    var a;
    if (e.length === 0) return t.classGroupId;
    const r = e[0],
      n = t.nextPart.get(r),
      l = n ? mf(e.slice(1), n) : void 0;
    if (l) return l;
    if (t.validators.length === 0) return;
    const o = e.join(Za);
    return (a = t.validators.find(({ validator: c }) => c(o))) == null
      ? void 0
      : a.classGroupId;
  },
  wc = /^\[(.+)\]$/,
  ex = (e) => {
    if (wc.test(e)) {
      const t = wc.exec(e)[1],
        r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (r) return "arbitrary.." + r;
    }
  },
  tx = (e) => {
    const { theme: t, classGroups: r } = e,
      n = { nextPart: new Map(), validators: [] };
    for (const l in r) qo(r[l], n, l, t);
    return n;
  },
  qo = (e, t, r, n) => {
    e.forEach((l) => {
      if (typeof l == "string") {
        const o = l === "" ? t : bc(t, l);
        o.classGroupId = r;
        return;
      }
      if (typeof l == "function") {
        if (rx(l)) {
          qo(l(n), t, r, n);
          return;
        }
        t.validators.push({ validator: l, classGroupId: r });
        return;
      }
      Object.entries(l).forEach(([o, a]) => {
        qo(a, bc(t, o), r, n);
      });
    });
  },
  bc = (e, t) => {
    let r = e;
    return (
      t.split(Za).forEach((n) => {
        (r.nextPart.has(n) ||
          r.nextPart.set(n, { nextPart: new Map(), validators: [] }),
          (r = r.nextPart.get(n)));
      }),
      r
    );
  },
  rx = (e) => e.isThemeGetter,
  nx = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      r = new Map(),
      n = new Map();
    const l = (o, a) => {
      (r.set(o, a), t++, t > e && ((t = 0), (n = r), (r = new Map())));
    };
    return {
      get(o) {
        let a = r.get(o);
        if (a !== void 0) return a;
        if ((a = n.get(o)) !== void 0) return (l(o, a), a);
      },
      set(o, a) {
        r.has(o) ? r.set(o, a) : l(o, a);
      },
    };
  },
  Qo = "!",
  Go = ":",
  lx = Go.length,
  sx = (e) => {
    const { prefix: t, experimentalParseClassName: r } = e;
    let n = (l) => {
      const o = [];
      let a = 0,
        c = 0,
        i = 0,
        u;
      for (let x = 0; x < l.length; x++) {
        let w = l[x];
        if (a === 0 && c === 0) {
          if (w === Go) {
            (o.push(l.slice(i, x)), (i = x + lx));
            continue;
          }
          if (w === "/") {
            u = x;
            continue;
          }
        }
        w === "[" ? a++ : w === "]" ? a-- : w === "(" ? c++ : w === ")" && c--;
      }
      const p = o.length === 0 ? l : l.substring(i),
        f = ox(p),
        g = f !== p,
        v = u && u > i ? u - i : void 0;
      return {
        modifiers: o,
        hasImportantModifier: g,
        baseClassName: f,
        maybePostfixModifierPosition: v,
      };
    };
    if (t) {
      const l = t + Go,
        o = n;
      n = (a) =>
        a.startsWith(l)
          ? o(a.substring(l.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: a,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (r) {
      const l = n;
      n = (o) => r({ className: o, parseClassName: l });
    }
    return n;
  },
  ox = (e) =>
    e.endsWith(Qo)
      ? e.substring(0, e.length - 1)
      : e.startsWith(Qo)
        ? e.substring(1)
        : e,
  ax = (e) => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map((n) => [n, !0]));
    return (n) => {
      if (n.length <= 1) return n;
      const l = [];
      let o = [];
      return (
        n.forEach((a) => {
          a[0] === "[" || t[a] ? (l.push(...o.sort(), a), (o = [])) : o.push(a);
        }),
        l.push(...o.sort()),
        l
      );
    };
  },
  ix = (e) => ({
    cache: nx(e.cacheSize),
    parseClassName: sx(e),
    sortModifiers: ax(e),
    ...J0(e),
  }),
  cx = /\s+/,
  ux = (e, t) => {
    const {
        parseClassName: r,
        getClassGroupId: n,
        getConflictingClassGroupIds: l,
        sortModifiers: o,
      } = t,
      a = [],
      c = e.trim().split(cx);
    let i = "";
    for (let u = c.length - 1; u >= 0; u -= 1) {
      const p = c[u],
        {
          isExternal: f,
          modifiers: g,
          hasImportantModifier: v,
          baseClassName: x,
          maybePostfixModifierPosition: w,
        } = r(p);
      if (f) {
        i = p + (i.length > 0 ? " " + i : i);
        continue;
      }
      let N = !!w,
        h = n(N ? x.substring(0, w) : x);
      if (!h) {
        if (!N) {
          i = p + (i.length > 0 ? " " + i : i);
          continue;
        }
        if (((h = n(x)), !h)) {
          i = p + (i.length > 0 ? " " + i : i);
          continue;
        }
        N = !1;
      }
      const m = o(g).join(":"),
        d = v ? m + Qo : m,
        b = d + h;
      if (a.includes(b)) continue;
      a.push(b);
      const C = l(h, N);
      for (let R = 0; R < C.length; ++R) {
        const E = C[R];
        a.push(d + E);
      }
      i = p + (i.length > 0 ? " " + i : i);
    }
    return i;
  };
function dx() {
  let e = 0,
    t,
    r,
    n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = pf(t)) && (n && (n += " "), (n += r));
  return n;
}
const pf = (e) => {
  if (typeof e == "string") return e;
  let t,
    r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = pf(e[n])) && (r && (r += " "), (r += t));
  return r;
};
function fx(e, ...t) {
  let r,
    n,
    l,
    o = a;
  function a(i) {
    const u = t.reduce((p, f) => f(p), e());
    return ((r = ix(u)), (n = r.cache.get), (l = r.cache.set), (o = c), c(i));
  }
  function c(i) {
    const u = n(i);
    if (u) return u;
    const p = ux(i, r);
    return (l(i, p), p);
  }
  return function () {
    return o(dx.apply(null, arguments));
  };
}
const ce = (e) => {
    const t = (r) => r[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  hf = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  gf = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  mx = /^\d+\/\d+$/,
  px = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  hx =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  gx = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  xx = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  yx =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  sr = (e) => mx.test(e),
  $ = (e) => !!e && !Number.isNaN(Number(e)),
  bt = (e) => !!e && Number.isInteger(Number(e)),
  qs = (e) => e.endsWith("%") && $(e.slice(0, -1)),
  lt = (e) => px.test(e),
  vx = () => !0,
  wx = (e) => hx.test(e) && !gx.test(e),
  xf = () => !1,
  bx = (e) => xx.test(e),
  jx = (e) => yx.test(e),
  Nx = (e) => !A(e) && !I(e),
  kx = (e) => Ir(e, wf, xf),
  A = (e) => hf.test(e),
  Bt = (e) => Ir(e, bf, wx),
  Qs = (e) => Ir(e, Px, $),
  jc = (e) => Ir(e, yf, xf),
  Sx = (e) => Ir(e, vf, jx),
  ll = (e) => Ir(e, jf, bx),
  I = (e) => gf.test(e),
  Yr = (e) => Or(e, bf),
  Cx = (e) => Or(e, Rx),
  Nc = (e) => Or(e, yf),
  _x = (e) => Or(e, wf),
  Ex = (e) => Or(e, vf),
  sl = (e) => Or(e, jf, !0),
  Ir = (e, t, r) => {
    const n = hf.exec(e);
    return n ? (n[1] ? t(n[1]) : r(n[2])) : !1;
  },
  Or = (e, t, r = !1) => {
    const n = gf.exec(e);
    return n ? (n[1] ? t(n[1]) : r) : !1;
  },
  yf = (e) => e === "position" || e === "percentage",
  vf = (e) => e === "image" || e === "url",
  wf = (e) => e === "length" || e === "size" || e === "bg-size",
  bf = (e) => e === "length",
  Px = (e) => e === "number",
  Rx = (e) => e === "family-name",
  jf = (e) => e === "shadow",
  Lx = () => {
    const e = ce("color"),
      t = ce("font"),
      r = ce("text"),
      n = ce("font-weight"),
      l = ce("tracking"),
      o = ce("leading"),
      a = ce("breakpoint"),
      c = ce("container"),
      i = ce("spacing"),
      u = ce("radius"),
      p = ce("shadow"),
      f = ce("inset-shadow"),
      g = ce("text-shadow"),
      v = ce("drop-shadow"),
      x = ce("blur"),
      w = ce("perspective"),
      N = ce("aspect"),
      h = ce("ease"),
      m = ce("animate"),
      d = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      b = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      C = () => [...b(), I, A],
      R = () => ["auto", "hidden", "clip", "visible", "scroll"],
      E = () => ["auto", "contain", "none"],
      k = () => [I, A, i],
      P = () => [sr, "full", "auto", ...k()],
      M = () => [bt, "none", "subgrid", I, A],
      S = () => ["auto", { span: ["full", bt, I, A] }, bt, I, A],
      z = () => [bt, "auto", I, A],
      ne = () => ["auto", "min", "max", "fr", I, A],
      Ie = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      oe = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      W = () => ["auto", ...k()],
      L = () => [
        sr,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...k(),
      ],
      j = () => [e, I, A],
      O = () => [...b(), Nc, jc, { position: [I, A] }],
      D = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      G = () => ["auto", "cover", "contain", _x, kx, { size: [I, A] }],
      te = () => [qs, Yr, Bt],
      ae = () => ["", "none", "full", u, I, A],
      le = () => ["", $, Yr, Bt],
      vt = () => ["solid", "dashed", "dotted", "double"],
      Ke = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      K = () => [$, qs, Nc, jc],
      Ja = () => ["", "none", x, I, A],
      On = () => ["none", $, I, A],
      Dn = () => ["none", $, I, A],
      hs = () => [$, I, A],
      $n = () => [sr, "full", ...k()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [lt],
        breakpoint: [lt],
        color: [vx],
        container: [lt],
        "drop-shadow": [lt],
        ease: ["in", "out", "in-out"],
        font: [Nx],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [lt],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [lt],
        shadow: [lt],
        spacing: ["px", $],
        text: [lt],
        "text-shadow": [lt],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", sr, A, I, N] }],
        container: ["container"],
        columns: [{ columns: [$, A, I, c] }],
        "break-after": [{ "break-after": d() }],
        "break-before": [{ "break-before": d() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: C() }],
        overflow: [{ overflow: R() }],
        "overflow-x": [{ "overflow-x": R() }],
        "overflow-y": [{ "overflow-y": R() }],
        overscroll: [{ overscroll: E() }],
        "overscroll-x": [{ "overscroll-x": E() }],
        "overscroll-y": [{ "overscroll-y": E() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: P() }],
        "inset-x": [{ "inset-x": P() }],
        "inset-y": [{ "inset-y": P() }],
        start: [{ start: P() }],
        end: [{ end: P() }],
        top: [{ top: P() }],
        right: [{ right: P() }],
        bottom: [{ bottom: P() }],
        left: [{ left: P() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [bt, "auto", I, A] }],
        basis: [{ basis: [sr, "full", "auto", c, ...k()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [$, sr, "auto", "initial", "none", A] }],
        grow: [{ grow: ["", $, I, A] }],
        shrink: [{ shrink: ["", $, I, A] }],
        order: [{ order: [bt, "first", "last", "none", I, A] }],
        "grid-cols": [{ "grid-cols": M() }],
        "col-start-end": [{ col: S() }],
        "col-start": [{ "col-start": z() }],
        "col-end": [{ "col-end": z() }],
        "grid-rows": [{ "grid-rows": M() }],
        "row-start-end": [{ row: S() }],
        "row-start": [{ "row-start": z() }],
        "row-end": [{ "row-end": z() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ne() }],
        "auto-rows": [{ "auto-rows": ne() }],
        gap: [{ gap: k() }],
        "gap-x": [{ "gap-x": k() }],
        "gap-y": [{ "gap-y": k() }],
        "justify-content": [{ justify: [...Ie(), "normal"] }],
        "justify-items": [{ "justify-items": [...oe(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...oe()] }],
        "align-content": [{ content: ["normal", ...Ie()] }],
        "align-items": [{ items: [...oe(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...oe(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": Ie() }],
        "place-items": [{ "place-items": [...oe(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...oe()] }],
        p: [{ p: k() }],
        px: [{ px: k() }],
        py: [{ py: k() }],
        ps: [{ ps: k() }],
        pe: [{ pe: k() }],
        pt: [{ pt: k() }],
        pr: [{ pr: k() }],
        pb: [{ pb: k() }],
        pl: [{ pl: k() }],
        m: [{ m: W() }],
        mx: [{ mx: W() }],
        my: [{ my: W() }],
        ms: [{ ms: W() }],
        me: [{ me: W() }],
        mt: [{ mt: W() }],
        mr: [{ mr: W() }],
        mb: [{ mb: W() }],
        ml: [{ ml: W() }],
        "space-x": [{ "space-x": k() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": k() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: L() }],
        w: [{ w: [c, "screen", ...L()] }],
        "min-w": [{ "min-w": [c, "screen", "none", ...L()] }],
        "max-w": [
          { "max-w": [c, "screen", "none", "prose", { screen: [a] }, ...L()] },
        ],
        h: [{ h: ["screen", "lh", ...L()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...L()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...L()] }],
        "font-size": [{ text: ["base", r, Yr, Bt] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [n, I, Qs] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              qs,
              A,
            ],
          },
        ],
        "font-family": [{ font: [Cx, A, t] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [l, I, A] }],
        "line-clamp": [{ "line-clamp": [$, "none", I, Qs] }],
        leading: [{ leading: [o, ...k()] }],
        "list-image": [{ "list-image": ["none", I, A] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", I, A] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: j() }],
        "text-color": [{ text: j() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...vt(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [$, "from-font", "auto", I, Bt] },
        ],
        "text-decoration-color": [{ decoration: j() }],
        "underline-offset": [{ "underline-offset": [$, "auto", I, A] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: k() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              I,
              A,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", I, A] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: O() }],
        "bg-repeat": [{ bg: D() }],
        "bg-size": [{ bg: G() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  bt,
                  I,
                  A,
                ],
                radial: ["", I, A],
                conic: [bt, I, A],
              },
              Ex,
              Sx,
            ],
          },
        ],
        "bg-color": [{ bg: j() }],
        "gradient-from-pos": [{ from: te() }],
        "gradient-via-pos": [{ via: te() }],
        "gradient-to-pos": [{ to: te() }],
        "gradient-from": [{ from: j() }],
        "gradient-via": [{ via: j() }],
        "gradient-to": [{ to: j() }],
        rounded: [{ rounded: ae() }],
        "rounded-s": [{ "rounded-s": ae() }],
        "rounded-e": [{ "rounded-e": ae() }],
        "rounded-t": [{ "rounded-t": ae() }],
        "rounded-r": [{ "rounded-r": ae() }],
        "rounded-b": [{ "rounded-b": ae() }],
        "rounded-l": [{ "rounded-l": ae() }],
        "rounded-ss": [{ "rounded-ss": ae() }],
        "rounded-se": [{ "rounded-se": ae() }],
        "rounded-ee": [{ "rounded-ee": ae() }],
        "rounded-es": [{ "rounded-es": ae() }],
        "rounded-tl": [{ "rounded-tl": ae() }],
        "rounded-tr": [{ "rounded-tr": ae() }],
        "rounded-br": [{ "rounded-br": ae() }],
        "rounded-bl": [{ "rounded-bl": ae() }],
        "border-w": [{ border: le() }],
        "border-w-x": [{ "border-x": le() }],
        "border-w-y": [{ "border-y": le() }],
        "border-w-s": [{ "border-s": le() }],
        "border-w-e": [{ "border-e": le() }],
        "border-w-t": [{ "border-t": le() }],
        "border-w-r": [{ "border-r": le() }],
        "border-w-b": [{ "border-b": le() }],
        "border-w-l": [{ "border-l": le() }],
        "divide-x": [{ "divide-x": le() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": le() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...vt(), "hidden", "none"] }],
        "divide-style": [{ divide: [...vt(), "hidden", "none"] }],
        "border-color": [{ border: j() }],
        "border-color-x": [{ "border-x": j() }],
        "border-color-y": [{ "border-y": j() }],
        "border-color-s": [{ "border-s": j() }],
        "border-color-e": [{ "border-e": j() }],
        "border-color-t": [{ "border-t": j() }],
        "border-color-r": [{ "border-r": j() }],
        "border-color-b": [{ "border-b": j() }],
        "border-color-l": [{ "border-l": j() }],
        "divide-color": [{ divide: j() }],
        "outline-style": [{ outline: [...vt(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [$, I, A] }],
        "outline-w": [{ outline: ["", $, Yr, Bt] }],
        "outline-color": [{ outline: j() }],
        shadow: [{ shadow: ["", "none", p, sl, ll] }],
        "shadow-color": [{ shadow: j() }],
        "inset-shadow": [{ "inset-shadow": ["none", f, sl, ll] }],
        "inset-shadow-color": [{ "inset-shadow": j() }],
        "ring-w": [{ ring: le() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: j() }],
        "ring-offset-w": [{ "ring-offset": [$, Bt] }],
        "ring-offset-color": [{ "ring-offset": j() }],
        "inset-ring-w": [{ "inset-ring": le() }],
        "inset-ring-color": [{ "inset-ring": j() }],
        "text-shadow": [{ "text-shadow": ["none", g, sl, ll] }],
        "text-shadow-color": [{ "text-shadow": j() }],
        opacity: [{ opacity: [$, I, A] }],
        "mix-blend": [
          { "mix-blend": [...Ke(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": Ke() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [$] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": K() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": K() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": j() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": j() }],
        "mask-image-t-from-pos": [{ "mask-t-from": K() }],
        "mask-image-t-to-pos": [{ "mask-t-to": K() }],
        "mask-image-t-from-color": [{ "mask-t-from": j() }],
        "mask-image-t-to-color": [{ "mask-t-to": j() }],
        "mask-image-r-from-pos": [{ "mask-r-from": K() }],
        "mask-image-r-to-pos": [{ "mask-r-to": K() }],
        "mask-image-r-from-color": [{ "mask-r-from": j() }],
        "mask-image-r-to-color": [{ "mask-r-to": j() }],
        "mask-image-b-from-pos": [{ "mask-b-from": K() }],
        "mask-image-b-to-pos": [{ "mask-b-to": K() }],
        "mask-image-b-from-color": [{ "mask-b-from": j() }],
        "mask-image-b-to-color": [{ "mask-b-to": j() }],
        "mask-image-l-from-pos": [{ "mask-l-from": K() }],
        "mask-image-l-to-pos": [{ "mask-l-to": K() }],
        "mask-image-l-from-color": [{ "mask-l-from": j() }],
        "mask-image-l-to-color": [{ "mask-l-to": j() }],
        "mask-image-x-from-pos": [{ "mask-x-from": K() }],
        "mask-image-x-to-pos": [{ "mask-x-to": K() }],
        "mask-image-x-from-color": [{ "mask-x-from": j() }],
        "mask-image-x-to-color": [{ "mask-x-to": j() }],
        "mask-image-y-from-pos": [{ "mask-y-from": K() }],
        "mask-image-y-to-pos": [{ "mask-y-to": K() }],
        "mask-image-y-from-color": [{ "mask-y-from": j() }],
        "mask-image-y-to-color": [{ "mask-y-to": j() }],
        "mask-image-radial": [{ "mask-radial": [I, A] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": K() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": K() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": j() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": j() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": b() }],
        "mask-image-conic-pos": [{ "mask-conic": [$] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": K() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": K() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": j() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": j() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: O() }],
        "mask-repeat": [{ mask: D() }],
        "mask-size": [{ mask: G() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", I, A] }],
        filter: [{ filter: ["", "none", I, A] }],
        blur: [{ blur: Ja() }],
        brightness: [{ brightness: [$, I, A] }],
        contrast: [{ contrast: [$, I, A] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", v, sl, ll] }],
        "drop-shadow-color": [{ "drop-shadow": j() }],
        grayscale: [{ grayscale: ["", $, I, A] }],
        "hue-rotate": [{ "hue-rotate": [$, I, A] }],
        invert: [{ invert: ["", $, I, A] }],
        saturate: [{ saturate: [$, I, A] }],
        sepia: [{ sepia: ["", $, I, A] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", I, A] }],
        "backdrop-blur": [{ "backdrop-blur": Ja() }],
        "backdrop-brightness": [{ "backdrop-brightness": [$, I, A] }],
        "backdrop-contrast": [{ "backdrop-contrast": [$, I, A] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", $, I, A] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [$, I, A] }],
        "backdrop-invert": [{ "backdrop-invert": ["", $, I, A] }],
        "backdrop-opacity": [{ "backdrop-opacity": [$, I, A] }],
        "backdrop-saturate": [{ "backdrop-saturate": [$, I, A] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", $, I, A] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": k() }],
        "border-spacing-x": [{ "border-spacing-x": k() }],
        "border-spacing-y": [{ "border-spacing-y": k() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              I,
              A,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [$, "initial", I, A] }],
        ease: [{ ease: ["linear", "initial", h, I, A] }],
        delay: [{ delay: [$, I, A] }],
        animate: [{ animate: ["none", m, I, A] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [w, I, A] }],
        "perspective-origin": [{ "perspective-origin": C() }],
        rotate: [{ rotate: On() }],
        "rotate-x": [{ "rotate-x": On() }],
        "rotate-y": [{ "rotate-y": On() }],
        "rotate-z": [{ "rotate-z": On() }],
        scale: [{ scale: Dn() }],
        "scale-x": [{ "scale-x": Dn() }],
        "scale-y": [{ "scale-y": Dn() }],
        "scale-z": [{ "scale-z": Dn() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: hs() }],
        "skew-x": [{ "skew-x": hs() }],
        "skew-y": [{ "skew-y": hs() }],
        transform: [{ transform: [I, A, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: C() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: $n() }],
        "translate-x": [{ "translate-x": $n() }],
        "translate-y": [{ "translate-y": $n() }],
        "translate-z": [{ "translate-z": $n() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: j() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: j() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              I,
              A,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": k() }],
        "scroll-mx": [{ "scroll-mx": k() }],
        "scroll-my": [{ "scroll-my": k() }],
        "scroll-ms": [{ "scroll-ms": k() }],
        "scroll-me": [{ "scroll-me": k() }],
        "scroll-mt": [{ "scroll-mt": k() }],
        "scroll-mr": [{ "scroll-mr": k() }],
        "scroll-mb": [{ "scroll-mb": k() }],
        "scroll-ml": [{ "scroll-ml": k() }],
        "scroll-p": [{ "scroll-p": k() }],
        "scroll-px": [{ "scroll-px": k() }],
        "scroll-py": [{ "scroll-py": k() }],
        "scroll-ps": [{ "scroll-ps": k() }],
        "scroll-pe": [{ "scroll-pe": k() }],
        "scroll-pt": [{ "scroll-pt": k() }],
        "scroll-pr": [{ "scroll-pr": k() }],
        "scroll-pb": [{ "scroll-pb": k() }],
        "scroll-pl": [{ "scroll-pl": k() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", I, A] },
        ],
        fill: [{ fill: ["none", ...j()] }],
        "stroke-w": [{ stroke: [$, Yr, Bt, Qs] }],
        stroke: [{ stroke: ["none", ...j()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  zx = fx(Lx);
function Mx(...e) {
  return zx(ff(e));
}
const Tx = Z0(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
function Ax({ className: e, variant: t, size: r, asChild: n = !1, ...l }) {
  const o = n ? q0 : "button";
  return s.jsx(o, {
    "data-slot": "button",
    className: Mx(Tx({ variant: t, size: r, className: e })),
    ...l,
  });
}
function Ix({
  id: e,
  name: t,
  tagline: r,
  price: n,
  mrp: l,
  image: o,
  onBuyNow: a,
}) {
  const c = l && l > n;
  return s.jsxs("div", {
    className:
      "group bg-white backdrop-blur-sm rounded-xl border border-amber-200/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative",
    children: [
      s.jsx("div", {
        className:
          "absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-300/60 rounded-tl-lg",
      }),
      s.jsx("div", {
        className:
          "absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-300/60 rounded-tr-lg",
      }),
      s.jsx("div", {
        className:
          "absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-300/60 rounded-bl-lg",
      }),
      s.jsx("div", {
        className:
          "absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-300/60 rounded-br-lg",
      }),
      s.jsx("div", {
        className: "relative p-6 flex justify-center",
        children: s.jsxs("div", {
          className:
            "relative w-48 h-48 rounded-lg border-2 border-amber-200/60 overflow-hidden shadow-inner bg-gradient-to-br from-amber-50 to-orange-50",
          children: [
            s.jsx(W0, {
              src: o,
              alt: t,
              className:
                "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out",
            }),
            s.jsx("div", {
              className:
                "absolute inset-0 rounded-lg shadow-inner border border-amber-300/30",
            }),
          ],
        }),
      }),
      s.jsxs("div", {
        className: "px-6 pb-6 text-center space-y-3",
        children: [
          s.jsx("h3", {
            className: "text-lg font-medium text-amber-900",
            style: {
              fontFamily: '"Playfair Display", "Times New Roman", serif',
            },
            children: t,
          }),
          s.jsx("p", {
            className: "text-sm text-amber-700/80 italic",
            children: r,
          }),
          s.jsxs("div", {
            className: "flex items-center justify-center gap-2",
            children: [
              s.jsxs("span", {
                className: "text-xl font-semibold text-amber-900",
                children: ["₹", n],
              }),
              c &&
                s.jsxs("span", {
                  className: "text-sm text-amber-600/60 line-through",
                  children: ["₹", l],
                }),
            ],
          }),
          s.jsx(Ax, {
            onClick: () => a(e),
            className:
              "w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full py-2.5 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg font-medium",
            children: "Buy Now",
          }),
        ],
      }),
    ],
  });
}
const Ox = () => {
    const { products: e, loading: t, error: r } = Sg(),
      [n, l] = y.useState(null),
      [o, a] = y.useState(!1),
      c = (i) => {
        (l(i), a(!0));
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsxs("div", {
          className: "min-h-screen relative overflow-hidden",
          children: [
            s.jsx("div", {
              className:
                "absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
              style: {
                backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)
          `,
              },
            }),
            s.jsx("div", {
              className: "absolute inset-0 opacity-[0.03]",
              style: {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-2 0c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              },
            }),
            s.jsxs("div", {
              className: "relative z-10 container mx-auto px-6 py-12",
              children: [
                s.jsxs("div", {
                  className: "text-center mb-12",
                  children: [
                    s.jsx("h1", {
                      className:
                        "text-4xl md:text-5xl font-medium text-amber-900 mb-4",
                      style: {
                        fontFamily:
                          '"Playfair Display", "Times New Roman", serif',
                      },
                      children: "Premium Ayurvedic Collection",
                    }),
                    s.jsx("p", {
                      className: "text-lg text-amber-700/80 max-w-2xl mx-auto",
                      children:
                        "Authentic formulations rooted in 130+ years of Ayurvedic wisdom, crafted for modern wellness seekers.",
                    }),
                    s.jsxs("div", {
                      className: "flex items-center justify-center mt-8 mb-2",
                      children: [
                        s.jsx("div", {
                          className:
                            "h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32",
                        }),
                        s.jsx("div", {
                          className: "mx-4 w-2 h-2 bg-amber-400 rounded-full",
                        }),
                        s.jsx("div", {
                          className:
                            "h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32",
                        }),
                      ],
                    }),
                  ],
                }),
                r &&
                  s.jsxs("div", {
                    className:
                      "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center",
                    children: [
                      s.jsx("p", {
                        className: "font-semibold",
                        children: "Error loading products",
                      }),
                      s.jsx("p", { className: "text-sm", children: r }),
                    ],
                  }),
                t &&
                  s.jsxs("div", {
                    className: "flex justify-center items-center py-12",
                    children: [
                      s.jsx("div", {
                        className:
                          "animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600",
                      }),
                      s.jsx("span", {
                        className: "ml-3 text-amber-700",
                        children: "Loading products...",
                      }),
                    ],
                  }),
                !t &&
                  s.jsx("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10",
                    children:
                      e.length === 0
                        ? s.jsxs("div", {
                            className: "col-span-full text-center py-12",
                            children: [
                              s.jsx("div", {
                                className:
                                  "text-amber-600 text-lg font-semibold mb-2",
                                children: "No Products Available",
                              }),
                              s.jsx("p", {
                                className: "text-amber-700/60",
                                children:
                                  "Check back later for our premium Ayurvedic collection.",
                              }),
                            ],
                          })
                        : e.map((i, u) =>
                            s.jsxs(
                              "div",
                              {
                                className: "relative",
                                children: [
                                  s.jsx(Ix, {
                                    id: i.id,
                                    name: i.name,
                                    tagline:
                                      i.benefits[0] ||
                                      "Premium Ayurvedic Product",
                                    price: i.price,
                                    mrp: i.original_price,
                                    image: i.image_url,
                                    onBuyNow: () => c(i),
                                  }),
                                  (u + 1) % 3 === 0 &&
                                    u !== e.length - 1 &&
                                    s.jsx("div", {
                                      className:
                                        "hidden lg:block absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-screen",
                                      children: s.jsx("div", {
                                        className:
                                          "h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent",
                                      }),
                                    }),
                                  (u + 1) % 2 === 0 &&
                                    u !== e.length - 1 &&
                                    s.jsx("div", {
                                      className:
                                        "hidden md:block lg:hidden absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-screen",
                                      children: s.jsx("div", {
                                        className:
                                          "h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent",
                                      }),
                                    }),
                                ],
                              },
                              i.id,
                            ),
                          ),
                  }),
                s.jsx("div", {
                  className:
                    "text-center mt-16 pt-8 border-t border-amber-200/50",
                  children: s.jsx("p", {
                    className: "text-amber-700/60 italic",
                    children:
                      '"Wellness rooted in tradition, crafted for today"',
                  }),
                }),
              ],
            }),
          ],
        }),
        s.jsx(U0, { isModalOpen: o, setIsModalOpen: a, product: n }),
      ],
    });
  },
  Dx = () =>
    s.jsxs("section", {
      className:
        "py-16 bg-gradient-to-br from-botanical-green-dark via-botanical-green to-antique-brown-dark text-cream-50 relative overflow-hidden bg-botanical",
      children: [
        s.jsxs("div", {
          className: "absolute inset-0 opacity-15",
          children: [
            s.jsx("div", {
              className: "absolute top-10 left-10 w-40 h-40",
              children: s.jsx("svg", {
                viewBox: "0 0 100 100",
                className: "w-full h-full text-current",
                children: s.jsxs("g", {
                  opacity: "0.2",
                  children: [
                    s.jsx("path", {
                      d: "M50 10c-10 0-18 8-18 18 0 16 18 42 18 42s18-26 18-42c0-10-8-18-18-18z",
                      fill: "currentColor",
                    }),
                    s.jsx("circle", {
                      cx: "50",
                      cy: "28",
                      r: "10",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                    }),
                    s.jsx("circle", {
                      cx: "50",
                      cy: "28",
                      r: "4",
                      fill: "#D4AF37",
                      opacity: "0.4",
                    }),
                  ],
                }),
              }),
            }),
            s.jsx("div", {
              className: "absolute bottom-10 right-10 w-36 h-36",
              children: s.jsx("svg", {
                viewBox: "0 0 80 80",
                className: "w-full h-full text-current",
                children: s.jsxs("g", {
                  opacity: "0.2",
                  children: [
                    s.jsx("circle", {
                      cx: "40",
                      cy: "40",
                      r: "30",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                    }),
                    s.jsx("path", {
                      d: "M40 10v60M10 40h60",
                      stroke: "currentColor",
                      strokeWidth: "1",
                    }),
                    s.jsx("circle", {
                      cx: "40",
                      cy: "40",
                      r: "15",
                      fill: "none",
                      stroke: "#D4AF37",
                      strokeWidth: "1.5",
                      opacity: "0.4",
                    }),
                    s.jsx("circle", {
                      cx: "40",
                      cy: "40",
                      r: "5",
                      fill: "#C9A66B",
                      opacity: "0.3",
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        s.jsx("div", {
          className:
            "absolute top-1/4 right-1/4 w-6 h-6 animate-float opacity-30",
          children: s.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-full h-full text-heritage-gold",
            children: s.jsx("path", {
              d: "M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z",
              fill: "currentColor",
            }),
          }),
        }),
        s.jsxs("div", {
          className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            s.jsxs("div", {
              className: "text-center mb-12",
              children: [
                s.jsx("h2", {
                  className:
                    "font-playfair text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg",
                  children: "Connect With Us",
                }),
                s.jsx("div", {
                  className:
                    "w-32 h-1 bg-gradient-to-r from-heritage-gold to-ayur-gold mx-auto shadow-lg",
                }),
              ],
            }),
            s.jsxs("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12",
              children: [
                s.jsxs("div", {
                  className: "text-center group",
                  children: [
                    s.jsx("div", {
                      className:
                        "inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-ayur-red/20 to-heritage-gold/20 rounded-full mb-4 group-hover:from-ayur-red/30 group-hover:to-heritage-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg",
                      children: s.jsx(Ka, { className: "w-8 h-8" }),
                    }),
                    s.jsx("h3", {
                      className: "font-playfair text-xl font-bold mb-2",
                      children: "Email",
                    }),
                    s.jsx("a", {
                      href: "mailto:info@sanchaaar.com",
                      className:
                        "font-lora hover:text-heritage-gold transition-colors",
                      children: "info@sanchaaar.com",
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "text-center group",
                  children: [
                    s.jsx("div", {
                      className:
                        "inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-ayur-red/20 to-heritage-gold/20 rounded-full mb-4 group-hover:from-ayur-red/30 group-hover:to-heritage-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg",
                      children: s.jsx(Xa, { className: "w-8 h-8" }),
                    }),
                    s.jsx("h3", {
                      className: "font-playfair text-xl font-bold mb-2",
                      children: "Phone",
                    }),
                    s.jsx("a", {
                      href: "tel:+919876543210",
                      className:
                        "font-lora hover:text-heritage-gold transition-colors",
                      children: "+91 98765 43210",
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "text-center group",
                  children: [
                    s.jsx("div", {
                      className:
                        "inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-green-600/20 to-green-500/20 rounded-full mb-4 group-hover:from-green-600/30 group-hover:to-green-500/30 transition-all duration-300 border border-green-400/20 shadow-lg",
                      children: s.jsx(Vl, { className: "w-8 h-8" }),
                    }),
                    s.jsx("h3", {
                      className: "font-playfair text-xl font-bold mb-2",
                      children: "WhatsApp",
                    }),
                    s.jsx("a", {
                      href: "https://wa.me/919876543210",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className:
                        "font-lora hover:text-heritage-gold transition-colors",
                      children: "Chat with us",
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "text-center group",
                  children: [
                    s.jsx("div", {
                      className:
                        "inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-heritage-gold/20 to-ayur-gold/20 rounded-full mb-4 group-hover:from-heritage-gold/30 group-hover:to-ayur-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg",
                      children: s.jsx(cf, { className: "w-8 h-8" }),
                    }),
                    s.jsx("h3", {
                      className: "font-playfair text-xl font-bold mb-2",
                      children: "Heritage Store",
                    }),
                    s.jsx("p", {
                      className: "font-lora",
                      children: "Mumbai, India",
                    }),
                  ],
                }),
              ],
            }),
            s.jsx("div", {
              className: "border-t border-heritage-gold/20 pt-8",
              children: s.jsxs("div", {
                className:
                  "flex flex-col md:flex-row justify-between items-center",
                children: [
                  s.jsxs("div", {
                    className: "mb-4 md:mb-0",
                    children: [
                      s.jsxs("p", {
                        className: "font-lora text-lg mb-2",
                        children: [
                          s.jsx("strong", { children: "Sanchaaar" }),
                          " - 135 Years of Ayurvedic Heritage",
                        ],
                      }),
                      s.jsx("p", {
                        className: "font-noto text-sm text-cream-200",
                        children: "Since 1890 • Pure, Potent, Proven Remedies",
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    className: "flex space-x-4",
                    children: [
                      s.jsx("a", {
                        href: "#",
                        className:
                          "flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 text-cream-50 rounded-full hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 group border border-blue-400/20 shadow-lg",
                        children: s.jsx(of, {
                          className:
                            "w-6 h-6 group-hover:scale-110 transition-transform",
                        }),
                      }),
                      s.jsx("a", {
                        href: "#",
                        className:
                          "flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600/20 to-pink-500/20 text-cream-50 rounded-full hover:from-pink-600/30 hover:to-pink-500/30 transition-all duration-300 group border border-pink-400/20 shadow-lg",
                        children: s.jsx(af, {
                          className:
                            "w-6 h-6 group-hover:scale-110 transition-transform",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  $x = () =>
    s.jsxs("div", {
      className: "animate-fade-in",
      children: [s.jsx(A0, {}), s.jsx(Ox, {}), s.jsx(I0, {}), s.jsx(Dx, {})],
    }),
  Fx = () =>
    s.jsxs("div", {
      className: "min-h-screen bg-cream-50 animate-fade-in",
      children: [
        s.jsxs("section", {
          className:
            "relative py-24 bg-gradient-to-br from-cream-50 to-cream-100 bg-parchment overflow-hidden",
          children: [
            s.jsx("div", {
              className: "absolute top-0 left-0 w-64 h-64 opacity-5",
              children: s.jsxs("svg", {
                viewBox: "0 0 200 200",
                className: "w-full h-full text-botanical-green",
                children: [
                  s.jsx("path", {
                    d: "M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z",
                    fill: "currentColor",
                  }),
                  s.jsx("path", {
                    d: "M20 50c0-5 4-9 9-9 8 0 21 9 21 9s-13 9-21 9c-5 0-9-4-9-9zm12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z",
                    fill: "currentColor",
                  }),
                ],
              }),
            }),
            s.jsx("div", {
              className:
                "absolute top-0 right-0 w-64 h-64 opacity-5 rotate-180",
              children: s.jsx("svg", {
                viewBox: "0 0 200 200",
                className: "w-full h-full text-botanical-green",
                children: s.jsx("path", {
                  d: "M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z",
                  fill: "currentColor",
                }),
              }),
            }),
            s.jsxs("div", {
              className:
                "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
              children: [
                s.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: s.jsx("div", {
                    className:
                      "w-20 h-20 bg-gradient-to-br from-ayur-red to-ayur-red/90 rounded-full flex items-center justify-center shadow-xl",
                    children: s.jsx(ms, { className: "w-10 h-10 text-white" }),
                  }),
                }),
                s.jsxs("h1", {
                  className:
                    "font-playfair text-5xl sm:text-6xl font-bold text-antique-brown mb-6",
                  children: [
                    "Our ",
                    s.jsx("span", {
                      className: "text-ayur-red",
                      children: "Heritage Story",
                    }),
                  ],
                }),
                s.jsx("p", {
                  className:
                    "font-lora text-xl sm:text-2xl text-antique-brown/80 max-w-3xl mx-auto leading-relaxed",
                  children:
                    "Since 1890 – Four generations of Ayurvedic excellence, bringing you authentic herbal remedies crafted with traditional wisdom.",
                }),
                s.jsxs("div", {
                  className: "flex items-center justify-center mt-8",
                  children: [
                    s.jsx("div", { className: "w-20 h-px bg-ayur-gold" }),
                    s.jsx("div", {
                      className: "mx-4 w-4 h-4 bg-ayur-gold rounded-full",
                    }),
                    s.jsx("div", { className: "w-20 h-px bg-ayur-gold" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        s.jsx("section", {
          className: "py-20 bg-white relative",
          children: s.jsx("div", {
            className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
            children: s.jsxs("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("h2", {
                      className:
                        "font-playfair text-4xl font-bold text-botanical-green mb-6",
                      children: "135 Years of Tradition",
                    }),
                    s.jsx("div", { className: "w-16 h-1 bg-ayur-gold mb-8" }),
                    s.jsxs("div", {
                      className:
                        "space-y-6 font-lora text-lg text-antique-brown/80 leading-relaxed",
                      children: [
                        s.jsx("p", {
                          children:
                            "Founded in 1890, Sanchaaar began as a small apothecary in the heart of India, where our founder, a renowned Ayurvedic physician, dedicated his life to preserving ancient healing traditions.",
                        }),
                        s.jsx("p", {
                          children:
                            "Through four generations, we have maintained our commitment to authenticity, using only the purest herbs and time-tested formulations passed down through our family lineage.",
                        }),
                        s.jsx("p", {
                          children:
                            "Today, we continue this legacy with the same passion and dedication, bringing you remedies that have healed countless lives across more than a century.",
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsx("div", {
                  className: "relative",
                  children: s.jsx("div", {
                    className:
                      "bg-cream-100 p-8 rounded-2xl shadow-lg border border-cream-200",
                    children: s.jsxs("div", {
                      className: "text-center",
                      children: [
                        s.jsx("div", {
                          className:
                            "inline-flex items-center justify-center w-16 h-16 bg-ayur-red rounded-full mb-4",
                          children: s.jsx(hc, {
                            className: "w-8 h-8 text-white",
                          }),
                        }),
                        s.jsx("h3", {
                          className:
                            "font-playfair text-2xl font-bold text-antique-brown mb-4",
                          children: "Heritage Timeline",
                        }),
                        s.jsxs("div", {
                          className: "space-y-4 text-left",
                          children: [
                            s.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                s.jsx("div", {
                                  className:
                                    "w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0",
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("span", {
                                      className:
                                        "font-noto font-bold text-ayur-red",
                                      children: "1890",
                                    }),
                                    s.jsx("p", {
                                      className:
                                        "font-lora text-sm text-antique-brown/70",
                                      children:
                                        "Founded by Vaidya Ramesh Sharma",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                s.jsx("div", {
                                  className:
                                    "w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0",
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("span", {
                                      className:
                                        "font-noto font-bold text-ayur-red",
                                      children: "1925",
                                    }),
                                    s.jsx("p", {
                                      className:
                                        "font-lora text-sm text-antique-brown/70",
                                      children: "Second generation expansion",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                s.jsx("div", {
                                  className:
                                    "w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0",
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("span", {
                                      className:
                                        "font-noto font-bold text-ayur-red",
                                      children: "1975",
                                    }),
                                    s.jsx("p", {
                                      className:
                                        "font-lora text-sm text-antique-brown/70",
                                      children: "Modern manufacturing facility",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                s.jsx("div", {
                                  className:
                                    "w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0",
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("span", {
                                      className:
                                        "font-noto font-bold text-ayur-red",
                                      children: "2024",
                                    }),
                                    s.jsx("p", {
                                      className:
                                        "font-lora text-sm text-antique-brown/70",
                                      children: "Digital transformation",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
        s.jsx("section", {
          className: "py-20 bg-cream-50 bg-parchment",
          children: s.jsxs("div", {
            className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              s.jsxs("div", {
                className: "text-center mb-16",
                children: [
                  s.jsx("h2", {
                    className:
                      "font-playfair text-4xl font-bold text-botanical-green mb-6",
                    children: "Our Vision & Values",
                  }),
                  s.jsx("div", { className: "w-24 h-1 bg-ayur-gold mx-auto" }),
                ],
              }),
              s.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                children: [
                  s.jsxs("div", {
                    className:
                      "text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow",
                    children: [
                      s.jsx("div", {
                        className:
                          "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ayur-red to-ayur-red/80 rounded-full mb-6",
                        children: s.jsx(Vg, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      s.jsx("h3", {
                        className:
                          "font-playfair text-2xl font-bold text-antique-brown mb-4",
                        children: "Authenticity",
                      }),
                      s.jsx("p", {
                        className:
                          "font-lora text-antique-brown/70 leading-relaxed",
                        children:
                          "Every formulation follows traditional recipes, ensuring the purity and potency that has made Ayurveda trusted for millennia.",
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    className:
                      "text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow",
                    children: [
                      s.jsx("div", {
                        className:
                          "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-botanical-green to-botanical-green/80 rounded-full mb-6",
                        children: s.jsx(hc, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      s.jsx("h3", {
                        className:
                          "font-playfair text-2xl font-bold text-antique-brown mb-4",
                        children: "Quality",
                      }),
                      s.jsx("p", {
                        className:
                          "font-lora text-antique-brown/70 leading-relaxed",
                        children:
                          "We source only the finest herbs and maintain rigorous quality standards throughout our manufacturing process.",
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    className:
                      "text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow",
                    children: [
                      s.jsx("div", {
                        className:
                          "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ayur-gold to-ayur-gold/80 rounded-full mb-6",
                        children: s.jsx(P0, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      s.jsx("h3", {
                        className:
                          "font-playfair text-2xl font-bold text-antique-brown mb-4",
                        children: "Trust",
                      }),
                      s.jsx("p", {
                        className:
                          "font-lora text-antique-brown/70 leading-relaxed",
                        children:
                          "Built over 135 years, our reputation is founded on the countless lives we've helped heal naturally.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        s.jsxs("section", {
          className:
            "py-20 bg-antique-brown text-cream-50 relative overflow-hidden",
          children: [
            s.jsxs("div", {
              className: "absolute inset-0 opacity-5",
              children: [
                s.jsx("div", {
                  className: "absolute bottom-10 left-10 w-32 h-32",
                  children: s.jsxs("svg", {
                    viewBox: "0 0 100 100",
                    className: "w-full h-full text-current",
                    children: [
                      s.jsx("circle", {
                        cx: "50",
                        cy: "50",
                        r: "25",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                      }),
                      s.jsx("path", {
                        d: "M50 25v50M25 50h50",
                        stroke: "currentColor",
                        strokeWidth: "1",
                      }),
                    ],
                  }),
                }),
                s.jsx("div", {
                  className: "absolute top-10 right-10 w-28 h-28",
                  children: s.jsx("svg", {
                    viewBox: "0 0 80 80",
                    className: "w-full h-full text-current",
                    children: s.jsx("path", {
                      d: "M40 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15z",
                      fill: "currentColor",
                    }),
                  }),
                }),
              ],
            }),
            s.jsxs("div", {
              className:
                "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
              children: [
                s.jsxs("h2", {
                  className: "font-playfair text-4xl font-bold mb-8",
                  children: [
                    "Message from Our ",
                    s.jsx("span", {
                      className: "text-ayur-gold",
                      children: "Heritage Keeper",
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className:
                    "bg-ayur-red/10 p-8 rounded-2xl border border-ayur-red/20 mb-8",
                  children: [
                    s.jsx("blockquote", {
                      className:
                        "font-lora text-xl leading-relaxed italic mb-6",
                      children: `"As the fourth-generation custodian of this sacred knowledge, I am honored to continue our family's mission of bringing authentic Ayurvedic healing to the world. Every product we create carries within it the wisdom of our ancestors and the promise of natural wellness for future generations."`,
                    }),
                    s.jsxs("div", {
                      className: "text-center",
                      children: [
                        s.jsx("p", {
                          className:
                            "font-noto font-semibold text-ayur-gold text-lg",
                          children: "Dr. Rajesh Sharma",
                        }),
                        s.jsx("p", {
                          className: "font-noto text-cream-200",
                          children: "Fourth Generation Heritage Keeper",
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "flex items-center justify-center",
                  children: [
                    s.jsx("div", { className: "w-20 h-px bg-ayur-gold" }),
                    s.jsx("div", {
                      className: "mx-4 w-4 h-4 bg-ayur-gold rounded-full",
                    }),
                    s.jsx("div", { className: "w-20 h-px bg-ayur-gold" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  Ux = () => {
    const {
        orders: e,
        loading: t,
        error: r,
        updateOrder: n,
        fetchOrders: l,
      } = Ya(),
      [o, a] = y.useState(""),
      [c, i] = y.useState("all"),
      [u, p] = y.useState("created_at"),
      [f, g] = y.useState("desc"),
      [v, x] = y.useState(1),
      [w, N] = y.useState(10),
      [h, m] = y.useState(null),
      [d, b] = y.useState(!1),
      C = async () => {
        try {
          await l();
        } catch (L) {
          console.error("Failed to refresh orders:", L);
        }
      },
      R = y.useMemo(() => {
        let L = e;
        if (o) {
          const j = o.toLowerCase();
          L = L.filter(
            (O) =>
              O.order_number.toLowerCase().includes(j) ||
              O.customer_name.toLowerCase().includes(j) ||
              (O.razorpay_payment_id &&
                O.razorpay_payment_id.toLowerCase().includes(j)),
          );
        }
        return (c !== "all" && (L = L.filter((j) => j.order_status === c)), L);
      }, [e, o, c]),
      E = y.useMemo(
        () =>
          [...R].sort((L, j) => {
            let O = L[u],
              D = j[u];
            return (
              u === "created_at"
                ? ((O = new Date(O).getTime()), (D = new Date(D).getTime()))
                : typeof O == "string" &&
                  ((O = O.toLowerCase()), (D = D.toLowerCase())),
              f === "asc" ? (O > D ? 1 : -1) : O < D ? 1 : -1
            );
          }),
        [R, u, f],
      ),
      k = y.useMemo(() => {
        const L = (v - 1) * w,
          j = L + w;
        return E.slice(L, j);
      }, [E, v, w]),
      P = (L) => {
        u === L ? g(f === "asc" ? "desc" : "asc") : (p(L), g("asc"));
      },
      M = (L) => {
        (m(L), b(!0));
      },
      S = async (L, j) => {
        try {
          (await n(L, j), b(!1), m(null));
        } catch (O) {
          console.error("Failed to update order:", O);
        }
      },
      z = (L) => {
        switch (L) {
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "confirmed":
            return "bg-blue-100 text-blue-800 border-blue-200";
          case "shipped":
            return "bg-purple-100 text-purple-800 border-purple-200";
          case "delivered":
            return "bg-green-100 text-green-800 border-green-200";
          case "cancelled":
            return "bg-red-100 text-red-800 border-red-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      },
      ne = (L) => {
        switch (L) {
          case "paid":
            return "bg-green-100 text-green-800 border-green-200";
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "failed":
            return "bg-red-100 text-red-800 border-red-200";
          case "refunded":
            return "bg-gray-100 text-gray-800 border-gray-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      },
      Ie = (L) =>
        new Date(L).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: !0,
        }),
      oe = (L) => (L ? (L.length > 6 ? `...${L.slice(-6)}` : L) : "N/A"),
      W = Math.ceil(E.length / w);
    return t
      ? s.jsx("div", {
          className: "flex items-center justify-center h-64",
          children: s.jsx("div", {
            className:
              "animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-red",
          }),
        })
      : r
        ? s.jsxs("div", {
            className:
              "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",
            children: [
              s.jsx("p", {
                className: "font-semibold",
                children: "Error loading orders",
              }),
              s.jsx("p", { children: r }),
              s.jsx("button", {
                onClick: l,
                className:
                  "mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
                children: "Retry",
              }),
            ],
          })
        : s.jsxs("div", {
            className: "p-4 sm:p-6 bg-gray-50 min-h-screen",
            children: [
              s.jsxs("div", {
                className: "mb-6",
                children: [
                  s.jsx("h1", {
                    className:
                      "text-2xl sm:text-3xl font-bold text-gray-900 mb-2",
                    children: "Orders Management",
                  }),
                  s.jsx("p", {
                    className: "text-gray-600 text-sm sm:text-base",
                    children: "Manage and track customer orders",
                  }),
                ],
              }),
              s.jsx("div", {
                className:
                  "bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sticky top-0 z-10",
                children: s.jsxs("div", {
                  className: "flex flex-col gap-4",
                  children: [
                    s.jsx("div", {
                      className: "w-full",
                      children: s.jsxs("div", {
                        className: "relative",
                        children: [
                          s.jsx(x0, {
                            className:
                              "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5",
                          }),
                          s.jsx("input", {
                            type: "text",
                            placeholder:
                              "Search by order ID, customer name, or payment ID...",
                            value: o,
                            onChange: (L) => a(L.target.value),
                            className:
                              "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          }),
                        ],
                      }),
                    }),
                    s.jsxs("div", {
                      className: "flex flex-wrap gap-2",
                      children: [
                        [
                          { key: "all", label: "All", count: e.length },
                          {
                            key: "pending",
                            label: "Pending",
                            count: e.filter((L) => L.order_status === "pending")
                              .length,
                          },
                          {
                            key: "confirmed",
                            label: "Processing",
                            count: e.filter(
                              (L) => L.order_status === "confirmed",
                            ).length,
                          },
                          {
                            key: "shipped",
                            label: "Shipped",
                            count: e.filter((L) => L.order_status === "shipped")
                              .length,
                          },
                          {
                            key: "delivered",
                            label: "Delivered",
                            count: e.filter(
                              (L) => L.order_status === "delivered",
                            ).length,
                          },
                          {
                            key: "cancelled",
                            label: "Cancelled",
                            count: e.filter(
                              (L) => L.order_status === "cancelled",
                            ).length,
                          },
                        ].map(({ key: L, label: j, count: O }) =>
                          s.jsxs(
                            "button",
                            {
                              onClick: () => i(L),
                              className: `px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${c === L ? "bg-ayur-red text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                              children: [
                                s.jsxs("span", {
                                  className: "hidden sm:inline",
                                  children: [j, " (", O, ")"],
                                }),
                                s.jsx("span", {
                                  className: "sm:hidden",
                                  children: j,
                                }),
                              ],
                            },
                            L,
                          ),
                        ),
                        s.jsxs("button", {
                          onClick: C,
                          disabled: t,
                          className:
                            "px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm",
                          children: [
                            s.jsx(m0, {
                              className: `w-4 h-4 ${t ? "animate-spin" : ""}`,
                            }),
                            s.jsx("span", {
                              className: "hidden sm:inline",
                              children: "Refresh",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsxs("div", {
                className:
                  "mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
                children: [
                  s.jsxs("p", {
                    className: "text-sm text-gray-600",
                    children: [
                      "Showing ",
                      k.length,
                      " of ",
                      E.length,
                      " orders",
                    ],
                  }),
                  s.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      s.jsx("label", {
                        className: "text-sm text-gray-600",
                        children: "Items per page:",
                      }),
                      s.jsxs("select", {
                        value: w,
                        onChange: (L) => N(Number(L.target.value)),
                        className:
                          "border border-gray-300 rounded px-2 py-1 text-sm",
                        children: [
                          s.jsx("option", { value: 10, children: "10" }),
                          s.jsx("option", { value: 20, children: "20" }),
                          s.jsx("option", { value: 50, children: "50" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className:
                  "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
                children: [
                  s.jsx("div", {
                    className: "overflow-x-auto",
                    children: s.jsxs("table", {
                      className: "w-full min-w-[1200px]",
                      children: [
                        s.jsx("thead", {
                          className: "bg-gray-50 border-b border-gray-200",
                          children: s.jsxs("tr", {
                            children: [
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32",
                                children: s.jsxs("button", {
                                  onClick: () => P("customer_name"),
                                  className:
                                    "flex items-center gap-1 hover:text-gray-700",
                                  children: [
                                    "Order ID",
                                    u === "customer_name" &&
                                      (f === "asc"
                                        ? s.jsx(Gr, { className: "w-4 h-4" })
                                        : s.jsx(Qr, { className: "w-4 h-4" })),
                                  ],
                                }),
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48",
                                children: s.jsxs("button", {
                                  onClick: () => P("customer_name"),
                                  className:
                                    "flex items-center gap-1 hover:text-gray-700",
                                  children: [
                                    "Customer",
                                    u === "customer_name" &&
                                      (f === "asc"
                                        ? s.jsx(Gr, { className: "w-4 h-4" })
                                        : s.jsx(Qr, { className: "w-4 h-4" })),
                                  ],
                                }),
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40",
                                children: s.jsxs("button", {
                                  onClick: () => P("created_at"),
                                  className:
                                    "flex items-center gap-1 hover:text-gray-700",
                                  children: [
                                    "Order Date",
                                    u === "created_at" &&
                                      (f === "asc"
                                        ? s.jsx(Gr, { className: "w-4 h-4" })
                                        : s.jsx(Qr, { className: "w-4 h-4" })),
                                  ],
                                }),
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32",
                                children: s.jsxs("button", {
                                  onClick: () => P("order_status"),
                                  className:
                                    "flex items-center gap-1 hover:text-gray-700",
                                  children: [
                                    "Order Status",
                                    u === "order_status" &&
                                      (f === "asc"
                                        ? s.jsx(Gr, { className: "w-4 h-4" })
                                        : s.jsx(Qr, { className: "w-4 h-4" })),
                                  ],
                                }),
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36",
                                children: s.jsxs("button", {
                                  onClick: () => P("payment_status"),
                                  className:
                                    "flex items-center gap-1 hover:text-gray-700",
                                  children: [
                                    "Payment Status",
                                    u === "payment_status" &&
                                      (f === "asc"
                                        ? s.jsx(Gr, { className: "w-4 h-4" })
                                        : s.jsx(Qr, { className: "w-4 h-4" })),
                                  ],
                                }),
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32",
                                children: "Payment ID",
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24",
                                children: "Total",
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24",
                                children: "Actions",
                              }),
                            ],
                          }),
                        }),
                        s.jsx("tbody", {
                          className: "bg-white divide-y divide-gray-200",
                          children: k.map((L) =>
                            s.jsxs(
                              "tr",
                              {
                                className: "hover:bg-gray-50 transition-colors",
                                children: [
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsx("button", {
                                      onClick: () => M(L),
                                      className:
                                        "text-ayur-red hover:text-ayur-red/80 font-medium underline text-sm",
                                      children: L.order_number || L.id,
                                    }),
                                  }),
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsxs("div", {
                                      className: "flex items-center min-w-0",
                                      children: [
                                        s.jsx(uf, {
                                          className:
                                            "w-4 h-4 text-gray-400 mr-2 flex-shrink-0",
                                        }),
                                        s.jsxs("div", {
                                          className: "min-w-0",
                                          children: [
                                            s.jsx("div", {
                                              className:
                                                "text-sm font-medium text-gray-900 truncate",
                                              children:
                                                L.customer_name || "Unknown",
                                            }),
                                            s.jsx("div", {
                                              className:
                                                "text-sm text-gray-500 truncate",
                                              children: L.customer_email,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsxs("div", {
                                      className: "flex items-center",
                                      children: [
                                        s.jsx(lf, {
                                          className:
                                            "w-4 h-4 text-gray-400 mr-2 flex-shrink-0",
                                        }),
                                        s.jsxs("div", {
                                          className: "text-sm text-gray-900",
                                          children: [
                                            s.jsx("div", {
                                              className: "hidden sm:block",
                                              children: Ie(L.created_at),
                                            }),
                                            s.jsx("div", {
                                              className: "sm:hidden text-xs",
                                              children: new Date(
                                                L.created_at,
                                              ).toLocaleDateString("en-GB"),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsxs("span", {
                                      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${z(L.order_status || "pending")}`,
                                      children: [
                                        s.jsx("span", {
                                          className: "hidden sm:inline",
                                          children:
                                            (L.order_status || "pending")
                                              .charAt(0)
                                              .toUpperCase() +
                                            (L.order_status || "pending").slice(
                                              1,
                                            ),
                                        }),
                                        s.jsx("span", {
                                          className: "sm:hidden",
                                          children: (
                                            L.order_status || "pending"
                                          )
                                            .charAt(0)
                                            .toUpperCase(),
                                        }),
                                      ],
                                    }),
                                  }),
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsxs("span", {
                                      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${ne(L.payment_status || "pending")}`,
                                      children: [
                                        s.jsx("span", {
                                          className: "hidden sm:inline",
                                          children:
                                            (L.payment_status || "pending")
                                              .charAt(0)
                                              .toUpperCase() +
                                            (
                                              L.payment_status || "pending"
                                            ).slice(1),
                                        }),
                                        s.jsx("span", {
                                          className: "sm:hidden",
                                          children: (
                                            L.payment_status || "pending"
                                          )
                                            .charAt(0)
                                            .toUpperCase(),
                                        }),
                                      ],
                                    }),
                                  }),
                                  s.jsx("td", {
                                    className: "px-4 sm:px-6 py-4",
                                    children: s.jsxs("div", {
                                      className: "flex items-center",
                                      children: [
                                        s.jsx(fs, {
                                          className:
                                            "w-4 h-4 text-gray-400 mr-2 flex-shrink-0",
                                        }),
                                        s.jsx("span", {
                                          className:
                                            "text-sm text-gray-900 cursor-help truncate",
                                          title: L.razorpay_payment_id || "N/A",
                                          children: oe(L.razorpay_payment_id),
                                        }),
                                      ],
                                    }),
                                  }),
                                  s.jsxs("td", {
                                    className:
                                      "px-4 sm:px-6 py-4 text-sm font-medium text-gray-900",
                                    children: ["₹", L.total_amount || 0],
                                  }),
                                  s.jsx("td", {
                                    className:
                                      "px-4 sm:px-6 py-4 text-sm font-medium",
                                    children: s.jsxs("button", {
                                      onClick: () => M(L),
                                      className:
                                        "text-ayur-red hover:text-ayur-red/80 flex items-center gap-1",
                                      children: [
                                        s.jsx(sf, { className: "w-4 h-4" }),
                                        s.jsx("span", {
                                          className: "hidden sm:inline",
                                          children: "View",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              },
                              L.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  W > 1 &&
                    s.jsx("div", {
                      className:
                        "bg-white px-4 py-3 border-t border-gray-200 sm:px-6",
                      children: s.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          s.jsxs("div", {
                            className: "flex-1 flex justify-between sm:hidden",
                            children: [
                              s.jsx("button", {
                                onClick: () => x(Math.max(1, v - 1)),
                                disabled: v === 1,
                                className:
                                  "relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "Previous",
                              }),
                              s.jsxs("span", {
                                className:
                                  "flex items-center text-sm text-gray-700",
                                children: ["Page ", v, " of ", W],
                              }),
                              s.jsx("button", {
                                onClick: () => x(Math.min(W, v + 1)),
                                disabled: v === W,
                                className:
                                  "relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "Next",
                              }),
                            ],
                          }),
                          s.jsxs("div", {
                            className:
                              "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between",
                            children: [
                              s.jsx("div", {
                                children: s.jsxs("p", {
                                  className: "text-sm text-gray-700",
                                  children: [
                                    "Showing page ",
                                    s.jsx("span", {
                                      className: "font-medium",
                                      children: v,
                                    }),
                                    " of",
                                    " ",
                                    s.jsx("span", {
                                      className: "font-medium",
                                      children: W,
                                    }),
                                  ],
                                }),
                              }),
                              s.jsx("div", {
                                children: s.jsxs("nav", {
                                  className:
                                    "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                                  children: [
                                    s.jsx("button", {
                                      onClick: () => x(Math.max(1, v - 1)),
                                      disabled: v === 1,
                                      className:
                                        "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                      children: "Previous",
                                    }),
                                    Array.from(
                                      { length: Math.min(5, W) },
                                      (L, j) => {
                                        const D =
                                          Math.max(1, Math.min(v - 2, W - 4)) +
                                          j;
                                        return D > W
                                          ? null
                                          : s.jsx(
                                              "button",
                                              {
                                                onClick: () => x(D),
                                                className: `relative inline-flex items-center px-3 py-2 border text-sm font-medium ${D === v ? "z-10 bg-ayur-red border-ayur-red text-white" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`,
                                                children: D,
                                              },
                                              D,
                                            );
                                      },
                                    ),
                                    s.jsx("button", {
                                      onClick: () => x(Math.min(W, v + 1)),
                                      disabled: v === W,
                                      className:
                                        "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                      children: "Next",
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                ],
              }),
              d &&
                h &&
                s.jsx(Bx, {
                  order: h,
                  onClose: () => {
                    (b(!1), m(null));
                  },
                  onUpdate: S,
                }),
            ],
          });
  },
  Bx = ({ order: e, onClose: t, onUpdate: r }) => {
    const [n, l] = y.useState(e.order_status),
      [o, a] = y.useState(!1),
      c = (f) => {
        switch (f) {
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "confirmed":
            return "bg-blue-100 text-blue-800 border-blue-200";
          case "shipped":
            return "bg-purple-100 text-purple-800 border-purple-200";
          case "delivered":
            return "bg-green-100 text-green-800 border-green-200";
          case "cancelled":
            return "bg-red-100 text-red-800 border-red-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      },
      i = (f) => {
        switch (f) {
          case "paid":
            return "bg-green-100 text-green-800 border-green-200";
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "failed":
            return "bg-red-100 text-red-800 border-red-200";
          case "refunded":
            return "bg-gray-100 text-gray-800 border-gray-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      },
      u = (f) =>
        new Date(f).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: !0,
        }),
      p = async () => {
        if (n !== e.order_status)
          try {
            (a(!0), await r(e.id, { order_status: n }));
          } catch (f) {
            (console.error("Failed to update order status:", f),
              alert("Failed to update order status. Please try again."));
          } finally {
            a(!1);
          }
      };
    return s.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
      children: s.jsxs("div", {
        className:
          "bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",
        children: [
          s.jsxs("div", {
            className:
              "flex items-center justify-between p-6 border-b border-gray-200",
            children: [
              s.jsxs("div", {
                children: [
                  s.jsx("h2", {
                    className: "text-2xl font-bold text-gray-900",
                    children: "Order Details",
                  }),
                  s.jsxs("p", {
                    className: "text-gray-600",
                    children: ["Order #", e.order_number || e.id],
                  }),
                ],
              }),
              s.jsx("button", {
                onClick: t,
                className:
                  "p-2 hover:bg-gray-100 rounded-full transition-colors",
                children: s.jsx(ps, { className: "w-6 h-6 text-gray-600" }),
              }),
            ],
          }),
          s.jsxs("div", {
            className: "p-6 space-y-6",
            children: [
              s.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Order Status",
                      }),
                      s.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [
                          s.jsx("span", {
                            className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${c(e.order_status || "pending")}`,
                            children:
                              (e.order_status || "pending")
                                .charAt(0)
                                .toUpperCase() +
                              (e.order_status || "pending").slice(1),
                          }),
                          s.jsxs("select", {
                            value: n,
                            onChange: (f) => l(f.target.value),
                            className:
                              "border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-ayur-red focus:border-transparent",
                            children: [
                              s.jsx("option", {
                                value: "pending",
                                children: "Pending",
                              }),
                              s.jsx("option", {
                                value: "confirmed",
                                children: "Processing",
                              }),
                              s.jsx("option", {
                                value: "shipped",
                                children: "Shipped",
                              }),
                              s.jsx("option", {
                                value: "delivered",
                                children: "Delivered",
                              }),
                              s.jsx("option", {
                                value: "cancelled",
                                children: "Cancelled",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Payment Status",
                      }),
                      s.jsx("span", {
                        className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${i(e.payment_status || "pending")}`,
                        children:
                          (e.payment_status || "pending")
                            .charAt(0)
                            .toUpperCase() +
                          (e.payment_status || "pending").slice(1),
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "bg-gray-50 rounded-lg p-4",
                children: [
                  s.jsxs("h3", {
                    className:
                      "text-lg font-semibold text-gray-900 mb-4 flex items-center",
                    children: [
                      s.jsx(uf, { className: "w-5 h-5 mr-2" }),
                      "Customer Information",
                    ],
                  }),
                  s.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Name",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900",
                            children: e.customer_name || "Unknown",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Email",
                          }),
                          s.jsxs("p", {
                            className: "text-gray-900 flex items-center",
                            children: [
                              s.jsx(Ka, {
                                className: "w-4 h-4 mr-2 text-gray-400",
                              }),
                              e.customer_email || "N/A",
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Phone",
                          }),
                          s.jsxs("p", {
                            className: "text-gray-900 flex items-center",
                            children: [
                              s.jsx(Xa, {
                                className: "w-4 h-4 mr-2 text-gray-400",
                              }),
                              e.customer_phone || "N/A",
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Address",
                          }),
                          s.jsxs("p", {
                            className: "text-gray-900 flex items-start",
                            children: [
                              s.jsx(cf, {
                                className:
                                  "w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0",
                              }),
                              e.shipping_address
                                ? s.jsxs("span", {
                                    children: [
                                      e.shipping_address.street || "",
                                      ", ",
                                      e.shipping_address.city || "",
                                      ", ",
                                      e.shipping_address.state || "",
                                      " - ",
                                      e.shipping_address.pincode || "",
                                      s.jsx("br", {}),
                                      e.shipping_address.country || "",
                                    ],
                                  })
                                : "Address not available",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  s.jsxs("h3", {
                    className:
                      "text-lg font-semibold text-gray-900 mb-4 flex items-center",
                    children: [
                      s.jsx(ql, { className: "w-5 h-5 mr-2" }),
                      "Order Items",
                    ],
                  }),
                  s.jsx("div", {
                    className:
                      "bg-white border border-gray-200 rounded-lg overflow-hidden",
                    children: s.jsxs("table", {
                      className: "w-full",
                      children: [
                        s.jsx("thead", {
                          className: "bg-gray-50",
                          children: s.jsxs("tr", {
                            children: [
                              s.jsx("th", {
                                className:
                                  "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Product",
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Quantity",
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Unit Price",
                              }),
                              s.jsx("th", {
                                className:
                                  "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Total",
                              }),
                            ],
                          }),
                        }),
                        s.jsx("tbody", {
                          className: "divide-y divide-gray-200",
                          children:
                            e.items &&
                            Array.isArray(e.items) &&
                            e.items.length > 0
                              ? e.items.map((f, g) =>
                                  s.jsxs(
                                    "tr",
                                    {
                                      children: [
                                        s.jsx("td", {
                                          className: "px-4 py-3",
                                          children: s.jsxs("div", {
                                            className: "flex items-center",
                                            children: [
                                              f.product_image &&
                                                s.jsx("img", {
                                                  src: f.product_image,
                                                  alt:
                                                    f.product_name || "Product",
                                                  className:
                                                    "w-10 h-10 rounded-lg object-cover mr-3",
                                                }),
                                              s.jsxs("div", {
                                                children: [
                                                  s.jsx("div", {
                                                    className:
                                                      "text-sm font-medium text-gray-900",
                                                    children:
                                                      f.product_name ||
                                                      "Unknown Product",
                                                  }),
                                                  s.jsxs("div", {
                                                    className:
                                                      "text-sm text-gray-500",
                                                    children: [
                                                      "ID: ",
                                                      f.product_id || "N/A",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        s.jsx("td", {
                                          className:
                                            "px-4 py-3 text-sm text-gray-900",
                                          children: f.quantity || 0,
                                        }),
                                        s.jsxs("td", {
                                          className:
                                            "px-4 py-3 text-sm text-gray-900",
                                          children: ["₹", f.unit_price || 0],
                                        }),
                                        s.jsxs("td", {
                                          className:
                                            "px-4 py-3 text-sm font-medium text-gray-900",
                                          children: ["₹", f.total_price || 0],
                                        }),
                                      ],
                                    },
                                    g,
                                  ),
                                )
                              : s.jsx("tr", {
                                  children: s.jsx("td", {
                                    colSpan: 4,
                                    className:
                                      "px-4 py-8 text-center text-gray-500",
                                    children: s.jsxs("div", {
                                      className: "flex flex-col items-center",
                                      children: [
                                        s.jsx(ql, {
                                          className:
                                            "w-8 h-8 text-gray-300 mb-2",
                                        }),
                                        s.jsx("p", {
                                          children:
                                            "No items found for this order",
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "bg-gray-50 rounded-lg p-4",
                children: [
                  s.jsx("h3", {
                    className: "text-lg font-semibold text-gray-900 mb-4",
                    children: "Order Summary",
                  }),
                  s.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      s.jsxs("div", {
                        className: "flex justify-between text-sm",
                        children: [
                          s.jsx("span", {
                            className: "text-gray-600",
                            children: "Subtotal:",
                          }),
                          s.jsxs("span", {
                            className: "text-gray-900",
                            children: ["₹", e.subtotal || 0],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "flex justify-between text-sm",
                        children: [
                          s.jsx("span", {
                            className: "text-gray-600",
                            children: "Tax (18%):",
                          }),
                          s.jsxs("span", {
                            className: "text-gray-900",
                            children: ["₹", e.tax_amount || 0],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "flex justify-between text-sm",
                        children: [
                          s.jsx("span", {
                            className: "text-gray-600",
                            children: "Shipping:",
                          }),
                          s.jsxs("span", {
                            className: "text-gray-900",
                            children: ["₹", e.shipping_amount || 0],
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: "border-t border-gray-200 pt-2",
                        children: s.jsxs("div", {
                          className:
                            "flex justify-between text-lg font-semibold",
                          children: [
                            s.jsx("span", {
                              className: "text-gray-900",
                              children: "Total:",
                            }),
                            s.jsxs("span", {
                              className: "text-ayur-red",
                              children: ["₹", e.total_amount || 0],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "bg-gray-50 rounded-lg p-4",
                children: [
                  s.jsxs("h3", {
                    className:
                      "text-lg font-semibold text-gray-900 mb-4 flex items-center",
                    children: [
                      s.jsx(fs, { className: "w-5 h-5 mr-2" }),
                      "Payment Information",
                    ],
                  }),
                  s.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Payment Method",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900",
                            children: e.payment_method || "N/A",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Razorpay Order ID",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900 font-mono text-sm",
                            children: e.razorpay_order_id || "N/A",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Payment ID",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900 font-mono text-sm",
                            children: e.razorpay_payment_id || "N/A",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Payment Signature",
                          }),
                          s.jsx("p", {
                            className:
                              "text-gray-900 font-mono text-sm break-all",
                            children: e.razorpay_signature || "N/A",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "bg-gray-50 rounded-lg p-4",
                children: [
                  s.jsxs("h3", {
                    className:
                      "text-lg font-semibold text-gray-900 mb-4 flex items-center",
                    children: [
                      s.jsx(lf, { className: "w-5 h-5 mr-2" }),
                      "Order Timeline",
                    ],
                  }),
                  s.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Order Created",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900",
                            children: u(e.created_at),
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        children: [
                          s.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-1",
                            children: "Last Updated",
                          }),
                          s.jsx("p", {
                            className: "text-gray-900",
                            children: u(e.updated_at),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.notes &&
                s.jsxs("div", {
                  className: "bg-gray-50 rounded-lg p-4",
                  children: [
                    s.jsx("h3", {
                      className: "text-lg font-semibold text-gray-900 mb-2",
                      children: "Notes",
                    }),
                    s.jsx("p", {
                      className: "text-gray-700",
                      children: e.notes,
                    }),
                  ],
                }),
            ],
          }),
          s.jsxs("div", {
            className:
              "flex items-center justify-end gap-3 p-6 border-t border-gray-200",
            children: [
              s.jsx("button", {
                onClick: t,
                className:
                  "px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
                children: "Close",
              }),
              s.jsx("button", {
                onClick: p,
                disabled: o || n === e.order_status,
                className:
                  "px-4 py-2 bg-ayur-red text-white rounded-lg hover:bg-ayur-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                children: o
                  ? s.jsxs(s.Fragment, {
                      children: [
                        s.jsx(Xg, { className: "w-4 h-4 animate-spin" }),
                        "Updating...",
                      ],
                    })
                  : s.jsxs(s.Fragment, {
                      children: [
                        s.jsx(h0, { className: "w-4 h-4" }),
                        "Save Changes",
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  Wx = ({ onLogin: e, error: t, isLoading: r }) => {
    const [n, l] = y.useState(""),
      [o, a] = y.useState(!1),
      c = (i) => {
        (i.preventDefault(), n.trim() && e(n));
      };
    return s.jsx("div", {
      className: "min-h-screen bg-white flex items-center justify-center p-4",
      children: s.jsx("div", {
        className: "w-full max-w-md",
        children: s.jsxs("div", {
          className:
            "bg-white rounded-xl shadow-2xl border border-gray-100 p-8",
          children: [
            s.jsxs("div", {
              className: "text-center mb-8",
              children: [
                s.jsx("div", {
                  className:
                    "mx-auto w-16 h-16 bg-ayur-red rounded-full flex items-center justify-center mb-4",
                  children: s.jsx(Jg, { className: "w-8 h-8 text-white" }),
                }),
                s.jsx("h1", {
                  className:
                    "font-playfair text-2xl font-bold text-antique-brown mb-2",
                  children: "Admin Access",
                }),
                s.jsx("p", {
                  className: "font-noto text-sm text-gray-600",
                  children: "Enter your password to access the admin dashboard",
                }),
              ],
            }),
            t &&
              s.jsx("div", {
                className:
                  "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm",
                children: t,
              }),
            s.jsxs("form", {
              onSubmit: c,
              className: "space-y-6",
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("label", {
                      htmlFor: "password",
                      className:
                        "block font-noto font-semibold text-antique-brown mb-2 text-sm",
                      children: "Password",
                    }),
                    s.jsxs("div", {
                      className: "relative",
                      children: [
                        s.jsx("input", {
                          type: o ? "text" : "password",
                          id: "password",
                          value: n,
                          onChange: (i) => l(i.target.value),
                          className:
                            "w-full p-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm transition-colors",
                          placeholder: "Enter admin password",
                          disabled: r,
                          autoComplete: "current-password",
                        }),
                        s.jsx("button", {
                          type: "button",
                          onClick: () => a(!o),
                          className:
                            "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors",
                          disabled: r,
                          children: o
                            ? s.jsx(Ug, { className: "w-5 h-5" })
                            : s.jsx(sf, { className: "w-5 h-5" }),
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsx("button", {
                  type: "submit",
                  disabled: r || !n.trim(),
                  className:
                    "w-full bg-ayur-red text-white py-4 rounded-lg font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  children: r
                    ? s.jsxs("div", {
                        className: "flex items-center justify-center",
                        children: [
                          s.jsx("div", {
                            className:
                              "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2",
                          }),
                          "Verifying...",
                        ],
                      })
                    : "Access Dashboard",
                }),
              ],
            }),
            s.jsx("div", {
              className: "mt-8 text-center",
              children: s.jsx("p", {
                className: "font-noto text-xs text-gray-500",
                children: "Sanchaaar Heritage Admin Portal",
              }),
            }),
          ],
        }),
      }),
    });
  },
  Hx = () => {
    const {
        isAuthenticated: e,
        authError: t,
        isAuthLoading: r,
        login: n,
        logout: l,
        products: o,
        loading: a,
        error: c,
        addProduct: i,
        updateProduct: u,
        deleteProduct: p,
      } = Ya(),
      [f, g] = y.useState("orders"),
      [v, x] = y.useState(!1),
      [w, N] = y.useState(null),
      [h, m] = y.useState(!1),
      [d, b] = y.useState({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "",
        image_url: "",
        images: "",
        ingredients: "",
        benefits: "",
        usage_instructions: "",
        weight: "",
        expiry_date: "",
        stock_quantity: "",
        is_active: !0,
      }),
      [C, R] = y.useState(!1);
    if (!e) return s.jsx(Wx, { onLogin: n, error: t || void 0, isLoading: r });
    const E = async () => {
        if (!d.name || !d.price || !d.category || !d.description) {
          alert("Please fill in all required fields");
          return;
        }
        try {
          R(!0);
          const S = {
            name: d.name,
            description: d.description,
            price: parseFloat(d.price),
            original_price: d.original_price
              ? parseFloat(d.original_price)
              : void 0,
            category: d.category,
            image_url:
              d.image_url ||
              "https://images.pexels.com/photos/5946634/pexels-photo-5946634.jpeg?auto=compress&cs=tinysrgb&w=400",
            images: d.images
              ? d.images.split(",").map((z) => z.trim())
              : void 0,
            ingredients: d.ingredients
              ? d.ingredients.split(",").map((z) => z.trim())
              : [],
            benefits: d.benefits
              ? d.benefits.split(",").map((z) => z.trim())
              : [],
            usage_instructions:
              d.usage_instructions || "As directed by physician",
            weight: d.weight || "100ml",
            expiry_date: d.expiry_date || void 0,
            stock_quantity: parseInt(d.stock_quantity) || 0,
            is_active: d.is_active,
          };
          (await i(S),
            b({
              name: "",
              description: "",
              price: "",
              original_price: "",
              category: "",
              image_url: "",
              images: "",
              ingredients: "",
              benefits: "",
              usage_instructions: "",
              weight: "",
              expiry_date: "",
              stock_quantity: "",
              is_active: !0,
            }),
            x(!1));
        } catch (S) {
          alert(
            "Failed to add product: " +
              (S instanceof Error ? S.message : "Unknown error"),
          );
        } finally {
          R(!1);
        }
      },
      k = (S) => {
        var ne, Ie;
        const z = o.find((oe) => oe.id === S);
        z &&
          (b({
            name: z.name,
            description: z.description,
            price: z.price.toString(),
            original_price:
              ((ne = z.original_price) == null ? void 0 : ne.toString()) || "",
            category: z.category,
            image_url: z.image_url,
            images: ((Ie = z.images) == null ? void 0 : Ie.join(", ")) || "",
            ingredients: z.ingredients.join(", "),
            benefits: z.benefits.join(", "),
            usage_instructions: z.usage_instructions,
            weight: z.weight,
            expiry_date: z.expiry_date || "",
            stock_quantity: z.stock_quantity.toString(),
            is_active: z.is_active,
          }),
          N(S),
          x(!0));
      },
      P = async () => {
        if (!w || !d.name || !d.price || !d.category) {
          alert("Please fill in all required fields");
          return;
        }
        try {
          R(!0);
          const S = {
            name: d.name,
            description: d.description,
            price: parseFloat(d.price),
            original_price: d.original_price
              ? parseFloat(d.original_price)
              : void 0,
            category: d.category,
            image_url: d.image_url,
            images: d.images
              ? d.images.split(",").map((z) => z.trim())
              : void 0,
            ingredients: d.ingredients
              ? d.ingredients.split(",").map((z) => z.trim())
              : [],
            benefits: d.benefits
              ? d.benefits.split(",").map((z) => z.trim())
              : [],
            usage_instructions: d.usage_instructions,
            weight: d.weight,
            expiry_date: d.expiry_date || void 0,
            stock_quantity: parseInt(d.stock_quantity) || 0,
            is_active: d.is_active,
          };
          (await u(w, S),
            b({
              name: "",
              description: "",
              price: "",
              original_price: "",
              category: "",
              image_url: "",
              images: "",
              ingredients: "",
              benefits: "",
              usage_instructions: "",
              weight: "",
              expiry_date: "",
              stock_quantity: "",
              is_active: !0,
            }),
            x(!1),
            N(null));
        } catch (S) {
          alert(
            "Failed to update product: " +
              (S instanceof Error ? S.message : "Unknown error"),
          );
        } finally {
          R(!1);
        }
      },
      M = async (S) => {
        if (window.confirm("Are you sure you want to delete this product?"))
          try {
            await p(S);
          } catch (z) {
            alert(
              "Failed to delete product: " +
                (z instanceof Error ? z.message : "Unknown error"),
            );
          }
      };
    return s.jsxs("div", {
      className: "min-h-screen bg-cream-50 flex",
      children: [
        h &&
          s.jsx("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
            onClick: () => m(!1),
          }),
        s.jsxs("div", {
          className: `fixed lg:static inset-y-0 left-0 z-50 w-64 bg-antique-brown text-cream-50 shadow-xl transform transition-transform duration-300 ease-in-out ${h ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
          children: [
            s.jsx("div", {
              className: "p-4 sm:p-6 border-b border-cream-200/20",
              children: s.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsx("h1", {
                        className:
                          "font-playfair text-xl sm:text-2xl font-bold",
                        children: "Admin Dashboard",
                      }),
                      s.jsx("p", {
                        className:
                          "font-noto text-xs sm:text-sm text-cream-200 mt-1",
                        children: "Sanchaaar Heritage",
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      s.jsx("button", {
                        onClick: l,
                        className:
                          "p-2 hover:bg-antique-brown/80 rounded-lg transition-colors",
                        title: "Logout",
                        children: s.jsx(t0, { className: "w-5 h-5" }),
                      }),
                      s.jsx("button", {
                        onClick: () => m(!1),
                        className:
                          "lg:hidden p-2 hover:bg-antique-brown/80 rounded-lg",
                        children: s.jsx(ps, { className: "w-5 h-5" }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            s.jsxs("nav", {
              className: "mt-6",
              children: [
                s.jsxs("button", {
                  onClick: () => {
                    (g("orders"), m(!1));
                  },
                  className: `w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${f === "orders" ? "bg-ayur-red text-white" : "hover:bg-antique-brown/80"}`,
                  children: [
                    s.jsx(Vo, { className: "w-5 h-5 mr-3" }),
                    s.jsx("span", {
                      className: "text-sm sm:text-base",
                      children: "Orders",
                    }),
                  ],
                }),
                s.jsxs("button", {
                  onClick: () => {
                    (g("products"), m(!1));
                  },
                  className: `w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${f === "products" ? "bg-ayur-red text-white" : "hover:bg-antique-brown/80"}`,
                  children: [
                    s.jsx(ql, { className: "w-5 h-5 mr-3" }),
                    s.jsxs("span", {
                      className: "text-sm sm:text-base",
                      children: ["Products (", o.length, ")"],
                    }),
                  ],
                }),
                s.jsxs("button", {
                  onClick: () => {
                    (g("settings"), m(!1));
                  },
                  className: `w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${f === "settings" ? "bg-ayur-red text-white" : "hover:bg-antique-brown/80"}`,
                  children: [
                    s.jsx(v0, { className: "w-5 h-5 mr-3" }),
                    s.jsx("span", {
                      className: "text-sm sm:text-base",
                      children: "Settings",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "flex-1 flex flex-col min-w-0",
          children: [
            s.jsxs("div", {
              className:
                "lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between",
              children: [
                s.jsx("button", {
                  onClick: () => m(!0),
                  className: "p-2 hover:bg-gray-100 rounded-lg",
                  children: s.jsx(s0, { className: "w-6 h-6 text-gray-600" }),
                }),
                s.jsxs("h2", {
                  className:
                    "font-playfair text-lg font-bold text-antique-brown",
                  children: [
                    f === "orders" && "Orders Management",
                    f === "products" && "Products Management",
                    f === "settings" && "Settings",
                  ],
                }),
                s.jsx("div", { className: "w-10" }),
                " ",
              ],
            }),
            s.jsx("div", {
              className: "flex-1 overflow-hidden",
              children: s.jsxs("div", {
                className: "h-full overflow-auto",
                children: [
                  f === "orders" && s.jsx(Ux, {}),
                  f === "products" &&
                    s.jsxs("div", {
                      className: "p-4 sm:p-6 lg:p-8",
                      children: [
                        s.jsxs("div", {
                          className:
                            "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4",
                          children: [
                            s.jsx("h2", {
                              className:
                                "font-playfair text-2xl sm:text-3xl font-bold text-antique-brown",
                              children: "Products Management",
                            }),
                            s.jsxs("button", {
                              onClick: () => {
                                (x(!0),
                                  N(null),
                                  b({
                                    name: "",
                                    description: "",
                                    price: "",
                                    original_price: "",
                                    category: "",
                                    image_url: "",
                                    images: "",
                                    ingredients: "",
                                    benefits: "",
                                    usage_instructions: "",
                                    weight: "",
                                    expiry_date: "",
                                    stock_quantity: "",
                                    is_active: !0,
                                  }));
                              },
                              className:
                                "bg-ayur-red text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base",
                              children: [
                                s.jsx(Ho, {
                                  className: "w-4 h-4 sm:w-5 sm:h-5",
                                }),
                                s.jsx("span", {
                                  className: "hidden sm:inline",
                                  children: "Add Product",
                                }),
                                s.jsx("span", {
                                  className: "sm:hidden",
                                  children: "Add",
                                }),
                              ],
                            }),
                          ],
                        }),
                        c &&
                          s.jsx("div", {
                            className:
                              "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                            children: c,
                          }),
                        a &&
                          s.jsx("div", {
                            className: "flex justify-center items-center py-12",
                            children: s.jsx("div", {
                              className:
                                "animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-red",
                            }),
                          }),
                        !a &&
                          s.jsx("div", {
                            className:
                              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
                            children:
                              o.length === 0
                                ? s.jsxs("div", {
                                    className:
                                      "col-span-full bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center border border-cream-200",
                                    children: [
                                      s.jsx(ql, {
                                        className:
                                          "w-12 h-12 sm:w-16 sm:h-16 text-cream-200 mx-auto mb-4",
                                      }),
                                      s.jsx("h3", {
                                        className:
                                          "font-lora text-lg sm:text-xl text-antique-brown mb-2",
                                        children: "No Products Yet",
                                      }),
                                      s.jsx("p", {
                                        className:
                                          "font-noto text-sm sm:text-base text-antique-brown/60",
                                        children:
                                          "Add your first product to get started.",
                                      }),
                                    ],
                                  })
                                : o.map((S) =>
                                    s.jsxs(
                                      "div",
                                      {
                                        className:
                                          "bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-cream-200 hover:shadow-xl transition-shadow",
                                        children: [
                                          s.jsx("img", {
                                            src: S.image_url,
                                            alt: S.name,
                                            className:
                                              "w-full h-32 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4",
                                          }),
                                          s.jsx("h3", {
                                            className:
                                              "font-lora text-base sm:text-lg font-semibold text-antique-brown mb-2 line-clamp-2",
                                            children: S.name,
                                          }),
                                          s.jsx("p", {
                                            className:
                                              "font-noto text-xs sm:text-sm text-antique-brown/60 mb-2 line-clamp-2",
                                            children: S.description,
                                          }),
                                          s.jsxs("p", {
                                            className:
                                              "font-noto text-xs text-antique-brown/50 mb-3",
                                            children: [
                                              "Category: ",
                                              S.category,
                                            ],
                                          }),
                                          s.jsxs("div", {
                                            className:
                                              "flex items-center gap-2 mb-3 sm:mb-4",
                                            children: [
                                              s.jsxs("span", {
                                                className:
                                                  "font-playfair text-lg sm:text-xl font-bold text-ayur-red",
                                                children: ["₹", S.price],
                                              }),
                                              S.original_price &&
                                                s.jsxs("span", {
                                                  className:
                                                    "font-noto text-xs sm:text-sm text-gray-500 line-through",
                                                  children: [
                                                    "₹",
                                                    S.original_price,
                                                  ],
                                                }),
                                            ],
                                          }),
                                          s.jsxs("div", {
                                            className:
                                              "flex items-center justify-between text-xs sm:text-sm text-antique-brown/60 mb-3 sm:mb-4",
                                            children: [
                                              s.jsxs("span", {
                                                children: [
                                                  "Stock: ",
                                                  S.stock_quantity,
                                                ],
                                              }),
                                              s.jsxs("span", {
                                                className: "truncate ml-2",
                                                children: [
                                                  "Weight: ",
                                                  S.weight,
                                                ],
                                              }),
                                            ],
                                          }),
                                          s.jsxs("div", {
                                            className: "flex gap-2",
                                            children: [
                                              s.jsxs("button", {
                                                onClick: () => k(S.id),
                                                className:
                                                  "flex-1 bg-ayur-gold text-white py-2 rounded-lg font-noto text-xs sm:text-sm hover:bg-ayur-gold/90 transition-colors flex items-center justify-center gap-1",
                                                children: [
                                                  s.jsx(k0, {
                                                    className:
                                                      "w-3 h-3 sm:w-4 sm:h-4",
                                                  }),
                                                  s.jsx("span", {
                                                    className:
                                                      "hidden sm:inline",
                                                    children: "Edit",
                                                  }),
                                                ],
                                              }),
                                              s.jsxs("button", {
                                                onClick: () => M(S.id),
                                                className:
                                                  "flex-1 bg-red text-black py-2 rounded-lg font-noto text-xs sm:text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1",
                                                children: [
                                                  s.jsx(C0, {
                                                    className:
                                                      "w-3 h-3 sm:w-4 sm:h-4",
                                                  }),
                                                  s.jsx("span", {
                                                    className:
                                                      "hidden sm:inline",
                                                    children: "Delete",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      S.id,
                                    ),
                                  ),
                          }),
                      ],
                    }),
                  f === "settings" &&
                    s.jsxs("div", {
                      className: "p-4 sm:p-6 lg:p-8",
                      children: [
                        s.jsx("h2", {
                          className:
                            "font-playfair text-2xl sm:text-3xl font-bold text-antique-brown mb-6 sm:mb-8",
                          children: "Settings",
                        }),
                        s.jsxs("div", {
                          className:
                            "bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-cream-200",
                          children: [
                            s.jsx("h3", {
                              className:
                                "font-lora text-lg sm:text-xl font-semibold text-antique-brown mb-4",
                              children: "Store Information",
                            }),
                            s.jsxs("div", {
                              className: "space-y-4",
                              children: [
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("label", {
                                      className:
                                        "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                                      children: "Store Name",
                                    }),
                                    s.jsx("input", {
                                      type: "text",
                                      value: "Sanchaaar - Ayurvedic Heritage",
                                      className:
                                        "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                                      readOnly: !0,
                                    }),
                                  ],
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("label", {
                                      className:
                                        "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                                      children: "Contact Email",
                                    }),
                                    s.jsx("input", {
                                      type: "email",
                                      value: "info@sanchaaar.com",
                                      className:
                                        "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                                      readOnly: !0,
                                    }),
                                  ],
                                }),
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("label", {
                                      className:
                                        "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                                      children: "Phone Number",
                                    }),
                                    s.jsx("input", {
                                      type: "tel",
                                      value: "+91 98765 43210",
                                      className:
                                        "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                                      readOnly: !0,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            }),
          ],
        }),
        v &&
          s.jsx("div", {
            className:
              "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4",
            children: s.jsxs("div", {
              className:
                "bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[95vh] overflow-y-auto",
              children: [
                s.jsxs("div", {
                  className:
                    "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200",
                  children: [
                    s.jsx("h2", {
                      className:
                        "font-playfair text-lg sm:text-2xl font-bold text-antique-brown",
                      children: w ? "Edit Product" : "Add New Product",
                    }),
                    s.jsx("button", {
                      onClick: () => {
                        (x(!1),
                          N(null),
                          b({
                            name: "",
                            description: "",
                            price: "",
                            original_price: "",
                            category: "",
                            image_url: "",
                            images: "",
                            ingredients: "",
                            benefits: "",
                            usage_instructions: "",
                            weight: "",
                            expiry_date: "",
                            stock_quantity: "",
                            is_active: !0,
                          }));
                      },
                      className:
                        "p-2 hover:bg-gray-100 rounded-full transition-colors",
                      children: s.jsx(Ho, {
                        className:
                          "w-4 h-4 sm:w-5 sm:h-5 text-gray-600 rotate-45",
                      }),
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className:
                    "p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto",
                  children: [
                    s.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                      children: [
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Product Name *",
                            }),
                            s.jsx("input", {
                              type: "text",
                              value: d.name,
                              onChange: (S) =>
                                b((z) => ({ ...z, name: S.target.value })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              placeholder: "Enter product name",
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Category *",
                            }),
                            s.jsxs("select", {
                              value: d.category,
                              onChange: (S) =>
                                b((z) => ({ ...z, category: S.target.value })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              children: [
                                s.jsx("option", {
                                  value: "",
                                  children: "Select Category",
                                }),
                                s.jsx("option", {
                                  value: "Syrup",
                                  children: "Syrup",
                                }),
                                s.jsx("option", {
                                  value: "Tablet",
                                  children: "Tablet",
                                }),
                                s.jsx("option", {
                                  value: "Powder",
                                  children: "Powder",
                                }),
                                s.jsx("option", {
                                  value: "Oil",
                                  children: "Oil",
                                }),
                                s.jsx("option", {
                                  value: "Capsule",
                                  children: "Capsule",
                                }),
                                s.jsx("option", {
                                  value: "Cream",
                                  children: "Cream",
                                }),
                                s.jsx("option", {
                                  value: "Other",
                                  children: "Other",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Description *",
                        }),
                        s.jsx("textarea", {
                          value: d.description,
                          onChange: (S) =>
                            b((z) => ({ ...z, description: S.target.value })),
                          rows: 3,
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder: "Enter product description",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                      children: [
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Price *",
                            }),
                            s.jsx("input", {
                              type: "number",
                              value: d.price,
                              onChange: (S) =>
                                b((z) => ({ ...z, price: S.target.value })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              placeholder: "₹0",
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Original Price",
                            }),
                            s.jsx("input", {
                              type: "number",
                              value: d.original_price,
                              onChange: (S) =>
                                b((z) => ({
                                  ...z,
                                  original_price: S.target.value,
                                })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              placeholder: "₹0",
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                      children: [
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Weight *",
                            }),
                            s.jsx("input", {
                              type: "text",
                              value: d.weight,
                              onChange: (S) =>
                                b((z) => ({ ...z, weight: S.target.value })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              placeholder: "e.g., 100ml, 60 tablets",
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          children: [
                            s.jsx("label", {
                              className:
                                "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                              children: "Stock Quantity *",
                            }),
                            s.jsx("input", {
                              type: "number",
                              value: d.stock_quantity,
                              onChange: (S) =>
                                b((z) => ({
                                  ...z,
                                  stock_quantity: S.target.value,
                                })),
                              className:
                                "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                              placeholder: "0",
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Image URL",
                        }),
                        s.jsx("input", {
                          type: "url",
                          value: d.image_url,
                          onChange: (S) =>
                            b((z) => ({ ...z, image_url: S.target.value })),
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder: "https://example.com/image.jpg",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Additional Images (comma separated)",
                        }),
                        s.jsx("input", {
                          type: "text",
                          value: d.images,
                          onChange: (S) =>
                            b((z) => ({ ...z, images: S.target.value })),
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder:
                            "https://example.com/image1.jpg, https://example.com/image2.jpg",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Ingredients (comma separated)",
                        }),
                        s.jsx("input", {
                          type: "text",
                          value: d.ingredients,
                          onChange: (S) =>
                            b((z) => ({ ...z, ingredients: S.target.value })),
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder: "Ginger, Peppermint, Cardamom",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Benefits (comma separated)",
                        }),
                        s.jsx("input", {
                          type: "text",
                          value: d.benefits,
                          onChange: (S) =>
                            b((z) => ({ ...z, benefits: S.target.value })),
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder: "Relieves stomach ache, Aids digestion",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Usage Instructions",
                        }),
                        s.jsx("textarea", {
                          value: d.usage_instructions,
                          onChange: (S) =>
                            b((z) => ({
                              ...z,
                              usage_instructions: S.target.value,
                            })),
                          rows: 2,
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                          placeholder:
                            "Take 1-2 teaspoons twice daily after meals",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("label", {
                          className:
                            "block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base",
                          children: "Expiry Date",
                        }),
                        s.jsx("input", {
                          type: "date",
                          value: d.expiry_date,
                          onChange: (S) =>
                            b((z) => ({ ...z, expiry_date: S.target.value })),
                          className:
                            "w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base",
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        s.jsx("input", {
                          type: "checkbox",
                          id: "is_active",
                          checked: d.is_active,
                          onChange: (S) =>
                            b((z) => ({ ...z, is_active: S.target.checked })),
                          className:
                            "w-4 h-4 text-ayur-red border-cream-200 rounded focus:ring-ayur-red",
                        }),
                        s.jsx("label", {
                          htmlFor: "is_active",
                          className:
                            "font-noto text-antique-brown text-sm sm:text-base",
                          children: "Product is active",
                        }),
                      ],
                    }),
                    s.jsx("button", {
                      onClick: w ? P : E,
                      disabled: C,
                      className:
                        "w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base",
                      children: C
                        ? "Processing..."
                        : w
                          ? "Update Product"
                          : "Add Product",
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  },
  Vx = () => {
    const e = Ha();
    return (
      y.useEffect(() => {
        const t = setTimeout(() => {
          e("/");
        }, 1e4);
        return () => clearTimeout(t);
      }, [e]),
      s.jsxs("div", {
        className:
          "min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 bg-parchment flex items-center justify-center px-4",
        children: [
          s.jsx("div", {
            className: "absolute top-0 left-0 w-64 h-64 opacity-5",
            children: s.jsxs("svg", {
              viewBox: "0 0 200 200",
              className: "w-full h-full text-botanical-green",
              children: [
                s.jsx("path", {
                  d: "M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z",
                  fill: "currentColor",
                }),
                s.jsx("path", {
                  d: "M20 50c0-5 4-9 9-9 8 0 21 9 21 9s-13 9-21 9c-5 0-9-4-9-9zm12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z",
                  fill: "currentColor",
                }),
              ],
            }),
          }),
          s.jsx("div", {
            className: "absolute top-0 right-0 w-64 h-64 opacity-5 rotate-180",
            children: s.jsx("svg", {
              viewBox: "0 0 200 200",
              className: "w-full h-full text-botanical-green",
              children: s.jsx("path", {
                d: "M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z",
                fill: "currentColor",
              }),
            }),
          }),
          s.jsx("div", {
            className: "absolute bottom-0 left-0 w-48 h-48 opacity-5",
            children: s.jsxs("svg", {
              viewBox: "0 0 150 150",
              className: "w-full h-full text-botanical-green",
              children: [
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "30",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                }),
                s.jsx("path", {
                  d: "M75 45v60M45 75h60",
                  stroke: "currentColor",
                  strokeWidth: "1",
                }),
              ],
            }),
          }),
          s.jsx("div", {
            className:
              "absolute bottom-0 right-0 w-48 h-48 opacity-5 rotate-90",
            children: s.jsxs("svg", {
              viewBox: "0 0 150 150",
              className: "w-full h-full text-botanical-green",
              children: [
                s.jsx("circle", {
                  cx: "75",
                  cy: "75",
                  r: "30",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                }),
                s.jsx("path", {
                  d: "M75 45v60M45 75h60",
                  stroke: "currentColor",
                  strokeWidth: "1",
                }),
              ],
            }),
          }),
          s.jsxs("div", {
            className:
              "relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-cream-200 animate-fade-in",
            children: [
              s.jsx("div", {
                className: "flex justify-center mb-6",
                children: s.jsxs("div", {
                  className: "relative",
                  children: [
                    s.jsx("div", {
                      className:
                        "w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-gentle",
                      children: s.jsx(Dg, {
                        className: "w-12 h-12 text-white",
                      }),
                    }),
                    s.jsx("div", {
                      className:
                        "absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full animate-ping opacity-20",
                    }),
                  ],
                }),
              }),
              s.jsx("h1", {
                className:
                  "font-playfair text-3xl font-bold text-antique-brown mb-4",
                children: "Payment Successful! ✅",
              }),
              s.jsx("p", {
                className:
                  "font-lora text-lg text-antique-brown/80 mb-6 leading-relaxed",
                children:
                  "Thank you for your order! Your payment has been processed successfully.",
              }),
              s.jsxs("div", {
                className:
                  "bg-cream-50 p-6 rounded-xl border border-cream-200 mb-6",
                children: [
                  s.jsx("h3", {
                    className:
                      "font-lora font-semibold text-antique-brown mb-3",
                    children: "What's Next?",
                  }),
                  s.jsxs("div", {
                    className: "space-y-3 text-left",
                    children: [
                      s.jsxs("div", {
                        className: "flex items-start gap-3",
                        children: [
                          s.jsx("div", {
                            className:
                              "w-2 h-2 bg-ayur-red rounded-full mt-2 flex-shrink-0",
                          }),
                          s.jsx("p", {
                            className:
                              "font-noto text-sm text-antique-brown/70",
                            children:
                              "Order confirmation has been sent to your email",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "flex items-start gap-3",
                        children: [
                          s.jsx("div", {
                            className:
                              "w-2 h-2 bg-ayur-red rounded-full mt-2 flex-shrink-0",
                          }),
                          s.jsxs("p", {
                            className:
                              "font-noto text-sm text-antique-brown/70",
                            children: [
                              s.jsx("strong", {
                                children:
                                  "Shipping details will be sent via WhatsApp",
                              }),
                              " within 24 hours",
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "flex items-start gap-3",
                        children: [
                          s.jsx("div", {
                            className:
                              "w-2 h-2 bg-ayur-red rounded-full mt-2 flex-shrink-0",
                          }),
                          s.jsx("p", {
                            className:
                              "font-noto text-sm text-antique-brown/70",
                            children:
                              "Your Ayurvedic remedies will be carefully packaged and shipped",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className:
                  "bg-green-50 p-4 rounded-xl border border-green-200 mb-6",
                children: [
                  s.jsxs("div", {
                    className: "flex items-center justify-center gap-2 mb-2",
                    children: [
                      s.jsx(Vl, { className: "w-5 h-5 text-green-600" }),
                      s.jsx("span", {
                        className: "font-noto font-semibold text-green-800",
                        children: "WhatsApp Updates",
                      }),
                    ],
                  }),
                  s.jsx("p", {
                    className: "font-noto text-sm text-green-700",
                    children:
                      "We'll send shipping updates and tracking information directly to your WhatsApp for convenience.",
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "space-y-3",
                children: [
                  s.jsxs("button", {
                    onClick: () => e("/"),
                    className:
                      "w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2",
                    children: [
                      s.jsx(Qg, { className: "w-5 h-5" }),
                      "Continue Shopping",
                    ],
                  }),
                  s.jsxs("a", {
                    href: "https://wa.me/919876543210",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "w-full border-2 border-green-500 text-green-600 py-3 rounded-full font-noto font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2",
                    children: [
                      s.jsx(Vl, { className: "w-5 h-5" }),
                      "Contact Us on WhatsApp",
                    ],
                  }),
                ],
              }),
              s.jsx("p", {
                className: "font-noto text-xs text-antique-brown/50 mt-6",
                children:
                  "You'll be automatically redirected to the home page in 10 seconds",
              }),
              s.jsx("div", {
                className: "mt-6 pt-6 border-t border-cream-200",
                children: s.jsx("p", {
                  className: "font-noto text-xs text-antique-brown/60",
                  children:
                    "✨ Thank you for choosing Sanchaaar - 135 Years of Ayurvedic Excellence",
                }),
              }),
            ],
          }),
        ],
      })
    );
  };
function qx() {
  return s.jsx(jg, {
    children: s.jsx(vg, {
      children: s.jsx(kg, {
        children: s.jsx(ag, {
          children: s.jsxs("div", {
            className:
              "min-h-screen bg-gradient-to-br from-aged-paper via-vintage-beige to-cream-100 bg-ayurveda-texture",
            children: [
              s.jsx(M0, {}),
              s.jsxs(Dh, {
                children: [
                  s.jsx(en, { path: "/", element: s.jsx($x, {}) }),
                  s.jsx(en, { path: "/about", element: s.jsx(Fx, {}) }),
                  s.jsx(en, { path: "/admin", element: s.jsx(Hx, {}) }),
                  s.jsx(en, {
                    path: "/payment-success",
                    element: s.jsx(Vx, {}),
                  }),
                ],
              }),
              s.jsx(T0, {}),
            ],
          }),
        }),
      }),
    }),
  });
}
Od(document.getElementById("root")).render(
  s.jsx(y.StrictMode, { children: s.jsx(qx, {}) }),
);
