// pages/components/tips/tips.js
function init(ScopeAction){
  let that = ScopeAction;
  let timer = setTimeout(function(){
    that.setData({
      msg: ''
    })
    clearTimeout(timer);
  }, 1000);
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type: String,
      value: '',
      observer: function () {
        this.setData({
          msg: this.data.msg,
          toggle: !this.data.toggle
        })
        init(this);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    msg: '',
    toggle: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
