//app.js
var fundebug = require('./libs/fundebug.1.2.1.min.js');
var flg=1
if (flg==1) {
  var releaseStage = "开发环境"
} else if(flg==2){
  var releaseStage = "测试环境"
}else{
  var releaseStage = "生产环境"
}
fundebug.init(
  {
    apikey: '3011bf97f509533a48f598e96ce7a28c7293325580b7646ebb55c9f23a9ad2d7',
    releaseStage
  })
App({
  url: "https://wechat.mayituandui.vip",
  onLaunch() {
    this.update();
    if (!wx.getStorageSync('openid')) {
      this.wxLogin();
    }    
    // fundebug.test(
    //   "debug","一个BUG"
    // );
    // wx.switchTab({
    //   url: "pages/personal/personal"
    // })
  },
  // 更新版本
  update: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function (res) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '更新失败'
      })
    })
  },
  wxLogin: function () {
    let that = this;
    wx.login({
      success: function (res) {
        // console.log(res.code);  
        wx.request({
          url: 'https://wechat.mayituandui.vip/user.login/getOpenId',
          method: 'POST',
          data: {
            code: res.code
            },
            success: function (res) {              
              if (res.data.code == 200) {
                wx.setStorageSync('openid', res.data.data);
              } else {
                that.wxLogin();
              }
            }
          })
      }
    })
  },
 
  ajax(obj) {
    wx.showLoading({
      title: "加载中，请稍等",
      mask: true
    });
    if (flg==3) {
      wx.request({
        url: obj.url,
        method: obj.method,
        data: obj.data,
        success(res) {
          wx.hideLoading();
          fundebug.notifyHttpError(
            {
              url: obj.url,
              method: obj.method,
              data: obj.data,
            },
            {
              data: res.data
            }
          );
          obj.callback && obj.callback(res);
        }
      })
    } else {
      wx.request({
        url: obj.url,
        method: obj.method,
        data: obj.data,
        success(res) {
          wx.hideLoading();
          fundebug.notifyHttpError(
            {
              url: obj.url,
              method: obj.method,
              data: obj.data,
            },
            {
              data: res.data
            }
          );
          obj.callback && obj.callback(res);
        }
      })
    }
    wx.request({
      url: obj.url,
      method: obj.method,
      data: obj.data,
      success(res) {
        wx.hideLoading();
        obj.callback && obj.callback(res);
      }
    })
  },
  request(obj) {
    wx.showLoading({
      title: "加载中，请稍等",
      mask: true
    });
   
  },

  shopImg: [],
  shopImgArr: [],
  globalData: {
    isIphoneX: false,
    userInfo: null,
    fundebug: fundebug
  }
})

function GetIP() {
  if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $cip = $_SERVER["HTTP_CLIENT_IP"];
  }
  else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
    $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
  }
  else if(!empty($_SERVER["REMOTE_ADDR"])){
    $cip = $_SERVER["REMOTE_ADDR"];
  }else {
    $cip = "无法获取！";
  }
  return $cip;
}

