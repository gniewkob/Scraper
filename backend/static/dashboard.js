var jb = { exports: {} }, by = {};
var N_;
function wO() {
  if (N_) return by;
  N_ = 1;
  var u = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function o(s, f, m) {
    var y = null;
    if (m !== void 0 && (y = "" + m), f.key !== void 0 && (y = "" + f.key), "key" in f) {
      m = {};
      for (var b in f)
        b !== "key" && (m[b] = f[b]);
    } else m = f;
    return f = m.ref, {
      $$typeof: u,
      type: s,
      key: y,
      ref: f !== void 0 ? f : null,
      props: m
  return by.Fragment = a, by.jsx = o, by.jsxs = o, by;
var vy = {}, qb = { exports: {} }, se = {};
var k_;
function zO() {
  if (k_) return se;
  k_ = 1;
  var u = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), y = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), D = Symbol.iterator;
  function M(z) {
    return z === null || typeof z != "object" ? null : (z = D && z[D] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var H = {
  }, q = Object.assign, V = {};
  function B(z, $, at) {
    this.props = z, this.context = $, this.refs = V, this.updater = at || H;
  B.prototype.isReactComponent = {}, B.prototype.setState = function(z, $) {
    if (typeof z != "object" && typeof z != "function" && z != null)
    this.updater.enqueueSetState(this, z, $, "setState");
  }, B.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  function Q() {
  }
  Q.prototype = B.prototype;
  function dt(z, $, at) {
    this.props = z, this.context = $, this.refs = V, this.updater = at || H;
  }
  var yt = dt.prototype = new Q();
  yt.constructor = dt, q(yt, B.prototype), yt.isPureReactComponent = !0;
  var St = Array.isArray, ut = { H: null, A: null, T: null, S: null, V: null }, Mt = Object.prototype.hasOwnProperty;
  function pt(z, $, at, rt, bt, Ut) {
    return at = Ut.ref, {
      $$typeof: u,
      type: z,
      key: $,
      ref: at !== void 0 ? at : null,
      props: Ut
  function Ot(z, $) {
    return pt(
      z.type,
      $,
      z.props
  function ht(z) {
    return typeof z == "object" && z !== null && z.$$typeof === u;
  function Vt(z) {
    var $ = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(at) {
      return $[at];
  var xt = /\/+/g;
  function Dt(z, $) {
    return typeof z == "object" && z !== null && z.key != null ? Vt("" + z.key) : $.toString(36);
  function re() {
  function Se(z) {
    switch (z.status) {
        return z.value;
        throw z.reason;
        switch (typeof z.status == "string" ? z.then(re, re) : (z.status = "pending", z.then(
          function($) {
            z.status === "pending" && (z.status = "fulfilled", z.value = $);
          function($) {
            z.status === "pending" && (z.status = "rejected", z.reason = $);
        )), z.status) {
            return z.value;
            throw z.reason;
    throw z;
  function Lt(z, $, at, rt, bt) {
    var Ut = typeof z;
    (Ut === "undefined" || Ut === "boolean") && (z = null);
    var vt = !1;
    if (z === null) vt = !0;
      switch (Ut) {
          vt = !0;
          switch (z.$$typeof) {
            case u:
            case a:
              vt = !0;
            case E:
              return vt = z._init, Lt(
                vt(z._payload),
                $,
                at,
                rt,
                bt
    if (vt)
      return bt = bt(z), vt = rt === "" ? "." + Dt(z, 0) : rt, St(bt) ? (at = "", vt != null && (at = vt.replace(xt, "$&/") + "/"), Lt(bt, $, at, "", function(Ge) {
        return Ge;
      })) : bt != null && (ht(bt) && (bt = Ot(
        bt,
        at + (bt.key == null || z && z.key === bt.key ? "" : ("" + bt.key).replace(
          xt,
        ) + "/") + vt
      )), $.push(bt)), 1;
    vt = 0;
    var pn = rt === "" ? "." : rt + ":";
    if (St(z))
      for (var Qt = 0; Qt < z.length; Qt++)
        rt = z[Qt], Ut = pn + Dt(rt, Qt), vt += Lt(
          rt,
          $,
          at,
          Ut,
          bt
    else if (Qt = M(z), typeof Qt == "function")
      for (z = Qt.call(z), Qt = 0; !(rt = z.next()).done; )
        rt = rt.value, Ut = pn + Dt(rt, Qt++), vt += Lt(
          rt,
          $,
          at,
          Ut,
          bt
    else if (Ut === "object") {
      if (typeof z.then == "function")
        return Lt(
          Se(z),
          $,
          at,
          rt,
          bt
      throw $ = String(z), Error(
        "Objects are not valid as a React child (found: " + ($ === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : $) + "). If you meant to render a collection of children, use an array instead."
    return vt;
  }
  function L(z, $, at) {
    if (z == null) return z;
    var rt = [], bt = 0;
    return Lt(z, rt, "", "", function(Ut) {
      return $.call(at, Ut, bt++);
    }), rt;
  }
  function nt(z) {
    if (z._status === -1) {
      var $ = z._result;
      $ = $(), $.then(
        function(at) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = at);
        function(at) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = at);
      ), z._status === -1 && (z._status = 0, z._result = $);
    if (z._status === 1) return z._result.default;
    throw z._result;
  var ft = typeof reportError == "function" ? reportError : function(z) {
      var $ = new window.ErrorEvent("error", {
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      if (!window.dispatchEvent($)) return;
      process.emit("uncaughtException", z);
    console.error(z);
  function Ct() {
  return se.Children = {
    map: L,
    forEach: function(z, $, at) {
      L(
        z,
          $.apply(this, arguments);
        at
    count: function(z) {
      var $ = 0;
      return L(z, function() {
        $++;
      }), $;
    toArray: function(z) {
      return L(z, function($) {
        return $;
    only: function(z) {
      if (!ht(z))
      return z;
  }, se.Component = B, se.Fragment = o, se.Profiler = f, se.PureComponent = dt, se.StrictMode = s, se.Suspense = S, se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ut, se.__COMPILER_RUNTIME = {
    c: function(z) {
      return ut.H.useMemoCache(z);
  }, se.cache = function(z) {
      return z.apply(null, arguments);
  }, se.cloneElement = function(z, $, at) {
    if (z == null)
        "The argument must be a React element, but you passed " + z + "."
    var rt = q({}, z.props), bt = z.key, Ut = void 0;
    if ($ != null)
      for (vt in $.ref !== void 0 && (Ut = void 0), $.key !== void 0 && (bt = "" + $.key), $)
        !Mt.call($, vt) || vt === "key" || vt === "__self" || vt === "__source" || vt === "ref" && $.ref === void 0 || (rt[vt] = $[vt]);
    var vt = arguments.length - 2;
    if (vt === 1) rt.children = at;
    else if (1 < vt) {
      for (var pn = Array(vt), Qt = 0; Qt < vt; Qt++)
        pn[Qt] = arguments[Qt + 2];
      rt.children = pn;
    }
    return pt(z.type, bt, void 0, void 0, Ut, rt);
  }, se.createContext = function(z) {
    return z = {
      $$typeof: y,
      _currentValue: z,
      _currentValue2: z,
    }, z.Provider = z, z.Consumer = {
      $$typeof: m,
      _context: z
    }, z;
  }, se.createElement = function(z, $, at) {
    var rt, bt = {}, Ut = null;
    if ($ != null)
      for (rt in $.key !== void 0 && (Ut = "" + $.key), $)
        Mt.call($, rt) && rt !== "key" && rt !== "__self" && rt !== "__source" && (bt[rt] = $[rt]);
    var vt = arguments.length - 2;
    if (vt === 1) bt.children = at;
    else if (1 < vt) {
      for (var pn = Array(vt), Qt = 0; Qt < vt; Qt++)
        pn[Qt] = arguments[Qt + 2];
      bt.children = pn;
    }
    if (z && z.defaultProps)
      for (rt in vt = z.defaultProps, vt)
        bt[rt] === void 0 && (bt[rt] = vt[rt]);
    return pt(z, Ut, void 0, void 0, null, bt);
  }, se.createRef = function() {
  }, se.forwardRef = function(z) {
    return { $$typeof: b, render: z };
  }, se.isValidElement = ht, se.lazy = function(z) {
      $$typeof: E,
      _payload: { _status: -1, _result: z },
      _init: nt
  }, se.memo = function(z, $) {
      $$typeof: _,
      type: z,
      compare: $ === void 0 ? null : $
  }, se.startTransition = function(z) {
    var $ = ut.T, at = {};
    ut.T = at;
      var rt = z(), bt = ut.S;
      bt !== null && bt(at, rt), typeof rt == "object" && rt !== null && typeof rt.then == "function" && rt.then(Ct, ft);
    } catch (Ut) {
      ft(Ut);
      ut.T = $;
    }
  }, se.unstable_useCacheRefresh = function() {
    return ut.H.useCacheRefresh();
  }, se.use = function(z) {
    return ut.H.use(z);
  }, se.useActionState = function(z, $, at) {
    return ut.H.useActionState(z, $, at);
  }, se.useCallback = function(z, $) {
    return ut.H.useCallback(z, $);
  }, se.useContext = function(z) {
    return ut.H.useContext(z);
  }, se.useDebugValue = function() {
  }, se.useDeferredValue = function(z, $) {
    return ut.H.useDeferredValue(z, $);
  }, se.useEffect = function(z, $, at) {
    var rt = ut.H;
    if (typeof at == "function")
    return rt.useEffect(z, $);
  }, se.useId = function() {
    return ut.H.useId();
  }, se.useImperativeHandle = function(z, $, at) {
    return ut.H.useImperativeHandle(z, $, at);
  }, se.useInsertionEffect = function(z, $) {
    return ut.H.useInsertionEffect(z, $);
  }, se.useLayoutEffect = function(z, $) {
    return ut.H.useLayoutEffect(z, $);
  }, se.useMemo = function(z, $) {
    return ut.H.useMemo(z, $);
  }, se.useOptimistic = function(z, $) {
    return ut.H.useOptimistic(z, $);
  }, se.useReducer = function(z, $, at) {
    return ut.H.useReducer(z, $, at);
  }, se.useRef = function(z) {
    return ut.H.useRef(z);
  }, se.useState = function(z) {
    return ut.H.useState(z);
  }, se.useSyncExternalStore = function(z, $, at) {
    return ut.H.useSyncExternalStore(
      z,
      $,
      at
  }, se.useTransition = function() {
    return ut.H.useTransition();
  }, se.version = "19.1.1", se;
var wy = { exports: {} };
wy.exports;
var B_;
function CO() {
  return B_ || (B_ = 1, function(u, a) {
      function o(A, G) {
        Object.defineProperty(m.prototype, A, {
              G[0],
              G[1]
      function s(A) {
        return A === null || typeof A != "object" ? null : (A = Xl && A[Xl] || A["@@iterator"], typeof A == "function" ? A : null);
      function f(A, G) {
        A = (A = A.constructor) && (A.displayName || A.name) || "ReactClass";
        var gt = A + "." + G;
        vu[gt] || (console.error(
          G,
          A
        ), vu[gt] = !0);
      function m(A, G, gt) {
        this.props = A, this.context = G, this.refs = Pc, this.updater = gt || Ql;
      function y() {
      function b(A, G, gt) {
        this.props = A, this.context = G, this.refs = Pc, this.updater = gt || Ql;
      function S(A) {
        return "" + A;
      function _(A) {
          S(A);
          var G = !1;
          G = !0;
        if (G) {
          G = console;
          var gt = G.error, _t = typeof Symbol == "function" && Symbol.toStringTag && A[Symbol.toStringTag] || A.constructor.name || "Object";
          return gt.call(
            G,
            _t
          ), S(A);
      function E(A) {
        if (A == null) return null;
        if (typeof A == "function")
          return A.$$typeof === Pf ? null : A.displayName || A.name || null;
        if (typeof A == "string") return A;
        switch (A) {
          case z:
          case at:
          case $:
          case vt:
          case pn:
          case va:
        if (typeof A == "object")
          switch (typeof A.tag == "number" && console.error(
          ), A.$$typeof) {
            case Ct:
              return (A.displayName || "Context") + ".Provider";
            case rt:
              return (A._context.displayName || "Context") + ".Consumer";
            case Ut:
              var G = A.render;
              return A = A.displayName, A || (A = G.displayName || G.name || "", A = A !== "" ? "ForwardRef(" + A + ")" : "ForwardRef"), A;
            case Qt:
              return G = A.displayName || null, G !== null ? G : E(A.type) || "Memo";
            case Ge:
              G = A._payload, A = A._init;
                return E(A(G));
      function D(A) {
        if (A === z) return "<>";
        if (typeof A == "object" && A !== null && A.$$typeof === Ge)
          var G = E(A);
          return G ? "<" + G + ">" : "<...>";
      function M() {
        var A = ae.A;
        return A === null ? null : A.getOwner();
      function H() {
      function q(A) {
        if (Zl.call(A, "key")) {
          var G = Object.getOwnPropertyDescriptor(A, "key").get;
          if (G && G.isReactWarning) return !1;
        return A.key !== void 0;
      function V(A, G) {
        function gt() {
          Bi || (Bi = !0, console.error(
            G
        gt.isReactWarning = !0, Object.defineProperty(A, "key", {
          get: gt,
      function B() {
        var A = E(this.type);
        return Ic[A] || (Ic[A] = !0, console.error(
        )), A = this.props.ref, A !== void 0 ? A : null;
      }
      function Q(A, G, gt, _t, Ht, Zt, Wt, ge) {
        return gt = Zt.ref, A = {
          $$typeof: ft,
          type: A,
          key: G,
          props: Zt,
          _owner: Ht
        }, (gt !== void 0 ? gt : null) !== null ? Object.defineProperty(A, "ref", {
          get: B
        }) : Object.defineProperty(A, "ref", { enumerable: !1, value: null }), A._store = {}, Object.defineProperty(A._store, "validated", {
        }), Object.defineProperty(A, "_debugInfo", {
        }), Object.defineProperty(A, "_debugStack", {
          value: Wt
        }), Object.defineProperty(A, "_debugTask", {
          value: ge
        }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
      function dt(A, G) {
        return G = Q(
          A.type,
          G,
          A._owner,
          A.props,
          A._debugStack,
          A._debugTask
        ), A._store && (G._store.validated = A._store.validated), G;
      }
      function yt(A) {
        return typeof A == "object" && A !== null && A.$$typeof === ft;
      }
      function St(A) {
        var G = { "=": "=0", ":": "=2" };
        return "$" + A.replace(/[=:]/g, function(gt) {
          return G[gt];
      function ut(A, G) {
        return typeof A == "object" && A !== null && A.key != null ? (_(A.key), St("" + A.key)) : G.toString(36);
      function Mt() {
      function pt(A) {
        switch (A.status) {
            return A.value;
            throw A.reason;
            switch (typeof A.status == "string" ? A.then(Mt, Mt) : (A.status = "pending", A.then(
              function(G) {
                A.status === "pending" && (A.status = "fulfilled", A.value = G);
              function(G) {
                A.status === "pending" && (A.status = "rejected", A.reason = G);
            )), A.status) {
                return A.value;
                throw A.reason;
        throw A;
      function Ot(A, G, gt, _t, Ht) {
        var Zt = typeof A;
        (Zt === "undefined" || Zt === "boolean") && (A = null);
        var Wt = !1;
        if (A === null) Wt = !0;
          switch (Zt) {
              Wt = !0;
              switch (A.$$typeof) {
                case ft:
                case Ct:
                  Wt = !0;
                case Ge:
                  return Wt = A._init, Ot(
                    Wt(A._payload),
                    G,
                    gt,
                    _t,
                    Ht
        if (Wt) {
          Wt = A, Ht = Ht(Wt);
          var ge = _t === "" ? "." + ut(Wt, 0) : _t;
          return vo(Ht) ? (gt = "", ge != null && (gt = ge.replace(Yn, "$&/") + "/"), Ot(Ht, G, gt, "", function(rn) {
            return rn;
          })) : Ht != null && (yt(Ht) && (Ht.key != null && (Wt && Wt.key === Ht.key || _(Ht.key)), gt = dt(
            Ht,
            gt + (Ht.key == null || Wt && Wt.key === Ht.key ? "" : ("" + Ht.key).replace(
              Yn,
            ) + "/") + ge
          ), _t !== "" && Wt != null && yt(Wt) && Wt.key == null && Wt._store && !Wt._store.validated && (gt._store.validated = 2), Ht = gt), G.push(Ht)), 1;
        }
        if (Wt = 0, ge = _t === "" ? "." : _t + ":", vo(A))
          for (var Jt = 0; Jt < A.length; Jt++)
            _t = A[Jt], Zt = ge + ut(_t, Jt), Wt += Ot(
              _t,
              G,
              gt,
              Zt,
              Ht
        else if (Jt = s(A), typeof Jt == "function")
          for (Jt === A.entries && (el || console.warn(
          ), el = !0), A = Jt.call(A), Jt = 0; !(_t = A.next()).done; )
            _t = _t.value, Zt = ge + ut(_t, Jt++), Wt += Ot(
              _t,
              G,
              gt,
              Zt,
              Ht
        else if (Zt === "object") {
          if (typeof A.then == "function")
            return Ot(
              pt(A),
              G,
              gt,
              _t,
              Ht
          throw G = String(A), Error(
            "Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead."
        return Wt;
      }
      function ht(A, G, gt) {
        if (A == null) return A;
        var _t = [], Ht = 0;
        return Ot(A, _t, "", "", function(Zt) {
          return G.call(gt, Zt, Ht++);
        }), _t;
      }
      function Vt(A) {
        if (A._status === -1) {
          var G = A._result;
          G = G(), G.then(
            function(gt) {
              (A._status === 0 || A._status === -1) && (A._status = 1, A._result = gt);
            function(gt) {
              (A._status === 0 || A._status === -1) && (A._status = 2, A._result = gt);
          ), A._status === -1 && (A._status = 0, A._result = G);
        if (A._status === 1)
          return G = A._result, G === void 0 && console.error(
            G
          ), "default" in G || console.error(
            G
          ), G.default;
        throw A._result;
      function xt() {
        var A = ae.H;
        return A === null && console.error(
        ), A;
      function Dt() {
      function re(A) {
        if (Cs === null)
            var G = ("require" + Math.random()).slice(0, 7);
            Cs = (u && u[G]).call(
              u,
            Cs = function(_t) {
              tr === !1 && (tr = !0, typeof MessageChannel > "u" && console.error(
              var Ht = new MessageChannel();
              Ht.port1.onmessage = _t, Ht.port2.postMessage(void 0);
        return Cs(A);
      function Se(A) {
        return 1 < A.length && typeof AggregateError == "function" ? new AggregateError(A) : A[0];
      function Lt(A, G) {
        G !== xl - 1 && console.error(
        ), xl = G;
      function L(A, G, gt) {
        var _t = ae.actQueue;
        if (_t !== null)
          if (_t.length !== 0)
              nt(_t), re(function() {
                return L(A, G, gt);
            } catch (Ht) {
              ae.thrownErrors.push(Ht);
          else ae.actQueue = null;
        0 < ae.thrownErrors.length ? (_t = Se(ae.thrownErrors), ae.thrownErrors.length = 0, gt(_t)) : G(A);
      function nt(A) {
        if (!jn) {
          jn = !0;
          var G = 0;
            for (; G < A.length; G++) {
              var gt = A[G];
                ae.didUsePromise = !1;
                var _t = gt(!1);
                if (_t !== null) {
                  if (ae.didUsePromise) {
                    A[G] = gt, A.splice(0, G);
                  gt = _t;
            A.length = 0;
          } catch (Ht) {
            A.splice(0, G + 1), ae.thrownErrors.push(Ht);
            jn = !1;
      var ft = Symbol.for("react.transitional.element"), Ct = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), at = Symbol.for("react.profiler"), rt = Symbol.for("react.consumer"), bt = Symbol.for("react.context"), Ut = Symbol.for("react.forward_ref"), vt = Symbol.for("react.suspense"), pn = Symbol.for("react.suspense_list"), Qt = Symbol.for("react.memo"), Ge = Symbol.for("react.lazy"), va = Symbol.for("react.activity"), Xl = Symbol.iterator, vu = {}, Ql = {
        enqueueForceUpdate: function(A) {
          f(A, "forceUpdate");
        enqueueReplaceState: function(A) {
          f(A, "replaceState");
        enqueueSetState: function(A) {
          f(A, "setState");
      }, Rs = Object.assign, Pc = {};
      Object.freeze(Pc), m.prototype.isReactComponent = {}, m.prototype.setState = function(A, G) {
        if (typeof A != "object" && typeof A != "function" && A != null)
        this.updater.enqueueSetState(this, A, G, "setState");
      }, m.prototype.forceUpdate = function(A) {
        this.updater.enqueueForceUpdate(this, A, "forceUpdate");
      var cn = {
      }, An;
      for (An in cn)
        cn.hasOwnProperty(An) && o(An, cn[An]);
      y.prototype = m.prototype, cn = b.prototype = new y(), cn.constructor = b, Rs(cn, m.prototype), cn.isPureReactComponent = !0;
      var vo = Array.isArray, Pf = Symbol.for("react.client.reference"), ae = {
      }, Zl = Object.prototype.hasOwnProperty, ws = console.createTask ? console.createTask : function() {
      cn = {
        react_stack_bottom_frame: function(A) {
          return A();
      var Bi, If, Ic = {}, So = cn.react_stack_bottom_frame.bind(
        cn,
        H
      )(), Ln = ws(D(H)), el = !1, Yn = /\/+/g, zs = typeof reportError == "function" ? reportError : function(A) {
          var G = new window.ErrorEvent("error", {
            message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
            error: A
          if (!window.dispatchEvent(G)) return;
          process.emit("uncaughtException", A);
        console.error(A);
      }, tr = !1, Cs = null, xl = 0, Sa = !1, jn = !1, El = typeof queueMicrotask == "function" ? function(A) {
          return queueMicrotask(A);
      } : re;
      cn = Object.freeze({
        c: function(A) {
          return xt().useMemoCache(A);
        }
      }), a.Children = {
        map: ht,
        forEach: function(A, G, gt) {
          ht(
            A,
              G.apply(this, arguments);
            gt
        count: function(A) {
          var G = 0;
          return ht(A, function() {
            G++;
          }), G;
        toArray: function(A) {
          return ht(A, function(G) {
            return G;
        only: function(A) {
          if (!yt(A))
          return A;
      }, a.Component = m, a.Fragment = z, a.Profiler = at, a.PureComponent = b, a.StrictMode = $, a.Suspense = vt, a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae, a.__COMPILER_RUNTIME = cn, a.act = function(A) {
        var G = ae.actQueue, gt = xl;
        xl++;
        var _t = ae.actQueue = G !== null ? G : [], Ht = !1;
          var Zt = A();
        } catch (Jt) {
          ae.thrownErrors.push(Jt);
        }
        if (0 < ae.thrownErrors.length)
          throw Lt(G, gt), A = Se(ae.thrownErrors), ae.thrownErrors.length = 0, A;
        if (Zt !== null && typeof Zt == "object" && typeof Zt.then == "function") {
          var Wt = Zt;
          return El(function() {
            Ht || Sa || (Sa = !0, console.error(
            then: function(Jt, rn) {
              Ht = !0, Wt.then(
                function(Ol) {
                  if (Lt(G, gt), gt === 0) {
                      nt(_t), re(function() {
                        return L(
                          Ol,
                          Jt,
                          rn
                    } catch (Rm) {
                      ae.thrownErrors.push(Rm);
                    if (0 < ae.thrownErrors.length) {
                      var td = Se(
                        ae.thrownErrors
                      ae.thrownErrors.length = 0, rn(td);
                  } else Jt(Ol);
                function(Ol) {
                  Lt(G, gt), 0 < ae.thrownErrors.length && (Ol = Se(
                    ae.thrownErrors
                  ), ae.thrownErrors.length = 0), rn(Ol);
        var ge = Zt;
        if (Lt(G, gt), gt === 0 && (nt(_t), _t.length !== 0 && El(function() {
          Ht || Sa || (Sa = !0, console.error(
        }), ae.actQueue = null), 0 < ae.thrownErrors.length)
          throw A = Se(ae.thrownErrors), ae.thrownErrors.length = 0, A;
          then: function(Jt, rn) {
            Ht = !0, gt === 0 ? (ae.actQueue = _t, re(function() {
              return L(
                ge,
                Jt,
                rn
            })) : Jt(ge);
      }, a.cache = function(A) {
          return A.apply(null, arguments);
      }, a.captureOwnerStack = function() {
        var A = ae.getCurrentStack;
        return A === null ? null : A();
      }, a.cloneElement = function(A, G, gt) {
        if (A == null)
            "The argument must be a React element, but you passed " + A + "."
        var _t = Rs({}, A.props), Ht = A.key, Zt = A._owner;
        if (G != null) {
          var Wt;
            if (Zl.call(G, "ref") && (Wt = Object.getOwnPropertyDescriptor(
              G,
            ).get) && Wt.isReactWarning) {
              Wt = !1;
            Wt = G.ref !== void 0;
          }
          Wt && (Zt = M()), q(G) && (_(G.key), Ht = "" + G.key);
          for (ge in G)
            !Zl.call(G, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && G.ref === void 0 || (_t[ge] = G[ge]);
        }
        var ge = arguments.length - 2;
        if (ge === 1) _t.children = gt;
        else if (1 < ge) {
          Wt = Array(ge);
          for (var Jt = 0; Jt < ge; Jt++)
            Wt[Jt] = arguments[Jt + 2];
          _t.children = Wt;
        }
        for (_t = Q(
          A.type,
          Ht,
          Zt,
          _t,
          A._debugStack,
          A._debugTask
        ), Ht = 2; Ht < arguments.length; Ht++)
          Zt = arguments[Ht], yt(Zt) && Zt._store && (Zt._store.validated = 1);
        return _t;
      }, a.createContext = function(A) {
        return A = {
          $$typeof: bt,
          _currentValue: A,
          _currentValue2: A,
        }, A.Provider = A, A.Consumer = {
          $$typeof: rt,
          _context: A
        }, A._currentRenderer = null, A._currentRenderer2 = null, A;
      }, a.createElement = function(A, G, gt) {
        for (var _t = 2; _t < arguments.length; _t++) {
          var Ht = arguments[_t];
          yt(Ht) && Ht._store && (Ht._store.validated = 1);
        }
        if (_t = {}, Ht = null, G != null)
          for (Jt in If || !("__self" in G) || "key" in G || (If = !0, console.warn(
          )), q(G) && (_(G.key), Ht = "" + G.key), G)
            Zl.call(G, Jt) && Jt !== "key" && Jt !== "__self" && Jt !== "__source" && (_t[Jt] = G[Jt]);
        var Zt = arguments.length - 2;
        if (Zt === 1) _t.children = gt;
        else if (1 < Zt) {
          for (var Wt = Array(Zt), ge = 0; ge < Zt; ge++)
            Wt[ge] = arguments[ge + 2];
          Object.freeze && Object.freeze(Wt), _t.children = Wt;
        }
        if (A && A.defaultProps)
          for (Jt in Zt = A.defaultProps, Zt)
            _t[Jt] === void 0 && (_t[Jt] = Zt[Jt]);
        Ht && V(
          _t,
          typeof A == "function" ? A.displayName || A.name || "Unknown" : A
        var Jt = 1e4 > ae.recentlyCreatedOwnerStacks++;
        return Q(
          A,
          Ht,
          M(),
          _t,
          Jt ? Error("react-stack-top-frame") : So,
          Jt ? ws(D(A)) : Ln
      }, a.createRef = function() {
        var A = { current: null };
        return Object.seal(A), A;
      }, a.forwardRef = function(A) {
        A != null && A.$$typeof === Qt ? console.error(
        ) : typeof A != "function" ? console.error(
          A === null ? "null" : typeof A
        ) : A.length !== 0 && A.length !== 2 && console.error(
          A.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), A != null && A.defaultProps != null && console.error(
        var G = { $$typeof: Ut, render: A }, gt;
        return Object.defineProperty(G, "displayName", {
            return gt;
          set: function(_t) {
            gt = _t, A.name || A.displayName || (Object.defineProperty(A, "name", { value: _t }), A.displayName = _t);
        }), G;
      }, a.isValidElement = yt, a.lazy = function(A) {
          $$typeof: Ge,
          _payload: { _status: -1, _result: A },
          _init: Vt
      }, a.memo = function(A, G) {
        A == null && console.error(
          A === null ? "null" : typeof A
        ), G = {
          $$typeof: Qt,
          type: A,
          compare: G === void 0 ? null : G
        var gt;
        return Object.defineProperty(G, "displayName", {
            return gt;
          set: function(_t) {
            gt = _t, A.name || A.displayName || (Object.defineProperty(A, "name", { value: _t }), A.displayName = _t);
        }), G;
      }, a.startTransition = function(A) {
        var G = ae.T, gt = {};
        ae.T = gt, gt._updatedFibers = /* @__PURE__ */ new Set();
          var _t = A(), Ht = ae.S;
          Ht !== null && Ht(gt, _t), typeof _t == "object" && _t !== null && typeof _t.then == "function" && _t.then(Dt, zs);
        } catch (Zt) {
          zs(Zt);
          G === null && gt._updatedFibers && (A = gt._updatedFibers.size, gt._updatedFibers.clear(), 10 < A && console.warn(
          )), ae.T = G;
        }
      }, a.unstable_useCacheRefresh = function() {
        return xt().useCacheRefresh();
      }, a.use = function(A) {
        return xt().use(A);
      }, a.useActionState = function(A, G, gt) {
        return xt().useActionState(
          A,
          G,
          gt
      }, a.useCallback = function(A, G) {
        return xt().useCallback(A, G);
      }, a.useContext = function(A) {
        var G = xt();
        return A.$$typeof === rt && console.error(
        ), G.useContext(A);
      }, a.useDebugValue = function(A, G) {
        return xt().useDebugValue(A, G);
      }, a.useDeferredValue = function(A, G) {
        return xt().useDeferredValue(A, G);
      }, a.useEffect = function(A, G, gt) {
        A == null && console.warn(
        var _t = xt();
        if (typeof gt == "function")
        return _t.useEffect(A, G);
      }, a.useId = function() {
        return xt().useId();
      }, a.useImperativeHandle = function(A, G, gt) {
        return xt().useImperativeHandle(A, G, gt);
      }, a.useInsertionEffect = function(A, G) {
        return A == null && console.warn(
        ), xt().useInsertionEffect(A, G);
      }, a.useLayoutEffect = function(A, G) {
        return A == null && console.warn(
        ), xt().useLayoutEffect(A, G);
      }, a.useMemo = function(A, G) {
        return xt().useMemo(A, G);
      }, a.useOptimistic = function(A, G) {
        return xt().useOptimistic(A, G);
      }, a.useReducer = function(A, G, gt) {
        return xt().useReducer(A, G, gt);
      }, a.useRef = function(A) {
        return xt().useRef(A);
      }, a.useState = function(A) {
        return xt().useState(A);
      }, a.useSyncExternalStore = function(A, G, gt) {
        return xt().useSyncExternalStore(
          A,
          G,
          gt
      }, a.useTransition = function() {
        return xt().useTransition();
      }, a.version = "19.1.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(wy, wy.exports)), wy.exports;
var L_;
function Am() {
  return L_ || (L_ = 1, process.env.NODE_ENV === "production" ? qb.exports = zO() : qb.exports = CO()), qb.exports;
var Y_;
function HO() {
  return Y_ || (Y_ = 1, process.env.NODE_ENV !== "production" && function() {
    function u(z) {
      if (z == null) return null;
      if (typeof z == "function")
        return z.$$typeof === Vt ? null : z.displayName || z.name || null;
      if (typeof z == "string") return z;
      switch (z) {
        case V:
        case Q:
        case B:
        case ut:
          return "SuspenseList";
        case ht:
      if (typeof z == "object")
        switch (typeof z.tag == "number" && console.error(
        ), z.$$typeof) {
          case q:
          case yt:
            return (z.displayName || "Context") + ".Provider";
          case dt:
            return (z._context.displayName || "Context") + ".Consumer";
          case St:
            var $ = z.render;
            return z = z.displayName, z || (z = $.displayName || $.name || "", z = z !== "" ? "ForwardRef(" + z + ")" : "ForwardRef"), z;
          case pt:
            return $ = z.displayName || null, $ !== null ? $ : u(z.type) || "Memo";
          case Ot:
            $ = z._payload, z = z._init;
              return u(z($));
    function a(z) {
      return "" + z;
    function o(z) {
        a(z);
        var $ = !1;
        $ = !0;
      if ($) {
        $ = console;
        var at = $.error, rt = typeof Symbol == "function" && Symbol.toStringTag && z[Symbol.toStringTag] || z.constructor.name || "Object";
        return at.call(
          $,
          rt
        ), a(z);
    function s(z) {
      if (z === V) return "<>";
      if (typeof z == "object" && z !== null && z.$$typeof === Ot)
        var $ = u(z);
        return $ ? "<" + $ + ">" : "<...>";
    function f() {
      var z = xt.A;
      return z === null ? null : z.getOwner();
    function m() {
    function y(z) {
      if (Dt.call(z, "key")) {
        var $ = Object.getOwnPropertyDescriptor(z, "key").get;
        if ($ && $.isReactWarning) return !1;
      return z.key !== void 0;
    function b(z, $) {
      function at() {
        Lt || (Lt = !0, console.error(
          $
      at.isReactWarning = !0, Object.defineProperty(z, "key", {
        get: at,
    function S() {
      var z = u(this.type);
      return L[z] || (L[z] = !0, console.error(
      )), z = this.props.ref, z !== void 0 ? z : null;
    }
    function _(z, $, at, rt, bt, Ut, vt, pn) {
      return at = Ut.ref, z = {
        $$typeof: H,
        type: z,
        key: $,
        props: Ut,
        _owner: bt
      }, (at !== void 0 ? at : null) !== null ? Object.defineProperty(z, "ref", {
        get: S
      }) : Object.defineProperty(z, "ref", { enumerable: !1, value: null }), z._store = {}, Object.defineProperty(z._store, "validated", {
      }), Object.defineProperty(z, "_debugInfo", {
      }), Object.defineProperty(z, "_debugStack", {
        value: vt
      }), Object.defineProperty(z, "_debugTask", {
        value: pn
      }), Object.freeze && (Object.freeze(z.props), Object.freeze(z)), z;
    }
    function E(z, $, at, rt, bt, Ut, vt, pn) {
      var Qt = $.children;
      if (Qt !== void 0)
        if (rt)
          if (re(Qt)) {
            for (rt = 0; rt < Qt.length; rt++)
              D(Qt[rt]);
            Object.freeze && Object.freeze(Qt);
        else D(Qt);
      if (Dt.call($, "key")) {
        Qt = u(z);
        var Ge = Object.keys($).filter(function(Xl) {
          return Xl !== "key";
        rt = 0 < Ge.length ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}", Ct[Qt + rt] || (Ge = 0 < Ge.length ? "{" + Ge.join(": ..., ") + ": ...}" : "{}", console.error(
          rt,
          Qt,
          Ge,
          Qt
        ), Ct[Qt + rt] = !0);
      }
      if (Qt = null, at !== void 0 && (o(at), Qt = "" + at), y($) && (o($.key), Qt = "" + $.key), "key" in $) {
        at = {};
        for (var va in $)
          va !== "key" && (at[va] = $[va]);
      } else at = $;
      return Qt && b(
        at,
        typeof z == "function" ? z.displayName || z.name || "Unknown" : z
      ), _(
        z,
        Qt,
        Ut,
        bt,
        f(),
        at,
        vt,
        pn
    function D(z) {
      typeof z == "object" && z !== null && z.$$typeof === H && z._store && (z._store.validated = 1);
    var M = Am(), H = Symbol.for("react.transitional.element"), q = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), B = Symbol.for("react.strict_mode"), Q = Symbol.for("react.profiler"), dt = Symbol.for("react.consumer"), yt = Symbol.for("react.context"), St = Symbol.for("react.forward_ref"), ut = Symbol.for("react.suspense"), Mt = Symbol.for("react.suspense_list"), pt = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), ht = Symbol.for("react.activity"), Vt = Symbol.for("react.client.reference"), xt = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dt = Object.prototype.hasOwnProperty, re = Array.isArray, Se = console.createTask ? console.createTask : function() {
    M = {
      react_stack_bottom_frame: function(z) {
        return z();
    var Lt, L = {}, nt = M.react_stack_bottom_frame.bind(
      M,
      m
    )(), ft = Se(s(m)), Ct = {};
    vy.Fragment = V, vy.jsx = function(z, $, at, rt, bt) {
      var Ut = 1e4 > xt.recentlyCreatedOwnerStacks++;
      return E(
        z,
        $,
        at,
        rt,
        Ut ? Error("react-stack-top-frame") : nt,
        Ut ? Se(s(z)) : ft
    }, vy.jsxs = function(z, $, at, rt, bt) {
      var Ut = 1e4 > xt.recentlyCreatedOwnerStacks++;
      return E(
        z,
        $,
        at,
        rt,
        Ut ? Error("react-stack-top-frame") : nt,
        Ut ? Se(s(z)) : ft
  }()), vy;
var j_;
function UO() {
  return j_ || (j_ = 1, process.env.NODE_ENV === "production" ? jb.exports = wO() : jb.exports = HO()), jb.exports;
var Yt = UO(), ba = Am(), Vb = { exports: {} }, Sy = {}, Gb = { exports: {} }, V1 = {};
var q_;
function NO() {
  return q_ || (q_ = 1, function(u) {
    function a(L, nt) {
      var ft = L.length;
      L.push(nt);
      t: for (; 0 < ft; ) {
        var Ct = ft - 1 >>> 1, z = L[Ct];
        if (0 < f(z, nt))
          L[Ct] = nt, L[ft] = z, ft = Ct;
    function o(L) {
      return L.length === 0 ? null : L[0];
    }
    function s(L) {
      if (L.length === 0) return null;
      var nt = L[0], ft = L.pop();
      if (ft !== nt) {
        L[0] = ft;
        t: for (var Ct = 0, z = L.length, $ = z >>> 1; Ct < $; ) {
          var at = 2 * (Ct + 1) - 1, rt = L[at], bt = at + 1, Ut = L[bt];
          if (0 > f(rt, ft))
            bt < z && 0 > f(Ut, rt) ? (L[Ct] = Ut, L[bt] = ft, Ct = bt) : (L[Ct] = rt, L[at] = ft, Ct = at);
          else if (bt < z && 0 > f(Ut, ft))
            L[Ct] = Ut, L[bt] = ft, Ct = bt;
      return nt;
    function f(L, nt) {
      var ft = L.sortIndex - nt.sortIndex;
      return ft !== 0 ? ft : L.id - nt.id;
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      u.unstable_now = function() {
        return m.now();
      var y = Date, b = y.now();
      u.unstable_now = function() {
        return y.now() - b;
    var S = [], _ = [], E = 1, D = null, M = 3, H = !1, q = !1, V = !1, B = !1, Q = typeof setTimeout == "function" ? setTimeout : null, dt = typeof clearTimeout == "function" ? clearTimeout : null, yt = typeof setImmediate < "u" ? setImmediate : null;
    function St(L) {
      for (var nt = o(_); nt !== null; ) {
        if (nt.callback === null) s(_);
        else if (nt.startTime <= L)
          s(_), nt.sortIndex = nt.expirationTime, a(S, nt);
        nt = o(_);
    function ut(L) {
      if (V = !1, St(L), !q)
        if (o(S) !== null)
          q = !0, Mt || (Mt = !0, Dt());
          var nt = o(_);
          nt !== null && Lt(ut, nt.startTime - L);
    var Mt = !1, pt = -1, Ot = 5, ht = -1;
    function Vt() {
      return B ? !0 : !(u.unstable_now() - ht < Ot);
    function xt() {
      if (B = !1, Mt) {
        var L = u.unstable_now();
        ht = L;
        var nt = !0;
            q = !1, V && (V = !1, dt(pt), pt = -1), H = !0;
            var ft = M;
                for (St(L), D = o(S); D !== null && !(D.expirationTime > L && Vt()); ) {
                  var Ct = D.callback;
                  if (typeof Ct == "function") {
                    D.callback = null, M = D.priorityLevel;
                    var z = Ct(
                      D.expirationTime <= L
                    if (L = u.unstable_now(), typeof z == "function") {
                      D.callback = z, St(L), nt = !0;
                    D === o(S) && s(S), St(L);
                  } else s(S);
                  D = o(S);
                if (D !== null) nt = !0;
                  var $ = o(_);
                  $ !== null && Lt(
                    ut,
                    $.startTime - L
                  ), nt = !1;
              D = null, M = ft, H = !1;
            nt = void 0;
          nt ? Dt() : Mt = !1;
    var Dt;
    if (typeof yt == "function")
      Dt = function() {
        yt(xt);
      var re = new MessageChannel(), Se = re.port2;
      re.port1.onmessage = xt, Dt = function() {
        Se.postMessage(null);
      Dt = function() {
        Q(xt, 0);
    function Lt(L, nt) {
      pt = Q(function() {
        L(u.unstable_now());
      }, nt);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, u.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
      ) : Ot = 0 < L ? Math.floor(1e3 / L) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, u.unstable_next = function(L) {
      switch (M) {
          var nt = 3;
          nt = M;
      var ft = M;
      M = nt;
        return L();
        M = ft;
    }, u.unstable_requestPaint = function() {
      B = !0;
    }, u.unstable_runWithPriority = function(L, nt) {
      switch (L) {
          L = 3;
      var ft = M;
      M = L;
        return nt();
        M = ft;
    }, u.unstable_scheduleCallback = function(L, nt, ft) {
      var Ct = u.unstable_now();
      switch (typeof ft == "object" && ft !== null ? (ft = ft.delay, ft = typeof ft == "number" && 0 < ft ? Ct + ft : Ct) : ft = Ct, L) {
          var z = -1;
          z = 250;
          z = 1073741823;
          z = 1e4;
          z = 5e3;
      }
      return z = ft + z, L = {
        id: E++,
        callback: nt,
        priorityLevel: L,
        startTime: ft,
        expirationTime: z,
      }, ft > Ct ? (L.sortIndex = ft, a(_, L), o(S) === null && L === o(_) && (V ? (dt(pt), pt = -1) : V = !0, Lt(ut, ft - Ct))) : (L.sortIndex = z, a(S, L), q || H || (q = !0, Mt || (Mt = !0, Dt()))), L;
    }, u.unstable_shouldYield = Vt, u.unstable_wrapCallback = function(L) {
      var nt = M;
        var ft = M;
        M = nt;
          return L.apply(this, arguments);
          M = ft;
  }(V1)), V1;
var G1 = {};
var V_;
function kO() {
  return V_ || (V_ = 1, function(u) {
      function a() {
        if (ut = !1, ht) {
          var L = u.unstable_now();
          Dt = L;
          var nt = !0;
              yt = !1, St && (St = !1, pt(Vt), Vt = -1), dt = !0;
              var ft = Q;
                  for (y(L), B = s(H); B !== null && !(B.expirationTime > L && S()); ) {
                    var Ct = B.callback;
                    if (typeof Ct == "function") {
                      B.callback = null, Q = B.priorityLevel;
                      var z = Ct(
                        B.expirationTime <= L
                      if (L = u.unstable_now(), typeof z == "function") {
                        B.callback = z, y(L), nt = !0;
                      B === s(H) && f(H), y(L);
                    } else f(H);
                    B = s(H);
                  if (B !== null) nt = !0;
                    var $ = s(q);
                    $ !== null && _(
                      b,
                      $.startTime - L
                    ), nt = !1;
                B = null, Q = ft, dt = !1;
              nt = void 0;
            nt ? re() : ht = !1;
      function o(L, nt) {
        var ft = L.length;
        L.push(nt);
        t: for (; 0 < ft; ) {
          var Ct = ft - 1 >>> 1, z = L[Ct];
          if (0 < m(z, nt))
            L[Ct] = nt, L[ft] = z, ft = Ct;
      function s(L) {
        return L.length === 0 ? null : L[0];
      }
      function f(L) {
        if (L.length === 0) return null;
        var nt = L[0], ft = L.pop();
        if (ft !== nt) {
          L[0] = ft;
          t: for (var Ct = 0, z = L.length, $ = z >>> 1; Ct < $; ) {
            var at = 2 * (Ct + 1) - 1, rt = L[at], bt = at + 1, Ut = L[bt];
            if (0 > m(rt, ft))
              bt < z && 0 > m(Ut, rt) ? (L[Ct] = Ut, L[bt] = ft, Ct = bt) : (L[Ct] = rt, L[at] = ft, Ct = at);
            else if (bt < z && 0 > m(Ut, ft))
              L[Ct] = Ut, L[bt] = ft, Ct = bt;
        return nt;
      function m(L, nt) {
        var ft = L.sortIndex - nt.sortIndex;
        return ft !== 0 ? ft : L.id - nt.id;
      function y(L) {
        for (var nt = s(q); nt !== null; ) {
          if (nt.callback === null) f(q);
          else if (nt.startTime <= L)
            f(q), nt.sortIndex = nt.expirationTime, o(H, nt);
          nt = s(q);
      function b(L) {
        if (St = !1, y(L), !yt)
          if (s(H) !== null)
            yt = !0, ht || (ht = !0, re());
            var nt = s(q);
            nt !== null && _(
              b,
              nt.startTime - L
      function S() {
        return ut ? !0 : !(u.unstable_now() - Dt < xt);
      function _(L, nt) {
        Vt = Mt(function() {
          L(u.unstable_now());
        }, nt);
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var E = performance;
        u.unstable_now = function() {
          return E.now();
        var D = Date, M = D.now();
        u.unstable_now = function() {
          return D.now() - M;
      var H = [], q = [], V = 1, B = null, Q = 3, dt = !1, yt = !1, St = !1, ut = !1, Mt = typeof setTimeout == "function" ? setTimeout : null, pt = typeof clearTimeout == "function" ? clearTimeout : null, Ot = typeof setImmediate < "u" ? setImmediate : null, ht = !1, Vt = -1, xt = 5, Dt = -1;
      if (typeof Ot == "function")
        var re = function() {
          Ot(a);
        var Se = new MessageChannel(), Lt = Se.port2;
        Se.port1.onmessage = a, re = function() {
          Lt.postMessage(null);
        re = function() {
          Mt(a, 0);
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(L) {
        L.callback = null;
      }, u.unstable_forceFrameRate = function(L) {
        0 > L || 125 < L ? console.error(
        ) : xt = 0 < L ? Math.floor(1e3 / L) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return Q;
      }, u.unstable_next = function(L) {
        switch (Q) {
            var nt = 3;
            nt = Q;
        var ft = Q;
        Q = nt;
          return L();
          Q = ft;
      }, u.unstable_requestPaint = function() {
        ut = !0;
      }, u.unstable_runWithPriority = function(L, nt) {
        switch (L) {
            L = 3;
        var ft = Q;
        Q = L;
          return nt();
          Q = ft;
      }, u.unstable_scheduleCallback = function(L, nt, ft) {
        var Ct = u.unstable_now();
        switch (typeof ft == "object" && ft !== null ? (ft = ft.delay, ft = typeof ft == "number" && 0 < ft ? Ct + ft : Ct) : ft = Ct, L) {
            var z = -1;
            z = 250;
            z = 1073741823;
            z = 1e4;
            z = 5e3;
        }
        return z = ft + z, L = {
          id: V++,
          callback: nt,
          priorityLevel: L,
          startTime: ft,
          expirationTime: z,
        }, ft > Ct ? (L.sortIndex = ft, o(q, L), s(H) === null && L === s(q) && (St ? (pt(Vt), Vt = -1) : St = !0, _(b, ft - Ct))) : (L.sortIndex = z, o(H, L), yt || dt || (yt = !0, ht || (ht = !0, re()))), L;
      }, u.unstable_shouldYield = S, u.unstable_wrapCallback = function(L) {
        var nt = Q;
          var ft = Q;
          Q = nt;
            return L.apply(this, arguments);
            Q = ft;
  }(G1)), G1;
var G_;
function y2() {
  return G_ || (G_ = 1, process.env.NODE_ENV === "production" ? Gb.exports = NO() : Gb.exports = kO()), Gb.exports;
var Xb = { exports: {} }, ka = {};
var X_;
function BO() {
  if (X_) return ka;
  X_ = 1;
  var u = Am();
  function a(S) {
    var _ = "https://react.dev/errors/" + S;
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++)
        _ += "&args[]=" + encodeURIComponent(arguments[E]);
    return "Minified React error #" + S + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  function o() {
  var s = {
      f: o,
        throw Error(a(522));
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
  }, f = Symbol.for("react.portal");
  function m(S, _, E) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      $$typeof: f,
      key: D == null ? null : "" + D,
      children: S,
      containerInfo: _,
      implementation: E
  var y = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function b(S, _) {
    if (S === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return ka.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ka.createPortal = function(S, _) {
    var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(a(299));
    return m(S, _, null, E);
  }, ka.flushSync = function(S) {
    var _ = y.T, E = s.p;
      if (y.T = null, s.p = 2, S) return S();
      y.T = _, s.p = E, s.d.f();
    }
  }, ka.preconnect = function(S, _) {
    typeof S == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, s.d.C(S, _));
  }, ka.prefetchDNS = function(S) {
    typeof S == "string" && s.d.D(S);
  }, ka.preinit = function(S, _) {
    if (typeof S == "string" && _ && typeof _.as == "string") {
      var E = _.as, D = b(E, _.crossOrigin), M = typeof _.integrity == "string" ? _.integrity : void 0, H = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      E === "style" ? s.d.S(
        S,
        typeof _.precedence == "string" ? _.precedence : void 0,
          crossOrigin: D,
          integrity: M,
          fetchPriority: H
        }
      ) : E === "script" && s.d.X(S, {
        crossOrigin: D,
        integrity: M,
        fetchPriority: H,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
  }, ka.preinitModule = function(S, _) {
    if (typeof S == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var E = b(
            _.as,
            _.crossOrigin
          s.d.M(S, {
            crossOrigin: E,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
      } else _ == null && s.d.M(S);
  }, ka.preload = function(S, _) {
    if (typeof S == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var E = _.as, D = b(E, _.crossOrigin);
      s.d.L(S, E, {
        crossOrigin: D,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
  }, ka.preloadModule = function(S, _) {
    if (typeof S == "string")
      if (_) {
        var E = b(_.as, _.crossOrigin);
        s.d.m(S, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: E,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
      } else s.d.m(S);
  }, ka.requestFormReset = function(S) {
    s.d.r(S);
  }, ka.unstable_batchedUpdates = function(S, _) {
    return S(_);
  }, ka.useFormState = function(S, _, E) {
    return y.H.useFormState(S, _, E);
  }, ka.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, ka.version = "19.1.1", ka;
}
var Ba = {};
var Q_;
function LO() {
  return Q_ || (Q_ = 1, process.env.NODE_ENV !== "production" && function() {
    function u() {
    function a(D) {
      return "" + D;
    function o(D, M, H) {
      var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        a(q);
        var V = !1;
        V = !0;
      return V && (console.error(
        typeof Symbol == "function" && Symbol.toStringTag && q[Symbol.toStringTag] || q.constructor.name || "Object"
      ), a(q)), {
        $$typeof: _,
        key: q == null ? null : "" + q,
        children: D,
        containerInfo: M,
        implementation: H
    function s(D, M) {
      if (D === "font") return "";
      if (typeof M == "string")
        return M === "use-credentials" ? M : "";
    function f(D) {
      return D === null ? "`null`" : D === void 0 ? "`undefined`" : D === "" ? "an empty string" : 'something with type "' + typeof D + '"';
    function m(D) {
      return D === null ? "`null`" : D === void 0 ? "`undefined`" : D === "" ? "an empty string" : typeof D == "string" ? JSON.stringify(D) : typeof D == "number" ? "`" + D + "`" : 'something with type "' + typeof D + '"';
    function y() {
      var D = E.H;
      return D === null && console.error(
      ), D;
    var b = Am(), S = {
        f: u,
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u
    }, _ = Symbol.for("react.portal"), E = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    ), Ba.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, Ba.createPortal = function(D, M) {
      var H = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!M || M.nodeType !== 1 && M.nodeType !== 9 && M.nodeType !== 11)
      return o(D, M, null, H);
    }, Ba.flushSync = function(D) {
      var M = E.T, H = S.p;
        if (E.T = null, S.p = 2, D)
          return D();
        E.T = M, S.p = H, S.d.f() && console.error(
    }, Ba.preconnect = function(D, M) {
      typeof D == "string" && D ? M != null && typeof M != "object" ? console.error(
        m(M)
      ) : M != null && typeof M.crossOrigin != "string" && console.error(
        f(M.crossOrigin)
        f(D)
      ), typeof D == "string" && (M ? (M = M.crossOrigin, M = typeof M == "string" ? M === "use-credentials" ? M : "" : void 0) : M = null, S.d.C(D, M));
    }, Ba.prefetchDNS = function(D) {
      if (typeof D != "string" || !D)
          f(D)
        var M = arguments[1];
        typeof M == "object" && M.hasOwnProperty("crossOrigin") ? console.error(
          m(M)
          m(M)
      typeof D == "string" && S.d.D(D);
    }, Ba.preinit = function(D, M) {
      if (typeof D == "string" && D ? M == null || typeof M != "object" ? console.error(
        m(M)
      ) : M.as !== "style" && M.as !== "script" && console.error(
        m(M.as)
        f(D)
      ), typeof D == "string" && M && typeof M.as == "string") {
        var H = M.as, q = s(H, M.crossOrigin), V = typeof M.integrity == "string" ? M.integrity : void 0, B = typeof M.fetchPriority == "string" ? M.fetchPriority : void 0;
        H === "style" ? S.d.S(
          D,
          typeof M.precedence == "string" ? M.precedence : void 0,
            crossOrigin: q,
            integrity: V,
            fetchPriority: B
          }
        ) : H === "script" && S.d.X(D, {
          crossOrigin: q,
          integrity: V,
          fetchPriority: B,
          nonce: typeof M.nonce == "string" ? M.nonce : void 0
    }, Ba.preinitModule = function(D, M) {
      var H = "";
      if (typeof D == "string" && D || (H += " The `href` argument encountered was " + f(D) + "."), M !== void 0 && typeof M != "object" ? H += " The `options` argument encountered was " + f(M) + "." : M && "as" in M && M.as !== "script" && (H += " The `as` option encountered was " + m(M.as) + "."), H)
          H
        switch (H = M && typeof M.as == "string" ? M.as : "script", H) {
            H = m(H), console.error(
              H,
              D
      typeof D == "string" && (typeof M == "object" && M !== null ? (M.as == null || M.as === "script") && (H = s(
        M.as,
        M.crossOrigin
      ), S.d.M(D, {
        crossOrigin: H,
        integrity: typeof M.integrity == "string" ? M.integrity : void 0,
        nonce: typeof M.nonce == "string" ? M.nonce : void 0
      })) : M == null && S.d.M(D));
    }, Ba.preload = function(D, M) {
      var H = "";
      if (typeof D == "string" && D || (H += " The `href` argument encountered was " + f(D) + "."), M == null || typeof M != "object" ? H += " The `options` argument encountered was " + f(M) + "." : typeof M.as == "string" && M.as || (H += " The `as` option encountered was " + f(M.as) + "."), H && console.error(
        H
      ), typeof D == "string" && typeof M == "object" && M !== null && typeof M.as == "string") {
        H = M.as;
        var q = s(
          H,
          M.crossOrigin
        S.d.L(D, H, {
          crossOrigin: q,
          integrity: typeof M.integrity == "string" ? M.integrity : void 0,
          nonce: typeof M.nonce == "string" ? M.nonce : void 0,
          type: typeof M.type == "string" ? M.type : void 0,
          fetchPriority: typeof M.fetchPriority == "string" ? M.fetchPriority : void 0,
          referrerPolicy: typeof M.referrerPolicy == "string" ? M.referrerPolicy : void 0,
          imageSrcSet: typeof M.imageSrcSet == "string" ? M.imageSrcSet : void 0,
          imageSizes: typeof M.imageSizes == "string" ? M.imageSizes : void 0,
          media: typeof M.media == "string" ? M.media : void 0
    }, Ba.preloadModule = function(D, M) {
      var H = "";
      typeof D == "string" && D || (H += " The `href` argument encountered was " + f(D) + "."), M !== void 0 && typeof M != "object" ? H += " The `options` argument encountered was " + f(M) + "." : M && "as" in M && typeof M.as != "string" && (H += " The `as` option encountered was " + f(M.as) + "."), H && console.error(
        H
      ), typeof D == "string" && (M ? (H = s(
        M.as,
        M.crossOrigin
      ), S.d.m(D, {
        as: typeof M.as == "string" && M.as !== "script" ? M.as : void 0,
        crossOrigin: H,
        integrity: typeof M.integrity == "string" ? M.integrity : void 0
      })) : S.d.m(D));
    }, Ba.requestFormReset = function(D) {
      S.d.r(D);
    }, Ba.unstable_batchedUpdates = function(D, M) {
      return D(M);
    }, Ba.useFormState = function(D, M, H) {
      return y().useFormState(D, M, H);
    }, Ba.useFormStatus = function() {
      return y().useHostTransitionStatus();
    }, Ba.version = "19.1.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Ba;
}
var Z_;
function b2() {
  if (Z_) return Xb.exports;
  Z_ = 1;
  function u() {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (a) {
        console.error(a);
  return process.env.NODE_ENV === "production" ? (u(), Xb.exports = BO()) : Xb.exports = LO(), Xb.exports;
var K_;
function YO() {
  if (K_) return Sy;
  K_ = 1;
  var u = y2(), a = Am(), o = b2();
  function s(n) {
    var i = "https://react.dev/errors/" + n;
      i += "?args[]=" + encodeURIComponent(arguments[1]);
        i += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + n + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  function f(n) {
  function m(n) {
    var i = n, c = n;
    if (n.alternate) for (; i.return; ) i = i.return;
      n = i;
        i = n, (i.flags & 4098) !== 0 && (c = i.return), n = i.return;
    return i.tag === 3 ? c : null;
  function y(n) {
      var i = n.memoizedState;
      if (i === null && (n = n.alternate, n !== null && (i = n.memoizedState)), i !== null) return i.dehydrated;
  function b(n) {
    if (m(n) !== n)
      throw Error(s(188));
  }
    var i = n.alternate;
    if (!i) {
      if (i = m(n), i === null) throw Error(s(188));
      return i !== n ? null : n;
    }
    for (var c = n, d = i; ; ) {
      var p = c.return;
      if (p === null) break;
      var v = p.alternate;
      if (v === null) {
        if (d = p.return, d !== null) {
          c = d;
      if (p.child === v.child) {
        for (v = p.child; v; ) {
          if (v === c) return b(p), n;
          if (v === d) return b(p), i;
          v = v.sibling;
        throw Error(s(188));
      if (c.return !== d.return) c = p, d = v;
        for (var O = !1, R = p.child; R; ) {
          if (R === c) {
            O = !0, c = p, d = v;
          if (R === d) {
            O = !0, d = p, c = v;
          R = R.sibling;
        if (!O) {
          for (R = v.child; R; ) {
            if (R === c) {
              O = !0, c = v, d = p;
            if (R === d) {
              O = !0, d = v, c = p;
            R = R.sibling;
          if (!O) throw Error(s(189));
      if (c.alternate !== d) throw Error(s(190));
    if (c.tag !== 3) throw Error(s(188));
    return c.stateNode.current === c ? n : i;
  function _(n) {
    var i = n.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return n;
      if (i = _(n), i !== null) return i;
  var E = Object.assign, D = Symbol.for("react.element"), M = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), q = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), Q = Symbol.for("react.provider"), dt = Symbol.for("react.consumer"), yt = Symbol.for("react.context"), St = Symbol.for("react.forward_ref"), ut = Symbol.for("react.suspense"), Mt = Symbol.for("react.suspense_list"), pt = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), ht = Symbol.for("react.activity"), Vt = Symbol.for("react.memo_cache_sentinel"), xt = Symbol.iterator;
  function Dt(n) {
    return n === null || typeof n != "object" ? null : (n = xt && n[xt] || n["@@iterator"], typeof n == "function" ? n : null);
  var re = Symbol.for("react.client.reference");
  function Se(n) {
      return n.$$typeof === re ? null : n.displayName || n.name || null;
      case q:
      case B:
      case V:
      case ut:
        return "SuspenseList";
      case ht:
        case H:
        case yt:
        case dt:
        case St:
          var i = n.render;
          return n = n.displayName, n || (n = i.displayName || i.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
        case pt:
          return i = n.displayName || null, i !== null ? i : Se(n.type) || "Memo";
        case Ot:
          i = n._payload, n = n._init;
            return Se(n(i));
  var Lt = Array.isArray, L = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, nt = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ft = {
  }, Ct = [], z = -1;
  function $(n) {
  function at(n) {
    0 > z || (n.current = Ct[z], Ct[z] = null, z--);
  function rt(n, i) {
    z++, Ct[z] = n.current, n.current = i;
  var bt = $(null), Ut = $(null), vt = $(null), pn = $(null);
  function Qt(n, i) {
    switch (rt(vt, i), rt(Ut, n), rt(bt, null), i.nodeType) {
        n = (n = i.documentElement) && (n = n.namespaceURI) ? io(n) : 0;
        if (n = i.tagName, i = i.namespaceURI)
          i = io(i), n = xc(i, n);
    at(bt), rt(bt, n);
  function Ge() {
    at(bt), at(Ut), at(vt);
  function va(n) {
    n.memoizedState !== null && rt(pn, n);
    var i = bt.current, c = xc(i, n.type);
    i !== c && (rt(Ut, n), rt(bt, c));
  function Xl(n) {
    Ut.current === n && (at(bt), at(Ut)), pn.current === n && (at(pn), Ua._currentValue = ft);
  var vu = Object.prototype.hasOwnProperty, Ql = u.unstable_scheduleCallback, Rs = u.unstable_cancelCallback, Pc = u.unstable_shouldYield, cn = u.unstable_requestPaint, An = u.unstable_now, vo = u.unstable_getCurrentPriorityLevel, Pf = u.unstable_ImmediatePriority, ae = u.unstable_UserBlockingPriority, Zl = u.unstable_NormalPriority, ws = u.unstable_LowPriority, Bi = u.unstable_IdlePriority, If = u.log, Ic = u.unstable_setDisableYieldValue, So = null, Ln = null;
  function el(n) {
    if (typeof If == "function" && Ic(n), Ln && typeof Ln.setStrictMode == "function")
        Ln.setStrictMode(So, n);
  var Yn = Math.clz32 ? Math.clz32 : Cs, zs = Math.log, tr = Math.LN2;
  function Cs(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (zs(n) / tr | 0) | 0;
  var xl = 256, Sa = 4194304;
  function jn(n) {
    var i = n & 42;
    if (i !== 0) return i;
  function El(n, i, c) {
    var d = n.pendingLanes;
    if (d === 0) return 0;
    var p = 0, v = n.suspendedLanes, O = n.pingedLanes;
    var R = d & 134217727;
    return R !== 0 ? (d = R & ~v, d !== 0 ? p = jn(d) : (O &= R, O !== 0 ? p = jn(O) : c || (c = R & ~n, c !== 0 && (p = jn(c))))) : (R = d & ~v, R !== 0 ? p = jn(R) : O !== 0 ? p = jn(O) : c || (c = d & ~n, c !== 0 && (p = jn(c)))), p === 0 ? 0 : i !== 0 && i !== p && (i & v) === 0 && (v = p & -p, c = i & -i, v >= c || v === 32 && (c & 4194048) !== 0) ? i : p;
  function A(n, i) {
    return (n.pendingLanes & ~(n.suspendedLanes & ~n.pingedLanes) & i) === 0;
  function G(n, i) {
        return i + 250;
        return i + 5e3;
  function gt() {
    var n = xl;
    return xl <<= 1, (xl & 4194048) === 0 && (xl = 256), n;
  function _t() {
    var n = Sa;
    return Sa <<= 1, (Sa & 62914560) === 0 && (Sa = 4194304), n;
  function Ht(n) {
    for (var i = [], c = 0; 31 > c; c++) i.push(n);
    return i;
  function Zt(n, i) {
    n.pendingLanes |= i, i !== 268435456 && (n.suspendedLanes = 0, n.pingedLanes = 0, n.warmLanes = 0);
  function Wt(n, i, c, d, p, v) {
    var O = n.pendingLanes;
    var R = n.entanglements, U = n.expirationTimes, K = n.hiddenUpdates;
    for (c = O & ~c; 0 < c; ) {
      var ot = 31 - Yn(c), ct = 1 << ot;
      R[ot] = 0, U[ot] = -1;
      var W = K[ot];
      if (W !== null)
        for (K[ot] = null, ot = 0; ot < W.length; ot++) {
          var P = W[ot];
          P !== null && (P.lane &= -536870913);
        }
      c &= ~ct;
    }
    d !== 0 && ge(n, d, 0), v !== 0 && p === 0 && n.tag !== 0 && (n.suspendedLanes |= v & ~(O & ~i));
  }
  function ge(n, i, c) {
    n.pendingLanes |= i, n.suspendedLanes &= ~i;
    var d = 31 - Yn(i);
    n.entangledLanes |= i, n.entanglements[d] = n.entanglements[d] | 1073741824 | c & 4194090;
  }
  function Jt(n, i) {
    var c = n.entangledLanes |= i;
      var d = 31 - Yn(c), p = 1 << d;
      p & i | n[d] & i && (n[d] |= i), c &= ~p;
  function rn(n) {
  function Ol(n) {
  function td() {
    var n = nt.p;
    return n !== 0 ? n : (n = window.event, n === void 0 ? 32 : Hp(n.type));
  function Rm(n, i) {
    var c = nt.p;
      return nt.p = n, i();
      nt.p = c;
  var yn = Math.random().toString(36).slice(2), Rn = "__reactFiber$" + yn, sa = "__reactProps$" + yn, Hs = "__reactContainer$" + yn, ed = "__reactEvents$" + yn, Wy = "__reactListeners$" + yn, nd = "__reactHandles$" + yn, Fy = "__reactResources$" + yn, Rt = "__reactMarker$" + yn;
  function er(n) {
    delete n[Rn], delete n[sa], delete n[ed], delete n[Wy], delete n[nd];
  function qn(n) {
    var i = n[Rn];
    if (i) return i;
      if (i = c[Hs] || c[Rn]) {
        if (c = i.alternate, i.child !== null || c !== null && c.child !== null)
          for (n = $n(n); n !== null; ) {
            if (c = n[Rn]) return c;
            n = $n(n);
        return i;
  function Su(n) {
    if (n = n[Rn] || n[Hs]) {
      var i = n.tag;
      if (i === 5 || i === 6 || i === 13 || i === 26 || i === 27 || i === 3)
  function nr(n) {
    var i = n.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return n.stateNode;
    throw Error(s(33));
  function Li(n) {
    var i = n[Fy];
    return i || (i = n[Fy] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  function bn(n) {
    n[Rt] = !0;
  var ar = /* @__PURE__ */ new Set(), ja = {};
  function To(n, i) {
    _o(n, i), _o(n + "Capture", i);
  function _o(n, i) {
    for (ja[n] = i, n = 0; n < i.length; n++)
      ar.add(i[n]);
  var Py = RegExp(
  ), ad = {}, wm = {};
  function Iy(n) {
    return vu.call(wm, n) ? !0 : vu.call(ad, n) ? !1 : Py.test(n) ? wm[n] = !0 : (ad[n] = !0, !1);
  function Yi(n, i, c) {
    if (Iy(i))
      if (c === null) n.removeAttribute(i);
            n.removeAttribute(i);
            var d = i.toLowerCase().slice(0, 5);
            if (d !== "data-" && d !== "aria-") {
              n.removeAttribute(i);
        n.setAttribute(i, "" + c);
  function lr(n, i, c) {
    if (c === null) n.removeAttribute(i);
          n.removeAttribute(i);
      n.setAttribute(i, "" + c);
  function Kl(n, i, c, d) {
    if (d === null) n.removeAttribute(c);
      switch (typeof d) {
      n.setAttributeNS(i, c, "" + d);
  var ld, zm;
  function Tu(n) {
    if (ld === void 0)
        var i = c.stack.trim().match(/\n( *(at )?)/);
        ld = i && i[1] || "", zm = -1 < c.stack.indexOf(`
` + ld + n + zm;
  var ca = !1;
  function xo(n, i) {
    if (!n || ca) return "";
    ca = !0;
      var d = {
            if (i) {
              var ct = function() {
              if (Object.defineProperty(ct.prototype, "props", {
                  Reflect.construct(ct, []);
                } catch (P) {
                  var W = P;
                Reflect.construct(n, [], ct);
                  ct.call();
                } catch (P) {
                  W = P;
                n.call(ct.prototype);
              } catch (P) {
                W = P;
              (ct = n()) && typeof ct.catch == "function" && ct.catch(function() {
          } catch (P) {
            if (P && W && typeof P.stack == "string")
              return [P.stack, W.stack];
      d.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var p = Object.getOwnPropertyDescriptor(
        d.DetermineComponentFrameRoot,
      p && p.configurable && Object.defineProperty(
        d.DetermineComponentFrameRoot,
      var v = d.DetermineComponentFrameRoot(), O = v[0], R = v[1];
      if (O && R) {
        var U = O.split(`
`), K = R.split(`
        for (p = d = 0; d < U.length && !U[d].includes("DetermineComponentFrameRoot"); )
          d++;
        for (; p < K.length && !K[p].includes(
          p++;
        if (d === U.length || p === K.length)
          for (d = U.length - 1, p = K.length - 1; 1 <= d && 0 <= p && U[d] !== K[p]; )
            p--;
        for (; 1 <= d && 0 <= p; d--, p--)
          if (U[d] !== K[p]) {
            if (d !== 1 || p !== 1)
                if (d--, p--, 0 > p || U[d] !== K[p]) {
                  var ot = `
` + U[d].replace(" at new ", " at ");
                  return n.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", n.displayName)), ot;
              while (1 <= d && 0 <= p);
      ca = !1, Error.prepareStackTrace = c;
    return (c = n ? n.displayName || n.name : "") ? Tu(c) : "";
  function _u(n) {
        return Tu(n.type);
        return Tu("Lazy");
        return Tu("Suspense");
        return Tu("SuspenseList");
        return xo(n.type, !1);
        return xo(n.type.render, !1);
        return xo(n.type, !0);
        return Tu("Activity");
  function Cm(n) {
      var i = "";
        i += _u(n), n = n.return;
      return i;
  function In(n) {
  function ir(n) {
    var i = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  function Hm(n) {
    var i = ir(n) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(
      i
    ), d = "" + n[i];
    if (!n.hasOwnProperty(i) && typeof c < "u" && typeof c.get == "function" && typeof c.set == "function") {
      var p = c.get, v = c.set;
      return Object.defineProperty(n, i, {
          return p.call(this);
        set: function(O) {
          d = "" + O, v.call(this, O);
      }), Object.defineProperty(n, i, {
          return d;
        setValue: function(O) {
          d = "" + O;
          n._valueTracker = null, delete n[i];
  function Eo(n) {
    n._valueTracker || (n._valueTracker = Hm(n));
  function xu(n) {
    var i = n._valueTracker;
    if (!i) return !0;
    var c = i.getValue(), d = "";
    return n && (d = ir(n) ? n.checked ? "true" : "false" : n.value), n = d, n !== c ? (i.setValue(n), !0) : !1;
  function Us(n) {
  var Ov = /[\n"\\]/g;
  function nl(n) {
      Ov,
      function(i) {
        return "\\" + i.charCodeAt(0).toString(16) + " ";
  function id(n, i, c, d, p, v, O, R) {
    n.name = "", O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" ? n.type = O : n.removeAttribute("type"), i != null ? O === "number" ? (i === 0 && n.value === "" || n.value != i) && (n.value = "" + In(i)) : n.value !== "" + In(i) && (n.value = "" + In(i)) : O !== "submit" && O !== "reset" || n.removeAttribute("value"), i != null ? or(n, O, In(i)) : c != null ? or(n, O, In(c)) : d != null && n.removeAttribute("value"), p == null && v != null && (n.defaultChecked = !!v), p != null && (n.checked = p && typeof p != "function" && typeof p != "symbol"), R != null && typeof R != "function" && typeof R != "symbol" && typeof R != "boolean" ? n.name = "" + In(R) : n.removeAttribute("name");
  function od(n, i, c, d, p, v, O, R) {
    if (v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (n.type = v), i != null || c != null) {
      if (!(v !== "submit" && v !== "reset" || i != null))
      c = c != null ? "" + In(c) : "", i = i != null ? "" + In(i) : c, R || i === n.value || (n.value = i), n.defaultValue = i;
    d = d ?? p, d = typeof d != "function" && typeof d != "symbol" && !!d, n.checked = R ? n.checked : !!d, n.defaultChecked = !!d, O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" && (n.name = O);
  function or(n, i, c) {
    i === "number" && Us(n.ownerDocument) === n || n.defaultValue === "" + c || (n.defaultValue = "" + c);
  function Eu(n, i, c, d) {
    if (n = n.options, i) {
      i = {};
      for (var p = 0; p < c.length; p++)
        i["$" + c[p]] = !0;
        p = i.hasOwnProperty("$" + n[c].value), n[c].selected !== p && (n[c].selected = p), p && d && (n[c].defaultSelected = !0);
      for (c = "" + In(c), i = null, p = 0; p < n.length; p++) {
        if (n[p].value === c) {
          n[p].selected = !0, d && (n[p].defaultSelected = !0);
        i !== null || n[p].disabled || (i = n[p]);
      i !== null && (i.selected = !0);
  function Um(n, i, c) {
    if (i != null && (i = "" + In(i), i !== n.value && (n.value = i), c == null)) {
      n.defaultValue !== i && (n.defaultValue = i);
    n.defaultValue = c != null ? "" + In(c) : "";
  function Nm(n, i, c, d) {
    if (i == null) {
      if (d != null) {
        if (c != null) throw Error(s(92));
        if (Lt(d)) {
          if (1 < d.length) throw Error(s(93));
          d = d[0];
        c = d;
      c == null && (c = ""), i = c;
    c = In(i), n.defaultValue = c, d = n.textContent, d === c && d !== "" && d !== null && (n.value = d);
  function Ns(n, i) {
    if (i) {
        c.nodeValue = i;
    n.textContent = i;
  var t0 = new Set(
  function ud(n, i, c) {
    var d = i.indexOf("--") === 0;
    c == null || typeof c == "boolean" || c === "" ? d ? n.setProperty(i, "") : i === "float" ? n.cssFloat = "" : n[i] = "" : d ? n.setProperty(i, c) : typeof c != "number" || c === 0 || t0.has(i) ? i === "float" ? n.cssFloat = c : n[i] = ("" + c).trim() : n[i] = c + "px";
  function ur(n, i, c) {
    if (i != null && typeof i != "object")
      throw Error(s(62));
      for (var d in c)
        !c.hasOwnProperty(d) || i != null && i.hasOwnProperty(d) || (d.indexOf("--") === 0 ? n.setProperty(d, "") : d === "float" ? n.cssFloat = "" : n[d] = "");
      for (var p in i)
        d = i[p], i.hasOwnProperty(p) && c[p] !== d && ud(n, p, d);
      for (var v in i)
        i.hasOwnProperty(v) && ud(n, v, i[v]);
  function Ou(n) {
  var Mv = /* @__PURE__ */ new Map([
  ]), e0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sr(n) {
    return e0.test("" + n) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : n;
  var Mu = null;
  function sd(n) {
  var ks = null, Bs = null;
  function n0(n) {
    var i = Su(n);
    if (i && (n = i.stateNode)) {
      var c = n[sa] || null;
      t: switch (n = i.stateNode, i.type) {
          if (id(
          ), i = c.name, c.type === "radio" && i != null) {
              'input[name="' + nl(
                "" + i
            ), i = 0; i < c.length; i++) {
              var d = c[i];
              if (d !== n && d.form === n.form) {
                var p = d[sa] || null;
                if (!p) throw Error(s(90));
                id(
                  d,
                  p.value,
                  p.defaultValue,
                  p.defaultValue,
                  p.checked,
                  p.defaultChecked,
                  p.type,
                  p.name
            for (i = 0; i < c.length; i++)
              d = c[i], d.form === n.form && xu(d);
          Um(n, c.value, c.defaultValue);
          i = c.value, i != null && Eu(n, !!c.multiple, i, !1);
  var km = !1;
  function Ls(n, i, c) {
    if (km) return n(i, c);
    km = !0;
      var d = n(i);
      return d;
      if (km = !1, (ks !== null || Bs !== null) && (ls(), ks && (i = ks, n = Bs, Bs = ks = null, n0(i), n)))
        for (i = 0; i < n.length; i++) n0(n[i]);
  function Du(n, i) {
    var d = c[sa] || null;
    if (d === null) return null;
    c = d[i];
    t: switch (i) {
        (d = !d.disabled) || (n = n.type, d = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !d;
        s(231, i, typeof c)
  var $l = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), cd = !1;
  if ($l)
      var ji = {};
      Object.defineProperty(ji, "passive", {
          cd = !0;
      }), window.addEventListener("test", ji, ji), window.removeEventListener("test", ji, ji);
      cd = !1;
    }
  var qi = null, Ys = null, Au = null;
  function Bm() {
    if (Au) return Au;
    var n, i = Ys, c = i.length, d, p = "value" in qi ? qi.value : qi.textContent, v = p.length;
    for (n = 0; n < c && i[n] === p[n]; n++) ;
    var O = c - n;
    for (d = 1; d <= O && i[c - d] === p[v - d]; d++) ;
    return Au = p.slice(n, 1 < d ? 1 - d : void 0);
  }
  function Vn(n) {
    var i = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && i === 13 && (n = 13)) : n = i, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function rd() {
  function fd() {
  function ra(n) {
    function i(c, d, p, v, O) {
      this._reactName = c, this._targetInst = p, this.type = d, this.nativeEvent = v, this.target = O, this.currentTarget = null;
      for (var R in n)
        n.hasOwnProperty(R) && (c = n[R], this[R] = c ? c(v) : v[R]);
      return this.isDefaultPrevented = (v.defaultPrevented != null ? v.defaultPrevented : v.returnValue === !1) ? rd : fd, this.isPropagationStopped = fd, this;
    return E(i.prototype, {
        c && (c.preventDefault ? c.preventDefault() : typeof c.returnValue != "unknown" && (c.returnValue = !1), this.isDefaultPrevented = rd);
        c && (c.stopPropagation ? c.stopPropagation() : typeof c.cancelBubble != "unknown" && (c.cancelBubble = !0), this.isPropagationStopped = rd);
      isPersistent: rd
    }), i;
  var Oo = {
  }, dd = ra(Oo), cr = E({}, Oo, { view: 0, detail: 0 }), a0 = ra(cr), Lm, hd, rr, Ru = E({}, cr, {
    getModifierState: Vi,
      return "movementX" in n ? n.movementX : (n !== rr && (rr && n.type === "mousemove" ? (Lm = n.screenX - rr.screenX, hd = n.screenY - rr.screenY) : hd = Lm = 0, rr = n), Lm);
      return "movementY" in n ? n.movementY : hd;
  }), Ym = ra(Ru), l0 = E({}, Ru, { dataTransfer: 0 }), i0 = ra(l0), Dv = E({}, cr, { relatedTarget: 0 }), jm = ra(Dv), Av = E({}, Oo, {
  }), Rv = ra(Av), wv = E({}, Oo, {
  }), fr = ra(wv), o0 = E({}, Oo, { data: 0 }), qm = ra(o0), u0 = {
  }, s0 = {
  }, Vm = {
  function c0(n) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(n) : (n = Vm[n]) ? !!i[n] : !1;
  function Vi() {
    return c0;
  var wu = E({}, cr, {
        var i = u0[n.key] || n.key;
        if (i !== "Unidentified") return i;
      return n.type === "keypress" ? (n = Vn(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? s0[n.keyCode] || "Unidentified" : "";
    getModifierState: Vi,
      return n.type === "keypress" ? Vn(n) : 0;
      return n.type === "keypress" ? Vn(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }), Ml = ra(wu), qa = E({}, Ru, {
  }), dr = ra(qa), md = E({}, cr, {
    getModifierState: Vi
  }), Gm = ra(md), Ta = E({}, Oo, {
  }), r0 = ra(Ta), gd = E({}, Ru, {
  }), zu = ra(gd), Xm = E({}, Oo, {
  }), f0 = ra(Xm), d0 = [9, 13, 27, 32], hr = $l && "CompositionEvent" in window, mr = null;
  $l && "documentMode" in document && (mr = document.documentMode);
  var Qm = $l && "TextEvent" in window && !mr, Jl = $l && (!hr || mr && 8 < mr && 11 >= mr), Zm = " ", pd = !1;
  function gr(n, i) {
        return d0.indexOf(i.keyCode) !== -1;
        return i.keyCode !== 229;
  function Mo(n) {
  var Do = !1;
  function Km(n, i) {
        return Mo(i);
        return i.which !== 32 ? null : (pd = !0, Zm);
        return n = i.data, n === Zm && pd ? null : n;
  function Cu(n, i) {
    if (Do)
      return n === "compositionend" || !hr && gr(n, i) ? (n = Bm(), Au = Ys = qi = null, Do = !1, n) : null;
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length)
            return i.char;
          if (i.which) return String.fromCharCode(i.which);
        return Jl && i.locale !== "ko" ? null : i.data;
  var h0 = {
  function yd(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i === "input" ? !!h0[n.type] : i === "textarea";
  function bd(n, i, c, d) {
    ks ? Bs ? Bs.push(d) : Bs = [d] : ks = d, i = _c(i, "onChange"), 0 < i.length && (c = new dd(
      d
    ), n.push({ event: c, listeners: i }));
  }
  var Dl = null, Al = null;
  function $m(n) {
    ss(n, 0);
  }
  function Wl(n) {
    var i = nr(n);
    if (xu(i)) return n;
  }
  function Jm(n, i) {
    if (n === "change") return i;
  }
  var Wm = !1;
  if ($l) {
    var Hu;
    if ($l) {
      var Uu = "oninput" in document;
      if (!Uu) {
        var Fm = document.createElement("div");
        Fm.setAttribute("oninput", "return;"), Uu = typeof Fm.oninput == "function";
      }
      Hu = Uu;
    } else Hu = !1;
    Wm = Hu && (!document.documentMode || 9 < document.documentMode);
  }
  function js() {
    Dl && (Dl.detachEvent("onpropertychange", Pm), Al = Dl = null);
  }
  function Pm(n) {
    if (n.propertyName === "value" && Wl(Al)) {
      var i = [];
      bd(
        i,
        Al,
        sd(n)
      ), Ls($m, i);
  function vd(n, i, c) {
    n === "focusin" ? (js(), Dl = i, Al = c, Dl.attachEvent("onpropertychange", Pm)) : n === "focusout" && js();
  function Ao(n) {
      return Wl(Al);
  function Gi(n, i) {
    if (n === "click") return Wl(i);
  function Im(n, i) {
      return Wl(i);
  function tg(n, i) {
    return n === i && (n !== 0 || 1 / n === 1 / i) || n !== n && i !== i;
  var Gn = typeof Object.is == "function" ? Object.is : tg;
  function Ro(n, i) {
    if (Gn(n, i)) return !0;
    if (typeof n != "object" || n === null || typeof i != "object" || i === null)
    var c = Object.keys(n), d = Object.keys(i);
    if (c.length !== d.length) return !1;
    for (d = 0; d < c.length; d++) {
      var p = c[d];
      if (!vu.call(i, p) || !Gn(n[p], i[p]))
  function wo(n) {
  function Ye(n, i) {
    var c = wo(n);
    for (var d; c; ) {
        if (d = n + c.textContent.length, n <= i && d >= i)
          return { node: c, offset: i - n };
        n = d;
      c = wo(c);
  function pr(n, i) {
    return n && i ? n === i ? !0 : n && n.nodeType === 3 ? !1 : i && i.nodeType === 3 ? pr(n, i.parentNode) : "contains" in n ? n.contains(i) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(i) & 16) : !1 : !1;
  function eg(n) {
    for (var i = Us(n.document); i instanceof n.HTMLIFrameElement; ) {
        var c = typeof i.contentWindow.location.href == "string";
      if (c) n = i.contentWindow;
      i = Us(n.document);
    return i;
  function yr(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i && (i === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || i === "textarea" || n.contentEditable === "true");
  }
  var Nu = $l && "documentMode" in document && 11 >= document.documentMode, Fl = null, Rl = null, zo = null, ku = !1;
  function Sd(n, i, c) {
    var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
    ku || Fl == null || Fl !== Us(d) || (d = Fl, "selectionStart" in d && yr(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
      anchorNode: d.anchorNode,
      anchorOffset: d.anchorOffset,
      focusNode: d.focusNode,
      focusOffset: d.focusOffset
    }), zo && Ro(zo, d) || (zo = d, d = _c(Rl, "onSelect"), 0 < d.length && (i = new dd(
      i,
    ), n.push({ event: i, listeners: d }), i.target = Fl)));
  function Xi(n, i) {
    return c[n.toLowerCase()] = i.toLowerCase(), c["Webkit" + n] = "webkit" + i, c["Moz" + n] = "moz" + i, c;
  }
  var Bu = {
    animationend: Xi("Animation", "AnimationEnd"),
    animationiteration: Xi("Animation", "AnimationIteration"),
    animationstart: Xi("Animation", "AnimationStart"),
    transitionrun: Xi("Transition", "TransitionRun"),
    transitionstart: Xi("Transition", "TransitionStart"),
    transitioncancel: Xi("Transition", "TransitionCancel"),
    transitionend: Xi("Transition", "TransitionEnd")
  }, al = {}, wl = {};
  $l && (wl = document.createElement("div").style, "AnimationEvent" in window || (delete Bu.animationend.animation, delete Bu.animationiteration.animation, delete Bu.animationstart.animation), "TransitionEvent" in window || delete Bu.transitionend.transition);
  function Pl(n) {
    if (al[n]) return al[n];
    if (!Bu[n]) return n;
    var i = Bu[n], c;
    for (c in i)
      if (i.hasOwnProperty(c) && c in wl)
        return al[n] = i[c];
  var m0 = Pl("animationend"), ng = Pl("animationiteration"), g0 = Pl("animationstart"), ag = Pl("transitionrun"), Td = Pl("transitionstart"), p0 = Pl("transitioncancel"), lg = Pl("transitionend"), ig = /* @__PURE__ */ new Map(), qs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  qs.push("scrollEnd");
  function ll(n, i) {
    ig.set(n, i), To(i, [n]);
  var og = /* @__PURE__ */ new WeakMap();
  function Va(n, i) {
      var c = og.get(n);
      return c !== void 0 ? c : (i = {
        source: i,
        stack: Cm(i)
      }, og.set(n, i), i);
      source: i,
      stack: Cm(i)
  var _a = [], Co = 0, Il = 0;
  function zl() {
    for (var n = Co, i = Il = Co = 0; i < n; ) {
      var c = _a[i];
      _a[i++] = null;
      var d = _a[i];
      _a[i++] = null;
      var p = _a[i];
      _a[i++] = null;
      var v = _a[i];
      if (_a[i++] = null, d !== null && p !== null) {
        var O = d.pending;
        O === null ? p.next = p : (p.next = O.next, O.next = p), d.pending = p;
      v !== 0 && Gs(c, p, v);
  function Ho(n, i, c, d) {
    _a[Co++] = n, _a[Co++] = i, _a[Co++] = c, _a[Co++] = d, Il |= d, n.lanes |= d, n = n.alternate, n !== null && (n.lanes |= d);
  function Vs(n, i, c, d) {
    return Ho(n, i, c, d), br(n);
  function ti(n, i) {
    return Ho(n, null, null, i), br(n);
  function Gs(n, i, c) {
    var d = n.alternate;
    d !== null && (d.lanes |= c);
    for (var p = !1, v = n.return; v !== null; )
      v.childLanes |= c, d = v.alternate, d !== null && (d.childLanes |= c), v.tag === 22 && (n = v.stateNode, n === null || n._visibility & 1 || (p = !0)), n = v, v = v.return;
    return n.tag === 3 ? (v = n.stateNode, p && i !== null && (p = 31 - Yn(c), n = v.hiddenUpdates, d = n[p], d === null ? n[p] = [i] : d.push(i), i.lane = c | 536870912), v) : null;
  }
  function br(n) {
    if (50 < pc)
      throw pc = 0, op = null, Error(s(185));
    for (var i = n.return; i !== null; )
      n = i, i = n.return;
  var Xs = {};
  function y0(n, i, c, d) {
    this.tag = n, this.key = c, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  function xa(n, i, c, d) {
    return new y0(n, i, c, d);
  function vr(n) {
  function Cl(n, i) {
    return c === null ? (c = xa(
      i,
    ), c.elementType = n.elementType, c.type = n.type, c.stateNode = n.stateNode, c.alternate = n, n.alternate = c) : (c.pendingProps = i, c.type = n.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null), c.flags = n.flags & 65011712, c.childLanes = n.childLanes, c.lanes = n.lanes, c.child = n.child, c.memoizedProps = n.memoizedProps, c.memoizedState = n.memoizedState, c.updateQueue = n.updateQueue, i = n.dependencies, c.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, c.sibling = n.sibling, c.index = n.index, c.ref = n.ref, c.refCleanup = n.refCleanup, c;
  function ie(n, i) {
    return c === null ? (n.childLanes = 0, n.lanes = i, n.child = null, n.subtreeFlags = 0, n.memoizedProps = null, n.memoizedState = null, n.updateQueue = null, n.dependencies = null, n.stateNode = null) : (n.childLanes = c.childLanes, n.lanes = c.lanes, n.child = c.child, n.subtreeFlags = 0, n.deletions = null, n.memoizedProps = c.memoizedProps, n.memoizedState = c.memoizedState, n.updateQueue = c.updateQueue, n.type = c.type, i = c.dependencies, n.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
  function mt(n, i, c, d, p, v) {
    var O = 0;
    if (d = n, typeof n == "function") vr(n) && (O = 1);
      O = F0(
        bt.current
        case ht:
          return n = xa(31, c, i, p), n.elementType = ht, n.lanes = v, n;
        case q:
          return il(c.children, p, v, i);
        case V:
          O = 8, p |= 24;
        case B:
          return n = xa(12, c, i, p | 2), n.elementType = B, n.lanes = v, n;
        case ut:
          return n = xa(13, c, i, p), n.elementType = ut, n.lanes = v, n;
        case Mt:
          return n = xa(19, c, i, p), n.elementType = Mt, n.lanes = v, n;
              case Q:
              case yt:
                O = 10;
              case dt:
                O = 9;
              case St:
                O = 11;
              case pt:
                O = 14;
              case Ot:
                O = 16, d = null;
          O = 29, c = Error(
            s(130, n === null ? "null" : typeof n, "")
          ), d = null;
    return i = xa(O, c, i, p), i.elementType = n, i.type = d, i.lanes = v, i;
  function il(n, i, c, d) {
    return n = xa(7, n, d, i), n.lanes = c, n;
  function Qs(n, i, c) {
    return n = xa(6, n, null, i), n.lanes = c, n;
  function $e(n, i, c) {
    return i = xa(
      i
    ), i.lanes = c, i.stateNode = {
    }, i;
  }
  var Uo = [], No = 0, Sr = null, Zs = 0, ol = [], Ea = 0, Qi = null, Hl = 1, Pe = "";
  function pe(n, i) {
    Uo[No++] = Zs, Uo[No++] = Sr, Sr = n, Zs = i;
  }
  function _d(n, i, c) {
    ol[Ea++] = Hl, ol[Ea++] = Pe, ol[Ea++] = Qi, Qi = n;
    var d = Hl;
    n = Pe;
    var p = 32 - Yn(d) - 1;
    d &= ~(1 << p), c += 1;
    var v = 32 - Yn(i) + p;
    if (30 < v) {
      var O = p - p % 5;
      v = (d & (1 << O) - 1).toString(32), d >>= O, p -= O, Hl = 1 << 32 - Yn(i) + p | c << p | d, Pe = v + n;
      Hl = 1 << v | c << p | d, Pe = n;
  function Lu(n) {
    n.return !== null && (pe(n, 1), _d(n, 1, 0));
  function ei(n) {
    for (; n === Sr; )
      Sr = Uo[--No], Uo[No] = null, Zs = Uo[--No], Uo[No] = null;
    for (; n === Qi; )
      Qi = ol[--Ea], ol[Ea] = null, Pe = ol[--Ea], ol[Ea] = null, Hl = ol[--Ea], ol[Ea] = null;
  var un = null, Te = null, ve = !1, ul = null, sl = !1, Yu = Error(s(519));
  function Zi(n) {
    var i = Error(s(418, ""));
    throw Js(Va(i, n)), Yu;
  function Tr(n) {
    var i = n.stateNode, c = n.type, d = n.memoizedProps;
    switch (i[Rn] = n, i[sa] = d, c) {
        Pt("cancel", i), Pt("close", i);
        Pt("load", i);
        for (c = 0; c < uf.length; c++)
          Pt(uf[c], i);
        Pt("error", i);
        Pt("error", i), Pt("load", i);
        Pt("toggle", i);
        Pt("invalid", i), od(
          i,
          d.value,
          d.defaultValue,
          d.checked,
          d.defaultChecked,
          d.type,
          d.name,
        ), Eo(i);
        Pt("invalid", i);
        Pt("invalid", i), Nm(i, d.value, d.defaultValue, d.children), Eo(i);
    c = d.children, typeof c != "string" && typeof c != "number" && typeof c != "bigint" || i.textContent === "" + c || d.suppressHydrationWarning === !0 || Sp(i.textContent, c) ? (d.popover != null && (Pt("beforetoggle", i), Pt("toggle", i)), d.onScroll != null && Pt("scroll", i), d.onScrollEnd != null && Pt("scrollend", i), d.onClick != null && (i.onclick = Ch), i = !0) : i = !1, i || Zi(n);
  function ug(n) {
    for (un = n.return; un; )
      switch (un.tag) {
          sl = !1;
          sl = !0;
          un = un.return;
  function Ks(n) {
    if (n !== un) return !1;
    if (!ve) return ug(n), ve = !0, !1;
    var i = n.tag, c;
    if ((c = i !== 3 && i !== 27) && ((c = i === 5) && (c = n.type, c = !(c !== "form" && c !== "button") || Ti(n.type, n.memoizedProps)), c = !c), c && Te && Zi(n), ug(n), i === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
        for (n = n.nextSibling, i = 0; n; ) {
              if (i === 0) {
                Te = Yl(n.nextSibling);
              i--;
              c !== "$" && c !== "$!" && c !== "$?" || i++;
        Te = null;
      i === 27 ? (i = Te, Io(n.type) ? (n = tu, tu = null, Te = n) : Te = i) : Te = un ? Yl(n.stateNode.nextSibling) : null;
  function $s() {
    Te = un = null, ve = !1;
  function sg() {
    var n = ul;
    return n !== null && (wa === null ? wa = n : wa.push.apply(
      wa,
    ), ul = null), n;
  function Js(n) {
    ul === null ? ul = [n] : ul.push(n);
  var _r = $(null), Ki = null, Ul = null;
  function $i(n, i, c) {
    rt(_r, i._currentValue), i._currentValue = c;
  function ni(n) {
    n._currentValue = _r.current, at(_r);
  function xd(n, i, c) {
      var d = n.alternate;
      if ((n.childLanes & i) !== i ? (n.childLanes |= i, d !== null && (d.childLanes |= i)) : d !== null && (d.childLanes & i) !== i && (d.childLanes |= i), n === c) break;
  function cg(n, i, c, d) {
    var p = n.child;
    for (p !== null && (p.return = n); p !== null; ) {
      var v = p.dependencies;
      if (v !== null) {
        var O = p.child;
        v = v.firstContext;
        t: for (; v !== null; ) {
          var R = v;
          v = p;
          for (var U = 0; U < i.length; U++)
            if (R.context === i[U]) {
              v.lanes |= c, R = v.alternate, R !== null && (R.lanes |= c), xd(
                v.return,
              ), d || (O = null);
          v = R.next;
      } else if (p.tag === 18) {
        if (O = p.return, O === null) throw Error(s(341));
        O.lanes |= c, v = O.alternate, v !== null && (v.lanes |= c), xd(O, c, n), O = null;
      } else O = p.child;
      if (O !== null) O.return = p;
        for (O = p; O !== null; ) {
          if (O === n) {
            O = null;
          if (p = O.sibling, p !== null) {
            p.return = O.return, O = p;
          O = O.return;
      p = O;
  function Ws(n, i, c, d) {
    for (var p = i, v = !1; p !== null; ) {
      if (!v) {
        if ((p.flags & 524288) !== 0) v = !0;
        else if ((p.flags & 262144) !== 0) break;
      }
      if (p.tag === 10) {
        var O = p.alternate;
        if (O === null) throw Error(s(387));
        if (O = O.memoizedProps, O !== null) {
          var R = p.type;
          Gn(p.pendingProps.value, O.value) || (n !== null ? n.push(R) : n = [R]);
        }
      } else if (p === pn.current) {
        if (O = p.alternate, O === null) throw Error(s(387));
        O.memoizedState.memoizedState !== p.memoizedState.memoizedState && (n !== null ? n.push(Ua) : n = [Ua]);
      }
      p = p.return;
    }
    n !== null && cg(
      i,
      d
    ), i.flags |= 262144;
  function xr(n) {
      if (!Gn(
  function ko(n) {
    Ki = n, Ul = null, n = n.dependencies, n !== null && (n.firstContext = null);
  function wn(n) {
    return rg(Ki, n);
  function Er(n, i) {
    return Ki === null && ko(n), rg(n, i);
  function rg(n, i) {
    var c = i._currentValue;
    if (i = { context: i, memoizedValue: c, next: null }, Ul === null) {
      if (n === null) throw Error(s(308));
      Ul = i, n.dependencies = { lanes: 0, firstContext: i }, n.flags |= 524288;
    } else Ul = Ul.next = i;
  var Fs = typeof AbortController < "u" ? AbortController : function() {
    var n = [], i = this.signal = {
      addEventListener: function(c, d) {
        n.push(d);
      i.aborted = !0, n.forEach(function(c) {
  }, Ed = u.unstable_scheduleCallback, b0 = u.unstable_NormalPriority, vn = {
    $$typeof: yt,
  function Ps() {
      controller: new Fs(),
  function ai(n) {
    n.refCount--, n.refCount === 0 && Ed(b0, function() {
  var Bo = null, Or = 0, cl = 0, Sn = null;
  function Od(n, i) {
    if (Bo === null) {
      var c = Bo = [];
      Or = 0, cl = us(), Sn = {
        then: function(d) {
          c.push(d);
    return Or++, i.then(Md, Md), i;
  function Md() {
    if (--Or === 0 && Bo !== null) {
      Sn !== null && (Sn.status = "fulfilled");
      var n = Bo;
      Bo = null, cl = 0, Sn = null;
      for (var i = 0; i < n.length; i++) (0, n[i])();
  function v0(n, i) {
    var c = [], d = {
      then: function(p) {
        c.push(p);
        d.status = "fulfilled", d.value = i;
        for (var p = 0; p < c.length; p++) (0, c[p])(i);
      function(p) {
        for (d.status = "rejected", d.reason = p, p = 0; p < c.length; p++)
          (0, c[p])(void 0);
    ), d;
  var Dd = L.S;
  L.S = function(n, i) {
    typeof i == "object" && i !== null && typeof i.then == "function" && Od(n, i), Dd !== null && Dd(n, i);
  var li = $(null);
  function Mr() {
    var n = li.current;
    return n !== null ? n : Ne.pooledCache;
  function ju(n, i) {
    i === null ? rt(li, li.current) : rt(li, i.pool);
  function Ad() {
    var n = Mr();
    return n === null ? null : { parent: vn._currentValue, pool: n };
  var Lo = Error(s(460)), Rd = Error(s(474)), Dr = Error(s(542)), wd = { then: function() {
  function zd(n) {
  function Ar() {
  function fg(n, i, c) {
    switch (c = n[c], c === void 0 ? n.push(i) : c !== i && (i.then(Ar, Ar), i = c), i.status) {
        return i.value;
        throw n = i.reason, hg(n), n;
        if (typeof i.status == "string") i.then(Ar, Ar);
          if (n = Ne, n !== null && 100 < n.shellSuspendCounter)
            throw Error(s(482));
          n = i, n.status = "pending", n.then(
            function(d) {
              if (i.status === "pending") {
                var p = i;
                p.status = "fulfilled", p.value = d;
            function(d) {
              if (i.status === "pending") {
                var p = i;
                p.status = "rejected", p.reason = d;
        switch (i.status) {
            return i.value;
            throw n = i.reason, hg(n), n;
        throw qu = i, Lo;
  var qu = null;
  function dg() {
    if (qu === null) throw Error(s(459));
    var n = qu;
    return qu = null, n;
  function hg(n) {
    if (n === Lo || n === Dr)
      throw Error(s(483));
  var ii = !1;
  function Cd(n) {
  function Hd(n, i) {
    n = n.updateQueue, i.updateQueue === n && (i.updateQueue = {
  function oi(n, i, c) {
    var d = n.updateQueue;
    if (d === null) return null;
    if (d = d.shared, (De & 2) !== 0) {
      var p = d.pending;
      return p === null ? i.next = i : (i.next = p.next, p.next = i), d.pending = i, i = br(n), Gs(n, null, c), i;
    return Ho(n, d, i, c), br(n);
  function Vu(n, i, c) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (c & 4194048) !== 0)) {
      var d = i.lanes;
      d &= n.pendingLanes, c |= d, i.lanes = c, Jt(n, c);
  function mg(n, i) {
    var c = n.updateQueue, d = n.alternate;
    if (d !== null && (d = d.updateQueue, c === d)) {
      var p = null, v = null;
          var O = {
          v === null ? p = v = O : v = v.next = O, c = c.next;
        v === null ? p = v = i : v = v.next = i;
      } else p = v = i;
        baseState: d.baseState,
        firstBaseUpdate: p,
        lastBaseUpdate: v,
        shared: d.shared,
        callbacks: d.callbacks
    n = c.lastBaseUpdate, n === null ? c.firstBaseUpdate = i : n.next = i, c.lastBaseUpdate = i;
  var gg = !1;
  function Is() {
    if (gg) {
      var n = Sn;
  function Ji(n, i, c, d) {
    gg = !1;
    var p = n.updateQueue;
    ii = !1;
    var v = p.firstBaseUpdate, O = p.lastBaseUpdate, R = p.shared.pending;
    if (R !== null) {
      p.shared.pending = null;
      var U = R, K = U.next;
      U.next = null, O === null ? v = K : O.next = K, O = U;
      var ot = n.alternate;
      ot !== null && (ot = ot.updateQueue, R = ot.lastBaseUpdate, R !== O && (R === null ? ot.firstBaseUpdate = K : R.next = K, ot.lastBaseUpdate = U));
    }
    if (v !== null) {
      var ct = p.baseState;
      O = 0, ot = K = U = null, R = v;
        var W = R.lane & -536870913, P = W !== R.lane;
        if (P ? (de & W) === W : (d & W) === W) {
          W !== 0 && W === cl && (gg = !0), ot !== null && (ot = ot.next = {
            tag: R.tag,
            payload: R.payload,
            var kt = n, Bt = R;
            W = i;
            var xe = c;
            switch (Bt.tag) {
                if (kt = Bt.payload, typeof kt == "function") {
                  ct = kt.call(xe, ct, W);
                ct = kt;
                kt.flags = kt.flags & -65537 | 128;
                if (kt = Bt.payload, W = typeof kt == "function" ? kt.call(xe, ct, W) : kt, W == null) break t;
                ct = E({}, ct, W);
                ii = !0;
          W = R.callback, W !== null && (n.flags |= 64, P && (n.flags |= 8192), P = p.callbacks, P === null ? p.callbacks = [W] : P.push(W));
          P = {
            lane: W,
            tag: R.tag,
            payload: R.payload,
            callback: R.callback,
          }, ot === null ? (K = ot = P, U = ct) : ot = ot.next = P, O |= W;
        if (R = R.next, R === null) {
          if (R = p.shared.pending, R === null)
          P = R, R = P.next, P.next = null, p.lastBaseUpdate = P, p.shared.pending = null;
      ot === null && (U = ct), p.baseState = U, p.firstBaseUpdate = K, p.lastBaseUpdate = ot, v === null && (p.shared.lanes = 0), no |= O, n.lanes = O, n.memoizedState = ct;
  function Ud(n, i) {
      throw Error(s(191, n));
    n.call(i);
  function Rr(n, i) {
        Ud(c[n], i);
  var Gu = $(null), wr = $(0);
  function zn(n, i) {
    n = eo, rt(wr, n), rt(Gu, i), eo = n | i.baseLanes;
  function tc() {
    rt(wr, eo), rt(Gu, Gu.current);
  function ec() {
    eo = wr.current, at(Gu), at(wr);
  var rl = 0, Ft = null, Me = null, Je = null, zr = !1, Ga = !1, Yo = !1, Nl = 0, Xa = 0, Wi = null, pg = 0;
  function We() {
    throw Error(s(321));
  function Nd(n, i) {
    if (i === null) return !1;
    for (var c = 0; c < i.length && c < n.length; c++)
      if (!Gn(n[c], i[c])) return !1;
  function kd(n, i, c, d, p, v) {
    return rl = v, Ft = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, L.H = n === null || n.memoizedState === null ? zg : Cg, Yo = !1, v = c(d, p), Yo = !1, Ga && (v = yg(
      i,
      d,
      p
    )), jo(n), v;
  }
  function jo(n) {
    L.H = Id;
    var i = Me !== null && Me.next !== null;
    if (rl = 0, Je = Me = Ft = null, zr = !1, Xa = 0, Wi = null, i) throw Error(s(300));
    n === null || Tn || (n = n.dependencies, n !== null && xr(n) && (Tn = !0));
  }
  function yg(n, i, c, d) {
    Ft = n;
    var p = 0;
      if (Ga && (Wi = null), Xa = 0, Ga = !1, 25 <= p) throw Error(s(301));
      if (p += 1, Je = Me = null, n.updateQueue != null) {
        var v = n.updateQueue;
        v.lastEffect = null, v.events = null, v.stores = null, v.memoCache != null && (v.memoCache.index = 0);
      L.H = Fi, v = i(c, d);
    } while (Ga);
    return v;
  function S0() {
    var n = L.H, i = n.useState()[0];
    return i = typeof i.then == "function" ? Hr(i) : i, n = n.useState()[0], (Me !== null ? Me.memoizedState : null) !== n && (Ft.flags |= 1024), i;
  function Bd() {
    var n = Nl !== 0;
    return Nl = 0, n;
  function nc(n, i, c) {
    i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~c;
  function Ld(n) {
    if (zr) {
        var i = n.queue;
        i !== null && (i.pending = null), n = n.next;
      zr = !1;
    rl = 0, Je = Me = Ft = null, Ga = !1, Xa = Nl = 0, Wi = null;
  function ta() {
    return Je === null ? Ft.memoizedState = Je = n : Je = Je.next = n, Je;
  function Ie() {
    if (Me === null) {
      var n = Ft.alternate;
    } else n = Me.next;
    var i = Je === null ? Ft.memoizedState : Je.next;
    if (i !== null)
      Je = i, Me = n;
        throw Ft.alternate === null ? Error(s(467)) : Error(s(310));
      Me = n, n = {
        memoizedState: Me.memoizedState,
        baseState: Me.baseState,
        baseQueue: Me.baseQueue,
        queue: Me.queue,
      }, Je === null ? Ft.memoizedState = Je = n : Je = Je.next = n;
    return Je;
  function Cr() {
  function Hr(n) {
    var i = Xa;
    return Xa += 1, Wi === null && (Wi = []), n = fg(Wi, n, i), i = Ft, (Je === null ? i.memoizedState : Je.next) === null && (i = i.alternate, L.H = i === null || i.memoizedState === null ? zg : Cg), n;
  function fn(n) {
      if (typeof n.then == "function") return Hr(n);
      if (n.$$typeof === yt) return wn(n);
    }
    throw Error(s(438, String(n)));
  }
  function Yd(n) {
    var i = null, c = Ft.updateQueue;
    if (c !== null && (i = c.memoCache), i == null) {
      var d = Ft.alternate;
      d !== null && (d = d.updateQueue, d !== null && (d = d.memoCache, d != null && (i = {
        data: d.data.map(function(p) {
          return p.slice();
    if (i == null && (i = { data: [], index: 0 }), c === null && (c = Cr(), Ft.updateQueue = c), c.memoCache = i, c = i.data[i.index], c === void 0)
      for (c = i.data[i.index] = Array(n), d = 0; d < n; d++)
        c[d] = Vt;
    return i.index++, c;
  function ui(n, i) {
    return typeof i == "function" ? i(n) : i;
  function Ur(n) {
    var i = Ie();
    return jd(i, Me, n);
  function jd(n, i, c) {
    var d = n.queue;
    if (d === null) throw Error(s(311));
    d.lastRenderedReducer = c;
    var p = n.baseQueue, v = d.pending;
    if (v !== null) {
      if (p !== null) {
        var O = p.next;
        p.next = v.next, v.next = O;
      i.baseQueue = p = v, d.pending = null;
    if (v = n.baseState, p === null) n.memoizedState = v;
      i = p.next;
      var R = O = null, U = null, K = i, ot = !1;
        var ct = K.lane & -536870913;
        if (ct !== K.lane ? (de & ct) === ct : (rl & ct) === ct) {
          var W = K.revertLane;
          if (W === 0)
            U !== null && (U = U.next = {
              action: K.action,
              hasEagerState: K.hasEagerState,
              eagerState: K.eagerState,
            }), ct === cl && (ot = !0);
          else if ((rl & W) === W) {
            K = K.next, W === cl && (ot = !0);
            ct = {
              revertLane: K.revertLane,
              action: K.action,
              hasEagerState: K.hasEagerState,
              eagerState: K.eagerState,
            }, U === null ? (R = U = ct, O = v) : U = U.next = ct, Ft.lanes |= W, no |= W;
          ct = K.action, Yo && c(v, ct), v = K.hasEagerState ? K.eagerState : c(v, ct);
          W = {
            lane: ct,
            revertLane: K.revertLane,
            action: K.action,
            hasEagerState: K.hasEagerState,
            eagerState: K.eagerState,
          }, U === null ? (R = U = W, O = v) : U = U.next = W, Ft.lanes |= ct, no |= ct;
        K = K.next;
      } while (K !== null && K !== i);
      if (U === null ? O = v : U.next = R, !Gn(v, n.memoizedState) && (Tn = !0, ot && (c = Sn, c !== null)))
      n.memoizedState = v, n.baseState = O, n.baseQueue = U, d.lastRenderedState = v;
    return p === null && (d.lanes = 0), [n.memoizedState, d.dispatch];
  function qd(n) {
    var i = Ie(), c = i.queue;
    if (c === null) throw Error(s(311));
    var d = c.dispatch, p = c.pending, v = i.memoizedState;
    if (p !== null) {
      var O = p = p.next;
        v = n(v, O.action), O = O.next;
      while (O !== p);
      Gn(v, i.memoizedState) || (Tn = !0), i.memoizedState = v, i.baseQueue === null && (i.baseState = v), c.lastRenderedState = v;
    return [v, d];
  function Nr(n, i, c) {
    var d = Ft, p = Ie(), v = ve;
    if (v) {
      if (c === void 0) throw Error(s(407));
    } else c = i();
    var O = !Gn(
      (Me || p).memoizedState,
    O && (p.memoizedState = c, Tn = !0), p = p.queue;
    var R = vg.bind(null, d, p, n);
    if (Ce(2048, 8, R, [n]), p.getSnapshot !== i || O || Je !== null && Je.memoizedState.tag & 1) {
      if (d.flags |= 2048, Ma(
        Lr(),
        bg.bind(
          d,
          p,
          i
      ), Ne === null) throw Error(s(349));
      v || (rl & 124) !== 0 || Vd(d, i, c);
  function Vd(n, i, c) {
    n.flags |= 16384, n = { getSnapshot: i, value: c }, i = Ft.updateQueue, i === null ? (i = Cr(), Ft.updateQueue = i, i.stores = [n]) : (c = i.stores, c === null ? i.stores = [n] : c.push(n));
  function bg(n, i, c, d) {
    i.value = c, i.getSnapshot = d, Sg(i) && Gd(n);
  function vg(n, i, c) {
      Sg(i) && Gd(n);
  function Sg(n) {
    var i = n.getSnapshot;
      var c = i();
      return !Gn(n, c);
  function Gd(n) {
    var i = ti(n, 2);
    i !== null && Ka(i, n, 2);
  function kr(n) {
    var i = ta();
      if (n = c(), Yo) {
        el(!0);
          el(!1);
    return i.memoizedState = i.baseState = n, i.queue = {
      lastRenderedReducer: ui,
    }, i;
  function Xd(n, i, c, d) {
    return n.baseState = c, jd(
      Me,
      typeof d == "function" ? d : ui
  function T0(n, i, c, d, p) {
    if (Ku(n)) throw Error(s(485));
    if (n = i.action, n !== null) {
      var v = {
        payload: p,
        then: function(O) {
          v.listeners.push(O);
      L.T !== null ? c(!0) : v.isTransition = !1, d(v), c = i.pending, c === null ? (v.next = i.pending = v, Qd(i, v)) : (v.next = c.next, i.pending = c.next = v);
  function Qd(n, i) {
    var c = i.action, d = i.payload, p = n.state;
    if (i.isTransition) {
      var v = L.T, O = {};
      L.T = O;
        var R = c(p, d), U = L.S;
        U !== null && U(O, R), Br(n, i, R);
      } catch (K) {
        Kd(n, i, K);
        L.T = v;
        v = c(p, d), Br(n, i, v);
      } catch (K) {
        Kd(n, i, K);
  function Br(n, i, c) {
      function(d) {
        Zd(n, i, d);
      function(d) {
        return Kd(n, i, d);
    ) : Zd(n, i, c);
  function Zd(n, i, c) {
    i.status = "fulfilled", i.value = c, Tg(i), n.state = c, i = n.pending, i !== null && (c = i.next, c === i ? n.pending = null : (c = c.next, i.next = c, Qd(n, c)));
  function Kd(n, i, c) {
    var d = n.pending;
    if (n.pending = null, d !== null) {
      d = d.next;
        i.status = "rejected", i.reason = c, Tg(i), i = i.next;
      while (i !== d);
  function Tg(n) {
    for (var i = 0; i < n.length; i++) (0, n[i])();
  function $d(n, i) {
    return i;
  function _g(n, i) {
    if (ve) {
      var c = Ne.formState;
          var d = Ft;
          if (ve) {
            if (Te) {
                for (var p = Te, v = sl; p.nodeType !== 8; ) {
                  if (!v) {
                    p = null;
                  if (p = Yl(
                    p.nextSibling
                  ), p === null) {
                    p = null;
                v = p.data, p = v === "F!" || v === "F" ? p : null;
              if (p) {
                Te = Yl(
                  p.nextSibling
                ), d = p.data === "F!";
            Zi(d);
          d = !1;
        d && (i = c[0]);
    return c = ta(), c.memoizedState = c.baseState = i, d = {
      lastRenderedReducer: $d,
      lastRenderedState: i
    }, c.queue = d, c = Rg.bind(
      Ft,
      d
    ), d.dispatch = c, d = kr(!1), v = qr.bind(
      Ft,
      d.queue
    ), d = ta(), p = {
      state: i,
    }, d.queue = p, c = T0.bind(
      Ft,
      p,
      v,
    ), p.dispatch = c, d.memoizedState = n, [i, c, !1];
  function si(n) {
    var i = Ie();
    return Jd(i, Me, n);
  function Jd(n, i, c) {
    if (i = jd(
      i,
      $d
    )[0], n = Ur(ui)[0], typeof i == "object" && i !== null && typeof i.then == "function")
        var d = Hr(i);
      } catch (O) {
        throw O === Lo ? Dr : O;
      }
    else d = i;
    i = Ie();
    var p = i.queue, v = p.dispatch;
    return c !== i.memoizedState && (Ft.flags |= 2048, Ma(
      Lr(),
      zv.bind(null, p, c),
    )), [d, v, n];
  function zv(n, i) {
    n.action = i;
  function Wd(n) {
    var i = Ie(), c = Me;
      return Jd(i, c, n);
    Ie(), i = i.memoizedState, c = Ie();
    var d = c.queue.dispatch;
    return c.memoizedState = n, [i, d, !1];
  function Ma(n, i, c, d) {
    return n = { tag: n, create: c, deps: d, inst: i, next: null }, i = Ft.updateQueue, i === null && (i = Cr(), Ft.updateQueue = i), c = i.lastEffect, c === null ? i.lastEffect = n.next = n : (d = c.next, c.next = n, n.next = d, i.lastEffect = n), n;
  function Lr() {
  function Yr() {
    return Ie().memoizedState;
  function qo(n, i, c, d) {
    var p = ta();
    d = d === void 0 ? null : d, Ft.flags |= n, p.memoizedState = Ma(
      1 | i,
      Lr(),
      d
  function Ce(n, i, c, d) {
    var p = Ie();
    d = d === void 0 ? null : d;
    var v = p.memoizedState.inst;
    Me !== null && d !== null && Nd(d, Me.memoizedState.deps) ? p.memoizedState = Ma(i, v, c, d) : (Ft.flags |= n, p.memoizedState = Ma(
      1 | i,
      v,
      d
  function _0(n, i) {
    qo(8390656, 8, n, i);
  function x0(n, i) {
    Ce(2048, 8, n, i);
  function xg(n, i) {
    return Ce(4, 2, n, i);
  function kl(n, i) {
    return Ce(4, 4, n, i);
  function Eg(n, i) {
    if (typeof i == "function") {
      var c = i(n);
        typeof c == "function" ? c() : i(null);
    if (i != null)
      return n = n(), i.current = n, function() {
        i.current = null;
  function Fd(n, i, c) {
    c = c != null ? c.concat([n]) : null, Ce(4, 4, Eg.bind(null, i, n), c);
  }
  function Xu() {
  }
  function Qu(n, i) {
    var c = Ie();
    i = i === void 0 ? null : i;
    var d = c.memoizedState;
    return i !== null && Nd(i, d[1]) ? d[0] : (c.memoizedState = [n, i], n);
  }
  function Og(n, i) {
    var c = Ie();
    i = i === void 0 ? null : i;
    var d = c.memoizedState;
    if (i !== null && Nd(i, d[1]))
      return d[0];
    if (d = n(), Yo) {
      el(!0);
        el(!1);
    return c.memoizedState = [d, i], d;
  function jr(n, i, c) {
    return c === void 0 || (rl & 1073741824) !== 0 ? n.memoizedState = i : (n.memoizedState = c, n = up(), Ft.lanes |= n, no |= n, c);
  function Mg(n, i, c, d) {
    return Gn(c, i) ? c : Gu.current !== null ? (n = jr(n, c, d), Gn(n, i) || (Tn = !0), n) : (rl & 42) === 0 ? (Tn = !0, n.memoizedState = c) : (n = up(), Ft.lanes |= n, no |= n, i);
  function E0(n, i, c, d, p) {
    var v = nt.p;
    nt.p = v !== 0 && 8 > v ? v : 8;
    var O = L.T, R = {};
    L.T = R, qr(n, !1, i, c);
      var U = p(), K = L.S;
      if (K !== null && K(R, U), U !== null && typeof U == "object" && typeof U.then == "function") {
        var ot = v0(
          U,
          d
        Zu(
          i,
          ot,
          Za(n)
        Zu(
          i,
          d,
          Za(n)
    } catch (ct) {
      Zu(
        i,
        }, status: "rejected", reason: ct },
        Za()
      nt.p = v, L.T = O;
  function Cv() {
  function Pd(n, i, c, d) {
    if (n.tag !== 5) throw Error(s(476));
    var p = O0(n).queue;
    E0(
      p,
      i,
      ft,
      c === null ? Cv : function() {
        return ac(n), c(d);
  function O0(n) {
    var i = n.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: ft,
      baseState: ft,
        lastRenderedReducer: ui,
        lastRenderedState: ft
    return i.next = {
        lastRenderedReducer: ui,
    }, n.memoizedState = i, n = n.alternate, n !== null && (n.memoizedState = i), i;
  function ac(n) {
    var i = O0(n).next.queue;
    Zu(n, i, {}, Za());
  function fl() {
    return wn(Ua);
  function Dg() {
    return Ie().memoizedState;
  function M0() {
    return Ie().memoizedState;
  function D0(n) {
    for (var i = n.return; i !== null; ) {
      switch (i.tag) {
          var c = Za();
          var d = oi(i, n, c);
          d !== null && (Ka(d, i, c), Vu(d, i, c)), i = { cache: Ps() }, n.payload = i;
      i = i.return;
  function Ag(n, i, c) {
    var d = Za();
      lane: d,
    }, Ku(n) ? A0(i, c) : (c = Vs(n, i, c, d), c !== null && (Ka(c, n, d), wg(c, i, d)));
  function Rg(n, i, c) {
    var d = Za();
    Zu(n, i, c, d);
  function Zu(n, i, c, d) {
    var p = {
      lane: d,
    if (Ku(n)) A0(i, p);
      var v = n.alternate;
      if (n.lanes === 0 && (v === null || v.lanes === 0) && (v = i.lastRenderedReducer, v !== null))
          var O = i.lastRenderedState, R = v(O, c);
          if (p.hasEagerState = !0, p.eagerState = R, Gn(R, O))
            return Ho(n, i, p, 0), Ne === null && zl(), !1;
      if (c = Vs(n, i, p, d), c !== null)
        return Ka(c, n, d), wg(c, i, d), !0;
  function qr(n, i, c, d) {
    if (d = {
      revertLane: us(),
      action: d,
    }, Ku(n)) {
      if (i) throw Error(s(479));
      i = Vs(
        d,
      ), i !== null && Ka(i, n, 2);
  function Ku(n) {
    var i = n.alternate;
    return n === Ft || i !== null && i === Ft;
  function A0(n, i) {
    Ga = zr = !0;
    c === null ? i.next = i : (i.next = c.next, c.next = i), n.pending = i;
  function wg(n, i, c) {
      var d = i.lanes;
      d &= n.pendingLanes, c |= d, i.lanes = c, Jt(n, c);
    }
  }
  var Id = {
    readContext: wn,
    use: fn,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We
  }, zg = {
    readContext: wn,
    use: fn,
    useCallback: function(n, i) {
      return ta().memoizedState = [
        i === void 0 ? null : i
    useContext: wn,
    useEffect: _0,
    useImperativeHandle: function(n, i, c) {
      c = c != null ? c.concat([n]) : null, qo(
        Eg.bind(null, i, n),
    useLayoutEffect: function(n, i) {
      return qo(4194308, 4, n, i);
    useInsertionEffect: function(n, i) {
      qo(4, 2, n, i);
    useMemo: function(n, i) {
      var c = ta();
      i = i === void 0 ? null : i;
      var d = n();
      if (Yo) {
        el(!0);
          el(!1);
      return c.memoizedState = [d, i], d;
    useReducer: function(n, i, c) {
      var d = ta();
        var p = c(i);
        if (Yo) {
          el(!0);
            c(i);
            el(!1);
      } else p = i;
      return d.memoizedState = d.baseState = p, n = {
        lastRenderedState: p
      }, d.queue = n, n = n.dispatch = Ag.bind(
        Ft,
      ), [d.memoizedState, n];
      var i = ta();
      return n = { current: n }, i.memoizedState = n;
      n = kr(n);
      var i = n.queue, c = Rg.bind(null, Ft, i);
      return i.dispatch = c, [n.memoizedState, c];
    useDebugValue: Xu,
    useDeferredValue: function(n, i) {
      var c = ta();
      return jr(c, n, i);
      var n = kr(!1);
      return n = E0.bind(
        Ft,
      ), ta().memoizedState = n, [!1, n];
    useSyncExternalStore: function(n, i, c) {
      var d = Ft, p = ta();
      if (ve) {
          throw Error(s(407));
        if (c = i(), Ne === null)
          throw Error(s(349));
        (de & 124) !== 0 || Vd(d, i, c);
      p.memoizedState = c;
      var v = { value: c, getSnapshot: i };
      return p.queue = v, _0(vg.bind(null, d, v, n), [
      ]), d.flags |= 2048, Ma(
        Lr(),
        bg.bind(
          d,
          v,
          i
      var n = ta(), i = Ne.identifierPrefix;
      if (ve) {
        var c = Pe, d = Hl;
        c = (d & ~(1 << 32 - Yn(d) - 1)).toString(32) + c, i = "«" + i + "R" + c, c = Nl++, 0 < c && (i += "H" + c.toString(32)), i += "»";
        c = pg++, i = "«" + i + "r" + c.toString(32) + "»";
      return n.memoizedState = i;
    useHostTransitionStatus: fl,
    useFormState: _g,
    useActionState: _g,
      var i = ta();
      i.memoizedState = i.baseState = n;
      return i.queue = c, i = qr.bind(
        Ft,
      ), c.dispatch = i, [n, i];
    useMemoCache: Yd,
      return ta().memoizedState = D0.bind(
        Ft
  }, Cg = {
    readContext: wn,
    use: fn,
    useCallback: Qu,
    useContext: wn,
    useEffect: x0,
    useImperativeHandle: Fd,
    useInsertionEffect: xg,
    useLayoutEffect: kl,
    useMemo: Og,
    useReducer: Ur,
    useRef: Yr,
      return Ur(ui);
    useDebugValue: Xu,
    useDeferredValue: function(n, i) {
      var c = Ie();
      return Mg(
        Me.memoizedState,
        i
      var n = Ur(ui)[0], i = Ie().memoizedState;
        typeof n == "boolean" ? n : Hr(n),
        i
    useSyncExternalStore: Nr,
    useId: Dg,
    useHostTransitionStatus: fl,
    useFormState: si,
    useActionState: si,
    useOptimistic: function(n, i) {
      var c = Ie();
      return Xd(c, Me, n, i);
    useMemoCache: Yd,
    useCacheRefresh: M0
  }, Fi = {
    readContext: wn,
    use: fn,
    useCallback: Qu,
    useContext: wn,
    useEffect: x0,
    useImperativeHandle: Fd,
    useInsertionEffect: xg,
    useLayoutEffect: kl,
    useMemo: Og,
    useReducer: qd,
    useRef: Yr,
      return qd(ui);
    useDebugValue: Xu,
    useDeferredValue: function(n, i) {
      var c = Ie();
      return Me === null ? jr(c, n, i) : Mg(
        Me.memoizedState,
        i
      var n = qd(ui)[0], i = Ie().memoizedState;
        typeof n == "boolean" ? n : Hr(n),
        i
    useSyncExternalStore: Nr,
    useId: Dg,
    useHostTransitionStatus: fl,
    useFormState: Wd,
    useActionState: Wd,
    useOptimistic: function(n, i) {
      var c = Ie();
      return Me !== null ? Xd(c, Me, n, i) : (c.baseState = n, [n, c.queue.dispatch]);
    useMemoCache: Yd,
    useCacheRefresh: M0
  }, $u = null, lc = 0;
  function th(n) {
    var i = lc;
    return lc += 1, $u === null && ($u = []), fg($u, n, i);
  }
  function Ju(n, i) {
    i = i.props.ref, n.ref = i !== void 0 ? i : null;
  }
  function ea(n, i) {
    throw i.$$typeof === D ? Error(s(525)) : (n = Object.prototype.toString.call(i), Error(
      s(
        n === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : n
  function Hg(n) {
    var i = n._init;
    return i(n._payload);
    function i(X, j) {
        var Z = X.deletions;
        Z === null ? (X.deletions = [j], X.flags |= 16) : Z.push(j);
    function c(X, j) {
      for (; j !== null; )
        i(X, j), j = j.sibling;
    function d(X) {
      for (var j = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? j.set(X.key, X) : j.set(X.index, X), X = X.sibling;
      return j;
    function p(X, j) {
      return X = Cl(X, j), X.index = 0, X.sibling = null, X;
    function v(X, j, Z) {
      return X.index = Z, n ? (Z = X.alternate, Z !== null ? (Z = Z.index, Z < j ? (X.flags |= 67108866, j) : Z) : (X.flags |= 67108866, j)) : (X.flags |= 1048576, j);
    function O(X) {
      return n && X.alternate === null && (X.flags |= 67108866), X;
    function R(X, j, Z, st) {
      return j === null || j.tag !== 6 ? (j = Qs(Z, X.mode, st), j.return = X, j) : (j = p(j, Z), j.return = X, j);
    function U(X, j, Z, st) {
      var At = Z.type;
      return At === q ? ot(
        X,
        j,
        Z.props.children,
        st,
        Z.key
      ) : j !== null && (j.elementType === At || typeof At == "object" && At !== null && At.$$typeof === Ot && Hg(At) === j.type) ? (j = p(j, Z.props), Ju(j, Z), j.return = X, j) : (j = mt(
        Z.type,
        Z.key,
        Z.props,
        X.mode,
        st
      ), Ju(j, Z), j.return = X, j);
    }
    function K(X, j, Z, st) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== Z.containerInfo || j.stateNode.implementation !== Z.implementation ? (j = $e(Z, X.mode, st), j.return = X, j) : (j = p(j, Z.children || []), j.return = X, j);
    }
    function ot(X, j, Z, st, At) {
      return j === null || j.tag !== 7 ? (j = il(
        Z,
        X.mode,
        st,
        At
      ), j.return = X, j) : (j = p(j, Z), j.return = X, j);
    }
    function ct(X, j, Z) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = Qs(
          "" + j,
          X.mode,
          Z
        ), j.return = X, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case M:
            return Z = mt(
              j.type,
              j.key,
              j.props,
              X.mode,
              Z
            ), Ju(Z, j), Z.return = X, Z;
          case H:
            return j = $e(
              j,
              X.mode,
              Z
            ), j.return = X, j;
          case Ot:
            var st = j._init;
            return j = st(j._payload), ct(X, j, Z);
        }
        if (Lt(j) || Dt(j))
          return j = il(
            j,
            X.mode,
            Z,
          ), j.return = X, j;
        if (typeof j.then == "function")
          return ct(X, th(j), Z);
        if (j.$$typeof === yt)
          return ct(
            X,
            Er(X, j),
            Z
        ea(X, j);
    function W(X, j, Z, st) {
      var At = j !== null ? j.key : null;
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return At !== null ? null : R(X, j, "" + Z, st);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case M:
            return Z.key === At ? U(X, j, Z, st) : null;
          case H:
            return Z.key === At ? K(X, j, Z, st) : null;
          case Ot:
            return At = Z._init, Z = At(Z._payload), W(X, j, Z, st);
        }
        if (Lt(Z) || Dt(Z))
          return At !== null ? null : ot(X, j, Z, st, null);
        if (typeof Z.then == "function")
          return W(
            X,
            j,
            th(Z),
            st
        if (Z.$$typeof === yt)
          return W(
            X,
            j,
            Er(X, Z),
            st
        ea(X, Z);
    function P(X, j, Z, st, At) {
      if (typeof st == "string" && st !== "" || typeof st == "number" || typeof st == "bigint")
        return X = X.get(Z) || null, R(j, X, "" + st, At);
      if (typeof st == "object" && st !== null) {
        switch (st.$$typeof) {
          case M:
            return X = X.get(
              st.key === null ? Z : st.key
            ) || null, U(j, X, st, At);
          case H:
            return X = X.get(
              st.key === null ? Z : st.key
            ) || null, K(j, X, st, At);
          case Ot:
            var oe = st._init;
            return st = oe(st._payload), P(
              X,
              j,
              Z,
              st,
              At
        if (Lt(st) || Dt(st))
          return X = X.get(Z) || null, ot(j, X, st, At, null);
        if (typeof st.then == "function")
          return P(
            X,
            j,
            Z,
            th(st),
            At
        if (st.$$typeof === yt)
          return P(
            X,
            j,
            Z,
            Er(j, st),
            At
        ea(j, st);
    function kt(X, j, Z, st) {
      for (var At = null, oe = null, Nt = j, qt = j = 0, Un = null; Nt !== null && qt < Z.length; qt++) {
        Nt.index > qt ? (Un = Nt, Nt = null) : Un = Nt.sibling;
        var be = W(
          X,
          Nt,
          Z[qt],
          st
        if (be === null) {
          Nt === null && (Nt = Un);
        n && Nt && be.alternate === null && i(X, Nt), j = v(be, j, qt), oe === null ? At = be : oe.sibling = be, oe = be, Nt = Un;
      }
      if (qt === Z.length)
        return c(X, Nt), ve && pe(X, qt), At;
      if (Nt === null) {
        for (; qt < Z.length; qt++)
          Nt = ct(X, Z[qt], st), Nt !== null && (j = v(
            Nt,
            j,
            qt
          ), oe === null ? At = Nt : oe.sibling = Nt, oe = Nt);
        return ve && pe(X, qt), At;
      }
      for (Nt = d(Nt); qt < Z.length; qt++)
        Un = P(
          Nt,
          X,
          qt,
          Z[qt],
          st
        ), Un !== null && (n && Un.alternate !== null && Nt.delete(
          Un.key === null ? qt : Un.key
        ), j = v(
          Un,
          j,
          qt
        ), oe === null ? At = Un : oe.sibling = Un, oe = Un);
      return n && Nt.forEach(function(iu) {
        return i(X, iu);
      }), ve && pe(X, qt), At;
    }
    function Bt(X, j, Z, st) {
      if (Z == null) throw Error(s(151));
      for (var At = null, oe = null, Nt = j, qt = j = 0, Un = null, be = Z.next(); Nt !== null && !be.done; qt++, be = Z.next()) {
        Nt.index > qt ? (Un = Nt, Nt = null) : Un = Nt.sibling;
        var iu = W(X, Nt, be.value, st);
        if (iu === null) {
          Nt === null && (Nt = Un);
        n && Nt && iu.alternate === null && i(X, Nt), j = v(iu, j, qt), oe === null ? At = iu : oe.sibling = iu, oe = iu, Nt = Un;
      }
      if (be.done)
        return c(X, Nt), ve && pe(X, qt), At;
      if (Nt === null) {
        for (; !be.done; qt++, be = Z.next())
          be = ct(X, be.value, st), be !== null && (j = v(be, j, qt), oe === null ? At = be : oe.sibling = be, oe = be);
        return ve && pe(X, qt), At;
      }
      for (Nt = d(Nt); !be.done; qt++, be = Z.next())
        be = P(Nt, X, qt, be.value, st), be !== null && (n && be.alternate !== null && Nt.delete(be.key === null ? qt : be.key), j = v(be, j, qt), oe === null ? At = be : oe.sibling = be, oe = be);
      return n && Nt.forEach(function(Xv) {
        return i(X, Xv);
      }), ve && pe(X, qt), At;
    }
    function xe(X, j, Z, st) {
      if (typeof Z == "object" && Z !== null && Z.type === q && Z.key === null && (Z = Z.props.children), typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case M:
              for (var At = Z.key; j !== null; ) {
                if (j.key === At) {
                  if (At = Z.type, At === q) {
                    if (j.tag === 7) {
                        X,
                        j.sibling
                      ), st = p(
                        j,
                        Z.props.children
                      ), st.return = X, X = st;
                  } else if (j.elementType === At || typeof At == "object" && At !== null && At.$$typeof === Ot && Hg(At) === j.type) {
                      X,
                      j.sibling
                    ), st = p(j, Z.props), Ju(st, Z), st.return = X, X = st;
                  c(X, j);
                } else i(X, j);
                j = j.sibling;
              Z.type === q ? (st = il(
                Z.props.children,
                X.mode,
                st,
                Z.key
              ), st.return = X, X = st) : (st = mt(
                Z.type,
                Z.key,
                Z.props,
                X.mode,
                st
              ), Ju(st, Z), st.return = X, X = st);
            return O(X);
          case H:
              for (At = Z.key; j !== null; ) {
                if (j.key === At)
                  if (j.tag === 4 && j.stateNode.containerInfo === Z.containerInfo && j.stateNode.implementation === Z.implementation) {
                      X,
                      j.sibling
                    ), st = p(j, Z.children || []), st.return = X, X = st;
                    c(X, j);
                else i(X, j);
                j = j.sibling;
              st = $e(Z, X.mode, st), st.return = X, X = st;
            return O(X);
          case Ot:
            return At = Z._init, Z = At(Z._payload), xe(
              X,
              j,
              Z,
              st
        if (Lt(Z))
          return kt(
            X,
            j,
            Z,
            st
        if (Dt(Z)) {
          if (At = Dt(Z), typeof At != "function") throw Error(s(150));
          return Z = At.call(Z), Bt(
            X,
            j,
            Z,
            st
        if (typeof Z.then == "function")
          return xe(
            X,
            j,
            th(Z),
            st
        if (Z.$$typeof === yt)
          return xe(
            X,
            j,
            Er(X, Z),
            st
        ea(X, Z);
      return typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint" ? (Z = "" + Z, j !== null && j.tag === 6 ? (c(X, j.sibling), st = p(j, Z), st.return = X, X = st) : (c(X, j), st = Qs(Z, X.mode, st), st.return = X, X = st), O(X)) : c(X, j);
    return function(X, j, Z, st) {
        lc = 0;
        var At = xe(
          X,
          j,
          Z,
          st
        return $u = null, At;
      } catch (Nt) {
        if (Nt === Lo || Nt === Dr) throw Nt;
        var oe = xa(29, Nt, null, X.mode);
        return oe.lanes = st, oe.return = X, oe;
  var Wu = Da(!0), ci = Da(!1), Qa = $(null), na = null;
  function Pi(n) {
    var i = n.alternate;
    rt(He, He.current & 1), rt(Qa, n), na === null && (i === null || Gu.current !== null || i.memoizedState !== null) && (na = n);
  function ri(n) {
      if (rt(He, He.current), rt(Qa, n), na === null) {
        var i = n.alternate;
        i !== null && i.memoizedState !== null && (na = n);
    } else fi();
  function fi() {
    rt(He, He.current), rt(Qa, Qa.current);
  function Bl(n) {
    at(Qa), na === n && (na = null), at(He);
  }
  var He = $(0);
  function Vr(n) {
    for (var i = n; i !== null; ) {
      if (i.tag === 13) {
        var c = i.memoizedState;
        if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || df(c)))
          return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
      if (i === n) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === n) return null;
        i = i.return;
      i.sibling.return = i.return, i = i.sibling;
  function Vo(n, i, c, d) {
    i = n.memoizedState, c = c(d, i), c = c == null ? i : E({}, i, c), n.memoizedState = c, n.lanes === 0 && (n.updateQueue.baseState = c);
  var eh = {
    enqueueSetState: function(n, i, c) {
      var d = Za(), p = Oa(d);
      p.payload = i, c != null && (p.callback = c), i = oi(n, p, d), i !== null && (Ka(i, n, d), Vu(i, n, d));
    enqueueReplaceState: function(n, i, c) {
      var d = Za(), p = Oa(d);
      p.tag = 1, p.payload = i, c != null && (p.callback = c), i = oi(n, p, d), i !== null && (Ka(i, n, d), Vu(i, n, d));
    enqueueForceUpdate: function(n, i) {
      var c = Za(), d = Oa(c);
      d.tag = 2, i != null && (d.callback = i), i = oi(n, d, c), i !== null && (Ka(i, n, c), Vu(i, n, c));
  function ic(n, i, c, d, p, v, O) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(d, v, O) : i.prototype && i.prototype.isPureReactComponent ? !Ro(c, d) || !Ro(p, v) : !0;
  function Fu(n, i, c, d) {
    n = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(c, d), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(c, d), i.state !== n && eh.enqueueReplaceState(i, i.state, null);
  function Go(n, i) {
    var c = i;
    if ("ref" in i) {
      for (var d in i)
        d !== "ref" && (c[d] = i[d]);
      c === i && (c = E({}, c));
      for (var p in n)
        c[p] === void 0 && (c[p] = n[p]);
  var Gr = typeof reportError == "function" ? reportError : function(n) {
      var i = new window.ErrorEvent("error", {
      if (!window.dispatchEvent(i)) return;
  function oc(n) {
    Gr(n);
  function Ug(n) {
  function Xr(n) {
    Gr(n);
  function Qr(n, i) {
      c(i.value, { componentStack: i.stack });
    } catch (d) {
        throw d;
  function Ng(n, i, c) {
      var d = n.onCaughtError;
      d(c.value, {
        errorBoundary: i.tag === 1 ? i.stateNode : null
    } catch (p) {
        throw p;
  function kg(n, i, c) {
      Qr(n, i);
  function Bg(n) {
  function Aa(n, i, c, d) {
    var p = c.type.getDerivedStateFromError;
    if (typeof p == "function") {
      var v = d.value;
        return p(v);
        Ng(i, c, d);
    var O = c.stateNode;
    O !== null && typeof O.componentDidCatch == "function" && (n.callback = function() {
      Ng(i, c, d), typeof p != "function" && (Ko === null ? Ko = /* @__PURE__ */ new Set([this]) : Ko.add(this));
      var R = d.stack;
      this.componentDidCatch(d.value, {
        componentStack: R !== null ? R : ""
  function R0(n, i, c, d, p) {
    if (c.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
      if (i = c.alternate, i !== null && Ws(
        i,
        p,
      ), c = Qa.current, c !== null) {
            return na === null ? os() : c.alternate === null && an === 0 && (an = 3), c.flags &= -257, c.flags |= 65536, c.lanes = p, d === wd ? c.flags |= 16384 : (i = c.updateQueue, i === null ? c.updateQueue = /* @__PURE__ */ new Set([d]) : i.add(d), Dh(n, d, p)), !1;
            return c.flags |= 65536, d === wd ? c.flags |= 16384 : (i = c.updateQueue, i === null ? (i = {
              retryQueue: /* @__PURE__ */ new Set([d])
            }, c.updateQueue = i) : (c = i.retryQueue, c === null ? i.retryQueue = /* @__PURE__ */ new Set([d]) : c.add(d)), Dh(n, d, p)), !1;
        throw Error(s(435, c.tag));
      return Dh(n, d, p), os(), !1;
    if (ve)
      return i = Qa.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = p, d !== Yu && (n = Error(s(422), { cause: d }), Js(Va(n, c)))) : (d !== Yu && (i = Error(s(423), {
        cause: d
      }), Js(
        Va(i, c)
      )), n = n.current.alternate, n.flags |= 65536, p &= -p, n.lanes |= p, d = Va(d, c), p = kg(
        d,
        p
      ), mg(n, p), an !== 4 && (an = 2)), !1;
    var v = Error(s(520), { cause: d });
    if (v = Va(v, c), hc === null ? hc = [v] : hc.push(v), an !== 4 && (an = 2), i === null) return !0;
    d = Va(d, c), c = i;
          return c.flags |= 65536, n = p & -p, c.lanes |= n, n = kg(c.stateNode, d, n), mg(c, n), !1;
          if (i = c.type, v = c.stateNode, (c.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (Ko === null || !Ko.has(v))))
            return c.flags |= 65536, p &= -p, c.lanes |= p, p = Bg(p), Aa(
              p,
              d
            ), mg(c, p), !1;
  var tn = Error(s(461)), Tn = !1;
  function Cn(n, i, c, d) {
    i.child = n === null ? ci(i, null, c, d) : Wu(
      i,
      d
  function w0(n, i, c, d, p) {
    var v = i.ref;
    if ("ref" in d) {
      var O = {};
      for (var R in d)
        R !== "ref" && (O[R] = d[R]);
    } else O = d;
    return ko(i), d = kd(
      i,
      O,
      v,
      p
    ), R = Bd(), n !== null && !Tn ? (nc(n, i, p), di(n, i, p)) : (ve && R && Lu(i), i.flags |= 1, Cn(n, i, d, p), i.child);
  function Ii(n, i, c, d, p) {
      var v = c.type;
      return typeof v == "function" && !vr(v) && v.defaultProps === void 0 && c.compare === null ? (i.tag = 15, i.type = v, Pu(
        i,
        v,
        d,
        p
      )) : (n = mt(
        d,
        i,
        i.mode,
        p
      ), n.ref = i.ref, n.return = i, i.child = n);
    if (v = n.child, !fh(n, p)) {
      var O = v.memoizedProps;
      if (c = c.compare, c = c !== null ? c : Ro, c(O, d) && n.ref === i.ref)
        return di(n, i, p);
    return i.flags |= 1, n = Cl(v, d), n.ref = i.ref, n.return = i, i.child = n;
  function Pu(n, i, c, d, p) {
      var v = n.memoizedProps;
      if (Ro(v, d) && n.ref === i.ref)
        if (Tn = !1, i.pendingProps = d = v, fh(n, p))
          (n.flags & 131072) !== 0 && (Tn = !0);
          return i.lanes = n.lanes, di(n, i, p);
    return ah(
      i,
      d,
      p
  function nh(n, i, c) {
    var d = i.pendingProps, p = d.children, v = n !== null ? n.memoizedState : null;
    if (d.mode === "hidden") {
      if ((i.flags & 128) !== 0) {
        if (d = v !== null ? v.baseLanes | c : c, n !== null) {
          for (p = i.child = n.child, v = 0; p !== null; )
            v = v | p.lanes | p.childLanes, p = p.sibling;
          i.childLanes = v & ~d;
        } else i.childLanes = 0, i.child = null;
        return Iu(
          i,
          d,
        i.memoizedState = { baseLanes: 0, cachePool: null }, n !== null && ju(
          i,
          v !== null ? v.cachePool : null
        ), v !== null ? zn(i, v) : tc(), ri(i);
        return i.lanes = i.childLanes = 536870912, Iu(
          i,
          v !== null ? v.baseLanes | c : c,
      v !== null ? (ju(i, v.cachePool), zn(i, v), fi(), i.memoizedState = null) : (n !== null && ju(i, null), tc(), fi());
    return Cn(n, i, p, c), i.child;
  function Iu(n, i, c, d) {
    var p = Mr();
    return p = p === null ? null : { parent: vn._currentValue, pool: p }, i.memoizedState = {
      cachePool: p
    }, n !== null && ju(i, null), tc(), ri(i), n !== null && Ws(n, i, d, !0), null;
  function Zr(n, i) {
    var c = i.ref;
      n !== null && n.ref !== null && (i.flags |= 4194816);
        throw Error(s(284));
      (n === null || n.ref !== c) && (i.flags |= 4194816);
  function ah(n, i, c, d, p) {
    return ko(i), c = kd(
      i,
      d,
      p
    ), d = Bd(), n !== null && !Tn ? (nc(n, i, p), di(n, i, p)) : (ve && d && Lu(i), i.flags |= 1, Cn(n, i, c, p), i.child);
  function Lg(n, i, c, d, p, v) {
    return ko(i), i.updateQueue = null, c = yg(
      i,
      d,
      p
    ), jo(n), d = Bd(), n !== null && !Tn ? (nc(n, i, v), di(n, i, v)) : (ve && d && Lu(i), i.flags |= 1, Cn(n, i, c, v), i.child);
  function lh(n, i, c, d, p) {
    if (ko(i), i.stateNode === null) {
      var v = Xs, O = c.contextType;
      typeof O == "object" && O !== null && (v = wn(O)), v = new c(d, v), i.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null, v.updater = eh, i.stateNode = v, v._reactInternals = i, v = i.stateNode, v.props = d, v.state = i.memoizedState, v.refs = {}, Cd(i), O = c.contextType, v.context = typeof O == "object" && O !== null ? wn(O) : Xs, v.state = i.memoizedState, O = c.getDerivedStateFromProps, typeof O == "function" && (Vo(
        i,
        O,
        d
      ), v.state = i.memoizedState), typeof c.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function" || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (O = v.state, typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount(), O !== v.state && eh.enqueueReplaceState(v, v.state, null), Ji(i, d, v, p), Is(), v.state = i.memoizedState), typeof v.componentDidMount == "function" && (i.flags |= 4194308), d = !0;
      v = i.stateNode;
      var R = i.memoizedProps, U = Go(c, R);
      v.props = U;
      var K = v.context, ot = c.contextType;
      O = Xs, typeof ot == "object" && ot !== null && (O = wn(ot));
      var ct = c.getDerivedStateFromProps;
      ot = typeof ct == "function" || typeof v.getSnapshotBeforeUpdate == "function", R = i.pendingProps !== R, ot || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (R || K !== O) && Fu(
        i,
        v,
        d,
        O
      ), ii = !1;
      var W = i.memoizedState;
      v.state = W, Ji(i, d, v, p), Is(), K = i.memoizedState, R || W !== K || ii ? (typeof ct == "function" && (Vo(
        i,
        ct,
        d
      ), K = i.memoizedState), (U = ii || ic(
        i,
        U,
        d,
        W,
        K,
        O
      )) ? (ot || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount()), typeof v.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof v.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = d, i.memoizedState = K), v.props = d, v.state = K, v.context = O, d = U) : (typeof v.componentDidMount == "function" && (i.flags |= 4194308), d = !1);
      v = i.stateNode, Hd(n, i), O = i.memoizedProps, ot = Go(c, O), v.props = ot, ct = i.pendingProps, W = v.context, K = c.contextType, U = Xs, typeof K == "object" && K !== null && (U = wn(K)), R = c.getDerivedStateFromProps, (K = typeof R == "function" || typeof v.getSnapshotBeforeUpdate == "function") || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (O !== ct || W !== U) && Fu(
        i,
        v,
        d,
        U
      ), ii = !1, W = i.memoizedState, v.state = W, Ji(i, d, v, p), Is();
      var P = i.memoizedState;
      O !== ct || W !== P || ii || n !== null && n.dependencies !== null && xr(n.dependencies) ? (typeof R == "function" && (Vo(
        i,
        R,
        d
      ), P = i.memoizedState), (ot = ii || ic(
        i,
        d,
        W,
        P,
        U
      ) || n !== null && n.dependencies !== null && xr(n.dependencies)) ? (K || typeof v.UNSAFE_componentWillUpdate != "function" && typeof v.componentWillUpdate != "function" || (typeof v.componentWillUpdate == "function" && v.componentWillUpdate(d, P, U), typeof v.UNSAFE_componentWillUpdate == "function" && v.UNSAFE_componentWillUpdate(
        d,
        P,
        U
      )), typeof v.componentDidUpdate == "function" && (i.flags |= 4), typeof v.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof v.componentDidUpdate != "function" || O === n.memoizedProps && W === n.memoizedState || (i.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || O === n.memoizedProps && W === n.memoizedState || (i.flags |= 1024), i.memoizedProps = d, i.memoizedState = P), v.props = d, v.state = P, v.context = U, d = ot) : (typeof v.componentDidUpdate != "function" || O === n.memoizedProps && W === n.memoizedState || (i.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || O === n.memoizedProps && W === n.memoizedState || (i.flags |= 1024), d = !1);
    }
    return v = d, Zr(n, i), d = (i.flags & 128) !== 0, v || d ? (v = i.stateNode, c = d && typeof c.getDerivedStateFromError != "function" ? null : v.render(), i.flags |= 1, n !== null && d ? (i.child = Wu(
      i,
      p
    ), i.child = Wu(
      i,
      p
    )) : Cn(n, i, c, p), i.memoizedState = v.state, n = i.child) : n = di(
      i,
      p
  function ih(n, i, c, d) {
    return $s(), i.flags |= 256, Cn(n, i, c, d), i.child;
  var oh = {
  function Yg(n) {
    return { baseLanes: n, cachePool: Ad() };
  }
  function jg(n, i, c) {
    return n = n !== null ? n.childLanes & ~c : 0, i && (n |= ml), n;
  }
  function qg(n, i, c) {
    var d = i.pendingProps, p = !1, v = (i.flags & 128) !== 0, O;
    if ((O = v) || (O = n !== null && n.memoizedState === null ? !1 : (He.current & 2) !== 0), O && (p = !0, i.flags &= -129), O = (i.flags & 32) !== 0, i.flags &= -33, n === null) {
      if (ve) {
        if (p ? Pi(i) : fi(), ve) {
          var R = Te, U;
          if (U = R) {
              for (U = R, R = sl; U.nodeType !== 8; ) {
                if (!R) {
                  R = null;
                if (U = Yl(
                  U.nextSibling
                ), U === null) {
                  R = null;
              R = U;
            R !== null ? (i.memoizedState = {
              dehydrated: R,
              treeContext: Qi !== null ? { id: Hl, overflow: Pe } : null,
            }, U = xa(
            ), U.stateNode = R, U.return = i, i.child = U, un = i, Te = null, U = !0) : U = !1;
          U || Zi(i);
        if (R = i.memoizedState, R !== null && (R = R.dehydrated, R !== null))
          return df(R) ? i.lanes = 32 : i.lanes = 536870912, null;
        Bl(i);
      return R = d.children, d = d.fallback, p ? (fi(), p = i.mode, R = sh(
        { mode: "hidden", children: R },
        p
      ), d = il(
        d,
        p,
      ), R.return = i, d.return = i, R.sibling = d, i.child = R, p = i.child, p.memoizedState = Yg(c), p.childLanes = jg(
        O,
      ), i.memoizedState = oh, d) : (Pi(i), uh(i, R));
    if (U = n.memoizedState, U !== null && (R = U.dehydrated, R !== null)) {
      if (v)
        i.flags & 256 ? (Pi(i), i.flags &= -257, i = Xo(
          i,
        )) : i.memoizedState !== null ? (fi(), i.child = n.child, i.flags |= 128, i = null) : (fi(), p = d.fallback, R = i.mode, d = sh(
          { mode: "visible", children: d.children },
          R
        ), p = il(
          p,
          R,
        ), p.flags |= 2, d.return = i, p.return = i, d.sibling = p, i.child = d, Wu(
          i,
        ), d = i.child, d.memoizedState = Yg(c), d.childLanes = jg(
          O,
        ), i.memoizedState = oh, i = p);
      else if (Pi(i), df(R)) {
        if (O = R.nextSibling && R.nextSibling.dataset, O) var K = O.dgst;
        O = K, d = Error(s(419)), d.stack = "", d.digest = O, Js({ value: d, source: null, stack: null }), i = Xo(
          i,
      } else if (Tn || Ws(n, i, c, !1), O = (c & n.childLanes) !== 0, Tn || O) {
        if (O = Ne, O !== null && (d = c & -c, d = (d & 42) !== 0 ? 1 : rn(d), d = (d & (O.suspendedLanes | c)) !== 0 ? 0 : d, d !== 0 && d !== U.retryLane))
          throw U.retryLane = d, ti(n, d), Ka(O, n, d), tn;
        R.data === "$?" || os(), i = Xo(
          i,
        R.data === "$?" ? (i.flags |= 192, i.child = n.child, i = null) : (n = U.treeContext, Te = Yl(
          R.nextSibling
        ), un = i, ve = !0, ul = null, sl = !1, n !== null && (ol[Ea++] = Hl, ol[Ea++] = Pe, ol[Ea++] = Qi, Hl = n.id, Pe = n.overflow, Qi = i), i = uh(
          i,
          d.children
        ), i.flags |= 4096);
      return i;
    return p ? (fi(), p = d.fallback, R = i.mode, U = n.child, K = U.sibling, d = Cl(U, {
      children: d.children
    }), d.subtreeFlags = U.subtreeFlags & 65011712, K !== null ? p = Cl(K, p) : (p = il(
      p,
      R,
    ), p.flags |= 2), p.return = i, d.return = i, d.sibling = p, i.child = d, d = p, p = i.child, R = n.child.memoizedState, R === null ? R = Yg(c) : (U = R.cachePool, U !== null ? (K = vn._currentValue, U = U.parent !== K ? { parent: K, pool: K } : U) : U = Ad(), R = {
      baseLanes: R.baseLanes | c,
      cachePool: U
    }), p.memoizedState = R, p.childLanes = jg(
      O,
    ), i.memoizedState = oh, d) : (Pi(i), c = n.child, n = c.sibling, c = Cl(c, {
      children: d.children
    }), c.return = i, c.sibling = null, n !== null && (O = i.deletions, O === null ? (i.deletions = [n], i.flags |= 16) : O.push(n)), i.child = c, i.memoizedState = null, c);
  function uh(n, i) {
    return i = sh(
      { mode: "visible", children: i },
    ), i.return = n, n.child = i;
  function sh(n, i) {
    return n = xa(22, n, null, i), n.lanes = 0, n.stateNode = {
  function Xo(n, i, c) {
    return Wu(i, n.child, null, c), n = uh(
      i,
      i.pendingProps.children
    ), n.flags |= 2, i.memoizedState = null, n;
  }
  function Kr(n, i, c) {
    n.lanes |= i;
    var d = n.alternate;
    d !== null && (d.lanes |= i), xd(n.return, i, c);
  }
  function ch(n, i, c, d, p) {
    var v = n.memoizedState;
    v === null ? n.memoizedState = {
      isBackwards: i,
      last: d,
      tailMode: p
    } : (v.isBackwards = i, v.rendering = null, v.renderingStartTime = 0, v.last = d, v.tail = c, v.tailMode = p);
  function rh(n, i, c) {
    var d = i.pendingProps, p = d.revealOrder, v = d.tail;
    if (Cn(n, i, d.children, c), d = He.current, (d & 2) !== 0)
      d = d & 1 | 2, i.flags |= 128;
        t: for (n = i.child; n !== null; ) {
            n.memoizedState !== null && Kr(n, c, i);
            Kr(n, c, i);
          if (n === i) break t;
            if (n.return === null || n.return === i)
      d &= 1;
    switch (rt(He, d), p) {
        for (c = i.child, p = null; c !== null; )
          n = c.alternate, n !== null && Vr(n) === null && (p = c), c = c.sibling;
        c = p, c === null ? (p = i.child, i.child = null) : (p = c.sibling, c.sibling = null), ch(
          i,
          p,
          v
        for (c = null, p = i.child, i.child = null; p !== null; ) {
          if (n = p.alternate, n !== null && Vr(n) === null) {
            i.child = p;
          n = p.sibling, p.sibling = c, c = p, p = n;
        ch(
          i,
          v
        ch(i, !1, null, null, void 0);
        i.memoizedState = null;
    return i.child;
  function di(n, i, c) {
    if (n !== null && (i.dependencies = n.dependencies), no |= i.lanes, (c & i.childLanes) === 0)
        if (Ws(
          i,
        ), (c & i.childLanes) === 0)
    if (n !== null && i.child !== n.child)
      throw Error(s(153));
    if (i.child !== null) {
      for (n = i.child, c = Cl(n, n.pendingProps), i.child = c, c.return = i; n.sibling !== null; )
        n = n.sibling, c = c.sibling = Cl(n, n.pendingProps), c.return = i;
    return i.child;
  function fh(n, i) {
    return (n.lanes & i) !== 0 ? !0 : (n = n.dependencies, !!(n !== null && xr(n)));
  function z0(n, i, c) {
    switch (i.tag) {
        Qt(i, i.stateNode.containerInfo), $i(i, vn, n.memoizedState.cache), $s();
        va(i);
        Qt(i, i.stateNode.containerInfo);
        $i(
          i,
          i.type,
          i.memoizedProps.value
        var d = i.memoizedState;
        if (d !== null)
          return d.dehydrated !== null ? (Pi(i), i.flags |= 128, null) : (c & i.child.childLanes) !== 0 ? qg(n, i, c) : (Pi(i), n = di(
            i,
        Pi(i);
        var p = (n.flags & 128) !== 0;
        if (d = (c & i.childLanes) !== 0, d || (Ws(
          i,
        ), d = (c & i.childLanes) !== 0), p) {
          if (d)
            return rh(
              i,
          i.flags |= 128;
        if (p = i.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), rt(He, He.current), d) break;
        return i.lanes = 0, nh(n, i, c);
        $i(i, vn, n.memoizedState.cache);
    return di(n, i, c);
  function C0(n, i, c) {
      if (n.memoizedProps !== i.pendingProps)
        Tn = !0;
        if (!fh(n, c) && (i.flags & 128) === 0)
          return Tn = !1, z0(
            i,
        Tn = (n.flags & 131072) !== 0;
      Tn = !1, ve && (i.flags & 1048576) !== 0 && _d(i, Zs, i.index);
    switch (i.lanes = 0, i.tag) {
          n = i.pendingProps;
          var d = i.elementType, p = d._init;
          if (d = p(d._payload), i.type = d, typeof d == "function")
            vr(d) ? (n = Go(d, n), i.tag = 1, i = lh(
              i,
              d,
            )) : (i.tag = 0, i = ah(
              i,
              d,
            if (d != null) {
              if (p = d.$$typeof, p === St) {
                i.tag = 11, i = w0(
                  i,
                  d,
              } else if (p === pt) {
                i.tag = 14, i = Ii(
                  i,
                  d,
            throw i = Se(d) || d, Error(s(306, i, ""));
        return i;
        return ah(
          i,
          i.type,
          i.pendingProps,
        return d = i.type, p = Go(
          d,
          i.pendingProps
        ), lh(
          i,
          d,
          p,
          if (Qt(
            i,
            i.stateNode.containerInfo
          ), n === null) throw Error(s(387));
          d = i.pendingProps;
          var v = i.memoizedState;
          p = v.element, Hd(n, i), Ji(i, d, null, c);
          var O = i.memoizedState;
          if (d = O.cache, $i(i, vn, d), d !== v.cache && cg(
            i,
            [vn],
          ), Is(), d = O.element, v.isDehydrated)
            if (v = {
              element: d,
              cache: O.cache
            }, i.updateQueue.baseState = v, i.memoizedState = v, i.flags & 256) {
              i = ih(
                i,
                d,
            } else if (d !== p) {
              p = Va(
                Error(s(424)),
                i
              ), Js(p), i = ih(
                i,
                d,
              switch (n = i.stateNode.containerInfo, n.nodeType) {
              for (Te = Yl(n.firstChild), un = i, ve = !0, ul = null, sl = !0, c = ci(
                i,
                d,
              ), i.child = c; c; )
            if ($s(), d === p) {
              i = di(
                i,
            Cn(
              i,
              d,
          i = i.child;
        return i;
        return Zr(n, i), n === null ? (c = $0(
          i.type,
          i.pendingProps,
        )) ? i.memoizedState = c : ve || (c = i.type, n = i.pendingProps, d = pl(
          vt.current
        ).createElement(c), d[Rn] = i, d[sa] = n, Gt(d, c, n), bn(d), i.stateNode = d) : i.memoizedState = $0(
          i.type,
          i.pendingProps,
        return va(i), n === null && ve && (d = i.stateNode = Et(
          i.type,
          i.pendingProps,
          vt.current
        ), un = i, sl = !0, p = Te, Io(i.type) ? (tu = p, Te = Yl(
          d.firstChild
        )) : Te = p), Cn(
          i,
          i.pendingProps.children,
        ), Zr(n, i), n === null && (i.flags |= 4194304), i.child;
        return n === null && ve && ((p = d = Te) && (d = Oc(
          d,
          i.type,
          i.pendingProps,
          sl
        ), d !== null ? (i.stateNode = d, un = i, Te = Yl(
          d.firstChild
        ), sl = !1, p = !0) : p = !1), p || Zi(i)), va(i), p = i.type, v = i.pendingProps, O = n !== null ? n.memoizedProps : null, d = v.children, Ti(p, v) ? d = null : O !== null && Ti(p, O) && (i.flags |= 32), i.memoizedState !== null && (p = kd(
          i,
          S0,
        ), Ua._currentValue = p), Zr(n, i), Cn(n, i, d, c), i.child;
        return n === null && ve && ((n = c = Te) && (c = qv(
          i.pendingProps,
          sl
        ), c !== null ? (i.stateNode = c, un = i, Te = null, n = !0) : n = !1), n || Zi(i)), null;
        return qg(n, i, c);
        return Qt(
          i,
          i.stateNode.containerInfo
        ), d = i.pendingProps, n === null ? i.child = Wu(
          i,
          d,
        ) : Cn(
          i,
          d,
        ), i.child;
        return w0(
          i,
          i.type,
          i.pendingProps,
        return Cn(
          i,
          i.pendingProps,
        ), i.child;
        return Cn(
          i,
          i.pendingProps.children,
        ), i.child;
        return Cn(
          i,
          i.pendingProps.children,
        ), i.child;
        return d = i.pendingProps, $i(i, i.type, d.value), Cn(
          i,
          d.children,
        ), i.child;
        return p = i.type._context, d = i.pendingProps.children, ko(i), p = wn(p), d = d(p), i.flags |= 1, Cn(n, i, d, c), i.child;
        return Ii(
          i,
          i.type,
          i.pendingProps,
        return Pu(
          i,
          i.type,
          i.pendingProps,
        return rh(n, i, c);
        return d = i.pendingProps, c = i.mode, d = {
          mode: d.mode,
          children: d.children
        }, n === null ? (c = sh(
          d,
        ), c.ref = i.ref, i.child = c, c.return = i, i = c) : (c = Cl(n.child, d), c.ref = i.ref, i.child = c, c.return = i, i = c), i;
        return nh(n, i, c);
        return ko(i), d = wn(vn), n === null ? (p = Mr(), p === null && (p = Ne, v = Ps(), p.pooledCache = v, v.refCount++, v !== null && (p.pooledCacheLanes |= c), p = v), i.memoizedState = {
          parent: d,
          cache: p
        }, Cd(i), $i(i, vn, p)) : ((n.lanes & c) !== 0 && (Hd(n, i), Ji(i, null, null, c), Is()), p = n.memoizedState, v = i.memoizedState, p.parent !== d ? (p = { parent: d, cache: d }, i.memoizedState = p, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = p), $i(i, vn, d)) : (d = v.cache, $i(i, vn, d), d !== p.cache && cg(
          i,
          [vn],
        ))), Cn(
          i,
          i.pendingProps.children,
        ), i.child;
        throw i.pendingProps;
    throw Error(s(156, i.tag));
  function hi(n) {
  function uc(n, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
    else if (n.flags |= 16777216, !Ep(i)) {
      if (i = Qa.current, i !== null && ((de & 4194048) === de ? na !== null : (de & 62914560) !== de && (de & 536870912) === 0 || i !== na))
        throw qu = wd, Rd;
  function $r(n, i) {
    i !== null && (n.flags |= 4), n.flags & 16384 && (i = n.tag !== 22 ? _t() : 536870912, n.lanes |= i, dc |= i);
  function sc(n, i) {
    if (!ve)
          i = n.tail;
          for (var c = null; i !== null; )
            i.alternate !== null && (c = i), i = i.sibling;
          for (var d = null; c !== null; )
            c.alternate !== null && (d = c), c = c.sibling;
          d === null ? i || n.tail === null ? n.tail = null : n.tail.sibling = null : d.sibling = null;
  function jt(n) {
    var i = n.alternate !== null && n.alternate.child === n.child, c = 0, d = 0;
    if (i)
      for (var p = n.child; p !== null; )
        c |= p.lanes | p.childLanes, d |= p.subtreeFlags & 65011712, d |= p.flags & 65011712, p.return = n, p = p.sibling;
      for (p = n.child; p !== null; )
        c |= p.lanes | p.childLanes, d |= p.subtreeFlags, d |= p.flags, p.return = n, p = p.sibling;
    return n.subtreeFlags |= d, n.childLanes = c, i;
  function Vg(n, i, c) {
    var d = i.pendingProps;
    switch (ei(i), i.tag) {
        return jt(i), null;
        return jt(i), null;
        return c = i.stateNode, d = null, n !== null && (d = n.memoizedState.cache), i.memoizedState.cache !== d && (i.flags |= 2048), ni(vn), Ge(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (Ks(i) ? hi(i) : n === null || n.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, sg())), jt(i), null;
        return c = i.memoizedState, n === null ? (hi(i), c !== null ? (jt(i), uc(i, c)) : (jt(i), i.flags &= -16777217)) : c ? c !== n.memoizedState ? (hi(i), jt(i), uc(i, c)) : (jt(i), i.flags &= -16777217) : (n.memoizedProps !== d && hi(i), jt(i), i.flags &= -16777217), null;
        Xl(i), c = vt.current;
        var p = i.type;
        if (n !== null && i.stateNode != null)
          n.memoizedProps !== d && hi(i);
          if (!d) {
            if (i.stateNode === null)
              throw Error(s(166));
            return jt(i), null;
          n = bt.current, Ks(i) ? Tr(i) : (n = Et(p, d, c), i.stateNode = n, hi(i));
        return jt(i), null;
        if (Xl(i), c = i.type, n !== null && i.stateNode != null)
          n.memoizedProps !== d && hi(i);
          if (!d) {
            if (i.stateNode === null)
              throw Error(s(166));
            return jt(i), null;
          if (n = bt.current, Ks(i))
            Tr(i);
            switch (p = pl(
              vt.current
                n = p.createElementNS(
                n = p.createElementNS(
                    n = p.createElementNS(
                    n = p.createElementNS(
                    n = p.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild);
                    n = typeof d.is == "string" ? p.createElement("select", { is: d.is }) : p.createElement("select"), d.multiple ? n.multiple = !0 : d.size && (n.size = d.size);
                    n = typeof d.is == "string" ? p.createElement(c, { is: d.is }) : p.createElement(c);
            n[Rn] = i, n[sa] = d;
            t: for (p = i.child; p !== null; ) {
              if (p.tag === 5 || p.tag === 6)
                n.appendChild(p.stateNode);
              else if (p.tag !== 4 && p.tag !== 27 && p.child !== null) {
                p.child.return = p, p = p.child;
              if (p === i) break t;
              for (; p.sibling === null; ) {
                if (p.return === null || p.return === i)
                p = p.return;
              p.sibling.return = p.return, p = p.sibling;
            i.stateNode = n;
            t: switch (Gt(n, c, d), c) {
                n = !!d.autoFocus;
            n && hi(i);
        return jt(i), i.flags &= -16777217, null;
        if (n && i.stateNode != null)
          n.memoizedProps !== d && hi(i);
          if (typeof d != "string" && i.stateNode === null)
            throw Error(s(166));
          if (n = vt.current, Ks(i)) {
            if (n = i.stateNode, c = i.memoizedProps, d = null, p = un, p !== null)
              switch (p.tag) {
                  d = p.memoizedProps;
            n[Rn] = i, n = !!(n.nodeValue === c || d !== null && d.suppressHydrationWarning === !0 || Sp(n.nodeValue, c)), n || Zi(i);
            n = pl(n).createTextNode(
              d
            ), n[Rn] = i, i.stateNode = n;
        return jt(i), null;
        if (d = i.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (p = Ks(i), d !== null && d.dehydrated !== null) {
              if (!p) throw Error(s(318));
              if (p = i.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(s(317));
              p[Rn] = i;
              $s(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            jt(i), p = !1;
            p = sg(), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = p), p = !0;
          if (!p)
            return i.flags & 256 ? (Bl(i), i) : (Bl(i), null);
        }
        if (Bl(i), (i.flags & 128) !== 0)
          return i.lanes = c, i;
        if (c = d !== null, n = n !== null && n.memoizedState !== null, c) {
          d = i.child, p = null, d.alternate !== null && d.alternate.memoizedState !== null && d.alternate.memoizedState.cachePool !== null && (p = d.alternate.memoizedState.cachePool.pool);
          var v = null;
          d.memoizedState !== null && d.memoizedState.cachePool !== null && (v = d.memoizedState.cachePool.pool), v !== p && (d.flags |= 2048);
        }
        return c !== n && c && (i.child.flags |= 8192), $r(i, i.updateQueue), jt(i), null;
        return Ge(), n === null && bp(i.stateNode.containerInfo), jt(i), null;
        return ni(i.type), jt(i), null;
        if (at(He), p = i.memoizedState, p === null) return jt(i), null;
        if (d = (i.flags & 128) !== 0, v = p.rendering, v === null)
          if (d) sc(p, !1);
            if (an !== 0 || n !== null && (n.flags & 128) !== 0)
              for (n = i.child; n !== null; ) {
                if (v = Vr(n), v !== null) {
                  for (i.flags |= 128, sc(p, !1), n = v.updateQueue, i.updateQueue = n, $r(i, n), i.subtreeFlags = 0, n = c, c = i.child; c !== null; )
                    ie(c, n), c = c.sibling;
                  return rt(
                    He,
                    He.current & 1 | 2
                  ), i.child;
            p.tail !== null && An() > Sh && (i.flags |= 128, d = !0, sc(p, !1), i.lanes = 4194304);
          if (!d)
            if (n = Vr(v), n !== null) {
              if (i.flags |= 128, d = !0, n = n.updateQueue, i.updateQueue = n, $r(i, n), sc(p, !0), p.tail === null && p.tailMode === "hidden" && !v.alternate && !ve)
                return jt(i), null;
              2 * An() - p.renderingStartTime > Sh && c !== 536870912 && (i.flags |= 128, d = !0, sc(p, !1), i.lanes = 4194304);
          p.isBackwards ? (v.sibling = i.child, i.child = v) : (n = p.last, n !== null ? n.sibling = v : i.child = v, p.last = v);
        return p.tail !== null ? (i = p.tail, p.rendering = i, p.tail = i.sibling, p.renderingStartTime = An(), i.sibling = null, n = He.current, rt(He, d ? n & 1 | 2 : n & 1), i) : (jt(i), null);
        return Bl(i), ec(), d = i.memoizedState !== null, n !== null ? n.memoizedState !== null !== d && (i.flags |= 8192) : d && (i.flags |= 8192), d ? (c & 536870912) !== 0 && (i.flags & 128) === 0 && (jt(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : jt(i), c = i.updateQueue, c !== null && $r(i, c.retryQueue), c = null, n !== null && n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), d = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (d = i.memoizedState.cachePool.pool), d !== c && (i.flags |= 2048), n !== null && at(li), null;
        return c = null, n !== null && (c = n.memoizedState.cache), i.memoizedState.cache !== c && (i.flags |= 2048), ni(vn), jt(i), null;
    throw Error(s(156, i.tag));
  function Hv(n, i) {
    switch (ei(i), i.tag) {
        return n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
        return ni(vn), Ge(), n = i.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (i.flags = n & -65537 | 128, i) : null;
        return Xl(i), null;
        if (Bl(i), n = i.memoizedState, n !== null && n.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(s(340));
          $s();
        return n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
        return at(He), null;
        return Ge(), null;
        return ni(i.type), null;
        return Bl(i), ec(), n !== null && at(li), n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
        return ni(vn), null;
  function Gg(n, i) {
    switch (ei(i), i.tag) {
        ni(vn), Ge();
        Xl(i);
        Ge();
        Bl(i);
        at(He);
        ni(i.type);
        Bl(i), ec(), n !== null && at(li);
        ni(vn);
  function Jr(n, i) {
      var c = i.updateQueue, d = c !== null ? c.lastEffect : null;
      if (d !== null) {
        var p = d.next;
        c = p;
            d = void 0;
            var v = c.create, O = c.inst;
            d = v(), O.destroy = d;
        } while (c !== p);
    } catch (R) {
      Re(i, i.return, R);
  function Qo(n, i, c) {
      var d = i.updateQueue, p = d !== null ? d.lastEffect : null;
      if (p !== null) {
        var v = p.next;
        d = v;
          if ((d.tag & n) === n) {
            var O = d.inst, R = O.destroy;
            if (R !== void 0) {
              O.destroy = void 0, p = i;
              var U = c, K = R;
                K();
              } catch (ot) {
                Re(
                  p,
                  U,
                  ot
          d = d.next;
        } while (d !== v);
    } catch (ot) {
      Re(i, i.return, ot);
  function dh(n) {
    var i = n.updateQueue;
    if (i !== null) {
        Rr(i, c);
      } catch (d) {
        Re(n, n.return, d);
  function Xg(n, i, c) {
    c.props = Go(
    } catch (d) {
      Re(n, i, d);
  function cc(n, i) {
            var d = n.stateNode;
            d = n.stateNode;
            d = n.stateNode;
        typeof c == "function" ? n.refCleanup = c(d) : c.current = d;
    } catch (p) {
      Re(n, i, p);
  function Ll(n, i) {
    var c = n.ref, d = n.refCleanup;
      if (typeof d == "function")
          d();
        } catch (p) {
          Re(n, i, p);
        } catch (p) {
          Re(n, i, p);
  function rc(n) {
    var i = n.type, c = n.memoizedProps, d = n.stateNode;
      t: switch (i) {
          c.autoFocus && d.focus();
          c.src ? d.src = c.src : c.srcSet && (d.srcset = c.srcSet);
    } catch (p) {
      Re(n, n.return, p);
  function Qg(n, i, c) {
      var d = n.stateNode;
      Lv(d, n.type, c, i), d[sa] = i;
    } catch (p) {
      Re(n, n.return, p);
  function H0(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 26 || n.tag === 27 && Io(n.type) || n.tag === 4;
  function dl(n) {
        if (n.return === null || H0(n.return)) return null;
        if (n.tag === 27 && Io(n.type) || n.flags & 2 || n.child === null || n.tag === 4) continue t;
  function ts(n, i, c) {
    var d = n.tag;
    if (d === 5 || d === 6)
      n = n.stateNode, i ? (c.nodeType === 9 ? c.body : c.nodeName === "HTML" ? c.ownerDocument.body : c).insertBefore(n, i) : (i = c.nodeType === 9 ? c.body : c.nodeName === "HTML" ? c.ownerDocument.body : c, i.appendChild(n), c = c._reactRootContainer, c != null || i.onclick !== null || (i.onclick = Ch));
    else if (d !== 4 && (d === 27 && Io(n.type) && (c = n.stateNode, i = null), n = n.child, n !== null))
      for (ts(n, i, c), n = n.sibling; n !== null; )
        ts(n, i, c), n = n.sibling;
  }
  function hh(n, i, c) {
    var d = n.tag;
    if (d === 5 || d === 6)
      n = n.stateNode, i ? c.insertBefore(n, i) : c.appendChild(n);
    else if (d !== 4 && (d === 27 && Io(n.type) && (c = n.stateNode), n = n.child, n !== null))
      for (hh(n, i, c), n = n.sibling; n !== null; )
        hh(n, i, c), n = n.sibling;
  }
  function mh(n) {
    var i = n.stateNode, c = n.memoizedProps;
      for (var d = n.type, p = i.attributes; p.length; )
        i.removeAttributeNode(p[0]);
      Gt(i, d, c), i[Rn] = n, i[sa] = c;
    } catch (v) {
      Re(n, n.return, v);
  var mi = !1, en = !1, gh = !1, ph = typeof WeakSet == "function" ? WeakSet : Set, _n = null;
  function Zg(n, i) {
    if (n = n.containerInfo, cf = gf, n = eg(n), yr(n)) {
          var d = c.getSelection && c.getSelection();
          if (d && d.rangeCount !== 0) {
            c = d.anchorNode;
            var p = d.anchorOffset, v = d.focusNode;
            d = d.focusOffset;
              c.nodeType, v.nodeType;
            var O = 0, R = -1, U = -1, K = 0, ot = 0, ct = n, W = null;
              for (var P; ct !== c || p !== 0 && ct.nodeType !== 3 || (R = O + p), ct !== v || d !== 0 && ct.nodeType !== 3 || (U = O + d), ct.nodeType === 3 && (O += ct.nodeValue.length), (P = ct.firstChild) !== null; )
                W = ct, ct = P;
                if (ct === n) break e;
                if (W === c && ++K === p && (R = O), W === v && ++ot === d && (U = O), (P = ct.nextSibling) !== null) break;
                ct = W, W = ct.parentNode;
              ct = P;
            c = R === -1 || U === -1 ? null : { start: R, end: U };
    for (rf = { focusedElem: n, selectionRange: c }, gf = !1, _n = i; _n !== null; )
      if (i = _n, n = i.child, (i.subtreeFlags & 1024) !== 0 && n !== null)
        n.return = i, _n = n;
        for (; _n !== null; ) {
          switch (i = _n, v = i.alternate, n = i.flags, i.tag) {
              if ((n & 1024) !== 0 && v !== null) {
                n = void 0, c = i, p = v.memoizedProps, v = v.memoizedState, d = c.stateNode;
                  var kt = Go(
                    p,
                  n = d.getSnapshotBeforeUpdate(
                    kt,
                    v
                  ), d.__reactInternalSnapshotBeforeUpdate = n;
                } catch (Bt) {
                  Re(
                    Bt
                if (n = i.stateNode.containerInfo, c = n.nodeType, c === 9)
                  ff(n);
                      ff(n);
              if ((n & 1024) !== 0) throw Error(s(163));
          if (n = i.sibling, n !== null) {
            n.return = i.return, _n = n;
          _n = i.return;
  function Kg(n, i, c) {
    var d = c.flags;
        pi(n, c), d & 4 && Jr(5, c);
        if (pi(n, c), d & 4)
          if (n = c.stateNode, i === null)
            } catch (O) {
              Re(c, c.return, O);
            var p = Go(
              i.memoizedProps
            i = i.memoizedState;
                p,
                i,
            } catch (O) {
              Re(
                O
        d & 64 && dh(c), d & 512 && cc(c, c.return);
        if (pi(n, c), d & 64 && (n = c.updateQueue, n !== null)) {
          if (i = null, c.child !== null)
                i = c.child.stateNode;
                i = c.child.stateNode;
            Rr(n, i);
          } catch (O) {
            Re(c, c.return, O);
        i === null && d & 4 && mh(c);
        pi(n, c), i === null && d & 4 && rc(c), d & 512 && cc(c, c.return);
        pi(n, c);
        pi(n, c), d & 4 && yh(n, c), d & 64 && (n = c.memoizedState, n !== null && (n = n.dehydrated, n !== null && (c = Uv.bind(
        ), Vv(n, c))));
        if (d = c.memoizedState !== null || mi, !d) {
          i = i !== null && i.memoizedState !== null || en, p = mi;
          var v = en;
          mi = d, (en = i) && !v ? Zo(
          ) : pi(n, c), mi = p, en = v;
        pi(n, c);
  function $g(n) {
    var i = n.alternate;
    i !== null && (n.alternate = null, $g(i)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (i = n.stateNode, i !== null && er(i)), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  var Xe = null, Xn = !1;
  function gi(n, i, c) {
      ce(n, i, c), c = c.sibling;
  function ce(n, i, c) {
    if (Ln && typeof Ln.onCommitFiberUnmount == "function")
        Ln.onCommitFiberUnmount(So, c);
        en || Ll(c, i), gi(
          i,
        en || Ll(c, i);
        var d = Xe, p = Xn;
        Io(c.type) && (Xe = c.stateNode, Xn = !1), gi(
          i,
        ), Ca(c.stateNode), Xe = d, Xn = p;
        en || Ll(c, i);
        if (d = Xe, p = Xn, Xe = null, gi(
          i,
        ), Xe = d, Xn = p, Xe !== null)
          if (Xn)
              (Xe.nodeType === 9 ? Xe.body : Xe.nodeName === "HTML" ? Xe.ownerDocument.body : Xe).removeChild(c.stateNode);
            } catch (v) {
              Re(
                i,
                v
              Xe.removeChild(c.stateNode);
            } catch (v) {
              Re(
                i,
                v
        Xe !== null && (Xn ? (n = Xe, Uh(
        ), Ei(n)) : Uh(Xe, c.stateNode));
        d = Xe, p = Xn, Xe = c.stateNode.containerInfo, Xn = !0, gi(
          i,
        ), Xe = d, Xn = p;
        en || Qo(2, c, i), en || Qo(4, c, i), gi(
          i,
        en || (Ll(c, i), d = c.stateNode, typeof d.componentWillUnmount == "function" && Xg(
          i,
          d
        )), gi(
          i,
        gi(
          i,
        en = (d = en) || c.memoizedState !== null, gi(
          i,
        ), en = d;
        gi(
          i,
  function yh(n, i) {
    if (i.memoizedState === null && (n = i.alternate, n !== null && (n = n.memoizedState, n !== null && (n = n.dehydrated, n !== null))))
        Ei(n);
        Re(i, i.return, c);
  function Jg(n) {
        var i = n.stateNode;
        return i === null && (i = n.stateNode = new ph()), i;
        return n = n.stateNode, i = n._retryCache, i === null && (i = n._retryCache = new ph()), i;
        throw Error(s(435, n.tag));
  function bh(n, i) {
    var c = Jg(n);
    i.forEach(function(d) {
      var p = Nv.bind(null, n, d);
      c.has(d) || (c.add(d), d.then(p, p));
  function fa(n, i) {
    var c = i.deletions;
      for (var d = 0; d < c.length; d++) {
        var p = c[d], v = n, O = i, R = O;
        t: for (; R !== null; ) {
          switch (R.tag) {
              if (Io(R.type)) {
                Xe = R.stateNode, Xn = !1;
              Xe = R.stateNode, Xn = !1;
              Xe = R.stateNode.containerInfo, Xn = !0;
          R = R.return;
        if (Xe === null) throw Error(s(160));
        ce(v, O, p), Xe = null, Xn = !1, v = p.alternate, v !== null && (v.return = null), p.return = null;
    if (i.subtreeFlags & 13878)
      for (i = i.child; i !== null; )
        Wr(i, n), i = i.sibling;
  var da = null;
  function Wr(n, i) {
    var c = n.alternate, d = n.flags;
        fa(i, n), Hn(n), d & 4 && (Qo(3, n, n.return), Jr(3, n), Qo(5, n, n.return));
        fa(i, n), Hn(n), d & 512 && (en || c === null || Ll(c, c.return)), d & 64 && mi && (n = n.updateQueue, n !== null && (d = n.callbacks, d !== null && (c = n.shared.hiddenCallbacks, n.shared.hiddenCallbacks = c === null ? d : c.concat(d))));
        var p = da;
        if (fa(i, n), Hn(n), d & 512 && (en || c === null || Ll(c, c.return)), d & 4) {
          var v = c !== null ? c.memoizedState : null;
          if (d = n.memoizedState, c === null)
            if (d === null)
                  d = n.type, c = n.memoizedProps, p = p.ownerDocument || p;
                  e: switch (d) {
                      v = p.getElementsByTagName("title")[0], (!v || v[Rt] || v[Rn] || v.namespaceURI === "http://www.w3.org/2000/svg" || v.hasAttribute("itemprop")) && (v = p.createElement(d), p.head.insertBefore(
                        v,
                        p.querySelector("head > title")
                      )), Gt(v, d, c), v[Rn] = n, bn(v), d = v;
                      var O = _p(
                        p
                      ).get(d + (c.href || ""));
                      if (O) {
                        for (var R = 0; R < O.length; R++)
                          if (v = O[R], v.getAttribute("href") === (c.href == null || c.href === "" ? null : c.href) && v.getAttribute("rel") === (c.rel == null ? null : c.rel) && v.getAttribute("title") === (c.title == null ? null : c.title) && v.getAttribute("crossorigin") === (c.crossOrigin == null ? null : c.crossOrigin)) {
                            O.splice(R, 1);
                      v = p.createElement(d), Gt(v, d, c), p.head.appendChild(v);
                      if (O = _p(
                        p
                      ).get(d + (c.content || ""))) {
                        for (R = 0; R < O.length; R++)
                          if (v = O[R], v.getAttribute("content") === (c.content == null ? null : "" + c.content) && v.getAttribute("name") === (c.name == null ? null : c.name) && v.getAttribute("property") === (c.property == null ? null : c.property) && v.getAttribute("http-equiv") === (c.httpEquiv == null ? null : c.httpEquiv) && v.getAttribute("charset") === (c.charSet == null ? null : c.charSet)) {
                            O.splice(R, 1);
                      v = p.createElement(d), Gt(v, d, c), p.head.appendChild(v);
                      throw Error(s(468, d));
                  v[Rn] = n, bn(v), d = v;
                n.stateNode = d;
                xp(
                  p,
              n.stateNode = W0(
                p,
                d,
            v !== d ? (v === null ? c.stateNode !== null && (c = c.stateNode, c.parentNode.removeChild(c)) : v.count--, d === null ? xp(
              p,
            ) : W0(
              p,
              d,
            )) : d === null && n.stateNode !== null && Qg(
        fa(i, n), Hn(n), d & 512 && (en || c === null || Ll(c, c.return)), c !== null && d & 4 && Qg(
        if (fa(i, n), Hn(n), d & 512 && (en || c === null || Ll(c, c.return)), n.flags & 32) {
          p = n.stateNode;
            Ns(p, "");
          } catch (P) {
            Re(n, n.return, P);
        d & 4 && n.stateNode != null && (p = n.memoizedProps, Qg(
          p,
          c !== null ? c.memoizedProps : p
        )), d & 1024 && (gh = !0);
        if (fa(i, n), Hn(n), d & 4) {
            throw Error(s(162));
          d = n.memoizedProps, c = n.stateNode;
            c.nodeValue = d;
          } catch (P) {
            Re(n, n.return, P);
        if (au = null, p = da, da = Nh(i.containerInfo), fa(i, n), da = p, Hn(n), d & 4 && c !== null && c.memoizedState.isDehydrated)
            Ei(i.containerInfo);
          } catch (P) {
            Re(n, n.return, P);
        gh && (gh = !1, Wg(n));
        d = da, da = Nh(
        ), fa(i, n), Hn(n), da = d;
        fa(i, n), Hn(n);
        fa(i, n), Hn(n), n.child.flags & 8192 && n.memoizedState !== null != (c !== null && c.memoizedState !== null) && (lp = An()), d & 4 && (d = n.updateQueue, d !== null && (n.updateQueue = null, bh(n, d)));
        p = n.memoizedState !== null;
        var U = c !== null && c.memoizedState !== null, K = mi, ot = en;
        if (mi = K || p, en = ot || U, fa(i, n), en = ot, mi = K, Hn(n), d & 8192)
          t: for (i = n.stateNode, i._visibility = p ? i._visibility & -2 : i._visibility | 1, p && (c === null || U || mi || en || Qe(n)), c = null, i = n; ; ) {
            if (i.tag === 5 || i.tag === 26) {
                U = c = i;
                  if (v = U.stateNode, p)
                    O = v.style, typeof O.setProperty == "function" ? O.setProperty("display", "none", "important") : O.display = "none";
                    R = U.stateNode;
                    var ct = U.memoizedProps.style, W = ct != null && ct.hasOwnProperty("display") ? ct.display : null;
                    R.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
                } catch (P) {
                  Re(U, U.return, P);
            } else if (i.tag === 6) {
                U = i;
                  U.stateNode.nodeValue = p ? "" : U.memoizedProps;
                } catch (P) {
                  Re(U, U.return, P);
            } else if ((i.tag !== 22 && i.tag !== 23 || i.memoizedState === null || i === n) && i.child !== null) {
              i.child.return = i, i = i.child;
            if (i === n) break t;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === n) break t;
              c === i && (c = null), i = i.return;
            c === i && (c = null), i.sibling.return = i.return, i = i.sibling;
        d & 4 && (d = n.updateQueue, d !== null && (c = d.retryQueue, c !== null && (d.retryQueue = null, bh(n, c))));
        fa(i, n), Hn(n), d & 4 && (d = n.updateQueue, d !== null && (n.updateQueue = null, bh(n, d)));
        fa(i, n), Hn(n);
  function Hn(n) {
    var i = n.flags;
    if (i & 2) {
        for (var c, d = n.return; d !== null; ) {
          if (H0(d)) {
            c = d;
          d = d.return;
        if (c == null) throw Error(s(160));
            var p = c.stateNode, v = dl(n);
            hh(n, v, p);
            var O = c.stateNode;
            c.flags & 32 && (Ns(O, ""), c.flags &= -33);
            var R = dl(n);
            hh(n, R, O);
            var U = c.stateNode.containerInfo, K = dl(n);
            ts(
              K,
              U
            throw Error(s(161));
      } catch (ot) {
        Re(n, n.return, ot);
    i & 4096 && (n.flags &= -4097);
  function Wg(n) {
        var i = n;
        Wg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), n = n.sibling;
  function pi(n, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        Kg(n, i.alternate, i), i = i.sibling;
  function Qe(n) {
      var i = n;
      switch (i.tag) {
          Qo(4, i, i.return), Qe(i);
          Ll(i, i.return);
          var c = i.stateNode;
          typeof c.componentWillUnmount == "function" && Xg(
            i,
            i.return,
          ), Qe(i);
          Ca(i.stateNode);
          Ll(i, i.return), Qe(i);
          i.memoizedState === null && Qe(i);
          Qe(i);
          Qe(i);
  function Zo(n, i, c) {
    for (c = c && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var d = i.alternate, p = n, v = i, O = v.flags;
      switch (v.tag) {
          Zo(
            p,
            v,
          ), Jr(4, v);
          if (Zo(
            p,
            v,
          ), d = v, p = d.stateNode, typeof p.componentDidMount == "function")
              p.componentDidMount();
            } catch (K) {
              Re(d, d.return, K);
          if (d = v, p = d.updateQueue, p !== null) {
            var R = d.stateNode;
              var U = p.shared.hiddenCallbacks;
              if (U !== null)
                for (p.shared.hiddenCallbacks = null, p = 0; p < U.length; p++)
                  Ud(U[p], R);
            } catch (K) {
              Re(d, d.return, K);
          c && O & 64 && dh(v), cc(v, v.return);
          mh(v);
          Zo(
            p,
            v,
          ), c && d === null && O & 4 && rc(v), cc(v, v.return);
          Zo(
            p,
            v,
          Zo(
            p,
            v,
          ), c && O & 4 && yh(p, v);
          v.memoizedState === null && Zo(
            p,
            v,
          ), cc(v, v.return);
          Zo(
            p,
            v,
      i = i.sibling;
  function hl(n, i) {
    n !== null && n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), n = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (n = i.memoizedState.cachePool.pool), n !== c && (n != null && n.refCount++, c != null && ai(c));
  function vh(n, i) {
    n = null, i.alternate !== null && (n = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== n && (i.refCount++, n != null && ai(n));
  function Qn(n, i, c, d) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        Fg(
          i,
          d
        ), i = i.sibling;
  function Fg(n, i, c, d) {
    var p = i.flags;
    switch (i.tag) {
        Qn(
          i,
          d
        ), p & 2048 && Jr(9, i);
        Qn(
          i,
          d
        Qn(
          i,
          d
        ), p & 2048 && (n = null, i.alternate !== null && (n = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== n && (i.refCount++, n != null && ai(n)));
        if (p & 2048) {
          Qn(
            i,
            d
          ), n = i.stateNode;
            var v = i.memoizedProps, O = v.id, R = v.onPostCommit;
            typeof R == "function" && R(
              O,
              i.alternate === null ? "mount" : "update",
          } catch (U) {
            Re(i, i.return, U);
          Qn(
            i,
            d
        Qn(
          i,
          d
        v = i.stateNode, O = i.alternate, i.memoizedState !== null ? v._visibility & 2 ? Qn(
          i,
          d
        ) : _e(n, i) : v._visibility & 2 ? Qn(
          i,
          d
        ) : (v._visibility |= 2, to(
          i,
          d,
          (i.subtreeFlags & 10256) !== 0
        )), p & 2048 && hl(O, i);
        Qn(
          i,
          d
        ), p & 2048 && vh(i.alternate, i);
        Qn(
          i,
          d
  function to(n, i, c, d, p) {
    for (p = p && (i.subtreeFlags & 10256) !== 0, i = i.child; i !== null; ) {
      var v = n, O = i, R = c, U = d, K = O.flags;
      switch (O.tag) {
          to(
            v,
            O,
            p
          ), Jr(8, O);
          var ot = O.stateNode;
          O.memoizedState !== null ? ot._visibility & 2 ? to(
            v,
            O,
            p
          ) : _e(
            v,
            O
          ) : (ot._visibility |= 2, to(
            v,
            O,
            p
          )), p && K & 2048 && hl(
            O.alternate,
            O
          to(
            v,
            O,
            p
          ), p && K & 2048 && vh(O.alternate, O);
          to(
            v,
            O,
            p
      i = i.sibling;
  function _e(n, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var c = n, d = i, p = d.flags;
        switch (d.tag) {
            _e(c, d), p & 2048 && hl(
              d.alternate,
              d
            _e(c, d), p & 2048 && vh(d.alternate, d);
            _e(c, d);
        i = i.sibling;
  var es = 8192;
  function nn(n) {
    if (n.subtreeFlags & es)
        U0(n), n = n.sibling;
  function U0(n) {
        nn(n), n.flags & es && n.memoizedState !== null && I0(
          da,
        nn(n);
        var i = da;
        da = Nh(n.stateNode.containerInfo), nn(n), da = i;
        n.memoizedState === null && (i = n.alternate, i !== null && i.memoizedState !== null ? (i = es, es = 16777216, nn(n), es = i) : nn(n));
        nn(n);
  function Pg(n) {
    var i = n.alternate;
    if (i !== null && (n = i.child, n !== null)) {
      i.child = null;
        i = n.sibling, n.sibling = null, n = i;
  function ns(n) {
    var i = n.deletions;
      if (i !== null)
        for (var c = 0; c < i.length; c++) {
          var d = i[c];
          _n = d, tp(
            d,
      Pg(n);
        Ig(n), n = n.sibling;
  function Ig(n) {
        ns(n), n.flags & 2048 && Qo(9, n, n.return);
        ns(n);
        ns(n);
        var i = n.stateNode;
        n.memoizedState !== null && i._visibility & 2 && (n.return === null || n.return.tag !== 13) ? (i._visibility &= -3, ha(n)) : ns(n);
        ns(n);
  function ha(n) {
    var i = n.deletions;
      if (i !== null)
        for (var c = 0; c < i.length; c++) {
          var d = i[c];
          _n = d, tp(
            d,
      Pg(n);
      switch (i = n, i.tag) {
          Qo(8, i, i.return), ha(i);
          c = i.stateNode, c._visibility & 2 && (c._visibility &= -3, ha(i));
          ha(i);
  function tp(n, i) {
    for (; _n !== null; ) {
      var c = _n;
          Qo(8, c, i);
            var d = c.memoizedState.cachePool.pool;
            d != null && d.refCount++;
          ai(c.memoizedState.cache);
      if (d = c.child, d !== null) d.return = c, _n = d;
        t: for (c = n; _n !== null; ) {
          d = _n;
          var p = d.sibling, v = d.return;
          if ($g(d), d === c) {
            _n = null;
          if (p !== null) {
            p.return = v, _n = p;
          _n = v;
  var ep = {
      var i = wn(vn), c = i.data.get(n);
      return c === void 0 && (c = n(), i.data.set(n, c)), c;
    }
  }, N0 = typeof WeakMap == "function" ? WeakMap : Map, De = 0, Ne = null, fe = null, de = 0, Ae = 0, Ra = null, yi = !1, fc = !1, np = !1, eo = 0, an = 0, no = 0, as = 0, bi = 0, ml = 0, dc = 0, hc = null, wa = null, ap = !1, lp = 0, Sh = 1 / 0, mc = null, Ko = null, Zn = 0, vi = null, gc = null, Kn = 0, Th = 0, _h = null, ip = null, pc = 0, op = null;
  function Za() {
    if ((De & 2) !== 0 && de !== 0)
      return de & -de;
    if (L.T !== null) {
      var n = cl;
      return n !== 0 ? n : us();
    }
    return td();
  }
  function up() {
    ml === 0 && (ml = (de & 536870912) === 0 || ve ? gt() : 536870912);
    var n = Qa.current;
    return n !== null && (n.flags |= 32), ml;
  }
  function Ka(n, i, c) {
    (n === Ne && (Ae === 2 || Ae === 9) || n.cancelPendingCommit !== null) && (Si(n, 0), ao(
      de,
      ml,
    )), Zt(n, c), ((De & 2) === 0 || n !== Ne) && (n === Ne && ((De & 2) === 0 && (as |= c), an === 4 && ao(
      de,
      ml,
    )), za(n));
  function yc(n, i, c) {
    if ((De & 6) !== 0) throw Error(s(327));
    var d = !c && (i & 124) === 0 && (i & n.expiredLanes) === 0 || A(n, i), p = d ? cp(n, i) : xh(n, i, !0), v = d;
      if (p === 0) {
        fc && !d && ao(n, i, 0, !1);
        if (c = n.current.alternate, v && !k0(c)) {
          p = xh(n, i, !1), v = !1;
        if (p === 2) {
          if (v = i, n.errorRecoveryDisabledLanes & v)
            var O = 0;
            O = n.pendingLanes & -536870913, O = O !== 0 ? O : O & 536870912 ? 536870912 : 0;
          if (O !== 0) {
            i = O;
              var R = n;
              p = hc;
              var U = R.current.memoizedState.isDehydrated;
              if (U && (Si(R, O).flags |= 256), O = xh(
                O,
              ), O !== 2) {
                if (np && !U) {
                  R.errorRecoveryDisabledLanes |= v, as |= v, p = 4;
                v = wa, wa = p, v !== null && (wa === null ? wa = v : wa.push.apply(
                  wa,
                  v
              p = O;
            if (v = !1, p !== 2) continue;
        if (p === 1) {
          Si(n, 0), ao(n, i, 0, !0);
          switch (d = n, v = p, v) {
              throw Error(s(345));
              if ((i & 4194048) !== i) break;
              ao(
                d,
                i,
                ml,
                !yi
              wa = null;
              throw Error(s(329));
          }
          if ((i & 62914560) === i && (p = lp + 300 - An(), 10 < p)) {
            if (ao(
              d,
              i,
              ml,
              !yi
            ), El(d, 0, !0) !== 0) break t;
            d.timeoutHandle = Hh(
              Fr.bind(
                d,
                wa,
                mc,
                ap,
                i,
                ml,
                as,
                dc,
                yi,
                v,
              p
          Fr(
            d,
            wa,
            mc,
            ap,
            i,
            ml,
            as,
            dc,
            yi,
            v,
    za(n);
  function Fr(n, i, c, d, p, v, O, R, U, K, ot, ct, W, P) {
    if (n.timeoutHandle = -1, ct = i.subtreeFlags, (ct & 8192 || (ct & 16785408) === 16785408) && (Rc = { stylesheets: null, count: 0, unsuspend: P0 }, U0(i), ct = Op(), ct !== null)) {
      n.cancelPendingCommit = ct(
        Y0.bind(
          i,
          v,
          d,
          p,
          O,
          1,
          W,
          P
      ), ao(n, v, O, !K);
    Y0(
      i,
      v,
      d,
      p,
      O,
      U
  function k0(n) {
    for (var i = n; ; ) {
      var c = i.tag;
      if ((c === 0 || c === 11 || c === 15) && i.flags & 16384 && (c = i.updateQueue, c !== null && (c = c.stores, c !== null)))
        for (var d = 0; d < c.length; d++) {
          var p = c[d], v = p.getSnapshot;
          p = p.value;
            if (!Gn(v(), p)) return !1;
      if (c = i.child, i.subtreeFlags & 16384 && c !== null)
        c.return = i, i = c;
        if (i === n) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === n) return !0;
          i = i.return;
        i.sibling.return = i.return, i = i.sibling;
  function ao(n, i, c, d) {
    i &= ~bi, i &= ~as, n.suspendedLanes |= i, n.pingedLanes &= ~i, d && (n.warmLanes |= i), d = n.expirationTimes;
    for (var p = i; 0 < p; ) {
      var v = 31 - Yn(p), O = 1 << v;
      d[v] = -1, p &= ~O;
    c !== 0 && ge(n, c, i);
  function ls() {
    return (De & 6) === 0 ? (ef(0), !1) : !0;
  function $o() {
    if (fe !== null) {
      if (Ae === 0)
        var n = fe.return;
        n = fe, Ul = Ki = null, Ld(n), $u = null, lc = 0, n = fe;
        Gg(n.alternate, n), n = n.return;
      fe = null;
  function Si(n, i) {
    c !== -1 && (n.timeoutHandle = -1, Yv(c)), c = n.cancelPendingCommit, c !== null && (n.cancelPendingCommit = null, c()), $o(), Ne = n, fe = c = Cl(n.current, null), de = i, Ae = 0, Ra = null, yi = !1, fc = A(n, i), np = !1, dc = ml = bi = as = no = an = 0, wa = hc = null, ap = !1, (i & 8) !== 0 && (i |= i & 32);
    var d = n.entangledLanes;
    if (d !== 0)
      for (n = n.entanglements, d &= i; 0 < d; ) {
        var p = 31 - Yn(d), v = 1 << p;
        i |= n[p], d &= ~v;
    return eo = i, zl(), c;
  function sp(n, i) {
    Ft = null, L.H = Id, i === Lo || i === Dr ? (i = dg(), Ae = 3) : i === Rd ? (i = dg(), Ae = 4) : Ae = i === tn ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, Ra = i, fe === null && (an = 1, Qr(
      Va(i, n.current)
  function B0() {
    var n = L.H;
    return L.H = Id, n === null ? Id : n;
  function is() {
    var n = L.A;
    return L.A = ep, n;
  function os() {
    an = 4, yi || (de & 4194048) !== de && Qa.current !== null || (fc = !0), (no & 134217727) === 0 && (as & 134217727) === 0 || Ne === null || ao(
      Ne,
      de,
      ml,
  function xh(n, i, c) {
    var d = De;
    De |= 2;
    var p = B0(), v = is();
    (Ne !== n || de !== i) && (mc = null, Si(n, i)), i = !1;
    var O = an;
        if (Ae !== 0 && fe !== null) {
          var R = fe, U = Ra;
          switch (Ae) {
              $o(), O = 6;
              Qa.current === null && (i = !0);
              var K = Ae;
              if (Ae = 0, Ra = null, bc(n, R, U, K), c && fc) {
                O = 0;
              K = Ae, Ae = 0, Ra = null, bc(n, R, U, K);
        Eh(), O = an;
      } catch (ot) {
        sp(n, ot);
    return i && n.shellSuspendCounter++, Ul = Ki = null, De = d, L.H = p, L.A = v, fe === null && (Ne = null, de = 0, zl()), O;
  function Eh() {
    for (; fe !== null; ) fp(fe);
  function cp(n, i) {
    var c = De;
    De |= 2;
    var d = B0(), p = is();
    Ne !== n || de !== i ? (mc = null, Sh = An() + 500, Si(n, i)) : fc = A(
      i
        if (Ae !== 0 && fe !== null) {
          i = fe;
          var v = Ra;
          e: switch (Ae) {
              Ae = 0, Ra = null, bc(n, i, v, 1);
              if (zd(v)) {
                Ae = 0, Ra = null, dp(i);
              i = function() {
                Ae !== 2 && Ae !== 9 || Ne !== n || (Ae = 7), za(n);
              }, v.then(i, i);
              Ae = 7;
              Ae = 5;
              zd(v) ? (Ae = 0, Ra = null, dp(i)) : (Ae = 0, Ra = null, bc(n, i, v, 7));
              var O = null;
              switch (fe.tag) {
                  O = fe.memoizedState;
                  var R = fe;
                  if (!O || Ep(O)) {
                    Ae = 0, Ra = null;
                    var U = R.sibling;
                    if (U !== null) fe = U;
                      var K = R.return;
                      K !== null ? (fe = K, Pr(K)) : fe = null;
              Ae = 0, Ra = null, bc(n, i, v, 5);
              Ae = 0, Ra = null, bc(n, i, v, 6);
              $o(), an = 6;
              throw Error(s(462));
        rp();
      } catch (ot) {
        sp(n, ot);
    return Ul = Ki = null, L.H = d, L.A = p, De = c, fe !== null ? 0 : (Ne = null, de = 0, zl(), an);
  function rp() {
    for (; fe !== null && !Pc(); )
      fp(fe);
  function fp(n) {
    var i = C0(n.alternate, n, eo);
    n.memoizedProps = n.pendingProps, i === null ? Pr(n) : fe = i;
  function dp(n) {
    var i = n, c = i.alternate;
    switch (i.tag) {
        i = Lg(
          i,
          i.pendingProps,
          i.type,
          de
        i = Lg(
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          de
        Ld(i);
        Gg(c, i), i = fe = ie(i, eo), i = C0(c, i, eo);
    n.memoizedProps = n.pendingProps, i === null ? Pr(n) : fe = i;
  function bc(n, i, c, d) {
    Ul = Ki = null, Ld(i), $u = null, lc = 0;
    var p = i.return;
      if (R0(
        p,
        i,
        de
        an = 1, Qr(
          Va(c, n.current)
        ), fe = null;
    } catch (v) {
      if (p !== null) throw fe = p, v;
      an = 1, Qr(
        Va(c, n.current)
      ), fe = null;
    i.flags & 32768 ? (ve || d === 1 ? n = !0 : fc || (de & 536870912) !== 0 ? n = !1 : (yi = n = !0, (d === 2 || d === 9 || d === 3 || d === 6) && (d = Qa.current, d !== null && d.tag === 13 && (d.flags |= 16384))), L0(i, n)) : Pr(i);
  function Pr(n) {
    var i = n;
      if ((i.flags & 32768) !== 0) {
        L0(
          i,
          yi
      n = i.return;
      var c = Vg(
        i.alternate,
        i,
        eo
        fe = c;
      if (i = i.sibling, i !== null) {
        fe = i;
      fe = i = n;
    } while (i !== null);
    an === 0 && (an = 5);
  function L0(n, i) {
      var c = Hv(n.alternate, n);
        c.flags &= 32767, fe = c;
      if (c = n.return, c !== null && (c.flags |= 32768, c.subtreeFlags = 0, c.deletions = null), !i && (n = n.sibling, n !== null)) {
        fe = n;
      fe = n = c;
    an = 6, fe = null;
  function Y0(n, i, c, d, p, v, O, R, U) {
      Mh();
    while (Zn !== 0);
    if ((De & 6) !== 0) throw Error(s(327));
    if (i !== null) {
      if (i === n.current) throw Error(s(177));
      if (v = i.lanes | i.childLanes, v |= Il, Wt(
        v,
        O,
        U
      ), n === Ne && (fe = Ne = null, de = 0), gc = i, vi = n, Kn = c, Th = v, _h = p, ip = d, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (n.callbackNode = null, n.callbackPriority = 0, kv(Zl, function() {
        return hp(), null;
      })) : (n.callbackNode = null, n.callbackPriority = 0), d = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || d) {
        d = L.T, L.T = null, p = nt.p, nt.p = 2, O = De, De |= 4;
          Zg(n, i, c);
          De = O, nt.p = p, L.T = d;
      Zn = 1, j0(), Ir(), Oh();
  function j0() {
    if (Zn === 1) {
      Zn = 0;
      var n = vi, i = gc, c = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || c) {
        c = L.T, L.T = null;
        var d = nt.p;
        nt.p = 2;
        var p = De;
        De |= 4;
          Wr(i, n);
          var v = rf, O = eg(n.containerInfo), R = v.focusedElem, U = v.selectionRange;
          if (O !== R && R && R.ownerDocument && pr(
            R.ownerDocument.documentElement,
            R
            if (U !== null && yr(R)) {
              var K = U.start, ot = U.end;
              if (ot === void 0 && (ot = K), "selectionStart" in R)
                R.selectionStart = K, R.selectionEnd = Math.min(
                  ot,
                  R.value.length
                var ct = R.ownerDocument || document, W = ct && ct.defaultView || window;
                if (W.getSelection) {
                  var P = W.getSelection(), kt = R.textContent.length, Bt = Math.min(U.start, kt), xe = U.end === void 0 ? Bt : Math.min(U.end, kt);
                  !P.extend && Bt > xe && (O = xe, xe = Bt, Bt = O);
                  var X = Ye(
                    R,
                    Bt
                  ), j = Ye(
                    R,
                    xe
                  if (X && j && (P.rangeCount !== 1 || P.anchorNode !== X.node || P.anchorOffset !== X.offset || P.focusNode !== j.node || P.focusOffset !== j.offset)) {
                    var Z = ct.createRange();
                    Z.setStart(X.node, X.offset), P.removeAllRanges(), Bt > xe ? (P.addRange(Z), P.extend(j.node, j.offset)) : (Z.setEnd(j.node, j.offset), P.addRange(Z));
            for (ct = [], P = R; P = P.parentNode; )
              P.nodeType === 1 && ct.push({
                element: P,
                left: P.scrollLeft,
                top: P.scrollTop
            for (typeof R.focus == "function" && R.focus(), R = 0; R < ct.length; R++) {
              var st = ct[R];
              st.element.scrollLeft = st.left, st.element.scrollTop = st.top;
          gf = !!cf, rf = cf = null;
          De = p, nt.p = d, L.T = c;
      n.current = i, Zn = 2;
  function Ir() {
    if (Zn === 2) {
      Zn = 0;
      var n = vi, i = gc, c = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || c) {
        c = L.T, L.T = null;
        var d = nt.p;
        nt.p = 2;
        var p = De;
        De |= 4;
          Kg(n, i.alternate, i);
          De = p, nt.p = d, L.T = c;
      Zn = 3;
  function Oh() {
    if (Zn === 4 || Zn === 3) {
      Zn = 0, cn();
      var n = vi, i = gc, c = Kn, d = ip;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? Zn = 5 : (Zn = 0, gc = vi = null, q0(n, n.pendingLanes));
      var p = n.pendingLanes;
      if (p === 0 && (Ko = null), Ol(c), i = i.stateNode, Ln && typeof Ln.onCommitFiberRoot == "function")
          Ln.onCommitFiberRoot(
            So,
            i,
            (i.current.flags & 128) === 128
      if (d !== null) {
        i = L.T, p = nt.p, nt.p = 2, L.T = null;
          for (var v = n.onRecoverableError, O = 0; O < d.length; O++) {
            var R = d[O];
            v(R.value, {
              componentStack: R.stack
          L.T = i, nt.p = p;
      (Kn & 3) !== 0 && Mh(), za(n), p = n.pendingLanes, (c & 4194090) !== 0 && (p & 42) !== 0 ? n === op ? pc++ : (pc = 0, op = n) : pc = 0, ef(0);
  function q0(n, i) {
    (n.pooledCacheLanes &= i) === 0 && (i = n.pooledCache, i != null && (n.pooledCache = null, ai(i)));
  function Mh(n) {
    return j0(), Ir(), Oh(), hp();
  function hp() {
    if (Zn !== 5) return !1;
    var n = vi, i = Th;
    Th = 0;
    var c = Ol(Kn), d = L.T, p = nt.p;
      nt.p = 32 > c ? 32 : c, L.T = null, c = _h, _h = null;
      var v = vi, O = Kn;
      if (Zn = 0, gc = vi = null, Kn = 0, (De & 6) !== 0) throw Error(s(331));
      var R = De;
      if (De |= 4, Ig(v.current), Fg(
        v,
        v.current,
        O,
      ), De = R, ef(0, !1), Ln && typeof Ln.onPostCommitFiberRoot == "function")
          Ln.onPostCommitFiberRoot(So, v);
      nt.p = p, L.T = d, q0(n, i);
  function mp(n, i, c) {
    i = Va(c, i), i = kg(n.stateNode, i, 2), n = oi(n, i, 2), n !== null && (Zt(n, 2), za(n));
  function Re(n, i, c) {
      mp(n, n, c);
      for (; i !== null; ) {
        if (i.tag === 3) {
          mp(
            i,
        } else if (i.tag === 1) {
          var d = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (Ko === null || !Ko.has(d))) {
            n = Va(c, n), c = Bg(2), d = oi(i, c, 2), d !== null && (Aa(
              d,
              i,
            ), Zt(d, 2), za(d));
        i = i.return;
  function Dh(n, i, c) {
    var d = n.pingCache;
    if (d === null) {
      d = n.pingCache = new N0();
      var p = /* @__PURE__ */ new Set();
      d.set(i, p);
      p = d.get(i), p === void 0 && (p = /* @__PURE__ */ new Set(), d.set(i, p));
    p.has(c) || (np = !0, p.add(c), n = gp.bind(null, n, i, c), i.then(n, n));
  function gp(n, i, c) {
    var d = n.pingCache;
    d !== null && d.delete(i), n.pingedLanes |= n.suspendedLanes & c, n.warmLanes &= ~c, Ne === n && (de & c) === c && (an === 4 || an === 3 && (de & 62914560) === de && 300 > An() - lp ? (De & 2) === 0 && Si(n, 0) : bi |= c, dc === de && (dc = 0)), za(n);
  function pp(n, i) {
    i === 0 && (i = _t()), n = ti(n, i), n !== null && (Zt(n, i), za(n));
  function Uv(n) {
    var i = n.memoizedState, c = 0;
    i !== null && (c = i.retryLane), pp(n, c);
  function Nv(n, i) {
        var d = n.stateNode, p = n.memoizedState;
        p !== null && (c = p.retryLane);
        d = n.stateNode;
        d = n.stateNode._retryCache;
        throw Error(s(314));
    d !== null && d.delete(i), pp(n, c);
  function kv(n, i) {
    return Ql(n, i);
  var Ah = null, Jo = null, tf = !1, vc = !1, Rh = !1, Wo = 0;
  function za(n) {
    n !== Jo && n.next === null && (Jo === null ? Ah = Jo = n : Jo = Jo.next = n), vc = !0, tf || (tf = !0, X0());
  function ef(n, i) {
    if (!Rh && vc) {
      Rh = !0;
        for (var c = !1, d = Ah; d !== null; ) {
            var p = d.pendingLanes;
            if (p === 0) var v = 0;
              var O = d.suspendedLanes, R = d.pingedLanes;
              v = (1 << 31 - Yn(42 | n) + 1) - 1, v &= p & ~(O & ~R), v = v & 201326741 ? v & 201326741 | 1 : v ? v | 2 : 0;
            v !== 0 && (c = !0, af(d, v));
            v = de, v = El(
              d,
              d === Ne ? v : 0,
              d.cancelPendingCommit !== null || d.timeoutHandle !== -1
            ), (v & 3) === 0 || A(d, v) || (c = !0, af(d, v));
          d = d.next;
      Rh = !1;
  function V0() {
    nf();
  function nf() {
    vc = tf = !1;
    Wo !== 0 && (oo() && (n = Wo), Wo = 0);
    for (var i = An(), c = null, d = Ah; d !== null; ) {
      var p = d.next, v = yp(d, i);
      v === 0 ? (d.next = null, c === null ? Ah = p : c.next = p, p === null && (Jo = c)) : (c = d, (n !== 0 || (v & 3) !== 0) && (vc = !0)), d = p;
    ef(n);
  function yp(n, i) {
    for (var c = n.suspendedLanes, d = n.pingedLanes, p = n.expirationTimes, v = n.pendingLanes & -62914561; 0 < v; ) {
      var O = 31 - Yn(v), R = 1 << O, U = p[O];
      U === -1 ? ((R & c) === 0 || (R & d) !== 0) && (p[O] = G(R, i)) : U <= i && (n.expiredLanes |= R), v &= ~R;
    if (i = Ne, c = de, c = El(
      n === i ? c : 0,
    ), d = n.callbackNode, c === 0 || n === i && (Ae === 2 || Ae === 9) || n.cancelPendingCommit !== null)
      return d !== null && d !== null && Rs(d), n.callbackNode = null, n.callbackPriority = 0;
    if ((c & 3) === 0 || A(n, c)) {
      if (i = c & -c, i === n.callbackPriority) return i;
      switch (d !== null && Rs(d), Ol(c)) {
          c = ae;
          c = Zl;
          c = Bi;
          c = Zl;
      return d = G0.bind(null, n), c = Ql(c, d), n.callbackPriority = i, n.callbackNode = c, i;
    return d !== null && d !== null && Rs(d), n.callbackPriority = 2, n.callbackNode = null, 2;
  function G0(n, i) {
    if (Zn !== 0 && Zn !== 5)
    if (Mh() && n.callbackNode !== c)
    var d = de;
    return d = El(
      n === Ne ? d : 0,
    ), d === 0 ? null : (yc(n, d, i), yp(n, An()), n.callbackNode != null && n.callbackNode === c ? G0.bind(null, n) : null);
  }
  function af(n, i) {
    if (Mh()) return null;
    yc(n, i, !0);
  }
  function X0() {
    jv(function() {
      (De & 6) !== 0 ? Ql(
        Pf,
        V0
      ) : nf();
  function us() {
    return Wo === 0 && (Wo = gt()), Wo;
  function wh(n) {
    return n == null || typeof n == "symbol" || typeof n == "boolean" ? null : typeof n == "function" ? n : sr("" + n);
  function lf(n, i) {
    var c = i.ownerDocument.createElement("input");
    return c.name = i.name, c.value = i.value, n.id && c.setAttribute("form", n.id), i.parentNode.insertBefore(c, i), n = new FormData(n), c.parentNode.removeChild(c), n;
  function Q0(n, i, c, d, p) {
    if (i === "submit" && c && c.stateNode === p) {
      var v = wh(
        (p[sa] || null).action
      ), O = d.submitter;
      O && (i = (i = O[sa] || null) ? wh(i.formAction) : O.getAttribute("formAction"), i !== null && (v = i, O = null));
      var R = new dd(
        d,
        p
        event: R,
              if (d.defaultPrevented) {
                if (Wo !== 0) {
                  var U = O ? lf(p, O) : new FormData(p);
                  Pd(
                      data: U,
                      method: p.method,
                      action: v
                    U
                typeof v == "function" && (R.preventDefault(), U = O ? lf(p, O) : new FormData(p), Pd(
                    data: U,
                    method: p.method,
                    action: v
                  v,
                  U
            currentTarget: p
  for (var ln = 0; ln < qs.length; ln++) {
    var of = qs[ln], Bv = of.toLowerCase(), le = of[0].toUpperCase() + of.slice(1);
    ll(
      Bv,
      "on" + le
  ll(m0, "onAnimationEnd"), ll(ng, "onAnimationIteration"), ll(g0, "onAnimationStart"), ll("dblclick", "onDoubleClick"), ll("focusin", "onFocus"), ll("focusout", "onBlur"), ll(ag, "onTransitionRun"), ll(Td, "onTransitionStart"), ll(p0, "onTransitionCancel"), ll(lg, "onTransitionEnd"), _o("onMouseEnter", ["mouseout", "mouseover"]), _o("onMouseLeave", ["mouseout", "mouseover"]), _o("onPointerEnter", ["pointerout", "pointerover"]), _o("onPointerLeave", ["pointerout", "pointerover"]), To(
  ), To(
  ), To("onBeforeInput", [
  ]), To(
  ), To(
  ), To(
  var uf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  ), Fo = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(uf)
  function ss(n, i) {
    i = (i & 4) !== 0;
      var d = n[c], p = d.event;
      d = d.listeners;
        var v = void 0;
        if (i)
          for (var O = d.length - 1; 0 <= O; O--) {
            var R = d[O], U = R.instance, K = R.currentTarget;
            if (R = R.listener, U !== v && p.isPropagationStopped())
            v = R, p.currentTarget = K;
              v(p);
            } catch (ot) {
              Gr(ot);
            p.currentTarget = null, v = U;
          for (O = 0; O < d.length; O++) {
            if (R = d[O], U = R.instance, K = R.currentTarget, R = R.listener, U !== v && p.isPropagationStopped())
            v = R, p.currentTarget = K;
              v(p);
            } catch (ot) {
              Gr(ot);
            p.currentTarget = null, v = U;
  function Pt(n, i) {
    var c = i[ed];
    c === void 0 && (c = i[ed] = /* @__PURE__ */ new Set());
    var d = n + "__bubble";
    c.has(d) || (zh(i, n, 2, !1), c.add(d));
  function Sc(n, i, c) {
    var d = 0;
    i && (d |= 4), zh(
      d,
      i
  var Tc = "_reactListening" + Math.random().toString(36).slice(2);
  function bp(n) {
    if (!n[Tc]) {
      n[Tc] = !0, ar.forEach(function(c) {
        c !== "selectionchange" && (Fo.has(c) || Sc(c, !1, n), Sc(c, !0, n));
      var i = n.nodeType === 9 ? n : n.ownerDocument;
      i === null || i[Tc] || (i[Tc] = !0, Sc("selectionchange", !1, i));
  function zh(n, i, c, d) {
    switch (Hp(i)) {
        var p = tb;
        p = eb;
        p = zp;
    c = p.bind(
      i,
    ), p = void 0, !cd || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (p = !0), d ? p !== void 0 ? n.addEventListener(i, c, {
      passive: p
    }) : n.addEventListener(i, c, !0) : p !== void 0 ? n.addEventListener(i, c, {
      passive: p
    }) : n.addEventListener(i, c, !1);
  }
  function gl(n, i, c, d, p) {
    var v = d;
    if ((i & 1) === 0 && (i & 2) === 0 && d !== null)
        if (d === null) return;
        var O = d.tag;
        if (O === 3 || O === 4) {
          var R = d.stateNode.containerInfo;
          if (R === p) break;
          if (O === 4)
            for (O = d.return; O !== null; ) {
              var U = O.tag;
              if ((U === 3 || U === 4) && O.stateNode.containerInfo === p)
              O = O.return;
          for (; R !== null; ) {
            if (O = qn(R), O === null) return;
            if (U = O.tag, U === 5 || U === 6 || U === 26 || U === 27) {
              d = v = O;
            R = R.parentNode;
        d = d.return;
    Ls(function() {
      var K = v, ot = sd(c), ct = [];
        var W = ig.get(n);
        if (W !== void 0) {
          var P = dd, kt = n;
              if (Vn(c) === 0) break t;
              P = Ml;
              kt = "focus", P = jm;
              kt = "blur", P = jm;
              P = jm;
              P = Ym;
              P = i0;
              P = Gm;
            case m0:
            case ng:
            case g0:
              P = Rv;
            case lg:
              P = r0;
              P = a0;
              P = zu;
              P = fr;
              P = dr;
              P = f0;
          }
          var Bt = (i & 4) !== 0, xe = !Bt && (n === "scroll" || n === "scrollend"), X = Bt ? W !== null ? W + "Capture" : null : W;
          Bt = [];
          for (var j = K, Z; j !== null; ) {
            var st = j;
            if (Z = st.stateNode, st = st.tag, st !== 5 && st !== 26 && st !== 27 || Z === null || X === null || (st = Du(j, X), st != null && Bt.push(
              lo(j, st, Z)
            )), xe) break;
            j = j.return;
          }
          0 < Bt.length && (W = new P(
            W,
            kt,
            ot
          ), ct.push({ event: W, listeners: Bt }));
      if ((i & 7) === 0) {
          if (W = n === "mouseover" || n === "pointerover", P = n === "mouseout" || n === "pointerout", W && c !== Mu && (kt = c.relatedTarget || c.fromElement) && (qn(kt) || kt[Hs]))
          if ((P || W) && (W = ot.window === ot ? ot : (W = ot.ownerDocument) ? W.defaultView || W.parentWindow : window, P ? (kt = c.relatedTarget || c.toElement, P = K, kt = kt ? qn(kt) : null, kt !== null && (xe = m(kt), Bt = kt.tag, kt !== xe || Bt !== 5 && Bt !== 27 && Bt !== 6) && (kt = null)) : (P = null, kt = K), P !== kt)) {
            if (Bt = Ym, st = "onMouseLeave", X = "onMouseEnter", j = "mouse", (n === "pointerout" || n === "pointerover") && (Bt = dr, st = "onPointerLeave", X = "onPointerEnter", j = "pointer"), xe = P == null ? W : nr(P), Z = kt == null ? W : nr(kt), W = new Bt(
              j + "leave",
              P,
              ot
            ), W.target = xe, W.relatedTarget = Z, st = null, qn(ot) === K && (Bt = new Bt(
              X,
              j + "enter",
              kt,
              ot
            ), Bt.target = Z, Bt.relatedTarget = xe, st = Bt), xe = st, P && kt)
                for (Bt = P, X = kt, j = 0, Z = Bt; Z; Z = Po(Z))
                  j++;
                for (Z = 0, st = X; st; st = Po(st))
                  Z++;
                for (; 0 < j - Z; )
                  Bt = Po(Bt), j--;
                for (; 0 < Z - j; )
                  X = Po(X), Z--;
                for (; j--; ) {
                  if (Bt === X || X !== null && Bt === X.alternate)
                  Bt = Po(Bt), X = Po(X);
                Bt = null;
            else Bt = null;
            P !== null && sf(
              ct,
              W,
              P,
              Bt,
            ), kt !== null && xe !== null && sf(
              ct,
              xe,
              kt,
              Bt,
          if (W = K ? nr(K) : window, P = W.nodeName && W.nodeName.toLowerCase(), P === "select" || P === "input" && W.type === "file")
            var At = Jm;
          else if (yd(W))
            if (Wm)
              At = Im;
              At = Ao;
              var oe = vd;
            P = W.nodeName, !P || P.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? K && Ou(K.elementType) && (At = Jm) : At = Gi;
          if (At && (At = At(n, K))) {
            bd(
              ct,
              At,
              ot
          oe && oe(n, W, K), n === "focusout" && K && W.type === "number" && K.memoizedProps.value != null && or(W, "number", W.value);
        switch (oe = K ? nr(K) : window, n) {
            (yd(oe) || oe.contentEditable === "true") && (Fl = oe, Rl = K, zo = null);
            zo = Rl = Fl = null;
            ku = !0;
            ku = !1, Sd(ct, c, ot);
            if (Nu) break;
            Sd(ct, c, ot);
        var Nt;
        if (hr)
                var qt = "onCompositionStart";
                qt = "onCompositionEnd";
                qt = "onCompositionUpdate";
            qt = void 0;
          Do ? gr(n, c) && (qt = "onCompositionEnd") : n === "keydown" && c.keyCode === 229 && (qt = "onCompositionStart");
        qt && (Jl && c.locale !== "ko" && (Do || qt !== "onCompositionStart" ? qt === "onCompositionEnd" && Do && (Nt = Bm()) : (qi = ot, Ys = "value" in qi ? qi.value : qi.textContent, Do = !0)), oe = _c(K, qt), 0 < oe.length && (qt = new qm(
          qt,
          ot
        ), ct.push({ event: qt, listeners: oe }), Nt ? qt.data = Nt : (Nt = Mo(c), Nt !== null && (qt.data = Nt)))), (Nt = Qm ? Km(n, c) : Cu(n, c)) && (qt = _c(K, "onBeforeInput"), 0 < qt.length && (oe = new qm(
          ot
        ), ct.push({
          event: oe,
          listeners: qt
        }), oe.data = Nt)), Q0(
          ct,
          K,
          ot
      ss(ct, i);
  function lo(n, i, c) {
      listener: i,
  function _c(n, i) {
    for (var c = i + "Capture", d = []; n !== null; ) {
      var p = n, v = p.stateNode;
      if (p = p.tag, p !== 5 && p !== 26 && p !== 27 || v === null || (p = Du(n, c), p != null && d.unshift(
        lo(n, p, v)
      ), p = Du(n, i), p != null && d.push(
        lo(n, p, v)
      )), n.tag === 3) return d;
  function Po(n) {
  function sf(n, i, c, d, p) {
    for (var v = i._reactName, O = []; c !== null && c !== d; ) {
      var R = c, U = R.alternate, K = R.stateNode;
      if (R = R.tag, U !== null && U === d) break;
      R !== 5 && R !== 26 && R !== 27 || K === null || (U = K, p ? (K = Du(c, v), K != null && O.unshift(
        lo(c, K, U)
      )) : p || (K = Du(c, v), K != null && O.push(
        lo(c, K, U)
    O.length !== 0 && n.push({ event: i, listeners: O });
  var $a = /\r\n?/g, vp = /\u0000|\uFFFD/g;
  function Z0(n) {
    return (typeof n == "string" ? n : "" + n).replace($a, `
`).replace(vp, "");
  function Sp(n, i) {
    return i = Z0(i), Z0(n) === i;
  function Ch() {
  function Kt(n, i, c, d, p, v) {
        typeof d == "string" ? i === "body" || i === "textarea" && d === "" || Ns(n, d) : (typeof d == "number" || typeof d == "bigint") && i !== "body" && Ns(n, "" + d);
        lr(n, "class", d);
        lr(n, "tabindex", d);
        lr(n, c, d);
        ur(n, d, v);
        if (i !== "object") {
          lr(n, "data", d);
        if (d === "" && (i !== "a" || c !== "href")) {
        if (d == null || typeof d == "function" || typeof d == "symbol" || typeof d == "boolean") {
        d = sr("" + d), n.setAttribute(c, d);
        if (typeof d == "function") {
          typeof v == "function" && (c === "formAction" ? (i !== "input" && Kt(n, i, "name", p.name, p, null), Kt(
            i,
            p.formEncType,
            p,
          ), Kt(
            i,
            p.formMethod,
            p,
          ), Kt(
            i,
            p.formTarget,
            p,
          )) : (Kt(n, i, "encType", p.encType, p, null), Kt(n, i, "method", p.method, p, null), Kt(n, i, "target", p.target, p, null)));
        if (d == null || typeof d == "symbol" || typeof d == "boolean") {
        d = sr("" + d), n.setAttribute(c, d);
        d != null && (n.onclick = Ch);
        d != null && Pt("scroll", n);
        d != null && Pt("scrollend", n);
        if (d != null) {
          if (typeof d != "object" || !("__html" in d))
            throw Error(s(61));
          if (c = d.__html, c != null) {
            if (p.children != null) throw Error(s(60));
        n.multiple = d && typeof d != "function" && typeof d != "symbol";
        n.muted = d && typeof d != "function" && typeof d != "symbol";
        if (d == null || typeof d == "function" || typeof d == "boolean" || typeof d == "symbol") {
        c = sr("" + d), n.setAttributeNS(
        d != null && typeof d != "function" && typeof d != "symbol" ? n.setAttribute(c, "" + d) : n.removeAttribute(c);
        d && typeof d != "function" && typeof d != "symbol" ? n.setAttribute(c, "") : n.removeAttribute(c);
        d === !0 ? n.setAttribute(c, "") : d !== !1 && d != null && typeof d != "function" && typeof d != "symbol" ? n.setAttribute(c, d) : n.removeAttribute(c);
        d != null && typeof d != "function" && typeof d != "symbol" && !isNaN(d) && 1 <= d ? n.setAttribute(c, d) : n.removeAttribute(c);
        d == null || typeof d == "function" || typeof d == "symbol" || isNaN(d) ? n.removeAttribute(c) : n.setAttribute(c, d);
        Pt("beforetoggle", n), Pt("toggle", n), Yi(n, "popover", d);
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Kl(
          d
        Yi(n, "is", d);
        (!(2 < c.length) || c[0] !== "o" && c[0] !== "O" || c[1] !== "n" && c[1] !== "N") && (c = Mv.get(c) || c, Yi(n, c, d));
  function I(n, i, c, d, p, v) {
        ur(n, d, v);
        if (d != null) {
          if (typeof d != "object" || !("__html" in d))
            throw Error(s(61));
          if (c = d.__html, c != null) {
            if (p.children != null) throw Error(s(60));
        typeof d == "string" ? Ns(n, d) : (typeof d == "number" || typeof d == "bigint") && Ns(n, "" + d);
        d != null && Pt("scroll", n);
        d != null && Pt("scrollend", n);
        d != null && (n.onclick = Ch);
        if (!ja.hasOwnProperty(c))
            if (c[0] === "o" && c[1] === "n" && (p = c.endsWith("Capture"), i = c.slice(2, p ? c.length - 7 : void 0), v = n[sa] || null, v = v != null ? v[c] : null, typeof v == "function" && n.removeEventListener(i, v, p), typeof d == "function")) {
              typeof v != "function" && v !== null && (c in n ? n[c] = null : n.hasAttribute(c) && n.removeAttribute(c)), n.addEventListener(i, d, p);
            c in n ? n[c] = d : d === !0 ? n.setAttribute(c, "") : Yi(n, c, d);
  function Gt(n, i, c) {
    switch (i) {
        Pt("error", n), Pt("load", n);
        var d = !1, p = !1, v;
        for (v in c)
          if (c.hasOwnProperty(v)) {
            var O = c[v];
            if (O != null)
              switch (v) {
                  d = !0;
                  p = !0;
                  throw Error(s(137, i));
                  Kt(n, i, v, O, c, null);
        p && Kt(n, i, "srcSet", c.srcSet, c, null), d && Kt(n, i, "src", c.src, c, null);
        Pt("invalid", n);
        var R = v = O = p = null, U = null, K = null;
        for (d in c)
          if (c.hasOwnProperty(d)) {
            var ot = c[d];
            if (ot != null)
              switch (d) {
                  p = ot;
                  O = ot;
                  U = ot;
                  K = ot;
                  v = ot;
                  R = ot;
                  if (ot != null)
                    throw Error(s(137, i));
                  Kt(n, i, d, ot, c, null);
        od(
          v,
          U,
          K,
          O,
          p,
        ), Eo(n);
        Pt("invalid", n), d = O = v = null;
        for (p in c)
          if (c.hasOwnProperty(p) && (R = c[p], R != null))
            switch (p) {
                v = R;
                O = R;
                d = R;
                Kt(n, i, p, R, c, null);
        i = v, c = O, n.multiple = !!d, i != null ? Eu(n, !!d, i, !1) : c != null && Eu(n, !!d, c, !0);
        Pt("invalid", n), v = p = d = null;
        for (O in c)
          if (c.hasOwnProperty(O) && (R = c[O], R != null))
            switch (O) {
                d = R;
                p = R;
                v = R;
                if (R != null) throw Error(s(91));
                Kt(n, i, O, R, c, null);
        Nm(n, d, p, v), Eo(n);
        for (U in c)
          if (c.hasOwnProperty(U) && (d = c[U], d != null))
            switch (U) {
                n.selected = d && typeof d != "function" && typeof d != "symbol";
                Kt(n, i, U, d, c, null);
        Pt("beforetoggle", n), Pt("toggle", n), Pt("cancel", n), Pt("close", n);
        Pt("load", n);
        for (d = 0; d < uf.length; d++)
          Pt(uf[d], n);
        Pt("error", n), Pt("load", n);
        Pt("toggle", n);
        Pt("error", n), Pt("load", n);
        for (K in c)
          if (c.hasOwnProperty(K) && (d = c[K], d != null))
            switch (K) {
                throw Error(s(137, i));
                Kt(n, i, K, d, c, null);
        if (Ou(i)) {
          for (ot in c)
            c.hasOwnProperty(ot) && (d = c[ot], d !== void 0 && I(
              i,
              ot,
              d,
    for (R in c)
      c.hasOwnProperty(R) && (d = c[R], d != null && Kt(n, i, R, d, c, null));
  function Lv(n, i, c, d) {
    switch (i) {
        var p = null, v = null, O = null, R = null, U = null, K = null, ot = null;
        for (P in c) {
          var ct = c[P];
          if (c.hasOwnProperty(P) && ct != null)
            switch (P) {
                U = ct;
                d.hasOwnProperty(P) || Kt(n, i, P, null, d, ct);
        for (var W in d) {
          var P = d[W];
          if (ct = c[W], d.hasOwnProperty(W) && (P != null || ct != null))
            switch (W) {
                v = P;
                p = P;
                K = P;
                ot = P;
                O = P;
                R = P;
                if (P != null)
                  throw Error(s(137, i));
                P !== ct && Kt(
                  i,
                  W,
                  P,
                  d,
                  ct
        id(
          O,
          K,
          ot,
          v,
          p
        P = O = R = W = null;
        for (v in c)
          if (U = c[v], c.hasOwnProperty(v) && U != null)
            switch (v) {
                P = U;
                d.hasOwnProperty(v) || Kt(
                  i,
                  v,
                  d,
                  U
        for (p in d)
          if (v = d[p], U = c[p], d.hasOwnProperty(p) && (v != null || U != null))
            switch (p) {
                W = v;
                R = v;
                O = v;
                v !== U && Kt(
                  i,
                  p,
                  v,
                  d,
                  U
        i = R, c = O, d = P, W != null ? Eu(n, !!c, W, !1) : !!d != !!c && (i != null ? Eu(n, !!c, i, !0) : Eu(n, !!c, c ? [] : "", !1));
        P = W = null;
        for (R in c)
          if (p = c[R], c.hasOwnProperty(R) && p != null && !d.hasOwnProperty(R))
            switch (R) {
                Kt(n, i, R, null, d, p);
        for (O in d)
          if (p = d[O], v = c[O], d.hasOwnProperty(O) && (p != null || v != null))
            switch (O) {
                W = p;
                P = p;
                if (p != null) throw Error(s(91));
                p !== v && Kt(n, i, O, p, d, v);
        Um(n, W, P);
        for (var kt in c)
          if (W = c[kt], c.hasOwnProperty(kt) && W != null && !d.hasOwnProperty(kt))
            switch (kt) {
                Kt(
                  i,
                  kt,
                  d,
                  W
        for (U in d)
          if (W = d[U], P = c[U], d.hasOwnProperty(U) && W !== P && (W != null || P != null))
            switch (U) {
                n.selected = W && typeof W != "function" && typeof W != "symbol";
                Kt(
                  i,
                  U,
                  W,
                  d,
                  P
        for (var Bt in c)
          W = c[Bt], c.hasOwnProperty(Bt) && W != null && !d.hasOwnProperty(Bt) && Kt(n, i, Bt, null, d, W);
        for (K in d)
          if (W = d[K], P = c[K], d.hasOwnProperty(K) && W !== P && (W != null || P != null))
            switch (K) {
                if (W != null)
                  throw Error(s(137, i));
                Kt(
                  i,
                  K,
                  W,
                  d,
                  P
        if (Ou(i)) {
          for (var xe in c)
            W = c[xe], c.hasOwnProperty(xe) && W !== void 0 && !d.hasOwnProperty(xe) && I(
              i,
              xe,
              d,
              W
          for (ot in d)
            W = d[ot], P = c[ot], !d.hasOwnProperty(ot) || W === P || W === void 0 && P === void 0 || I(
              i,
              W,
              d,
              P
    for (var X in c)
      W = c[X], c.hasOwnProperty(X) && W != null && !d.hasOwnProperty(X) && Kt(n, i, X, null, d, W);
    for (ct in d)
      W = d[ct], P = c[ct], !d.hasOwnProperty(ct) || W === P || W == null && P == null || Kt(n, i, ct, W, d, P);
  var cf = null, rf = null;
  function pl(n) {
  function io(n) {
  function xc(n, i) {
      switch (i) {
    return n === 1 && i === "foreignObject" ? 0 : n;
  function Ti(n, i) {
    return n === "textarea" || n === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  var Ec = null;
  function oo() {
    return n && n.type === "popstate" ? n === Ec ? !1 : (Ec = n, !0) : (Ec = null, !1);
  var Hh = typeof setTimeout == "function" ? setTimeout : void 0, Yv = typeof clearTimeout == "function" ? clearTimeout : void 0, K0 = typeof Promise == "function" ? Promise : void 0, jv = typeof queueMicrotask == "function" ? queueMicrotask : typeof K0 < "u" ? function(n) {
    return K0.resolve(null).then(n).catch(_i);
  } : Hh;
  function _i(n) {
  function Io(n) {
  function Uh(n, i) {
    var c = i, d = 0, p = 0;
      var v = c.nextSibling;
      if (n.removeChild(c), v && v.nodeType === 8)
        if (c = v.data, c === "/$") {
          if (0 < d && 8 > d) {
            c = d;
            var O = n.ownerDocument;
            if (c & 1 && Ca(O.documentElement), c & 2 && Ca(O.body), c & 4)
              for (c = O.head, Ca(c), O = c.firstChild; O; ) {
                var R = O.nextSibling, U = O.nodeName;
                O[Rt] || U === "SCRIPT" || U === "STYLE" || U === "LINK" && O.rel.toLowerCase() === "stylesheet" || c.removeChild(O), O = R;
          if (p === 0) {
            n.removeChild(v), Ei(i);
          p--;
          c === "$" || c === "$?" || c === "$!" ? p++ : d = c.charCodeAt(0) - 48;
      else d = 0;
      c = v;
    Ei(i);
  function ff(n) {
    var i = n.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var c = i;
      switch (i = i.nextSibling, c.nodeName) {
          ff(c), er(c);
  function Oc(n, i, c, d) {
      var p = c;
      if (n.nodeName.toLowerCase() !== i.toLowerCase()) {
        if (!d && (n.nodeName !== "INPUT" || n.type !== "hidden"))
      } else if (d) {
        if (!n[Rt])
          switch (i) {
              if (v = n.getAttribute("rel"), v === "stylesheet" && n.hasAttribute("data-precedence"))
              if (v !== p.rel || n.getAttribute("href") !== (p.href == null || p.href === "" ? null : p.href) || n.getAttribute("crossorigin") !== (p.crossOrigin == null ? null : p.crossOrigin) || n.getAttribute("title") !== (p.title == null ? null : p.title))
              if (v = n.getAttribute("src"), (v !== (p.src == null ? null : p.src) || n.getAttribute("type") !== (p.type == null ? null : p.type) || n.getAttribute("crossorigin") !== (p.crossOrigin == null ? null : p.crossOrigin)) && v && n.hasAttribute("async") && !n.hasAttribute("itemprop"))
      } else if (i === "input" && n.type === "hidden") {
        var v = p.name == null ? null : "" + p.name;
        if (p.type === "hidden" && n.getAttribute("name") === v)
      if (n = Yl(n.nextSibling), n === null) break;
  function qv(n, i, c) {
    if (i === "") return null;
      if ((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !c || (n = Yl(n.nextSibling), n === null)) return null;
  function df(n) {
  function Vv(n, i) {
      i();
      var d = function() {
        i(), c.removeEventListener("DOMContentLoaded", d);
      c.addEventListener("DOMContentLoaded", d), n._reactRetry = d;
  function Yl(n) {
      var i = n.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = n.data, i === "$" || i === "$!" || i === "$?" || i === "F!" || i === "F")
        if (i === "/$") return null;
  var tu = null;
  function $n(n) {
    for (var i = 0; n; ) {
          if (i === 0) return n;
          i--;
        } else c === "/$" && i++;
  function Et(n, i, c) {
    switch (i = pl(c), n) {
        if (n = i.documentElement, !n) throw Error(s(452));
        if (n = i.head, !n) throw Error(s(453));
        if (n = i.body, !n) throw Error(s(454));
        throw Error(s(451));
  function Ca(n) {
    for (var i = n.attributes; i.length; )
      n.removeAttributeNode(i[0]);
    er(n);
  var on = /* @__PURE__ */ new Map(), aa = /* @__PURE__ */ new Set();
  function Nh(n) {
  var uo = nt.d;
  nt.d = {
    f: kh,
    r: Bh,
    D: so,
    C: Lh,
    L: eu,
    m: la,
    X: nu,
    S: Ha,
    M: Tp
  function kh() {
    var n = uo.f(), i = ls();
    return n || i;
  }
  function Bh(n) {
    var i = Su(n);
    i !== null && i.tag === 5 && i.type === "form" ? ac(i) : uo.r(n);
  }
  var Jn = typeof document > "u" ? null : document;
  function jl(n, i, c) {
    var d = Jn;
    if (d && typeof i == "string" && i) {
      var p = nl(i);
      p = 'link[rel="' + n + '"][href="' + p + '"]', typeof c == "string" && (p += '[crossorigin="' + c + '"]'), aa.has(p) || (aa.add(p), n = { rel: n, crossOrigin: c, href: i }, d.querySelector(p) === null && (i = d.createElement("link"), Gt(i, "link", n), bn(i), d.head.appendChild(i)));
    }
  }
  function so(n) {
    uo.D(n), jl("dns-prefetch", n, null);
  }
  function Lh(n, i) {
    uo.C(n, i), jl("preconnect", n, i);
  }
  function eu(n, i, c) {
    uo.L(n, i, c);
    var d = Jn;
    if (d && n && i) {
      var p = 'link[rel="preload"][as="' + nl(i) + '"]';
      i === "image" && c && c.imageSrcSet ? (p += '[imagesrcset="' + nl(
      ) + '"]', typeof c.imageSizes == "string" && (p += '[imagesizes="' + nl(
      ) + '"]')) : p += '[href="' + nl(n) + '"]';
      var v = p;
      switch (i) {
          v = Mc(n);
          v = yl(n);
      on.has(v) || (n = E(
          href: i === "image" && c && c.imageSrcSet ? void 0 : n,
          as: i
      ), on.set(v, n), d.querySelector(p) !== null || i === "style" && d.querySelector(Dc(v)) || i === "script" && d.querySelector(cs(v)) || (i = d.createElement("link"), Gt(i, "link", n), bn(i), d.head.appendChild(i)));
  function la(n, i) {
    uo.m(n, i);
    var c = Jn;
      var d = i && typeof i.as == "string" ? i.as : "script", p = 'link[rel="modulepreload"][as="' + nl(d) + '"][href="' + nl(n) + '"]', v = p;
      switch (d) {
          v = yl(n);
      if (!on.has(v) && (n = E({ rel: "modulepreload", href: n }, i), on.set(v, n), c.querySelector(p) === null)) {
        switch (d) {
            if (c.querySelector(cs(v)))
        d = c.createElement("link"), Gt(d, "link", n), bn(d), c.head.appendChild(d);
  function Ha(n, i, c) {
    uo.S(n, i, c);
    var d = Jn;
    if (d && n) {
      var p = Li(d).hoistableStyles, v = Mc(n);
      i = i || "default";
      var O = p.get(v);
      if (!O) {
        var R = { loading: 0, preload: null };
        if (O = d.querySelector(
          Dc(v)
          R.loading = 5;
          n = E(
            { rel: "stylesheet", href: n, "data-precedence": i },
          ), (c = on.get(v)) && jh(n, c);
          var U = O = d.createElement("link");
          bn(U), Gt(U, "link", n), U._p = new Promise(function(K, ot) {
            U.onload = K, U.onerror = ot;
          }), U.addEventListener("load", function() {
            R.loading |= 1;
          }), U.addEventListener("error", function() {
            R.loading |= 2;
          }), R.loading |= 4, Yh(O, i, d);
        }
        O = {
          instance: O,
          state: R
        }, p.set(v, O);
  function nu(n, i) {
    uo.X(n, i);
    var c = Jn;
      var d = Li(c).hoistableScripts, p = yl(n), v = d.get(p);
      v || (v = c.querySelector(cs(p)), v || (n = E({ src: n, async: !0 }, i), (i = on.get(p)) && qh(n, i), v = c.createElement("script"), bn(v), Gt(v, "link", n), c.head.appendChild(v)), v = {
        instance: v,
      }, d.set(p, v));
  function Tp(n, i) {
    uo.M(n, i);
    var c = Jn;
      var d = Li(c).hoistableScripts, p = yl(n), v = d.get(p);
      v || (v = c.querySelector(cs(p)), v || (n = E({ src: n, async: !0, type: "module" }, i), (i = on.get(p)) && qh(n, i), v = c.createElement("script"), bn(v), Gt(v, "link", n), c.head.appendChild(v)), v = {
        instance: v,
      }, d.set(p, v));
  function $0(n, i, c, d) {
    var p = (p = vt.current) ? Nh(p) : null;
    if (!p) throw Error(s(446));
        return typeof c.precedence == "string" && typeof c.href == "string" ? (i = Mc(c.href), c = Li(
          p
        ).hoistableStyles, d = c.get(i), d || (d = {
        }, c.set(i, d)), d) : { type: "void", instance: null, count: 0, state: null };
          n = Mc(c.href);
          var v = Li(
            p
          ).hoistableStyles, O = v.get(n);
          if (O || (p = p.ownerDocument || p, O = {
          }, v.set(n, O), (v = p.querySelector(
            Dc(n)
          )) && !v._p && (O.instance = v, O.state.loading = 5), on.has(n) || (c = {
          }, on.set(n, c), v || J0(
            p,
            O.state
          ))), i && d === null)
            throw Error(s(528, ""));
          return O;
        if (i && d !== null)
          throw Error(s(529, ""));
        return i = c.async, c = c.src, typeof c == "string" && i && typeof i != "function" && typeof i != "symbol" ? (i = yl(c), c = Li(
          p
        ).hoistableScripts, d = c.get(i), d || (d = {
        }, c.set(i, d)), d) : { type: "void", instance: null, count: 0, state: null };
        throw Error(s(444, n));
  function Mc(n) {
    return 'href="' + nl(n) + '"';
  function Dc(n) {
  function Ac(n) {
    return E({}, n, {
  function J0(n, i, c, d) {
    n.querySelector('link[rel="preload"][as="style"][' + i + "]") ? d.loading = 1 : (i = n.createElement("link"), d.preload = i, i.addEventListener("load", function() {
      return d.loading |= 1;
    }), i.addEventListener("error", function() {
      return d.loading |= 2;
    }), Gt(i, "link", c), bn(i), n.head.appendChild(i));
  function yl(n) {
    return '[src="' + nl(n) + '"]';
  function cs(n) {
  function W0(n, i, c) {
    if (i.count++, i.instance === null)
      switch (i.type) {
          var d = n.querySelector(
            'style[data-href~="' + nl(c.href) + '"]'
          if (d)
            return i.instance = d, bn(d), d;
          var p = E({}, c, {
          return d = (n.ownerDocument || n).createElement(
          ), bn(d), Gt(d, "style", p), Yh(d, c.precedence, n), i.instance = d;
          p = Mc(c.href);
          var v = n.querySelector(
            Dc(p)
          if (v)
            return i.state.loading |= 4, i.instance = v, bn(v), v;
          d = Ac(c), (p = on.get(p)) && jh(d, p), v = (n.ownerDocument || n).createElement("link"), bn(v);
          var O = v;
          return O._p = new Promise(function(R, U) {
            O.onload = R, O.onerror = U;
          }), Gt(v, "link", d), i.state.loading |= 4, Yh(v, c.precedence, n), i.instance = v;
          return v = yl(c.src), (p = n.querySelector(
            cs(v)
          )) ? (i.instance = p, bn(p), p) : (d = c, (p = on.get(v)) && (d = E({}, c), qh(d, p)), n = n.ownerDocument || n, p = n.createElement("script"), bn(p), Gt(p, "link", d), n.head.appendChild(p), i.instance = p);
          throw Error(s(443, i.type));
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (d = i.instance, i.state.loading |= 4, Yh(d, c.precedence, n));
    return i.instance;
  function Yh(n, i, c) {
    for (var d = c.querySelectorAll(
    ), p = d.length ? d[d.length - 1] : null, v = p, O = 0; O < d.length; O++) {
      var R = d[O];
      if (R.dataset.precedence === i) v = R;
      else if (v !== p) break;
    v ? v.parentNode.insertBefore(n, v.nextSibling) : (i = c.nodeType === 9 ? c.head : c, i.insertBefore(n, i.firstChild));
  function jh(n, i) {
    n.crossOrigin == null && (n.crossOrigin = i.crossOrigin), n.referrerPolicy == null && (n.referrerPolicy = i.referrerPolicy), n.title == null && (n.title = i.title);
  function qh(n, i) {
    n.crossOrigin == null && (n.crossOrigin = i.crossOrigin), n.referrerPolicy == null && (n.referrerPolicy = i.referrerPolicy), n.integrity == null && (n.integrity = i.integrity);
  var au = null;
  function _p(n, i, c) {
    if (au === null) {
      var d = /* @__PURE__ */ new Map(), p = au = /* @__PURE__ */ new Map();
      p.set(c, d);
      p = au, d = p.get(c), d || (d = /* @__PURE__ */ new Map(), p.set(c, d));
    if (d.has(n)) return d;
    for (d.set(n, null), c = c.getElementsByTagName(n), p = 0; p < c.length; p++) {
      var v = c[p];
      if (!(v[Rt] || v[Rn] || n === "link" && v.getAttribute("rel") === "stylesheet") && v.namespaceURI !== "http://www.w3.org/2000/svg") {
        var O = v.getAttribute(i) || "";
        O = n + O;
        var R = d.get(O);
        R ? R.push(v) : d.set(O, [v]);
    return d;
  function xp(n, i, c) {
      i === "title" ? n.querySelector("head > title") : null
  function F0(n, i, c) {
    if (c === 1 || i.itemProp != null) return !1;
        if (typeof i.precedence != "string" || typeof i.href != "string" || i.href === "")
        if (typeof i.rel != "string" || typeof i.href != "string" || i.href === "" || i.onLoad || i.onError)
        switch (i.rel) {
            return n = i.disabled, typeof i.precedence == "string" && n == null;
        if (i.async && typeof i.async != "function" && typeof i.async != "symbol" && !i.onLoad && !i.onError && i.src && typeof i.src == "string")
  function Ep(n) {
  var Rc = null;
  function P0() {
  function I0(n, i, c) {
    if (Rc === null) throw Error(s(475));
    var d = Rc;
    if (i.type === "stylesheet" && (typeof c.media != "string" || matchMedia(c.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var p = Mc(c.href), v = n.querySelector(
          Dc(p)
        if (v) {
          n = v._p, n !== null && typeof n == "object" && typeof n.then == "function" && (d.count++, d = hf.bind(d), n.then(d, d)), i.state.loading |= 4, i.instance = v, bn(v);
        v = n.ownerDocument || n, c = Ac(c), (p = on.get(p)) && jh(c, p), v = v.createElement("link"), bn(v);
        var O = v;
        O._p = new Promise(function(R, U) {
          O.onload = R, O.onerror = U;
        }), Gt(v, "link", c), i.instance = v;
      d.stylesheets === null && (d.stylesheets = /* @__PURE__ */ new Map()), d.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (d.count++, i = hf.bind(d), n.addEventListener("load", i), n.addEventListener("error", i));
  function Op() {
    if (Rc === null) throw Error(s(475));
    var n = Rc;
    return n.stylesheets && n.count === 0 && mf(n, n.stylesheets), 0 < n.count ? function(i) {
        if (n.stylesheets && mf(n, n.stylesheets), n.unsuspend) {
          var d = n.unsuspend;
          n.unsuspend = null, d();
      return n.unsuspend = i, function() {
  function hf() {
      if (this.stylesheets) mf(this, this.stylesheets);
  var wc = null;
  function mf(n, i) {
    n.stylesheets = null, n.unsuspend !== null && (n.count++, wc = /* @__PURE__ */ new Map(), i.forEach(Ja, n), wc = null, hf.call(n));
  function Ja(n, i) {
    if (!(i.state.loading & 4)) {
      var c = wc.get(n);
      if (c) var d = c.get(null);
        c = /* @__PURE__ */ new Map(), wc.set(n, c);
        for (var p = n.querySelectorAll(
        ), v = 0; v < p.length; v++) {
          var O = p[v];
          (O.nodeName === "LINK" || O.getAttribute("media") !== "not all") && (c.set(O.dataset.precedence, O), d = O);
        d && c.set(null, d);
      p = i.instance, O = p.getAttribute("data-precedence"), v = c.get(O) || d, v === d && c.set(null, p), c.set(O, p), this.count++, d = hf.bind(this), p.addEventListener("load", d), p.addEventListener("error", d), v ? v.parentNode.insertBefore(p, v.nextSibling) : (n = n.nodeType === 9 ? n.head : n, n.insertBefore(p, n.firstChild)), i.state.loading |= 4;
  var Ua = {
    $$typeof: yt,
    _currentValue: ft,
    _currentValue2: ft,
  function Gv(n, i, c, d, p, v, O, R) {
    this.tag = 1, this.containerInfo = n, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ht(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ht(0), this.hiddenUpdates = Ht(null), this.identifierPrefix = d, this.onUncaughtError = p, this.onCaughtError = v, this.onRecoverableError = O, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = R, this.incompleteTransitions = /* @__PURE__ */ new Map();
  function Mp(n, i, c, d, p, v, O, R, U, K, ot, ct) {
    return n = new Gv(
      i,
      O,
      K,
      ct
    ), i = 1, v === !0 && (i |= 24), v = xa(3, null, null, i), n.current = v, v.stateNode = n, i = Ps(), i.refCount++, n.pooledCache = i, i.refCount++, v.memoizedState = {
      element: d,
      cache: i
    }, Cd(v), n;
  function Dp(n) {
    return n ? (n = Xs, n) : Xs;
  function Ap(n, i, c, d, p, v) {
    p = Dp(p), d.context === null ? d.context = p : d.pendingContext = p, d = Oa(i), d.payload = { element: c }, v = v === void 0 ? null : v, v !== null && (d.callback = v), c = oi(n, d, i), c !== null && (Ka(c, n, i), Vu(c, n, i));
  function Rp(n, i) {
      n.retryLane = c !== 0 && c < i ? c : i;
  function Vh(n, i) {
    Rp(n, i), (n = n.alternate) && Rp(n, i);
  function wp(n) {
      var i = ti(n, 67108864);
      i !== null && Ka(i, n, 67108864), Vh(n, 67108864);
  var gf = !0;
  function tb(n, i, c, d) {
    var p = L.T;
    L.T = null;
    var v = nt.p;
      nt.p = 2, zp(n, i, c, d);
      nt.p = v, L.T = p;
  function eb(n, i, c, d) {
    var p = L.T;
    L.T = null;
    var v = nt.p;
      nt.p = 8, zp(n, i, c, d);
      nt.p = v, L.T = p;
  function zp(n, i, c, d) {
    if (gf) {
      var p = Gh(d);
      if (p === null)
        gl(
          i,
          d,
          Xh,
        ), rs(n, d);
      else if (ab(
        p,
        i,
        d
        d.stopPropagation();
      else if (rs(n, d), i & 4 && -1 < nb.indexOf(n)) {
        for (; p !== null; ) {
          var v = Su(p);
          if (v !== null)
            switch (v.tag) {
                if (v = v.stateNode, v.current.memoizedState.isDehydrated) {
                  var O = jn(v.pendingLanes);
                  if (O !== 0) {
                    var R = v;
                    for (R.pendingLanes |= 2, R.entangledLanes |= 2; O; ) {
                      var U = 1 << 31 - Yn(O);
                      R.entanglements[1] |= U, O &= ~U;
                    za(v), (De & 6) === 0 && (Sh = An() + 500, ef(0));
                R = ti(v, 2), R !== null && Ka(R, v, 2), ls(), Vh(v, 2);
          if (v = Gh(d), v === null && gl(
            i,
            d,
            Xh,
          ), v === p) break;
          p = v;
        p !== null && d.stopPropagation();
        gl(
          i,
          d,
  function Gh(n) {
    return n = sd(n), Cp(n);
  var Xh = null;
  function Cp(n) {
    if (Xh = null, n = qn(n), n !== null) {
      var i = m(n);
      if (i === null) n = null;
        var c = i.tag;
          if (n = y(i), n !== null) return n;
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
        } else i !== n && (n = null);
    return Xh = n, null;
  function Hp(n) {
        switch (vo()) {
          case Pf:
          case ae:
          case Zl:
          case ws:
          case Bi:
  var zc = !1, xi = null, co = null, ro = null, pf = /* @__PURE__ */ new Map(), yf = /* @__PURE__ */ new Map(), lu = [], nb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  function rs(n, i) {
        xi = null;
        co = null;
        ro = null;
        pf.delete(i.pointerId);
        yf.delete(i.pointerId);
  function fs(n, i, c, d, p, v) {
    return n === null || n.nativeEvent !== v ? (n = {
      blockedOn: i,
      eventSystemFlags: d,
      nativeEvent: v,
      targetContainers: [p]
    }, i !== null && (i = Su(i), i !== null && wp(i)), n) : (n.eventSystemFlags |= d, i = n.targetContainers, p !== null && i.indexOf(p) === -1 && i.push(p), n);
  function ab(n, i, c, d, p) {
    switch (i) {
        return xi = fs(
          xi,
          i,
          d,
          p
        return co = fs(
          co,
          i,
          d,
          p
        return ro = fs(
          ro,
          i,
          d,
          p
        var v = p.pointerId;
        return pf.set(
          v,
          fs(
            pf.get(v) || null,
            i,
            d,
            p
        return v = p.pointerId, yf.set(
          v,
          fs(
            yf.get(v) || null,
            i,
            d,
            p
  function Up(n) {
    var i = qn(n.target);
    if (i !== null) {
      var c = m(i);
        if (i = c.tag, i === 13) {
          if (i = y(c), i !== null) {
            n.blockedOn = i, Rm(n.priority, function() {
                var d = Za();
                d = rn(d);
                var p = ti(c, d);
                p !== null && Ka(p, c, d), Vh(c, d);
        } else if (i === 3 && c.stateNode.current.memoizedState.isDehydrated) {
  function bf(n) {
    for (var i = n.targetContainers; 0 < i.length; ) {
      var c = Gh(n.nativeEvent);
        var d = new c.constructor(
        Mu = d, c.target.dispatchEvent(d), Mu = null;
        return i = Su(c), i !== null && wp(i), n.blockedOn = c, !1;
      i.shift();
  function vf(n, i, c) {
    bf(n) && c.delete(i);
  function Cc() {
    zc = !1, xi !== null && bf(xi) && (xi = null), co !== null && bf(co) && (co = null), ro !== null && bf(ro) && (ro = null), pf.forEach(vf), yf.forEach(vf);
  function Qh(n, i) {
    n.blockedOn === i && (n.blockedOn = null, zc || (zc = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      Cc
  var ds = null;
  function Np(n) {
    ds !== n && (ds = n, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
        ds === n && (ds = null);
        for (var i = 0; i < n.length; i += 3) {
          var c = n[i], d = n[i + 1], p = n[i + 2];
          if (typeof d != "function") {
            if (Cp(d || c) === null)
          var v = Su(c);
          v !== null && (n.splice(i, 3), i -= 3, Pd(
            v,
              data: p,
              action: d
            d,
            p
  function Ei(n) {
    function i(U) {
      return Qh(U, n);
    xi !== null && Qh(xi, n), co !== null && Qh(co, n), ro !== null && Qh(ro, n), pf.forEach(i), yf.forEach(i);
    for (var c = 0; c < lu.length; c++) {
      var d = lu[c];
      d.blockedOn === n && (d.blockedOn = null);
    for (; 0 < lu.length && (c = lu[0], c.blockedOn === null); )
      Up(c), c.blockedOn === null && lu.shift();
      for (d = 0; d < c.length; d += 3) {
        var p = c[d], v = c[d + 1], O = p[sa] || null;
        if (typeof v == "function")
          O || Np(c);
        else if (O) {
          var R = null;
          if (v && v.hasAttribute("formAction")) {
            if (p = v, O = v[sa] || null)
              R = O.formAction;
            else if (Cp(p) !== null) continue;
          } else R = O.action;
          typeof R == "function" ? c[d + 1] = R : (c.splice(d, 3), d -= 3), Np(c);
        }
      }
  }
  function kp(n) {
  Zh.prototype.render = kp.prototype.render = function(n) {
    var i = this._internalRoot;
    if (i === null) throw Error(s(409));
    var c = i.current, d = Za();
    Ap(c, d, n, i, null, null);
  }, Zh.prototype.unmount = kp.prototype.unmount = function() {
      var i = n.containerInfo;
      Ap(n.current, 2, null, n, null, null), ls(), i[Hs] = null;
  function Zh(n) {
  Zh.prototype.unstable_scheduleHydration = function(n) {
      var i = td();
      n = { blockedOn: null, target: n, priority: i };
      for (var c = 0; c < lu.length && i !== 0 && i < lu[c].priority; c++) ;
      lu.splice(c, 0, n), c === 0 && Up(n);
  var Bp = a.version;
  if (Bp !== "19.1.1")
      s(
        Bp,
  nt.findDOMNode = function(n) {
    var i = n._reactInternals;
    if (i === void 0)
      throw typeof n.render == "function" ? Error(s(188)) : (n = Object.keys(n).join(","), Error(s(268, n)));
    return n = S(i), n = n !== null ? _(n) : null, n = n === null ? null : n.stateNode, n;
  var ma = {
    currentDispatcherRef: L,
    var Sf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Sf.isDisabled && Sf.supportsFiber)
        So = Sf.inject(
          ma
        ), Ln = Sf;
  return Sy.createRoot = function(n, i) {
    if (!f(n)) throw Error(s(299));
    var c = !1, d = "", p = oc, v = Ug, O = Xr, R = null;
    return i != null && (i.unstable_strictMode === !0 && (c = !0), i.identifierPrefix !== void 0 && (d = i.identifierPrefix), i.onUncaughtError !== void 0 && (p = i.onUncaughtError), i.onCaughtError !== void 0 && (v = i.onCaughtError), i.onRecoverableError !== void 0 && (O = i.onRecoverableError), i.unstable_transitionCallbacks !== void 0 && (R = i.unstable_transitionCallbacks)), i = Mp(
      d,
      p,
      v,
      O,
    ), n[Hs] = i.current, bp(n), new kp(i);
  }, Sy.hydrateRoot = function(n, i, c) {
    if (!f(n)) throw Error(s(299));
    var d = !1, p = "", v = oc, O = Ug, R = Xr, U = null, K = null;
    return c != null && (c.unstable_strictMode === !0 && (d = !0), c.identifierPrefix !== void 0 && (p = c.identifierPrefix), c.onUncaughtError !== void 0 && (v = c.onUncaughtError), c.onCaughtError !== void 0 && (O = c.onCaughtError), c.onRecoverableError !== void 0 && (R = c.onRecoverableError), c.unstable_transitionCallbacks !== void 0 && (U = c.unstable_transitionCallbacks), c.formState !== void 0 && (K = c.formState)), i = Mp(
      i,
      d,
      p,
      v,
      O,
      K
    ), i.context = Dp(null), c = i.current, d = Za(), d = rn(d), p = Oa(d), p.callback = null, oi(c, p, d), c = d, i.current.lanes = c, Zt(i, c), za(i), n[Hs] = i.current, bp(n), new Zh(i);
  }, Sy.version = "19.1.1", Sy;
var Ty = {};
var $_;
function jO() {
  return $_ || ($_ = 1, process.env.NODE_ENV !== "production" && function() {
    function u(t, e) {
    function a(t, e, l, r) {
      if (l >= e.length) return r;
      var h = e[l], g = Kt(t) ? t.slice() : le({}, t);
      return g[h] = a(t[h], e, l + 1, r), g;
    function o(t, e, l) {
      if (e.length !== l.length)
        for (var r = 0; r < l.length - 1; r++)
          if (e[r] !== l[r]) {
        return s(t, e, l, 0);
    function s(t, e, l, r) {
      var h = e[r], g = Kt(t) ? t.slice() : le({}, t);
      return r + 1 === e.length ? (g[l[r]] = g[h], Kt(g) ? g.splice(h, 1) : delete g[h]) : g[h] = s(
        t[h],
        l,
        r + 1
      ), g;
    function f(t, e, l) {
      var r = e[l], h = Kt(t) ? t.slice() : le({}, t);
      return l + 1 === e.length ? (Kt(h) ? h.splice(r, 1) : delete h[r], h) : (h[r] = f(t[r], e, l + 1), h);
    function m() {
    function y() {
    function b() {
    function S() {
    function _() {
    function E() {
    function D(t) {
      return t.forEach(function(l) {
        e.push(l);
    function M(t, e, l, r) {
      return new mr(t, e, l, r);
    function H(t, e) {
      t.context === Hc && (Re(t.current, 2, e, t, null, null), Pu());
    function q(t, e) {
      if (Mi !== null) {
        var l = e.staleFamilies;
        e = e.updatedFamilies, uc(), hr(
          l
        ), Pu();
    function V(t) {
      Mi = t;
    function B(t) {
    function Q(t) {
      var e = t, l = t;
          e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      return e.tag === 3 ? l : null;
    function dt(t) {
    function yt(t) {
      if (Q(t) !== t)
    function St(t) {
        if (e = Q(t), e === null)
      for (var l = t, r = e; ; ) {
        var h = l.return;
        if (h === null) break;
        var g = h.alternate;
        if (g === null) {
          if (r = h.return, r !== null) {
            l = r;
        if (h.child === g.child) {
          for (g = h.child; g; ) {
            if (g === l) return yt(h), t;
            if (g === r) return yt(h), e;
            g = g.sibling;
        if (l.return !== r.return) l = h, r = g;
          for (var T = !1, x = h.child; x; ) {
            if (x === l) {
              T = !0, l = h, r = g;
            if (x === r) {
              T = !0, r = h, l = g;
            x = x.sibling;
          if (!T) {
            for (x = g.child; x; ) {
              if (x === l) {
                T = !0, l = g, r = h;
              if (x === r) {
                T = !0, r = g, l = h;
              x = x.sibling;
            if (!T)
        if (l.alternate !== r)
      if (l.tag !== 3)
      return l.stateNode.current === l ? t : e;
    function ut(t) {
        if (e = ut(t), e !== null) return e;
    function Mt(t) {
      return t === null || typeof t != "object" ? null : (t = Sp && t[Sp] || t["@@iterator"], typeof t == "function" ? t : null);
    function pt(t) {
        return t.$$typeof === Ch ? null : t.displayName || t.name || null;
        case Pt:
        case Tc:
        case Sc:
        case _c:
        case Po:
        case vp:
          case ss:
          case gl:
          case zh:
          case lo:
          case sf:
            return e = t.displayName || null, e !== null ? e : pt(t.type) || "Memo";
          case $a:
              return pt(t(e));
    function Ot(t) {
      return typeof t.tag == "number" ? ht(t) : typeof t.name == "string" ? t.name : null;
    function ht(t) {
          return pt(e);
          return e === Sc ? "StrictMode" : "Mode";
            for (var l = e.length - 1; 0 <= l; l--)
              if (typeof e[l].name == "string") return e[l].name;
            return ht(t.return);
    function Vt(t) {
    function xt(t, e) {
      0 > pl ? console.error("Unexpected pop.") : (e !== rf[pl] && console.error("Unexpected Fiber popped."), t.current = cf[pl], cf[pl] = null, rf[pl] = null, pl--);
    function Dt(t, e, l) {
      pl++, cf[pl] = t.current, rf[pl] = l, t.current = e;
    function re(t) {
    function Se(t, e) {
      Dt(Ti, e, t), Dt(xc, t, t), Dt(io, null, t);
      var l = e.nodeType;
      switch (l) {
          l = l === 9 ? "#document" : "#fragment", e = (e = e.documentElement) && (e = e.namespaceURI) ? Ae(e) : _s;
          if (l = e.tagName, e = e.namespaceURI)
            e = Ae(e), e = Ra(
              l
            switch (l) {
                e = Sm;
                e = Hb;
                e = _s;
      l = l.toLowerCase(), l = Um(null, l), l = {
        ancestorInfo: l
      }, xt(io, t), Dt(io, l, t);
    function Lt(t) {
      xt(io, t), xt(xc, t), xt(Ti, t);
    function L() {
      return re(io.current);
    function nt(t) {
      t.memoizedState !== null && Dt(Ec, t, t);
      var e = re(io.current), l = t.type, r = Ra(e.context, l);
      l = Um(e.ancestorInfo, l), r = { context: r, ancestorInfo: l }, e !== r && (Dt(xc, t, t), Dt(io, r, t));
    function ft(t) {
      xc.current === t && (xt(io, t), xt(xc, t)), Ec.current === t && (xt(Ec, t), gy._currentValue = Lf);
    function Ct(t) {
    function z(t) {
        return $(t), !1;
    function $(t) {
    function at(t, e) {
      if (z(t))
          Ct(t)
        ), $(t);
    function rt(t, e) {
      if (z(t))
          Ct(t)
        ), $(t);
    function bt(t) {
      if (z(t))
          Ct(t)
        ), $(t);
    function Ut(t) {
        tu = e.inject(t), $n = e;
      } catch (l) {
        console.error("React instrumentation encountered an error: %s.", l);
    function vt(t) {
      if (typeof Vv == "function" && Yl(t), $n && typeof $n.setStrictMode == "function")
          $n.setStrictMode(tu, t);
          Ca || (Ca = !0, console.error(
    function pn(t) {
      Et = t;
    function Qt() {
      Et !== null && typeof Et.markCommitStopped == "function" && Et.markCommitStopped();
    function Ge(t) {
      Et !== null && typeof Et.markComponentRenderStarted == "function" && Et.markComponentRenderStarted(t);
    function va() {
      Et !== null && typeof Et.markComponentRenderStopped == "function" && Et.markComponentRenderStopped();
    function Xl(t) {
      Et !== null && typeof Et.markRenderStarted == "function" && Et.markRenderStarted(t);
    function vu() {
      Et !== null && typeof Et.markRenderStopped == "function" && Et.markRenderStopped();
    function Ql(t, e) {
      Et !== null && typeof Et.markStateUpdateScheduled == "function" && Et.markStateUpdateScheduled(t, e);
    function Rs(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (Nh(t) / uo | 0) | 0;
    function Pc(t) {
    function cn(t) {
    function An(t, e, l) {
      var r = t.pendingLanes;
      if (r === 0) return 0;
      var h = 0, g = t.suspendedLanes, T = t.pingedLanes;
      var x = r & 134217727;
      return x !== 0 ? (r = x & ~g, r !== 0 ? h = cn(r) : (T &= x, T !== 0 ? h = cn(T) : l || (l = x & ~t, l !== 0 && (h = cn(l))))) : (x = r & ~g, x !== 0 ? h = cn(x) : T !== 0 ? h = cn(T) : l || (l = r & ~t, l !== 0 && (h = cn(l)))), h === 0 ? 0 : e !== 0 && e !== h && (e & g) === 0 && (g = h & -h, l = e & -e, g >= l || g === 32 && (l & 4194048) !== 0) ? e : h;
    function vo(t, e) {
    function Pf(t, e) {
    function ae() {
      var t = kh;
      return kh <<= 1, (kh & 4194048) === 0 && (kh = 256), t;
    function Zl() {
      var t = Bh;
      return Bh <<= 1, (Bh & 62914560) === 0 && (Bh = 4194304), t;
    function ws(t) {
      for (var e = [], l = 0; 31 > l; l++) e.push(t);
    function Bi(t, e) {
    function If(t, e, l, r, h, g) {
      var T = t.pendingLanes;
      t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
      var x = t.entanglements, w = t.expirationTimes, C = t.hiddenUpdates;
      for (l = T & ~l; 0 < l; ) {
        var F = 31 - aa(l), et = 1 << F;
        x[F] = 0, w[F] = -1;
        var J = C[F];
        if (J !== null)
          for (C[F] = null, F = 0; F < J.length; F++) {
            var lt = J[F];
            lt !== null && (lt.lane &= -536870913);
        l &= ~et;
      r !== 0 && Ic(t, r, 0), g !== 0 && h === 0 && t.tag !== 0 && (t.suspendedLanes |= g & ~(T & ~e));
    function Ic(t, e, l) {
      var r = 31 - aa(e);
      t.entangledLanes |= e, t.entanglements[r] = t.entanglements[r] | 1073741824 | l & 4194090;
    function So(t, e) {
      var l = t.entangledLanes |= e;
      for (t = t.entanglements; l; ) {
        var r = 31 - aa(l), h = 1 << r;
        h & e | t[r] & e && (t[r] |= e), l &= ~h;
    function Ln(t) {
    function el(t, e, l) {
      if (on)
        for (t = t.pendingUpdatersLaneMap; 0 < l; ) {
          var r = 31 - aa(l), h = 1 << r;
          t[r].add(e), l &= ~h;
    function Yn(t, e) {
      if (on)
        for (var l = t.pendingUpdatersLaneMap, r = t.memoizedUpdaters; 0 < e; ) {
          var h = 31 - aa(e);
          t = 1 << h, h = l[h], 0 < h.size && (h.forEach(function(g) {
            var T = g.alternate;
            T !== null && r.has(T) || r.add(g);
          }), h.clear()), e &= ~t;
    function zs(t) {
      return t &= -t, Jn < t ? jl < t ? (t & 134217727) !== 0 ? so : Lh : jl : Jn;
    function tr() {
      var t = Gt.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? so : Rh(t.type));
    function Cs(t, e) {
      var l = Gt.p;
        return Gt.p = t, e();
        Gt.p = l;
    function xl(t) {
      delete t[la], delete t[Ha], delete t[Tp], delete t[$0], delete t[Mc];
    function Sa(t) {
      var e = t[la];
      for (var l = t.parentNode; l; ) {
        if (e = l[nu] || l[la]) {
          if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
            for (t = pc(t); t !== null; ) {
              if (l = t[la])
                return l;
              t = pc(t);
        t = l, l = t.parentNode;
    function jn(t) {
      if (t = t[la] || t[nu]) {
    function El(t) {
    function A(t) {
      var e = t[Dc];
      return e || (e = t[Dc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
    function G(t) {
      t[Ac] = !0;
    function gt(t, e) {
      _t(t, e), _t(t + "Capture", e);
    function _t(t, e) {
      yl[t] && console.error(
      ), yl[t] = e;
      var l = t.toLowerCase();
      for (cs[l] = t, t === "onDoubleClick" && (cs.ondblclick = t), t = 0; t < e.length; t++)
        J0.add(e[t]);
    function Ht(t, e) {
      W0[e.type] || e.onChange || e.onInput || e.readOnly || e.disabled || e.value == null || console.error(
    function Zt(t) {
      return oo.call(qh, t) ? !0 : oo.call(jh, t) ? !1 : Yh.test(t) ? qh[t] = !0 : (jh[t] = !0, console.error("Invalid attribute name: `%s`", t), !1);
    function Wt(t, e, l) {
      if (Zt(e)) {
          switch (typeof l) {
              return l;
              return l;
              if (l === !1) return l;
          return l === void 0 ? void 0 : null;
        return t = t.getAttribute(e), t === "" && l === !0 ? !0 : (at(l, e), t === "" + l ? l : t);
    function ge(t, e, l) {
      if (Zt(e))
        if (l === null) t.removeAttribute(e);
          switch (typeof l) {
              var r = e.toLowerCase().slice(0, 5);
              if (r !== "data-" && r !== "aria-") {
          at(l, e), t.setAttribute(e, "" + l);
    function Jt(t, e, l) {
      if (l === null) t.removeAttribute(e);
        switch (typeof l) {
        at(l, e), t.setAttribute(e, "" + l);
    function rn(t, e, l, r) {
      if (r === null) t.removeAttribute(l);
        switch (typeof r) {
            t.removeAttribute(l);
        at(r, l), t.setAttributeNS(e, l, "" + r);
    function Ol() {
    function td() {
      if (au === 0) {
        _p = console.log, xp = console.info, F0 = console.warn, Ep = console.error, Rc = console.group, P0 = console.groupCollapsed, I0 = console.groupEnd;
          value: Ol,
      au++;
    function Rm() {
      if (au--, au === 0) {
          log: le({}, t, { value: _p }),
          info: le({}, t, { value: xp }),
          warn: le({}, t, { value: F0 }),
          error: le({}, t, { value: Ep }),
          group: le({}, t, { value: Rc }),
          groupCollapsed: le({}, t, { value: P0 }),
          groupEnd: le({}, t, { value: I0 })
      0 > au && console.error(
    function yn(t) {
      if (Op === void 0)
        } catch (l) {
          var e = l.stack.trim().match(/\n( *(at )?)/);
          Op = e && e[1] || "", hf = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
` + Op + t + hf;
    }
    function Rn(t, e) {
      if (!t || wc) return "";
      var l = mf.get(t);
      if (l !== void 0) return l;
      wc = !0, l = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var r = null;
      r = I.H, I.H = null, td();
        var h = {
                var J = function() {
                if (Object.defineProperty(J.prototype, "props", {
                    Reflect.construct(J, []);
                  } catch (wt) {
                    var lt = wt;
                  Reflect.construct(t, [], J);
                    J.call();
                  } catch (wt) {
                    lt = wt;
                  t.call(J.prototype);
                } catch (wt) {
                  lt = wt;
                (J = t()) && typeof J.catch == "function" && J.catch(function() {
            } catch (wt) {
              if (wt && lt && typeof wt.stack == "string")
                return [wt.stack, lt.stack];
        h.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var g = Object.getOwnPropertyDescriptor(
          h.DetermineComponentFrameRoot,
        g && g.configurable && Object.defineProperty(
          h.DetermineComponentFrameRoot,
        var T = h.DetermineComponentFrameRoot(), x = T[0], w = T[1];
        if (x && w) {
          var C = x.split(`
`), F = w.split(`
          for (T = g = 0; g < C.length && !C[g].includes(
            g++;
          for (; T < F.length && !F[T].includes(
            T++;
          if (g === C.length || T === F.length)
            for (g = C.length - 1, T = F.length - 1; 1 <= g && 0 <= T && C[g] !== F[T]; )
              T--;
          for (; 1 <= g && 0 <= T; g--, T--)
            if (C[g] !== F[T]) {
              if (g !== 1 || T !== 1)
                  if (g--, T--, 0 > T || C[g] !== F[T]) {
                    var et = `
` + C[g].replace(
                    return t.displayName && et.includes("<anonymous>") && (et = et.replace("<anonymous>", t.displayName)), typeof t == "function" && mf.set(t, et), et;
                while (1 <= g && 0 <= T);
        wc = !1, I.H = r, Rm(), Error.prepareStackTrace = l;
      return C = (C = t ? t.displayName || t.name : "") ? yn(C) : "", typeof t == "function" && mf.set(t, C), C;
    function sa(t) {
    function Hs(t) {
          return yn(t.type);
          return yn("Lazy");
          return yn("Suspense");
          return yn("SuspenseList");
          return Rn(t.type, !1);
          return Rn(t.type.render, !1);
          return Rn(t.type, !0);
          return yn("Activity");
    function ed(t) {
          e += Hs(t);
          var l = t._debugInfo;
          if (l)
            for (var r = l.length - 1; 0 <= r; r--) {
              var h = l[r];
              if (typeof h.name == "string") {
                var g = e, T = h.env, x = yn(
                  h.name + (T ? " [" + T + "]" : "")
                e = g + x;
      } catch (w) {
Error generating stack: ` + w.message + `
` + w.stack;
    function Wy(t) {
      return (t = t ? t.displayName || t.name : "") ? yn(t) : "";
    function nd() {
      if (Ja === null) return null;
      var t = Ja._debugOwner;
      return t != null ? Ot(t) : null;
    function Fy() {
      if (Ja === null) return "";
      var t = Ja;
            e += yn(t.type);
            e += yn("Suspense");
            e += yn("SuspenseList");
            e += yn("Activity");
            t._debugOwner || e !== "" || (e += Wy(
            t._debugOwner || e !== "" || (e += Wy(
            var l = t;
            t = l._debugOwner;
            var r = l._debugStack;
            t && r && (typeof r != "string" && (l._debugStack = r = sa(r)), r !== "" && (e += `
` + r));
            var h = t.debugStack;
            (t = t.owner) && h && (e += `
` + sa(h));
        var g = e;
      } catch (T) {
        g = `
Error generating stack: ` + T.message + `
` + T.stack;
      return g;
    function Rt(t, e, l, r, h, g, T) {
      var x = Ja;
      er(t);
          e.bind(null, l, r, h, g, T)
        ) : e(l, r, h, g, T);
        er(x);
    function er(t) {
      I.getCurrentStack = t === null ? null : Fy, Ua = !1, Ja = t;
    function qn(t) {
          return bt(t), t;
    function Su(t) {
    function nr(t) {
      var e = Su(t) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(
      bt(t[e]);
      var r = "" + t[e];
      if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
        var h = l.get, g = l.set;
            return h.call(this);
          set: function(T) {
            bt(T), r = "" + T, g.call(this, T);
          enumerable: l.enumerable
            return r;
          setValue: function(T) {
            bt(T), r = "" + T;
    function Li(t) {
      t._valueTracker || (t._valueTracker = nr(t));
    function bn(t) {
      var l = e.getValue(), r = "";
      return t && (r = Su(t) ? t.checked ? "true" : "false" : t.value), t = r, t !== l ? (e.setValue(t), !0) : !1;
    function ar(t) {
    function ja(t) {
        Gv,
    function To(t, e) {
      e.checked === void 0 || e.defaultChecked === void 0 || Dp || (console.error(
        nd() || "A component",
      ), Dp = !0), e.value === void 0 || e.defaultValue === void 0 || Mp || (console.error(
        nd() || "A component",
      ), Mp = !0);
    function _o(t, e, l, r, h, g, T, x) {
      t.name = "", T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean" ? (at(T, "type"), t.type = T) : t.removeAttribute("type"), e != null ? T === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + qn(e)) : t.value !== "" + qn(e) && (t.value = "" + qn(e)) : T !== "submit" && T !== "reset" || t.removeAttribute("value"), e != null ? ad(t, T, qn(e)) : l != null ? ad(t, T, qn(l)) : r != null && t.removeAttribute("value"), h == null && g != null && (t.defaultChecked = !!g), h != null && (t.checked = h && typeof h != "function" && typeof h != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? (at(x, "name"), t.name = "" + qn(x)) : t.removeAttribute("name");
    function Py(t, e, l, r, h, g, T, x) {
      if (g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (at(g, "type"), t.type = g), e != null || l != null) {
        if (!(g !== "submit" && g !== "reset" || e != null))
        l = l != null ? "" + qn(l) : "", e = e != null ? "" + qn(e) : l, x || e === t.value || (t.value = e), t.defaultValue = e;
      r = r ?? h, r = typeof r != "function" && typeof r != "symbol" && !!r, t.checked = x ? t.checked : !!r, t.defaultChecked = !!r, T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean" && (at(T, "name"), t.name = T);
    function ad(t, e, l) {
      e === "number" && ar(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
    function wm(t, e) {
      e.value == null && (typeof e.children == "object" && e.children !== null ? of.Children.forEach(e.children, function(l) {
        l == null || typeof l == "string" || typeof l == "number" || typeof l == "bigint" || Rp || (Rp = !0, console.error(
      }) : e.dangerouslySetInnerHTML == null || Vh || (Vh = !0, console.error(
      ))), e.selected == null || Ap || (console.error(
      ), Ap = !0);
    function Iy() {
      var t = nd();
    function Yi(t, e, l, r) {
        for (var h = 0; h < l.length; h++)
          e["$" + l[h]] = !0;
        for (l = 0; l < t.length; l++)
          h = e.hasOwnProperty("$" + t[l].value), t[l].selected !== h && (t[l].selected = h), h && r && (t[l].defaultSelected = !0);
        for (l = "" + qn(l), e = null, h = 0; h < t.length; h++) {
          if (t[h].value === l) {
            t[h].selected = !0, r && (t[h].defaultSelected = !0);
          e !== null || t[h].disabled || (e = t[h]);
    function lr(t, e) {
      for (t = 0; t < gf.length; t++) {
        var l = gf[t];
        if (e[l] != null) {
          var r = Kt(e[l]);
          e.multiple && !r ? console.error(
            l,
            Iy()
          ) : !e.multiple && r && console.error(
            l,
            Iy()
      e.value === void 0 || e.defaultValue === void 0 || wp || (console.error(
      ), wp = !0);
    function Kl(t, e) {
      e.value === void 0 || e.defaultValue === void 0 || tb || (console.error(
        nd() || "A component"
      ), tb = !0), e.children != null && e.value == null && console.error(
    function ld(t, e, l) {
      if (e != null && (e = "" + qn(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue = l != null ? "" + qn(l) : "";
    function zm(t, e, l, r) {
        if (r != null) {
          if (l != null)
          if (Kt(r)) {
            if (1 < r.length)
            r = r[0];
          l = r;
        l == null && (l = ""), e = l;
      l = qn(e), t.defaultValue = l, r = t.textContent, r === l && r !== "" && r !== null && (t.value = r);
    function Tu(t, e) {
      return t.serverProps === void 0 && t.serverTail.length === 0 && t.children.length === 1 && 3 < t.distanceFromLeaf && t.distanceFromLeaf > 15 - e ? Tu(t.children[0], e) : t;
    function ca(t) {
    function xo(t) {
    function _u(t) {
    function Cm(t) {
    function In(t, e) {
      return eb.test(t) ? (t = JSON.stringify(t), t.length > e - 2 ? 8 > e ? '{"..."}' : "{" + t.slice(0, e - 7) + '..."}' : "{" + t + "}") : t.length > e ? 5 > e ? '{"..."}' : t.slice(0, e - 3) + "..." : t;
    function ir(t, e, l) {
      var r = 120 - 2 * l;
        return xo(l) + In(t, r) + `
        for (var h = 0; h < e.length && h < t.length && e.charCodeAt(h) === t.charCodeAt(h); h++) ;
        return h > r - 8 && 10 < h && (t = "..." + t.slice(h - 8), e = "..." + e.slice(h - 8)), xo(l) + In(t, r) + `
` + _u(l) + In(e, r) + `
      return ca(l) + In(t, r) + `
    function Hm(t) {
      return Object.prototype.toString.call(t).replace(/^\[object (.*)\]$/, function(e, l) {
        return l;
    function Eo(t, e) {
          if (Kt(t)) return "[...]";
          if (t.$$typeof === Fo)
            return (e = pt(t.type)) ? "<" + e + ">" : "<...>";
          var l = Hm(t);
          if (l === "Object") {
            l = "", e -= 2;
            for (var r in t)
              if (t.hasOwnProperty(r)) {
                var h = JSON.stringify(r);
                if (h !== '"' + r + '"' && (r = h), e -= r.length - 2, h = Eo(
                  t[r],
                ), e -= h.length, 0 > e) {
                  l += l === "" ? "..." : ", ...";
                l += (l === "" ? "" : ",") + r + ":" + h;
            return "{" + l + "}";
          return l;
    function xu(t, e) {
      return typeof t != "string" || eb.test(t) ? "{" + Eo(t, e - 2) + "}" : t.length > e - 2 ? 5 > e ? '"..."' : '"' + t.slice(0, e - 5) + '..."' : '"' + t + '"';
    function Us(t, e, l) {
      var r = 120 - l.length - t.length, h = [], g;
      for (g in e)
        if (e.hasOwnProperty(g) && g !== "children") {
          var T = xu(
            e[g],
            120 - l.length - g.length - 1
          r -= g.length + T.length + 2, h.push(g + "=" + T);
        }
      return h.length === 0 ? l + "<" + t + `>
` : 0 < r ? l + "<" + t + " " + h.join(" ") + `>
` : l + "<" + t + `
` + l + "  " + h.join(`
` + l + "  ") + `
` + l + `>
    function Ov(t, e, l) {
      var r = "", h = le({}, e), g;
      for (g in t)
        if (t.hasOwnProperty(g)) {
          delete h[g];
          var T = 120 - 2 * l - g.length - 2, x = Eo(t[g], T);
          e.hasOwnProperty(g) ? (T = Eo(e[g], T), r += xo(l) + g + ": " + x + `
`, r += _u(l) + g + ": " + T + `
`) : r += xo(l) + g + ": " + x + `
      for (var w in h)
        h.hasOwnProperty(w) && (t = Eo(
          h[w],
          120 - 2 * l - w.length - 2
        ), r += _u(l) + w + ": " + t + `
      return r;
    }
    function nl(t, e, l, r) {
      var h = "", g = /* @__PURE__ */ new Map();
      for (C in l)
        l.hasOwnProperty(C) && g.set(
          C.toLowerCase(),
          C
      if (g.size === 1 && g.has("children"))
        h += Us(
          ca(r)
        for (var T in e)
          if (e.hasOwnProperty(T) && T !== "children") {
            var x = 120 - 2 * (r + 1) - T.length - 1, w = g.get(T.toLowerCase());
            if (w !== void 0) {
              g.delete(T.toLowerCase());
              var C = e[T];
              w = l[w];
              var F = xu(
                C,
                x
              x = xu(
                w,
                x
              ), typeof C == "object" && C !== null && typeof w == "object" && w !== null && Hm(C) === "Object" && Hm(w) === "Object" && (2 < Object.keys(C).length || 2 < Object.keys(w).length || -1 < F.indexOf("...") || -1 < x.indexOf("...")) ? h += ca(r + 1) + T + `={{
` + Ov(
                C,
                w,
                r + 2
              ) + ca(r + 1) + `}}
` : (h += xo(r + 1) + T + "=" + F + `
`, h += _u(r + 1) + T + "=" + x + `
              h += ca(r + 1) + T + "=" + xu(e[T], x) + `
        g.forEach(function(et) {
          if (et !== "children") {
            var J = 120 - 2 * (r + 1) - et.length - 1;
            h += _u(r + 1) + et + "=" + xu(l[et], J) + `
        }), h = h === "" ? ca(r) + "<" + t + `>
` : ca(r) + "<" + t + `
` + h + ca(r) + `>
      return t = l.children, e = e.children, typeof t == "string" || typeof t == "number" || typeof t == "bigint" ? (g = "", (typeof e == "string" || typeof e == "number" || typeof e == "bigint") && (g = "" + e), h += ir(g, "" + t, r + 1)) : (typeof e == "string" || typeof e == "number" || typeof e == "bigint") && (h = t == null ? h + ir("" + e, null, r + 1) : h + ir("" + e, void 0, r + 1)), h;
    function id(t, e) {
      var l = Cm(t);
      if (l === null) {
        for (l = "", t = t.child; t; )
          l += id(t, e), t = t.sibling;
        return l;
      return ca(e) + "<" + l + `>
    function od(t, e) {
      var l = Tu(t, e);
      if (l !== t && (t.children.length !== 1 || t.children[0] !== l))
        return ca(e) + `...
` + od(l, e + 1);
      l = "";
      var r = t.fiber._debugInfo;
      if (r)
        for (var h = 0; h < r.length; h++) {
          var g = r[h].name;
          typeof g == "string" && (l += ca(e) + "<" + g + `>
      if (r = "", h = t.fiber.pendingProps, t.fiber.tag === 6)
        r = ir(h, t.serverProps, e), e++;
      else if (g = Cm(t.fiber), g !== null)
          r = e;
          var T = 120 - 2 * r - g.length - 2, x = "";
          for (C in h)
            if (h.hasOwnProperty(C) && C !== "children") {
              var w = xu(h[C], 15);
              if (T -= C.length + w.length + 2, 0 > T) {
                x += " ...";
              x += " " + C + "=" + w;
          r = ca(r) + "<" + g + x + `>
          t.serverProps === null ? (r = Us(
            g,
            h,
            xo(e)
          ) : (r = nl(
            g,
            h,
      var C = "";
      for (h = t.fiber.child, g = 0; h && g < t.children.length; )
        T = t.children[g], T.fiber === h ? (C += od(T, e), g++) : C += id(h, e), h = h.sibling;
      for (h && 0 < t.children.length && (C += ca(e) + `...
`), h = t.serverTail, t.serverProps === null && e--, t = 0; t < h.length; t++)
        g = h[t], C = typeof g == "string" ? C + (_u(e) + In(g, 120 - 2 * e) + `
`) : C + Us(
          g.type,
          g.props,
          _u(e)
      return l + r + C;
    function or(t) {
` + od(t, 0);
    function Eu(t, e, l) {
      for (var r = e, h = null, g = 0; r; )
        r === t && (g = 0), h = {
          fiber: r,
          children: h !== null ? [h] : [],
          serverProps: r === e ? l : r === t ? null : void 0,
          distanceFromLeaf: g
        }, g++, r = r.return;
      return h !== null ? or(h).replaceAll(/^[+-]/gm, ">") : "";
    function Um(t, e) {
      var l = le({}, t || Hp), r = { tag: e };
      return Gh.indexOf(e) !== -1 && (l.aTagInScope = null, l.buttonTagInScope = null, l.nobrTagInScope = null), Xh.indexOf(e) !== -1 && (l.pTagInButtonScope = null), zp.indexOf(e) !== -1 && e !== "address" && e !== "div" && e !== "p" && (l.listItemTagAutoclosing = null, l.dlItemTagAutoclosing = null), l.current = r, e === "form" && (l.formTag = r), e === "a" && (l.aTagInScope = r), e === "button" && (l.buttonTagInScope = r), e === "nobr" && (l.nobrTagInScope = r), e === "p" && (l.pTagInButtonScope = r), e === "li" && (l.listItemTagAutoclosing = r), (e === "dd" || e === "dt") && (l.dlItemTagAutoclosing = r), e === "#document" || e === "html" ? l.containerTagInScope = null : l.containerTagInScope || (l.containerTagInScope = r), t !== null || e !== "#document" && e !== "html" && e !== "body" ? l.implicitRootScope === !0 && (l.implicitRootScope = !1) : l.implicitRootScope = !0, l;
    function Nm(t, e, l) {
          if (l) break;
          if (!l) return t === "html";
          return Cp.indexOf(e) === -1;
          return l || e === null;
          return l && e === "#document" || e === null;
          return l && (e === "#document" || e === "html") || e === null;
    function Ns(t, e) {
    function t0(t, e) {
    function ud(t, e) {
      e = e || Hp;
      var l = e.current;
      if (e = (l = Nm(
        l && l.tag,
      ) ? null : l) ? null : Ns(t, e), e = l || e, !e) return !0;
      var r = e.tag;
      if (e = String(!!l) + "|" + t + "|" + r, zc[e]) return !1;
      zc[e] = !0;
      var h = (e = Ja) ? t0(e.return, r) : null, g = e !== null && h !== null ? Eu(h, e, null) : "", T = "<" + t + ">";
      return l ? (l = "", r === "table" && t === "tr" && (l += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        T,
        r,
        l,
        g
        T,
        r,
        g
      ), e && (t = e.return, h === null || t === null || h === t && t._debugOwner === e._debugOwner || Rt(h, function() {
          r,
          T
    function ur(t, e, l) {
      if (l || Nm("#text", e, !1))
      if (l = "#text|" + e, zc[l]) return !1;
      zc[l] = !0;
      var r = (l = Ja) ? t0(l, e) : null;
      return l = l !== null && r !== null ? Eu(
        r,
        l,
        l.tag !== 6 ? { children: null } : null
        l
        l
    function Ou(t, e) {
        var l = t.firstChild;
        if (l && l === t.lastChild && l.nodeType === 3) {
          l.nodeValue = e;
    function Mv(t) {
      return t.replace(lu, function(e, l) {
        return l.toUpperCase();
    function e0(t, e, l) {
      var r = e.indexOf("--") === 0;
      r || (-1 < e.indexOf("-") ? rs.hasOwnProperty(e) && rs[e] || (rs[e] = !0, console.error(
        Mv(e.replace(yf, "ms-"))
      )) : pf.test(e) ? rs.hasOwnProperty(e) && rs[e] || (rs[e] = !0, console.error(
      )) : !nb.test(l) || fs.hasOwnProperty(l) && fs[l] || (fs[l] = !0, console.error(
        l.replace(nb, "")
      )), typeof l == "number" && (isNaN(l) ? ab || (ab = !0, console.error(
      )) : isFinite(l) || Up || (Up = !0, console.error(
      )))), l == null || typeof l == "boolean" || l === "" ? r ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : r ? t.setProperty(e, l) : typeof l != "number" || l === 0 || bf.has(e) ? e === "float" ? t.cssFloat = l : (rt(l, e), t[e] = ("" + l).trim()) : t[e] = l + "px";
    function sr(t, e, l) {
      if (e && Object.freeze(e), t = t.style, l != null) {
          var r = {};
          if (l) {
            for (var h in l)
              if (l.hasOwnProperty(h) && !e.hasOwnProperty(h))
                for (var g = xi[h] || [h], T = 0; T < g.length; T++)
                  r[g[T]] = h;
          }
          for (var x in e)
            if (e.hasOwnProperty(x) && (!l || l[x] !== e[x]))
              for (h = xi[x] || [x], g = 0; g < h.length; g++)
                r[h[g]] = x;
          x = {};
          for (var w in e)
            for (h = xi[w] || [w], g = 0; g < h.length; g++)
              x[h[g]] = w;
          w = {};
          for (var C in r)
            if (h = r[C], (g = x[C]) && h !== g && (T = h + "," + g, !w[T])) {
              w[T] = !0, T = console;
              var F = e[h];
              T.error.call(
                T,
                F == null || typeof F == "boolean" || F === "" ? "Removing" : "Updating",
                h,
                g
        for (var et in l)
          !l.hasOwnProperty(et) || e != null && e.hasOwnProperty(et) || (et.indexOf("--") === 0 ? t.setProperty(et, "") : et === "float" ? t.cssFloat = "" : t[et] = "");
        for (var J in e)
          C = e[J], e.hasOwnProperty(J) && l[J] !== C && e0(t, J, C);
        for (r in e)
          e.hasOwnProperty(r) && e0(t, r, e[r]);
    function Mu(t) {
    function sd(t) {
      return Qh.get(t) || t;
    function ks(t, e) {
      if (oo.call(Ei, e) && Ei[e])
      if (Zh.test(e)) {
        if (t = "aria-" + e.slice(4).toLowerCase(), t = Np.hasOwnProperty(t) ? t : null, t == null)
          ), Ei[e] = !0;
          ), Ei[e] = !0;
      if (kp.test(e)) {
        if (t = e.toLowerCase(), t = Np.hasOwnProperty(t) ? t : null, t == null) return Ei[e] = !0, !1;
        ), Ei[e] = !0);
    function Bs(t, e) {
      var l = [], r;
      for (r in e)
        ks(t, r) || l.push(r);
      e = l.map(function(h) {
        return "`" + h + "`";
      }).join(", "), l.length === 1 ? console.error(
      ) : 1 < l.length && console.error(
    function n0(t, e, l, r) {
      if (oo.call(ma, e) && ma[e])
      var h = e.toLowerCase();
      if (h === "onfocusin" || h === "onfocusout")
        ), ma[e] = !0;
      if (typeof l == "function" && (t === "form" && e === "action" || t === "input" && e === "formAction" || t === "button" && e === "formAction"))
      if (r != null) {
        if (t = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(e))
        if (r = t.hasOwnProperty(h) ? t[h] : null, r != null)
            r
          ), ma[e] = !0;
        if (Sf.test(e))
          ), ma[e] = !0;
      } else if (Sf.test(e))
        ), ma[e] = !0;
      if (i.test(e) || c.test(e)) return !0;
      if (h === "innerhtml")
        ), ma[e] = !0;
      if (h === "aria")
        ), ma[e] = !0;
      if (h === "is" && l !== null && l !== void 0 && typeof l != "string")
          typeof l
        ), ma[e] = !0;
      if (typeof l == "number" && isNaN(l))
        ), ma[e] = !0;
      if (ds.hasOwnProperty(h)) {
        if (h = ds[h], h !== e)
            h
          ), ma[e] = !0;
      } else if (e !== h)
          h
        ), ma[e] = !0;
      switch (typeof l) {
              return h = e.toLowerCase().slice(0, 5), h === "data-" || h === "aria-" ? !0 : (l ? console.error(
                l,
                l,
                l,
                l,
              ), ma[e] = !0);
          return ma[e] = !0, !1;
          if (l === "false" || l === "true") {
              l,
              l === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              l
            ), ma[e] = !0;
    function km(t, e, l) {
      var r = [], h;
      for (h in e)
        n0(t, h, e[h], l) || r.push(h);
      e = r.map(function(g) {
        return "`" + g + "`";
      }).join(", "), r.length === 1 ? console.error(
      ) : 1 < r.length && console.error(
    function Ls(t) {
      return d.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
    function Du(t) {
    function $l(t) {
      var e = jn(t);
        var l = t[Ha] || null;
            if (_o(
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ), e = l.name, l.type === "radio" && e != null) {
              for (l = t; l.parentNode; ) l = l.parentNode;
              for (at(e, "name"), l = l.querySelectorAll(
                'input[name="' + ja(
              ), e = 0; e < l.length; e++) {
                var r = l[e];
                if (r !== t && r.form === t.form) {
                  var h = r[Ha] || null;
                  if (!h)
                  _o(
                    r,
                    h.value,
                    h.defaultValue,
                    h.defaultValue,
                    h.checked,
                    h.defaultChecked,
                    h.type,
                    h.name
              for (e = 0; e < l.length; e++)
                r = l[e], r.form === t.form && bn(r);
            ld(t, l.value, l.defaultValue);
            e = l.value, e != null && Yi(t, !!l.multiple, e, !1);
    function cd(t, e, l) {
      if (R) return t(e, l);
      R = !0;
        var r = t(e);
        return r;
        if (R = !1, (v !== null || O !== null) && (Pu(), v && (e = v, t = O, O = v = null, $l(e), t)))
          for (e = 0; e < t.length; e++) $l(t[e]);
    function ji(t, e) {
      var l = t.stateNode;
      if (l === null) return null;
      var r = l[Ha] || null;
      if (r === null) return null;
      l = r[e];
          (r = !r.disabled) || (t = t.type, r = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !r;
      if (l && typeof l != "function")
          "Expected `" + e + "` listener to be a function, instead got a value of `" + typeof l + "` type."
      return l;
    function qi() {
      if (P) return P;
      var t, e = W, l = e.length, r, h = "value" in ct ? ct.value : ct.textContent, g = h.length;
      for (t = 0; t < l && e[t] === h[t]; t++) ;
      var T = l - t;
      for (r = 1; r <= T && e[l - r] === h[g - r]; r++) ;
      return P = h.slice(t, 1 < r ? 1 - r : void 0);
    function Ys(t) {
    function Au() {
    function Bm() {
    function Vn(t) {
      function e(l, r, h, g, T) {
        this._reactName = l, this._targetInst = h, this.type = r, this.nativeEvent = g, this.target = T, this.currentTarget = null;
        for (var x in t)
          t.hasOwnProperty(x) && (l = t[x], this[x] = l ? l(g) : g[x]);
        return this.isDefaultPrevented = (g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1) ? Au : Bm, this.isPropagationStopped = Bm, this;
      return le(e.prototype, {
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Au);
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Au);
        isPersistent: Au
    function rd(t) {
      return e.getModifierState ? e.getModifierState(t) : (t = zE[t]) ? !!e[t] : !1;
    function fd() {
      return rd;
    function ra(t, e) {
          return GE.indexOf(e.keyCode) !== -1;
          return e.keyCode !== YS;
    function Oo(t) {
    function dd(t, e) {
          return Oo(e);
          return e.which !== qS ? null : (GS = !0, VS);
          return t = e.data, t === VS && GS ? null : t;
    function cr(t, e) {
      if (Kh)
        return t === "compositionend" || !Qv && ra(t, e) ? (t = qi(), P = W = ct = null, Kh = !1, t) : null;
          return jS && e.locale !== "ko" ? null : e.data;
    function a0(t) {
      return e === "input" ? !!QE[t.type] : e === "textarea";
    function Lm(t) {
      if (!U) return !1;
    function hd(t, e, l, r) {
      v ? O ? O.push(r) : O = [r] : v = r, e = Wr(e, "onChange"), 0 < e.length && (l = new Bt(
        l,
        r
      ), t.push({ event: l, listeners: e }));
    function rr(t) {
      gi(t, 0);
    function Ru(t) {
      var e = El(t);
      if (bn(e)) return t;
    function Ym(t, e) {
    function l0() {
      Yp && (Yp.detachEvent("onpropertychange", i0), jp = Yp = null);
    function i0(t) {
      if (t.propertyName === "value" && Ru(jp)) {
        hd(
          jp,
          Du(t)
        ), cd(rr, e);
    function Dv(t, e, l) {
      t === "focusin" ? (l0(), Yp = e, jp = l, Yp.attachEvent("onpropertychange", i0)) : t === "focusout" && l0();
    function jm(t) {
        return Ru(jp);
    function Av(t, e) {
      if (t === "click") return Ru(e);
    function Rv(t, e) {
        return Ru(e);
    function wv(t, e) {
    function fr(t, e) {
      if (Wa(t, e)) return !0;
      var l = Object.keys(t), r = Object.keys(e);
      if (l.length !== r.length) return !1;
      for (r = 0; r < l.length; r++) {
        var h = l[r];
        if (!oo.call(e, h) || !Wa(t[h], e[h]))
    function o0(t) {
    function qm(t, e) {
      var l = o0(t);
      for (var r; l; ) {
        if (l.nodeType === 3) {
          if (r = t + l.textContent.length, t <= e && r >= e)
            return { node: l, offset: e - t };
          t = r;
          for (; l; ) {
            if (l.nextSibling) {
              l = l.nextSibling;
            l = l.parentNode;
          l = void 0;
        l = o0(l);
    function u0(t, e) {
      return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? u0(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
    function s0(t) {
      for (var e = ar(t.document); e instanceof t.HTMLIFrameElement; ) {
          var l = typeof e.contentWindow.location.href == "string";
          l = !1;
        if (l) t = e.contentWindow;
        e = ar(t.document);
    function Vm(t) {
    function c0(t, e, l) {
      var r = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
      Kv || $h == null || $h !== ar(r) || (r = $h, "selectionStart" in r && Vm(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
      }), qp && fr(qp, r) || (qp = r, r = Wr(Zv, "onSelect"), 0 < r.length && (e = new Bt(
        l
      ), t.push({ event: e, listeners: r }), e.target = $h)));
    }
    function Vi(t, e) {
      var l = {};
      return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
    }
    function wu(t) {
      if ($v[t]) return $v[t];
      if (!Jh[t]) return t;
      var e = Jh[t], l;
      for (l in e)
        if (e.hasOwnProperty(l) && l in QS)
          return $v[t] = e[l];
    function Ml(t, e) {
      WS.set(t, e), gt(e, [t]);
    function qa(t, e) {
        var l = Wv.get(t);
        return l !== void 0 ? l : (e = {
          stack: ed(e)
        }, Wv.set(t, e), e);
        stack: ed(e)
    function dr() {
      for (var t = Wh, e = Fv = Wh = 0; e < t; ) {
        var l = Oi[e];
        Oi[e++] = null;
        var r = Oi[e];
        Oi[e++] = null;
        var h = Oi[e];
        Oi[e++] = null;
        var g = Oi[e];
        if (Oi[e++] = null, r !== null && h !== null) {
          var T = r.pending;
          T === null ? h.next = h : (h.next = T.next, T.next = h), r.pending = h;
        }
        g !== 0 && r0(l, h, g);
      }
    }
    function md(t, e, l, r) {
      Oi[Wh++] = t, Oi[Wh++] = e, Oi[Wh++] = l, Oi[Wh++] = r, Fv |= r, t.lanes |= r, t = t.alternate, t !== null && (t.lanes |= r);
    }
    function Gm(t, e, l, r) {
      return md(t, e, l, r), gd(t);
    }
    function Ta(t, e) {
      return md(t, null, null, e), gd(t);
    }
    function r0(t, e, l) {
      t.lanes |= l;
      var r = t.alternate;
      r !== null && (r.lanes |= l);
      for (var h = !1, g = t.return; g !== null; )
        g.childLanes |= l, r = g.alternate, r !== null && (r.childLanes |= l), g.tag === 22 && (t = g.stateNode, t === null || t._visibility & lb || (h = !0)), t = g, g = g.return;
      return t.tag === 3 ? (g = t.stateNode, h && e !== null && (h = 31 - aa(l), t = g.hiddenUpdates, r = t[h], r === null ? t[h] = [e] : r.push(e), e.lane = l | 536870912), g) : null;
    }
    function gd(t) {
      if (cy > mO)
        throw Hf = cy = 0, ry = D1 = null, Error(
      Hf > gO && (Hf = 0, ry = null, console.error(
      )), t.alternate === null && (t.flags & 4098) !== 0 && Ll(t);
      for (var e = t, l = e.return; l !== null; )
        e.alternate === null && (e.flags & 4098) !== 0 && Ll(t), e = l, l = e.return;
    function zu(t) {
      if (Mi === null) return t;
      var e = Mi(t);
    function Xm(t) {
      if (Mi === null) return t;
      var e = Mi(t);
      return e === void 0 ? t != null && typeof t.render == "function" && (e = zu(t.render), t.render !== e) ? (e = { $$typeof: lo, render: e }, t.displayName !== void 0 && (e.displayName = t.displayName), e) : t : e.current;
    function f0(t, e) {
      if (Mi === null) return !1;
      var l = t.elementType;
      var r = !1, h = typeof e == "object" && e !== null ? e.$$typeof : null;
          typeof e == "function" && (r = !0);
          (typeof e == "function" || h === $a) && (r = !0);
          (h === lo || h === $a) && (r = !0);
          (h === sf || h === $a) && (r = !0);
      return !!(r && (t = Mi(l), t !== void 0 && t === Mi(e)));
    function d0(t) {
      Mi !== null && typeof WeakSet == "function" && (Fh === null && (Fh = /* @__PURE__ */ new WeakSet()), Fh.add(t));
    function hr(t, e, l) {
      var r = t.alternate, h = t.child, g = t.sibling, T = t.tag, x = t.type, w = null;
      switch (T) {
          w = x;
          w = x.render;
      if (Mi === null)
      var C = !1;
      x = !1, w !== null && (w = Mi(w), w !== void 0 && (l.has(w) ? x = !0 : e.has(w) && (T === 1 ? x = !0 : C = !0))), Fh !== null && (Fh.has(t) || r !== null && Fh.has(r)) && (x = !0), x && (t._debugNeedsRemount = !0), (x || C) && (r = Ta(t, 2), r !== null && tn(r, t, 2)), h === null || x || hr(
        h,
        l
      ), g !== null && hr(
        g,
        l
    function mr(t, e, l, r) {
      this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, PS || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    function Qm(t) {
    function Jl(t, e) {
      var l = t.alternate;
      switch (l === null ? (l = M(
      ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l._debugOwner = t._debugOwner, l._debugStack = t._debugStack, l._debugTask = t._debugTask, l._debugHookTypes = t._debugHookTypes, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null, l.actualDuration = -0, l.actualStartTime = -1.1), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : {
      }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l.selfBaseDuration = t.selfBaseDuration, l.treeBaseDuration = t.treeBaseDuration, l._debugInfo = t._debugInfo, l._debugNeedsRemount = t._debugNeedsRemount, l.tag) {
          l.type = zu(t.type);
          l.type = zu(t.type);
          l.type = Xm(t.type);
      return l;
    function Zm(t, e) {
      var l = t.alternate;
      return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null, t.selfBaseDuration = 0, t.treeBaseDuration = 0) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      }, t.selfBaseDuration = l.selfBaseDuration, t.treeBaseDuration = l.treeBaseDuration), t;
    function pd(t, e, l, r, h, g) {
      var T = 0, x = t;
        Qm(t) && (T = 1), x = zu(x);
        T = L(), T = bc(t, l, T) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
          case vp:
            return e = M(31, l, e, h), e.elementType = vp, e.lanes = g, e;
          case Pt:
            return Mo(
              l.children,
              h,
              g,
          case Sc:
            T = 8, h |= Na, h |= fo;
          case Tc:
            return t = l, r = h, typeof t.id != "string" && console.error(
            ), e = M(12, t, e, r | ga), e.elementType = Tc, e.lanes = g, e.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, e;
          case _c:
            return e = M(13, l, e, h), e.elementType = _c, e.lanes = g, e;
          case Po:
            return e = M(19, l, e, h), e.elementType = Po, e.lanes = g, e;
                case bp:
                case gl:
                  T = 10;
                case zh:
                  T = 9;
                case lo:
                  T = 11, x = Xm(x);
                case sf:
                  T = 14;
                case $a:
                  T = 16, x = null;
            x = "", (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), t === null ? l = "null" : Kt(t) ? l = "array" : t !== void 0 && t.$$typeof === Fo ? (l = "<" + (pt(t.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : l = typeof t, (T = r ? Ot(r) : null) && (x += `
Check the render method of \`` + T + "`."), T = 29, l = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (l + "." + x)
            ), x = null;
      return e = M(T, l, e, h), e.elementType = t, e.type = x, e.lanes = g, e._debugOwner = r, e;
    function gr(t, e, l) {
      return e = pd(
        l
    function Mo(t, e, l, r) {
      return t = M(7, t, r, e), t.lanes = l, t;
    function Do(t, e, l) {
      return t = M(6, t, null, e), t.lanes = l, t;
    function Km(t, e, l) {
      return e = M(
      ), e.lanes = l, e.stateNode = {
    function Cu(t, e) {
      Dl(), Ph[Ih++] = ob, Ph[Ih++] = ib, ib = t, ob = e;
    }
    function h0(t, e, l) {
      Dl(), Di[Ai++] = ms, Di[Ai++] = gs, Di[Ai++] = Tf, Tf = t;
      var r = ms;
      t = gs;
      var h = 32 - aa(r) - 1;
      r &= ~(1 << h), l += 1;
      var g = 32 - aa(e) + h;
      if (30 < g) {
        var T = h - h % 5;
        g = (r & (1 << T) - 1).toString(32), r >>= T, h -= T, ms = 1 << 32 - aa(e) + h | l << h | r, gs = g + t;
        ms = 1 << g | l << h | r, gs = t;
    function yd(t) {
      Dl(), t.return !== null && (Cu(t, 1), h0(t, 1, 0));
    function bd(t) {
      for (; t === ib; )
        ib = Ph[--Ih], Ph[Ih] = null, ob = Ph[--Ih], Ph[Ih] = null;
      for (; t === Tf; )
        Tf = Di[--Ai], Di[Ai] = null, gs = Di[--Ai], Di[Ai] = null, ms = Di[--Ai], Di[Ai] = null;
    function Dl() {
      Ee || console.error(
    function Al(t, e) {
        if (Ri === null)
          Ri = {
          if (Ri.fiber !== t)
          Ri.distanceFromLeaf > e && (Ri.distanceFromLeaf = e);
        return Ri;
      var l = Al(
      return 0 < l.length && l[l.length - 1].fiber === t ? (l = l[l.length - 1], l.distanceFromLeaf > e && (l.distanceFromLeaf = e), l) : (e = {
      }, l.push(e), e);
    function $m(t, e) {
      ps || (t = Al(t, 0), t.serverProps = null, e !== null && (e = Th(e), t.serverTail.push(e)));
    function Wl(t) {
      var e = "", l = Ri;
      throw l !== null && (Ri = null, e = or(l)), js(
        qa(
      ), Pv;
    function Jm(t) {
      var e = t.stateNode, l = t.type, r = t.memoizedProps;
      switch (e[la] = t, e[Ha] = r, pi(l, r), l) {
          ce("cancel", e), ce("close", e);
          ce("load", e);
          for (l = 0; l < fy.length; l++)
            ce(fy[l], e);
          ce("error", e);
          ce("error", e), ce("load", e);
          ce("toggle", e);
          Ht("input", r), ce("invalid", e), To(e, r), Py(
            r.value,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name,
          ), Li(e);
          wm(e, r);
          Ht("select", r), ce("invalid", e), lr(e, r);
          Ht("textarea", r), ce("invalid", e), Kl(e, r), zm(
            r.value,
            r.defaultValue,
            r.children
          ), Li(e);
      l = r.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || r.suppressHydrationWarning === !0 || Fg(e.textContent, l) ? (r.popover != null && (ce("beforetoggle", e), ce("toggle", e)), r.onScroll != null && ce("scroll", e), r.onScrollEnd != null && ce("scrollend", e), r.onClick != null && (e.onclick = to), e = !0) : e = !1, e || Wl(t);
    function Wm(t) {
      for (Fa = t.return; Fa; )
        switch (Fa.tag) {
            ou = !1;
            ou = !0;
            Fa = Fa.return;
    function Hu(t) {
      if (t !== Fa) return !1;
      if (!Ee)
        return Wm(t), Ee = !0, !1;
      var e = t.tag, l;
      if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || yi(t.type, t.memoizedProps)), l = !l), l && dn) {
        for (l = dn; l; ) {
          var r = Al(t, 0), h = Th(l);
          r.serverTail.push(h), l = h.type === "Suspense" ? ip(l) : Kn(l.nextSibling);
        }
        Wl(t);
      }
      if (Wm(t), e === 13) {
        dn = ip(t);
        e === 27 ? (e = dn, bi(t.type) ? (t = Y1, Y1 = null, dn = t) : dn = e) : dn = Fa ? Kn(t.stateNode.nextSibling) : null;
    function Uu() {
      dn = Fa = null, ps = Ee = !1;
    function Fm() {
      var t = _f;
      return t !== null && (tl === null ? tl = t : tl.push.apply(
        tl,
      ), _f = null), t;
    function js(t) {
      _f === null ? _f = [t] : _f.push(t);
    function Pm() {
      var t = Ri;
        Ri = null;
        for (var e = or(t); 0 < t.children.length; )
        Rt(t.fiber, function() {
    function vd() {
      tm = ub = null, em = !1;
    function Ao(t, e, l) {
      Dt(Iv, e._currentValue, t), e._currentValue = l, Dt(t1, e._currentRenderer, t), e._currentRenderer !== void 0 && e._currentRenderer !== null && e._currentRenderer !== nT && console.error(
      ), e._currentRenderer = nT;
    function Gi(t, e) {
      t._currentValue = Iv.current;
      var l = t1.current;
      xt(t1, e), t._currentRenderer = l, xt(Iv, e);
    function Im(t, e, l) {
        var r = t.alternate;
        if ((t.childLanes & e) !== e ? (t.childLanes |= e, r !== null && (r.childLanes |= e)) : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e), t === l) break;
      t !== l && console.error(
    function tg(t, e, l, r) {
      var h = t.child;
      for (h !== null && (h.return = t); h !== null; ) {
        var g = h.dependencies;
        if (g !== null) {
          var T = h.child;
          g = g.firstContext;
          t: for (; g !== null; ) {
            var x = g;
            g = h;
            for (var w = 0; w < e.length; w++)
              if (x.context === e[w]) {
                g.lanes |= l, x = g.alternate, x !== null && (x.lanes |= l), Im(
                  g.return,
                  l,
                ), r || (T = null);
            g = x.next;
        } else if (h.tag === 18) {
          if (T = h.return, T === null)
          T.lanes |= l, g = T.alternate, g !== null && (g.lanes |= l), Im(
            T,
            l,
          ), T = null;
        } else T = h.child;
        if (T !== null) T.return = h;
          for (T = h; T !== null; ) {
            if (T === t) {
              T = null;
            if (h = T.sibling, h !== null) {
              h.return = T.return, T = h;
            T = T.return;
        h = T;
    function Gn(t, e, l, r) {
      for (var h = e, g = !1; h !== null; ) {
        if (!g) {
          if ((h.flags & 524288) !== 0) g = !0;
          else if ((h.flags & 262144) !== 0) break;
        }
        if (h.tag === 10) {
          var T = h.alternate;
          if (T === null)
          if (T = T.memoizedProps, T !== null) {
            var x = h.type;
            Wa(h.pendingProps.value, T.value) || (t !== null ? t.push(x) : t = [x]);
        } else if (h === Ec.current) {
          if (T = h.alternate, T === null)
          T.memoizedState.memoizedState !== h.memoizedState.memoizedState && (t !== null ? t.push(gy) : t = [gy]);
        h = h.return;
      t !== null && tg(
        l,
        r
    function Ro(t) {
        if (!Wa(
    function wo(t) {
      ub = t, tm = null, t = t.dependencies, t !== null && (t.firstContext = null);
    function Ye(t) {
      return em && console.error(
      ), eg(ub, t);
    function pr(t, e) {
      return ub === null && wo(t), eg(t, e);
    function eg(t, e) {
      var l = e._currentValue;
      if (e = { context: e, memoizedValue: l, next: null }, tm === null) {
        tm = e, t.dependencies = {
      } else tm = tm.next = e;
      return l;
    function yr() {
        controller: new IE(),
    function Nu(t) {
    function Fl(t) {
      ), t.refCount === 0 && tO(eO, function() {
    function Rl() {
      var t = xf;
      return xf = 0, t;
    function zo(t) {
      var e = xf;
      return xf = t, e;
    function ku(t) {
      var e = xf;
      return xf += t, e;
    function Sd(t) {
      bl = nm(), 0 > t.actualStartTime && (t.actualStartTime = bl);
    function Xi(t) {
      if (0 <= bl) {
        var e = nm() - bl;
        t.actualDuration += e, t.selfBaseDuration = e, bl = -1;
    function Bu(t) {
      if (0 <= bl) {
        var e = nm() - bl;
        t.actualDuration += e, bl = -1;
    function al() {
      if (0 <= bl) {
        var t = nm() - bl;
        bl = -1, xf += t;
    function wl() {
      bl = nm();
    function Pl(t) {
    function m0(t, e) {
      if (Vp === null) {
        var l = Vp = [];
        e1 = 0, Ef = Zg(), am = {
          then: function(r) {
            l.push(r);
      return e1++, e.then(ng, ng), e;
    function ng() {
      if (--e1 === 0 && Vp !== null) {
        am !== null && (am.status = "fulfilled");
        var t = Vp;
        Vp = null, Ef = 0, am = null;
    function g0(t, e) {
      var l = [], r = {
        then: function(h) {
          l.push(h);
          r.status = "fulfilled", r.value = e;
          for (var h = 0; h < l.length; h++) (0, l[h])(e);
        function(h) {
          for (r.status = "rejected", r.reason = h, h = 0; h < l.length; h++)
            (0, l[h])(void 0);
      ), r;
    function ag() {
      var t = Of.current;
      return t !== null ? t : je.pooledCache;
    function Td(t, e) {
      e === null ? Dt(Of, Of.current, t) : Dt(Of, e.pool, t);
    function p0() {
      var t = ag();
      return t === null ? null : { parent: Wn._currentValue, pool: t };
    function lg() {
    function ig(t) {
    function qs() {
    function ll(t, e, l) {
      I.actQueue !== null && (I.didUsePromise = !0);
      var r = t.thenables;
      switch (l = r[l], l === void 0 ? r.push(e) : l !== e && (t.didWarnAboutUncachedPromise || (t.didWarnAboutUncachedPromise = !0, console.error(
      )), e.then(qs, qs), e = l), e.status) {
          throw t = e.reason, Va(t), t;
            e.then(qs, qs);
            if (t = je, t !== null && 100 < t.shellSuspendCounter)
              function(h) {
                  var g = e;
                  g.status = "fulfilled", g.value = h;
              function(h) {
                  var g = e;
                  g.status = "rejected", g.reason = h;
              throw t = e.reason, Va(t), t;
          throw Wp = e, hb = !0, Jp;
    function og() {
      if (Wp === null)
      var t = Wp;
      return Wp = null, hb = !1, t;
    function Va(t) {
      if (t === Jp || t === db)
    function _a(t) {
    function Co(t, e) {
    function Il(t) {
        tag: uT,
    function zl(t, e, l) {
      var r = t.updateQueue;
      if (r === null) return null;
      if (r = r.shared, l1 === r && !rT) {
        var h = ht(t);
          h
        ), rT = !0;
      return (we & Ia) !== ql ? (h = r.pending, h === null ? e.next = e : (e.next = h.next, h.next = e), r.pending = e, e = gd(t), r0(t, null, l), e) : (md(t, r, e, l), gd(t));
    function Ho(t, e, l) {
      if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
        var r = e.lanes;
        r &= t.pendingLanes, l |= r, e.lanes = l, So(t, l);
    function Vs(t, e) {
      var l = t.updateQueue, r = t.alternate;
      if (r !== null && (r = r.updateQueue, l === r)) {
        var h = null, g = null;
        if (l = l.firstBaseUpdate, l !== null) {
            var T = {
              lane: l.lane,
              tag: l.tag,
              payload: l.payload,
            g === null ? h = g = T : g = g.next = T, l = l.next;
          } while (l !== null);
          g === null ? h = g = e : g = g.next = e;
        } else h = g = e;
        l = {
          baseState: r.baseState,
          firstBaseUpdate: h,
          lastBaseUpdate: g,
          shared: r.shared,
          callbacks: r.callbacks
        }, t.updateQueue = l;
      t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
    function ti() {
      if (i1) {
        var t = am;
    function Gs(t, e, l, r) {
      i1 = !1;
      var h = t.updateQueue;
      Uc = !1, l1 = h.shared;
      var g = h.firstBaseUpdate, T = h.lastBaseUpdate, x = h.shared.pending;
      if (x !== null) {
        h.shared.pending = null;
        var w = x, C = w.next;
        w.next = null, T === null ? g = C : T.next = C, T = w;
        var F = t.alternate;
        F !== null && (F = F.updateQueue, x = F.lastBaseUpdate, x !== T && (x === null ? F.firstBaseUpdate = C : x.next = C, F.lastBaseUpdate = w));
      }
      if (g !== null) {
        var et = h.baseState;
        T = 0, F = C = w = null, x = g;
          var J = x.lane & -536870913, lt = J !== x.lane;
          if (lt ? (me & J) === J : (r & J) === J) {
            J !== 0 && J === Ef && (i1 = !0), F !== null && (F = F.next = {
              tag: x.tag,
              payload: x.payload,
              J = t;
              var wt = x, Xt = e, qe = l;
              switch (wt.tag) {
                case sT:
                  if (wt = wt.payload, typeof wt == "function") {
                    em = !0;
                    var ye = wt.call(
                      qe,
                      et,
                      Xt
                    if (J.mode & Na) {
                      vt(!0);
                        wt.call(qe, et, Xt);
                        vt(!1);
                    em = !1, et = ye;
                  et = wt;
                case a1:
                  J.flags = J.flags & -65537 | 128;
                case uT:
                  if (ye = wt.payload, typeof ye == "function") {
                    if (em = !0, wt = ye.call(
                      qe,
                      et,
                      Xt
                    ), J.mode & Na) {
                      vt(!0);
                        ye.call(qe, et, Xt);
                        vt(!1);
                    em = !1;
                  } else wt = ye;
                  if (wt == null) break t;
                  et = le({}, et, wt);
                case cT:
                  Uc = !0;
            J = x.callback, J !== null && (t.flags |= 64, lt && (t.flags |= 8192), lt = h.callbacks, lt === null ? h.callbacks = [J] : lt.push(J));
            lt = {
              lane: J,
              tag: x.tag,
              payload: x.payload,
              callback: x.callback,
            }, F === null ? (C = F = lt, w = et) : F = F.next = lt, T |= J;
          if (x = x.next, x === null) {
            if (x = h.shared.pending, x === null)
            lt = x, x = lt.next, lt.next = null, h.lastBaseUpdate = lt, h.shared.pending = null;
        F === null && (w = et), h.baseState = w, h.firstBaseUpdate = C, h.lastBaseUpdate = F, g === null && (h.shared.lanes = 0), Lc |= T, t.lanes = T, t.memoizedState = et;
      l1 = null;
    function br(t, e) {
    function Xs(t, e) {
      var l = t.shared.hiddenCallbacks;
      if (l !== null)
        for (t.shared.hiddenCallbacks = null, t = 0; t < l.length; t++)
          br(l[t], e);
    }
    function y0(t, e) {
      var l = t.callbacks;
      if (l !== null)
        for (t.callbacks = null, t = 0; t < l.length; t++)
          br(l[t], e);
    }
    function xa(t, e) {
      var l = cu;
      Dt(mb, l, t), Dt(lm, e, t), cu = l | e.baseLanes;
    }
    function vr(t) {
      Dt(mb, cu, t), Dt(
        lm,
        lm.current,
    function Cl(t) {
      cu = mb.current, xt(lm, t), xt(mb, t);
    }
    function ie() {
      var t = tt;
      Ci === null ? Ci = [t] : Ci.push(t);
    }
    function mt() {
      var t = tt;
      if (Ci !== null && (bs++, Ci[bs] !== t)) {
        var e = ht($t);
        if (!fT.has(e) && (fT.add(e), Ci !== null)) {
          for (var l = "", r = 0; r <= bs; r++) {
            var h = Ci[r], g = r === bs ? t : h;
            for (h = r + 1 + ". " + h; 30 > h.length; )
              h += " ";
            h += g + `
`, l += h;
            l
    function il(t) {
      t == null || Kt(t) || console.error(
        tt,
    function Qs() {
      var t = ht($t);
      hT.has(t) || (hT.add(t), console.error(
    function $e() {
    function Uo(t, e) {
      if (Pp) return !1;
          tt
        tt,
      for (var l = 0; l < e.length && l < t.length; l++)
        if (!Wa(t[l], e[l])) return !1;
    function No(t, e, l, r, h, g) {
      Nc = g, $t = e, Ci = t !== null ? t._debugHookTypes : null, bs = -1, Pp = t !== null && t.type !== e.type, (Object.prototype.toString.call(l) === "[object AsyncFunction]" || Object.prototype.toString.call(l) === "[object AsyncGeneratorFunction]") && (g = ht($t), o1.has(g) || (o1.add(g), console.error(
        g === null ? "An unknown Component" : "<" + g + ">"
      ))), e.memoizedState = null, e.updateQueue = null, e.lanes = 0, I.H = t !== null && t.memoizedState !== null ? s1 : Ci !== null ? mT : u1, Df = g = (e.mode & Na) !== Ze;
      var T = c1(l, r, h);
      if (Df = !1, om && (T = Zs(
        l,
        r,
        h
      )), g) {
        vt(!0);
          T = Zs(
            l,
            r,
            h
          vt(!1);
      return Sr(t, e), T;
    function Sr(t, e) {
      e._debugHookTypes = Ci, e.dependencies === null ? ys !== null && (e.dependencies = {
        _debugThenableState: ys
      }) : e.dependencies._debugThenableState = ys, I.H = yb;
      var l = Le !== null && Le.next !== null;
      if (Nc = 0, Ci = tt = Nn = Le = $t = null, bs = -1, t !== null && (t.flags & 65011712) !== (e.flags & 65011712) && console.error(
      ), gb = !1, Fp = 0, ys = null, l)
      t === null || ia || (t = t.dependencies, t !== null && Ro(t) && (ia = !0)), hb ? (hb = !1, t = !0) : t = !1, t && (e = ht(e) || "Unknown", dT.has(e) || o1.has(e) || (dT.add(e), console.error(
    function Zs(t, e, l, r) {
      $t = t;
      var h = 0;
        if (om && (ys = null), Fp = 0, om = !1, h >= aO)
        if (h += 1, Pp = !1, Nn = Le = null, t.updateQueue != null) {
          var g = t.updateQueue;
          g.lastEffect = null, g.events = null, g.stores = null, g.memoCache != null && (g.memoCache.index = 0);
        bs = -1, I.H = gT, g = c1(e, l, r);
      } while (om);
      return g;
    function ol() {
      var t = I.H, e = t.useState()[0];
      return e = typeof e.then == "function" ? Lu(e) : e, t = t.useState()[0], (Le !== null ? Le.memoizedState : null) !== t && ($t.flags |= 1024), e;
    function Ea() {
      var t = pb !== 0;
      return pb = 0, t;
    function Qi(t, e, l) {
      e.updateQueue = t.updateQueue, e.flags = (e.mode & fo) !== Ze ? e.flags & -402655237 : e.flags & -2053, t.lanes &= ~l;
    function Hl(t) {
      if (gb) {
        gb = !1;
      Nc = 0, Ci = Nn = Le = $t = null, bs = -1, tt = null, om = !1, Fp = pb = 0, ys = null;
    function Pe() {
      return Nn === null ? $t.memoizedState = Nn = t : Nn = Nn.next = t, Nn;
    function pe() {
      if (Le === null) {
        var t = $t.alternate;
      } else t = Le.next;
      var e = Nn === null ? $t.memoizedState : Nn.next;
        Nn = e, Le = t;
          throw $t.alternate === null ? Error(
        Le = t, t = {
          memoizedState: Le.memoizedState,
          baseState: Le.baseState,
          baseQueue: Le.baseQueue,
          queue: Le.queue,
        }, Nn === null ? $t.memoizedState = Nn = t : Nn = Nn.next = t;
      return Nn;
    function _d() {
    function Lu(t) {
      var e = Fp;
      return Fp += 1, ys === null && (ys = lg()), t = ll(ys, t, e), e = $t, (Nn === null ? e.memoizedState : Nn.next) === null && (e = e.alternate, I.H = e !== null && e.memoizedState !== null ? s1 : u1), t;
    function ei(t) {
        if (typeof t.then == "function") return Lu(t);
        if (t.$$typeof === gl) return Ye(t);
    function un(t) {
      var e = null, l = $t.updateQueue;
      if (l !== null && (e = l.memoCache), e == null) {
        var r = $t.alternate;
        r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (e = {
          data: r.data.map(function(h) {
            return h.slice();
      if (e == null && (e = { data: [], index: 0 }), l === null && (l = _d(), $t.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0 || Pp)
        for (l = e.data[e.index] = Array(t), r = 0; r < t; r++)
          l[r] = Z0;
        l.length !== t && console.error(
          l.length,
      return e.index++, l;
    function Te(t, e) {
    function ve(t, e, l) {
      var r = Pe();
      if (l !== void 0) {
        var h = l(e);
        if (Df) {
          vt(!0);
            l(e);
            vt(!1);
      } else h = e;
      return r.memoizedState = r.baseState = h, t = {
        lastRenderedState: h
      }, r.queue = t, t = t.dispatch = gg.bind(
        $t,
      ), [r.memoizedState, t];
    function ul(t) {
      var e = pe();
      return sl(e, Le, t);
    function sl(t, e, l) {
      var r = t.queue;
      if (r === null)
      r.lastRenderedReducer = l;
      var h = t.baseQueue, g = r.pending;
      if (g !== null) {
        if (h !== null) {
          var T = h.next;
          h.next = g.next, g.next = T;
        }
        e.baseQueue !== h && console.error(
        ), e.baseQueue = h = g, r.pending = null;
      if (g = t.baseState, h === null) t.memoizedState = g;
        e = h.next;
        var x = T = null, w = null, C = e, F = !1;
          var et = C.lane & -536870913;
          if (et !== C.lane ? (me & et) === et : (Nc & et) === et) {
            var J = C.revertLane;
            if (J === 0)
              w !== null && (w = w.next = {
                action: C.action,
                hasEagerState: C.hasEagerState,
                eagerState: C.eagerState,
              }), et === Ef && (F = !0);
            else if ((Nc & J) === J) {
              C = C.next, J === Ef && (F = !0);
              et = {
                revertLane: C.revertLane,
                action: C.action,
                hasEagerState: C.hasEagerState,
                eagerState: C.eagerState,
              }, w === null ? (x = w = et, T = g) : w = w.next = et, $t.lanes |= J, Lc |= J;
            et = C.action, Df && l(g, et), g = C.hasEagerState ? C.eagerState : l(g, et);
            J = {
              lane: et,
              revertLane: C.revertLane,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
            }, w === null ? (x = w = J, T = g) : w = w.next = J, $t.lanes |= et, Lc |= et;
          C = C.next;
        } while (C !== null && C !== e);
        if (w === null ? T = g : w.next = x, !Wa(g, t.memoizedState) && (ia = !0, F && (l = am, l !== null)))
          throw l;
        t.memoizedState = g, t.baseState = T, t.baseQueue = w, r.lastRenderedState = g;
      }
      return h === null && (r.lanes = 0), [t.memoizedState, r.dispatch];
    }
    function Yu(t) {
      var e = pe(), l = e.queue;
      if (l === null)
      l.lastRenderedReducer = t;
      var r = l.dispatch, h = l.pending, g = e.memoizedState;
      if (h !== null) {
        l.pending = null;
        var T = h = h.next;
          g = t(g, T.action), T = T.next;
        while (T !== h);
        Wa(g, e.memoizedState) || (ia = !0), e.memoizedState = g, e.baseQueue === null && (e.baseState = g), l.lastRenderedState = g;
      return [g, r];
    function Zi(t, e, l) {
      var r = $t, h = Pe();
      if (Ee) {
        if (l === void 0)
        var g = l();
        im || g === l() || (console.error(
        ), im = !0);
        if (g = e(), im || (l = e(), Wa(g, l) || (console.error(
        ), im = !0)), je === null)
        (me & 124) !== 0 || ug(r, e, g);
      return h.memoizedState = g, l = { value: g, getSnapshot: e }, h.queue = l, Od(
        $s.bind(null, r, l, t),
      ), r.flags |= 2048, ai(
        zi | Fn,
        Bo(),
        Ks.bind(
          r,
          l,
          g,
      ), g;
    function Tr(t, e, l) {
      var r = $t, h = pe(), g = Ee;
      if (g) {
        if (l === void 0)
        l = l();
      } else if (l = e(), !im) {
        var T = e();
        Wa(l, T) || (console.error(
        ), im = !0);
      (T = !Wa(
        (Le || h).memoizedState,
        l
      )) && (h.memoizedState = l, ia = !0), h = h.queue;
      var x = $s.bind(null, r, h, t);
      if (Sn(2048, Fn, x, [t]), h.getSnapshot !== e || T || Nn !== null && Nn.memoizedState.tag & zi) {
        if (r.flags |= 2048, ai(
          zi | Fn,
          Bo(),
          Ks.bind(
            r,
            h,
            l,
        ), je === null)
        g || (Nc & 124) !== 0 || ug(r, e, l);
      return l;
    function ug(t, e, l) {
      t.flags |= 16384, t = { getSnapshot: e, value: l }, e = $t.updateQueue, e === null ? (e = _d(), $t.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
    function Ks(t, e, l, r) {
      e.value = l, e.getSnapshot = r, sg(e) && Js(t);
    function $s(t, e, l) {
      return l(function() {
        sg(e) && Js(t);
    function sg(t) {
        var l = e();
        return !Wa(t, l);
    function Js(t) {
      var e = Ta(t, 2);
      e !== null && tn(e, t, 2);
    function _r(t) {
      var e = Pe();
        var l = t;
        if (t = l(), Df) {
          vt(!0);
            l();
            vt(!1);
        lastRenderedReducer: Te,
    function Ki(t) {
      t = _r(t);
      var e = t.queue, l = Is.bind(null, $t, e);
      return e.dispatch = l, [t.memoizedState, l];
    function Ul(t) {
      var e = Pe();
      var l = {
      return e.queue = l, e = Ud.bind(
        $t,
        l
      ), l.dispatch = e, [t, e];
    function $i(t, e) {
      var l = pe();
      return ni(l, Le, t, e);
    function ni(t, e, l, r) {
      return t.baseState = l, sl(
        Le,
        typeof r == "function" ? r : Te
    function xd(t, e) {
      var l = pe();
      return Le !== null ? ni(l, Le, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    function cg(t, e, l, r, h) {
      if (Rr(t))
        var g = {
          payload: h,
          then: function(T) {
            g.listeners.push(T);
        I.T !== null ? l(!0) : g.isTransition = !1, r(g), l = e.pending, l === null ? (g.next = e.pending = g, Ws(e, g)) : (g.next = l.next, e.pending = l.next = g);
    function Ws(t, e) {
      var l = e.action, r = e.payload, h = t.state;
        var g = I.T, T = {};
        I.T = T, I.T._updatedFibers = /* @__PURE__ */ new Set();
          var x = l(h, r), w = I.S;
          w !== null && w(T, x), xr(t, e, x);
        } catch (C) {
          wn(t, e, C);
          I.T = g, g === null && T._updatedFibers && (t = T._updatedFibers.size, T._updatedFibers.clear(), 10 < t && console.warn(
          T = l(h, r), xr(t, e, T);
        } catch (C) {
          wn(t, e, C);
    function xr(t, e, l) {
      l !== null && typeof l == "object" && typeof l.then == "function" ? (l.then(
        function(r) {
          ko(t, e, r);
        function(r) {
          return wn(t, e, r);
      )) : ko(t, e, l);
    function ko(t, e, l) {
      e.status = "fulfilled", e.value = l, Er(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Ws(t, l)));
    function wn(t, e, l) {
      var r = t.pending;
      if (t.pending = null, r !== null) {
        r = r.next;
          e.status = "rejected", e.reason = l, Er(e), e = e.next;
        while (e !== r);
    function Er(t) {
    function rg(t, e) {
    function Fs(t, e) {
      if (Ee) {
        var l = je.formState;
        if (l !== null) {
            var r = $t;
            if (Ee) {
              if (dn) {
                  for (var h = dn, g = ou; h.nodeType !== 8; ) {
                    if (!g) {
                      h = null;
                    if (h = Kn(
                      h.nextSibling
                    ), h === null) {
                      h = null;
                  g = h.data, h = g === N1 || g === h_ ? h : null;
                if (h) {
                  dn = Kn(
                    h.nextSibling
                  ), r = h.data === N1;
              Wl(r);
            r = !1;
          r && (e = l[0]);
      return l = Pe(), l.memoizedState = l.baseState = e, r = {
        lastRenderedReducer: rg,
      }, l.queue = r, l = Is.bind(
        $t,
        r
      ), r.dispatch = l, r = _r(!1), g = Ud.bind(
        $t,
        r.queue
      ), r = Pe(), h = {
      }, r.queue = h, l = cg.bind(
        $t,
        h,
        g,
        l
      ), h.dispatch = l, r.memoizedState = t, [e, l, !1];
    function Ed(t) {
      var e = pe();
      return b0(e, Le, t);
    function b0(t, e, l) {
      if (e = sl(
        rg
      )[0], t = ul(Te)[0], typeof e == "object" && e !== null && typeof e.then == "function")
          var r = Lu(e);
        } catch (T) {
          throw T === Jp ? db : T;
        }
      else r = e;
      e = pe();
      var h = e.queue, g = h.dispatch;
      return l !== e.memoizedState && ($t.flags |= 2048, ai(
        zi | Fn,
        Bo(),
        vn.bind(null, h, l),
      )), [r, g, t];
    function vn(t, e) {
    function Ps(t) {
      var e = pe(), l = Le;
      if (l !== null)
        return b0(e, l, t);
      pe(), e = e.memoizedState, l = pe();
      var r = l.queue.dispatch;
      return l.memoizedState = t, [e, r, !1];
    function ai(t, e, l, r) {
        create: l,
        deps: r,
      }, e = $t.updateQueue, e === null && (e = _d(), $t.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (r = l.next, l.next = t, t.next = r, e.lastEffect = t), t;
    function Bo() {
    function Or(t) {
      var e = Pe();
    function cl(t, e, l, r) {
      var h = Pe();
      r = r === void 0 ? null : r, $t.flags |= t, h.memoizedState = ai(
        zi | e,
        Bo(),
        l,
        r
    function Sn(t, e, l, r) {
      var h = pe();
      r = r === void 0 ? null : r;
      var g = h.memoizedState.inst;
      Le !== null && r !== null && Uo(r, Le.memoizedState.deps) ? h.memoizedState = ai(e, g, l, r) : ($t.flags |= t, h.memoizedState = ai(
        zi | e,
        g,
        l,
        r
    function Od(t, e) {
      ($t.mode & fo) !== Ze && ($t.mode & FS) === Ze ? cl(276826112, Fn, t, e) : cl(8390656, Fn, t, e);
    function Md(t, e) {
      var l = 4194308;
      return ($t.mode & fo) !== Ze && (l |= 134217728), cl(l, pa, t, e);
    function v0(t, e) {
        var l = e(t);
          typeof l == "function" ? l() : e(null);
    function Dd(t, e, l) {
      ), l = l != null ? l.concat([t]) : null;
      var r = 4194308;
      ($t.mode & fo) !== Ze && (r |= 134217728), cl(
        r,
        pa,
        v0.bind(null, e, t),
        l
    function li(t, e, l) {
      ), l = l != null ? l.concat([t]) : null, Sn(
        pa,
        v0.bind(null, e, t),
        l
    function Mr(t, e) {
      return Pe().memoizedState = [
    function ju(t, e) {
      var l = pe();
      var r = l.memoizedState;
      return e !== null && Uo(e, r[1]) ? r[0] : (l.memoizedState = [t, e], t);
    function Ad(t, e) {
      var l = Pe();
      var r = t();
      if (Df) {
        vt(!0);
          vt(!1);
      return l.memoizedState = [r, e], r;
    function Lo(t, e) {
      var l = pe();
      var r = l.memoizedState;
      if (e !== null && Uo(e, r[1]))
        return r[0];
      if (r = t(), Df) {
        vt(!0);
          vt(!1);
      return l.memoizedState = [r, e], r;
    function Rd(t, e) {
      var l = Pe();
      return zd(l, t, e);
    function Dr(t, e) {
      var l = pe();
      return Ar(
        l,
        Le.memoizedState,
    function wd(t, e) {
      var l = pe();
      return Le === null ? zd(l, t, e) : Ar(
        l,
        Le.memoizedState,
    function zd(t, e, l) {
      return l === void 0 || (Nc & 1073741824) !== 0 ? t.memoizedState = e : (t.memoizedState = l, t = R0(), $t.lanes |= t, Lc |= t, l);
    function Ar(t, e, l, r) {
      return Wa(l, e) ? l : lm.current !== null ? (t = zd(t, l, r), Wa(t, e) || (ia = !0), t) : (Nc & 42) === 0 ? (ia = !0, t.memoizedState = l) : (t = R0(), $t.lanes |= t, Lc |= t, e);
    function fg(t, e, l, r, h) {
      var g = Gt.p;
      Gt.p = g !== 0 && g < jl ? g : jl;
      var T = I.T, x = {};
      I.T = x, Ud(t, !1, e, l), x._updatedFibers = /* @__PURE__ */ new Set();
        var w = h(), C = I.S;
        if (C !== null && C(x, w), w !== null && typeof w == "object" && typeof w.then == "function") {
          var F = g0(
            w,
            r
          Ji(
            F,
            Aa(t)
          Ji(
            r,
            Aa(t)
      } catch (et) {
        Ji(
          }, status: "rejected", reason: et },
          Aa(t)
        Gt.p = g, I.T = T, T === null && x._updatedFibers && (t = x._updatedFibers.size, x._updatedFibers.clear(), 10 < t && console.warn(
    function qu(t, e, l, r) {
      var h = dg(t).queue;
      fg(
        h,
        Lf,
        l === null ? E : function() {
          return hg(t), l(r);
    function dg(t) {
        memoizedState: Lf,
        baseState: Lf,
          lastRenderedReducer: Te,
          lastRenderedState: Lf
      var l = {};
        memoizedState: l,
        baseState: l,
          lastRenderedReducer: Te,
          lastRenderedState: l
    function hg(t) {
      I.T === null && console.error(
      var e = dg(t).next.queue;
      Ji(
        Aa(t)
    function ii() {
      var t = _r(!1);
      return t = fg.bind(
        $t,
      ), Pe().memoizedState = t, [!1, t];
    function Cd() {
      var t = ul(Te)[0], e = pe().memoizedState;
        typeof t == "boolean" ? t : Lu(t),
    function Hd() {
      var t = Yu(Te)[0], e = pe().memoizedState;
        typeof t == "boolean" ? t : Lu(t),
      return Ye(gy);
    function oi() {
      var t = Pe(), e = je.identifierPrefix;
      if (Ee) {
        var l = gs, r = ms;
        l = (r & ~(1 << 32 - aa(r) - 1)).toString(32) + l, e = "«" + e + "R" + l, l = pb++, 0 < l && (e += "H" + l.toString(32)), e += "»";
        l = nO++, e = "«" + e + "r" + l.toString(32) + "»";
    function Vu() {
      return Pe().memoizedState = mg.bind(
        $t
    function mg(t, e) {
      for (var l = t.return; l !== null; ) {
        switch (l.tag) {
            var r = Aa(l);
            t = Il(r);
            var h = zl(l, t, r);
            h !== null && (tn(h, l, r), Ho(h, l, r)), l = yr(), e != null && h !== null && console.error(
            ), t.payload = { cache: l };
        l = l.return;
    function gg(t, e, l) {
      var r = arguments;
      typeof r[3] == "function" && console.error(
      ), r = Aa(t);
      var h = {
        lane: r,
        action: l,
      Rr(t) ? Gu(e, h) : (h = Gm(t, e, h, r), h !== null && (tn(h, t, r), wr(h, e, r))), Ql(t, r);
    function Is(t, e, l) {
      var r = arguments;
      typeof r[3] == "function" && console.error(
      ), r = Aa(t), Ji(t, e, l, r), Ql(t, r);
    function Ji(t, e, l, r) {
      var h = {
        lane: r,
        action: l,
      if (Rr(t)) Gu(e, h);
        var g = t.alternate;
        if (t.lanes === 0 && (g === null || g.lanes === 0) && (g = e.lastRenderedReducer, g !== null)) {
          var T = I.H;
          I.H = mo;
            var x = e.lastRenderedState, w = g(x, l);
            if (h.hasEagerState = !0, h.eagerState = w, Wa(w, x))
              return md(t, e, h, 0), je === null && dr(), !1;
            I.H = T;
        if (l = Gm(t, e, h, r), l !== null)
          return tn(l, t, r), wr(l, e, r), !0;
    function Ud(t, e, l, r) {
      if (I.T === null && Ef === 0 && console.error(
      ), r = {
        revertLane: Zg(),
        action: r,
      }, Rr(t)) {
        e = Gm(
          l,
          r,
        ), e !== null && tn(e, t, 2);
      Ql(t, 2);
    function Rr(t) {
      return t === $t || e !== null && e === $t;
    function Gu(t, e) {
      om = gb = !0;
      var l = t.pending;
      l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
    function wr(t, e, l) {
      if ((l & 4194048) !== 0) {
        var r = e.lanes;
        r &= t.pendingLanes, l |= r, e.lanes = l, So(t, l);
    function zn(t) {
      var e = ue;
      return t != null && (ue = e === null ? t : e.concat(t)), e;
    }
    function tc(t, e, l) {
      for (var r = Object.keys(t.props), h = 0; h < r.length; h++) {
        var g = r[h];
        if (g !== "children" && g !== "key") {
          e === null && (e = gr(t, l.mode, 0), e._debugInfo = ue, e.return = l), Rt(
            function(T) {
                T
            g
    function ec(t) {
      var e = Ip;
      return Ip += 1, um === null && (um = lg()), ll(um, t, e);
    function rl(t, e) {
    function Ft(t, e) {
      throw e.$$typeof === uf ? Error(
    function Me(t, e) {
      var l = ht(t) || "Component";
      wT[l] || (wT[l] = !0, e = e.displayName || e.name || "Component", t.tag === 3 ? console.error(
        l,
        l
    function Je(t, e) {
      var l = ht(t) || "Component";
      zT[l] || (zT[l] = !0, e = String(e), t.tag === 3 ? console.error(
        l,
        l
    function zr(t) {
      function e(N, k) {
          var Y = N.deletions;
          Y === null ? (N.deletions = [k], N.flags |= 16) : Y.push(k);
      function l(N, k) {
        for (; k !== null; )
          e(N, k), k = k.sibling;
      function r(N) {
        for (var k = /* @__PURE__ */ new Map(); N !== null; )
          N.key !== null ? k.set(N.key, N) : k.set(N.index, N), N = N.sibling;
        return k;
      function h(N, k) {
        return N = Jl(N, k), N.index = 0, N.sibling = null, N;
      function g(N, k, Y) {
        return N.index = Y, t ? (Y = N.alternate, Y !== null ? (Y = Y.index, Y < k ? (N.flags |= 67108866, k) : Y) : (N.flags |= 67108866, k)) : (N.flags |= 1048576, k);
      function T(N) {
        return t && N.alternate === null && (N.flags |= 67108866), N;
      function x(N, k, Y, it) {
        return k === null || k.tag !== 6 ? (k = Do(
          Y,
          N.mode,
          it
        ), k.return = N, k._debugOwner = N, k._debugTask = N._debugTask, k._debugInfo = ue, k) : (k = h(k, Y), k.return = N, k._debugInfo = ue, k);
      function w(N, k, Y, it) {
        var Tt = Y.type;
        return Tt === Pt ? (k = F(
          N,
          k,
          Y.props.children,
          it,
          Y.key
        ), tc(Y, k, N), k) : k !== null && (k.elementType === Tt || f0(k, Y) || typeof Tt == "object" && Tt !== null && Tt.$$typeof === $a && kc(Tt) === k.type) ? (k = h(k, Y.props), rl(k, Y), k.return = N, k._debugOwner = Y._owner, k._debugInfo = ue, k) : (k = gr(Y, N.mode, it), rl(k, Y), k.return = N, k._debugInfo = ue, k);
      function C(N, k, Y, it) {
        return k === null || k.tag !== 4 || k.stateNode.containerInfo !== Y.containerInfo || k.stateNode.implementation !== Y.implementation ? (k = Km(Y, N.mode, it), k.return = N, k._debugInfo = ue, k) : (k = h(k, Y.children || []), k.return = N, k._debugInfo = ue, k);
      function F(N, k, Y, it, Tt) {
        return k === null || k.tag !== 7 ? (k = Mo(
          Y,
          N.mode,
          it,
          Tt
        ), k.return = N, k._debugOwner = N, k._debugTask = N._debugTask, k._debugInfo = ue, k) : (k = h(k, Y), k.return = N, k._debugInfo = ue, k);
      }
      function et(N, k, Y) {
        if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
          return k = Do(
            "" + k,
            N.mode,
            Y
          ), k.return = N, k._debugOwner = N, k._debugTask = N._debugTask, k._debugInfo = ue, k;
        if (typeof k == "object" && k !== null) {
          switch (k.$$typeof) {
            case Fo:
              return Y = gr(
                k,
                N.mode,
                Y
              ), rl(Y, k), Y.return = N, N = zn(k._debugInfo), Y._debugInfo = ue, ue = N, Y;
            case ss:
              return k = Km(
                k,
                N.mode,
                Y
              ), k.return = N, k._debugInfo = ue, k;
            case $a:
              var it = zn(k._debugInfo);
              return k = kc(k), N = et(N, k, Y), ue = it, N;
          }
          if (Kt(k) || Mt(k))
            return Y = Mo(
              k,
              N.mode,
              Y,
            ), Y.return = N, Y._debugOwner = N, Y._debugTask = N._debugTask, N = zn(k._debugInfo), Y._debugInfo = ue, ue = N, Y;
          if (typeof k.then == "function")
            return it = zn(k._debugInfo), N = et(
              N,
              ec(k),
              Y
            ), ue = it, N;
          if (k.$$typeof === gl)
            return et(
              N,
              pr(N, k),
              Y
          Ft(N, k);
        }
        return typeof k == "function" && Me(N, k), typeof k == "symbol" && Je(N, k), null;
      }
      function J(N, k, Y, it) {
        var Tt = k !== null ? k.key : null;
        if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
          return Tt !== null ? null : x(N, k, "" + Y, it);
        if (typeof Y == "object" && Y !== null) {
          switch (Y.$$typeof) {
            case Fo:
              return Y.key === Tt ? (Tt = zn(Y._debugInfo), N = w(
                N,
                k,
                Y,
                it
              ), ue = Tt, N) : null;
            case ss:
              return Y.key === Tt ? C(N, k, Y, it) : null;
            case $a:
              return Tt = zn(Y._debugInfo), Y = kc(Y), N = J(
                N,
                k,
                Y,
                it
              ), ue = Tt, N;
          if (Kt(Y) || Mt(Y))
            return Tt !== null ? null : (Tt = zn(Y._debugInfo), N = F(
              N,
              k,
              Y,
              it,
            ), ue = Tt, N);
          if (typeof Y.then == "function")
            return Tt = zn(Y._debugInfo), N = J(
              N,
              k,
              ec(Y),
              it
            ), ue = Tt, N;
          if (Y.$$typeof === gl)
            return J(
              N,
              k,
              pr(N, Y),
              it
          Ft(N, Y);
        }
        return typeof Y == "function" && Me(N, Y), typeof Y == "symbol" && Je(N, Y), null;
      }
      function lt(N, k, Y, it, Tt) {
        if (typeof it == "string" && it !== "" || typeof it == "number" || typeof it == "bigint")
          return N = N.get(Y) || null, x(k, N, "" + it, Tt);
        if (typeof it == "object" && it !== null) {
          switch (it.$$typeof) {
            case Fo:
              return Y = N.get(
                it.key === null ? Y : it.key
              ) || null, N = zn(it._debugInfo), k = w(
                k,
                Y,
                it,
                Tt
              ), ue = N, k;
            case ss:
              return N = N.get(
                it.key === null ? Y : it.key
              ) || null, C(k, N, it, Tt);
            case $a:
              var It = zn(it._debugInfo);
              return it = kc(it), k = lt(
                N,
                k,
                Y,
                it,
                Tt
              ), ue = It, k;
          if (Kt(it) || Mt(it))
            return Y = N.get(Y) || null, N = zn(it._debugInfo), k = F(
              k,
              Y,
              it,
              Tt,
            ), ue = N, k;
          if (typeof it.then == "function")
            return It = zn(it._debugInfo), k = lt(
              N,
              k,
              Y,
              ec(it),
              Tt
            ), ue = It, k;
          if (it.$$typeof === gl)
            return lt(
              N,
              k,
              Y,
              pr(k, it),
              Tt
          Ft(k, it);
        }
        return typeof it == "function" && Me(k, it), typeof it == "symbol" && Je(k, it), null;
      }
      function wt(N, k, Y, it) {
        if (typeof Y != "object" || Y === null) return it;
        switch (Y.$$typeof) {
          case Fo:
          case ss:
            b(N, k, Y);
            var Tt = Y.key;
            if (typeof Tt != "string") break;
            if (it === null) {
              it = /* @__PURE__ */ new Set(), it.add(Tt);
            if (!it.has(Tt)) {
              it.add(Tt);
            Rt(k, function() {
                Tt
          case $a:
            Y = kc(Y), wt(N, k, Y, it);
        return it;
      function Xt(N, k, Y, it) {
        for (var Tt = null, It = null, zt = null, te = k, ne = k = 0, Ke = null; te !== null && ne < Y.length; ne++) {
          te.index > ne ? (Ke = te, te = null) : Ke = te.sibling;
          var En = J(
            N,
            te,
            Y[ne],
            it
          if (En === null) {
            te === null && (te = Ke);
          Tt = wt(
            N,
            En,
            Y[ne],
            Tt
          ), t && te && En.alternate === null && e(N, te), k = g(En, k, ne), zt === null ? It = En : zt.sibling = En, zt = En, te = Ke;
        }
        if (ne === Y.length)
          return l(N, te), Ee && Cu(N, ne), It;
        if (te === null) {
          for (; ne < Y.length; ne++)
            te = et(N, Y[ne], it), te !== null && (Tt = wt(
              N,
              te,
              Y[ne],
              Tt
            ), k = g(
              te,
              k,
              ne
            ), zt === null ? It = te : zt.sibling = te, zt = te);
          return Ee && Cu(N, ne), It;
        }
        for (te = r(te); ne < Y.length; ne++)
          Ke = lt(
            te,
            N,
            ne,
            Y[ne],
            it
          ), Ke !== null && (Tt = wt(
            N,
            Ke,
            Y[ne],
            Tt
          ), t && Ke.alternate !== null && te.delete(
            Ke.key === null ? ne : Ke.key
          ), k = g(
            Ke,
            k,
            ne
          ), zt === null ? It = Ke : zt.sibling = Ke, zt = Ke);
        return t && te.forEach(function(Es) {
          return e(N, Es);
        }), Ee && Cu(N, ne), It;
      }
      function qe(N, k, Y, it) {
        if (Y == null)
        for (var Tt = null, It = null, zt = k, te = k = 0, ne = null, Ke = null, En = Y.next(); zt !== null && !En.done; te++, En = Y.next()) {
          zt.index > te ? (ne = zt, zt = null) : ne = zt.sibling;
          var Es = J(N, zt, En.value, it);
          if (Es === null) {
            zt === null && (zt = ne);
          Ke = wt(
            N,
            Es,
            En.value,
            Ke
          ), t && zt && Es.alternate === null && e(N, zt), k = g(Es, k, te), It === null ? Tt = Es : It.sibling = Es, It = Es, zt = ne;
        }
        if (En.done)
          return l(N, zt), Ee && Cu(N, te), Tt;
        if (zt === null) {
          for (; !En.done; te++, En = Y.next())
            zt = et(N, En.value, it), zt !== null && (Ke = wt(
              N,
              zt,
              En.value,
              Ke
            ), k = g(
              zt,
              k,
              te
            ), It === null ? Tt = zt : It.sibling = zt, It = zt);
          return Ee && Cu(N, te), Tt;
        }
        for (zt = r(zt); !En.done; te++, En = Y.next())
          ne = lt(
            zt,
            N,
            te,
            En.value,
            it
          ), ne !== null && (Ke = wt(
            N,
            ne,
            En.value,
            Ke
          ), t && ne.alternate !== null && zt.delete(
            ne.key === null ? te : ne.key
          ), k = g(
            ne,
            k,
            te
          ), It === null ? Tt = ne : It.sibling = ne, It = ne);
        return t && zt.forEach(function(RO) {
          return e(N, RO);
        }), Ee && Cu(N, te), Tt;
      }
      function ye(N, k, Y, it) {
        if (typeof Y == "object" && Y !== null && Y.type === Pt && Y.key === null && (tc(Y, null, N), Y = Y.props.children), typeof Y == "object" && Y !== null) {
          switch (Y.$$typeof) {
            case Fo:
              var Tt = zn(Y._debugInfo);
                for (var It = Y.key; k !== null; ) {
                  if (k.key === It) {
                    if (It = Y.type, It === Pt) {
                      if (k.tag === 7) {
                        l(
                          N,
                          k.sibling
                        ), it = h(
                          k,
                          Y.props.children
                        ), it.return = N, it._debugOwner = Y._owner, it._debugInfo = ue, tc(Y, it, N), N = it;
                    } else if (k.elementType === It || f0(
                      k,
                      Y
                    ) || typeof It == "object" && It !== null && It.$$typeof === $a && kc(It) === k.type) {
                      l(
                        N,
                        k.sibling
                      ), it = h(k, Y.props), rl(it, Y), it.return = N, it._debugOwner = Y._owner, it._debugInfo = ue, N = it;
                    l(N, k);
                  } else e(N, k);
                  k = k.sibling;
                Y.type === Pt ? (it = Mo(
                  Y.props.children,
                  N.mode,
                  it,
                  Y.key
                ), it.return = N, it._debugOwner = N, it._debugTask = N._debugTask, it._debugInfo = ue, tc(Y, it, N), N = it) : (it = gr(
                  Y,
                  N.mode,
                  it
                ), rl(it, Y), it.return = N, it._debugInfo = ue, N = it);
              return N = T(N), ue = Tt, N;
            case ss:
                for (Tt = Y, Y = Tt.key; k !== null; ) {
                  if (k.key === Y)
                    if (k.tag === 4 && k.stateNode.containerInfo === Tt.containerInfo && k.stateNode.implementation === Tt.implementation) {
                      l(
                        N,
                        k.sibling
                      ), it = h(
                        k,
                        Tt.children || []
                      ), it.return = N, N = it;
                      l(N, k);
                  else e(N, k);
                  k = k.sibling;
                it = Km(
                  Tt,
                  N.mode,
                  it
                ), it.return = N, N = it;
              return T(N);
            case $a:
              return Tt = zn(Y._debugInfo), Y = kc(Y), N = ye(
                N,
                k,
                Y,
                it
              ), ue = Tt, N;
          if (Kt(Y))
            return Tt = zn(Y._debugInfo), N = Xt(
              N,
              k,
              Y,
              it
            ), ue = Tt, N;
          if (Mt(Y)) {
            if (Tt = zn(Y._debugInfo), It = Mt(Y), typeof It != "function")
            var zt = It.call(Y);
            return zt === Y ? (N.tag !== 0 || Object.prototype.toString.call(N.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(zt) !== "[object Generator]") && (AT || console.error(
            ), AT = !0) : Y.entries !== It || f1 || (console.error(
            ), f1 = !0), N = qe(
              N,
              k,
              zt,
              it
            ), ue = Tt, N;
          }
          if (typeof Y.then == "function")
            return Tt = zn(Y._debugInfo), N = ye(
              N,
              k,
              ec(Y),
              it
            ), ue = Tt, N;
          if (Y.$$typeof === gl)
            return ye(
              N,
              k,
              pr(N, Y),
              it
          Ft(N, Y);
        return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Tt = "" + Y, k !== null && k.tag === 6 ? (l(
          N,
          k.sibling
        ), it = h(k, Tt), it.return = N, N = it) : (l(N, k), it = Do(
          Tt,
          N.mode,
          it
        ), it.return = N, it._debugOwner = N, it._debugTask = N._debugTask, it._debugInfo = ue, N = it), T(N)) : (typeof Y == "function" && Me(N, Y), typeof Y == "symbol" && Je(N, Y), l(N, k));
      }
      return function(N, k, Y, it) {
        var Tt = ue;
        ue = null;
          Ip = 0;
          var It = ye(
            N,
            k,
            Y,
            it
          return um = null, It;
        } catch (Ke) {
          if (Ke === Jp || Ke === db) throw Ke;
          var zt = M(29, Ke, null, N.mode);
          zt.lanes = it, zt.return = N;
          var te = zt._debugInfo = ue;
          if (zt._debugOwner = N._debugOwner, zt._debugTask = N._debugTask, te != null) {
            for (var ne = te.length - 1; 0 <= ne; ne--)
              if (typeof te[ne].stack == "string") {
                zt._debugOwner = te[ne], zt._debugTask = te[ne].debugTask;
          return zt;
          ue = Tt;
    function Ga(t) {
      Dt(
        Pn,
        Pn.current & cm,
      ), Dt(Hi, t, t), su === null && (e === null || lm.current !== null || e.memoizedState !== null) && (su = t);
    function Yo(t) {
        if (Dt(Pn, Pn.current, t), Dt(Hi, t, t), su === null) {
          e !== null && e.memoizedState !== null && (su = t);
      } else Nl(t);
    function Nl(t) {
      Dt(Pn, Pn.current, t), Dt(
        Hi,
        Hi.current,
    function Xa(t) {
      xt(Hi, t), su === t && (su = null), xt(Pn, t);
    function Wi(t) {
          var l = e.memoizedState;
          if (l !== null && (l = l.dehydrated, l === null || l.data === Ts || vi(l)))
    function pg(t) {
        GT.has(e) || (GT.add(e), console.error(
    function We(t, e, l, r) {
      var h = t.memoizedState, g = l(r, h);
      if (t.mode & Na) {
        vt(!0);
          g = l(r, h);
          vt(!1);
      g === void 0 && (e = pt(e) || "Component", YT.has(e) || (YT.add(e), console.error(
      ))), h = g == null ? h : le({}, h, g), t.memoizedState = h, t.lanes === 0 && (t.updateQueue.baseState = h);
    }
    function Nd(t, e, l, r, h, g, T) {
      var x = t.stateNode;
      if (typeof x.shouldComponentUpdate == "function") {
        if (l = x.shouldComponentUpdate(
          r,
          g,
          T
        ), t.mode & Na) {
          vt(!0);
            l = x.shouldComponentUpdate(
              r,
              g,
              T
            vt(!1);
        return l === void 0 && console.error(
          pt(e) || "Component"
        ), l;
      return e.prototype && e.prototype.isPureReactComponent ? !fr(l, r) || !fr(h, g) : !0;
    function kd(t, e, l, r) {
      var h = e.state;
      typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, r), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, r), e.state !== h && (t = ht(t) || "Component", UT.has(t) || (UT.add(t), console.error(
      )), d1.enqueueReplaceState(
    function jo(t, e) {
      var l = e;
        l = {};
        for (var r in e)
          r !== "ref" && (l[r] = e[r]);
        l === e && (l = le({}, l));
        for (var h in t)
          l[h] === void 0 && (l[h] = t[h]);
      return l;
    function yg(t) {
      h1(t), console.warn(
        rm ? "An error occurred in the <" + rm + "> component." : "An error occurred in one of your React components.",
    function S0(t) {
      var e = rm ? "The above error occurred in the <" + rm + "> component." : "The above error occurred in one of your React components.", l = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((m1 || "Anonymous") + ".");
        var r = t.environmentName;
          l
          T_ + t[0],
          __,
          kb + r + kb,
          x_
          T_,
          __,
          kb + r + kb,
          x_
        ), t.unshift(console), r = DO.apply(console.error, t), r();
          l
    function Bd(t) {
      h1(t);
    function nc(t, e) {
        rm = e.source ? ht(e.source) : null, m1 = null;
        var l = e.value;
        if (I.actQueue !== null)
          I.thrownErrors.push(l);
          var r = t.onUncaughtError;
          r(l, { componentStack: e.stack });
      } catch (h) {
          throw h;
    function Ld(t, e, l) {
        rm = l.source ? ht(l.source) : null, m1 = ht(e);
        var r = t.onCaughtError;
        r(l.value, {
          componentStack: l.stack,
      } catch (h) {
          throw h;
    function ta(t, e, l) {
      return l = Il(l), l.tag = a1, l.payload = { element: null }, l.callback = function() {
        Rt(e.source, nc, t, e);
      }, l;
    function Ie(t) {
      return t = Il(t), t.tag = a1, t;
    function Cr(t, e, l, r) {
      var h = l.type.getDerivedStateFromError;
      if (typeof h == "function") {
        var g = r.value;
          return h(g);
          d0(l), Rt(
            r.source,
            Ld,
            l,
            r
      var T = l.stateNode;
      T !== null && typeof T.componentDidCatch == "function" && (t.callback = function() {
        d0(l), Rt(
          r.source,
          Ld,
          l,
          r
        ), typeof h != "function" && (jc === null ? jc = /* @__PURE__ */ new Set([this]) : jc.add(this)), lO(this, r), typeof h == "function" || (l.lanes & 2) === 0 && console.error(
          ht(l) || "Unknown"
    function Hr(t, e, l, r, h) {
      if (l.flags |= 32768, on && rc(t, h), r !== null && typeof r == "object" && typeof r.then == "function") {
        if (e = l.alternate, e !== null && Gn(
          l,
          h,
        ), Ee && (ps = !0), l = Hi.current, l !== null) {
          switch (l.tag) {
              return su === null ? lh() : l.alternate === null && hn === Ss && (hn = b1), l.flags &= -257, l.flags |= 65536, l.lanes = h, r === n1 ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([r]) : e.add(r), Vg(t, r, h)), !1;
              return l.flags |= 65536, r === n1 ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
                retryQueue: /* @__PURE__ */ new Set([r])
              }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([r]) : l.add(r)), Vg(t, r, h)), !1;
            "Unexpected Suspense handler tag (" + l.tag + "). This is a bug in React."
        return Vg(t, r, h), lh(), !1;
      if (Ee)
        return ps = !0, e = Hi.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = h, r !== Pv && js(
          qa(
              { cause: r }
            l
        )) : (r !== Pv && js(
          qa(
              { cause: r }
            l
        ), t = t.current.alternate, t.flags |= 65536, h &= -h, t.lanes |= h, r = qa(r, l), h = ta(
          r,
          h
        ), Vs(t, h), hn !== Af && (hn = mm)), !1;
      var g = qa(
          { cause: r }
        l
      if (uy === null ? uy = [g] : uy.push(g), hn !== Af && (hn = mm), e === null) return !0;
      r = qa(r, l), l = e;
        switch (l.tag) {
            return l.flags |= 65536, t = h & -h, l.lanes |= t, t = ta(
              l.stateNode,
              r,
            ), Vs(l, t), !1;
            if (e = l.type, g = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (jc === null || !jc.has(g))))
              return l.flags |= 65536, h &= -h, l.lanes |= h, h = Ie(h), Cr(
                h,
                l,
                r
              ), Vs(l, h), !1;
        l = l.return;
      } while (l !== null);
    function fn(t, e, l, r) {
      e.child = t === null ? CT(e, null, l, r) : sm(
        l,
        r
    function Yd(t, e, l, r, h) {
      l = l.render;
      var g = e.ref;
      if ("ref" in r) {
        var T = {};
        for (var x in r)
          x !== "ref" && (T[x] = r[x]);
      } else T = r;
      return wo(e), Ge(e), r = No(
        l,
        T,
        g,
        h
      ), x = Ea(), va(), t !== null && !ia ? (Qi(t, e, h), si(t, e, h)) : (Ee && x && yd(e), e.flags |= 1, fn(t, e, r, h), e.child);
    function ui(t, e, l, r, h) {
        var g = l.type;
        return typeof g == "function" && !Qm(g) && g.defaultProps === void 0 && l.compare === null ? (l = zu(g), e.tag = 15, e.type = l, Gd(e, g), Ur(
          l,
          r,
          h
        )) : (t = pd(
          l.type,
          r,
          h
      if (g = t.child, !Jd(t, h)) {
        var T = g.memoizedProps;
        if (l = l.compare, l = l !== null ? l : fr, l(T, r) && t.ref === e.ref)
          return si(
            h
      return e.flags |= 1, t = Jl(g, r), t.ref = e.ref, t.return = e, e.child = t;
    function Ur(t, e, l, r, h) {
        var g = t.memoizedProps;
        if (fr(g, r) && t.ref === e.ref && e.type === t.type)
          if (ia = !1, e.pendingProps = r = g, Jd(t, h))
            (t.flags & 131072) !== 0 && (ia = !0);
            return e.lanes = t.lanes, si(t, e, h);
      return Vd(
        l,
        r,
        h
    function jd(t, e, l) {
      var r = e.pendingProps, h = r.children, g = t !== null ? t.memoizedState : null;
      if (r.mode === "hidden") {
          if (r = g !== null ? g.baseLanes | l : l, t !== null) {
            for (h = e.child = t.child, g = 0; h !== null; )
              g = g | h.lanes | h.childLanes, h = h.sibling;
            e.childLanes = g & ~r;
          return qd(
            r,
            l
        if ((l & 536870912) !== 0)
          e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Td(
            g !== null ? g.cachePool : null
          ), g !== null ? xa(e, g) : vr(e), Yo(e);
          return e.lanes = e.childLanes = 536870912, qd(
            g !== null ? g.baseLanes | l : l,
            l
        g !== null ? (Td(e, g.cachePool), xa(e, g), Nl(e), e.memoizedState = null) : (t !== null && Td(e, null), vr(e), Nl(e));
      return fn(t, e, h, l), e.child;
    }
    function qd(t, e, l, r) {
      var h = ag();
      return h = h === null ? null : {
        parent: Wn._currentValue,
        pool: h
        baseLanes: l,
        cachePool: h
      }, t !== null && Td(e, null), vr(e), Yo(e), t !== null && Gn(t, e, r, !0), null;
    function Nr(t, e) {
      var l = e.ref;
      if (l === null)
        if (typeof l != "function" && typeof l != "object")
        (t === null || t.ref !== l) && (e.flags |= 4194816);
    function Vd(t, e, l, r, h) {
      if (l.prototype && typeof l.prototype.render == "function") {
        var g = pt(l) || "Unknown";
        QT[g] || (console.error(
          g,
          g
        ), QT[g] = !0);
      return e.mode & Na && ho.recordLegacyContextWarning(
      ), t === null && (Gd(e, e.type), l.contextTypes && (g = pt(l) || "Unknown", KT[g] || (KT[g] = !0, console.error(
        g
      )))), wo(e), Ge(e), l = No(
        l,
        r,
        h
      ), r = Ea(), va(), t !== null && !ia ? (Qi(t, e, h), si(t, e, h)) : (Ee && r && yd(e), e.flags |= 1, fn(t, e, l, h), e.child);
    function bg(t, e, l, r, h, g) {
      return wo(e), Ge(e), bs = -1, Pp = t !== null && t.type !== e.type, e.updateQueue = null, l = Zs(
        r,
        l,
        h
      ), Sr(t, e), r = Ea(), va(), t !== null && !ia ? (Qi(t, e, g), si(t, e, g)) : (Ee && r && yd(e), e.flags |= 1, fn(t, e, l, g), e.child);
    function vg(t, e, l, r, h) {
      switch (y(e)) {
          var g = e.stateNode, T = new e.type(
            g.context
          g.updater.enqueueSetState(g, T, null);
          e.flags |= 128, e.flags |= 65536, g = Error("Simulated error coming from DevTools");
          var x = h & -h;
          if (e.lanes |= x, T = je, T === null)
          x = Ie(x), Cr(
            x,
            T,
            qa(g, e)
          ), Vs(e, x);
      if (wo(e), e.stateNode === null) {
        if (T = Hc, g = l.contextType, "contextType" in l && g !== null && (g === void 0 || g.$$typeof !== gl) && !VT.has(l) && (VT.add(l), x = g === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof g != "object" ? " However, it is set to a " + typeof g + "." : g.$$typeof === zh ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(g).join(", ") + "}.", console.error(
          pt(l) || "Component",
          x
        )), typeof g == "object" && g !== null && (T = Ye(g)), g = new l(r, T), e.mode & Na) {
          vt(!0);
            g = new l(r, T);
            vt(!1);
        if (T = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null, g.updater = d1, e.stateNode = g, g._reactInternals = e, g._reactInternalInstance = HT, typeof l.getDerivedStateFromProps == "function" && T === null && (T = pt(l) || "Component", NT.has(T) || (NT.add(T), console.error(
          T,
          g.state === null ? "null" : "undefined",
          T
        ))), typeof l.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var w = x = T = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? T = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (T = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? x = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (x = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? w = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (w = "UNSAFE_componentWillUpdate"), T !== null || x !== null || w !== null) {
            g = pt(l) || "Component";
            var C = typeof l.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            BT.has(g) || (BT.add(g), console.error(
              g,
              C,
              T !== null ? `
  ` + T : "",
              x !== null ? `
  ` + x : "",
              w !== null ? `
  ` + w : ""
        g = e.stateNode, T = pt(l) || "Component", g.render || (l.prototype && typeof l.prototype.render == "function" ? console.error(
          T
          T
        )), !g.getInitialState || g.getInitialState.isReactClassApproved || g.state || console.error(
          T
        ), g.getDefaultProps && !g.getDefaultProps.isReactClassApproved && console.error(
          T
        ), g.contextType && console.error(
          T
        ), l.childContextTypes && !qT.has(l) && (qT.add(l), console.error(
          T
        )), l.contextTypes && !jT.has(l) && (jT.add(l), console.error(
          T
        )), typeof g.componentShouldUpdate == "function" && console.error(
          T
        ), l.prototype && l.prototype.isPureReactComponent && typeof g.shouldComponentUpdate < "u" && console.error(
          pt(l) || "A pure component"
        ), typeof g.componentDidUnmount == "function" && console.error(
          T
        ), typeof g.componentDidReceiveProps == "function" && console.error(
          T
        ), typeof g.componentWillRecieveProps == "function" && console.error(
          T
        ), typeof g.UNSAFE_componentWillRecieveProps == "function" && console.error(
          T
        ), x = g.props !== r, g.props !== void 0 && x && console.error(
          T
        ), g.defaultProps && console.error(
          T,
          T
        ), typeof g.getSnapshotBeforeUpdate != "function" || typeof g.componentDidUpdate == "function" || kT.has(l) || (kT.add(l), console.error(
          pt(l)
        )), typeof g.getDerivedStateFromProps == "function" && console.error(
          T
        ), typeof g.getDerivedStateFromError == "function" && console.error(
          T
        ), typeof l.getSnapshotBeforeUpdate == "function" && console.error(
          T
        ), (x = g.state) && (typeof x != "object" || Kt(x)) && console.error("%s.state: must be set to an object or null", T), typeof g.getChildContext == "function" && typeof l.childContextTypes != "object" && console.error(
          T
        ), g = e.stateNode, g.props = r, g.state = e.memoizedState, g.refs = {}, _a(e), T = l.contextType, g.context = typeof T == "object" && T !== null ? Ye(T) : Hc, g.state === r && (T = pt(l) || "Component", LT.has(T) || (LT.add(T), console.error(
          T
        ))), e.mode & Na && ho.recordLegacyContextWarning(
          g
        ), ho.recordUnsafeLifecycleWarnings(
          g
        ), g.state = e.memoizedState, T = l.getDerivedStateFromProps, typeof T == "function" && (We(
          l,
          T,
          r
        ), g.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function" || typeof g.UNSAFE_componentWillMount != "function" && typeof g.componentWillMount != "function" || (T = g.state, typeof g.componentWillMount == "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount == "function" && g.UNSAFE_componentWillMount(), T !== g.state && (console.error(
          ht(e) || "Component"
        ), d1.enqueueReplaceState(
          g,
          g.state,
        )), Gs(e, r, g, h), ti(), g.state = e.memoizedState), typeof g.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & fo) !== Ze && (e.flags |= 134217728), g = !0;
        g = e.stateNode;
        var F = e.memoizedProps;
        x = jo(l, F), g.props = x;
        var et = g.context;
        w = l.contextType, T = Hc, typeof w == "object" && w !== null && (T = Ye(w)), C = l.getDerivedStateFromProps, w = typeof C == "function" || typeof g.getSnapshotBeforeUpdate == "function", F = e.pendingProps !== F, w || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (F || et !== T) && kd(
          g,
          r,
          T
        ), Uc = !1;
        var J = e.memoizedState;
        g.state = J, Gs(e, r, g, h), ti(), et = e.memoizedState, F || J !== et || Uc ? (typeof C == "function" && (We(
          l,
          C,
          r
        ), et = e.memoizedState), (x = Uc || Nd(
          l,
          x,
          r,
          J,
          et,
          T
        )) ? (w || typeof g.UNSAFE_componentWillMount != "function" && typeof g.componentWillMount != "function" || (typeof g.componentWillMount == "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount == "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & fo) !== Ze && (e.flags |= 134217728)) : (typeof g.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & fo) !== Ze && (e.flags |= 134217728), e.memoizedProps = r, e.memoizedState = et), g.props = r, g.state = et, g.context = T, g = x) : (typeof g.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & fo) !== Ze && (e.flags |= 134217728), g = !1);
        g = e.stateNode, Co(t, e), T = e.memoizedProps, w = jo(l, T), g.props = w, C = e.pendingProps, J = g.context, et = l.contextType, x = Hc, typeof et == "object" && et !== null && (x = Ye(et)), F = l.getDerivedStateFromProps, (et = typeof F == "function" || typeof g.getSnapshotBeforeUpdate == "function") || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (T !== C || J !== x) && kd(
          g,
          r,
          x
        ), Uc = !1, J = e.memoizedState, g.state = J, Gs(e, r, g, h), ti();
        var lt = e.memoizedState;
        T !== C || J !== lt || Uc || t !== null && t.dependencies !== null && Ro(t.dependencies) ? (typeof F == "function" && (We(
          l,
          F,
          r
        ), lt = e.memoizedState), (w = Uc || Nd(
          l,
          w,
          r,
          J,
          lt,
          x
        ) || t !== null && t.dependencies !== null && Ro(t.dependencies)) ? (et || typeof g.UNSAFE_componentWillUpdate != "function" && typeof g.componentWillUpdate != "function" || (typeof g.componentWillUpdate == "function" && g.componentWillUpdate(r, lt, x), typeof g.UNSAFE_componentWillUpdate == "function" && g.UNSAFE_componentWillUpdate(
          r,
          lt,
          x
        )), typeof g.componentDidUpdate == "function" && (e.flags |= 4), typeof g.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof g.componentDidUpdate != "function" || T === t.memoizedProps && J === t.memoizedState || (e.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || T === t.memoizedProps && J === t.memoizedState || (e.flags |= 1024), e.memoizedProps = r, e.memoizedState = lt), g.props = r, g.state = lt, g.context = x, g = w) : (typeof g.componentDidUpdate != "function" || T === t.memoizedProps && J === t.memoizedState || (e.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || T === t.memoizedProps && J === t.memoizedState || (e.flags |= 1024), g = !1);
      }
      if (x = g, Nr(t, e), T = (e.flags & 128) !== 0, x || T) {
        if (x = e.stateNode, er(e), T && typeof l.getDerivedStateFromError != "function")
          l = null, bl = -1;
          if (Ge(e), l = bT(x), e.mode & Na) {
            vt(!0);
              bT(x);
              vt(!1);
          va();
        e.flags |= 1, t !== null && T ? (e.child = sm(
          h
        ), e.child = sm(
          l,
          h
        )) : fn(t, e, l, h), e.memoizedState = x.state, t = e.child;
        t = si(
          h
      return h = e.stateNode, g && h.props !== r && (fm || console.error(
        ht(e) || "a component"
      ), fm = !0), t;
    function Sg(t, e, l, r) {
      return Uu(), e.flags |= 256, fn(t, e, l, r), e.child;
    function Gd(t, e) {
      ), typeof e.getDerivedStateFromProps == "function" && (t = pt(e) || "Unknown", $T[t] || (console.error(
      ), $T[t] = !0)), typeof e.contextType == "object" && e.contextType !== null && (e = pt(e) || "Unknown", ZT[e] || (console.error(
      ), ZT[e] = !0));
    }
    function kr(t) {
      return { baseLanes: t, cachePool: p0() };
    }
    function Xd(t, e, l) {
      return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Gl), t;
    }
    function T0(t, e, l) {
      var r, h = e.pendingProps;
      m(e) && (e.flags |= 128);
      var g = !1, T = (e.flags & 128) !== 0;
      if ((r = T) || (r = t !== null && t.memoizedState === null ? !1 : (Pn.current & ty) !== 0), r && (g = !0, e.flags &= -129), r = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
        if (Ee) {
          if (g ? Ga(e) : Nl(e), Ee) {
            var x = dn, w;
            if (!(w = !x)) {
                var C = x;
                for (w = ou; C.nodeType !== 8; ) {
                  if (!w) {
                    w = null;
                  if (C = Kn(C.nextSibling), C === null) {
                    w = null;
                w = C;
              w !== null ? (Dl(), e.memoizedState = {
                dehydrated: w,
                treeContext: Tf !== null ? { id: ms, overflow: gs } : null,
              }, C = M(18, null, null, Ze), C.stateNode = w, C.return = e, e.child = C, Fa = e, dn = null, w = !0) : w = !1, w = !w;
            w && ($m(
              x
            ), Wl(e));
          if (x = e.memoizedState, x !== null && (x = x.dehydrated, x !== null))
            return vi(x) ? e.lanes = 32 : e.lanes = 536870912, null;
          Xa(e);
        return x = h.children, h = h.fallback, g ? (Nl(e), g = e.mode, x = Br(
            children: x
          g
        ), h = Mo(
          h,
          g,
          l,
        ), x.return = e, h.return = e, x.sibling = h, e.child = x, g = e.child, g.memoizedState = kr(l), g.childLanes = Xd(
          r,
          l
        ), e.memoizedState = p1, h) : (Ga(e), Qd(
          x
      var F = t.memoizedState;
      if (F !== null && (x = F.dehydrated, x !== null)) {
        if (T)
          e.flags & 256 ? (Ga(e), e.flags &= -257, e = Zd(
            l
          )) : e.memoizedState !== null ? (Nl(e), e.child = t.child, e.flags |= 128, e = null) : (Nl(e), g = h.fallback, x = e.mode, h = Br(
              children: h.children
            x
          ), g = Mo(
            g,
            x,
            l,
          ), g.flags |= 2, h.return = e, g.return = e, h.sibling = g, e.child = h, sm(
            l
          ), h = e.child, h.memoizedState = kr(l), h.childLanes = Xd(
            r,
            l
          ), e.memoizedState = p1, e = g);
        else if (Ga(e), Ee && console.error(
        ), vi(x)) {
          if (r = x.nextSibling && x.nextSibling.dataset, r) {
            w = r.dgst;
            var et = r.msg;
            C = r.stck;
            var J = r.cstck;
          }
          x = et, r = w, h = C, w = g = J, g = Error(x || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), g.stack = h || "", g.digest = r, r = w === void 0 ? null : w, h = {
            value: g,
            stack: r
          }, typeof r == "string" && Wv.set(
            g,
            h
          ), js(h), e = Zd(
            l
        } else if (ia || Gn(
          l,
        ), r = (l & t.childLanes) !== 0, ia || r) {
          if (r = je, r !== null && (h = l & -l, h = (h & 42) !== 0 ? 1 : Ln(
            h
          ), h = (h & (r.suspendedLanes | l)) !== 0 ? 0 : h, h !== 0 && h !== F.retryLane))
            throw F.retryLane = h, Ta(
              h
            ), tn(
              r,
              h
            ), XT;
          x.data === Ts || lh(), e = Zd(
            l
          x.data === Ts ? (e.flags |= 192, e.child = t.child, e = null) : (t = F.treeContext, dn = Kn(
            x.nextSibling
          ), Fa = e, Ee = !0, _f = null, ps = !1, Ri = null, ou = !1, t !== null && (Dl(), Di[Ai++] = ms, Di[Ai++] = gs, Di[Ai++] = Tf, ms = t.id, gs = t.overflow, Tf = e), e = Qd(
            h.children
      return g ? (Nl(e), g = h.fallback, x = e.mode, w = t.child, C = w.sibling, h = Jl(
        w,
          children: h.children
        }
      ), h.subtreeFlags = w.subtreeFlags & 65011712, C !== null ? g = Jl(
        C,
        g
      ) : (g = Mo(
        g,
        x,
        l,
      ), g.flags |= 2), g.return = e, h.return = e, h.sibling = g, e.child = h, h = g, g = e.child, x = t.child.memoizedState, x === null ? x = kr(l) : (w = x.cachePool, w !== null ? (C = Wn._currentValue, w = w.parent !== C ? { parent: C, pool: C } : w) : w = p0(), x = {
        baseLanes: x.baseLanes | l,
        cachePool: w
      }), g.memoizedState = x, g.childLanes = Xd(
        r,
        l
      ), e.memoizedState = p1, h) : (Ga(e), l = t.child, t = l.sibling, l = Jl(l, {
        children: h.children
      }), l.return = e, l.sibling = null, t !== null && (r = e.deletions, r === null ? (e.deletions = [t], e.flags |= 16) : r.push(t)), e.child = l, e.memoizedState = null, l);
    function Qd(t, e) {
      return e = Br(
    function Br(t, e) {
      return t = M(22, t, null, e), t.lanes = 0, t.stateNode = {
        _visibility: lb,
    function Zd(t, e, l) {
      return sm(e, t.child, null, l), t = Qd(
    function Kd(t, e, l) {
      var r = t.alternate;
      r !== null && (r.lanes |= e), Im(
        l
    function Tg(t, e) {
      var l = Kt(t);
      return t = !l && typeof Mt(t) == "function", l || t ? (l = l ? "array" : "iterable", console.error(
        l,
        l
    function $d(t, e, l, r, h) {
      var g = t.memoizedState;
      g === null ? t.memoizedState = {
        last: r,
        tail: l,
        tailMode: h
      } : (g.isBackwards = e, g.rendering = null, g.renderingStartTime = 0, g.last = r, g.tail = l, g.tailMode = h);
    }
    function _g(t, e, l) {
      var r = e.pendingProps, h = r.revealOrder, g = r.tail;
      if (r = r.children, h !== void 0 && h !== "forwards" && h !== "backwards" && h !== "together" && !JT[h])
        if (JT[h] = !0, typeof h == "string")
          switch (h.toLowerCase()) {
                h,
                h.toLowerCase()
                h,
                h.toLowerCase()
                h
            h
      g === void 0 || g1[g] || (g !== "collapsed" && g !== "hidden" ? (g1[g] = !0, console.error(
        g
      )) : h !== "forwards" && h !== "backwards" && (g1[g] = !0, console.error(
        g
      t: if ((h === "forwards" || h === "backwards") && r !== void 0 && r !== null && r !== !1)
        if (Kt(r)) {
          for (var T = 0; T < r.length; T++)
            if (!Tg(r[T], T)) break t;
        } else if (T = Mt(r), typeof T == "function") {
          if (T = T.call(r))
            for (var x = T.next(), w = 0; !x.done; x = T.next()) {
              if (!Tg(x.value, w)) break t;
              w++;
            h
      if (fn(t, e, r, l), r = Pn.current, (r & ty) !== 0)
        r = r & cm | ty, e.flags |= 128;
              t.memoizedState !== null && Kd(
                l,
              Kd(t, l, e);
        r &= cm;
      switch (Dt(Pn, r, e), h) {
          for (l = e.child, h = null; l !== null; )
            t = l.alternate, t !== null && Wi(t) === null && (h = l), l = l.sibling;
          l = h, l === null ? (h = e.child, e.child = null) : (h = l.sibling, l.sibling = null), $d(
            h,
            l,
            g
          for (l = null, h = e.child, e.child = null; h !== null; ) {
            if (t = h.alternate, t !== null && Wi(t) === null) {
              e.child = h;
            t = h.sibling, h.sibling = l, l = h, h = t;
          $d(
            l,
            g
          $d(e, !1, null, null, void 0);
    function si(t, e, l) {
      if (t !== null && (e.dependencies = t.dependencies), bl = -1, Lc |= e.lanes, (l & e.childLanes) === 0)
          if (Gn(
            l,
          ), (l & e.childLanes) === 0)
        for (t = e.child, l = Jl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
          t = t.sibling, l = l.sibling = Jl(t, t.pendingProps), l.return = e;
        l.sibling = null;
    function Jd(t, e) {
      return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ro(t)));
    function zv(t, e, l) {
          Se(
          ), Ao(
            Wn,
          ), Uu();
          nt(e);
          Se(
          Ao(
          (l & e.childLanes) !== 0 && (e.flags |= 4), e.flags |= 2048;
          var r = e.stateNode;
          r.effectDuration = -0, r.passiveEffectDuration = -0;
          if (r = e.memoizedState, r !== null)
            return r.dehydrated !== null ? (Ga(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? T0(
              l
            ) : (Ga(e), t = si(
              l
          Ga(e);
          var h = (t.flags & 128) !== 0;
          if (r = (l & e.childLanes) !== 0, r || (Gn(
            l,
          ), r = (l & e.childLanes) !== 0), h) {
            if (r)
              return _g(
                l
          if (h = e.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), Dt(
            Pn,
            Pn.current,
          ), r) break;
          return e.lanes = 0, jd(t, e, l);
          Ao(
            Wn,
      return si(t, e, l);
    function Wd(t, e, l) {
        l = pd(
        ), l._debugStack = e._debugStack, l._debugTask = e._debugTask;
        var r = e.return;
        if (r === null) throw Error("Cannot swap the root fiber.");
        if (t.alternate = null, e.alternate = null, l.index = e.index, l.sibling = e.sibling, l.return = e.return, l.ref = e.ref, l._debugInfo = e._debugInfo, e === r.child)
          r.child = l;
          var h = r.child;
          if (h === null)
          for (; h.sibling !== e; )
            if (h = h.sibling, h === null)
          h.sibling = l;
        return e = r.deletions, e === null ? (r.deletions = [t], r.flags |= 16) : e.push(t), l.flags |= 2, l;
          ia = !0;
          if (!Jd(t, l) && (e.flags & 128) === 0)
            return ia = !1, zv(
              l
          ia = (t.flags & 131072) !== 0;
        ia = !1, (r = Ee) && (Dl(), r = (e.flags & 1048576) !== 0), r && (r = e.index, Dl(), h0(e, ob, r));
          t: if (r = e.pendingProps, t = kc(e.elementType), e.type = t, typeof t == "function")
            Qm(t) ? (r = jo(
              r
            ), e.tag = 1, e.type = t = zu(t), e = vg(
              r,
              l
            )) : (e.tag = 0, Gd(e, t), e.type = t = zu(t), e = Vd(
              r,
              l
              if (h = t.$$typeof, h === lo) {
                e.tag = 11, e.type = t = Xm(t), e = Yd(
                  r,
                  l
              } else if (h === sf) {
                e.tag = 14, e = ui(
                  r,
                  l
            throw e = "", t !== null && typeof t == "object" && t.$$typeof === $a && (e = " Did you wrap a component in React.lazy() more than once?"), t = pt(t) || t, Error(
          return Vd(
            l
          return r = e.type, h = jo(
            r,
          ), vg(
            r,
            h,
            l
            if (Se(
            r = e.pendingProps;
            var g = e.memoizedState;
            h = g.element, Co(t, e), Gs(e, r, null, l);
            var T = e.memoizedState;
            if (r = T.cache, Ao(e, Wn, r), r !== g.cache && tg(
              [Wn],
              l,
            ), ti(), r = T.element, g.isDehydrated)
              if (g = {
                element: r,
                cache: T.cache
              }, e.updateQueue.baseState = g, e.memoizedState = g, e.flags & 256) {
                e = Sg(
                  r,
                  l
              } else if (r !== h) {
                h = qa(
                ), js(h), e = Sg(
                  r,
                  l
                for (dn = Kn(t.firstChild), Fa = e, Ee = !0, _f = null, ps = !1, Ri = null, ou = !0, t = CT(
                  r,
                  l
              if (Uu(), r === h) {
                e = si(
                  l
              fn(
                r,
                l
          return Nr(t, e), t === null ? (t = ao(
          )) ? e.memoizedState = t : Ee || (t = e.type, l = e.pendingProps, r = re(
            Ti.current
          ), r = de(
            r
          ).createElement(t), r[la] = e, r[Ha] = l, nn(r, t, l), G(r), e.stateNode = r) : e.memoizedState = ao(
          return nt(e), t === null && Ee && (r = re(Ti.current), h = L(), r = e.stateNode = up(
            r,
            h,
          ), ps || (h = Ne(
            r,
            h
          ), h !== null && (Al(e, 0).serverProps = h)), Fa = e, ou = !0, h = dn, bi(e.type) ? (Y1 = h, dn = Kn(
            r.firstChild
          )) : dn = h), fn(
            l
          ), Nr(t, e), t === null && (e.flags |= 4194304), e.child;
          return t === null && Ee && (g = L(), r = ud(
            g.ancestorInfo
          ), h = dn, (T = !h) || (T = Ko(
            h,
            ou
          ), T !== null ? (e.stateNode = T, ps || (g = Ne(
            T,
            g
          ), g !== null && (Al(e, 0).serverProps = g)), Fa = e, dn = Kn(
            T.firstChild
          ), ou = !1, g = !0) : g = !1, T = !g), T && (r && $m(e, h), Wl(e))), nt(e), h = e.type, g = e.pendingProps, T = t !== null ? t.memoizedProps : null, r = g.children, yi(h, g) ? r = null : T !== null && yi(h, T) && (e.flags |= 32), e.memoizedState !== null && (h = No(
            ol,
            l
          ), gy._currentValue = h), Nr(t, e), fn(
            r,
            l
          return t === null && Ee && (t = e.pendingProps, l = L(), r = l.ancestorInfo.current, t = r != null ? ur(
            r.tag,
            l.ancestorInfo.implicitRootScope
          ) : !0, l = dn, (r = !l) || (r = Zn(
            l,
            ou
          ), r !== null ? (e.stateNode = r, Fa = e, dn = null, r = !0) : r = !1, r = !r), r && (t && $m(e, l), Wl(e))), null;
          return T0(t, e, l);
          return Se(
          ), r = e.pendingProps, t === null ? e.child = sm(
            r,
            l
          ) : fn(
            r,
            l
          return Yd(
            l
          return fn(
            l
          return fn(
            l
          return e.flags |= 4, e.flags |= 2048, r = e.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, fn(
            l
          return r = e.type, h = e.pendingProps, g = h.value, "value" in h || WT || (WT = !0, console.error(
          )), Ao(e, r, g), fn(
            h.children,
            l
          return h = e.type._context, r = e.pendingProps.children, typeof r != "function" && console.error(
          ), wo(e), h = Ye(h), Ge(e), r = c1(
            r,
            h,
          ), va(), e.flags |= 1, fn(
            r,
            l
          return ui(
            l
          return Ur(
            l
          return _g(
            l
          return r = e.pendingProps, l = e.mode, r = {
            mode: r.mode,
            children: r.children
          }, t === null ? (t = Br(
            r,
            l
          ), t.ref = e.ref, e.child = t, t.return = e, e = t) : (t = Jl(t.child, r), t.ref = e.ref, e.child = t, t.return = e, e = t), e;
          return jd(t, e, l);
          return wo(e), r = Ye(Wn), t === null ? (h = ag(), h === null && (h = je, g = yr(), h.pooledCache = g, Nu(g), g !== null && (h.pooledCacheLanes |= l), h = g), e.memoizedState = {
            parent: r,
            cache: h
          }, _a(e), Ao(e, Wn, h)) : ((t.lanes & l) !== 0 && (Co(t, e), Gs(e, null, null, l), ti()), h = t.memoizedState, g = e.memoizedState, h.parent !== r ? (h = {
            parent: r,
            cache: r
          }, e.memoizedState = h, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = h), Ao(e, Wn, r)) : (r = g.cache, Ao(e, Wn, r), r !== h.cache && tg(
            [Wn],
            l,
          ))), fn(
            l
    function Ma(t) {
    function Lr(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & Ui) !== Bf)
      else if (t.flags |= 16777216, !Pr(e)) {
        if (e = Hi.current, e !== null && ((me & 4194048) === me ? su !== null : (me & 62914560) !== me && (me & 536870912) === 0 || e !== su))
          throw Wp = n1, oT;
    function Yr(t, e) {
      e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Zl() : 536870912, t.lanes |= e, zf |= e);
    function qo(t, e) {
      if (!Ee)
            for (var l = null; e !== null; )
              e.alternate !== null && (l = e), e = e.sibling;
            l === null ? t.tail = null : l.sibling = null;
            l = t.tail;
            for (var r = null; l !== null; )
              l.alternate !== null && (r = l), l = l.sibling;
            r === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : r.sibling = null;
    function Ce(t) {
      var e = t.alternate !== null && t.alternate.child === t.child, l = 0, r = 0;
        if ((t.mode & ga) !== Ze) {
          for (var h = t.selfBaseDuration, g = t.child; g !== null; )
            l |= g.lanes | g.childLanes, r |= g.subtreeFlags & 65011712, r |= g.flags & 65011712, h += g.treeBaseDuration, g = g.sibling;
          t.treeBaseDuration = h;
          for (h = t.child; h !== null; )
            l |= h.lanes | h.childLanes, r |= h.subtreeFlags & 65011712, r |= h.flags & 65011712, h.return = t, h = h.sibling;
      else if ((t.mode & ga) !== Ze) {
        h = t.actualDuration, g = t.selfBaseDuration;
        for (var T = t.child; T !== null; )
          l |= T.lanes | T.childLanes, r |= T.subtreeFlags, r |= T.flags, h += T.actualDuration, g += T.treeBaseDuration, T = T.sibling;
        t.actualDuration = h, t.treeBaseDuration = g;
        for (h = t.child; h !== null; )
          l |= h.lanes | h.childLanes, r |= h.subtreeFlags, r |= h.flags, h.return = t, h = h.sibling;
      return t.subtreeFlags |= r, t.childLanes = l, e;
    function _0(t, e, l) {
      var r = e.pendingProps;
      switch (bd(e), e.tag) {
          return Ce(e), null;
          return Ce(e), null;
          return l = e.stateNode, r = null, t !== null && (r = t.memoizedState.cache), e.memoizedState.cache !== r && (e.flags |= 2048), Gi(Wn, e), Lt(e), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Hu(e) ? (Pm(), Ma(e)) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Fm())), Ce(e), null;
          return l = e.memoizedState, t === null ? (Ma(e), l !== null ? (Ce(e), Lr(
            l
          )) : (Ce(e), e.flags &= -16777217)) : l ? l !== t.memoizedState ? (Ma(e), Ce(e), Lr(
            l
          )) : (Ce(e), e.flags &= -16777217) : (t.memoizedProps !== r && Ma(e), Ce(e), e.flags &= -16777217), null;
          ft(e), l = re(Ti.current);
          var h = e.type;
            t.memoizedProps !== r && Ma(e);
            if (!r) {
              return Ce(e), null;
            t = L(), Hu(e) ? Jm(e) : (t = up(
              h,
              r,
              l,
            ), e.stateNode = t, Ma(e));
          return Ce(e), null;
          if (ft(e), l = e.type, t !== null && e.stateNode != null)
            t.memoizedProps !== r && Ma(e);
            if (!r) {
              return Ce(e), null;
            if (h = L(), Hu(e))
              Jm(e);
              switch (t = re(Ti.current), ud(l, h.ancestorInfo), h = h.context, t = de(t), h) {
                case Sm:
                  t = t.createElementNS(Cc, l);
                case Hb:
                    vf,
                    l
                  switch (l) {
                        Cc,
                        l
                        vf,
                        l
                      t = typeof r.is == "string" ? t.createElement("select", { is: r.is }) : t.createElement("select"), r.multiple ? t.multiple = !0 : r.size && (t.size = r.size);
                      t = typeof r.is == "string" ? t.createElement(l, {
                        is: r.is
                      }) : t.createElement(l), l.indexOf("-") === -1 && (l !== l.toLowerCase() && console.error(
                        l
                      ), Object.prototype.toString.call(t) !== "[object HTMLUnknownElement]" || oo.call(
                        g_,
                        l
                      ) || (g_[l] = !0, console.error(
                        l
              t[la] = e, t[Ha] = r;
              t: for (h = e.child; h !== null; ) {
                if (h.tag === 5 || h.tag === 6)
                  t.appendChild(h.stateNode);
                else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                  h.child.return = h, h = h.child;
                if (h === e) break t;
                for (; h.sibling === null; ) {
                  if (h.return === null || h.return === e)
                  h = h.return;
                h.sibling.return = h.return, h = h.sibling;
              t: switch (nn(t, l, r), l) {
                  t = !!r.autoFocus;
              t && Ma(e);
          return Ce(e), e.flags &= -16777217, null;
            t.memoizedProps !== r && Ma(e);
            if (typeof r != "string" && e.stateNode === null)
            if (t = re(Ti.current), l = L(), Hu(e)) {
              t = e.stateNode, l = e.memoizedProps, h = !ps, r = null;
              var g = Fa;
              if (g !== null)
                switch (g.tag) {
                    h && (h = _h(
                      l,
                      r
                    ), h !== null && (Al(e, 0).serverProps = h));
                    r = g.memoizedProps, h && (h = _h(
                      l,
                      r
                    ), h !== null && (Al(
                    ).serverProps = h));
              t[la] = e, t = !!(t.nodeValue === l || r !== null && r.suppressHydrationWarning === !0 || Fg(t.nodeValue, l)), t || Wl(e);
              h = l.ancestorInfo.current, h != null && ur(
                r,
                h.tag,
                l.ancestorInfo.implicitRootScope
              ), t = de(t).createTextNode(
                r
              ), t[la] = e, e.stateNode = t;
          }
          return Ce(e), null;
          if (r = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
            if (h = Hu(e), r !== null && r.dehydrated !== null) {
                if (!h)
                if (h = e.memoizedState, h = h !== null ? h.dehydrated : null, !h)
                h[la] = e, Ce(e), (e.mode & ga) !== Ze && r !== null && (h = e.child, h !== null && (e.treeBaseDuration -= h.treeBaseDuration));
                Pm(), Uu(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4, Ce(e), (e.mode & ga) !== Ze && r !== null && (h = e.child, h !== null && (e.treeBaseDuration -= h.treeBaseDuration));
              h = !1;
              h = Fm(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = h), h = !0;
            if (!h)
              return e.flags & 256 ? (Xa(e), e) : (Xa(e), null);
          return Xa(e), (e.flags & 128) !== 0 ? (e.lanes = l, (e.mode & ga) !== Ze && Pl(e), e) : (l = r !== null, t = t !== null && t.memoizedState !== null, l && (r = e.child, h = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (h = r.alternate.memoizedState.cachePool.pool), g = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (g = r.memoizedState.cachePool.pool), g !== h && (r.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Yr(e, e.updateQueue), Ce(e), (e.mode & ga) !== Ze && l && (t = e.child, t !== null && (e.treeBaseDuration -= t.treeBaseDuration)), null);
          return Lt(e), t === null && Jg(
          ), Ce(e), null;
          return Gi(e.type, e), Ce(e), null;
          if (xt(Pn, e), h = e.memoizedState, h === null) return Ce(e), null;
          if (r = (e.flags & 128) !== 0, g = h.rendering, g === null)
            if (r) qo(h, !1);
              if (hn !== Ss || t !== null && (t.flags & 128) !== 0)
                  if (g = Wi(t), g !== null) {
                    for (e.flags |= 128, qo(h, !1), t = g.updateQueue, e.updateQueue = t, Yr(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                      Zm(l, t), l = l.sibling;
                    return Dt(
                      Pn,
                      Pn.current & cm | ty,
              h.tail !== null && _i() > Tb && (e.flags |= 128, r = !0, qo(h, !1), e.lanes = 4194304);
            if (!r)
              if (t = Wi(g), t !== null) {
                if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, Yr(e, t), qo(h, !0), h.tail === null && h.tailMode === "hidden" && !g.alternate && !Ee)
                  return Ce(e), null;
                2 * _i() - h.renderingStartTime > Tb && l !== 536870912 && (e.flags |= 128, r = !0, qo(h, !1), e.lanes = 4194304);
            h.isBackwards ? (g.sibling = e.child, e.child = g) : (t = h.last, t !== null ? t.sibling = g : e.child = g, h.last = g);
          return h.tail !== null ? (t = h.tail, h.rendering = t, h.tail = t.sibling, h.renderingStartTime = _i(), t.sibling = null, l = Pn.current, l = r ? l & cm | ty : l & cm, Dt(Pn, l, e), t) : (Ce(e), null);
          return Xa(e), Cl(e), r = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== r && (e.flags |= 8192) : r && (e.flags |= 8192), r ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ce(e), l = e.updateQueue, l !== null && Yr(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), r = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), r !== l && (e.flags |= 2048), t !== null && xt(Of, e), null;
          return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Gi(Wn, e), Ce(e), null;
    function x0(t, e) {
      switch (bd(e), e.tag) {
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & ga) !== Ze && Pl(e), e) : null;
          return Gi(Wn, e), Lt(e), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
          return ft(e), null;
          if (Xa(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
            Uu();
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & ga) !== Ze && Pl(e), e) : null;
          return xt(Pn, e), null;
          return Lt(e), null;
          return Gi(e.type, e), null;
          return Xa(e), Cl(e), t !== null && xt(Of, e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & ga) !== Ze && Pl(e), e) : null;
          return Gi(Wn, e), null;
    function xg(t, e) {
      switch (bd(e), e.tag) {
          Gi(Wn, e), Lt(e);
          ft(e);
          Lt(e);
          Xa(e);
          xt(Pn, e);
          Gi(e.type, e);
          Xa(e), Cl(e), t !== null && xt(Of, e);
          Gi(Wn, e);
    function kl(t) {
      return (t.mode & ga) !== Ze;
    function Eg(t, e) {
      kl(t) ? (wl(), Xu(e, t), al()) : Xu(e, t);
    function Fd(t, e, l) {
      kl(t) ? (wl(), Qu(
        l,
      ), al()) : Qu(
        l,
    function Xu(t, e) {
        var l = e.updateQueue, r = l !== null ? l.lastEffect : null;
        if (r !== null) {
          var h = r.next;
          l = h;
            if ((l.tag & t) === t && ((t & Fn) !== wi ? Et !== null && typeof Et.markComponentPassiveEffectMountStarted == "function" && Et.markComponentPassiveEffectMountStarted(
            ) : (t & pa) !== wi && Et !== null && typeof Et.markComponentLayoutEffectMountStarted == "function" && Et.markComponentLayoutEffectMountStarted(
            ), r = void 0, (t & Pa) !== wi && (bm = !0), r = Rt(
              iO,
              l
            ), (t & Pa) !== wi && (bm = !1), (t & Fn) !== wi ? Et !== null && typeof Et.markComponentPassiveEffectMountStopped == "function" && Et.markComponentPassiveEffectMountStopped() : (t & pa) !== wi && Et !== null && typeof Et.markComponentLayoutEffectMountStopped == "function" && Et.markComponentLayoutEffectMountStopped(), r !== void 0 && typeof r != "function")) {
              var g = void 0;
              g = (l.tag & pa) !== 0 ? "useLayoutEffect" : (l.tag & Pa) !== 0 ? "useInsertionEffect" : "useEffect";
              var T = void 0;
              T = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? `
It looks like you wrote ` + g + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:
` + g + `(() => {
Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + r, Rt(
                function(x, w) {
                    x,
                    w
                g,
                T
            l = l.next;
          } while (l !== h);
      } catch (x) {
        jt(e, e.return, x);
    function Qu(t, e, l) {
        var r = e.updateQueue, h = r !== null ? r.lastEffect : null;
        if (h !== null) {
          var g = h.next;
          r = g;
            if ((r.tag & t) === t) {
              var T = r.inst, x = T.destroy;
              x !== void 0 && (T.destroy = void 0, (t & Fn) !== wi ? Et !== null && typeof Et.markComponentPassiveEffectUnmountStarted == "function" && Et.markComponentPassiveEffectUnmountStarted(
              ) : (t & pa) !== wi && Et !== null && typeof Et.markComponentLayoutEffectUnmountStarted == "function" && Et.markComponentLayoutEffectUnmountStarted(
              ), (t & Pa) !== wi && (bm = !0), h = e, Rt(
                h,
                oO,
                h,
                l,
                x
              ), (t & Pa) !== wi && (bm = !1), (t & Fn) !== wi ? Et !== null && typeof Et.markComponentPassiveEffectUnmountStopped == "function" && Et.markComponentPassiveEffectUnmountStopped() : (t & pa) !== wi && Et !== null && typeof Et.markComponentLayoutEffectUnmountStopped == "function" && Et.markComponentLayoutEffectUnmountStopped());
            r = r.next;
          } while (r !== g);
      } catch (w) {
        jt(e, e.return, w);
    function Og(t, e) {
      kl(t) ? (wl(), Xu(e, t), al()) : Xu(e, t);
    function jr(t, e, l) {
      kl(t) ? (wl(), Qu(
        l,
      ), al()) : Qu(
        l,
    function Mg(t) {
        var l = t.stateNode;
        t.type.defaultProps || "ref" in t.memoizedProps || fm || (l.props !== t.memoizedProps && console.error(
          ht(t) || "instance"
        ), l.state !== t.memoizedState && console.error(
          ht(t) || "instance"
          Rt(
            y0,
            l
        } catch (r) {
          jt(t, t.return, r);
    function E0(t, e, l) {
      return t.getSnapshotBeforeUpdate(e, l);
    function Cv(t, e) {
      var l = e.memoizedProps, r = e.memoizedState;
      e = t.stateNode, t.type.defaultProps || "ref" in t.memoizedProps || fm || (e.props !== t.memoizedProps && console.error(
        ht(t) || "instance"
        ht(t) || "instance"
        var h = jo(
          l,
        ), g = Rt(
          E0,
          h,
          r
        l = FT, g !== void 0 || l.has(t.type) || (l.add(t.type), Rt(t, function() {
            ht(t)
        })), e.__reactInternalSnapshotBeforeUpdate = g;
      } catch (T) {
        jt(t, t.return, T);
    function Pd(t, e, l) {
      l.props = jo(
      ), l.state = t.memoizedState, kl(t) ? (wl(), Rt(
        ET,
        l
      ), al()) : Rt(
        ET,
        l
    function O0(t) {
            var l = t.stateNode;
            l = t.stateNode;
            l = t.stateNode;
          if (kl(t))
              wl(), t.refCleanup = e(l);
              al();
          else t.refCleanup = e(l);
            ht(t)
          ), e.current = l;
    function ac(t, e) {
        Rt(t, O0, t);
      } catch (l) {
        jt(t, e, l);
    function fl(t, e) {
      var l = t.ref, r = t.refCleanup;
      if (l !== null)
        if (typeof r == "function")
            if (kl(t))
                wl(), Rt(t, r);
                al(t);
            else Rt(t, r);
          } catch (h) {
            jt(t, e, h);
        else if (typeof l == "function")
            if (kl(t))
                wl(), Rt(t, l, null);
                al(t);
            else Rt(t, l, null);
          } catch (h) {
            jt(t, e, h);
        else l.current = null;
    function Dg(t, e, l, r) {
      var h = t.memoizedProps, g = h.id, T = h.onCommit;
      h = h.onRender, e = e === null ? "mount" : "update", cb && (e = "nested-update"), typeof h == "function" && h(
        g,
        l
      ), typeof T == "function" && T(
        r,
        l
    function M0(t, e, l, r) {
      var h = t.memoizedProps;
      t = h.id, h = h.onPostCommit, e = e === null ? "mount" : "update", cb && (e = "nested-update"), typeof h == "function" && h(
        r,
        l
    function D0(t) {
      var e = t.type, l = t.memoizedProps, r = t.stateNode;
        Rt(
          eo,
          r,
          l,
      } catch (h) {
        jt(t, t.return, h);
    function Ag(t, e, l) {
        Rt(
          an,
          l,
      } catch (r) {
        jt(t, t.return, r);
    function Rg(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && bi(t.type) || t.tag === 4;
    function Zu(t) {
          if (t.return === null || Rg(t.return)) return null;
          if (t.tag === 27 && bi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
    function qr(t, e, l) {
      var r = t.tag;
      if (r === 5 || r === 6)
        t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = to));
      else if (r !== 4 && (r === 27 && bi(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
        for (qr(t, e, l), t = t.sibling; t !== null; )
          qr(t, e, l), t = t.sibling;
    }
    function Ku(t, e, l) {
      var r = t.tag;
      if (r === 5 || r === 6)
        t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
      else if (r !== 4 && (r === 27 && bi(t.type) && (l = t.stateNode), t = t.child, t !== null))
        for (Ku(t, e, l), t = t.sibling; t !== null; )
          Ku(t, e, l), t = t.sibling;
    }
    function A0(t) {
      for (var e, l = t.return; l !== null; ) {
        if (Rg(l)) {
          e = l;
        l = l.return;
          e = e.stateNode, l = Zu(t), Ku(
            l,
          l = e.stateNode, e.flags & 32 && (no(l), e.flags &= -33), e = Zu(t), Ku(
            l
          e = e.stateNode.containerInfo, l = Zu(t), qr(
            l,
    function wg(t) {
      var e = t.stateNode, l = t.memoizedProps;
        Rt(
          Ka,
          l,
      } catch (r) {
        jt(t, t.return, r);
    function Id(t, e) {
      if (t = t.containerInfo, k1 = Bb, t = s0(t), Vm(t)) {
          var l = {
            l = (l = t.ownerDocument) && l.defaultView || window;
            var r = l.getSelection && l.getSelection();
            if (r && r.rangeCount !== 0) {
              l = r.anchorNode;
              var h = r.anchorOffset, g = r.focusNode;
              r = r.focusOffset;
                l.nodeType, g.nodeType;
                l = null;
              var T = 0, x = -1, w = -1, C = 0, F = 0, et = t, J = null;
                for (var lt; et !== l || h !== 0 && et.nodeType !== 3 || (x = T + h), et !== g || r !== 0 && et.nodeType !== 3 || (w = T + r), et.nodeType === 3 && (T += et.nodeValue.length), (lt = et.firstChild) !== null; )
                  J = et, et = lt;
                  if (et === t) break e;
                  if (J === l && ++C === h && (x = T), J === g && ++F === r && (w = T), (lt = et.nextSibling) !== null) break;
                  et = J, J = et.parentNode;
                et = lt;
              l = x === -1 || w === -1 ? null : { start: x, end: w };
            } else l = null;
        l = l || { start: 0, end: 0 };
      } else l = null;
      for (B1 = {
        selectionRange: l
      }, Bb = !1, oa = e; oa !== null; )
        if (e = oa, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
          t.return = e, oa = t;
          for (; oa !== null; ) {
            switch (t = e = oa, l = t.alternate, h = t.flags, t.tag) {
                (h & 1024) !== 0 && l !== null && Cv(t, l);
                if ((h & 1024) !== 0) {
                  if (t = t.stateNode.containerInfo, l = t.nodeType, l === 9)
                    mc(t);
                  else if (l === 1)
                        mc(t);
                if ((h & 1024) !== 0)
              t.return = e.return, oa = t;
            oa = e.return;
    function zg(t, e, l) {
      var r = l.flags;
      switch (l.tag) {
          ci(t, l), r & 4 && Eg(l, pa | zi);
          if (ci(t, l), r & 4)
            if (t = l.stateNode, e === null)
              l.type.defaultProps || "ref" in l.memoizedProps || fm || (t.props !== l.memoizedProps && console.error(
                ht(l) || "instance"
              ), t.state !== l.memoizedState && console.error(
                ht(l) || "instance"
              )), kl(l) ? (wl(), Rt(
                l,
                r1,
                l,
              ), al()) : Rt(
                l,
                r1,
                l,
              var h = jo(
                l.type,
              e = e.memoizedState, l.type.defaultProps || "ref" in l.memoizedProps || fm || (t.props !== l.memoizedProps && console.error(
                ht(l) || "instance"
              ), t.state !== l.memoizedState && console.error(
                ht(l) || "instance"
              )), kl(l) ? (wl(), Rt(
                l,
                TT,
                l,
                h,
              ), al()) : Rt(
                l,
                TT,
                l,
                h,
          r & 64 && Mg(l), r & 512 && ac(l, l.return);
          if (e = Rl(), ci(t, l), r & 64 && (r = l.updateQueue, r !== null)) {
            if (h = null, l.child !== null)
              switch (l.child.tag) {
                  h = l.child.stateNode;
                  h = l.child.stateNode;
              Rt(
                l,
                y0,
                r,
                h
            } catch (T) {
              jt(l, l.return, T);
          t.effectDuration += zo(e);
          e === null && r & 4 && wg(l);
          ci(t, l), e === null && r & 4 && D0(l), r & 512 && ac(l, l.return);
          if (r & 4) {
            r = Rl(), ci(t, l), t = l.stateNode, t.effectDuration += ku(r);
              Rt(
                l,
                Dg,
                l,
                sb,
            } catch (T) {
              jt(l, l.return, T);
          } else ci(t, l);
          ci(t, l), r & 4 && lc(t, l), r & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Jr.bind(
            l
          ), gc(t, l))));
          if (r = l.memoizedState !== null || vs, !r) {
            e = e !== null && e.memoizedState !== null || xn, h = vs;
            var g = xn;
            vs = r, (xn = e) && !g ? ri(
              l,
              (l.subtreeFlags & 8772) !== 0
            ) : ci(t, l), vs = h, xn = g;
          ci(t, l);
    function Cg(t) {
      e !== null && (t.alternate = null, Cg(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && xl(e)), t.stateNode = null, t._debugOwner = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    function Fi(t, e, l) {
      for (l = l.child; l !== null; )
        $u(
          l
        ), l = l.sibling;
    function $u(t, e, l) {
      if ($n && typeof $n.onCommitFiberUnmount == "function")
          $n.onCommitFiberUnmount(tu, l);
        } catch (g) {
          Ca || (Ca = !0, console.error(
            g
      switch (l.tag) {
          xn || fl(l, e), Fi(
            l
          ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
          xn || fl(l, e);
          var r = kn, h = vl;
          bi(l.type) && (kn = l.stateNode, vl = !1), Fi(
            l
          ), Rt(
            l,
            yc,
            l.stateNode
          ), kn = r, vl = h;
          xn || fl(l, e);
          if (r = kn, h = vl, kn = null, Fi(
            l
          ), kn = r, vl = h, kn !== null)
            if (vl)
                Rt(
                  l,
                  dc,
                  kn,
                  l.stateNode
              } catch (g) {
                jt(
                  l,
                  g
                Rt(
                  l,
                  ml,
                  kn,
                  l.stateNode
              } catch (g) {
                jt(
                  l,
                  g
          kn !== null && (vl ? (t = kn, hc(
            l.stateNode
          ), us(t)) : hc(kn, l.stateNode));
          r = kn, h = vl, kn = l.stateNode.containerInfo, vl = !0, Fi(
            l
          ), kn = r, vl = h;
          xn || Qu(
            Pa,
            l,
          ), xn || Fd(
            l,
            pa
          ), Fi(
            l
          xn || (fl(l, e), r = l.stateNode, typeof r.componentWillUnmount == "function" && Pd(
            l,
            r
          )), Fi(
            l
          Fi(
            l
          xn = (r = xn) || l.memoizedState !== null, Fi(
            l
          ), xn = r;
          Fi(
            l
    function lc(t, e) {
          Rt(
            Za,
        } catch (l) {
          jt(e, e.return, l);
    function th(t) {
          return e === null && (e = t.stateNode = new PT()), e;
          return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new PT()), e;
    function Ju(t, e) {
      var l = th(t);
      e.forEach(function(r) {
        var h = Qo.bind(null, t, r);
        if (!l.has(r)) {
          if (l.add(r), on)
            if (dm !== null && hm !== null)
              rc(hm, dm);
          r.then(h, h);
    function ea(t, e) {
      var l = e.deletions;
      if (l !== null)
        for (var r = 0; r < l.length; r++) {
          var h = t, g = e, T = l[r], x = g;
          t: for (; x !== null; ) {
            switch (x.tag) {
                if (bi(x.type)) {
                  kn = x.stateNode, vl = !1;
                kn = x.stateNode, vl = !1;
                kn = x.stateNode.containerInfo, vl = !0;
            x = x.return;
          if (kn === null)
          $u(h, g, T), kn = null, vl = !1, h = T, g = h.alternate, g !== null && (g.return = null), h.return = null;
          Hg(e, t), e = e.sibling;
    function Hg(t, e) {
      var l = t.alternate, r = t.flags;
          ea(e, t), Da(t), r & 4 && (Qu(
            Pa | zi,
          ), Xu(Pa | zi, t), Fd(
            pa | zi
          ea(e, t), Da(t), r & 512 && (xn || l === null || fl(l, l.return)), r & 64 && vs && (t = t.updateQueue, t !== null && (r = t.callbacks, r !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? r : l.concat(r))));
          var h = go;
          if (ea(e, t), Da(t), r & 512 && (xn || l === null || fl(l, l.return)), r & 4)
            if (e = l !== null ? l.memoizedState : null, r = t.memoizedState, l === null)
              if (r === null)
                    r = t.type, l = t.memoizedProps, e = h.ownerDocument || h;
                    e: switch (r) {
                        h = e.getElementsByTagName("title")[0], (!h || h[Ac] || h[la] || h.namespaceURI === Cc || h.hasAttribute("itemprop")) && (h = e.createElement(r), e.head.insertBefore(
                          h,
                        )), nn(h, r, l), h[la] = t, G(h), r = h;
                        var g = fp(
                        ).get(r + (l.href || ""));
                        if (g) {
                          for (var T = 0; T < g.length; T++)
                            if (h = g[T], h.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && h.getAttribute("rel") === (l.rel == null ? null : l.rel) && h.getAttribute("title") === (l.title == null ? null : l.title) && h.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              g.splice(T, 1);
                        h = e.createElement(r), nn(h, r, l), e.head.appendChild(h);
                        if (g = fp(
                        ).get(r + (l.content || ""))) {
                          for (T = 0; T < g.length; T++)
                            if (h = g[T], at(
                              l.content,
                            ), h.getAttribute("content") === (l.content == null ? null : "" + l.content) && h.getAttribute("name") === (l.name == null ? null : l.name) && h.getAttribute("property") === (l.property == null ? null : l.property) && h.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && h.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              g.splice(T, 1);
                        h = e.createElement(r), nn(h, r, l), e.head.appendChild(h);
                          'getNodesForType encountered a type it did not expect: "' + r + '". This is a bug in React.'
                    h[la] = t, G(h), r = h;
                  t.stateNode = r;
                  dp(
                    h,
                t.stateNode = xh(
                  h,
                  r,
              e !== r ? (e === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : e.count--, r === null ? dp(
                h,
              ) : xh(
                h,
                r,
              )) : r === null && t.stateNode !== null && Ag(
                l.memoizedProps
          ea(e, t), Da(t), r & 512 && (xn || l === null || fl(l, l.return)), l !== null && r & 4 && Ag(
            l.memoizedProps
          if (ea(e, t), Da(t), r & 512 && (xn || l === null || fl(l, l.return)), t.flags & 32) {
              Rt(t, no, e);
            } catch (F) {
              jt(t, t.return, F);
          r & 4 && t.stateNode != null && (e = t.memoizedProps, Ag(
            l !== null ? l.memoizedProps : e
          )), r & 1024 && (y1 = !0, t.type !== "form" && console.error(
          if (ea(e, t), Da(t), r & 4) {
            r = t.memoizedProps, l = l !== null ? l.memoizedProps : r, e = t.stateNode;
              Rt(
                as,
                l,
                r
            } catch (F) {
              jt(t, t.return, F);
          if (h = Rl(), Ub = null, g = go, go = Fr(e.containerInfo), ea(e, t), go = g, Da(t), r & 4 && l !== null && l.memoizedState.isDehydrated)
              Rt(
                op,
            } catch (F) {
              jt(t, t.return, F);
          y1 && (y1 = !1, Wu(t)), e.effectDuration += zo(h);
          r = go, go = Fr(
          ), ea(e, t), Da(t), go = r;
          r = Rl(), ea(e, t), Da(t), t.stateNode.effectDuration += ku(r);
          ea(e, t), Da(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (x1 = _i()), r & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, Ju(t, r)));
          h = t.memoizedState !== null;
          var x = l !== null && l.memoizedState !== null, w = vs, C = xn;
          if (vs = w || h, xn = C || x, ea(e, t), xn = C, vs = w, Da(t), r & 8192)
            t: for (e = t.stateNode, e._visibility = h ? e._visibility & ~lb : e._visibility | lb, h && (l === null || x || vs || xn || na(t)), l = null, e = t; ; ) {
                if (l === null) {
                  x = l = e;
                    g = x.stateNode, h ? Rt(x, wa, g) : Rt(
                      x,
                      lp,
                      x.stateNode,
                      x.memoizedProps
                  } catch (F) {
                    jt(x, x.return, F);
                if (l === null) {
                  x = e;
                    T = x.stateNode, h ? Rt(x, ap, T) : Rt(
                      x,
                      Sh,
                      T,
                      x.memoizedProps
                  } catch (F) {
                    jt(x, x.return, F);
                l === e && (l = null), e = e.return;
              l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          r & 4 && (r = t.updateQueue, r !== null && (l = r.retryQueue, l !== null && (r.retryQueue = null, Ju(t, l))));
          ea(e, t), Da(t), r & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, Ju(t, r)));
          ea(e, t), Da(t);
          Rt(t, A0, t);
        } catch (l) {
          jt(t, t.return, l);
    function Wu(t) {
          Wu(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
    function ci(t, e) {
          zg(t, e.alternate, e), e = e.sibling;
    function Qa(t) {
          Fd(
            pa
          ), na(t);
          fl(t, t.return);
          typeof e.componentWillUnmount == "function" && Pd(
          ), na(t);
          Rt(
            yc,
          fl(t, t.return), na(t);
          t.memoizedState === null && na(t);
          na(t);
          na(t);
    function na(t) {
        Qa(t), t = t.sibling;
    function Pi(t, e, l, r) {
      var h = l.flags;
      switch (l.tag) {
          ri(
            l,
            r
          ), Eg(l, pa);
          if (ri(
            l,
            r
          ), e = l.stateNode, typeof e.componentDidMount == "function" && Rt(
            l,
            r1,
            l,
          ), e = l.updateQueue, e !== null) {
            t = l.stateNode;
              Rt(
                l,
                Xs,
            } catch (g) {
              jt(l, l.return, g);
          r && h & 64 && Mg(l), ac(l, l.return);
          wg(l);
          ri(
            l,
            r
          ), r && e === null && h & 4 && D0(l), ac(l, l.return);
          if (r && h & 4) {
            h = Rl(), ri(
              l,
              r
            ), r = l.stateNode, r.effectDuration += ku(h);
              Rt(
                l,
                Dg,
                l,
                sb,
                r.effectDuration
            } catch (g) {
              jt(l, l.return, g);
            ri(
              l,
              r
          ri(
            l,
            r
          ), r && h & 4 && lc(t, l);
          l.memoizedState === null && ri(
            l,
            r
          ), ac(l, l.return);
          ri(
            l,
            r
    function ri(t, e, l) {
      for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; )
        Pi(
          l
    function fi(t, e) {
      var l = null;
      t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && Nu(t), l != null && Fl(l));
    function Bl(t, e) {
      t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (Nu(e), t != null && Fl(t));
    function He(t, e, l, r) {
          Vr(
            l,
            r
    function Vr(t, e, l, r) {
      var h = e.flags;
          He(
            l,
            r
          ), h & 2048 && Og(e, Fn | zi);
          He(
            l,
            r
          var g = Rl();
          He(
            l,
            r
          ), h & 2048 && (l = null, e.alternate !== null && (l = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== l && (Nu(e), l != null && Fl(l))), t.passiveEffectDuration += zo(g);
          if (h & 2048) {
            h = Rl(), He(
              l,
              r
            ), t = e.stateNode, t.passiveEffectDuration += ku(h);
              Rt(
                M0,
                sb,
            } catch (x) {
              jt(e, e.return, x);
            He(
              l,
              r
          He(
            l,
            r
          g = e.stateNode;
          var T = e.alternate;
          e.memoizedState !== null ? g._visibility & hs ? He(
            l,
            r
          ) : ic(
          ) : g._visibility & hs ? He(
            l,
            r
          ) : (g._visibility |= hs, Vo(
            l,
            r,
          )), h & 2048 && fi(T, e);
          He(
            l,
            r
          ), h & 2048 && Bl(e.alternate, e);
          He(
            l,
            r
    function Vo(t, e, l, r, h) {
      for (h = h && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; )
        eh(
          l,
          r,
          h
    function eh(t, e, l, r, h) {
      var g = e.flags;
          Vo(
            l,
            r,
            h
          ), Og(e, Fn);
          var T = e.stateNode;
          e.memoizedState !== null ? T._visibility & hs ? Vo(
            l,
            r,
            h
          ) : ic(
          ) : (T._visibility |= hs, Vo(
            l,
            r,
            h
          )), h && g & 2048 && fi(
          Vo(
            l,
            r,
            h
          ), h && g & 2048 && Bl(e.alternate, e);
          Vo(
            l,
            r,
            h
    function ic(t, e) {
          var l = t, r = e, h = r.flags;
          switch (r.tag) {
              ic(
                l,
                r
              ), h & 2048 && fi(
                r.alternate,
                r
              ic(
                l,
                r
              ), h & 2048 && Bl(
                r.alternate,
                r
              ic(
                l,
                r
    function Fu(t) {
      if (t.subtreeFlags & ey)
          Go(t), t = t.sibling;
    function Go(t) {
          Fu(t), t.flags & ey && t.memoizedState !== null && Y0(
            go,
          Fu(t);
          var e = go;
          go = Fr(
          ), Fu(t), go = e;
          t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = ey, ey = 16777216, Fu(t), ey = e) : Fu(t));
          Fu(t);
    function Gr(t) {
    function oc(t) {
          for (var l = 0; l < e.length; l++) {
            var r = e[l];
            oa = r, Ng(
              r,
        Gr(t);
          Ug(t), t = t.sibling;
    function Ug(t) {
          oc(t), t.flags & 2048 && jr(
            Fn | zi
          var e = Rl();
          oc(t), t.stateNode.passiveEffectDuration += zo(e);
          e = Rl(), oc(t), t.stateNode.passiveEffectDuration += ku(e);
          e = t.stateNode, t.memoizedState !== null && e._visibility & hs && (t.return === null || t.return.tag !== 13) ? (e._visibility &= ~hs, Xr(t)) : oc(t);
          oc(t);
    function Xr(t) {
          for (var l = 0; l < e.length; l++) {
            var r = e[l];
            oa = r, Ng(
              r,
        Gr(t);
        Qr(t), t = t.sibling;
    function Qr(t) {
          jr(
            Fn
          ), Xr(t);
          e._visibility & hs && (e._visibility &= ~hs, Xr(t));
          Xr(t);
    function Ng(t, e) {
      for (; oa !== null; ) {
        var l = oa, r = l;
        switch (r.tag) {
            jr(
              r,
              Fn
            r.memoizedState !== null && r.memoizedState.cachePool !== null && (r = r.memoizedState.cachePool.pool, r != null && Nu(r));
            Fl(r.memoizedState.cache);
        if (r = l.child, r !== null) r.return = l, oa = r;
          t: for (l = t; oa !== null; ) {
            r = oa;
            var h = r.sibling, g = r.return;
            if (Cg(r), r === l) {
              oa = null;
            if (h !== null) {
              h.return = g, oa = h;
            oa = g;
    function kg() {
      sO.forEach(function(t) {
    function Bg() {
      return t || I.actQueue === null || console.error(
    function Aa(t) {
      if ((we & Ia) !== ql && me !== 0)
        return me & -me;
      var e = I.T;
      return e !== null ? (e._updatedFibers || (e._updatedFibers = /* @__PURE__ */ new Set()), e._updatedFibers.add(t), t = Ef, t !== 0 ? t : Zg()) : tr();
    }
    function R0() {
      Gl === 0 && (Gl = (me & 536870912) === 0 || Ee ? ae() : 536870912);
      var t = Hi.current;
      return t !== null && (t.flags |= 32), Gl;
    }
    function tn(t, e, l) {
      if (bm && console.error("useInsertionEffect must not schedule updates."), A1 && (_b = !0), (t === je && (Ue === Rf || Ue === wf) || t.cancelPendingCommit !== null) && (Iu(t, 0), Ii(
        me,
        Gl,
      )), Bi(t, l), (we & Ia) !== 0 && t === je) {
        if (Ua)
              t = he && ht(he) || "Unknown", s_.has(t) || (s_.add(t), e = ht(e) || "Unknown", console.error(
              u_ || (console.error(
              ), u_ = !0);
        on && el(t, e, l), H0(e), t === je && ((we & Ia) === ql && (Yc |= l), hn === Af && Ii(
          me,
          Gl,
        )), dl(t);
    function Tn(t, e, l) {
      if ((we & (Ia | po)) !== ql)
      var r = !l && (e & 124) === 0 && (e & t.expiredLanes) === 0 || vo(t, e), h = r ? Yg(t, e) : ih(t, e, !0), g = r;
        if (h === Ss) {
          pm && !r && Ii(t, e, 0, !1);
          if (l = t.current.alternate, g && !w0(l)) {
            h = ih(t, e, !1), g = !1;
          if (h === mm) {
            if (g = e, t.errorRecoveryDisabledLanes & g)
              var T = 0;
              T = t.pendingLanes & -536870913, T = T !== 0 ? T : T & 536870912 ? 536870912 : 0;
            if (T !== 0) {
              e = T;
                h = t;
                var x = T;
                T = uy;
                var w = h.current.memoizedState.isDehydrated;
                if (w && (Iu(
                  h,
                  x
                ).flags |= 256), x = ih(
                  h,
                  x,
                ), x !== mm) {
                  if (T1 && !w) {
                    h.errorRecoveryDisabledLanes |= g, Yc |= g, h = Af;
                  h = tl, tl = T, h !== null && (tl === null ? tl = h : tl.push.apply(
                    tl,
                    h
                h = x;
              if (g = !1, h !== mm) continue;
          if (h === ay) {
            Iu(t, 0), Ii(t, e, 0, !0);
            switch (r = t, h) {
              case Ss:
              case ay:
              case Af:
              case vb:
                Ii(
                  r,
                  Gl,
                  !Bc
              case mm:
                tl = null;
              case b1:
              case IT:
            if (I.actQueue !== null)
              rh(
                r,
                l,
                tl,
                sy,
                Sb,
                Gl,
                Yc,
                zf
              if ((e & 62914560) === e && (g = x1 + e_ - _i(), 10 < g)) {
                if (Ii(
                  r,
                  Gl,
                  !Bc
                ), An(r, 0, !0) !== 0) break t;
                r.timeoutHandle = p_(
                  Cn.bind(
                    r,
                    l,
                    tl,
                    sy,
                    Sb,
                    Gl,
                    Yc,
                    zf,
                    Bc,
                    h,
                    dO,
                    aT,
                  g
              Cn(
                r,
                l,
                tl,
                sy,
                Sb,
                Gl,
                Yc,
                zf,
                Bc,
                h,
                rO,
                aT,
      dl(t);
    function Cn(t, e, l, r, h, g, T, x, w, C, F, et, J, lt) {
      if (t.timeoutHandle = kf, et = e.subtreeFlags, (et & 8192 || (et & 16785408) === 16785408) && (my = { stylesheets: null, count: 0, unsuspend: L0 }, Go(e), et = j0(), et !== null)) {
        t.cancelPendingCommit = et(
          rh.bind(
            g,
            l,
            r,
            h,
            T,
            x,
            w,
            F,
            fO,
            J,
            lt
        ), Ii(
          g,
          T,
          !C
      rh(
        g,
        l,
        r,
        h,
        T,
        x,
        w
    function w0(t) {
        var l = e.tag;
        if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
          for (var r = 0; r < l.length; r++) {
            var h = l[r], g = h.getSnapshot;
            h = h.value;
              if (!Wa(g(), h)) return !1;
        if (l = e.child, e.subtreeFlags & 16384 && l !== null)
          l.return = e, e = l;
    function Ii(t, e, l, r) {
      e &= ~_1, e &= ~Yc, t.suspendedLanes |= e, t.pingedLanes &= ~e, r && (t.warmLanes |= e), r = t.expirationTimes;
      for (var h = e; 0 < h; ) {
        var g = 31 - aa(h), T = 1 << g;
        r[g] = -1, h &= ~T;
      l !== 0 && Ic(t, l, e);
    function Pu() {
      return (we & (Ia | po)) === ql ? (ts(0), !1) : !0;
    function nh() {
      if (he !== null) {
        if (Ue === Sl)
          var t = he.return;
          t = he, vd(), Hl(t), um = null, Ip = 0, t = he;
          xg(t.alternate, t), t = t.return;
        he = null;
      }
    }
    function Iu(t, e) {
      var l = t.timeoutHandle;
      l !== kf && (t.timeoutHandle = kf, OO(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), nh(), je = t, he = l = Jl(t.current, null), me = e, Ue = Sl, Vl = null, Bc = !1, pm = vo(t, e), T1 = !1, hn = Ss, zf = Gl = _1 = Yc = Lc = 0, tl = uy = null, Sb = !1, (e & 8) !== 0 && (e |= e & 32);
      var r = t.entangledLanes;
      if (r !== 0)
        for (t = t.entanglements, r &= e; 0 < r; ) {
          var h = 31 - aa(r), g = 1 << h;
          e |= t[h], r &= ~g;
        }
      return cu = e, dr(), e = eT(), 1e3 < e - tT && (I.recentlyCreatedOwnerStacks = 0, tT = e), ho.discardPendingWarnings(), l;
    }
    function Zr(t, e) {
      $t = null, I.H = yb, I.getCurrentStack = null, Ua = !1, Ja = null, e === Jp || e === db ? (e = og(), Ue = iy) : e === oT ? (e = og(), Ue = t_) : Ue = e === XT ? S1 : e !== null && typeof e == "object" && typeof e.then == "function" ? gm : ly, Vl = e;
      var l = he;
      if (l === null)
        hn = ay, nc(
          qa(e, t.current)
        switch (l.mode & ga && Xi(l), va(), Ue) {
          case ly:
            Et !== null && typeof Et.markComponentErrored == "function" && Et.markComponentErrored(
              l,
              me
          case Rf:
          case wf:
          case iy:
          case gm:
          case oy:
            Et !== null && typeof Et.markComponentSuspended == "function" && Et.markComponentSuspended(
              l,
              me
    function ah() {
      var t = I.H;
      return I.H = yb, t === null ? yb : t;
    function Lg() {
      var t = I.A;
      return I.A = uO, t;
    function lh() {
      hn = Af, Bc || (me & 4194048) !== me && Hi.current !== null || (pm = !0), (Lc & 134217727) === 0 && (Yc & 134217727) === 0 || je === null || Ii(
        je,
        me,
        Gl,
    function ih(t, e, l) {
      var r = we;
      we |= Ia;
      var h = ah(), g = Lg();
      if (je !== t || me !== e) {
        if (on) {
          var T = t.memoizedUpdaters;
          0 < T.size && (rc(t, me), T.clear()), Yn(t, e);
        sy = null, Iu(t, e);
      Xl(e), e = !1, T = hn;
          if (Ue !== Sl && he !== null) {
            var x = he, w = Vl;
            switch (Ue) {
              case S1:
                nh(), T = vb;
              case iy:
              case Rf:
              case wf:
              case gm:
                Hi.current === null && (e = !0);
                var C = Ue;
                if (Ue = Sl, Vl = null, Xo(t, x, w, C), l && pm) {
                  T = Ss;
                C = Ue, Ue = Sl, Vl = null, Xo(t, x, w, C);
          oh(), T = hn;
        } catch (F) {
          Zr(t, F);
      return e && t.shellSuspendCounter++, vd(), we = r, I.H = h, I.A = g, vu(), he === null && (je = null, me = 0, dr()), T;
    function oh() {
      for (; he !== null; ) qg(he);
    function Yg(t, e) {
      var l = we;
      we |= Ia;
      var r = ah(), h = Lg();
      if (je !== t || me !== e) {
        if (on) {
          var g = t.memoizedUpdaters;
          0 < g.size && (rc(t, me), g.clear()), Yn(t, e);
        }
        sy = null, Tb = _i() + n_, Iu(t, e);
        pm = vo(
      Xl(e);
          if (Ue !== Sl && he !== null)
            e: switch (e = he, g = Vl, Ue) {
              case ly:
                Ue = Sl, Vl = null, Xo(
                  g,
                  ly
              case Rf:
              case wf:
                if (ig(g)) {
                  Ue = Sl, Vl = null, uh(e);
                  Ue !== Rf && Ue !== wf || je !== t || (Ue = oy), dl(t);
                }, g.then(e, e);
              case iy:
                Ue = oy;
              case t_:
                Ue = v1;
              case oy:
                ig(g) ? (Ue = Sl, Vl = null, uh(e)) : (Ue = Sl, Vl = null, Xo(
                  g,
                  oy
              case v1:
                var T = null;
                switch (he.tag) {
                    T = he.memoizedState;
                    var x = he;
                    if (!T || Pr(T)) {
                      Ue = Sl, Vl = null;
                      var w = x.sibling;
                      if (w !== null) he = w;
                        var C = x.return;
                        C !== null ? (he = C, Kr(C)) : he = null;
                Ue = Sl, Vl = null, Xo(
                  g,
                  v1
              case gm:
                Ue = Sl, Vl = null, Xo(
                  g,
                  gm
              case S1:
                nh(), hn = vb;
          I.actQueue !== null ? oh() : jg();
        } catch (F) {
          Zr(t, F);
      return vd(), I.H = r, I.A = h, we = l, he !== null ? (Et !== null && typeof Et.markRenderYielded == "function" && Et.markRenderYielded(), Ss) : (vu(), je = null, me = 0, dr(), hn);
    function jg() {
      for (; he !== null && !K0(); )
        qg(he);
    function qg(t) {
      (t.mode & ga) !== Ze ? (Sd(t), e = Rt(
        Wd,
        cu
      ), Xi(t)) : e = Rt(
        Wd,
        cu
      ), t.memoizedProps = t.pendingProps, e === null ? Kr(t) : he = e;
    function uh(t) {
      var e = Rt(t, sh, t);
      t.memoizedProps = t.pendingProps, e === null ? Kr(t) : he = e;
    function sh(t) {
      var e = t.alternate, l = (t.mode & ga) !== Ze;
      switch (l && Sd(t), t.tag) {
          e = bg(
            me
          e = bg(
            me
          Hl(t);
          xg(e, t), t = he = Zm(t, cu), e = Wd(e, t, cu);
      return l && Xi(t), e;
    function Xo(t, e, l, r) {
      vd(), Hl(e), um = null, Ip = 0;
      var h = e.return;
        if (Hr(
          h,
          l,
          me
          hn = ay, nc(
            qa(l, t.current)
          ), he = null;
      } catch (g) {
        if (h !== null) throw he = h, g;
        hn = ay, nc(
          qa(l, t.current)
        ), he = null;
      e.flags & 32768 ? (Ee || r === ly ? t = !0 : pm || (me & 536870912) !== 0 ? t = !1 : (Bc = t = !0, (r === Rf || r === wf || r === iy || r === gm) && (r = Hi.current, r !== null && r.tag === 13 && (r.flags |= 16384))), ch(e, t)) : Kr(e);
    function Kr(t) {
          ch(
            Bc
        var l = e.alternate;
        if (t = e.return, Sd(e), l = Rt(
          _0,
          l,
          cu
        ), (e.mode & ga) !== Ze && Bu(e), l !== null) {
          he = l;
          he = e;
        he = e = t;
      hn === Ss && (hn = IT);
    function ch(t, e) {
        var l = x0(t.alternate, t);
        if (l !== null) {
          l.flags &= 32767, he = l;
        if ((t.mode & ga) !== Ze) {
          Bu(t), l = t.actualDuration;
          for (var r = t.child; r !== null; )
            l += r.actualDuration, r = r.sibling;
          t.actualDuration = l;
        if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
          he = t;
        he = t = l;
      hn = vb, he = null;
    function rh(t, e, l, r, h, g, T, x, w) {
        uc();
      while (ya !== Cf);
      if (ho.flushLegacyContextWarning(), ho.flushPendingUnsafeLifecycleWarnings(), (we & (Ia | po)) !== ql)
      if (Et !== null && typeof Et.markCommitStarted == "function" && Et.markCommitStarted(l), e === null) Qt();
        if (l === 0 && console.error(
        if (g = e.lanes | e.childLanes, g |= Fv, If(
          l,
          g,
          T,
          x,
          w
        ), t === je && (he = je = null, me = 0), ym = e, qc = t, Vc = l, O1 = g, M1 = h, o_ = r, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Qg(Oc, function() {
          return $r(), null;
        })) : (t.callbackNode = null, t.callbackPriority = 0), sb = nm(), r = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || r) {
          r = I.T, I.T = null, h = Gt.p, Gt.p = Jn, T = we, we |= po;
            Id(t, e, l);
            we = T, Gt.p = h, I.T = r;
        ya = a_, di(), fh(), z0();
    function di() {
      if (ya === a_) {
        ya = Cf;
        var t = qc, e = ym, l = Vc, r = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || r) {
          r = I.T, I.T = null;
          var h = Gt.p;
          Gt.p = Jn;
          var g = we;
          we |= po;
            dm = l, hm = t, Hg(e, t), hm = dm = null, l = B1;
            var T = s0(t.containerInfo), x = l.focusedElem, w = l.selectionRange;
            if (T !== x && x && x.ownerDocument && u0(
              x.ownerDocument.documentElement,
              x
              if (w !== null && Vm(x)) {
                var C = w.start, F = w.end;
                if (F === void 0 && (F = C), "selectionStart" in x)
                  x.selectionStart = C, x.selectionEnd = Math.min(
                    F,
                    x.value.length
                  var et = x.ownerDocument || document, J = et && et.defaultView || window;
                  if (J.getSelection) {
                    var lt = J.getSelection(), wt = x.textContent.length, Xt = Math.min(
                      w.start,
                      wt
                    ), qe = w.end === void 0 ? Xt : Math.min(w.end, wt);
                    !lt.extend && Xt > qe && (T = qe, qe = Xt, Xt = T);
                    var ye = qm(
                      x,
                      Xt
                    ), N = qm(
                      x,
                      qe
                    if (ye && N && (lt.rangeCount !== 1 || lt.anchorNode !== ye.node || lt.anchorOffset !== ye.offset || lt.focusNode !== N.node || lt.focusOffset !== N.offset)) {
                      var k = et.createRange();
                      k.setStart(ye.node, ye.offset), lt.removeAllRanges(), Xt > qe ? (lt.addRange(k), lt.extend(N.node, N.offset)) : (k.setEnd(N.node, N.offset), lt.addRange(k));
              for (et = [], lt = x; lt = lt.parentNode; )
                lt.nodeType === 1 && et.push({
                  element: lt,
                  left: lt.scrollLeft,
                  top: lt.scrollTop
              for (typeof x.focus == "function" && x.focus(), x = 0; x < et.length; x++) {
                var Y = et[x];
                Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
            Bb = !!k1, B1 = k1 = null;
            we = g, Gt.p = h, I.T = r;
        t.current = e, ya = l_;
    function fh() {
      if (ya === l_) {
        ya = Cf;
        var t = qc, e = ym, l = Vc, r = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || r) {
          r = I.T, I.T = null;
          var h = Gt.p;
          Gt.p = Jn;
          var g = we;
          we |= po;
            Et !== null && typeof Et.markLayoutEffectsStarted == "function" && Et.markLayoutEffectsStarted(l), dm = l, hm = t, zg(
            ), hm = dm = null, Et !== null && typeof Et.markLayoutEffectsStopped == "function" && Et.markLayoutEffectsStopped();
            we = g, Gt.p = h, I.T = r;
        ya = i_;
    function z0() {
      if (ya === hO || ya === i_) {
        ya = Cf, jv();
        var t = qc, e = ym, l = Vc, r = o_, h = (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0;
        h ? ya = E1 : (ya = Cf, ym = qc = null, hi(t, t.pendingLanes), Hf = 0, ry = null);
        var g = t.pendingLanes;
        if (g === 0 && (jc = null), h || cc(t), h = zs(l), e = e.stateNode, $n && typeof $n.onCommitFiberRoot == "function")
            var T = (e.current.flags & 128) === 128;
            switch (h) {
              case Jn:
                var x = Uh;
              case jl:
                x = ff;
              case so:
                x = Oc;
              case Lh:
                x = df;
                x = Oc;
            $n.onCommitFiberRoot(
              tu,
              x,
              T
          } catch (et) {
            Ca || (Ca = !0, console.error(
              et
        if (on && t.memoizedUpdaters.clear(), kg(), r !== null) {
          T = I.T, x = Gt.p, Gt.p = Jn, I.T = null;
            var w = t.onRecoverableError;
            for (e = 0; e < r.length; e++) {
              var C = r[e], F = C0(C.stack);
              Rt(
                C.source,
                w,
                C.value,
                F
            I.T = T, Gt.p = x;
        (Vc & 3) !== 0 && uc(), dl(t), g = t.pendingLanes, (l & 4194090) !== 0 && (g & 42) !== 0 ? (rb = !0, t === D1 ? cy++ : (cy = 0, D1 = t)) : cy = 0, ts(0), Qt();
    function C0(t) {
    function hi(t, e) {
      (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Fl(e)));
    }
    function uc(t) {
      return di(), fh(), z0(), $r();
    }
    function $r() {
      if (ya !== E1) return !1;
      var t = qc, e = O1;
      O1 = 0;
      var l = zs(Vc), r = so > l ? so : l;
      l = I.T;
      var h = Gt.p;
        Gt.p = r, I.T = null, r = M1, M1 = null;
        var g = qc, T = Vc;
        if (ya = Cf, ym = qc = null, Vc = 0, (we & (Ia | po)) !== ql)
        A1 = !0, _b = !1, Et !== null && typeof Et.markPassiveEffectsStarted == "function" && Et.markPassiveEffectsStarted(T);
        var x = we;
        if (we |= po, Ug(g.current), Vr(
          g,
          g.current,
          T,
          r
        ), Et !== null && typeof Et.markPassiveEffectsStopped == "function" && Et.markPassiveEffectsStopped(), cc(g), we = x, ts(0, !1), _b ? g === ry ? Hf++ : (Hf = 0, ry = g) : Hf = 0, _b = A1 = !1, $n && typeof $n.onPostCommitFiberRoot == "function")
            $n.onPostCommitFiberRoot(tu, g);
          } catch (C) {
            Ca || (Ca = !0, console.error(
              C
        var w = g.current.stateNode;
        return w.effectDuration = 0, w.passiveEffectDuration = 0, !0;
        Gt.p = h, I.T = l, hi(t, e);
    function sc(t, e, l) {
      e = qa(l, e), e = ta(t.stateNode, e, 2), t = zl(t, e, 2), t !== null && (Bi(t, 2), dl(t));
    function jt(t, e, l) {
      if (bm = !1, t.tag === 3)
        sc(t, t, l);
            sc(
              l
            var r = e.stateNode;
            if (typeof e.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (jc === null || !jc.has(r))) {
              t = qa(l, t), l = Ie(2), r = zl(e, l, 2), r !== null && (Cr(
                l,
                r,
              ), Bi(r, 2), dl(r));
          l
    function Vg(t, e, l) {
      var r = t.pingCache;
      if (r === null) {
        r = t.pingCache = new cO();
        var h = /* @__PURE__ */ new Set();
        r.set(e, h);
        h = r.get(e), h === void 0 && (h = /* @__PURE__ */ new Set(), r.set(e, h));
      h.has(l) || (T1 = !0, h.add(l), r = Hv.bind(null, t, e, l), on && rc(t, l), e.then(r, r));
    function Hv(t, e, l) {
      var r = t.pingCache;
      r !== null && r.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Bg() && I.actQueue === null && console.error(
      ), je === t && (me & l) === l && (hn === Af || hn === b1 && (me & 62914560) === me && _i() - x1 < e_ ? (we & Ia) === ql && Iu(t, 0) : _1 |= l, zf === me && (zf = 0)), dl(t);
    function Gg(t, e) {
      e === 0 && (e = Zl()), t = Ta(t, e), t !== null && (Bi(t, e), dl(t));
    function Jr(t) {
      var e = t.memoizedState, l = 0;
      e !== null && (l = e.retryLane), Gg(t, l);
    function Qo(t, e) {
      var l = 0;
          var r = t.stateNode, h = t.memoizedState;
          h !== null && (l = h.retryLane);
          r = t.stateNode;
          r = t.stateNode._retryCache;
      r !== null && r.delete(e), Gg(t, l);
    function dh(t, e, l) {
          var r = t, h = e, g = h.type === Sc;
          g = l || g, h.tag !== 22 ? h.flags & 67108864 ? g && Rt(
            h,
            Xg,
            r,
            h,
            (h.mode & FS) === Ze
          ) : dh(
            r,
            h,
            g
          ) : h.memoizedState === null && (g && h.flags & 8192 ? Rt(
            h,
            Xg,
            r,
            h
          ) : h.subtreeFlags & 67108864 && Rt(
            h,
            dh,
            r,
            h,
            g
    function Xg(t, e) {
      var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      vt(!0);
        Qa(e), l && Qr(e), Pi(t, e.alternate, e, !1), l && eh(t, e, 0, null, !1, 0);
        vt(!1);
    function cc(t) {
      t.current.mode & (Na | fo) || (e = !1), dh(
    function Ll(t) {
      if ((we & Ia) === ql) {
          if (e = ht(t) || "ReactComponent", xb !== null) {
            if (xb.has(e)) return;
            xb.add(e);
          } else xb = /* @__PURE__ */ new Set([e]);
          Rt(t, function() {
    function rc(t, e) {
      on && t.memoizedUpdaters.forEach(function(l) {
        el(t, l, e);
    function Qg(t, e) {
      var l = I.actQueue;
      return l !== null ? (l.push(e), pO) : Hh(t, e);
    function H0(t) {
      Bg() && I.actQueue === null && Rt(t, function() {
          ht(t)
    function dl(t) {
      t !== vm && t.next === null && (vm === null ? Eb = vm = t : vm = vm.next = t), Ob = !0, I.actQueue !== null ? w1 || (w1 = !0, _n()) : R1 || (R1 = !0, _n());
    function ts(t, e) {
      if (!z1 && Ob) {
        z1 = !0;
          for (var l = !1, r = Eb; r !== null; ) {
              var h = r.pendingLanes;
              if (h === 0) var g = 0;
                var T = r.suspendedLanes, x = r.pingedLanes;
                g = (1 << 31 - aa(42 | t) + 1) - 1, g &= h & ~(T & ~x), g = g & 201326741 ? g & 201326741 | 1 : g ? g | 2 : 0;
              g !== 0 && (l = !0, gh(r, g));
              g = me, g = An(
                r,
                r === je ? g : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== kf
              ), (g & 3) === 0 || vo(r, g) || (l = !0, gh(r, g));
            r = r.next;
        while (l);
        z1 = !1;
    function hh() {
      mh();
    function mh() {
      Ob = w1 = R1 = !1;
      Uf !== 0 && (fc() && (t = Uf), Uf = 0);
      for (var e = _i(), l = null, r = Eb; r !== null; ) {
        var h = r.next, g = mi(r, e);
        g === 0 ? (r.next = null, l === null ? Eb = h : l.next = h, h === null && (vm = l)) : (l = r, (t !== 0 || (g & 3) !== 0) && (Ob = !0)), r = h;
      ts(t);
    function mi(t, e) {
      for (var l = t.suspendedLanes, r = t.pingedLanes, h = t.expirationTimes, g = t.pendingLanes & -62914561; 0 < g; ) {
        var T = 31 - aa(g), x = 1 << T, w = h[T];
        w === -1 ? ((x & l) === 0 || (x & r) !== 0) && (h[T] = Pf(x, e)) : w <= e && (t.expiredLanes |= x), g &= ~x;
      if (e = je, l = me, l = An(
        t === e ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== kf
      ), r = t.callbackNode, l === 0 || t === e && (Ue === Rf || Ue === wf) || t.cancelPendingCommit !== null)
        return r !== null && ph(r), t.callbackNode = null, t.callbackPriority = 0;
      if ((l & 3) === 0 || vo(t, l)) {
        if (e = l & -l, e !== t.callbackPriority || I.actQueue !== null && r !== C1)
          ph(r);
        switch (zs(l)) {
          case Jn:
          case jl:
            l = ff;
          case so:
            l = Oc;
          case Lh:
            l = df;
            l = Oc;
        return r = en.bind(null, t), I.actQueue !== null ? (I.actQueue.push(r), l = C1) : l = Hh(l, r), t.callbackPriority = e, t.callbackNode = l, e;
      return r !== null && ph(r), t.callbackPriority = 2, t.callbackNode = null, 2;
    function en(t, e) {
      if (rb = cb = !1, ya !== Cf && ya !== E1)
      var l = t.callbackNode;
      if (uc() && t.callbackNode !== l)
      var r = me;
      return r = An(
        t === je ? r : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== kf
      ), r === 0 ? null : (Tn(
        r,
      ), mi(t, _i()), t.callbackNode != null && t.callbackNode === l ? en.bind(null, t) : null);
    }
    function gh(t, e) {
      if (uc()) return null;
      cb = rb, rb = !1, Tn(t, e, !0);
    }
    function ph(t) {
      t !== C1 && t !== null && Yv(t);
    }
    function _n() {
      I.actQueue !== null && I.actQueue.push(function() {
        return mh(), null;
      }), MO(function() {
        (we & (Ia | po)) !== ql ? Hh(
          Uh,
          hh
        ) : mh();
    function Zg() {
      return Uf === 0 && (Uf = ae()), Uf;
    function Kg(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : (at(t, "action"), Ls("" + t));
    function $g(t, e) {
      var l = e.ownerDocument.createElement("input");
      return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
    }
    function Xe(t, e, l, r, h) {
      if (e === "submit" && l && l.stateNode === h) {
        var g = Kg(
          (h[Ha] || null).action
        ), T = r.submitter;
        T && (e = (e = T[Ha] || null) ? Kg(e.formAction) : T.getAttribute("formAction"), e !== null && (g = e, T = null));
        var x = new Bt(
          r,
          h
          event: x,
                if (r.defaultPrevented) {
                  if (Uf !== 0) {
                    var w = T ? $g(
                      h,
                      T
                    ) : new FormData(h), C = {
                      data: w,
                      method: h.method,
                      action: g
                    Object.freeze(C), qu(
                      l,
                      C,
                      w
                  typeof g == "function" && (x.preventDefault(), w = T ? $g(
                    h,
                    T
                  ) : new FormData(h), C = {
                    data: w,
                    method: h.method,
                    action: g
                  }, Object.freeze(C), qu(
                    l,
                    C,
                    g,
                    w
              currentTarget: h
    function Xn(t, e, l) {
      t.currentTarget = l;
      } catch (r) {
        h1(r);
    function gi(t, e) {
      for (var l = 0; l < t.length; l++) {
        var r = t[l];
          var h = void 0, g = r.event;
          if (r = r.listeners, e)
            for (var T = r.length - 1; 0 <= T; T--) {
              var x = r[T], w = x.instance, C = x.currentTarget;
              if (x = x.listener, w !== h && g.isPropagationStopped())
              w !== null ? Rt(
                w,
                Xn,
                g,
                x,
                C
              ) : Xn(g, x, C), h = w;
            for (T = 0; T < r.length; T++) {
              if (x = r[T], w = x.instance, C = x.currentTarget, x = x.listener, w !== h && g.isPropagationStopped())
              w !== null ? Rt(
                w,
                Xn,
                g,
                x,
                C
              ) : Xn(g, x, C), h = w;
    function ce(t, e) {
      H1.has(t) || console.error(
      var l = e[Tp];
      l === void 0 && (l = e[Tp] = /* @__PURE__ */ new Set());
      var r = t + "__bubble";
      l.has(r) || (bh(e, t, 2, !1), l.add(r));
    function yh(t, e, l) {
      H1.has(t) && !e && console.error(
      var r = 0;
      e && (r |= 4), bh(
        l,
        r,
    function Jg(t) {
      if (!t[Mb]) {
        t[Mb] = !0, J0.forEach(function(l) {
          l !== "selectionchange" && (H1.has(l) || yh(l, !1, t), yh(l, !0, t));
        e === null || e[Mb] || (e[Mb] = !0, yh("selectionchange", !1, e));
    function bh(t, e, l, r) {
      switch (Rh(e)) {
        case Jn:
          var h = kv;
        case jl:
          h = Ah;
          h = Jo;
      l = h.bind(
        l,
      ), h = void 0, !K || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (h = !0), r ? h !== void 0 ? t.addEventListener(e, l, {
        passive: h
      }) : t.addEventListener(e, l, !0) : h !== void 0 ? t.addEventListener(e, l, {
        passive: h
        l,
    function fa(t, e, l, r, h) {
      var g = r;
      if ((e & 1) === 0 && (e & 2) === 0 && r !== null)
          if (r === null) return;
          var T = r.tag;
          if (T === 3 || T === 4) {
            var x = r.stateNode.containerInfo;
            if (x === h) break;
            if (T === 4)
              for (T = r.return; T !== null; ) {
                var w = T.tag;
                if ((w === 3 || w === 4) && T.stateNode.containerInfo === h)
                T = T.return;
            for (; x !== null; ) {
              if (T = Sa(x), T === null) return;
              if (w = T.tag, w === 5 || w === 6 || w === 26 || w === 27) {
                r = g = T;
              x = x.parentNode;
          r = r.return;
      cd(function() {
        var C = g, F = Du(l), et = [];
          var J = WS.get(t);
          if (J !== void 0) {
            var lt = Bt, wt = t;
                if (Ys(l) === 0) break t;
                lt = HE;
                wt = "focus", lt = be;
                wt = "blur", lt = be;
                lt = be;
                if (l.button === 2) break t;
                lt = oe;
                lt = qt;
                lt = kE;
              case ZS:
              case KS:
              case $S:
                lt = Xv;
              case JS:
                lt = LE;
                lt = X;
                lt = jE;
                lt = ME;
                lt = LS;
                lt = VE;
            var Xt = (e & 4) !== 0, qe = !Xt && (t === "scroll" || t === "scrollend"), ye = Xt ? J !== null ? J + "Capture" : null : J;
            Xt = [];
            for (var N = C, k; N !== null; ) {
              var Y = N;
              if (k = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || k === null || ye === null || (Y = ji(N, ye), Y != null && Xt.push(
                da(
                  N,
                  Y,
                  k
              )), qe) break;
              N = N.return;
            0 < Xt.length && (J = new lt(
              J,
              wt,
              l,
              F
            ), et.push({
              event: J,
              listeners: Xt
            if (J = t === "mouseover" || t === "pointerover", lt = t === "mouseout" || t === "pointerout", J && l !== p && (wt = l.relatedTarget || l.fromElement) && (Sa(wt) || wt[nu]))
            if ((lt || J) && (J = F.window === F ? F : (J = F.ownerDocument) ? J.defaultView || J.parentWindow : window, lt ? (wt = l.relatedTarget || l.toElement, lt = C, wt = wt ? Sa(wt) : null, wt !== null && (qe = Q(wt), Xt = wt.tag, wt !== qe || Xt !== 5 && Xt !== 27 && Xt !== 6) && (wt = null)) : (lt = null, wt = C), lt !== wt)) {
              if (Xt = oe, Y = "onMouseLeave", ye = "onMouseEnter", N = "mouse", (t === "pointerout" || t === "pointerover") && (Xt = LS, Y = "onPointerLeave", ye = "onPointerEnter", N = "pointer"), qe = lt == null ? J : El(lt), k = wt == null ? J : El(wt), J = new Xt(
                Y,
                N + "leave",
                lt,
                l,
                F
              ), J.target = qe, J.relatedTarget = k, Y = null, Sa(F) === C && (Xt = new Xt(
                ye,
                N + "enter",
                wt,
                l,
                F
              ), Xt.target = k, Xt.relatedTarget = qe, Y = Xt), qe = Y, lt && wt)
                  for (Xt = lt, ye = wt, N = 0, k = Xt; k; k = Hn(k))
                    N++;
                  for (k = 0, Y = ye; Y; Y = Hn(Y))
                    k++;
                  for (; 0 < N - k; )
                    Xt = Hn(Xt), N--;
                  for (; 0 < k - N; )
                    ye = Hn(ye), k--;
                  for (; N--; ) {
                    if (Xt === ye || ye !== null && Xt === ye.alternate)
                    Xt = Hn(Xt), ye = Hn(ye);
                  Xt = null;
              else Xt = null;
              lt !== null && Wg(
                et,
                J,
                lt,
                Xt,
              ), wt !== null && qe !== null && Wg(
                et,
                qe,
                wt,
                Xt,
            if (J = C ? El(C) : window, lt = J.nodeName && J.nodeName.toLowerCase(), lt === "select" || lt === "input" && J.type === "file")
              var it = Ym;
            else if (a0(J))
              if (XS)
                it = Rv;
                it = jm;
                var Tt = Dv;
              lt = J.nodeName, !lt || lt.toLowerCase() !== "input" || J.type !== "checkbox" && J.type !== "radio" ? C && Mu(C.elementType) && (it = Ym) : it = Av;
            if (it && (it = it(t, C))) {
              hd(
                et,
                it,
                l,
                F
            Tt && Tt(t, J, C), t === "focusout" && C && J.type === "number" && C.memoizedProps.value != null && ad(J, "number", J.value);
          switch (Tt = C ? El(C) : window, t) {
              (a0(Tt) || Tt.contentEditable === "true") && ($h = Tt, Zv = C, qp = null);
              qp = Zv = $h = null;
              Kv = !0;
              Kv = !1, c0(
                et,
                l,
                F
              if (ZE) break;
              c0(
                et,
                l,
                F
          var It;
          if (Qv)
                  var zt = "onCompositionStart";
                  zt = "onCompositionEnd";
                  zt = "onCompositionUpdate";
              zt = void 0;
            Kh ? ra(t, l) && (zt = "onCompositionEnd") : t === "keydown" && l.keyCode === YS && (zt = "onCompositionStart");
          zt && (jS && l.locale !== "ko" && (Kh || zt !== "onCompositionStart" ? zt === "onCompositionEnd" && Kh && (It = qi()) : (ct = F, W = "value" in ct ? ct.value : ct.textContent, Kh = !0)), Tt = Wr(
            C,
            zt
          ), 0 < Tt.length && (zt = new BS(
            zt,
            l,
            F
          ), et.push({
            event: zt,
            listeners: Tt
          }), It ? zt.data = It : (It = Oo(l), It !== null && (zt.data = It)))), (It = XE ? dd(t, l) : cr(t, l)) && (zt = Wr(
            C,
          ), 0 < zt.length && (Tt = new AE(
            l,
            F
          ), et.push({
            event: Tt,
            listeners: zt
          }), Tt.data = It)), Xe(
            et,
            C,
            l,
            F
        gi(et, e);
    function da(t, e, l) {
        currentTarget: l
    function Wr(t, e) {
      for (var l = e + "Capture", r = []; t !== null; ) {
        var h = t, g = h.stateNode;
        if (h = h.tag, h !== 5 && h !== 26 && h !== 27 || g === null || (h = ji(t, l), h != null && r.unshift(
          da(t, h, g)
        ), h = ji(t, e), h != null && r.push(
          da(t, h, g)
        )), t.tag === 3) return r;
    function Hn(t) {
    function Wg(t, e, l, r, h) {
      for (var g = e._reactName, T = []; l !== null && l !== r; ) {
        var x = l, w = x.alternate, C = x.stateNode;
        if (x = x.tag, w !== null && w === r) break;
        x !== 5 && x !== 26 && x !== 27 || C === null || (w = C, h ? (C = ji(l, g), C != null && T.unshift(
          da(l, C, w)
        )) : h || (C = ji(l, g), C != null && T.push(
          da(l, C, w)
        ))), l = l.return;
      T.length !== 0 && t.push({ event: e, listeners: T });
    function pi(t, e) {
      Bs(t, e), t !== "input" && t !== "textarea" && t !== "select" || e == null || e.value !== null || Bp || (Bp = !0, t === "select" && e.multiple ? console.error(
      var l = {
        registrationNameDependencies: yl,
        possibleRegistrationNames: cs
      Mu(t) || typeof e.is == "string" || km(t, e, l), e.contentEditable && !e.suppressContentEditableWarning && e.children != null && console.error(
    function Qe(t, e, l, r) {
      e !== l && (l = Qn(l), Qn(e) !== l && (r[t] = e));
    function Zo(t, e, l) {
      e.forEach(function(r) {
        l[Pg(r)] = r === "style" ? ns(t) : t.getAttribute(r);
    function hl(t, e) {
    function vh(t, e) {
      return t = t.namespaceURI === vf || t.namespaceURI === Cc ? t.ownerDocument.createElementNS(
    function Qn(t) {
      return z(t) && (console.error(
        Ct(t)
      ), $(t)), (typeof t == "string" ? t : "" + t).replace(yO, `
`).replace(bO, "");
    function Fg(t, e) {
      return e = Qn(e), Qn(t) === e;
    function to() {
    function _e(t, e, l, r, h, g) {
      switch (l) {
          typeof r == "string" ? (ur(r, e, !1), e === "body" || e === "textarea" && r === "" || Ou(t, r)) : (typeof r == "number" || typeof r == "bigint") && (ur("" + r, e, !1), e !== "body" && Ou(t, "" + r));
          Jt(t, "class", r);
          Jt(t, "tabindex", r);
          Jt(t, l, r);
          sr(t, r, g);
            Jt(t, "data", r);
          if (r === "" && (e !== "a" || l !== "href")) {
              l === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              l,
              l
            ), t.removeAttribute(l);
          if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
            t.removeAttribute(l);
          at(r, l), r = Ls("" + r), t.setAttribute(l, r);
          if (r != null && (e === "form" ? l === "formAction" ? console.error(
          ) : typeof r == "function" && (h.encType == null && h.method == null || Rb || (Rb = !0, console.error(
          )), h.target == null || Ab || (Ab = !0, console.error(
          ))) : e === "input" || e === "button" ? l === "action" ? console.error(
          ) : e !== "input" || h.type === "submit" || h.type === "image" || Db ? e !== "button" || h.type == null || h.type === "submit" || Db ? typeof r == "function" && (h.name == null || f_ || (f_ = !0, console.error(
          )), h.formEncType == null && h.formMethod == null || Rb || (Rb = !0, console.error(
          )), h.formTarget == null || Ab || (Ab = !0, console.error(
          ))) : (Db = !0, console.error(
          )) : (Db = !0, console.error(
            l === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof r == "function") {
              l,
            typeof g == "function" && (l === "formAction" ? (e !== "input" && _e(t, e, "name", h.name, h, null), _e(
              h.formEncType,
              h,
            ), _e(
              h.formMethod,
              h,
            ), _e(
              h.formTarget,
              h,
            )) : (_e(
              h.encType,
              h,
            ), _e(t, e, "method", h.method, h, null), _e(
              h.target,
              h,
          if (r == null || typeof r == "symbol" || typeof r == "boolean") {
            t.removeAttribute(l);
          at(r, l), r = Ls("" + r), t.setAttribute(l, r);
          r != null && (typeof r != "function" && hl(l, r), t.onclick = to);
          r != null && (typeof r != "function" && hl(l, r), ce("scroll", t));
          r != null && (typeof r != "function" && hl(l, r), ce("scrollend", t));
          if (r != null) {
            if (typeof r != "object" || !("__html" in r))
            if (l = r.__html, l != null) {
              if (h.children != null)
              t.innerHTML = l;
          t.multiple = r && typeof r != "function" && typeof r != "symbol";
          t.muted = r && typeof r != "function" && typeof r != "symbol";
          if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          at(r, l), l = Ls("" + r), t.setAttributeNS(Nf, "xlink:href", l);
          r != null && typeof r != "function" && typeof r != "symbol" ? (at(r, l), t.setAttribute(l, "" + r)) : t.removeAttribute(l);
          r !== "" || wb[l] || (wb[l] = !0, console.error(
            l
          r && typeof r != "function" && typeof r != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
          r === !0 ? t.setAttribute(l, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? (at(r, l), t.setAttribute(l, r)) : t.removeAttribute(l);
          r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (at(r, l), t.setAttribute(l, r)) : t.removeAttribute(l);
          r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? t.removeAttribute(l) : (at(r, l), t.setAttribute(l, r));
          ce("beforetoggle", t), ce("toggle", t), ge(t, "popover", r);
          rn(
            Nf,
            r
          rn(
            Nf,
            r
          rn(
            Nf,
            r
          rn(
            Nf,
            r
          rn(
            Nf,
            r
          rn(
            Nf,
            r
          rn(
            U1,
            r
          rn(
            U1,
            r
          rn(
            U1,
            r
          g != null && console.error(
          ), ge(t, "is", r);
          d_ || r == null || typeof r != "object" || (d_ = !0, console.error(
            r
          !(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N" ? (l = sd(l), ge(t, l, r)) : yl.hasOwnProperty(l) && r != null && typeof r != "function" && hl(l, r);
    function es(t, e, l, r, h, g) {
      switch (l) {
          sr(t, r, g);
          if (r != null) {
            if (typeof r != "object" || !("__html" in r))
            if (l = r.__html, l != null) {
              if (h.children != null)
              t.innerHTML = l;
          typeof r == "string" ? Ou(t, r) : (typeof r == "number" || typeof r == "bigint") && Ou(t, "" + r);
          r != null && (typeof r != "function" && hl(l, r), ce("scroll", t));
          r != null && (typeof r != "function" && hl(l, r), ce("scrollend", t));
          r != null && (typeof r != "function" && hl(l, r), t.onclick = to);
          if (yl.hasOwnProperty(l))
            r != null && typeof r != "function" && hl(l, r);
              if (l[0] === "o" && l[1] === "n" && (h = l.endsWith("Capture"), e = l.slice(2, h ? l.length - 7 : void 0), g = t[Ha] || null, g = g != null ? g[l] : null, typeof g == "function" && t.removeEventListener(e, g, h), typeof r == "function")) {
                typeof g != "function" && g !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, r, h);
              l in t ? t[l] = r : r === !0 ? t.setAttribute(l, "") : ge(t, l, r);
    function nn(t, e, l) {
      switch (pi(e, l), e) {
          ce("error", t), ce("load", t);
          var r = !1, h = !1, g;
          for (g in l)
            if (l.hasOwnProperty(g)) {
              var T = l[g];
              if (T != null)
                switch (g) {
                    r = !0;
                    h = !0;
                    _e(t, e, g, T, l, null);
          h && _e(t, e, "srcSet", l.srcSet, l, null), r && _e(t, e, "src", l.src, l, null);
          Ht("input", l), ce("invalid", t);
          var x = g = T = h = null, w = null, C = null;
          for (r in l)
            if (l.hasOwnProperty(r)) {
              var F = l[r];
              if (F != null)
                switch (r) {
                    h = F;
                    T = F;
                    w = F;
                    C = F;
                    g = F;
                    x = F;
                    if (F != null)
                    _e(t, e, r, F, l, null);
          To(t, l), Py(
            g,
            x,
            w,
            C,
            T,
            h,
          ), Li(t);
          Ht("select", l), ce("invalid", t), r = T = g = null;
          for (h in l)
            if (l.hasOwnProperty(h) && (x = l[h], x != null))
              switch (h) {
                  g = x;
                  T = x;
                  r = x;
                  _e(
                    h,
                    x,
                    l,
          lr(t, l), e = g, l = T, t.multiple = !!r, e != null ? Yi(t, !!r, e, !1) : l != null && Yi(t, !!r, l, !0);
          Ht("textarea", l), ce("invalid", t), g = h = r = null;
          for (T in l)
            if (l.hasOwnProperty(T) && (x = l[T], x != null))
              switch (T) {
                  r = x;
                  h = x;
                  g = x;
                  if (x != null)
                  _e(
                    T,
                    x,
                    l,
          Kl(t, l), zm(t, r, h, g), Li(t);
          wm(t, l);
          for (w in l)
            if (l.hasOwnProperty(w) && (r = l[w], r != null))
              switch (w) {
                  t.selected = r && typeof r != "function" && typeof r != "symbol";
                  _e(t, e, w, r, l, null);
          ce("beforetoggle", t), ce("toggle", t), ce("cancel", t), ce("close", t);
          ce("load", t);
          for (r = 0; r < fy.length; r++)
            ce(fy[r], t);
          ce("error", t), ce("load", t);
          ce("toggle", t);
          ce("error", t), ce("load", t);
          for (C in l)
            if (l.hasOwnProperty(C) && (r = l[C], r != null))
              switch (C) {
                  _e(t, e, C, r, l, null);
          if (Mu(e)) {
            for (F in l)
              l.hasOwnProperty(F) && (r = l[F], r !== void 0 && es(
                F,
                r,
                l,
      for (x in l)
        l.hasOwnProperty(x) && (r = l[x], r != null && _e(t, e, x, r, l, null));
    function U0(t, e, l, r) {
      switch (pi(e, r), e) {
          var h = null, g = null, T = null, x = null, w = null, C = null, F = null;
          for (lt in l) {
            var et = l[lt];
            if (l.hasOwnProperty(lt) && et != null)
              switch (lt) {
                  w = et;
                  r.hasOwnProperty(lt) || _e(
                    lt,
                    r,
                    et
          for (var J in r) {
            var lt = r[J];
            if (et = l[J], r.hasOwnProperty(J) && (lt != null || et != null))
              switch (J) {
                  g = lt;
                  h = lt;
                  C = lt;
                  F = lt;
                  T = lt;
                  x = lt;
                  if (lt != null)
                  lt !== et && _e(
                    J,
                    lt,
                    r,
                    et
          e = l.type === "checkbox" || l.type === "radio" ? l.checked != null : l.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, e || !r || r_ || (console.error(
          ), r_ = !0), !e || r || c_ || (console.error(
          ), c_ = !0), _o(
            T,
            x,
            w,
            C,
            F,
            g,
            h
          lt = T = x = J = null;
          for (g in l)
            if (w = l[g], l.hasOwnProperty(g) && w != null)
              switch (g) {
                  lt = w;
                  r.hasOwnProperty(g) || _e(
                    g,
                    r,
                    w
          for (h in r)
            if (g = r[h], w = l[h], r.hasOwnProperty(h) && (g != null || w != null))
              switch (h) {
                  J = g;
                  x = g;
                  T = g;
                  g !== w && _e(
                    h,
                    g,
                    r,
                    w
          r = x, e = T, l = lt, J != null ? Yi(t, !!e, J, !1) : !!l != !!e && (r != null ? Yi(t, !!e, r, !0) : Yi(t, !!e, e ? [] : "", !1));
          lt = J = null;
          for (x in l)
            if (h = l[x], l.hasOwnProperty(x) && h != null && !r.hasOwnProperty(x))
              switch (x) {
                  _e(t, e, x, null, r, h);
          for (T in r)
            if (h = r[T], g = l[T], r.hasOwnProperty(T) && (h != null || g != null))
              switch (T) {
                  J = h;
                  lt = h;
                  if (h != null)
                  h !== g && _e(t, e, T, h, r, g);
          ld(t, J, lt);
          for (var wt in l)
            if (J = l[wt], l.hasOwnProperty(wt) && J != null && !r.hasOwnProperty(wt))
              switch (wt) {
                  _e(
                    wt,
                    r,
                    J
          for (w in r)
            if (J = r[w], lt = l[w], r.hasOwnProperty(w) && J !== lt && (J != null || lt != null))
              switch (w) {
                  t.selected = J && typeof J != "function" && typeof J != "symbol";
                  _e(
                    w,
                    J,
                    r,
                    lt
          for (var Xt in l)
            J = l[Xt], l.hasOwnProperty(Xt) && J != null && !r.hasOwnProperty(Xt) && _e(
              Xt,
              r,
              J
          for (C in r)
            if (J = r[C], lt = l[C], r.hasOwnProperty(C) && J !== lt && (J != null || lt != null))
              switch (C) {
                  if (J != null)
                  _e(
                    C,
                    J,
                    r,
                    lt
          if (Mu(e)) {
            for (var qe in l)
              J = l[qe], l.hasOwnProperty(qe) && J !== void 0 && !r.hasOwnProperty(qe) && es(
                qe,
                r,
                J
            for (F in r)
              J = r[F], lt = l[F], !r.hasOwnProperty(F) || J === lt || J === void 0 && lt === void 0 || es(
                F,
                J,
                r,
                lt
      for (var ye in l)
        J = l[ye], l.hasOwnProperty(ye) && J != null && !r.hasOwnProperty(ye) && _e(t, e, ye, null, r, J);
      for (et in r)
        J = r[et], lt = l[et], !r.hasOwnProperty(et) || J === lt || J == null && lt == null || _e(t, e, et, J, r, lt);
    function Pg(t) {
    function ns(t) {
      for (var l = 0; l < t.length; l++) {
        var r = t[l];
        e[r] = t.getPropertyValue(r);
    function Ig(t, e, l) {
        var r, h = r = "", g;
        for (g in e)
          if (e.hasOwnProperty(g)) {
            var T = e[g];
            T != null && typeof T != "boolean" && T !== "" && (g.indexOf("--") === 0 ? (rt(T, g), r += h + g + ":" + ("" + T).trim()) : typeof T != "number" || T === 0 || bf.has(g) ? (rt(T, g), r += h + g.replace(co, "-$1").toLowerCase().replace(ro, "-ms-") + ":" + ("" + T).trim()) : r += h + g.replace(co, "-$1").toLowerCase().replace(ro, "-ms-") + ":" + T + "px", h = ";");
        r = r || null, e = t.getAttribute("style"), e !== r && (r = Qn(r), Qn(e) !== r && (l.style = ns(t)));
    function ha(t, e, l, r, h, g) {
      if (h.delete(l), t = t.getAttribute(l), t === null)
        switch (typeof r) {
      else if (r != null)
        switch (typeof r) {
            if (at(r, e), t === "" + r)
      Qe(e, t, r, g);
    function tp(t, e, l, r, h, g) {
      if (h.delete(l), t = t.getAttribute(l), t === null) {
        switch (typeof r) {
        if (!r) return;
        switch (typeof r) {
            if (r) return;
      Qe(e, t, r, g);
    function ep(t, e, l, r, h, g) {
      if (h.delete(l), t = t.getAttribute(l), t === null)
        switch (typeof r) {
      else if (r != null)
        switch (typeof r) {
            if (at(r, l), t === "" + r)
      Qe(e, t, r, g);
    function N0(t, e, l, r, h, g) {
      if (h.delete(l), t = t.getAttribute(l), t === null)
        switch (typeof r) {
            if (isNaN(r)) return;
      else if (r != null)
        switch (typeof r) {
            if (!isNaN(r) && (at(r, e), t === "" + r))
      Qe(e, t, r, g);
    function De(t, e, l, r, h, g) {
      if (h.delete(l), t = t.getAttribute(l), t === null)
        switch (typeof r) {
      else if (r != null)
        switch (typeof r) {
            if (at(r, e), l = Ls("" + r), t === l)
      Qe(e, t, r, g);
    function Ne(t, e, l, r) {
      for (var h = {}, g = /* @__PURE__ */ new Set(), T = t.attributes, x = 0; x < T.length; x++)
        switch (T[x].name.toLowerCase()) {
            g.add(T[x].name);
        }
      if (Mu(e)) {
        for (var w in l)
          if (l.hasOwnProperty(w)) {
            var C = l[w];
            if (C != null) {
              if (yl.hasOwnProperty(w))
                typeof C != "function" && hl(w, C);
              else if (l.suppressHydrationWarning !== !0)
                switch (w) {
                    typeof C != "string" && typeof C != "number" || Qe(
                      C,
                      h
                    T = t.innerHTML, C = C ? C.__html : void 0, C != null && (C = vh(t, C), Qe(
                      w,
                      T,
                      C,
                      h
                    g.delete(w), Ig(t, C, h);
                    g.delete(w.toLowerCase()), console.error(
                      w
                    g.delete("class"), T = Wt(
                      C
                    ), Qe(
                      T,
                      C,
                      h
                    r.context === _s && e !== "svg" && e !== "math" ? g.delete(w.toLowerCase()) : g.delete(w), T = Wt(
                      w,
                      C
                    ), Qe(
                      w,
                      T,
                      C,
                      h
        for (C in l)
          if (l.hasOwnProperty(C) && (w = l[C], w != null)) {
            if (yl.hasOwnProperty(C))
              typeof w != "function" && hl(C, w);
            else if (l.suppressHydrationWarning !== !0)
              switch (C) {
                  typeof w != "string" && typeof w != "number" || Qe(
                    w,
                    h
                  T = t.innerHTML, w = w ? w.__html : void 0, w != null && (w = vh(t, w), T !== w && (h[C] = { __html: T }));
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  g.delete(C), Ig(t, w, h);
                  g.delete(C), Qe(
                    C,
                    w,
                    h
                  g.delete(C), Qe(
                    C,
                    w,
                    h
                  g.delete("autofocus"), Qe(
                    C,
                    w,
                    h
                    g.delete(C), T = t.getAttribute("data"), Qe(
                      C,
                      T,
                      w,
                      h
                  if (!(w !== "" || e === "a" && C === "href" || e === "object" && C === "data")) {
                      C === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      C,
                      C
                  De(
                    C,
                    C,
                    w,
                    g,
                    h
                  if (T = t.getAttribute(C), typeof w == "function") {
                    g.delete(C.toLowerCase()), C === "formAction" ? (g.delete("name"), g.delete("formenctype"), g.delete("formmethod"), g.delete("formtarget")) : (g.delete("enctype"), g.delete("method"), g.delete("target"));
                  } else if (T === vO) {
                    g.delete(C.toLowerCase()), Qe(
                      C,
                      w,
                      h
                  De(
                    C,
                    C.toLowerCase(),
                    w,
                    g,
                    h
                  De(
                    C,
                    w,
                    g,
                    h
                  ep(
                    C,
                    w,
                    g,
                    h
                  ep(
                    C,
                    w,
                    g,
                    h
                  ep(
                    C,
                    C,
                    w,
                    g,
                    h
                  tp(
                    C,
                    C.toLowerCase(),
                    w,
                    g,
                    h
                    x = t;
                    var F = T = C, et = h;
                    if (g.delete(F), x = x.getAttribute(F), x === null)
                      switch (typeof w) {
                          if (w === !1) break t;
                    else if (w != null)
                      switch (typeof w) {
                          if (w === !0 && x === "") break t;
                          if (at(w, T), x === "" + w)
                    Qe(
                      T,
                      x,
                      w,
                      et
                    if (x = t, F = T = C, et = h, g.delete(F), x = x.getAttribute(F), x === null)
                      switch (typeof w) {
                          if (isNaN(w) || 1 > w) break t;
                    else if (w != null)
                      switch (typeof w) {
                          if (!(isNaN(w) || 1 > w) && (at(w, T), x === "" + w))
                    Qe(
                      T,
                      x,
                      w,
                      et
                  N0(
                    C,
                    w,
                    g,
                    h
                  N0(
                    C,
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  ha(
                    C,
                    w,
                    g,
                    h
                  w !== "" || wb[C] || (wb[C] = !0, console.error(
                    C
                  )), tp(
                    C,
                    C,
                    w,
                    g,
                    h
                  if (!(2 < C.length) || C[0] !== "o" && C[0] !== "O" || C[1] !== "n" && C[1] !== "N") {
                    x = sd(C), T = !1, r.context === _s && e !== "svg" && e !== "math" ? g.delete(x.toLowerCase()) : (F = C.toLowerCase(), F = ds.hasOwnProperty(
                      F
                    ) && ds[F] || null, F !== null && F !== C && (T = !0, g.delete(F)), g.delete(x));
                    t: if (F = t, et = x, x = w, Zt(et))
                      if (F.hasAttribute(et))
                        F = F.getAttribute(
                          et
                        ), at(
                          x,
                          et
                        ), x = F === "" + x ? x : F;
                        switch (typeof x) {
                            if (F = et.toLowerCase().slice(0, 5), F !== "data-" && F !== "aria-")
                        x = x === void 0 ? void 0 : null;
                    else x = void 0;
                    T || Qe(
                      C,
                      x,
                      w,
                      h
      return 0 < g.size && l.suppressHydrationWarning !== !0 && Zo(t, g, h), Object.keys(h).length === 0 ? null : h;
    function fe(t, e) {
    function de(t) {
    function Ae(t) {
        case Cc:
          return Sm;
        case vf:
          return Hb;
          return _s;
    function Ra(t, e) {
      if (t === _s)
            return Sm;
            return Hb;
            return _s;
      return t === Sm && e === "foreignObject" ? _s : t;
    function yi(t, e) {
    function fc() {
      return t && t.type === "popstate" ? t === L1 ? !1 : (L1 = t, !0) : (L1 = null, !1);
    function np(t) {
    function eo(t, e, l) {
          l.autoFocus && t.focus();
          l.src ? t.src = l.src : l.srcSet && (t.srcset = l.srcSet);
    function an(t, e, l, r) {
      U0(t, e, l, r), t[Ha] = r;
    function no(t) {
      Ou(t, "");
    function as(t, e, l) {
      t.nodeValue = l;
    function bi(t) {
    function ml(t, e) {
    function dc(t, e) {
    function hc(t, e) {
      var l = e, r = 0, h = 0;
        var g = l.nextSibling;
        if (t.removeChild(l), g && g.nodeType === 8)
          if (l = g.data, l === Cb) {
            if (0 < r && 8 > r) {
              l = r;
              var T = t.ownerDocument;
              if (l & TO && yc(T.documentElement), l & _O && yc(T.body), l & xO)
                for (l = T.head, yc(l), T = l.firstChild; T; ) {
                  var x = T.nextSibling, w = T.nodeName;
                  T[Ac] || w === "SCRIPT" || w === "STYLE" || w === "LINK" && T.rel.toLowerCase() === "stylesheet" || l.removeChild(T), T = x;
            if (h === 0) {
              t.removeChild(g), us(e);
            h--;
            l === zb || l === Ts || l === dy ? h++ : r = l.charCodeAt(0) - 48;
        else r = 0;
        l = g;
      } while (l);
      us(e);
    function wa(t) {
    function ap(t) {
    function lp(t, e) {
      e = e[EO], e = e != null && e.hasOwnProperty("display") ? e.display : null, t.style.display = e == null || typeof e == "boolean" ? "" : ("" + e).trim();
    function Sh(t, e) {
    function mc(t) {
        var l = e;
        switch (e = e.nextSibling, l.nodeName) {
            mc(l), xl(l);
            if (l.rel.toLowerCase() === "stylesheet") continue;
        t.removeChild(l);
    function Ko(t, e, l, r) {
        var h = l;
          if (!r && (t.nodeName !== "INPUT" || t.type !== "hidden"))
        } else if (r) {
          if (!t[Ac])
                if (g = t.getAttribute("rel"), g === "stylesheet" && t.hasAttribute("data-precedence"))
                if (g !== h.rel || t.getAttribute("href") !== (h.href == null || h.href === "" ? null : h.href) || t.getAttribute("crossorigin") !== (h.crossOrigin == null ? null : h.crossOrigin) || t.getAttribute("title") !== (h.title == null ? null : h.title))
                if (g = t.getAttribute("src"), (g !== (h.src == null ? null : h.src) || t.getAttribute("type") !== (h.type == null ? null : h.type) || t.getAttribute("crossorigin") !== (h.crossOrigin == null ? null : h.crossOrigin)) && g && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
          at(h.name, "name");
          var g = h.name == null ? null : "" + h.name;
          if (h.type === "hidden" && t.getAttribute("name") === g)
        if (t = Kn(t.nextSibling), t === null) break;
    function Zn(t, e, l) {
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Kn(t.nextSibling), t === null)) return null;
    function vi(t) {
      return t.data === dy || t.data === Ts && t.ownerDocument.readyState === m_;
    function gc(t, e) {
      var l = t.ownerDocument;
      if (t.data !== Ts || l.readyState === m_)
        var r = function() {
          e(), l.removeEventListener("DOMContentLoaded", r);
        l.addEventListener("DOMContentLoaded", r), t._reactRetry = r;
    function Kn(t) {
          if (e = t.data, e === zb || e === dy || e === Ts || e === N1 || e === h_)
          if (e === Cb) return null;
    function Th(t) {
        for (var e = t.nodeName.toLowerCase(), l = {}, r = t.attributes, h = 0; h < r.length; h++) {
          var g = r[h];
          l[Pg(g.name)] = g.name.toLowerCase() === "style" ? ns(t) : g.value;
        return { type: e, props: l };
    function _h(t, e, l) {
      return l === null || l[SO] !== !0 ? (t.nodeValue === e ? t = null : (e = Qn(e), t = Qn(t.nodeValue) === e ? null : t.nodeValue), t) : null;
    function ip(t) {
          var l = t.data;
          if (l === Cb) {
              return Kn(t.nextSibling);
            l !== zb && l !== dy && l !== Ts || e++;
    function pc(t) {
          var l = t.data;
          if (l === zb || l === dy || l === Ts) {
          } else l === Cb && e++;
    function op(t) {
      us(t);
    function Za(t) {
      us(t);
    function up(t, e, l, r, h) {
      switch (h && ud(t, r.ancestorInfo), e = de(l), t) {
    function Ka(t, e, l, r) {
      if (!l[nu] && jn(l)) {
        var h = l.tagName.toLowerCase();
          h,
          h,
          h
      for (h = l.attributes; h.length; )
        l.removeAttributeNode(h[0]);
      nn(l, t, e), l[la] = r, l[Ha] = e;
    function yc(t) {
      xl(t);
    function Fr(t) {
    function k0(t, e, l) {
      var r = Tm;
      if (r && typeof e == "string" && e) {
        var h = ja(e);
        h = 'link[rel="' + t + '"][href="' + h + '"]', typeof l == "string" && (h += '[crossorigin="' + l + '"]'), S_.has(h) || (S_.add(h), t = { rel: t, crossOrigin: l, href: e }, r.querySelector(h) === null && (e = r.createElement("link"), nn(e, "link", t), G(e), r.head.appendChild(e)));
    function ao(t, e, l, r) {
      var h = (h = Ti.current) ? Fr(h) : null;
      if (!h)
          return typeof l.precedence == "string" && typeof l.href == "string" ? (l = $o(l.href), e = A(h).hoistableStyles, r = e.get(l), r || (r = {
          }, e.set(l, r)), r) : { type: "void", instance: null, count: 0, state: null };
          if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
            t = $o(l.href);
            var g = A(h).hoistableStyles, T = g.get(t);
            if (!T && (h = h.ownerDocument || h, T = {
              state: { loading: Bf, preload: null }
            }, g.set(t, T), (g = h.querySelector(
              Si(t)
            )) && !g._p && (T.instance = g, T.state.loading = hy | Ui), !Ni.has(t))) {
              var x = {
                href: l.href,
                crossOrigin: l.crossOrigin,
                integrity: l.integrity,
                media: l.media,
                hrefLang: l.hrefLang,
                referrerPolicy: l.referrerPolicy
              Ni.set(t, x), g || B0(
                h,
                x,
                T.state
            if (e && r === null)
              throw l = `
  - ` + ls(e) + `
  + ` + ls(l), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + l
            return T;
          if (e && r !== null)
            throw l = `
  - ` + ls(e) + `
  + ` + ls(l), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + l
          return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = is(l), e = A(h).hoistableScripts, r = e.get(l), r || (r = {
          }, e.set(l, r)), r) : { type: "void", instance: null, count: 0, state: null };
    function ls(t) {
      var e = 0, l = "<link";
      return typeof t.rel == "string" ? (e++, l += ' rel="' + t.rel + '"') : oo.call(t, "rel") && (e++, l += ' rel="' + (t.rel === null ? "null" : "invalid type " + typeof t.rel) + '"'), typeof t.href == "string" ? (e++, l += ' href="' + t.href + '"') : oo.call(t, "href") && (e++, l += ' href="' + (t.href === null ? "null" : "invalid type " + typeof t.href) + '"'), typeof t.precedence == "string" ? (e++, l += ' precedence="' + t.precedence + '"') : oo.call(t, "precedence") && (e++, l += " precedence={" + (t.precedence === null ? "null" : "invalid type " + typeof t.precedence) + "}"), Object.getOwnPropertyNames(t).length > e && (l += " ..."), l + " />";
    function $o(t) {
      return 'href="' + ja(t) + '"';
    function Si(t) {
    function sp(t) {
      return le({}, t, {
    function B0(t, e, l, r) {
      ) ? r.loading = hy : (e = t.createElement("link"), r.preload = e, e.addEventListener("load", function() {
        return r.loading |= hy;
        return r.loading |= b_;
      }), nn(e, "link", l), G(e), t.head.appendChild(e));
    function is(t) {
      return '[src="' + ja(t) + '"]';
    function os(t) {
    function xh(t, e, l) {
            var r = t.querySelector(
              'style[data-href~="' + ja(l.href) + '"]'
            if (r)
              return e.instance = r, G(r), r;
            var h = le({}, l, {
              "data-href": l.href,
              "data-precedence": l.precedence,
            return r = (t.ownerDocument || t).createElement("style"), G(r), nn(r, "style", h), Eh(r, l.precedence, t), e.instance = r;
            h = $o(l.href);
            var g = t.querySelector(
              Si(h)
            if (g)
              return e.state.loading |= Ui, e.instance = g, G(g), g;
            r = sp(l), (h = Ni.get(h)) && cp(r, h), g = (t.ownerDocument || t).createElement("link"), G(g);
            var T = g;
            return T._p = new Promise(function(x, w) {
              T.onload = x, T.onerror = w;
            }), nn(g, "link", r), e.state.loading |= Ui, Eh(g, l.precedence, t), e.instance = g;
            return g = is(l.src), (h = t.querySelector(
              os(g)
            )) ? (e.instance = h, G(h), h) : (r = l, (h = Ni.get(g)) && (r = le({}, l), rp(r, h)), t = t.ownerDocument || t, h = t.createElement("script"), G(h), nn(h, "link", r), t.head.appendChild(h), e.instance = h);
        e.type === "stylesheet" && (e.state.loading & Ui) === Bf && (r = e.instance, e.state.loading |= Ui, Eh(r, l.precedence, t));
    function Eh(t, e, l) {
      for (var r = l.querySelectorAll(
      ), h = r.length ? r[r.length - 1] : null, g = h, T = 0; T < r.length; T++) {
        var x = r[T];
        if (x.dataset.precedence === e) g = x;
        else if (g !== h) break;
      g ? g.parentNode.insertBefore(t, g.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
    function cp(t, e) {
    function rp(t, e) {
    function fp(t, e, l) {
      if (Ub === null) {
        var r = /* @__PURE__ */ new Map(), h = Ub = /* @__PURE__ */ new Map();
        h.set(l, r);
        h = Ub, r = h.get(l), r || (r = /* @__PURE__ */ new Map(), h.set(l, r));
      if (r.has(t)) return r;
      for (r.set(t, null), l = l.getElementsByTagName(t), h = 0; h < l.length; h++) {
        var g = l[h];
        if (!(g[Ac] || g[la] || t === "link" && g.getAttribute("rel") === "stylesheet") && g.namespaceURI !== Cc) {
          var T = g.getAttribute(e) || "";
          T = t + T;
          var x = r.get(T);
          x ? x.push(g) : r.set(T, [g]);
      return r;
    function dp(t, e, l) {
        l,
    function bc(t, e, l) {
      var r = !l.ancestorInfo.containerTagInScope;
      if (l.context === Sm || e.itemProp != null)
        return !r || e.itemProp == null || t !== "meta" && t !== "title" && t !== "style" && t !== "link" && t !== "script" || console.error(
            r && console.error(
              var h = e.onError, g = e.disabled;
              l = [], e.onLoad && l.push("`onLoad`"), h && l.push("`onError`"), g != null && l.push("`disabled`"), h = fe(l, "and"), h += l.length === 1 ? " prop" : " props", g = l.length === 1 ? "an " + h : "the " + h, l.length && console.error(
                g,
                h
            r && (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" ? console.error(
              return t = e.precedence, e = e.disabled, typeof t != "string" && r && console.error(
            r && (t ? e.onLoad || e.onError ? console.error(
          r && console.error(
    function Pr(t) {
      return !(t.type === "stylesheet" && (t.state.loading & v_) === Bf);
    function L0() {
    function Y0(t, e, l) {
      if (my === null)
      var r = my;
      if (e.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (e.state.loading & Ui) === Bf) {
          var h = $o(l.href), g = t.querySelector(
            Si(h)
          if (g) {
            t = g._p, t !== null && typeof t == "object" && typeof t.then == "function" && (r.count++, r = Ir.bind(r), t.then(r, r)), e.state.loading |= Ui, e.instance = g, G(g);
          g = t.ownerDocument || t, l = sp(l), (h = Ni.get(h)) && cp(l, h), g = g.createElement("link"), G(g);
          var T = g;
          T._p = new Promise(function(x, w) {
            T.onload = x, T.onerror = w;
          }), nn(g, "link", l), e.instance = g;
        r.stylesheets === null && (r.stylesheets = /* @__PURE__ */ new Map()), r.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & v_) === Bf && (r.count++, e = Ir.bind(r), t.addEventListener("load", e), t.addEventListener("error", e));
    function j0() {
      if (my === null)
      var t = my;
      return t.stylesheets && t.count === 0 && Oh(t, t.stylesheets), 0 < t.count ? function(e) {
        var l = setTimeout(function() {
          if (t.stylesheets && Oh(t, t.stylesheets), t.unsuspend) {
            var r = t.unsuspend;
            t.unsuspend = null, r();
          t.unsuspend = null, clearTimeout(l);
    function Ir() {
          Oh(this, this.stylesheets);
    function Oh(t, e) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, Nb = /* @__PURE__ */ new Map(), e.forEach(q0, t), Nb = null, Ir.call(t));
    function q0(t, e) {
      if (!(e.state.loading & Ui)) {
        var l = Nb.get(t);
        if (l) var r = l.get(j1);
          l = /* @__PURE__ */ new Map(), Nb.set(t, l);
          for (var h = t.querySelectorAll(
          ), g = 0; g < h.length; g++) {
            var T = h[g];
            (T.nodeName === "LINK" || T.getAttribute("media") !== "not all") && (l.set(T.dataset.precedence, T), r = T);
          r && l.set(j1, r);
        h = e.instance, T = h.getAttribute("data-precedence"), g = l.get(T) || r, g === r && l.set(j1, h), l.set(T, h), this.count++, r = Ir.bind(this), h.addEventListener("load", r), h.addEventListener("error", r), g ? g.parentNode.insertBefore(h, g.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(h, t.firstChild)), e.state.loading |= Ui;
    function Mh(t, e, l, r, h, g, T, x) {
      for (this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = kf, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ws(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ws(0), this.hiddenUpdates = ws(null), this.identifierPrefix = r, this.onUncaughtError = h, this.onCaughtError = g, this.onRecoverableError = T, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), t = this.pendingUpdatersLaneMap = [], e = 0; 31 > e; e++) t.push(/* @__PURE__ */ new Set());
      this._debugRootType = l ? "hydrateRoot()" : "createRoot()";
    function hp(t, e, l, r, h, g, T, x, w, C, F, et) {
      return t = new Mh(
        l,
        T,
        x,
        w,
        C,
        et
      ), e = WE, g === !0 && (e |= Na | fo), on && (e |= ga), g = M(3, null, null, e), t.current = g, g.stateNode = t, e = yr(), Nu(e), t.pooledCache = e, Nu(e), g.memoizedState = {
        element: r,
        isDehydrated: l,
      }, _a(g), t;
    function mp(t) {
      return t ? (t = Hc, t) : Hc;
    function Re(t, e, l, r, h, g) {
      if ($n && typeof $n.onScheduleFiberRoot == "function")
          $n.onScheduleFiberRoot(tu, r, l);
        } catch (T) {
          Ca || (Ca = !0, console.error(
            T
      Et !== null && typeof Et.markRenderScheduled == "function" && Et.markRenderScheduled(e), h = mp(h), r.context === null ? r.context = h : r.pendingContext = h, Ua && Ja !== null && !E_ && (E_ = !0, console.error(
        ht(Ja) || "Unknown"
      )), r = Il(e), r.payload = { element: l }, g = g === void 0 ? null : g, g !== null && (typeof g != "function" && console.error(
        g
      ), r.callback = g), l = zl(t, r, e), l !== null && (tn(l, t, e), Ho(l, t, e));
    function Dh(t, e) {
        var l = t.retryLane;
        t.retryLane = l !== 0 && l < e ? l : e;
    function gp(t, e) {
      Dh(t, e), (t = t.alternate) && Dh(t, e);
    function pp(t) {
        var e = Ta(t, 67108864);
        e !== null && tn(e, t, 67108864), gp(t, 67108864);
    function Uv() {
      return Ja;
    function Nv() {
      for (var t = /* @__PURE__ */ new Map(), e = 1, l = 0; 31 > l; l++) {
        var r = Pc(e);
        t.set(e, r), e *= 2;
    function kv(t, e, l, r) {
      var h = I.T;
      I.T = null;
      var g = Gt.p;
        Gt.p = Jn, Jo(t, e, l, r);
        Gt.p = g, I.T = h;
    function Ah(t, e, l, r) {
      var h = I.T;
      I.T = null;
      var g = Gt.p;
        Gt.p = jl, Jo(t, e, l, r);
        Gt.p = g, I.T = h;
    function Jo(t, e, l, r) {
      if (Bb) {
        var h = tf(r);
        if (h === null)
          fa(
            r,
            Lb,
            l
          ), Wo(t, r);
        else if (ef(
          h,
          l,
          r
          r.stopPropagation();
        else if (Wo(t, r), e & 4 && -1 < AO.indexOf(t)) {
          for (; h !== null; ) {
            var g = jn(h);
            if (g !== null)
              switch (g.tag) {
                  if (g = g.stateNode, g.current.memoizedState.isDehydrated) {
                    var T = cn(g.pendingLanes);
                    if (T !== 0) {
                      var x = g;
                      for (x.pendingLanes |= 2, x.entangledLanes |= 2; T; ) {
                        var w = 1 << 31 - aa(T);
                        x.entanglements[1] |= w, T &= ~w;
                      dl(g), (we & (Ia | po)) === ql && (Tb = _i() + n_, ts(0));
                  x = Ta(g, 2), x !== null && tn(x, g, 2), Pu(), gp(g, 2);
            if (g = tf(r), g === null && fa(
              r,
              Lb,
              l
            ), g === h) break;
            h = g;
          h !== null && r.stopPropagation();
          fa(
            r,
            l
    function tf(t) {
      return t = Du(t), vc(t);
    function vc(t) {
      if (Lb = null, t = Sa(t), t !== null) {
        var e = Q(t);
          var l = e.tag;
          if (l === 13) {
            if (t = dt(e), t !== null) return t;
          } else if (l === 3) {
      return Lb = t, null;
    function Rh(t) {
          return Jn;
          return jl;
          switch (Io()) {
            case Uh:
              return Jn;
            case ff:
              return jl;
            case Oc:
            case qv:
              return so;
            case df:
              return Lh;
              return so;
          return so;
    function Wo(t, e) {
          Gc = null;
          Xc = null;
          Qc = null;
          py.delete(e.pointerId);
          yy.delete(e.pointerId);
    function za(t, e, l, r, h, g) {
      return t === null || t.nativeEvent !== g ? (t = {
        domEventName: l,
        eventSystemFlags: r,
        nativeEvent: g,
        targetContainers: [h]
      }, e !== null && (e = jn(e), e !== null && pp(e)), t) : (t.eventSystemFlags |= r, e = t.targetContainers, h !== null && e.indexOf(h) === -1 && e.push(h), t);
    function ef(t, e, l, r, h) {
          return Gc = za(
            Gc,
            l,
            r,
            h
          return Xc = za(
            Xc,
            l,
            r,
            h
          return Qc = za(
            Qc,
            l,
            r,
            h
          var g = h.pointerId;
          return py.set(
            g,
            za(
              py.get(g) || null,
              l,
              r,
              h
          return g = h.pointerId, yy.set(
            g,
            za(
              yy.get(g) || null,
              l,
              r,
              h
    function V0(t) {
      var e = Sa(t.target);
        var l = Q(e);
        if (l !== null) {
          if (e = l.tag, e === 13) {
            if (e = dt(l), e !== null) {
              t.blockedOn = e, Cs(t.priority, function() {
                if (l.tag === 13) {
                  var r = Aa(l);
                  r = Ln(r);
                  var h = Ta(
                    l,
                    r
                  h !== null && tn(h, l, r), gp(l, r);
          } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
    function nf(t) {
        var l = tf(t.nativeEvent);
        if (l === null) {
          l = t.nativeEvent;
          var r = new l.constructor(
            l.type,
            l
          ), h = r;
          p !== null && console.error(
          ), p = h, l.target.dispatchEvent(r), p === null && console.error(
          ), p = null;
          return e = jn(l), e !== null && pp(e), t.blockedOn = l, !1;
    function yp(t, e, l) {
      nf(t) && l.delete(e);
    function G0() {
      q1 = !1, Gc !== null && nf(Gc) && (Gc = null), Xc !== null && nf(Xc) && (Xc = null), Qc !== null && nf(Qc) && (Qc = null), py.forEach(yp), yy.forEach(yp);
    function af(t, e) {
      t.blockedOn === e && (t.blockedOn = null, q1 || (q1 = !0, ln.unstable_scheduleCallback(
        ln.unstable_NormalPriority,
        G0
    function X0(t) {
      Yb !== t && (Yb = t, ln.unstable_scheduleCallback(
        ln.unstable_NormalPriority,
          Yb === t && (Yb = null);
            var l = t[e], r = t[e + 1], h = t[e + 2];
            if (typeof r != "function") {
              if (vc(r || l) === null)
            var g = jn(l);
            g !== null && (t.splice(e, 3), e -= 3, l = {
              data: h,
              method: l.method,
              action: r
            }, Object.freeze(l), qu(
              g,
              l,
              r,
              h
    function us(t) {
      function e(w) {
        return af(w, t);
      }
      Gc !== null && af(Gc, t), Xc !== null && af(Xc, t), Qc !== null && af(Qc, t), py.forEach(e), yy.forEach(e);
      for (var l = 0; l < Zc.length; l++) {
        var r = Zc[l];
        r.blockedOn === t && (r.blockedOn = null);
      }
      for (; 0 < Zc.length && (l = Zc[0], l.blockedOn === null); )
        V0(l), l.blockedOn === null && Zc.shift();
      if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
        for (r = 0; r < l.length; r += 3) {
          var h = l[r], g = l[r + 1], T = h[Ha] || null;
          if (typeof g == "function")
            T || X0(l);
          else if (T) {
            var x = null;
            if (g && g.hasAttribute("formAction")) {
              if (h = g, T = g[Ha] || null)
                x = T.formAction;
              else if (vc(h) !== null) continue;
            } else x = T.action;
            typeof x == "function" ? l[r + 1] = x : (l.splice(r, 3), r -= 3), X0(l);
          }
        }
    }
    function wh(t) {
    function lf(t) {
    function Q0(t) {
      t[nu] && (t._reactRootContainer ? console.error(
    var ln = y2(), of = Am(), Bv = b2(), le = Object.assign, uf = Symbol.for("react.element"), Fo = Symbol.for("react.transitional.element"), ss = Symbol.for("react.portal"), Pt = Symbol.for("react.fragment"), Sc = Symbol.for("react.strict_mode"), Tc = Symbol.for("react.profiler"), bp = Symbol.for("react.provider"), zh = Symbol.for("react.consumer"), gl = Symbol.for("react.context"), lo = Symbol.for("react.forward_ref"), _c = Symbol.for("react.suspense"), Po = Symbol.for("react.suspense_list"), sf = Symbol.for("react.memo"), $a = Symbol.for("react.lazy"), vp = Symbol.for("react.activity"), Z0 = Symbol.for("react.memo_cache_sentinel"), Sp = Symbol.iterator, Ch = Symbol.for("react.client.reference"), Kt = Array.isArray, I = of.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Gt = Bv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Lv = Object.freeze({
    }), cf = [], rf = [], pl = -1, io = Vt(null), xc = Vt(null), Ti = Vt(null), Ec = Vt(null), oo = Object.prototype.hasOwnProperty, Hh = ln.unstable_scheduleCallback, Yv = ln.unstable_cancelCallback, K0 = ln.unstable_shouldYield, jv = ln.unstable_requestPaint, _i = ln.unstable_now, Io = ln.unstable_getCurrentPriorityLevel, Uh = ln.unstable_ImmediatePriority, ff = ln.unstable_UserBlockingPriority, Oc = ln.unstable_NormalPriority, qv = ln.unstable_LowPriority, df = ln.unstable_IdlePriority, Vv = ln.log, Yl = ln.unstable_setDisableYieldValue, tu = null, $n = null, Et = null, Ca = !1, on = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", aa = Math.clz32 ? Math.clz32 : Rs, Nh = Math.log, uo = Math.LN2, kh = 256, Bh = 4194304, Jn = 2, jl = 8, so = 32, Lh = 268435456, eu = Math.random().toString(36).slice(2), la = "__reactFiber$" + eu, Ha = "__reactProps$" + eu, nu = "__reactContainer$" + eu, Tp = "__reactEvents$" + eu, $0 = "__reactListeners$" + eu, Mc = "__reactHandles$" + eu, Dc = "__reactResources$" + eu, Ac = "__reactMarker$" + eu, J0 = /* @__PURE__ */ new Set(), yl = {}, cs = {}, W0 = {
    }, Yh = RegExp(
    ), jh = {}, qh = {}, au = 0, _p, xp, F0, Ep, Rc, P0, I0;
    Ol.__reactDisabledLog = !0;
    var Op, hf, wc = !1, mf = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ja = null, Ua = !1, Gv = /[\n"\\]/g, Mp = !1, Dp = !1, Ap = !1, Rp = !1, Vh = !1, wp = !1, gf = ["value", "defaultValue"], tb = !1, eb = /["'&<>\n\t]|^\s|\s$/, zp = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
    ), Gh = "applet caption html table td th marquee object template foreignObject desc title".split(
    ), Xh = Gh.concat(["button"]), Cp = "dd dt li option optgroup p rp rt".split(" "), Hp = {
    }, zc = {}, xi = {
    }, co = /([A-Z])/g, ro = /^ms-/, pf = /^(?:webkit|moz|o)[A-Z]/, yf = /^-ms-/, lu = /-(.)/g, nb = /;\s*$/, rs = {}, fs = {}, ab = !1, Up = !1, bf = new Set(
    ), vf = "http://www.w3.org/1998/Math/MathML", Cc = "http://www.w3.org/2000/svg", Qh = /* @__PURE__ */ new Map([
    ]), ds = {
    }, Np = {
    }, Ei = {}, kp = RegExp(
    ), Zh = RegExp(
    ), Bp = !1, ma = {}, Sf = /^on./, n = /^on[^A-Z]/, i = RegExp(
    ), d = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, p = null, v = null, O = null, R = !1, U = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), K = !1;
    if (U)
        var ot = {};
        Object.defineProperty(ot, "passive", {
            K = !0;
        }), window.addEventListener("test", ot, ot), window.removeEventListener("test", ot, ot);
        K = !1;
    var ct = null, W = null, P = null, kt = {
    }, Bt = Vn(kt), xe = le({}, kt, { view: 0, detail: 0 }), X = Vn(xe), j, Z, st, At = le({}, xe, {
      getModifierState: fd,
        return "movementX" in t ? t.movementX : (t !== st && (st && t.type === "mousemove" ? (j = t.screenX - st.screenX, Z = t.screenY - st.screenY) : Z = j = 0, st = t), j);
        return "movementY" in t ? t.movementY : Z;
    }), oe = Vn(At), Nt = le({}, At, { dataTransfer: 0 }), qt = Vn(Nt), Un = le({}, xe, { relatedTarget: 0 }), be = Vn(Un), iu = le({}, kt, {
    }), Xv = Vn(iu), OE = le({}, kt, {
    }), ME = Vn(OE), DE = le({}, kt, { data: 0 }), BS = Vn(
      DE
    ), AE = BS, RE = {
    }, wE = {
    }, zE = {
    }, CE = le({}, xe, {
          var e = RE[t.key] || t.key;
        return t.type === "keypress" ? (t = Ys(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? wE[t.keyCode] || "Unidentified" : "";
      getModifierState: fd,
        return t.type === "keypress" ? Ys(t) : 0;
        return t.type === "keypress" ? Ys(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }), HE = Vn(CE), UE = le({}, At, {
    }), LS = Vn(UE), NE = le({}, xe, {
      getModifierState: fd
    }), kE = Vn(NE), BE = le({}, kt, {
    }), LE = Vn(BE), YE = le({}, At, {
    }), jE = Vn(YE), qE = le({}, kt, {
    }), VE = Vn(qE), GE = [9, 13, 27, 32], YS = 229, Qv = U && "CompositionEvent" in window, Lp = null;
    U && "documentMode" in document && (Lp = document.documentMode);
    var XE = U && "TextEvent" in window && !Lp, jS = U && (!Qv || Lp && 8 < Lp && 11 >= Lp), qS = 32, VS = String.fromCharCode(qS), GS = !1, Kh = !1, QE = {
    }, Yp = null, jp = null, XS = !1;
    U && (XS = Lm("input") && (!document.documentMode || 9 < document.documentMode));
    var Wa = typeof Object.is == "function" ? Object.is : wv, ZE = U && "documentMode" in document && 11 >= document.documentMode, $h = null, Zv = null, qp = null, Kv = !1, Jh = {
      animationend: Vi("Animation", "AnimationEnd"),
      animationiteration: Vi("Animation", "AnimationIteration"),
      animationstart: Vi("Animation", "AnimationStart"),
      transitionrun: Vi("Transition", "TransitionRun"),
      transitionstart: Vi("Transition", "TransitionStart"),
      transitioncancel: Vi("Transition", "TransitionCancel"),
      transitionend: Vi("Transition", "TransitionEnd")
    }, $v = {}, QS = {};
    U && (QS = document.createElement("div").style, "AnimationEvent" in window || (delete Jh.animationend.animation, delete Jh.animationiteration.animation, delete Jh.animationstart.animation), "TransitionEvent" in window || delete Jh.transitionend.transition);
    var ZS = wu("animationend"), KS = wu("animationiteration"), $S = wu("animationstart"), KE = wu("transitionrun"), $E = wu("transitionstart"), JE = wu("transitioncancel"), JS = wu("transitionend"), WS = /* @__PURE__ */ new Map(), Jv = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    Jv.push("scrollEnd");
    var Wv = /* @__PURE__ */ new WeakMap(), lb = 1, hs = 2, Oi = [], Wh = 0, Fv = 0, Hc = {};
    Object.freeze(Hc);
    var Mi = null, Fh = null, Ze = 0, WE = 1, ga = 2, Na = 8, fo = 16, FS = 64, PS = !1;
      var IS = Object.preventExtensions({});
      PS = !0;
    var Ph = [], Ih = 0, ib = null, ob = 0, Di = [], Ai = 0, Tf = null, ms = 1, gs = "", Fa = null, dn = null, Ee = !1, ps = !1, Ri = null, _f = null, ou = !1, Pv = Error(
    ), tT = 0;
      var FE = performance, eT = function() {
        return FE.now();
      var PE = Date;
      eT = function() {
        return PE.now();
    var Iv = Vt(null), t1 = Vt(null), nT = {}, ub = null, tm = null, em = !1, IE = typeof AbortController < "u" ? AbortController : function() {
        addEventListener: function(l, r) {
          t.push(r);
        e.aborted = !0, t.forEach(function(l) {
          return l();
    }, tO = ln.unstable_scheduleCallback, eO = ln.unstable_NormalPriority, Wn = {
      $$typeof: gl,
    }, nm = ln.unstable_now, aT = -0, sb = -0, bl = -1.1, xf = -0, cb = !1, rb = !1, Vp = null, e1 = 0, Ef = 0, am = null, lT = I.S;
    I.S = function(t, e) {
      typeof e == "object" && e !== null && typeof e.then == "function" && m0(t, e), lT !== null && lT(t, e);
    var Of = Vt(null), ho = {
    }, Gp = [], Xp = [], Qp = [], Zp = [], Kp = [], $p = [], Mf = /* @__PURE__ */ new Set();
    ho.recordUnsafeLifecycleWarnings = function(t, e) {
      Mf.has(t.type) || (typeof e.componentWillMount == "function" && e.componentWillMount.__suppressDeprecationWarning !== !0 && Gp.push(t), t.mode & Na && typeof e.UNSAFE_componentWillMount == "function" && Xp.push(t), typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Qp.push(t), t.mode & Na && typeof e.UNSAFE_componentWillReceiveProps == "function" && Zp.push(t), typeof e.componentWillUpdate == "function" && e.componentWillUpdate.__suppressDeprecationWarning !== !0 && Kp.push(t), t.mode & Na && typeof e.UNSAFE_componentWillUpdate == "function" && $p.push(t));
    }, ho.flushPendingUnsafeLifecycleWarnings = function() {
      0 < Gp.length && (Gp.forEach(function(x) {
          ht(x) || "Component"
        ), Mf.add(x.type);
      }), Gp = []);
      0 < Xp.length && (Xp.forEach(function(x) {
          ht(x) || "Component"
        ), Mf.add(x.type);
      }), Xp = []);
      var l = /* @__PURE__ */ new Set();
      0 < Qp.length && (Qp.forEach(function(x) {
        l.add(
          ht(x) || "Component"
        ), Mf.add(x.type);
      }), Qp = []);
      var r = /* @__PURE__ */ new Set();
      0 < Zp.length && (Zp.forEach(
        function(x) {
          r.add(
            ht(x) || "Component"
          ), Mf.add(x.type);
        }
      ), Zp = []);
      var h = /* @__PURE__ */ new Set();
      0 < Kp.length && (Kp.forEach(function(x) {
        h.add(
          ht(x) || "Component"
        ), Mf.add(x.type);
      }), Kp = []);
      var g = /* @__PURE__ */ new Set();
      if (0 < $p.length && ($p.forEach(function(x) {
        g.add(
          ht(x) || "Component"
        ), Mf.add(x.type);
      }), $p = []), 0 < e.size) {
        var T = D(
          T
      0 < r.size && (T = D(
        r
        T
      )), 0 < g.size && (T = D(
        g
        T
      )), 0 < t.size && (T = D(t), console.warn(
        T
      )), 0 < l.size && (T = D(
        l
        T
      )), 0 < h.size && (T = D(h), console.warn(
        T
    var fb = /* @__PURE__ */ new Map(), iT = /* @__PURE__ */ new Set();
    ho.recordLegacyContextWarning = function(t, e) {
      for (var l = null, r = t; r !== null; )
        r.mode & Na && (l = r), r = r.return;
      l === null ? console.error(
      ) : !iT.has(t.type) && (r = fb.get(l), t.type.contextTypes != null || t.type.childContextTypes != null || e !== null && typeof e.getChildContext == "function") && (r === void 0 && (r = [], fb.set(l, r)), r.push(t));
    }, ho.flushLegacyContextWarning = function() {
      fb.forEach(function(t) {
          var e = t[0], l = /* @__PURE__ */ new Set();
          t.forEach(function(h) {
            l.add(ht(h) || "Component"), iT.add(h.type);
          var r = D(l);
          Rt(e, function() {
              r
    }, ho.discardPendingWarnings = function() {
      Gp = [], Xp = [], Qp = [], Zp = [], Kp = [], $p = [], fb = /* @__PURE__ */ new Map();
    var Jp = Error(
    ), oT = Error(
    ), db = Error(
    ), n1 = {
    }, Wp = null, hb = !1, wi = 0, zi = 1, Pa = 2, pa = 4, Fn = 8, uT = 0, sT = 1, cT = 2, a1 = 3, Uc = !1, rT = !1, l1 = null, i1 = !1, lm = Vt(null), mb = Vt(0), im, fT = /* @__PURE__ */ new Set(), dT = /* @__PURE__ */ new Set(), o1 = /* @__PURE__ */ new Set(), hT = /* @__PURE__ */ new Set(), Nc = 0, $t = null, Le = null, Nn = null, gb = !1, om = !1, Df = !1, pb = 0, Fp = 0, ys = null, nO = 0, aO = 25, tt = null, Ci = null, bs = -1, Pp = !1, yb = {
      readContext: Ye,
      use: ei,
      useCallback: $e,
      useContext: $e,
      useEffect: $e,
      useImperativeHandle: $e,
      useLayoutEffect: $e,
      useInsertionEffect: $e,
      useMemo: $e,
      useReducer: $e,
      useRef: $e,
      useState: $e,
      useDebugValue: $e,
      useDeferredValue: $e,
      useTransition: $e,
      useSyncExternalStore: $e,
      useId: $e,
      useHostTransitionStatus: $e,
      useFormState: $e,
      useActionState: $e,
      useOptimistic: $e,
      useMemoCache: $e,
      useCacheRefresh: $e
    }, u1 = null, mT = null, s1 = null, gT = null, uu = null, mo = null, bb = null;
    u1 = {
        return Ye(t);
      use: ei,
        return tt = "useCallback", ie(), il(e), Mr(t, e);
        return tt = "useContext", ie(), Ye(t);
        return tt = "useEffect", ie(), il(e), Od(t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", ie(), il(l), Dd(t, e, l);
        tt = "useInsertionEffect", ie(), il(e), cl(4, Pa, t, e);
        return tt = "useLayoutEffect", ie(), il(e), Md(t, e);
        tt = "useMemo", ie(), il(e);
        var l = I.H;
        I.H = uu;
          return Ad(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", ie();
        var r = I.H;
        I.H = uu;
          return ve(t, e, l);
          I.H = r;
        return tt = "useRef", ie(), Or(t);
        tt = "useState", ie();
        var e = I.H;
        I.H = uu;
          return Ki(t);
          I.H = e;
        tt = "useDebugValue", ie();
        return tt = "useDeferredValue", ie(), Rd(t, e);
        return tt = "useTransition", ie(), ii();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", ie(), Zi(
          l
        return tt = "useId", ie(), oi();
        return tt = "useFormState", ie(), Qs(), Fs(t, e);
        return tt = "useActionState", ie(), Fs(t, e);
        return tt = "useOptimistic", ie(), Ul(t);
      useMemoCache: un,
        return tt = "useCacheRefresh", ie(), Vu();
    }, mT = {
        return Ye(t);
      use: ei,
        return tt = "useCallback", mt(), Mr(t, e);
        return tt = "useContext", mt(), Ye(t);
        return tt = "useEffect", mt(), Od(t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", mt(), Dd(t, e, l);
        tt = "useInsertionEffect", mt(), cl(4, Pa, t, e);
        return tt = "useLayoutEffect", mt(), Md(t, e);
        tt = "useMemo", mt();
        var l = I.H;
        I.H = uu;
          return Ad(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", mt();
        var r = I.H;
        I.H = uu;
          return ve(t, e, l);
          I.H = r;
        return tt = "useRef", mt(), Or(t);
        tt = "useState", mt();
        var e = I.H;
        I.H = uu;
          return Ki(t);
          I.H = e;
        tt = "useDebugValue", mt();
        return tt = "useDeferredValue", mt(), Rd(t, e);
        return tt = "useTransition", mt(), ii();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", mt(), Zi(
          l
        return tt = "useId", mt(), oi();
        return tt = "useActionState", mt(), Fs(t, e);
        return tt = "useFormState", mt(), Qs(), Fs(t, e);
        return tt = "useOptimistic", mt(), Ul(t);
      useMemoCache: un,
        return tt = "useCacheRefresh", mt(), Vu();
    }, s1 = {
        return Ye(t);
      use: ei,
        return tt = "useCallback", mt(), ju(t, e);
        return tt = "useContext", mt(), Ye(t);
        tt = "useEffect", mt(), Sn(2048, Fn, t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", mt(), li(t, e, l);
        return tt = "useInsertionEffect", mt(), Sn(4, Pa, t, e);
        return tt = "useLayoutEffect", mt(), Sn(4, pa, t, e);
        tt = "useMemo", mt();
        var l = I.H;
        I.H = mo;
          return Lo(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", mt();
        var r = I.H;
        I.H = mo;
          return ul(t, e, l);
          I.H = r;
        return tt = "useRef", mt(), pe().memoizedState;
        tt = "useState", mt();
        var t = I.H;
        I.H = mo;
          return ul(Te);
          I.H = t;
        tt = "useDebugValue", mt();
        return tt = "useDeferredValue", mt(), Dr(t, e);
        return tt = "useTransition", mt(), Cd();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", mt(), Tr(
          l
        return tt = "useId", mt(), pe().memoizedState;
        return tt = "useFormState", mt(), Qs(), Ed(t);
        return tt = "useActionState", mt(), Ed(t);
        return tt = "useOptimistic", mt(), $i(t, e);
      useMemoCache: un,
        return tt = "useCacheRefresh", mt(), pe().memoizedState;
    }, gT = {
        return Ye(t);
      use: ei,
        return tt = "useCallback", mt(), ju(t, e);
        return tt = "useContext", mt(), Ye(t);
        tt = "useEffect", mt(), Sn(2048, Fn, t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", mt(), li(t, e, l);
        return tt = "useInsertionEffect", mt(), Sn(4, Pa, t, e);
        return tt = "useLayoutEffect", mt(), Sn(4, pa, t, e);
        tt = "useMemo", mt();
        var l = I.H;
        I.H = bb;
          return Lo(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", mt();
        var r = I.H;
        I.H = bb;
          return Yu(t, e, l);
          I.H = r;
        return tt = "useRef", mt(), pe().memoizedState;
        tt = "useState", mt();
        var t = I.H;
        I.H = bb;
          return Yu(Te);
          I.H = t;
        tt = "useDebugValue", mt();
        return tt = "useDeferredValue", mt(), wd(t, e);
        return tt = "useTransition", mt(), Hd();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", mt(), Tr(
          l
        return tt = "useId", mt(), pe().memoizedState;
        return tt = "useFormState", mt(), Qs(), Ps(t);
        return tt = "useActionState", mt(), Ps(t);
        return tt = "useOptimistic", mt(), xd(t, e);
      useMemoCache: un,
        return tt = "useCacheRefresh", mt(), pe().memoizedState;
    }, uu = {
        return _(), Ye(t);
        return S(), ei(t);
        return tt = "useCallback", S(), ie(), Mr(t, e);
        return tt = "useContext", S(), ie(), Ye(t);
        return tt = "useEffect", S(), ie(), Od(t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", S(), ie(), Dd(t, e, l);
        tt = "useInsertionEffect", S(), ie(), cl(4, Pa, t, e);
        return tt = "useLayoutEffect", S(), ie(), Md(t, e);
        tt = "useMemo", S(), ie();
        var l = I.H;
        I.H = uu;
          return Ad(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", S(), ie();
        var r = I.H;
        I.H = uu;
          return ve(t, e, l);
          I.H = r;
        return tt = "useRef", S(), ie(), Or(t);
        tt = "useState", S(), ie();
        var e = I.H;
        I.H = uu;
          return Ki(t);
          I.H = e;
        tt = "useDebugValue", S(), ie();
        return tt = "useDeferredValue", S(), ie(), Rd(t, e);
        return tt = "useTransition", S(), ie(), ii();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", S(), ie(), Zi(
          l
        return tt = "useId", S(), ie(), oi();
        return tt = "useFormState", S(), ie(), Fs(t, e);
        return tt = "useActionState", S(), ie(), Fs(t, e);
        return tt = "useOptimistic", S(), ie(), Ul(t);
        return S(), un(t);
        return tt = "useCacheRefresh", ie(), Vu();
    }, mo = {
        return _(), Ye(t);
        return S(), ei(t);
        return tt = "useCallback", S(), mt(), ju(t, e);
        return tt = "useContext", S(), mt(), Ye(t);
        tt = "useEffect", S(), mt(), Sn(2048, Fn, t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", S(), mt(), li(t, e, l);
        return tt = "useInsertionEffect", S(), mt(), Sn(4, Pa, t, e);
        return tt = "useLayoutEffect", S(), mt(), Sn(4, pa, t, e);
        tt = "useMemo", S(), mt();
        var l = I.H;
        I.H = mo;
          return Lo(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", S(), mt();
        var r = I.H;
        I.H = mo;
          return ul(t, e, l);
          I.H = r;
        return tt = "useRef", S(), mt(), pe().memoizedState;
        tt = "useState", S(), mt();
        var t = I.H;
        I.H = mo;
          return ul(Te);
          I.H = t;
        tt = "useDebugValue", S(), mt();
        return tt = "useDeferredValue", S(), mt(), Dr(t, e);
        return tt = "useTransition", S(), mt(), Cd();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", S(), mt(), Tr(
          l
        return tt = "useId", S(), mt(), pe().memoizedState;
        return tt = "useFormState", S(), mt(), Ed(t);
        return tt = "useActionState", S(), mt(), Ed(t);
        return tt = "useOptimistic", S(), mt(), $i(t, e);
        return S(), un(t);
        return tt = "useCacheRefresh", mt(), pe().memoizedState;
    }, bb = {
        return _(), Ye(t);
        return S(), ei(t);
        return tt = "useCallback", S(), mt(), ju(t, e);
        return tt = "useContext", S(), mt(), Ye(t);
        tt = "useEffect", S(), mt(), Sn(2048, Fn, t, e);
      useImperativeHandle: function(t, e, l) {
        return tt = "useImperativeHandle", S(), mt(), li(t, e, l);
        return tt = "useInsertionEffect", S(), mt(), Sn(4, Pa, t, e);
        return tt = "useLayoutEffect", S(), mt(), Sn(4, pa, t, e);
        tt = "useMemo", S(), mt();
        var l = I.H;
        I.H = mo;
          return Lo(t, e);
          I.H = l;
      useReducer: function(t, e, l) {
        tt = "useReducer", S(), mt();
        var r = I.H;
        I.H = mo;
          return Yu(t, e, l);
          I.H = r;
        return tt = "useRef", S(), mt(), pe().memoizedState;
        tt = "useState", S(), mt();
        var t = I.H;
        I.H = mo;
          return Yu(Te);
          I.H = t;
        tt = "useDebugValue", S(), mt();
        return tt = "useDeferredValue", S(), mt(), wd(t, e);
        return tt = "useTransition", S(), mt(), Hd();
      useSyncExternalStore: function(t, e, l) {
        return tt = "useSyncExternalStore", S(), mt(), Tr(
          l
        return tt = "useId", S(), mt(), pe().memoizedState;
        return tt = "useFormState", S(), mt(), Ps(t);
        return tt = "useActionState", S(), mt(), Ps(t);
        return tt = "useOptimistic", S(), mt(), xd(t, e);
        return S(), un(t);
        return tt = "useCacheRefresh", mt(), pe().memoizedState;
    var pT = {
      react_stack_bottom_frame: function(t, e, l) {
        var r = Ua;
        Ua = !0;
          return t(e, l);
          Ua = r;
    }, c1 = pT.react_stack_bottom_frame.bind(pT), yT = {
        var e = Ua;
        Ua = !0;
          Ua = e;
    }, bT = yT.react_stack_bottom_frame.bind(yT), vT = {
        } catch (l) {
          jt(t, t.return, l);
    }, r1 = vT.react_stack_bottom_frame.bind(
      vT
    ), ST = {
      react_stack_bottom_frame: function(t, e, l, r, h) {
          e.componentDidUpdate(l, r, h);
        } catch (g) {
          jt(t, t.return, g);
    }, TT = ST.react_stack_bottom_frame.bind(
      ST
    ), _T = {
        var l = e.stack;
          componentStack: l !== null ? l : ""
    }, lO = _T.react_stack_bottom_frame.bind(
      _T
    ), xT = {
      react_stack_bottom_frame: function(t, e, l) {
          l.componentWillUnmount();
        } catch (r) {
          jt(t, e, r);
    }, ET = xT.react_stack_bottom_frame.bind(
      xT
    ), OT = {
    }, iO = OT.react_stack_bottom_frame.bind(OT), MT = {
      react_stack_bottom_frame: function(t, e, l) {
          l();
        } catch (r) {
          jt(t, e, r);
    }, oO = MT.react_stack_bottom_frame.bind(MT), DT = {
    }, kc = DT.react_stack_bottom_frame.bind(DT), um = null, Ip = 0, ue = null, f1, AT = f1 = !1, RT = {}, wT = {}, zT = {};
    b = function(t, e, l) {
      if (l !== null && typeof l == "object" && l._store && (!l._store.validated && l.key == null || l._store.validated === 2)) {
        if (typeof l._store != "object")
        l._store.validated = 1;
        var r = ht(t), h = r || "null";
        if (!RT[h]) {
          RT[h] = !0, l = l._owner, t = t._debugOwner;
          var g = "";
          t && typeof t.tag == "number" && (h = ht(t)) && (g = `
Check the render method of \`` + h + "`."), g || r && (g = `
Check the top-level render call using <` + r + ">.");
          var T = "";
          l != null && t !== l && (r = null, typeof l.tag == "number" ? r = ht(l) : typeof l.name == "string" && (r = l.name), r && (T = " It was passed a child from " + r + ".")), Rt(e, function() {
              g,
              T
    var sm = zr(!0), CT = zr(!1), Hi = Vt(null), su = null, cm = 1, ty = 2, Pn = Vt(0), HT = {}, UT = /* @__PURE__ */ new Set(), NT = /* @__PURE__ */ new Set(), kT = /* @__PURE__ */ new Set(), BT = /* @__PURE__ */ new Set(), LT = /* @__PURE__ */ new Set(), YT = /* @__PURE__ */ new Set(), jT = /* @__PURE__ */ new Set(), qT = /* @__PURE__ */ new Set(), VT = /* @__PURE__ */ new Set(), GT = /* @__PURE__ */ new Set();
    Object.freeze(HT);
    var d1 = {
      enqueueSetState: function(t, e, l) {
        var r = Aa(t), h = Il(r);
        h.payload = e, l != null && (pg(l), h.callback = l), e = zl(t, h, r), e !== null && (tn(e, t, r), Ho(e, t, r)), Ql(t, r);
      enqueueReplaceState: function(t, e, l) {
        var r = Aa(t), h = Il(r);
        h.tag = sT, h.payload = e, l != null && (pg(l), h.callback = l), e = zl(t, h, r), e !== null && (tn(e, t, r), Ho(e, t, r)), Ql(t, r);
        var l = Aa(t), r = Il(l);
        r.tag = cT, e != null && (pg(e), r.callback = e), e = zl(t, r, l), e !== null && (tn(e, t, l), Ho(e, t, l)), Et !== null && typeof Et.markForceUpdateScheduled == "function" && Et.markForceUpdateScheduled(t, l);
    }, h1 = typeof reportError == "function" ? reportError : function(t) {
    }, rm = null, m1 = null, XT = Error(
    ), ia = !1, QT = {}, ZT = {}, KT = {}, $T = {}, fm = !1, JT = {}, g1 = {}, p1 = {
    }, WT = !1, FT = null;
    FT = /* @__PURE__ */ new Set();
    var vs = !1, xn = !1, y1 = !1, PT = typeof WeakSet == "function" ? WeakSet : Set, oa = null, dm = null, hm = null, kn = null, vl = !1, go = null, ey = 8192, uO = {
        var e = Ye(Wn), l = e.data.get(t);
        return l === void 0 && (l = t(), e.data.set(t, l)), l;
        return Ja;
      var ny = Symbol.for;
      ny("selector.component"), ny("selector.has_pseudo_class"), ny("selector.role"), ny("selector.test_id"), ny("selector.text");
    var sO = [], cO = typeof WeakMap == "function" ? WeakMap : Map, ql = 0, Ia = 2, po = 4, Ss = 0, ay = 1, mm = 2, b1 = 3, Af = 4, vb = 6, IT = 5, we = ql, je = null, he = null, me = 0, Sl = 0, ly = 1, Rf = 2, iy = 3, t_ = 4, v1 = 5, gm = 6, oy = 7, S1 = 8, wf = 9, Ue = Sl, Vl = null, Bc = !1, pm = !1, T1 = !1, cu = 0, hn = Ss, Lc = 0, Yc = 0, _1 = 0, Gl = 0, zf = 0, uy = null, tl = null, Sb = !1, x1 = 0, e_ = 300, Tb = 1 / 0, n_ = 500, sy = null, jc = null, rO = 0, fO = 1, dO = 2, Cf = 0, a_ = 1, l_ = 2, i_ = 3, hO = 4, E1 = 5, ya = 0, qc = null, ym = null, Vc = 0, O1 = 0, M1 = null, o_ = null, mO = 50, cy = 0, D1 = null, A1 = !1, _b = !1, gO = 50, Hf = 0, ry = null, bm = !1, xb = null, u_ = !1, s_ = /* @__PURE__ */ new Set(), pO = {}, Eb = null, vm = null, R1 = !1, w1 = !1, Ob = !1, z1 = !1, Uf = 0, C1 = {};
      for (var t = 0; t < Jv.length; t++) {
        var e = Jv[t], l = e.toLowerCase();
        e = e[0].toUpperCase() + e.slice(1), Ml(l, "on" + e);
      Ml(ZS, "onAnimationEnd"), Ml(KS, "onAnimationIteration"), Ml($S, "onAnimationStart"), Ml("dblclick", "onDoubleClick"), Ml("focusin", "onFocus"), Ml("focusout", "onBlur"), Ml(KE, "onTransitionRun"), Ml($E, "onTransitionStart"), Ml(JE, "onTransitionCancel"), Ml(JS, "onTransitionEnd");
    })(), _t("onMouseEnter", ["mouseout", "mouseover"]), _t("onMouseLeave", ["mouseout", "mouseover"]), _t("onPointerEnter", ["pointerout", "pointerover"]), _t("onPointerLeave", ["pointerout", "pointerover"]), gt(
    ), gt(
    ), gt("onBeforeInput", [
    ]), gt(
    ), gt(
    ), gt(
    var fy = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    ), H1 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fy)
    ), Mb = "_reactListening" + Math.random().toString(36).slice(2), c_ = !1, r_ = !1, Db = !1, f_ = !1, Ab = !1, Rb = !1, d_ = !1, wb = {}, yO = /\r\n?/g, bO = /\u0000|\uFFFD/g, Nf = "http://www.w3.org/1999/xlink", U1 = "http://www.w3.org/XML/1998/namespace", vO = "javascript:throw new Error('React form unexpectedly submitted.')", SO = "suppressHydrationWarning", zb = "$", Cb = "/$", Ts = "$?", dy = "$!", TO = 1, _O = 2, xO = 4, N1 = "F!", h_ = "F", m_ = "complete", EO = "style", _s = 0, Sm = 1, Hb = 2, k1 = null, B1 = null, g_ = { dialog: !0, webview: !0 }, L1 = null, p_ = typeof setTimeout == "function" ? setTimeout : void 0, OO = typeof clearTimeout == "function" ? clearTimeout : void 0, kf = -1, y_ = typeof Promise == "function" ? Promise : void 0, MO = typeof queueMicrotask == "function" ? queueMicrotask : typeof y_ < "u" ? function(t) {
      return y_.resolve(null).then(t).catch(np);
    } : p_, Y1 = null, Bf = 0, hy = 1, b_ = 2, v_ = 3, Ui = 4, Ni = /* @__PURE__ */ new Map(), S_ = /* @__PURE__ */ new Set(), xs = Gt.d;
    Gt.d = {
        var t = xs.f(), e = Pu();
        var e = jn(t);
        e !== null && e.tag === 5 && e.type === "form" ? hg(e) : xs.r(t);
        xs.D(t), k0("dns-prefetch", t, null);
        xs.C(t, e), k0("preconnect", t, e);
      L: function(t, e, l) {
        xs.L(t, e, l);
        var r = Tm;
        if (r && t && e) {
          var h = 'link[rel="preload"][as="' + ja(e) + '"]';
          e === "image" && l && l.imageSrcSet ? (h += '[imagesrcset="' + ja(
            l.imageSrcSet
          ) + '"]', typeof l.imageSizes == "string" && (h += '[imagesizes="' + ja(
            l.imageSizes
          ) + '"]')) : h += '[href="' + ja(t) + '"]';
          var g = h;
              g = $o(t);
              g = is(t);
          Ni.has(g) || (t = le(
              href: e === "image" && l && l.imageSrcSet ? void 0 : t,
            l
          ), Ni.set(g, t), r.querySelector(h) !== null || e === "style" && r.querySelector(
            Si(g)
          ) || e === "script" && r.querySelector(os(g)) || (e = r.createElement("link"), nn(e, "link", t), G(e), r.head.appendChild(e)));
        xs.m(t, e);
        var l = Tm;
        if (l && t) {
          var r = e && typeof e.as == "string" ? e.as : "script", h = 'link[rel="modulepreload"][as="' + ja(r) + '"][href="' + ja(t) + '"]', g = h;
          switch (r) {
              g = is(t);
          if (!Ni.has(g) && (t = le({ rel: "modulepreload", href: t }, e), Ni.set(g, t), l.querySelector(h) === null)) {
            switch (r) {
                if (l.querySelector(os(g)))
            r = l.createElement("link"), nn(r, "link", t), G(r), l.head.appendChild(r);
        xs.X(t, e);
        var l = Tm;
        if (l && t) {
          var r = A(l).hoistableScripts, h = is(t), g = r.get(h);
          g || (g = l.querySelector(
            os(h)
          ), g || (t = le({ src: t, async: !0 }, e), (e = Ni.get(h)) && rp(t, e), g = l.createElement("script"), G(g), nn(g, "link", t), l.head.appendChild(g)), g = {
            instance: g,
          }, r.set(h, g));
      S: function(t, e, l) {
        xs.S(t, e, l);
        var r = Tm;
        if (r && t) {
          var h = A(r).hoistableStyles, g = $o(t);
          var T = h.get(g);
          if (!T) {
            var x = { loading: Bf, preload: null };
            if (T = r.querySelector(
              Si(g)
              x.loading = hy | Ui;
              t = le(
                l
              ), (l = Ni.get(g)) && cp(t, l);
              var w = T = r.createElement("link");
              G(w), nn(w, "link", t), w._p = new Promise(function(C, F) {
                w.onload = C, w.onerror = F;
              }), w.addEventListener("load", function() {
                x.loading |= hy;
              }), w.addEventListener("error", function() {
                x.loading |= b_;
              }), x.loading |= Ui, Eh(T, e, r);
            T = {
              instance: T,
              state: x
            }, h.set(g, T);
        xs.M(t, e);
        var l = Tm;
        if (l && t) {
          var r = A(l).hoistableScripts, h = is(t), g = r.get(h);
          g || (g = l.querySelector(
            os(h)
          ), g || (t = le({ src: t, async: !0, type: "module" }, e), (e = Ni.get(h)) && rp(t, e), g = l.createElement("script"), G(g), nn(g, "link", t), l.head.appendChild(g)), g = {
            instance: g,
          }, r.set(h, g));
    var Tm = typeof document > "u" ? null : document, Ub = null, my = null, j1 = null, Nb = null, Lf = Lv, gy = {
      $$typeof: gl,
      _currentValue: Lf,
      _currentValue2: Lf,
    }, T_ = "%c%s%c ", __ = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", x_ = "", kb = " ", DO = Function.prototype.bind, E_ = !1, O_ = null, M_ = null, D_ = null, A_ = null, R_ = null, w_ = null, z_ = null, C_ = null, H_ = null;
    O_ = function(t, e, l, r) {
      e = u(t, e), e !== null && (l = a(e.memoizedState, l, 0, r), e.memoizedState = l, e.baseState = l, t.memoizedProps = le({}, t.memoizedProps), l = Ta(t, 2), l !== null && tn(l, t, 2));
    }, M_ = function(t, e, l) {
      e = u(t, e), e !== null && (l = f(e.memoizedState, l, 0), e.memoizedState = l, e.baseState = l, t.memoizedProps = le({}, t.memoizedProps), l = Ta(t, 2), l !== null && tn(l, t, 2));
    }, D_ = function(t, e, l, r) {
      e = u(t, e), e !== null && (l = o(e.memoizedState, l, r), e.memoizedState = l, e.baseState = l, t.memoizedProps = le({}, t.memoizedProps), l = Ta(t, 2), l !== null && tn(l, t, 2));
    }, A_ = function(t, e, l) {
      t.pendingProps = a(t.memoizedProps, e, 0, l), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = Ta(t, 2), e !== null && tn(e, t, 2);
    }, R_ = function(t, e) {
      t.pendingProps = f(t.memoizedProps, e, 0), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = Ta(t, 2), e !== null && tn(e, t, 2);
    }, w_ = function(t, e, l) {
      t.pendingProps = o(
        l
      ), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = Ta(t, 2), e !== null && tn(e, t, 2);
    }, z_ = function(t) {
      var e = Ta(t, 2);
      e !== null && tn(e, t, 2);
    }, C_ = function(t) {
      y = t;
    }, H_ = function(t) {
      m = t;
    var Bb = !0, Lb = null, q1 = !1, Gc = null, Xc = null, Qc = null, py = /* @__PURE__ */ new Map(), yy = /* @__PURE__ */ new Map(), Zc = [], AO = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    ), Yb = null;
    if (lf.prototype.render = wh.prototype.render = function(t) {
      var l = arguments;
      typeof l[1] == "function" ? console.error(
      ) : B(l[1]) ? console.error(
      ) : typeof l[1] < "u" && console.error(
      ), l = t;
      var r = e.current, h = Aa(r);
      Re(r, h, l, e, null, null);
    }, lf.prototype.unmount = wh.prototype.unmount = function() {
        (we & (Ia | po)) !== ql && console.error(
        ), Re(t.current, 2, null, t, null, null), Pu(), e[nu] = null;
    }, lf.prototype.unstable_scheduleHydration = function(t) {
        var e = tr();
        for (var l = 0; l < Zc.length && e !== 0 && e < Zc[l].priority; l++) ;
        Zc.splice(l, 0, t), l === 0 && V0(t);
      var t = of.version;
    ), Gt.findDOMNode = function(t) {
      return t = St(e), t = t !== null ? ut(t) : null, t = t === null ? null : t.stateNode, t;
        currentDispatcherRef: I,
      return t.overrideHookState = O_, t.overrideHookStateDeletePath = M_, t.overrideHookStateRenamePath = D_, t.overrideProps = A_, t.overridePropsDeletePath = R_, t.overridePropsRenamePath = w_, t.scheduleUpdate = z_, t.setErrorHandler = C_, t.setSuspenseHandler = H_, t.scheduleRefresh = q, t.scheduleRoot = H, t.setRefreshHandler = V, t.getCurrentFiber = Uv, t.getLaneLabelMap = Nv, t.injectProfilingHooks = pn, Ut(t);
    }() && U && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var U_ = window.location.protocol;
      /^(https?|file):$/.test(U_) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (U_ === "file:" ? `
    Ty.createRoot = function(t, e) {
      if (!B(t))
      Q0(t);
      var l = !1, r = "", h = yg, g = S0, T = Bd, x = null;
      ) : typeof e == "object" && e !== null && e.$$typeof === Fo && console.error(
      ), e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (r = e.identifierPrefix), e.onUncaughtError !== void 0 && (h = e.onUncaughtError), e.onCaughtError !== void 0 && (g = e.onCaughtError), e.onRecoverableError !== void 0 && (T = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (x = e.unstable_transitionCallbacks)), e = hp(
        l,
        r,
        h,
        g,
        T,
        x,
      ), t[nu] = e.current, Jg(t), new wh(e);
    }, Ty.hydrateRoot = function(t, e, l) {
      if (!B(t))
      Q0(t), e === void 0 && console.error(
      var r = !1, h = "", g = yg, T = S0, x = Bd, w = null, C = null;
      return l != null && (l.unstable_strictMode === !0 && (r = !0), l.identifierPrefix !== void 0 && (h = l.identifierPrefix), l.onUncaughtError !== void 0 && (g = l.onUncaughtError), l.onCaughtError !== void 0 && (T = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (w = l.unstable_transitionCallbacks), l.formState !== void 0 && (C = l.formState)), e = hp(
        l ?? null,
        r,
        h,
        g,
        T,
        x,
        w,
        C
      ), e.context = mp(null), l = e.current, r = Aa(l), r = Ln(r), h = Il(r), h.callback = null, zl(l, h, r), l = r, e.current.lanes = l, Bi(e, l), dl(e), t[nu] = e.current, Jg(t), new lf(e);
    }, Ty.version = "19.1.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Ty;
}
var J_;
function qO() {
  if (J_) return Vb.exports;
  J_ = 1;
  function u() {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (a) {
        console.error(a);
  return process.env.NODE_ENV === "production" ? (u(), Vb.exports = YO()) : Vb.exports = jO(), Vb.exports;
var VO = qO();
function GO({ value: u, onChange: a }) {
  const [o, s] = ba.useState([]);
  return ba.useEffect(() => {
    fetch("/api/products").then((f) => f.json()).then(s).catch((f) => console.error("products error", f));
  }, []), /* @__PURE__ */ Yt.jsx("select", { value: u, onChange: (f) => a(f.target.value), className: "form-select", children: o.map((f) => /* @__PURE__ */ Yt.jsx("option", { value: f.name, children: f.label }, f.name)) });
function XO({ value: u, onChange: a }) {
  const [o, s] = ba.useState([]);
  return ba.useEffect(() => {
    fetch("/api/cities").then((f) => f.json()).then(s).catch((f) => console.error("cities error", f));
  }, []), /* @__PURE__ */ Yt.jsxs("select", { value: u, onChange: (f) => a(f.target.value), className: "form-select", children: [
    /* @__PURE__ */ Yt.jsx("option", { value: "", children: "Wszystkie miasta..." }),
    o.map((f) => /* @__PURE__ */ Yt.jsx("option", { value: f, children: f }, f))
function QO({ sort: u, order: a, onSortChange: o, onOrderChange: s }) {
  return /* @__PURE__ */ Yt.jsxs("div", { className: "d-flex gap-2 my-2", children: [
    /* @__PURE__ */ Yt.jsxs("select", { value: u, onChange: (f) => o(f.target.value), className: "form-select form-select-sm", children: [
      /* @__PURE__ */ Yt.jsx("option", { value: "price", children: "Cena" }),
      /* @__PURE__ */ Yt.jsx("option", { value: "expiration", children: "Ważność" }),
      /* @__PURE__ */ Yt.jsx("option", { value: "fetched_at", children: "Data pobrania" })
    /* @__PURE__ */ Yt.jsxs("select", { value: a, onChange: (f) => s(f.target.value), className: "form-select form-select-sm", children: [
      /* @__PURE__ */ Yt.jsx("option", { value: "asc", children: "Rosnąco" }),
      /* @__PURE__ */ Yt.jsx("option", { value: "desc", children: "Malejąco" })
function ZO({ offers: u }) {
  return /* @__PURE__ */ Yt.jsx("div", { className: "table-responsive", children: /* @__PURE__ */ Yt.jsxs("table", { className: "table table-bordered", children: [
    /* @__PURE__ */ Yt.jsx("thead", { children: /* @__PURE__ */ Yt.jsxs("tr", { children: [
      /* @__PURE__ */ Yt.jsx("th", { children: "Cena (za 1 g)" }),
      /* @__PURE__ */ Yt.jsx("th", { children: "Apteka" }),
      /* @__PURE__ */ Yt.jsx("th", { children: "Adres" }),
      /* @__PURE__ */ Yt.jsx("th", { children: "Mapa" })
    /* @__PURE__ */ Yt.jsx("tbody", { children: u.map((a, o) => /* @__PURE__ */ Yt.jsxs("tr", { children: [
      /* @__PURE__ */ Yt.jsxs("td", { children: [
        (a.price_per_g ?? a.price).toFixed(2),
      /* @__PURE__ */ Yt.jsx("td", { children: a.pharmacy ?? "–" }),
      /* @__PURE__ */ Yt.jsx("td", { children: a.address ?? "–" }),
      /* @__PURE__ */ Yt.jsx("td", { children: a.map_url ? /* @__PURE__ */ Yt.jsx("a", { href: a.map_url, target: "_blank", className: "btn btn-sm btn-outline-light", children: "Mapa" }) : "–" })
    ] }, o)) })
function KO({ total: u, limit: a, offset: o, onChange: s }) {
  const f = Math.ceil(u / a), m = Math.floor(o / a) + 1;
  return f <= 1 ? null : /* @__PURE__ */ Yt.jsx("div", { className: "my-3", id: "pagination", children: Array.from({ length: f }, (y, b) => b + 1).map((y) => /* @__PURE__ */ Yt.jsx(
      disabled: y === m,
      onClick: () => s((y - 1) * a),
      children: y
    y
function Xy(u) {
  return u + 0.5 | 0;
}
const $c = (u, a, o) => Math.max(Math.min(u, o), a);
function zy(u) {
  return $c(Xy(u * 2.55), 0, 255);
}
function Jc(u) {
  return $c(Xy(u * 255), 0, 255);
}
function As(u) {
  return $c(Xy(u / 2.55) / 100, 0, 1);
}
function W_(u) {
  return $c(Xy(u * 100), 0, 100);
}
const ki = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, lS = [..."0123456789ABCDEF"], $O = (u) => lS[u & 15], JO = (u) => lS[(u & 240) >> 4] + lS[u & 15], Qb = (u) => (u & 240) >> 4 === (u & 15), WO = (u) => Qb(u.r) && Qb(u.g) && Qb(u.b) && Qb(u.a);
function FO(u) {
  var a = u.length, o;
  return u[0] === "#" && (a === 4 || a === 5 ? o = {
    r: 255 & ki[u[1]] * 17,
    g: 255 & ki[u[2]] * 17,
    b: 255 & ki[u[3]] * 17,
    a: a === 5 ? ki[u[4]] * 17 : 255
  } : (a === 7 || a === 9) && (o = {
    r: ki[u[1]] << 4 | ki[u[2]],
    g: ki[u[3]] << 4 | ki[u[4]],
    b: ki[u[5]] << 4 | ki[u[6]],
    a: a === 9 ? ki[u[7]] << 4 | ki[u[8]] : 255
  })), o;
}
const PO = (u, a) => u < 255 ? a(u) : "";
function IO(u) {
  var a = WO(u) ? $O : JO;
  return u ? "#" + a(u.r) + a(u.g) + a(u.b) + PO(u.a, a) : void 0;
}
const tM = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function v2(u, a, o) {
  const s = a * Math.min(o, 1 - o), f = (m, y = (m + u / 30) % 12) => o - s * Math.max(Math.min(y - 3, 9 - y, 1), -1);
  return [f(0), f(8), f(4)];
}
function eM(u, a, o) {
  const s = (f, m = (f + u / 60) % 6) => o - o * a * Math.max(Math.min(m, 4 - m, 1), 0);
  return [s(5), s(3), s(1)];
}
function nM(u, a, o) {
  const s = v2(u, 1, 0.5);
  let f;
  for (a + o > 1 && (f = 1 / (a + o), a *= f, o *= f), f = 0; f < 3; f++)
    s[f] *= 1 - a - o, s[f] += a;
  return s;
function aM(u, a, o, s, f) {
  return u === f ? (a - o) / s + (a < o ? 6 : 0) : a === f ? (o - u) / s + 2 : (u - a) / s + 4;
function pS(u) {
  const o = u.r / 255, s = u.g / 255, f = u.b / 255, m = Math.max(o, s, f), y = Math.min(o, s, f), b = (m + y) / 2;
  let S, _, E;
  return m !== y && (E = m - y, _ = b > 0.5 ? E / (2 - m - y) : E / (m + y), S = aM(o, s, f, E, m), S = S * 60 + 0.5), [S | 0, _ || 0, b];
function yS(u, a, o, s) {
  return (Array.isArray(a) ? u(a[0], a[1], a[2]) : u(a, o, s)).map(Jc);
function bS(u, a, o) {
  return yS(v2, u, a, o);
function lM(u, a, o) {
  return yS(nM, u, a, o);
function iM(u, a, o) {
  return yS(eM, u, a, o);
function S2(u) {
  return (u % 360 + 360) % 360;
function oM(u) {
  const a = tM.exec(u);
  let o = 255, s;
  if (!a)
  a[5] !== s && (o = a[6] ? zy(+a[5]) : Jc(+a[5]));
  const f = S2(+a[2]), m = +a[3] / 100, y = +a[4] / 100;
  return a[1] === "hwb" ? s = lM(f, m, y) : a[1] === "hsv" ? s = iM(f, m, y) : s = bS(f, m, y), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: o
function uM(u, a) {
  var o = pS(u);
  o[0] = S2(o[0] + a), o = bS(o), u.r = o[0], u.g = o[1], u.b = o[2];
function sM(u) {
  if (!u)
  const a = pS(u), o = a[0], s = W_(a[1]), f = W_(a[2]);
  return u.a < 255 ? `hsla(${o}, ${s}%, ${f}%, ${As(u.a)})` : `hsl(${o}, ${s}%, ${f}%)`;
const F_ = {
}, P_ = {
function cM() {
  const u = {}, a = Object.keys(P_), o = Object.keys(F_);
  let s, f, m, y, b;
  for (s = 0; s < a.length; s++) {
    for (y = b = a[s], f = 0; f < o.length; f++)
      m = o[f], b = b.replace(m, F_[m]);
    m = parseInt(P_[y], 16), u[b] = [m >> 16 & 255, m >> 8 & 255, m & 255];
  return u;
let Zb;
function rM(u) {
  Zb || (Zb = cM(), Zb.transparent = [0, 0, 0, 0]);
  const a = Zb[u.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
const fM = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function dM(u) {
  const a = fM.exec(u);
  let o = 255, s, f, m;
  if (a) {
    if (a[7] !== s) {
      const y = +a[7];
      o = a[8] ? zy(y) : $c(y * 255, 0, 255);
    }
    return s = +a[1], f = +a[3], m = +a[5], s = 255 & (a[2] ? zy(s) : $c(s, 0, 255)), f = 255 & (a[4] ? zy(f) : $c(f, 0, 255)), m = 255 & (a[6] ? zy(m) : $c(m, 0, 255)), {
      r: s,
      g: f,
      b: m,
      a: o
function hM(u) {
  return u && (u.a < 255 ? `rgba(${u.r}, ${u.g}, ${u.b}, ${As(u.a)})` : `rgb(${u.r}, ${u.g}, ${u.b})`);
const X1 = (u) => u <= 31308e-7 ? u * 12.92 : Math.pow(u, 1 / 2.4) * 1.055 - 0.055, _m = (u) => u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
function mM(u, a, o) {
  const s = _m(As(u.r)), f = _m(As(u.g)), m = _m(As(u.b));
    r: Jc(X1(s + o * (_m(As(a.r)) - s))),
    g: Jc(X1(f + o * (_m(As(a.g)) - f))),
    b: Jc(X1(m + o * (_m(As(a.b)) - m))),
    a: u.a + o * (a.a - u.a)
function Kb(u, a, o) {
  if (u) {
    let s = pS(u);
    s[a] = Math.max(0, Math.min(s[a] + s[a] * o, a === 0 ? 360 : 1)), s = bS(s), u.r = s[0], u.g = s[1], u.b = s[2];
function T2(u, a) {
  return u && Object.assign(a || {}, u);
function I_(u) {
  var a = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(u) ? u.length >= 3 && (a = { r: u[0], g: u[1], b: u[2], a: 255 }, u.length > 3 && (a.a = Jc(u[3]))) : (a = T2(u, { r: 0, g: 0, b: 0, a: 1 }), a.a = Jc(a.a)), a;
function gM(u) {
  return u.charAt(0) === "r" ? dM(u) : oM(u);
class Yy {
  constructor(a) {
    if (a instanceof Yy)
      return a;
    const o = typeof a;
    let s;
    o === "object" ? s = I_(a) : o === "string" && (s = FO(a) || rM(a) || gM(a)), this._rgb = s, this._valid = !!s;
    var a = T2(this._rgb);
    return a && (a.a = As(a.a)), a;
  set rgb(a) {
    this._rgb = I_(a);
    return this._valid ? hM(this._rgb) : void 0;
    return this._valid ? IO(this._rgb) : void 0;
    return this._valid ? sM(this._rgb) : void 0;
  mix(a, o) {
    if (a) {
      const s = this.rgb, f = a.rgb;
      let m;
      const y = o === m ? 0.5 : o, b = 2 * y - 1, S = s.a - f.a, _ = ((b * S === -1 ? b : (b + S) / (1 + b * S)) + 1) / 2;
      m = 1 - _, s.r = 255 & _ * s.r + m * f.r + 0.5, s.g = 255 & _ * s.g + m * f.g + 0.5, s.b = 255 & _ * s.b + m * f.b + 0.5, s.a = y * s.a + (1 - y) * f.a, this.rgb = s;
  interpolate(a, o) {
    return a && (this._rgb = mM(this._rgb, a._rgb, o)), this;
    return new Yy(this.rgb);
  alpha(a) {
    return this._rgb.a = Jc(a), this;
  clearer(a) {
    const o = this._rgb;
    return o.a *= 1 - a, this;
    const a = this._rgb, o = Xy(a.r * 0.3 + a.g * 0.59 + a.b * 0.11);
    return a.r = a.g = a.b = o, this;
  opaquer(a) {
    const o = this._rgb;
    return o.a *= 1 + a, this;
    const a = this._rgb;
    return a.r = 255 - a.r, a.g = 255 - a.g, a.b = 255 - a.b, this;
  lighten(a) {
    return Kb(this._rgb, 2, a), this;
  darken(a) {
    return Kb(this._rgb, 2, -a), this;
  saturate(a) {
    return Kb(this._rgb, 1, a), this;
  desaturate(a) {
    return Kb(this._rgb, 1, -a), this;
  rotate(a) {
    return uM(this._rgb, a), this;
function Os() {
const pM = /* @__PURE__ */ (() => {
  let u = 0;
  return () => u++;
function Fe(u) {
  return u == null;
function ua(u) {
  if (Array.isArray && Array.isArray(u))
  const a = Object.prototype.toString.call(u);
  return a.slice(0, 7) === "[object" && a.slice(-6) === "Array]";
}
function Oe(u) {
  return u !== null && Object.prototype.toString.call(u) === "[object Object]";
}
function Ya(u) {
  return (typeof u == "number" || u instanceof Number) && isFinite(+u);
}
function ru(u, a) {
  return Ya(u) ? u : a;
}
function Ve(u, a) {
  return typeof u > "u" ? a : u;
}
const yM = (u, a) => typeof u == "string" && u.endsWith("%") ? parseFloat(u) / 100 * a : +u;
function On(u, a, o) {
  if (u && typeof u.call == "function")
    return u.apply(o, a);
}
function Be(u, a, o, s) {
  let f, m, y;
  if (ua(u))
    for (m = u.length, f = 0; f < m; f++)
      a.call(o, u[f], f);
  else if (Oe(u))
    for (y = Object.keys(u), m = y.length, f = 0; f < m; f++)
      a.call(o, u[y[f]], y[f]);
}
function rv(u, a) {
  let o, s, f, m;
  if (!u || !a || u.length !== a.length)
  for (o = 0, s = u.length; o < s; ++o)
    if (f = u[o], m = a[o], f.datasetIndex !== m.datasetIndex || f.index !== m.index)
function fv(u) {
  if (ua(u))
    return u.map(fv);
  if (Oe(u)) {
    const a = /* @__PURE__ */ Object.create(null), o = Object.keys(u), s = o.length;
    let f = 0;
    for (; f < s; ++f)
      a[o[f]] = fv(u[o[f]]);
    return a;
  return u;
function _2(u) {
  ].indexOf(u) === -1;
function bM(u, a, o, s) {
  if (!_2(u))
  const f = a[u], m = o[u];
  Oe(f) && Oe(m) ? jy(f, m, s) : a[u] = fv(m);
}
function jy(u, a, o) {
  const s = ua(a) ? a : [
    a
  ], f = s.length;
  if (!Oe(u))
    return u;
  o = o || {};
  const m = o.merger || bM;
  let y;
  for (let b = 0; b < f; ++b) {
    if (y = s[b], !Oe(y))
    const S = Object.keys(y);
    for (let _ = 0, E = S.length; _ < E; ++_)
      m(S[_], u, y, o);
  return u;
function Uy(u, a) {
  return jy(u, a, {
    merger: vM
function vM(u, a, o) {
  if (!_2(u))
  const s = a[u], f = o[u];
  Oe(s) && Oe(f) ? Uy(s, f) : Object.prototype.hasOwnProperty.call(a, u) || (a[u] = fv(f));
const tx = {
  "": (u) => u,
  x: (u) => u.x,
  y: (u) => u.y
function SM(u) {
  const a = u.split("."), o = [];
  let s = "";
  for (const f of a)
    s += f, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (o.push(s), s = "");
  return o;
}
function TM(u) {
  const a = SM(u);
  return (o) => {
    for (const s of a) {
      if (s === "")
      o = o && o[s];
    return o;
function dv(u, a) {
  return (tx[a] || (tx[a] = TM(a)))(u);
function vS(u) {
  return u.charAt(0).toUpperCase() + u.slice(1);
const hv = (u) => typeof u < "u", Wc = (u) => typeof u == "function", ex = (u, a) => {
  if (u.size !== a.size)
  for (const o of u)
    if (!a.has(o))
function _M(u) {
  return u.type === "mouseup" || u.type === "click" || u.type === "contextmenu";
const La = Math.PI, yu = 2 * La, xM = yu + La, mv = Number.POSITIVE_INFINITY, EM = La / 180, yo = La / 2, Yf = La / 4, nx = La * 2 / 3, x2 = Math.log10, Em = Math.sign;
function Ny(u, a, o) {
  return Math.abs(u - a) < o;
function ax(u) {
  const a = Math.round(u);
  u = Ny(u, a, u / 1e3) ? a : u;
  const o = Math.pow(10, Math.floor(x2(u))), s = u / o;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * o;
function OM(u) {
  const a = [], o = Math.sqrt(u);
  let s;
  for (s = 1; s < o; s++)
    u % s === 0 && (a.push(s), a.push(u / s));
  return o === (o | 0) && a.push(o), a.sort((f, m) => f - m).pop(), a;
function MM(u) {
  return typeof u == "symbol" || typeof u == "object" && u !== null && !(Symbol.toPrimitive in u || "toString" in u || "valueOf" in u);
function qy(u) {
  return !MM(u) && !isNaN(parseFloat(u)) && isFinite(u);
function DM(u, a) {
  const o = Math.round(u);
  return o - a <= u && o + a >= u;
function AM(u, a, o) {
  let s, f, m;
  for (s = 0, f = u.length; s < f; s++)
    m = u[s][o], isNaN(m) || (a.min = Math.min(a.min, m), a.max = Math.max(a.max, m));
function Qf(u) {
  return u * (La / 180);
function RM(u) {
  return u * (180 / La);
function lx(u) {
  if (!Ya(u))
  let a = 1, o = 0;
  for (; Math.round(u * a) / a !== u; )
    a *= 10, o++;
  return o;
}
function wM(u, a) {
  const o = a.x - u.x, s = a.y - u.y, f = Math.sqrt(o * o + s * s);
  let m = Math.atan2(s, o);
  return m < -0.5 * La && (m += yu), {
    angle: m,
    distance: f
function iS(u, a) {
  return Math.sqrt(Math.pow(a.x - u.x, 2) + Math.pow(a.y - u.y, 2));
function zM(u, a) {
  return (u - a + xM) % yu - La;
function hu(u) {
  return (u % yu + yu) % yu;
function E2(u, a, o, s) {
  const f = hu(u), m = hu(a), y = hu(o), b = hu(m - f), S = hu(y - f), _ = hu(f - m), E = hu(f - y);
  return f === m || f === y || s && m === y || b > S && _ < E;
function bo(u, a, o) {
  return Math.max(a, Math.min(o, u));
function CM(u) {
  return bo(u, -32768, 32767);
function O2(u, a, o, s = 1e-6) {
  return u >= Math.min(a, o) - s && u <= Math.max(a, o) + s;
function SS(u, a, o) {
  o = o || ((y) => u[y] < a);
  let s = u.length - 1, f = 0, m;
  for (; s - f > 1; )
    m = f + s >> 1, o(m) ? f = m : s = m;
    lo: f,
    hi: s
const Zf = (u, a, o, s) => SS(u, o, s ? (f) => {
  const m = u[f][a];
  return m < o || m === o && u[f + 1][a] === o;
} : (f) => u[f][a] < o), HM = (u, a, o) => SS(u, o, (s) => u[s][a] >= o);
function UM(u, a, o) {
  let s = 0, f = u.length;
  for (; s < f && u[s] < a; )
    s++;
  for (; f > s && u[f - 1] > o; )
    f--;
  return s > 0 || f < u.length ? u.slice(s, f) : u;
}
const M2 = [
function NM(u, a) {
  if (u._chartjs) {
    u._chartjs.listeners.push(a);
  Object.defineProperty(u, "_chartjs", {
        a
  }), M2.forEach((o) => {
    const s = "_onData" + vS(o), f = u[o];
    Object.defineProperty(u, o, {
      value(...m) {
        const y = f.apply(this, m);
        return u._chartjs.listeners.forEach((b) => {
          typeof b[s] == "function" && b[s](...m);
        }), y;
function ix(u, a) {
  const o = u._chartjs;
  if (!o)
  const s = o.listeners, f = s.indexOf(a);
  f !== -1 && s.splice(f, 1), !(s.length > 0) && (M2.forEach((m) => {
    delete u[m];
  }), delete u._chartjs);
}
function kM(u) {
  const a = new Set(u);
  return a.size === u.length ? u : Array.from(a);
}
const D2 = function() {
  return typeof window > "u" ? function(u) {
    return u();
function A2(u, a) {
  let o = [], s = !1;
  return function(...f) {
    o = f, s || (s = !0, D2.call(window, () => {
      s = !1, u.apply(a, o);
function BM(u, a) {
  let o;
  return function(...s) {
    return a ? (clearTimeout(o), o = setTimeout(u, a, s)) : u.apply(this, s), a;
const LM = (u) => u === "start" ? "left" : u === "end" ? "right" : "center", ox = (u, a, o) => u === "start" ? a : u === "end" ? o : (a + o) / 2;
function YM(u, a, o) {
  const s = a.length;
  let f = 0, m = s;
  if (u._sorted) {
    const { iScale: y, vScale: b, _parsed: S } = u, _ = u.dataset && u.dataset.options ? u.dataset.options.spanGaps : null, E = y.axis, { min: D, max: M, minDefined: H, maxDefined: q } = y.getUserBounds();
    if (H) {
      if (f = Math.min(
        Zf(S, E, D).lo,
        o ? s : Zf(a, E, y.getPixelForValue(D)).lo
      ), _) {
        const V = S.slice(0, f + 1).reverse().findIndex((B) => !Fe(B[b.axis]));
        f -= Math.max(0, V);
      f = bo(f, 0, s - 1);
    if (q) {
      let V = Math.max(
        Zf(S, y.axis, M, !0).hi + 1,
        o ? 0 : Zf(a, E, y.getPixelForValue(M), !0).hi + 1
      if (_) {
        const B = S.slice(V - 1).findIndex((Q) => !Fe(Q[b.axis]));
        V += Math.max(0, B);
      m = bo(V, f, s) - f;
      m = s - f;
    start: f,
    count: m
function jM(u) {
  const { xScale: a, yScale: o, _scaleRanges: s } = u, f = {
    xmin: a.min,
    xmax: a.max,
    ymin: o.min,
    ymax: o.max
  if (!s)
    return u._scaleRanges = f, !0;
  const m = s.xmin !== a.min || s.xmax !== a.max || s.ymin !== o.min || s.ymax !== o.max;
  return Object.assign(s, f), m;
}
const $b = (u) => u === 0 || u === 1, ux = (u, a, o) => -(Math.pow(2, 10 * (u -= 1)) * Math.sin((u - a) * yu / o)), sx = (u, a, o) => Math.pow(2, -10 * u) * Math.sin((u - a) * yu / o) + 1, ky = {
  linear: (u) => u,
  easeInQuad: (u) => u * u,
  easeOutQuad: (u) => -u * (u - 2),
  easeInOutQuad: (u) => (u /= 0.5) < 1 ? 0.5 * u * u : -0.5 * (--u * (u - 2) - 1),
  easeInCubic: (u) => u * u * u,
  easeOutCubic: (u) => (u -= 1) * u * u + 1,
  easeInOutCubic: (u) => (u /= 0.5) < 1 ? 0.5 * u * u * u : 0.5 * ((u -= 2) * u * u + 2),
  easeInQuart: (u) => u * u * u * u,
  easeOutQuart: (u) => -((u -= 1) * u * u * u - 1),
  easeInOutQuart: (u) => (u /= 0.5) < 1 ? 0.5 * u * u * u * u : -0.5 * ((u -= 2) * u * u * u - 2),
  easeInQuint: (u) => u * u * u * u * u,
  easeOutQuint: (u) => (u -= 1) * u * u * u * u + 1,
  easeInOutQuint: (u) => (u /= 0.5) < 1 ? 0.5 * u * u * u * u * u : 0.5 * ((u -= 2) * u * u * u * u + 2),
  easeInSine: (u) => -Math.cos(u * yo) + 1,
  easeOutSine: (u) => Math.sin(u * yo),
  easeInOutSine: (u) => -0.5 * (Math.cos(La * u) - 1),
  easeInExpo: (u) => u === 0 ? 0 : Math.pow(2, 10 * (u - 1)),
  easeOutExpo: (u) => u === 1 ? 1 : -Math.pow(2, -10 * u) + 1,
  easeInOutExpo: (u) => $b(u) ? u : u < 0.5 ? 0.5 * Math.pow(2, 10 * (u * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (u * 2 - 1)) + 2),
  easeInCirc: (u) => u >= 1 ? u : -(Math.sqrt(1 - u * u) - 1),
  easeOutCirc: (u) => Math.sqrt(1 - (u -= 1) * u),
  easeInOutCirc: (u) => (u /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - u * u) - 1) : 0.5 * (Math.sqrt(1 - (u -= 2) * u) + 1),
  easeInElastic: (u) => $b(u) ? u : ux(u, 0.075, 0.3),
  easeOutElastic: (u) => $b(u) ? u : sx(u, 0.075, 0.3),
  easeInOutElastic(u) {
    return $b(u) ? u : u < 0.5 ? 0.5 * ux(u * 2, 0.1125, 0.45) : 0.5 + 0.5 * sx(u * 2 - 1, 0.1125, 0.45);
  easeInBack(u) {
    return u * u * ((1.70158 + 1) * u - 1.70158);
  easeOutBack(u) {
    return (u -= 1) * u * ((1.70158 + 1) * u + 1.70158) + 1;
  easeInOutBack(u) {
    let a = 1.70158;
    return (u /= 0.5) < 1 ? 0.5 * (u * u * (((a *= 1.525) + 1) * u - a)) : 0.5 * ((u -= 2) * u * (((a *= 1.525) + 1) * u + a) + 2);
  easeInBounce: (u) => 1 - ky.easeOutBounce(1 - u),
  easeOutBounce(u) {
    return u < 1 / 2.75 ? 7.5625 * u * u : u < 2 / 2.75 ? 7.5625 * (u -= 1.5 / 2.75) * u + 0.75 : u < 2.5 / 2.75 ? 7.5625 * (u -= 2.25 / 2.75) * u + 0.9375 : 7.5625 * (u -= 2.625 / 2.75) * u + 0.984375;
  easeInOutBounce: (u) => u < 0.5 ? ky.easeInBounce(u * 2) * 0.5 : ky.easeOutBounce(u * 2 - 1) * 0.5 + 0.5
function TS(u) {
  if (u && typeof u == "object") {
    const a = u.toString();
    return a === "[object CanvasPattern]" || a === "[object CanvasGradient]";
function cx(u) {
  return TS(u) ? u : new Yy(u);
function Q1(u) {
  return TS(u) ? u : new Yy(u).saturate(0.5).darken(0.1).hexString();
const qM = [
], VM = [
function GM(u) {
  u.set("animation", {
  }), u.describe("animation", {
    _scriptable: (a) => a !== "onProgress" && a !== "onComplete" && a !== "fn"
  }), u.set("animations", {
      properties: VM
      properties: qM
  }), u.describe("animations", {
  }), u.set("transitions", {
          fn: (a) => a | 0
function XM(u) {
  u.set("layout", {
const rx = /* @__PURE__ */ new Map();
function QM(u, a) {
  a = a || {};
  const o = u + JSON.stringify(a);
  let s = rx.get(o);
  return s || (s = new Intl.NumberFormat(u, a), rx.set(o, s)), s;
function R2(u, a, o) {
  return QM(a, o).format(u);
const ZM = {
  values(u) {
    return ua(u) ? u : "" + u;
  numeric(u, a, o) {
    if (u === 0)
    const s = this.chart.options.locale;
    let f, m = u;
    if (o.length > 1) {
      const _ = Math.max(Math.abs(o[0].value), Math.abs(o[o.length - 1].value));
      (_ < 1e-4 || _ > 1e15) && (f = "scientific"), m = KM(u, o);
    }
    const y = x2(Math.abs(m)), b = isNaN(y) ? 1 : Math.max(Math.min(-1 * Math.floor(y), 20), 0), S = {
      notation: f,
      minimumFractionDigits: b,
      maximumFractionDigits: b
    return Object.assign(S, this.options.ticks.format), R2(u, s, S);
function KM(u, a) {
  let o = a.length > 3 ? a[2].value - a[1].value : a[1].value - a[0].value;
  return Math.abs(o) >= 1 && u !== Math.floor(u) && (o = u - Math.floor(u)), o;
var w2 = {
  formatters: ZM
function $M(u) {
  u.set("scale", {
      tickWidth: (a, o) => o.lineWidth,
      tickColor: (a, o) => o.color,
      callback: w2.formatters.values,
  }), u.route("scale.ticks", "color", "", "color"), u.route("scale.grid", "color", "", "borderColor"), u.route("scale.border", "color", "", "borderColor"), u.route("scale.title", "color", "", "color"), u.describe("scale", {
    _scriptable: (a) => !a.startsWith("before") && !a.startsWith("after") && a !== "callback" && a !== "parser",
    _indexable: (a) => a !== "borderDash" && a !== "tickBorderDash" && a !== "dash"
  }), u.describe("scales", {
  }), u.describe("scale.ticks", {
    _scriptable: (a) => a !== "backdropPadding" && a !== "callback",
    _indexable: (a) => a !== "backdropPadding"
const $f = /* @__PURE__ */ Object.create(null), oS = /* @__PURE__ */ Object.create(null);
function By(u, a) {
  if (!a)
    return u;
  const o = a.split(".");
  for (let s = 0, f = o.length; s < f; ++s) {
    const m = o[s];
    u = u[m] || (u[m] = /* @__PURE__ */ Object.create(null));
  return u;
function Z1(u, a, o) {
  return typeof a == "string" ? jy(By(u, a), o) : jy(By(u, ""), a);
class JM {
  constructor(a, o) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
    }, this.hover = {}, this.hoverBackgroundColor = (s, f) => Q1(f.backgroundColor), this.hoverBorderColor = (s, f) => Q1(f.borderColor), this.hoverColor = (s, f) => Q1(f.color), this.indexAxis = "x", this.interaction = {
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(a), this.apply(o);
  set(a, o) {
    return Z1(this, a, o);
  get(a) {
    return By(this, a);
  describe(a, o) {
    return Z1(oS, a, o);
  override(a, o) {
    return Z1($f, a, o);
  route(a, o, s, f) {
    const m = By(this, a), y = By(this, s), b = "_" + o;
    Object.defineProperties(m, {
      [b]: {
        value: m[o],
      [o]: {
          const S = this[b], _ = y[f];
          return Oe(S) ? Object.assign({}, _, S) : Ve(S, _);
        set(S) {
          this[b] = S;
  apply(a) {
    a.forEach((o) => o(this));
var Bn = /* @__PURE__ */ new JM({
  _scriptable: (u) => !u.startsWith("on"),
  _indexable: (u) => u !== "events",
  GM,
  XM,
  $M
function WM(u) {
  return !u || Fe(u.size) || Fe(u.family) ? null : (u.style ? u.style + " " : "") + (u.weight ? u.weight + " " : "") + u.size + "px " + u.family;
function fx(u, a, o, s, f) {
  let m = a[f];
  return m || (m = a[f] = u.measureText(f).width, o.push(f)), m > s && (s = m), s;
function jf(u, a, o) {
  const s = u.currentDevicePixelRatio, f = o !== 0 ? Math.max(o / 2, 0.5) : 0;
  return Math.round((a - f) * s) / s + f;
function dx(u, a) {
  !a && !u || (a = a || u.getContext("2d"), a.save(), a.resetTransform(), a.clearRect(0, 0, u.width, u.height), a.restore());
function uS(u, a, o, s) {
  FM(u, a, o, s);
function FM(u, a, o, s, f) {
  let m, y, b, S, _, E, D, M;
  const H = a.pointStyle, q = a.rotation, V = a.radius;
  let B = (q || 0) * EM;
  if (H && typeof H == "object" && (m = H.toString(), m === "[object HTMLImageElement]" || m === "[object HTMLCanvasElement]")) {
    u.save(), u.translate(o, s), u.rotate(B), u.drawImage(H, -H.width / 2, -H.height / 2, H.width, H.height), u.restore();
  if (!(isNaN(V) || V <= 0)) {
    switch (u.beginPath(), H) {
        u.arc(o, s, V, 0, yu), u.closePath();
        E = V, u.moveTo(o + Math.sin(B) * E, s - Math.cos(B) * V), B += nx, u.lineTo(o + Math.sin(B) * E, s - Math.cos(B) * V), B += nx, u.lineTo(o + Math.sin(B) * E, s - Math.cos(B) * V), u.closePath();
        _ = V * 0.516, S = V - _, y = Math.cos(B + Yf) * S, D = Math.cos(B + Yf) * S, b = Math.sin(B + Yf) * S, M = Math.sin(B + Yf) * S, u.arc(o - D, s - b, _, B - La, B - yo), u.arc(o + M, s - y, _, B - yo, B), u.arc(o + D, s + b, _, B, B + yo), u.arc(o - M, s + y, _, B + yo, B + La), u.closePath();
        if (!q) {
          S = Math.SQRT1_2 * V, E = S, u.rect(o - E, s - S, 2 * E, 2 * S);
        B += Yf;
        D = Math.cos(B) * V, y = Math.cos(B) * V, b = Math.sin(B) * V, M = Math.sin(B) * V, u.moveTo(o - D, s - b), u.lineTo(o + M, s - y), u.lineTo(o + D, s + b), u.lineTo(o - M, s + y), u.closePath();
        B += Yf;
        D = Math.cos(B) * V, y = Math.cos(B) * V, b = Math.sin(B) * V, M = Math.sin(B) * V, u.moveTo(o - D, s - b), u.lineTo(o + D, s + b), u.moveTo(o + M, s - y), u.lineTo(o - M, s + y);
        D = Math.cos(B) * V, y = Math.cos(B) * V, b = Math.sin(B) * V, M = Math.sin(B) * V, u.moveTo(o - D, s - b), u.lineTo(o + D, s + b), u.moveTo(o + M, s - y), u.lineTo(o - M, s + y), B += Yf, D = Math.cos(B) * V, y = Math.cos(B) * V, b = Math.sin(B) * V, M = Math.sin(B) * V, u.moveTo(o - D, s - b), u.lineTo(o + D, s + b), u.moveTo(o + M, s - y), u.lineTo(o - M, s + y);
        y = Math.cos(B) * V, b = Math.sin(B) * V, u.moveTo(o - y, s - b), u.lineTo(o + y, s + b);
        u.moveTo(o, s), u.lineTo(o + Math.cos(B) * V, s + Math.sin(B) * V);
        u.closePath();
    u.fill(), a.borderWidth > 0 && u.stroke();
function Vy(u, a, o) {
  return o = o || 0.5, !a || u && u.x > a.left - o && u.x < a.right + o && u.y > a.top - o && u.y < a.bottom + o;
function _S(u, a) {
  u.save(), u.beginPath(), u.rect(a.left, a.top, a.right - a.left, a.bottom - a.top), u.clip();
function xS(u) {
  u.restore();
function PM(u, a, o, s, f) {
  if (!a)
    return u.lineTo(o.x, o.y);
  if (f === "middle") {
    const m = (a.x + o.x) / 2;
    u.lineTo(m, a.y), u.lineTo(m, o.y);
  } else f === "after" != !!s ? u.lineTo(a.x, o.y) : u.lineTo(o.x, a.y);
  u.lineTo(o.x, o.y);
function IM(u, a, o, s) {
  if (!a)
    return u.lineTo(o.x, o.y);
  u.bezierCurveTo(s ? a.cp1x : a.cp2x, s ? a.cp1y : a.cp2y, s ? o.cp2x : o.cp1x, s ? o.cp2y : o.cp1y, o.x, o.y);
function tD(u, a) {
  a.translation && u.translate(a.translation[0], a.translation[1]), Fe(a.rotation) || u.rotate(a.rotation), a.color && (u.fillStyle = a.color), a.textAlign && (u.textAlign = a.textAlign), a.textBaseline && (u.textBaseline = a.textBaseline);
function eD(u, a, o, s, f) {
  if (f.strikethrough || f.underline) {
    const m = u.measureText(s), y = a - m.actualBoundingBoxLeft, b = a + m.actualBoundingBoxRight, S = o - m.actualBoundingBoxAscent, _ = o + m.actualBoundingBoxDescent, E = f.strikethrough ? (S + _) / 2 : _;
    u.strokeStyle = u.fillStyle, u.beginPath(), u.lineWidth = f.decorationWidth || 2, u.moveTo(y, E), u.lineTo(b, E), u.stroke();
function nD(u, a) {
  const o = u.fillStyle;
  u.fillStyle = a.color, u.fillRect(a.left, a.top, a.width, a.height), u.fillStyle = o;
function hx(u, a, o, s, f, m = {}) {
  const y = ua(a) ? a : [
    a
  ], b = m.strokeWidth > 0 && m.strokeColor !== "";
  let S, _;
  for (u.save(), u.font = f.string, tD(u, m), S = 0; S < y.length; ++S)
    _ = y[S], m.backdrop && nD(u, m.backdrop), b && (m.strokeColor && (u.strokeStyle = m.strokeColor), Fe(m.strokeWidth) || (u.lineWidth = m.strokeWidth), u.strokeText(_, o, s, m.maxWidth)), u.fillText(_, o, s, m.maxWidth), eD(u, o, s, _, m), s += Number(f.lineHeight);
  u.restore();
function mx(u, a) {
  const { x: o, y: s, w: f, h: m, radius: y } = a;
  u.arc(o + y.topLeft, s + y.topLeft, y.topLeft, 1.5 * La, La, !0), u.lineTo(o, s + m - y.bottomLeft), u.arc(o + y.bottomLeft, s + m - y.bottomLeft, y.bottomLeft, La, yo, !0), u.lineTo(o + f - y.bottomRight, s + m), u.arc(o + f - y.bottomRight, s + m - y.bottomRight, y.bottomRight, yo, 0, !0), u.lineTo(o + f, s + y.topRight), u.arc(o + f - y.topRight, s + y.topRight, y.topRight, 0, -yo, !0), u.lineTo(o + y.topLeft, s);
const aD = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, lD = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function iD(u, a) {
  const o = ("" + u).match(aD);
  if (!o || o[1] === "normal")
    return a * 1.2;
  switch (u = +o[2], o[3]) {
      return u;
      u /= 100;
  return a * u;
const oD = (u) => +u || 0;
function z2(u, a) {
  const o = {}, s = Oe(a), f = s ? Object.keys(a) : a, m = Oe(u) ? s ? (y) => Ve(u[y], u[a[y]]) : (y) => u[y] : () => u;
  for (const y of f)
    o[y] = oD(m(y));
  return o;
function uD(u) {
  return z2(u, {
function uv(u) {
  return z2(u, [
function Fc(u) {
  const a = uD(u);
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
function pu(u, a) {
  u = u || {}, a = a || Bn.font;
  let o = Ve(u.size, a.size);
  typeof o == "string" && (o = parseInt(o, 10));
  let s = Ve(u.style, a.style);
  s && !("" + s).match(lD) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const f = {
    family: Ve(u.family, a.family),
    lineHeight: iD(Ve(u.lineHeight, a.lineHeight), o),
    size: o,
    style: s,
    weight: Ve(u.weight, a.weight),
  return f.string = WM(f), f;
function Jb(u, a, o, s) {
  let f, m, y;
  for (f = 0, m = u.length; f < m; ++f)
    if (y = u[f], y !== void 0 && y !== void 0)
      return y;
function sD(u, a, o) {
  const { min: s, max: f } = u, m = yM(a, (f - s) / 2), y = (b, S) => o && b === 0 ? 0 : b + S;
    min: y(s, -Math.abs(m)),
    max: y(f, m)
function Jf(u, a) {
  return Object.assign(Object.create(u), a);
function ES(u, a = [
], o, s, f = () => u[0]) {
  const m = o || u;
  typeof s > "u" && (s = N2("_fallback", u));
  const y = {
    _scopes: u,
    _rootScopes: m,
    _fallback: s,
    _getTarget: f,
    override: (b) => ES([
      b,
      ...u
    ], a, m, s)
  return new Proxy(y, {
    deleteProperty(b, S) {
      return delete b[S], delete b._keys, delete u[0][S], !0;
    get(b, S) {
      return H2(b, S, () => pD(S, a, u, b));
    getOwnPropertyDescriptor(b, S) {
      return Reflect.getOwnPropertyDescriptor(b._scopes[0], S);
      return Reflect.getPrototypeOf(u[0]);
    has(b, S) {
      return px(b).includes(S);
    ownKeys(b) {
      return px(b);
    set(b, S, _) {
      const E = b._storage || (b._storage = f());
      return b[S] = E[S] = _, delete b._keys, !0;
function Om(u, a, o, s) {
  const f = {
    _proxy: u,
    _context: a,
    _subProxy: o,
    _descriptors: C2(u, s),
    setContext: (m) => Om(u, m, o, s),
    override: (m) => Om(u.override(m), a, o, s)
  return new Proxy(f, {
    deleteProperty(m, y) {
      return delete m[y], delete u[y], !0;
    get(m, y, b) {
      return H2(m, y, () => rD(m, y, b));
    getOwnPropertyDescriptor(m, y) {
      return m._descriptors.allKeys ? Reflect.has(u, y) ? {
      } : void 0 : Reflect.getOwnPropertyDescriptor(u, y);
      return Reflect.getPrototypeOf(u);
    has(m, y) {
      return Reflect.has(u, y);
      return Reflect.ownKeys(u);
    set(m, y, b) {
      return u[y] = b, delete m[y], !0;
function C2(u, a = {
  const { _scriptable: o = a.scriptable, _indexable: s = a.indexable, _allKeys: f = a.allKeys } = u;
    allKeys: f,
    scriptable: o,
    indexable: s,
    isScriptable: Wc(o) ? o : () => o,
    isIndexable: Wc(s) ? s : () => s
const cD = (u, a) => u ? u + vS(a) : a, OS = (u, a) => Oe(a) && u !== "adapters" && (Object.getPrototypeOf(a) === null || a.constructor === Object);
function H2(u, a, o) {
  if (Object.prototype.hasOwnProperty.call(u, a) || a === "constructor")
    return u[a];
  const s = o();
  return u[a] = s, s;
}
function rD(u, a, o) {
  const { _proxy: s, _context: f, _subProxy: m, _descriptors: y } = u;
  let b = s[a];
  return Wc(b) && y.isScriptable(a) && (b = fD(a, b, u, o)), ua(b) && b.length && (b = dD(a, b, u, y.isIndexable)), OS(a, b) && (b = Om(b, f, m && m[a], y)), b;
}
function fD(u, a, o, s) {
  const { _proxy: f, _context: m, _subProxy: y, _stack: b } = o;
  if (b.has(u))
    throw new Error("Recursion detected: " + Array.from(b).join("->") + "->" + u);
  b.add(u);
  let S = a(m, y || s);
  return b.delete(u), OS(u, S) && (S = MS(f._scopes, f, u, S)), S;
}
function dD(u, a, o, s) {
  const { _proxy: f, _context: m, _subProxy: y, _descriptors: b } = o;
  if (typeof m.index < "u" && s(u))
    return a[m.index % a.length];
  if (Oe(a[0])) {
    const S = a, _ = f._scopes.filter((E) => E !== S);
    a = [];
    for (const E of S) {
      const D = MS(_, f, u, E);
      a.push(Om(D, m, y && y[u], b));
    }
  }
  return a;
}
function U2(u, a, o) {
  return Wc(u) ? u(a, o) : u;
}
const hD = (u, a) => u === !0 ? a : typeof u == "string" ? dv(a, u) : void 0;
function mD(u, a, o, s, f) {
  for (const m of a) {
    const y = hD(o, m);
    if (y) {
      u.add(y);
      const b = U2(y._fallback, o, f);
      if (typeof b < "u" && b !== o && b !== s)
        return b;
    } else if (y === !1 && typeof s < "u" && o !== s)
function MS(u, a, o, s) {
  const f = a._rootScopes, m = U2(a._fallback, o, s), y = [
    ...u,
    ...f
  ], b = /* @__PURE__ */ new Set();
  b.add(s);
  let S = gx(b, y, o, m || o, s);
  return S === null || typeof m < "u" && m !== o && (S = gx(b, y, m, S, s), S === null) ? !1 : ES(Array.from(b), [
  ], f, m, () => gD(a, o, s));
}
function gx(u, a, o, s, f) {
  for (; o; )
    o = mD(u, a, o, s, f);
  return o;
}
function gD(u, a, o) {
  const s = u._getTarget();
  a in s || (s[a] = {});
  const f = s[a];
  return ua(f) && Oe(o) ? o : f || {};
}
function pD(u, a, o, s) {
  let f;
  for (const m of a)
    if (f = N2(cD(m, u), o), typeof f < "u")
      return OS(u, f) ? MS(o, s, u, f) : f;
}
function N2(u, a) {
  for (const o of a) {
    if (!o)
    const s = o[u];
    if (typeof s < "u")
      return s;
function px(u) {
  let a = u._keys;
  return a || (a = u._keys = yD(u._scopes)), a;
function yD(u) {
  const a = /* @__PURE__ */ new Set();
  for (const o of u)
    for (const s of Object.keys(o).filter((f) => !f.startsWith("_")))
      a.add(s);
  return Array.from(a);
const bD = Number.EPSILON || 1e-14, Mm = (u, a) => a < u.length && !u[a].skip && u[a], k2 = (u) => u === "x" ? "y" : "x";
function vD(u, a, o, s) {
  const f = u.skip ? a : u, m = a, y = o.skip ? a : o, b = iS(m, f), S = iS(y, m);
  let _ = b / (b + S), E = S / (b + S);
  _ = isNaN(_) ? 0 : _, E = isNaN(E) ? 0 : E;
  const D = s * _, M = s * E;
      x: m.x - D * (y.x - f.x),
      y: m.y - D * (y.y - f.y)
      x: m.x + M * (y.x - f.x),
      y: m.y + M * (y.y - f.y)
function SD(u, a, o) {
  const s = u.length;
  let f, m, y, b, S, _ = Mm(u, 0);
  for (let E = 0; E < s - 1; ++E)
    if (S = _, _ = Mm(u, E + 1), !(!S || !_)) {
      if (Ny(a[E], 0, bD)) {
        o[E] = o[E + 1] = 0;
      f = o[E] / a[E], m = o[E + 1] / a[E], b = Math.pow(f, 2) + Math.pow(m, 2), !(b <= 9) && (y = 3 / Math.sqrt(b), o[E] = f * y * a[E], o[E + 1] = m * y * a[E]);
function TD(u, a, o = "x") {
  const s = k2(o), f = u.length;
  let m, y, b, S = Mm(u, 0);
  for (let _ = 0; _ < f; ++_) {
    if (y = b, b = S, S = Mm(u, _ + 1), !b)
    const E = b[o], D = b[s];
    y && (m = (E - y[o]) / 3, b[`cp1${o}`] = E - m, b[`cp1${s}`] = D - m * a[_]), S && (m = (S[o] - E) / 3, b[`cp2${o}`] = E + m, b[`cp2${s}`] = D + m * a[_]);
function _D(u, a = "x") {
  const o = k2(a), s = u.length, f = Array(s).fill(0), m = Array(s);
  let y, b, S, _ = Mm(u, 0);
  for (y = 0; y < s; ++y)
    if (b = S, S = _, _ = Mm(u, y + 1), !!S) {
      if (_) {
        const E = _[a] - S[a];
        f[y] = E !== 0 ? (_[o] - S[o]) / E : 0;
      m[y] = b ? _ ? Em(f[y - 1]) !== Em(f[y]) ? 0 : (f[y - 1] + f[y]) / 2 : f[y - 1] : f[y];
  SD(u, f, m), TD(u, m, a);
function Wb(u, a, o) {
  return Math.max(Math.min(u, o), a);
function xD(u, a) {
  let o, s, f, m, y, b = Vy(u[0], a);
  for (o = 0, s = u.length; o < s; ++o)
    y = m, m = b, b = o < s - 1 && Vy(u[o + 1], a), m && (f = u[o], y && (f.cp1x = Wb(f.cp1x, a.left, a.right), f.cp1y = Wb(f.cp1y, a.top, a.bottom)), b && (f.cp2x = Wb(f.cp2x, a.left, a.right), f.cp2y = Wb(f.cp2y, a.top, a.bottom)));
function ED(u, a, o, s, f) {
  let m, y, b, S;
  if (a.spanGaps && (u = u.filter((_) => !_.skip)), a.cubicInterpolationMode === "monotone")
    _D(u, f);
    let _ = s ? u[u.length - 1] : u[0];
    for (m = 0, y = u.length; m < y; ++m)
      b = u[m], S = vD(_, b, u[Math.min(m + 1, y - (s ? 0 : 1)) % y], a.tension), b.cp1x = S.previous.x, b.cp1y = S.previous.y, b.cp2x = S.next.x, b.cp2y = S.next.y, _ = b;
  a.capBezierPoints && xD(u, o);
function DS() {
function AS(u) {
  let a = u.parentNode;
  return a && a.toString() === "[object ShadowRoot]" && (a = a.host), a;
function gv(u, a, o) {
  let s;
  return typeof u == "string" ? (s = parseInt(u, 10), u.indexOf("%") !== -1 && (s = s / 100 * a.parentNode[o])) : s = u, s;
const vv = (u) => u.ownerDocument.defaultView.getComputedStyle(u, null);
function OD(u, a) {
  return vv(u).getPropertyValue(a);
const MD = [
function Kf(u, a, o) {
  const s = {};
  o = o ? "-" + o : "";
  for (let f = 0; f < 4; f++) {
    const m = MD[f];
    s[m] = parseFloat(u[a + "-" + m + o]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const DD = (u, a, o) => (u > 0 || a > 0) && (!o || !o.shadowRoot);
function AD(u, a) {
  const o = u.touches, s = o && o.length ? o[0] : u, { offsetX: f, offsetY: m } = s;
  let y = !1, b, S;
  if (DD(f, m, u.target))
    b = f, S = m;
    const _ = a.getBoundingClientRect();
    b = s.clientX - _.left, S = s.clientY - _.top, y = !0;
    x: b,
    y: S,
    box: y
function Vf(u, a) {
  if ("native" in u)
    return u;
  const { canvas: o, currentDevicePixelRatio: s } = a, f = vv(o), m = f.boxSizing === "border-box", y = Kf(f, "padding"), b = Kf(f, "border", "width"), { x: S, y: _, box: E } = AD(u, o), D = y.left + (E && b.left), M = y.top + (E && b.top);
  let { width: H, height: q } = a;
  return m && (H -= y.width + b.width, q -= y.height + b.height), {
    x: Math.round((S - D) / H * o.width / s),
    y: Math.round((_ - M) / q * o.height / s)
function RD(u, a, o) {
  let s, f;
  if (a === void 0 || o === void 0) {
    const m = u && AS(u);
    if (!m)
      a = u.clientWidth, o = u.clientHeight;
      const y = m.getBoundingClientRect(), b = vv(m), S = Kf(b, "border", "width"), _ = Kf(b, "padding");
      a = y.width - _.width - S.width, o = y.height - _.height - S.height, s = gv(b.maxWidth, m, "clientWidth"), f = gv(b.maxHeight, m, "clientHeight");
    width: a,
    height: o,
    maxWidth: s || mv,
    maxHeight: f || mv
const Fb = (u) => Math.round(u * 10) / 10;
function wD(u, a, o, s) {
  const f = vv(u), m = Kf(f, "margin"), y = gv(f.maxWidth, u, "clientWidth") || mv, b = gv(f.maxHeight, u, "clientHeight") || mv, S = RD(u, a, o);
  let { width: _, height: E } = S;
  if (f.boxSizing === "content-box") {
    const M = Kf(f, "border", "width"), H = Kf(f, "padding");
    _ -= H.width + M.width, E -= H.height + M.height;
  }
  return _ = Math.max(0, _ - m.width), E = Math.max(0, s ? _ / s : E - m.height), _ = Fb(Math.min(_, y, S.maxWidth)), E = Fb(Math.min(E, b, S.maxHeight)), _ && !E && (E = Fb(_ / 2)), (a !== void 0 || o !== void 0) && s && S.height && E > S.height && (E = S.height, _ = Fb(Math.floor(E * s))), {
    width: _,
    height: E
function yx(u, a, o) {
  const s = a || 1, f = Math.floor(u.height * s), m = Math.floor(u.width * s);
  u.height = Math.floor(u.height), u.width = Math.floor(u.width);
  const y = u.canvas;
  return y.style && (o || !y.style.height && !y.style.width) && (y.style.height = `${u.height}px`, y.style.width = `${u.width}px`), u.currentDevicePixelRatio !== s || y.height !== f || y.width !== m ? (u.currentDevicePixelRatio = s, y.height = f, y.width = m, u.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
const zD = function() {
  let u = !1;
    const a = {
        return u = !0, !1;
    DS() && (window.addEventListener("test", null, a), window.removeEventListener("test", null, a));
  return u;
function bx(u, a) {
  const o = OD(u, a), s = o && o.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
function Gf(u, a, o, s) {
    x: u.x + o * (a.x - u.x),
    y: u.y + o * (a.y - u.y)
function CD(u, a, o, s) {
    x: u.x + o * (a.x - u.x),
    y: s === "middle" ? o < 0.5 ? u.y : a.y : s === "after" ? o < 1 ? u.y : a.y : o > 0 ? a.y : u.y
function HD(u, a, o, s) {
  const f = {
    x: u.cp2x,
    y: u.cp2y
  }, m = {
    x: a.cp1x,
    y: a.cp1y
  }, y = Gf(u, f, o), b = Gf(f, m, o), S = Gf(m, a, o), _ = Gf(y, b, o), E = Gf(b, S, o);
  return Gf(_, E, o);
}
const UD = function(u, a) {
    x(o) {
      return u + u + a - o;
    setWidth(o) {
      a = o;
    textAlign(o) {
      return o === "center" ? o : o === "right" ? "left" : "right";
    xPlus(o, s) {
      return o - s;
    leftForLtr(o, s) {
      return o - s;
}, ND = function() {
    x(u) {
      return u;
    setWidth(u) {
    textAlign(u) {
      return u;
    xPlus(u, a) {
      return u + a;
    leftForLtr(u, a) {
      return u;
function K1(u, a, o) {
  return u ? UD(a, o) : ND();
}
function kD(u, a) {
  let o, s;
  (a === "ltr" || a === "rtl") && (o = u.canvas.style, s = [
    o.getPropertyValue("direction"),
    o.getPropertyPriority("direction")
  ], o.setProperty("direction", a, "important"), u.prevTextDirection = s);
}
function BD(u, a) {
  a !== void 0 && (delete u.prevTextDirection, u.canvas.style.setProperty("direction", a[0], a[1]));
}
function B2(u) {
  return u === "angle" ? {
    between: E2,
    compare: zM,
    normalize: hu
    between: O2,
    compare: (a, o) => a - o,
    normalize: (a) => a
function vx({ start: u, end: a, count: o, loop: s, style: f }) {
    start: u % o,
    end: a % o,
    loop: s && (a - u + 1) % o === 0,
    style: f
function LD(u, a, o) {
  const { property: s, start: f, end: m } = o, { between: y, normalize: b } = B2(s), S = a.length;
  let { start: _, end: E, loop: D } = u, M, H;
  if (D) {
    for (_ += S, E += S, M = 0, H = S; M < H && y(b(a[_ % S][s]), f, m); ++M)
      _--, E--;
    _ %= S, E %= S;
  }
  return E < _ && (E += S), {
    start: _,
    end: E,
    loop: D,
    style: u.style
function L2(u, a, o) {
  if (!o)
      u
  const { property: s, start: f, end: m } = o, y = a.length, { compare: b, between: S, normalize: _ } = B2(s), { start: E, end: D, loop: M, style: H } = LD(u, a, o), q = [];
  let V = !1, B = null, Q, dt, yt;
  const St = () => S(f, yt, Q) && b(f, yt) !== 0, ut = () => b(m, Q) === 0 || S(m, yt, Q), Mt = () => V || St(), pt = () => !V || ut();
  for (let Ot = E, ht = E; Ot <= D; ++Ot)
    dt = a[Ot % y], !dt.skip && (Q = _(dt[s]), Q !== yt && (V = S(Q, f, m), B === null && Mt() && (B = b(Q, f) === 0 ? Ot : ht), B !== null && pt() && (q.push(vx({
      start: B,
      end: Ot,
      loop: M,
      count: y,
      style: H
    })), B = null), ht = Ot, yt = Q));
  return B !== null && q.push(vx({
    start: B,
    end: D,
    loop: M,
    count: y,
    style: H
  })), q;
}
function Y2(u, a) {
  const o = [], s = u.segments;
  for (let f = 0; f < s.length; f++) {
    const m = L2(s[f], u.points, a);
    m.length && o.push(...m);
  }
  return o;
}
function YD(u, a, o, s) {
  let f = 0, m = a - 1;
  if (o && !s)
    for (; f < a && !u[f].skip; )
      f++;
  for (; f < a && u[f].skip; )
    f++;
  for (f %= a, o && (m += f); m > f && u[m % a].skip; )
    m--;
  return m %= a, {
    start: f,
    end: m
function jD(u, a, o, s) {
  const f = u.length, m = [];
  let y = a, b = u[a], S;
  for (S = a + 1; S <= o; ++S) {
    const _ = u[S % f];
    _.skip || _.stop ? b.skip || (s = !1, m.push({
      start: a % f,
      end: (S - 1) % f,
      loop: s
    }), a = y = _.stop ? S : null) : (y = S, b.skip && (a = S)), b = _;
  }
  return y !== null && m.push({
    start: a % f,
    end: y % f,
    loop: s
  }), m;
}
function qD(u, a) {
  const o = u.points, s = u.options.spanGaps, f = o.length;
  if (!f)
  const m = !!u._loop, { start: y, end: b } = YD(o, f, m, s);
  if (s === !0)
    return Sx(u, [
        start: y,
        end: b,
        loop: m
      }
    ], o, a);
  const S = b < y ? b + f : b, _ = !!u._fullLoop && y === 0 && b === f - 1;
  return Sx(u, jD(o, y, S, _), o, a);
}
function Sx(u, a, o, s) {
  return !s || !s.setContext || !o ? a : VD(u, a, o, s);
}
function VD(u, a, o, s) {
  const f = u._chart.getContext(), m = Tx(u.options), { _datasetIndex: y, options: { spanGaps: b } } = u, S = o.length, _ = [];
  let E = m, D = a[0].start, M = D;
  function H(q, V, B, Q) {
    const dt = b ? -1 : 1;
    if (q !== V) {
      for (q += S; o[q % S].skip; )
        q -= dt;
      for (; o[V % S].skip; )
        V += dt;
      q % S !== V % S && (_.push({
        start: q % S,
        end: V % S,
        loop: B,
        style: Q
      }), E = Q, D = V % S);
    }
  }
  for (const q of a) {
    D = b ? D : q.start;
    let V = o[D % S], B;
    for (M = D + 1; M <= q.end; M++) {
      const Q = o[M % S];
      B = Tx(s.setContext(Jf(f, {
        p0: V,
        p1: Q,
        p0DataIndex: (M - 1) % S,
        p1DataIndex: M % S,
        datasetIndex: y
      }))), GD(B, E) && H(D, M - 1, q.loop, E), V = Q, E = B;
    D < M - 1 && H(D, M - 1, q.loop, E);
  return _;
function Tx(u) {
    backgroundColor: u.backgroundColor,
    borderCapStyle: u.borderCapStyle,
    borderDash: u.borderDash,
    borderDashOffset: u.borderDashOffset,
    borderJoinStyle: u.borderJoinStyle,
    borderWidth: u.borderWidth,
    borderColor: u.borderColor
function GD(u, a) {
  if (!a)
  const o = [], s = function(f, m) {
    return TS(m) ? (o.includes(m) || o.push(m), o.indexOf(m)) : m;
  return JSON.stringify(u, s) !== JSON.stringify(a, s);
}
function Pb(u, a, o) {
  return u.options.clip ? u[o] : a[o];
}
function XD(u, a) {
  const { xScale: o, yScale: s } = u;
  return o && s ? {
    left: Pb(o, a, "left"),
    right: Pb(o, a, "right"),
    top: Pb(s, a, "top"),
    bottom: Pb(s, a, "bottom")
  } : a;
}
function j2(u, a) {
  const o = a._clip;
  if (o.disabled)
  const s = XD(a, u.chartArea);
    left: o.left === !1 ? 0 : s.left - (o.left === !0 ? 0 : o.left),
    right: o.right === !1 ? u.width : s.right + (o.right === !0 ? 0 : o.right),
    top: o.top === !1 ? 0 : s.top - (o.top === !0 ? 0 : o.top),
    bottom: o.bottom === !1 ? u.height : s.bottom + (o.bottom === !0 ? 0 : o.bottom)
class QD {
  _notify(a, o, s, f) {
    const m = o.listeners[f], y = o.duration;
    m.forEach((b) => b({
      chart: a,
      initial: o.initial,
      numSteps: y,
      currentStep: Math.min(s - o.start, y)
    this._request || (this._running = !0, this._request = D2.call(window, () => {
  _update(a = Date.now()) {
    let o = 0;
    this._charts.forEach((s, f) => {
      if (!s.running || !s.items.length)
      const m = s.items;
      let y = m.length - 1, b = !1, S;
      for (; y >= 0; --y)
        S = m[y], S._active ? (S._total > s.duration && (s.duration = S._total), S.tick(a), b = !0) : (m[y] = m[m.length - 1], m.pop());
      b && (f.draw(), this._notify(f, s, a, "progress")), m.length || (s.running = !1, this._notify(f, s, a, "complete"), s.initial = !1), o += m.length;
    }), this._lastDate = a, o === 0 && (this._running = !1);
  }
  _getAnims(a) {
    const o = this._charts;
    let s = o.get(a);
    return s || (s = {
    }, o.set(a, s)), s;
  listen(a, o, s) {
    this._getAnims(a).listeners[o].push(s);
  add(a, o) {
    !o || !o.length || this._getAnims(a).items.push(...o);
  has(a) {
    return this._getAnims(a).items.length > 0;
  start(a) {
    const o = this._charts.get(a);
    o && (o.running = !0, o.start = Date.now(), o.duration = o.items.reduce((s, f) => Math.max(s, f._duration), 0), this._refresh());
  running(a) {
    const o = this._charts.get(a);
    return !(!o || !o.running || !o.items.length);
  stop(a) {
    const o = this._charts.get(a);
    if (!o || !o.items.length)
    const s = o.items;
    let f = s.length - 1;
    for (; f >= 0; --f)
      s[f].cancel();
    o.items = [], this._notify(a, o, Date.now(), "complete");
  remove(a) {
    return this._charts.delete(a);
var Ms = /* @__PURE__ */ new QD();
const _x = "transparent", ZD = {
  boolean(u, a, o) {
    return o > 0.5 ? a : u;
  color(u, a, o) {
    const s = cx(u || _x), f = s.valid && cx(a || _x);
    return f && f.valid ? f.mix(s, o).hexString() : a;
  number(u, a, o) {
    return u + (a - u) * o;
class KD {
  constructor(a, o, s, f) {
    const m = o[s];
    f = Jb([
      a.to,
      f,
      m,
      a.from
    const y = Jb([
      a.from,
      m,
      f
    this._active = !0, this._fn = a.fn || ZD[a.type || typeof y], this._easing = ky[a.easing] || ky.linear, this._start = Math.floor(Date.now() + (a.delay || 0)), this._duration = this._total = Math.floor(a.duration), this._loop = !!a.loop, this._target = o, this._prop = s, this._from = y, this._to = f, this._promises = void 0;
  update(a, o, s) {
      const f = this._target[this._prop], m = s - this._start, y = this._duration - m;
      this._start = s, this._duration = Math.floor(Math.max(y, a.duration)), this._total += m, this._loop = !!a.loop, this._to = Jb([
        a.to,
        o,
        f,
        a.from
      ]), this._from = Jb([
        a.from,
        f,
        o
  tick(a) {
    const o = a - this._start, s = this._duration, f = this._prop, m = this._from, y = this._loop, b = this._to;
    let S;
    if (this._active = m !== b && (y || o < s), !this._active) {
      this._target[f] = b, this._notify(!0);
    if (o < 0) {
      this._target[f] = m;
    S = o / s % 2, S = y && S > 1 ? 2 - S : S, S = this._easing(Math.min(1, Math.max(0, S))), this._target[f] = this._fn(m, b, S);
    const a = this._promises || (this._promises = []);
    return new Promise((o, s) => {
      a.push({
        res: o,
        rej: s
  _notify(a) {
    const o = a ? "res" : "rej", s = this._promises || [];
    for (let f = 0; f < s.length; f++)
      s[f][o]();
class q2 {
  constructor(a, o) {
    this._chart = a, this._properties = /* @__PURE__ */ new Map(), this.configure(o);
  configure(a) {
    if (!Oe(a))
    const o = Object.keys(Bn.animation), s = this._properties;
    Object.getOwnPropertyNames(a).forEach((f) => {
      const m = a[f];
      if (!Oe(m))
      const y = {};
      for (const b of o)
        y[b] = m[b];
      (ua(m.properties) && m.properties || [
        f
      ]).forEach((b) => {
        (b === f || !s.has(b)) && s.set(b, y);
  _animateOptions(a, o) {
    const s = o.options, f = JD(a, s);
    if (!f)
    const m = this._createAnimations(f, s);
    return s.$shared && $D(a.options.$animations, s).then(() => {
      a.options = s;
    }), m;
  }
  _createAnimations(a, o) {
    const s = this._properties, f = [], m = a.$animations || (a.$animations = {}), y = Object.keys(o), b = Date.now();
    let S;
    for (S = y.length - 1; S >= 0; --S) {
      const _ = y[S];
      if (_.charAt(0) === "$")
      if (_ === "options") {
        f.push(...this._animateOptions(a, o));
      const E = o[_];
      let D = m[_];
      const M = s.get(_);
      if (D)
        if (M && D.active()) {
          D.update(M, E, b);
          D.cancel();
      if (!M || !M.duration) {
        a[_] = E;
      m[_] = D = new KD(M, a, _, E), f.push(D);
    return f;
  update(a, o) {
      Object.assign(a, o);
    const s = this._createAnimations(a, o);
    if (s.length)
      return Ms.add(this._chart, s), !0;
function $D(u, a) {
  const o = [], s = Object.keys(a);
  for (let f = 0; f < s.length; f++) {
    const m = u[s[f]];
    m && m.active() && o.push(m.wait());
  return Promise.all(o);
function JD(u, a) {
  if (!a)
  let o = u.options;
  if (!o) {
    u.options = a;
  return o.$shared && (u.options = o = Object.assign({}, o, {
  })), o;
function xx(u, a) {
  const o = u && u.options || {}, s = o.reverse, f = o.min === void 0 ? a : 0, m = o.max === void 0 ? a : 0;
    start: s ? m : f,
    end: s ? f : m
function WD(u, a, o) {
  if (o === !1)
  const s = xx(u, o), f = xx(a, o);
    top: f.end,
    right: s.end,
    bottom: f.start,
    left: s.start
function FD(u) {
  let a, o, s, f;
  return Oe(u) ? (a = u.top, o = u.right, s = u.bottom, f = u.left) : a = o = s = f = u, {
    top: a,
    right: o,
    bottom: s,
    left: f,
    disabled: u === !1
function V2(u, a) {
  const o = [], s = u._getSortedDatasetMetas(a);
  let f, m;
  for (f = 0, m = s.length; f < m; ++f)
    o.push(s[f].index);
  return o;
}
function Ex(u, a, o, s = {}) {
  const f = u.keys, m = s.mode === "single";
  let y, b, S, _;
  if (a === null)
  let E = !1;
  for (y = 0, b = f.length; y < b; ++y) {
    if (S = +f[y], S === o) {
      if (E = !0, s.all)
    _ = u.values[S], Ya(_) && (m || a === 0 || Em(a) === Em(_)) && (a += _);
  return !E && !s.all ? 0 : a;
function PD(u, a) {
  const { iScale: o, vScale: s } = a, f = o.axis === "x" ? "x" : "y", m = s.axis === "x" ? "x" : "y", y = Object.keys(u), b = new Array(y.length);
  let S, _, E;
  for (S = 0, _ = y.length; S < _; ++S)
    E = y[S], b[S] = {
      [f]: E,
      [m]: u[E]
  return b;
function $1(u, a) {
  const o = u && u.options.stacked;
  return o || o === void 0 && a.stack !== void 0;
function ID(u, a, o) {
  return `${u.id}.${a.id}.${o.stack || o.type}`;
function tA(u) {
  const { min: a, max: o, minDefined: s, maxDefined: f } = u.getUserBounds();
    min: s ? a : Number.NEGATIVE_INFINITY,
    max: f ? o : Number.POSITIVE_INFINITY
function eA(u, a, o) {
  const s = u[a] || (u[a] = {});
  return s[o] || (s[o] = {});
function Ox(u, a, o, s) {
  for (const f of a.getMatchingVisibleMetas(s).reverse()) {
    const m = u[f.index];
    if (o && m > 0 || !o && m < 0)
      return f.index;
function Mx(u, a) {
  const { chart: o, _cachedMeta: s } = u, f = o._stacks || (o._stacks = {}), { iScale: m, vScale: y, index: b } = s, S = m.axis, _ = y.axis, E = ID(m, y, s), D = a.length;
  let M;
  for (let H = 0; H < D; ++H) {
    const q = a[H], { [S]: V, [_]: B } = q, Q = q._stacks || (q._stacks = {});
    M = Q[_] = eA(f, E, V), M[b] = B, M._top = Ox(M, y, !0, s.type), M._bottom = Ox(M, y, !1, s.type);
    const dt = M._visualValues || (M._visualValues = {});
    dt[b] = B;
function J1(u, a) {
  const o = u.scales;
  return Object.keys(o).filter((s) => o[s].axis === a).shift();
function nA(u, a) {
  return Jf(u, {
    datasetIndex: a,
    index: a,
function aA(u, a, o) {
  return Jf(u, {
    dataIndex: a,
    element: o,
    index: a,
function _y(u, a) {
  const o = u.controller.index, s = u.vScale && u.vScale.axis;
  if (s) {
    a = a || u._parsed;
    for (const f of a) {
      const m = f._stacks;
      if (!m || m[s] === void 0 || m[s][o] === void 0)
      delete m[s][o], m[s]._visualValues !== void 0 && m[s]._visualValues[o] !== void 0 && delete m[s]._visualValues[o];
const W1 = (u) => u === "reset" || u === "none", Dx = (u, a) => a ? u : Object.assign({}, u), lA = (u, a, o) => u && !a.hidden && a._stacked && {
  keys: V2(o, !0),
class G2 {
  constructor(a, o) {
    this.chart = a, this._ctx = a.ctx, this.index = o, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
    const a = this._cachedMeta;
    this.configure(), this.linkScales(), a._stacked = $1(a.vScale, a), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  updateIndex(a) {
    this.index !== a && _y(this._cachedMeta), this.index = a;
    const a = this.chart, o = this._cachedMeta, s = this.getDataset(), f = (D, M, H, q) => D === "x" ? M : D === "r" ? q : H, m = o.xAxisID = Ve(s.xAxisID, J1(a, "x")), y = o.yAxisID = Ve(s.yAxisID, J1(a, "y")), b = o.rAxisID = Ve(s.rAxisID, J1(a, "r")), S = o.indexAxis, _ = o.iAxisID = f(S, m, y, b), E = o.vAxisID = f(S, y, m, b);
    o.xScale = this.getScaleForId(m), o.yScale = this.getScaleForId(y), o.rScale = this.getScaleForId(b), o.iScale = this.getScaleForId(_), o.vScale = this.getScaleForId(E);
  getScaleForId(a) {
    return this.chart.scales[a];
  _getOtherScale(a) {
    const o = this._cachedMeta;
    return a === o.iScale ? o.vScale : o.iScale;
    const a = this._cachedMeta;
    this._data && ix(this._data, this), a._stacked && _y(a);
    const a = this.getDataset(), o = a.data || (a.data = []), s = this._data;
    if (Oe(o)) {
      const f = this._cachedMeta;
      this._data = PD(o, f);
    } else if (s !== o) {
      if (s) {
        ix(s, this);
        const f = this._cachedMeta;
        _y(f), f._parsed = [];
      o && Object.isExtensible(o) && NM(o, this), this._syncList = [], this._data = o;
    const a = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (a.dataset = new this.datasetElementType());
  buildOrUpdateElements(a) {
    const o = this._cachedMeta, s = this.getDataset();
    let f = !1;
    const m = o._stacked;
    o._stacked = $1(o.vScale, o), o.stack !== s.stack && (f = !0, _y(o), o.stack = s.stack), this._resyncElements(a), (f || m !== o._stacked) && (Mx(this, o._parsed), o._stacked = $1(o.vScale, o));
    const a = this.chart.config, o = a.datasetScopeKeys(this._type), s = a.getOptionScopes(this.getDataset(), o, !0);
    this.options = a.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  parse(a, o) {
    const { _cachedMeta: s, _data: f } = this, { iScale: m, _stacked: y } = s, b = m.axis;
    let S = a === 0 && o === f.length ? !0 : s._sorted, _ = a > 0 && s._parsed[a - 1], E, D, M;
      s._parsed = f, s._sorted = !0, M = f;
      ua(f[a]) ? M = this.parseArrayData(s, f, a, o) : Oe(f[a]) ? M = this.parseObjectData(s, f, a, o) : M = this.parsePrimitiveData(s, f, a, o);
      const H = () => D[b] === null || _ && D[b] < _[b];
      for (E = 0; E < o; ++E)
        s._parsed[E + a] = D = M[E], S && (H() && (S = !1), _ = D);
      s._sorted = S;
    }
    y && Mx(this, M);
  }
  parsePrimitiveData(a, o, s, f) {
    const { iScale: m, vScale: y } = a, b = m.axis, S = y.axis, _ = m.getLabels(), E = m === y, D = new Array(f);
    let M, H, q;
    for (M = 0, H = f; M < H; ++M)
      q = M + s, D[M] = {
        [b]: E || m.parse(_[q], q),
        [S]: y.parse(o[q], q)
    return D;
  }
  parseArrayData(a, o, s, f) {
    const { xScale: m, yScale: y } = a, b = new Array(f);
    let S, _, E, D;
    for (S = 0, _ = f; S < _; ++S)
      E = S + s, D = o[E], b[S] = {
        x: m.parse(D[0], E),
        y: y.parse(D[1], E)
    return b;
  }
  parseObjectData(a, o, s, f) {
    const { xScale: m, yScale: y } = a, { xAxisKey: b = "x", yAxisKey: S = "y" } = this._parsing, _ = new Array(f);
    let E, D, M, H;
    for (E = 0, D = f; E < D; ++E)
      M = E + s, H = o[M], _[E] = {
        x: m.parse(dv(H, b), M),
        y: y.parse(dv(H, S), M)
    return _;
  getParsed(a) {
    return this._cachedMeta._parsed[a];
  getDataElement(a) {
    return this._cachedMeta.data[a];
  applyStack(a, o, s) {
    const f = this.chart, m = this._cachedMeta, y = o[a.axis], b = {
      keys: V2(f, !0),
      values: o._stacks[a.axis]._visualValues
    return Ex(b, y, m.index, {
      mode: s
  updateRangeFromParsed(a, o, s, f) {
    const m = s[o.axis];
    let y = m === null ? NaN : m;
    const b = f && s._stacks[o.axis];
    f && b && (f.values = b, y = Ex(f, m, this._cachedMeta.index)), a.min = Math.min(a.min, y), a.max = Math.max(a.max, y);
  getMinMax(a, o) {
    const s = this._cachedMeta, f = s._parsed, m = s._sorted && a === s.iScale, y = f.length, b = this._getOtherScale(a), S = lA(o, s, this.chart), _ = {
    }, { min: E, max: D } = tA(b);
    let M, H;
    function q() {
      H = f[M];
      const V = H[b.axis];
      return !Ya(H[a.axis]) || E > V || D < V;
    }
    for (M = 0; M < y && !(!q() && (this.updateRangeFromParsed(_, a, H, S), m)); ++M)
    if (m) {
      for (M = y - 1; M >= 0; --M)
        if (!q()) {
          this.updateRangeFromParsed(_, a, H, S);
    return _;
  getAllParsedValues(a) {
    const o = this._cachedMeta._parsed, s = [];
    let f, m, y;
    for (f = 0, m = o.length; f < m; ++f)
      y = o[f][a.axis], Ya(y) && s.push(y);
    return s;
  getLabelAndValue(a) {
    const o = this._cachedMeta, s = o.iScale, f = o.vScale, m = this.getParsed(a);
      label: s ? "" + s.getLabelForValue(m[s.axis]) : "",
      value: f ? "" + f.getLabelForValue(m[f.axis]) : ""
  _update(a) {
    const o = this._cachedMeta;
    this.update(a || "default"), o._clip = FD(Ve(this.options.clip, WD(o.xScale, o.yScale, this.getMaxOverflow())));
  update(a) {
    const a = this._ctx, o = this.chart, s = this._cachedMeta, f = s.data || [], m = o.chartArea, y = [], b = this._drawStart || 0, S = this._drawCount || f.length - b, _ = this.options.drawActiveElementsOnTop;
    let E;
    for (s.dataset && s.dataset.draw(a, m, b, S), E = b; E < b + S; ++E) {
      const D = f[E];
      D.hidden || (D.active && _ ? y.push(D) : D.draw(a, m));
    }
    for (E = 0; E < y.length; ++E)
      y[E].draw(a, m);
  }
  getStyle(a, o) {
    const s = o ? "active" : "default";
    return a === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(a || 0, s);
  }
  getContext(a, o, s) {
    const f = this.getDataset();
    let m;
    if (a >= 0 && a < this._cachedMeta.data.length) {
      const y = this._cachedMeta.data[a];
      m = y.$context || (y.$context = aA(this.getContext(), a, y)), m.parsed = this.getParsed(a), m.raw = f.data[a], m.index = m.dataIndex = a;
      m = this.$context || (this.$context = nA(this.chart.getContext(), this.index)), m.dataset = f, m.index = m.datasetIndex = this.index;
    return m.active = !!o, m.mode = s, m;
  resolveDatasetElementOptions(a) {
    return this._resolveElementOptions(this.datasetElementType.id, a);
  resolveDataElementOptions(a, o) {
    return this._resolveElementOptions(this.dataElementType.id, o, a);
  _resolveElementOptions(a, o = "default", s) {
    const f = o === "active", m = this._cachedDataOpts, y = a + "-" + o, b = m[y], S = this.enableOptionSharing && hv(s);
    if (b)
      return Dx(b, S);
    const _ = this.chart.config, E = _.datasetElementScopeKeys(this._type, a), D = f ? [
      `${a}Hover`,
      a,
      a,
    ], M = _.getOptionScopes(this.getDataset(), E), H = Object.keys(Bn.elements[a]), q = () => this.getContext(s, f, o), V = _.resolveNamedOptions(M, H, q, D);
    return V.$shared && (V.$shared = S, m[y] = Object.freeze(Dx(V, S))), V;
  _resolveAnimations(a, o, s) {
    const f = this.chart, m = this._cachedDataOpts, y = `animation-${o}`, b = m[y];
    if (b)
      return b;
    let S;
    if (f.options.animation !== !1) {
      const E = this.chart.config, D = E.datasetAnimationScopeKeys(this._type, o), M = E.getOptionScopes(this.getDataset(), D);
      S = E.createResolver(M, this.getContext(a, s, o));
    }
    const _ = new q2(f, S && S.animations);
    return S && S._cacheable && (m[y] = Object.freeze(_)), _;
  }
  getSharedOptions(a) {
    if (a.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, a));
  }
  includeOptions(a, o) {
    return !o || W1(a) || this.chart._animationsDisabled;
  }
  _getSharedOptions(a, o) {
    const s = this.resolveDataElementOptions(a, o), f = this._sharedOptions, m = this.getSharedOptions(s), y = this.includeOptions(o, m) || m !== f;
    return this.updateSharedOptions(m, o, s), {
      sharedOptions: m,
      includeOptions: y
  updateElement(a, o, s, f) {
    W1(f) ? Object.assign(a, s) : this._resolveAnimations(o, f).update(a, s);
  updateSharedOptions(a, o, s) {
    a && !W1(o) && this._resolveAnimations(void 0, o).update(a, s);
  _setStyle(a, o, s, f) {
    a.active = f;
    const m = this.getStyle(o, f);
    this._resolveAnimations(o, s, f).update(a, {
      options: !f && this.getSharedOptions(m) || m
  removeHoverStyle(a, o, s) {
    this._setStyle(a, s, "active", !1);
  setHoverStyle(a, o, s) {
    this._setStyle(a, s, "active", !0);
    const a = this._cachedMeta.dataset;
    a && this._setStyle(a, void 0, "active", !1);
    const a = this._cachedMeta.dataset;
    a && this._setStyle(a, void 0, "active", !0);
  _resyncElements(a) {
    const o = this._data, s = this._cachedMeta.data;
    for (const [b, S, _] of this._syncList)
      this[b](S, _);
    const f = s.length, m = o.length, y = Math.min(m, f);
    y && this.parse(0, y), m > f ? this._insertElements(f, m - f, a) : m < f && this._removeElements(m, f - m);
  }
  _insertElements(a, o, s = !0) {
    const f = this._cachedMeta, m = f.data, y = a + o;
    let b;
    const S = (_) => {
      for (_.length += o, b = _.length - 1; b >= y; b--)
        _[b] = _[b - o];
    for (S(m), b = a; b < y; ++b)
      m[b] = new this.dataElementType();
    this._parsing && S(f._parsed), this.parse(a, o), s && this.updateElements(m, a, o, "reset");
  updateElements(a, o, s, f) {
  _removeElements(a, o) {
    const s = this._cachedMeta;
      const f = s._parsed.splice(a, o);
      s._stacked && _y(s, f);
    s.data.splice(a, o);
  _sync(a) {
      this._syncList.push(a);
      const [o, s, f] = a;
      this[o](s, f);
      ...a
    const a = arguments.length;
      this.getDataset().data.length - a,
      a
  _onDataSplice(a, o) {
    o && this._sync([
      a,
      o
    const s = arguments.length - 2;
    s && this._sync([
      a,
      s
class iA extends G2 {
  update(a) {
    const o = this._cachedMeta, { dataset: s, data: f = [], _dataset: m } = o, y = this.chart._animationsDisabled;
    let { start: b, count: S } = YM(o, f, y);
    this._drawStart = b, this._drawCount = S, jM(o) && (b = 0, S = f.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!m._decimated, s.points = f;
    const _ = this.resolveDatasetElementOptions(a);
    this.options.showLine || (_.borderWidth = 0), _.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !y,
      options: _
    }, a), this.updateElements(f, b, S, a);
  }
  updateElements(a, o, s, f) {
    const m = f === "reset", { iScale: y, vScale: b, _stacked: S, _dataset: _ } = this._cachedMeta, { sharedOptions: E, includeOptions: D } = this._getSharedOptions(o, f), M = y.axis, H = b.axis, { spanGaps: q, segment: V } = this.options, B = qy(q) ? q : Number.POSITIVE_INFINITY, Q = this.chart._animationsDisabled || m || f === "none", dt = o + s, yt = a.length;
    let St = o > 0 && this.getParsed(o - 1);
    for (let ut = 0; ut < yt; ++ut) {
      const Mt = a[ut], pt = Q ? Mt : {};
      if (ut < o || ut >= dt) {
        pt.skip = !0;
      const Ot = this.getParsed(ut), ht = Fe(Ot[H]), Vt = pt[M] = y.getPixelForValue(Ot[M], ut), xt = pt[H] = m || ht ? b.getBasePixel() : b.getPixelForValue(S ? this.applyStack(b, Ot, S) : Ot[H], ut);
      pt.skip = isNaN(Vt) || isNaN(xt) || ht, pt.stop = ut > 0 && Math.abs(Ot[M] - St[M]) > B, V && (pt.parsed = Ot, pt.raw = _.data[ut]), D && (pt.options = E || this.resolveDataElementOptions(ut, Mt.active ? "active" : f)), Q || this.updateElement(Mt, ut, pt, f), St = Ot;
    const a = this._cachedMeta, o = a.dataset, s = o.options && o.options.borderWidth || 0, f = a.data || [];
    if (!f.length)
      return s;
    const m = f[0].size(this.resolveDataElementOptions(0)), y = f[f.length - 1].size(this.resolveDataElementOptions(f.length - 1));
    return Math.max(s, m, y) / 2;
    const a = this._cachedMeta;
    a.dataset.updateControlPoints(this.chart.chartArea, a.iScale.axis), super.draw();
function qf() {
class RS {
  static override(a) {
    Object.assign(RS.prototype, a);
  constructor(a) {
    this.options = a || {};
    return qf();
    return qf();
    return qf();
    return qf();
    return qf();
    return qf();
    return qf();
var X2 = {
  _date: RS
function oA(u, a, o, s) {
  const { controller: f, data: m, _sorted: y } = u, b = f._cachedMeta.iScale, S = u.dataset && u.dataset.options ? u.dataset.options.spanGaps : null;
  if (b && a === b.axis && a !== "r" && y && m.length) {
    const _ = b._reversePixels ? HM : Zf;
    if (s) {
      if (f._sharedOptions) {
        const E = m[0], D = typeof E.getRange == "function" && E.getRange(a);
        if (D) {
          const M = _(m, a, o - D), H = _(m, a, o + D);
            lo: M.lo,
            hi: H.hi
      const E = _(m, a, o);
      if (S) {
        const { vScale: D } = f._cachedMeta, { _parsed: M } = u, H = M.slice(0, E.lo + 1).reverse().findIndex((V) => !Fe(V[D.axis]));
        E.lo -= Math.max(0, H);
        const q = M.slice(E.hi).findIndex((V) => !Fe(V[D.axis]));
        E.hi += Math.max(0, q);
      return E;
    hi: m.length - 1
function Sv(u, a, o, s, f) {
  const m = u.getSortedVisibleDatasetMetas(), y = o[a];
  for (let b = 0, S = m.length; b < S; ++b) {
    const { index: _, data: E } = m[b], { lo: D, hi: M } = oA(m[b], a, y, f);
    for (let H = D; H <= M; ++H) {
      const q = E[H];
      q.skip || s(q, _, H);
function uA(u) {
  const a = u.indexOf("x") !== -1, o = u.indexOf("y") !== -1;
  return function(s, f) {
    const m = a ? Math.abs(s.x - f.x) : 0, y = o ? Math.abs(s.y - f.y) : 0;
    return Math.sqrt(Math.pow(m, 2) + Math.pow(y, 2));
function F1(u, a, o, s, f) {
  const m = [];
  return !f && !u.isPointInArea(a) || Sv(u, o, a, function(b, S, _) {
    !f && !Vy(b, u.chartArea, 0) || b.inRange(a.x, a.y, s) && m.push({
      element: b,
      datasetIndex: S,
      index: _
  }, !0), m;
function sA(u, a, o, s) {
  let f = [];
  function m(y, b, S) {
    const { startAngle: _, endAngle: E } = y.getProps([
    ], s), { angle: D } = wM(y, {
      x: a.x,
      y: a.y
    E2(D, _, E) && f.push({
      element: y,
      datasetIndex: b,
      index: S
  return Sv(u, o, a, m), f;
function cA(u, a, o, s, f, m) {
  let y = [];
  const b = uA(o);
  let S = Number.POSITIVE_INFINITY;
  function _(E, D, M) {
    const H = E.inRange(a.x, a.y, f);
    if (s && !H)
    const q = E.getCenterPoint(f);
    if (!(!!m || u.isPointInArea(q)) && !H)
    const B = b(a, q);
    B < S ? (y = [
        element: E,
        datasetIndex: D,
        index: M
      }
    ], S = B) : B === S && y.push({
      element: E,
      datasetIndex: D,
      index: M
  return Sv(u, o, a, _), y;
function P1(u, a, o, s, f, m) {
  return !m && !u.isPointInArea(a) ? [] : o === "r" && !s ? sA(u, a, o, f) : cA(u, a, o, s, f, m);
function Ax(u, a, o, s, f) {
  const m = [], y = o === "x" ? "inXRange" : "inYRange";
  let b = !1;
  return Sv(u, o, a, (S, _, E) => {
    S[y] && S[y](a[o], f) && (m.push({
      element: S,
      datasetIndex: _,
      index: E
    }), b = b || S.inRange(a.x, a.y, f));
  }), s && !b ? [] : m;
var rA = {
    index(u, a, o, s) {
      const f = Vf(a, u), m = o.axis || "x", y = o.includeInvisible || !1, b = o.intersect ? F1(u, f, m, s, y) : P1(u, f, m, !1, s, y), S = [];
      return b.length ? (u.getSortedVisibleDatasetMetas().forEach((_) => {
        const E = b[0].index, D = _.data[E];
        D && !D.skip && S.push({
          element: D,
          datasetIndex: _.index,
          index: E
      }), S) : [];
    dataset(u, a, o, s) {
      const f = Vf(a, u), m = o.axis || "xy", y = o.includeInvisible || !1;
      let b = o.intersect ? F1(u, f, m, s, y) : P1(u, f, m, !1, s, y);
      if (b.length > 0) {
        const S = b[0].datasetIndex, _ = u.getDatasetMeta(S).data;
        b = [];
        for (let E = 0; E < _.length; ++E)
          b.push({
            element: _[E],
            datasetIndex: S,
            index: E
      return b;
    point(u, a, o, s) {
      const f = Vf(a, u), m = o.axis || "xy", y = o.includeInvisible || !1;
      return F1(u, f, m, s, y);
    nearest(u, a, o, s) {
      const f = Vf(a, u), m = o.axis || "xy", y = o.includeInvisible || !1;
      return P1(u, f, m, o.intersect, s, y);
    x(u, a, o, s) {
      const f = Vf(a, u);
      return Ax(u, f, "x", o.intersect, s);
    y(u, a, o, s) {
      const f = Vf(a, u);
      return Ax(u, f, "y", o.intersect, s);
const Q2 = [
function xy(u, a) {
  return u.filter((o) => o.pos === a);
function Rx(u, a) {
  return u.filter((o) => Q2.indexOf(o.pos) === -1 && o.box.axis === a);
function Ey(u, a) {
  return u.sort((o, s) => {
    const f = a ? s : o, m = a ? o : s;
    return f.weight === m.weight ? f.index - m.index : f.weight - m.weight;
function fA(u) {
  const a = [];
  let o, s, f, m, y, b;
  for (o = 0, s = (u || []).length; o < s; ++o)
    f = u[o], { position: m, options: { stack: y, stackWeight: b = 1 } } = f, a.push({
      index: o,
      box: f,
      pos: m,
      horizontal: f.isHorizontal(),
      weight: f.weight,
      stack: y && m + y,
      stackWeight: b
  return a;
function dA(u) {
  const a = {};
  for (const o of u) {
    const { stack: s, pos: f, stackWeight: m } = o;
    if (!s || !Q2.includes(f))
    const y = a[s] || (a[s] = {
    y.count++, y.weight += m;
  return a;
function hA(u, a) {
  const o = dA(u), { vBoxMaxWidth: s, hBoxMaxHeight: f } = a;
  let m, y, b;
  for (m = 0, y = u.length; m < y; ++m) {
    b = u[m];
    const { fullSize: S } = b.box, _ = o[b.stack], E = _ && b.stackWeight / _.weight;
    b.horizontal ? (b.width = E ? E * s : S && a.availableWidth, b.height = f) : (b.width = s, b.height = E ? E * f : S && a.availableHeight);
  return o;
function mA(u) {
  const a = fA(u), o = Ey(a.filter((_) => _.box.fullSize), !0), s = Ey(xy(a, "left"), !0), f = Ey(xy(a, "right")), m = Ey(xy(a, "top"), !0), y = Ey(xy(a, "bottom")), b = Rx(a, "x"), S = Rx(a, "y");
    fullSize: o,
    leftAndTop: s.concat(m),
    rightAndBottom: f.concat(S).concat(y).concat(b),
    chartArea: xy(a, "chartArea"),
    vertical: s.concat(f).concat(S),
    horizontal: m.concat(y).concat(b)
function wx(u, a, o, s) {
  return Math.max(u[o], a[o]) + Math.max(u[s], a[s]);
function Z2(u, a) {
  u.top = Math.max(u.top, a.top), u.left = Math.max(u.left, a.left), u.bottom = Math.max(u.bottom, a.bottom), u.right = Math.max(u.right, a.right);
function gA(u, a, o, s) {
  const { pos: f, box: m } = o, y = u.maxPadding;
  if (!Oe(f)) {
    o.size && (u[f] -= o.size);
    const D = s[o.stack] || {
    D.size = Math.max(D.size, o.horizontal ? m.height : m.width), o.size = D.size / D.count, u[f] += o.size;
  m.getPadding && Z2(y, m.getPadding());
  const b = Math.max(0, a.outerWidth - wx(y, u, "left", "right")), S = Math.max(0, a.outerHeight - wx(y, u, "top", "bottom")), _ = b !== u.w, E = S !== u.h;
  return u.w = b, u.h = S, o.horizontal ? {
    same: _,
  } : {
    same: E,
    other: _
function pA(u) {
  const a = u.maxPadding;
  function o(s) {
    const f = Math.max(a[s] - u[s], 0);
    return u[s] += f, f;
  u.y += o("top"), u.x += o("left"), o("right"), o("bottom");
function yA(u, a) {
  const o = a.maxPadding;
  function s(f) {
    const m = {
    return f.forEach((y) => {
      m[y] = Math.max(a[y], o[y]);
    }), m;
  return s(u ? [
function Cy(u, a, o, s) {
  const f = [];
  let m, y, b, S, _, E;
  for (m = 0, y = u.length, _ = 0; m < y; ++m) {
    b = u[m], S = b.box, S.update(b.width || a.w, b.height || a.h, yA(b.horizontal, a));
    const { same: D, other: M } = gA(a, o, b, s);
    _ |= D && f.length, E = E || M, S.fullSize || f.push(b);
  return _ && Cy(f, a, o, s) || E;
function Ib(u, a, o, s, f) {
  u.top = o, u.left = a, u.right = a + s, u.bottom = o + f, u.width = s, u.height = f;
function zx(u, a, o, s) {
  const f = o.padding;
  let { x: m, y } = a;
  for (const b of u) {
    const S = b.box, _ = s[b.stack] || {
    }, E = b.stackWeight / _.weight || 1;
    if (b.horizontal) {
      const D = a.w * E, M = _.size || S.height;
      hv(_.start) && (y = _.start), S.fullSize ? Ib(S, f.left, y, o.outerWidth - f.right - f.left, M) : Ib(S, a.left + _.placed, y, D, M), _.start = y, _.placed += D, y = S.bottom;
      const D = a.h * E, M = _.size || S.width;
      hv(_.start) && (m = _.start), S.fullSize ? Ib(S, m, f.top, M, o.outerHeight - f.bottom - f.top) : Ib(S, m, a.top + _.placed, M, D), _.start = m, _.placed += D, m = S.right;
  a.x = m, a.y = y;
var tv = {
  addBox(u, a) {
    u.boxes || (u.boxes = []), a.fullSize = a.fullSize || !1, a.position = a.position || "top", a.weight = a.weight || 0, a._layers = a._layers || function() {
          draw(o) {
            a.draw(o);
    }, u.boxes.push(a);
  removeBox(u, a) {
    const o = u.boxes ? u.boxes.indexOf(a) : -1;
    o !== -1 && u.boxes.splice(o, 1);
  configure(u, a, o) {
    a.fullSize = o.fullSize, a.position = o.position, a.weight = o.weight;
  update(u, a, o, s) {
    if (!u)
    const f = Fc(u.options.layout.padding), m = Math.max(a - f.width, 0), y = Math.max(o - f.height, 0), b = mA(u.boxes), S = b.vertical, _ = b.horizontal;
    Be(u.boxes, (V) => {
      typeof V.beforeLayout == "function" && V.beforeLayout();
    const E = S.reduce((V, B) => B.box.options && B.box.options.display === !1 ? V : V + 1, 0) || 1, D = Object.freeze({
      outerWidth: a,
      outerHeight: o,
      padding: f,
      availableWidth: m,
      availableHeight: y,
      vBoxMaxWidth: m / 2 / E,
      hBoxMaxHeight: y / 2
    }), M = Object.assign({}, f);
    Z2(M, Fc(s));
    const H = Object.assign({
      maxPadding: M,
      w: m,
      h: y,
      x: f.left,
      y: f.top
    }, f), q = hA(S.concat(_), D);
    Cy(b.fullSize, H, D, q), Cy(S, H, D, q), Cy(_, H, D, q) && Cy(S, H, D, q), pA(H), zx(b.leftAndTop, H, D, q), H.x += H.w, H.y += H.h, zx(b.rightAndBottom, H, D, q), u.chartArea = {
      left: H.left,
      top: H.top,
      right: H.left + H.w,
      bottom: H.top + H.h,
      height: H.h,
      width: H.w
    }, Be(b.chartArea, (V) => {
      const B = V.box;
      Object.assign(B, u.chartArea), B.update(H.w, H.h, {
class K2 {
  acquireContext(a, o) {
  releaseContext(a) {
  addEventListener(a, o, s) {
  removeEventListener(a, o, s) {
  getMaximumSize(a, o, s, f) {
    return o = Math.max(0, o || a.width), s = s || a.height, {
      width: o,
      height: Math.max(0, f ? Math.floor(o / f) : s)
  isAttached(a) {
  updateConfig(a) {
class bA extends K2 {
  acquireContext(a) {
    return a && a.getContext && a.getContext("2d") || null;
  updateConfig(a) {
    a.options.animation = !1;
const sv = "$chartjs", vA = {
}, Cx = (u) => u === null || u === "";
function SA(u, a) {
  const o = u.style, s = u.getAttribute("height"), f = u.getAttribute("width");
  if (u[sv] = {
      height: s,
      width: f,
        display: o.display,
        height: o.height,
        width: o.width
  }, o.display = o.display || "block", o.boxSizing = o.boxSizing || "border-box", Cx(f)) {
    const m = bx(u, "width");
    m !== void 0 && (u.width = m);
  if (Cx(s))
    if (u.style.height === "")
      u.height = u.width / (a || 2);
      const m = bx(u, "height");
      m !== void 0 && (u.height = m);
  return u;
const $2 = zD ? {
function TA(u, a, o) {
  u && u.addEventListener(a, o, $2);
function _A(u, a, o) {
  u && u.canvas && u.canvas.removeEventListener(a, o, $2);
function xA(u, a) {
  const o = vA[u.type] || u.type, { x: s, y: f } = Vf(u, a);
    type: o,
    chart: a,
    native: u,
    x: s !== void 0 ? s : null,
    y: f !== void 0 ? f : null
function pv(u, a) {
  for (const o of u)
    if (o === a || o.contains(a))
function EA(u, a, o) {
  const s = u.canvas, f = new MutationObserver((m) => {
    let y = !1;
    for (const b of m)
      y = y || pv(b.addedNodes, s), y = y && !pv(b.removedNodes, s);
    y && o();
  return f.observe(document, {
  }), f;
}
function OA(u, a, o) {
  const s = u.canvas, f = new MutationObserver((m) => {
    let y = !1;
    for (const b of m)
      y = y || pv(b.removedNodes, s), y = y && !pv(b.addedNodes, s);
    y && o();
  return f.observe(document, {
  }), f;
}
const Gy = /* @__PURE__ */ new Map();
let Hx = 0;
function J2() {
  const u = window.devicePixelRatio;
  u !== Hx && (Hx = u, Gy.forEach((a, o) => {
    o.currentDevicePixelRatio !== u && a();
function MA(u, a) {
  Gy.size || window.addEventListener("resize", J2), Gy.set(u, a);
function DA(u) {
  Gy.delete(u), Gy.size || window.removeEventListener("resize", J2);
function AA(u, a, o) {
  const s = u.canvas, f = s && AS(s);
  if (!f)
  const m = A2((b, S) => {
    const _ = f.clientWidth;
    o(b, S), _ < f.clientWidth && o();
  }, window), y = new ResizeObserver((b) => {
    const S = b[0], _ = S.contentRect.width, E = S.contentRect.height;
    _ === 0 && E === 0 || m(_, E);
  return y.observe(f), MA(u, m), y;
function I1(u, a, o) {
  o && o.disconnect(), a === "resize" && DA(u);
function RA(u, a, o) {
  const s = u.canvas, f = A2((m) => {
    u.ctx !== null && o(xA(m, u));
  }, u);
  return TA(s, a, f), f;
class wA extends K2 {
  acquireContext(a, o) {
    const s = a && a.getContext && a.getContext("2d");
    return s && s.canvas === a ? (SA(a, o), s) : null;
  releaseContext(a) {
    const o = a.canvas;
    if (!o[sv])
    const s = o[sv].initial;
    ].forEach((m) => {
      const y = s[m];
      Fe(y) ? o.removeAttribute(m) : o.setAttribute(m, y);
    const f = s.style || {};
    return Object.keys(f).forEach((m) => {
      o.style[m] = f[m];
    }), o.width = o.width, delete o[sv], !0;
  }
  addEventListener(a, o, s) {
    this.removeEventListener(a, o);
    const f = a.$proxies || (a.$proxies = {}), y = {
      attach: EA,
      detach: OA,
      resize: AA
    }[o] || RA;
    f[o] = y(a, o, s);
  }
  removeEventListener(a, o) {
    const s = a.$proxies || (a.$proxies = {}), f = s[o];
    if (!f)
      attach: I1,
      detach: I1,
      resize: I1
    }[o] || _A)(a, o, f), s[o] = void 0;
  getMaximumSize(a, o, s, f) {
    return wD(a, o, s, f);
  isAttached(a) {
    const o = a && AS(a);
    return !!(o && o.isConnected);
function zA(u) {
  return !DS() || typeof OffscreenCanvas < "u" && u instanceof OffscreenCanvas ? bA : wA;
class Qy {
  tooltipPosition(a) {
    const { x: o, y: s } = this.getProps([
    ], a);
      x: o,
      y: s
    return qy(this.x) && qy(this.y);
  getProps(a, o) {
    const s = this.$animations;
    if (!o || !s)
    const f = {};
    return a.forEach((m) => {
      f[m] = s[m] && s[m].active() ? s[m]._to : this[m];
    }), f;
  }
}
function CA(u, a) {
  const o = u.options.ticks, s = HA(u), f = Math.min(o.maxTicksLimit || s, s), m = o.major.enabled ? NA(a) : [], y = m.length, b = m[0], S = m[y - 1], _ = [];
  if (y > f)
    return kA(a, _, m, y / f), _;
  const E = UA(m, a, f);
  if (y > 0) {
    let D, M;
    const H = y > 1 ? Math.round((S - b) / (y - 1)) : null;
    for (ev(a, _, E, Fe(H) ? 0 : b - H, b), D = 0, M = y - 1; D < M; D++)
      ev(a, _, E, m[D], m[D + 1]);
    return ev(a, _, E, S, Fe(H) ? a.length : S + H), _;
  }
  return ev(a, _, E), _;
}
function HA(u) {
  const a = u.options.offset, o = u._tickSize(), s = u._length / o + (a ? 0 : 1), f = u._maxLength / o;
  return Math.floor(Math.min(s, f));
}
function UA(u, a, o) {
  const s = BA(u), f = a.length / o;
  if (!s)
    return Math.max(f, 1);
  const m = OM(s);
  for (let y = 0, b = m.length - 1; y < b; y++) {
    const S = m[y];
    if (S > f)
      return S;
  return Math.max(f, 1);
}
function NA(u) {
  const a = [];
  let o, s;
  for (o = 0, s = u.length; o < s; o++)
    u[o].major && a.push(o);
  return a;
}
function kA(u, a, o, s) {
  let f = 0, m = o[0], y;
  for (s = Math.ceil(s), y = 0; y < u.length; y++)
    y === m && (a.push(u[y]), f++, m = o[f * s]);
}
function ev(u, a, o, s, f) {
  const m = Ve(s, 0), y = Math.min(Ve(f, u.length), u.length);
  let b = 0, S, _, E;
  for (o = Math.ceil(o), f && (S = f - s, o = S / Math.floor(S / o)), E = m; E < 0; )
    b++, E = Math.round(m + b * o);
  for (_ = Math.max(m, 0); _ < y; _++)
    _ === E && (a.push(u[_]), b++, E = Math.round(m + b * o));
}
function BA(u) {
  const a = u.length;
  let o, s;
  if (a < 2)
  for (s = u[0], o = 1; o < a; ++o)
    if (u[o] - u[o - 1] !== s)
  return s;
const LA = (u) => u === "left" ? "right" : u === "right" ? "left" : u, Ux = (u, a, o) => a === "top" || a === "left" ? u[a] + o : u[a] - o, Nx = (u, a) => Math.min(a || u, u);
function kx(u, a) {
  const o = [], s = u.length / a, f = u.length;
  let m = 0;
  for (; m < f; m += s)
    o.push(u[Math.floor(m)]);
  return o;
}
function YA(u, a, o) {
  const s = u.ticks.length, f = Math.min(a, s - 1), m = u._startPixel, y = u._endPixel, b = 1e-6;
  let S = u.getPixelForTick(f), _;
  if (!(o && (s === 1 ? _ = Math.max(S - m, y - S) : a === 0 ? _ = (u.getPixelForTick(1) - S) / 2 : _ = (S - u.getPixelForTick(f - 1)) / 2, S += f < a ? _ : -_, S < m - b || S > y + b)))
    return S;
}
function jA(u, a) {
  Be(u, (o) => {
    const s = o.gc, f = s.length / 2;
    let m;
    if (f > a) {
      for (m = 0; m < f; ++m)
        delete o.data[s[m]];
      s.splice(0, f);
function Oy(u) {
  return u.drawTicks ? u.tickLength : 0;
function Bx(u, a) {
  if (!u.display)
  const o = pu(u.font, a), s = Fc(u.padding);
  return (ua(u.text) ? u.text.length : 1) * o.lineHeight + s.height;
function qA(u, a) {
  return Jf(u, {
    scale: a,
function VA(u, a, o) {
  return Jf(u, {
    tick: o,
    index: a,
function GA(u, a, o) {
  let s = LM(u);
  return (o && a !== "right" || !o && a === "right") && (s = LA(s)), s;
}
function XA(u, a, o, s) {
  const { top: f, left: m, bottom: y, right: b, chart: S } = u, { chartArea: _, scales: E } = S;
  let D = 0, M, H, q;
  const V = y - f, B = b - m;
  if (u.isHorizontal()) {
    if (H = ox(s, m, b), Oe(o)) {
      const Q = Object.keys(o)[0], dt = o[Q];
      q = E[Q].getPixelForValue(dt) + V - a;
    } else o === "center" ? q = (_.bottom + _.top) / 2 + V - a : q = Ux(u, o, a);
    M = b - m;
    if (Oe(o)) {
      const Q = Object.keys(o)[0], dt = o[Q];
      H = E[Q].getPixelForValue(dt) - B + a;
    } else o === "center" ? H = (_.left + _.right) / 2 - B + a : H = Ux(u, o, a);
    q = ox(s, y, f), D = o === "left" ? -yo : yo;
    titleX: H,
    titleY: q,
    maxWidth: M,
    rotation: D
class Zy extends Qy {
  constructor(a) {
    super(), this.id = a.id, this.type = a.type, this.options = void 0, this.ctx = a.ctx, this.chart = a.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
  init(a) {
    this.options = a.setContext(this.getContext()), this.axis = a.axis, this._userMin = this.parse(a.min), this._userMax = this.parse(a.max), this._suggestedMin = this.parse(a.suggestedMin), this._suggestedMax = this.parse(a.suggestedMax);
  parse(a, o) {
    return a;
    let { _userMin: a, _userMax: o, _suggestedMin: s, _suggestedMax: f } = this;
    return a = ru(a, Number.POSITIVE_INFINITY), o = ru(o, Number.NEGATIVE_INFINITY), s = ru(s, Number.POSITIVE_INFINITY), f = ru(f, Number.NEGATIVE_INFINITY), {
      min: ru(a, s),
      max: ru(o, f),
      minDefined: Ya(a),
      maxDefined: Ya(o)
  getMinMax(a) {
    let { min: o, max: s, minDefined: f, maxDefined: m } = this.getUserBounds(), y;
    if (f && m)
        min: o,
        max: s
    const b = this.getMatchingVisibleMetas();
    for (let S = 0, _ = b.length; S < _; ++S)
      y = b[S].controller.getMinMax(this, a), f || (o = Math.min(o, y.min)), m || (s = Math.max(s, y.max));
    return o = m && o > s ? s : o, s = f && o > s ? o : s, {
      min: ru(o, ru(s, o)),
      max: ru(s, ru(o, s))
    const a = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? a.xLabels : a.yLabels) || a.labels || [];
  getLabelItems(a = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(a));
    On(this.options.beforeUpdate, [
  update(a, o, s) {
    const { beginAtZero: f, grace: m, ticks: y } = this.options, b = y.sampleSize;
    this.beforeUpdate(), this.maxWidth = a, this.maxHeight = o, this._margins = s = Object.assign({
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = sD(this, m, f), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const S = b < this.ticks.length;
    this._convertTicksToLabels(S ? kx(this.ticks, b) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), y.display && (y.autoSkip || y.source === "auto") && (this.ticks = CA(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), S && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
    let a = this.options.reverse, o, s;
    this.isHorizontal() ? (o = this.left, s = this.right) : (o = this.top, s = this.bottom, a = !a), this._startPixel = o, this._endPixel = s, this._reversePixels = a, this._length = s - o, this._alignToPixels = this.options.alignToPixels;
    On(this.options.afterUpdate, [
    On(this.options.beforeSetDimensions, [
    On(this.options.afterSetDimensions, [
  _callHooks(a) {
    this.chart.notifyPlugins(a, this.getContext()), On(this.options[a], [
    On(this.options.beforeTickToLabelConversion, [
  generateTickLabels(a) {
    const o = this.options.ticks;
    let s, f, m;
    for (s = 0, f = a.length; s < f; s++)
      m = a[s], m.label = On(o.callback, [
        m.value,
        s,
        a
    On(this.options.afterTickToLabelConversion, [
    On(this.options.beforeCalculateLabelRotation, [
    const a = this.options, o = a.ticks, s = Nx(this.ticks.length, a.ticks.maxTicksLimit), f = o.minRotation || 0, m = o.maxRotation;
    let y = f, b, S, _;
    if (!this._isVisible() || !o.display || f >= m || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = f;
    const E = this._getLabelSizes(), D = E.widest.width, M = E.highest.height, H = bo(this.chart.width - D, 0, this.maxWidth);
    b = a.offset ? this.maxWidth / s : H / (s - 1), D + 6 > b && (b = H / (s - (a.offset ? 0.5 : 1)), S = this.maxHeight - Oy(a.grid) - o.padding - Bx(a.title, this.chart.options.font), _ = Math.sqrt(D * D + M * M), y = RM(Math.min(Math.asin(bo((E.highest.height + 6) / b, -1, 1)), Math.asin(bo(S / _, -1, 1)) - Math.asin(bo(M / _, -1, 1)))), y = Math.max(f, Math.min(m, y))), this.labelRotation = y;
    On(this.options.afterCalculateLabelRotation, [
    On(this.options.beforeFit, [
    const a = {
    }, { chart: o, options: { ticks: s, title: f, grid: m } } = this, y = this._isVisible(), b = this.isHorizontal();
    if (y) {
      const S = Bx(f, o.options.font);
      if (b ? (a.width = this.maxWidth, a.height = Oy(m) + S) : (a.height = this.maxHeight, a.width = Oy(m) + S), s.display && this.ticks.length) {
        const { first: _, last: E, widest: D, highest: M } = this._getLabelSizes(), H = s.padding * 2, q = Qf(this.labelRotation), V = Math.cos(q), B = Math.sin(q);
        if (b) {
          const Q = s.mirror ? 0 : B * D.width + V * M.height;
          a.height = Math.min(this.maxHeight, a.height + Q + H);
          const Q = s.mirror ? 0 : V * D.width + B * M.height;
          a.width = Math.min(this.maxWidth, a.width + Q + H);
        this._calculatePadding(_, E, B, V);
    this._handleMargins(), b ? (this.width = this._length = o.width - this._margins.left - this._margins.right, this.height = a.height) : (this.width = a.width, this.height = this._length = o.height - this._margins.top - this._margins.bottom);
  _calculatePadding(a, o, s, f) {
    const { ticks: { align: m, padding: y }, position: b } = this.options, S = this.labelRotation !== 0, _ = b !== "top" && this.axis === "x";
      const E = this.getPixelForTick(0) - this.left, D = this.right - this.getPixelForTick(this.ticks.length - 1);
      let M = 0, H = 0;
      S ? _ ? (M = f * a.width, H = s * o.height) : (M = s * a.height, H = f * o.width) : m === "start" ? H = o.width : m === "end" ? M = a.width : m !== "inner" && (M = a.width / 2, H = o.width / 2), this.paddingLeft = Math.max((M - E + y) * this.width / (this.width - E), 0), this.paddingRight = Math.max((H - D + y) * this.width / (this.width - D), 0);
      let E = o.height / 2, D = a.height / 2;
      m === "start" ? (E = 0, D = a.height) : m === "end" && (E = o.height, D = 0), this.paddingTop = E + y, this.paddingBottom = D + y;
    On(this.options.afterFit, [
    const { axis: a, position: o } = this.options;
    return o === "top" || o === "bottom" || a === "x";
  _convertTicksToLabels(a) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(a);
    let o, s;
    for (o = 0, s = a.length; o < s; o++)
      Fe(a[o].label) && (a.splice(o, 1), s--, o--);
    let a = this._labelSizes;
    if (!a) {
      const o = this.options.ticks.sampleSize;
      let s = this.ticks;
      o < s.length && (s = kx(s, o)), this._labelSizes = a = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return a;
  }
  _computeLabelSizes(a, o, s) {
    const { ctx: f, _longestTextCache: m } = this, y = [], b = [], S = Math.floor(o / Nx(o, s));
    let _ = 0, E = 0, D, M, H, q, V, B, Q, dt, yt, St, ut;
    for (D = 0; D < o; D += S) {
      if (q = a[D].label, V = this._resolveTickFontOptions(D), f.font = B = V.string, Q = m[B] = m[B] || {
      }, dt = V.lineHeight, yt = St = 0, !Fe(q) && !ua(q))
        yt = fx(f, Q.data, Q.gc, yt, q), St = dt;
      else if (ua(q))
        for (M = 0, H = q.length; M < H; ++M)
          ut = q[M], !Fe(ut) && !ua(ut) && (yt = fx(f, Q.data, Q.gc, yt, ut), St += dt);
      y.push(yt), b.push(St), _ = Math.max(yt, _), E = Math.max(St, E);
    }
    jA(m, o);
    const Mt = y.indexOf(_), pt = b.indexOf(E), Ot = (ht) => ({
      width: y[ht] || 0,
      height: b[ht] || 0
      first: Ot(0),
      last: Ot(o - 1),
      widest: Ot(Mt),
      highest: Ot(pt),
      widths: y,
      heights: b
  getLabelForValue(a) {
    return a;
  getPixelForValue(a, o) {
  getValueForPixel(a) {
  getPixelForTick(a) {
    const o = this.ticks;
    return a < 0 || a > o.length - 1 ? null : this.getPixelForValue(o[a].value);
  getPixelForDecimal(a) {
    this._reversePixels && (a = 1 - a);
    const o = this._startPixel + a * this._length;
    return CM(this._alignToPixels ? jf(this.chart, o, 0) : o);
  getDecimalForPixel(a) {
    const o = (a - this._startPixel) / this._length;
    return this._reversePixels ? 1 - o : o;
    const { min: a, max: o } = this;
    return a < 0 && o < 0 ? o : a > 0 && o > 0 ? a : 0;
  getContext(a) {
    const o = this.ticks || [];
    if (a >= 0 && a < o.length) {
      const s = o[a];
      return s.$context || (s.$context = VA(this.getContext(), a, s));
    return this.$context || (this.$context = qA(this.chart.getContext(), this));
    const a = this.options.ticks, o = Qf(this.labelRotation), s = Math.abs(Math.cos(o)), f = Math.abs(Math.sin(o)), m = this._getLabelSizes(), y = a.autoSkipPadding || 0, b = m ? m.widest.width + y : 0, S = m ? m.highest.height + y : 0;
    return this.isHorizontal() ? S * s > b * f ? b / s : S / f : S * f < b * s ? S / s : b / f;
    const a = this.options.display;
    return a !== "auto" ? !!a : this.getMatchingVisibleMetas().length > 0;
  _computeGridLineItems(a) {
    const o = this.axis, s = this.chart, f = this.options, { grid: m, position: y, border: b } = f, S = m.offset, _ = this.isHorizontal(), D = this.ticks.length + (S ? 1 : 0), M = Oy(m), H = [], q = b.setContext(this.getContext()), V = q.display ? q.width : 0, B = V / 2, Q = function(L) {
      return jf(s, L, V);
    let dt, yt, St, ut, Mt, pt, Ot, ht, Vt, xt, Dt, re;
    if (y === "top")
      dt = Q(this.bottom), pt = this.bottom - M, ht = dt - B, xt = Q(a.top) + B, re = a.bottom;
    else if (y === "bottom")
      dt = Q(this.top), xt = a.top, re = Q(a.bottom) - B, pt = dt + B, ht = this.top + M;
    else if (y === "left")
      dt = Q(this.right), Mt = this.right - M, Ot = dt - B, Vt = Q(a.left) + B, Dt = a.right;
    else if (y === "right")
      dt = Q(this.left), Vt = a.left, Dt = Q(a.right) - B, Mt = dt + B, Ot = this.left + M;
    else if (o === "x") {
      if (y === "center")
        dt = Q((a.top + a.bottom) / 2 + 0.5);
      else if (Oe(y)) {
        const L = Object.keys(y)[0], nt = y[L];
        dt = Q(this.chart.scales[L].getPixelForValue(nt));
      }
      xt = a.top, re = a.bottom, pt = dt + B, ht = pt + M;
    } else if (o === "y") {
      if (y === "center")
        dt = Q((a.left + a.right) / 2);
      else if (Oe(y)) {
        const L = Object.keys(y)[0], nt = y[L];
        dt = Q(this.chart.scales[L].getPixelForValue(nt));
      }
      Mt = dt - B, Ot = Mt - M, Vt = a.left, Dt = a.right;
    }
    const Se = Ve(f.ticks.maxTicksLimit, D), Lt = Math.max(1, Math.ceil(D / Se));
    for (yt = 0; yt < D; yt += Lt) {
      const L = this.getContext(yt), nt = m.setContext(L), ft = b.setContext(L), Ct = nt.lineWidth, z = nt.color, $ = ft.dash || [], at = ft.dashOffset, rt = nt.tickWidth, bt = nt.tickColor, Ut = nt.tickBorderDash || [], vt = nt.tickBorderDashOffset;
      St = YA(this, yt, S), St !== void 0 && (ut = jf(s, St, Ct), _ ? Mt = Ot = Vt = Dt = ut : pt = ht = xt = re = ut, H.push({
        tx1: Mt,
        ty1: pt,
        tx2: Ot,
        ty2: ht,
        x1: Vt,
        y1: xt,
        x2: Dt,
        y2: re,
        width: Ct,
        color: z,
        borderDash: $,
        borderDashOffset: at,
        tickWidth: rt,
        tickColor: bt,
        tickBorderDash: Ut,
        tickBorderDashOffset: vt
    return this._ticksLength = D, this._borderValue = dt, H;
  }
  _computeLabelItems(a) {
    const o = this.axis, s = this.options, { position: f, ticks: m } = s, y = this.isHorizontal(), b = this.ticks, { align: S, crossAlign: _, padding: E, mirror: D } = m, M = Oy(s.grid), H = M + E, q = D ? -E : H, V = -Qf(this.labelRotation), B = [];
    let Q, dt, yt, St, ut, Mt, pt, Ot, ht, Vt, xt, Dt, re = "middle";
    if (f === "top")
      Mt = this.bottom - q, pt = this._getXAxisLabelAlignment();
    else if (f === "bottom")
      Mt = this.top + q, pt = this._getXAxisLabelAlignment();
    else if (f === "left") {
      const Lt = this._getYAxisLabelAlignment(M);
      pt = Lt.textAlign, ut = Lt.x;
    } else if (f === "right") {
      const Lt = this._getYAxisLabelAlignment(M);
      pt = Lt.textAlign, ut = Lt.x;
    } else if (o === "x") {
      if (f === "center")
        Mt = (a.top + a.bottom) / 2 + H;
      else if (Oe(f)) {
        const Lt = Object.keys(f)[0], L = f[Lt];
        Mt = this.chart.scales[Lt].getPixelForValue(L) + H;
      }
      pt = this._getXAxisLabelAlignment();
    } else if (o === "y") {
      if (f === "center")
        ut = (a.left + a.right) / 2 - H;
      else if (Oe(f)) {
        const Lt = Object.keys(f)[0], L = f[Lt];
        ut = this.chart.scales[Lt].getPixelForValue(L);
      }
      pt = this._getYAxisLabelAlignment(M).textAlign;
    }
    o === "y" && (S === "start" ? re = "top" : S === "end" && (re = "bottom"));
    const Se = this._getLabelSizes();
    for (Q = 0, dt = b.length; Q < dt; ++Q) {
      yt = b[Q], St = yt.label;
      const Lt = m.setContext(this.getContext(Q));
      Ot = this.getPixelForTick(Q) + m.labelOffset, ht = this._resolveTickFontOptions(Q), Vt = ht.lineHeight, xt = ua(St) ? St.length : 1;
      const L = xt / 2, nt = Lt.color, ft = Lt.textStrokeColor, Ct = Lt.textStrokeWidth;
      let z = pt;
      y ? (ut = Ot, pt === "inner" && (Q === dt - 1 ? z = this.options.reverse ? "left" : "right" : Q === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), f === "top" ? _ === "near" || V !== 0 ? Dt = -xt * Vt + Vt / 2 : _ === "center" ? Dt = -Se.highest.height / 2 - L * Vt + Vt : Dt = -Se.highest.height + Vt / 2 : _ === "near" || V !== 0 ? Dt = Vt / 2 : _ === "center" ? Dt = Se.highest.height / 2 - L * Vt : Dt = Se.highest.height - xt * Vt, D && (Dt *= -1), V !== 0 && !Lt.showLabelBackdrop && (ut += Vt / 2 * Math.sin(V))) : (Mt = Ot, Dt = (1 - xt) * Vt / 2);
      let $;
      if (Lt.showLabelBackdrop) {
        const at = Fc(Lt.backdropPadding), rt = Se.heights[Q], bt = Se.widths[Q];
        let Ut = Dt - at.top, vt = 0 - at.left;
        switch (re) {
            Ut -= rt / 2;
            Ut -= rt;
        switch (pt) {
            vt -= bt / 2;
            vt -= bt;
            Q === dt - 1 ? vt -= bt : Q > 0 && (vt -= bt / 2);
        $ = {
          left: vt,
          top: Ut,
          width: bt + at.width,
          height: rt + at.height,
          color: Lt.backdropColor
      B.push({
        label: St,
        font: ht,
        textOffset: Dt,
          rotation: V,
          color: nt,
          strokeColor: ft,
          strokeWidth: Ct,
          textAlign: z,
          textBaseline: re,
            ut,
            Mt
          backdrop: $
    return B;
    const { position: a, ticks: o } = this.options;
    if (-Qf(this.labelRotation))
      return a === "top" ? "left" : "right";
    let f = "center";
    return o.align === "start" ? f = "left" : o.align === "end" ? f = "right" : o.align === "inner" && (f = "inner"), f;
  }
  _getYAxisLabelAlignment(a) {
    const { position: o, ticks: { crossAlign: s, mirror: f, padding: m } } = this.options, y = this._getLabelSizes(), b = a + m, S = y.widest.width;
    let _, E;
    return o === "left" ? f ? (E = this.right + m, s === "near" ? _ = "left" : s === "center" ? (_ = "center", E += S / 2) : (_ = "right", E += S)) : (E = this.right - b, s === "near" ? _ = "right" : s === "center" ? (_ = "center", E -= S / 2) : (_ = "left", E = this.left)) : o === "right" ? f ? (E = this.left + m, s === "near" ? _ = "right" : s === "center" ? (_ = "center", E -= S / 2) : (_ = "left", E -= S)) : (E = this.left + b, s === "near" ? _ = "left" : s === "center" ? (_ = "center", E += S / 2) : (_ = "right", E = this.right)) : _ = "right", {
      textAlign: _,
      x: E
    const a = this.chart, o = this.options.position;
    if (o === "left" || o === "right")
        bottom: a.height,
    if (o === "top" || o === "bottom")
        right: a.width
    const { ctx: a, options: { backgroundColor: o }, left: s, top: f, width: m, height: y } = this;
    o && (a.save(), a.fillStyle = o, a.fillRect(s, f, m, y), a.restore());
  getLineWidthForValue(a) {
    const o = this.options.grid;
    if (!this._isVisible() || !o.display)
    const f = this.ticks.findIndex((m) => m.value === a);
    return f >= 0 ? o.setContext(this.getContext(f)).lineWidth : 0;
  }
  drawGrid(a) {
    const o = this.options.grid, s = this.ctx, f = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(a));
    let m, y;
    const b = (S, _, E) => {
      !E.width || !E.color || (s.save(), s.lineWidth = E.width, s.strokeStyle = E.color, s.setLineDash(E.borderDash || []), s.lineDashOffset = E.borderDashOffset, s.beginPath(), s.moveTo(S.x, S.y), s.lineTo(_.x, _.y), s.stroke(), s.restore());
    if (o.display)
      for (m = 0, y = f.length; m < y; ++m) {
        const S = f[m];
        o.drawOnChartArea && b({
          x: S.x1,
          y: S.y1
          x: S.x2,
          y: S.y2
        }, S), o.drawTicks && b({
          x: S.tx1,
          y: S.ty1
          x: S.tx2,
          y: S.ty2
          color: S.tickColor,
          width: S.tickWidth,
          borderDash: S.tickBorderDash,
          borderDashOffset: S.tickBorderDashOffset
    const { chart: a, ctx: o, options: { border: s, grid: f } } = this, m = s.setContext(this.getContext()), y = s.display ? m.width : 0;
    if (!y)
    const b = f.setContext(this.getContext(0)).lineWidth, S = this._borderValue;
    let _, E, D, M;
    this.isHorizontal() ? (_ = jf(a, this.left, y) - y / 2, E = jf(a, this.right, b) + b / 2, D = M = S) : (D = jf(a, this.top, y) - y / 2, M = jf(a, this.bottom, b) + b / 2, _ = E = S), o.save(), o.lineWidth = m.width, o.strokeStyle = m.color, o.beginPath(), o.moveTo(_, D), o.lineTo(E, M), o.stroke(), o.restore();
  drawLabels(a) {
    const s = this.ctx, f = this._computeLabelArea();
    f && _S(s, f);
    const m = this.getLabelItems(a);
    for (const y of m) {
      const b = y.options, S = y.font, _ = y.label, E = y.textOffset;
      hx(s, _, 0, E, S, b);
    f && xS(s);
    const { ctx: a, options: { position: o, title: s, reverse: f } } = this;
    if (!s.display)
    const m = pu(s.font), y = Fc(s.padding), b = s.align;
    let S = m.lineHeight / 2;
    o === "bottom" || o === "center" || Oe(o) ? (S += y.bottom, ua(s.text) && (S += m.lineHeight * (s.text.length - 1))) : S += y.top;
    const { titleX: _, titleY: E, maxWidth: D, rotation: M } = XA(this, S, o, b);
    hx(a, s.text, 0, 0, m, {
      color: s.color,
      maxWidth: D,
      rotation: M,
      textAlign: GA(b, o, f),
        _,
        E
  draw(a) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(a), this.drawBorder(), this.drawTitle(), this.drawLabels(a));
    const a = this.options, o = a.ticks && a.ticks.z || 0, s = Ve(a.grid && a.grid.z, -1), f = Ve(a.border && a.border.z, 0);
    return !this._isVisible() || this.draw !== Zy.prototype.draw ? [
        z: o,
        draw: (m) => {
          this.draw(m);
        z: s,
        draw: (m) => {
          this.drawBackground(), this.drawGrid(m), this.drawTitle();
        z: f,
        z: o,
        draw: (m) => {
          this.drawLabels(m);
  getMatchingVisibleMetas(a) {
    const o = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", f = [];
    let m, y;
    for (m = 0, y = o.length; m < y; ++m) {
      const b = o[m];
      b[s] === this.id && (!a || b.type === a) && f.push(b);
    return f;
  _resolveTickFontOptions(a) {
    const o = this.options.ticks.setContext(this.getContext(a));
    return pu(o.font);
    const a = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / a;
class nv {
  constructor(a, o, s) {
    this.type = a, this.scope = o, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  isForType(a) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, a.prototype);
  register(a) {
    const o = Object.getPrototypeOf(a);
    let s;
    KA(o) && (s = this.register(o));
    const f = this.items, m = a.id, y = this.scope + "." + m;
    if (!m)
      throw new Error("class does not have id: " + a);
    return m in f || (f[m] = a, QA(a, y, s), this.override && Bn.override(a.id, a.overrides)), y;
  get(a) {
    return this.items[a];
  unregister(a) {
    const o = this.items, s = a.id, f = this.scope;
    s in o && delete o[s], f && s in Bn[f] && (delete Bn[f][s], this.override && delete $f[s]);
function QA(u, a, o) {
  const s = jy(/* @__PURE__ */ Object.create(null), [
    o ? Bn.get(o) : {},
    Bn.get(a),
    u.defaults
  Bn.set(a, s), u.defaultRoutes && ZA(a, u.defaultRoutes), u.descriptors && Bn.describe(a, u.descriptors);
function ZA(u, a) {
  Object.keys(a).forEach((o) => {
    const s = o.split("."), f = s.pop(), m = [
      u
    ].concat(s).join("."), y = a[o].split("."), b = y.pop(), S = y.join(".");
    Bn.route(m, f, S, b);
function KA(u) {
  return "id" in u && "defaults" in u;
class $A {
    this.controllers = new nv(G2, "datasets", !0), this.elements = new nv(Qy, "elements"), this.plugins = new nv(Object, "plugins"), this.scales = new nv(Zy, "scales"), this._typedRegistries = [
  add(...a) {
    this._each("register", a);
  remove(...a) {
    this._each("unregister", a);
  addControllers(...a) {
    this._each("register", a, this.controllers);
  addElements(...a) {
    this._each("register", a, this.elements);
  addPlugins(...a) {
    this._each("register", a, this.plugins);
  addScales(...a) {
    this._each("register", a, this.scales);
  getController(a) {
    return this._get(a, this.controllers, "controller");
  getElement(a) {
    return this._get(a, this.elements, "element");
  getPlugin(a) {
    return this._get(a, this.plugins, "plugin");
  getScale(a) {
    return this._get(a, this.scales, "scale");
  removeControllers(...a) {
    this._each("unregister", a, this.controllers);
  removeElements(...a) {
    this._each("unregister", a, this.elements);
  removePlugins(...a) {
    this._each("unregister", a, this.plugins);
  removeScales(...a) {
    this._each("unregister", a, this.scales);
  _each(a, o, s) {
      ...o
    ].forEach((f) => {
      const m = s || this._getRegistryForType(f);
      s || m.isForType(f) || m === this.plugins && f.id ? this._exec(a, m, f) : Be(f, (y) => {
        const b = s || this._getRegistryForType(y);
        this._exec(a, b, y);
  _exec(a, o, s) {
    const f = vS(a);
    On(s["before" + f], [], s), o[a](s), On(s["after" + f], [], s);
  _getRegistryForType(a) {
    for (let o = 0; o < this._typedRegistries.length; o++) {
      const s = this._typedRegistries[o];
      if (s.isForType(a))
        return s;
  _get(a, o, s) {
    const f = o.get(a);
    if (f === void 0)
      throw new Error('"' + a + '" is not a registered ' + s + ".");
    return f;
var du = /* @__PURE__ */ new $A();
class JA {
  notify(a, o, s, f) {
    o === "beforeInit" && (this._init = this._createDescriptors(a, !0), this._notify(this._init, a, "install"));
    const m = f ? this._descriptors(a).filter(f) : this._descriptors(a), y = this._notify(m, a, o, s);
    return o === "afterDestroy" && (this._notify(m, a, "stop"), this._notify(this._init, a, "uninstall")), y;
  _notify(a, o, s, f) {
    f = f || {};
    for (const m of a) {
      const y = m.plugin, b = y[s], S = [
        o,
        f,
        m.options
      if (On(b, S, y) === !1 && f.cancelable)
    Fe(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  _descriptors(a) {
    const o = this._cache = this._createDescriptors(a);
    return this._notifyStateChanges(a), o;
  _createDescriptors(a, o) {
    const s = a && a.config, f = Ve(s.options && s.options.plugins, {}), m = WA(s);
    return f === !1 && !o ? [] : PA(a, m, f, o);
  _notifyStateChanges(a) {
    const o = this._oldCache || [], s = this._cache, f = (m, y) => m.filter((b) => !y.some((S) => b.plugin.id === S.plugin.id));
    this._notify(f(o, s), a, "stop"), this._notify(f(s, o), a, "start");
function WA(u) {
  const a = {}, o = [], s = Object.keys(du.plugins.items);
  for (let m = 0; m < s.length; m++)
    o.push(du.getPlugin(s[m]));
  const f = u.plugins || [];
  for (let m = 0; m < f.length; m++) {
    const y = f[m];
    o.indexOf(y) === -1 && (o.push(y), a[y.id] = !0);
    plugins: o,
    localIds: a
function FA(u, a) {
  return !a && u === !1 ? null : u === !0 ? {} : u;
}
function PA(u, { plugins: a, localIds: o }, s, f) {
  const m = [], y = u.getContext();
  for (const b of a) {
    const S = b.id, _ = FA(s[S], f);
    _ !== null && m.push({
      plugin: b,
      options: IA(u.config, {
        plugin: b,
        local: o[S]
      }, _, y)
  return m;
function IA(u, { plugin: a, local: o }, s, f) {
  const m = u.pluginScopeKeys(a), y = u.getOptionScopes(s, m);
  return o && a.defaults && y.push(a.defaults), u.createResolver(y, f, [
function sS(u, a) {
  const o = Bn.datasets[u] || {};
  return ((a.datasets || {})[u] || {}).indexAxis || a.indexAxis || o.indexAxis || "x";
function tR(u, a) {
  let o = u;
  return u === "_index_" ? o = a : u === "_value_" && (o = a === "x" ? "y" : "x"), o;
function eR(u, a) {
  return u === a ? "_index_" : "_value_";
function Lx(u) {
  if (u === "x" || u === "y" || u === "r")
    return u;
function nR(u) {
  if (u === "top" || u === "bottom")
  if (u === "left" || u === "right")
function cS(u, ...a) {
  if (Lx(u))
    return u;
  for (const o of a) {
    const s = o.axis || nR(o.position) || u.length > 1 && Lx(u[0].toLowerCase());
    if (s)
      return s;
  throw new Error(`Cannot determine type of '${u}' axis. Please provide 'axis' or 'position' option.`);
function Yx(u, a, o) {
  if (o[a + "AxisID"] === u)
      axis: a
function aR(u, a) {
  if (a.data && a.data.datasets) {
    const o = a.data.datasets.filter((s) => s.xAxisID === u || s.yAxisID === u);
    if (o.length)
      return Yx(u, "x", o[0]) || Yx(u, "y", o[0]);
function lR(u, a) {
  const o = $f[u.type] || {
  }, s = a.scales || {}, f = sS(u.type, a), m = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((y) => {
    const b = s[y];
    if (!Oe(b))
      return console.error(`Invalid scale configuration for scale: ${y}`);
    if (b._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${y}`);
    const S = cS(y, b, aR(y, u), Bn.scales[b.type]), _ = eR(S, f), E = o.scales || {};
    m[y] = Uy(/* @__PURE__ */ Object.create(null), [
        axis: S
      b,
      E[S],
      E[_]
  }), u.data.datasets.forEach((y) => {
    const b = y.type || u.type, S = y.indexAxis || sS(b, a), E = ($f[b] || {}).scales || {};
    Object.keys(E).forEach((D) => {
      const M = tR(D, S), H = y[M + "AxisID"] || M;
      m[H] = m[H] || /* @__PURE__ */ Object.create(null), Uy(m[H], [
          axis: M
        s[H],
        E[D]
  }), Object.keys(m).forEach((y) => {
    const b = m[y];
    Uy(b, [
      Bn.scales[b.type],
      Bn.scale
  }), m;
function W2(u) {
  const a = u.options || (u.options = {});
  a.plugins = Ve(a.plugins, {}), a.scales = lR(u, a);
function F2(u) {
  return u = u || {}, u.datasets = u.datasets || [], u.labels = u.labels || [], u;
function iR(u) {
  return u = u || {}, u.data = F2(u.data), W2(u), u;
const jx = /* @__PURE__ */ new Map(), P2 = /* @__PURE__ */ new Set();
function av(u, a) {
  let o = jx.get(u);
  return o || (o = a(), jx.set(u, o), P2.add(o)), o;
const My = (u, a, o) => {
  const s = dv(a, o);
  s !== void 0 && u.add(s);
class oR {
  constructor(a) {
    this._config = iR(a), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  set type(a) {
    this._config.type = a;
  set data(a) {
    this._config.data = F2(a);
  set options(a) {
    this._config.options = a;
    const a = this._config;
    this.clearCache(), W2(a);
  datasetScopeKeys(a) {
    return av(a, () => [
        `datasets.${a}`,
  datasetAnimationScopeKeys(a, o) {
    return av(`${a}.transition.${o}`, () => [
        `datasets.${a}.transitions.${o}`,
        `transitions.${o}`
        `datasets.${a}`,
  datasetElementScopeKeys(a, o) {
    return av(`${a}-${o}`, () => [
        `datasets.${a}.elements.${o}`,
        `datasets.${a}`,
        `elements.${o}`,
  pluginScopeKeys(a) {
    const o = a.id, s = this.type;
    return av(`${s}-plugin-${o}`, () => [
        `plugins.${o}`,
        ...a.additionalOptionScopes || []
  _cachedScopes(a, o) {
    const s = this._scopeCache;
    let f = s.get(a);
    return (!f || o) && (f = /* @__PURE__ */ new Map(), s.set(a, f)), f;
  }
  getOptionScopes(a, o, s) {
    const { options: f, type: m } = this, y = this._cachedScopes(a, s), b = y.get(o);
    if (b)
      return b;
    const S = /* @__PURE__ */ new Set();
    o.forEach((E) => {
      a && (S.add(a), E.forEach((D) => My(S, a, D))), E.forEach((D) => My(S, f, D)), E.forEach((D) => My(S, $f[m] || {}, D)), E.forEach((D) => My(S, Bn, D)), E.forEach((D) => My(S, oS, D));
    const _ = Array.from(S);
    return _.length === 0 && _.push(/* @__PURE__ */ Object.create(null)), P2.has(o) && y.set(o, _), _;
    const { options: a, type: o } = this;
      a,
      $f[o] || {},
      Bn.datasets[o] || {},
        type: o
      Bn,
      oS
  resolveNamedOptions(a, o, s, f = [
    const m = {
    }, { resolver: y, subPrefixes: b } = qx(this._resolverCache, a, f);
    let S = y;
    if (sR(y, o)) {
      m.$shared = !1, s = Wc(s) ? s() : s;
      const _ = this.createResolver(a, s, b);
      S = Om(y, s, _);
    }
    for (const _ of o)
      m[_] = S[_];
    return m;
  }
  createResolver(a, o, s = [
  ], f) {
    const { resolver: m } = qx(this._resolverCache, a, s);
    return Oe(o) ? Om(m, o, void 0, f) : m;
  }
}
function qx(u, a, o) {
  let s = u.get(a);
  s || (s = /* @__PURE__ */ new Map(), u.set(a, s));
  const f = o.join();
  let m = s.get(f);
  return m || (m = {
    resolver: ES(a, o),
    subPrefixes: o.filter((b) => !b.toLowerCase().includes("hover"))
  }, s.set(f, m)), m;
}
const uR = (u) => Oe(u) && Object.getOwnPropertyNames(u).some((a) => Wc(u[a]));
function sR(u, a) {
  const { isScriptable: o, isIndexable: s } = C2(u);
  for (const f of a) {
    const m = o(f), y = s(f), b = (y || m) && u[f];
    if (m && (Wc(b) || uR(b)) || y && ua(b))
var cR = "4.5.0";
const rR = [
function Vx(u, a) {
  return u === "top" || u === "bottom" || rR.indexOf(u) === -1 && a === "x";
function Gx(u, a) {
  return function(o, s) {
    return o[u] === s[u] ? o[a] - s[a] : o[u] - s[u];
function Xx(u) {
  const a = u.chart, o = a.options.animation;
  a.notifyPlugins("afterRender"), On(o && o.onComplete, [
    u
  ], a);
function fR(u) {
  const a = u.chart, o = a.options.animation;
  On(o && o.onProgress, [
    u
  ], a);
function I2(u) {
  return DS() && typeof u == "string" ? u = document.getElementById(u) : u && u.length && (u = u[0]), u && u.canvas && (u = u.canvas), u;
const cv = {}, Qx = (u) => {
  const a = I2(u);
  return Object.values(cv).filter((o) => o.canvas === a).pop();
function dR(u, a, o) {
  const s = Object.keys(u);
  for (const f of s) {
    const m = +f;
    if (m >= a) {
      const y = u[f];
      delete u[f], (o > 0 || m > a) && (u[m + o] = y);
    }
  }
}
function hR(u, a, o, s) {
  return !o || u.type === "mouseout" ? null : s ? a : u;
}
class wS {
  static defaults = Bn;
  static instances = cv;
  static overrides = $f;
  static registry = du;
  static version = cR;
  static getChart = Qx;
  static register(...a) {
    du.add(...a), Zx();
  }
  static unregister(...a) {
    du.remove(...a), Zx();
  }
  constructor(a, o) {
    const s = this.config = new oR(o), f = I2(a), m = Qx(f);
    if (m)
      throw new Error("Canvas is already in use. Chart with ID '" + m.id + "' must be destroyed before the canvas with ID '" + m.canvas.id + "' can be reused.");
    const y = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || zA(f))(), this.platform.updateConfig(s);
    const b = this.platform.acquireContext(f, y.aspectRatio), S = b && b.canvas, _ = S && S.height, E = S && S.width;
    if (this.id = pM(), this.ctx = b, this.canvas = S, this.width = E, this.height = _, this._options = y, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new JA(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = BM((D) => this.update(D), y.resizeDelay || 0), this._dataChanges = [], cv[this.id] = this, !b || !S) {
    Ms.listen(this, "complete", Xx), Ms.listen(this, "progress", fR), this._initialize(), this.attached && this.update();
    const { options: { aspectRatio: a, maintainAspectRatio: o }, width: s, height: f, _aspectRatio: m } = this;
    return Fe(a) ? o && m ? m : f ? s / f : null : a;
  set data(a) {
    this.config.data = a;
  set options(a) {
    this.config.options = a;
    return du;
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : yx(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
    return dx(this.canvas, this.ctx), this;
    return Ms.stop(this), this;
  }
  resize(a, o) {
    Ms.running(this) ? this._resizeBeforeDraw = {
      width: a,
      height: o
    } : this._resize(a, o);
  }
  _resize(a, o) {
    const s = this.options, f = this.canvas, m = s.maintainAspectRatio && this.aspectRatio, y = this.platform.getMaximumSize(f, a, o, m), b = s.devicePixelRatio || this.platform.getDevicePixelRatio(), S = this.width ? "resize" : "attach";
    this.width = y.width, this.height = y.height, this._aspectRatio = this.aspectRatio, yx(this, b, !0) && (this.notifyPlugins("resize", {
      size: y
    }), On(s.onResize, [
      y
    ], this), this.attached && this._doResize(S) && this.render());
    const o = this.options.scales || {};
    Be(o, (s, f) => {
      s.id = f;
    const a = this.options, o = a.scales, s = this.scales, f = Object.keys(s).reduce((y, b) => (y[b] = !1, y), {});
    let m = [];
    o && (m = m.concat(Object.keys(o).map((y) => {
      const b = o[y], S = cS(y, b), _ = S === "r", E = S === "x";
        options: b,
        dposition: _ ? "chartArea" : E ? "bottom" : "left",
        dtype: _ ? "radialLinear" : E ? "category" : "linear"
    }))), Be(m, (y) => {
      const b = y.options, S = b.id, _ = cS(S, b), E = Ve(b.type, y.dtype);
      (b.position === void 0 || Vx(b.position, _) !== Vx(y.dposition)) && (b.position = y.dposition), f[S] = !0;
      let D = null;
      if (S in s && s[S].type === E)
        D = s[S];
        const M = du.getScale(E);
        D = new M({
          id: S,
          type: E,
        }), s[D.id] = D;
      D.init(b, a);
    }), Be(f, (y, b) => {
      y || delete s[b];
    }), Be(s, (y) => {
      tv.configure(this, y, y.options), tv.addBox(this, y);
    const a = this._metasets, o = this.data.datasets.length, s = a.length;
    if (a.sort((f, m) => f.index - m.index), s > o) {
      for (let f = o; f < s; ++f)
        this._destroyDatasetMeta(f);
      a.splice(o, s - o);
    this._sortedMetasets = a.slice(0).sort(Gx("order", "index"));
    const { _metasets: a, data: { datasets: o } } = this;
    a.length > o.length && delete this._stacks, a.forEach((s, f) => {
      o.filter((m) => m === s._dataset).length === 0 && this._destroyDatasetMeta(f);
    const a = [], o = this.data.datasets;
    let s, f;
    for (this._removeUnreferencedMetasets(), s = 0, f = o.length; s < f; s++) {
      const m = o[s];
      let y = this.getDatasetMeta(s);
      const b = m.type || this.config.type;
      if (y.type && y.type !== b && (this._destroyDatasetMeta(s), y = this.getDatasetMeta(s)), y.type = b, y.indexAxis = m.indexAxis || sS(b, this.options), y.order = m.order || 0, y.index = s, y.label = "" + m.label, y.visible = this.isDatasetVisible(s), y.controller)
        y.controller.updateIndex(s), y.controller.linkScales();
        const S = du.getController(b), { datasetElementType: _, dataElementType: E } = Bn.datasets[b];
        Object.assign(S, {
          dataElementType: du.getElement(E),
          datasetElementType: _ && du.getElement(_)
        }), y.controller = new S(this, s), a.push(y.controller);
    return this._updateMetasets(), a;
    Be(this.data.datasets, (a, o) => {
      this.getDatasetMeta(o).controller.reset();
  update(a) {
    const o = this.config;
    o.update();
    const s = this._options = o.createResolver(o.chartOptionScopes(), this.getContext()), f = this._animationsDisabled = !s.animation;
      mode: a,
    const m = this.buildOrUpdateControllers();
    let y = 0;
    for (let _ = 0, E = this.data.datasets.length; _ < E; _++) {
      const { controller: D } = this.getDatasetMeta(_), M = !f && m.indexOf(D) === -1;
      D.buildOrUpdateElements(M), y = Math.max(+D.getMaxOverflow(), y);
    }
    y = this._minPadding = s.layout.autoPadding ? y : 0, this._updateLayout(y), f || Be(m, (_) => {
      _.reset();
    }), this._updateDatasets(a), this.notifyPlugins("afterUpdate", {
      mode: a
    }), this._layers.sort(Gx("z", "_idx"));
    const { _active: b, _lastEvent: S } = this;
    S ? this._eventHandler(S, !0) : b.length && this._updateHoverStyles(b, b, !0), this.render();
    Be(this.scales, (a) => {
      tv.removeBox(this, a);
    const a = this.options, o = new Set(Object.keys(this._listeners)), s = new Set(a.events);
    (!ex(o, s) || !!this._responsiveListeners !== a.responsive) && (this.unbindEvents(), this.bindEvents());
    const { _hiddenIndices: a } = this, o = this._getUniformDataChanges() || [];
    for (const { method: s, start: f, count: m } of o) {
      const y = s === "_removeElements" ? -m : m;
      dR(a, f, y);
    const a = this._dataChanges;
    if (!a || !a.length)
    const o = this.data.datasets.length, s = (m) => new Set(a.filter((y) => y[0] === m).map((y, b) => b + "," + y.splice(1).join(","))), f = s(0);
    for (let m = 1; m < o; m++)
      if (!ex(f, s(m)))
    return Array.from(f).map((m) => m.split(",")).map((m) => ({
      method: m[1],
      start: +m[2],
      count: +m[3]
  _updateLayout(a) {
    tv.update(this, this.width, this.height, a);
    const o = this.chartArea, s = o.width <= 0 || o.height <= 0;
    this._layers = [], Be(this.boxes, (f) => {
      s && f.position === "chartArea" || (f.configure && f.configure(), this._layers.push(...f._layers()));
    }, this), this._layers.forEach((f, m) => {
      f._idx = m;
  _updateDatasets(a) {
      mode: a,
      for (let o = 0, s = this.data.datasets.length; o < s; ++o)
        this.getDatasetMeta(o).controller.configure();
      for (let o = 0, s = this.data.datasets.length; o < s; ++o)
        this._updateDataset(o, Wc(a) ? a({
          datasetIndex: o
        }) : a);
        mode: a
  _updateDataset(a, o) {
    const s = this.getDatasetMeta(a), f = {
      meta: s,
      index: a,
      mode: o,
    this.notifyPlugins("beforeDatasetUpdate", f) !== !1 && (s.controller._update(o), f.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", f));
    }) !== !1 && (Ms.has(this) ? this.attached && !Ms.running(this) && Ms.start(this) : (this.draw(), Xx({
    let a;
      const { width: s, height: f } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, f);
    const o = this._layers;
    for (a = 0; a < o.length && o[a].z <= 0; ++a)
      o[a].draw(this.chartArea);
    for (this._drawDatasets(); a < o.length; ++a)
      o[a].draw(this.chartArea);
  _getSortedDatasetMetas(a) {
    const o = this._sortedMetasets, s = [];
    let f, m;
    for (f = 0, m = o.length; f < m; ++f) {
      const y = o[f];
      (!a || y.visible) && s.push(y);
    return s;
    const a = this.getSortedVisibleDatasetMetas();
    for (let o = a.length - 1; o >= 0; --o)
      this._drawDataset(a[o]);
  _drawDataset(a) {
    const o = this.ctx, s = {
      meta: a,
      index: a.index,
    }, f = j2(this, a);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (f && _S(o, f), a.controller.draw(), f && xS(o), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  isPointInArea(a) {
    return Vy(a, this.chartArea, this._minPadding);
  getElementsAtEventForMode(a, o, s, f) {
    const m = rA.modes[o];
    return typeof m == "function" ? m(this, a, s, f) : [];
  getDatasetMeta(a) {
    const o = this.data.datasets[a], s = this._metasets;
    let f = s.filter((m) => m && m._dataset === o).pop();
    return f || (f = {
      order: o && o.order || 0,
      index: a,
      _dataset: o,
    }, s.push(f)), f;
    return this.$context || (this.$context = Jf(null, {
  isDatasetVisible(a) {
    const o = this.data.datasets[a];
    if (!o)
    const s = this.getDatasetMeta(a);
    return typeof s.hidden == "boolean" ? !s.hidden : !o.hidden;
  setDatasetVisibility(a, o) {
    const s = this.getDatasetMeta(a);
    s.hidden = !o;
  toggleDataVisibility(a) {
    this._hiddenIndices[a] = !this._hiddenIndices[a];
  getDataVisibility(a) {
    return !this._hiddenIndices[a];
  _updateVisibility(a, o, s) {
    const f = s ? "show" : "hide", m = this.getDatasetMeta(a), y = m.controller._resolveAnimations(void 0, f);
    hv(o) ? (m.data[o].hidden = !s, this.update()) : (this.setDatasetVisibility(a, s), y.update(m, {
      visible: s
    }), this.update((b) => b.datasetIndex === a ? f : void 0));
  hide(a, o) {
    this._updateVisibility(a, o, !1);
  show(a, o) {
    this._updateVisibility(a, o, !0);
  _destroyDatasetMeta(a) {
    const o = this._metasets[a];
    o && o.controller && o.controller._destroy(), delete this._metasets[a];
    let a, o;
    for (this.stop(), Ms.remove(this), a = 0, o = this.data.datasets.length; a < o; ++a)
      this._destroyDatasetMeta(a);
    const { canvas: a, ctx: o } = this;
    this._stop(), this.config.clearCache(), a && (this.unbindEvents(), dx(a, o), this.platform.releaseContext(o), this.canvas = null, this.ctx = null), delete cv[this.id], this.notifyPlugins("afterDestroy");
  toBase64Image(...a) {
    return this.canvas.toDataURL(...a);
    const a = this._listeners, o = this.platform, s = (m, y) => {
      o.addEventListener(this, m, y), a[m] = y;
    }, f = (m, y, b) => {
      m.offsetX = y, m.offsetY = b, this._eventHandler(m);
    Be(this.options.events, (m) => s(m, f));
    const a = this._responsiveListeners, o = this.platform, s = (S, _) => {
      o.addEventListener(this, S, _), a[S] = _;
    }, f = (S, _) => {
      a[S] && (o.removeEventListener(this, S, _), delete a[S]);
    }, m = (S, _) => {
      this.canvas && this.resize(S, _);
    let y;
    const b = () => {
      f("attach", b), this.attached = !0, this.resize(), s("resize", m), s("detach", y);
    y = () => {
      this.attached = !1, f("resize", m), this._stop(), this._resize(0, 0), s("attach", b);
    }, o.isAttached(this.canvas) ? b() : y();
    Be(this._listeners, (a, o) => {
      this.platform.removeEventListener(this, o, a);
    }), this._listeners = {}, Be(this._responsiveListeners, (a, o) => {
      this.platform.removeEventListener(this, o, a);
  updateHoverStyle(a, o, s) {
    const f = s ? "set" : "remove";
    let m, y, b, S;
    for (o === "dataset" && (m = this.getDatasetMeta(a[0].datasetIndex), m.controller["_" + f + "DatasetHoverStyle"]()), b = 0, S = a.length; b < S; ++b) {
      y = a[b];
      const _ = y && this.getDatasetMeta(y.datasetIndex).controller;
      _ && _[f + "HoverStyle"](y.element, y.datasetIndex, y.index);
  setActiveElements(a) {
    const o = this._active || [], s = a.map(({ datasetIndex: m, index: y }) => {
      const b = this.getDatasetMeta(m);
      if (!b)
        throw new Error("No dataset found at index " + m);
        datasetIndex: m,
        element: b.data[y],
        index: y
    !rv(s, o) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, o));
  notifyPlugins(a, o, s) {
    return this._plugins.notify(this, a, o, s);
  isPluginEnabled(a) {
    return this._plugins._cache.filter((o) => o.plugin.id === a).length === 1;
  _updateHoverStyles(a, o, s) {
    const f = this.options.hover, m = (S, _) => S.filter((E) => !_.some((D) => E.datasetIndex === D.datasetIndex && E.index === D.index)), y = m(o, a), b = s ? a : m(a, o);
    y.length && this.updateHoverStyle(y, f.mode, !1), b.length && f.mode && this.updateHoverStyle(b, f.mode, !0);
  _eventHandler(a, o) {
    const s = {
      event: a,
      replay: o,
      inChartArea: this.isPointInArea(a)
    }, f = (y) => (y.options.events || this.options.events).includes(a.native.type);
    if (this.notifyPlugins("beforeEvent", s, f) === !1)
    const m = this._handleEvent(a, o, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, f), (m || s.changed) && this.render(), this;
  _handleEvent(a, o, s) {
    const { _active: f = [], options: m } = this, y = o, b = this._getActiveElements(a, f, s, y), S = _M(a), _ = hR(a, this._lastEvent, s, S);
    s && (this._lastEvent = null, On(m.onHover, [
      a,
      b,
    ], this), S && On(m.onClick, [
      a,
      b,
    const E = !rv(b, f);
    return (E || o) && (this._active = b, this._updateHoverStyles(b, f, o)), this._lastEvent = _, E;
  _getActiveElements(a, o, s, f) {
    if (a.type === "mouseout")
    if (!s)
      return o;
    const m = this.options.hover;
    return this.getElementsAtEventForMode(a, m.mode, m, f);
function Zx() {
  return Be(wS.instances, (u) => u._plugins.invalidate());
function tE(u, a, o = a) {
  u.lineCap = Ve(o.borderCapStyle, a.borderCapStyle), u.setLineDash(Ve(o.borderDash, a.borderDash)), u.lineDashOffset = Ve(o.borderDashOffset, a.borderDashOffset), u.lineJoin = Ve(o.borderJoinStyle, a.borderJoinStyle), u.lineWidth = Ve(o.borderWidth, a.borderWidth), u.strokeStyle = Ve(o.borderColor, a.borderColor);
function mR(u, a, o) {
  u.lineTo(o.x, o.y);
function gR(u) {
  return u.stepped ? PM : u.tension || u.cubicInterpolationMode === "monotone" ? IM : mR;
function eE(u, a, o = {}) {
  const s = u.length, { start: f = 0, end: m = s - 1 } = o, { start: y, end: b } = a, S = Math.max(f, y), _ = Math.min(m, b), E = f < y && m < y || f > b && m > b;
    count: s,
    start: S,
    loop: a.loop,
    ilen: _ < S && !E ? s + _ - S : _ - S
function pR(u, a, o, s) {
  const { points: f, options: m } = a, { count: y, start: b, loop: S, ilen: _ } = eE(f, o, s), E = gR(m);
  let { move: D = !0, reverse: M } = s || {}, H, q, V;
  for (H = 0; H <= _; ++H)
    q = f[(b + (M ? _ - H : H)) % y], !q.skip && (D ? (u.moveTo(q.x, q.y), D = !1) : E(u, V, q, M, m.stepped), V = q);
  return S && (q = f[(b + (M ? _ : 0)) % y], E(u, V, q, M, m.stepped)), !!S;
}
function yR(u, a, o, s) {
  const f = a.points, { count: m, start: y, ilen: b } = eE(f, o, s), { move: S = !0, reverse: _ } = s || {};
  let E = 0, D = 0, M, H, q, V, B, Q;
  const dt = (St) => (y + (_ ? b - St : St)) % m, yt = () => {
    V !== B && (u.lineTo(E, B), u.lineTo(E, V), u.lineTo(E, Q));
  for (S && (H = f[dt(0)], u.moveTo(H.x, H.y)), M = 0; M <= b; ++M) {
    if (H = f[dt(M)], H.skip)
    const St = H.x, ut = H.y, Mt = St | 0;
    Mt === q ? (ut < V ? V = ut : ut > B && (B = ut), E = (D * E + St) / ++D) : (yt(), u.lineTo(St, ut), q = Mt, D = 0, V = B = ut), Q = ut;
  yt();
function rS(u) {
  const a = u.options, o = a.borderDash && a.borderDash.length;
  return !u._decimated && !u._loop && !a.tension && a.cubicInterpolationMode !== "monotone" && !a.stepped && !o ? yR : pR;
function bR(u) {
  return u.stepped ? CD : u.tension || u.cubicInterpolationMode === "monotone" ? HD : Gf;
function vR(u, a, o, s) {
  let f = a._path;
  f || (f = a._path = new Path2D(), a.path(f, o, s) && f.closePath()), tE(u, a.options), u.stroke(f);
function SR(u, a, o, s) {
  const { segments: f, options: m } = a, y = rS(a);
  for (const b of f)
    tE(u, m, b.style), u.beginPath(), y(u, a, b, {
      start: o,
      end: o + s - 1
    }) && u.closePath(), u.stroke();
const TR = typeof Path2D == "function";
function _R(u, a, o, s) {
  TR && !a.options.segment ? vR(u, a, o, s) : SR(u, a, o, s);
class Tv extends Qy {
    _indexable: (a) => a !== "borderDash" && a !== "fill"
  constructor(a) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, a && Object.assign(this, a);
  updateControlPoints(a, o) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const f = s.spanGaps ? this._loop : this._fullLoop;
      ED(this._points, s, a, f, o), this._pointsUpdated = !0;
  set points(a) {
    this._points = a, delete this._segments, delete this._path, this._pointsUpdated = !1;
    return this._segments || (this._segments = qD(this, this.options.segment));
    const a = this.segments, o = this.points;
    return a.length && o[a[0].start];
    const a = this.segments, o = this.points, s = a.length;
    return s && o[a[s - 1].end];
  }
  interpolate(a, o) {
    const s = this.options, f = a[o], m = this.points, y = Y2(this, {
      property: o,
      start: f,
      end: f
    if (!y.length)
    const b = [], S = bR(s);
    let _, E;
    for (_ = 0, E = y.length; _ < E; ++_) {
      const { start: D, end: M } = y[_], H = m[D], q = m[M];
      if (H === q) {
        b.push(H);
      const V = Math.abs((f - H[o]) / (q[o] - H[o])), B = S(H, q, V, s.stepped);
      B[o] = a[o], b.push(B);
    return b.length === 1 ? b[0] : b;
  pathSegment(a, o, s) {
    return rS(this)(a, this, o, s);
  path(a, o, s) {
    const f = this.segments, m = rS(this);
    let y = this._loop;
    o = o || 0, s = s || this.points.length - o;
    for (const b of f)
      y &= m(a, this, b, {
        start: o,
        end: o + s - 1
    return !!y;
  draw(a, o, s, f) {
    const m = this.options || {};
    (this.points || []).length && m.borderWidth && (a.save(), _R(a, this, s, f), a.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
function Kx(u, a, o, s) {
  const f = u.options, { [o]: m } = u.getProps([
    o
  ], s);
  return Math.abs(a - m) < f.radius + f.hitRadius;
class xR extends Qy {
  constructor(a) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, a && Object.assign(this, a);
  inRange(a, o, s) {
    const f = this.options, { x: m, y } = this.getProps([
    ], s);
    return Math.pow(a - m, 2) + Math.pow(o - y, 2) < Math.pow(f.hitRadius + f.radius, 2);
  inXRange(a, o) {
    return Kx(this, a, "x", o);
  inYRange(a, o) {
    return Kx(this, a, "y", o);
  getCenterPoint(a) {
    const { x: o, y: s } = this.getProps([
    ], a);
      x: o,
      y: s
  size(a) {
    a = a || this.options || {};
    let o = a.radius || 0;
    o = Math.max(o, o && a.hoverRadius || 0);
    const s = o && a.borderWidth || 0;
    return (o + s) * 2;
  draw(a, o) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !Vy(this, o, this.size(s) / 2) || (a.strokeStyle = s.borderColor, a.lineWidth = s.borderWidth, a.fillStyle = s.backgroundColor, uS(a, s, this.x, this.y));
    const a = this.options || {};
    return a.radius + a.hitRadius;
  }
}
function ER(u, a, o) {
  const s = u.segments, f = u.points, m = a.points, y = [];
  for (const b of s) {
    let { start: S, end: _ } = b;
    _ = _v(S, _, f);
    const E = fS(o, f[S], f[_], b.loop);
    if (!a.segments) {
      y.push({
        source: b,
        target: E,
        start: f[S],
        end: f[_]
    const D = Y2(a, E);
    for (const M of D) {
      const H = fS(o, m[M.start], m[M.end], M.loop), q = L2(b, f, H);
      for (const V of q)
        y.push({
          source: V,
          target: M,
            [o]: $x(E, H, "start", Math.max)
            [o]: $x(E, H, "end", Math.min)
  return y;
function fS(u, a, o, s) {
  if (s)
  let f = a[u], m = o[u];
  return u === "angle" && (f = hu(f), m = hu(m)), {
    property: u,
    start: f,
    end: m
function OR(u, a) {
  const { x: o = null, y: s = null } = u || {}, f = a.points, m = [];
  return a.segments.forEach(({ start: y, end: b }) => {
    b = _v(y, b, f);
    const S = f[y], _ = f[b];
    s !== null ? (m.push({
      x: S.x,
      y: s
    }), m.push({
      x: _.x,
      y: s
    })) : o !== null && (m.push({
      x: o,
      y: S.y
    }), m.push({
      x: o,
      y: _.y
  }), m;
function _v(u, a, o) {
  for (; a > u; a--) {
    const s = o[a];
    if (!isNaN(s.x) && !isNaN(s.y))
  return a;
function $x(u, a, o, s) {
  return u && a ? s(u[o], a[o]) : u ? u[o] : a ? a[o] : 0;
function nE(u, a) {
  let o = [], s = !1;
  return ua(u) ? (s = !0, o = u) : o = OR(u, a), o.length ? new Tv({
    points: o,
    _loop: s,
    _fullLoop: s
function Jx(u) {
  return u && u.fill !== !1;
function MR(u, a, o) {
  let f = u[a].fill;
  const m = [
    a
  let y;
  if (!o)
    return f;
  for (; f !== !1 && m.indexOf(f) === -1; ) {
    if (!Ya(f))
      return f;
    if (y = u[f], !y)
    if (y.visible)
      return f;
    m.push(f), f = y.fill;
function DR(u, a, o) {
  const s = zR(u);
  if (Oe(s))
    return isNaN(s.value) ? !1 : s;
  let f = parseFloat(s);
  return Ya(f) && Math.floor(f) === f ? AR(s[0], a, f, o) : [
  ].indexOf(s) >= 0 && s;
function AR(u, a, o, s) {
  return (u === "-" || u === "+") && (o = a + o), o === a || o < 0 || o >= s ? !1 : o;
function RR(u, a) {
  let o = null;
  return u === "start" ? o = a.bottom : u === "end" ? o = a.top : Oe(u) ? o = a.getPixelForValue(u.value) : a.getBasePixel && (o = a.getBasePixel()), o;
function wR(u, a, o) {
  let s;
  return u === "start" ? s = o : u === "end" ? s = a.options.reverse ? a.min : a.max : Oe(u) ? s = u.value : s = a.getBaseValue(), s;
function zR(u) {
  const a = u.options, o = a.fill;
  let s = Ve(o && o.target, o);
  return s === void 0 && (s = !!a.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
function CR(u) {
  const { scale: a, index: o, line: s } = u, f = [], m = s.segments, y = s.points, b = HR(a, o);
  b.push(nE({
    y: a.bottom
  }, s));
  for (let S = 0; S < m.length; S++) {
    const _ = m[S];
    for (let E = _.start; E <= _.end; E++)
      UR(f, y[E], b);
  }
  return new Tv({
    points: f,
function HR(u, a) {
  const o = [], s = u.getMatchingVisibleMetas("line");
  for (let f = 0; f < s.length; f++) {
    const m = s[f];
    if (m.index === a)
    m.hidden || o.unshift(m.dataset);
  }
  return o;
}
function UR(u, a, o) {
  const s = [];
  for (let f = 0; f < o.length; f++) {
    const m = o[f], { first: y, last: b, point: S } = NR(m, a, "x");
    if (!(!S || y && b)) {
      if (y)
        s.unshift(S);
      else if (u.push(S), !b)
  u.push(...s);
function NR(u, a, o) {
  const s = u.interpolate(a, o);
  if (!s)
  const f = s[o], m = u.segments, y = u.points;
  let b = !1, S = !1;
  for (let _ = 0; _ < m.length; _++) {
    const E = m[_], D = y[E.start][o], M = y[E.end][o];
    if (O2(f, D, M)) {
      b = f === D, S = f === M;
    first: b,
    last: S,
    point: s
class aE {
  constructor(a) {
    this.x = a.x, this.y = a.y, this.radius = a.radius;
  pathSegment(a, o, s) {
    const { x: f, y: m, radius: y } = this;
    return o = o || {
      end: yu
    }, a.arc(f, m, y, o.end, o.start, !0), !s.bounds;
  interpolate(a) {
    const { x: o, y: s, radius: f } = this, m = a.angle;
      x: o + Math.cos(m) * f,
      y: s + Math.sin(m) * f,
      angle: m
function kR(u) {
  const { chart: a, fill: o, line: s } = u;
  if (Ya(o))
    return BR(a, o);
  if (o === "stack")
    return CR(u);
  if (o === "shape")
  const f = LR(u);
  return f instanceof aE ? f : nE(f, s);
function BR(u, a) {
  const o = u.getDatasetMeta(a);
  return o && u.isDatasetVisible(a) ? o.dataset : null;
function LR(u) {
  return (u.scale || {}).getPointPositionForValue ? jR(u) : YR(u);
function YR(u) {
  const { scale: a = {}, fill: o } = u, s = RR(o, a);
  if (Ya(s)) {
    const f = a.isHorizontal();
      x: f ? s : null,
      y: f ? null : s
function jR(u) {
  const { scale: a, fill: o } = u, s = a.options, f = a.getLabels().length, m = s.reverse ? a.max : a.min, y = wR(o, a, m), b = [];
  if (s.grid.circular) {
    const S = a.getPointPositionForValue(0, m);
    return new aE({
      x: S.x,
      y: S.y,
      radius: a.getDistanceFromCenterForValue(y)
  for (let S = 0; S < f; ++S)
    b.push(a.getPointPositionForValue(S, y));
  return b;
}
function tS(u, a, o) {
  const s = kR(a), { chart: f, index: m, line: y, scale: b, axis: S } = a, _ = y.options, E = _.fill, D = _.backgroundColor, { above: M = D, below: H = D } = E || {}, q = f.getDatasetMeta(m), V = j2(f, q);
  s && y.points.length && (_S(u, o), qR(u, {
    line: y,
    target: s,
    above: M,
    below: H,
    area: o,
    scale: b,
    axis: S,
    clip: V
  }), xS(u));
}
function qR(u, a) {
  const { line: o, target: s, above: f, below: m, area: y, scale: b, clip: S } = a, _ = o._loop ? "angle" : a.axis;
  u.save();
  let E = m;
  m !== f && (_ === "x" ? (Wx(u, s, y.top), eS(u, {
    line: o,
    target: s,
    color: f,
    scale: b,
    property: _,
    clip: S
  }), u.restore(), u.save(), Wx(u, s, y.bottom)) : _ === "y" && (Fx(u, s, y.left), eS(u, {
    line: o,
    target: s,
    color: m,
    scale: b,
    property: _,
    clip: S
  }), u.restore(), u.save(), Fx(u, s, y.right), E = f)), eS(u, {
    line: o,
    target: s,
    color: E,
    scale: b,
    property: _,
    clip: S
  }), u.restore();
}
function Wx(u, a, o) {
  const { segments: s, points: f } = a;
  let m = !0, y = !1;
  u.beginPath();
  for (const b of s) {
    const { start: S, end: _ } = b, E = f[S], D = f[_v(S, _, f)];
    m ? (u.moveTo(E.x, E.y), m = !1) : (u.lineTo(E.x, o), u.lineTo(E.x, E.y)), y = !!a.pathSegment(u, b, {
      move: y
    }), y ? u.closePath() : u.lineTo(D.x, o);
  }
  u.lineTo(a.first().x, o), u.closePath(), u.clip();
}
function Fx(u, a, o) {
  const { segments: s, points: f } = a;
  let m = !0, y = !1;
  u.beginPath();
  for (const b of s) {
    const { start: S, end: _ } = b, E = f[S], D = f[_v(S, _, f)];
    m ? (u.moveTo(E.x, E.y), m = !1) : (u.lineTo(o, E.y), u.lineTo(E.x, E.y)), y = !!a.pathSegment(u, b, {
      move: y
    }), y ? u.closePath() : u.lineTo(o, D.y);
  }
  u.lineTo(o, a.first().y), u.closePath(), u.clip();
}
function eS(u, a) {
  const { line: o, target: s, property: f, color: m, scale: y, clip: b } = a, S = ER(o, s, f);
  for (const { source: _, target: E, start: D, end: M } of S) {
    const { style: { backgroundColor: H = m } = {} } = _, q = s !== !0;
    u.save(), u.fillStyle = H, VR(u, y, b, q && fS(f, D, M)), u.beginPath();
    const V = !!o.pathSegment(u, _);
    let B;
    if (q) {
      V ? u.closePath() : Px(u, s, M, f);
      const Q = !!s.pathSegment(u, E, {
        move: V,
      B = V && Q, B || Px(u, s, D, f);
    u.closePath(), u.fill(B ? "evenodd" : "nonzero"), u.restore();
function VR(u, a, o, s) {
  const f = a.chart.chartArea, { property: m, start: y, end: b } = s || {};
  if (m === "x" || m === "y") {
    let S, _, E, D;
    m === "x" ? (S = y, _ = f.top, E = b, D = f.bottom) : (S = f.left, _ = y, E = f.right, D = b), u.beginPath(), o && (S = Math.max(S, o.left), E = Math.min(E, o.right), _ = Math.max(_, o.top), D = Math.min(D, o.bottom)), u.rect(S, _, E - S, D - _), u.clip();
function Px(u, a, o, s) {
  const f = a.interpolate(o, s);
  f && u.lineTo(f.x, f.y);
var GR = {
  afterDatasetsUpdate(u, a, o) {
    const s = (u.data.datasets || []).length, f = [];
    let m, y, b, S;
    for (y = 0; y < s; ++y)
      m = u.getDatasetMeta(y), b = m.dataset, S = null, b && b.options && b instanceof Tv && (S = {
        visible: u.isDatasetVisible(y),
        index: y,
        fill: DR(b, y, s),
        chart: u,
        axis: m.controller.options.indexAxis,
        scale: m.vScale,
        line: b
      }), m.$filler = S, f.push(S);
    for (y = 0; y < s; ++y)
      S = f[y], !(!S || S.fill === !1) && (S.fill = MR(f, y, o.propagate));
  beforeDraw(u, a, o) {
    const s = o.drawTime === "beforeDraw", f = u.getSortedVisibleDatasetMetas(), m = u.chartArea;
    for (let y = f.length - 1; y >= 0; --y) {
      const b = f[y].$filler;
      b && (b.line.updateControlPoints(m, b.axis), s && b.fill && tS(u.ctx, b, m));
  beforeDatasetsDraw(u, a, o) {
    if (o.drawTime !== "beforeDatasetsDraw")
    const s = u.getSortedVisibleDatasetMetas();
    for (let f = s.length - 1; f >= 0; --f) {
      const m = s[f].$filler;
      Jx(m) && tS(u.ctx, m, u.chartArea);
  beforeDatasetDraw(u, a, o) {
    const s = a.meta.$filler;
    !Jx(s) || o.drawTime !== "beforeDatasetDraw" || tS(u.ctx, s, u.chartArea);
const Hy = {
  average(u) {
    if (!u.length)
    let a, o, s = /* @__PURE__ */ new Set(), f = 0, m = 0;
    for (a = 0, o = u.length; a < o; ++a) {
      const b = u[a].element;
      if (b && b.hasValue()) {
        const S = b.tooltipPosition();
        s.add(S.x), f += S.y, ++m;
    return m === 0 || s.size === 0 ? !1 : {
        ...s
      ].reduce((b, S) => b + S) / s.size,
      y: f / m
  nearest(u, a) {
    if (!u.length)
    let o = a.x, s = a.y, f = Number.POSITIVE_INFINITY, m, y, b;
    for (m = 0, y = u.length; m < y; ++m) {
      const S = u[m].element;
      if (S && S.hasValue()) {
        const _ = S.getCenterPoint(), E = iS(a, _);
        E < f && (f = E, b = S);
    if (b) {
      const S = b.tooltipPosition();
      o = S.x, s = S.y;
      x: o,
      y: s
function fu(u, a) {
  return a && (ua(a) ? Array.prototype.push.apply(u, a) : u.push(a)), u;
function Ds(u) {
  return (typeof u == "string" || u instanceof String) && u.indexOf(`
`) > -1 ? u.split(`
`) : u;
function XR(u, a) {
  const { element: o, datasetIndex: s, index: f } = a, m = u.getDatasetMeta(s).controller, { label: y, value: b } = m.getLabelAndValue(f);
    chart: u,
    label: y,
    parsed: m.getParsed(f),
    raw: u.data.datasets[s].data[f],
    formattedValue: b,
    dataset: m.getDataset(),
    dataIndex: f,
    datasetIndex: s,
    element: o
function Ix(u, a) {
  const o = u.chart.ctx, { body: s, footer: f, title: m } = u, { boxWidth: y, boxHeight: b } = a, S = pu(a.bodyFont), _ = pu(a.titleFont), E = pu(a.footerFont), D = m.length, M = f.length, H = s.length, q = Fc(a.padding);
  let V = q.height, B = 0, Q = s.reduce((St, ut) => St + ut.before.length + ut.lines.length + ut.after.length, 0);
  if (Q += u.beforeBody.length + u.afterBody.length, D && (V += D * _.lineHeight + (D - 1) * a.titleSpacing + a.titleMarginBottom), Q) {
    const St = a.displayColors ? Math.max(b, S.lineHeight) : S.lineHeight;
    V += H * St + (Q - H) * S.lineHeight + (Q - 1) * a.bodySpacing;
  }
  M && (V += a.footerMarginTop + M * E.lineHeight + (M - 1) * a.footerSpacing);
  let dt = 0;
  const yt = function(St) {
    B = Math.max(B, o.measureText(St).width + dt);
  return o.save(), o.font = _.string, Be(u.title, yt), o.font = S.string, Be(u.beforeBody.concat(u.afterBody), yt), dt = a.displayColors ? y + 2 + a.boxPadding : 0, Be(s, (St) => {
    Be(St.before, yt), Be(St.lines, yt), Be(St.after, yt);
  }), dt = 0, o.font = E.string, Be(u.footer, yt), o.restore(), B += q.width, {
    width: B,
    height: V
function QR(u, a) {
  const { y: o, height: s } = a;
  return o < s / 2 ? "top" : o > u.height - s / 2 ? "bottom" : "center";
function ZR(u, a, o, s) {
  const { x: f, width: m } = s, y = o.caretSize + o.caretPadding;
  if (u === "left" && f + m + y > a.width || u === "right" && f - m - y < 0)
function KR(u, a, o, s) {
  const { x: f, width: m } = o, { width: y, chartArea: { left: b, right: S } } = u;
  let _ = "center";
  return s === "center" ? _ = f <= (b + S) / 2 ? "left" : "right" : f <= m / 2 ? _ = "left" : f >= y - m / 2 && (_ = "right"), ZR(_, u, a, o) && (_ = "center"), _;
function t2(u, a, o) {
  const s = o.yAlign || a.yAlign || QR(u, o);
    xAlign: o.xAlign || a.xAlign || KR(u, a, o, s),
    yAlign: s
function $R(u, a) {
  let { x: o, width: s } = u;
  return a === "right" ? o -= s : a === "center" && (o -= s / 2), o;
}
function JR(u, a, o) {
  let { y: s, height: f } = u;
  return a === "top" ? s += o : a === "bottom" ? s -= f + o : s -= f / 2, s;
}
function e2(u, a, o, s) {
  const { caretSize: f, caretPadding: m, cornerRadius: y } = u, { xAlign: b, yAlign: S } = o, _ = f + m, { topLeft: E, topRight: D, bottomLeft: M, bottomRight: H } = uv(y);
  let q = $R(a, b);
  const V = JR(a, S, _);
  return S === "center" ? b === "left" ? q += _ : b === "right" && (q -= _) : b === "left" ? q -= Math.max(E, M) + f : b === "right" && (q += Math.max(D, H) + f), {
    x: bo(q, 0, s.width - a.width),
    y: bo(V, 0, s.height - a.height)
function lv(u, a, o) {
  const s = Fc(o.padding);
  return a === "center" ? u.x + u.width / 2 : a === "right" ? u.x + u.width - s.right : u.x + s.left;
function n2(u) {
  return fu([], Ds(u));
function WR(u, a, o) {
  return Jf(u, {
    tooltip: a,
    tooltipItems: o,
function a2(u, a) {
  const o = a && a.dataset && a.dataset.tooltip && a.dataset.tooltip.callbacks;
  return o ? u.override(o) : u;
const lE = {
  beforeTitle: Os,
  title(u) {
    if (u.length > 0) {
      const a = u[0], o = a.chart.data.labels, s = o ? o.length : 0;
        return a.dataset.label || "";
      if (a.label)
        return a.label;
      if (s > 0 && a.dataIndex < s)
        return o[a.dataIndex];
  afterTitle: Os,
  beforeBody: Os,
  beforeLabel: Os,
  label(u) {
      return u.label + ": " + u.formattedValue || u.formattedValue;
    let a = u.dataset.label || "";
    a && (a += ": ");
    const o = u.formattedValue;
    return Fe(o) || (a += o), a;
  labelColor(u) {
    const o = u.chart.getDatasetMeta(u.datasetIndex).controller.getStyle(u.dataIndex);
      borderColor: o.borderColor,
      backgroundColor: o.backgroundColor,
      borderWidth: o.borderWidth,
      borderDash: o.borderDash,
      borderDashOffset: o.borderDashOffset,
  labelPointStyle(u) {
    const o = u.chart.getDatasetMeta(u.datasetIndex).controller.getStyle(u.dataIndex);
      pointStyle: o.pointStyle,
      rotation: o.rotation
  afterLabel: Os,
  afterBody: Os,
  beforeFooter: Os,
  footer: Os,
  afterFooter: Os
function Tl(u, a, o, s) {
  const f = u[a].call(o, s);
  return typeof f > "u" ? lE[a].call(o, s) : f;
class l2 extends Qy {
  static positioners = Hy;
  constructor(a) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = a.chart, this.options = a.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  initialize(a) {
    this.options = a, this._cachedAnimations = void 0, this.$context = void 0;
    const a = this._cachedAnimations;
    if (a)
      return a;
    const o = this.chart, s = this.options.setContext(this.getContext()), f = s.enabled && o.options.animation && s.animations, m = new q2(this.chart, f);
    return f._cacheable && (this._cachedAnimations = Object.freeze(m)), m;
    return this.$context || (this.$context = WR(this.chart.getContext(), this, this._tooltipItems));
  getTitle(a, o) {
    const { callbacks: s } = o, f = Tl(s, "beforeTitle", this, a), m = Tl(s, "title", this, a), y = Tl(s, "afterTitle", this, a);
    let b = [];
    return b = fu(b, Ds(f)), b = fu(b, Ds(m)), b = fu(b, Ds(y)), b;
  getBeforeBody(a, o) {
    return n2(Tl(o.callbacks, "beforeBody", this, a));
  getBody(a, o) {
    const { callbacks: s } = o, f = [];
    return Be(a, (m) => {
      const y = {
      }, b = a2(s, m);
      fu(y.before, Ds(Tl(b, "beforeLabel", this, m))), fu(y.lines, Tl(b, "label", this, m)), fu(y.after, Ds(Tl(b, "afterLabel", this, m))), f.push(y);
    }), f;
  }
  getAfterBody(a, o) {
    return n2(Tl(o.callbacks, "afterBody", this, a));
  }
  getFooter(a, o) {
    const { callbacks: s } = o, f = Tl(s, "beforeFooter", this, a), m = Tl(s, "footer", this, a), y = Tl(s, "afterFooter", this, a);
    let b = [];
    return b = fu(b, Ds(f)), b = fu(b, Ds(m)), b = fu(b, Ds(y)), b;
  }
  _createItems(a) {
    const o = this._active, s = this.chart.data, f = [], m = [], y = [];
    let b = [], S, _;
    for (S = 0, _ = o.length; S < _; ++S)
      b.push(XR(this.chart, o[S]));
    return a.filter && (b = b.filter((E, D, M) => a.filter(E, D, M, s))), a.itemSort && (b = b.sort((E, D) => a.itemSort(E, D, s))), Be(b, (E) => {
      const D = a2(a.callbacks, E);
      f.push(Tl(D, "labelColor", this, E)), m.push(Tl(D, "labelPointStyle", this, E)), y.push(Tl(D, "labelTextColor", this, E));
    }), this.labelColors = f, this.labelPointStyles = m, this.labelTextColors = y, this.dataPoints = b, b;
  }
  update(a, o) {
    const s = this.options.setContext(this.getContext()), f = this._active;
    let m, y = [];
    if (!f.length)
      this.opacity !== 0 && (m = {
      const b = Hy[s.position].call(this, f, this._eventPosition);
      y = this._createItems(s), this.title = this.getTitle(y, s), this.beforeBody = this.getBeforeBody(y, s), this.body = this.getBody(y, s), this.afterBody = this.getAfterBody(y, s), this.footer = this.getFooter(y, s);
      const S = this._size = Ix(this, s), _ = Object.assign({}, b, S), E = t2(this.chart, s, _), D = e2(s, _, E, this.chart);
      this.xAlign = E.xAlign, this.yAlign = E.yAlign, m = {
        x: D.x,
        y: D.y,
        width: S.width,
        height: S.height,
        caretX: b.x,
        caretY: b.y
    this._tooltipItems = y, this.$context = void 0, m && this._resolveAnimations().update(this, m), a && s.external && s.external.call(this, {
      replay: o
  drawCaret(a, o, s, f) {
    const m = this.getCaretPosition(a, s, f);
    o.lineTo(m.x1, m.y1), o.lineTo(m.x2, m.y2), o.lineTo(m.x3, m.y3);
  }
  getCaretPosition(a, o, s) {
    const { xAlign: f, yAlign: m } = this, { caretSize: y, cornerRadius: b } = s, { topLeft: S, topRight: _, bottomLeft: E, bottomRight: D } = uv(b), { x: M, y: H } = a, { width: q, height: V } = o;
    let B, Q, dt, yt, St, ut;
    return m === "center" ? (St = H + V / 2, f === "left" ? (B = M, Q = B - y, yt = St + y, ut = St - y) : (B = M + q, Q = B + y, yt = St - y, ut = St + y), dt = B) : (f === "left" ? Q = M + Math.max(S, E) + y : f === "right" ? Q = M + q - Math.max(_, D) - y : Q = this.caretX, m === "top" ? (yt = H, St = yt - y, B = Q - y, dt = Q + y) : (yt = H + V, St = yt + y, B = Q + y, dt = Q - y), ut = yt), {
      x1: B,
      x2: Q,
      x3: dt,
      y1: yt,
      y2: St,
      y3: ut
  drawTitle(a, o, s) {
    const f = this.title, m = f.length;
    let y, b, S;
    if (m) {
      const _ = K1(s.rtl, this.x, this.width);
      for (a.x = lv(this, s.titleAlign, s), o.textAlign = _.textAlign(s.titleAlign), o.textBaseline = "middle", y = pu(s.titleFont), b = s.titleSpacing, o.fillStyle = s.titleColor, o.font = y.string, S = 0; S < m; ++S)
        o.fillText(f[S], _.x(a.x), a.y + y.lineHeight / 2), a.y += y.lineHeight + b, S + 1 === m && (a.y += s.titleMarginBottom - b);
    }
  }
  _drawColorBox(a, o, s, f, m) {
    const y = this.labelColors[s], b = this.labelPointStyles[s], { boxHeight: S, boxWidth: _ } = m, E = pu(m.bodyFont), D = lv(this, "left", m), M = f.x(D), H = S < E.lineHeight ? (E.lineHeight - S) / 2 : 0, q = o.y + H;
    if (m.usePointStyle) {
      const V = {
        radius: Math.min(_, S) / 2,
        pointStyle: b.pointStyle,
        rotation: b.rotation,
      }, B = f.leftForLtr(M, _) + _ / 2, Q = q + S / 2;
      a.strokeStyle = m.multiKeyBackground, a.fillStyle = m.multiKeyBackground, uS(a, V, B, Q), a.strokeStyle = y.borderColor, a.fillStyle = y.backgroundColor, uS(a, V, B, Q);
      a.lineWidth = Oe(y.borderWidth) ? Math.max(...Object.values(y.borderWidth)) : y.borderWidth || 1, a.strokeStyle = y.borderColor, a.setLineDash(y.borderDash || []), a.lineDashOffset = y.borderDashOffset || 0;
      const V = f.leftForLtr(M, _), B = f.leftForLtr(f.xPlus(M, 1), _ - 2), Q = uv(y.borderRadius);
      Object.values(Q).some((dt) => dt !== 0) ? (a.beginPath(), a.fillStyle = m.multiKeyBackground, mx(a, {
        x: V,
        y: q,
        w: _,
        h: S,
        radius: Q
      }), a.fill(), a.stroke(), a.fillStyle = y.backgroundColor, a.beginPath(), mx(a, {
        x: B,
        y: q + 1,
        w: _ - 2,
        h: S - 2,
        radius: Q
      }), a.fill()) : (a.fillStyle = m.multiKeyBackground, a.fillRect(V, q, _, S), a.strokeRect(V, q, _, S), a.fillStyle = y.backgroundColor, a.fillRect(B, q + 1, _ - 2, S - 2));
    }
    a.fillStyle = this.labelTextColors[s];
  }
  drawBody(a, o, s) {
    const { body: f } = this, { bodySpacing: m, bodyAlign: y, displayColors: b, boxHeight: S, boxWidth: _, boxPadding: E } = s, D = pu(s.bodyFont);
    let M = D.lineHeight, H = 0;
    const q = K1(s.rtl, this.x, this.width), V = function(Ot) {
      o.fillText(Ot, q.x(a.x + H), a.y + M / 2), a.y += M + m;
    }, B = q.textAlign(y);
    let Q, dt, yt, St, ut, Mt, pt;
    for (o.textAlign = y, o.textBaseline = "middle", o.font = D.string, a.x = lv(this, B, s), o.fillStyle = s.bodyColor, Be(this.beforeBody, V), H = b && B !== "right" ? y === "center" ? _ / 2 + E : _ + 2 + E : 0, St = 0, Mt = f.length; St < Mt; ++St) {
      for (Q = f[St], dt = this.labelTextColors[St], o.fillStyle = dt, Be(Q.before, V), yt = Q.lines, b && yt.length && (this._drawColorBox(o, a, St, q, s), M = Math.max(D.lineHeight, S)), ut = 0, pt = yt.length; ut < pt; ++ut)
        V(yt[ut]), M = D.lineHeight;
      Be(Q.after, V);
    }
    H = 0, M = D.lineHeight, Be(this.afterBody, V), a.y -= m;
  }
  drawFooter(a, o, s) {
    const f = this.footer, m = f.length;
    let y, b;
    if (m) {
      const S = K1(s.rtl, this.x, this.width);
      for (a.x = lv(this, s.footerAlign, s), a.y += s.footerMarginTop, o.textAlign = S.textAlign(s.footerAlign), o.textBaseline = "middle", y = pu(s.footerFont), o.fillStyle = s.footerColor, o.font = y.string, b = 0; b < m; ++b)
        o.fillText(f[b], S.x(a.x), a.y + y.lineHeight / 2), a.y += y.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(a, o, s, f) {
    const { xAlign: m, yAlign: y } = this, { x: b, y: S } = a, { width: _, height: E } = s, { topLeft: D, topRight: M, bottomLeft: H, bottomRight: q } = uv(f.cornerRadius);
    o.fillStyle = f.backgroundColor, o.strokeStyle = f.borderColor, o.lineWidth = f.borderWidth, o.beginPath(), o.moveTo(b + D, S), y === "top" && this.drawCaret(a, o, s, f), o.lineTo(b + _ - M, S), o.quadraticCurveTo(b + _, S, b + _, S + M), y === "center" && m === "right" && this.drawCaret(a, o, s, f), o.lineTo(b + _, S + E - q), o.quadraticCurveTo(b + _, S + E, b + _ - q, S + E), y === "bottom" && this.drawCaret(a, o, s, f), o.lineTo(b + H, S + E), o.quadraticCurveTo(b, S + E, b, S + E - H), y === "center" && m === "left" && this.drawCaret(a, o, s, f), o.lineTo(b, S + D), o.quadraticCurveTo(b, S, b + D, S), o.closePath(), o.fill(), f.borderWidth > 0 && o.stroke();
  }
  _updateAnimationTarget(a) {
    const o = this.chart, s = this.$animations, f = s && s.x, m = s && s.y;
    if (f || m) {
      const y = Hy[a.position].call(this, this._active, this._eventPosition);
      if (!y)
      const b = this._size = Ix(this, a), S = Object.assign({}, y, this._size), _ = t2(o, a, S), E = e2(a, S, _, o);
      (f._to !== E.x || m._to !== E.y) && (this.xAlign = _.xAlign, this.yAlign = _.yAlign, this.width = b.width, this.height = b.height, this.caretX = y.x, this.caretY = y.y, this._resolveAnimations().update(this, E));
  draw(a) {
    const o = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
    this._updateAnimationTarget(o);
    const f = {
    }, m = {
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const y = Fc(o.padding), b = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    o.enabled && b && (a.save(), a.globalAlpha = s, this.drawBackground(m, a, f, o), kD(a, o.textDirection), m.y += y.top, this.drawTitle(m, a, o), this.drawBody(m, a, o), this.drawFooter(m, a, o), BD(a, o.textDirection), a.restore());
  setActiveElements(a, o) {
    const s = this._active, f = a.map(({ datasetIndex: b, index: S }) => {
      const _ = this.chart.getDatasetMeta(b);
      if (!_)
        throw new Error("Cannot find a dataset at index " + b);
        datasetIndex: b,
        element: _.data[S],
        index: S
    }), m = !rv(s, f), y = this._positionChanged(f, o);
    (m || y) && (this._active = f, this._eventPosition = o, this._ignoreReplayEvents = !0, this.update(!0));
  handleEvent(a, o, s = !0) {
    if (o && this._ignoreReplayEvents)
    const f = this.options, m = this._active || [], y = this._getActiveElements(a, m, o, s), b = this._positionChanged(y, a), S = o || !rv(y, m) || b;
    return S && (this._active = y, (f.enabled || f.external) && (this._eventPosition = {
      x: a.x,
      y: a.y
    }, this.update(!0, o))), S;
  }
  _getActiveElements(a, o, s, f) {
    const m = this.options;
    if (a.type === "mouseout")
    if (!f)
      return o.filter((b) => this.chart.data.datasets[b.datasetIndex] && this.chart.getDatasetMeta(b.datasetIndex).controller.getParsed(b.index) !== void 0);
    const y = this.chart.getElementsAtEventForMode(a, m.mode, m, s);
    return m.reverse && y.reverse(), y;
  _positionChanged(a, o) {
    const { caretX: s, caretY: f, options: m } = this, y = Hy[m.position].call(this, a, o);
    return y !== !1 && (s !== y.x || f !== y.y);
var FR = {
  _element: l2,
  positioners: Hy,
  afterInit(u, a, o) {
    o && (u.tooltip = new l2({
      chart: u,
      options: o
  beforeUpdate(u, a, o) {
    u.tooltip && u.tooltip.initialize(o);
  reset(u, a, o) {
    u.tooltip && u.tooltip.initialize(o);
  afterDraw(u) {
    const a = u.tooltip;
    if (a && a._willRender()) {
      const o = {
        tooltip: a
      if (u.notifyPlugins("beforeTooltipDraw", {
        ...o,
      a.draw(u.ctx), u.notifyPlugins("afterTooltipDraw", o);
  afterEvent(u, a) {
    if (u.tooltip) {
      const o = a.replay;
      u.tooltip.handleEvent(a.event, o, a.inChartArea) && (a.changed = !0);
    boxHeight: (u, a) => a.bodyFont.size,
    boxWidth: (u, a) => a.bodyFont.size,
    callbacks: lE
    _scriptable: (u) => u !== "filter" && u !== "itemSort" && u !== "external",
function PR(u, a) {
  const o = [], { bounds: f, step: m, min: y, max: b, precision: S, count: _, maxTicks: E, maxDigits: D, includeBounds: M } = u, H = m || 1, q = E - 1, { min: V, max: B } = a, Q = !Fe(y), dt = !Fe(b), yt = !Fe(_), St = (B - V) / (D + 1);
  let ut = ax((B - V) / q / H) * H, Mt, pt, Ot, ht;
  if (ut < 1e-14 && !Q && !dt)
        value: V
        value: B
  ht = Math.ceil(B / ut) - Math.floor(V / ut), ht > q && (ut = ax(ht * ut / q / H) * H), Fe(S) || (Mt = Math.pow(10, S), ut = Math.ceil(ut * Mt) / Mt), f === "ticks" ? (pt = Math.floor(V / ut) * ut, Ot = Math.ceil(B / ut) * ut) : (pt = V, Ot = B), Q && dt && m && DM((b - y) / m, ut / 1e3) ? (ht = Math.round(Math.min((b - y) / ut, E)), ut = (b - y) / ht, pt = y, Ot = b) : yt ? (pt = Q ? y : pt, Ot = dt ? b : Ot, ht = _ - 1, ut = (Ot - pt) / ht) : (ht = (Ot - pt) / ut, Ny(ht, Math.round(ht), ut / 1e3) ? ht = Math.round(ht) : ht = Math.ceil(ht));
  const Vt = Math.max(lx(ut), lx(pt));
  Mt = Math.pow(10, Fe(S) ? Vt : S), pt = Math.round(pt * Mt) / Mt, Ot = Math.round(Ot * Mt) / Mt;
  let xt = 0;
  for (Q && (M && pt !== y ? (o.push({
    value: y
  }), pt < y && xt++, Ny(Math.round((pt + xt * ut) * Mt) / Mt, y, i2(y, St, u)) && xt++) : pt < y && xt++); xt < ht; ++xt) {
    const Dt = Math.round((pt + xt * ut) * Mt) / Mt;
    if (dt && Dt > b)
    o.push({
      value: Dt
  return dt && M && Ot !== b ? o.length && Ny(o[o.length - 1].value, b, i2(b, St, u)) ? o[o.length - 1].value = b : o.push({
    value: b
  }) : (!dt || Ot === b) && o.push({
    value: Ot
  }), o;
function i2(u, a, { horizontal: o, minRotation: s }) {
  const f = Qf(s), m = (o ? Math.sin(f) : Math.cos(f)) || 1e-3, y = 0.75 * a * ("" + u).length;
  return Math.min(a / m, y);
class IR extends Zy {
  constructor(a) {
    super(a), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  parse(a, o) {
    return Fe(a) || (typeof a == "number" || a instanceof Number) && !isFinite(+a) ? null : +a;
    const { beginAtZero: a } = this.options, { minDefined: o, maxDefined: s } = this.getUserBounds();
    let { min: f, max: m } = this;
    const y = (S) => f = o ? f : S, b = (S) => m = s ? m : S;
    if (a) {
      const S = Em(f), _ = Em(m);
      S < 0 && _ < 0 ? b(0) : S > 0 && _ > 0 && y(0);
    if (f === m) {
      let S = m === 0 ? 1 : Math.abs(m * 0.05);
      b(m + S), a || y(f - S);
    this.min = f, this.max = m;
    const a = this.options.ticks;
    let { maxTicksLimit: o, stepSize: s } = a, f;
    return s ? (f = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, f > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${f} ticks. Limiting to 1000.`), f = 1e3)) : (f = this.computeTickLimit(), o = o || 11), o && (f = Math.min(o, f)), f;
    const a = this.options, o = a.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const f = {
      maxTicks: s,
      bounds: a.bounds,
      min: a.min,
      max: a.max,
      precision: o.precision,
      step: o.stepSize,
      count: o.count,
      minRotation: o.minRotation || 0,
      includeBounds: o.includeBounds !== !1
    }, m = this._range || this, y = PR(f, m);
    return a.bounds === "ticks" && AM(y, this, "value"), a.reverse ? (y.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), y;
    const a = this.ticks;
    let o = this.min, s = this.max;
    if (super.configure(), this.options.offset && a.length) {
      const f = (s - o) / Math.max(a.length - 1, 1) / 2;
      o -= f, s += f;
    this._startValue = o, this._endValue = s, this._valueRange = s - o;
  getLabelForValue(a) {
    return R2(a, this.chart.options.locale, this.options.ticks.format);
class tw extends IR {
      callback: w2.formatters.numeric
    const { min: a, max: o } = this.getMinMax(!0);
    this.min = Ya(a) ? a : 0, this.max = Ya(o) ? o : 1, this.handleTickRangeOptions();
    const a = this.isHorizontal(), o = a ? this.width : this.height, s = Qf(this.options.ticks.minRotation), f = (a ? Math.sin(s) : Math.cos(s)) || 1e-3, m = this._resolveTickFontOptions(0);
    return Math.ceil(o / Math.min(40, m.lineHeight / f));
  getPixelForValue(a) {
    return a === null ? NaN : this.getPixelForDecimal((a - this._startValue) / this._valueRange);
  getValueForPixel(a) {
    return this._startValue + this.getDecimalForPixel(a) * this._valueRange;
const xv = {
}, _l = /* @__PURE__ */ Object.keys(xv);
function o2(u, a) {
  return u - a;
function u2(u, a) {
  if (Fe(a))
  const o = u._adapter, { parser: s, round: f, isoWeekday: m } = u._parseOpts;
  let y = a;
  return typeof s == "function" && (y = s(y)), Ya(y) || (y = typeof s == "string" ? o.parse(y, s) : o.parse(y)), y === null ? null : (f && (y = f === "week" && (qy(m) || m === !0) ? o.startOf(y, "isoWeek", m) : o.startOf(y, f)), +y);
}
function s2(u, a, o, s) {
  const f = _l.length;
  for (let m = _l.indexOf(u); m < f - 1; ++m) {
    const y = xv[_l[m]], b = y.steps ? y.steps : Number.MAX_SAFE_INTEGER;
    if (y.common && Math.ceil((o - a) / (b * y.size)) <= s)
      return _l[m];
  }
  return _l[f - 1];
}
function ew(u, a, o, s, f) {
  for (let m = _l.length - 1; m >= _l.indexOf(o); m--) {
    const y = _l[m];
    if (xv[y].common && u._adapter.diff(f, s, y) >= a - 1)
      return y;
  }
  return _l[o ? _l.indexOf(o) : 0];
}
function nw(u) {
  for (let a = _l.indexOf(u) + 1, o = _l.length; a < o; ++a)
    if (xv[_l[a]].common)
      return _l[a];
}
function c2(u, a, o) {
  if (!o)
    u[a] = !0;
  else if (o.length) {
    const { lo: s, hi: f } = SS(o, a), m = o[s] >= a ? o[s] : o[f];
    u[m] = !0;
  }
}
function aw(u, a, o, s) {
  const f = u._adapter, m = +f.startOf(a[0].value, s), y = a[a.length - 1].value;
  let b, S;
  for (b = m; b <= y; b = +f.add(b, 1, s))
    S = o[b], S >= 0 && (a[S].major = !0);
  return a;
}
function r2(u, a, o) {
  const s = [], f = {}, m = a.length;
  let y, b;
  for (y = 0; y < m; ++y)
    b = a[y], f[b] = y, s.push({
      value: b,
  return m === 0 || !o ? s : aw(u, s, f, o);
class dS extends Zy {
  constructor(a) {
    super(a), this._cache = {
  init(a, o = {}) {
    const s = a.time || (a.time = {}), f = this._adapter = new X2._date(a.adapters.date);
    f.init(o), Uy(s.displayFormats, f.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(a), this._normalized = o.normalized;
  parse(a, o) {
    return a === void 0 ? null : u2(this, a);
    const a = this.options, o = this._adapter, s = a.time.unit || "day";
    let { min: f, max: m, minDefined: y, maxDefined: b } = this.getUserBounds();
    function S(_) {
      !y && !isNaN(_.min) && (f = Math.min(f, _.min)), !b && !isNaN(_.max) && (m = Math.max(m, _.max));
    (!y || !b) && (S(this._getLabelBounds()), (a.bounds !== "ticks" || a.ticks.source !== "labels") && S(this.getMinMax(!1))), f = Ya(f) && !isNaN(f) ? f : +o.startOf(Date.now(), s), m = Ya(m) && !isNaN(m) ? m : +o.endOf(Date.now(), s) + 1, this.min = Math.min(f, m - 1), this.max = Math.max(f + 1, m);
    const a = this.getLabelTimestamps();
    let o = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return a.length && (o = a[0], s = a[a.length - 1]), {
      min: o,
      max: s
    const a = this.options, o = a.time, s = a.ticks, f = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    a.bounds === "ticks" && f.length && (this.min = this._userMin || f[0], this.max = this._userMax || f[f.length - 1]);
    const m = this.min, y = this.max, b = UM(f, m, y);
    return this._unit = o.unit || (s.autoSkip ? s2(o.minUnit, this.min, this.max, this._getLabelCapacity(m)) : ew(this, b.length, o.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : nw(this._unit), this.initOffsets(f), a.reverse && b.reverse(), r2(this, b, this._majorUnit);
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((a) => +a.value));
  }
  initOffsets(a = []) {
    let o = 0, s = 0, f, m;
    this.options.offset && a.length && (f = this.getDecimalForValue(a[0]), a.length === 1 ? o = 1 - f : o = (this.getDecimalForValue(a[1]) - f) / 2, m = this.getDecimalForValue(a[a.length - 1]), a.length === 1 ? s = m : s = (m - this.getDecimalForValue(a[a.length - 2])) / 2);
    const y = a.length < 3 ? 0.5 : 0.25;
    o = bo(o, 0, y), s = bo(s, 0, y), this._offsets = {
      start: o,
      end: s,
      factor: 1 / (o + 1 + s)
    const a = this._adapter, o = this.min, s = this.max, f = this.options, m = f.time, y = m.unit || s2(m.minUnit, o, s, this._getLabelCapacity(o)), b = Ve(f.ticks.stepSize, 1), S = y === "week" ? m.isoWeekday : !1, _ = qy(S) || S === !0, E = {};
    let D = o, M, H;
    if (_ && (D = +a.startOf(D, "isoWeek", S)), D = +a.startOf(D, _ ? "day" : y), a.diff(s, o, y) > 1e5 * b)
      throw new Error(o + " and " + s + " are too far apart with stepSize of " + b + " " + y);
    const q = f.ticks.source === "data" && this.getDataTimestamps();
    for (M = D, H = 0; M < s; M = +a.add(M, b, y), H++)
      c2(E, M, q);
    return (M === s || f.bounds === "ticks" || H === 1) && c2(E, M, q), Object.keys(E).sort(o2).map((V) => +V);
  }
  getLabelForValue(a) {
    const o = this._adapter, s = this.options.time;
    return s.tooltipFormat ? o.format(a, s.tooltipFormat) : o.format(a, s.displayFormats.datetime);
  }
  format(a, o) {
    const f = this.options.time.displayFormats, m = this._unit, y = o || f[m];
    return this._adapter.format(a, y);
  }
  _tickFormatFunction(a, o, s, f) {
    const m = this.options, y = m.ticks.callback;
    if (y)
      return On(y, [
        a,
        o,
        s
    const b = m.time.displayFormats, S = this._unit, _ = this._majorUnit, E = S && b[S], D = _ && b[_], M = s[o], H = _ && D && M && M.major;
    return this._adapter.format(a, f || (H ? D : E));
  generateTickLabels(a) {
    let o, s, f;
    for (o = 0, s = a.length; o < s; ++o)
      f = a[o], f.label = this._tickFormatFunction(f.value, o, a);
  getDecimalForValue(a) {
    return a === null ? NaN : (a - this.min) / (this.max - this.min);
  getPixelForValue(a) {
    const o = this._offsets, s = this.getDecimalForValue(a);
    return this.getPixelForDecimal((o.start + s) * o.factor);
  getValueForPixel(a) {
    const o = this._offsets, s = this.getDecimalForPixel(a) / o.factor - o.end;
    return this.min + s * (this.max - this.min);
  _getLabelSize(a) {
    const o = this.options.ticks, s = this.ctx.measureText(a).width, f = Qf(this.isHorizontal() ? o.maxRotation : o.minRotation), m = Math.cos(f), y = Math.sin(f), b = this._resolveTickFontOptions(0).size;
      w: s * m + b * y,
      h: s * y + b * m
  _getLabelCapacity(a) {
    const o = this.options.time, s = o.displayFormats, f = s[o.unit] || s.millisecond, m = this._tickFormatFunction(a, 0, r2(this, [
      a
    ], this._majorUnit), f), y = this._getLabelSize(m), b = Math.floor(this.isHorizontal() ? this.width / y.w : this.height / y.h) - 1;
    return b > 0 ? b : 1;
    let a = this._cache.data || [], o, s;
    if (a.length)
      return a;
    const f = this.getMatchingVisibleMetas();
    if (this._normalized && f.length)
      return this._cache.data = f[0].controller.getAllParsedValues(this);
    for (o = 0, s = f.length; o < s; ++o)
      a = a.concat(f[o].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(a);
    const a = this._cache.labels || [];
    let o, s;
    if (a.length)
      return a;
    const f = this.getLabels();
    for (o = 0, s = f.length; o < s; ++o)
      a.push(u2(this, f[o]));
    return this._cache.labels = this._normalized ? a : this.normalize(a);
  normalize(a) {
    return kM(a.sort(o2));
function iv(u, a, o) {
  let s = 0, f = u.length - 1, m, y, b, S;
  o ? (a >= u[s].pos && a <= u[f].pos && ({ lo: s, hi: f } = Zf(u, "pos", a)), { pos: m, time: b } = u[s], { pos: y, time: S } = u[f]) : (a >= u[s].time && a <= u[f].time && ({ lo: s, hi: f } = Zf(u, "time", a)), { time: m, pos: b } = u[s], { time: y, pos: S } = u[f]);
  const _ = y - m;
  return _ ? b + (S - b) * (a - m) / _ : b;
class XC extends dS {
  static defaults = dS.defaults;
  constructor(a) {
    super(a), this._table = [], this._minPos = void 0, this._tableRange = void 0;
    const a = this._getTimestampsForTable(), o = this._table = this.buildLookupTable(a);
    this._minPos = iv(o, this.min), this._tableRange = iv(o, this.max) - this._minPos, super.initOffsets(a);
  }
  buildLookupTable(a) {
    const { min: o, max: s } = this, f = [], m = [];
    let y, b, S, _, E;
    for (y = 0, b = a.length; y < b; ++y)
      _ = a[y], _ >= o && _ <= s && f.push(_);
    if (f.length < 2)
          time: o,
          time: s,
    for (y = 0, b = f.length; y < b; ++y)
      E = f[y + 1], S = f[y - 1], _ = f[y], Math.round((E + S) / 2) !== _ && m.push({
        time: _,
        pos: y / (b - 1)
    return m;
    const a = this.min, o = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(a) || !s.length) && s.splice(0, 0, a), (!s.includes(o) || s.length === 1) && s.push(o), s.sort((f, m) => f - m);
    let a = this._cache.all || [];
    if (a.length)
      return a;
    const o = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return o.length && s.length ? a = this.normalize(o.concat(s)) : a = o.length ? o : s, a = this._cache.all = a, a;
  getDecimalForValue(a) {
    return (iv(this._table, a) - this._minPos) / this._tableRange;
  getValueForPixel(a) {
    const o = this._offsets, s = this.getDecimalForPixel(a) / o.factor - o.end;
    return iv(this._table, s * this._tableRange + this._minPos, !0);
const iE = 6048e5, lw = 864e5, Ky = 6e4, $y = 36e5, iw = 1e3, f2 = Symbol.for("constructDateFrom");
function mn(u, a) {
  return typeof u == "function" ? u(a) : u && typeof u == "object" && f2 in u ? u[f2](a) : u instanceof Date ? new u.constructor(a) : new Date(a);
function ee(u, a) {
  return mn(a || u, u);
function Ev(u, a, o) {
  const s = ee(u, o?.in);
  return isNaN(a) ? mn(o?.in || u, NaN) : (a && s.setDate(s.getDate() + a), s);
function zS(u, a, o) {
  const s = ee(u, o?.in);
  if (isNaN(a)) return mn(u, NaN);
  if (!a)
    return s;
  const f = s.getDate(), m = mn(u, s.getTime());
  m.setMonth(s.getMonth() + a + 1, 0);
  const y = m.getDate();
  return f >= y ? m : (s.setFullYear(
    m.getFullYear(),
    m.getMonth(),
    f
  ), s);
}
function CS(u, a, o) {
  return mn(u, +ee(u) + a);
}
function ow(u, a, o) {
  return CS(u, a * $y);
}
let uw = {};
function Wf() {
  return uw;
}
function bu(u, a) {
  const o = Wf(), s = a?.weekStartsOn ?? a?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, f = ee(u, a?.in), m = f.getDay(), y = (m < s ? 7 : 0) + m - s;
  return f.setDate(f.getDate() - y), f.setHours(0, 0, 0, 0), f;
}
function Dm(u, a) {
  return bu(u, { ...a, weekStartsOn: 1 });
}
function oE(u, a) {
  const o = ee(u, a?.in), s = o.getFullYear(), f = mn(o, 0);
  f.setFullYear(s + 1, 0, 4), f.setHours(0, 0, 0, 0);
  const m = Dm(f), y = mn(o, 0);
  y.setFullYear(s, 0, 4), y.setHours(0, 0, 0, 0);
  const b = Dm(y);
  return o.getTime() >= m.getTime() ? s + 1 : o.getTime() >= b.getTime() ? s : s - 1;
}
function yv(u) {
  const a = ee(u), o = new Date(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes(),
      a.getSeconds(),
      a.getMilliseconds()
  return o.setUTCFullYear(a.getFullYear()), +u - +o;
function Ff(u, ...a) {
  const o = mn.bind(
    a.find((s) => typeof s == "object")
  return a.map(o);
}
function hS(u, a) {
  const o = ee(u, a?.in);
  return o.setHours(0, 0, 0, 0), o;
}
function uE(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  ), m = hS(s), y = hS(f), b = +m - yv(m), S = +y - yv(y);
  return Math.round((b - S) / lw);
}
function sw(u, a) {
  const o = oE(u, a), s = mn(u, 0);
  return s.setFullYear(o, 0, 4), s.setHours(0, 0, 0, 0), Dm(s);
}
function cw(u, a, o) {
  const s = ee(u, o?.in);
  return s.setTime(s.getTime() + a * Ky), s;
}
function rw(u, a, o) {
  return zS(u, a * 3, o);
}
function fw(u, a, o) {
  return CS(u, a * 1e3);
}
function dw(u, a, o) {
  return Ev(u, a * 7, o);
}
function hw(u, a, o) {
  return zS(u, a * 12, o);
}
function Ly(u, a) {
  const o = +ee(u) - +ee(a);
  return o < 0 ? -1 : o > 0 ? 1 : o;
}
function mw(u) {
  return u instanceof Date || typeof u == "object" && Object.prototype.toString.call(u) === "[object Date]";
}
function sE(u) {
  return !(!mw(u) && typeof u != "number" || isNaN(+ee(u)));
}
function gw(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  ), m = s.getFullYear() - f.getFullYear(), y = s.getMonth() - f.getMonth();
  return m * 12 + y;
}
function pw(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  return s.getFullYear() - f.getFullYear();
}
function cE(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  ), m = d2(s, f), y = Math.abs(
    uE(s, f)
  s.setDate(s.getDate() - m * y);
  const b = +(d2(s, f) === -m), S = m * (y - b);
  return S === 0 ? 0 : S;
}
function d2(u, a) {
  const o = u.getFullYear() - a.getFullYear() || u.getMonth() - a.getMonth() || u.getDate() - a.getDate() || u.getHours() - a.getHours() || u.getMinutes() - a.getMinutes() || u.getSeconds() - a.getSeconds() || u.getMilliseconds() - a.getMilliseconds();
  return o < 0 ? -1 : o > 0 ? 1 : o;
}
function Jy(u) {
  return (a) => {
    const s = (u ? Math[u] : Math.trunc)(a);
    return s === 0 ? 0 : s;
function yw(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  ), m = (+s - +f) / $y;
  return Jy(o?.roundingMethod)(m);
}
function HS(u, a) {
  return +ee(u) - +ee(a);
}
function bw(u, a, o) {
  const s = HS(u, a) / Ky;
  return Jy(o?.roundingMethod)(s);
}
function rE(u, a) {
  const o = ee(u, a?.in);
  return o.setHours(23, 59, 59, 999), o;
}
function fE(u, a) {
  const o = ee(u, a?.in), s = o.getMonth();
  return o.setFullYear(o.getFullYear(), s + 1, 0), o.setHours(23, 59, 59, 999), o;
}
function vw(u, a) {
  const o = ee(u, a?.in);
  return +rE(o, a) == +fE(o, a);
}
function dE(u, a, o) {
  const [s, f, m] = Ff(
    o?.in,
    u,
    u,
    a
  ), y = Ly(f, m), b = Math.abs(
    gw(f, m)
  if (b < 1) return 0;
  f.getMonth() === 1 && f.getDate() > 27 && f.setDate(30), f.setMonth(f.getMonth() - y * b);
  let S = Ly(f, m) === -y;
  vw(s) && b === 1 && Ly(s, m) === 1 && (S = !1);
  const _ = y * (b - +S);
  return _ === 0 ? 0 : _;
}
function Sw(u, a, o) {
  const s = dE(u, a, o) / 3;
  return Jy(o?.roundingMethod)(s);
}
function Tw(u, a, o) {
  const s = HS(u, a) / 1e3;
  return Jy(o?.roundingMethod)(s);
}
function _w(u, a, o) {
  const s = cE(u, a, o) / 7;
  return Jy(o?.roundingMethod)(s);
}
function xw(u, a, o) {
  const [s, f] = Ff(
    o?.in,
    u,
    a
  ), m = Ly(s, f), y = Math.abs(pw(s, f));
  s.setFullYear(1584), f.setFullYear(1584);
  const b = Ly(s, f) === -m, S = m * (y - +b);
  return S === 0 ? 0 : S;
}
function Ew(u, a) {
  const o = ee(u, a?.in), s = o.getMonth(), f = s - s % 3;
  return o.setMonth(f, 1), o.setHours(0, 0, 0, 0), o;
}
function Ow(u, a) {
  const o = ee(u, a?.in);
  return o.setDate(1), o.setHours(0, 0, 0, 0), o;
}
function Mw(u, a) {
  const o = ee(u, a?.in), s = o.getFullYear();
  return o.setFullYear(s + 1, 0, 0), o.setHours(23, 59, 59, 999), o;
}
function hE(u, a) {
  const o = ee(u, a?.in);
  return o.setFullYear(o.getFullYear(), 0, 1), o.setHours(0, 0, 0, 0), o;
}
function Dw(u, a) {
  const o = ee(u, a?.in);
  return o.setMinutes(59, 59, 999), o;
}
function Aw(u, a) {
  const o = Wf(), s = o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, f = ee(u, a?.in), m = f.getDay(), y = (m < s ? -7 : 0) + 6 - (m - s);
  return f.setDate(f.getDate() + y), f.setHours(23, 59, 59, 999), f;
}
function Rw(u, a) {
  const o = ee(u, a?.in);
  return o.setSeconds(59, 999), o;
}
function ww(u, a) {
  const o = ee(u, a?.in), s = o.getMonth(), f = s - s % 3 + 3;
  return o.setMonth(f, 0), o.setHours(23, 59, 59, 999), o;
}
function zw(u, a) {
  const o = ee(u, a?.in);
  return o.setMilliseconds(999), o;
}
const Cw = {
}, Hw = (u, a, o) => {
  let s;
  const f = Cw[u];
  return typeof f == "string" ? s = f : a === 1 ? s = f.one : s = f.other.replace("{{count}}", a.toString()), o?.addSuffix ? o.comparison && o.comparison > 0 ? "in " + s : s + " ago" : s;
function nS(u) {
  return (a = {}) => {
    const o = a.width ? String(a.width) : u.defaultWidth;
    return u.formats[o] || u.formats[u.defaultWidth];
const Uw = {
}, Nw = {
}, kw = {
}, Bw = {
  date: nS({
    formats: Uw,
  time: nS({
    formats: Nw,
  dateTime: nS({
    formats: kw,
}, Lw = {
}, Yw = (u, a, o, s) => Lw[u];
function Dy(u) {
  return (a, o) => {
    const s = o?.context ? String(o.context) : "standalone";
    let f;
    if (s === "formatting" && u.formattingValues) {
      const y = u.defaultFormattingWidth || u.defaultWidth, b = o?.width ? String(o.width) : y;
      f = u.formattingValues[b] || u.formattingValues[y];
      const y = u.defaultWidth, b = o?.width ? String(o.width) : u.defaultWidth;
      f = u.values[b] || u.values[y];
    const m = u.argumentCallback ? u.argumentCallback(a) : a;
    return f[m];
const jw = {
}, qw = {
}, Vw = {
}, Gw = {
}, Xw = {
}, Qw = {
}, Zw = (u, a) => {
  const o = Number(u), s = o % 100;
  if (s > 20 || s < 10)
    switch (s % 10) {
        return o + "st";
        return o + "nd";
        return o + "rd";
  return o + "th";
}, Kw = {
  ordinalNumber: Zw,
  era: Dy({
    values: jw,
  quarter: Dy({
    values: qw,
    argumentCallback: (u) => u - 1
  month: Dy({
    values: Vw,
  day: Dy({
    values: Gw,
  dayPeriod: Dy({
    values: Xw,
    formattingValues: Qw,
function Ay(u) {
  return (a, o = {}) => {
    const s = o.width, f = s && u.matchPatterns[s] || u.matchPatterns[u.defaultMatchWidth], m = a.match(f);
    if (!m)
    const y = m[0], b = s && u.parsePatterns[s] || u.parsePatterns[u.defaultParseWidth], S = Array.isArray(b) ? Jw(b, (D) => D.test(y)) : (
      $w(b, (D) => D.test(y))
    let _;
    _ = u.valueCallback ? u.valueCallback(S) : S, _ = o.valueCallback ? (
      o.valueCallback(_)
    ) : _;
    const E = a.slice(y.length);
    return { value: _, rest: E };
function $w(u, a) {
  for (const o in u)
    if (Object.prototype.hasOwnProperty.call(u, o) && a(u[o]))
      return o;
function Jw(u, a) {
  for (let o = 0; o < u.length; o++)
    if (a(u[o]))
      return o;
function Ww(u) {
  return (a, o = {}) => {
    const s = a.match(u.matchPattern);
    if (!s) return null;
    const f = s[0], m = a.match(u.parsePattern);
    if (!m) return null;
    let y = u.valueCallback ? u.valueCallback(m[0]) : m[0];
    y = o.valueCallback ? o.valueCallback(y) : y;
    const b = a.slice(f.length);
    return { value: y, rest: b };
const Fw = /^(\d+)(th|st|nd|rd)?/i, Pw = /\d+/i, Iw = {
}, tz = {
}, ez = {
}, nz = {
}, az = {
}, lz = {
}, iz = {
}, oz = {
}, uz = {
}, sz = {
}, cz = {
  ordinalNumber: Ww({
    matchPattern: Fw,
    parsePattern: Pw,
    valueCallback: (u) => parseInt(u, 10)
  era: Ay({
    matchPatterns: Iw,
    parsePatterns: tz,
  quarter: Ay({
    matchPatterns: ez,
    parsePatterns: nz,
    valueCallback: (u) => u + 1
  month: Ay({
    matchPatterns: az,
    parsePatterns: lz,
  day: Ay({
    matchPatterns: iz,
    parsePatterns: oz,
  dayPeriod: Ay({
    matchPatterns: uz,
    parsePatterns: sz,
}, mE = {
  formatDistance: Hw,
  formatLong: Bw,
  formatRelative: Yw,
  localize: Kw,
  match: cz,
function rz(u, a) {
  const o = ee(u, a?.in);
  return uE(o, hE(o)) + 1;
}
function gE(u, a) {
  const o = ee(u, a?.in), s = +Dm(o) - +sw(o);
  return Math.round(s / iE) + 1;
}
function US(u, a) {
  const o = ee(u, a?.in), s = o.getFullYear(), f = Wf(), m = a?.firstWeekContainsDate ?? a?.locale?.options?.firstWeekContainsDate ?? f.firstWeekContainsDate ?? f.locale?.options?.firstWeekContainsDate ?? 1, y = mn(a?.in || u, 0);
  y.setFullYear(s + 1, 0, m), y.setHours(0, 0, 0, 0);
  const b = bu(y, a), S = mn(a?.in || u, 0);
  S.setFullYear(s, 0, m), S.setHours(0, 0, 0, 0);
  const _ = bu(S, a);
  return +o >= +b ? s + 1 : +o >= +_ ? s : s - 1;
}
function fz(u, a) {
  const o = Wf(), s = a?.firstWeekContainsDate ?? a?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, f = US(u, a), m = mn(a?.in || u, 0);
  return m.setFullYear(f, 0, s), m.setHours(0, 0, 0, 0), bu(m, a);
}
function pE(u, a) {
  const o = ee(u, a?.in), s = +bu(o, a) - +fz(o, a);
  return Math.round(s / iE) + 1;
}
function ke(u, a) {
  const o = u < 0 ? "-" : "", s = Math.abs(u).toString().padStart(a, "0");
  return o + s;
}
const Kc = {
  y(u, a) {
    const o = u.getFullYear(), s = o > 0 ? o : 1 - o;
    return ke(a === "yy" ? s % 100 : s, a.length);
  M(u, a) {
    const o = u.getMonth();
    return a === "M" ? String(o + 1) : ke(o + 1, 2);
  d(u, a) {
    return ke(u.getDate(), a.length);
  a(u, a) {
    const o = u.getHours() / 12 >= 1 ? "pm" : "am";
    switch (a) {
        return o.toUpperCase();
        return o;
        return o[0];
        return o === "am" ? "a.m." : "p.m.";
  h(u, a) {
    return ke(u.getHours() % 12 || 12, a.length);
  H(u, a) {
    return ke(u.getHours(), a.length);
  m(u, a) {
    return ke(u.getMinutes(), a.length);
  s(u, a) {
    return ke(u.getSeconds(), a.length);
  S(u, a) {
    const o = a.length, s = u.getMilliseconds(), f = Math.trunc(
      s * Math.pow(10, o - 3)
    return ke(f, a.length);
}, xm = {
}, h2 = {
  G: function(u, a, o) {
    const s = u.getFullYear() > 0 ? 1 : 0;
    switch (a) {
        return o.era(s, { width: "abbreviated" });
        return o.era(s, { width: "narrow" });
        return o.era(s, { width: "wide" });
  y: function(u, a, o) {
    if (a === "yo") {
      const s = u.getFullYear(), f = s > 0 ? s : 1 - s;
      return o.ordinalNumber(f, { unit: "year" });
    return Kc.y(u, a);
  Y: function(u, a, o, s) {
    const f = US(u, s), m = f > 0 ? f : 1 - f;
    if (a === "YY") {
      const y = m % 100;
      return ke(y, 2);
    return a === "Yo" ? o.ordinalNumber(m, { unit: "year" }) : ke(m, a.length);
  R: function(u, a) {
    const o = oE(u);
    return ke(o, a.length);
  u: function(u, a) {
    const o = u.getFullYear();
    return ke(o, a.length);
  Q: function(u, a, o) {
    const s = Math.ceil((u.getMonth() + 1) / 3);
    switch (a) {
        return String(s);
        return ke(s, 2);
        return o.ordinalNumber(s, { unit: "quarter" });
        return o.quarter(s, {
        return o.quarter(s, {
        return o.quarter(s, {
  q: function(u, a, o) {
    const s = Math.ceil((u.getMonth() + 1) / 3);
    switch (a) {
        return String(s);
        return ke(s, 2);
        return o.ordinalNumber(s, { unit: "quarter" });
        return o.quarter(s, {
        return o.quarter(s, {
        return o.quarter(s, {
  M: function(u, a, o) {
    const s = u.getMonth();
    switch (a) {
        return Kc.M(u, a);
        return o.ordinalNumber(s + 1, { unit: "month" });
        return o.month(s, {
        return o.month(s, {
        return o.month(s, { width: "wide", context: "formatting" });
  L: function(u, a, o) {
    const s = u.getMonth();
    switch (a) {
        return String(s + 1);
        return ke(s + 1, 2);
        return o.ordinalNumber(s + 1, { unit: "month" });
        return o.month(s, {
        return o.month(s, {
        return o.month(s, { width: "wide", context: "standalone" });
  w: function(u, a, o, s) {
    const f = pE(u, s);
    return a === "wo" ? o.ordinalNumber(f, { unit: "week" }) : ke(f, a.length);
  I: function(u, a, o) {
    const s = gE(u);
    return a === "Io" ? o.ordinalNumber(s, { unit: "week" }) : ke(s, a.length);
  d: function(u, a, o) {
    return a === "do" ? o.ordinalNumber(u.getDate(), { unit: "date" }) : Kc.d(u, a);
  D: function(u, a, o) {
    const s = rz(u);
    return a === "Do" ? o.ordinalNumber(s, { unit: "dayOfYear" }) : ke(s, a.length);
  E: function(u, a, o) {
    const s = u.getDay();
    switch (a) {
        return o.day(s, {
        return o.day(s, {
        return o.day(s, {
        return o.day(s, {
  e: function(u, a, o, s) {
    const f = u.getDay(), m = (f - s.weekStartsOn + 8) % 7 || 7;
    switch (a) {
        return String(m);
        return ke(m, 2);
        return o.ordinalNumber(m, { unit: "day" });
        return o.day(f, {
        return o.day(f, {
        return o.day(f, {
        return o.day(f, {
  c: function(u, a, o, s) {
    const f = u.getDay(), m = (f - s.weekStartsOn + 8) % 7 || 7;
    switch (a) {
        return String(m);
        return ke(m, a.length);
        return o.ordinalNumber(m, { unit: "day" });
        return o.day(f, {
        return o.day(f, {
        return o.day(f, {
        return o.day(f, {
  i: function(u, a, o) {
    const s = u.getDay(), f = s === 0 ? 7 : s;
    switch (a) {
        return String(f);
        return ke(f, a.length);
        return o.ordinalNumber(f, { unit: "day" });
        return o.day(s, {
        return o.day(s, {
        return o.day(s, {
        return o.day(s, {
  a: function(u, a, o) {
    const f = u.getHours() / 12 >= 1 ? "pm" : "am";
    switch (a) {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
  b: function(u, a, o) {
    const s = u.getHours();
    let f;
    switch (s === 12 ? f = xm.noon : s === 0 ? f = xm.midnight : f = s / 12 >= 1 ? "pm" : "am", a) {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
  B: function(u, a, o) {
    const s = u.getHours();
    let f;
    switch (s >= 17 ? f = xm.evening : s >= 12 ? f = xm.afternoon : s >= 4 ? f = xm.morning : f = xm.night, a) {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
        return o.dayPeriod(f, {
  h: function(u, a, o) {
    if (a === "ho") {
      let s = u.getHours() % 12;
      return s === 0 && (s = 12), o.ordinalNumber(s, { unit: "hour" });
    return Kc.h(u, a);
  H: function(u, a, o) {
    return a === "Ho" ? o.ordinalNumber(u.getHours(), { unit: "hour" }) : Kc.H(u, a);
  K: function(u, a, o) {
    const s = u.getHours() % 12;
    return a === "Ko" ? o.ordinalNumber(s, { unit: "hour" }) : ke(s, a.length);
  k: function(u, a, o) {
    let s = u.getHours();
    return s === 0 && (s = 24), a === "ko" ? o.ordinalNumber(s, { unit: "hour" }) : ke(s, a.length);
  m: function(u, a, o) {
    return a === "mo" ? o.ordinalNumber(u.getMinutes(), { unit: "minute" }) : Kc.m(u, a);
  s: function(u, a, o) {
    return a === "so" ? o.ordinalNumber(u.getSeconds(), { unit: "second" }) : Kc.s(u, a);
  S: function(u, a) {
    return Kc.S(u, a);
  X: function(u, a, o) {
    const s = u.getTimezoneOffset();
    if (s === 0)
    switch (a) {
        return g2(s);
        return Xf(s);
        return Xf(s, ":");
  x: function(u, a, o) {
    const s = u.getTimezoneOffset();
    switch (a) {
        return g2(s);
        return Xf(s);
        return Xf(s, ":");
  O: function(u, a, o) {
    const s = u.getTimezoneOffset();
    switch (a) {
        return "GMT" + m2(s, ":");
        return "GMT" + Xf(s, ":");
  z: function(u, a, o) {
    const s = u.getTimezoneOffset();
    switch (a) {
        return "GMT" + m2(s, ":");
        return "GMT" + Xf(s, ":");
  t: function(u, a, o) {
    const s = Math.trunc(+u / 1e3);
    return ke(s, a.length);
  T: function(u, a, o) {
    return ke(+u, a.length);
function m2(u, a = "") {
  const o = u > 0 ? "-" : "+", s = Math.abs(u), f = Math.trunc(s / 60), m = s % 60;
  return m === 0 ? o + String(f) : o + String(f) + a + ke(m, 2);
function g2(u, a) {
  return u % 60 === 0 ? (u > 0 ? "-" : "+") + ke(Math.abs(u) / 60, 2) : Xf(u, a);
function Xf(u, a = "") {
  const o = u > 0 ? "-" : "+", s = Math.abs(u), f = ke(Math.trunc(s / 60), 2), m = ke(s % 60, 2);
  return o + f + a + m;
const p2 = (u, a) => {
  switch (u) {
      return a.date({ width: "short" });
      return a.date({ width: "medium" });
      return a.date({ width: "long" });
      return a.date({ width: "full" });
}, yE = (u, a) => {
  switch (u) {
      return a.time({ width: "short" });
      return a.time({ width: "medium" });
      return a.time({ width: "long" });
      return a.time({ width: "full" });
}, dz = (u, a) => {
  const o = u.match(/(P+)(p+)?/) || [], s = o[1], f = o[2];
  if (!f)
    return p2(u, a);
  let m;
  switch (s) {
      m = a.dateTime({ width: "short" });
      m = a.dateTime({ width: "medium" });
      m = a.dateTime({ width: "long" });
      m = a.dateTime({ width: "full" });
  return m.replace("{{date}}", p2(s, a)).replace("{{time}}", yE(f, a));
}, mS = {
  p: yE,
  P: dz
}, hz = /^D+$/, mz = /^Y+$/, gz = ["D", "DD", "YY", "YYYY"];
function bE(u) {
  return hz.test(u);
}
function vE(u) {
  return mz.test(u);
}
function gS(u, a, o) {
  const s = pz(u, a, o);
  if (console.warn(s), gz.includes(u)) throw new RangeError(s);
}
function pz(u, a, o) {
  const s = u[0] === "Y" ? "years" : "days of the month";
  return `Use \`${u.toLowerCase()}\` instead of \`${u}\` (in \`${a}\`) for formatting ${s} to the input \`${o}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const yz = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, bz = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, vz = /^'([^]*?)'?$/, Sz = /''/g, Tz = /[a-zA-Z]/;
function _z(u, a, o) {
  const s = Wf(), f = o?.locale ?? s.locale ?? mE, m = o?.firstWeekContainsDate ?? o?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, y = o?.weekStartsOn ?? o?.locale?.options?.weekStartsOn ?? s.weekStartsOn ?? s.locale?.options?.weekStartsOn ?? 0, b = ee(u, o?.in);
  if (!sE(b))
  let S = a.match(bz).map((E) => {
    const D = E[0];
    if (D === "p" || D === "P") {
      const M = mS[D];
      return M(E, f.formatLong);
    }
    return E;
  }).join("").match(yz).map((E) => {
    if (E === "''")
    const D = E[0];
    if (D === "'")
      return { isToken: !1, value: xz(E) };
    if (h2[D])
      return { isToken: !0, value: E };
    if (D.match(Tz))
        "Format string contains an unescaped latin alphabet character `" + D + "`"
    return { isToken: !1, value: E };
  f.localize.preprocessor && (S = f.localize.preprocessor(b, S));
  const _ = {
    firstWeekContainsDate: m,
    weekStartsOn: y,
    locale: f
  return S.map((E) => {
    if (!E.isToken) return E.value;
    const D = E.value;
    (!o?.useAdditionalWeekYearTokens && vE(D) || !o?.useAdditionalDayOfYearTokens && bE(D)) && gS(D, a, String(u));
    const M = h2[D[0]];
    return M(b, D, f.localize, _);
function xz(u) {
  const a = u.match(vz);
  return a ? a[1].replace(Sz, "'") : u;
function Ez() {
  return Object.assign({}, Wf());
function Oz(u, a) {
  const o = ee(u, a?.in).getDay();
  return o === 0 ? 7 : o;
function Mz(u, a) {
  const o = Dz(a) ? new a(0) : mn(a, 0);
  return o.setFullYear(u.getFullYear(), u.getMonth(), u.getDate()), o.setHours(
    u.getHours(),
    u.getMinutes(),
    u.getSeconds(),
    u.getMilliseconds()
  ), o;
function Dz(u) {
  return typeof u == "function" && u.prototype?.constructor === u;
const Az = 10;
class SE {
  validate(a, o) {
class Rz extends SE {
  constructor(a, o, s, f, m) {
    super(), this.value = a, this.validateValue = o, this.setValue = s, this.priority = f, m && (this.subPriority = m);
  validate(a, o) {
    return this.validateValue(a, this.value, o);
  set(a, o, s) {
    return this.setValue(a, o, this.value, s);
class wz extends SE {
  priority = Az;
  constructor(a, o) {
    super(), this.context = a || ((s) => mn(o, s));
  set(a, o) {
    return o.timestampIsSet ? a : mn(a, Mz(a, this.context));
class ze {
  run(a, o, s, f) {
    const m = this.parse(a, o, s, f);
    return m ? {
      setter: new Rz(
        m.value,
      rest: m.rest
  validate(a, o, s) {
class zz extends ze {
  parse(a, o, s) {
    switch (o) {
        return s.era(a, { width: "abbreviated" }) || s.era(a, { width: "narrow" });
        return s.era(a, { width: "narrow" });
        return s.era(a, { width: "wide" }) || s.era(a, { width: "abbreviated" }) || s.era(a, { width: "narrow" });
  set(a, o, s) {
    return o.era = s, a.setFullYear(s, 0, 1), a.setHours(0, 0, 0, 0), a;
const Mn = {
}, mu = {
function Dn(u, a) {
  return u && {
    value: a(u.value),
    rest: u.rest
function sn(u, a) {
  const o = a.match(u);
  return o ? {
    value: parseInt(o[0], 10),
    rest: a.slice(o[0].length)
function gu(u, a) {
  const o = a.match(u);
  if (!o)
  if (o[0] === "Z")
      rest: a.slice(1)
  const s = o[1] === "+" ? 1 : -1, f = o[2] ? parseInt(o[2], 10) : 0, m = o[3] ? parseInt(o[3], 10) : 0, y = o[5] ? parseInt(o[5], 10) : 0;
    value: s * (f * $y + m * Ky + y * iw),
    rest: a.slice(o[0].length)
function TE(u) {
  return sn(Mn.anyDigitsSigned, u);
function gn(u, a) {
  switch (u) {
      return sn(Mn.singleDigit, a);
      return sn(Mn.twoDigits, a);
      return sn(Mn.threeDigits, a);
      return sn(Mn.fourDigits, a);
      return sn(new RegExp("^\\d{1," + u + "}"), a);
function bv(u, a) {
  switch (u) {
      return sn(Mn.singleDigitSigned, a);
      return sn(Mn.twoDigitsSigned, a);
      return sn(Mn.threeDigitsSigned, a);
      return sn(Mn.fourDigitsSigned, a);
      return sn(new RegExp("^-?\\d{1," + u + "}"), a);
function NS(u) {
  switch (u) {
function _E(u, a) {
  const o = a > 0, s = o ? a : 1 - a;
  let f;
  if (s <= 50)
    f = u || 100;
    const m = s + 50, y = Math.trunc(m / 100) * 100, b = u >= m % 100;
    f = u + y - (b ? 100 : 0);
  return o ? f : 1 - f;
function xE(u) {
  return u % 400 === 0 || u % 4 === 0 && u % 100 !== 0;
class Cz extends ze {
  parse(a, o, s) {
    const f = (m) => ({
      year: m,
      isTwoDigitYear: o === "yy"
    switch (o) {
        return Dn(gn(4, a), f);
        return Dn(
          s.ordinalNumber(a, {
          f
        return Dn(gn(o.length, a), f);
  validate(a, o) {
    return o.isTwoDigitYear || o.year > 0;
  set(a, o, s) {
    const f = a.getFullYear();
    if (s.isTwoDigitYear) {
      const y = _E(
        s.year,
        f
      return a.setFullYear(y, 0, 1), a.setHours(0, 0, 0, 0), a;
    const m = !("era" in o) || o.era === 1 ? s.year : 1 - s.year;
    return a.setFullYear(m, 0, 1), a.setHours(0, 0, 0, 0), a;
class Hz extends ze {
  parse(a, o, s) {
    const f = (m) => ({
      year: m,
      isTwoDigitYear: o === "YY"
    switch (o) {
        return Dn(gn(4, a), f);
        return Dn(
          s.ordinalNumber(a, {
          f
        return Dn(gn(o.length, a), f);
  validate(a, o) {
    return o.isTwoDigitYear || o.year > 0;
  set(a, o, s, f) {
    const m = US(a, f);
    if (s.isTwoDigitYear) {
      const b = _E(
        s.year,
        m
      return a.setFullYear(
        b,
        f.firstWeekContainsDate
      ), a.setHours(0, 0, 0, 0), bu(a, f);
    const y = !("era" in o) || o.era === 1 ? s.year : 1 - s.year;
    return a.setFullYear(y, 0, f.firstWeekContainsDate), a.setHours(0, 0, 0, 0), bu(a, f);
class Uz extends ze {
  parse(a, o) {
    return bv(o === "R" ? 4 : o.length, a);
  set(a, o, s) {
    const f = mn(a, 0);
    return f.setFullYear(s, 0, 4), f.setHours(0, 0, 0, 0), Dm(f);
class Nz extends ze {
  parse(a, o) {
    return bv(o === "u" ? 4 : o.length, a);
  set(a, o, s) {
    return a.setFullYear(s, 0, 1), a.setHours(0, 0, 0, 0), a;
class kz extends ze {
  parse(a, o, s) {
    switch (o) {
        return gn(o.length, a);
        return s.ordinalNumber(a, { unit: "quarter" });
        return s.quarter(a, {
        }) || s.quarter(a, {
        return s.quarter(a, {
        return s.quarter(a, {
        }) || s.quarter(a, {
        }) || s.quarter(a, {
  validate(a, o) {
    return o >= 1 && o <= 4;
  set(a, o, s) {
    return a.setMonth((s - 1) * 3, 1), a.setHours(0, 0, 0, 0), a;
class Bz extends ze {
  parse(a, o, s) {
    switch (o) {
        return gn(o.length, a);
        return s.ordinalNumber(a, { unit: "quarter" });
        return s.quarter(a, {
        }) || s.quarter(a, {
        return s.quarter(a, {
        return s.quarter(a, {
        }) || s.quarter(a, {
        }) || s.quarter(a, {
  validate(a, o) {
    return o >= 1 && o <= 4;
  set(a, o, s) {
    return a.setMonth((s - 1) * 3, 1), a.setHours(0, 0, 0, 0), a;
class Lz extends ze {
  parse(a, o, s) {
    const f = (m) => m - 1;
    switch (o) {
        return Dn(
          sn(Mn.month, a),
          f
        return Dn(gn(2, a), f);
        return Dn(
          s.ordinalNumber(a, {
          f
        return s.month(a, {
        }) || s.month(a, { width: "narrow", context: "formatting" });
        return s.month(a, {
        return s.month(a, { width: "wide", context: "formatting" }) || s.month(a, {
        }) || s.month(a, { width: "narrow", context: "formatting" });
  validate(a, o) {
    return o >= 0 && o <= 11;
  set(a, o, s) {
    return a.setMonth(s, 1), a.setHours(0, 0, 0, 0), a;
class Yz extends ze {
  parse(a, o, s) {
    const f = (m) => m - 1;
    switch (o) {
        return Dn(
          sn(Mn.month, a),
          f
        return Dn(gn(2, a), f);
        return Dn(
          s.ordinalNumber(a, {
          f
        return s.month(a, {
        }) || s.month(a, { width: "narrow", context: "standalone" });
        return s.month(a, {
        return s.month(a, { width: "wide", context: "standalone" }) || s.month(a, {
        }) || s.month(a, { width: "narrow", context: "standalone" });
  validate(a, o) {
    return o >= 0 && o <= 11;
  set(a, o, s) {
    return a.setMonth(s, 1), a.setHours(0, 0, 0, 0), a;
function jz(u, a, o) {
  const s = ee(u, o?.in), f = pE(s, o) - a;
  return s.setDate(s.getDate() - f * 7), ee(s, o?.in);
class qz extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.week, a);
        return s.ordinalNumber(a, { unit: "week" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 1 && o <= 53;
  set(a, o, s, f) {
    return bu(jz(a, s, f), f);
function Vz(u, a, o) {
  const s = ee(u, o?.in), f = gE(s, o) - a;
  return s.setDate(s.getDate() - f * 7), s;
class Gz extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.week, a);
        return s.ordinalNumber(a, { unit: "week" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 1 && o <= 53;
  set(a, o, s) {
    return Dm(Vz(a, s));
const Xz = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Qz = [
class Zz extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.date, a);
        return s.ordinalNumber(a, { unit: "date" });
        return gn(o.length, a);
  validate(a, o) {
    const s = a.getFullYear(), f = xE(s), m = a.getMonth();
    return f ? o >= 1 && o <= Qz[m] : o >= 1 && o <= Xz[m];
  set(a, o, s) {
    return a.setDate(s), a.setHours(0, 0, 0, 0), a;
class Kz extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.dayOfYear, a);
        return s.ordinalNumber(a, { unit: "date" });
        return gn(o.length, a);
  validate(a, o) {
    const s = a.getFullYear();
    return xE(s) ? o >= 1 && o <= 366 : o >= 1 && o <= 365;
  set(a, o, s) {
    return a.setMonth(0, s), a.setHours(0, 0, 0, 0), a;
function kS(u, a, o) {
  const s = Wf(), f = o?.weekStartsOn ?? o?.locale?.options?.weekStartsOn ?? s.weekStartsOn ?? s.locale?.options?.weekStartsOn ?? 0, m = ee(u, o?.in), y = m.getDay(), S = (a % 7 + 7) % 7, _ = 7 - f, E = a < 0 || a > 6 ? a - (y + _) % 7 : (S + _) % 7 - (y + _) % 7;
  return Ev(m, E, o);
class $z extends ze {
  parse(a, o, s) {
    switch (o) {
        return s.day(a, {
        }) || s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
        return s.day(a, {
        return s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
        return s.day(a, { width: "wide", context: "formatting" }) || s.day(a, {
        }) || s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
  validate(a, o) {
    return o >= 0 && o <= 6;
  set(a, o, s, f) {
    return a = kS(a, s, f), a.setHours(0, 0, 0, 0), a;
class Jz extends ze {
  parse(a, o, s, f) {
    const m = (y) => {
      const b = Math.floor((y - 1) / 7) * 7;
      return (y + f.weekStartsOn + 6) % 7 + b;
    switch (o) {
        return Dn(gn(o.length, a), m);
        return Dn(
          s.ordinalNumber(a, {
          m
        return s.day(a, {
        }) || s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
        return s.day(a, {
        return s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
        return s.day(a, { width: "wide", context: "formatting" }) || s.day(a, {
        }) || s.day(a, { width: "short", context: "formatting" }) || s.day(a, { width: "narrow", context: "formatting" });
  validate(a, o) {
    return o >= 0 && o <= 6;
  set(a, o, s, f) {
    return a = kS(a, s, f), a.setHours(0, 0, 0, 0), a;
class Wz extends ze {
  parse(a, o, s, f) {
    const m = (y) => {
      const b = Math.floor((y - 1) / 7) * 7;
      return (y + f.weekStartsOn + 6) % 7 + b;
    switch (o) {
        return Dn(gn(o.length, a), m);
        return Dn(
          s.ordinalNumber(a, {
          m
        return s.day(a, {
        }) || s.day(a, { width: "short", context: "standalone" }) || s.day(a, { width: "narrow", context: "standalone" });
        return s.day(a, {
        return s.day(a, { width: "short", context: "standalone" }) || s.day(a, { width: "narrow", context: "standalone" });
        return s.day(a, { width: "wide", context: "standalone" }) || s.day(a, {
        }) || s.day(a, { width: "short", context: "standalone" }) || s.day(a, { width: "narrow", context: "standalone" });
  validate(a, o) {
    return o >= 0 && o <= 6;
  set(a, o, s, f) {
    return a = kS(a, s, f), a.setHours(0, 0, 0, 0), a;
function Fz(u, a, o) {
  const s = ee(u, o?.in), f = Oz(s, o), m = a - f;
  return Ev(s, m, o);
class Pz extends ze {
  parse(a, o, s) {
    const f = (m) => m === 0 ? 7 : m;
    switch (o) {
        return gn(o.length, a);
        return s.ordinalNumber(a, { unit: "day" });
        return Dn(
          s.day(a, {
          }) || s.day(a, {
          }) || s.day(a, {
          f
        return Dn(
          s.day(a, {
          f
        return Dn(
          s.day(a, {
          }) || s.day(a, {
          f
        return Dn(
          s.day(a, {
          }) || s.day(a, {
          }) || s.day(a, {
          }) || s.day(a, {
          f
  validate(a, o) {
    return o >= 1 && o <= 7;
  set(a, o, s) {
    return a = Fz(a, s), a.setHours(0, 0, 0, 0), a;
class Iz extends ze {
  parse(a, o, s) {
    switch (o) {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        return s.dayPeriod(a, {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
  set(a, o, s) {
    return a.setHours(NS(s), 0, 0, 0), a;
class tC extends ze {
  parse(a, o, s) {
    switch (o) {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        return s.dayPeriod(a, {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
  set(a, o, s) {
    return a.setHours(NS(s), 0, 0, 0), a;
class eC extends ze {
  parse(a, o, s) {
    switch (o) {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        return s.dayPeriod(a, {
        return s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
        }) || s.dayPeriod(a, {
  set(a, o, s) {
    return a.setHours(NS(s), 0, 0, 0), a;
class nC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.hour12h, a);
        return s.ordinalNumber(a, { unit: "hour" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 1 && o <= 12;
  set(a, o, s) {
    const f = a.getHours() >= 12;
    return f && s < 12 ? a.setHours(s + 12, 0, 0, 0) : !f && s === 12 ? a.setHours(0, 0, 0, 0) : a.setHours(s, 0, 0, 0), a;
class aC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.hour23h, a);
        return s.ordinalNumber(a, { unit: "hour" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 0 && o <= 23;
  set(a, o, s) {
    return a.setHours(s, 0, 0, 0), a;
class lC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.hour11h, a);
        return s.ordinalNumber(a, { unit: "hour" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 0 && o <= 11;
  set(a, o, s) {
    return a.getHours() >= 12 && s < 12 ? a.setHours(s + 12, 0, 0, 0) : a.setHours(s, 0, 0, 0), a;
class iC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.hour24h, a);
        return s.ordinalNumber(a, { unit: "hour" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 1 && o <= 24;
  set(a, o, s) {
    const f = s <= 24 ? s % 24 : s;
    return a.setHours(f, 0, 0, 0), a;
class oC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.minute, a);
        return s.ordinalNumber(a, { unit: "minute" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 0 && o <= 59;
  set(a, o, s) {
    return a.setMinutes(s, 0, 0), a;
class uC extends ze {
  parse(a, o, s) {
    switch (o) {
        return sn(Mn.second, a);
        return s.ordinalNumber(a, { unit: "second" });
        return gn(o.length, a);
  validate(a, o) {
    return o >= 0 && o <= 59;
  set(a, o, s) {
    return a.setSeconds(s, 0), a;
class sC extends ze {
  parse(a, o) {
    const s = (f) => Math.trunc(f * Math.pow(10, -o.length + 3));
    return Dn(gn(o.length, a), s);
  set(a, o, s) {
    return a.setMilliseconds(s), a;
class cC extends ze {
  parse(a, o) {
    switch (o) {
        return gu(
          mu.basicOptionalMinutes,
          a
        return gu(mu.basic, a);
        return gu(
          mu.basicOptionalSeconds,
          a
        return gu(
          mu.extendedOptionalSeconds,
          a
        return gu(mu.extended, a);
  set(a, o, s) {
    return o.timestampIsSet ? a : mn(
      a,
      a.getTime() - yv(a) - s
class rC extends ze {
  parse(a, o) {
    switch (o) {
        return gu(
          mu.basicOptionalMinutes,
          a
        return gu(mu.basic, a);
        return gu(
          mu.basicOptionalSeconds,
          a
        return gu(
          mu.extendedOptionalSeconds,
          a
        return gu(mu.extended, a);
  set(a, o, s) {
    return o.timestampIsSet ? a : mn(
      a,
      a.getTime() - yv(a) - s
class fC extends ze {
  parse(a) {
    return TE(a);
  set(a, o, s) {
    return [mn(a, s * 1e3), { timestampIsSet: !0 }];
class dC extends ze {
  parse(a) {
    return TE(a);
  set(a, o, s) {
    return [mn(a, s), { timestampIsSet: !0 }];
const hC = {
  G: new zz(),
  y: new Cz(),
  Y: new Hz(),
  R: new Uz(),
  u: new Nz(),
  Q: new kz(),
  q: new Bz(),
  M: new Lz(),
  L: new Yz(),
  w: new qz(),
  I: new Gz(),
  d: new Zz(),
  D: new Kz(),
  E: new $z(),
  e: new Jz(),
  c: new Wz(),
  i: new Pz(),
  a: new Iz(),
  b: new tC(),
  B: new eC(),
  h: new nC(),
  H: new aC(),
  K: new lC(),
  k: new iC(),
  m: new oC(),
  s: new uC(),
  S: new sC(),
  X: new cC(),
  x: new rC(),
  t: new fC(),
  T: new dC()
}, mC = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, gC = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, pC = /^'([^]*?)'?$/, yC = /''/g, bC = /\S/, vC = /[a-zA-Z]/;
function SC(u, a, o, s) {
  const f = () => mn(s?.in || o, NaN), m = Ez(), y = s?.locale ?? m.locale ?? mE, b = s?.firstWeekContainsDate ?? s?.locale?.options?.firstWeekContainsDate ?? m.firstWeekContainsDate ?? m.locale?.options?.firstWeekContainsDate ?? 1, S = s?.weekStartsOn ?? s?.locale?.options?.weekStartsOn ?? m.weekStartsOn ?? m.locale?.options?.weekStartsOn ?? 0;
  if (!a)
    return u ? f() : ee(o, s?.in);
  const _ = {
    firstWeekContainsDate: b,
    weekStartsOn: S,
    locale: y
  }, E = [new wz(s?.in, o)], D = a.match(gC).map((B) => {
    const Q = B[0];
    if (Q in mS) {
      const dt = mS[Q];
      return dt(B, y.formatLong);
    }
    return B;
  }).join("").match(mC), M = [];
  for (let B of D) {
    !s?.useAdditionalWeekYearTokens && vE(B) && gS(B, a, u), !s?.useAdditionalDayOfYearTokens && bE(B) && gS(B, a, u);
    const Q = B[0], dt = hC[Q];
    if (dt) {
      const { incompatibleTokens: yt } = dt;
      if (Array.isArray(yt)) {
        const ut = M.find(
          (Mt) => yt.includes(Mt.token) || Mt.token === Q
        if (ut)
            `The format string mustn't contain \`${ut.fullToken}\` and \`${B}\` at the same time`
      } else if (dt.incompatibleTokens === "*" && M.length > 0)
          `The format string mustn't contain \`${B}\` and any other token at the same time`
      M.push({ token: Q, fullToken: B });
      const St = dt.run(
        u,
        B,
        y.match,
        _
      if (!St)
        return f();
      E.push(St.setter), u = St.rest;
      if (Q.match(vC))
          "Format string contains an unescaped latin alphabet character `" + Q + "`"
      if (B === "''" ? B = "'" : Q === "'" && (B = TC(B)), u.indexOf(B) === 0)
        u = u.slice(B.length);
        return f();
    }
  }
  if (u.length > 0 && bC.test(u))
    return f();
  const H = E.map((B) => B.priority).sort((B, Q) => Q - B).filter((B, Q, dt) => dt.indexOf(B) === Q).map(
    (B) => E.filter((Q) => Q.priority === B).sort((Q, dt) => dt.subPriority - Q.subPriority)
  ).map((B) => B[0]);
  let q = ee(o, s?.in);
  if (isNaN(+q)) return f();
  const V = {};
  for (const B of H) {
    if (!B.validate(q, _))
      return f();
    const Q = B.set(q, V, _);
    Array.isArray(Q) ? (q = Q[0], Object.assign(V, Q[1])) : q = Q;
  }
  return q;
}
function TC(u) {
  return u.match(pC)[1].replace(yC, "'");
}
function _C(u, a) {
  const o = ee(u, a?.in);
  return o.setMinutes(0, 0, 0), o;
}
function xC(u, a) {
  const o = ee(u, a?.in);
  return o.setSeconds(0, 0), o;
}
function EC(u, a) {
  const o = ee(u, a?.in);
  return o.setMilliseconds(0), o;
}
function OC(u, a) {
  const o = () => mn(a?.in, NaN), s = a?.additionalDigits ?? 2, f = RC(u);
  let m;
  if (f.date) {
    const _ = wC(f.date, s);
    m = zC(_.restDateString, _.year);
  }
  if (!m || isNaN(+m)) return o();
  const y = +m;
  let b = 0, S;
  if (f.time && (b = CC(f.time), isNaN(b)))
    return o();
  if (f.timezone) {
    if (S = HC(f.timezone), isNaN(S)) return o();
    const _ = new Date(y + b), E = ee(0, a?.in);
    return E.setFullYear(
      _.getUTCFullYear(),
      _.getUTCMonth(),
      _.getUTCDate()
    ), E.setHours(
      _.getUTCHours(),
      _.getUTCMinutes(),
      _.getUTCSeconds(),
      _.getUTCMilliseconds()
    ), E;
  }
  return ee(y + b + S, a?.in);
}
const ov = {
}, MC = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, DC = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, AC = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function RC(u) {
  const a = {}, o = u.split(ov.dateTimeDelimiter);
  let s;
  if (o.length > 2)
    return a;
  if (/:/.test(o[0]) ? s = o[0] : (a.date = o[0], s = o[1], ov.timeZoneDelimiter.test(a.date) && (a.date = u.split(ov.timeZoneDelimiter)[0], s = u.substr(
    a.date.length,
    u.length
  ))), s) {
    const f = ov.timezone.exec(s);
    f ? (a.time = s.replace(f[1], ""), a.timezone = f[1]) : a.time = s;
  }
  return a;
}
function wC(u, a) {
  const o = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + a) + "})|(\\d{2}|[+-]\\d{" + (2 + a) + "})$)"
  ), s = u.match(o);
  if (!s) return { year: NaN, restDateString: "" };
  const f = s[1] ? parseInt(s[1]) : null, m = s[2] ? parseInt(s[2]) : null;
    year: m === null ? f : m * 100,
    restDateString: u.slice((s[1] || s[2]).length)
function zC(u, a) {
  if (a === null) return /* @__PURE__ */ new Date(NaN);
  const o = u.match(MC);
  if (!o) return /* @__PURE__ */ new Date(NaN);
  const s = !!o[4], f = Ry(o[1]), m = Ry(o[2]) - 1, y = Ry(o[3]), b = Ry(o[4]), S = Ry(o[5]) - 1;
  if (s)
    return LC(a, b, S) ? UC(a, b, S) : /* @__PURE__ */ new Date(NaN);
    const _ = /* @__PURE__ */ new Date(0);
    return !kC(a, m, y) || !BC(a, f) ? /* @__PURE__ */ new Date(NaN) : (_.setUTCFullYear(a, m, Math.max(f, y)), _);
function Ry(u) {
  return u ? parseInt(u) : 1;
function CC(u) {
  const a = u.match(DC);
  if (!a) return NaN;
  const o = aS(a[1]), s = aS(a[2]), f = aS(a[3]);
  return YC(o, s, f) ? o * $y + s * Ky + f * 1e3 : NaN;
function aS(u) {
  return u && parseFloat(u.replace(",", ".")) || 0;
function HC(u) {
  if (u === "Z") return 0;
  const a = u.match(AC);
  if (!a) return 0;
  const o = a[1] === "+" ? -1 : 1, s = parseInt(a[2]), f = a[3] && parseInt(a[3]) || 0;
  return jC(s, f) ? o * (s * $y + f * Ky) : NaN;
function UC(u, a, o) {
  const s = /* @__PURE__ */ new Date(0);
  s.setUTCFullYear(u, 0, 4);
  const f = s.getUTCDay() || 7, m = (a - 1) * 7 + o + 1 - f;
  return s.setUTCDate(s.getUTCDate() + m), s;
const NC = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function EE(u) {
  return u % 400 === 0 || u % 4 === 0 && u % 100 !== 0;
function kC(u, a, o) {
  return a >= 0 && a <= 11 && o >= 1 && o <= (NC[a] || (EE(u) ? 29 : 28));
function BC(u, a) {
  return a >= 1 && a <= (EE(u) ? 366 : 365);
function LC(u, a, o) {
  return a >= 1 && a <= 53 && o >= 0 && o <= 6;
function YC(u, a, o) {
  return u === 24 ? a === 0 && o === 0 : o >= 0 && o < 60 && a >= 0 && a < 60 && u >= 0 && u < 25;
function jC(u, a) {
  return a >= 0 && a <= 59;
const qC = {
X2._date.override({
    return qC;
  parse: function(u, a) {
    if (u === null || typeof u > "u")
    const o = typeof u;
    return o === "number" || u instanceof Date ? u = ee(u) : o === "string" && (typeof a == "string" ? u = SC(u, a, /* @__PURE__ */ new Date(), this.options) : u = OC(u, this.options)), sE(u) ? u.getTime() : null;
  format: function(u, a) {
    return _z(u, a, this.options);
  add: function(u, a, o) {
    switch (o) {
        return CS(u, a);
        return fw(u, a);
        return cw(u, a);
        return ow(u, a);
        return Ev(u, a);
        return dw(u, a);
        return zS(u, a);
        return rw(u, a);
        return hw(u, a);
        return u;
  diff: function(u, a, o) {
    switch (o) {
        return HS(u, a);
        return Tw(u, a);
        return bw(u, a);
        return yw(u, a);
        return cE(u, a);
        return _w(u, a);
        return dE(u, a);
        return Sw(u, a);
        return xw(u, a);
  startOf: function(u, a, o) {
    switch (a) {
        return EC(u);
        return xC(u);
        return _C(u);
        return hS(u);
        return bu(u);
        return bu(u, { weekStartsOn: +o });
        return Ow(u);
        return Ew(u);
        return hE(u);
        return u;
  endOf: function(u, a) {
    switch (a) {
        return zw(u);
        return Rw(u);
        return Dw(u);
        return rE(u);
        return Aw(u);
        return fE(u);
        return ww(u);
        return Mw(u);
        return u;
wS.register(iA, Tv, xR, tw, dS, FR, GR);
function VC({ data: u }) {
  const a = ba.useRef(null);
  return ba.useEffect(() => {
    const o = a.current?.getContext("2d");
    if (!o) return;
    const s = u.map((m) => parseFloat(m.price)), f = new wS(o, {
        labels: u.map((m) => m.fetched_at),
            data: s,
    return () => f.destroy();
  }, [u]), /* @__PURE__ */ Yt.jsx("canvas", { ref: a, height: 300 });
}
function GC() {
  const [u, a] = ba.useState(""), [o, s] = ba.useState(""), [f, m] = ba.useState([]), [y, b] = ba.useState([]), [S, _] = ba.useState("price"), [E, D] = ba.useState("asc"), [M, H] = ba.useState(0), [q, V] = ba.useState(0), B = 50;
  return ba.useEffect(() => {
    document.body.classList.add(localStorage.getItem("theme") || "dark");
  }, []), ba.useEffect(() => {
    if (!u) return;
    const Q = new URLSearchParams({
      limit: String(B),
      offset: String(q),
      sort: S,
      order: E
    });
    o && Q.append("city", o), fetch(`/api/product/${encodeURIComponent(u)}?${Q}`).then((dt) => dt.json()).then((dt) => {
      m(dt.offers || []), b(dt.trend || []), H(dt.total || 0);
    }).catch((dt) => console.error("product error", dt));
  }, [u, o, S, E, q]), /* @__PURE__ */ Yt.jsxs("div", { className: "container py-4", children: [
    /* @__PURE__ */ Yt.jsx("div", { className: "text-end", children: /* @__PURE__ */ Yt.jsx("button", { id: "themeToggle", className: "btn btn-outline-light btn-sm", children: "Zmień motyw" }) }),
    /* @__PURE__ */ Yt.jsx("h1", { className: "text-center mb-4", children: "🌿 Dashboard cen medycznej marihuany" }),
    /* @__PURE__ */ Yt.jsxs("div", { className: "row mb-3", children: [
      /* @__PURE__ */ Yt.jsxs("div", { className: "col-md-6 mb-2 mb-md-0", children: [
        /* @__PURE__ */ Yt.jsx("label", { className: "form-label", children: "Wybierz produkt:" }),
        /* @__PURE__ */ Yt.jsx(
          GO,
          {
            value: u,
            onChange: (Q) => {
              a(Q), V(0);
        )
      ] }),
      /* @__PURE__ */ Yt.jsxs("div", { className: "col-md-6", children: [
        /* @__PURE__ */ Yt.jsx("label", { className: "form-label", children: "Miasto:" }),
        /* @__PURE__ */ Yt.jsx(
          XO,
          {
            value: o,
            onChange: (Q) => {
              s(Q), V(0);
        )
      ] })
    ] }),
    /* @__PURE__ */ Yt.jsx(
      QO,
      {
        sort: S,
        order: E,
        onSortChange: (Q) => {
          _(Q), V(0);
        onOrderChange: (Q) => {
          D(Q), V(0);
    /* @__PURE__ */ Yt.jsxs("div", { className: "card p-3 mb-4", children: [
      /* @__PURE__ */ Yt.jsx("h2", { className: "card-title", children: "💎 Najtańsze oferty" }),
      /* @__PURE__ */ Yt.jsx(ZO, { offers: f }),
      /* @__PURE__ */ Yt.jsx(KO, { total: M, limit: B, offset: q, onChange: V }),
      /* @__PURE__ */ Yt.jsxs("div", { id: "countInfo", className: "mb-2 text-muted", children: [
        q + 1,
        Math.min(q + B, M),
        M,
    /* @__PURE__ */ Yt.jsxs("div", { className: "card p-3 mb-4", children: [
      /* @__PURE__ */ Yt.jsx("h2", { className: "card-title", children: "📈 Trend cen wg daty" }),
      /* @__PURE__ */ Yt.jsx(VC, { data: y })
VO.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ Yt.jsx(ba.StrictMode, { children: /* @__PURE__ */ Yt.jsx(GC, {}) })
