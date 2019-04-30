Page({
  data: {
    url: "https://www.baidu.com"
  },
  onLoad(opt) {
    this.setData({
      url: opt.url
    })
  }
})