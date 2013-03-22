/* beautified this to be able to change some stuff :)) */
jQuery && function () {
  var a = $(window),
    K = $(document);
  $.extend($.fn, {
    contextMenu: function (l, s) {
      if (l.menu == undefined) return false;
      if (l.inSpeed == undefined) l.inSpeed = 150;
      if (l.outSpeed == undefined) l.outSpeed = 75;
      if (l.inSpeed == 0) l.inSpeed = -1;
      if (l.outSpeed == 0) l.outSpeed = -1;
      $(this).each(function () {
        var v = $(this),
          G = $(v).offset(),
          e = $("#" + l.menu);
        e.addClass("contextMenu");
        $(this).bind("mousedown", function (f) {
          $(this).mouseup(function (k) {
            var n = $(this);
            n.unbind("mouseup");
            if (f.button === 2 || l.allowLeft || f.ctrlKey && svgedit.browser.isMac()) {
              k.stopPropagation();
              $(".contextMenu").hide();
              if (v.hasClass("disabled")) return false;
              var F = k.pageX,
                B = k.pageY;
              k = a.width() - e.width();
              var A = a.height() - e.height();
              if (F > k - 15) F = k - 15;
              if (B > A - 30) B = A - 30;
              K.unbind("click");
              e.css({
                top: B,
                left: F
              }).fadeIn(l.inSpeed);
              e.find("A").mouseover(function () {
                e.find("LI.hover").removeClass("hover");
                $(this).parent().addClass("hover")
              }).mouseout(function () {
                e.find("LI.hover").removeClass("hover")
              });
              K.keypress(function (O) {
                switch (O.keyCode) {
                  case 38:
                    if (e.find("LI.hover").length) {
                      e.find("LI.hover").removeClass("hover").prevAll("LI:not(.disabled)").eq(0).addClass("hover");
                      e.find("LI.hover").length || e.find("LI:last").addClass("hover")
                    } else e.find("LI:last").addClass("hover");
                    break;
                  case 40:
                    if (e.find("LI.hover").length == 0) e.find("LI:first").addClass("hover");
                    else {
                      e.find("LI.hover").removeClass("hover").nextAll("LI:not(.disabled)").eq(0).addClass("hover");
                      e.find("LI.hover").length || e.find("LI:first").addClass("hover")
                    }
                    break;
                  case 13:
                    e.find("LI.hover A").trigger("click");
                    break;
                  case 27:
                    K.trigger("click")
                }
              });
              e.find("A").unbind("mouseup");
              e.find("LI:not(.disabled) A").mouseup(function () {
                K.unbind("click").unbind("keypress");
                $(".contextMenu").hide();
                s && s($(this).attr("href").substr(1), $(n), {
                  x: F - G.left,
                  y: B - G.top,
                  docX: F,
                  docY: B
                });
                return false
              });
              setTimeout(function () {
                K.click(function () {
                  K.unbind("click").unbind("keypress");
                  e.fadeOut(l.outSpeed);
                  return false
                })
              }, 0)
            }
          })
        });
        if ($.browser.mozilla) $("#" + l.menu).each(function () {
          $(this).css({
            MozUserSelect: "none"
          })
        });
        else $.browser.msie ? $("#" + l.menu).each(function () {
          $(this).bind("selectstart.disableTextSelect", function () {
            return false
          })
        }) : $("#" + l.menu).each(function () {
          $(this).bind("mousedown.disableTextSelect",

          function () {
            return false
          })
        });
        $(v).add($("UL.contextMenu")).bind("contextmenu", function () {
          return false
        })
      });
      return $(this)
    },
    disableContextMenuItems: function (l) {
      if (l == undefined) {
        $(this).find("LI").addClass("disabled");
        return $(this)
      }
      $(this).each(function () {
        if (l != undefined) for (var s = l.split(","), v = 0; v < s.length; v++) $(this).find('A[href="' + s[v] + '"]').parent().addClass("disabled")
      });
      return $(this)
    },
    enableContextMenuItems: function (l) {
      if (l == undefined) {
        $(this).find("LI.disabled").removeClass("disabled");
        return $(this)
      }
      $(this).each(function () {
        if (l != undefined) for (var s = l.split(","), v = 0; v < s.length; v++) $(this).find('A[href="' + s[v] + '"]').parent().removeClass("disabled")
      });
      return $(this)
    },
    disableContextMenu: function () {
      $(this).each(function () {
        $(this).addClass("disabled")
      });
      return $(this)
    },
    enableContextMenu: function () {
      $(this).each(function () {
        $(this).removeClass("disabled")
      });
      return $(this)
    },
    destroyContextMenu: function () {
      $(this).each(function () {
        $(this).unbind("mousedown").unbind("mouseup")
      });
      return $(this)
    }
  })
}(jQuery);
var svgedit = svgedit || {};
(function () {
  if (!svgedit.browser) svgedit.browser = {};
  var a = !! document.createElementNS && !! document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
  svgedit.browser.supportsSvg = function () {
    return a
  };
  if (svgedit.browser.supportsSvg()) {
    var K = navigator.userAgent,
      l = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      s = !! window.opera,
      v = K.indexOf("AppleWebKit") >= 0,
      G = K.indexOf("Gecko/") >= 0,
      e = K.indexOf("MSIE") >= 0,
      f = K.indexOf("Chrome/") >= 0,
      k = K.indexOf("Windows") >= 0,
      n = K.indexOf("Macintosh") >= 0,
      F = "ontouchstart" in window,
      B = !! l.querySelector,
      A = !! document.evaluate,
      O = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "path");
        ia.setAttribute("d", "M0,0 10,10");
        var da = ia.pathSegList;
        ia = ia.createSVGPathSegLinetoAbs(5, 5);
        try {
          da.replaceItem(ia, 0);
          return true
        } catch (Ya) {}
        return false
      }(),
      Z = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "path");
        ia.setAttribute("d", "M0,0 10,10");
        var da = ia.pathSegList;
        ia = ia.createSVGPathSegLinetoAbs(5, 5);
        try {
          da.insertItemBefore(ia,
          0);
          return true
        } catch (Ya) {}
        return false
      }(),
      N = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
          da = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        document.documentElement.appendChild(ia);
        da.setAttribute("x", 5);
        ia.appendChild(da);
        var Ya = document.createElementNS("http://www.w3.org/2000/svg", "text");
        Ya.textContent = "a";
        da.appendChild(Ya);
        da = Ya.getStartPositionOfChar(0).x;
        document.documentElement.removeChild(ia);
        return da === 0
      }(),
      L = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg",
          "svg");
        document.documentElement.appendChild(ia);
        var da = document.createElementNS("http://www.w3.org/2000/svg", "path");
        da.setAttribute("d", "M0,0 C0,0 10,10 10,0");
        ia.appendChild(da);
        da = da.getBBox();
        document.documentElement.removeChild(ia);
        return da.height > 4 && da.height < 5
      }(),
      na = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        document.documentElement.appendChild(ia);
        var da = document.createElementNS("http://www.w3.org/2000/svg", "path");
        da.setAttribute("d", "M0,0 10,0");
        var Ya = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Ya.setAttribute("d", "M5,0 15,0");
        var kb = document.createElementNS("http://www.w3.org/2000/svg", "g");
        kb.appendChild(da);
        kb.appendChild(Ya);
        ia.appendChild(kb);
        da = kb.getBBox();
        document.documentElement.removeChild(ia);
        return da.width == 15
      }(),
      ca = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        ia.setAttribute("x", 0.1);
        (ia = ia.cloneNode(false).getAttribute("x").indexOf(",") == -1) || $.alert("NOTE: This version of Opera is known to contain bugs in SVG-edit.\n\t\tPlease upgrade to the <a href='http://opera.com'>latest version</a> in which the problems have been fixed.");
        return ia
      }(),
      oa = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        ia.setAttribute("style", "vector-effect:non-scaling-stroke");
        return ia.style.vectorEffect === "non-scaling-stroke"
      }(),
      pa = function () {
        var ia = document.createElementNS("http://www.w3.org/2000/svg", "rect").transform.baseVal,
          da = l.createSVGTransform();
        ia.appendItem(da);
        return ia.getItem(0) == da
      }();
    svgedit.browser.isOpera = function () {
      return s
    };
    svgedit.browser.isWebkit = function () {
      return v
    };
    svgedit.browser.isGecko = function () {
      return G
    };
    svgedit.browser.isIE = function () {
      return e
    };
    svgedit.browser.isChrome = function () {
      return f
    };
    svgedit.browser.isWindows = function () {
      return k
    };
    svgedit.browser.isMac = function () {
      return n
    };
    svgedit.browser.isTouch = function () {
      return F
    };
    svgedit.browser.supportsSelectors = function () {
      return B
    };
    svgedit.browser.supportsXpath = function () {
      return A
    };
    svgedit.browser.supportsPathReplaceItem = function () {
      return O
    };
    svgedit.browser.supportsPathInsertItemBefore = function () {
      return Z
    };
    svgedit.browser.supportsPathBBox = function () {
      return L
    };
    svgedit.browser.supportsHVLineContainerBBox = function () {
      return na
    };
    svgedit.browser.supportsGoodTextCharPos = function () {
      return N
    };
    svgedit.browser.supportsEditableText = function () {
      return s
    };
    svgedit.browser.supportsGoodDecimals = function () {
      return ca
    };
    svgedit.browser.supportsNonScalingStroke = function () {
      return oa
    };
    svgedit.browser.supportsNativeTransformLists = function () {
      return pa
    }
  } else window.location = "browser-not-supported.html"
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.transformlist) svgedit.transformlist = {};
  var a = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    K = {};
  svgedit.transformlist.SVGTransformList = function (l) {
    this._elem = l || null;
    this._xforms = [];
    this._update = function () {
      var s = "";
      a.createSVGMatrix();
      for (var v = 0; v < this.numberOfItems; ++v) {
        var G = this._list.getItem(v);
        s = s;
        G = G;
        var e = G.matrix,
          f = "";
        switch (G.type) {
          case 1:
            f = "matrix(" + [e.a, e.b, e.c, e.d, e.e, e.f].join(",") + ")";
            break;
          case 2:
            f = "translate(" + e.e + "," + e.f + ")";
            break;
          case 3:
            f = e.a == e.d ? "scale(" + e.a + ")" : "scale(" + e.a + "," + e.d + ")";
            break;
          case 4:
            var k = 0;
            f = 0;
            if (G.angle != 0) {
              k = 1 - e.a;
              f = (k * e.f + e.b * e.e) / (k * k + e.b * e.b);
              k = (e.e - e.b * f) / k
            }
            f = "rotate(" + G.angle + " " + k + "," + f + ")"
        }
        s = s + (f + " ")
      }
      this._elem.setAttribute("transform", s)
    };
    this._list = this;
    this._init = function () {
      var s = this._elem.getAttribute("transform");
      if (s) for (var v = /\s*((scale|matrix|rotate|translate)\s*\(.*?\))\s*,?\s*/, G = true; G;) {
        G = s.match(v);
        s = s.replace(v, "");
        if (G && G[1]) {
          var e = G[1].split(/\s*\(/),
            f = e[0];
          e = e[1].match(/\s*(.*?)\s*\)/);
          e[1] = e[1].replace(/(\d)-/g, "$1 -");
          var k = e[1].split(/[, ]+/),
            n = "abcdef".split(""),
            F = a.createSVGMatrix();
          $.each(k, function (O, Z) {
            k[O] = parseFloat(Z);
            if (f == "matrix") F[n[O]] = k[O]
          });
          e = a.createSVGTransform();
          var B = "set" + f.charAt(0).toUpperCase() + f.slice(1),
            A = f == "matrix" ? [F] : k;
          if (f == "scale" && A.length == 1) A.push(A[0]);
          else if (f == "translate" && A.length == 1) A.push(0);
          else if (f == "rotate" && A.length == 1) {
            A.push(0);
            A.push(0)
          }
          e[B].apply(e, A);
          this._list.appendItem(e)
        }
      }
    };
    this._removeFromOtherLists = function (s) {
      if (s) {
        var v = false,
          G;
        for (G in K) {
          for (var e = K[G], f = 0, k = e._xforms.length; f < k; ++f) if (e._xforms[f] == s) {
            v = true;
            e.removeItem(f);
            break
          }
          if (v) break
        }
      }
    };
    this.numberOfItems = 0;
    this.clear = function () {
      this.numberOfItems = 0;
      this._xforms = []
    };
    this.initialize = function (s) {
      this.numberOfItems = 1;
      this._removeFromOtherLists(s);
      this._xforms = [s]
    };
    this.getItem = function (s) {
      if (s < this.numberOfItems && s >= 0) return this._xforms[s];
      throw {
        code: 1
      };
    };
    this.insertItemBefore = function (s, v) {
      var G = null;
      if (v >= 0) if (v < this.numberOfItems) {
        this._removeFromOtherLists(s);
        G = Array(this.numberOfItems + 1);
        for (var e = 0; e < v; ++e) G[e] = this._xforms[e];
        G[e] = s;
        for (var f = e + 1; e < this.numberOfItems; ++f, ++e) G[f] = this._xforms[e];
        this.numberOfItems++;
        this._xforms = G;
        G = s;
        this._list._update()
      } else G = this._list.appendItem(s);
      return G
    };
    this.replaceItem = function (s, v) {
      var G = null;
      if (v < this.numberOfItems && v >= 0) {
        this._removeFromOtherLists(s);
        G = this._xforms[v] = s;
        this._list._update()
      }
      return G
    };
    this.removeItem = function (s) {
      if (s < this.numberOfItems && s >= 0) {
        for (var v = this._xforms[s], G = Array(this.numberOfItems - 1), e = 0; e < s; ++e) G[e] = this._xforms[e];
        for (s = e; s < this.numberOfItems - 1; ++s, ++e) G[s] = this._xforms[e + 1];
        this.numberOfItems--;
        this._xforms = G;
        this._list._update();
        return v
      } else throw {
        code: 1
      };
    };
    this.appendItem = function (s) {
      this._removeFromOtherLists(s);
      this._xforms.push(s);
      this.numberOfItems++;
      this._list._update();
      return s
    }
  };
  svgedit.transformlist.resetListMap = function () {
    K = {}
  };
  svgedit.transformlist.removeElementFromListMap = function (l) {
    l.id && K[l.id] && delete K[l.id]
  };
  svgedit.transformlist.getTransformList = function (l) {
    if (svgedit.browser.supportsNativeTransformLists()) if (l.transform) return l.transform.baseVal;
    else if (l.gradientTransform) return l.gradientTransform.baseVal;
    else {
      if (l.patternTransform) return l.patternTransform.baseVal
    } else {
      var s = l.id;
      s || (s = "temp");
      var v = K[s];
      if (!v || s == "temp") {
        K[s] = new svgedit.transformlist.SVGTransformList(l);
        K[s]._init();
        v = K[s]
      }
      return v
    }
    return null
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.math) svgedit.math = {};
  var a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgedit.math.transformPoint = function (K, l, s) {
    return {
      x: s.a * K + s.c * l + s.e,
      y: s.b * K + s.d * l + s.f
    }
  };
  svgedit.math.isIdentity = function (K) {
    return K.a === 1 && K.b === 0 && K.c === 0 && K.d === 1 && K.e === 0 && K.f === 0
  };
  svgedit.math.matrixMultiply = function () {
    for (var K = arguments, l = K.length, s = K[l - 1]; l-- > 1;) s = K[l - 1].multiply(s);
    if (Math.abs(s.a) < 1.0E-14) s.a = 0;
    if (Math.abs(s.b) < 1.0E-14) s.b = 0;
    if (Math.abs(s.c) < 1.0E-14) s.c = 0;
    if (Math.abs(s.d) < 1.0E-14) s.d = 0;
    if (Math.abs(s.e) < 1.0E-14) s.e = 0;
    if (Math.abs(s.f) < 1.0E-14) s.f = 0;
    return s
  };
  svgedit.math.hasMatrixTransform = function (K) {
    if (!K) return false;
    for (var l = K.numberOfItems; l--;) {
      var s = K.getItem(l);
      if (s.type == 1 && !svgedit.math.isIdentity(s.matrix)) return true
    }
    return false
  };
  svgedit.math.transformBox = function (K, l, s, v, G) {
    var e = {
      x: K,
      y: l
    }, f = {
      x: K + s,
      y: l
    };
    s = {
      x: K + s,
      y: l + v
    };
    K = {
      x: K,
      y: l + v
    };
    l = svgedit.math.transformPoint;
    e = l(e.x, e.y, G);
    var k = v = e.x,
      n = e.y,
      F = e.y;
    f = l(f.x, f.y, G);
    v = Math.min(v, f.x);
    k = Math.max(k, f.x);
    n = Math.min(n, f.y);
    F = Math.max(F, f.y);
    K = l(K.x, K.y, G);
    v = Math.min(v, K.x);
    k = Math.max(k, K.x);
    n = Math.min(n, K.y);
    F = Math.max(F, K.y);
    s = l(s.x, s.y, G);
    v = Math.min(v, s.x);
    k = Math.max(k, s.x);
    n = Math.min(n, s.y);
    F = Math.max(F, s.y);
    return {
      tl: e,
      tr: f,
      bl: K,
      br: s,
      aabox: {
        x: v,
        y: n,
        width: k - v,
        height: F - n
      }
    }
  };
  svgedit.math.transformListToTransform = function (K, l, s) {
    if (K == null) return a.createSVGTransformFromMatrix(a.createSVGMatrix());
    l = l == undefined ? 0 : l;
    s = s == undefined ? K.numberOfItems - 1 : s;
    l = parseInt(l);
    s = parseInt(s);
    if (l > s) {
      var v = s;
      s = l;
      l = v
    }
    v = a.createSVGMatrix();
    for (l = l; l <= s; ++l) {
      var G = l >= 0 && l < K.numberOfItems ? K.getItem(l).matrix : a.createSVGMatrix();
      v = svgedit.math.matrixMultiply(v, G)
    }
    return a.createSVGTransformFromMatrix(v)
  };
  svgedit.math.getMatrix = function (K) {
    K = svgedit.transformlist.getTransformList(K);
    return svgedit.math.transformListToTransform(K).matrix
  };
  svgedit.math.snapToAngle = function (K, l, s, v) {
    var G = Math.PI / 4;
    s = s - K;
    var e = v - l;
    v = Math.sqrt(s * s + e * e);
    G = Math.round(Math.atan2(e, s) / G) * G;
    return {
      x: K + v * Math.cos(G),
      y: l + v * Math.sin(G),
      a: G
    }
  };
  svgedit.math.rectsIntersect = function (K, l) {
    return l.x < K.x + K.width && l.x + l.width > K.x && l.y < K.y + K.height && l.y + l.height > K.y
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.units) svgedit.units = {};
  var a = ["x", "x1", "cx", "rx", "width"],
    K = ["y", "y1", "cy", "ry", "height"],
    l = $.merge(["r", "radius"], a);
  $.merge(l, K);
  var s, v = {
    px: 1
  };
  svgedit.units.init = function (e) {
    s = e;
    e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.body.appendChild(e);
    var f = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    f.setAttribute("width", "1em");
    f.setAttribute("height", "1ex");
    f.setAttribute("x", "1in");
    e.appendChild(f);
    f = f.getBBox();
    document.body.removeChild(e);
    e = f.x;
    v.em = f.width;
    v.ex = f.height;
    v["in"] = e;
    v.cm = e / 2.54;
    v.mm = e / 25.4;
    v.pt = e / 72;
    v.pc = e / 6;
    v["%"] = 0
  };
  svgedit.units.getTypeMap = function () {
    return v
  };
  svgedit.units.shortFloat = function (e) {
    var f = s.getRoundDigits();
    if (isNaN(e)) {
      if ($.isArray(e)) return svgedit.units.shortFloat(e[0]) + "," + svgedit.units.shortFloat(e[1])
    } else return +(+e).toFixed(f);
    return parseFloat(e).toFixed(f) - 0
  };
  svgedit.units.convertUnit = function (e, f) {
    f = f || s.getBaseUnit();
    return svgedit.unit.shortFloat(e / v[f])
  };
  svgedit.units.setUnitAttr = function (e,
  f, k) {
    isNaN(k) || e.getAttribute(f);
    e.setAttribute(f, k)
  };
  var G = {
    line: ["x1", "x2", "y1", "y2"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    foreignObject: ["x", "y", "width", "height"],
    rect: ["x", "y", "width", "height"],
    image: ["x", "y", "width", "height"],
    use: ["x", "y", "width", "height"],
    text: ["x", "y"]
  };
  svgedit.units.convertAttrs = function (e) {
    var f = e.tagName,
      k = s.getBaseUnit();
    if (f = G[f]) for (var n = f.length, F = 0; F < n; F++) {
      var B = f[F],
        A = e.getAttribute(B);
      if (A) isNaN(A) || e.setAttribute(B, A / v[k] + k)
    }
  };
  svgedit.units.convertToNum = function (e, f) {
    if (!isNaN(f)) return f - 0;
    if (f.substr(-1) === "%") {
      var k = f.substr(0, f.length - 1) / 100,
        n = s.getWidth(),
        F = s.getHeight();
      return a.indexOf(e) >= 0 ? k * n : K.indexOf(e) >= 0 ? k * F : k * Math.sqrt(n * n + F * F) / Math.sqrt(2)
    } else {
      n = f.substr(-2);
      k = f.substr(0, f.length - 2);
      return k * v[n]
    }
  };
  svgedit.units.isValidUnit = function (e, f, k) {
    var n = false;
    if (l.indexOf(e) >= 0) if (isNaN(f)) {
      f = f.toLowerCase();
      $.each(v, function (A) {
        if (!n) if (RegExp("^-?[\\d\\.]+" + A + "$").test(f)) n = true
      })
    } else n = true;
    else if (e == "id") {
      e = false;
      try {
        var F = s.getElement(f);
        e = F == null || F === k
      } catch (B) {}
      return e
    } else n = true;
    return n
  }
})();
svgedit = svgedit || {};
(function () {
  function a(e) {
    if (svgedit.browser.supportsHVLineContainerBBox()) try {
      return e.getBBox()
    } catch (f) {}
    var k = $.data(e, "ref"),
      n = null;
    if (k) {
      var F = $(k).children().clone().attr("visibility", "hidden");
      $(G).append(F);
      n = F.filter("line, path")
    } else n = $(e).find("line, path");
    var B = false;
    if (n.length) {
      n.each(function () {
        var A = this.getBBox();
        if (!A.width || !A.height) B = true
      });
      if (B) {
        e = k ? F : $(e).children();
        ret = getStrokedBBox(e)
      } else ret = e.getBBox()
    } else ret = e.getBBox();
    k && F.remove();
    return ret
  }
  if (!svgedit.utilities) svgedit.utilities = {};
  var K = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
    l = null,
    s = null,
    v = null,
    G = null;
  svgedit.utilities.init = function (e) {
    l = e;
    s = e.getDOMDocument();
    v = e.getDOMContainer();
    G = e.getSVGRoot()
  };
  svgedit.utilities.toXml = function (e) {
    return $("<p/>").text(e).html()
  };
  svgedit.utilities.fromXml = function (e) {
    return $("<p/>").html(e).text()
  };
  svgedit.utilities.encode64 = function (e) {
    e = svgedit.utilities.convertToXMLReferences(e);
    if (window.btoa) return window.btoa(e);
    var f = Array(Math.floor((e.length + 2) / 3) * 4),
      k, n, F, B, A, O, Z = 0,
      N = 0;
    do {
      k = e.charCodeAt(Z++);
      n = e.charCodeAt(Z++);
      F = e.charCodeAt(Z++);
      B = k >> 2;
      k = (k & 3) << 4 | n >> 4;
      A = (n & 15) << 2 | F >> 6;
      O = F & 63;
      if (isNaN(n)) A = O = 64;
      else if (isNaN(F)) O = 64;
      f[N++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(B);
      f[N++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k);
      f[N++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(A);
      f[N++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(O)
    } while (Z < e.length);
    return f.join("")
  };
  svgedit.utilities.decode64 = function (e) {
    if (window.atob) return window.atob(e);
    var f = "",
      k, n, F = "",
      B, A = "",
      O = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
      k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(O++));
      n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(O++));
      B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(O++));
      A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(O++));
      k = k << 2 | n >> 4;
      n = (n & 15) << 4 | B >> 2;
      F = (B & 3) << 6 | A;
      f += String.fromCharCode(k);
      if (B != 64) f += String.fromCharCode(n);
      if (A != 64) f += String.fromCharCode(F)
    } while (O < e.length);
    return unescape(f)
  };
  svgedit.utilities.convertToXMLReferences = function (e) {
    for (var f = "", k = 0; k < e.length; k++) {
      var n = e.charCodeAt(k);
      if (n < 128) f += e[k];
      else if (n > 127) f += "&#" + n + ";"
    }
    return f
  };
  svgedit.utilities.text2xml = function (e) {
    if (e.indexOf("<svg:svg") >= 0) e = e.replace(/<(\/?)svg:/g, "<$1").replace("xmlns:svg", "xmlns");
    var f;
    try {
      var k = window.DOMParser ? new DOMParser : new ActiveXObject("Microsoft.XMLDOM");
      k.async = false
    } catch (n) {
      throw Error("XML Parser could not be instantiated");
    }
    try {
      f = k.loadXML ? k.loadXML(e) ? k : false : k.parseFromString(e, "text/xml")
    } catch (F) {
      throw Error("Error parsing XML string");
    }
    return f
  };
  svgedit.utilities.bboxToObj = function (e) {
    return {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    }
  };
  svgedit.utilities.walkTree = function (e, f) {
    if (e && e.nodeType == 1) {
      f(e);
      for (var k = e.childNodes.length; k--;) svgedit.utilities.walkTree(e.childNodes.item(k), f)
    }
  };
  svgedit.utilities.walkTreePost = function (e, f) {
    if (e && e.nodeType == 1) {
      for (var k = e.childNodes.length; k--;) svgedit.utilities.walkTree(e.childNodes.item(k), f);
      f(e)
    }
  };
  svgedit.utilities.getUrlFromAttr = function (e) {
    if (e) if (e.indexOf('url("') === 0) return e.substring(5, e.indexOf('"', 6));
    else if (e.indexOf("url('") === 0) return e.substring(5, e.indexOf("'", 6));
    else if (e.indexOf("url(") === 0) return e.substring(4, e.indexOf(")"));
    return null
  };
  svgedit.utilities.getHref = function (e) {
    return e.getAttributeNS("http://www.w3.org/1999/xlink",
      "href")
  };
  svgedit.utilities.setHref = function (e, f) {
    e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f)
  };
  svgedit.utilities.findDefs = function (e) {
    e = l.getSVGContent().documentElement;
    var f = e.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
    return f = f.length > 0 ? f[0] : e.insertBefore(e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "defs"), e.firstChild.nextSibling)
  };
  svgedit.utilities.getPathBBox = function (e) {
    var f = e.pathSegList,
      k = f.numberOfItems;
    e = [
      [],
      []
    ];
    var n = f.getItem(0),
      F = [n.x, n.y];
    for (n = 0; n < k; n++) {
      var B = f.getItem(n);
      if (typeof B.x != "undefined") {
        e[0].push(F[0]);
        e[1].push(F[1]);
        if (B.x1) {
          for (var A = [B.x1, B.y1], O = [B.x2, B.y2], Z = [B.x, B.y], N = 0; N < 2; N++) {
            B = function (pa) {
              return Math.pow(1 - pa, 3) * F[N] + 3 * Math.pow(1 - pa, 2) * pa * A[N] + 3 * (1 - pa) * Math.pow(pa, 2) * O[N] + Math.pow(pa, 3) * Z[N]
            };
            var L = 6 * F[N] - 12 * A[N] + 6 * O[N],
              na = -3 * F[N] + 9 * A[N] - 9 * O[N] + 3 * Z[N],
              ca = 3 * A[N] - 3 * F[N];
            if (na == 0) {
              if (L != 0) {
                L = -ca / L;
                0 < L && L < 1 && e[N].push(B(L))
              }
            } else {
              ca = Math.pow(L, 2) - 4 * ca * na;
              if (!(ca < 0)) {
                var oa = (-L + Math.sqrt(ca)) / (2 * na);
                0 < oa && oa < 1 && e[N].push(B(oa));
                L = (-L - Math.sqrt(ca)) / (2 * na);
                0 < L && L < 1 && e[N].push(B(L))
              }
            }
          }
          F = Z
        } else {
          e[0].push(B.x);
          e[1].push(B.y)
        }
      }
    }
    f = Math.min.apply(null, e[0]);
    k = Math.max.apply(null, e[0]) - f;
    n = Math.min.apply(null, e[1]);
    e = Math.max.apply(null, e[1]) - n;
    return {
      x: f,
      y: n,
      width: k,
      height: e
    }
  };
  svgedit.utilities.getBBox = function (e) {
    var f = e || l.geSelectedElements()[0];
    if (e.nodeType != 1) return null;
    e = null;
    var k = f.nodeName;
    switch (k) {
      case "text":
        if (f.textContent === "") {
          f.textContent = "a";
          e = f.getBBox();
          f.textContent = ""
        } else try {
          e = f.getBBox()
        } catch (n) {}
        break;
      case "path":
        if (svgedit.browser.supportsPathBBox()) try {
          e = f.getBBox()
        } catch (F) {} else e = svgedit.utilities.getPathBBox(f);
        break;
      case "g":
      case "a":
        e = a(f);
        break;
      default:
        if (k === "use") e = a(f, true);
        if (k === "use") {
          e || (e = f.getBBox());
          k = {};
          k.width = e.width;
          k.height = e.height;
          k.x = e.x + parseFloat(f.getAttribute("x") || 0);
          k.y = e.y + parseFloat(f.getAttribute("y") || 0);
          e = k
        } else if (~K.indexOf(k)) try {
          e = f.getBBox()
        } catch (B) {
          f = $(f).closest("foreignObject");
          if (f.length) try {
            e = f[0].getBBox()
          } catch (A) {
            e = null
          } else e = null
        }
    }
    if (e) e = svgedit.utilities.bboxToObj(e);
    return e
  };
  svgedit.utilities.getRotationAngle = function (e, f) {
    var k = e || l.getSelectedElements()[0];
    k = svgedit.transformlist.getTransformList(k);
    if (!k) return 0;
    for (var n = k.numberOfItems, F = 0; F < n; ++F) {
      var B = k.getItem(F);
      if (B.type == 4) return f ? B.angle * Math.PI / 180 : B.angle
    }
    return 0
  };
  svgedit.utilities.getElem = svgedit.browser.supportsSelectors() ? function (e) {
    return G.querySelector("#" + e)
  } : svgedit.browser.supportsXpath() ? function (e) {
    return s.evaluate('svg:svg[@id="svgroot"]//svg:*[@id="' + e + '"]', v, function () {
      return "http://www.w3.org/2000/svg"
    }, 9, null).singleNodeValue
  } : function (e) {
    return $(G).find("[id=" + e + "]")[0]
  };
  svgedit.utilities.assignAttributes = function (e, f, k, n) {
    k || (k = 0);
    svgedit.browser.isOpera() || G.suspendRedraw(k);
    for (var F in f) if (k = F.substr(0, 4) === "xml:" ? "http://www.w3.org/XML/1998/namespace" : F.substr(0, 6) === "xlink:" ? "http://www.w3.org/1999/xlink" : null) e.setAttributeNS(k, F, f[F]);
    else n ? svgedit.units.setUnitAttr(e, F, f[F]) : e.setAttribute(F, f[F]);
    svgedit.browser.isOpera() || G.unsuspendRedraw(null)
  };
  svgedit.utilities.cleanupElement = function (e) {
    var f = G.suspendRedraw(60),
      k = {
        "fill-opacity": 1,
        "stop-opacity": 1,
        opacity: 1,
        stroke: "none",
        "stroke-dasharray": "none",
        "stroke-linejoin": "miter",
        "stroke-linecap": "butt",
        "stroke-opacity": 1,
        "stroke-width": 1,
        rx: 0,
        ry: 0
      }, n;
    for (n in k) {
      var F = k[n];
      e.getAttribute(n) == F && e.removeAttribute(n)
    }
    G.unsuspendRedraw(f)
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.sanitize) svgedit.sanitize = {};
  var a = {};
  a["http://www.w3.org/1999/xlink"] = "xlink";
  a["http://www.w3.org/XML/1998/namespace"] = "xml";
  a["http://www.w3.org/2000/xmlns/"] = "xmlns";
  a["http://svg-edit.googlecode.com"] = "se";
  a["http://www.w3.org/1999/xhtml"] = "xhtml";
  a["http://www.w3.org/1998/Math/MathML"] = "mathml";
  var K = {};
  $.each(a, function (v, G) {
    K[G] = v
  });
  var l = {
    a: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "stroke", "stroke-dasharray",
      "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "xlink:href", "xlink:title"],
    circle: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "r", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    clipPath: ["class",
      "clipPathUnits", "id"],
    defs: [],
    style: ["type"],
    desc: [],
    ellipse: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    feGaussianBlur: ["class", "color-interpolation-filters", "id", "requiredFeatures", "stdDeviation"],
    filter: ["class", "color-interpolation-filters",
      "filterRes", "filterUnits", "height", "id", "primitiveUnits", "requiredFeatures", "width", "x", "xlink:href", "y"],
    foreignObject: ["class", "font-size", "height", "id", "opacity", "requiredFeatures", "style", "transform", "width", "x", "y"],
    g: ["class", "clip-path", "clip-rule", "id", "display", "fill", "fill-opacity", "fill-rule", "filter", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage",
      "transform", "font-family", "font-size", "font-style", "font-weight", "tgitanchor"],
    image: ["class", "clip-path", "clip-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:href", "xlink:title", "y"],
    line: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
      "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "x1", "x2", "y1", "y2"],
    linearGradient: ["class", "id", "gradientTransform", "gradientUnits", "requiredFeatures", "spreadMethod", "systemLanguage", "x1", "x2", "xlink:href", "y1", "y2"],
    marker: ["id", "class", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "systemLanguage", "viewBox"],
    mask: ["class", "height", "id", "maskContentUnits", "maskUnits", "width", "x", "y"],
    metadata: ["class", "id"],
    path: ["class",
      "clip-path", "clip-rule", "d", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    pattern: ["class", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:href", "y"],
    polygon: ["class",
      "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "id", "class", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    polyline: ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points",
      "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    radialGradient: ["class", "cx", "cy", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "requiredFeatures", "spreadMethod", "systemLanguage", "xlink:href"],
    rect: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray",
      "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "width", "x", "y"],
    stop: ["class", "id", "offset", "requiredFeatures", "stop-color", "stop-opacity", "style", "systemLanguage"],
    svg: ["class", "clip-path", "clip-rule", "filter", "id", "height", "mask", "preserveAspectRatio", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xmlns", "xmlns:se", "xmlns:xlink", "y"],
    "switch": ["class", "id", "requiredFeatures", "systemLanguage"],
    symbol: ["class", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "opacity", "preserveAspectRatio", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "viewBox"],
    text: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity",
      "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "transform", "x", "xml:space", "y"],
    textPath: ["class", "id", "method", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "transform", "xlink:href"],
    title: [],
    tspan: ["class", "clip-path", "clip-rule", "dx", "dy", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight",
      "id", "mask", "opacity", "requiredFeatures", "rotate", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "textLength", "transform", "x", "xml:space", "y"],
    use: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width",
      "style", "transform", "width", "x", "xlink:href", "y"],
    annotation: ["encoding"],
    "annotation-xml": ["encoding"],
    maction: ["actiontype", "other", "selection"],
    math: ["class", "id", "display", "xmlns"],
    menclose: ["notation"],
    merror: [],
    mfrac: ["linethickness"],
    mi: ["mathvariant"],
    mmultiscripts: [],
    mn: [],
    mo: ["fence", "lspace", "maxsize", "minsize", "rspace", "stretchy"],
    mover: [],
    mpadded: ["lspace", "width", "height", "depth", "voffset"],
    mphantom: [],
    mprescripts: [],
    mroot: [],
    mrow: ["xlink:href", "xlink:type", "xmlns:xlink"],
    mspace: ["depth",
      "height", "width"],
    msqrt: [],
    mstyle: ["displaystyle", "mathbackground", "mathcolor", "mathvariant", "scriptlevel"],
    msub: [],
    msubsup: [],
    msup: [],
    mtable: ["align", "columnalign", "columnlines", "columnspacing", "displaystyle", "equalcolumns", "equalrows", "frame", "rowalign", "rowlines", "rowspacing", "width"],
    mtd: ["columnalign", "columnspan", "rowalign", "rowspan"],
    mtext: [],
    mtr: ["columnalign", "rowalign"],
    munder: [],
    munderover: [],
    none: [],
    semantics: []
  }, s = {};
  $.each(l, function (v, G) {
    var e = {};
    $.each(G, function (f, k) {
      if (k.indexOf(":") >= 0) {
        var n = k.split(":");
        e[n[1]] = K[n[0]]
      } else e[k] = k == "xmlns" ? "http://www.w3.org/2000/xmlns/" : null
    });
    s[v] = e
  });
  svgedit.sanitize.getNSMap = function () {
    return a
  };
  svgedit.sanitize.sanitizeSvg = function (v) {
    if (v.nodeType == 3) {
      v.nodeValue = v.nodeValue.replace(/^\s+|\s+$/g, "");
      v.nodeValue.length || v.parentNode.removeChild(v)
    }
    if (v.nodeType == 1) {
      var G = v.parentNode;
      if (v.ownerDocument && G) {
        var e = l[v.nodeName],
          f = s[v.nodeName];
        if (e != undefined) {
          for (var k = [], n = v.attributes.length; n--;) {
            var F = v.attributes.item(n),
              B = F.nodeName,
              A = F.localName,
              O = F.namespaceURI;
            if (!(f.hasOwnProperty(A) && O == f[A] && O != "http://www.w3.org/2000/xmlns/") && !(O == "http://www.w3.org/2000/xmlns/" && a[F.nodeValue])) {
              B.indexOf("se:") == 0 && k.push([B, F.nodeValue]);
              v.removeAttributeNS(O, A)
            }
            if (svgedit.browser.isGecko()) switch (B) {
              case "transform":
              case "gradientTransform":
              case "patternTransform":
                A = F.nodeValue.replace(/(\d)-/g, "$1 -");
                v.setAttribute(B, A)
            }
            if (B == "style") {
              F = F.nodeValue.split(";");
              for (B = F.length; B--;) {
                A = F[B].split(":");
                e.indexOf(A[0]) >= 0 && v.setAttribute(A[0],
                A[1])
              }
              v.removeAttribute("style")
            }
          }
          $.each(k, function (Z, N) {
            v.setAttributeNS("http://svg-edit.googlecode.com", N[0], N[1])
          });
          if ((n = svgedit.utilities.getHref(v)) && ["filter", "linearGradient", "pattern", "radialGradient", "textPath", "use"].indexOf(v.nodeName) >= 0) if (n[0] != "#") {
            svgedit.utilities.setHref(v, "");
            v.removeAttributeNS("http://www.w3.org/1999/xlink", "href")
          }
          if (v.nodeName == "use" && !svgedit.utilities.getHref(v)) G.removeChild(v);
          else {
            $.each(["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start",
              "mask", "stroke"], function (Z, N) {
              var L = v.getAttribute(N);
              if (L) if ((L = svgedit.utilities.getUrlFromAttr(L)) && L[0] !== "#") {
                v.setAttribute(N, "");
                v.removeAttribute(N)
              }
            });
            for (n = v.childNodes.length; n--;) svgedit.sanitize.sanitizeSvg(v.childNodes.item(n))
          }
        } else {
          for (e = []; v.hasChildNodes();) e.push(G.insertBefore(v.firstChild, v));
          G.removeChild(v);
          for (n = e.length; n--;) svgedit.sanitize.sanitizeSvg(e[n])
        }
      }
    }
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.history) svgedit.history = {};
  svgedit.history.HistoryEventTypes = {
    BEFORE_APPLY: "before_apply",
    AFTER_APPLY: "after_apply",
    BEFORE_UNAPPLY: "before_unapply",
    AFTER_UNAPPLY: "after_unapply"
  };
  svgedit.history.MoveElementCommand = function (a, K, l, s) {
    this.elem = a;
    this.text = s ? "Move " + a.tagName + " to " + s : "Move " + a.tagName;
    this.oldNextSibling = K;
    this.oldParent = l;
    this.newNextSibling = a.nextSibling;
    this.newParent = a.parentNode
  };
  svgedit.history.MoveElementCommand.type = function () {
    return "svgedit.history.MoveElementCommand"
  };
  svgedit.history.MoveElementCommand.prototype.type = svgedit.history.MoveElementCommand.type;
  svgedit.history.MoveElementCommand.prototype.getText = function () {
    return this.text
  };
  svgedit.history.MoveElementCommand.prototype.apply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    this.elem = this.newParent.insertBefore(this.elem, this.newNextSibling);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
  };
  svgedit.history.MoveElementCommand.prototype.unapply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY,
    this);
    this.elem = this.oldParent.insertBefore(this.elem, this.oldNextSibling);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
  };
  svgedit.history.MoveElementCommand.prototype.elements = function () {
    return [this.elem]
  };
  svgedit.history.InsertElementCommand = function (a, K) {
    this.elem = a;
    this.text = K || "Create " + a.tagName;
    this.parent = a.parentNode;
    this.nextSibling = this.elem.nextSibling
  };
  svgedit.history.InsertElementCommand.type = function () {
    return "svgedit.history.InsertElementCommand"
  };
  svgedit.history.InsertElementCommand.prototype.type = svgedit.history.InsertElementCommand.type;
  svgedit.history.InsertElementCommand.prototype.getText = function () {
    return this.text
  };
  svgedit.history.InsertElementCommand.prototype.apply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    this.elem = this.parent.insertBefore(this.elem, this.nextSibling);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
  };
  svgedit.history.InsertElementCommand.prototype.unapply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY,
    this);
    this.parent = this.elem.parentNode;
    this.elem = this.elem.parentNode.removeChild(this.elem);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
  };
  svgedit.history.InsertElementCommand.prototype.elements = function () {
    return [this.elem]
  };
  svgedit.history.RemoveElementCommand = function (a, K, l, s) {
    this.elem = a;
    this.text = s || "Delete " + a.tagName;
    this.nextSibling = K;
    this.parent = l;
    svgedit.transformlist.removeElementFromListMap(a)
  };
  svgedit.history.RemoveElementCommand.type = function () {
    return "svgedit.history.RemoveElementCommand"
  };
  svgedit.history.RemoveElementCommand.prototype.type = svgedit.history.RemoveElementCommand.type;
  svgedit.history.RemoveElementCommand.prototype.getText = function () {
    return this.text
  };
  svgedit.history.RemoveElementCommand.prototype.apply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    svgedit.transformlist.removeElementFromListMap(this.elem);
    this.parent = this.elem.parentNode;
    this.elem = this.parent.removeChild(this.elem);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY,
    this)
  };
  svgedit.history.RemoveElementCommand.prototype.unapply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    svgedit.transformlist.removeElementFromListMap(this.elem);
    this.nextSibling == null && window.console && console.log("Error: reference element was lost");
    this.parent.insertBefore(this.elem, this.nextSibling);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
  };
  svgedit.history.RemoveElementCommand.prototype.elements = function () {
    return [this.elem]
  };
  svgedit.history.ChangeElementCommand = function (a, K, l) {
    this.elem = a;
    this.text = l ? "Change " + a.tagName + " " + l : "Change " + a.tagName;
    this.newValues = {};
    this.oldValues = K;
    for (var s in K) this.newValues[s] = s == "#text" ? a.textContent : s == "#href" ? svgedit.utilities.getHref(a) : a.getAttribute(s)
  };
  svgedit.history.ChangeElementCommand.type = function () {
    return "svgedit.history.ChangeElementCommand"
  };
  svgedit.history.ChangeElementCommand.prototype.type = svgedit.history.ChangeElementCommand.type;
  svgedit.history.ChangeElementCommand.prototype.getText = function () {
    return this.text
  };
  svgedit.history.ChangeElementCommand.prototype.apply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    var K = false,
      l;
    for (l in this.newValues) {
      if (this.newValues[l]) if (l == "#text") this.elem.textContent = this.newValues[l];
      else l == "#href" ? svgedit.utilities.setHref(this.elem, this.newValues[l]) : this.elem.setAttribute(l, this.newValues[l]);
      else if (l == "#text") this.elem.textContent = "";
      else {
        this.elem.setAttribute(l, "");
        this.elem.removeAttribute(l)
      }
      if (l ==
        "transform") K = true
    }
    if (!K) if (K = svgedit.utilities.getRotationAngle(this.elem)) {
      l = elem.getBBox();
      K = ["rotate(", K, " ", l.x + l.width / 2, ",", l.y + l.height / 2, ")"].join("");
      K != elem.getAttribute("transform") && elem.setAttribute("transform", K)
    }
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    return true
  };
  svgedit.history.ChangeElementCommand.prototype.unapply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    var K = false,
      l;
    for (l in this.oldValues) {
      if (this.oldValues[l]) if (l ==
        "#text") this.elem.textContent = this.oldValues[l];
      else l == "#href" ? svgedit.utilities.setHref(this.elem, this.oldValues[l]) : this.elem.setAttribute(l, this.oldValues[l]);
      else if (l == "#text") this.elem.textContent = "";
      else this.elem.removeAttribute(l);
      if (l == "transform") K = true
    }
    if (!K) if (K = svgedit.utilities.getRotationAngle(this.elem)) {
      l = elem.getBBox();
      K = ["rotate(", K, " ", l.x + l.width / 2, ",", l.y + l.height / 2, ")"].join("");
      K != elem.getAttribute("transform") && elem.setAttribute("transform", K)
    }
    svgedit.transformlist.removeElementFromListMap(this.elem);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    return true
  };
  svgedit.history.ChangeElementCommand.prototype.elements = function () {
    return [this.elem]
  };
  svgedit.history.BatchCommand = function (a) {
    this.text = a || "Batch Command";
    this.stack = []
  };
  svgedit.history.BatchCommand.type = function () {
    return "svgedit.history.BatchCommand"
  };
  svgedit.history.BatchCommand.prototype.type = svgedit.history.BatchCommand.type;
  svgedit.history.BatchCommand.prototype.getText = function () {
    return this.text
  };
  svgedit.history.BatchCommand.prototype.apply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    for (var K = this.stack.length, l = 0; l < K; ++l) this.stack[l].apply(a);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
  };
  svgedit.history.BatchCommand.prototype.unapply = function (a) {
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    for (var K = this.stack.length - 1; K >= 0; K--) this.stack[K].unapply(a);
    a && a.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY,
    this)
  };
  svgedit.history.BatchCommand.prototype.elements = function () {
    for (var a = [], K = this.stack.length; K--;) for (var l = this.stack[K].elements(), s = l.length; s--;) a.indexOf(l[s]) == -1 && a.push(l[s]);
    return a
  };
  svgedit.history.BatchCommand.prototype.addSubCommand = function (a) {
    this.stack.push(a)
  };
  svgedit.history.BatchCommand.prototype.isEmpty = function () {
    return this.stack.length == 0
  };
  svgedit.history.UndoManager = function (a) {
    this.handler_ = a || null;
    this.undoStackPointer = 0;
    this.undoStack = [];
    this.undoChangeStackPointer = -1;
    this.undoableChangeStack = []
  };
  svgedit.history.UndoManager.prototype.resetUndoStack = function () {
    this.undoStack = [];
    this.undoStackPointer = 0
  };
  svgedit.history.UndoManager.prototype.getUndoStackSize = function () {
    return this.undoStackPointer
  };
  svgedit.history.UndoManager.prototype.getRedoStackSize = function () {
    return this.undoStack.length - this.undoStackPointer
  };
  svgedit.history.UndoManager.prototype.getNextUndoCommandText = function () {
    return this.undoStackPointer > 0 ? this.undoStack[this.undoStackPointer - 1].getText() :
      ""
  };
  svgedit.history.UndoManager.prototype.getNextRedoCommandText = function () {
    return this.undoStackPointer < this.undoStack.length ? this.undoStack[this.undoStackPointer].getText() : ""
  };
  svgedit.history.UndoManager.prototype.undo = function () {
    this.undoStackPointer > 0 && this.undoStack[--this.undoStackPointer].unapply(this.handler_)
  };
  svgedit.history.UndoManager.prototype.redo = function () {
    this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0 && this.undoStack[this.undoStackPointer++].apply(this.handler_)
  };
  svgedit.history.UndoManager.prototype.addCommandToHistory = function (a) {
    if (this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) this.undoStack = this.undoStack.splice(0, this.undoStackPointer);
    this.undoStack.push(a);
    this.undoStackPointer = this.undoStack.length
  };
  svgedit.history.UndoManager.prototype.beginUndoableChange = function (a, K) {
    for (var l = ++this.undoChangeStackPointer, s = K.length, v = Array(s), G = Array(s); s--;) {
      var e = K[s];
      if (e != null) {
        G[s] = e;
        v[s] = e.getAttribute(a)
      }
    }
    this.undoableChangeStack[l] = {
      attrName: a,
      oldValues: v,
      elements: G
    }
  };
  svgedit.history.UndoManager.prototype.finishUndoableChange = function () {
    for (var a = this.undoChangeStackPointer--, K = this.undoableChangeStack[a], l = K.elements.length, s = K.attrName, v = new svgedit.history.BatchCommand("Change " + s); l--;) {
      var G = K.elements[l];
      if (G != null) {
        var e = {};
        e[s] = K.oldValues[l];
        e[s] != G.getAttribute(s) && v.addSubCommand(new svgedit.history.ChangeElementCommand(G, e, s))
      }
    }
    this.undoableChangeStack[a] = null;
    return v
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.select) svgedit.select = {};
  var a, K, l, s;
  svgedit.browser.isTouch() ? s = 10 : s = 4;
  svgedit.select.Selector = function (v, G) {
    this.id = v;
    this.selectedElement = G;
    this.locked = true;
    this.selectorGroup = a.createSVGElement({
      element: "g",
      attr: {
        id: "selectorGroup" + this.id
      }
    });
    this.selectorRect = this.selectorGroup.appendChild(a.createSVGElement({
      element: "path",
      attr: {
        id: "selectedBox" + this.id,
        fill: "none",
        stroke: "#22C",
        "stroke-width": "1",
        "stroke-dasharray": "5,5",
        style: "pointer-events:none"
      }
    }));
    this.gripCoords = {
      nw: null,
      n: null,
      ne: null,
      e: null,
      se: null,
      s: null,
      sw: null,
      w: null
    };
    this.reset(this.selectedElement)
  };
  svgedit.select.Selector.prototype.reset = function (v) {
    this.locked = true;
    this.selectedElement = v;
    this.resize();
    this.selectorGroup.setAttribute("display", "inline")
  };
  svgedit.select.Selector.prototype.updateGripCursors = function (v) {
    var G = [];
    v = Math.round(v / 45);
    if (v < 0) v += 8;
    for (var e in l.selectorGrips) G.push(e);
    for (; v > 0;) {
      G.push(G.shift());
      v--
    }
    v = 0;
    for (e in l.selectorGrips) {
      l.selectorGrips[e].setAttribute("style",
        "cursor:" + G[v] + "-resize");
      v++
    }
  };
  svgedit.select.Selector.prototype.showGrips = function (v) {
    l.selectorGripsGroup.setAttribute("display", v ? "inline" : "none");
    var G = this.selectedElement;
    this.hasGrips = v;
    if (G && v) {
      this.selectorGroup.appendChild(l.selectorGripsGroup);
      this.updateGripCursors(svgedit.utilities.getRotationAngle(G))
    }
  };
  svgedit.select.Selector.prototype.resize = function () {
    var v = this.selectorRect,
      G = l,
      e = G.selectorGrips,
      f = this.selectedElement,
      k = f.getAttribute("stroke-width"),
      n = a.currentZoom(),
      F = 1 / n;
    if (f.getAttribute("stroke") !==
      "none" && !isNaN(k)) F += k / 2;
    var B = f.tagName;
    if (B === "text") F += 2 / n;
    k = svgedit.transformlist.getTransformList(f);
    k = svgedit.math.transformListToTransform(k).matrix;
    k.e *= n;
    k.f *= n;
    var A = svgedit.utilities.getBBox(f);
    if (B === "g" && !$.data(f, "gsvg")) if (B = a.getStrokedBBox(f.childNodes)) A = B;
    B = A.x;
    var O = A.y,
      Z = A.width;
    A = A.height;
    F *= n;
    n = svgedit.math.transformBox(B * n, O * n, Z * n, A * n, k);
    k = n.aabox;
    B = k.x - F;
    O = k.y - F;
    Z = k.width + F * 2;
    var N = k.height + F * 2;
    k = B + Z / 2;
    A = O + N / 2;
    if (f = svgedit.utilities.getRotationAngle(f)) {
      B = a.svgRoot().createSVGTransform();
      B.setRotate(-f, k, A);
      B = B.matrix;
      n.tl = svgedit.math.transformPoint(n.tl.x, n.tl.y, B);
      n.tr = svgedit.math.transformPoint(n.tr.x, n.tr.y, B);
      n.bl = svgedit.math.transformPoint(n.bl.x, n.bl.y, B);
      n.br = svgedit.math.transformPoint(n.br.x, n.br.y, B);
      B = n.tl;
      Z = B.x;
      N = B.y;
      var L = B.x,
        na = B.y;
      B = Math.min;
      O = Math.max;
      Z = B(Z, B(n.tr.x, B(n.bl.x, n.br.x))) - F;
      N = B(N, B(n.tr.y, B(n.bl.y, n.br.y))) - F;
      L = O(L, O(n.tr.x, O(n.bl.x, n.br.x))) + F;
      na = O(na, O(n.tr.y, O(n.bl.y, n.br.y))) + F;
      B = Z;
      O = N;
      Z = L - Z;
      N = na - N
    }
    F = a.svgRoot().suspendRedraw(100);
    v.setAttribute("d",
      "M" + B + "," + O + " L" + (B + Z) + "," + O + " " + (B + Z) + "," + (O + N) + " " + B + "," + (O + N) + "z");
    this.selectorGroup.setAttribute("transform", f ? "rotate(" + [f, k, A].join(",") + ")" : "");
    this.gripCoords = {
      nw: [B, O],
      ne: [B + Z, O],
      sw: [B, O + N],
      se: [B + Z, O + N],
      n: [B + Z / 2, O],
      w: [B, O + N / 2],
      e: [B + Z, O + N / 2],
      s: [B + Z / 2, O + N]
    };
    for (var ca in this.gripCoords) {
      v = this.gripCoords[ca];
      e[ca].setAttribute("cx", v[0]);
      e[ca].setAttribute("cy", v[1])
    }
    G.rotateGripConnector.setAttribute("x1", B + Z / 2);
    G.rotateGripConnector.setAttribute("y1", O);
    G.rotateGripConnector.setAttribute("x2",
    B + Z / 2);
    G.rotateGripConnector.setAttribute("y2", O - s * 5);
    G.rotateGrip.setAttribute("cx", B + Z / 2);
    G.rotateGrip.setAttribute("cy", O - s * 5);
    a.svgRoot().unsuspendRedraw(F)
  };
  svgedit.select.SelectorManager = function () {
    this.rubberBandBox = this.selectorParentGroup = null;
    this.selectors = [];
    this.selectorMap = {};
    this.selectorGrips = {
      nw: null,
      n: null,
      ne: null,
      e: null,
      se: null,
      s: null,
      sw: null,
      w: null
    };
    this.rotateGrip = this.rotateGripConnector = this.selectorGripsGroup = null;
    this.initGroup()
  };
  svgedit.select.SelectorManager.prototype.initGroup = function () {
    this.selectorParentGroup && this.selectorParentGroup.parentNode && this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup);
    this.selectorParentGroup = a.createSVGElement({
      element: "g",
      attr: {
        id: "selectorParentGroup"
      }
    });
    this.selectorGripsGroup = a.createSVGElement({
      element: "g",
      attr: {
        display: "none"
      }
    });
    this.selectorParentGroup.appendChild(this.selectorGripsGroup);
    a.svgRoot().appendChild(this.selectorParentGroup);
    this.selectorMap = {};
    this.selectors = [];
    this.rubberBandBox = null;
    for (var v in this.selectorGrips) {
      var G = a.createSVGElement({
        element: "circle",
        attr: {
          id: "selectorGrip_resize_" + v,
          fill: "#22C",
          r: s,
          style: "cursor:" + v + "-resize",
          "stroke-width": 2,
          "pointer-events": "all"
        }
      });
      $.data(G, "dir", v);
      $.data(G, "type", "resize");
      this.selectorGrips[v] = this.selectorGripsGroup.appendChild(G)
    }
    this.rotateGripConnector = this.selectorGripsGroup.appendChild(a.createSVGElement({
      element: "line",
      attr: {
        id: "selectorGrip_rotateconnector",
        stroke: "#22C",
        "stroke-width": "1"
      }
    }));
    this.rotateGrip = this.selectorGripsGroup.appendChild(a.createSVGElement({
      element: "circle",
      attr: {
        id: "selectorGrip_rotate",
        fill: "lime",
        r: s,
        stroke: "#22C",
        "stroke-width": 2,
        style: "cursor:url(" + K.imgPath + "rotate.png) 12 12, auto;"
      }
    }));
    $.data(this.rotateGrip, "type", "rotate");
    if (!$("#canvasBackground").length) {
      v = K.dimensions;
      v = a.createSVGElement({
        element: "svg",
        attr: {
          id: "canvasBackground",
          width: v[0],
          height: v[1],
          x: 0,
          y: 0,
          overflow: svgedit.browser.isWebkit() ? "none" : "visible",
          style: "pointer-events:none"
        }
      });
      G = a.createSVGElement({
        element: "rect",
        attr: {
          width: "100%",
          height: "100%",
          x: 0,
          y: 0,
          "stroke-width": 1,
          stroke: "#000",
          fill: "#FFF",
          style: "pointer-events:none"
        }
      });
      v.appendChild(G);
      a.svgRoot().insertBefore(v, a.svgContent())
    }
  };
  svgedit.select.SelectorManager.prototype.requestSelector = function (v) {
    if (v == null) return null;
    var G = this.selectors.length;
    if (typeof this.selectorMap[v.id] == "object") {
      this.selectorMap[v.id].locked = true;
      return this.selectorMap[v.id]
    }
    for (var e = 0; e < G; ++e) if (this.selectors[e] && !this.selectors[e].locked) {
      this.selectors[e].locked = true;
      this.selectors[e].reset(v);
      this.selectorMap[v.id] = this.selectors[e];
      return this.selectors[e]
    }
    this.selectors[G] = new svgedit.select.Selector(G, v);
    this.selectorParentGroup.appendChild(this.selectors[G].selectorGroup);
    this.selectorMap[v.id] = this.selectors[G];
    return this.selectors[G]
  };
  svgedit.select.SelectorManager.prototype.releaseSelector = function (v) {
    if (v != null) for (var G = this.selectors.length, e = this.selectorMap[v.id], f = 0; f < G; ++f) if (this.selectors[f] && this.selectors[f] == e) {
      e.locked == false && console.log("WARNING! selector was released but was already unlocked");
      delete this.selectorMap[v.id];
      e.locked = false;
      e.selectedElement = null;
      e.showGrips(false);
      try {
        e.selectorGroup.setAttribute("display", "none")
      } catch (k) {}
      break
    }
  };
  svgedit.select.SelectorManager.prototype.getRubberBandBox = function () {
    if (!this.rubberBandBox) this.rubberBandBox = this.selectorParentGroup.appendChild(a.createSVGElement({
      element: "rect",
      attr: {
        id: "selectorRubberBand",
        fill: "#22C",
        "fill-opacity": 0.15,
        stroke: "#22C",
        "stroke-width": 0.5,
        display: "none",
        style: "pointer-events:none"
      }
    }));
    return this.rubberBandBox
  };
  svgedit.select.init = function (v,
  G) {
    K = v;
    a = G;
    l = new svgedit.select.SelectorManager
  };
  svgedit.select.getSelectorManager = function () {
    return l
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.draw) svgedit.draw = {};
  var a = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
    K = {
      LET_DOCUMENT_DECIDE: 0,
      ALWAYS_RANDOMIZE: 1,
      NEVER_RANDOMIZE: 2
    }, l = K.LET_DOCUMENT_DECIDE;
  svgedit.draw.Layer = function (s, v) {
    this.name_ = s;
    this.group_ = v
  };
  svgedit.draw.Layer.prototype.getName = function () {
    return this.name_
  };
  svgedit.draw.Layer.prototype.getGroup = function () {
    return this.group_
  };
  svgedit.draw.randomizeIds = function (s, v) {
    l = s == false ? K.NEVER_RANDOMIZE : K.ALWAYS_RANDOMIZE;
    if (l == K.ALWAYS_RANDOMIZE && !v.getNonce()) v.setNonce(Math.floor(Math.random() * 100001));
    else l == K.NEVER_RANDOMIZE && v.getNonce() && v.clearNonce()
  };
  svgedit.draw.Drawing = function (s, v) {
    if (!s || !s.tagName || !s.namespaceURI || s.tagName != "svg" || s.namespaceURI != "http://www.w3.org/2000/svg") throw "Error: svgedit.draw.Drawing instance initialized without a <svg> element";
    this.svgElem_ = s;
    this.obj_num = 0;
    this.idPrefix = v || "svg_";
    this.releasedNums = [];
    this.all_layers = [];
    this.current_layer = null;
    this.nonce_ =
      "";
    var G = this.svgElem_.getAttributeNS("http://svg-edit.googlecode.com", "nonce");
    if (G && l != K.NEVER_RANDOMIZE) this.nonce_ = G;
    else l == K.ALWAYS_RANDOMIZE && this.setNonce(Math.floor(Math.random() * 100001))
  };
  svgedit.draw.Drawing.prototype.getElem_ = function (s) {
    return this.svgElem_.querySelector ? this.svgElem_.querySelector("#" + s) : $(this.svgElem_).find("[id=" + s + "]")[0]
  };
  svgedit.draw.Drawing.prototype.getSvgElem = function () {
    return this.svgElem_
  };
  svgedit.draw.Drawing.prototype.getNonce = function () {
    return this.nonce_
  };
  svgedit.draw.Drawing.prototype.setNonce = function (s) {
    this.svgElem_.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:se", "http://svg-edit.googlecode.com");
    this.svgElem_.setAttributeNS("http://svg-edit.googlecode.com", "se:nonce", s);
    this.nonce_ = s
  };
  svgedit.draw.Drawing.prototype.clearNonce = function () {
    this.nonce_ = ""
  };
  svgedit.draw.Drawing.prototype.getId = function () {
    return this.nonce_ ? this.idPrefix + this.nonce_ + "_" + this.obj_num : this.idPrefix + this.obj_num
  };
  svgedit.draw.Drawing.prototype.getNextId = function () {
    var s = this.obj_num,
      v = false;
    if (this.releasedNums.length > 0) {
      this.obj_num = this.releasedNums.pop();
      v = true
    } else this.obj_num++;
    for (var G = this.getId(); this.getElem_(G);) {
      if (v) {
        this.obj_num = s;
        v = false
      }
      this.obj_num++;
      G = this.getId()
    }
    if (v) this.obj_num = s;
    return G
  };
  svgedit.draw.Drawing.prototype.releaseId = function (s) {
    var v = this.idPrefix + (this.nonce_ ? this.nonce_ + "_" : "");
    if (typeof s != "string" || s.indexOf(v) != 0) return false;
    s = parseInt(s.substr(v.length));
    if (typeof s != "number" || s <= 0 || this.releasedNums.indexOf(s) != -1) return false;
    this.releasedNums.push(s);
    return true
  };
  svgedit.draw.Drawing.prototype.getNumLayers = function () {
    return this.all_layers.length
  };
  svgedit.draw.Drawing.prototype.hasLayer = function (s) {
    for (var v = 0; v < this.getNumLayers(); v++) if (this.all_layers[v][0] == s) return true;
    return false
  };
  svgedit.draw.Drawing.prototype.getLayerName = function (s) {
    if (s >= 0 && s < this.getNumLayers()) return this.all_layers[s][0];
    return ""
  };
  svgedit.draw.Drawing.prototype.getCurrentLayer = function () {
    return this.current_layer
  };
  svgedit.draw.Drawing.prototype.getCurrentLayerName = function () {
    for (var s = 0; s < this.getNumLayers(); ++s) if (this.all_layers[s][1] == this.current_layer) return this.getLayerName(s);
    return ""
  };
  svgedit.draw.Drawing.prototype.setCurrentLayer = function (s) {
    for (var v = 0; v < this.getNumLayers(); ++v) if (s == this.getLayerName(v)) {
      if (this.current_layer != this.all_layers[v][1]) {
        this.current_layer.setAttribute("style", "pointer-events:none");
        this.current_layer = this.all_layers[v][1];
        this.current_layer.setAttribute("style", "pointer-events:all")
      }
      return true
    }
    return false
  };
  svgedit.draw.Drawing.prototype.deleteCurrentLayer = function () {
    if (this.current_layer && this.getNumLayers() > 1) {
      var s = this.current_layer.parentNode.removeChild(this.current_layer);
      this.identifyLayers();
      return s
    }
    return null
  };
  svgedit.draw.Drawing.prototype.identifyLayers = function () {
    this.all_layers = [];
    for (var s = this.svgElem_.childNodes.length, v = [], G = [], e = null, f = false, k = 0; k < s; ++k) {
      var n = this.svgElem_.childNodes.item(k);
      if (n && n.nodeType == 1) if (n.tagName == "g") {
        f = true;
        var F = $("title", n).text();
        if (!F && svgedit.browser.isOpera() && n.querySelectorAll) F = $(n.querySelectorAll("title")).text();
        if (F) {
          G.push(F);
          this.all_layers.push([F, n]);
          e = n;
          svgedit.utilities.walkTree(n, function (B) {
            B.setAttribute("style", "pointer-events:inherit")
          });
          e.setAttribute("style", "pointer-events:none")
        } else v.push(n)
      } else if (~a.indexOf(n.nodeName)) {
        svgedit.utilities.getBBox(n);
        v.push(n)
      }
    }
    s = this.svgElem_.ownerDocument;
    if (v.length > 0 || !f) {
      for (k = 1; G.indexOf("Layer " + k) >= 0;) k++;
      G = "Layer " + k;
      e = s.createElementNS("http://www.w3.org/2000/svg", "g");
      f = s.createElementNS("http://www.w3.org/2000/svg", "title");
      f.textContent = G;
      e.appendChild(f);
      for (f = 0; f < v.length; ++f) e.appendChild(v[f]);
      this.svgElem_.appendChild(e);
      this.all_layers.push([G, e])
    }
    svgedit.utilities.walkTree(e, function (B) {
      B.setAttribute("style", "pointer-events:inherit")
    });
    this.current_layer = e;
    this.current_layer.setAttribute("style", "pointer-events:all")
  };
  svgedit.draw.Drawing.prototype.createLayer = function (s) {
    var v = this.svgElem_.ownerDocument,
      G = v.createElementNS("http://www.w3.org/2000/svg", "g");
    v = v.createElementNS("http://www.w3.org/2000/svg", "title");
    v.textContent = s;
    G.appendChild(v);
    this.svgElem_.appendChild(G);
    this.identifyLayers();
    return G
  };
  svgedit.draw.Drawing.prototype.getLayerVisibility = function (s) {
    for (var v = null, G = 0; G < this.getNumLayers(); ++G) if (this.getLayerName(G) == s) {
      v = this.all_layers[G][1];
      break
    }
    if (!v) return false;
    return v.getAttribute("display") != "none"
  };
  svgedit.draw.Drawing.prototype.setLayerVisibility = function (s, v) {
    if (typeof v != "boolean") return null;
    for (var G = null, e = 0; e < this.getNumLayers(); ++e) if (this.getLayerName(e) == s) {
      G = this.all_layers[e][1];
      break
    }
    if (!G) return null;
    G.getAttribute("display");
    G.setAttribute("display", v ? "inline" : "none");
    return G
  };
  svgedit.draw.Drawing.prototype.getLayerOpacity = function (s) {
    for (var v = 0; v < this.getNumLayers(); ++v) if (this.getLayerName(v) == s) {
      (s = this.all_layers[v][1].getAttribute("opacity")) || (s = "1.0");
      return parseFloat(s)
    }
    return null
  };
  svgedit.draw.Drawing.prototype.setLayerOpacity = function (s, v) {
    if (!(typeof v != "number" || v < 0 || v > 1)) for (var G = 0; G < this.getNumLayers(); ++G) if (this.getLayerName(G) == s) {
      this.all_layers[G][1].setAttribute("opacity",
      v);
      break
    }
  }
})();
svgedit = svgedit || {};
(function () {
  if (!svgedit.path) svgedit.path = {};
  var a = {
    pathNodeTooltip: "Drag node to move it. Double-click node to change segment type",
    pathCtrlPtTooltip: "Drag control point to adjust curve properties"
  }, K = {
    2: ["x", "y"],
    4: ["x", "y"],
    6: ["x", "y", "x1", "y1", "x2", "y2"],
    8: ["x", "y", "x1", "y1"],
    10: ["x", "y", "r1", "r2", "angle", "largeArcFlag", "sweepFlag"],
    12: ["x"],
    14: ["y"],
    16: ["x", "y", "x2", "y2"],
    18: ["x", "y"]
  }, l = [],
    s = true,
    v = {};
  svgedit.path.setLinkControlPoints = function (f) {
    s = f
  };
  var G = svgedit.path.path = null;
  svgedit.path.init = function (f) {
    G = f;
    l = [0, "ClosePath"];
    $.each(["Moveto", "Lineto", "CurvetoCubic", "CurvetoQuadratic", "Arc", "LinetoHorizontal", "LinetoVertical", "CurvetoCubicSmooth", "CurvetoQuadraticSmooth"], function (k, n) {
      l.push(n + "Abs");
      l.push(n + "Rel")
    })
  };
  svgedit.path.insertItemBefore = function (f, k, n) {
    f = f.pathSegList;
    if (svgedit.browser.supportsPathInsertItemBefore()) f.insertItemBefore(k, n);
    else {
      for (var F = f.numberOfItems, B = [], A = 0; A < F; A++) {
        var O = f.getItem(A);
        B.push(O)
      }
      f.clear();
      for (A = 0; A < F; A++) {
        A == n && f.appendItem(k);
        f.appendItem(B[A])
      }
    }
  };
  svgedit.path.ptObjToArr = function (f, k) {
    for (var n = K[f], F = n.length, B = Array(F), A = 0; A < F; A++) B[A] = k[n[A]];
    return B
  };
  svgedit.path.getGripPt = function (f, k) {
    var n = {
      x: k ? k.x : f.item.x,
      y: k ? k.y : f.item.y
    }, F = f.path;
    if (F.matrix) n = svgedit.math.transformPoint(n.x, n.y, F.matrix);
    n.x *= G.getCurrentZoom();
    n.y *= G.getCurrentZoom();
    return n
  };
  svgedit.path.getPointFromGrip = function (f, k) {
    var n = {
      x: f.x,
      y: f.y
    };
    if (k.matrix) {
      f = svgedit.math.transformPoint(n.x, n.y, k.imatrix);
      n.x = f.x;
      n.y = f.y
    }
    n.x /= G.getCurrentZoom();
    n.y /= G.getCurrentZoom();
    return n
  };
  svgedit.path.addPointGrip = function (f, k, n) {
    var F = svgedit.path.getGripContainer(),
      B = svgedit.utilities.getElem("pathpointgrip_" + f);
    if (!B) {
      B = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      svgedit.utilities.assignAttributes(B, {
        id: "pathpointgrip_" + f,
        display: "none",
        r: 4,
        fill: "#0FF",
        stroke: "#00F",
        "stroke-width": 2,
        cursor: "move",
        style: "pointer-events:all",
        "xlink:title": a.pathNodeTooltip
      });
      B = F.appendChild(B);
      $("#pathpointgrip_" + f).dblclick(function () {
        svgedit.path.path && svgedit.path.path.setSegType()
      })
    }
    k && n && svgedit.utilities.assignAttributes(B, {
      cx: k,
      cy: n,
      display: "inline"
    });
    return B
  };
  svgedit.path.getGripContainer = function () {
    var f = svgedit.utilities.getElem("pathpointgrip_container");
    if (!f) {
      f = svgedit.utilities.getElem("selectorParentGroup").appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      f.id = "pathpointgrip_container"
    }
    return f
  };
  svgedit.path.addCtrlGrip = function (f) {
    var k = svgedit.utilities.getElem("ctrlpointgrip_" + f);
    if (k) return k;
    k = document.createElementNS("http://www.w3.org/2000/svg",
      "circle");
    svgedit.utilities.assignAttributes(k, {
      id: "ctrlpointgrip_" + f,
      display: "none",
      r: 4,
      fill: "#0FF",
      stroke: "#55F",
      "stroke-width": 1,
      cursor: "move",
      style: "pointer-events:all",
      "xlink:title": a.pathCtrlPtTooltip
    });
    svgedit.path.getGripContainer().appendChild(k);
    return k
  };
  svgedit.path.getCtrlLine = function (f) {
    var k = svgedit.utilities.getElem("ctrlLine_" + f);
    if (k) return k;
    k = document.createElementNS("http://www.w3.org/2000/svg", "line");
    svgedit.utilities.assignAttributes(k, {
      id: "ctrlLine_" + f,
      stroke: "#555",
      "stroke-width": 1,
      style: "pointer-events:none"
    });
    svgedit.path.getGripContainer().appendChild(k);
    return k
  };
  svgedit.path.getPointGrip = function (f, k) {
    var n = svgedit.path.addPointGrip(f.index);
    if (k) {
      var F = svgedit.path.getGripPt(f);
      svgedit.utilities.assignAttributes(n, {
        cx: F.x,
        cy: F.y,
        display: "inline"
      })
    }
    return n
  };
  svgedit.path.getControlPoints = function (f) {
    var k = f.item,
      n = f.index;
    if (!("x1" in k) || !("x2" in k)) return null;
    var F = {};
    svgedit.path.getGripContainer();
    for (var B = [svgedit.path.path.segs[n - 1].item, k], A = 1; A < 3; A++) {
      var O = n +
        "c" + A,
        Z = F["c" + A + "_line"] = svgedit.path.getCtrlLine(O),
        N = svgedit.path.getGripPt(f, {
          x: k["x" + A],
          y: k["y" + A]
        }),
        L = svgedit.path.getGripPt(f, {
          x: B[A - 1].x,
          y: B[A - 1].y
        });
      svgedit.utilities.assignAttributes(Z, {
        x1: N.x,
        y1: N.y,
        x2: L.x,
        y2: L.y,
        display: "inline"
      });
      F["c" + A + "_line"] = Z;
      pointGrip = F["c" + A] = svgedit.path.addCtrlGrip(O);
      svgedit.utilities.assignAttributes(pointGrip, {
        cx: N.x,
        cy: N.y,
        display: "inline"
      });
      F["c" + A] = pointGrip
    }
    return F
  };
  svgedit.path.replacePathSeg = function (f, k, n, F) {
    F = F || svgedit.path.path.elem;
    f = F["createSVGPathSeg" + l[f]].apply(F, n);
    if (svgedit.browser.supportsPathReplaceItem()) F.pathSegList.replaceItem(f, k);
    else {
      n = F.pathSegList;
      F = n.numberOfItems;
      for (var B = [], A = 0; A < F; A++) {
        var O = n.getItem(A);
        B.push(O)
      }
      n.clear();
      for (A = 0; A < F; A++) A == k ? n.appendItem(f) : n.appendItem(B[A])
    }
  };
  svgedit.path.getSegSelector = function (f, k) {
    var n = f.index,
      F = svgedit.utilities.getElem("segline_" + n);
    if (!F) {
      var B = svgedit.path.getGripContainer();
      F = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svgedit.utilities.assignAttributes(F, {
        id: "segline_" + n,
        display: "none",
        fill: "none",
        stroke: "#0FF",
        "stroke-width": 2,
        style: "pointer-events:none",
        d: "M0,0 0,0"
      });
      B.appendChild(F)
    }
    if (k) {
      n = f.prev;
      if (!n) {
        F.setAttribute("display", "none");
        return F
      }
      n = svgedit.path.getGripPt(n);
      svgedit.path.replacePathSeg(2, 0, [n.x, n.y], F);
      B = svgedit.path.ptObjToArr(f.type, f.item, true);
      for (var A = 0; A < B.length; A += 2) {
        n = svgedit.path.getGripPt(f, {
          x: B[A],
          y: B[A + 1]
        });
        B[A] = n.x;
        B[A + 1] = n.y
      }
      svgedit.path.replacePathSeg(f.type, 1, B, F)
    }
    return F
  };
  svgedit.path.smoothControlPoints = this.smoothControlPoints = function (f, k, n) {
    var F = f.x - n.x,
      B = f.y - n.y,
      A = k.x - n.x,
      O = k.y - n.y;
    if ((F != 0 || B != 0) && (A != 0 || O != 0)) {
      f = Math.atan2(B, F);
      k = Math.atan2(O, A);
      F = Math.sqrt(F * F + B * B);
      A = Math.sqrt(A * A + O * O);
      B = G.getSVGRoot().createSVGPoint();
      O = G.getSVGRoot().createSVGPoint();
      if (f < 0) f += 2 * Math.PI;
      if (k < 0) k += 2 * Math.PI;
      var Z = Math.abs(f - k),
        N = Math.abs(Math.PI - Z) / 2;
      if (f - k > 0) {
        f = Z < Math.PI ? f + N : f - N;
        k = Z < Math.PI ? k - N : k + N
      } else {
        f = Z < Math.PI ? f - N : f + N;
        k = Z < Math.PI ? k + N : k - N
      }
      B.x = F * Math.cos(f) + n.x;
      B.y = F * Math.sin(f) + n.y;
      O.x = A * Math.cos(k) + n.x;
      O.y = A * Math.sin(k) + n.y;
      return [B, O]
    }
  };
  svgedit.path.Segment = function (f, k) {
    this.selected = false;
    this.index = f;
    this.item = k;
    this.type = k.pathSegType;
    this.ctrlpts = [];
    this.segsel = this.ptgrip = null
  };
  svgedit.path.Segment.prototype.showCtrlPts = function (f) {
    for (var k in this.ctrlpts) this.ctrlpts[k].setAttribute("display", f ? "inline" : "none")
  };
  svgedit.path.Segment.prototype.selectCtrls = function (f) {
    $("#ctrlpointgrip_" + this.index + "c1, #ctrlpointgrip_" + this.index + "c2").attr("fill", f ? "#0FF" : "#EEE")
  };
  svgedit.path.Segment.prototype.show = function (f) {
    if (this.ptgrip) {
      this.ptgrip.setAttribute("display",
      f ? "inline" : "none");
      this.segsel.setAttribute("display", f ? "inline" : "none");
      this.showCtrlPts(f)
    }
  };
  svgedit.path.Segment.prototype.select = function (f) {
    if (this.ptgrip) {
      this.ptgrip.setAttribute("stroke", f ? "#0FF" : "#00F");
      this.segsel.setAttribute("display", f ? "inline" : "none");
      this.ctrlpts && this.selectCtrls(f);
      this.selected = f
    }
  };
  svgedit.path.Segment.prototype.addGrip = function () {
    this.ptgrip = svgedit.path.getPointGrip(this, true);
    this.ctrlpts = svgedit.path.getControlPoints(this, true);
    this.segsel = svgedit.path.getSegSelector(this,
    true)
  };
  svgedit.path.Segment.prototype.update = function (f) {
    if (this.ptgrip) {
      var k = svgedit.path.getGripPt(this);
      svgedit.utilities.assignAttributes(this.ptgrip, {
        cx: k.x,
        cy: k.y
      });
      svgedit.path.getSegSelector(this, true);
      if (this.ctrlpts) {
        if (f) {
          this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
          this.type = this.item.pathSegType
        }
        svgedit.path.getControlPoints(this)
      }
    }
  };
  svgedit.path.Segment.prototype.move = function (f, k) {
    var n = this.item;
    n = this.ctrlpts ? [n.x += f, n.y += k, n.x1, n.y1, n.x2 += f, n.y2 += k] : [n.x += f,
    n.y += k];
    svgedit.path.replacePathSeg(this.type, this.index, n);
    if (this.next && this.next.ctrlpts) {
      n = this.next.item;
      n = [n.x, n.y, n.x1 += f, n.y1 += k, n.x2, n.y2];
      svgedit.path.replacePathSeg(this.next.type, this.next.index, n)
    }
    if (this.mate) {
      n = this.mate.item;
      n = [n.x += f, n.y += k];
      svgedit.path.replacePathSeg(this.mate.type, this.mate.index, n)
    }
    this.update(true);
    this.next && this.next.update(true)
  };
  svgedit.path.Segment.prototype.setLinked = function (f) {
    var k, n, F;
    if (f == 2) {
      n = 1;
      k = this.next;
      if (!k) return;
      F = this.item
    } else {
      n = 2;
      k = this.prev;
      if (!k) return;
      F = k.item
    }
    var B = k.item;
    B["x" + n] = F.x + (F.x - this.item["x" + f]);
    B["y" + n] = F.y + (F.y - this.item["y" + f]);
    svgedit.path.replacePathSeg(k.type, k.index, [B.x, B.y, B.x1, B.y1, B.x2, B.y2]);
    k.update(true)
  };
  svgedit.path.Segment.prototype.moveCtrl = function (f, k, n) {
    var F = this.item;
    F["x" + f] += k;
    F["y" + f] += n;
    svgedit.path.replacePathSeg(this.type, this.index, [F.x, F.y, F.x1, F.y1, F.x2, F.y2]);
    this.update(true)
  };
  svgedit.path.Segment.prototype.setType = function (f, k) {
    svgedit.path.replacePathSeg(f, this.index, k);
    this.type = f;
    this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
    this.showCtrlPts(f === 6);
    this.ctrlpts = svgedit.path.getControlPoints(this);
    this.update(true)
  };
  svgedit.path.Path = function (f) {
    if (!f || f.tagName !== "path") throw "svgedit.path.Path constructed without a <path> element";
    this.elem = f;
    this.segs = [];
    this.selected_pts = [];
    svgedit.path.path = this;
    this.init()
  };
  svgedit.path.Path.prototype.init = function () {
    $(svgedit.path.getGripContainer()).find("*").attr("display", "none");
    var f = this.elem.pathSegList,
      k = f.numberOfItems;
    this.segs = [];
    this.selected_pts = [];
    this.first_seg = null;
    for (var n = 0; n < k; n++) {
      var F = f.getItem(n);
      F = new svgedit.path.Segment(n, F);
      F.path = this;
      this.segs.push(F)
    }
    f = this.segs;
    F = null;
    for (n = 0; n < k; n++) {
      var B = f[n],
        A = n + 1 >= k ? null : f[n + 1],
        O = n - 1 < 0 ? null : f[n - 1];
      if (B.type === 2) {
        if (O && O.type !== 1) {
          A = f[F];
          A.next = f[F + 1];
          A.next.prev = A;
          A.addGrip()
        }
        F = n
      } else if (A && A.type === 1) {
        B.next = f[F + 1];
        B.next.prev = B;
        B.mate = f[F];
        B.addGrip();
        if (this.first_seg == null) this.first_seg = B
      } else if (A) {
        if (B.type !== 1) {
          B.addGrip();
          if (A && A.type !== 2) {
            B.next = A;
            B.next.prev = B
          }
        }
      } else if (B.type !== 1) {
        A = f[F];
        A.next = f[F + 1];
        A.next.prev = A;
        A.addGrip();
        B.addGrip();
        if (!this.first_seg) this.first_seg = f[F]
      }
    }
    return this
  };
  svgedit.path.Path.prototype.eachSeg = function (f) {
    for (var k = this.segs.length, n = 0; n < k; n++) if (f.call(this.segs[n], n) === false) break
  };
  svgedit.path.Path.prototype.addSeg = function (f) {
    var k = this.segs[f];
    if (k.prev) {
      var n = k.prev,
        F;
      switch (k.item.pathSegType) {
        case 4:
          var B = (k.item.x + n.item.x) / 2,
            A = (k.item.y + n.item.y) / 2;
          F = this.elem.createSVGPathSegLinetoAbs(B, A);
          break;
        case 6:
          F = (n.item.x + k.item.x1) / 2;
          var O = (k.item.x1 + k.item.x2) / 2,
            Z = (k.item.x2 + k.item.x) / 2,
            N = (F + O) / 2;
          O = (O + Z) / 2;
          B = (N + O) / 2;
          var L = (n.item.y + k.item.y1) / 2,
            na = (k.item.y1 + k.item.y2) / 2;
          n = (k.item.y2 + k.item.y) / 2;
          var ca = (L + na) / 2;
          na = (na + n) / 2;
          A = (ca + na) / 2;
          F = this.elem.createSVGPathSegCurvetoCubicAbs(B, A, F, L, N, ca);
          svgedit.path.replacePathSeg(k.type, f, [k.item.x, k.item.y, O, na, Z, n])
      }
      svgedit.path.insertItemBefore(this.elem, F, f)
    }
  };
  svgedit.path.Path.prototype.deleteSeg = function (f) {
    var k = this.segs[f],
      n = this.elem.pathSegList;
    k.show(false);
    var F = k.next;
    if (k.mate) {
      var B = [F.item.x, F.item.y];
      svgedit.path.replacePathSeg(2, F.index, B);
      svgedit.path.replacePathSeg(4, k.index, B);
      n.removeItem(k.mate.index)
    } else {
      if (!k.prev) {
        B = [F.item.x, F.item.y];
        svgedit.path.replacePathSeg(2, k.next.index, B)
      }
      n.removeItem(f)
    }
  };
  svgedit.path.Path.prototype.subpathIsClosed = function (f) {
    var k = false;
    svgedit.path.path.eachSeg(function (n) {
      if (n <= f) return true;
      if (this.type === 2) return false;
      else if (this.type === 1) {
        k = true;
        return false
      }
    });
    return k
  };
  svgedit.path.Path.prototype.removePtFromSelection = function (f) {
    var k = this.selected_pts.indexOf(f);
    if (k != -1) {
      this.segs[f].select(false);
      this.selected_pts.splice(k, 1)
    }
  };
  svgedit.path.Path.prototype.clearSelection = function () {
    this.eachSeg(function () {
      this.select(false)
    });
    this.selected_pts = []
  };
  svgedit.path.Path.prototype.storeD = function () {
    this.last_d = this.elem.getAttribute("d")
  };
  svgedit.path.Path.prototype.show = function (f) {
    this.eachSeg(function () {
      this.show(f)
    });
    f && this.selectPt(this.first_seg.index);
    return this
  };
  svgedit.path.Path.prototype.movePts = function (f,
  k) {
    for (var n = this.selected_pts.length; n--;) this.segs[this.selected_pts[n]].move(f, k)
  };
  svgedit.path.Path.prototype.moveCtrl = function (f, k) {
    var n = this.segs[this.selected_pts[0]];
    n.moveCtrl(this.dragctrl, f, k);
    s && n.setLinked(this.dragctrl)
  };
  svgedit.path.Path.prototype.setSegType = function (f) {
    this.storeD();
    for (var k = this.selected_pts.length, n; k--;) {
      var F = this.segs[this.selected_pts[k]],
        B = F.prev;
      if (B) {
        if (!f) {
          n = "Toggle Path Segment Type";
          f = F.type == 6 ? 4 : 6
        }
        f -= 0;
        var A = F.item.x,
          O = F.item.y,
          Z = B.item.x;
        B = B.item.y;
        var N;
        switch (f) {
          case 6:
            if (F.olditem) {
              Z = F.olditem;
              N = [A, O, Z.x1, Z.y1, Z.x2, Z.y2]
            } else {
              N = A - Z;
              var L = O - B;
              N = [A, O, Z + N / 3, B + L / 3, A - N / 3, O - L / 3]
            }
            break;
          case 4:
            N = [A, O];
            F.olditem = F.item
        }
        F.setType(f, N)
      }
    }
    svgedit.path.path.endChanges(n)
  };
  svgedit.path.Path.prototype.selectPt = function (f, k) {
    this.clearSelection();
    f == null && this.eachSeg(function (n) {
      if (this.prev) f = n
    });
    this.addPtsToSelection(f);
    if (k) {
      this.dragctrl = k;
      s && this.segs[f].setLinked(k)
    }
  };
  svgedit.path.Path.prototype.update = function () {
    var f = this.elem;
    if (svgedit.utilities.getRotationAngle(f)) {
      this.matrix = svgedit.math.getMatrix(f);
      this.imatrix = this.matrix.inverse()
    } else this.imatrix = this.matrix = null;
    this.eachSeg(function (k) {
      this.item = f.pathSegList.getItem(k);
      this.update()
    });
    return this
  };
  svgedit.path.getPath_ = function (f) {
    var k = v[f.id];
    k || (k = v[f.id] = new svgedit.path.Path(f));
    return k
  };
  svgedit.path.removePath_ = function (f) {
    f in v && delete v[f]
  };
  var e = function (f, k) {
    dx = f - oldcx;
    dy = k - oldcy;
    r = Math.sqrt(dx * dx + dy * dy);
    theta = Math.atan2(dy, dx) + angle;
    dx = r * Math.cos(theta) + oldcx;
    dy = r * Math.sin(theta) + oldcy;
    dx -= newcx;
    dy -= newcy;
    r = Math.sqrt(dx * dx + dy * dy);
    theta = Math.atan2(dy, dx) - angle;
    return {
      x: (r * Math.cos(theta) + newcx) / 1,
      y: (r * Math.sin(theta) + newcy) / 1
    }
  };
  svgedit.path.recalcRotatedPath = function () {
    var f = svgedit.path.path.elem,
      k = svgedit.utilities.getRotationAngle(f, true);
    if (k) {
      var n = svgedit.utilities.getBBox(f),
        F = svgedit.path.path.oldbbox,
        B = F.x + F.width / 2,
        A = F.y + F.height / 2;
      F = n.x + n.width / 2;
      n = n.y + n.height / 2;
      F = F - B;
      var O = n - A;
      n = Math.sqrt(F * F + O * O);
      O = Math.atan2(O, F) + k;
      F = n * Math.cos(O) + B;
      n = n * Math.sin(O) + A;
      B = f.pathSegList;
      for (A = B.numberOfItems; A;) {
        A -= 1;
        O = B.getItem(A);
        var Z = O.pathSegType;
        if (Z != 1) {
          var N = e(O.x, O.y);
          N = [N.x, N.y];
          if (O.x1 != null && O.x2 != null) {
            c_vals1 = e(O.x1, O.y1);
            c_vals2 = e(O.x2, O.y2);
            N.splice(N.length, 0, c_vals1.x, c_vals1.y, c_vals2.x, c_vals2.y)
          }
          svgedit.path.replacePathSeg(Z, A, N)
        }
      }
      svgedit.utilities.getBBox(f);
      B = svgroot.createSVGTransform();
      f = svgedit.transformlist.getTransformList(f);
      B.setRotate(k * 180 / Math.PI, F, n);
      f.replaceItem(B, 0)
    }
  };
  svgedit.path.clearData = function () {
    v = {}
  }
})();
if (!window.console) {
  window.console = {};
  window.console.log = function () {};
  window.console.dir = function () {}
}
if (window.opera) {
  window.console.log = function (a) {
    opera.postError(a)
  };
  window.console.dir = function () {}
}
(function () {
  var a = jQuery.fn.attr;
  jQuery.fn.attr = function (K, l) {
    var s = this.length;
    if (!s) return a.apply(this, arguments);
    for (var v = 0; v < s; v++) {
      var G = this[v];
      if (G.namespaceURI === "http://www.w3.org/2000/svg") if (l !== undefined) G.setAttribute(K, l);
      else if ($.isArray(K)) {
        s = K.length;
        for (v = {}; s--;) {
          var e = K[s],
            f = G.getAttribute(e);
          if (f || f === "0") f = isNaN(f) ? f : f - 0;
          v[e] = f
        }
        return v
      } else if (typeof K === "object") for (e in K) G.setAttribute(e, K[e]);
      else {
        if ((f = G.getAttribute(K)) || f === "0") f = isNaN(f) ? f : f - 0;
        return f
      } else return a.apply(this,
      arguments)
    }
    return this
  }
})();
$.SvgCanvas = function (a, K) {
  function l(b, c) {
    for (var d = svgedit.utilities.getBBox(b), m = 0; m < 2; m++) {
      var i = m === 0 ? "fill" : "stroke",
        z = b.getAttribute(i);
      if (z && z.indexOf("url(") === 0) {
        z = rb(z);
        if (z.tagName === "linearGradient") {
          var o = z.getAttribute("x1") || 0,
            h = z.getAttribute("y1") || 0,
            q = z.getAttribute("x2") || 1,
            w = z.getAttribute("y2") || 0;
          o = d.width * o + d.x;
          h = d.height * h + d.y;
          q = d.width * q + d.x;
          w = d.height * w + d.y;
          o = oa(o, h, c);
          w = oa(q, w, c);
          q = {};
          q.x1 = (o.x - d.x) / d.width;
          q.y1 = (o.y - d.y) / d.height;
          q.x2 = (w.x - d.x) / d.width;
          q.y2 = (w.y - d.y) / d.height;
          z = z.cloneNode(true);
          $(z).attr(q);
          z.id = Fa();
          Xa().appendChild(z);
          b.setAttribute(i, "url(#" + z.id + ")")
        }
      }
    }
  }
  var s = "http://www.w3.org/2000/svg",
    v = {
      show_outside_canvas: true,
      selectNew: true,
      dimensions: [640, 480]
    };
  K && $.extend(v, K);
  var G = v.dimensions,
    e = this,
    f = a.ownerDocument,
    k = f.importNode(svgedit.utilities.text2xml('<svg id="svgroot" xmlns="' + s + '" xlinkns="http://www.w3.org/1999/xlink" width="' + G[0] + '" height="' + G[1] + '" x="' + G[0] + '" y="' + G[1] + '" overflow="visible"><defs><filter id="canvashadow" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/><feOffset in="blur" dx="5" dy="5" result="offsetBlur"/><feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>').documentElement,
    true);
  a.appendChild(k);
  var n = f.createElementNS(s, "svg");
  (e.clearSvgContentElement = function () {
    for (; n.firstChild;) n.removeChild(n.firstChild);
    $(n).attr({
      id: "svgcontent",
      width: G[0],
      height: G[1],
      x: G[0],
      y: G[1],
      overflow: v.show_outside_canvas ? "visible" : "hidden",
      xmlns: s,
      "xmlns:se": "http://svg-edit.googlecode.com",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }).appendTo(k);
    var b = f.createComment(" Created with SVG-edit - http://svg-edit.googlecode.com/ ");
    n.appendChild(b)
  })();
  var F = "svg_";
  e.setIdPrefix = function (b) {
    F = b
  };
  e.current_drawing_ = new svgedit.draw.Drawing(n, F);
  var B = e.getCurrentDrawing = function () {
    return e.current_drawing_
  }, A = 1,
    O = null,
    Z = {
      shape: {
        fill: (v.initFill.color == "none" ? "" : "#") + v.initFill.color,
        fill_paint: null,
        fill_opacity: v.initFill.opacity,
        stroke: "#" + v.initStroke.color,
        stroke_paint: null,
        stroke_opacity: v.initStroke.opacity,
        stroke_width: v.initStroke.width,
        stroke_dasharray: "none",
        stroke_linejoin: "miter",
        stroke_linecap: "butt",
        opacity: v.initOpacity
      }
    };
  Z.text = $.extend(true, {}, Z.shape);
  $.extend(Z.text, {
    fill: "#000000",
    stroke_width: 0,
    font_size: 24,
    font_family: "serif"
  });
  var N = Z.shape,
    L = Array(1),
    na = this.addSvgElementFromJson = function (b) {
      var c = svgedit.utilities.getElem(b.attr.id),
        d = B().getCurrentLayer();
      if (c && b.element != c.tagName) {
        d.removeChild(c);
        c = null
      }
      if (!c) {
        c = f.createElementNS(s, b.element);
        if (d)(O || d).appendChild(c)
      }
      b.curStyles && svgedit.utilities.assignAttributes(c, {
        fill: N.fill,
        stroke: N.stroke,
        "stroke-width": N.stroke_width,
        "stroke-dasharray": N.stroke_dasharray,
        "stroke-linejoin": N.stroke_linejoin,
        "stroke-linecap": N.stroke_linecap,
        "stroke-opacity": N.stroke_opacity,
        "fill-opacity": N.fill_opacity,
        opacity: N.opacity / 2,
        style: "pointer-events:inherit"
      }, 100);
      svgedit.utilities.assignAttributes(c, b.attr, 100);
      svgedit.utilities.cleanupElement(c);
      return c
    }, ca = e.getTransformList = svgedit.transformlist.getTransformList,
    oa = svgedit.math.transformPoint,
    pa = e.matrixMultiply = svgedit.math.matrixMultiply,
    ia = e.hasMatrixTransform = svgedit.math.hasMatrixTransform,
    da = e.transformListToTransform = svgedit.math.transformListToTransform,
    Ya = svgedit.math.snapToAngle,
    kb = svgedit.math.getMatrix;
  svgedit.units.init({
    getBaseUnit: function () {
      return v.baseUnit
    },
    getElement: svgedit.utilities.getElem,
    getHeight: function () {
      return n.getAttribute("height") / A
    },
    getWidth: function () {
      return n.getAttribute("width") / A
    },
    getRoundDigits: function () {
      return Na.round_digits
    }
  });
  var ba = e.convertToNum = svgedit.units.convertToNum;
  svgedit.utilities.init({
    getDOMDocument: function () {
      return f
    },
    getDOMContainer: function () {
      return a
    },
    getSVGRoot: function () {
      return k
    },
    getSelectedElements: function () {
      return L
    },
    getSVGContent: function () {
      return n
    }
  });
  var sb = e.getUrlFromAttr = svgedit.utilities.getUrlFromAttr,
    ib = e.getHref = svgedit.utilities.getHref,
    lb = e.setHref = svgedit.utilities.setHref,
    Tb = svgedit.utilities.getPathBBox;
  e.getBBox = svgedit.utilities.getBBox;
  var bb = e.getRotationAngle = svgedit.utilities.getRotationAngle,
    va = e.getElem = svgedit.utilities.getElem,
    Ga = e.assignAttributes = svgedit.utilities.assignAttributes,
    Oa = this.cleanupElement = svgedit.utilities.cleanupElement,
    hb = svgedit.sanitize.getNSMap(),
    ja = e.sanitizeSvg = svgedit.sanitize.sanitizeSvg,
    Ca = svgedit.history.MoveElementCommand,
    Ha = svgedit.history.InsertElementCommand,
    Pa = svgedit.history.RemoveElementCommand,
    Ia = svgedit.history.ChangeElementCommand,
    ua = svgedit.history.BatchCommand;
  e.undoMgr = new svgedit.history.UndoManager({
    handleHistoryEvent: function (b, c) {
      var d = svgedit.history.HistoryEventTypes;
      if (b == d.BEFORE_UNAPPLY || b == d.BEFORE_APPLY) e.clearSelection();
      else if (b == d.AFTER_APPLY || b == d.AFTER_UNAPPLY) {
        var m = c.elements();
        e.pathActions.clear();
        ha("changed", m);
        m = c.type();
        d = b == d.AFTER_APPLY;
        if (m == Ca.type())(d ? c.newParent : c.oldParent) == n && e.identifyLayers();
        else if (m == Ha.type() || m == Pa.type()) {
          c.parent == n && e.identifyLayers();
          if (m == Ha.type()) d && tb(c.elem);
          else d || tb(c.elem);
          c.elem.tagName === "use" && Gb(c.elem)
        } else if (m == Ia.type()) {
          c.elem.tagName == "title" && c.elem.parentNode.parentNode == n && e.identifyLayers();
          d = d ? c.newValues : c.oldValues;
          d.stdDeviation && e.setBlurOffsets(c.elem.parentNode, d.stdDeviation)
        }
      }
    }
  });
  var ma = function (b) {
    e.undoMgr.addCommandToHistory(b)
  };
  svgedit.select.init(v, {
    createSVGElement: function (b) {
      return e.addSvgElementFromJson(b)
    },
    svgRoot: function () {
      return k
    },
    svgContent: function () {
      return n
    },
    currentZoom: function () {
      return A
    },
    getStrokedBBox: function (b) {
      return e.getStrokedBBox([b])
    }
  });
  var ra = this.selectorManager = svgedit.select.getSelectorManager();
  svgedit.path.init({
    getCurrentZoom: function () {
      return A
    },
    getSVGRoot: function () {
      return k
    }
  });
  svgedit.utilities.snapToGrid = function (b) {
    var c = v.snappingStep,
      d = v.baseUnit;
    if (d !== "px") c *= svgedit.units.getTypeMap()[d];
    return b = Math.round(b / c) * c
  };
  var la = svgedit.utilities.snapToGrid,
    ub = {
      exportNoBlur: "Blurred elements will appear as un-blurred",
      exportNoforeignObject: "foreignObject elements will not appear",
      exportNoDashArray: "Strokes will appear filled",
      exportNoText: "Text may not appear as expected"
    }, Hb = ["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"],
    Ab = $.data,
    Ib = document.createElementNS(s, "animate");
  $(Ib).attr({
    attributeName: "opacity",
    begin: "indefinite",
    dur: 1,
    fill: "freeze"
  }).appendTo(k);
  var tb = function (b) {
    var c = $(b).attr(Hb),
      d;
    for (d in c) {
      var m = c[d];
      if (m && m.indexOf("url(") === 0) {
        m = sb(m).substr(1);
        if (!va(m)) {
          Xa().appendChild(Ub[m]);
          delete Ub[m]
        }
      }
    }
    b = b.getElementsByTagName("*");
    if (b.length) {
      c = 0;
      for (d = b.length; c < d; c++) tb(b[c])
    }
  }, Jb = {}, Bb = v.imgPath + "logo.png",
    Kb = [],
    Na = {
      round_digits: 5
    }, xa = false,
    Qa = null,
    sa = "select",
    cb = "none",
    pb = {}, Ua = Z.text,
    Sa = N,
    La = null,
    wa = null,
    jb = [],
    Cb = {}, Vb = null,
    Ub = {};
  e.clipBoard = [];
  var Db = this.runExtensions = function (b, c, d) {
    var m = false;
    if (d) m = [];
    $.each(Cb, function (i, z) {
      if (b in z) if (d) m.push(z[b](c));
      else m = z[b](c)
    });
    return m
  };
  this.addExtension = function (b, c) {
    if (b in Cb) console.log('Cannot add extension "' + b + '", an extension by that name already exists"');
    else {
      var d = $.isFunction(c) ? c($.extend(e.getPrivateMethods(), {
        svgroot: k,
        svgcontent: n,
        nonce: B().getNonce(),
        selectorManager: ra
      })) : c;
      Cb[b] = d;
      ha("extension_added", d)
    }
  };
  var Eb = this.round = function (b) {
    return parseInt(b * A) / A
  }, Wb = this.getIntersectionList = function (b) {
    if (wa == null) return null;
    var c = O || B().getCurrentLayer();
    jb.length || (jb = jc(c));
    var d = null;
    try {
      d = c.getIntersectionList(b, null)
    } catch (m) {}
    if (d == null || typeof d.item != "function") {
      d = [];
      if (b) b = b;
      else {
        b = wa.getBBox();
        c = {};
        for (var i in b) c[i] = b[i] / A;
        b = c
      }
      for (i = jb.length; i--;) b.width && b.width && svgedit.math.rectsIntersect(b, jb[i].bbox) && d.push(jb[i].elem)
    }
    return d
  };
  getStrokedBBox = this.getStrokedBBox = function (b) {
    b || (b = Lb());
    if (!b.length) return false;
    var c = function (w) {
      try {
        var u = svgedit.utilities.getBBox(w),
          t = svgedit.utilities.getRotationAngle(w);
        if (t && t % 90 || svgedit.math.hasMatrixTransform(svgedit.transformlist.getTransformList(w))) {
          t = false;
          if (["ellipse", "path", "line", "polyline", "polygon"].indexOf(w.tagName) >= 0) u = t = e.convertToPath(w, true);
          else if (w.tagName == "rect") {
            var C = w.getAttribute("rx"),
              E = w.getAttribute("ry");
            if (C || E) u = t = e.convertToPath(w, true)
          }
          if (!t) {
            var H = w.cloneNode(true),
              I = document.createElementNS(s, "g"),
              P = w.parentNode;
            P.appendChild(I);
            I.appendChild(H);
            u = svgedit.utilities.bboxToObj(I.getBBox());
            P.removeChild(I)
          }
        }
        return u
      } catch (W) {
        console.log(w, W);
        return null
      }
    }, d;
    $.each(b, function () {
      if (!d) if (this.parentNode) d = c(this)
    });
    if (d == null) return null;
    var m = d.x + d.width,
      i = d.y + d.height,
      z = d.x,
      o = d.y,
      h = function (w) {
        var u = w.getAttribute("stroke-width"),
          t = 0;
        if (w.getAttribute("stroke") != "none" && !isNaN(u)) t += u / 2;
        return t
      }, q = [];
    $.each(b, function (w, u) {
      var t = c(u);
      if (t) {
        var C = h(u);
        z = Math.min(z, t.x - C);
        o = Math.min(o, t.y - C);
        q.push(t)
      }
    });
    d.x = z;
    d.y = o;
    $.each(b, function (w, u) {
      var t = q[w];
      if (t && u.nodeType == 1) {
        var C = h(u);
        m = Math.max(m, t.x + t.width + C);
        i = Math.max(i, t.y + t.height + C)
      }
    });
    d.width = m - z;
    d.height = i - o;
    return d
  };
  var Lb = this.getVisibleElements = function (b) {
    b || (b = $(n).children());
    var c = [];
    $(b).children().each(function (d, m) {
      try {
        m.getBBox() && c.push(m)
      } catch (i) {}
    });
    return c.reverse()
  }, jc = this.getVisibleElementsAndBBoxes = function (b) {
    b || (b = $(n).children());
    var c = [];
    $(b).children().each(function (d, m) {
      try {
        m.getBBox() && c.push({
          elem: m,
          bbox: getStrokedBBox([m])
        })
      } catch (i) {}
    });
    return c.reverse()
  }, cc = this.groupSvgElem = function (b) {
    var c = document.createElementNS(s, "g");
    b.parentNode.replaceChild(c, b);
    $(c).append(b).data("gsvg", b)[0].id = Fa()
  }, vb = function (b) {
    var c = document.createElementNS(b.namespaceURI,
    b.nodeName);
    $.each(b.attributes, function (m, i) {
      i.localName != "-moz-math-font-style" && c.setAttributeNS(i.namespaceURI, i.nodeName, i.nodeValue)
    });
    c.removeAttribute("id");
    c.id = Fa();
    if (svgedit.browser.isWebkit() && b.nodeName == "path") {
      var d = qa.convertPath(b);
      c.setAttribute("d", d)
    }
    $.each(b.childNodes, function (m, i) {
      switch (i.nodeType) {
        case 1:
          c.appendChild(vb(i));
          break;
        case 3:
          c.textContent = i.nodeValue
      }
    });
    if ($(b).data("gsvg")) $(c).data("gsvg", c.firstChild);
    else if ($(b).data("symbol")) {
      b = $(b).data("symbol");
      $(c).data("ref",
      b).data("symbol", b)
    } else c.tagName == "image" && Mb(c);
    return c
  }, db, Fa, ha;
  (function (b) {
    var c = {};
    db = b.getId = function () {
      return B().getId()
    };
    Fa = b.getNextId = function () {
      return B().getNextId()
    };
    ha = b.call = function (d, m) {
      if (c[d]) return c[d](this, m)
    };
    b.bind = function (d, m) {
      var i = c[d];
      c[d] = m;
      return i
    }
  })(e);
  this.prepareSvg = function (b) {
    this.sanitizeSvg(b.documentElement);
    b = b.getElementsByTagNameNS(s, "path");
    for (var c = 0, d = b.length; c < d; ++c) {
      var m = b[c];
      m.setAttribute("d", qa.convertPath(m));
      qa.fixEnd(m)
    }
  };
  var rb = this.getRefElem = function (b) {
    return va(sb(b).substr(1))
  }, Nb = function (b) {
    if (!svgedit.browser.isGecko()) return b;
    var c = b.cloneNode(true);
    b.parentNode.insertBefore(c, b);
    b.parentNode.removeChild(b);
    ra.releaseSelector(b);
    L[0] = c;
    ra.requestSelector(c).showGrips(true);
    return c
  };
  this.setRotationAngle = function (b, c) {
    b = parseFloat(b);
    var d = L[0],
      m = d.getAttribute("transform"),
      i = svgedit.utilities.getBBox(d),
      z = i.x + i.width / 2,
      o = i.y + i.height / 2;
    i = ca(d);
    i.numberOfItems > 0 && i.getItem(0).type == 4 && i.removeItem(0);
    if (b != 0) {
      z = oa(z, o, da(i).matrix);
      o = k.createSVGTransform();
      o.setRotate(b, z.x, z.y);
      i.numberOfItems ? i.insertItemBefore(o, 0) : i.appendItem(o)
    } else i.numberOfItems == 0 && d.removeAttribute("transform");
    if (!c) {
      i = d.getAttribute("transform");
      d.setAttribute("transform", m);
      Va("transform", i, L);
      ha("changed", L)
    }
    va("pathpointgrip_container");
    d = ra.requestSelector(L[0]);
    d.resize();
    d.updateGripCursors(b)
  };
  var Ob = this.recalculateAllSelectedDimensions = function () {
    for (var b = new ua(cb == "none" ? "position" : "size"), c = L.length; c--;) {
      var d = Ta(L[c]);
      d && b.addSubCommand(d)
    }
    if (!b.isEmpty()) {
      ma(b);
      ha("changed", L)
    }
  }, Xb = [0, "z", "M", "m", "L", "l", "C", "c", "Q", "q", "A", "a", "H", "h", "V", "v", "S", "s", "T", "t"],
    kc = function (b) {
      console.log([b.a, b.b, b.c, b.d, b.e, b.f])
    }, Fb = this.remapElement = function (b, c, d) {
      var m = v.gridSnapping && b.parentNode.parentNode.localName === "svg",
        i = function () {
          if (m) for (var t in c) c[t] = la(c[t]);
          Ga(b, c, 1E3, true)
        };
      box = svgedit.utilities.getBBox(b);
      for (var z = 0; z < 2; z++) {
        var o = z === 0 ? "fill" : "stroke",
          h = b.getAttribute(o);
        if (h && h.indexOf("url(") === 0) if (d.a < 0 || d.d < 0) {
          h = rb(h).cloneNode(true);
          if (d.a < 0) {
            var q = h.getAttribute("x1"),
              w = h.getAttribute("x2");
            h.setAttribute("x1", -(q - 1));
            h.setAttribute("x2", -(w - 1))
          }
          if (d.d < 0) {
            q = h.getAttribute("y1");
            w = h.getAttribute("y2");
            h.setAttribute("y1", -(q - 1));
            h.setAttribute("y2", -(w - 1))
          }
          h.id = Fa();
          Xa().appendChild(h);
          b.setAttribute(o, "url(#" + h.id + ")")
        }
      }
      z = b.tagName;
      if (z === "g" || z === "text" || z === "use") if (d.a == 1 && d.b == 0 && d.c == 0 && d.d == 1 && (d.e != 0 || d.f != 0)) {
        o = da(b).matrix;
        o = pa(o.inverse(), d, o);
        c.x = parseFloat(c.x) + o.e;
        c.y = parseFloat(c.y) + o.f
      } else {
        o = ca(b);
        h = k.createSVGTransform();
        h.setMatrix(pa(da(o).matrix,
        d));
        o.clear();
        o.appendItem(h)
      }
      switch (z) {
        case "foreignObject":
        case "rect":
        case "image":
          if (z === "image" && (d.a < 0 || d.d < 0)) {
            o = ca(b);
            h = k.createSVGTransform();
            h.setMatrix(pa(da(o).matrix, d));
            o.clear();
            o.appendItem(h)
          } else {
            o = oa(c.x, c.y, d);
            c.width = d.a * c.width;
            c.height = d.d * c.height;
            c.x = o.x + Math.min(0, c.width);
            c.y = o.y + Math.min(0, c.height);
            c.width = Math.abs(c.width);
            c.height = Math.abs(c.height)
          }
          i();
          break;
        case "ellipse":
          z = oa(c.cx, c.cy, d);
          c.cx = z.x;
          c.cy = z.y;
          c.rx = d.a * c.rx;
          c.ry = d.d * c.ry;
          c.rx = Math.abs(c.rx);
          c.ry = Math.abs(c.ry);
          i();
          break;
        case "circle":
          z = oa(c.cx, c.cy, d);
          c.cx = z.x;
          c.cy = z.y;
          d = svgedit.math.transformBox(box.x, box.y, box.width, box.height, d);
          c.r = Math.min((d.tr.x - d.tl.x) / 2, (d.bl.y - d.tl.y) / 2);
          if (c.r) c.r = Math.abs(c.r);
          i();
          break;
        case "line":
          o = oa(c.x1, c.y1, d);
          q = oa(c.x2, c.y2, d);
          c.x1 = o.x;
          c.y1 = o.y;
          c.x2 = q.x;
          c.y2 = q.y;
        case "text":
        case "use":
          i();
          break;
        case "g":
          (d = $(b).data("gsvg")) && Ga(d, c, 1E3, true);
          break;
        case "polyline":
        case "polygon":
          i = c.points.length;
          for (z = 0; z < i; ++z) {
            w = c.points[z];
            w = oa(w.x, w.y, d);
            c.points[z].x = w.x;
            c.points[z].y = w.y
          }
          i = c.points.length;
          d = "";
          for (z = 0; z < i; ++z) {
            w = c.points[z];
            d += w.x + "," + w.y + " "
          }
          b.setAttribute("points", d);
          break;
        case "path":
          o = b.pathSegList;
          i = o.numberOfItems;
          c.d = Array(i);
          for (z = 0; z < i; ++z) {
            h = o.getItem(z);
            c.d[z] = {
              type: h.pathSegType,
              x: h.x,
              y: h.y,
              x1: h.x1,
              y1: h.y1,
              x2: h.x2,
              y2: h.y2,
              r1: h.r1,
              r2: h.r2,
              angle: h.angle,
              largeArcFlag: h.largeArcFlag,
              sweepFlag: h.sweepFlag
            }
          }
          i = c.d.length;
          z = c.d[0];
          var u = oa(z.x, z.y, d);
          c.d[0].x = u.x;
          c.d[0].y = u.y;
          for (z = 1; z < i; ++z) {
            h = c.d[z];
            o = h.type;
            if (o % 2 == 0) {
              w = oa(h.x != undefined ? h.x : u.x, h.y != undefined ? h.y : u.y, d);
              o = oa(h.x1, h.y1, d);
              q = oa(h.x2, h.y2, d);
              h.x = w.x;
              h.y = w.y;
              h.x1 = o.x;
              h.y1 = o.y;
              h.x2 = q.x;
              h.y2 = q.y
            } else {
              h.x = d.a * h.x;
              h.y = d.d * h.y;
              h.x1 = d.a * h.x1;
              h.y1 = d.d * h.y1;
              h.x2 = d.a * h.x2;
              h.y2 = d.d * h.y2
            }
            h.r1 = d.a * h.r1;
            h.r2 = d.d * h.r2
          }
          d = "";
          i = c.d.length;
          for (z = 0; z < i; ++z) {
            h = c.d[z];
            o = h.type;
            d += Xb[o];
            switch (o) {
              case 13:
              case 12:
                d += h.x + " ";
                break;
              case 15:
              case 14:
                d += h.y + " ";
                break;
              case 3:
              case 5:
              case 19:
              case 2:
              case 4:
              case 18:
                d += h.x + "," + h.y + " ";
                break;
              case 7:
              case 6:
                d += h.x1 + "," + h.y1 + " " + h.x2 + "," + h.y2 + " " + h.x + "," + h.y + " ";
                break;
              case 9:
              case 8:
                d += h.x1 + "," + h.y1 + " " + h.x + "," + h.y + " ";
                break;
              case 11:
              case 10:
                d += h.r1 + "," + h.r2 + " " + h.angle + " " + +h.largeArcFlag + " " + +h.sweepFlag + " " + h.x + "," + h.y + " ";
                break;
              case 17:
              case 16:
                d += h.x2 + "," + h.y2 + " " + h.x + "," + h.y + " "
            }
          }
          b.setAttribute("d", d)
      }
    }, dc = function (b, c, d) {
      b = rb(b).firstChild;
      var m = ca(b),
        i = k.createSVGTransform();
      i.setTranslate(c, d);
      m.appendItem(i);
      Ta(b)
    }, Ta = this.recalculateDimensions = function (b) {
      if (b == null) return null;
      var c = ca(b);
      if (c && c.numberOfItems > 0) {
        for (var d = c.numberOfItems; d--;) {
          var m = c.getItem(d);
          if (m.type === 0) c.removeItem(d);
          else if (m.type === 1) svgedit.math.isIdentity(m.matrix) && c.removeItem(d);
          else m.type === 4 && m.angle === 0 && c.removeItem(d)
        }
        if (c.numberOfItems === 1 && bb(b)) return null
      }
      if (!c || c.numberOfItems == 0) {
        b.removeAttribute("transform");
        return null
      }
      if (c) {
        d = c.numberOfItems;
        for (var i = []; d--;) {
          m = c.getItem(d);
          if (m.type === 1) i.push([m.matrix, d]);
          else if (i.length) i = []
        }
        if (i.length === 2) {
          d = k.createSVGTransformFromMatrix(pa(i[1][0], i[0][0]));
          c.removeItem(i[0][1]);
          c.removeItem(i[1][1]);
          c.insertItemBefore(d, i[1][1])
        }
        d = c.numberOfItems;
        if (d >= 2 && c.getItem(d - 2).type === 1 && c.getItem(d - 1).type === 2) {
          i = k.createSVGTransform();
          m = pa(c.getItem(d - 2).matrix, c.getItem(d - 1).matrix);
          i.setMatrix(m);
          c.removeItem(d - 2);
          c.removeItem(d - 2);
          c.appendItem(i)
        }
      }
      switch (b.tagName) {
        case "line":
        case "polyline":
        case "polygon":
        case "path":
          break;
        default:
          if (c.numberOfItems === 1 && c.getItem(0).type === 1 || c.numberOfItems === 2 && c.getItem(0).type === 1 && c.getItem(0).type === 4) return null
      }
      var z = $(b).data("gsvg");
      d = new ua("Transform");
      var o = {}, h = null;
      m = [];
      switch (b.tagName) {
        case "line":
          m = ["x1", "y1", "x2", "y2"];
          break;
        case "circle":
          m = ["cx", "cy", "r"];
          break;
        case "ellipse":
          m = ["cx", "cy", "rx", "ry"];
          break;
        case "foreignObject":
        case "rect":
        case "image":
          m = ["width", "height", "x", "y"];
          break;
        case "use":
        case "text":
          m = ["x", "y"];
          break;
        case "polygon":
        case "polyline":
          h = {};
          h.points = b.getAttribute("points");
          i = b.points;
          var q = i.numberOfItems;
          o.points = Array(q);
          for (var w = 0; w < q; ++w) {
            var u = i.getItem(w);
            o.points[w] = {
              x: u.x,
              y: u.y
            }
          }
          break;
        case "path":
          h = {};
          h.d = b.getAttribute("d");
          o.d = b.getAttribute("d")
      }
      if (m.length) {
        o = $(b).attr(m);
        $.each(o, function (eb, fb) {
          o[eb] = ba(eb, fb)
        })
      } else if (z) o = {
        x: $(z).attr("x") || 0,
        y: $(z).attr("y") || 0
      };
      if (h == null) {
        h = $.extend(true, {}, o);
        $.each(h, function (eb, fb) {
          h[eb] = ba(eb, fb)
        })
      }
      h.transform = Qa ? Qa : "";
      if (b.tagName == "g" && !z || b.tagName == "a") {
        i = svgedit.utilities.getBBox(b);
        var t = {
          x: i.x + i.width / 2,
          y: i.y + i.height / 2
        }, C = oa(i.x + i.width / 2, i.y + i.height / 2, da(c).matrix);
        m = k.createSVGMatrix();
        if (i = bb(b)) {
          w = i * Math.PI / 180;
          q = Math.abs(w) > 1.0E-10 ? Math.sin(w) / (1 - Math.cos(w)) : 2 / w;
          for (w = 0; w < c.numberOfItems; ++w) {
            m = c.getItem(w);
            if (m.type == 4) {
              m = m.matrix;
              t.y = (q * m.e + m.f) / 2;
              t.x = (m.e - q * m.f) / 2;
              c.removeItem(w);
              break
            }
          }
        }
        w = m = z = 0;
        var E = c.numberOfItems;
        if (E) var H = c.getItem(0).matrix;
        if (E >= 3 && c.getItem(E - 2).type == 3 && c.getItem(E - 3).type == 2 && c.getItem(E - 1).type == 2) {
          w = 3;
          var I = c.getItem(E - 3).matrix,
            P = c.getItem(E - 2).matrix,
            W = c.getItem(E - 1).matrix;
          q = b.childNodes;
          for (u = q.length; u--;) {
            var Y = q.item(u);
            m = z = 0;
            if (Y.nodeType == 1) {
              var R = ca(Y);
              if (R) {
                m = da(R).matrix;
                z = bb(Y);
                var T = Qa,
                  V = [];
                Qa = Y.getAttribute("transform");
                if (z || ia(R)) {
                  var aa = k.createSVGTransform();
                  aa.setMatrix(pa(I, P, W, m));
                  R.clear();
                  R.appendItem(aa);
                  V.push(aa)
                } else {
                  z = pa(m.inverse(), W, m);
                  aa = k.createSVGMatrix();
                  aa.e = -z.e;
                  aa.f = -z.f;
                  m = pa(aa.inverse(), m.inverse(), I, P, W, m, z.inverse());
                  var Ja = k.createSVGTransform(),
                    Za = k.createSVGTransform(),
                    mb = k.createSVGTransform();
                  Ja.setTranslate(z.e, z.f);
                  Za.setScale(m.a, m.d);
                  mb.setTranslate(aa.e, aa.f);
                  R.appendItem(mb);
                  R.appendItem(Za);
                  R.appendItem(Ja);
                  V.push(mb);
                  V.push(Za);
                  V.push(Ja)
                }
                d.addSubCommand(Ta(Y));
                Qa = T
              }
            }
          }
          c.removeItem(E - 1);
          c.removeItem(E - 2);
          c.removeItem(E - 3)
        } else if (E >= 3 && c.getItem(E - 1).type == 1) {
          w = 3;
          m = da(c).matrix;
          aa = k.createSVGTransform();
          aa.setMatrix(m);
          c.clear();
          c.appendItem(aa)
        } else if ((E == 1 || E > 1 && c.getItem(1).type != 3) && c.getItem(0).type == 2) {
          w = 2;
          z = da(c).matrix;
          c.removeItem(0);
          m = da(c).matrix.inverse();
          m = pa(m, z);
          z = m.e;
          m = m.f;
          if (z != 0 || m != 0) {
            q = b.childNodes;
            u = q.length;
            for (E = []; u--;) {
              Y = q.item(u);
              if (Y.nodeType == 1) {
                if (Y.getAttribute("clip-path")) {
                  T = Y.getAttribute("clip-path");
                  if (E.indexOf(T) === -1) {
                    dc(T, z, m);
                    E.push(T)
                  }
                }
                T = Qa;
                Qa = Y.getAttribute("transform");
                if (R = ca(Y)) {
                  I = k.createSVGTransform();
                  I.setTranslate(z, m);
                  R.numberOfItems ? R.insertItemBefore(I, 0) : R.appendItem(I);
                  d.addSubCommand(Ta(Y));
                  R = b.getElementsByTagNameNS(s, "use");
                  Y = "#" + Y.id;
                  for (I = R.length; I--;) {
                    P = R.item(I);
                    if (Y == ib(P)) {
                      W = k.createSVGTransform();
                      W.setTranslate(-z, -m);
                      ca(P).insertItemBefore(W, 0);
                      d.addSubCommand(Ta(P))
                    }
                  }
                  Qa = T
                }
              }
            }
            E = [];
            Qa = T
          }
        } else if (E == 1 && c.getItem(0).type == 1 && !i) {
          w = 1;
          m = c.getItem(0).matrix;
          q = b.childNodes;
          for (u = q.length; u--;) {
            Y = q.item(u);
            if (Y.nodeType == 1) {
              T = Qa;
              Qa = Y.getAttribute("transform");
              if (R = ca(Y)) {
                z = pa(m, da(R).matrix);
                E = k.createSVGTransform();
                E.setMatrix(z);
                R.clear();
                R.appendItem(E, 0);
                d.addSubCommand(Ta(Y));
                Qa = T;
                T = Y.getAttribute("stroke-width");
                Y.getAttribute("stroke") !== "none" && !isNaN(T) && Y.setAttribute("stroke-width", T * ((Math.abs(z.a) + Math.abs(z.d)) / 2))
              }
            }
          }
          c.clear()
        } else {
          if (i) {
            t = k.createSVGTransform();
            t.setRotate(i, C.x, C.y);
            c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
          }
          c.numberOfItems == 0 && b.removeAttribute("transform");
          return null
        }
        if (w == 2) {
          if (i) {
            C = {
              x: t.x + H.e,
              y: t.y + H.f
            };
            t = k.createSVGTransform();
            t.setRotate(i, C.x, C.y);
            c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
          }
        } else if (w == 3) {
          m = da(c).matrix;
          H = k.createSVGTransform();
          H.setRotate(i, t.x, t.y);
          H = H.matrix;
          t = k.createSVGTransform();
          t.setRotate(i, C.x, C.y);
          C = t.matrix.inverse();
          T = m.inverse();
          C = pa(T, C, H, m);
          z = C.e;
          m = C.f;
          if (z != 0 || m != 0) {
            q = b.childNodes;
            for (u = q.length; u--;) {
              Y = q.item(u);
              if (Y.nodeType == 1) {
                T = Qa;
                Qa = Y.getAttribute("transform");
                R = ca(Y);
                I = k.createSVGTransform();
                I.setTranslate(z, m);
                R.numberOfItems ? R.insertItemBefore(I,
                0) : R.appendItem(I);
                d.addSubCommand(Ta(Y));
                Qa = T
              }
            }
          }
          if (i) c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
        }
      } else {
        i = svgedit.utilities.getBBox(b);
        if (!i && b.tagName != "path") return null;
        m = k.createSVGMatrix();
        if (z = bb(b)) {
          t = {
            x: i.x + i.width / 2,
            y: i.y + i.height / 2
          };
          C = oa(i.x + i.width / 2, i.y + i.height / 2, da(c).matrix);
          w = z * Math.PI / 180;
          q = Math.abs(w) > 1.0E-10 ? Math.sin(w) / (1 - Math.cos(w)) : 2 / w;
          for (w = 0; w < c.numberOfItems; ++w) {
            m = c.getItem(w);
            if (m.type == 4) {
              m = m.matrix;
              t.y = (q * m.e + m.f) / 2;
              t.x = (m.e - q * m.f) / 2;
              c.removeItem(w);
              break
            }
          }
        }
        w = 0;
        E = c.numberOfItems;
        if (!svgedit.browser.isWebkit()) if ((H = b.getAttribute("fill")) && H.indexOf("url(") === 0) {
          H = rb(H);
          T = "pattern";
          if (H.tagName !== T) T = "gradient";
          if (H.getAttribute(T + "Units") === "userSpaceOnUse") {
            m = da(c).matrix;
            i = ca(H);
            i = da(i).matrix;
            m = pa(m, i);
            i = "matrix(" + [m.a, m.b, m.c, m.d, m.e, m.f].join(",") + ")";
            H.setAttribute(T + "Transform", i)
          }
        }
        if (E >= 3 && c.getItem(E - 2).type == 3 && c.getItem(E - 3).type == 2 && c.getItem(E - 1).type == 2) {
          w = 3;
          m = da(c, E - 3, E - 1).matrix;
          c.removeItem(E - 1);
          c.removeItem(E - 2);
          c.removeItem(E - 3)
        } else if (E == 4 && c.getItem(E - 1).type == 1) {
          w = 3;
          m = da(c).matrix;
          aa = k.createSVGTransform();
          aa.setMatrix(m);
          c.clear();
          c.appendItem(aa);
          m = k.createSVGMatrix()
        } else if ((E == 1 || E > 1 && c.getItem(1).type != 3) && c.getItem(0).type == 2) {
          w = 2;
          H = c.getItem(0).matrix;
          T = da(c, 1).matrix;
          i = T.inverse();
          m = pa(i, H, T);
          c.removeItem(0)
        } else if (E == 1 && c.getItem(0).type == 1 && !z) {
          m = da(c).matrix;
          switch (b.tagName) {
            case "line":
              o = $(b).attr(["x1", "y1", "x2", "y2"]);
            case "polyline":
            case "polygon":
              o.points = b.getAttribute("points");
              if (o.points) {
                i = b.points;
                q = i.numberOfItems;
                o.points = Array(q);
                for (w = 0; w < q; ++w) {
                  u = i.getItem(w);
                  o.points[w] = {
                    x: u.x,
                    y: u.y
                  }
                }
              }
            case "path":
              o.d = b.getAttribute("d");
              w = 1;
              c.clear()
          }
        } else {
          w = 4;
          if (z) {
            t = k.createSVGTransform();
            t.setRotate(z, C.x, C.y);
            c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
          }
          c.numberOfItems == 0 && b.removeAttribute("transform");
          return null
        }
        if (w == 1 || w == 2 || w == 3) Fb(b, o, m);
        if (w == 2) {
          if (z) {
            ia(c) || (C = {
              x: t.x + m.e,
              y: t.y + m.f
            });
            t = k.createSVGTransform();
            t.setRotate(z, C.x, C.y);
            c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
          }
        } else if (w == 3 && z) {
          m = da(c).matrix;
          H = k.createSVGTransform();
          H.setRotate(z, t.x, t.y);
          H = H.matrix;
          t = k.createSVGTransform();
          t.setRotate(z, C.x, C.y);
          C = t.matrix.inverse();
          T = m.inverse();
          C = pa(T, C, H, m);
          Fb(b, o, C);
          if (z) c.numberOfItems ? c.insertItemBefore(t, 0) : c.appendItem(t)
        }
      }
      c.numberOfItems == 0 && b.removeAttribute("transform");
      d.addSubCommand(new Ia(b, h));
      return d
    }, nb = null,
    za = this.clearSelection = function (b) {
      if (L[0] != null) for (var c = L.length, d = 0; d < c; ++d) {
        var m = L[d];
        if (m == null) break;
        ra.releaseSelector(m);
        L[d] = null
      }
      b || ha("selected",
      L)
    }, gb = this.addToSelection = function (b, c) {
      if (b.length != 0) {
        for (var d = 0; d < L.length;) {
          if (L[d] == null) break;
          ++d
        }
        for (var m = b.length; m--;) {
          var i = b[m];
          if (i && svgedit.utilities.getBBox(i)) {
            if (i.tagName === "a" && i.childNodes.length === 1) i = i.firstChild;
            if (L.indexOf(i) == -1) {
              L[d] = i;
              d++;
              i = ra.requestSelector(i);
              L.length > 1 && i.showGrips(false)
            }
          }
        }
        ha("selected", L);
        c || L.length == 1 ? ra.requestSelector(L[0]).showGrips(true) : ra.requestSelector(L[0]).showGrips(false);
        for (L.sort(function (z, o) {
          if (z && o && z.compareDocumentPosition) return 3 - (o.compareDocumentPosition(z) & 6);
          else if (z == null) return 1
        }); L[0] == null;) L.shift(0)
      }
    }, Wa = this.selectOnly = function (b, c) {
      za(true);
      gb(b, c)
    };
  this.removeFromSelection = function (b) {
    if (L[0] != null) if (b.length != 0) {
      var c = Array(L.length);
      j = 0;
      len = L.length;
      for (var d = 0; d < len; ++d) {
        var m = L[d];
        if (m) if (b.indexOf(m) == -1) {
          c[j] = m;
          j++
        } else ra.releaseSelector(m)
      }
      L = c
    }
  };
  this.selectAllInCurrentLayer = function () {
    var b = B().getCurrentLayer();
    if (b) {
      sa = "select";
      Wa($(O || b).children())
    }
  };
  var Pb = this.getMouseTarget = function (b) {
    if (b == null) return null;
    b = b.target;
    if (b.correspondingUseElement) b = b.correspondingUseElement;
    if (["http://www.w3.org/1998/Math/MathML", "http://www.w3.org/1999/xhtml"].indexOf(b.namespaceURI) >= 0 && b.id != "svgcanvas") for (; b.nodeName != "foreignObject";) {
      b = b.parentNode;
      if (!b) return k
    }
    var c = B().getCurrentLayer();
    if ([k, a, n, c].indexOf(b) >= 0) return k;
    if ($(b).closest("#selectorParentGroup").length) return ra.selectorParentGroup;
    for (; b.parentNode !== (O || c);) b = b.parentNode;
    return b
  };
  (function () {
    var b = null,
      c = null,
      d = null,
      m = null,
      i = null,
      z = {}, o = {
        minx: null,
        miny: null,
        maxx: null,
        maxy: null
      };
    $(a).mousedown(function (h) {
      if (!(e.spaceKey || h.button === 1)) {
        var q = h.button === 2;
        h.altKey && svgCanvas.cloneSelectedElements(0, 0);
        nb = n.getScreenCTM().inverse();
        var w = oa(h.pageX, h.pageY, nb),
          u = w.x * A,
          t = w.y * A;
        h.preventDefault();
        if (q) {
          sa = "select";
          Vb = w
        }
        w = u / A;
        t = t / A;
        var C = Pb(h);
        if (C.tagName === "a" && C.childNodes.length === 1) C = C.firstChild;
        u = m = c = w;
        var E = i = d = t;
        if (v.gridSnapping) {
          w = la(w);
          t = la(t);
          c = la(c);
          d = la(d)
        }
        if (C == ra.selectorParentGroup && L[0] != null) {
          C = h.target;
          var H = Ab(C, "type");
          if (H == "rotate") sa = "rotate";
          else if (H == "resize") {
            sa = "resize";
            cb = Ab(C, "dir")
          }
          C = L[0]
        }
        Qa = C.getAttribute("transform");
        H = ca(C);
        switch (sa) {
          case "select":
            xa = true;
            cb = "none";
            if (q) xa = false;
            if (C != k) {
              if (L.indexOf(C) == -1) {
                h.shiftKey || za(true);
                gb([C]);
                La = C;
                qa.clear()
              }
              if (!q) for (q = 0; q < L.length; ++q) if (L[q] != null) {
                var I = ca(L[q]);
                I.numberOfItems ? I.insertItemBefore(k.createSVGTransform(), 0) : I.appendItem(k.createSVGTransform())
              }
            } else if (!q) {
              za();
              sa = "multiselect";
              if (wa == null) wa = ra.getRubberBandBox();
              m *= A;
              i *= A;
              Ga(wa, {
                x: m,
                y: i,
                width: 0,
                height: 0,
                display: "inline"
              }, 100)
            }
            break;
          case "zoom":
            xa = true;
            if (wa == null) wa = ra.getRubberBandBox();
            Ga(wa, {
              x: u * A,
              y: u * A,
              width: 0,
              height: 0,
              display: "inline"
            }, 100);
            break;
          case "resize":
            xa = true;
            c = w;
            d = t;
            z = svgedit.utilities.getBBox($("#selectedBox0")[0]);
            var P = {};
            $.each(z, function (W, Y) {
              P[W] = Y / A
            });
            z = P;
            q = bb(C) ? 1 : 0;
            if (ia(H)) {
              H.insertItemBefore(k.createSVGTransform(), q);
              H.insertItemBefore(k.createSVGTransform(), q);
              H.insertItemBefore(k.createSVGTransform(), q)
            } else {
              H.appendItem(k.createSVGTransform());
              H.appendItem(k.createSVGTransform());
              H.appendItem(k.createSVGTransform());
              if (svgedit.browser.supportsNonScalingStroke()) {
                if (w = svgedit.browser.isWebkit()) I = function (W) {
                  var Y = W.getAttributeNS(null, "stroke");
                  W.removeAttributeNS(null, "stroke");
                  setTimeout(function () {
                    W.setAttributeNS(null, "stroke", Y)
                  }, 0)
                };
                C.style.vectorEffect = "non-scaling-stroke";
                w && I(C);
                t = C.getElementsByTagName("*");
                u = t.length;
                for (q = 0; q < u; q++) {
                  t[q].style.vectorEffect = "non-scaling-stroke";
                  w && I(t[q])
                }
              }
            }
            break;
          case "fhellipse":
          case "fhrect":
          case "fhpath":
            xa = true;
            b = u + "," + E + " ";
            I = N.stroke_width == 0 ? 1 : N.stroke_width;
            na({
              element: "polyline",
              curStyles: true,
              attr: {
                points: b,
                id: Fa(),
                fill: "none",
                opacity: N.opacity / 2,
                "stroke-linecap": "round",
                style: "pointer-events:none"
              }
            });
            o.minx = u;
            o.maxx = u;
            o.miny = E;
            o.maxy = E;
            break;
          case "image":
            xa = true;
            I = na({
              element: "image",
              attr: {
                x: w,
                y: t,
                width: 0,
                height: 0,
                id: Fa(),
                opacity: N.opacity / 2,
                style: "pointer-events:inherit"
              }
            });
            lb(I, Bb);
            Mb(I);
            break;
          case "square":
          case "rect":
            xa = true;
            c = w;
            d = t;
            na({
              element: "rect",
              curStyles: true,
              attr: {
                x: w,
                y: t,
                width: 0,
                height: 0,
                id: Fa(),
                opacity: N.opacity / 2
              }
            });
            break;
          case "line":
            xa = true;
            I = N.stroke_width == 0 ? 1 : N.stroke_width;
            na({
              element: "line",
              curStyles: true,
              attr: {
                x1: w,
                y1: t,
                x2: w,
                y2: t,
                id: Fa(),
                stroke: N.stroke,
                "stroke-width": I,
                "stroke-dasharray": N.stroke_dasharray,
                "stroke-linejoin": N.stroke_linejoin,
                "stroke-linecap": N.stroke_linecap,
                "stroke-opacity": N.stroke_opacity,
                fill: "none",
                opacity: N.opacity / 2,
                style: "pointer-events:none"
              }
            });
            break;
          case "circle":
            xa = true;
            na({
              element: "circle",
              curStyles: true,
              attr: {
                cx: w,
                cy: t,
                r: 0,
                id: Fa(),
                opacity: N.opacity / 2
              }
            });
            break;
          case "ellipse":
            xa = true;
            na({
              element: "ellipse",
              curStyles: true,
              attr: {
                cx: w,
                cy: t,
                rx: 0,
                ry: 0,
                id: Fa(),
                opacity: N.opacity / 2
              }
            });
            break;
          case "text":
            xa = true;
            na({
              element: "text",
              curStyles: true,
              attr: {
                x: w,
                y: t,
                id: Fa(),
                fill: Ua.fill,
                "stroke-width": Ua.stroke_width,
                "font-size": Ua.font_size,
                "font-family": Ua.font_family,
                "text-anchor": "middle",
                "xml:space": "preserve",
                opacity: N.opacity
              }
            });
            break;
          case "path":
          case "pathedit":
            c *= A;
            d *= A;
            qa.mouseDown(h, C, c, d);
            xa = true;
            break;
          case "textedit":
            c *= A;
            d *= A;
            Ra.mouseDown(h,
            C, c, d);
            xa = true;
            break;
          case "rotate":
            xa = true;
            e.undoMgr.beginUndoableChange("transform", L)
        }
        h = Db("mouseDown", {
          event: h,
          start_x: c,
          start_y: d,
          selectedElements: L
        }, true);
        $.each(h, function (W, Y) {
          if (Y && Y.started) xa = true
        })
      }
    }).mousemove(function (h) {
      if (xa) if (!(h.button === 1 || e.spaceKey)) {
        var q = L[0],
          w = oa(h.pageX, h.pageY, nb),
          u = w.x * A;
        w = w.y * A;
        var t = va(db()),
          C = x = u / A,
          E = y = w / A;
        if (v.gridSnapping) {
          x = la(x);
          y = la(y)
        }
        h.preventDefault();
        switch (sa) {
          case "select":
            if (L[0] !== null) {
              C = x - c;
              var H = y - d;
              if (v.gridSnapping) {
                C = la(C);
                H = la(H)
              }
              if (h.shiftKey) {
                var I = Ya(c, d, x, y);
                x = I.x;
                y = I.y
              }
              if (C != 0 || H != 0) {
                I = L.length;
                for (E = 0; E < I; ++E) {
                  q = L[E];
                  if (q == null) break;
                  var P = k.createSVGTransform();
                  t = ca(q);
                  P.setTranslate(C, H);
                  t.numberOfItems ? t.replaceItem(P, 0) : t.appendItem(P);
                  ra.requestSelector(q).resize()
                }
                ha("transition", L)
              }
            }
            break;
          case "multiselect":
            C *= A;
            E *= A;
            Ga(wa, {
              x: Math.min(m, C),
              y: Math.min(i, E),
              width: Math.abs(C - m),
              height: Math.abs(E - i)
            }, 100);
            t = [];
            C = [];
            P = Wb();
            I = L.length;
            for (E = 0; E < I; ++E) {
              H = P.indexOf(L[E]);
              if (H == -1) t.push(L[E]);
              else P[H] = null
            }
            I = P.length;
            for (E = 0; E < I; ++E) P[E] && C.push(P[E]);
            t.length > 0 && e.removeFromSelection(t);
            C.length > 0 && gb(C);
            break;
          case "resize":
            t = ca(q);
            H = (I = ia(t)) ? z : svgedit.utilities.getBBox(q);
            E = H.x;
            P = H.y;
            var W = H.width,
              Y = H.height;
            C = x - c;
            H = y - d;
            if (v.gridSnapping) {
              C = la(C);
              H = la(H);
              Y = la(Y);
              W = la(W)
            }
            var R = bb(q);
            if (R) {
              var T = Math.sqrt(C * C + H * H);
              H = Math.atan2(H, C) - R * Math.PI / 180;
              C = T * Math.cos(H);
              H = T * Math.sin(H)
            }
            if (cb.indexOf("n") == -1 && cb.indexOf("s") == -1) H = 0;
            if (cb.indexOf("e") == -1 && cb.indexOf("w") == -1) C = 0;
            var V = T = 0,
              aa = Y ? (Y + H) / Y : 1,
              Ja = W ? (W + C) / W : 1;
            if (cb.indexOf("n") >= 0) {
              aa = Y ? (Y - H) / Y : 1;
              V = Y
            }
            if (cb.indexOf("w") >= 0) {
              Ja = W ? (W - C) / W : 1;
              T = W
            }
            C = k.createSVGTransform();
            H = k.createSVGTransform();
            W = k.createSVGTransform();
            if (v.gridSnapping) {
              E = la(E);
              T = la(T);
              P = la(P);
              V = la(V)
            }
            C.setTranslate(-(E + T), -(P + V));
            if (h.shiftKey) if (Ja == 1) Ja = aa;
            else aa = Ja;
            H.setScale(Ja, aa);
            W.setTranslate(E + T, P + V);
            if (I) {
              I = R ? 1 : 0;
              t.replaceItem(C, 2 + I);
              t.replaceItem(H, 1 + I);
              t.replaceItem(W, 0 + I)
            } else {
              I = t.numberOfItems;
              t.replaceItem(W, I - 3);
              t.replaceItem(H, I - 2);
              t.replaceItem(C, I - 1)
            }
            ra.requestSelector(q).resize();
            ha("transition",
            L);
            break;
          case "zoom":
            C *= A;
            E *= A;
            Ga(wa, {
              x: Math.min(m * A, C),
              y: Math.min(i * A, E),
              width: Math.abs(C - m * A),
              height: Math.abs(E - i * A)
            }, 100);
            break;
          case "text":
            Ga(t, {
              x: x,
              y: y
            }, 1E3);
            break;
          case "line":
            E = null;
            window.opera || k.suspendRedraw(1E3);
            if (v.gridSnapping) {
              x = la(x);
              y = la(y)
            }
            C = x;
            I = y;
            if (h.shiftKey) {
              I = Ya(c, d, C, I);
              C = I.x;
              I = I.y
            }
            t.setAttributeNS(null, "x2", C);
            t.setAttributeNS(null, "y2", I);
            window.opera || k.unsuspendRedraw(E);
            break;
          case "foreignObject":
          case "square":
          case "rect":
          case "image":
            C = Math.abs(x - c);
            I = Math.abs(y - d);
            if (sa ==
              "square" || h.shiftKey) {
              C = I = Math.max(C, I);
              E = c < x ? c : c - C;
              P = d < y ? d : d - I
            } else {
              E = Math.min(c, x);
              P = Math.min(d, y)
            }
            if (v.gridSnapping) {
              C = la(C);
              I = la(I);
              E = la(E);
              P = la(P)
            }
            Ga(t, {
              width: C,
              height: I,
              x: E,
              y: P
            }, 1E3);
            break;
          case "circle":
            I = $(t).attr(["cx", "cy"]);
            C = I.cx;
            I = I.cy;
            C = Math.sqrt((x - C) * (x - C) + (y - I) * (y - I));
            if (v.gridSnapping) C = la(C);
            t.setAttributeNS(null, "r", C);
            break;
          case "ellipse":
            I = $(t).attr(["cx", "cy"]);
            C = I.cx;
            I = I.cy;
            E = null;
            window.opera || k.suspendRedraw(1E3);
            if (v.gridSnapping) {
              x = la(x);
              C = la(C);
              y = la(y);
              I = la(I)
            }
            t.setAttributeNS(null,
              "rx", Math.abs(x - C));
            t.setAttributeNS(null, "ry", Math.abs(h.shiftKey ? x - C : y - I));
            window.opera || k.unsuspendRedraw(E);
            break;
          case "fhellipse":
          case "fhrect":
            o.minx = Math.min(C, o.minx);
            o.maxx = Math.max(C, o.maxx);
            o.miny = Math.min(E, o.miny);
            o.maxy = Math.max(E, o.maxy);
          case "fhpath":
            b += +C + "," + E + " ";
            t.setAttributeNS(null, "points", b);
            break;
          case "path":
          case "pathedit":
            x *= A;
            y *= A;
            if (v.gridSnapping) {
              x = la(x);
              y = la(y);
              c = la(c);
              d = la(d)
            }
            if (h.shiftKey) {
              if (I = svgedit.path.path) {
                t = I.dragging ? I.dragging[0] : c;
                I = I.dragging ? I.dragging[1] : d
              } else {
                t = c;
                I = d
              }
              I = Ya(t, I, x, y);
              x = I.x;
              y = I.y
            }
            if (wa && wa.getAttribute("display") !== "none") {
              C *= A;
              E *= A;
              Ga(wa, {
                x: Math.min(m * A, C),
                y: Math.min(i * A, E),
                width: Math.abs(C - m * A),
                height: Math.abs(E - i * A)
              }, 100)
            }
            qa.mouseMove(x, y);
            break;
          case "textedit":
            x *= A;
            y *= A;
            Ra.mouseMove(u, w);
            break;
          case "rotate":
            H = svgedit.utilities.getBBox(q);
            C = H.x + H.width / 2;
            I = H.y + H.height / 2;
            t = kb(q);
            t = oa(C, I, t);
            C = t.x;
            I = t.y;
            R = (Math.atan2(I - y, C - x) * (180 / Math.PI) - 90) % 360;
            if (v.gridSnapping) R = la(R);
            if (h.shiftKey) R = Math.round(R / 45) * 45;
            e.setRotationAngle(R < -180 ? 360 + R : R, true);
            ha("transition", L)
        }
        Db("mouseMove", {
          event: h,
          mouse_x: u,
          mouse_y: w,
          selected: q
        })
      }
    }).click(function (h) {
      h.preventDefault();
      return false
    }).dblclick(function (h) {
      var q = h.target.parentNode;
      if (q !== O) {
        var w = Pb(h),
          u = w.tagName;
        if (u === "text" && sa !== "textedit") {
          h = oa(h.pageX, h.pageY, nb);
          Ra.select(w, h.x, h.y)
        }
        if ((u === "g" || u === "a") && bb(w)) {
          Yb(w);
          w = L[0];
          za(true)
        }
        O && Qb();
        q.tagName !== "g" && q.tagName !== "a" || q === B().getCurrentLayer() || w === ra.selectorParentGroup || lc(w)
      }
    }).mouseup(function (h) {
      if (h.button !== 2) {
        var q = La;
        La = null;
        if (xa) {
          var w = oa(h.pageX, h.pageY, nb),
            u = w.x * A;
          w = w.y * A;
          var t = u / A,
            C = w / A,
            E = va(db()),
            H = false;
          xa = false;
          switch (sa) {
            case "resize":
            case "multiselect":
              if (wa != null) {
                wa.setAttribute("display", "none");
                jb = []
              }
              sa = "select";
            case "select":
              if (L[0] != null) {
                if (L[1] == null) {
                  u = L[0];
                  switch (u.tagName) {
                    case "g":
                    case "use":
                    case "image":
                    case "foreignObject":
                      break;
                    default:
                      Sa.fill = u.getAttribute("fill");
                      Sa.fill_opacity = u.getAttribute("fill-opacity");
                      Sa.stroke = u.getAttribute("stroke");
                      Sa.stroke_opacity = u.getAttribute("stroke-opacity");
                      Sa.stroke_width = u.getAttribute("stroke-width");
                      Sa.stroke_dasharray = u.getAttribute("stroke-dasharray");
                      Sa.stroke_linejoin = u.getAttribute("stroke-linejoin");
                      Sa.stroke_linecap = u.getAttribute("stroke-linecap")
                  }
                  if (u.tagName == "text") {
                    Ua.font_size = u.getAttribute("font-size");
                    Ua.font_family = u.getAttribute("font-family")
                  }
                  ra.requestSelector(u).showGrips(true)
                }
                Ob();
                if (t != m || C != i) {
                  h = L.length;
                  for (u = 0; u < h; ++u) {
                    if (L[u] == null) break;
                    L[u].firstChild || ra.requestSelector(L[u]).resize()
                  }
                } else {
                  u = h.target;
                  if (L[0].nodeName ===
                    "path" && L[1] == null) qa.select(L[0]);
                  else h.shiftKey && q != u && e.removeFromSelection([u])
                }
                if (svgedit.browser.supportsNonScalingStroke()) if (h = L[0]) {
                  h.removeAttribute("style");
                  svgedit.utilities.walkTree(h, function (W) {
                    W.removeAttribute("style")
                  })
                }
              }
              return;
            case "zoom":
              wa != null && wa.setAttribute("display", "none");
              ha("zoomed", {
                x: Math.min(m, t),
                y: Math.min(i, C),
                width: Math.abs(t - m),
                height: Math.abs(C - i),
                factor: h.shiftKey ? 0.5 : 2
              });
              return;
            case "fhpath":
              q = E.getAttribute("points");
              t = q.indexOf(",");
              if (H = t >= 0 ? q.indexOf(",",
              t + 1) >= 0 : q.indexOf(" ", q.indexOf(" ") + 1) >= 0) E = qa.smoothPolylineIntoPath(E);
              break;
            case "line":
              q = $(E).attr(["x1", "x2", "y1", "y2"]);
              H = q.x1 != q.x2 || q.y1 != q.y2;
              break;
            case "foreignObject":
            case "square":
            case "rect":
            case "image":
              q = $(E).attr(["width", "height"]);
              H = q.width != 0 || q.height != 0 || sa === "image";
              break;
            case "circle":
              H = E.getAttribute("r") != 0;
              break;
            case "ellipse":
              q = $(E).attr(["rx", "ry"]);
              H = q.rx != null || q.ry != null;
              break;
            case "fhellipse":
              if (o.maxx - o.minx > 0 && o.maxy - o.miny > 0) {
                E = na({
                  element: "ellipse",
                  curStyles: true,
                  attr: {
                    cx: (o.minx + o.maxx) / 2,
                    cy: (o.miny + o.maxy) / 2,
                    rx: (o.maxx - o.minx) / 2,
                    ry: (o.maxy - o.miny) / 2,
                    id: db()
                  }
                });
                ha("changed", [E]);
                H = true
              }
              break;
            case "fhrect":
              if (o.maxx - o.minx > 0 && o.maxy - o.miny > 0) {
                E = na({
                  element: "rect",
                  curStyles: true,
                  attr: {
                    x: o.minx,
                    y: o.miny,
                    width: o.maxx - o.minx,
                    height: o.maxy - o.miny,
                    id: db()
                  }
                });
                ha("changed", [E]);
                H = true
              }
              break;
            case "text":
              H = true;
              Wa([E]);
              Ra.start(E);
              break;
            case "path":
              E = null;
              xa = true;
              q = qa.mouseUp(h, E, u, w);
              E = q.element;
              H = q.keep;
              break;
            case "pathedit":
              H = true;
              E = null;
              qa.mouseUp(h);
              break;
            case "textedit":
              H = false;
              E = null;
              Ra.mouseUp(h, u, w);
              break;
            case "rotate":
              H = true;
              E = null;
              sa = "select";
              q = e.undoMgr.finishUndoableChange();
              q.isEmpty() || ma(q);
              Ob();
              ha("changed", L)
          }
          u = Db("mouseUp", {
            event: h,
            mouse_x: u,
            mouse_y: w
          }, true);
          $.each(u, function (W, Y) {
            if (Y) {
              H = Y.keep || H;
              E = Y.element;
              xa = Y.started || xa
            }
          });
          if (!H && E != null) {
            B().releaseId(db());
            E.parentNode.removeChild(E);
            E = null;
            for (u = h.target; u.parentNode.parentNode.tagName == "g";) u = u.parentNode;
            if ((sa != "path" || !drawn_path) && u.parentNode.id != "selectorParentGroup" && u.id != "svgcanvas" && u.id != "svgroot") {
              e.setMode("select");
              Wa([u], true)
            }
          } else if (E != null) {
            e.addedNew = true;
            h = 0.2;
            var I;
            if (Ib.beginElement && E.getAttribute("opacity") != N.opacity) {
              I = $(Ib).clone().attr({
                to: N.opacity,
                dur: h
              }).appendTo(E);
              try {
                I[0].beginElement()
              } catch (P) {}
            } else h = 0;
            setTimeout(function () {
              I && I.remove();
              E.setAttribute("opacity", N.opacity);
              E.setAttribute("style", "pointer-events:inherit");
              Oa(E);
              if (sa === "path") qa.toEditMode(E);
              else v.selectNew && Wa([E], true);
              ma(new Ha(E));
              ha("changed", [E])
            }, h * 1E3)
          }
          Qa = null
        }
      }
    });
    $(a).bind("mousewheel DOMMouseScroll",

    function (h) {
      if (h.shiftKey) {
        h.preventDefault();
        nb = n.getScreenCTM().inverse();
        var q = oa(h.pageX, h.pageY, nb);
        q = {
          x: q.x,
          y: q.y,
          width: 0,
          height: 0
        };
        if (h.wheelDelta) if (h.wheelDelta >= 120) q.factor = 2;
        else {
          if (h.wheelDelta <= -120) q.factor = 0.5
        } else if (h.detail) if (h.detail > 0) q.factor = 0.5;
        else if (h.detail < 0) q.factor = 2;
        q.factor && ha("zoomed", q)
      }
    })
  })();
  var Mb = function (b) {
    $(b).click(function (c) {
      c.preventDefault()
    })
  }, Ra = e.textActions = function () {
    function b(R) {
      var T = w.value === "";
      $(w).focus();
      if (!arguments.length) if (T) R = 0;
      else {
        if (w.selectionEnd !== w.selectionStart) return;
        R = w.selectionEnd
      }
      var V;
      V = E[R];
      T || w.setSelectionRange(R, R);
      u = va("text_cursor");
      if (!u) {
        u = document.createElementNS(s, "line");
        Ga(u, {
          id: "text_cursor",
          stroke: "#333",
          "stroke-width": 1
        });
        u = va("selectorParentGroup").appendChild(u)
      }
      C || (C = setInterval(function () {
        var aa = u.getAttribute("display") === "none";
        u.setAttribute("display", aa ? "inline" : "none")
      }, 600));
      T = z(V.x, H.y);
      V = z(V.x, H.y + H.height);
      Ga(u, {
        x1: T.x,
        y1: T.y,
        x2: V.x,
        y2: V.y,
        visibility: "visible",
        display: "inline"
      });
      t && t.setAttribute("d", "")
    }

    function c(R, T, V) {
      if (R === T) b(T);
      else {
        V || w.setSelectionRange(R, T);
        t = va("text_selectblock");
        if (!t) {
          t = document.createElementNS(s, "path");
          Ga(t, {
            id: "text_selectblock",
            fill: "green",
            opacity: 0.5,
            style: "pointer-events:none"
          });
          va("selectorParentGroup").appendChild(t)
        }
        R = E[R];
        var aa = E[T];
        u.setAttribute("visibility", "hidden");
        T = z(R.x, H.y);
        V = z(R.x + (aa.x - R.x), H.y);
        var Ja = z(R.x, H.y + H.height);
        R = z(R.x + (aa.x - R.x), H.y + H.height);
        Ga(t, {
          d: "M" + T.x + "," + T.y + " L" + V.x + "," + V.y + " " + R.x + "," + R.y + " " + Ja.x + "," + Ja.y + "z",
          display: "inline"
        })
      }
    }

    function d(R, T) {
      var V = k.createSVGPoint();
      V.x = R;
      V.y = T;
      if (E.length == 1) return 0;
      V = q.getCharNumAtPosition(V);
      if (V < 0) {
        V = E.length - 2;
        if (R <= E[0].x) V = 0
      } else if (V >= E.length - 2) V = E.length - 2;
      var aa = E[V];
      R > aa.x + aa.width / 2 && V++;
      return V
    }
    function m(R, T, V) {
      var aa = w.selectionStart;
      R = d(R, T);
      c(Math.min(aa, R), Math.max(aa, R), !V)
    }
    function i(R, T) {
      var V = {
        x: R,
        y: T
      };
      V.x /= A;
      V.y /= A;
      if (I) {
        var aa = oa(V.x, V.y, I.inverse());
        V.x = aa.x;
        V.y = aa.y
      }
      return V
    }
    function z(R, T) {
      var V = {
        x: R,
        y: T
      };
      if (I) {
        var aa = oa(V.x, V.y, I);
        V.x = aa.x;
        V.y = aa.y
      }
      V.x *= A;
      V.y *= A;
      return V
    }
    function o(R) {
      c(0, q.textContent.length);
      $(this).unbind(R)
    }
    function h(R) {
      if (Y && q) {
        var T = oa(R.pageX, R.pageY, nb);
        T = i(T.x * A, T.y * A);
        T = d(T.x, T.y);
        var V = q.textContent,
          aa = V.substr(0, T).replace(/[a-z0-9]+$/i, "").length;
        V = V.substr(T).match(/^[a-z0-9]+/i);
        c(aa, (V ? V[0].length : 0) + T);
        $(R.target).click(o);
        setTimeout(function () {
          $(R.target).unbind("click", o)
        }, 300)
      }
    }
    var q, w, u, t, C, E = [],
      H, I, P, W, Y;
    return {
      select: function (R, T, V) {
        q = R;
        Ra.toEditMode(T, V)
      },
      start: function (R) {
        q = R;
        Ra.toEditMode()
      },
      mouseDown: function (R,
      T, V, aa) {
        R = i(V, aa);
        w.focus();
        b(d(R.x, R.y));
        P = V;
        W = aa
      },
      mouseMove: function (R, T) {
        var V = i(R, T);
        m(V.x, V.y)
      },
      mouseUp: function (R, T, V) {
        var aa = i(T, V);
        m(aa.x, aa.y, true);
        R.target !== q && T < P + 2 && T > P - 2 && V < W + 2 && V > W - 2 && Ra.toSelectMode(true)
      },
      setCursor: b,
      toEditMode: function (R, T) {
        Y = false;
        sa = "textedit";
        ra.requestSelector(q).showGrips(false);
        ra.requestSelector(q);
        Ra.init();
        $(q).css("cursor", "text");
        if (arguments.length) {
          var V = i(R, T);
          b(d(V.x, V.y))
        } else b();
        setTimeout(function () {
          Y = true
        }, 300)
      },
      toSelectMode: function (R) {
        sa = "select";
        clearInterval(C);
        C = null;
        t && $(t).attr("display", "none");
        u && $(u).attr("visibility", "hidden");
        $(q).css("cursor", "move");
        if (R) {
          za();
          $(q).css("cursor", "move");
          ha("selected", [q]);
          gb([q], true)
        }
        q && !q.textContent.length && e.deleteSelectedElements();
        $(w).blur();
        q = false
      },
      setInputElem: function (R) {
        w = R
      },
      clear: function () {
        sa == "textedit" && Ra.toSelectMode()
      },
      init: function () {
        if (q) {
          if (!q.parentNode) {
            q = L[0];
            ra.requestSelector(q).showGrips(false)
          }
          var R = q.textContent.length,
            T = q.getAttribute("transform");
          H = svgedit.utilities.getBBox(q);
          I = T ? kb(q) : null;
          E = Array(R);
          w.focus();
          $(q).unbind("dblclick", h).dblclick(h);
          if (!R) var V = {
            x: H.x + H.width / 2,
            width: 0
          };
          for (T = 0; T < R; T++) {
            var aa = q.getStartPositionOfChar(T);
            V = q.getEndPositionOfChar(T);
            if (!svgedit.browser.supportsGoodTextCharPos()) {
              var Ja = e.contentW * A;
              aa.x -= Ja;
              V.x -= Ja;
              aa.x /= A;
              V.x /= A
            }
            E[T] = {
              x: aa.x,
              y: H.y,
              width: V.x - aa.x,
              height: H.height
            }
          }
          E.push({
            x: V.x,
            width: 0
          });
          c(w.selectionStart, w.selectionEnd, true)
        }
      }
    }
  }(),
    qa = e.pathActions = function () {
      var b = false,
        c, d, m;
      svgedit.path.Path.prototype.endChanges = function (o) {
        if (svgedit.browser.isWebkit()) {
          var h = this.elem;
          h.setAttribute("d", qa.convertPath(h))
        }
        o = new Ia(this.elem, {
          d: this.last_d
        }, o);
        ma(o);
        ha("changed", [this.elem])
      };
      svgedit.path.Path.prototype.addPtsToSelection = function (o) {
        $.isArray(o) || (o = [o]);
        for (var h = 0; h < o.length; h++) {
          var q = o[h],
            w = this.segs[q];
          w.ptgrip && this.selected_pts.indexOf(q) == -1 && q >= 0 && this.selected_pts.push(q)
        }
        this.selected_pts.sort();
        h = this.selected_pts.length;
        for (o = Array(h); h--;) {
          w = this.segs[this.selected_pts[h]];
          w.select(true);
          o[h] = w.ptgrip
        }
        qa.canDeleteNodes = true;
        qa.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);
        ha("selected", o)
      };
      var i = c = null,
        z = false;
      return {
        mouseDown: function (o, h, q, w) {
          if (sa === "path") {
            mouse_x = q;
            mouse_y = w;
            w = mouse_x / A;
            h = mouse_y / A;
            q = va("path_stretch_line");
            d = [w, h];
            if (v.gridSnapping) {
              w = la(w);
              h = la(h);
              mouse_x = la(mouse_x);
              mouse_y = la(mouse_y)
            }
            if (!q) {
              q = document.createElementNS(s, "path");
              Ga(q, {
                id: "path_stretch_line",
                stroke: "#22C",
                "stroke-width": "0.5",
                fill: "none"
              });
              q = va("selectorParentGroup").appendChild(q)
            }
            q.setAttribute("display", "inline");
            var u = null;
            if (i) {
              u = i.pathSegList;
              for (var t = u.numberOfItems, C = 6 / A, E = false; t;) {
                t--;
                var H = u.getItem(t),
                  I = H.x;
                H = H.y;
                if (w >= I - C && w <= I + C && h >= H - C && h <= H + C) {
                  E = true;
                  break
                }
              }
              C = db();
              svgedit.path.removePath_(C);
              C = va(C);
              I = u.numberOfItems;
              if (E) {
                if (t <= 1 && I >= 2) {
                  w = u.getItem(0).x;
                  h = u.getItem(0).y;
                  o = q.pathSegList.getItem(1);
                  o = o.pathSegType === 4 ? i.createSVGPathSegLinetoAbs(w, h) : i.createSVGPathSegCurvetoCubicAbs(w, h, o.x1 / A, o.y1 / A, w, h);
                  w = i.createSVGPathSegClosePath();
                  u.appendItem(o);
                  u.appendItem(w)
                } else if (I < 3) return u = false;
                $(q).remove();
                element = C;
                i = null;
                xa = false;
                if (b) {
                  svgedit.path.path.matrix && Fb(C, {}, svgedit.path.path.matrix.inverse());
                  q = C.getAttribute("d");
                  o = $(svgedit.path.path.elem).attr("d");
                  $(svgedit.path.path.elem).attr("d", o + q);
                  $(C).remove();
                  svgedit.path.path.matrix && svgedit.path.recalcRotatedPath();
                  svgedit.path.path.init();
                  qa.toEditMode(svgedit.path.path.elem);
                  svgedit.path.path.selectPt();
                  return false
                }
              } else {
                if (!$.contains(a, Pb(o))) {
                  console.log("Clicked outside canvas");
                  return false
                }
                u = i.pathSegList.numberOfItems;
                t = i.pathSegList.getItem(u - 1);
                C = t.x;
                t = t.y;
                if (o.shiftKey) {
                  o = Ya(C, t, w, h);
                  w = o.x;
                  h = o.y
                }
                o = q.pathSegList.getItem(1);
                o = o.pathSegType === 4 ? i.createSVGPathSegLinetoAbs(Eb(w), Eb(h)) : i.createSVGPathSegCurvetoCubicAbs(Eb(w), Eb(h), o.x1 / A, o.y1 / A, o.x2 / A, o.y2 / A);
                i.pathSegList.appendItem(o);
                w *= A;
                h *= A;
                q.setAttribute("d", ["M", w, h, w, h].join(" "));
                q = u;
                if (b) q += svgedit.path.path.segs.length;
                svgedit.path.addPointGrip(q, w, h)
              }
            } else {
              d_attr = "M" + w + "," + h + " ";
              i = na({
                element: "path",
                curStyles: true,
                attr: {
                  d: d_attr,
                  id: Fa(),
                  opacity: N.opacity / 2
                }
              });
              q.setAttribute("d", ["M", mouse_x, mouse_y, mouse_x, mouse_y].join(" "));
              q = b ? svgedit.path.path.segs.length : 0;
              svgedit.path.addPointGrip(q, mouse_x, mouse_y)
            }
          } else if (svgedit.path.path) {
            svgedit.path.path.storeD();
            C = o.target.id;
            if (C.substr(0, 14) == "pathpointgrip_") {
              h = svgedit.path.path.cur_pt = parseInt(C.substr(14));
              svgedit.path.path.dragging = [q, w];
              u = svgedit.path.path.segs[h];
              if (o.shiftKey) u.selected ? svgedit.path.path.removePtFromSelection(h) : svgedit.path.path.addPtsToSelection(h);
              else {
                if (svgedit.path.path.selected_pts.length <= 1 || !u.selected) svgedit.path.path.clearSelection();
                svgedit.path.path.addPtsToSelection(h)
              }
            } else if (C.indexOf("ctrlpointgrip_") == 0) {
              svgedit.path.path.dragging = [q, w];
              o = C.split("_")[1].split("c");
              h = o[0] - 0;
              svgedit.path.path.selectPt(h, o[1] - 0)
            }
            if (!svgedit.path.path.dragging) {
              if (wa == null) wa = ra.getRubberBandBox();
              Ga(wa, {
                x: q * A,
                y: w * A,
                width: 0,
                height: 0,
                display: "inline"
              }, 100)
            }
          }
        },
        mouseMove: function (o, h) {
          z = true;
          if (sa === "path") {
            if (i) {
              var q = i.pathSegList,
                w = q.numberOfItems - 1;
              if (d) {
                var u = svgedit.path.addCtrlGrip("1c1"),
                  t = svgedit.path.addCtrlGrip("0c2");
                u.setAttribute("cx", o);
                u.setAttribute("cy", h);
                u.setAttribute("display", "inline");
                u = d[0];
                var C = d[1];
                q.getItem(w);
                var E = u + (u - o / A),
                  H = C + (C - h / A);
                t.setAttribute("cx", E * A);
                t.setAttribute("cy", H * A);
                t.setAttribute("display", "inline");
                t = svgedit.path.getCtrlLine(1);
                Ga(t, {
                  x1: o,
                  y1: h,
                  x2: E * A,
                  y2: H * A,
                  display: "inline"
                });
                if (w === 0) m = [o, h];
                else {
                  var I = q.getItem(w - 1);
                  q = I.x;
                  t = I.y;
                  if (I.pathSegType === 6) {
                    q += q - I.x2;
                    t += t - I.y2
                  } else if (m) {
                    q = m[0] / A;
                    t = m[1] / A
                  }
                  svgedit.path.replacePathSeg(6, w, [u, C,
                  q, t, E, H], i)
                }
              } else if (u = va("path_stretch_line")) {
                w = q.getItem(w);
                if (w.pathSegType === 6) svgedit.path.replacePathSeg(6, 1, [o, h, (w.x + (w.x - w.x2)) * A, (w.y + (w.y - w.y2)) * A, o, h], u);
                else m ? svgedit.path.replacePathSeg(6, 1, [o, h, m[0], m[1], o, h], u) : svgedit.path.replacePathSeg(4, 1, [o, h], u)
              }
            }
          } else if (svgedit.path.path.dragging) {
            u = svgedit.path.getPointFromGrip({
              x: svgedit.path.path.dragging[0],
              y: svgedit.path.path.dragging[1]
            }, svgedit.path.path);
            C = svgedit.path.getPointFromGrip({
              x: o,
              y: h
            }, svgedit.path.path);
            w = C.x - u.x;
            u = C.y - u.y;
            svgedit.path.path.dragging = [o, h];
            svgedit.path.path.dragctrl ? svgedit.path.path.moveCtrl(w, u) : svgedit.path.path.movePts(w, u)
          } else {
            svgedit.path.path.selected_pts = [];
            svgedit.path.path.eachSeg(function () {
              if (this.next || this.prev) {
                var P = wa.getBBox(),
                  W = svgedit.path.getGripPt(this);
                P = svgedit.math.rectsIntersect(P, {
                  x: W.x,
                  y: W.y,
                  width: 0,
                  height: 0
                });
                this.select(P);
                P && svgedit.path.path.selected_pts.push(this.index)
              }
            })
          }
        },
        mouseUp: function (o, h) {
          if (sa === "path") {
            d = null;
            if (!i) {
              h = va(db());
              xa = false;
              m = null
            }
            return {
              keep: true,
              element: h
            }
          }
          if (svgedit.path.path.dragging) {
            var q = svgedit.path.path.cur_pt;
            svgedit.path.path.dragging = false;
            svgedit.path.path.dragctrl = false;
            svgedit.path.path.update();
            z && svgedit.path.path.endChanges("Move path point(s)");
            !o.shiftKey && !z && svgedit.path.path.selectPt(q)
          } else if (wa && wa.getAttribute("display") != "none") {
            wa.setAttribute("display", "none");
            wa.getAttribute("width") <= 2 && wa.getAttribute("height") <= 2 && qa.toSelectMode(o.target)
          } else qa.toSelectMode(o.target);
          z = false
        },
        toEditMode: function (o) {
          svgedit.path.path = svgedit.path.getPath_(o);
          sa = "pathedit";
          za();
          svgedit.path.path.show(true).update();
          svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
          b = false
        },
        toSelectMode: function (o) {
          var h = o == svgedit.path.path.elem;
          sa = "select";
          svgedit.path.path.show(false);
          c = false;
          za();
          svgedit.path.path.matrix && svgedit.path.recalcRotatedPath();
          if (h) {
            ha("selected", [o]);
            gb([o], true)
          }
        },
        addSubPath: function (o) {
          if (o) {
            sa = "path";
            b = true
          } else {
            qa.clear(true);
            qa.toEditMode(svgedit.path.path.elem)
          }
        },
        select: function (o) {
          if (c === o) {
            qa.toEditMode(o);
            sa = "pathedit"
          } else c = o
        },
        reorient: function () {
          var o = L[0];
          if (o) if (bb(o) != 0) {
            var h = new ua("Reorient path"),
              q = {
                d: o.getAttribute("d"),
                transform: o.getAttribute("transform")
              };
            h.addSubCommand(new Ia(o, q));
            za();
            this.resetOrientation(o);
            ma(h);
            svgedit.path.getPath_(o).show(false).matrix = null;
            this.clear();
            gb([o], true);
            ha("changed", L)
          }
        },
        clear: function () {
          c = null;
          if (i) {
            var o = va(db());
            $(va("path_stretch_line")).remove();
            $(o).remove();
            $(va("pathpointgrip_container")).find("*").attr("display", "none");
            i = m = null;
            xa = false
          } else sa == "pathedit" && this.toSelectMode();
          svgedit.path.path && svgedit.path.path.init().show(false)
        },
        resetOrientation: function (o) {
          if (o == null || o.nodeName != "path") return false;
          var h = ca(o),
            q = da(h).matrix;
          h.clear();
          o.removeAttribute("transform");
          h = o.pathSegList;
          for (var w = h.numberOfItems, u = 0; u < w; ++u) {
            var t = h.getItem(u),
              C = t.pathSegType;
            if (C != 1) {
              var E = [];
              $.each(["", 1, 2], function (H, I) {
                var P = t["x" + I],
                  W = t["y" + I];
                if (P !== undefined && W !== undefined) {
                  P = oa(P, W, q);
                  E.splice(E.length, 0, P.x, P.y)
                }
              });
              svgedit.path.replacePathSeg(C,
              u, E, o)
            }
          }
          l(o, q)
        },
        zoomChange: function () {
          sa == "pathedit" && svgedit.path.path.update()
        },
        getNodePoint: function () {
          var o = svgedit.path.path.segs[svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1];
          return {
            x: o.item.x,
            y: o.item.y,
            type: o.type
          }
        },
        linkControlPoints: function (o) {
          svgedit.path.setLinkControlPoints(o)
        },
        clonePathNode: function () {
          svgedit.path.path.storeD();
          for (var o = svgedit.path.path.selected_pts, h = o.length, q = []; h--;) {
            var w = o[h];
            svgedit.path.path.addSeg(w);
            q.push(w + h);
            q.push(w + h + 1)
          }
          svgedit.path.path.init().addPtsToSelection(q);
          svgedit.path.path.endChanges("Clone path node(s)")
        },
        opencloseSubPath: function () {
          var o = svgedit.path.path.selected_pts;
          if (o.length === 1) {
            var h = svgedit.path.path.elem,
              q = h.pathSegList,
              w = o[0],
              u = null,
              t = null;
            svgedit.path.path.eachSeg(function (I) {
              if (this.type === 2 && I <= w) t = this.item;
              if (I <= w) return true;
              if (this.type === 2) {
                u = I;
                return false
              } else if (this.type === 1) return u = false
            });
            if (u == null) u = svgedit.path.path.segs.length - 1;
            if (u !== false) {
              var C = h.createSVGPathSegLinetoAbs(t.x, t.y),
                E = h.createSVGPathSegClosePath();
              if (u == svgedit.path.path.segs.length - 1) {
                q.appendItem(C);
                q.appendItem(E)
              } else {
                svgedit.path.insertItemBefore(h, E, u);
                svgedit.path.insertItemBefore(h, C, u)
              }
              svgedit.path.path.init().selectPt(u + 1)
            } else if (svgedit.path.path.segs[w].mate) {
              q.removeItem(w);
              q.removeItem(w);
              svgedit.path.path.init().selectPt(w - 1)
            } else {
              for (o = 0; o < q.numberOfItems; o++) {
                var H = q.getItem(o);
                if (H.pathSegType === 2) C = o;
                else if (o === w) q.removeItem(C);
                else if (H.pathSegType === 1 && w < o) {
                  E = o - 1;
                  q.removeItem(o);
                  break
                }
              }
              for (o = w - C - 1; o--;) svgedit.path.insertItemBefore(h,
              q.getItem(C), E);
              h = q.getItem(C);
              svgedit.path.replacePathSeg(2, C, [h.x, h.y]);
              o = w;
              svgedit.path.path.init().selectPt(0)
            }
          }
        },
        deletePathNode: function () {
          if (qa.canDeleteNodes) {
            svgedit.path.path.storeD();
            for (var o = svgedit.path.path.selected_pts, h = o.length; h--;) svgedit.path.path.deleteSeg(o[h]);
            var q = function () {
              var w = svgedit.path.path.elem.pathSegList,
                u = w.numberOfItems,
                t = function (H, I) {
                  for (; I--;) w.removeItem(H)
                };
              if (u <= 1) return true;
              for (; u--;) {
                var C = w.getItem(u);
                if (C.pathSegType === 1) {
                  C = w.getItem(u - 1);
                  var E = w.getItem(u - 2);
                  if (C.pathSegType === 2) {
                    t(u - 1, 2);
                    q();
                    break
                  } else if (E.pathSegType === 2) {
                    t(u - 2, 3);
                    q();
                    break
                  }
                } else if (C.pathSegType === 2) if (u > 0) {
                  C = w.getItem(u - 1).pathSegType;
                  if (C === 2) {
                    t(u - 1, 1);
                    q();
                    break
                  } else if (C === 1 && w.numberOfItems - 1 === u) {
                    t(u, 1);
                    q();
                    break
                  }
                }
              }
              return false
            };
            q();
            if (svgedit.path.path.elem.pathSegList.numberOfItems <= 1) {
              qa.toSelectMode(svgedit.path.path.elem);
              e.deleteSelectedElements()
            } else {
              svgedit.path.path.init();
              svgedit.path.path.clearSelection();
              if (window.opera) {
                o = $(svgedit.path.path.elem);
                o.attr("d",
                o.attr("d"))
              }
              svgedit.path.path.endChanges("Delete path node(s)")
            }
          }
        },
        smoothPolylineIntoPath: function (o) {
          var h = o.points,
            q = h.numberOfItems;
          if (q >= 4) {
            var w = h.getItem(0),
              u = null;
            o = [];
            o.push(["M", w.x, ",", w.y, " C"].join(""));
            for (var t = 1; t <= q - 4; t += 3) {
              var C = h.getItem(t),
                E = h.getItem(t + 1),
                H = h.getItem(t + 2);
              if (u) if ((w = svgedit.path.smoothControlPoints(u, C, w)) && w.length == 2) {
                C = o[o.length - 1].split(",");
                C[2] = w[0].x;
                C[3] = w[0].y;
                o[o.length - 1] = C.join(",");
                C = w[1]
              }
              o.push([C.x, C.y, E.x, E.y, H.x, H.y].join(","));
              w = H;
              u = E
            }
            for (o.push("L"); t < q; ++t) {
              E = h.getItem(t);
              o.push([E.x, E.y].join(","))
            }
            o = o.join(" ");
            o = na({
              element: "path",
              curStyles: true,
              attr: {
                id: db(),
                d: o,
                fill: "none"
              }
            })
          }
          return o
        },
        setSegType: function (o) {
          svgedit.path.path.setSegType(o)
        },
        moveNode: function (o, h) {
          var q = svgedit.path.path.selected_pts;
          if (q.length) {
            svgedit.path.path.storeD();
            q = svgedit.path.path.segs[q[0]];
            var w = {
              x: 0,
              y: 0
            };
            w[o] = h - q.item[o];
            q.move(w.x, w.y);
            svgedit.path.path.endChanges("Move path point")
          }
        },
        fixEnd: function (o) {
          for (var h = o.pathSegList, q = h.numberOfItems, w, u = 0; u < q; ++u) {
            var t = h.getItem(u);
            if (t.pathSegType === 2) w = t;
            if (t.pathSegType === 1) {
              t = h.getItem(u - 1);
              if (t.x != w.x || t.y != w.y) {
                h = o.createSVGPathSegLinetoAbs(w.x, w.y);
                svgedit.path.insertItemBefore(o, h, u);
                qa.fixEnd(o);
                break
              }
            }
          }
          svgedit.browser.isWebkit() && o.setAttribute("d", qa.convertPath(o))
        },
        convertPath: function (o, h) {
          for (var q = o.pathSegList, w = q.numberOfItems, u = 0, t = 0, C = "", E = null, H = 0; H < w; ++H) {
            var I = q.getItem(H),
              P = I.x || 0,
              W = I.y || 0,
              Y = I.x1 || 0,
              R = I.y1 || 0,
              T = I.x2 || 0,
              V = I.y2 || 0,
              aa = I.pathSegType,
              Ja = Xb[aa]["to" + (h ? "Lower" : "Upper") + "Case"](),
              Za = function (mb, eb, fb) {
                eb = eb ? " " + eb.join(" ") : "";
                fb = fb ? " " + svgedit.units.shortFloat(fb) : "";
                $.each(mb, function (ec, wb) {
                  mb[ec] = svgedit.units.shortFloat(wb)
                });
                C += Ja + mb.join(" ") + eb + fb
              };
            switch (aa) {
              case 1:
                C += "z";
                break;
              case 12:
                P -= u;
              case 13:
                if (h) {
                  u += P;
                  Ja = "l"
                } else {
                  P += u;
                  u = P;
                  Ja = "L"
                }
                Za([
                  [P, t]
                ]);
                break;
              case 14:
                W -= t;
              case 15:
                if (h) {
                  t += W;
                  Ja = "l"
                } else {
                  W += t;
                  t = W;
                  Ja = "L"
                }
                Za([
                  [u, W]
                ]);
                break;
              case 2:
              case 4:
              case 18:
                P -= u;
                W -= t;
              case 5:
              case 3:
                if (E && q.getItem(H - 1).pathSegType === 1 && !h) {
                  u = E[0];
                  t = E[1]
                }
              case 19:
                if (h) {
                  u += P;
                  t += W
                } else {
                  P += u;
                  W += t;
                  u = P;
                  t = W
                }
                if (aa === 3) E = [u, t];
                Za([
                  [P, W]
                ]);
                break;
              case 6:
                P -= u;
                Y -= u;
                T -= u;
                W -= t;
                R -= t;
                V -= t;
              case 7:
                if (h) {
                  u += P;
                  t += W
                } else {
                  P += u;
                  Y += u;
                  T += u;
                  W += t;
                  R += t;
                  V += t;
                  u = P;
                  t = W
                }
                Za([
                  [Y, R],
                  [T, V],
                  [P, W]
                ]);
                break;
              case 8:
                P -= u;
                Y -= u;
                W -= t;
                R -= t;
              case 9:
                if (h) {
                  u += P;
                  t += W
                } else {
                  P += u;
                  Y += u;
                  W += t;
                  R += t;
                  u = P;
                  t = W
                }
                Za([
                  [Y, R],
                  [P, W]
                ]);
                break;
              case 10:
                P -= u;
                W -= t;
              case 11:
                if (h) {
                  u += P;
                  t += W
                } else {
                  P += u;
                  W += t;
                  u = P;
                  t = W
                }
                Za([
                  [I.r1, I.r2]
                ], [I.angle, I.largeArcFlag ? 1 : 0, I.sweepFlag ? 1 : 0], [P, W]);
                break;
              case 16:
                P -= u;
                T -= u;
                W -= t;
                V -= t;
              case 17:
                if (h) {
                  u += P;
                  t += W
                } else {
                  P += u;
                  T += u;
                  W += t;
                  V += t;
                  u = P;
                  t = W
                }
                Za([
                  [T, V],
                  [P, W]
                ])
            }
          }
          return C
        }
      }
    }(),
    fc = this.removeUnusedDefElems = function () {
      var b = n.getElementsByTagNameNS(s, "defs");
      if (!b || !b.length) return 0;
      for (var c = [], d = 0, m = ["fill", "stroke", "filter", "marker-start", "marker-mid", "marker-end"], i = m.length, z = n.getElementsByTagNameNS(s, "*"), o = z.length, h = 0; h < o; h++) {
        for (var q = z[h], w = 0; w < i; w++) {
          var u = sb(q.getAttribute(m[w]));
          u && c.push(u.substr(1))
        }(q = ib(q)) && q.indexOf("#") === 0 && c.push(q.substr(1))
      }
      b = $(b).find("linearGradient, radialGradient, filter, marker, svg, symbol");
      defelem_ids = [];
      for (h = b.length; h--;) {
        m = b[h];
        i = m.id;
        if (c.indexOf(i) < 0) {
          Ub[i] = m;
          m.parentNode.removeChild(m);
          d++
        }
      }
      return d
    };
  this.svgCanvasToString = function () {
    for (; fc() > 0;);
    qa.clear(true);
    $.each(n.childNodes, function (d, m) {
      d && m.nodeType === 8 && m.data.indexOf("Created with") >= 0 && n.insertBefore(m, n.firstChild)
    });
    if (O) {
      Qb();
      Wa([O])
    }
    var b = [];
    $(n).find("g:data(gsvg)").each(function () {
      for (var d = this.attributes, m = d.length, i = 0; i < m; i++) if (d[i].nodeName == "id" || d[i].nodeName == "style") m--;
      if (m <= 0) {
        d = this.firstChild;
        b.push(d);
        $(this).replaceWith(d)
      }
    });
    var c = this.svgToString(n, 0);
    b.length && $(b).each(function () {
      cc(this)
    });
    return c
  };
  this.svgToString = function (b, c) {
    var d = [],
      m = svgedit.utilities.toXml,
      i = v.baseUnit,
      z = RegExp("^-?[\\d\\.]+" + i + "$");
    if (b) {
      Oa(b);
      var o = b.attributes,
        h, q, w = b.childNodes;
      for (q = 0; q < c; q++) d.push(" ");
      d.push("<");
      d.push(b.nodeName);
      if (b.id === "svgcontent") {
        q = xb();
        if (i !== "px") {
          q.w = svgedit.units.convertUnit(q.w, i) + i;
          q.h = svgedit.units.convertUnit(q.h, i) + i
        }
        d.push(' width="' + q.w + '" height="' + q.h + '" xmlns="' + s + '"');
        var u = {};
        $(b).find("*").andSelf().each(function () {
          $.each(this.attributes, function (H, I) {
            var P = I.namespaceURI;
            if (P && !u[P] && hb[P] !== "xmlns" && hb[P] !== "xml") {
              u[P] = true;
              d.push(" xmlns:" + hb[P] + '="' + P + '"')
            }
          })
        });
        q = o.length;
        for (i = ["width", "height", "xmlns", "x", "y", "viewBox", "id", "overflow"]; q--;) {
          h = o.item(q);
          var t = m(h.nodeValue);
          if (h.nodeName.indexOf("xmlns:") !== 0) if (t != "" && i.indexOf(h.localName) == -1) if (!h.namespaceURI || hb[h.namespaceURI]) {
            d.push(" ");
            d.push(h.nodeName);
            d.push('="');
            d.push(t);
            d.push('"')
          }
        }
      } else {
        if (b.nodeName ===
          "defs" && !b.firstChild) return;
        var C = ["-moz-math-font-style", "_moz-math-font-style"];
        for (q = o.length - 1; q >= 0; q--) {
          h = o.item(q);
          t = m(h.nodeValue);
          if (!(C.indexOf(h.localName) >= 0)) if (t != "") if (t.indexOf("pointer-events") !== 0) if (!(h.localName === "class" && t.indexOf("se_") === 0)) {
            d.push(" ");
            if (h.localName === "d") t = qa.convertPath(b, true);
            if (isNaN(t)) {
              if (z.test(t)) t = svgedit.units.shortFloat(t) + i
            } else t = svgedit.units.shortFloat(t);
            if (Na.apply && b.nodeName === "image" && h.localName === "href" && Na.images && Na.images === "embed") {
              var E = Jb[t];
              if (E) t = E
            }
            if (!h.namespaceURI || h.namespaceURI == s || hb[h.namespaceURI]) {
              d.push(h.nodeName);
              d.push('="');
              d.push(t);
              d.push('"')
            }
          }
        }
      }
      if (b.hasChildNodes()) {
        d.push(">");
        c++;
        o = false;
        for (q = 0; q < w.length; q++) {
          i = w.item(q);
          switch (i.nodeType) {
            case 1:
              d.push("\n");
              d.push(this.svgToString(w.item(q), c));
              break;
            case 3:
              i = i.nodeValue.replace(/^\s+|\s+$/g, "");
              if (i != "") {
                o = true;
                d.push(m(i) + "")
              }
              break;
            case 4:
              d.push("\n");
              d.push(Array(c + 1).join(" "));
              d.push("<![CDATA[");
              d.push(i.nodeValue);
              d.push("]]\>");
              break;
            case 8:
              d.push("\n");
              d.push(Array(c + 1).join(" "));
              d.push("<!--");
              d.push(i.data);
              d.push("--\>")
          }
        }
        c--;
        if (!o) {
          d.push("\n");
          for (q = 0; q < c; q++) d.push(" ")
        }
        d.push("</");
        d.push(b.nodeName);
        d.push(">")
      } else d.push("/>")
    }
    return d.join("")
  };
  this.embedImage = function (b, c) {
    $(new Image).load(function () {
      var d = document.createElement("canvas");
      d.width = this.width;
      d.height = this.height;
      d.getContext("2d").drawImage(this, 0, 0);
      try {
        var m = ";svgedit_url=" + encodeURIComponent(b);
        m = d.toDataURL().replace(";base64", m + ";base64");
        Jb[b] = m
      } catch (i) {
        Jb[b] = false
      }
      Bb = b;
      c && c(Jb[b])
    }).attr("src", b)
  };
  this.setGoodImage = function (b) {
    Bb = b
  };
  this.open = function () {};
  this.save = function (b) {
    za();
    b && $.extend(Na, b);
    Na.apply = true;
    b = this.svgCanvasToString();
    ha("saved", b)
  };
  this.rasterExport = function () {
    za();
    var b = [],
      c = {
        feGaussianBlur: ub.exportNoBlur,
        foreignObject: ub.exportNoforeignObject,
        "[stroke-dasharray]": ub.exportNoDashArray
      }, d = $(n);
    if (!("font" in $("<canvas>")[0].getContext("2d"))) c.text = ub.exportNoText;
    $.each(c, function (m, i) {
      d.find(m).length && b.push(i)
    });
    c = this.svgCanvasToString();
    ha("exported", {
      svg: c,
      issues: b
    })
  };
  this.getSvgString = function () {
    Na.apply = false;
    return this.svgCanvasToString()
  };
  this.randomizeIds = function () {
    arguments.length > 0 && arguments[0] == false ? svgedit.draw.randomizeIds(false, B()) : svgedit.draw.randomizeIds(true, B())
  };
  var Rb = this.uniquifyElems = function (b) {
    var c = {}, d = ["filter", "linearGradient", "pattern", "radialGradient", "symbol", "textPath", "use"];
    svgedit.utilities.walkTree(b, function (h) {
      if (h.nodeType == 1) {
        if (h.id) {
          h.id in c || (c[h.id] = {
            elem: null,
            attrs: [],
            hrefs: []
          });
          c[h.id].elem = h
        }
        $.each(Hb, function (w, u) {
          var t = h.getAttributeNode(u);
          if (t) {
            var C = svgedit.utilities.getUrlFromAttr(t.value);
            if (C = C ? C.substr(1) : null) {
              C in c || (c[C] = {
                elem: null,
                attrs: [],
                hrefs: []
              });
              c[C].attrs.push(t)
            }
          }
        });
        var q = svgedit.utilities.getHref(h);
        if (q && d.indexOf(h.nodeName) >= 0) if (q = q.substr(1)) {
          q in c || (c[q] = {
            elem: null,
            attrs: [],
            hrefs: []
          });
          c[q].hrefs.push(h)
        }
      }
    });
    for (var m in c) if (m) {
      var i = c[m].elem;
      if (i) {
        b = Fa();
        i.id = b;
        i = c[m].attrs;
        for (var z = i.length; z--;) {
          var o = i[z];
          o.ownerElement.setAttribute(o.name,
            "url(#" + b + ")")
        }
        i = c[m].hrefs;
        for (z = i.length; z--;) svgedit.utilities.setHref(i[z], "#" + b)
      }
    }
  }, Gb = this.setUseData = function (b) {
    var c = $(b);
    if (b.tagName !== "use") c = c.find("use");
    c.each(function () {
      var d = ib(this).substr(1);
      if (d = va(d)) {
        $(this).data("ref", d);
        if (d.tagName == "symbol" || d.tagName == "svg") $(this).data("symbol", d).data("ref", d)
      }
    })
  }, yb = this.convertGradients = function (b) {
    var c = $(b).find("linearGradient, radialGradient");
    if (!c.length && svgedit.browser.isWebkit()) c = $(b).find("*").filter(function () {
      return this.tagName.indexOf("Gradient") >= 0
    });
    c.each(function () {
      if ($(this).attr("gradientUnits") === "userSpaceOnUse") {
        var d = $(n).find('[fill="url(#' + this.id + ')"],[stroke="url(#' + this.id + ')"]');
        if (d.length) if (d = svgedit.utilities.getBBox(d[0])) if (this.tagName === "linearGradient") {
          var m = $(this).attr(["x1", "y1", "x2", "y2"]),
            i = this.gradientTransform.baseVal;
          if (i && i.numberOfItems > 0) {
            var z = da(i).matrix;
            i = oa(m.x1, m.y1, z);
            z = oa(m.x2, m.y2, z);
            m.x1 = i.x;
            m.y1 = i.y;
            m.x2 = z.x;
            m.y2 = z.y;
            this.removeAttribute("gradientTransform")
          }
          $(this).attr({
            x1: (m.x1 - d.x) / d.width,
            y1: (m.y1 - d.y) / d.height,
            x2: (m.x2 - d.x) / d.width,
            y2: (m.y2 - d.y) / d.height
          });
          this.removeAttribute("gradientUnits")
        }
      }
    })
  }, gc = this.convertToGroup = function (b) {
    b || (b = L[0]);
    var c = $(b),
      d = new ua,
      m;
    if (c.data("gsvg")) {
      d = $(b.firstChild).attr(["x", "y"]);
      $(b.firstChild.firstChild).unwrap();
      $(b).removeData("gsvg");
      m = ca(b);
      var i = k.createSVGTransform();
      i.setTranslate(d.x, d.y);
      m.appendItem(i);
      Ta(b);
      ha("selected", [b])
    } else if (c.data("symbol")) {
      b = c.data("symbol");
      m = c.attr("transform");
      i = c.attr(["x", "y"]);
      var z = b.getAttribute("viewBox");
      if (z) {
        z = z.split(" ");
        i.x -= +z[0];
        i.y -= +z[1]
      }
      m += " translate(" + (i.x || 0) + "," + (i.y || 0) + ")";
      i = c.prev();
      d.addSubCommand(new Pa(c[0], c[0].nextSibling, c[0].parentNode));
      c.remove();
      z = $(n).find("use:data(symbol)").length;
      c = f.createElementNS(s, "g");
      for (var o = b.childNodes, h = 0; h < o.length; h++) c.appendChild(o[h].cloneNode(true));
      if (svgedit.browser.isGecko()) {
        o = $(Xa()).children("linearGradient,radialGradient,pattern").clone();
        $(c).append(o)
      }
      m && c.setAttribute("transform", m);
      m = b.parentNode;
      Rb(c);
      svgedit.browser.isGecko() && $(Xa()).append($(c).find("linearGradient,radialGradient,pattern"));
      c.id = Fa();
      i.after(c);
      if (m) {
        if (!z) {
          i = b.nextSibling;
          m.removeChild(b);
          d.addSubCommand(new Pa(b, i, m))
        }
        d.addSubCommand(new Ha(c))
      }
      Gb(c);
      svgedit.browser.isGecko() ? yb(Xa()) : yb(c);
      svgedit.utilities.walkTreePost(c, function (q) {
        try {
          Ta(q)
        } catch (w) {
          console.log(w)
        }
      });
      $(c).find("a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use").each(function () {
        if (!this.id) this.id = Fa()
      });
      Wa([c]);
      (b = Yb(c, true)) && d.addSubCommand(b);
      ma(d)
    } else console.log("Unexpected element to ungroup:", b)
  };
  this.setSvgString = function (b) {
    try {
      var c = svgedit.utilities.text2xml(b);
      this.prepareSvg(c);
      var d = new ua("Change Source"),
        m = n.nextSibling,
        i = k.removeChild(n);
      d.addSubCommand(new Pa(i, m, k));
      n = f.adoptNode ? f.adoptNode(c.documentElement) : f.importNode(c.documentElement, true);
      k.appendChild(n);
      var z = $(n);
      e.current_drawing_ = new svgedit.draw.Drawing(n, F);
      var o = B().getNonce();
      o ? ha("setnonce", o) : ha("unsetnonce");
      z.find("image").each(function () {
        var E = this;
        Mb(E);
        var H = ib(this);
        if (H.indexOf("data:") === 0) {
          var I = H.match(/svgedit_url=(.*?);/);
          if (I) {
            var P = decodeURIComponent(I[1]);
            $(new Image).load(function () {
              E.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", P)
            }).attr("src", P)
          }
        }
        e.embedImage(H)
      });
      z.find("svg").each(function () {
        if (!$(this).closest("defs").length) {
          Rb(this);
          var E = this.parentNode;
          if (E.childNodes.length === 1 && E.nodeName === "g") {
            $(E).data("gsvg", this);
            E.id = E.id || Fa()
          } else cc(this)
        }
      });
      svgedit.browser.isGecko() && z.find("linearGradient, radialGradient, pattern").appendTo(Xa());
      Gb(z);
      yb(z[0]);
      svgedit.utilities.walkTreePost(n, function (E) {
        try {
          Ta(E)
        } catch (H) {
          console.log(H)
        }
      });
      var h = {
        id: "svgcontent",
        overflow: v.show_outside_canvas ? "visible" : "hidden"
      }, q = false;
      if (z.attr("viewBox")) {
        var w = z.attr("viewBox").split(" ");
        h.width = w[2];
        h.height = w[3]
      } else $.each(["width", "height"], function (E, H) {
        var I = z.attr(H);
        I || (I = "100%");
        if ((I + "").substr(-1) === "%") q = true;
        else h[H] = ba(H, I)
      });
      zb();
      z.children().find("a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use").each(function () {
        if (!this.id) this.id = Fa()
      });
      if (q) {
        var u = getStrokedBBox();
        h.width = u.width + u.x;
        h.height = u.height + u.y
      }
      if (h.width <= 0) h.width = 100;
      if (h.height <= 0) h.height = 100;
      z.attr(h);
      this.contentW = h.width;
      this.contentH = h.height;
      d.addSubCommand(new Ha(n));
      var t = z.attr(["width", "height"]);
      d.addSubCommand(new Ia(k, t));
      A = 1;
      svgedit.transformlist.resetListMap();
      za();
      svgedit.path.clearData();
      k.appendChild(ra.selectorParentGroup);
      ma(d);
      ha("changed", [n])
    } catch (C) {
      console.log(C);
      return false
    }
    return true
  };
  this.importSvgString = function (b) {
    try {
      var c = svgedit.utilities.encode64(b.length + b).substr(0, 32),
        d = false;
      if (pb[c]) if ($(pb[c].symbol).parents("#svgroot").length) d = true;
      var m = new ua("Import SVG");
      if (d) var i = pb[c].symbol,
        z = pb[c].xform;
      else {
        var o = svgedit.utilities.text2xml(b);
        this.prepareSvg(o);
        var h;
        h = f.adoptNode ? f.adoptNode(o.documentElement) : f.importNode(o.documentElement, true);
        Rb(h);
        var q = ba("width", h.getAttribute("width")),
          w = ba("height", h.getAttribute("height")),
          u = h.getAttribute("viewBox"),
          t = u ? u.split(" ") : [0, 0, q, w];
        for (b = 0; b < 4; ++b) t[b] = +t[b];
        n.getAttribute("width");
        var C = +n.getAttribute("height");
        z = w > q ? "scale(" + C / 3 / t[3] + ")" : "scale(" + C / 3 / t[2] + ")";
        z = "translate(0) " + z + " translate(0)";
        i = f.createElementNS(s, "symbol");
        var E = Xa();
        for (svgedit.browser.isGecko() && $(h).find("linearGradient, radialGradient, pattern").appendTo(E); h.firstChild;) i.appendChild(h.firstChild);
        var H = h.attributes;
        for (h = 0; h < H.length; h++) {
          var I = H[h];
          i.setAttribute(I.nodeName, I.nodeValue)
        }
        i.id = Fa();
        pb[c] = {
          symbol: i,
          xform: z
        };
        Xa().appendChild(i);
        m.addSubCommand(new Ha(i))
      }
      var P = f.createElementNS(s, "use");
      P.id = Fa();
      lb(P, "#" + i.id);
      (O || B().getCurrentLayer()).appendChild(P);
      m.addSubCommand(new Ha(P));
      za();
      P.setAttribute("transform", z);
      Ta(P);
      $(P).data("symbol", i).data("ref", i);
      gb([P]);
      ma(m);
      ha("changed", [n])
    } catch (W) {
      console.log(W);
      return false
    }
    return true
  };
  var zb = e.identifyLayers = function () {
    Qb();
    B().identifyLayers()
  };
  this.createLayer = function (b) {
    var c = new ua("Create Layer");
    b = B().createLayer(b);
    c.addSubCommand(new Ha(b));
    ma(c);
    za();
    ha("changed", [b])
  };
  this.cloneLayer = function (b) {
    var c = new ua("Duplicate Layer"),
      d = f.createElementNS(s, "g"),
      m = f.createElementNS(s, "title");
    m.textContent = b;
    d.appendChild(m);
    m = B().getCurrentLayer();
    $(m).after(d);
    m = m.childNodes;
    for (var i = 0; i < m.length; i++) {
      var z = m[i];
      z.localName != "title" && d.appendChild(vb(z))
    }
    za();
    zb();
    c.addSubCommand(new Ha(d));
    ma(c);
    e.setCurrentLayer(b);
    ha("changed", [d])
  };
  this.deleteCurrentLayer = function () {
    var b = B().getCurrentLayer(),
      c = b.nextSibling,
      d = b.parentNode;
    if (b = B().deleteCurrentLayer()) {
      var m = new ua("Delete Layer");
      m.addSubCommand(new Pa(b,
      c, d));
      ma(m);
      za();
      ha("changed", [d]);
      return true
    }
    return false
  };
  this.setCurrentLayer = function (b) {
    (b = B().setCurrentLayer(svgedit.utilities.toXml(b))) && za();
    return b
  };
  this.renameCurrentLayer = function (b) {
    var c = B();
    if (c.current_layer) {
      var d = c.current_layer;
      if (!e.setCurrentLayer(b)) {
        for (var m = new ua("Rename Layer"), i = 0; i < c.getNumLayers(); ++i) if (c.all_layers[i][1] == d) break;
        var z = c.getLayerName(i);
        c.all_layers[i][0] = svgedit.utilities.toXml(b);
        var o = d.childNodes.length;
        for (i = 0; i < o; ++i) {
          var h = d.childNodes.item(i);
          if (h && h.tagName == "title") {
            for (; h.firstChild;) h.removeChild(h.firstChild);
            h.textContent = b;
            m.addSubCommand(new Ia(h, {
              "#text": z
            }));
            ma(m);
            ha("changed", [d]);
            return true
          }
        }
      }
      c.current_layer = d
    }
    return false
  };
  this.setCurrentLayerPosition = function (b) {
    var c = B();
    if (c.current_layer && b >= 0 && b < c.getNumLayers()) {
      for (var d = 0; d < c.getNumLayers(); ++d) if (c.all_layers[d][1] == c.current_layer) break;
      if (d == c.getNumLayers()) return false;
      if (d != b) {
        var m = null,
          i = c.current_layer.nextSibling;
        if (b > d) {
          if (b < c.getNumLayers() - 1) m = c.all_layers[b + 1][1]
        } else m = c.all_layers[b][1];
        n.insertBefore(c.current_layer, m);
        ma(new Ca(c.current_layer, i, n));
        zb();
        e.setCurrentLayer(c.getLayerName(b));
        return true
      }
    }
    return false
  };
  this.setLayerVisibility = function (b, c) {
    var d = B(),
      m = d.getLayerVisibility(b),
      i = d.setLayerVisibility(b, c);
    if (i) ma(new Ia(i, {
      display: m ? "inline" : "none"
    }, "Layer Visibility"));
    else return false;
    if (i == d.getCurrentLayer()) {
      za();
      qa.clear()
    }
    return true
  };
  this.moveSelectedToLayer = function (b) {
    for (var c = null, d = B(), m = 0; m < d.getNumLayers(); ++m) if (d.getLayerName(m) == b) {
      c = d.all_layers[m][1];
      break
    }
    if (!c) return false;
    b = new ua("Move Elements to Layer");
    d = L;
    for (m = d.length; m--;) {
      var i = d[m];
      if (i) {
        var z = i.nextSibling,
          o = i.parentNode;
        c.appendChild(i);
        b.addSubCommand(new Ca(i, z, o))
      }
    }
    ma(b);
    return true
  };
  this.mergeLayer = function (b) {
    var c = new ua("Merge Layer"),
      d = B(),
      m = $(d.current_layer).prev()[0];
    if (m) {
      for (c.addSubCommand(new Pa(d.current_layer, d.current_layer.nextSibling, n)); d.current_layer.firstChild;) {
        var i = d.current_layer.firstChild;
        if (i.localName == "title") {
          c.addSubCommand(new Pa(i,
          i.nextSibling, d.current_layer));
          d.current_layer.removeChild(i)
        } else {
          var z = i.nextSibling;
          m.appendChild(i);
          c.addSubCommand(new Ca(i, z, d.current_layer))
        }
      }
      n.removeChild(d.current_layer);
      if (!b) {
        za();
        zb();
        ha("changed", [n]);
        ma(c)
      }
      d.current_layer = m;
      return c
    }
  };
  this.mergeAllLayers = function () {
    var b = new ua("Merge all Layers"),
      c = B();
    for (c.current_layer = c.all_layers[c.getNumLayers() - 1][1]; $(n).children("g").length > 1;) b.addSubCommand(e.mergeLayer(true));
    za();
    zb();
    ha("changed", [n]);
    ma(b)
  };
  var Qb = this.leaveContext = function () {
    var b = Kb.length;
    if (b) {
      for (var c = 0; c < b; c++) {
        var d = Kb[c],
          m = Ab(d, "orig_opac");
        m !== 1 ? d.setAttribute("opacity", m) : d.removeAttribute("opacity");
        d.setAttribute("style", "pointer-events: inherit")
      }
      Kb = [];
      za(true);
      ha("contextset", null)
    }
    O = null
  }, lc = this.setContext = function (b) {
    Qb();
    if (typeof b === "string") b = va(b);
    O = b;
    $(b).parentsUntil("#svgcontent").andSelf().siblings().each(function () {
      var c = this.getAttribute("opacity") || 1;
      Ab(this, "orig_opac", c);
      this.setAttribute("opacity", c * 0.33);
      this.setAttribute("style",
        "pointer-events: none");
      Kb.push(this)
    });
    za();
    ha("contextset", O)
  };
  this.clear = function () {
    qa.clear();
    za();
    e.clearSvgContentElement();
    e.current_drawing_ = new svgedit.draw.Drawing(n);
    e.createLayer("Layer 1");
    e.undoMgr.resetUndoStack();
    ra.initGroup();
    wa = ra.getRubberBandBox();
    ha("cleared")
  };
  this.linkControlPoints = qa.linkControlPoints;
  this.getContentElem = function () {
    return n
  };
  this.getRootElem = function () {
    return k
  };
  this.getSelectedElems = function () {
    return L
  };
  var xb = this.getResolution = function () {
    var b = n.getAttribute("width") / A,
      c = n.getAttribute("height") / A;
    return {
      w: b,
      h: c,
      zoom: A
    }
  };
  this.getZoom = function () {
    return A
  };
  this.getVersion = function () {
    return "svgcanvas.js ($Rev: 2199 $)"
  };
  this.setUiStrings = function (b) {
    $.extend(ub, b.notification)
  };
  this.setConfig = function (b) {
    $.extend(v, b)
  };
  this.getTitle = function (b) {
    if (b = b || L[0]) {
      b = $(b).data("gsvg") || $(b).data("symbol") || b;
      b = b.childNodes;
      for (var c = 0; c < b.length; c++) if (b[c].nodeName == "title") return b[c].textContent;
      return ""
    }
  };
  this.setGroupTitle = function (b) {
    var c = L[0];
    c = $(c).data("gsvg") || c;
    var d = $(c).children("title"),
      m = new ua("Set Label");
    if (b.length) if (d.length) {
      d = d[0];
      m.addSubCommand(new Ia(d, {
        "#text": d.textContent
      }));
      d.textContent = b
    } else {
      d = f.createElementNS(s, "title");
      d.textContent = b;
      $(c).prepend(d);
      m.addSubCommand(new Ha(d))
    } else {
      m.addSubCommand(new Pa(d[0], d.nextSibling, c));
      d.remove()
    }
    ma(m)
  };
  this.getDocumentTitle = function () {
    return e.getTitle(n)
  };
  this.setDocumentTitle = function (b) {
    for (var c = n.childNodes, d = false, m = "", i = new ua("Change Image Title"), z = 0; z < c.length; z++) if (c[z].nodeName ==
      "title") {
      d = c[z];
      m = d.textContent;
      break
    }
    if (!d) {
      d = f.createElementNS(s, "title");
      n.insertBefore(d, n.firstChild)
    }
    if (b.length) d.textContent = b;
    else d.parentNode.removeChild(d);
    i.addSubCommand(new Ia(d, {
      "#text": m
    }));
    ma(i)
  };
  this.getEditorNS = function (b) {
    b && n.setAttribute("xmlns:se", "http://svg-edit.googlecode.com");
    return "http://svg-edit.googlecode.com"
  };
  this.setResolution = function (b, c) {
    var d = xb(),
      m = d.w;
    d = d.h;
    var i;
    if (b == "fit") {
      var z = getStrokedBBox();
      if (z) {
        i = new ua("Fit Canvas to Content");
        var o = Lb();
        gb(o);
        var h = [],
          q = [];
        $.each(o, function () {
          h.push(z.x * -1);
          q.push(z.y * -1)
        });
        o = e.moveSelectedElements(h, q, true);
        i.addSubCommand(o);
        za();
        b = Math.round(z.width);
        c = Math.round(z.height)
      } else return false
    }
    if (b != m || c != d) {
      o = k.suspendRedraw(1E3);
      i || (i = new ua("Change Image Dimensions"));
      b = ba("width", b);
      c = ba("height", c);
      n.setAttribute("width", b);
      n.setAttribute("height", c);
      this.contentW = b;
      this.contentH = c;
      i.addSubCommand(new Ia(n, {
        width: m,
        height: d
      }));
      n.setAttribute("viewBox", [0, 0, b / A, c / A].join(" "));
      i.addSubCommand(new Ia(n, {
        viewBox: ["0 0", m, d].join(" ")
      }));
      ma(i);
      k.unsuspendRedraw(o);
      ha("changed", [n])
    }
    return true
  };
  this.getOffset = function () {
    return $(n).attr(["x", "y"])
  };
  this.setBBoxZoom = function (b, c, d) {
    var m = 0.85,
      i = function (z) {
        if (!z) return false;
        var o = Math.min(Math.round(c / z.width * 100 * m) / 100, Math.round(d / z.height * 100 * m) / 100);
        e.setZoom(o);
        return {
          zoom: o,
          bbox: z
        }
      };
    if (typeof b == "object") {
      b = b;
      if (b.width == 0 || b.height == 0) {
        e.setZoom(b.zoom ? b.zoom : A * b.factor);
        return {
          zoom: A,
          bbox: b
        }
      }
      return i(b)
    }
    switch (b) {
      case "selection":
        if (!L[0]) return;
        b = $.map(L, function (z) {
          if (z) return z
        });
        b = getStrokedBBox(b);
        break;
      case "canvas":
        b = xb();
        m = 0.95;
        b = {
          width: b.w,
          height: b.h,
          x: 0,
          y: 0
        };
        break;
      case "content":
        b = getStrokedBBox();
        break;
      case "layer":
        b = getStrokedBBox(Lb(B().getCurrentLayer()));
        break;
      default:
        return
    }
    return i(b)
  };
  this.setZoom = function (b) {
    var c = xb();
    n.setAttribute("viewBox", "0 0 " + c.w / b + " " + c.h / b);
    A = b;
    $.each(L, function (d, m) {
      m && ra.requestSelector(m).resize()
    });
    qa.zoomChange();
    Db("zoomChanged", b)
  };
  this.getMode = function () {
    return sa
  };
  this.setMode = function (b) {
    qa.clear(true);
    Ra.clear();
    Sa = L[0] && L[0].nodeName == "text" ? Ua : N;
    sa = b
  };
  this.getColor = function (b) {
    return Sa[b]
  };
  this.setColor = function (b, c, d) {
    N[b] = c;
    Sa[b + "_paint"] = {
      type: "solidColor"
    };
    for (var m = [], i = L.length; i--;) {
      var z = L[i];
      if (z) if (z.tagName == "g") svgedit.utilities.walkTree(z, function (o) {
        o.nodeName != "g" && m.push(o)
      });
      else if (b == "fill") z.tagName != "polyline" && z.tagName != "line" && m.push(z);
      else m.push(z)
    }
    if (m.length > 0) if (d) ob(b, c, m);
    else {
      Va(b, c, m);
      ha("changed", m)
    }
  };
  var Xa = function () {
    var b = n.getElementsByTagNameNS(s, "defs");
    if (b.length > 0) b = b[0];
    else {
      b = f.createElementNS(s, "defs");
      n.firstChild ? n.insertBefore(b, n.firstChild.nextSibling) : n.appendChild(b)
    }
    return b
  }, Zb = this.setGradient = function (b) {
    if (!(!Sa[b + "_paint"] || Sa[b + "_paint"].type == "solidColor")) {
      var c = e[b + "Grad"],
        d = Sb(c),
        m = Xa();
      if (d) c = d;
      else {
        c = m.appendChild(f.importNode(c, true));
        c.id = Fa()
      }
      e.setColor(b, "url(#" + c.id + ")")
    }
  }, Sb = function (b) {
    var c = Xa();
    c = $(c).find("linearGradient, radialGradient");
    for (var d = c.length, m = ["r", "cx", "cy", "fx", "fy"]; d--;) {
      var i = c[d];
      if (b.tagName ==
        "linearGradient") {
        if (b.getAttribute("x1") != i.getAttribute("x1") || b.getAttribute("y1") != i.getAttribute("y1") || b.getAttribute("x2") != i.getAttribute("x2") || b.getAttribute("y2") != i.getAttribute("y2")) continue
      } else {
        var z = $(b).attr(m),
          o = $(i).attr(m),
          h = false;
        $.each(m, function (E, H) {
          if (z[H] != o[H]) h = true
        });
        if (h) continue
      }
      var q = b.getElementsByTagNameNS(s, "stop"),
        w = i.getElementsByTagNameNS(s, "stop");
      if (q.length == w.length) {
        for (var u = q.length; u--;) {
          var t = q[u],
            C = w[u];
          if (t.getAttribute("offset") != C.getAttribute("offset") || t.getAttribute("stop-opacity") != C.getAttribute("stop-opacity") || t.getAttribute("stop-color") != C.getAttribute("stop-color")) break
        }
        if (u == -1) return i
      }
    }
    return null
  };
  this.setPaint = function (b, c) {
    var d = new $.jGraduate.Paint(c);
    this.setPaintOpacity(b, d.alpha / 100, true);
    Sa[b + "_paint"] = d;
    switch (d.type) {
      case "solidColor":
        this.setColor(b, d.solidColor != "none" ? "#" + d.solidColor : "none");
        break;
      case "linearGradient":
      case "radialGradient":
        e[b + "Grad"] = d[d.type];
        Zb(b)
    }
  };
  this.getStrokeWidth = function () {
    return Sa.stroke_width
  };
  this.setStrokeWidth = function (b) {
    if (b == 0 && ["line", "path"].indexOf(sa) >= 0) e.setStrokeWidth(1);
    else {
      Sa.stroke_width = b;
      for (var c = [], d = L.length; d--;) {
        var m = L[d];
        if (m) m.tagName == "g" ? svgedit.utilities.walkTree(m, function (i) {
          i.nodeName != "g" && c.push(i)
        }) : c.push(m)
      }
      if (c.length > 0) {
        Va("stroke-width", b, c);
        ha("changed", L)
      }
    }
  };
  this.setStrokeAttr = function (b, c) {
    N[b.replace("-", "_")] = c;
    for (var d = [], m = L.length; m--;) {
      var i = L[m];
      if (i) i.tagName == "g" ? svgedit.utilities.walkTree(i, function (z) {
        z.nodeName != "g" && d.push(z)
      }) : d.push(i)
    }
    if (d.length > 0) {
      Va(b, c, d);
      ha("changed", L)
    }
  };
  this.getStyle = function () {
    return N
  };
  this.getOpacity = function () {
    return N.opacity
  };
  this.setOpacity = function (b) {
    N.opacity = b;
    Va("opacity", b)
  };
  this.getFillOpacity = function () {
    return N.fill_opacity
  };
  this.getStrokeOpacity = function () {
    return N.stroke_opacity
  };
  this.setPaintOpacity = function (b, c, d) {
    N[b + "_opacity"] = c;
    d ? ob(b + "-opacity", c) : Va(b + "-opacity", c)
  };
  this.getBlur = function (b) {
    var c = 0;
    if (b) if (b.getAttribute("filter")) if (b = va(b.id + "_blur")) c = b.firstChild.getAttribute("stdDeviation");
    return c
  };
  (function () {
    function b() {
      var i = e.undoMgr.finishUndoableChange();
      c.addSubCommand(i);
      ma(c);
      d = c = null
    }
    var c = null,
      d = null,
      m = false;
    e.setBlurNoUndo = function (i) {
      if (d) if (i === 0) {
        ob("filter", "");
        m = true
      } else {
        var z = L[0];
        m && ob("filter", "url(#" + z.id + "_blur)");
        if (svgedit.browser.isWebkit()) {
          console.log("e", z);
          z.removeAttribute("filter");
          z.setAttribute("filter", "url(#" + z.id + "_blur)")
        }
        ob("stdDeviation", i, [d.firstChild]);
        e.setBlurOffsets(d, i)
      } else e.setBlur(i)
    };
    e.setBlurOffsets = function (i, z) {
      if (z > 3) Ga(i, {
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
      }, 100);
      else if (!svgedit.browser.isWebkit()) {
        i.removeAttribute("x");
        i.removeAttribute("y");
        i.removeAttribute("width");
        i.removeAttribute("height")
      }
    };
    e.setBlur = function (i, z) {
      if (c) b();
      else {
        var o = L[0],
          h = o.id;
        d = va(h + "_blur");
        i -= 0;
        var q = new ua;
        if (d) {
          if (i === 0) d = null
        } else {
          var w = na({
            element: "feGaussianBlur",
            attr: {
              "in": "SourceGraphic",
              stdDeviation: i
            }
          });
          d = na({
            element: "filter",
            attr: {
              id: h + "_blur"
            }
          });
          d.appendChild(w);
          Xa().appendChild(d);
          q.addSubCommand(new Ha(d))
        }
        w = {
          filter: o.getAttribute("filter")
        };
        if (i === 0) {
          o.removeAttribute("filter");
          q.addSubCommand(new Ia(o, w))
        } else {
          Va("filter", "url(#" + h + "_blur)");
          q.addSubCommand(new Ia(o, w));
          e.setBlurOffsets(d, i);
          c = q;
          e.undoMgr.beginUndoableChange("stdDeviation", [d ? d.firstChild : null]);
          if (z) {
            e.setBlurNoUndo(i);
            b()
          }
        }
      }
    }
  })();
  this.getBold = function () {
    var b = L[0];
    if (b != null && b.tagName == "text" && L[1] == null) return b.getAttribute("font-weight") == "bold";
    return false
  };
  this.setBold = function (b) {
    var c = L[0];
    if (c != null && c.tagName == "text" && L[1] == null) Va("font-weight", b ? "bold" :
      "normal");
    L[0].textContent || Ra.setCursor()
  };
  this.getItalic = function () {
    var b = L[0];
    if (b != null && b.tagName == "text" && L[1] == null) return b.getAttribute("font-style") == "italic";
    return false
  };
  this.setItalic = function (b) {
    var c = L[0];
    if (c != null && c.tagName == "text" && L[1] == null) Va("font-style", b ? "italic" : "normal");
    L[0].textContent || Ra.setCursor()
  };
  this.getFontFamily = function () {
    return Ua.font_family
  };
  this.setFontFamily = function (b) {
    Ua.font_family = b;
    Va("font-family", b);
    L[0] && !L[0].textContent && Ra.setCursor()
  };
  this.setFontColor = function (b) {
    Ua.fill = b;
    Va("fill", b)
  };
  this.getFontSize = function () {
    return Ua.fill
  };
  this.getFontSize = function () {
    return Ua.font_size
  };
  this.setFontSize = function (b) {
    Ua.font_size = b;
    Va("font-size", b);
    L[0].textContent || Ra.setCursor()
  };
  this.getText = function () {
    var b = L[0];
    if (b == null) return "";
    return b.textContent
  };
  this.setTextContent = function (b) {
    Va("#text", b);
    Ra.init(b);
    Ra.setCursor()
  };
  this.setImageURL = function (b) {
    var c = L[0];
    if (c) {
      var d = $(c).attr(["width", "height"]);
      d = !d.width || !d.height;
      var m = ib(c);
      if (m !== b) d = true;
      else if (!d) return;
      var i = new ua("Change Image URL");
      lb(c, b);
      i.addSubCommand(new Ia(c, {
        "#href": m
      }));
      d ? $(new Image).load(function () {
        var z = $(c).attr(["width", "height"]);
        $(c).attr({
          width: this.width,
          height: this.height
        });
        ra.requestSelector(c).resize();
        i.addSubCommand(new Ia(c, z));
        ma(i);
        ha("changed", [c])
      }).attr("src", b) : ma(i)
    }
  };
  this.setLinkURL = function (b) {
    var c = L[0];
    if (c) {
      if (c.tagName !== "a") {
        c = $(c).parents("a");
        if (c.length) c = c[0];
        else return
      }
      var d = ib(c);
      if (d !== b) {
        var m = new ua("Change Link URL");
        lb(c,
        b);
        m.addSubCommand(new Ia(c, {
          "#href": d
        }));
        ma(m)
      }
    }
  };
  this.setRectRadius = function (b) {
    var c = L[0];
    if (c != null && c.tagName == "rect") {
      var d = c.getAttribute("rx");
      if (d != b) {
        c.setAttribute("rx", b);
        c.setAttribute("ry", b);
        ma(new Ia(c, {
          rx: d,
          ry: d
        }, "Radius"));
        ha("changed", [c])
      }
    }
  };
  this.makeHyperlink = function (b) {
    e.groupSelectedElements("a", b)
  };
  this.removeHyperlink = function () {
    e.ungroupSelectedElement()
  };
  this.setSegType = function (b) {
    qa.setSegType(b)
  };
  this.convertToPath = function (b, c) {
    if (b == null) $.each(L, function (Y, R) {
      R && e.convertToPath(R)
    });
    else {
      if (!c) var d = new ua("Convert element to Path");
      var m = c ? {} : {
        fill: N.fill,
        "fill-opacity": N.fill_opacity,
        stroke: N.stroke,
        "stroke-width": N.stroke_width,
        "stroke-dasharray": N.stroke_dasharray,
        "stroke-linejoin": N.stroke_linejoin,
        "stroke-linecap": N.stroke_linecap,
        "stroke-opacity": N.stroke_opacity,
        opacity: N.opacity,
        visibility: "hidden"
      };
      $.each(["marker-start", "marker-end", "marker-mid", "filter", "clip-path"], function () {
        if (b.getAttribute(this)) m[this] = b.getAttribute(this)
      });
      var i = na({
        element: "path",
        attr: m
      }),
        z = b.getAttribute("transform");
      z && i.setAttribute("transform", z);
      var o = b.id,
        h = b.parentNode;
      b.nextSibling ? h.insertBefore(i, b) : h.appendChild(i);
      var q = "",
        w = function (Y) {
          $.each(Y, function (R, T) {
            var V = T[1];
            q += T[0];
            for (var aa = 0; aa < V.length; aa += 2) q += V[aa] + "," + V[aa + 1] + " "
          })
        }, u = 1.81;
      switch (b.tagName) {
        case "ellipse":
        case "circle":
          var t = $(b).attr(["rx", "ry", "cx", "cy"]),
            C = t.cx,
            E = t.cy,
            H = t.rx;
          t = t.ry;
          if (b.tagName == "circle") H = t = $(b).attr("r");
          w([
            ["M", [C - H, E]],
            ["C", [C - H, E - t / u, C - H / u, E - t, C, E - t]],
            ["C", [C + H / u, E - t, C + H, E - t / u, C + H, E]],
            ["C", [C + H, E + t / u, C + H / u, E + t, C, E + t]],
            ["C", [C - H / u, E + t, C - H, E + t / u, C - H, E]],
            ["Z", []]
          ]);
          break;
        case "path":
          q = b.getAttribute("d");
          break;
        case "line":
          t = $(b).attr(["x1", "y1", "x2", "y2"]);
          q = "M" + t.x1 + "," + t.y1 + "L" + t.x2 + "," + t.y2;
          break;
        case "polyline":
        case "polygon":
          q = "M" + b.getAttribute("points");
          break;
        case "rect":
          t = $(b).attr(["rx", "ry"]);
          H = t.rx;
          t = t.ry;
          var I = b.getBBox();
          C = I.x;
          E = I.y;
          var P = I.width;
          I = I.height;
          u = 4 - u;
          !H && !t ? w([
            ["M", [C, E]],
            ["L", [C + P, E]],
            ["L", [C + P, E + I]],
            ["L", [C, E + I]],
            ["L", [C, E]],
            ["Z", []]
          ]) : w([
            ["M", [C, E + t]],
            ["C", [C, E + t / u, C + H / u, E, C + H, E]],
            ["L", [C + P - H, E]],
            ["C", [C + P - H / u, E, C + P, E + t / u, C + P, E + t]],
            ["L", [C + P, E + I - t]],
            ["C", [C + P, E + I - t / u, C + P - H / u, E + I, C + P - H, E + I]],
            ["L", [C + H, E + I]],
            ["C", [C + H / u, E + I, C, E + I - t / u, C, E + I - t]],
            ["L", [C, E + t]],
            ["Z", []]
          ]);
          break;
        default:
          i.parentNode.removeChild(i)
      }
      q && i.setAttribute("d", q);
      if (c) {
        qa.resetOrientation(i);
        d = false;
        try {
          d = i.getBBox()
        } catch (W) {}
        i.parentNode.removeChild(i);
        return d
      } else {
        if (z) {
          z = ca(i);
          ia(z) && qa.resetOrientation(i)
        }
        d.addSubCommand(new Pa(b, b.nextSibling, h));
        d.addSubCommand(new Ha(i));
        za();
        b.parentNode.removeChild(b);
        i.setAttribute("id", o);
        i.removeAttribute("visibility");
        gb([i], true);
        ma(d)
      }
    }
  };
  var ob = function (b, c, d) {
    var m = k.suspendRedraw(1E3);
    sa == "pathedit" && qa.moveNode(b, c);
    d = d || L;
    for (var i = d.length, z = ["g", "polyline", "path"], o = ["transform", "opacity", "filter"]; i--;) {
      var h = d[i];
      if (h != null) {
        sa === "textedit" && b !== "#text" && h.textContent.length && Ra.toSelectMode(h);
        if ((b === "x" || b === "y") && z.indexOf(h.tagName) >= 0) {
          var q = getStrokedBBox([h]);
          e.moveSelectedElements((b === "x" ? c - q.x : 0) * A, (b ===
            "y" ? c - q.y : 0) * A, true)
        } else {
          h.tagName === "g" && o.indexOf(b);
          q = b === "#text" ? h.textContent : h.getAttribute(b);
          if (q == null) q = "";
          if (q !== String(c)) {
            if (b == "#text") {
              svgedit.utilities.getBBox(h);
              h.textContent = c;
              if (/rotate/.test(h.getAttribute("transform"))) h = Nb(h)
            } else b == "#href" ? lb(h, c) : h.setAttribute(b, c);
            if (svgedit.browser.isGecko() && h.nodeName === "text" && /rotate/.test(h.getAttribute("transform"))) if ((c + "").indexOf("url") === 0 || ["font-size", "font-family", "x", "y"].indexOf(b) >= 0 && h.textContent) h = Nb(h);
            L.indexOf(h) >= 0 && setTimeout(function () {
              h.parentNode && ra.requestSelector(h).resize()
            }, 0);
            q = bb(h);
            if (q != 0 && b != "transform") for (var w = ca(h), u = w.numberOfItems; u--;) if (w.getItem(u).type == 4) {
              w.removeItem(u);
              var t = svgedit.utilities.getBBox(h),
                C = oa(t.x + t.width / 2, t.y + t.height / 2, da(w).matrix);
              t = C.x;
              C = C.y;
              var E = k.createSVGTransform();
              E.setRotate(q, t, C);
              w.insertItemBefore(E, u);
              break
            }
          }
        }
      }
    }
    k.unsuspendRedraw(m)
  }, Va = this.changeSelectedAttribute = function (b, c, d) {
    d = d || L;
    e.undoMgr.beginUndoableChange(b, d);
    ob(b, c, d);
    b = e.undoMgr.finishUndoableChange();
    b.isEmpty() || ma(b)
  };
  this.deleteSelectedElements = function () {
    for (var b = new ua("Delete Elements"), c = L.length, d = [], m = 0; m < c; ++m) {
      var i = L[m];
      if (i == null) break;
      var z = i.parentNode,
        o = i;
      ra.releaseSelector(o);
      svgedit.path.removePath_(o.id);
      if (z.tagName === "a" && z.childNodes.length === 1) {
        o = z;
        z = z.parentNode
      }
      var h = o.nextSibling;
      o = z.removeChild(o);
      d.push(i);
      L[m] = null;
      b.addSubCommand(new Pa(o, h, z))
    }
    b.isEmpty() || ma(b);
    ha("changed", d);
    za()
  };
  this.cutSelectedElements = function () {
    for (var b = new ua("Cut Elements"), c = L.length,
    d = [], m = 0; m < c; ++m) {
      var i = L[m];
      if (i == null) break;
      var z = i.parentNode,
        o = i;
      ra.releaseSelector(o);
      svgedit.path.removePath_(o.id);
      var h = o.nextSibling;
      o = z.removeChild(o);
      d.push(i);
      L[m] = null;
      b.addSubCommand(new Pa(o, h, z))
    }
    b.isEmpty() || ma(b);
    ha("changed", d);
    za();
    e.clipBoard = d
  };
  this.copySelectedElements = function () {
    e.clipBoard = $.merge([], L)
  };
  this.pasteElements = function (b, c, d) {
    var m = e.clipBoard,
      i = m.length;
    if (i) {
      for (var z = [], o = new ua("Paste elements"); i--;) {
        var h = m[i];
        if (h) {
          var q = vb(h);
          if (!va(h.id)) q.id = h.id;
          z.push(q);
          (O || B().getCurrentLayer()).appendChild(q);
          o.addSubCommand(new Ha(q))
        }
      }
      Wa(z);
      if (b !== "in_place") {
        var w, u;
        if (b) {
          if (b === "point") {
            w = c;
            u = d
          }
        } else {
          w = Vb.x;
          u = Vb.y
        }
        b = getStrokedBBox(z);
        var t = w - (b.x + b.width / 2),
          C = u - (b.y + b.height / 2),
          E = [],
          H = [];
        $.each(z, function () {
          E.push(t);
          H.push(C)
        });
        w = e.moveSelectedElements(E, H, false);
        o.addSubCommand(w)
      }
      ma(o);
      ha("changed", z)
    }
  };
  this.groupSelectedElements = function (b) {
    b || (b = "g");
    var c = "";
    switch (b) {
      case "a":
        c = "Make hyperlink";
        var d = "";
        if (arguments.length > 1) d = arguments[1];
        break;
      default:
        b =
          "g";
        c = "Group Elements"
    }
    c = new ua(c);
    var m = na({
      element: b,
      attr: {
        id: Fa()
      }
    });
    b === "a" && lb(m, d);
    c.addSubCommand(new Ha(m));
    for (d = L.length; d--;) {
      var i = L[d];
      if (i != null) {
        if (i.parentNode.tagName === "a" && i.parentNode.childNodes.length === 1) i = i.parentNode;
        var z = i.nextSibling,
          o = i.parentNode;
        m.appendChild(i);
        c.addSubCommand(new Ca(i, z, o))
      }
    }
    c.isEmpty() || ma(c);
    Wa([m], true)
  };
  var Yb = this.pushGroupProperties = function (b, c) {
    var d = b.childNodes,
      m = d.length,
      i = b.getAttribute("transform"),
      z = ca(b),
      o = da(z).matrix,
      h = new ua("Push group properties"),
      q = 0,
      w = bb(b),
      u = $(b).attr(["filter", "opacity"]),
      t, C;
    for (q = 0; q < m; q++) {
      var E = d[q];
      if (E.nodeType === 1) {
        if (u.opacity !== null && u.opacity !== 1) {
          E.getAttribute("opacity");
          var H = Math.round((E.getAttribute("opacity") || 1) * u.opacity * 100) / 100;
          Va("opacity", H, [E])
        }
        if (u.filter) {
          var I = H = this.getBlur(E);
          C || (C = this.getBlur(b));
          if (H) H = C - 0 + (H - 0);
          else if (H === 0) H = C;
          if (I) t = rb(E.getAttribute("filter"));
          else if (t) {
            t = vb(t);
            Xa().appendChild(t)
          } else t = rb(u.filter);
          t.id = E.id + "_" + (t.firstChild.tagName === "feGaussianBlur" ? "blur" : "filter");
          Va("filter", "url(#" + t.id + ")", [E]);
          if (H) {
            Va("stdDeviation", H, [t.firstChild]);
            e.setBlurOffsets(t, H)
          }
        }
        H = ca(E);
        if (~E.tagName.indexOf("Gradient")) H = null;
        if (H) if (E.tagName !== "defs") if (z.numberOfItems) {
          if (w && z.numberOfItems == 1) {
            var P = z.getItem(0).matrix,
              W = k.createSVGMatrix();
            if (I = bb(E)) W = H.getItem(0).matrix;
            var Y = svgedit.utilities.getBBox(E),
              R = da(H).matrix,
              T = oa(Y.x + Y.width / 2, Y.y + Y.height / 2, R);
            Y = w + I;
            R = k.createSVGTransform();
            R.setRotate(Y, T.x, T.y);
            P = pa(P, W, R.matrix.inverse());
            I && H.removeItem(0);
            if (Y) H.numberOfItems ? H.insertItemBefore(R, 0) : H.appendItem(R);
            if (P.e || P.f) {
              I = k.createSVGTransform();
              I.setTranslate(P.e, P.f);
              H.numberOfItems ? H.insertItemBefore(I, 0) : H.appendItem(I)
            }
          } else {
            I = E.getAttribute("transform");
            P = {};
            P.transform = I ? I : "";
            I = k.createSVGTransform();
            P = da(H).matrix;
            W = P.inverse();
            P = pa(W, o, P);
            I.setMatrix(P);
            H.appendItem(I)
          }(E = Ta(E)) && h.addSubCommand(E)
        }
      }
    }
    if (i) {
      P = {};
      P.transform = i;
      b.setAttribute("transform", "");
      b.removeAttribute("transform");
      h.addSubCommand(new Ia(b, P))
    }
    if (c && !h.isEmpty()) return h
  };
  this.ungroupSelectedElement = function () {
    var b = L[0];
    if ($(b).data("gsvg") || $(b).data("symbol")) gc(b);
    else if (b.tagName === "use") {
      var c = va(ib(b).substr(1));
      $(b).data("symbol", c).data("ref", c);
      gc(b)
    } else {
      c = $(b).parents("a");
      if (c.length) b = c[0];
      if (b.tagName === "g" || b.tagName === "a") {
        c = new ua("Ungroup Elements");
        var d = Yb(b, true);
        d && c.addSubCommand(d);
        d = b.parentNode;
        for (var m = b.nextSibling, i = Array(b.childNodes.length), z = 0; b.firstChild;) {
          var o = b.firstChild,
            h = o.nextSibling,
            q = o.parentNode;
          if (o.tagName === "title") {
            c.addSubCommand(new Pa(o, o.nextSibling,
            q));
            q.removeChild(o)
          } else {
            i[z++] = o = d.insertBefore(o, m);
            c.addSubCommand(new Ca(o, h, q))
          }
        }
        za();
        m = b.nextSibling;
        b = d.removeChild(b);
        c.addSubCommand(new Pa(b, m, d));
        c.isEmpty() || ma(c);
        gb(i)
      }
    }
  };
  this.moveToTopSelectedElement = function () {
    var b = L[0];
    if (b != null) {
      b = b;
      var c = b.parentNode,
        d = b.nextSibling;
      b = b.parentNode.appendChild(b);
      if (d != b.nextSibling) {
        ma(new Ca(b, d, c, "top"));
        ha("changed", [b])
      }
    }
  };
  this.moveToBottomSelectedElement = function () {
    var b = L[0];
    if (b != null) {
      b = b;
      var c = b.parentNode,
        d = b.nextSibling,
        m = b.parentNode.firstChild;
      if (m.tagName == "title") m = m.nextSibling;
      if (m.tagName == "defs") m = m.nextSibling;
      b = b.parentNode.insertBefore(b, m);
      if (d != b.nextSibling) {
        ma(new Ca(b, d, c, "bottom"));
        ha("changed", [b])
      }
    }
  };
  this.moveUpDownSelected = function (b) {
    var c = L[0];
    if (c) {
      jb = [];
      var d, m, i = $(Wb(getStrokedBBox([c]))).toArray();
      b == "Down" && i.reverse();
      $.each(i, function () {
        if (m) {
          d = this;
          return false
        } else if (this == c) m = true
      });
      if (d) {
        i = c.parentNode;
        var z = c.nextSibling;
        $(d)[b == "Down" ? "before" : "after"](c);
        if (z != c.nextSibling) {
          ma(new Ca(c, z, i, "Move " + b));
          ha("changed", [c])
        }
      }
    }
  };
  this.moveSelectedElements = function (b, c, d) {
    if (b.constructor != Array) {
      b /= A;
      c /= A
    }
    d = d || true;
    for (var m = new ua("position"), i = L.length; i--;) {
      var z = L[i];
      if (z != null) {
        var o = k.createSVGTransform(),
          h = ca(z);
        b.constructor == Array ? o.setTranslate(b[i], c[i]) : o.setTranslate(b, c);
        h.numberOfItems ? h.insertItemBefore(o, 0) : h.appendItem(o);
        (o = Ta(z)) && m.addSubCommand(o);
        ra.requestSelector(z).resize()
      }
    }
    if (!m.isEmpty()) {
      d && ma(m);
      ha("changed", L);
      return m
    }
  };
  this.cloneSelectedElements = function (b, c) {
    for (var d = new ua("Clone Elements"), m = L.length, i = 0; i < m; ++i) {
      var z = L[i];
      if (z == null) break
    }
    m = L.slice(0, i);
    this.clearSelection(true);
    for (i = m.length; i--;) {
      z = m[i] = vb(m[i]);
      (O || B().getCurrentLayer()).appendChild(z);
      d.addSubCommand(new Ha(z))
    }
    if (!d.isEmpty()) {
      gb(m.reverse());
      this.moveSelectedElements(b, c, false);
      ma(d)
    }
  };
  this.alignSelectedElements = function (b, c) {
    var d = [],
      m = Number.MAX_VALUE,
      i = Number.MIN_VALUE,
      z = Number.MAX_VALUE,
      o = Number.MIN_VALUE,
      h = Number.MIN_VALUE,
      q = Number.MIN_VALUE,
      w = L.length;
    if (w) {
      for (var u = 0; u < w; ++u) {
        if (L[u] == null) break;
        d[u] = getStrokedBBox([L[u]]);
        switch (c) {
          case "smallest":
            if ((b == "l" || b == "c" || b == "r") && (h == Number.MIN_VALUE || h > d[u].width) || (b == "t" || b == "m" || b == "b") && (q == Number.MIN_VALUE || q > d[u].height)) {
              m = d[u].x;
              z = d[u].y;
              i = d[u].x + d[u].width;
              o = d[u].y + d[u].height;
              h = d[u].width;
              q = d[u].height
            }
            break;
          case "largest":
            if ((b == "l" || b == "c" || b == "r") && (h == Number.MIN_VALUE || h < d[u].width) || (b == "t" || b == "m" || b == "b") && (q == Number.MIN_VALUE || q < d[u].height)) {
              m = d[u].x;
              z = d[u].y;
              i = d[u].x + d[u].width;
              o = d[u].y + d[u].height;
              h = d[u].width;
              q = d[u].height
            }
            break;
          default:
            if (d[u].x < m) m = d[u].x;
            if (d[u].y < z) z = d[u].y;
            if (d[u].x + d[u].width > i) i = d[u].x + d[u].width;
            if (d[u].y + d[u].height > o) o = d[u].y + d[u].height
        }
      }
      if (c == "page") {
        z = m = 0;
        i = e.contentW;
        o = e.contentH
      }
      h = Array(w);
      q = Array(w);
      for (u = 0; u < w; ++u) {
        if (L[u] == null) break;
        var t = d[u];
        h[u] = 0;
        q[u] = 0;
        switch (b) {
          case "l":
            h[u] = m - t.x;
            break;
          case "c":
            h[u] = (m + i) / 2 - (t.x + t.width / 2);
            break;
          case "r":
            h[u] = i - (t.x + t.width);
            break;
          case "t":
            q[u] = z - t.y;
            break;
          case "m":
            q[u] = (z + o) / 2 - (t.y + t.height / 2);
            break;
          case "b":
            q[u] = o - (t.y + t.height)
        }
      }
      this.moveSelectedElements(h,
      q)
    }
  };
  this.contentW = xb().w;
  this.contentH = xb().h;
  this.updateCanvas = function (b, c) {
    k.setAttribute("width", b);
    k.setAttribute("height", c);
    var d = $("#canvasBackground")[0],
      m = n.getAttribute("x"),
      i = n.getAttribute("y"),
      z = b / 2 - this.contentW * A / 2,
      o = c / 2 - this.contentH * A / 2;
    Ga(n, {
      width: this.contentW * A,
      height: this.contentH * A,
      x: z,
      y: o,
      viewBox: "0 0 " + this.contentW + " " + this.contentH
    });
    Ga(d, {
      width: n.getAttribute("width"),
      height: n.getAttribute("height"),
      x: z,
      y: o
    });
    (d = va("background_image")) && Ga(d, {
      width: "100%",
      height: "100%"
    });
    ra.selectorParentGroup.setAttribute("transform", "translate(" + z + "," + o + ")");
    return {
      x: z,
      y: o,
      old_x: m,
      old_y: i,
      d_x: z - m,
      d_y: o - i
    }
  };
  this.setBackground = function (b, c) {
    var d = va("canvasBackground"),
      m = $(d).find("rect")[0],
      i = va("background_image");
    m.setAttribute("fill", b);
    if (c) {
      if (!i) {
        i = f.createElementNS(s, "image");
        Ga(i, {
          id: "background_image",
          width: "100%",
          height: "100%",
          preserveAspectRatio: "xMinYMin",
          style: "pointer-events:none"
        })
      }
      lb(i, c);
      d.appendChild(i)
    } else i && i.parentNode.removeChild(i)
  };
  this.cycleElement = function (b) {
    var c = L[0],
      d = false,
      m = Lb(O || B().getCurrentLayer());
    if (m.length) {
      if (c == null) {
        b = b ? m.length - 1 : 0;
        d = m[b]
      } else for (var i = m.length; i--;) if (m[i] == c) {
        b = b ? i - 1 : i + 1;
        if (b >= m.length) b = 0;
        else if (b < 0) b = m.length - 1;
        d = m[b];
        break
      }
      Wa([d], true);
      ha("selected", L)
    }
  };
  this.clear();
  this.getPrivateMethods = function () {
    return {
      addCommandToHistory: ma,
      setGradient: Zb,
      addSvgElementFromJson: na,
      assignAttributes: Ga,
      BatchCommand: ua,
      call: ha,
      ChangeElementCommand: Ia,
      copyElem: vb,
      ffClone: Nb,
      findDefs: Xa,
      findDuplicateGradient: Sb,
      getElem: va,
      getId: db,
      getIntersectionList: Wb,
      getMouseTarget: Pb,
      getNextId: Fa,
      getPathBBox: Tb,
      getUrlFromAttr: sb,
      hasMatrixTransform: ia,
      identifyLayers: zb,
      InsertElementCommand: Ha,
      isIdentity: svgedit.math.isIdentity,
      logMatrix: kc,
      matrixMultiply: pa,
      MoveElementCommand: Ca,
      preventClickDefault: Mb,
      recalculateAllSelectedDimensions: Ob,
      recalculateDimensions: Ta,
      remapElement: Fb,
      RemoveElementCommand: Pa,
      removeUnusedDefElems: fc,
      round: Eb,
      runExtensions: Db,
      sanitizeSvg: ja,
      SVGEditTransformList: svgedit.transformlist.SVGTransformList,
      toString: toString,
      transformBox: svgedit.math.transformBox,
      transformListToTransform: da,
      transformPoint: oa,
      walkTree: svgedit.utilities.walkTree
    }
  }
};
(function () {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
  if (!window.svgEditor) window.svgEditor = function (a) {
    function K(B, A) {
      var O = l.setSvgString(B) !== false;
      A = A || a.noop;
      O ? A(true) : a.alert(k.notification.errorLoadingSVG, function () {
        A(false)
      })
    }
    var l, s = {}, v = false,
      G = {
        lang: "en",
        iconsize: "m",
        bkgd_color: "#FFF",
        bkgd_url: "",
        img_save: "embed"
      },
      e = {}, f = {
        canvasName: "default",
        canvas_expansion: 3,
        dimensions: [640, 480],
        initFill: {
          color: "FF0000",
          opacity: 1
        },
        initStroke: {
          width: 5,
          color: "000000",
          opacity: 1
        },
        initOpacity: 1,
        imgPath: "images/",
        langPath: "locale/",
        extPath: "extensions/",
        jGraduatePath: "jgraduate/images/",
        extensions: ["ext-markers.js", "ext-connector.js", "ext-eyedropper.js", "ext-shapes.js", "ext-imagelib.js", "ext-grid.js"],
        initTool: "select",
        wireframe: false,
        colorPickerCSS: null,
        gridSnapping: false,
        gridColor: "#000",
        baseUnit: "px",
        snappingStep: 10,
        showRulers: true
      },
      k = s.uiStrings = {
        common: {
          ok: "OK",
          cancel: "Cancel",
          key_up: "Up",
          key_down: "Down",
          key_backspace: "Backspace",
          key_del: "Del"
        },
        layers: {
          layer: "Layer"
        },
        notification: {
          invalidAttrValGiven: "Invalid value given",
          noContentToFitTo: "No content to fit to",
          dupeLayerName: "There is already a layer named that!",
          enterUniqueLayerName: "Please enter a unique layer name",
          enterNewLayerName: "Please enter the new layer name",
          layerHasThatName: "Layer already has that name",
          QmoveElemsToLayer: 'Move selected elements to layer "%s"?',
          QwantToClear: "Do you want to clear the drawing?\nThis will also erase your undo history!",
          QwantToOpen: "Do you want to open a new file?\nThis will also erase your undo history!",
          QerrorsRevertToSource: "There were parsing errors in your SVG source.\nRevert back to original SVG source?",
          QignoreSourceChanges: "Ignore changes made to SVG source?",
          featNotSupported: "Feature not supported",
          enterNewImgURL: "Enter the new image URL",
          defsFailOnSave: "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
          loadingImage: "Loading image, please wait...",
          saveFromBrowser: 'Select "Save As..." in your browser to save this image as a %s file.',
          noteTheseIssues: "Also note the following issues: ",
          unsavedChanges: "There are unsaved changes.",
          enterNewLinkURL: "Enter the new hyperlink URL",
          errorLoadingSVG: "Error: Unable to load SVG data",
          URLloadFail: "Unable to load from URL",
          retrieving: 'Retrieving "%s" ...'
        }
      };
    e = {};
    var n = {};
    s.curConfig = f;
    s.tool_scale = 1;
    a.pref = function (B, A) {
      if (A) e[B] = A;
      B = "svg-edit-" + B;
      var O = location.hostname,
        Z = O && O.indexOf(".") >= 0,
        N = A != undefined,
        L = false;
      try {
        if (window.localStorage) L = localStorage
      } catch (na) {}
      try {
        if (window.globalStorage && Z) L = globalStorage[O]
      } catch (ca) {}
      if (L) if (N) L.setItem(B, A);
      else {
        if (L.getItem(B)) return L.getItem(B) + ""
      } else if (window.widget) if (N) widget.setPreferenceForKey(A, B);
      else return widget.preferenceForKey(B);
      else if (N) {
        O = new Date;
        O.setTime(O.getTime() + 31536E6);
        A = encodeURIComponent(A);
        document.cookie = B + "=" + A + "; expires=" + O.toUTCString()
      } else return (O = document.cookie.match(RegExp(B +
        "=([^;]+)"))) ? decodeURIComponent(O[1]) : ""
    };
    s.setConfig = function (B) {
      a.each(B, function (A, O) {
        A in G && a.pref(A, O)
      });
      a.extend(true, f, B);
      if (B.extensions) f.extensions = B.extensions
    };
    s.setCustomHandlers = function (B) {
      s.ready(function () {
        if (B.open) {
          a('#tool_open > input[type="file"]').remove();
          a("#tool_open").show();
          l.open = B.open
        }
        if (B.save) {
          s.show_save_warning = false;
          l.bind("saved", B.save)
        }
        B.pngsave && l.bind("exported", B.pngsave);
        n = B
      })
    };
    s.randomizeIds = function () {
      l.randomizeIds(arguments)
    };
    s.init = function () {
      function B(g,
      p) {
        var D = g.id,
          J = D.split("_"),
          M = J[0];
        J = J[1];
        p && l.setStrokeAttr("stroke-" + M, J);
        Ua();
        t("#cur_" + M, D, 20);
        a(g).addClass("current").siblings().removeClass("current")
      }
      function A(g, p) {
        a.pref("bkgd_color", g);
        a.pref("bkgd_url", p);
        l.setBackground(g, p)
      }
      function O() {
        var g = l.getHref(ja);
        g = g.indexOf("data:") === 0 ? "" : g;
        a.prompt(k.notification.enterNewImgURL, g, function (p) {
          p && Bb(p)
        })
      }
      function Z() {
        if (l.deleteCurrentLayer()) {
          Na();
          $a();
          a("#layerlist tr.layer").removeClass("layersel");
          a("#layerlist tr.layer:first").addClass("layersel")
        }
      }

      function N() {
        var g = l.getCurrentDrawing().getCurrentLayerName() + " copy";
        a.prompt(k.notification.enterUniqueLayerName, g, function (p) {
          if (p) if (l.getCurrentDrawing().hasLayer(p)) a.alert(k.notification.dupeLayerName);
          else {
            l.cloneLayer(p);
            Na();
            $a()
          }
        })
      }
      function L(g) {
        var p = a("#layerlist tr.layersel").index(),
          D = l.getCurrentDrawing().getNumLayers();
        if (p > 0 || p < D - 1) {
          p += g;
          l.setCurrentLayerPosition(D - p - 1);
          $a()
        }
      }
      function na(g, p) {
        p || (p = l.getZoom());
        g || (g = a("#svgcanvas"));
        for (var D = l.getContentElem(), J = svgedit.units.getTypeMap()[f.baseUnit],
        M = 0; M < 2; M++) {
          var Q = M === 0,
            U = Q ? "x" : "y",
            X = Q ? "width" : "height",
            ga = D.getAttribute(U) - 0;
          U = a("#ruler_" + U + " canvas:first");
          $hcanv = U.clone();
          U.replaceWith($hcanv);
          var ea = $hcanv[0];
          var ka = U = g[X]();
          ea.parentNode.style[X] = ka + "px";
          var ya = 0,
            Da, S = ea.getContext("2d");
          S.fillStyle = "rgb(200,0,0)";
          S.fillRect(0, 0, ea.width, ea.height);
          $hcanv.siblings().remove();
          if (U >= 3E4) {
            var Aa = parseInt(U / 3E4) + 1;
            Da = Array(Aa);
            Da[0] = S;
            for (var fa = 1; fa < Aa; fa++) {
              ea[X] = 3E4;
              var ta = ea.cloneNode(true);
              ea.parentNode.appendChild(ta);
              Da[fa] = ta.getContext("2d")
            }
            ta[X] = U % 3E4;
            U = 3E4
          }
          ea[X] = U;
          X = J * p;
          var Ea = 50 / X;
          ea = 1;
          for (fa = 0; fa < $b.length; fa++) {
            ea = Aa = $b[fa];
            if (Ea <= Aa) break
          }
          Ea = ea * X;
          S.font = "9px sans-serif";
          for (var Ka = ga / X % ea * X, Ma = Ka - Ea; Ka < ka; Ka += Ea) {
            Ma += Ea;
            fa = Math.round(Ka) + 0.5;
            if (Q) {
              S.moveTo(fa, 15);
              S.lineTo(fa, 0)
            } else {
              S.moveTo(15, fa);
              S.lineTo(0, fa)
            }
            Aa = (Ma - ga) / X;
            if (ea >= 1) fa = Math.round(Aa);
            else {
              fa = (ea + "").split(".")[1].length;
              fa = Aa.toFixed(fa) - 0
            }
            if (fa !== 0 && fa !== 1E3 && fa % 1E3 === 0) fa = fa / 1E3 + "K";
            if (Q) S.fillText(fa, Ka + 2, 8);
            else {
              Aa = (fa + "").split("");
              for (fa = 0; fa < Aa.length; fa++) S.fillText(Aa[fa],
              1, Ka + 9 + fa * 9)
            }
            Aa = Ea / 10;
            for (fa = 1; fa < 10; fa++) {
              var Ba = Math.round(Ka + Aa * fa) + 0.5;
              if (Da && Ba > U) {
                ya++;
                S.stroke();
                if (ya >= Da.length) {
                  fa = 10;
                  Ka = ka;
                  continue
                }
                S = Da[ya];
                Ka -= 3E4;
                Ba = Math.round(Ka + Aa * fa) + 0.5
              }
              var ab = fa % 2 ? 12 : 10;
              if (Q) {
                S.moveTo(Ba, 15);
                S.lineTo(Ba, ab)
              } else {
                S.moveTo(15, Ba);
                S.lineTo(ab, Ba)
              }
            }
          }
          S.strokeStyle = "#000";
          S.stroke()
        }
      }(function () {
        var g = window.opener;
        if (g) try {
          var p = g.document.createEvent("Event");
          p.initEvent("svgEditorReady", true, true);
          g.document.documentElement.dispatchEvent(p)
        } catch (D) {}
      })();
      (function () {
        var g = a.deparam.querystring(true);
        if (a.isEmptyObject(g))(g = window.localStorage.getItem("svgedit-" + s.curConfig.canvasName)) && s.loadFromString(g);
        else {
          if (g.dimensions) g.dimensions = g.dimensions.split(",");
          if (g.extensions) g.extensions = g.extensions.split(",");
          if (g.bkgd_color) g.bkgd_color = "#" + g.bkgd_color;
          svgEditor.setConfig(g);
          var p = g.source,
            D = a.param.querystring();
          if (!p) if (D.indexOf("source=data:") >= 0) p = D.match(/source=(data:[^&]*)/)[1];
          if (p) if (p.indexOf("data:") === 0) {
            p = p.replace(/ /g, "+");
            s.loadFromDataURI(p)
          } else s.loadFromString(p);
          else if (D.indexOf("paramurl=") !== -1) svgEditor.loadFromURL(D.substr(9));
          else g.url && svgEditor.loadFromURL(g.url)
        }
      })();
      var ca = function () {
        a.each(f.extensions, function () {
          var p = this;
          a.getScript(f.extPath + p, function (D) {
            if (!D) {
              D = document.createElement("script");
              D.src = f.extPath + p;
              document.querySelector("head").appendChild(D)
            }
          })
        });
        var g = [];
        a("#lang_select option").each(function () {
          g.push(this.value)
        });
        s.putLocale(null, g)
      };
      document.location.protocol === "file:" ? setTimeout(ca, 100) : ca();
      a.svgIcons(f.imgPath + "svg_edit_icons.svg", {
        w: 24,
        h: 24,
        id_match: false,
        no_img: !svgedit.browser.isWebkit(),
        fallback_path: f.imgPath,
        fallback: {
          new_image: "clear.png",
          save: "save.png",
          open: "open.png",
          source: "source.png",
          docprops: "document-properties.png",
          wireframe: "wireframe.png",
          undo: "undo.png",
          redo: "redo.png",
          select: "select.png",
          select_node: "select_node.png",
          pencil: "fhpath.png",
          pen: "line.png",
          square: "square.png",
          rect: "rect.png",
          fh_rect: "freehand-square.png",
          circle: "circle.png",
          ellipse: "ellipse.png",
          fh_ellipse: "freehand-circle.png",
          path: "path.png",
          text: "text.png",
          image: "image.png",
          zoom: "zoom.png",
          clone: "clone.png",
          node_clone: "node_clone.png",
          "delete": "delete.png",
          node_delete: "node_delete.png",
          group: "shape_group.png",
          ungroup: "shape_ungroup.png",
          move_top: "move_top.png",
          move_bottom: "move_bottom.png",
          to_path: "to_path.png",
          link_controls: "link_controls.png",
          reorient: "reorient.png",
          align_left: "align-left.png",
          align_center: "align-center",
          align_right: "align-right",
          align_top: "align-top",
          align_middle: "align-middle",
          align_bottom: "align-bottom",
          go_up: "go-up.png",
          go_down: "go-down.png",
          ok: "save.png",
          cancel: "cancel.png",
          arrow_right: "flyouth.png",
          arrow_down: "dropdown.gif"
        },
        placement: {
          "#logo": "logo",
          "#tool_clear div,#layer_new": "new_image",
          "#tool_save div": "save",
          "#tool_export div": "export",
          "#tool_open div div": "open",
          "#tool_import div div": "import",
          "#tool_source": "source",
          "#tool_docprops > div": "docprops",
          "#tool_wireframe": "wireframe",
          "#tool_undo": "undo",
          "#tool_redo": "redo",
          "#tool_select": "select",
          "#tool_fhpath": "pencil",
          "#tool_line": "pen",
          "#tool_rect,#tools_rect_show": "rect",
          "#tool_square": "square",
          "#tool_fhrect": "fh_rect",
          "#tool_ellipse,#tools_ellipse_show": "ellipse",
          "#tool_circle": "circle",
          "#tool_fhellipse": "fh_ellipse",
          "#tool_path": "path",
          "#tool_text,#layer_rename": "text",
          "#tool_image": "image",
          "#tool_zoom": "zoom",
          "#tool_clone,#tool_clone_multi": "clone",
          "#tool_node_clone": "node_clone",
          "#layer_delete,#tool_delete,#tool_delete_multi": "delete",
          "#tool_node_delete": "node_delete",
          "#tool_add_subpath": "add_subpath",
          "#tool_openclose_path": "open_path",
          "#tool_move_top": "move_top",
          "#tool_move_bottom": "move_bottom",
          "#tool_topath": "to_path",
          "#tool_node_link": "link_controls",
          "#tool_reorient": "reorient",
          "#tool_group": "group",
          "#tool_ungroup": "ungroup",
          "#tool_unlink_use": "unlink_use",
          "#tool_alignleft, #tool_posleft": "align_left",
          "#tool_aligncenter, #tool_poscenter": "align_center",
          "#tool_alignright, #tool_posright": "align_right",
          "#tool_aligntop, #tool_postop": "align_top",
          "#tool_alignmiddle, #tool_posmiddle": "align_middle",
          "#tool_alignbottom, #tool_posbottom": "align_bottom",
          "#cur_position": "align",
          "#linecap_butt,#cur_linecap": "linecap_butt",
          "#linecap_round": "linecap_round",
          "#linecap_square": "linecap_square",
          "#linejoin_miter,#cur_linejoin": "linejoin_miter",
          "#linejoin_round": "linejoin_round",
          "#linejoin_bevel": "linejoin_bevel",
          "#url_notice": "warning",
          "#layer_up": "go_up",
          "#layer_down": "go_down",
          "#layer_moreopts": "context_menu",
          "#layerlist td.layervis": "eye",
          "#tool_source_save,#tool_docprops_save,#tool_prefs_save": "ok",
          "#tool_source_cancel,#tool_docprops_cancel,#tool_prefs_cancel": "cancel",
          "#rwidthLabel, #iwidthLabel": "width",
          "#rheightLabel, #iheightLabel": "height",
          "#cornerRadiusLabel span": "c_radius",
          "#angleLabel": "angle",
          "#linkLabel,#tool_make_link,#tool_make_link_multi": "globe_link",
          "#zoomLabel": "zoom",
          "#tool_fill label": "fill",
          "#tool_stroke .icon_label": "stroke",
          "#group_opacityLabel": "opacity",
          "#blurLabel": "blur",
          "#font_sizeLabel": "fontsize",
          ".flyout_arrow_horiz": "arrow_right",
          ".dropdown button, #main_button .dropdown": "arrow_down",
          "#palette .palette_item:first, #fill_bg, #stroke_bg": "no_color"
        },
        resize: {
          "#logo .svg_icon": 28,
          ".flyout_arrow_horiz .svg_icon": 5,
          ".layer_button .svg_icon, #layerlist td.layervis .svg_icon": 14,
          ".dropdown button .svg_icon": 7,
          "#main_button .dropdown .svg_icon": 9,
          ".palette_item:first .svg_icon": 15,
          "#fill_bg .svg_icon, #stroke_bg .svg_icon": 16,
          ".toolbar_button button .svg_icon": 16,
          ".stroke_tool div div .svg_icon": 20,
          "#tools_bottom label .svg_icon": 18
        },
        callback: function () {
          a(".toolbar_button button > svg, .toolbar_button button > img").each(function () {
            a(this).parent().prepend(this)
          });
          var g = a("#tools_left");
          if (g.length != 0) {
            g.offset();
            g.outerHeight()
          }
          a(".tools_flyout").each(function () {
            var p = a("#" + this.id + "_show"),
              D = p.attr("data-curopt");
            if (!p.children("svg, img").length) {
              D = a(D).children().clone();
              if (D.length) {
                D[0].removeAttribute("style");
                p.append(D)
              }
            }
          });
          svgEditor.runCallbacks();
          setTimeout(function () {
            a(".flyout_arrow_horiz:empty").each(function () {
              a(this).append(a.getSvgIcon("arrow_right").width(5).height(5))
            })
          }, 1)
        }
      });
      s.canvas = l = new a.SvgCanvas(document.getElementById("svgcanvas"), f);
      s.show_save_warning = false;
      ca = navigator.platform.indexOf("Mac") >= 0;
      var oa = navigator.userAgent.indexOf("AppleWebKit") >= 0,
        pa = ca ? "meta+" : "ctrl+",
        ia = l.pathActions,
        da = l.undoMgr,
        Ya = svgedit.utilities,
        kb = f.imgPath + "logo.png",
        ba = a("#workarea"),
        sb = a("#cmenu_canvas");
      a("#cmenu_layers");
      var ib = null,
        lb = 1,
        Tb = "crosshair",
        bb = "crosshair",
        va = "toolbars",
        Ga = "",
        Oa = {
          fill: null,
          stroke: null
        };
      (function () {
        a("#dialog_container").draggable({
          cancel: "#dialog_content, #dialog_buttons *",
          containment: "window"
        });
        var g = a("#dialog_box"),
          p = a("#dialog_buttons"),
          D = function (J, M, Q, U) {
            a("#dialog_content").html("<p>" + M.replace(/\n/g, "</p><p>") + "</p>").toggleClass("prompt", J == "prompt");
            p.empty();
            var X = a('<input type="button" value="' + k.common.ok + '">').appendTo(p);
            J != "alert" && a('<input type="button" value="' + k.common.cancel + '">').appendTo(p).click(function () {
              g.hide();
              Q(false)
            });
            if (J == "prompt") {
              var ga = a('<input type="text">').prependTo(p);
              ga.val(U || "");
              ga.bind("keydown", "return", function () {
                X.click()
              })
            }
            J == "process" && X.hide();
            g.show();
            X.click(function () {
              g.hide();
              var ea = J == "prompt" ? ga.val() : true;
              Q && Q(ea)
            }).focus();
            J == "prompt" && ga.focus()
          };
        a.alert = function (J, M) {
          D("alert", J, M)
        };
        a.confirm = function (J, M) {
          D("confirm", J, M)
        };
        a.process_cancel = function (J, M) {
          D("process", J, M)
        };
        a.prompt = function (J, M, Q) {
          D("prompt", J, Q, M)
        }
      })();
      var hb = function () {
        var g = a(".tool_button_current");
        if (g.length && g[0].id !== "tool_select") {
          g.removeClass("tool_button_current").addClass("tool_button");
          a("#tool_select").addClass("tool_button_current").removeClass("tool_button");
          a("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all} #svgcanvas svg{cursor:default}")
        }
        l.setMode("select");
        ba.css("cursor", "auto")
      }, ja = null,
        Ca = false,
        Ha = false,
        Pa = false,
        Ia = false,
        ua = "",
        ma = a("title:first").text(),
        ra = l.zoomChanged = function (g, p, D) {
          l.getResolution();
          a("#svgcanvas").position();
          if (p = l.setBBoxZoom(p, ba.width() - 15, ba.height() - 15)) {
            g = p.zoom;
            p = p.bbox;
            if (g < 0.001) sa({
              value: 0.1
            });
            else {
              a("#zoom").val(g * 100);
              D ? qb() : qb(false, {
                x: p.x * g + p.width * g / 2,
                y: p.y * g + p.height * g / 2
              });
              l.getMode() == "zoom" && p.width && hb();
              d()
            }
          }
        };
      a("#cur_context_panel").delegate("a", "click", function () {
        var g = a(this);
        g.attr("data-root") ? l.leaveContext() : l.setContext(g.text());
        l.clearSelection();
        return false
      });
      var la = {}, ub = function (g) {
        a.each(g, function (p, D) {
          var J = a(p).children(),
            M = p + "_show",
            Q = a(M),
            U = false;
          J.addClass("tool_button").unbind("click mousedown mouseup").each(function (ea) {
            var ka = D[ea];
            la[ka.sel] = ka.fn;
            if (ka.isDefault) U = ea;
            ea = function (ya) {
              var Da = ka;
              if (ya.type === "keydown") {
                var S = a(Da.parent + "_show").hasClass("tool_button_current"),
                  Aa = a(Da.parent + "_show").attr("data-curopt");
                a.each(g[ka.parent], function (ta, Ea) {
                  if (Ea.sel == Aa) Da = !ya.shiftKey || !S ? Ea : g[ka.parent][ta + 1] || g[ka.parent][0]
                })
              }
              if (a(this).hasClass("disabled")) return false;
              La(M) && Da.fn();
              var fa = Da.icon ? a.getSvgIcon(Da.icon, true) : a(Da.sel).children().eq(0).clone();
              fa[0].setAttribute("width", Q.width());
              fa[0].setAttribute("height", Q.height());
              Q.children(":not(.flyout_arrow_horiz)").remove();
              Q.append(fa).attr("data-curopt", Da.sel)
            };
            a(this).mouseup(ea);
            ka.key && a(document).bind("keydown", ka.key[0] + " shift+" + ka.key[0], ea)
          });
          if (U) Q.attr("data-curopt", D[U].sel);
          else Q.attr("data-curopt") || Q.attr("data-curopt", D[0].sel);
          var X, ga = a(M).position();
          a(p).css({
            left: ga.left + 34,
            top: ga.top + 40
          });
          Q.mousedown(function (ea) {
            if (Q.hasClass("disabled")) return false;
            var ka = a(p),
              ya = ga.left + 34,
              Da = ka.width() * -1,
              S = ka.data("shown_popop") ? 200 : 0;
            X = setTimeout(function () {
              Q.data("isLibrary") ? ka.css("left", ya).show() : ka.css("left", Da).show().animate({
                left: ya
              }, 150);
              ka.data("shown_popop", true)
            }, S);
            ea.preventDefault()
          }).mouseup(function () {
            clearTimeout(X);
            var ea = a(this).attr("data-curopt");
            if (Q.data("isLibrary") && a(M.replace("_show", "")).is(":visible")) La(M, true);
            else La(M) && ea in la && la[ea]()
          })
        });
        Ib()
      }, Hb = function (g, p) {
        return a("<div>", {
          "class": "tools_flyout",
          id: g
        }).appendTo("#svg_editor").append(p)
      }, Ab = function () {
        a(".tools_flyout").each(function () {
          var g = a("#" + this.id + "_show"),
            p = g.offset();
          g = g.outerWidth();
          a(this).css({
            left: (p.left + g) * lb,
            top: p.top
          })
        })
      }, Ib = function () {
        a(".tools_flyout").each(function () {
          var g = a("#" + this.id + "_show");
          if (!g.data("isLibrary")) {
            var p = [];
            a(this).children().each(function () {
              p.push(this.title)
            });
            g[0].title = p.join(" / ")
          }
        })
      }, tb, Jb = function (g, p, D) {
        var J = null;
        if (g.indexOf("url(#") === 0) {
          g = (g = l.getRefElem(g)) ? g.cloneNode(true) : a("#" + D + "_color defs *")[0];
          J = {
            alpha: p
          };
          J[g.tagName] = g
        } else J = g.indexOf("#") === 0 ? {
          alpha: p,
          solidColor: g.substr(1)
        } : {
          alpha: p,
          solidColor: "none"
        };
        return new a.jGraduate.Paint(J)
      }, Bb = s.setImageURL = function (g) {
        g || (g = kb);
        l.setImageURL(g);
        a("#image_url").val(g);
        if (g.indexOf("data:") === 0) {
          a("#image_url").hide();
          a("#change_image_url").show()
        } else {
          l.embedImage(g, function (p) {
            p ? a("#url_notice").hide() : a("#url_notice").show();
            kb = g
          });
          a("#image_url").show();
          a("#change_image_url").hide()
        }
      }, Kb = function (g) {
        var p = Math.min(Math.max(12 + g.value.length * 6, 50), 300);
        a(g).width(p)
      }, Na = function () {
        var g = ja;
        if (g != null && !g.parentNode) g = null;
        var p = l.getCurrentDrawing().getCurrentLayerName(),
          D = l.getMode(),
          J = f.baseUnit !== "px" ? f.baseUnit : null,
          M = D == "pathedit",
          Q = a("#cmenu_canvas li");
        a("#selected_panel, #multiselected_panel, #g_panel, #rect_panel, #circle_panel,\t\t\t\t\t#ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel").hide();
        if (g != null) {
          var U = g.nodeName,
            X = l.getRotationAngle(g);
          a("#angle").val(X);
          var ga = l.getBlur(g);
          a("#blur").val(ga);
          a("#blur_slider").slider("option", "value", ga);
          l.addedNew && U === "image" && l.getHref(g).indexOf("data:") !== 0 && O();
          if (!M && D != "pathedit") {
            a("#selected_panel").show();
            if (["line", "circle", "ellipse"].indexOf(U) >= 0) a("#xy_panel").hide();
            else {
              var ea, ka;
              if (["g", "polyline", "path"].indexOf(U) >= 0) {
                if (D = l.getStrokedBBox([g])) {
                  ea = D.x;
                  ka = D.y
                }
              } else {
                ea = g.getAttribute("x");
                ka = g.getAttribute("y")
              }
              if (J) {
                ea = svgedit.units.convertUnit(ea);
                ka = svgedit.units.convertUnit(ka)
              }
              a("#selected_x").val(ea || 0);
              a("#selected_y").val(ka || 0);
              a("#xy_panel").show()
            }
            J = ["image", "text", "path", "g", "use"].indexOf(U) == -1;
            a("#tool_topath").toggle(J);
            a("#tool_reorient").toggle(U == "path");
            a("#tool_reorient").toggleClass("disabled", X == 0)
          } else {
            p = ia.getNodePoint();
            a("#tool_add_subpath").removeClass("push_button_pressed").addClass("tool_button");
            a("#tool_node_delete").toggleClass("disabled", !ia.canDeleteNodes);
            t("#tool_openclose_path", ia.closed_subpath ? "open_path" :
              "close_path");
            if (p) {
              M = a("#seg_type");
              if (J) {
                p.x = svgedit.units.convertUnit(p.x);
                p.y = svgedit.units.convertUnit(p.y)
              }
              a("#path_node_x").val(p.x);
              a("#path_node_y").val(p.y);
              p.type ? M.val(p.type).removeAttr("disabled") : M.val(4).attr("disabled", "disabled")
            }
            return
          }
          J = {
            g: [],
            a: [],
            rect: ["rx", "width", "height"],
            image: ["width", "height"],
            circle: ["cx", "cy", "r"],
            ellipse: ["cx", "cy", "rx", "ry"],
            line: ["x1", "y1", "x2", "y2"],
            text: [],
            use: []
          };
          var ya = g.tagName;
          U = null;
          if (ya === "a") {
            U = l.getHref(g);
            a("#g_panel").show()
          }
          if (g.parentNode.tagName ===
            "a") if (!a(g).siblings().length) {
            a("#a_panel").show();
            U = l.getHref(g.parentNode)
          }
          a("#tool_make_link, #tool_make_link").toggle(!U);
          U && a("#link_url").val(U);
          if (J[ya]) {
            J = J[ya];
            a("#" + ya + "_panel").show();
            a.each(J, function (Da, S) {
              var Aa = g.getAttribute(S);
              if (f.baseUnit !== "px" && g[S]) Aa = svgedit.units.convertUnit(g[S].baseVal.value);
              a("#" + ya + "_" + S).val(Aa || 0)
            });
            if (ya == "text") {
              a("#text_panel").css("display", "inline");
              l.getItalic() ? a("#tool_italic").addClass("push_button_pressed").removeClass("tool_button") : a("#tool_italic").removeClass("push_button_pressed").addClass("tool_button");
              l.getBold() ? a("#tool_bold").addClass("push_button_pressed").removeClass("tool_button") : a("#tool_bold").removeClass("push_button_pressed").addClass("tool_button");
              a("#font_family").val(g.getAttribute("font-family"));
              a("#font_size").val(g.getAttribute("font-size"));
              a("#text").val(g.textContent);
              l.addedNew && setTimeout(function () {
                a("#text").focus().select()
              }, 100)
            } else if (ya == "image") Bb(l.getHref(g));
            else if (ya === "g" || ya === "use") {
              a("#container_panel").show();
              J = l.getTitle();
              U = a("#g_title")[0];
              U.value = J;
              Kb(U);
              ya == "use" ? U.setAttribute("disabled", "disabled") : U.removeAttribute("disabled")
            }
          }
          Q[(ya === "g" ? "en" : "dis") + "ableContextMenuItems"]("#ungroup");
          Q[(ya === "g" || !Ca ? "dis" : "en") + "ableContextMenuItems"]("#group")
        } else if (Ca) {
          a("#multiselected_panel").show();
          Q.enableContextMenuItems("#group").disableContextMenuItems("#ungroup")
        } else Q.disableContextMenuItems("#delete,#cut,#copy,#group,#ungroup,#move_front,#move_up,#move_down,#move_back");
        da.getUndoStackSize() > 0 ? a("#tool_undo").removeClass("disabled") : a("#tool_undo").addClass("disabled");
        da.getRedoStackSize() > 0 ? a("#tool_redo").removeClass("disabled") : a("#tool_redo").addClass("disabled");
        l.addedNew = false;
        if (g && !M || Ca) {
          a("#selLayerNames").removeAttr("disabled").val(p);
          sb.enableContextMenuItems("#delete,#cut,#copy,#move_front,#move_up,#move_down,#move_back")
        } else a("#selLayerNames").attr("disabled", "disabled")
      };
      a("#text").focus(function () {});
      a("#text").blur(function () {});
      l.bind("selected", function (g, p) {
        var D = l.getMode();
        D === "select" && hb();
        D = D == "pathedit";
        ja = p.length == 1 || p[1] == null ? p[0] : null;
        Ca = p.length >= 2 && p[1] != null;
        if (ja != null) if (!D) {
          if (ja != null) switch (ja.tagName) {
            case "use":
            case "image":
            case "foreignObject":
              break;
            case "g":
            case "a":
              for (var J = null, M = ja.getElementsByTagName("*"), Q = 0, U = M.length; Q < U; Q++) {
                var X = M[Q].getAttribute("stroke-width");
                if (Q === 0) J = X;
                else if (J !== X) J = null
              }
              a("#stroke_width").val(J === null ? "" : J);
              Oa.fill.update(true);
              Oa.stroke.update(true);
              break;
            default:
              Oa.fill.update(true);
              Oa.stroke.update(true);
              a("#stroke_width").val(ja.getAttribute("stroke-width") || 1);
              a("#stroke_style").val(ja.getAttribute("stroke-dasharray") ||
                "none");
              J = ja.getAttribute("stroke-linejoin") || "miter";
              a("#linejoin_" + J).length != 0 && B(a("#linejoin_" + J)[0]);
              J = ja.getAttribute("stroke-linecap") || "butt";
              a("#linecap_" + J).length != 0 && B(a("#linecap_" + J)[0])
          }
          if (ja != null) {
            J = (ja.getAttribute("opacity") || 1) * 100;
            a("#group_opacity").val(J);
            a("#opac_slider").slider("option", "value", J);
            a("#elem_id").val(ja.id)
          }
          fb()
        }
        a("#path_node_panel").toggle(D);
        a("#tools_bottom_2,#tools_bottom_3").toggle(!D);
        if (D) {
          a(".tool_button_current").removeClass("tool_button_current").addClass("tool_button");
          a("#tool_select").addClass("tool_button_current").removeClass("tool_button");
          t("#tool_select", "select_node");
          Ca = false;
          if (p.length) ja = p[0]
        } else t("#tool_select", "select");
        Na();
        l.runExtensions("selectedChanged", {
          elems: p,
          selectedElement: ja,
          multiselected: Ca
        })
      });
      l.bind("transition", function (g, p) {
        var D = l.getMode(),
          J = p[0];
        if (J) {
          Ca = p.length >= 2 && p[1] != null;
          if (!Ca) switch (D) {
            case "rotate":
              D = l.getRotationAngle(J);
              a("#angle").val(D);
              a("#tool_reorient").toggleClass("disabled", D == 0)
          }
          l.runExtensions("elementTransition", {
            elems: p
          })
        }
      });
      l.bind("changed", function (g, p) {
        var D = l.getMode();
        D === "select" && hb();
        for (var J = 0; J < p.length; ++J) {
          var M = p[J];
          if (M && M.tagName === "svg") {
            $a();
            qb()
          } else if (M && ja && ja.parentNode == null) ja = M
        }
        s.show_save_warning = true;
        Na();
        if (ja && D === "select") {
          Oa.fill.update();
          Oa.stroke.update()
        }
        l.runExtensions("elementChanged", {
          elems: p
        })
      });
      l.bind("saved", function (g, p) {
        s.show_save_warning = false;
        p = '<?xml version="1.0"?>\n' + p;
        var D = navigator.userAgent;
        if (~D.indexOf("Chrome") && a.browser.version >= 533 || ~D.indexOf("MSIE")) m(0,
        true);
        else {
          var J = g.open("data:image/svg+xml;base64," + Ya.encode64(p)),
            M = a.pref("save_notice_done");
          if (M !== "all") {
            var Q = k.notification.saveFromBrowser.replace("%s", "SVG");
            if (D.indexOf("Gecko/") !== -1) if (p.indexOf("<defs") !== -1) {
              Q += "\n\n" + k.notification.defsFailOnSave;
              a.pref("save_notice_done", "all");
              M = "all"
            } else a.pref("save_notice_done", "part");
            else a.pref("save_notice_done", "all");
            M !== "part" && J.alert(Q)
          }
        }
      });
      l.bind("exported", function (g, p) {
        var D = p.issues;
        a("#export_canvas").length || a("<canvas>", {
          id: "export_canvas"
        }).hide().appendTo("body");
        var J = a("#export_canvas")[0];
        J.width = l.contentW;
        J.height = l.contentH;
        canvg(J, p.svg, {
          renderCallback: function () {
            var M = J.toDataURL("image/png");
            ib.location.href = M;
            if (a.pref("export_notice_done") !== "all") {
              M = k.notification.saveFromBrowser.replace("%s", "PNG");
              if (D.length) M += "\n\n" + k.notification.noteTheseIssues + "\n \u2022 " + D.join("\n \u2022 ");
              a.pref("export_notice_done", "all");
              ib.alert(M)
            }
          }
        })
      });
      l.bind("zoomed", ra);
      l.bind("contextset", function (g, p) {
        var D = "";
        if (p) {
          var J = "";
          D = '<a href="#" data-root="y">' + l.getCurrentDrawing().getCurrentLayerName() + "</a>";
          a(p).parentsUntil("#svgcontent > g").andSelf().each(function () {
            if (this.id) {
              J += " > " + this.id;
              D += this !== p ? ' > <a href="#">' + this.id + "</a>" : " > " + this.id
            }
          });
          ua = J
        } else ua = null;
        a("#cur_context_panel").toggle( !! p).html(D);
        q()
      });
      l.bind("extension_added", function (g, p) {
        function D() {
          if (tb) {
            clearTimeout(tb);
            tb = null
          }
          M || (tb = setTimeout(function () {
            M = true;
            H(e.iconsize)
          }, 50))
        }
        var J = false,
          M = false,
          Q = true,
          U = function () {
            if (p.callback && !J && Q) {
              J = true;
              p.callback()
            }
          }, X = [];
        p.context_tools && a.each(p.context_tools, function (Da, S) {
          var Aa = S.container_id ? ' id="' + S.container_id + '"' : "",
            fa = a("#" + S.panel);
          fa.length || (fa = a("<div>", {
            id: S.panel
          }).appendTo("#tools_top"));
          switch (S.type) {
            case "tool_button":
              var ta = '<div class="tool_button">' + S.id + "</div>",
                Ea = a(ta).appendTo(fa);
              S.events && a.each(S.events, function (Ba, ab) {
                a(Ea).bind(Ba, ab)
              });
              break;
            case "select":
              ta = "<label" + Aa + '><select id="' + S.id + '">';
              a.each(S.options, function (Ba, ab) {
                ta += '<option value="' + Ba + '"' + (Ba == S.defval ? " selected" :
                  "") + ">" + ab + "</option>"
              });
              ta += "</select></label>";
              var Ka = a(ta).appendTo(fa).find("select");
              a.each(S.events, function (Ba, ab) {
                a(Ka).bind(Ba, ab)
              });
              break;
            case "button-select":
              ta = '<div id="' + S.id + '" class="dropdown toolset" title="' + S.title + '"><div id="cur_' + S.id + '" class="icon_label"></div><button></button></div>';
              Aa = a('<ul id="' + S.id + '_opts"></ul>').appendTo("#option_lists");
              S.colnum && Aa.addClass("optcols" + S.colnum);
              a(ta).appendTo(fa).children();
              X.push({
                elem: "#" + S.id,
                list: "#" + S.id + "_opts",
                title: S.title,
                callback: S.events.change,
                cur: "#cur_" + S.id
              });
              break;
            case "input":
              ta = "<label" + Aa + '><span id="' + S.id + '_label">' + S.label + ':</span><input id="' + S.id + '" title="' + S.title + '" size="' + (S.size || "4") + '" value="' + (S.defval || "") + '" type="text"/></label>';
              var Ma = a(ta).appendTo(fa).find("input");
              S.spindata && Ma.SpinButton(S.spindata);
              S.events && a.each(S.events, function (Ba, ab) {
                Ma.bind(Ba, ab)
              })
          }
        });
        if (p.buttons) {
          var ga = {}, ea = {}, ka = p.svgicons,
            ya = {};
          a.each(p.buttons, function (Da, S) {
            for (var Aa, fa = S.id, ta = Da; a("#" + fa).length;) fa = S.id + "_" + ++ta;
            if (ka) {
              ga[fa] = S.icon;
              ta = S.svgicon ? S.svgicon : S.id;
              if (S.type == "app_menu") ea["#" + fa + " > div"] = ta;
              else ea["#" + fa] = ta
            } else Aa = a('<img src="' + S.icon + '">');
            var Ea, Ka;
            switch (S.type) {
              case "mode_flyout":
              case "mode":
                Ea = "tool_button";
                Ka = "#tools_left";
                break;
              case "context":
                Ea = "tool_button";
                Ka = "#" + S.panel;
                a(Ka).length || a("<div>", {
                  id: S.panel
                }).appendTo("#tools_top");
                break;
              case "app_menu":
                Ea = "";
                Ka = "#main_menu ul"
            }
            var Ma = a(S.list || S.type == "app_menu" ? "<li/>" : "<div/>").attr("id", fa).attr("title", S.title).addClass(Ea);
            if (!S.includeWith && !S.list) {
              "position" in S ? a(Ka).children().eq(S.position).before(Ma) : Ma.appendTo(Ka);
              if (S.type == "mode_flyout") {
                ta = a(Ma);
                Ea = ta.parent();
                if (!ta.parent().hasClass("tools_flyout")) {
                  var Ba = ta[0].id.replace("tool_", "tools_"),
                    ab = ta.clone().attr("id", Ba + "_show").append(a("<div>", {
                      "class": "flyout_arrow_horiz"
                    }));
                  ta.before(ab);
                  Ea = Hb(Ba, ta);
                  Ea.data("isLibrary", true);
                  ab.data("isLibrary", true)
                }
                ea["#" + Ba + "_show"] = S.id;
                fa = ya["#" + Ea[0].id] = [{
                  sel: "#" + fa,
                  fn: S.events.click,
                  icon: S.id,
                  isDefault: true
                },
                hc]
              } else S.type == "app_menu" && Ma.append("<div>").append(S.title)
            } else if (S.list) {
              Ma.addClass("push_button");
              a("#" + S.list + "_opts").append(Ma);
              if (S.isDefault) {
                a("#cur_" + S.list).append(Ma.children().clone());
                ta = S.svgicon ? S.svgicon : S.id;
                ea["#cur_" + S.list] = ta
              }
            } else if (S.includeWith) {
              Ka = S.includeWith;
              ta = a(Ka.button);
              Ea = ta.parent();
              if (!ta.parent().hasClass("tools_flyout")) {
                Ba = ta[0].id.replace("tool_", "tools_");
                ab = ta.clone().attr("id", Ba + "_show").append(a("<div>", {
                  "class": "flyout_arrow_horiz"
                }));
                ta.before(ab);
                Ea = Hb(Ba, ta)
              }
              var hc = mc.getButtonData(Ka.button);
              if (Ka.isDefault) ea["#" + Ba + "_show"] = S.id;
              fa = ya["#" + Ea[0].id] = [{
                sel: "#" + fa,
                fn: S.events.click,
                icon: S.id,
                key: S.key,
                isDefault: S.includeWith ? S.includeWith.isDefault : 0
              },
              hc];
              Ba = "position" in Ka ? Ka.position : "last";
              hc = Ea.children().length;
              if (!isNaN(Ba) && Ba >= 0 && Ba < hc) Ea.children().eq(Ba).before(Ma);
              else {
                Ea.append(Ma);
                fa.reverse()
              }
            }
            ka || Ma.append(Aa);
            S.list || a.each(S.events, function (ac, bc) {
              if (ac == "click") if (S.type == "mode") {
                S.includeWith ? Ma.bind(ac, bc) : Ma.bind(ac,

                function () {
                  La(Ma) && bc()
                });
                if (S.key) {
                  a(document).bind("keydown", S.key, bc);
                  S.title && Ma.attr("title", S.title + " [" + S.key + "]")
                }
              } else Ma.bind(ac, bc);
              else Ma.bind(ac, bc)
            });
            ub(ya)
          });
          a.each(X, function () {
            wa(this.elem, this.list, this.callback, {
              seticon: true
            })
          });
          if (ka) Q = false;
          a.svgIcons(ka, {
            w: 24,
            h: 24,
            id_match: false,
            no_img: !oa,
            fallback: ga,
            placement: ea,
            callback: function () {
              e.iconsize && e.iconsize != "m" && D();
              Q = true;
              U()
            }
          })
        }
        U()
      });
      l.textActions.setInputElem(a("#text")[0]);
      var xa = '<div class="palette_item" data-rgb="none"></div>';
      a.each(["#000000", "#3f3f3f", "#7f7f7f", "#bfbfbf", "#ffffff", "#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#00ff00", "#00ff7f", "#00ffff", "#007fff", "#0000ff", "#7f00ff", "#ff00ff", "#ff007f", "#7f0000", "#7f3f00", "#7f7f00", "#3f7f00", "#007f00", "#007f3f", "#007f7f", "#003f7f", "#00007f", "#3f007f", "#7f007f", "#7f003f", "#ffaaaa", "#ffd4aa", "#ffffaa", "#d4ffaa", "#aaffaa", "#aaffd4", "#aaffff", "#aad4ff", "#aaaaff", "#d4aaff", "#ffaaff", "#ffaad4"], function (g, p) {
        xa += '<div class="palette_item" style="background-color: ' + p + ';" data-rgb="' + p + '"></div>'
      });
      a("#palette").append(xa);
      xa = "";
      a.each(["#FFF", "#888", "#000"], function () {
        xa += '<div class="color_block" style="background-color:' + this + ';"></div>'
      });
      a("#bg_blocks").append(xa);
      var Qa = a("#bg_blocks div");
      Qa.each(function () {
        a(this).click(function () {
          Qa.removeClass("cur_background");
          a(this).addClass("cur_background")
        })
      });
      if (a.pref("bkgd_color")) A(a.pref("bkgd_color"), a.pref("bkgd_url"));
      else a.pref("bkgd_url") && A(G.bkgd_color, a.pref("bkgd_url"));
      if (a.pref("img_save")) {
        e.img_save = a.pref("img_save");
        a("#image_save_opts input").val([e.img_save])
      }
      var sa = function (g) {
        var p = g.value / 100;
        if (p < 0.001) g.value = 0.1;
        else {
          g = l.getZoom();
          ra(window, {
            width: 0,
            height: 0,
            x: (ba[0].scrollLeft + ba.width() / 2) / g,
            y: (ba[0].scrollTop + ba.height() / 2) / g,
            zoom: p
          }, true)
        }
      }, cb = function (g, p) {
        if (p == null) p = g.value;
        a("#group_opacity").val(p);
        if (!g || !g.handle) a("#opac_slider").slider("option", "value", p);
        l.setOpacity(p / 100)
      }, pb = function (g, p, D) {
        if (p == null) p = g.value;
        a("#blur").val(p);
        var J = false;
        if (!g || !g.handle) {
          a("#blur_slider").slider("option",
            "value", p);
          J = true
        }
        D ? l.setBlurNoUndo(p) : l.setBlur(p, J)
      }, Ua = function () {
        window.opera && a("<p/>").hide().appendTo("body").remove()
      };
      a("#stroke_style").change(function () {
        l.setStrokeAttr("stroke-dasharray", a(this).val());
        Ua()
      });
      a("#stroke_linejoin").change(function () {
        l.setStrokeAttr("stroke-linejoin", a(this).val());
        Ua()
      });
      a("select").change(function () {
        a(this).blur()
      });
      var Sa = false;
      a("#selLayerNames").change(function () {
        var g = this.options[this.selectedIndex].value,
          p = k.notification.QmoveElemsToLayer.replace("%s",
          g),
          D = function (J) {
            if (J) {
              Sa = true;
              l.moveSelectedToLayer(g);
              l.clearSelection();
              $a()
            }
          };
        if (g) Sa ? D(true) : a.confirm(p, D)
      });
      a("#font_family").change(function () {
        l.setFontFamily(this.value)
      });
      a("#seg_type").change(function () {
        l.setSegType(a(this).val())
      });
      a("#text").keyup(function () {
        l.setTextContent(this.value)
      });
      a("#image_url").change(function () {
        Bb(this.value)
      });
      a("#link_url").change(function () {
        this.value.length ? l.setLinkURL(this.value) : l.removeHyperlink()
      });
      a("#g_title").change(function () {
        l.setGroupTitle(this.value)
      });
      a(".attr_changer").change(function () {
        var g = this.getAttribute("data-attr"),
          p = this.value;
        if (!svgedit.units.isValidUnit(g, p, ja)) {
          a.alert(k.notification.invalidAttrValGiven);
          this.value = ja.getAttribute(g);
          return false
        }
        if (g !== "id") if (isNaN(p)) p = l.convertToNum(g, p);
        else if (f.baseUnit !== "px") {
          var D = svgedit.units.getTypeMap();
          if (ja[g] || l.getMode() === "pathedit" || g === "x" || g === "y") p *= D[f.baseUnit]
        }
        if (g === "id") {
          g = ja;
          l.clearSelection();
          g.id = p;
          l.addToSelection([g], true)
        } else l.changeSelectedAttribute(g, p);
        this.blur()
      });
      a("#palette").mouseover(function () {
        var g = a('<input type="hidden">');
        a(this).append(g);
        g.focus().remove()
      });
      a(".palette_item").mousedown(function (g) {
        var p = g.button === 2;
        p = (g = g.shiftKey || p) ? "stroke" : "fill";
        var D = a(this).attr("data-rgb"),
          J = null;
        if (D === "none" || D === "transparent" || D === "initial") {
          D = "none";
          J = new a.jGraduate.Paint
        } else J = new a.jGraduate.Paint({
          alpha: 100,
          solidColor: D.substr(1)
        });
        Oa[p].setPaint(J);
        if (g) {
          l.setColor("stroke", D);
          D != "none" && l.getStrokeOpacity() != 1 && l.setPaintOpacity("stroke", 1)
        } else {
          l.setColor("fill",
          D);
          D != "none" && l.getFillOpacity() != 1 && l.setPaintOpacity("fill", 1)
        }
        fb()
      }).bind("contextmenu", function (g) {
        g.preventDefault()
      });
      a("#toggle_stroke_tools").on("click", function () {
        a("#tools_bottom").toggleClass("expanded")
      });
      var La = function (g, p) {
        if (a(g).hasClass("disabled")) return false;
        if (a(g).parent().hasClass("tools_flyout")) return true;
        var D = D || "normal";
        p || a(".tools_flyout").fadeOut(D);
        a("#styleoverrides").text("");
        ba.css("cursor", "auto");
        a(".tool_button_current").removeClass("tool_button_current").addClass("tool_button");
        a(g).addClass("tool_button_current").removeClass("tool_button");
        return true
      };
      (function () {
        var g = null,
          p = null,
          D = ba[0],
          J = false,
          M = false;
        a("#svgcanvas").bind("mousemove mouseup", function (Q) {
          if (J !== false) {
            D.scrollLeft -= Q.clientX - g;
            D.scrollTop -= Q.clientY - p;
            g = Q.clientX;
            p = Q.clientY;
            if (Q.type === "mouseup") J = false;
            return false
          }
        }).mousedown(function (Q) {
          if (Q.button === 1 || M === true) {
            J = true;
            g = Q.clientX;
            p = Q.clientY;
            return false
          }
        });
        a(window).mouseup(function () {
          J = false
        });
        a(document).bind("keydown", "space", function (Q) {
          l.spaceKey = M = true;
          Q.preventDefault()
        }).bind("keyup", "space", function (Q) {
          Q.preventDefault();
          l.spaceKey = M = false
        }).bind("keydown", "shift", function () {
          l.getMode() === "zoom" && ba.css("cursor", bb)
        }).bind("keyup", "shift", function () {
          l.getMode() === "zoom" && ba.css("cursor", Tb)
        })
      })();
      (function () {
        var g = a("#main_icon"),
          p = a("#main_icon span"),
          D = a("#main_menu"),
          J = false,
          M = 0,
          Q = true,
          U = false;
        a(window).mouseup(function (ga) {
          if (!J) {
            g.removeClass("buttondown");
            if (ga.target.tagName != "INPUT") D.fadeOut(200);
            else if (!U) {
              U = true;
              a(ga.target).click(function () {
                D.css("margin-left",
                  "-9999px").show()
              })
            }
          }
          J = false
        }).mousedown(function (ga) {
          a(ga.target).closest("div.tools_flyout, .contextMenu").length || a(".tools_flyout:visible,.contextMenu").fadeOut(250)
        });
        p.bind("mousedown", function () {
          if (g.hasClass("buttondown")) {
            g.removeClass("buttondown").addClass("buttonup");
            D.fadeOut(200)
          } else {
            g.addClass("buttondown").removeClass("buttonup");
            D.css("margin-left", 0).show();
            M || (M = D.height());
            D.css("height", 0).animate({
              height: M
            }, 200);
            J = true;
            return false
          }
        }).hover(function () {
          J = true
        }).mouseout(function () {
          J = false
        });
        var X = a("#main_menu li");
        X.mouseover(function () {
          Q = a(this).css("background-color") == "rgba(0, 0, 0, 0)";
          X.unbind("mouseover");
          Q && X.mouseover(function () {
            this.style.backgroundColor = "#FFC"
          }).mouseout(function () {
            this.style.backgroundColor = "transparent";
            return true
          })
        })
      })();
      s.addDropDown = function (g, p, D) {
        if (a(g).length != 0) {
          var J = a(g).find("button"),
            M = a(g).find("ul").attr("id", a(g)[0].id + "-list");
          D || a("#option_lists").append(M);
          var Q = false;
          D && a(g).addClass("dropup");
          M.find("li").bind("mouseup", p);
          a(window).mouseup(function () {
            if (!Q) {
              J.removeClass("down");
              M.hide()
            }
            Q = false
          });
          J.bind("mousedown", function () {
            if (J.hasClass("down")) {
              J.removeClass("down");
              M.hide()
            } else {
              J.addClass("down");
              if (!D) {
                var U = a(g).position();
                M.css({
                  top: U.top + 24,
                  left: U.left - 10
                })
              }
              M.show();
              Q = true
            }
          }).hover(function () {
            Q = true
          }).mouseout(function () {
            Q = false
          })
        }
      };
      var wa = function (g, p, D, J) {
        var M = a(g);
        p = a(p);
        var Q = false,
          U = J.dropUp;
        U && a(g).addClass("dropup");
        p.find("li").bind("mouseup", function () {
          if (J.seticon) {
            t("#cur_" + M[0].id, a(this).children());
            a(this).addClass("current").siblings().removeClass("current")
          }
          D.apply(this,
          arguments)
        });
        a(window).mouseup(function () {
          if (!Q) {
            M.removeClass("down");
            p.hide();
            p.css({
              top: 0,
              left: 0
            })
          }
          Q = false
        });
        p.height();
        a(g).bind("mousedown", function () {
          var X = a(g).offset();
          if (U) {
            X.top -= p.height();
            X.left += 8
          } else X.top += a(g).height();
          a(p).offset(X);
          if (M.hasClass("down")) {
            M.removeClass("down");
            p.hide();
            p.css({
              top: 0,
              left: 0
            })
          } else {
            M.addClass("down");
            p.show();
            Q = true;
            return false
          }
        }).hover(function () {
          Q = true
        }).mouseout(function () {
          Q = false
        });
        J.multiclick && p.mousedown(function () {
          Q = true
        })
      };
      s.addDropDown("#font_family_dropdown",

      function () {
        a(this).text();
        a("#font_family").val(a(this).text()).change()
      });
      s.addDropDown("#opacity_dropdown", function () {
        if (!a(this).find("div").length) {
          var g = parseInt(a(this).text().split("%")[0]);
          cb(false, g)
        }
      }, true);
      a("#opac_slider").slider({
        start: function () {
          a("#opacity_dropdown li:not(.special)").hide()
        },
        stop: function () {
          a("#opacity_dropdown li").show();
          a(window).mouseup()
        },
        slide: function (g, p) {
          cb(p)
        }
      });
      s.addDropDown("#blur_dropdown", a.noop);
      var jb = false;
      a("#blur_slider").slider({
        max: 10,
        step: 0.1,
        stop: function (g, p) {
          jb = false;
          pb(p);
          a("#blur_dropdown li").show();
          a(window).mouseup()
        },
        start: function () {
          jb = true
        },
        slide: function (g, p) {
          pb(p, null, jb)
        }
      });
      s.addDropDown("#zoom_dropdown", function () {
        var g = a(this),
          p = g.attr("data-val");
        p ? ra(window, p) : sa({
          value: parseInt(g.text())
        })
      }, true);
      wa("#stroke_linecap", "#linecap_opts", function () {
        B(this, true)
      }, {
        dropUp: true
      });
      wa("#stroke_linejoin", "#linejoin_opts", function () {
        B(this, true)
      }, {
        dropUp: true
      });
      wa("#tool_position", "#position_opts", function () {
        var g = this.id.replace("tool_pos",
          "").charAt(0);
        l.alignSelectedElements(g, "page")
      }, {
        multiclick: true
      });
      (function () {
        var g, p = function () {
          a(g).blur()
        };
        a("#svg_editor").find("button, select, input:not(#text)").focus(function () {
          g = this;
          va = "toolbars";
          ba.mousedown(p)
        }).blur(function () {
          va = "canvas";
          ba.unbind("mousedown", p);
          l.getMode() == "textedit" && a("#text").focus()
        })
      })();
      var Cb = function () {
        if (La("#tool_select")) {
          l.setMode("select");
          a("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all}, #svgcanvas svg{cursor:default}")
        }
      },
      Vb = function () {
        La("#tool_fhpath") && l.setMode("fhpath")
      }, Ub = function () {
        La("#tool_line") && l.setMode("line")
      }, Db = function () {
        La("#tool_square") && l.setMode("square")
      }, Eb = function () {
        La("#tool_rect") && l.setMode("rect")
      }, Wb = function () {
        La("#tool_fhrect") && l.setMode("fhrect")
      }, Lb = function () {
        La("#tool_circle") && l.setMode("circle")
      }, jc = function () {
        La("#tool_ellipse") && l.setMode("ellipse")
      }, cc = function () {
        La("#tool_fhellipse") && l.setMode("fhellipse")
      }, vb = function () {
        La("#tool_image") && l.setMode("image")
      }, db = function () {
        if (La("#tool_zoom")) {
          l.setMode("zoom");
          ba.css("cursor", Tb)
        }
      }, Fa = function () {
        if (La("#tool_zoom")) {
          b();
          hb()
        }
      }, ha = function () {
        La("#tool_text") && l.setMode("text")
      }, rb = function () {
        La("#tool_path") && l.setMode("path")
      }, Nb = function () {
        if (ja != null || Ca) l.deleteSelectedElements()
      }, Ob = function () {
        if (ja != null || Ca) l.cutSelectedElements()
      }, Xb = function () {
        if (ja != null || Ca) l.copySelectedElements()
      }, kc = function () {
        var g = l.getZoom(),
          p = (ba[0].scrollLeft + ba.width() / 2) / g - l.contentW;
        g = (ba[0].scrollTop + ba.height() / 2) / g - l.contentH;
        l.pasteElements("point", p, g)
      }, Fb = function () {
        ja != null && l.moveToTopSelectedElement()
      }, dc = function () {
        ja != null && l.moveToBottomSelectedElement()
      }, Ta = function (g) {
        ja != null && l.moveUpDownSelected(g)
      }, nb = function () {
        ja != null && l.convertToPath()
      }, za = function () {
        ja != null && ia.reorient()
      }, gb = function () {
        if (ja != null || Ca) a.prompt(k.notification.enterNewLinkURL, "http://", function (g) {
          g && l.makeHyperlink(g)
        })
      }, Wa = function (g, p) {
        if (ja != null || Ca) {
          if (f.gridSnapping) {
            var D = l.getZoom() * f.snappingStep;
            g *= D;
            p *= D
          }
          l.moveSelectedElements(g, p)
        }
      }, Pb = function () {
        var g = !a("#tool_node_link").hasClass("push_button_pressed");
        g ? a("#tool_node_link").addClass("push_button_pressed").removeClass("tool_button") : a("#tool_node_link").removeClass("push_button_pressed").addClass("tool_button");
        ia.linkControlPoints(g)
      }, Mb = function () {
        ia.getNodePoint() && ia.clonePathNode()
      }, Ra = function () {
        ia.getNodePoint() && ia.deletePathNode()
      }, qa = function () {
        var g = a("#tool_add_subpath"),
          p = !g.hasClass("push_button_pressed");
        p ? g.addClass("push_button_pressed").removeClass("tool_button") : g.removeClass("push_button_pressed").addClass("tool_button");
        ia.addSubPath(p)
      },
      fc = function () {
        ia.opencloseSubPath()
      }, Rb = function () {
        l.cycleElement(1)
      }, Gb = function () {
        l.cycleElement(0)
      }, yb = function (g, p) {
        if (!(ja == null || Ca)) {
          g || (p *= -1);
          var D = a("#angle").val() * 1 + p;
          l.setRotationAngle(D);
          Na()
        }
      }, gc = function () {
        var g = f.dimensions;
        a.confirm(k.notification.QwantToClear, function (p) {
          if (p) {
            hb();
            l.clear();
            l.setResolution(g[0], g[1]);
            qb(true);
            b();
            $a();
            Na();
            Oa.fill.prep();
            Oa.stroke.prep();
            l.runExtensions("onNewDocument")
          }
        })
      }, zb = function () {
        l.setBold(!l.getBold());
        Na();
        return false
      }, Qb = function () {
        l.setItalic(!l.getItalic());
        Na();
        return false
      }, lc = function () {
        if (!n.pngsave) {
          var g = k.notification.loadingImage;
          ib = window.open("data:text/html;charset=utf-8,<title>" + g + "</title><h1>" + g + "</h1>")
        }
        window.canvg ? l.rasterExport() : a.getScript("canvg/rgbcolor.js", function () {
          a.getScript("canvg/canvg.js", function () {
            l.rasterExport()
          })
        })
      }, xb = function () {
        l.open()
      }, Xa = function () {}, Zb = function () {
        if (da.getUndoStackSize() > 0) {
          da.undo();
          $a()
        }
      }, Sb = function () {
        if (da.getRedoStackSize() > 0) {
          da.redo();
          $a()
        }
      }, ob = function () {
        if (Ca) l.groupSelectedElements();
        else ja && l.ungroupSelectedElement()
      }, Va = function () {
        l.cloneSelectedElements(20, 20)
      }, Yb = function () {
        var g = this.id.replace("tool_align", "").charAt(0);
        l.alignSelectedElements(g, a("#align_relative_to").val())
      }, b = function (g) {
        var p = l.getResolution();
        g = g ? p.zoom * g : 1;
        a("#zoom").val(g * 100);
        l.setZoom(g);
        d();
        qb(true)
      }, c = function () {
        !a("#tool_wireframe").hasClass("push_button_pressed") ? a("#tool_wireframe").addClass("push_button_pressed").removeClass("tool_button") : a("#tool_wireframe").removeClass("push_button_pressed").addClass("tool_button");
        ba.toggleClass("wireframe");
        if (!ec) {
          var g = a("#wireframe_rules");
          g.length ? g.empty() : a('<style id="wireframe_rules"></style>').appendTo("head");
          d()
        }
      }, d = function () {
        if (!ec) {
          var g = "#workarea.wireframe #svgcontent * { stroke-width: " + 1 / l.getZoom() + "px; }";
          a("#wireframe_rules").text(ba.hasClass("wireframe") ? g : "")
        }
      }, m = function (g, p) {
        if (!Ha) {
          Ha = true;
          a("#save_output_btns").toggle( !! p);
          a("#tool_source_back").toggle(!p);
          var D = Ga = l.getSvgString();
          a("#svg_source_textarea").val(D);
          a("#svg_source_editor").fadeIn();
          o();
          a("#svg_source_textarea").focus()
        }
      };
      a("#svg_docprops_container, #svg_prefs_container").draggable({
        cancel: "button,fieldset",
        containment: "window"
      });
      var i = function () {
        if (!Pa) {
          Pa = true;
          a("#image_save_opts input").val([e.img_save]);
          var g = l.getResolution();
          if (f.baseUnit !== "px") {
            g.w = svgedit.units.convertUnit(g.w) + f.baseUnit;
            g.h = svgedit.units.convertUnit(g.h) + f.baseUnit
          }
          a("#canvas_width").val(g.w);
          a("#canvas_height").val(g.h);
          a("#canvas_title").val(l.getDocumentTitle());
          a("#svg_docprops").show()
        }
      }, z = function () {
        if (!Ia) {
          Ia = true;
          a("#main_menu").hide();
          var g = a("#bg_blocks div"),
            p = a.pref("bkgd_color"),
            D = a.pref("bkgd_url");
          g.each(function () {
            var J = a(this),
              M = J.css("background-color") == p;
            J.toggleClass("cur_background", M);
            M && a("#canvas_bg_url").removeClass("cur_background")
          });
          p || g.eq(0).addClass("cur_background");
          D && a("#canvas_bg_url").val(D);
          a("grid_snapping_step").attr("value", f.snappingStep);
          f.gridSnapping == true ? a("#grid_snapping_on").attr("checked", "checked") : a("#grid_snapping_on").removeAttr("checked");
          a("#svg_prefs").show()
        }
      },
      o = function () {
        var g = a("#svg_source_container").height() - 80;
        a("#svg_source_textarea").css("height", g)
      }, h = function () {
        if (Ha) {
          var g = function () {
            l.clearSelection();
            P();
            b();
            $a();
            q();
            Oa.fill.prep();
            Oa.stroke.prep()
          };
          l.setSvgString(a("#svg_source_textarea").val()) ? g() : a.confirm(k.notification.QerrorsRevertToSource, function (p) {
            if (!p) return false;
            g()
          });
          hb()
        }
      }, q = function (g) {
        g = g || l.getDocumentTitle();
        g = ma + (g ? ": " + g : "");
        a("title:first").text(g)
      }, w = function () {
        var g = a("#canvas_title").val();
        q(g);
        l.setDocumentTitle(g);
        g = a("#canvas_width");
        var p = g.val(),
          D = a("#canvas_height"),
          J = D.val();
        if (p != "fit" && !svgedit.units.isValidUnit("width", p)) {
          a.alert(k.notification.invalidAttrValGiven);
          g.parent().addClass("error");
          return false
        }
        g.parent().removeClass("error");
        if (J != "fit" && !svgedit.units.isValidUnit("height", J)) {
          a.alert(k.notification.invalidAttrValGiven);
          D.parent().addClass("error");
          return false
        }
        D.parent().removeClass("error");
        if (!l.setResolution(p, J)) {
          a.alert(k.notification.noContentToFitTo);
          return false
        }
        e.img_save = a("#image_save_opts :checked").val();
        a.pref("img_save", e.img_save);
        qb();
        W()
      }, u = function () {
        var g = a("#bg_blocks div.cur_background").css("background-color") || "#FFF";
        A(g, a("#canvas_bg_url").val());
        g = a("#lang_select").val();
        g != e.lang && s.putLocale(g);
        H(a("#iconsize").val());
        f.gridSnapping = a("#grid_snapping_on")[0].checked;
        f.snappingStep = a("#grid_snapping_step").val();
        f.showRulers = a("#show_rulers")[0].checked;
        a("#rulers").toggle(f.showRulers);
        f.showRulers && na();
        f.baseUnit = a("#base_unit").val();
        l.setConfig(f);
        qb();
        Y()
      }, t = s.setIcon = function (g,
      p) {
        var D = typeof p === "string" ? a.getSvgIcon(p, true) : p.clone();
        D ? a(g).empty().append(D) : console.log("NOTE: Icon image missing: " + p)
      }, C;
      C = function () {
        var g = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
          p = document.getElementsByTagName("script")[0],
          D;
        for (D in p.style) if (g.test(D)) return D.match(g)[0];
        if ("WebkitOpacity" in p.style) return "Webkit";
        if ("KhtmlOpacity" in p.style) return "Khtml";
        return ""
      }();
      var E = function (g, p) {
        C.toLowerCase();
        var D = ["top", "left", "bottom", "right"];
        g.each(function () {
          for (var J = a(this), M = J.outerWidth() * (p - 1), Q = J.outerHeight() * (p - 1), U = 0; U < 4; U++) {
            var X = D[U],
              ga = J.data("orig_margin-" + X);
            if (ga == null) {
              ga = parseInt(J.css("margin-" + X));
              J.data("orig_margin-" + X, ga)
            }
            ga = ga * p;
            if (X === "right") ga += M;
            else if (X === "bottom") ga += Q;
            J.css("margin-" + X, ga)
          }
        })
      }, H = s.setIconSize = function (g, p) {
        if (!(g == e.size && !p)) {
          console.log("size", g);
          var D = a("#tools_top .toolset, #editor_panel > *, #history_panel > *,\t\t\t\t#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\t\t\t\t#g_panel > *, #tool_font_size > *, .tools_flyout"),
            J = 1;
          J = typeof g == "number" ? g : {
            s: 0.75,
            m: 1,
            l: 1.25,
            xl: 1.5
          }[g];
          s.tool_scale = lb = J;
          Ab();
          var M = D.parents(":hidden");
          M.css("visibility", "hidden").show();
          E(D, J);
          M.css("visibility", "visible").hide();
          a.pref("iconsize", g);
          a("#iconsize").val(g);
          M = {
            "#tools_top": {
              left: 50,
              height: 72
            },
            "#tools_left": {
              width: 31,
              top: 74
            },
            "div#workarea": {
              left: 38,
              top: 74
            }
          };
          D = a("#tool_size_rules");
          if (D.length) D.empty();
          else D = a('<style id="tool_size_rules"></style>').appendTo("head");
          if (g != "m") {
            var Q = "";
            a.each(M, function (U, X) {
              U = "#svg_editor " + U.replace(/,/g, ", #svg_editor");
              Q += U + "{";
              a.each(X, function (ga, ea) {
                if (typeof ea === "number") var ka = ea * J + "px";
                else if (ea[g] || ea.all) ka = ea[g] || ea.all;
                Q += ga + ":" + ka + ";"
              });
              Q += "}"
            });
            M = "-" + C.toLowerCase() + "-";
            Q += "#tools_top .toolset, #editor_panel > *, #history_panel > *,\t\t\t\t#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\t\t\t\t#g_panel > *, #tool_font_size > *, .tools_flyout{" + M + "transform: scale(" + J + ");} #svg_editor div.toolset .toolset {" + M + "transform: scale(1); margin: 1px !important;} #svg_editor .ui-slider {" + M + "transform: scale(" + 1 / J + ");}";
            D.text(Q)
          }
          Ab()
        }
      }, I = function () {
        a("#dialog_box").hide();
        if (!Ha && !Pa && !Ia) ua && l.leaveContext();
        else {
          if (Ha) Ga !== a("#svg_source_textarea").val() ? a.confirm(k.notification.QignoreSourceChanges, function (g) {
            g && P()
          }) : P();
          else if (Pa) W();
          else Ia && Y();
          T()
        }
      }, P = function () {
        a("#svg_source_editor").hide();
        Ha = false;
        a("#svg_source_textarea").blur()
      }, W = function () {
        a("#svg_docprops").hide();
        a("#canvas_width,#canvas_height").removeAttr("disabled");
        a("#resolution")[0].selectedIndex = 0;
        a("#image_save_opts input").val([e.img_save]);
        Pa = false
      }, Y = function () {
        a("#svg_prefs").hide();
        Ia = false
      }, R = {
        width: a(window).width(),
        height: a(window).height()
      }, T = a.noop,
        V;
      svgedit.browser.isIE() && function () {
        T = function () {
          if (ba[0].scrollLeft === 0 && ba[0].scrollTop === 0) {
            ba[0].scrollLeft = V.left;
            ba[0].scrollTop = V.top
          }
        };
        V = {
          left: ba[0].scrollLeft,
          top: ba[0].scrollTop
        };
        a(window).resize(T);
        svgEditor.ready(function () {
          setTimeout(function () {
            T()
          }, 500)
        });
        ba.scroll(function () {
          V = {
            left: ba[0].scrollLeft,
            top: ba[0].scrollTop
          }
        })
      }();
      a(window).resize(function () {
        Ha && o();
        a.each(R,

        function (g, p) {
          var D = a(window)[g]();
          ba[0]["scroll" + (g === "width" ? "Left" : "Top")] -= (D - p) / 2;
          R[g] = D
        })
      });
      (function () {
        ba.scroll(function () {
          if (a("#ruler_x").length != 0) a("#ruler_x")[0].scrollLeft = ba[0].scrollLeft;
          if (a("#ruler_y").length != 0) a("#ruler_y")[0].scrollTop = ba[0].scrollTop
        })
      })();
      a("#url_notice").click(function () {
        a.alert(this.title)
      });
      a("#change_image_url").click(O);
      (function () {
        var g = ["clear", "open", "save", "source", "delete", "delete_multi", "paste", "clone", "clone_multi", "move_top", "move_bottom"],
          p = "";
        a.each(g, function (D, J) {
          p += "#tool_" + J + (D == g.length - 1 ? "," : "")
        });
        a(p).mousedown(function () {
          a(this).addClass("tool_button_current")
        }).bind("mousedown mouseout", function () {
          a(this).removeClass("tool_button_current")
        });
        a("#tool_undo, #tool_redo").mousedown(function () {
          a(this).hasClass("disabled") || a(this).addClass("tool_button_current")
        }).bind("mousedown mouseout", function () {
          a(this).removeClass("tool_button_current")
        })
      })();
      if (ca && !window.opera) {
        ca = ["tool_clear", "tool_save", "tool_source", "tool_undo", "tool_redo",
          "tool_clone"];
        for (var aa = ca.length; aa--;) {
          var Ja = document.getElementById(ca[aa]);
          if (Ja != null) {
            var Za = Ja.title,
              mb = Za.indexOf("Ctrl+");
            Ja.title = [Za.substr(0, mb), "Cmd+", Za.substr(mb + 5)].join("")
          }
        }
      }
      var eb = function (g) {
        var p = g.attr("id") == "stroke_color" ? "stroke" : "fill",
          D = Oa[p].paint,
          J = p == "stroke" ? "Pick a Stroke Paint and Opacity" : "Pick a Fill Paint and Opacity";
        g = g.offset();
        a("#color_picker").draggable({
          cancel: ".jGraduate_tabs, .jGraduate_colPick, .jGraduate_gradPick, .jPicker",
          containment: "window"
        }).css(f.colorPickerCSS || {
          left: g.left - 140,
          bottom: 40
        }).jGraduate({
          paint: D,
          window: {
            pickerTitle: J
          },
          images: {
            clientPath: f.jGraduatePath
          },
          newstop: "inverse"
        }, function (M) {
          D = new a.jGraduate.Paint(M);
          Oa[p].setPaint(D);
          l.setPaint(p, D);
          a("#color_picker").hide()
        }, function () {
          a("#color_picker").hide()
        })
      }, fb = function () {
        var g = l.getColor("fill") == "none",
          p = l.getColor("stroke") == "none",
          D = ["#tool_fhpath", "#tool_line"],
          J = ["#tools_rect .tool_button", "#tools_ellipse .tool_button", "#tool_text", "#tool_path"];
        if (p) for (var M in D) {
          var Q = D[M];
          a(Q).hasClass("tool_button_current") && Cb();
          a(Q).addClass("disabled")
        } else for (M in D) {
          Q = D[M];
          a(Q).removeClass("disabled")
        }
        if (p && g) for (M in J) {
          Q = J[M];
          a(Q).hasClass("tool_button_current") && Cb();
          a(Q).addClass("disabled")
        } else for (M in J) {
          Q = J[M];
          a(Q).removeClass("disabled")
        }
        l.runExtensions("toolButtonStateUpdate", {
          nofill: g,
          nostroke: p
        });
        a(".tools_flyout").each(function () {
          var U = a("#" + this.id + "_show"),
            X = false;
          a(this).children().each(function () {
            a(this).hasClass("disabled") || (X = true)
          });
          U.toggleClass("disabled", !X)
        });
        Ua()
      };
      ca = function (g, p) {
        var D = f[p === "fill" ? "initFill" : "initStroke"],
          J = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><rect width="16.5" height="16.5"\t\t\t\t\tfill="#' + D.color + '" opacity="' + D.opacity + '"/>\t\t\t\t\t<defs><linearGradient id="gradbox_"/></defs></svg>', "text/xml").documentElement;
        J = a(g)[0].appendChild(document.importNode(J, true));
        J.setAttribute("width", 16.5);
        this.rect = J.firstChild;
        this.defs = J.getElementsByTagName("defs")[0];
        this.grad = this.defs.firstChild;
        this.paint = new a.jGraduate.Paint({
          solidColor: D.color
        });
        this.type = p;
        this.setPaint = function (M, Q) {
          this.paint = M;
          var U = "none",
            X = M.type,
            ga = M.alpha / 100;
          switch (X) {
            case "solidColor":
              U = M[X] != "none" ? "#" + M[X] : M[X];
              break;
            case "linearGradient":
            case "radialGradient":
              this.defs.removeChild(this.grad);
              this.grad = this.defs.appendChild(M[X]);
              U = "url(#" + (this.grad.id = "gradbox_" + this.type) + ")"
          }
          this.rect.setAttribute("fill", U);
          this.rect.setAttribute("opacity", ga);
          if (Q) {
            l.setColor(this.type, paintColor, true);
            l.setPaintOpacity(this.type, paintOpacity, true)
          }
        };
        this.update = function (M) {
          if (ja) {
            var Q = this.type;
            switch (ja.tagName) {
              case "use":
              case "image":
              case "foreignObject":
                return;
              case "g":
              case "a":
                for (var U = null, X = ja.getElementsByTagName("*"), ga = 0, ea = X.length; ga < ea; ga++) {
                  var ka = X[ga].getAttribute(Q);
                  if (ga === 0) U = ka;
                  else if (U !== ka) {
                    U = null;
                    break
                  }
                }
                if (U === null) {
                  X = null;
                  return
                }
                X = U;
                U = 1;
                break;
              default:
                U = parseFloat(ja.getAttribute(Q + "-opacity"));
                if (isNaN(U)) U = 1;
                X = Q === "fill" ? "black" : "none";
                X = ja.getAttribute(Q) || X
            }
            if (M) {
              l.setColor(Q, X, true);
              l.setPaintOpacity(Q, U, true)
            }
            U *= 100;
            this.setPaint(Jb(X, U, Q))
          }
        };
        this.prep = function () {
          switch (this.paint.type) {
            case "linearGradient":
            case "radialGradient":
              var M = new a.jGraduate.Paint({
                copy: this.paint
              });
              l.setPaint(p, M)
          }
        }
      };
      Oa.fill = new ca("#fill_color", "fill");
      Oa.stroke = new ca("#stroke_color", "stroke");
      a("#stroke_width").val(f.initStroke.width);
      a("#group_opacity").val(f.initOpacity * 100);
      ca = Oa.fill.rect.cloneNode(false);
      ca.setAttribute("style", "vector-effect:non-scaling-stroke");
      var ec = ca.style.vectorEffect === "non-scaling-stroke";
      ca.removeAttribute("style");
      ca = Oa.fill.rect.ownerDocument.createElementNS("http://www.w3.org/2000/svg",
        "feGaussianBlur");
      typeof ca.stdDeviationX === "undefined" && a("#tool_blur").hide();
      a(ca).remove();
      (function () {
        var g = "-" + C.toLowerCase() + "-zoom-",
          p = g + "in";
        ba.css("cursor", p);
        if (ba.css("cursor") === p) {
          Tb = p;
          bb = g + "out"
        }
        ba.css("cursor", "auto")
      })();
      setTimeout(function () {
        l.embedImage("images/logo.png", function (g) {
          if (!g) {
            a("#image_save_opts [value=embed]").attr("disabled", "disabled");
            a("#image_save_opts input").val(["ref"]);
            e.img_save = "ref";
            a("#image_opt_embed").css("color", "#666").attr("title", k.notification.featNotSupported)
          }
        })
      },
      1E3);
      a("#fill_color, #tool_fill .icon_label").click(function () {
        eb(a("#fill_color"));
        fb()
      });
      a("#stroke_color, #tool_stroke .icon_label").click(function () {
        eb(a("#stroke_color"));
        fb()
      });
      a("#group_opacityLabel").click(function () {
        a("#opacity_dropdown button").mousedown();
        a(window).mouseup()
      });
      a("#zoomLabel").click(function () {
        a("#zoom_dropdown button").mousedown();
        a(window).mouseup()
      });
      a("#tool_move_top").mousedown(function (g) {
        a("#tools_stacking").show();
        g.preventDefault()
      });
      a(".layer_button").mousedown(function () {
        a(this).addClass("layer_buttonpressed")
      }).mouseout(function () {
        a(this).removeClass("layer_buttonpressed")
      }).mouseup(function () {
        a(this).removeClass("layer_buttonpressed")
      });
      a(".push_button").mousedown(function () {
        a(this).hasClass("disabled") || a(this).addClass("push_button_pressed").removeClass("push_button")
      }).mouseout(function () {
        a(this).removeClass("push_button_pressed").addClass("push_button")
      }).mouseup(function () {
        a(this).removeClass("push_button_pressed").addClass("push_button")
      });
      a("#layer_new").click(function () {
        var g = l.getCurrentDrawing().getNumLayers();
        do var p = k.layers.layer + " " + ++g;
        while (l.getCurrentDrawing().hasLayer(p));
        a.prompt(k.notification.enterUniqueLayerName,
        p, function (D) {
          if (D) if (l.getCurrentDrawing().hasLayer(D)) a.alert(k.notification.dupeLayerName);
          else {
            l.createLayer(D);
            Na();
            $a()
          }
        })
      });
      a("#layer_delete").click(Z);
      a("#layer_up").click(function () {
        L(-1)
      });
      a("#layer_down").click(function () {
        L(1)
      });
      a("#layer_rename").click(function () {
        a("#layerlist tr.layersel").prevAll();
        var g = a("#layerlist tr.layersel td.layername").text();
        a.prompt(k.notification.enterNewLayerName, "", function (p) {
          if (p) if (g == p || l.getCurrentDrawing().hasLayer(p)) a.alert(k.notification.layerHasThatName);
          else {
            l.renameCurrentLayer(p);
            $a()
          }
        })
      });
      var wb = -1,
        ic = false,
        nc = false,
        pc = function (g) {
          if (nc) if (wb != -1) {
            ic = true;
            g = wb - g.pageX;
            var p = a("#sidepanels"),
              D = parseInt(p.css("width"));
            if (D + g > 300) g = 300 - D;
            else if (D + g < 2) g = 2 - D;
            if (g != 0) {
              wb -= g;
              D = a("#layerpanel");
              ba.css("right", parseInt(ba.css("right")) + g);
              p.css("width", parseInt(p.css("width")) + g);
              D.css("width", parseInt(D.css("width")) + g);
              p = a("#ruler_x");
              p.css("right", parseInt(p.css("right")) + g)
            }
          }
        };
      a("#sidepanel_handle").mousedown(function (g) {
        wb = g.pageX;
        a(window).mousemove(pc);
        nc = false;
        setTimeout(function () {
          nc = true
        }, 20)
      }).mouseup(function () {
        ic || oc();
        wb = -1;
        ic = false
      });
      a(window).mouseup(function () {
        wb = -1;
        ic = false;
        a("#svg_editor").unbind("mousemove", pc)
      });
      var oc = function (g) {
        var p = parseInt(a("#sidepanels").css("width"));
        g = (p > 2 || g ? 2 : 150) - p;
        p = a("#sidepanels");
        var D = a("#layerpanel"),
          J = a("#ruler_x");
        ba.css("right", parseInt(ba.css("right")) + g);
        p.css("width", parseInt(p.css("width")) + g);
        D.css("width", parseInt(D.css("width")) + g);
        J.css("right", parseInt(J.css("right")) + g)
      }, qc = function (g) {
        for (var p = Array(l.getCurrentDrawing().getNumLayers()), D = 0; D < p.length; ++D) p[D] = l.getCurrentDrawing().getLayerName(D);
        if (g) for (D = 0; D < p.length; ++D) p[D] != g && l.getCurrentDrawing().setLayerOpacity(p[D], 0.5);
        else for (D = 0; D < p.length; ++D) l.getCurrentDrawing().setLayerOpacity(p[D], 1)
      }, $a = function () {
        var g = a("#layerlist tbody"),
          p = a("#selLayerNames");
        g.empty();
        p.empty();
        for (var D = l.getCurrentDrawing().getCurrentLayerName(), J = l.getCurrentDrawing().getNumLayers(), M = a.getSvgIcon("eye"); J--;) {
          var Q = l.getCurrentDrawing().getLayerName(J),
            U = '<tr class="layer';
          if (Q == D) U += " layersel";
          U += '">';
          U += l.getCurrentDrawing().getLayerVisibility(Q) ? '<td class="layervis"/><td class="layername" >' + Q + "</td></tr>" : '<td class="layervis layerinvis"/><td class="layername" >' + Q + "</td></tr>";
          g.append(U);
          p.append('<option value="' + Q + '">' + Q + "</option>")
        }
        if (M !== undefined) {
          M.clone();
          a("td.layervis", g).append(M.clone());
          a.resizeSvgIcons({
            "td.layervis .svg_icon": 14
          })
        }
        a("#layerlist td.layername").mouseup(function (X) {
          a("#layerlist tr.layer").removeClass("layersel");
          a(this.parentNode).addClass("layersel");
          l.setCurrentLayer(this.textContent);
          X.preventDefault()
        }).mouseover(function () {
          a(this).css({
            "font-style": "italic",
            color: "blue"
          });
          qc(this.textContent)
        }).mouseout(function () {
          a(this).css({
            "font-style": "normal",
            color: "black"
          });
          qc()
        });
        a("#layerlist td.layervis").click(function () {
          var X = a(this.parentNode).prevAll().length;
          X = a("#layerlist tr.layer:eq(" + X + ") td.layername").text();
          var ga = a(this).hasClass("layerinvis");
          l.setLayerVisibility(X, ga);
          ga ? a(this).removeClass("layerinvis") : a(this).addClass("layerinvis")
        });
        for (p = 5 - a("#layerlist tr.layer").size(); p-- > 0;) g.append('<tr><td style="color:white">_</td><td/></tr>')
      };
      $a();
      a(window).bind("load resize", function () {
        ba.css("line-height", ba.height() + "px")
      });
      a("#resolution").change(function () {
        var g = a("#canvas_width,#canvas_height");
        if (this.selectedIndex) if (this.value == "content") g.val("fit").attr("disabled", "disabled");
        else {
          var p = this.value.split("x");
          a("#canvas_width").val(p[0]);
          a("#canvas_height").val(p[1]);
          g.removeAttr("disabled")
        } else a("#canvas_width").val() ==
          "fit" && g.removeAttr("disabled").val(100)
      });
      a("input,select").attr("autocomplete", "off");
      var mc = function () {
        var g = [{
          sel: "#tool_select",
          fn: Cb,
          evt: "click",
          key: ["V", true]
        }, {
          sel: "#tool_fhpath",
          fn: Vb,
          evt: "click",
          key: ["Q", true]
        }, {
          sel: "#tool_line",
          fn: Ub,
          evt: "click",
          key: ["L", true]
        }, {
          sel: "#tool_rect",
          fn: Eb,
          evt: "mouseup",
          key: ["R", true],
          parent: "#tools_rect",
          icon: "rect"
        }, {
          sel: "#tool_square",
          fn: Db,
          evt: "mouseup",
          parent: "#tools_rect",
          icon: "square"
        }, {
          sel: "#tool_fhrect",
          fn: Wb,
          evt: "mouseup",
          parent: "#tools_rect",
          icon: "fh_rect"
        }, {
          sel: "#tool_ellipse",
          fn: jc,
          evt: "mouseup",
          key: ["E", true],
          parent: "#tools_ellipse",
          icon: "ellipse"
        }, {
          sel: "#tool_circle",
          fn: Lb,
          evt: "mouseup",
          parent: "#tools_ellipse",
          icon: "circle"
        }, {
          sel: "#tool_fhellipse",
          fn: cc,
          evt: "mouseup",
          parent: "#tools_ellipse",
          icon: "fh_ellipse"
        }, {
          sel: "#tool_path",
          fn: rb,
          evt: "click",
          key: ["P", true]
        }, {
          sel: "#tool_text",
          fn: ha,
          evt: "click",
          key: ["T", true]
        }, {
          sel: "#tool_image",
          fn: vb,
          evt: "mouseup"
        }, {
          sel: "#tool_zoom",
          fn: db,
          evt: "mouseup",
          key: ["Z", true]
        }, {
          sel: "#tool_clear",
          fn: gc,
          evt: "mouseup",
          key: ["N",
          true]
        }, {
          sel: "#tool_save",
          fn: function () {
            Ha ? h() : l.save({
              images: e.img_save,
              round_digits: 6
            })
          },
          evt: "mouseup",
          key: ["S", true]
        }, {
          sel: "#tool_export",
          fn: lc,
          evt: "mouseup"
        }, {
          sel: "#tool_open",
          fn: xb,
          evt: "mouseup",
          key: ["O", true]
        }, {
          sel: "#tool_import",
          fn: Xa,
          evt: "mouseup"
        }, {
          sel: "#tool_source",
          fn: m,
          evt: "click",
          key: ["U", true]
        }, {
          sel: "#tool_wireframe",
          fn: c,
          evt: "click",
          key: ["F", true]
        }, {
          sel: "#tool_source_cancel,#svg_source_overlay,#tool_docprops_cancel,#tool_prefs_cancel",
          fn: I,
          evt: "click",
          key: ["esc", false, false],
          hidekey: true
        }, {
          sel: "#tool_source_save",
          fn: h,
          evt: "click"
        }, {
          sel: "#tool_docprops_save",
          fn: w,
          evt: "click"
        }, {
          sel: "#tool_docprops",
          fn: i,
          evt: "mouseup"
        }, {
          sel: "#tool_prefs_save",
          fn: u,
          evt: "click"
        }, {
          sel: "#tool_prefs_option",
          fn: function () {
            z();
            return false
          },
          evt: "mouseup"
        }, {
          sel: "#tool_delete,#tool_delete_multi",
          fn: Nb,
          evt: "click",
          key: ["del/backspace", true]
        }, {
          sel: "#tool_reorient",
          fn: za,
          evt: "click"
        }, {
          sel: "#tool_node_link",
          fn: Pb,
          evt: "click"
        }, {
          sel: "#tool_node_clone",
          fn: Mb,
          evt: "click"
        }, {
          sel: "#tool_node_delete",
          fn: Ra,
          evt: "click"
        }, {
          sel: "#tool_openclose_path",
          fn: fc,
          evt: "click"
        }, {
          sel: "#tool_add_subpath",
          fn: qa,
          evt: "click"
        }, {
          sel: "#tool_move_top",
          fn: Fb,
          evt: "click",
          key: "ctrl+shift+]"
        }, {
          sel: "#tool_move_bottom",
          fn: dc,
          evt: "click",
          key: "ctrl+shift+["
        }, {
          sel: "#tool_topath",
          fn: nb,
          evt: "click"
        }, {
          sel: "#tool_make_link,#tool_make_link_multi",
          fn: gb,
          evt: "click"
        }, {
          sel: "#tool_undo",
          fn: Zb,
          evt: "click",
          key: ["Z", true]
        }, {
          sel: "#tool_redo",
          fn: Sb,
          evt: "click",
          key: ["Y", true]
        }, {
          sel: "#tool_clone,#tool_clone_multi",
          fn: Va,
          evt: "click",
          key: ["D", true]
        }, {
          sel: "#tool_group",
          fn: ob,
          evt: "click",
          key: ["G", true]
        }, {
          sel: "#tool_ungroup",
          fn: ob,
          evt: "click"
        }, {
          sel: "#tool_unlink_use",
          fn: ob,
          evt: "click"
        }, {
          sel: "[id^=tool_align]",
          fn: Yb,
          evt: "click"
        }, {
          sel: "#tool_bold",
          fn: zb,
          evt: "mousedown"
        }, {
          sel: "#tool_italic",
          fn: Qb,
          evt: "mousedown"
        }, {
          sel: "#sidepanel_handle",
          fn: oc,
          key: ["X"]
        }, {
          sel: "#copy_save_done",
          fn: I,
          evt: "click"
        }, {
          key: "ctrl+left",
          fn: function () {
            yb(0, 1)
          }
        }, {
          key: "ctrl+right",
          fn: function () {
            yb(1, 1)
          }
        }, {
          key: "ctrl+shift+left",
          fn: function () {
            yb(0, 5)
          }
        }, {
          key: "ctrl+shift+right",
          fn: function () {
            yb(1, 5)
          }
        }, {
          key: "shift+O",
          fn: Gb
        }, {
          key: "shift+P",
          fn: Rb
        }, {
          key: [pa + "up", true],
          fn: function () {
            b(2)
          }
        }, {
          key: [pa + "down", true],
          fn: function () {
            b(0.5)
          }
        }, {
          key: [pa + "]", true],
          fn: function () {
            Ta("Up")
          }
        }, {
          key: [pa + "[", true],
          fn: function () {
            Ta("Down")
          }
        }, {
          key: ["up", true],
          fn: function () {
            Wa(0, -1)
          }
        }, {
          key: ["down", true],
          fn: function () {
            Wa(0, 1)
          }
        }, {
          key: ["left", true],
          fn: function () {
            Wa(-1, 0)
          }
        }, {
          key: ["right", true],
          fn: function () {
            Wa(1, 0)
          }
        }, {
          key: "shift+up",
          fn: function () {
            Wa(0, -10)
          }
        }, {
          key: "shift+down",
          fn: function () {
            Wa(0, 10)
          }
        }, {
          key: "shift+left",
          fn: function () {
            Wa(-10,
            0)
          }
        }, {
          key: "shift+right",
          fn: function () {
            Wa(10, 0)
          }
        }, {
          key: ["alt+up", true],
          fn: function () {
            l.cloneSelectedElements(0, -1)
          }
        }, {
          key: ["alt+down", true],
          fn: function () {
            l.cloneSelectedElements(0, 1)
          }
        }, {
          key: ["alt+left", true],
          fn: function () {
            l.cloneSelectedElements(-1, 0)
          }
        }, {
          key: ["alt+right", true],
          fn: function () {
            l.cloneSelectedElements(1, 0)
          }
        }, {
          key: ["alt+shift+up", true],
          fn: function () {
            l.cloneSelectedElements(0, -10)
          }
        }, {
          key: ["alt+shift+down", true],
          fn: function () {
            l.cloneSelectedElements(0, 10)
          }
        }, {
          key: ["alt+shift+left", true],
          fn: function () {
            l.cloneSelectedElements(-10,
            0)
          }
        }, {
          key: ["alt+shift+right", true],
          fn: function () {
            l.cloneSelectedElements(10, 0)
          }
        }, {
          key: "A",
          fn: function () {
            l.selectAllInCurrentLayer()
          }
        }, {
          key: pa + "z",
          fn: Zb
        }, {
          key: pa + "shift+z",
          fn: Sb
        }, {
          key: pa + "y",
          fn: Sb
        }, {
          key: pa + "x",
          fn: Ob
        }, {
          key: pa + "c",
          fn: Xb
        }, {
          key: pa + "v",
          fn: kc
        }],
          p = {
            "4/Shift+4": "#tools_rect_show",
            "5/Shift+5": "#tools_ellipse_show"
          };
        return {
          setAll: function () {
            var D = {};
            a.each(g, function (J, M) {
              if (M.sel) {
                var Q = a(M.sel);
                if (Q.length == 0) return true;
                if (M.evt) {
                  if (svgedit.browser.isTouch() && M.evt === "click") M.evt = "mousedown";
                  Q[M.evt](M.fn)
                }
                if (M.parent && a(M.parent + "_show").length != 0) {
                  var U = a(M.parent);
                  U.length || (U = Hb(M.parent.substr(1)));
                  U.append(Q);
                  a.isArray(D[M.parent]) || (D[M.parent] = []);
                  D[M.parent].push(M)
                }
              }
              if (M.key) {
                var X = M.fn,
                  ga = false;
                if (a.isArray(M.key)) {
                  U = M.key[0];
                  if (M.key.length > 1) ga = M.key[1]
                } else U = M.key;
                U += "";
                a.each(U.split("/"), function (ka, ya) {
                  a(document).bind("keydown", ya, function (Da) {
                    X();
                    ga && Da.preventDefault();
                    return false
                  })
                });
                if (M.sel && !M.hidekey && Q.attr("title")) {
                  var ea = Q.attr("title").split("[")[0] + " (" + U + ")";
                  p[U] = M.sel;
                  Q.parents("#main_menu").length || Q.attr("title", ea)
                }
              }
            });
            ub(D);
            a(".attr_changer, #image_url").bind("keydown", "return", function (J) {
              a(this).change();
              J.preventDefault()
            });
            a(window).bind("keydown", "tab", function (J) {
              if (va === "canvas") {
                J.preventDefault();
                Rb()
              }
            }).bind("keydown", "shift+tab", function (J) {
              if (va === "canvas") {
                J.preventDefault();
                Gb()
              }
            });
            a("#tool_zoom").dblclick(Fa)
          },
          setTitles: function () {
            a.each(p, function (D, J) {
              var M = a(J).parents("#main_menu").length;
              a(J).each(function () {
                var Q = M ? a(this).text().split(" [")[0] : this.title.split(" [")[0],
                  U = "";
                a.each(D.split("/"), function (X, ga) {
                  var ea = ga.split("+"),
                    ka = "";
                  if (ea.length > 1) {
                    ka = ea[0] + "+";
                    ga = ea[1]
                  }
                  U += (X ? "/" : "") + ka + (k["key_" + ga] || ga)
                });
                if (M) this.lastChild.textContent = Q + " [" + U + "]";
                else this.title = Q + " [" + U + "]"
              })
            })
          },
          getButtonData: function (D) {
            var J;
            a.each(g, function (M, Q) {
              if (Q.sel === D) J = Q
            });
            return J
          }
        }
      }();
      mc.setAll();
      s.ready(function () {
        var g = f.initTool,
          p = a("#tools_left, #svg_editor .tools_flyout"),
          D = p.find("#tool_" + g);
        g = p.find("#" + g);
        (D.length ? D : g.length ? g : a("#tool_select")).click().mouseup();
        f.wireframe && a("#tool_wireframe").click();
        f.showlayers && oc();
        a("#rulers").toggle( !! f.showRulers);
        if (f.showRulers) a("#show_rulers")[0].checked = true;
        if (f.gridSnapping) a("#grid_snapping_on")[0].checked = true;
        f.baseUnit && a("#base_unit").val(f.baseUnit);
        f.snappingStep && a("#grid_snapping_step").val(f.snappingStep)
      });
      a("#rect_rx").SpinButton({
        min: 0,
        max: 1E3,
        step: 1,
        callback: function (g) {
          l.setRectRadius(g.value)
        }
      });
      a("#stroke_width").SpinButton({
        min: 0,
        max: 99,
        step: 1,
        smallStep: 0.1,
        callback: function (g) {
          var p = g.value;
          if (p == 0 && ja && ["line", "polyline"].indexOf(ja.nodeName) >= 0) p = g.value = 1;
          l.setStrokeWidth(p)
        }
      });
      a("#angle").SpinButton({
        min: -180,
        max: 180,
        step: 5,
        callback: function (g) {
          l.setRotationAngle(g.value);
          a("#tool_reorient").toggleClass("disabled", g.value == 0)
        }
      });
      a("#font_size").SpinButton({
        step: 1,
        min: 0.001,
        stepfunc: function (g, p) {
          var D = g.value - 0,
            J = D + p,
            M = J >= D;
          if (p === 0) return D;
          return D >= 24 ? M ? Math.round(D * 1.1) : Math.round(D / 1.1) : D <= 1 ? M ? D * 2 : D / 2 : J
        },
        callback: function (g) {
          l.setFontSize(g.value)
        }
      });
      a("#group_opacity").SpinButton({
        step: 5,
        min: 0,
        max: 100,
        callback: cb
      });
      a("#blur").SpinButton({
        step: 0.1,
        min: 0,
        max: 10,
        callback: pb
      });
      a("#zoom").SpinButton({
        min: 0.001,
        max: 1E4,
        step: 50,
        stepfunc: function (g, p) {
          var D = g.value - 0;
          if (D === 0) return 100;
          var J = D + p;
          if (p === 0) return D;
          return D >= 100 ? J : J >= D ? D * 2 : D / 2
        },
        callback: sa
      }).val(l.getZoom() * 100);
      a("#workarea").contextMenu({
        menu: "cmenu_canvas",
        inSpeed: 0
      }, function (g) {
        switch (g) {
          case "delete":
            Nb();
            break;
          case "cut":
            Ob();
            break;
          case "copy":
            Xb();
            break;
          case "paste":
            l.pasteElements();
            break;
          case "paste_in_place":
            l.pasteElements("in_place");
            break;
          case "group":
            l.groupSelectedElements();
            break;
          case "ungroup":
            l.ungroupSelectedElement();
            break;
          case "move_front":
            Fb();
            break;
          case "move_up":
            Ta("Up");
            break;
          case "move_down":
            Ta("Down");
            break;
          case "move_back":
            dc();
            break;
          default:
            svgedit.contextmenu && svgedit.contextmenu.hasCustomHandler(g) && svgedit.contextmenu.getCustomHandler(g).call()
        }
        l.clipBoard.length && sb.enableContextMenuItems("#paste,#paste_in_place")
      });
      ca = function (g) {
        switch (g) {
          case "dupe":
            N();
            break;
          case "delete":
            Z();
            break;
          case "merge_down":
            if (a("#layerlist tr.layersel").index() != l.getCurrentDrawing().getNumLayers() - 1) {
              l.mergeLayer();
              Na();
              $a()
            }
            break;
          case "merge_all":
            l.mergeAllLayers();
            Na();
            $a()
        }
      };
      a("#layerlist").contextMenu({
        menu: "cmenu_layers",
        inSpeed: 0
      }, ca);
      a("#layer_moreopts").contextMenu({
        menu: "cmenu_layers",
        inSpeed: 0,
        allowLeft: true
      }, ca);
      a(".contextMenu li").mousedown(function (g) {
        g.preventDefault()
      });
      a("#cmenu_canvas li").disableContextMenu();
      sb.enableContextMenuItems("#delete,#cut,#copy");
      window.onbeforeunload = function () {
        if ("localStorage" in window) {
          window.localStorage.setItem("svgedit-" + s.curConfig.canvasName, l.getSvgString());
          s.show_save_warning = false
        }
        if (da.getUndoStackSize() === 0) s.show_save_warning = false;
        if (!f.no_save_warning && s.show_save_warning) return k.notification.unsavedChanges
      };
      s.openPrep = function (g) {
        a("#main_menu").hide();
        da.getUndoStackSize() === 0 ? g(true) : a.confirm(k.notification.QwantToOpen, g)
      };
      if (window.FileReader) {
        ca = function (g) {
          g.stopPropagation();
          g.preventDefault();
          a("#workarea").removeAttr("style");
          a("#main_menu").hide();
          var p = null;
          if (p = g.type == "drop" ? g.dataTransfer.files[0] : this.files[0]) if (p.type.indexOf("image") != -1) if (p.type.indexOf("svg") != -1) {
            g = new FileReader;
            g.onloadend = function (D) {
              l.importSvgString(D.target.result, true);
              l.ungroupSelectedElement();
              l.ungroupSelectedElement();
              l.groupSelectedElements();
              l.alignSelectedElements("m", "page");
              l.alignSelectedElements("c", "page")
            };
            g.readAsText(p)
          } else {
            g = new FileReader;
            g.onloadend = function (D) {
              insertNewImage = function (U, X) {
                var ga = l.addSvgElementFromJson({
                  element: "image",
                  attr: {
                    x: 0,
                    y: 0,
                    width: U,
                    height: X,
                    id: l.getNextId(),
                    style: "pointer-events:inherit"
                  }
                });
                l.setHref(ga, D.target.result);
                l.selectOnly([ga]);
                l.alignSelectedElements("m", "page");
                l.alignSelectedElements("c", "page");
                Na()
              };
              var J = 100,
                M = 100,
                Q = new Image;
              Q.src = D.target.result;
              Q.style.opacity = 0;
              Q.onload = function () {
                J = Q.offsetWidth;
                M = Q.offsetHeight;
                insertNewImage(J, M)
              }
            };
            g.readAsDataURL(p)
          }
        };
        ba[0].addEventListener("dragenter", function (g) {
          g.stopPropagation();
          g.preventDefault()
        }, false);
        ba[0].addEventListener("dragover", function (g) {
          g.stopPropagation();
          g.preventDefault()
        }, false);
        ba[0].addEventListener("dragleave",

        function (g) {
          g.stopPropagation();
          g.preventDefault()
        }, false);
        ba[0].addEventListener("drop", ca, false);
        aa = a('<input type="file">').change(function () {
          var g = this;
          s.openPrep(function (p) {
            if (p) {
              l.clear();
              if (g.files.length == 1) {
                p = new FileReader;
                p.onloadend = function (D) {
                  K(D.target.result);
                  qb()
                };
                p.readAsText(g.files[0])
              }
            }
          })
        });
        a("#tool_open").show().prepend(aa);
        ca = a('<input type="file">').change(ca);
        a("#tool_import").show().prepend(ca)
      }
      var qb = s.updateCanvas = function (g, p) {
        var D = ba.width(),
          J = ba.height(),
          M = D,
          Q = J,
          U = l.getZoom(),
          X = a("#svgcanvas"),
          ga = {
            x: ba[0].scrollLeft + M / 2,
            y: ba[0].scrollTop + Q / 2
          }, ea = f.canvas_expansion;
        D = Math.max(M, l.contentW * U * ea);
        J = Math.max(Q, l.contentH * U * ea);
        D == M && J == Q ? ba.css("overflow", "hidden") : ba.css("overflow", "scroll");
        ea = X.height() / 2;
        var ka = X.width() / 2;
        X.width(D).height(J);
        var ya = J / 2,
          Da = D / 2,
          S = l.updateCanvas(D, J),
          Aa = Da / ka;
        D = D / 2 - M / 2;
        J = J / 2 - Q / 2;
        if (p) {
          p.x += S.x;
          p.y += S.y
        } else p = {
          x: Da + (ga.x - ka) * Aa,
          y: ya + (ga.y - ea) * Aa
        };
        if (g) if (l.contentW > ba.width()) {
          ba[0].scrollLeft = S.x - 10;
          ba[0].scrollTop = S.y - 10
        } else {
          ba[0].scrollLeft = D;
          ba[0].scrollTop = J
        } else {
          ba[0].scrollLeft = p.x - M / 2;
          ba[0].scrollTop = p.y - Q / 2
        }
        if (f.showRulers) {
          na(X, U);
          ba.scroll()
        }
      }, $b = [];
      for (aa = 0.1; aa < 1E5; aa *= 10) {
        $b.push(1 * aa);
        $b.push(2 * aa);
        $b.push(5 * aa)
      }
      qb(true);
      try {
        var rc = function (g) {
          if (window.JSON && JSON.stringify) return JSON.stringify(g);
          var p = arguments.callee;
          if (typeof g == "boolean" || typeof g == "number") return g + "";
          else if (typeof g == "string") return '"' + g.replace(/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

          function (M) {
            return "\\u" + ("0000" + M.charCodeAt(0).toString(16)).slice(-4)
          }) + '"';
          else if (g.length) {
            for (var D = 0; D < g.length; D++) g[D] = p(g[D]);
            return "[" + g.join(",") + "]"
          } else {
            D = [];
            for (var J in g) D.push(p(J) + ":" + p(g[J]));
            return "{" + D.join(",") + "}"
          }
        };
        window.addEventListener("message", function (g) {
          var p = parseInt(g.data.substr(0, g.data.indexOf(";")));
          try {
            g.source.postMessage("SVGe" + p + ";" + rc(eval(g.data)), "*")
          } catch (D) {
            g.source.postMessage("SVGe" + p + ";error:" + D.message, "*")
          }
        }, false)
      } catch (sc) {
        window.embed_error = sc
      }
      a(function () {
        window.svgCanvas = l;
        l.ready = svgEditor.ready
      });
      s.setLang = function (g, p) {
        a.pref("lang", g);
        a("#lang_select").val(g);
        if (p) {
          var D = a("#layerlist tr.layersel td.layername").text() == k.common.layer + " 1";
          a.extend(k, p);
          l.setUiStrings(p);
          mc.setTitles();
          if (D) {
            l.renameCurrentLayer(k.common.layer + " 1");
            $a()
          }
          l.runExtensions("langChanged", g);
          Ib();
          a.each({
            "#stroke_color": "#tool_stroke .icon_label, #tool_stroke .color_block",
            "#fill_color": "#tool_fill label, #tool_fill .color_block",
            "#linejoin_miter": "#cur_linejoin",
            "#linecap_butt": "#cur_linecap"
          }, function (J, M) {
            a(M).attr("title", a(J)[0].title)
          });
          a("#multiselected_panel div[id^=tool_align]").each(function () {
            a("#tool_pos" + this.id.substr(10))[0].title = this.title
          })
        }
      }
    };
    var F = [];
    s.ready = function (B) {
      v ? B() : F.push(B)
    };
    s.runCallbacks = function () {
      a.each(F, function () {
        this()
      });
      v = true
    };
    s.loadFromString = function (B) {
      s.ready(function () {
        K(B)
      })
    };
    s.disableUI = function () {};
    s.loadFromURL = function (B, A) {
      A || (A = {});
      var O = A.cache,
        Z = A.callback;
      s.ready(function () {
        a.ajax({
          url: B,
          dataType: "text",
          cache: !! O,
          success: function (N) {
            K(N, Z)
          },
          error: function (N, L, na) {
            N.status != 404 && N.responseText ? K(N.responseText, Z) : a.alert(k.notification.URLloadFail + ": \n" + na + "", Z)
          }
        })
      })
    };
    s.loadFromDataURI = function (B) {
      s.ready(function () {
        var A = B.substring(26);
        K(svgedit.utilities.decode64(A))
      })
    };
    s.addExtension = function () {
      var B = arguments;
      a(function () {
        l && l.addExtension.apply(this, B)
      })
    };
    return s
  }(jQuery);
  $(svgEditor.init)
})();
svgedit = svgedit || {};
(function () {
  var a = this;
  if (!svgedit.contextmenu) svgedit.contextmenu = {};
  a.contextMenuExtensions = {};
  svgEditor.ready(function () {
    for (menuItem in contextMenuExtensions) {
      var K = contextMenuExtensions[menuItem];
      Object.keys(a.contextMenuExtensions).length == 0 && $("#cmenu_canvas").append("<li class='separator'>");
      var l = K.shortcut || "";
      $("#cmenu_canvas").append("<li class='disabled'><a href='#" + K.id + "'>" + K.label + "<span class='shortcut'>" + l + "</span></a></li>")
    }
  });
  svgedit.contextmenu.resetCustomMenus = function () {
    a.contextMenuExtensions = {}
  };
  svgedit.contextmenu.add = function (K) {
    if (K && K.id && K.label && K.action && typeof K.action == "function") if (K.id in a.contextMenuExtensions) console.error('Cannot add extension "' + K.id + '", an extension by that name already exists"');
    else {
      console.log("Registed contextmenu item: {id:" + K.id + ", label:" + K.label + "}");
      a.contextMenuExtensions[K.id] = K
    } else console.error("Menu items must be defined and have at least properties: id, label, action, where action must be a function")
  };
  svgedit.contextmenu.hasCustomHandler = function (K) {
    return a.contextMenuExtensions[K] && true
  };
  svgedit.contextmenu.getCustomHandler = function (K) {
    return a.contextMenuExtensions[K].action
  }
})();
var svgEditor = function (a, K) {
  function l(v, G, e) {
    var f = a("#svg_editor").parent(),
      k;
    for (k in G) {
      var n = G[k];
      n || console.log(k);
      if (e) k = "#" + k;
      if (f.find(k).length) {
        var F = f.find(k)[0];
        switch (v) {
          case "content":
            for (var B = 0; B < F.childNodes.length; B++) {
              var A = F.childNodes[B];
              if (A.nodeType === 3 && A.textContent.replace(/\s/g, "")) {
                A.textContent = n;
                break
              }
            }
            break;
          case "title":
            F.title = n
        }
      } else console.log("Missing: " + k)
    }
  }
  var s;
  K.readLang = function (v) {
    var G = K.canvas.runExtensions("addlangData", s, true);
    a.each(G, function (Z, N) {
      if (N.data) v = a.merge(v, N.data)
    });
    if (v.tools) {
      var e = v.tools;
      G = v.properties;
      var f = v.config,
        k = v.layers,
        n = v.common,
        F = v.ui;
      l("content", {
        copyrightLabel: v.misc.powered_by,
        curve_segments: G.curve_segments,
        fitToContent: e.fitToContent,
        fit_to_all: e.fit_to_all,
        fit_to_canvas: e.fit_to_canvas,
        fit_to_layer_content: e.fit_to_layer_content,
        fit_to_sel: e.fit_to_sel,
        icon_large: f.icon_large,
        icon_medium: f.icon_medium,
        icon_small: f.icon_small,
        icon_xlarge: f.icon_xlarge,
        image_opt_embed: f.image_opt_embed,
        image_opt_ref: f.image_opt_ref,
        includedImages: f.included_images,
        largest_object: e.largest_object,
        layersLabel: k.layers,
        page: e.page,
        relativeToLabel: e.relativeTo,
        selLayerLabel: k.move_elems_to,
        selectedPredefined: f.select_predefined,
        selected_objects: e.selected_objects,
        smallest_object: e.smallest_object,
        straight_segments: G.straight_segments,
        svginfo_bg_url: f.editor_img_url + ":",
        svginfo_bg_note: f.editor_bg_note,
        svginfo_change_background: f.background,
        svginfo_dim: f.doc_dims,
        svginfo_editor_prefs: f.editor_prefs,
        svginfo_height: n.height,
        svginfo_icons: f.icon_size,
        svginfo_image_props: f.image_props,
        svginfo_lang: f.language,
        svginfo_title: f.doc_title,
        svginfo_width: n.width,
        tool_docprops_cancel: n.cancel,
        tool_docprops_save: n.ok,
        tool_source_cancel: n.cancel,
        tool_source_save: n.ok,
        tool_prefs_cancel: n.cancel,
        tool_prefs_save: n.ok,
        sidepanel_handle: k.layers.split("").join(" "),
        tool_clear: e.new_doc,
        tool_docprops: e.docprops,
        tool_export: e.export_png,
        tool_import: e.import_doc,
        tool_imagelib: e.imagelib,
        tool_open: e.open_doc,
        tool_save: e.save_doc,
        svginfo_units_rulers: f.units_and_rulers,
        svginfo_rulers_onoff: f.show_rulers,
        svginfo_unit: f.base_unit,
        svginfo_grid_settings: f.grid,
        svginfo_snap_onoff: f.snapping_onoff,
        svginfo_snap_step: f.snapping_stepsize
      }, true);
      var B = {}, A;
      for (A in v.shape_cats) B['#shape_cats [data-cat="' + A + '"]'] = v.shape_cats[A];
      setTimeout(function () {
        l("content", B)
      }, 2E3);
      var O = {};
      a.each(["cut", "copy", "paste", "paste_in_place", "delete", "group", "ungroup", "move_front", "move_up", "move_down", "move_back"], function () {
        O['#cmenu_canvas a[href="#' + this + '"]'] = e[this]
      });
      a.each(["dupe", "merge_down", "merge_all"], function () {
        O['#cmenu_layers a[href="#' + this + '"]'] = k[this]
      });
      O['#cmenu_layers a[href="#delete"]'] = k.del;
      l("content", O);
      l("title", {
        align_relative_to: e.align_relative_to,
        circle_cx: G.circle_cx,
        circle_cy: G.circle_cy,
        circle_r: G.circle_r,
        cornerRadiusLabel: G.corner_radius,
        ellipse_cx: G.ellipse_cx,
        ellipse_cy: G.ellipse_cy,
        ellipse_rx: G.ellipse_rx,
        ellipse_ry: G.ellipse_ry,
        fill_color: G.fill_color,
        font_family: G.font_family,
        idLabel: G.id,
        image_height: G.image_height,
        image_url: G.image_url,
        image_width: G.image_width,
        layer_delete: k.del,
        layer_down: k.move_down,
        layer_new: k["new"],
        layer_rename: k.rename,
        layer_moreopts: n.more_opts,
        layer_up: k.move_up,
        line_x1: G.line_x1,
        line_x2: G.line_x2,
        line_y1: G.line_y1,
        line_y2: G.line_y2,
        linecap_butt: G.linecap_butt,
        linecap_round: G.linecap_round,
        linecap_square: G.linecap_square,
        linejoin_bevel: G.linejoin_bevel,
        linejoin_miter: G.linejoin_miter,
        linejoin_round: G.linejoin_round,
        main_icon: e.main_menu,
        mode_connect: e.mode_connect,
        tools_shapelib_show: e.mode_shapelib,
        palette: F.palette_info,
        zoom_panel: F.zoom_level,
        path_node_x: G.node_x,
        path_node_y: G.node_y,
        rect_height_tool: G.rect_height,
        rect_width_tool: G.rect_width,
        seg_type: G.seg_type,
        selLayerNames: k.move_selected,
        selected_x: G.pos_x,
        selected_y: G.pos_y,
        stroke_color: G.stroke_color,
        stroke_style: G.stroke_style,
        stroke_width: G.stroke_width,
        svginfo_title: f.doc_title,
        text: G.text_contents,
        toggle_stroke_tools: F.toggle_stroke_tools,
        tool_add_subpath: e.add_subpath,
        tool_alignbottom: e.align_bottom,
        tool_aligncenter: e.align_center,
        tool_alignleft: e.align_left,
        tool_alignmiddle: e.align_middle,
        tool_alignright: e.align_right,
        tool_aligntop: e.align_top,
        tool_angle: G.angle,
        tool_blur: G.blur,
        tool_bold: G.bold,
        tool_circle: e.mode_circle,
        tool_clone: e.clone,
        tool_clone_multi: e.clone,
        tool_delete: e.del,
        tool_delete_multi: e.del,
        tool_ellipse: e.mode_ellipse,
        tool_eyedropper: e.mode_eyedropper,
        tool_fhellipse: e.mode_fhellipse,
        tool_fhpath: e.mode_fhpath,
        tool_fhrect: e.mode_fhrect,
        tool_font_size: G.font_size,
        tool_group: e.group,
        tool_make_link: e.make_link,
        tool_link_url: e.set_link_url,
        tool_image: e.mode_image,
        tool_italic: G.italic,
        tool_line: e.mode_line,
        tool_move_bottom: e.move_bottom,
        tool_move_top: e.move_top,
        tool_node_clone: e.node_clone,
        tool_node_delete: e.node_delete,
        tool_node_link: e.node_link,
        tool_opacity: G.opacity,
        tool_openclose_path: e.openclose_path,
        tool_path: e.mode_path,
        tool_position: e.align_to_page,
        tool_rect: e.mode_rect,
        tool_redo: e.redo,
        tool_reorient: e.reorient_path,
        tool_select: e.mode_select,
        tool_source: e.source_save,
        tool_square: e.mode_square,
        tool_text: e.mode_text,
        tool_topath: e.to_path,
        tool_undo: e.undo,
        tool_ungroup: e.ungroup,
        tool_wireframe: e.wireframe_mode,
        view_grid: e.toggle_grid,
        tool_zoom: e.mode_zoom,
        url_notice: e.no_embed
      }, true);
      K.setLang(s, v)
    }
  };
  K.putLocale = function (v, G) {
    if (v) s = v;
    else {
      s = a.pref("lang");
      if (!s) {
        if (navigator.userLanguage) s = navigator.userLanguage;
        else if (navigator.language) s = navigator.language;
        if (s == "") return
      }
      console.log("Lang: " + s);
      if (a.inArray(s, G) == -1 && s !== "test") s = "en";
      if (s.indexOf("en") == 0) return
    }
    var e = K.curConfig.langPath + "lang." + s + ".js";
    a.getScript(e, function (f) {
      if (!f) {
        f = document.createElement("script");
        f.src = e;
        document.querySelector("head").appendChild(f)
      }
    })
  };
  return K
}(jQuery, svgEditor);