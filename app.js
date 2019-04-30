//app.js
App({
  url: "https://wechat.mayituandui.vip",
  onLaunch() {
    this.update();
    if (!wx.getStorageSync('openid')) {
      this.wxLogin();
    }
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
        console.log(res.code);  

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

  shopImg: [],
  shopImgArr: [],
  globalData: {
    userInfo: null
  }
})