try {
    /*
     updatemybrowser.org JavaScript Library v1
     http://updatemybrowser.org/

     Copyright 2015, Joram van den Boezem
     Licensed under the GPL Version 3 license.
     http://www.gnu.org/licenses/gpl.html

     Based on Browser detect script by Peter-Paul Koch
     See http://www.quirksmode.org/js/detect.html
     Require UMB.Detect
     Require UMB.Browsers
     updatemybrowser.org JavaScript Library v1
     http://updatemybrowser.org/

     Copyright 2012, Joram van den Boezem
     Licensed under the GPL Version 3 license.
     http://www.gnu.org/licenses/gpl.html

     Require UMB.Status
    */
    UMB = function() {
        function c(f, a, e) {
            e = e || 0;
            for (var l in f) try {
                f[l] = a[l].constructor == Object ? c(f[l], a[l], e + 1) : a[l]
            } catch (d) {}
            return f
        }

        var a = !1,
            g = !1,
            h = {},
            e = function() {
                if (!a) {
                    a = !0;
                    UMB.Detect.init();
                    var f = window._umb || {};
                    h = {
                        require: {
                            chrome: UMB.Browsers.chrome.minimum,
                            firefox: UMB.Browsers.firefox.minimum,
                            ie: UMB.Browsers.ie.minimum,
                            opera: UMB.Browsers.opera.minimum,
                            safari: UMB.Browsers.safari.minimum,
                            edge: UMB.Browsers.edge.minimum
                        },
                        display: !0,
                        nonCritical: !1
                    };
                    h = c(h, f)
                }
            };
        return {
            load: function() {
                g || (g = !0, UMB.attach(window,
                    "load",
                    function() {
                        e();
                        h.display && UMB.autoDisplayWidget()
                    }))
            },
            attach: function(a, c, e) {
                a.addEventListener ? window.addEventListener(c, e, !1) : a.attachEvent && a.attachEvent("on" + c, e)
            },
            getConfig: function() {
                e();
                return h
            },
            getCurrentBrowser: function() {
                e();
                return UMB.Detect.browser
            },
            getCurrentVersion: function() {
                e();
                return UMB.Detect.version
            },
            getBrowserInfo: function(a) {
                e();
                return UMB.Browsers[a]
            },
            getStatus: function() {
                e();
                return UMB.Status.getStatus()
            },
            displayWidget: function() {
                e();
                UMB.Widget.display()
            },
            hideWidget: function() {
                e();
                UMB.Widget.hide()
            },
            autoDisplayWidget: function() {
                e();
                if (-1 == document.cookie.indexOf("_umb=hide")) {
                    var a = UMB.getStatus();
                    "update" == a && h.nonCritical ? UMB.displayWidget() : "warning" == a && UMB.displayWidget()
                }
            },
            scrollToTop: function() {
                var a = document.body,
                    c = document.documentElement;
                c = a.clientHeight ? a : c;
                c.scrollTop = 0
            }
        }
    }();
    UMB.load();
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Browsers = {
        chrome: {
            name: "Chrome",
            vendor: "Google",
            current: "62",
            minimum: "61",
            update_url: "https://www.google.com/chrome/browser/desktop/index.html",
            info_url: "https://www.google.com/chrome/"
        },
        safari: {
            name: "Safari",
            vendor: "Apple",
            current: "11",
            minimum: "10",
            update_url: "http://www.apple.fr/safari/",
            info_url: "http://www.apple.fr/safari/"
        },
        edge: {
            name: "Edge",
            vendor: "Microsoft",
            current: "16",
            minimum: "15",
            update_url: "https://www.microsoft.com/en-us/download/details.aspx?id=48126",
            info_url: "https://www.microsoft.com/fr-fr/windows/microsoft-edge"
        },
        firefox: {
            name: "Firefox",
            vendor: "Mozilla",
            current: "56",
            minimum: "55",
            update_url: "https://www.mozilla.org/fr/firefox/new/",
            info_url: "https://www.mozilla.org/fr/firefox/new/"
        },
        ie: {
            name: "Internet Explorer",
            vendor: "Microsoft",
            current: "11",
            minimum: "10",
            update_url: "http://www.microsoft.com/ie",
            info_url: "http://windows.microsoft.com/internet-explorer"
        },
        opera: {
            name: "Opera",
            vendor: null,
            current: "48",
            minimum: "47",
            update_url: "https://www.opera.com/fr",
            info_url: "https://www.opera.com/fr/computer"
        }
    };
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Detect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "unknown";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "unknown"
        },
        searchString: function(c) {
            for (var a = 0; a < c.length; a++) {
                var g = c[a].string,
                    h = c[a].prop;
                this.versionSearchString = c[a].versionSearch || c[a].identity;
                if (g) {
                    if (-1 != g.indexOf(c[a].subString)) return c[a].identity
                } else if (h) return c[a].identity
            }
        },
        searchVersion: function(c) {
            var a =
                c.indexOf(this.versionSearchString);
            if (-1 != a) return parseFloat(c.substring(a + this.versionSearchString.length + 1))
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "OPR/",
            identity: "opera",
            versionSearch: "OPR"
        }, {
            string: navigator.userAgent,
            subString: "Edge",
            identity: "edge",
            versionSearch: "Edge"
        }, {
            string: navigator.userAgent,
            subString: "Chrome",
            versionSearch: "Chrome",
            identity: "chrome"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "safari",
            versionSearch: "Version"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            versionSearch: "Firefox",
            identity: "firefox"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "ie",
            versionSearch: "MSIE"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "ie",
            versionSearch: "rv"
        }],
        dataOS: [{
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iOS"
        }, {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iOS"
        }, {
            string: navigator.userAgent,
            subString: "Android",
            identity: "Android"
        }, {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }]
    };
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Status = function() {
        return {
            getStatus: function() {
                var c = UMB.getBrowserInfo(UMB.Detect.browser),
                    a = UMB.Detect.OS;
                if (!c || "iOS" == a || "Android" == a) return "unsupported";
                c = parseFloat(c.current);
                a = parseFloat(UMB.getConfig().require[UMB.Detect.browser]);
                return UMB.Detect.version >= c ? "latest" : UMB.Detect.version >= a ? "update" : "warning"
            }
        }
    }();
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Widget = function() {
        var c = !1,
            a = !1,
            g = function(d, b) {
                for (var a in d) b.style[a] = d[a]
            },
            h = function() {
                a = !1;
                var d = document.getElementById("BrowserBar");
                d && document.getElementsByTagName("body")[0].removeChild(d);
                d = document.createElement("div");
                g({
                    display: "none",
                    position: "absolute",
                    height: "19px",
                    fontSize: "14px",
                    lineHeight: "1em",
                    fontFamily: "Arial, sans-serif",
                    color: "black",
                    padding: "10px 0",
                    top: "-40px",
                    left: "0px",
                    backgroundColor: "#FDF2AB",
                    backgroundImage: "url(/warning.png)",
                    backgroundPosition: "10px center",
                    backgroundRepeat: "no-repeat",
                    borderBottom: "1px solid #A29330",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    zoom: "1",
                    zIndex: 9999,
                    "-webkit-box-sizing": "content-box",
                    "-moz-box-sizing": "content-box",
                    "box-sizing": "content-box",
                    overflow: "hidden"
                }, d);
                d.setAttribute("id", "BrowserBar");
                var b = document.createElement("p");
                g({
                    margin: "0px 0px 0px 40px",
                    padding: "0px",
                    lineHeight: "1.5em"
                }, b);
                var c = document.createElement("a");
                c.href = "javascript:void(0);";
                c.title = "Don't show me this notification bar for the next 24 hours";
                c.onclick = function(b) {
                    b || (b = window.event);
                    b.cancelBubble = !0;
                    b.stopPropagation && b.stopPropagation();
                    UMB.Widget.hidePersistent(1);
                    return !1
                };
                g({
                    display: "block",
                    width: "20px",
                    height: "20px",
                    margin: "0px 0px 0px 40px",
                    padding: "0px",
                    lineHeight: "1.5em",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundImage: "url(/close.png)",
                    backgroundPosition: "0 0",
                    backgroundRepeat: "no-repeat"
                }, c);
                d.appendChild(b);
                d.appendChild(c);
                document.getElementsByTagName("body")[0].appendChild(d)
            },
            e = function() {
                var d =
                    UMB.getStatus(),
                    b = UMB.getBrowserInfo(UMB.getCurrentBrowser()),
                    c = UMB.getCurrentVersion();
                if (d && b && c) {
                    var e = document.getElementById("BrowserBar"),
                        k = document.createElement("a");
                    k.href = "";
                    k.onclick = function() {
                        return !1
                    };
                    k.style.color = "#2183d0";
                    k.style.fontWeight = "bold";
                    k.target = "_blank";
                    var f = "",
                        l = "";
                    "latest" == d ? (f = "Vous avez installé la dernière version disponible de (" + b.name + " " + c + "). ", k.style.color = "#00A651", k.appendChild(document.createTextNode("Learn more"))) : "update" ==
                        d ? (f = "Une mise à jour de (" + b.name + " " + b.current + ") est disponible. Veuillez ", k.appendChild(document.createTextNode("installer cette mise à jour")), l = ".") : "warning" == d && (f = "Une mise à jour importante de sécurité de (" + b.name + " " + b.current + ") est disponible. Veuillez ", k.style.color = "#ED1C24", k.appendChild(document.createTextNode("installer ce correctif critique")), l = ".", a = !0);
                    e.getElementsByTagName("p")[0].appendChild(document.createTextNode(f));
                    e.getElementsByTagName("p")[0].appendChild(k);
                    e.getElementsByTagName("p")[0].appendChild(document.createTextNode(l));
                    document.getElementById("BrowserBar").onclick = function() {
                        window.open(k.href)
                    }
                }
            },
            f = function(d, b) {
                var a;
                window.getComputedStyle ? a = window.getComputedStyle(d)[b] : d.currentStyle && (a = d.currentStyle[b]);
                a || (a = d.style[b]);
                return a
            },
            l = function(a, b, c, e, k, h, g) {
                "opacity" == b && l(a, "filter", 100 * c, e, k, "alpha(opacity=", ")");
                h = h || "";
                g = g || ""; - 1 < "|top|marginTop|".indexOf(b) && (g = g || "px");
                var d = parseFloat(f(a, b).replace(h, "").replace(g, "")) || 0;
                if (0 == c.toString().indexOf("+") || 0 == c.toString().indexOf("-")) c = d + parseFloat(c);
                var r = 1 / (e / 10),
                    n = 0,
                    p = function(b) {
                        return Math.round(100 * (d + (c - d) * (.5 - Math.cos(b * Math.PI) / 2))) / 100
                    },
                    m = setInterval(function() {
                        n += r;
                        a.style[b] = h + p(n) + g;
                        1 <= n && (clearInterval(m), a.style[b] = h + p(1) + g, k && k())
                    }, 10)
            },
            m = function() {
                var d = document.getElementsByTagName("body")[0],
                    b = document.getElementById("BrowserBar");
                if ("none" === f(b, "display") && (d.className += " umb-active", b.style.opacity = "0", b.style.filter = "alpha(opacity=0)", b.style.display = "block", l(b, "opacity", .95, 600), "ie" == UMB.getCurrentBrowser() && "BackCompat" ==
                        document.compatMode ? (b.style.top = "0px", b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px") : (d.style.position = "relative", d.style.overflow = "visible", l(d, "top", "+40", 300), a || (UMB.attach(window, "resize", function() {
                            b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px"
                        }), b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px", b.style.top = "-" + (parseFloat(f(d, "marginTop")) + 40) + "px", b.style.left = "-" + parseFloat(f(d,
                            "marginLeft")) + "px")), a))
                    if ("ie" == UMB.getCurrentBrowser() && "BackCompat" == document.compatMode) UMB.attach(window, "scroll", function() {
                        b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + (!b.offsetHeight && 0) + "px"
                    }), b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + (!b.offsetHeight && 0) + "px";
                    else if ("ie" == UMB.getCurrentBrowser() && 6 >= UMB.getCurrentVersion()) {
                    UMB.attach(window, "resize", function() {
                        b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) +
                            "px"
                    });
                    b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px";
                    var c = parseFloat(f(d, "marginTop")) + 40;
                    b.style.top = "-" + c + "px";
                    b.style.left = "-" + parseFloat(f(d, "marginLeft")) + "px";
                    UMB.attach(window, "scroll", function() {
                        b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) - c + "px"
                    });
                    b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) - c + "px"
                } else b.style.top = "0px", b.style.position = "fixed"
            },
            q = function() {
                var a = document.getElementsByTagName("body")[0],
                    b = document.getElementById("BrowserBar");
                "block" === f(b, "display") && (a.className = a.className.replace(" umb-active", ""), l(b, "opacity", 0, 600, function() {
                    b.style.display = "none"
                }), "ie" == UMB.getCurrentBrowser() && "BackCompat" == document.compatMode || l(a, "top", "-40", 300))
            };
        return {
            init: function() {
                c || (c = !0, UMB.Widget.redraw())
            },
            redraw: function() {
                h();
                e()
            },
            display: function() {
                UMB.Widget.init();
                m()
            },
            hide: function() {
                UMB.Widget.init();
                q()
            },
            hidePersistent: function(a) {
                a = a || 1;
                var b = new Date;
                b.setDate(b.getDate() + a);
                a = encodeURIComponent("hide") +
                    (null == a ? "" : "; expires=" + b.toUTCString()) + "; path=/";
                document.cookie = "_umb=" + a;
                UMB.hideWidget()
            }
        }
    }();
} catch (e) {
    throw 'JavaScript parse error (' + e.message + ').';
}
UMB.Widget.display();