var CryptoJS = require('./aes');
const keyHex = CryptoJS.enc.Utf8.parse("PwKOAJv2DzYS70gk");
const iv = CryptoJS.enc.Utf8.parse("PwKOAJv2DzYS70gk");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isArray(t) {
  return Object.prototype.toString.call(t) == '[object Array]'
}

function isLeapYear(year) {
  var d = new Date(year, 1, 28);
  d.setDate(d.getDate() + 1);
  return d.getMonth() == 1;
}

function isString(t) {
  return "string" == typeof t && t.constructor == String;
}
var isObject = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (option) {
  return Object.prototype.toString.call(option) == "[object Object]";
} : function (option) {
  return option && "function" == typeof Symbol && option.constructor === Symbol && option !== Symbol.prototype ? "symbol" : typeof option;
};


function getFivePoint(t) {
  return (t = rating(t, 1)) > 5 && (t = rating(5 * t / 100, 1)), 1 == ("" + t).length && (t += ".0"),
    t;
}

function rating(t, n) {
  return Math.round(t * Math.pow(10, n)) / Math.pow(10, n);
}


function f(date) {
  10 == date.length && (date += "000");
  var idate = new Date();
  idate.setTime(date);
  var year = idate.getFullYear(),
    month = idate.getMonth() + 1,
    ri = idate.getDate(),
    hours = idate.getHours(),
    min = idate.getMinutes(),
    sec = idate.getSeconds();
  idate.getMilliseconds();
  return [year, month, ri].map(function (t) {
    return (t.toString())[1] ? t.toString() : '0' + t;
  }).join("-") + " " + [hours, min, sec].map(function (f) {
    return (f.toString())[1] ? f.toString() : '0' + f;
  }).join(":");
}

function dateTostring(t) { //1531843205
  return f(t = "" + t).substring(0, 10);
}

module.exports = {
  formatTime: formatTime,
  encrypt: function (word) {
    var encrypted = CryptoJS.AES.encrypt(word, keyHex, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  decrypt: function (word) {
    let decrypt = CryptoJS.AES.decrypt(word, keyHex, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  getFormatDate2: function (t, e) {
    return void 0 == t || "" == t || "undefined" == t ? "" : t.substring(5).replace("-", ".") + "-" + e.substring(5).replace("-", ".");
  },
  getUuid: function () {
    for (var r = [], n = 0; n < 36; n++) r[n] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
    return r[14] = "4", r[19] = "0123456789abcdef".substr(3 & r[19] | 8, 1), r[8] = r[13] = r[18] = r[23] = "-",
      r.join("");
  },
  checkEmpty: function (t) {
    if (null != t && undefined != t) {
      if (isString(t) && "" != t) return true;
    }
    return false;
  },
  getCommentTime: function (t) {
    var difference = new Date().getTime() - 1e3 * t;
    console.log(new Date());
    if (Math.floor(difference / 3600000) < 24) {
      return '今天';
    } else if (Math.floor(difference / 3600000) > 24 && Math.floor(difference / 3600000) <= 48) {
      return "昨天"
    } else {
      return dateTostring(t).replace(new RegExp(/-/g), ".");
    }
  },
  sort: function (t) {
    for (var e = 0; e < t.length - 1; e++)
      for (var n = 0; n < t.length - 1 - e; n++)
        if (t[n] > t[n + 1]) {
          var r = t[n];
          t[n] = t[n + 1], t[n + 1] = r;
        }
    return t;
  },
  getTimeStr: function (time, type, isencrypt) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) + "";
    var ri = date.getDate() + "";
    var hour = date.getHours();
    var minute = date.getMinutes();
    var sec = date.getSeconds();

    month.length < 2 && (month = "0" + month);
    ri.length < 2 && (ri = "0" + ri);
    hour < 10 && (hour = "0" + hour);
    minute < 10 && (minute = "0" + minute);
    sec < 10 && (sec = "0" + sec);
    if (isencrypt) {
      time = `${year}${month}${ri}${hour}${minute}${sec}`;
    } else {
      time = `${year}-${month}-${ri} ${hour}:${minute}:${sec}`;
    }
    return "date" == type ? time.substring(0, 10) : "datetime" == type ? time.substring(0, 19) : time;

  },
  getMonthStart: function (t) {
    var date = new Date(t);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) + "";
    var ri = "01";

    month.length < 2 && (month = "0" + month);
    return `${year}-${month}-${ri}`;
  },
  objDeepCopy: function (object) {
    var result = object instanceof Array ? [] : {};
    for (var key in object) {
      result[key] = isObject(object[key]) ? this.objDeepCopy(object[key]) : object[key];
    }
    return result;
  },
  getScore: function (r) { //93
    r = getFivePoint(r); // 4.7
    for (var e = new Array(), o = false, u = 1; u <= 5; u++)
      /* 如果4.7大于等于1 [100%, 100% ,100%, 100%, 70%] */
      r >= u ? e[u - 1] = "100%" : o ? e[u - 1] = "0%" : (e[u - 1] = rating(100 * (r + 1 - u), 0) + "%",
        o = true);
    return e;
  },
  getFivePoint: getFivePoint,
  Debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  getCheckDay: function (params) {
    if (params == true) {
      var t = new Date(new Date().setHours(0, 0, 0, 0) + 86400000 * 1);
    } else {
      var t = new Date(new Date().setHours(0, 0, 0, 0));
    }
    return `${t.getFullYear()}-${(t.getMonth() + 1 + "" ).length == 2 ?  t.getMonth() + 1 : "0" + (t.getMonth() + 1)}-${(t.getDate()  + "").length == 2 ? t.getDate() : "0" + t.getDate() }`
  },
  getWeek: function (t) {
    var t = new Date(t.replace(/-/g, "/")),
      a = new Date(),
      e = new Date();
    e.setDate(a.getDate() + 1);
    var n = new Date();
    n.setDate(a.getDate() + 2);
    var o = new Array(7);
    return o[0] = "周日", o[1] = "周一", o[2] = "周二", o[3] = "周三", o[4] = "周四", o[5] = "周五",
      o[6] = "周六", t.setHours(0, 0, 0, 0) == a.setHours(0, 0, 0, 0) ? "今天" : t.setHours(0, 0, 0, 0) == e.setHours(0, 0, 0, 0) ? "明天" : t.setHours(0, 0, 0, 0) == n.setHours(0, 0, 0, 0) ? "后天" : o[t.getDay()];
  },
  getmonthanddate: function (t) {
    var date = new Date(t.replace(/-/g, "/"));
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var ri = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return month + "月" + ri + "日";
  },
  getDays: function (t, a) {
    var e, n;
    e = t.split("-"), n = a.split("-");
    var o = new Date(e[0], e[1] - 1, e[2]),
      i = new Date(n[0], n[1] - 1, n[2]);
    return parseInt(Math.abs(o - i) / 1e3 / 60 / 60 / 24);
  },
  getBetween: function (stime, etime) {
    //初始化日期列表，数组
    var diffdate = new Array();
    var i = 0;
    //开始日期小于等于结束日期,并循环
    while (stime <= etime) {
      diffdate[i] = stime;

      //获取开始日期时间戳
      var stime_ts = new Date(stime).getTime();

      //增加一天时间戳后的日期
      var next_date = stime_ts + (24 * 60 * 60 * 1000);

      //拼接年月日，这里的月份会返回（0-11），所以要+1
      var next_dates_y = new Date(next_date).getFullYear() + '-';
      var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
      var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate();

      stime = next_dates_y + next_dates_m + next_dates_d;

      //增加数组key
      i++;
    }
    return diffdate;
  },
  getAge: function(date) {
    var d = new Date(date),
      now = new Date();
    var years = now.getFullYear() - d.getFullYear();
    d.setFullYear(d.getFullYear() + years);
    if (d > now) {
      years--;
      d.setFullYear(d.getFullYear() - 1);
    }
    var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
    return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
  }
}