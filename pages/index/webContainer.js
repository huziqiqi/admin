Page({
  data: {
    
  },
  onLoad(opt) {
    console.log(opt);
    this.setData({
      url:opt.url
    })
    
    // let obj = {
    //   url: getApp().url + "/user.help/helpinfo",
    //   data: {
    //     id:opt.id
    //   },
    //   method: "POST",
    //   // flg:3,
    //   callback: (res) => {  
    //     console.log(res.data);
    //     this.setData({
    //      info:res.data.data.info
    //     })
    //     wx.setNavigationBarTitle({
    //       title: res.data.data.title
    //     })
    //   }
    // }
    // getApp().ajax(obj)
    
  }
})