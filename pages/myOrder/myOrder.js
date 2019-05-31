// pages/participate/participate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    num: 0,
    userId: getApp().userId,
    pages: 1,
    status: 0,
    allpage: "",
    clientX: ""
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
  onLoad: function () {
    this.request()
  },
  request() {
    wx.request({
      url: getApp().url + "//user.order",
      data: {
        userid: wx.getStorageSync('user').id,
        status: this.data.num,
        pages: this.data.pages,
      },
      method: "POST",
      success: (res) => {
        if (res.data.data.num == 0) {
          // wx.showToast({
          //   title: "暂无单买记录",
          //   icon: "none"
          // })
        } else {
          let items
          this.data.pages > 1 ? items = this.data.items.concat(res.data.data.list) : items = res.data.data.list
          this.setData({
            items,
            allpage: res.data.data.allpage
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    this.setData({
      pages: 1
    })
    this.request()
  },
  onReachBottom(e) {
    if (this.data.pages < this.data.allpage) {
      this.setData({
        pages: this.data.pages + 1,
      })
      this.request()
    }

  },
  changeOil(e) {
    this.setData({
      num: parseInt(e.target.dataset.num),
      status: e.target.dataset.num,
      items: [],
    })
    this.request()
  },
  start(e) {
    this.setData({
      clientX: e.touches[0].clientX
    })
    // console.log(e.touches[0].clientY);

  },
  end(e) {
    let val = e.changedTouches[0].clientX - this.data.clientX
    if (val < 0 && e.currentTarget.dataset.e != this.data.num) {
      this.setData({
        num: this.data.num += 1,
        items: [],

      })
      this.request()
    }
    if (0 < val && e.currentTarget.dataset.s != this.data.num) {
      this.setData({
        num: this.data.num -= 1,
        items: [],

      })
      this.request()

    }


    // console.log(e.touches[0].clientY);

  },
})