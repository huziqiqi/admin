//index.js
//获取应用实例

const app = getApp()
const city = require('../../data/data.js')
var that
Page({
  data: {
    banner: [],
    array: [],
    dist: ["不限", "500米以内", "1000米以内", "2000米以内", "5000米以内"],
    cate: [{
      id: 0
    }],
    cateIndex: 0,
    dindex: 0,
    cindex: 0,
    lat: "",
    lng: "",
    mi: 0,
    city: null,
    product: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test: [],
    pages: 1,
    multiIndex: [0, 0],
    multiArray: city.data.multiArray,
    objectMultiArray: city.data.objectMultiArray,
    userId: getApp().userId,
    pages: 1,
    isShow: false,
  },
  onLoad: function (options) {
    wx.hideTabBar()
    if (options.scene) {
      var parentId = options.scene.split("&")[0].split("%3D")[1];
      var flg = options.scene.split("%26%26")
      var opt = {}
      opt.userid = flg[0].split("%3D")[1]
      opt.proid = flg[1].split("%3D")[1]
      wx.setStorageSync('opt', opt);
      if (wx.getStorageSync('user')) {
        this.fxjs(opt)
      }
    } else if (options.userid) {
      var opt = {}
      opt.userid = options.userid
      opt.proid = options.proid
      wx.setStorageSync('opt', opt);
      if (wx.getStorageSync('user')) {
        this.fxjs(opt)
      } 
    }     
    that = this
    this.setData({
      isLogin: wx.getStorageSync('user') ? true : false,
    })  
    this.request()
    this.testajax()    
  },
  fxjs(opt){
// var parentId = options.scene.split("&")[0].split("%3D")[1];
    if (wx.getStorageSync('user')) {
      let opt = {}
      opt.userid = wx.getStorageSync('user').id
      opt.proid = wx.getStorageSync('opt').proid
      // wx.setStorageSync('opt', opt);
      wx.navigateTo({
        url: "../ptxq/ptxq?proid=" + opt.proid + "&userid=" + opt.userid
      })
    } else {
      this.fxjs(e)
    }
  },
/**
 * @
 * @return xasx
 */
  testajax(){
    var flg=1
    if (flg==1) {
      wx.request({
        url: "https://api.huziqiqi.top",
        data: {
          s: "App.User.Login",
          username: "liuqi123",
          password: "xasxaxsa"
        },
        method: "POST",
        success: (res) => {
          console.log(res.data.data);
          wx.request({
            url: "https://api.huziqiqi.top",
            data: {
              s: "App.User.decryption",
              token: res.data.data          
            },
            method: "POST",
            success: (res) => {
              console.log(res.data.data);
              console.log(res.data.data.login_time*1000);
              console.log(new Date().getTime());
              console.log(new Date().getTime() - res.data.data.login_time * 1000);
            }
          })         
        }
      })
    } else {
      
    }
    
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      cindex: e.detail.value,
      pages: 1
    })
    let cate = this.data.cate[this.data.cindex].id;
    cate = cate != undefined ? cate : 0
    this.request()
  },
  bindRegionChange: function (e) {
    this.setData({
      dindex: e.detail.value,
    })
    let mi = this.data.dist[this.data.dindex].match(/\b\d{1,4}\d/g);
    mi = mi != null ? mi[0] : null
    this.setData({
      mi,
      page: 1
    })
    this.getLocation()
  },
  hishome(e){
    wx.navigateTo({
      url: "../seller/seller?postedId=" + e.currentTarget.dataset.postedid
    })
  
  },
  getLocation() {
    if (wx.getStorageSync('coordinates')) {
      this.setData({
        lat: wx.getStorageSync('coordinates').latitude,
        lng: wx.getStorageSync('coordinates').longitude,
      })
      this.request()
    } else {
      wx.showModal({
        title: "获取位置",
        content: "您希望获取你的地理位置吗",
        success: (res) => {
          wx.getLocation({
            success: (res) => {
              wx.setStorageSync('coordinates', res);
              this.getLocation()
            }
          })
        }
      })
    }
  },
  onPullDownRefresh() {
    this.setData({
      // product: [],
      pages: 1
    })
    this.request()
  },
  onReachBottom() {
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  fd(e) {
    let pid = e.currentTarget.dataset.pid
    let sid = e.target.dataset.sid

    if (sid == undefined) {
      this.toPtxq(e)
    } else {
      wx.previewImage({
        urls: this.data.product[pid].img,
        current: this.data.product[pid].img[sid]
      })
    }
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
    let city = this.data.multiArray[1][this.data.multiIndex[1]]
    city = " " ? city : null

    this.setData({
      city,
      pages: 1
    })
    this.request()
  },
  bindMultiPickerColumnChange: (e) => {
    let objectMultiArray = city.data.objectMultiArray
    switch (e.detail.column) {
      case 0:
        let list = []
        for (var i = 0; i < objectMultiArray.length; i++) {
          if (objectMultiArray[i].parid == objectMultiArray[e.detail.value].regid) {
            list.push(objectMultiArray[i].regname)
          }
        }
        const multiIndex = [e.detail.value, 0]
        that.setData({
          "multiArray[1]": list,
          multiIndex
        })
    }
  },
  request() {
    wx.showLoading({
      title: "加载中，请稍等",
      mask: true
    });
    wx.request({
      url: getApp().url,
      data: {
        pages: this.data.pages,
        cate: this.data.cate[this.data.cindex].id,
        lat: this.data.lat,
        lng: this.data.lng,
        mi: this.data.mi,
        city: this.data.city
      },
      method: "POST",
      success: (res) => {
        let cate = [{
          id: 0,
          title: "全部分类"
        }].concat(res.data.data.cate)
        let product =
          this.data.pages > 1 ? product = this.data.product.concat(res.data.data.product) : product = res.data.data.product
        this.fun(product, res.data.data.product)
        for (let i = 0; i < product.length; i++) {
          for (let j = 0; j < product[i].img.length; j++) {
            product[i].img[j] = product[i].img[j].replace('http://yipin.xazbwl.com', getApp().url)
          }
        }
        this.setData({
          product,
          banner: res.data.data.backimg,
          cate,
          allpage: res.data.data.allpage
        })
        wx.hideLoading();
        wx.stopPullDownRefresh()
      }
    })
  },

  fun(a, b) {
    this.data.pages > 1 ? a = this.data.a.concat(b) : a = b
    this.setData({
      a
    })
  },
  toPtxq(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../ptxq/ptxq?proid=" + id + "&userid=" + wx.getStorageSync('user').id + "&isjump=" + 1
    })
    
  }
})

// function palindrome(str) {
//   str = str.toLowerCase().replace(/\W/g, " ").replace(/_/g, " ").split("").filter(val => val !== " ")
//   console.log(str);
//   if (str.join("") == str.reverse().join("")) {
//     return true;
//   }
//   return false;
// }
// palindrome("0_0 (: /-\ :) 0-0")
// palindrome("ey.e e,ye");
