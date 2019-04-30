// pages/tgm/tgm.js


/* promise可以忽略 是用来改善异步回调执行顺序 与本功能没有大的关系 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  share() {
    var imgdata
    var promise = new Promise(function (resolve, reject) {
      wx.downloadFile({
        url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3590849871,3724521821&fm=27&gp=0.jpg",
        success: (res) => {
          imgdata = res.tempFilePath
          resolve(res);
        }
      })
    })
    Promise.all([promise]).then(res => {})
    var text = '法国芭步仕 男鞋手工定制时尚百搭情侣鞋舒适休闲鞋 【复古彩色-男款】 39'; //这是要绘制的文本';
    var promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/pro.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/user_avatar.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all(
      [promise1, promise2]
    ).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')
      console.log(ctx);
      ctx.rect(0, 0, 376, 750)
      ctx.setFillStyle('#fff')
      ctx.fill()
      ctx.drawImage('/' + res[0].path, 15, 15, 345, 345)
      ctx.setTextAlign('left')
      ctx.setTextBaseline("top")
      ctx.setFillStyle('#000')
      ctx.setFontSize(16)
      var chr = text.split("");
      var row = [];
      var temp = []
      ctx.setFontSize(16)
      for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < 370) {
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
          if (ctx.measureText(test).width < 345) {
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
        ctx.fillText(row[b], 15, 365 + b * 20, 345);
      }
      ctx.moveTo(15, 460)
      ctx.lineTo(15, 460)
      ctx.lineTo(360, 460)
      ctx.setFillStyle('#aaa')
      ctx.setFontSize(20)
      ctx.fillText("长按识别小程序码", 15, 540);
      ctx.setFillStyle('#f00')
      ctx.setFontSize(24)
      ctx.fillText("￥230", 15, 415);
      ctx.stroke()
      ctx.draw()
    })
    var that = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 1,
        y: 1,
        width: 375,
        height: 667,
        destWidth: 375,
        destHeight: 667,
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res.tempFilePath);
          /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
          that.setData({
            prurl: res.tempFilePath,
            hidden: false,
            isshow: true
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000);


  },
  drawText: function () {
    const ctx = wx.createCanvasContext('shareImg')
    var text = '这是一段文字用于文本自动换行文本长度自行设置欢迎大家指出缺陷'; //这是要绘制的文本';
    var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组    var temp = "";
    var row = [];
    var temp = []
    ctx.setFontSize(16)
    for (var a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < 250) {
        temp += chr[a];
      } else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp); //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test).width < 220) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..." //
      // 这里只显示两行， 超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 10, 30 + b * 30, 300);
    }
    ctx.draw()
  },
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
                hidden: true
              })
            }
          }
        })
      }
    })
  },
  hidden() {
    this.setData({
      isshow: false
    })
  },
  textWrap: function (obj) {
    var td = Math.ceil(obj.width / (obj.size));
    var tr = Math.ceil(obj.text.length / td);
    for (var i = 0; i < tr; i++) {
      var txt = {
        x: obj.x,
        y: obj.y + (i * obj.height),
        color: obj.color,
        size: obj.size,
        align: obj.align,
        baseline: obj.baseline,
        text: obj.text.substring(i * td, (i + 1) * td),
        bold: obj.bold
      };
      if (i < obj.line) {
        if (i == obj.line - 1) {
          txt.text = txt.text.substring(0, txt.text.length - 3) + '......';
        }
        this.drawText(txt);
      }
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
  onShareAppMessage: function () {

  }
})