let app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        this.setData({
          isShow: newVal
        })
      }
    }
  },
  data: {
    flg:1
  },
  /**
   * 组件的公有方法列表
   */
  methods: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow:true
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow:false
      })
    },
    bindGetUserInfo() {
      let that = this;
      if (!wx.getStorageSync('user')) {
        wx.getUserInfo({
          success: function (res) {         
                that.hideDialog();
                let userInfo = {};
                userInfo.userName = res.userInfo.nickName;
                userInfo.avatar = res.userInfo.avatarUrl;
                wx.request({
                  url: getApp().url + '/user.login/wxlogin',
                  method: "POST",
                  data: {
                    openid: wx.getStorageSync('openid'),
                    headimgurl: userInfo.avatar,
                    nickname: userInfo.userName,
                  },
                  success: function (res) {
                    if (res.data.code == 200) {
                      wx.setStorageSync('userInfo', userInfo);
                      wx.setStorageSync('user', res.data.data);
                      wx.request({
                        url: getApp().url + '/user.login/wxlogin',
                        method: "POST",
                        data: {
                          openid: wx.getStorageSync('openid'),
                          headimgurl: userInfo.avatar,
                          nickname: userInfo.userName,
                        },
                        success: function (res) {
                          if (res.data.code==200) {
                            that.setData({
                              isShow: true
                            }) 
                          }        
                        }
                      })                    
                    }
                    else{
                     that.bindGetUserInfo()
                    }
                  }
                })
              }
        })
      }else{
        that.hideDialog()     
      }
    }
  }
})