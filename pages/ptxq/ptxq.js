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
    isLogin:false,
    proid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    console.log(opt);  
    this.setData({
      isLogin: wx.getStorageSync('user') ? true : false ,
      isiphonex: getApp().globalData.isiphonex,

    })  
    wx.showLoading({
      title: "加载中，请稍等",
      mask: true
    });
    if (wx.getLaunchOptionsSync().query.proid&opt.isjump!=1) {
      // console.log("您通过分享登陆，但是没有登录");
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
            fbr: res.data.data.user,
            num:res.data.data.num,
            isShow: true,
            opt: getApp().opt,
          })
          // console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.data.item.id);
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
          // console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.data.item.id);
          wx.hideLoading();
        }
      })
      // this.qrcode(opt)
    }
    // console.log(this.timestampToTime(1557541669));
  },
  openmap(){
      var that=this
    // console.log(that.data.item.lat);
      
    wx.openLocation({
      latitude: parseFloat(that.data.item.lat) ,
      longitude: parseFloat(that.data.item.lng)
    })
  },
  qrcode(opt) {
    // console.log(opt);    
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
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log('/pages/index/index?userid=' + wx.getStorageSync('user').id + '&proid=' + this.data.item.id);
      // console.log(res);
      
    }
    return {
      title: this.data.item.title,
      path: '/pages/index/index?userid=' + wx.getStorageSync('user').id+'&proid='+this.data.item.id,
    }
  },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.fbr.tel //仅为示例，并非真实的电话号码
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
    this.qrcode(opt) 
if (this.data.item.status!=1) {
 wx.showModal({
   title: "提示",
   content:"该团购已下架，暂无法分享",
   showCancel: false,
   //cancelText:"取消",
   //confirmText:"确定",
   //cancelColor:"#000",
   //confirmColor:"#576B95",
   //success:()=>{},
   //fail: () => {},
   //complete: () => {},
 })
}else{
  this.setData({
    isshow: e.target.dataset.is
  })

}


   
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
    var k = 2
    if (that.data.prurl) {
     wx.canvasToTempFilePath({
       x: 1,
       y: 1,
       width: 375 * k,
       height: 600 * k,
       destWidth: 375 * k,
       destHeight: 600 * k,
       canvasId: 'shareImg',
       success: function (res) {
         /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
         that.setData({
           prurl: that.data.prurl,
           hidden: false,
           isshow: 3,
         })
         // console.log("生成海报");
         wx.hideLoading()
       },
       fail: function (res) {
         that.share()
       }
     })
   } else {
     wx.showLoading({
       title: '正在生成海报',
     })
     var text = that.data.item.title;
     var promise1 = new Promise(function (resolve, reject) {
       let path = that.data.item.imgs[0]
       wx.getImageInfo({
         src: path,
         success: function (res) {
           // console.log(path);
           resolve(res);
         }
       })
     });
     let promise2 = new Promise(function (resolve, reject) {
       let path = that.data.qrcode
       wx.getImageInfo({
         // src: localpath,
         src: path,
         success: function (res) {
           resolve(res);
         }
       })
     });
      let promise3 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          // src: localpath,
          src: "../../images/ayp.png",
          success: function (res) {
            console.log(res);
            
            resolve(res);
          }
        })
      });
      let promise4 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          // src: localpath,
          src: "../../images/bg.jpg",
          success: function (res) {
            console.log(res);

            resolve(res);
          }
        })
      });
     Promise.all(
       [promise1, promise2, promise3, promise4]
     ).then(res => {
       // console.log(res);
       const ctx = wx.createCanvasContext('shareImg')
       var k = 2
       console.log(res[2].path);       
       ctx.rect(0 - k, 0 - k, (375 + 2) * k, 750 * k)
       ctx.setFillStyle('#fff')
       ctx.fill()
      //  ctx.setShadow(10, 50, 50, '#eee')
      
      //  ctx.clearRect(0, 0, (375 + 2) * k, 750 * k);
      //  ctx.draw()
       ctx.beginPath()
       ctx.setFillStyle('#faa')
      //  ctx.moveTo(0 * k, 54 * k)
      //  ctx.arc(80 * k, 74 * k, 20 * k, 1.5 * Math.PI, 0.5 * Math.PI)
      //  ctx.lineTo(0, 94 * k)
      //  ctx.lineTo(0, 54 * k)
      //  ctx.setFillStyle('#111')
      //  ctx.fill()
      //  ctx.beginPath()
      //  ctx.setFillStyle('#fff')
      //  ctx.setFontSize(40)
      //  ctx.fillText("爱蚁拼", 40, 160);
      //  ctx.setTextAlign('left')
      //  ctx.setTextBaseline("top")
       ctx.setFillStyle('#000000')
       ctx.setFontSize(16 * k)
       var chr = text.split("");
       var row = [];
       var temp = []
       ctx.setFontSize(20 * k)
       for (var a = 0; a < chr.length; a++) {
         if (ctx.measureText(temp).width < 300 * k) {
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
         for (var a = 0; a < rowPart.length; a++) {
           if (ctx.measureText(test).width < 300 * k) {
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
         ctx.fillText(row[b],30 * k, 375 * k + b * 25 * k, 300* k);
       }

      //  副标题折行
     let w2=400;
       var text2 = that.data.item.info
       var chr2 = text2.split("");
       var row2 = [];
       var temp2 = []
      //  ctx.setFontSize(20 * k)
       for (var a = 0; a < chr.length; a++) {
         if (ctx.measureText(temp2).width < w2 * k) {
           temp2 += chr2[a];
         } else {
           a--;
           row2.push(temp2);
           temp2 = "";
         }
       }
       row2.push(temp2);
       if (row2.length > 2) {
         var rowCut2 = row2.slice(0, 2);
         var rowPart2 = rowCut2[1];
         var test2 = "";
         var empty2 = [];
         for (var a = 0; a < rowPart2.length; a++) {
           if (ctx.measureText(test2).width < w2 * k) {
             test2 += rowPart2[a];
           } else {
             break;
           }
         }
         empty2.push(test2);
         var group2 = empty2[0] + "..."
         rowCut2.splice(1, 1, group2);
         row2 = rowCut2;
       }
       ctx.setFillStyle('#888888')
       ctx.setFontSize(16 * k)
       console.log(row2);
       
       for (var d = 0; d < row2.length; d++) {
         ctx.fillText(row2[d], 28 * k, 375 * k + b * 25 * k+ d*k*20, w2* k);
       }   
      //  副标题这行后的高度
       let h2 = (d-1) * k * 20;
    
       var x = 250 * k
       var y = 428 * k

       ctx.drawImage(res[1].path, x + 5 * k, y + 5 * k, 90 * k, 90 * k)
       ctx.setFillStyle('#333333')
       ctx.setFontSize(12 * k)
       ctx.fillText("扫描或长按识别", x + 10 * k, y + 120 * k);
       ctx.setLineWidth(k)
      //  ctx.moveTo(x, y + 10 * k)
      //  ctx.lineTo(x, y + 10 * k)
      //  ctx.lineTo(x, y)
      //  ctx.lineTo(x + 10 * k, y)

      //  ctx.moveTo(x + 90 * k, y)
      //  ctx.lineTo(x + 90 * k, y)
      //  ctx.lineTo(x + 100 * k, y)
      //  ctx.lineTo(x + 100 * k, y + 10 * k)

      //  ctx.moveTo(x + 90 * k, y + 100 * k)
      //  ctx.lineTo(x + 90 * k, y + 100 * k)
      //  ctx.lineTo(x + 100 * k, y + 100 * k)
      //  ctx.lineTo(x + 100 * k, y + 90 * k)
      //  ctx.moveTo(x + 10 * k, y + 100 * k)
      //  ctx.lineTo(x + 10 * k, y + 100 * k)
      //  ctx.lineTo(x, y + 100 * k)
      //  ctx.lineTo(x, y + 90 * k)
       ctx.setStrokeStyle('#f2001c')
       ctx.setFillStyle('#f26f37')
       ctx.fillRect(28 * k, 430 * k + (b - 1) * 25 * k+h2, 72 * k, 24 * k)

      
       ctx.setFillStyle('#fff')
       ctx.setFontSize(16 * k)
       ctx.fillText("团购价", 40 * k, 448 * k + (b - 1) * 25 * k + h2);
       ctx.setFillStyle('#333333')
       ctx.setFontSize(24 * k)
       ctx.fillText("￥" + that.data.item.price, 100 * k, 450 * k + (b - 1) * 25 * k + h2);
       ctx.setFillStyle('#a2a2a2')
       ctx.setFontSize(16 * k)
       ctx.fillText("单买价￥" + that.data.item.oneprice, 28 * k, 490 * k + h2+ (b - 1) * 25 * k);
       ctx.stroke();
    let info= wx.getSystemInfoSync()
    console.log(info);
       if (info.system=="IOS") {
        //  ctx.setShadow(0, 0, 20, '#999');
        //  ctx.drawImage(res[0].path, 28 * k, 28 * k, 321 * k, 321 * k);
      
    } else {
      //  ctx.shadowOffsetX = 0;
      //  ctx.shadowOffsetY=0;
      //  ctx.shadowColor='#999';
      //  ctx.shadowBlur=20;
      //  ctx.drawImage(res[0].path, 28 * k, 28 * k, 321 * k, 321 * k);
    }
       let c = 8
    let c1=14
      //  ctx.setShadow(0, 0, 20, '#999');
       ctx.drawImage("/" + res[3].path, (28-c) * k, (28-c) * k, (321+c1) * k, (321+c1) * k);
       ctx.drawImage(res[0].path, (28) * k, (28) * k, (321) * k, (321) * k);
       ctx.drawImage("/" + res[2].path, 0 * k, 54 * k, 100 * k, 40 * k)

       // 延迟200s进行绘制防止自提错位
       setTimeout(() => {
         ctx.draw(false, function () {
           // console.log("回调");
           wx.canvasToTempFilePath({
             x: 1,
             y: 1,
             width: 375 * k,
             height: 560 * k,
             destWidth: 375 * k,
             destHeight: 560 * k,
             canvasId: 'shareImg',
             success: function (res) {
               /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
               that.setData({
                 prurl: res.tempFilePath,
                 hidden: false,
                 isshow: 3,
               })
               console.log(that.prurl);

               // console.log("生成海报");
               wx.hideLoading()
             },
             fail: function (res) {
               that.share()
             }
           })
           setTimeout(() => {
             if (that.data.prurl) {
               // console.log("生成成功");
             } else {
               // console.log("生成失败");
               that.share()
             }
           }, 1000);
         })
       }, 400);

     })
   } 
  },

 compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while(v1.length < len) {
  v1.push('0')
}
while (v2.length < len) {
  v2.push('0')
}

for (let i = 0; i < len; i++) {
  const num1 = parseInt(v1[i])
  const num2 = parseInt(v2[i])

  if (num1 > num2) {
    return 1
  } else if (num1 < num2) {
    return -1
  }
}

return 0
}

})