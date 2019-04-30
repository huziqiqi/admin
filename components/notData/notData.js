// pages/components/notData/notData.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toggle: {
      type: Boolean,
      observer: function (newVal, oldVal) {
        this.setData({
          isShow: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    toggle: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
