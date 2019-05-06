// pages/participate/participate.js
var app = App
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pages: 1,
    num: 0,
    items: [],
    allpage: 1,
    toggle: true
  },
  onLoad() {
    wx.hideTabBar()
    this.setData({
      userId: wx.getStorageSync('user').id
    })
  },
  navigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  changeOil(e) {
    this.setData({
      num: parseInt(e.target.dataset.num),

      items: []
    })
    this.request()
  },
  theGoods() {},

  start(e) {
    this.setData({
      clientX: e.touches[0].clientX
    })
    // console.log(e.touches[0].clientY);

  },
  end(e) {
    let val = e.changedTouches[0].clientX - this.data.clientX
    if (val < -50 && val > -300 && e.currentTarget.dataset.e != this.data.num) {
      let num = parseInt(this.data.num += 1)
      this.setData({
        pages: 1,
        num,
        items: []
      })
      this.request()
    }
    if (0 < 300 && val > 50 && e.currentTarget.dataset.s != this.data.num) {
      let num = parseInt(this.data.num -= 1)
      this.setData({
        pages: 1,
        num,
        items:[]
      })
      this.request()
    }
  },
  request() {
    wx.request({
      url: getApp().url + "/user.group",
      data: {
        userid: wx.getStorageSync('user').id,
        status: this.data.num,
        pages: this.data.pages
      },
      method: "POST",
      success: (res) => {
        if (res.data.data.num == 0) {
          // wx.showToast({
          //   title: "暂时没有参团记录",
          //   icon: "none"
          // })
        } else {
          let items
          this.data.pages > 1 ? items = this.data.items.concat(res.data.data.list) : items = res.data.data.list
          this.setData({
            items,
            allpage: res.data.data.allpage,
          })
        }

      }
    })
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
    let pages = this.data.pages
    if (pages < this.data.allpage) {
      pages += 1
      this.setData({
        pages
      })
      this.request()
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.request()

  },
})