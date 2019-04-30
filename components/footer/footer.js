// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curIndex:{
      type: String,
      observer: function(value) {
        this.setData({
          curIndex: value
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curIndex: '0'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
