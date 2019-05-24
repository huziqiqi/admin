// pages/participate/participate.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    num: 1,
    userId: getApp().userId,
    pages: 1,
    allpage: "",
    clientX: "",
    isLoading: false
  },

  navigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  theGoods() {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    this.setData({
      num: parseInt(opt.num)
    })
  },
  changeOil(e) {
    this.setData({
      num: parseInt(e.target.dataset.num),
      pages: 1
    })
    this.request(e.target.dataset.num)
  },
  start(e) {
    this.setData({
      clientX: e.touches[0].clientX
    })
    // console.log(e.touches[0].clientY);

  },
  end(e) {
    let val = e.changedTouches[0].clientX - this.data.clientX
    console.log(val);
    
    if (val < -150 && val > -300 && e.currentTarget.dataset.e != this.data.num) {
      let num = parseInt(this.data.num += 1)
      this.setData({
        pages: 1,
        num
      })
      this.request(num)
    }
    if (val < 300 && val > 150 && e.currentTarget.dataset.s != this.data.num) {
      let num = parseInt(this.data.num -= 1)
      this.setData({
        pages: 1,
        num
      })
      this.request(num)
    }
  },
  request(num) {
    wx.request({
      url: getApp().url + "/user.used",
      data: {
        userid: wx.getStorageSync('user').id,
        type: this.data.num,
        pages: this.data.pages
      },
      method: "POST",
      success: (res) => {
        let order
        this.data.pages > 1 ? order = this.data.order.concat(res.data.data.product) : order = res.data.data.product
       console.log(order);
       
        for (let i = 0; i < order.length; i++) {
          order[i].img= order[i].img.replace('http://yipin.xazbwl.com', getApp().url)     
        }
        this.setData({
          order,
          allpage: res.data.data.allpage,
          isLoading: true
        })
      }
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.request(this.data.num)

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
  onPullDownRefresh() {
    this.setData({
      pages: 1
    })
    this.request()
  },
  onReachBottom(e) {
    if (this.data.pages < this.data.allpage) {
      this.setData({
        pages: this.data.pages + 1
      })
      this.request()
    } else {
      wx.showToast({
        title: "暂无更多数据",
        icon: "none"
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})