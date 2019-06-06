// pages/participate/participate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   pages:1,
    type: 1
  },

  navigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  changeOil(e) {
    this.setData({
      type: parseInt(e.target.dataset.type),
      pages:1,
      items: []
    })
    this.request()
  },
  theGoods() {},

  /**
   * 生命周期函数--监听页面加载
   *
   * */
  onLoad: function (opt) {
    

  },
  request() {
    wx.request({
      url: getApp().url + "/user.myprice/stay_order",
      data: {
        userid: wx.getStorageSync('user').id,
        type: this.data.type,
        pages:this.data.pages
      },
      method: "POST",
      success: (res) => {
        console.log(res);
        
        let list
        this.data.pages > 1 ? list = this.data.list.concat(res.data.data.orderlists) : list = res.data.data.orderlists
        this.setData({
          // title: res.data.data.title,
          // tnum: res.data.data.tnum,
          // dnum: res.data.data.dnum,
          list,
          // allprice: res.data.data.allprice,
          allpage: res.data.data.allpage,
          pages: this.data.pages + 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
qrzt(e){
  //自提接接口 
  this.setData({
    pages:1
  })
  wx.request({
    url: getApp().url + "//user.used/okpro",
    data: {
      userid: wx.getStorageSync('user').id,
      oid: e.currentTarget.dataset.id 
    },
    method: "POST",
    success: (res) => {
      if (res.data.data.code==200) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: () => {
            this.request()
          },
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      }
      
    }
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.request()
  },
  sqtk(e){
   wx.showModal({
     title: "提示",
     content:"您确认给用户退款吗",
     showCancel: true,
     cancelText:"取消",
     confirmText:"确定",
     //cancelColor:"#000",
     //confirmColor:"#576B95",
     success:()=>{
       wx.request({
         url: getApp().url + "/user.used/refund",
         data: {
           id: e.currentTarget.dataset.id,
           ordernum: e.currentTarget.dataset.ordernum
         },
         method: "POST",
         success: (res) => {
          wx.showModal({
            title: "提示",
            content:res.data.msg,
            showCancel: false,
            //cancelText:"取消",
            //confirmText:"确定",
            //cancelColor:"#000",
            //confirmColor:"#576B95",
            success:()=>{
              this.request()
            },
            //fail: () => {},
            //complete: () => {},
          })
         }
       })

     },
     //fail: () => {},
     //complete: () => {},
   })
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

  onReachBottom(e) {
    if (this.data.pages <= this.data.allpage) {

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