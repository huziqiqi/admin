Page({
  data: {
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    array: ['西安市未央印象城', '西安市未央印象城'],
    index: 0,
    txtOrderCode: '',
    item: "",
    address: "",
    isAddressid: false,
    addressId: "",
    addressName: "",
    userId: getApp().userId,
    groupId: "",
    isone: "",
    type: "",
    addressId:-10
  },
  onLoad(opt) {
    console.log(wx.getLaunchOptionsSync().query);
    wx.setStorageSync('shdz',{})
    let isone
    if (opt.isone == "true") {
      isone = true
    } else {
      isone = false
    }
    this.setData({
      isone,
      isshop: opt.isshop,
      userId: wx.getStorageSync('user').id,
      type: opt.type
    })
    // wx.getStorage({
    //   key: "userId",
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({
    //       // userId: res.data,
    //       isone,
    //       isshop: opt.isshop,
    //       userId: opt.userId
    //     })
    //   }
    // })
    wx.request({
      url: getApp().url + "//group",
      data: {
        userId: this.data.userId,
        groupId: opt.id,
        type: this.data.type
      },
      method: "POST",
      success: (res) => {
       if (res.data.code==200) {
         this.setData({
           item: res.data.data.pro,
           addArr: res.data.data.address,
           address: opt.address,
           groupId: opt.id
         })
       } else {
         wx.showModal({
           title: '提示',
           content: res.data.msg,
           showCancel: false,
           complete(){
             wx.navigateBack({
               delta:1
             })
           }
         })
       }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!this.data.isone) {
      wx.setNavigationBarTitle({
        title: "拼团买"
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  sumbit(e) {    
    let addressid = null
    let pick_up = null
    let consignee = null
    let consignee_phone = null
    if (this.data.groupId == wx.getLaunchOptionsSync().query.proid) {
      var parentid = wx.getLaunchOptionsSync().query.userid     
    }
    if (this.data.item.delivery == 2) {
      //物流
      addressid = this.data.addressId
      wx.request({
        url: getApp().url + "/groupBuying",
        data: {
          userId: this.data.userId,
          groupId: this.data.groupId,
          num: this.data.num,
          remark: e.detail.value.remark,
          addressid,
          type: this.data.type,
          parentid
        },
        method: "POST",
        success: (res) => {
          if (res.data.code == 200) {
            this.pay(res.data.data)
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
          getApp().globalData.fundebug.notifyHttpError("分享功能测试", "parentid为分享者的id", 
             {
              method: "POST",
               url: getApp().url + "/groupBuying",
              data: {
              userId: this.data.userId,
              groupId: this.data.groupId,
              num: this.data.num,
              remark: e.detail.value.remark,
              addressid,
              type: this.data.type,
              parentid
            },
            },
            {
              data:res.data
            }
          )
        }
      })
    } else {
      // console.log(this.data.addArr[0].id);  
      pick_up = this.data.addArr[0].id
      consignee = e.detail.value.consignee
      consignee_phone = parseInt(e.detail.value.consignee_phone)    
      wx.request({
        url: getApp().url + "/groupBuying",
        data: {
          userId: this.data.userId,
          groupId: parseInt(this.data.groupId),
          num: this.data.num,
          remark: e.detail.value.remark,
          pick_up,
          consignee,
          consignee_phone,
          type: parseInt(this.data.type),
          parentid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }, 
        method: "POST",
        success: (res) => {
          if (res.data.code==200) {
            this.pay(res.data.data)            
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
          getApp().globalData.fundebug.notifyHttpError(
            {
              method: "POST",
              url: getApp().url + "/groupBuying",
              data: {
                userId: this.data.userId,
                groupId: parseInt(this.data.groupId),
                num: this.data.num,
                remark: e.detail.value.remark,
                pick_up,
                consignee,
                consignee_phone,
                type: parseInt(this.data.type),
                parentid
              },
            },
            {
              data: res.data
            }
          )
          // wx.navigateTo({
          //   url: '../myOrder/myOrder'
          // })
        }
      })
    }
   
  },
  pay: function (res) {
    const that = this;
    wx.showLoading({
      title: '支付中',
    })
    console.log(res);    
    wx.requestPayment({
      timeStamp: '' + res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: 'MD5',
      paySign: res.paySign,
      success: function (res) {
        wx.hideLoading();
        if (res.errMsg == 'requestPayment:ok') {
          wx.showToast({
            title: '支付成功',
            mask: true,
            duration: 1000,
            icon: 'success'
          })
          let timer = setTimeout(function () {
            if (that.data.isone) {
              wx.redirectTo({
                url: "../myOrder/myOrder"
              })
            } else {
              wx.switchTab({
                url: "../order/order"
              })
            }  
            clearTimeout(timer);
          }, 1000);
        } else {
          wx.showModal({
            title: '提示',
            content: '支付失败',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '支付失败',
          showCancel: false
        })        
        wx.hideLoading();
      }
    })
  },
  radioChange(e) {
    let isAddressid
    e.detail.value == 2 ? isAddressid = false : isAddressid = true
    this.setData({
      isAddressid,
    })
  },
  onShow: function () {
    wx.getStorage({
      key: "shdz",
      success: (res) => {
        this.setData({
          addressId: res.data.id,
          addressName: res.data.provinces + res.data.address,
          add: res.data
        })
      }
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  }
})