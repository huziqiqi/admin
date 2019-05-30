// pages/set_message/set_message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['用户单独买商品时所获佣金金额', '1', '2', '3', '4'],
    index: 0,
    arrays: ['用户拼团买商品时所获佣金金额', '1', '2', '3', '4'],
    indexs: 0,
    shopImgArr: "",
    title: "",
    info: "",
    cateid: "",
    deck: "",
    aponeprice: "",
    price: "",
    nums: "",
    stock: "",
    city: "",
    address: "",
    lat: "",
    lng: "",
    isshop: true,
    isAddress: true,
    addressid: "",
    addressName: "",
    type: "",
    msg: '',
    userId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {

    this.setData({
      userId: opt.userId
    })

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickersChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  address() {
    wx.chooseLocation({
      success: (res) => {
        let region = res.address
        let reg = /(.*省|.*市|.*区|.*县)/
        region = region.split(reg);
        let city = region[3]
        let address = region[5] + region[6] + res.name

        this.setData({
          city,
          address,
          lat: res.latitude,
          lng: res.longitude,
          isAddress: false,
          type: this.data.type
        })
      }
    })
  },
  radioChange(e) {
    let isAddressid
    e.detail.value == 1 ? isAddressid = false : isAddressid = true
    if (e.detail.value == 1 ) {
    var  addressId =null
      var addressName=null
    }
    this.setData({
      isAddressid,
      addressId,
      addressName
    })
  },
  submit(e) {
    console.log( getApp());
    
    wx.getStorage({
      key: "optn",
      success: (res) => {
        if (e.detail.value.isshop==1) {
        var addressid=  this.data.addressId
        } 
        let objs = {
          url: getApp().url + "//addPro",
          data: {
            user_id: wx.getStorageSync('user').id,
            title: res.data.title,
            cateid: res.data.cateid,
            deck: res.data.deck,
            price: res.data.price,
            oneprice: res.data.oneprice,
            nums: res.data.nums,
            imgs: res.data.imgs,
            stock: res.data.stock,
            info: res.data.info,
            end_time: res.data.end_time,
            city: this.data.city,
            address: this.data.address,
            lat: this.data.lat,
            lng: this.data.lng,
            fanli: e.detail.value.fanli,
            onefanli: e.detail.value.onefanli,
            delivery: e.detail.value.isshop,
            addressid,
          },
          method: "POST",
          opt:{
            delivery:"1为自提,2为快递"
          },
          callback: (res) => {
            if (res.data.code == 200) {
              wx.showModal({
                title: "提示",
                content: res.data.msg,
                showCancel: false,
                //cancelText:"取消",
                //confirmText:"确定",
                //cancelColor:"#000",
                //confirmColor:"#576B95",
                success: () => {
                  wx.setStorageSync('opt', {});
                  wx.setStorageSync('shdz', {});
                  wx.navigateTo({
                    url: "../launch/launch?num=1"
                  })
                },
                //fail: () => {},
                //complete: () => {},
              })

            } else {
              this.tips(res.data.msg)
              console.log(res.data.msg);
              if (res.data.msg == "请认证后再发布拼团") {
                wx.navigateTo({
                  url: "../certification/certification"
                })
              }

            }
          }
        }
        app.ajax(objs)
        
      }
    })
  },
  tips(msg) {
    wx.showModal({
      title: "提示",
      content: msg,
      showCancel: false,
      //cancelText:"取消",
      //confirmText:"确定",
      //cancelColor:"#000",
      //confirmColor:"#576B95",
      success: ()=>{
       
      },
      //fail: () => {},
      //complete: () => {},
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
    wx.getStorage({
      key: "shdz",
      success: (res) => {
        this.setData({
          addressId: res.data.id,
          addressName: res.data.provinces + res.data.address
        })
      }

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})