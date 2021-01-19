var e = require("../rangeSlider/rangeSlider.js"), n = "priceRangeSlider";

module.exports = {
    init: function(t, r, i, o, s, l) {
        function a(e, r) {
            var i = {};
            i[n + "LeftIndex"] = e, i[n + "RightIndex"] = r, t.setData(i);
        }
        var d = {};
        return console.log(i), d[n + "LeftIndex"] = i, d[n + "RightIndex"] = o, d[n + "TextDatas"] = r, 
        d[n + "Text"] = s, t.setData(d), e.init(t, r.length, i, o, 90, function(e, n) {
            a(e, n), console.log(r), l(e, n);
        }, !1, n), function(e, r) {
            console.log("reset rice range slider=" + e + " rIndex=" + r), console.log(t[n + "_resetIndex"]), 
            t[n + "_resetIndex"](e, r), a(e, r);
        };
    }
};