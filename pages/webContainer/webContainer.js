Page({
  data: {
    url: "https://www.baidu.com"
  },
  onLoad(opt) {
    console.log(opt);
    
    let obj = {
      url: getApp().url + "/user.help/helpinfo",
      data: {
        id:opt.id
      },
      method: "POST",
      // flg:3,
      callback: (res) => {  
        console.log(res.data);
        
        this.setData({
         info:res.data.data.info
        })
      }
    }
    getApp().ajax(obj)
    
  }
})