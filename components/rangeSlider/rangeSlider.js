module.exports = {
    init: function(t, a, e, n, s, r) {
        var i, o = arguments.length > 6 && void 0 !== arguments[6] && arguments[6], l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "", h = 0, c = 0, f = a, g = 0, u = o, d = r, v = e, D = n, L = l + "_rangeSlider_data", R = 0;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a.windowWidth), c = a.windowWidth, R = s * (c / 750), console.log("padding=" + R + " p=" + s);
                var e = (h = c - 2 * R) / (f - 1);
                g = -14;
                var n = {};
                n[L] = {
                    comKey: l,
                    translateLeft: g + v * e,
                    translateRight: g + (f - 1 - D) * e,
                    isSingoBtn: u
                }, t.setData(n);
            }
        }), t[l + "_buttonStart"] = function(t) {
            console.log("buttonStart"), i = t.touches[0];
        }, t[l + "_buttonMove"] = function(t) {
            var a = "left" == t.currentTarget.dataset.key, e = t.touches[t.touches.length - 1], n = e.clientX - i.clientX;
            i = e;
            var s = this.data[L];
            if (a) {
                var r = s.translateLeft + n;
                r - g < 0 ? r = g : (c = h + g, u || (c -= h / (f - 1) * (f - D)), r > c && (r = c));
                var o = {};
                o[L + ".translateLeft"] = r, this.setData(o);
            } else {
                var l = s.translateRight - n;
                if (l - g < 0) l = g; else {
                    var c = h + g;
                    u || (c -= (v + 1) * (h / (f - 1))), l > c && (l = c);
                }
                var d = {};
                d[L + ".translateRight"] = l, this.setData(d);
            }
        }, t[l + "_buttonEnd"] = function(t) {
            var a = this.data[L], e = "left" == t.currentTarget.dataset.key, n = e ? a.translateLeft : a.translateRight, s = h / (f - 1), r = parseInt((n + 14 + s / 2) / s);
            if (e) {
                v = r;
                var i = {};
                i[L + ".translateLeft"] = g + r * s, this.setData(i);
            } else {
                D = f - 1 - r;
                var o = {};
                o[L + ".translateRight"] = g + r * s, this.setData(o);
            }
            d(v, D);
        }, t[l + "_resetIndex"] = function(t, a) {
            v = t, D = a;
            var e = h / (f - 1), n = {};
            n[L + ".translateLeft"] = g + v * e, n[L + ".translateRight"] = g + (f - 1 - D) * e, 
            this.setData(n);
        };
    }
};