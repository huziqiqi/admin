Page({
  data: {
    
  },
  onLoad(opt) {
    console.log(opt);
    
    this.setData({
      url:opt.url
    })
    
  }
})