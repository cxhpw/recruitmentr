var app = getApp();

function requestPayment(sign, options) {
  console.log("开始支付" , sign, options);
  
  wx.requestPayment({
    appId: sign.appId,
    timeStamp: sign.timeStamp,
    nonceStr: sign.nonceStr,
    package: sign.package,
    signType: "MD5",
    paySign: sign.paySign,

    success: options.success || function(res){
      console.log("支付成功");
    },
    fail: options.fail || function(err){
      console.error("支付失败",err);
    },
    complete: options.complete || function(){}
  });

}

//获取签名
function paysign(options) {
  var temp = {};
  temp.apiname = "orderpay";
  temp.customrdsession = wx.getStorageSync("LogiSessionKey");
  temp.orderid = options.oid;
  console.log(options);
  app.request({
    url: app.api.wxhost + "/Include/Weixin/wechatdata",
    method: "POST",
    data: temp, 
    success: function (res) {
      console.log("签名", res);
      if(res.data.ret == "success"){
        requestPayment(res.data, options);
      }
    },
    fail: function () {
      console.log("error!");
    },
  });
}



var app = getApp();

module.exports = {
  payOrder: function (options) {
    paysign(options);
  },
  yuding: function (e, t) {
    return e.substring(5, 7) + "." + e.substring(8, 10) + "-" + t.substring(5, 7) + "." + t.substring(8, 10);
  }
};