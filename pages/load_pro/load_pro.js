// pages/load_pro/load_pro.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileImgs: ['../../images/sctp.jpg'],
    num: 0,
    array: [],
    arrays: ["请选择", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    index: 0,
    people: 0,
    date: '请选择',
    subleaseType: 1,
    hidden: true,
    msg: '',

    curCityId: '',
    subleaseType: 1,
    hidden: true,
    msg: '',
    curCityId: '',
    unit: [],
    uindex: 0,
    shopImgArr: [],


    shopImg: [],
    certificatesImg: [],
  
    certificatesImgArr: [],
    subleaseType: 1,
    hidden: true,
    msg: '',
    curCityId: '',
    userId: "",
    form_info: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.hideTabBar()
    let obj = {
      url: getApp().url + "/proCate",
      data: {},
      method: "POST",
      flg: 3,
      callback: (res) => {
        var array = [{
          id: 0,
          title: "请选择"
        }]
        for (let i = 0; i < res.data.data.length; i++) {
          const item = res.data.data[i];
          array.push(item)
        }
        this.setData({
          array,
        })      
      }
    }
    let objs = {
      url: getApp().url + "/deck",
      data: {},
      method: "POST",
      flg:3,
      callback: (res) => {
        var unit = [{
          name: "请选择"
        }].concat(res.data.data)
        this.setData({
          unit
        })
      }
    }
    
    app.ajax(obj)
    app.ajax(objs)
    wx.getStorage({
      key: "userId",
      success: (res) => {
        this.setData({
          userId: res.data
        })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  bindUnitPickerChange: function (e) {
    this.setData({
      uindex: e.detail.value,
      deck: this.data.unit[e.detail.value].name
    })
  },
  sumb(e) {
    let opt = e.detail.value
    opt.imgs = this.data.shopImgArr.join(',')
    if (opt.cateid != "") {
      opt.cateid = this.data.array[opt.cateid].id
    }
    if (opt.deck != "") {
      opt.deck = this.data.unit[opt.deck].name
    } 
    if (!this.data.shopImg[0]) {
      this.tips("请上传图片");
    } else if (opt.title == "") { 
     this.tips("标题不能为空");      
    } else if (opt.info == "") {
     this.tips("请输入拼团活动介绍");
    } else if (opt.cateid == "") {
     this.tips("请选择拼团类目");
    } else if (opt.deck == "") {
     this.tips("请选择单位");
    }else if (opt.oneprice == "") {
     this.tips("请输入单买价格");
    }else if (opt.price== "") {
     this.tips("请输入团购价格");
    }  else if (opt.nums== "") {
     this.tips("请输入成团人数");
    } else if (opt.stock == "") {
     this.tips("请选择库存");
    } else if (opt.end_time == "请选择") {
     this.tips("请选择拼团截止时间");
    }else {
    wx.setStorage({
      key: "optn",
      data: opt,
      success: () => {    
        wx.navigateTo({
          url: "../set_message/set_message?userId=" + this.data.userId
        })
      }
    })
    }  
  },
  tips(msg){
    wx.showToast({
      title:msg,
      icon: "none"
    })
  },
  bindPeopleChange: function (e) {
    this.setData({
      people: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    })
  },
  files: function () {
    wx.navigateTo({
      url: "../upimgs/upimgs"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
        opt: wx.getStorageSync('optn')
    })    
    if (getApp().sumbSuccess == 1) {
      //重置表单     
      this.setData({
        form_info: "",
        uindex: 0,
        index: 0,
        date: "请选择",
        shopImg:[],
        imgtypeArr:[]
      })
      getApp().sumbSuccess == 0
    }    
  },
  navion() {
    wx.navigateTo({
      url: '../set_message/set_message'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let opt = this.data
    app.shopImgArr = opt.shopImgArr
    app.title = opt.title
    app.info = opt.info
    app.cateid = opt.cateid
    app.deck = opt.deck
    app.oneprice = opt.oneprice
    app.price = opt.price
    app.nums = opt.nums
    app.stock = opt.stock
    
  },
  file: function (e) {
    let that = this;
    let imgtype = e.currentTarget.dataset.imgtype;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        let arr = that.data[imgtype];
        for (let i = 0; i < tempFilePaths.length; i++) {
          if (arr.indexOf(tempFilePaths[i]) == -1) {
            arr.push(tempFilePaths[i]);
            that.upload(arr[i], imgtype);
          }
        }
        that.setData({
          [imgtype]: arr
        });
      },
    });
  },

  // 图片上传
  upload: function (filePath, imgtype) {
    let that = this;
    wx.uploadFile({
      url: getApp().url + '/uploads',
      // url: "http://yipin.xazbwl.com/product/uploads",
      filePath: filePath,
      formData: null,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      // 上传成功
      success: function (res) {
        let imgArr = '' + JSON.parse(res.data).data;
        let types = that.data[imgtype + "Arr"];
        types.push(imgArr);
        let imgtypeArr = types.join('\,')
        that.setData({
          imgtypeArr
        })
      }
    });
  },

  removeImg: function (e) {
    console.log(e);
    let that = this;
    wx.showModal({
      title: '删除提示',
      content: '是否要删除此图片',
      success: function (res) {
        if (res.confirm) {
          let types = e.currentTarget.dataset.imgtype;
          let src = e.currentTarget.dataset.imgsrc;
          let arr = that.data[types];
          let imgarr = that.data[types + "Arr"];
          arr.splice(arr.indexOf(src), 1);
          imgarr.splice(imgarr.indexOf(src), 1);
          that.setData({
            [types]: arr,
            [types + "Arr"]: imgarr
          })
        }
      }
    })
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