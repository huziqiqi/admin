// pages/ptxq/ptxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    price: "126",
    oneprice: 100,
    peo_num: "10",
    pro_num: "120",
    yd: "包邮",
    tg_prices: 5,
    fan_price: 10,
    title: "",
    nr: [
      "1.不可顺延收花日期，不可修改地址。",
      "2.「水瓶座主题花 」包装为普通花材包装，适合自用。「 水瓶座主题花 · 当日达款」为花艺师精心搭配礼品包装，适合送礼。",
      "1.不可顺延收花日期，不可修改地址。",
      "2.「水瓶座主题花 」包装为普通花材包装，适合自用。「 水瓶座主题花 · 当日达款」为花艺师精心搭配礼品包装，适合送礼。",
      "3.鲜花经过运输，部分花材可能会出现轻微脱水现象属正常现象。收花后请剪根深水养。"
    ],
    address: "西安市未央区印象城",
    hits: 0,
    num: 0,
    isShow: false,
    id: "",
    userId: getApp().userId,
    isshow: 1,
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    this.setData({
      isLogin: wx.getStorageSync('user') ? true : false ,
    })
    console.log(wx.getLaunchOptionsSync())
    wx.showLoading({
      title: "加载中，请稍等",
      mask: true
    });
    console.log(opt);
    if (wx.getLaunchOptionsSync().query.proid&opt.isjump!=1) {
      console.log("您通过分享登陆，但是没有登录");
      wx.request({
        url: getApp().url + "/product/detail",
        data: {
          proid: wx.getLaunchOptionsSync().query.proid,
          userid: wx.getLaunchOptionsSync().query.userid
        },
        method: "POST",
        success: (res) => {     
          this.setData({
            item: res.data.data.info,
            userbuy: res.data.data.userBuy,
            fbr:res.data.data.user,
            isShow: true,
            opt: wx.getLaunchOptionsSync().query
          })
          console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.data.item.id);
          wx.hideLoading();
          this.qrcode(opt)

        }
      })

    } else {
      wx.request({
        url: getApp().url + "/product/detail",
        data: {
          proid: opt.proid,
          userid: opt.userid
        },
        method: "POST",
        success: (res) => {
          // for (let j = 0; j < res.data.data.info.imgs.length; j++) {
          //   res.data.data.info.imgs[j] = res.data.data.info.imgs[j].replace('http://yipin.xazbwl.com', getApp().url)
          // }
          this.setData({
            item: res.data.data.info,
            userbuy: res.data.data.userBuy,
            isShow: true,
            fbr: res.data.data.user,
            opt:opt
          })
          this.qrcode(opt)

          console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.data.item.id);
          wx.hideLoading();
        }
      })
      // this.qrcode(opt)
    }
  
    // console.log(this.timestampToTime(1557541669));
  },
  qrcode(opt) {
    console.log(opt);    
    wx.request({
      url: getApp().url + "/Share",
      data: {
        proid: opt.proid,
        userid:opt.userid
      },
      method: "POST",
      success: (res) => {
        this.setData({
          qrcode: res.data
        })
        wx.hideLoading();
      
      }
    })
  },
  onShareAppMessage(res) {
    console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.item.id);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index?userid=' + wx.getStorageSync('user').id+'&proid='+this.item.id,
      imageUrl: "https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=2a5524e6e8cd7b89f66c3c833f244291/1e30e924b899a901b25a7f1a13950a7b0208f5ab.jpg"
    }
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
  choose() {
    this.setData({
      isshow: true
    })
  },
  isShow(e) {
const opt={
  proid:this.data.opt.proid,
  userid: wx.getStorageSync('user').id
}
if (this.data.isshow==1) {
  console.log(opt);

  this.qrcode(opt)
}


    this.setData({
      isshow: e.target.dataset.is
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
  onShareAppMessage: function () {},

  showImg() {
    wx.previewImage({
      current: 0,
      urls: [this.data.prurl],
    })
  },
  save() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                hidden: true,
                isshow: 10086
              })
            }
          }
        })
      }
    })
  },
  share() {
    var that = this
    var text = that.data.item.title;
    var k = 5
    // 放大系数
    var promise = new Promise(function (resolve, reject) {
      wx.downloadFile({
        url: that.data.item.imgs[0],
        // url: getApp().url+"/public/static/images/ewm.jpg",
        success: (res) => {
          that.setData({
            localimgdata: res.tempFilePath
          })
          resolve(res);
        }
      })
    })

    var promise0 = new Promise(function (resolve, reject) {
      wx.downloadFile({
        url: that.data.qrcode,
        success: (res) => {
          that.setData({
            localimgdata1: res.tempFilePath
          })
          resolve(res);
        }
      })
    })


    Promise.all([promise, promise0]).then(res => {
      var promise1 = new Promise(function (resolve, reject) {
        let path = that.data.localimgdata
        wx.getImageInfo({
          src: path,
          success: function (res) {
            resolve(res);
          }
        })
      });
      let promise2 = new Promise(function (resolve, reject) {
        let path = that.data.localimgdata1
        let localpath = '../../images/ewm.jpg'
        wx.getImageInfo({
          // src: localpath,
          src: path,
          success: function (res) {
            resolve(res);
          }
        })
        // let path = getApp().url+"/public/static/images/ewm.jpg"
        // console.log(path[0]);
        // wx.getImageInfo({
        //   src: getApp().url+"/public/static/images/ewm.jpg",
        //   success: function (res) {
        //     console.log(res)
        //     resolve(res);
        //   }
        // })
      });
      Promise.all(
        [promise1, promise2]
      ).then(res => {
        const ctx = wx.createCanvasContext('shareImg')
        ctx.rect(0-k, 0-k, (375+2)*k, 750*k)
        // ctx.rect(-2, -2, 1129, 1804)
        ctx.setFillStyle('#fff')
        ctx.fill()
        ctx.setFillStyle('#000')
        ctx.setFontSize(16*k)
        ctx.fillText("爱蚁拼", 165*k, 33*k);
     
        ctx.drawImage(res[0].path, 15*k, 55*k, 345*k, 345*k)
        // ctx.drawImage(res[0].path, 45, 165, 1035, 1035)
        ctx.setTextAlign('left')
        ctx.setTextBaseline("top")
        ctx.setFillStyle('#000')
        ctx.setFontSize(16 * k)
        var chr = text.split("");
        var row = [];
        var temp = []
        ctx.setFontSize(16 * k)
        for (var a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < 220*k) {
            temp += chr[a];
          } else {
            a--;
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);
        if (row.length > 2) {
          var rowCut = row.slice(0, 2);
          var rowPart = rowCut[1];
          var test = "";
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {_
            if (ctx.measureText(test).width < 220 * k) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          var group = empty[0] + "..."
          rowCut.splice(1, 1, group);
          row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
          ctx.fillText(row[b], 15 * k, 425 * k + b * 25 * k, 220 * k);
        }
        // ctx.setFillStyle('#af0d1d')
        var x=250*k
        var y = 428 * k
        
        ctx.drawImage(res[1].path, x + 5 * k, y + 5 * k, 90 * k, 90 * k)  
        ctx.setFillStyle('#f2001c')
        ctx.setFontSize(9 * k)           
        ctx.fillText("扫描或长按二维码", x + 14 * k, y - 8 * k);
        ctx.setLineWidth(k)
        ctx.moveTo(x, y + 10 * k)
        ctx.lineTo(x, y + 10 * k)
        ctx.lineTo(x, y)
        ctx.lineTo(x + 10 * k,y)

        ctx.moveTo(x + 90 * k, y)
        ctx.lineTo(x + 90 * k, y)
        ctx.lineTo(x + 100 * k, y)
        ctx.lineTo(x + 100 * k, y + 10 * k)

        ctx.moveTo(x + 90 * k, y + 100 * k)
        ctx.lineTo(x + 90 * k, y + 100 * k)
        ctx.lineTo(x + 100 * k, y + 100 * k)
        ctx.lineTo(x + 100 * k, y + 90 * k)

        ctx.moveTo(x + 10 * k, y + 100 * k)
        ctx.lineTo(x + 10 * k, y + 100 * k)
        ctx.lineTo(x, y + 100 * k)
        ctx.lineTo(x, y + 90 * k)
        ctx.setStrokeStyle('#f2001c')
        ctx.setFillStyle('#fdd501')
        ctx.setFontSize(24 * k)
        ctx.fillText("团购价￥" + that.data.item.price, 15 * k, 460 * k + (b - 1) * 25 * k);       
        ctx.setFillStyle('#a5a5a5')
        ctx.setFontSize(18 * k)
        ctx.fillText("单买价￥" + that.data.item.oneprice, 15 * k, 500 * k + (b - 1) * 25 * k);
        ctx.stroke()
        ctx.draw()
      })
    })

    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 1,
        y: 1,
        width: 375*k,
        height: 600*k,
        destWidth: 375*k,
        destHeight: 600*k,
        canvasId: 'shareImg',
        success: function (res) {
          /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
          that.setData({
            prurl: res.tempFilePath,
            hidden: false,
            isshow: 3,
          })
        },
        fail: function (res) {}
      })
    }, 1000);
  },
})