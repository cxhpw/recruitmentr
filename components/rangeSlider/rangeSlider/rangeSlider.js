module.exports = {
  init: function (t, a, e, n, s, r) {
    var i, l = arguments.length > 6 && void 0 !== arguments[6] && arguments[6],
      o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "",
      h = 0,
      c = 0,
      f = a,
      d = 0,
      g = l,
      u = r,
      v = e,
      D = n,
      L = o + "_rangeSlider_data",
      R = 0;
    wx.getSystemInfo({
      success: function (a) {
        console.log(a.windowWidth), c = a.windowWidth, R = s * (c / 750), console.log("padding=" + R + " p=" + s);
        var e = (h = c - 2 * R) / (f - 1);
        d = -14;
        var n = {};
        n[L] = {
          comKey: o,
          translateLeft: d + v * e,
          translateRight: d + (f - 1 - D) * e,
          isSingoBtn: g
        }, t.setData(n);
      }
    }), t[o + "_buttonStart"] = function (t) {
      i = t.touches[0];
    }, t[o + "_buttonMove"] = function (t) {
      var a = "left" == t.currentTarget.dataset.key,
        e = t.touches[t.touches.length - 1],
        n = e.clientX - i.clientX;
      i = e;
      var s = this.data[L];
      if (a) {
        var r = s.translateLeft + n;
        r - d < 0 ? r = d : (c = h + d, g || (c -= h / (f - 1) * (f - D)), r > c && (r = c));
        var l = {};
        l[L + ".translateLeft"] = r, this.setData(l);
      } else {
        var o = s.translateRight - n;
        if (o - d < 0) o = d;
        else {
          var c = h + d;
          g || (c -= (v + 1) * (h / (f - 1))), o > c && (o = c);
        }
        var u = {};
        u[L + ".translateRight"] = o, this.setData(u);
      }
    }, t[o + "_buttonEnd"] = function (t) {
      var a = this.data[L],
        e = "left" == t.currentTarget.dataset.key,
        n = e ? a.translateLeft : a.translateRight,
        s = h / (f - 1),
        r = parseInt((n + 14 + s / 2) / s);
      if (e) {
        v = r;
        var i = {};
        i[L + ".translateLeft"] = d + r * s, this.setData(i);
      } else {
        D = f - 1 - r;
        var l = {};
        l[L + ".translateRight"] = d + r * s, this.setData(l);
      }
      u(v, D);
    }, t[o + "_resetIndex"] = function (t, a) {
      v = t, D = a;
      var e = h / (f - 1),
        n = {};
      n[L + ".translateLeft"] = d + v * e, n[L + ".translateRight"] = d + (f - 1 - D) * e,
        this.setData(n);
    };
  }
};