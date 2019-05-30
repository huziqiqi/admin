// pages/goodsDetail/goodsDetail.js
let goodsList = [{
  actEndTime: '2019-05-01 10:00:43'
}, ]
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    userId: "",
    proid: 0,
    info:{},
  flag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    wx.request({
      url: getApp().url + "//user.used/detail",
      data: {
        userid: wx.getStorageSync('user').id,
        proid: opt.proid,

      },
      method: "POST",
      success: (res) => {
        let data = res.data.data.info     
       var endTime= Date.parse(data.end_time)
        this.setData({
          item: data,
          userId: opt.userid,
          proid: opt.proid,
        })
        this.countDown(endTime);

        getApp().globalData.fundebug.notify("倒计时", "倒计时手机不显示!", {
          metaData: {
            endTime: endTime
          }
        });
      }
    })
  },

 onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.item.title,   
      path: '/pages/index/index?userid=' + wx.getStorageSync('user').id+'&proid='+this.data.item.id,
    }
  },

  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  showmedio(){
  
    wx.showModal({
      title	:"提示",
      content:"您确认要终止订单吗",
      success:(res)=>{
        if (res.confirm) {
          // console.log('用户点击确定')
          this.stoppt()
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  stoppt() {
    wx.request({
      url: getApp().url + "//user.used/overGroup",
      data: {
        user_id: wx.getStorageSync('user').id,
        proid: this.data.item.id
      },
      method: "POST",
      success: (res) => {
        if (res.data.code = 200) {
          wx.showToast({
            title: res.data.msg
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }

      }
    })
  },
  
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: '18282957326' //仅为示例，并非真实的电话号码
    })
  },
  show: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */

  countDown(endTime) { //倒计时函数  
    let newTime = new Date().getTime();
    
    console.log(endTime);
 
    let time = (endTime - newTime) / 1000;
    let obj = null;
   
    if (time > 0) {
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else { //活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
    // })
    // 渲染，然后每隔一秒执行一次倒计时函数
    
    this.setData({
      countDownList:obj
    })
    setTimeout(this.countDown(endTime), 1000);
  }
})