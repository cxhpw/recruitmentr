var e = require("../rangeSlider/rangeSlider.js"), t = "distanceRangeSlider";

module.exports = {
    init: function(n, i, a, r, d) {
        var s = {};
        s[t + "LeftIndex"] = a, s[t + "RightIndex"] = r, s[t + "TextDatas"] = i, n.setData(s), 
        e.init(n, i.length, a, r, 90, function(e, i) {
            var a = {};
            a[t + "LeftIndex"] = e, a[t + "RightIndex"] = i, n.setData(a), console.log("distanceRangeSlider"), 
            d(e, i);
        }, !0, t);
    }
};