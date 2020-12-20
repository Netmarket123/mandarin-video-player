(function() {
    function n(a, c, d) {
        "class" == c ? a.className = d : "style" == c ? a.defaultChecked = d : "for" == c ? a.htmlFor = d : "checked" == c ? a.style.cssText = d : a.setAttribute(c, d)
    }

    function L(a) {
        var c = document.createElement("style");
        n(c, "id", "mandarinspot-style");
        n(c, "title", "mandarinspot-style");
        n(c, "type", "text/css");
        c.styleSheet ? c.styleSheet.cssText = a : c.appendChild(document.createTextNode(a));
        M.appendChild(c)
    }

    function w(a) {
        a = a.charCodeAt(0);
        return 19968 <= a && 40879 >= a
    }

    function E(a) {
        var c = [];
        if (3 == a.nodeType) {
            if (void 0 ==
                a.nodeValue) return;
            var d;
            d = a.nodeValue;
            for (var b = [], e = 0; e < d.length;) {
                for (var f = e + 1, g = w(d.charAt(e)); f < d.length && w(d.charAt(f)) == g;) ++f;
                b.push([g, e, f]);
                e = f
            }
            d = 1 == b.length && !w(d.charAt(b[0][1])) || 0 == b.length ? [] : b;
            d.length && c.push([a, d])
        } else if (1 == a.nodeType) {
            if (a.nodeName.toLowerCase() in {
                    textarea: 1,
                    "x-mspot": 1,
                    ruby: 1,
                    script: 1,
                    style: 1,
                    option: 1
                }) return;
            b = 0;
            for (e = a.childNodes.length; b < e; ++b)(d = E(a.childNodes[b])) && (c = c.concat(d))
        }
        return c
    }

    function F() {
        document.getElementById("mandarinspot-progress").parentNode.style.display =
            "none"
    }

    function G(a, c, d, b) {
        var e = [],
            f;
        for (f in d) {
            var g = d[f];
            void 0 != g && e.push(f + "=" + g)
        }
        var e = e.join("&"),
            h = new XMLHttpRequest;
        "withCredentials" in h ? (h.open(a, c, !0), "POST" == a && (h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.setRequestHeader("Content-Length", String(e.length)))) : "undefined" != typeof XDomainRequest ? (h = new XDomainRequest, h.open(a, c)) : h = null;
        h.onload = function() {
            if (399 < h.status) b(h.status);
            else {
                var a = eval("(" + h.responseText + ")");
                z = !!(h.getResponseHeader("mspot-flags") &
                    1);
                b(null, a)
            }
        };
        h.send(e)
    }

    function N(a, c) {
        G("GET", a, {}, c)
    }

    function O(a, c, d) {
        G("POST", a, c, d)
    }

    function P(a, c, d) {
        var b = ["\r\n"],
            e;
        for (e in c) {
            var f = c[e];
            void 0 != f && b.push('Content-Disposition: form-data; name="' + e + '"\r\n\r\n' + f + "\r\n")
        }
        var b = b.join("--boundary\r\n") + "--boundary--\r\n",
            g = new XMLHttpRequest;
        g.open("POST", a, !0);
        g.setRequestHeader("Content-Type", "multipart/form-data; boundary=boundary");
        g.setRequestHeader("Content-Length", String(b.length));
        g.onreadystatechange = function() {
            if (4 == g.readyState &&
                200 == g.status) {
                var a = eval("(" + g.responseText + ")");
                z = !!(g.getResponseHeader("mspot-flags") & 1);
                d(null, a)
            }
        };
        g.send(b)
    }

    function Q(a) {
        for (var c = [], d = 0, b = a.length; d < b; ++d) {
            for (var e = a[d], f = "", g = 0, h = e.length; g < h; ++g) f += (e.charCodeAt(g) - 8192).toString(32);
            c.push(f)
        }
        return c
    }

    function R(a) {
        for (var c = [], d = 0, b = a.length; d < b; ++d) {
            for (var e = a[d], f = "", g = 0, h = e.length; g < h; ++g) var l = e.charCodeAt(g),
                f = f + String.fromCharCode(224 | 15 & l >>> 12),
                f = f + String.fromCharCode(128 | 63 & l >>> 6),
                f = f + String.fromCharCode(128 | 63 & l);
            c.push(f)
        }
        return c
    }

    function S(a, c) {        
        function d(a) {
            var b = a.seg,
                d = D;
            a = a.defs;
            for (var e in a) d[e] = a[e];
            d = c;
            e = 0;
            for (a = d.length; e < a; ++e) {
                for (var f = d[e][0], g = d[e][1], h = 0, l = g.length; h < l; ++h) {
                    var A = g[h],
                        n = f.nodeValue.slice(A[1], A[2]),
                        t = document.createTextNode(n);
                    if (A[0])
                        for (var A = b.shift(), r = 0, m = 0, y = A.length; m < y; ++m) {
                            var H = parseInt(A[m], 32),
                                C = document.createElement("wbr"),
                                B = n.slice(r, r + H),
                                t = document.createTextNode(B),
                                w = document.createElement("ruby"),
                                x = document.createElement("rb"),
                                z = document.createElement("rt");
                            try {
                                z.appendChild(document.createTextNode(D[B][0][0]))
                            } catch (E) {}
                            x.appendChild(t);
                            w.appendChild(x);
                            w.appendChild(z);
                            t = w;
                            B = T;
                            t.addEventListener ? t.addEventListener("mouseover", B, !1) : t.attachEvent ? t.attachEvent("onmouseover", B) : t.onmouseover = B;
                            f.parentNode.insertBefore(C, f);
                            f.parentNode.insertBefore(w, f);
                            r += H
                        } else f.parentNode.insertBefore(t, f)
                }
                f.parentNode && f.parentNode.removeChild(f)
            }
            F()
        }
        if (c.length) {
            for (var b = [], e = 0, f = c.length; e < f; ++e)
                for (var g = c[e], h = g[0], g = g[1], l = 0, n = g.length; l < n; ++l) {
                    var r = g[l];
                    r[0] && b.push(h.nodeValue.slice(r[1], r[2]))
                }
            e = U(R(b).join(",") + a);
            N(V + e, function(c,
                e) {
                if (404 == c) {
                    if (C.g) {
                        var f = O;
                        b = Q(b).join(",")
                    } else f = P, b = b.join(",");
                    f(W, {
                        str: b,
                        phs: a
                    }, function(a, b) {
                        d(b)
                    })
                } else d(e)
            })
        } else F()
    }

    function T(a, c) {
        if (x) {
            var d = a.target || a.srcElement;
            d.onmouseout = function() {
                m.style.visibility = "hidden";
                m.style.left = "-1000px";
                m.style.top = "-1000px";
                m.style.width = "";
                C.h(d)
            };
            C.i(d);            
            c = c ? c : d.lastChild.nodeValue ? d.lastChild.nodeValue : d.lastChild.lastChild.nodeValue;
            var b = D[c][0],
                e = D[c][1],
                f = D[c][2],
                g = "";
            if (c !== f) {
                for (var h = 0; h < c.length; ++h) g += c[h] !== f[h] ? f[h] : "-";
                g = " [" + g +
                    "]"
            }
            f = '<div id="mandarinspot-tip-hz">' + c + g + "</div>";
            h = 0;            
            for (g = b.length; h < g; ++h) var l = y ? e[h].replace(/([^<])\//g, "$1 / ") : " " + e[h].replace(/([^<])\//g, "$1<br /> "),
                f = f + ('<div id="mandarinspotspot-tip-py">' + b[h] + '</div><div id="mandarinspotspot-tip-en">' + l + "</div>");
            mandarinspot.bookmark || z || (f += '<div id="mandarinspotspot-tip-fo" style="font-size:xx-small;color:#777;text-align:center;margin-top:1ex">MandarinSpot.com</div>');
            m.innerHTML = f;
            C.j(d, m);
            m.style.visibility = "visible"
        }
    }

    function X(a) {
        var c =
            document.body;
        if ("undefined" != typeof c)
            if ("undefined" == typeof a) a = document.body;
            else if ("string" == typeof a) {
            var d = a[0],
                b = a.slice(1);
            if ("#" == d) return [document.getElementById(b)];
            if ("." == d) {
                if (c.getElementsByClassName) a = c.getElementsByClassName(b);
                else {
                    a = [];
                    for (var b = RegExp("(?:^| )" + b + "(?: |$)"), c = c.getElementsByTagName("*"), d = 0, e = c.length; d < e; ++d) b.test(c[d].className) && a.push(c[d])
                }
                return a
            }
        }
        return [a]
    }

    function I(a, c) {
        c = c || {};
        var d = c.k || "pinyin",
            b = c.show || !0;
        J(c.inline);
        var e = X(a),
            f = [];
        mandarinspot.bookmark ?
            document.getElementById("mandarinspot-progress").parentNode.style.display = "block" : F();
        for (var g = 0, h = e.length; g < h; ++g) f = f.concat(E(e[g]));
        document.getElementById("mandarinspot-progress").innerHTML = "Loading...";
        S(d, f);
        x = b
    }

    function J(a) {
        for (var c = 0; c < document.styleSheets.length; ++c) {
            var d = document.styleSheets[c];
            if ("mandarinspot-style" == d.title)
                for (var b = 0; b < d.cssRules.length; ++b) {
                    var e = d.cssRules[b];
                    if ("ruby > rt" == e.selectorText) {
                        e.style.display = a ? "block" : "none";
                        e.style.visibility = a;
                        return
                    }
                }
        }
    }

    function U(a) {
        function c(a) {
            var b =
                "",
                c, d;
            for (c = 7; 0 <= c; c--) d = a >>> 4 * c & 15, b += d.toString(16);
            return b
        }

        function d(a, b) {
            return a << b | a >>> 32 - b
        }
        var b, e, f = Array(80),
            g = 1732584193,
            h = 4023233417,
            l = 2562383102,
            n = 271733878,
            r = 3285377520,
            k, p, q, m, u;
        k = a.length;
        var v = [];
        for (b = 0; b < k - 3; b += 4) e = a.charCodeAt(b) << 24 | a.charCodeAt(b + 1) << 16 | a.charCodeAt(b + 2) << 8 | a.charCodeAt(b + 3), v.push(e);
        switch (k % 4) {
            case 0:
                b = 2147483648;
                break;
            case 1:
                b = a.charCodeAt(k - 1) << 24 | 8388608;
                break;
            case 2:
                b = a.charCodeAt(k - 2) << 24 | a.charCodeAt(k - 1) << 16 | 32768;
                break;
            case 3:
                b = a.charCodeAt(k - 3) <<
                    24 | a.charCodeAt(k - 2) << 16 | a.charCodeAt(k - 1) << 8 | 128
        }
        for (v.push(b); 14 != v.length % 16;) v.push(0);
        v.push(k >>> 29);
        v.push(k << 3 & 4294967295);
        for (a = 0; a < v.length; a += 16) {
            for (b = 0; 16 > b; b++) f[b] = v[a + b];
            for (b = 16; 79 >= b; b++) f[b] = d(f[b - 3] ^ f[b - 8] ^ f[b - 14] ^ f[b - 16], 1);
            e = g;
            k = h;
            p = l;
            q = n;
            m = r;
            for (b = 0; 19 >= b; b++) u = d(e, 5) + (k & p | ~k & q) + m + f[b] + 1518500249 & 4294967295, m = q, q = p, p = d(k, 30), k = e, e = u;
            for (b = 20; 39 >= b; b++) u = d(e, 5) + (k ^ p ^ q) + m + f[b] + 1859775393 & 4294967295, m = q, q = p, p = d(k, 30), k = e, e = u;
            for (b = 40; 59 >= b; b++) u = d(e, 5) + (k & p | k & q | p & q) + m + f[b] + 2400959708 &
                4294967295, m = q, q = p, p = d(k, 30), k = e, e = u;
            for (b = 60; 79 >= b; b++) u = d(e, 5) + (k ^ p ^ q) + m + f[b] + 3395469782 & 4294967295, m = q, q = p, p = d(k, 30), k = e, e = u;
            g = g + e & 4294967295;
            h = h + k & 4294967295;
            l = l + p & 4294967295;
            n = n + q & 4294967295;
            r = r + m & 4294967295
        }
        return (c(g) + c(h) + c(l) + c(n) + c(r)).toLowerCase()
    }
    window.mandarinspot || (window.mandarinspot = {});
    var M = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] || document.documentElement,
        K = document.getElementsByTagName("body")[0] || document.documentElement,
        y = -1 != navigator.userAgent.toLowerCase().indexOf("mobile");
    document.getElementById("mandarinspot-style") || L("#mandarinspot-tip{text-align:center;z-index:10001;border:1px solid #773;border-radius:3px;background-color:#ffc;color:#000;padding:5px;padding-bottom:2px;font:normal 14px sans-serif,arial;visibility:hidden;position:absolute}#mandarinspot-tip-hz{font-size:150%;border:none}#mandarinspotspot-tip-py{font-weight:bold;border:none}#mandarinspotspot-tip-en{text-align:left;font-size:90%;border:none}#mandarinspotspot-tip-fo{font-size:xx-small;color:#777;text-align:center;margin-top:1ex;border:none}.mspot{margin:0;padding:0;border:none;width:auto;height:auto}ruby>rt{display:none;font-size:70%}ruby{display:inline-block;margin:0 0.2ex}#mandarinspot-progressslot{position:fixed;display:block;z-index:1000;top:0;left:0;width:100%;border:none}#mandarinspot-progress{margin:0 " +
        (y ? "0" : "auto") + ";padding:.4ex 0;background-color:#ff9;color:#000;width:22ex;text-align:center;font:normal 14px sans-serif,arial;border:none}");
    document.getElementById("mandarinspot-tip") || (s = document.createElement("div"), n(s, "id", "mandarinspot-tip"), n(s, "class", "mspot"), K.appendChild(s));
    document.getElementById("mandarinspot-progressslot") || (s = document.createElement("div"), n(s, "id", "mandarinspot-progressslot"), n(s, "class", "mspot"), mandarinspot.bookmark || (s.style.display = "none"), s.innerHTML = '<div id="mandarinspot-progress">Loading..</div>',
        K.appendChild(s));
    var V = "https://api.mandarinspot.com/cache/",
        W = "https://api.mandarinspot.com/getdefs",
        D = {},
        z = !1,
        C = {
            d: y ? 200 : 300,
            e: y ? 50 : 100,
            c: "",
            i: function(a) {
                this.c = a.style.backgroundColor;
                a.style.backgroundColor = "#fe7"
            },
            h: function(a) {
                a.style.backgroundColor = this.c
            },
            f: function(a) {
                return a.getBoundingClientRect ? (a = a.getBoundingClientRect(), [a.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft), a.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)]) : [this.a(a), this.b(a)]
            },
            a: function(a) {
                return (a.offsetLeft || 0) + (a.offsetParent && this.a(a.offsetParent) || 0)
            },
            b: function(a) {
                return (a.offsetTop || 0) + (a.offsetParent && this.b(a.offsetParent) || 0)
            },
            j: function(a, c) {
                var d = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    b = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                    e = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                    f = window.pageYOffset || document.documentElement.scrollTop ||
                    document.body.scrollTop,
                    g = this.f(a),
                    h = g[0],
                    l = g[1],
                    g = !1;
                c.offsetWidth > this.d ? c.style.width = this.d + "px" : c.offsetWidth < this.e && (c.style.width = this.e + "px");
                l = l - f > c.offsetHeight + 15 ? l - 3 - c.offsetHeight : l + 3 + a.offsetHeight;
                if (l < f || l + c.offsetHeight > f + b) l = f, g = !0;
                c.style.top = l + "px";
                y ? tipleft = Math.max(e, h - c.offsetWidth) : g ? tipleft = 0 > a.offsetWidth || h < c.offsetWidth ? h + a.offsetWidth : h - c.offsetWidth : (b = Math.min(30, Math.abs(a.offsetWidth) / 2), tipleft = d + e - h - a.offsetWidth < c.offsetWidth + 15 ? h + b - c.offsetWidth : h + b, 0 > tipleft &&
                    (tipleft = 0));
                c.style.left = tipleft + "px"
            },
            g: document.all
        },
        m = document.getElementById("mandarinspot-tip"),
        x = !0;
    window.mandarinspot || (window.mandarinspot = {});
    mandarinspot.annotate = I;
    mandarinspot.showPopups = function(a) {
        x = a
    };
    mandarinspot.showInline = J;
    mandarinspot.supported = function() {
        return "withCredentials" in new XMLHttpRequest ? !0 : !!XDomainRequest
    };
    mandarinspot.run = function() {
        I(document.body, {
            phonetic: mandarinspot.phonetic,
            show: !0,
            inline: mandarinspot.inline
        })
    };
    mandarinspot.bookmark && mandarinspot.run()
})();