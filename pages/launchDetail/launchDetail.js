// pages/goodsDetail/goodsDetail.js
let goodsList = [{
  actEndTime: '2019-05-01 10:00:43'
}, ]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    userId: "",
    proid: 0,
    info:{}
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

        for (let j = 0; j < res.data.data.info.imgs.length; j++) {
          data.imgs[j] = data.imgs[j].replace('http://yipin.xazbwl.com', getApp().url)
        }
        this.setData({
          item: data,
          userId: opt.userid,
          proid: opt.proid,
          actEndTimeList: [data.end_time]
        })
      }
    })
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => {
      endTimeList.push(o.actEndTime)
    })
    this.setData({
      actEndTimeList: endTimeList
    });
    // 执行倒计时函数
    this.countDown();
  },

 onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index?userid=' + wx.getStorageSync('user').id+'proid='+this.item.id,
      imageUrl: "https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=2a5524e6e8cd7b89f66c3c833f244291/1e30e924b899a901b25a7f1a13950a7b0208f5ab.jpg"
    }
  },

  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
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
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
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
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
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
  onShareAppMessage: function () {

  },
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
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
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
  }
})