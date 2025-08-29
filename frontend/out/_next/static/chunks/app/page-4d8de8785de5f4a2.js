;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    4208: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 4744))
    },
    4744: (e, t, a) => {
      "use strict"
      ;(a.r(t), a.d(t, { default: () => Q }))
      var s,
        r,
        i,
        n = a(5155),
        l = a(2115),
        o = a(3384),
        d = a(8500),
        c = a(4516),
        u = a(1539)
      function m() {
        return (0, n.jsxs)("header", {
          className: "text-center mb-12 relative",
          children: [
            (0, n.jsx)("div", {
              className:
                "absolute top-0 left-1/4 w-8 h-8 alien-glow rounded-full float-animation opacity-30",
            }),
            (0, n.jsx)("div", {
              className:
                "absolute top-10 right-1/3 w-6 h-6 alien-glow rounded-full float-animation opacity-20",
              style: { animationDelay: "2s" },
            }),
            (0, n.jsxs)("div", {
              className: "flex items-center justify-center gap-3 mb-6",
              children: [
                (0, n.jsxs)("div", {
                  className:
                    "p-3 bg-primary/20 rounded-full glow-green relative",
                  children: [
                    (0, n.jsx)(o.A, {
                      className: "w-8 h-8 text-primary rotate-slow",
                    }),
                    (0, n.jsx)("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-full blur-sm",
                    }),
                  ],
                }),
                (0, n.jsx)("h1", {
                  className:
                    "text-4xl md:text-5xl font-serif font-black text-foreground",
                  children: "\uD83C\uDF3F Por\xf3wnaj Ceny \uD83D\uDEF8",
                }),
              ],
            }),
            (0, n.jsx)("h2", {
              className:
                "text-2xl md:text-3xl font-serif font-bold text-primary mb-4",
              children: "Medycznej Marihuany \uD83D\uDC7D",
            }),
            (0, n.jsxs)("p", {
              className:
                "text-lg text-muted-foreground mb-6 max-w-2xl mx-auto font-sans",
              children: [
                '\uD83D\uDE80 Najlepsze oferty w Twojej okolicy. Znajdź najlepszą "zielonkę" w kilka sekund!',
                (0, n.jsx)("br", {}),
                (0, n.jsx)("span", {
                  className: "text-sm opacity-75",
                  children: "✨ Cosmic prices for earthly medicine ✨",
                }),
              ],
            }),
            (0, n.jsxs)("div", {
              className:
                "flex items-center justify-center gap-8 text-sm text-muted-foreground",
              children: [
                (0, n.jsxs)("div", {
                  className:
                    "flex items-center gap-2 glow-green p-2 rounded-lg",
                  children: [
                    (0, n.jsx)(d.A, { className: "w-4 h-4 text-primary" }),
                    (0, n.jsx)("span", {
                      children: "\uD83D\uDD25 Najniższe ceny",
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  className:
                    "flex items-center gap-2 glow-purple p-2 rounded-lg",
                  children: [
                    (0, n.jsx)(c.A, { className: "w-4 h-4 text-accent" }),
                    (0, n.jsx)("span", {
                      children: "\uD83C\uDFEA Lokalne apteki",
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  className:
                    "flex items-center gap-2 glow-green p-2 rounded-lg",
                  children: [
                    (0, n.jsx)(u.A, { className: "w-4 h-4 text-primary" }),
                    (0, n.jsx)("span", { children: "⚡ Szybka dostawa" }),
                  ],
                }),
              ],
            }),
          ],
        })
      }
      var x = a(3311),
        p = a(6634),
        g = a(2085),
        h = a(2596),
        v = a(9688)
      function f() {
        for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
          t[a] = arguments[a]
        return (0, v.QP)((0, h.$)(t))
      }
      let b = (0, g.F)(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        {
          variants: {
            variant: {
              default:
                "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
              destructive:
                "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
              outline:
                "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
              secondary:
                "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
              ghost:
                "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
              link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
              default: "h-9 px-4 py-2 has-[>svg]:px-3",
              sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
              lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
              icon: "size-9",
            },
          },
          defaultVariants: { variant: "default", size: "default" },
        },
      )
      function j(e) {
        let { className: t, variant: a, size: s, asChild: r = !1, ...i } = e,
          l = r ? p.DX : "button"
        return (0, n.jsx)(l, {
          "data-slot": "button",
          className: f(b({ variant: a, size: s, className: t })),
          ...i,
        })
      }
      var y = a(7027),
        N = a(6474),
        w = a(5196),
        D = a(7863)
      function k(e) {
        let { ...t } = e
        return (0, n.jsx)(y.bL, { "data-slot": "select", ...t })
      }
      function _(e) {
        let { ...t } = e
        return (0, n.jsx)(y.WT, { "data-slot": "select-value", ...t })
      }
      function z(e) {
        let { className: t, size: a = "default", children: s, ...r } = e
        return (0, n.jsxs)(y.l9, {
          "data-slot": "select-trigger",
          "data-size": a,
          className: f(
            "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            t,
          ),
          ...r,
          children: [
            s,
            (0, n.jsx)(y.In, {
              asChild: !0,
              children: (0, n.jsx)(N.A, { className: "size-4 opacity-50" }),
            }),
          ],
        })
      }
      function C(e) {
        let { className: t, children: a, position: s = "popper", ...r } = e
        return (0, n.jsx)(y.ZL, {
          children: (0, n.jsxs)(y.UC, {
            "data-slot": "select-content",
            className: f(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
              "popper" === s &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
              t,
            ),
            position: s,
            ...r,
            children: [
              (0, n.jsx)(F, {}),
              (0, n.jsx)(y.LM, {
                className: f(
                  "p-1",
                  "popper" === s &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
                ),
                children: a,
              }),
              (0, n.jsx)(A, {}),
            ],
          }),
        })
      }
      function S(e) {
        let { className: t, children: a, ...s } = e
        return (0, n.jsxs)(y.q7, {
          "data-slot": "select-item",
          className: f(
            "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            t,
          ),
          ...s,
          children: [
            (0, n.jsx)("span", {
              className:
                "absolute right-2 flex size-3.5 items-center justify-center",
              children: (0, n.jsx)(y.VF, {
                children: (0, n.jsx)(w.A, { className: "size-4" }),
              }),
            }),
            (0, n.jsx)(y.p4, { children: a }),
          ],
        })
      }
      function F(e) {
        let { className: t, ...a } = e
        return (0, n.jsx)(y.PP, {
          "data-slot": "select-scroll-up-button",
          className: f(
            "flex cursor-default items-center justify-center py-1",
            t,
          ),
          ...a,
          children: (0, n.jsx)(D.A, { className: "size-4" }),
        })
      }
      function A(e) {
        let { className: t, ...a } = e
        return (0, n.jsx)(y.wn, {
          "data-slot": "select-scroll-down-button",
          className: f(
            "flex cursor-default items-center justify-center py-1",
            t,
          ),
          ...a,
          children: (0, n.jsx)(N.A, { className: "size-4" }),
        })
      }
      function E(e) {
        let { className: t, ...a } = e
        return (0, n.jsx)("div", {
          "data-slot": "card",
          className: f(
            "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
            t,
          ),
          ...a,
        })
      }
      function P(e) {
        let { className: t, type: a, ...s } = e
        return (0, n.jsx)("input", {
          type: a,
          "data-slot": "input",
          className: f(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            t,
          ),
          ...s,
        })
      }
      var T = a(9509)
      let B =
          void 0 !== T
            ? null === (s = T.env) || void 0 === s
              ? void 0
              : s.NEXT_PUBLIC_API_URL
            : void 0,
        L =
          void 0 !== T
            ? null === (r = T.env) || void 0 === r
              ? void 0
              : r.NEXT_PUBLIC_HOST
            : void 0,
        R =
          void 0 !== T
            ? null === (i = T.env) || void 0 === i
              ? void 0
              : i.NEXT_PUBLIC_BACKEND_PORT
            : void 0,
        q =
          B ||
          (function () {
            let e = L || window.location.hostname
            return "http://".concat(e, ":").concat(R || "38273", "/api")
          })()
      class I {
        async makeRequest(e, t) {
          try {
            let a = await fetch("".concat(q).concat(e), {
              headers: {
                "Content-Type": "application/json",
                ...(null == t ? void 0 : t.headers),
              },
              ...t,
            })
            if (!a.ok) throw Error("HTTP error! status: ".concat(a.status))
            return await a.json()
          } catch (t) {
            throw (
              console.error("API request failed for ".concat(e, ":"), t),
              t
            )
          }
        }
        async searchProducts(e) {
          let t = new URLSearchParams()
          ;(e.city && t.append("city", e.city),
            e.strain_type &&
              "all" !== e.strain_type &&
              t.append("strain_type", e.strain_type),
            e.max_price && t.append("max_price", e.max_price.toString()),
            e.min_thc && t.append("min_thc", e.min_thc.toString()),
            e.max_thc && t.append("max_thc", e.max_thc.toString()),
            e.min_cbd && t.append("min_cbd", e.min_cbd.toString()),
            e.max_cbd && t.append("max_cbd", e.max_cbd.toString()),
            e.radius && t.append("radius", e.radius.toString()),
            e.lat && t.append("lat", e.lat.toString()),
            e.lon && t.append("lon", e.lon.toString()),
            e.sort_by && t.append("sort_by", e.sort_by),
            e.sort_order && t.append("sort_order", e.sort_order))
          let a = t.toString()
          return await this.makeRequest(
            "/search".concat(a ? "?".concat(a) : ""),
          )
        }
        async getStats() {
          return await this.makeRequest("/stats")
        }
        async getCities() {
          return await this.makeRequest("/cities")
        }
        async getProduct(e) {
          return await this.makeRequest("/products/".concat(e))
        }
        async getProductsByCity(e) {
          return await this.makeRequest(
            "/products/city/".concat(encodeURIComponent(e)),
          )
        }
        async getBestDeals() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10
          return await this.makeRequest("/deals/best?limit=".concat(e))
        }
      }
      let U = new I()
      function W(e) {
        let { onSearch: t, isLoading: a } = e,
          [s, r] = (0, l.useState)(""),
          [i, d] = (0, l.useState)(""),
          [u, m] = (0, l.useState)(""),
          [p, g] = (0, l.useState)([]),
          [h, v] = (0, l.useState)(!0)
        return (
          (0, l.useEffect)(() => {
            ;(async () => {
              try {
                v(!0)
                let e = await U.getCities()
                g(e)
              } catch (e) {
                ;(console.error("Failed to load cities:", e), g([]))
              } finally {
                v(!1)
              }
            })()
          }, []),
          (0, n.jsxs)(E, {
            className:
              "p-8 mb-12 bg-card/50 backdrop-blur-sm neon-border shadow-2xl cannabis-pattern relative overflow-hidden",
            children: [
              (0, n.jsx)("div", {
                className:
                  "absolute top-4 right-4 text-2xl opacity-20 float-animation",
                children: "\uD83C\uDF3F",
              }),
              (0, n.jsx)("div", {
                className:
                  "absolute bottom-4 left-4 text-xl opacity-15 float-animation",
                style: { animationDelay: "1s" },
                children: "\uD83D\uDEF8",
              }),
              (0, n.jsxs)("div", {
                className: "grid md:grid-cols-4 gap-6",
                children: [
                  (0, n.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, n.jsxs)("label", {
                        className:
                          "text-sm font-medium text-foreground flex items-center gap-2",
                        children: [
                          (0, n.jsx)(o.A, {
                            className: "w-4 h-4 text-primary glow-green",
                          }),
                          "\uD83C\uDF31 Wybierz produkt",
                        ],
                      }),
                      (0, n.jsxs)(k, {
                        value: s,
                        onValueChange: r,
                        children: [
                          (0, n.jsx)(z, {
                            className:
                              "bg-input border-border hover:border-primary/50 transition-colors neon-border",
                            children: (0, n.jsx)(_, {
                              placeholder: "\uD83D\uDD0D Wszystkie produkty...",
                            }),
                          }),
                          (0, n.jsxs)(C, {
                            children: [
                              (0, n.jsx)(S, {
                                value: "all",
                                children: "\uD83C\uDF3F Wszystkie",
                              }),
                              (0, n.jsx)(S, {
                                value: "indica",
                                children: "\uD83C\uDF19 Indica",
                              }),
                              (0, n.jsx)(S, {
                                value: "sativa",
                                children: "☀️ Sativa",
                              }),
                              (0, n.jsx)(S, {
                                value: "hybrid",
                                children: "\uD83C\uDF08 Hybrid",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, n.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, n.jsxs)("label", {
                        className:
                          "text-sm font-medium text-foreground flex items-center gap-2",
                        children: [
                          (0, n.jsx)(c.A, {
                            className: "w-4 h-4 text-accent glow-purple",
                          }),
                          "\uD83C\uDFD9️ Miasto",
                        ],
                      }),
                      (0, n.jsxs)(k, {
                        value: i,
                        onValueChange: d,
                        children: [
                          (0, n.jsx)(z, {
                            className:
                              "bg-input border-border hover:border-accent/50 transition-colors neon-border",
                            children: (0, n.jsx)(_, {
                              placeholder: h
                                ? "\uD83D\uDD04 Ładowanie..."
                                : "\uD83C\uDF0D Wszystkie miasta...",
                            }),
                          }),
                          (0, n.jsxs)(C, {
                            children: [
                              (0, n.jsx)(S, {
                                value: "all",
                                children: "\uD83C\uDF0D Wszystkie miasta",
                              }),
                              p.map((e) =>
                                (0, n.jsxs)(
                                  S,
                                  {
                                    value: e.name.toLowerCase(),
                                    children: [
                                      "\uD83C\uDFDB️ ",
                                      e.name,
                                      " (",
                                      e.pharmacy_count,
                                      " aptek)",
                                    ],
                                  },
                                  e.name,
                                ),
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, n.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, n.jsx)("label", {
                        className:
                          "text-sm font-medium text-foreground flex items-center gap-2",
                        children: "\uD83D\uDCB0 Maks. cena (zł)",
                      }),
                      (0, n.jsx)(P, {
                        type: "number",
                        placeholder: "np. 300",
                        value: u,
                        onChange: (e) => m(e.target.value),
                        className:
                          "bg-input border-border hover:border-primary/50 transition-colors neon-border",
                      }),
                    ],
                  }),
                  (0, n.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, n.jsx)("label", {
                        className:
                          "text-sm font-medium text-foreground opacity-0",
                        children: "Search",
                      }),
                      (0, n.jsx)(j, {
                        onClick: () => {
                          let e = {}
                          ;(i && "all" !== i && (e.city = i),
                            s && "all" !== s && (e.strain_type = s),
                            u && (e.max_price = Number.parseFloat(u)),
                            t(e))
                        },
                        disabled: a,
                        className:
                          "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg glow-green",
                        children: a
                          ? (0, n.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, n.jsx)("div", {
                                  className:
                                    "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin",
                                }),
                                "\uD83D\uDD0D Skanowanie galaktyki...",
                              ],
                            })
                          : (0, n.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, n.jsx)(x.A, { className: "w-4 h-4" }),
                                "\uD83D\uDE80 Znajdź najlepsze oferty",
                              ],
                            }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        )
      }
      var M = a(8564)
      let O = (0, g.F)(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
        {
          variants: {
            variant: {
              default:
                "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
              secondary:
                "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
              destructive:
                "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
              outline:
                "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
            },
          },
          defaultVariants: { variant: "default" },
        },
      )
      function V(e) {
        let { className: t, variant: a, asChild: s = !1, ...r } = e,
          i = s ? p.DX : "span"
        return (0, n.jsx)(i, {
          "data-slot": "badge",
          className: f(O({ variant: a }), t),
          ...r,
        })
      }
      function X(e) {
        let { products: t, loading: a, searchPerformed: s } = e
        return a
          ? (0, n.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, n.jsx)("div", {
                  className: "flex items-center justify-between",
                  children: (0, n.jsxs)("h3", {
                    className:
                      "text-2xl font-serif font-bold text-foreground flex items-center gap-2",
                    children: [
                      "\uD83D\uDE80 Skanowanie galaktyki...",
                      (0, n.jsx)(o.A, {
                        className: "w-6 h-6 text-primary rotate-slow",
                      }),
                    ],
                  }),
                }),
                (0, n.jsx)("div", {
                  className: "grid gap-4",
                  children: [void 0, void 0, void 0].map((e, t) =>
                    (0, n.jsx)(
                      E,
                      {
                        className:
                          "p-6 bg-card/40 backdrop-blur-sm neon-border animate-pulse",
                        children: (0, n.jsx)("div", {
                          className: "h-24 bg-muted/20 rounded",
                        }),
                      },
                      t,
                    ),
                  ),
                }),
              ],
            })
          : s
            ? 0 === t.length
              ? (0, n.jsxs)("div", {
                  className: "text-center py-12",
                  children: [
                    (0, n.jsx)("div", {
                      className: "text-6xl mb-4",
                      children: "\uD83D\uDC7D",
                    }),
                    (0, n.jsx)("h3", {
                      className:
                        "text-xl font-serif font-bold text-foreground mb-2",
                      children: "Brak wynik\xf3w w tej galaktyce",
                    }),
                    (0, n.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Spr\xf3buj zmienić filtry wyszukiwania lub sprawdź inne planety \uD83E\uDE90",
                    }),
                  ],
                })
              : (0, n.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, n.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, n.jsxs)("h3", {
                          className:
                            "text-2xl font-serif font-bold text-foreground flex items-center gap-2",
                          children: [
                            "\uD83D\uDE80 Najlepsze oferty z galaktyki",
                            (0, n.jsx)(o.A, {
                              className: "w-6 h-6 text-primary rotate-slow",
                            }),
                          ],
                        }),
                        (0, n.jsxs)(V, {
                          variant: "secondary",
                          className: "text-sm glow-purple",
                          children: [
                            t.length,
                            " kosmicznych wynik\xf3w \uD83D\uDEF8",
                          ],
                        }),
                      ],
                    }),
                    (0, n.jsx)("div", {
                      className: "grid gap-4",
                      children: t.map((e, t) =>
                        (0, n.jsxs)(
                          E,
                          {
                            className:
                              "p-6 bg-card/40 backdrop-blur-sm neon-border hover:bg-card/60 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ".concat(
                                0 === t
                                  ? "ring-2 ring-primary/30 glow-green"
                                  : "",
                              ),
                            children: [
                              (0, n.jsx)("div", {
                                className:
                                  "absolute top-4 right-4 text-xl opacity-20 float-animation",
                                children:
                                  0 === t
                                    ? "\uD83D\uDC51"
                                    : 1 === t
                                      ? "\uD83D\uDEF8"
                                      : "\uD83C\uDF3F",
                              }),
                              (0, n.jsx)("div", {
                                className:
                                  "absolute inset-0 alien-glow opacity-5",
                              }),
                              (0, n.jsxs)("div", {
                                className:
                                  "flex flex-col md:flex-row md:items-center gap-4 relative z-10",
                                children: [
                                  (0, n.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                      (0, n.jsxs)("div", {
                                        className:
                                          "flex items-start justify-between mb-3",
                                        children: [
                                          (0, n.jsxs)("div", {
                                            children: [
                                              (0, n.jsxs)("h4", {
                                                className:
                                                  "text-lg font-semibold text-foreground mb-1 flex items-center gap-2",
                                                children: [
                                                  "\uD83C\uDF3F ",
                                                  e.pharmacy,
                                                  0 === t &&
                                                    (0, n.jsx)("span", {
                                                      className: "text-sm",
                                                      children: "\uD83D\uDC51",
                                                    }),
                                                ],
                                              }),
                                              (0, n.jsxs)("p", {
                                                className:
                                                  "text-muted-foreground text-sm flex items-center gap-2",
                                                children: [
                                                  e.name,
                                                  e.strain_type &&
                                                    "unknown" !==
                                                      e.strain_type &&
                                                    (0, n.jsxs)(V, {
                                                      variant: "outline",
                                                      className: "text-xs",
                                                      children: [
                                                        e.strain_type,
                                                        " \uD83D\uDC8E",
                                                      ],
                                                    }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          0 === t &&
                                            (0, n.jsx)(V, {
                                              className:
                                                "bg-primary text-primary-foreground glow-green",
                                              children:
                                                "\uD83C\uDFC6 Najlepsza oferta",
                                            }),
                                        ],
                                      }),
                                      (0, n.jsxs)("div", {
                                        className:
                                          "flex items-center gap-4 mb-3",
                                        children: [
                                          (0, n.jsxs)("div", {
                                            className:
                                              "flex items-center gap-2 text-sm text-muted-foreground",
                                            children: [
                                              (0, n.jsx)(c.A, {
                                                className: "w-4 h-4",
                                              }),
                                              "\uD83D\uDCCD ",
                                              e.location,
                                              e.distance &&
                                                " • ".concat(
                                                  e.distance.toFixed(1),
                                                  "km",
                                                ),
                                            ],
                                          }),
                                          e.rating &&
                                            (0, n.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1 text-sm",
                                              children: [
                                                (0, n.jsx)(M.A, {
                                                  className:
                                                    "w-4 h-4 fill-yellow-400 text-yellow-400",
                                                }),
                                                (0, n.jsx)("span", {
                                                  className: "text-foreground",
                                                  children: e.rating,
                                                }),
                                              ],
                                            }),
                                        ],
                                      }),
                                      (0, n.jsxs)("div", {
                                        className:
                                          "flex items-center gap-4 text-sm",
                                        children: [
                                          (0, n.jsx)(V, {
                                            variant: e.availability
                                              ? "default"
                                              : "destructive",
                                            className: e.availability
                                              ? "glow-green"
                                              : "",
                                            children: e.availability
                                              ? "✅ Dostępny"
                                              : "⚠️ Niedostępny",
                                          }),
                                          (0, n.jsxs)("div", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: [
                                              e.thc_content &&
                                                "THC: ".concat(
                                                  e.thc_content,
                                                  "%",
                                                ),
                                              e.thc_content &&
                                                e.cbd_content &&
                                                " | ",
                                              e.cbd_content &&
                                                "CBD: ".concat(
                                                  e.cbd_content,
                                                  "%",
                                                ),
                                              e.unit && " • ".concat(e.unit),
                                            ],
                                          }),
                                        ],
                                      }),
                                      e.expiration &&
                                        (0, n.jsxs)("div", {
                                          className:
                                            "text-xs text-muted-foreground mt-2",
                                          children: [
                                            "\uD83D\uDCC5 Ważność: ",
                                            e.expiration,
                                          ],
                                        }),
                                    ],
                                  }),
                                  (0, n.jsxs)("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                      (0, n.jsxs)("div", {
                                        className: "text-right",
                                        children: [
                                          (0, n.jsx)("div", {
                                            className:
                                              "flex items-center gap-2 mb-1",
                                            children: (0, n.jsxs)("span", {
                                              className:
                                                "text-2xl font-bold text-foreground",
                                              children: [
                                                e.price.toFixed(2),
                                                " zł",
                                              ],
                                            }),
                                          }),
                                          (0, n.jsxs)("div", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: [
                                              "Ostatnia aktualizacja: ",
                                              e.fetched_at,
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, n.jsxs)(j, {
                                        className:
                                          "bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 glow-green",
                                        children: [
                                          (0, n.jsx)(u.A, {
                                            className: "w-4 h-4 mr-2",
                                          }),
                                          "\uD83D\uDE80 Teleportuj się",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                  ],
                })
            : (0, n.jsxs)("div", {
                className: "text-center py-12",
                children: [
                  (0, n.jsx)("div", {
                    className: "text-6xl mb-4 float-animation",
                    children: "\uD83D\uDEF8",
                  }),
                  (0, n.jsx)("h3", {
                    className:
                      "text-xl font-serif font-bold text-foreground mb-2",
                    children: "Gotowy na kosmiczną podr\xf3ż?",
                  }),
                  (0, n.jsx)("p", {
                    className: "text-muted-foreground",
                    children:
                      "Użyj wyszukiwarki powyżej, aby znaleźć najlepsze oferty w galaktyce \uD83C\uDF0C",
                  }),
                ],
              })
      }
      var H = a(3109),
        Z = a(7580),
        G = a(4186)
      function K() {
        let [e, t] = (0, l.useState)(null),
          [a, s] = (0, l.useState)(!0),
          [r, i] = (0, l.useState)(null)
        if (
          ((0, l.useEffect)(() => {
            ;(async () => {
              try {
                ;(s(!0), i(null))
                let e = await U.getStats()
                t(e)
              } catch (e) {
                ;(console.error("Failed to load stats:", e),
                  i("Nie udało się załadować statystyk"))
              } finally {
                s(!1)
              }
            })()
          }, []),
          a)
        )
          return (0, n.jsx)("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12",
            children: [void 0, void 0, void 0, void 0].map((e, t) =>
              (0, n.jsx)(
                E,
                {
                  className:
                    "p-6 bg-card/30 backdrop-blur-sm neon-border animate-pulse",
                  children: (0, n.jsx)("div", {
                    className: "h-16 bg-muted/20 rounded",
                  }),
                },
                t,
              ),
            ),
          })
        if (r || !e)
          return (0, n.jsx)("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12",
            children: [void 0, void 0, void 0, void 0].map((e, t) =>
              (0, n.jsx)(
                E,
                {
                  className: "p-6 bg-card/30 backdrop-blur-sm neon-border",
                  children: (0, n.jsxs)("div", {
                    className: "text-center text-muted-foreground",
                    children: [
                      (0, n.jsx)("div", {
                        className: "text-lg mb-2",
                        children: "⚠️",
                      }),
                      (0, n.jsx)("div", {
                        className: "text-sm",
                        children: r || "Błąd ładowania",
                      }),
                    ],
                  }),
                },
                t,
              ),
            ),
          })
        let o = [
          {
            icon: H.A,
            label: "Średnia cena",
            value: "".concat(e.avg_price.toFixed(0), " zł"),
            change: "+12%",
            positive: !0,
            emoji: "\uD83D\uDCB0",
          },
          {
            icon: Z.A,
            label: "Aktywne apteki",
            value: e.total_pharmacies.toString(),
            change: "+5",
            positive: !0,
            emoji: "\uD83C\uDFEA",
          },
          {
            icon: c.A,
            label: "Miasta",
            value: e.cities_covered.toString(),
            change: "+3",
            positive: !0,
            emoji: "\uD83C\uDF0D",
          },
          {
            icon: G.A,
            label: "Ostatnia aktualizacja",
            value: e.last_updated.split(" ")[0] || "Dzisiaj",
            change: e.last_updated.split(" ").slice(1).join(" ") || "Teraz",
            positive: null,
            emoji: "⚡",
          },
        ]
        return (0, n.jsx)("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12",
          children: o.map((e, t) =>
            (0, n.jsxs)(
              E,
              {
                className:
                  "p-6 bg-card/30 backdrop-blur-sm neon-border hover:bg-card/50 transition-all duration-300 hover:scale-105 glow-green relative overflow-hidden",
                children: [
                  (0, n.jsx)("div", {
                    className:
                      "absolute top-2 right-2 text-lg opacity-30 float-animation",
                    children: e.emoji,
                  }),
                  (0, n.jsx)("div", {
                    className: "absolute inset-0 alien-glow opacity-10",
                  }),
                  (0, n.jsxs)("div", {
                    className: "flex items-center gap-3 mb-3 relative z-10",
                    children: [
                      (0, n.jsx)("div", {
                        className: "p-2 bg-primary/20 rounded-lg glow-green",
                        children: (0, n.jsx)(e.icon, {
                          className: "w-5 h-5 text-primary",
                        }),
                      }),
                      (0, n.jsxs)("div", {
                        className: "flex-1",
                        children: [
                          (0, n.jsx)("p", {
                            className: "text-2xl font-bold text-foreground",
                            children: e.value,
                          }),
                          (0, n.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children: e.label,
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.change &&
                    (0, n.jsxs)("div", {
                      className:
                        "text-xs flex items-center gap-1 relative z-10 ".concat(
                          !0 === e.positive
                            ? "text-green-400"
                            : !1 === e.positive
                              ? "text-red-400"
                              : "text-muted-foreground",
                        ),
                      children: [
                        !0 === e.positive && "\uD83D\uDE80",
                        !1 === e.positive && "\uD83D\uDCC9",
                        e.change,
                      ],
                    }),
                ],
              },
              t,
            ),
          ),
        })
      }
      function Q() {
        let [e, t] = (0, l.useState)([]),
          [a, s] = (0, l.useState)(!1),
          [r, i] = (0, l.useState)(!1),
          o = async (e) => {
            ;(s(!0), i(!0))
            try {
              let a = await U.searchProducts(e)
              t(a.products)
            } catch (e) {
              ;(console.error("Search failed:", e), t([]))
            } finally {
              s(!1)
            }
          }
        return (0, n.jsx)("div", {
          className:
            "min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 cannabis-pattern",
          children: (0, n.jsxs)("div", {
            className: "container mx-auto px-4 py-6 max-w-7xl",
            children: [
              (0, n.jsx)(m, {}),
              (0, n.jsx)(W, { onSearch: o, isLoading: a }),
              (0, n.jsx)(K, {}),
              (0, n.jsx)(X, { products: e, loading: a, searchPerformed: r }),
            ],
          }),
        })
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t))
    ;(e.O(0, [143, 441, 684, 358], () => t(4208)), (_N_E = e.O()))
  },
])
