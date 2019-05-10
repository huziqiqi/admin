// pages/seller/seller.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avan: "../../images/avan.gif",
        name: "云南优仙果",
        fb: 92,
        gz: 3,
        fw: 176,
        user: "",
        product1: [{
            "num": "1739",
            "time": "10月13日",
            "nr": "双面绒直筒毛呢大衣+莫代尔棉高领打底衫+直筒休闲裤长裤女。时尚又保暖get",
            "img": [{
                "pro_img": "../../images/pro.jpg"
            },
            {
                "pro_img": "../../images/pro2.jpg"
            },
            {
                "pro_img": "../../images/pro3.jpg"
            }
            ],
            "address": "陕西省西安市未央区龙首印象城"
        },
        {
            "num": "1739",
            "time": "10月13日",
            "nr": "双面绒直筒毛呢大衣+莫代尔棉高领打底衫+直筒休闲裤长裤女。时尚又保暖get",
            "img": [{
                "pro_img": "../../images/pro.jpg"
            },
            {
                "pro_img": "../../images/pro2.jpg"
            },
            {
                "pro_img": "../../images/pro3.jpg"
            }
            ],
            "address": "陕西省西安市未央区龙首印象城"
        }
        ],
        product: [],
        isGuanZhu: "",
        userId: "",
        postedId: "",
        num: "",
        pages:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        console.log(opt);
        this.request(opt.postedId)
       
    },
    request(postedId){
        wx.request({
            url: getApp().url + "//vippage",
            data: {
                userId: wx.getStorageSync('user').id,
                postedId: parseInt(postedId),
                pages:this.data.pages
            },
            method: "POST",
            success: (res) => {
                let product
                this.data.pages > 1 ? product = this.data.product.concat(res.data.data.product) : product = res.data.data.product
                this.setData({
                    user: res.data.data.user,
                    product,
                    isGuanZhu: res.data.data.isGuanZhu,
                    userId: wx.getStorageSync('user').id,
                    postedId: postedId,
                    num: res.data.data.num,
                    allpage:res.data.data.allpage
                })

            }
        })
    },
    isGuanZhu(e) {
        let isGuanZhu
        let url
        if (e.target.dataset.type == 2) {
            url = getApp().url + "//guanZhu"
            isGuanZhu = 1
            this.guanZhu(url, isGuanZhu)
        } else {
            url = getApp().url + "//cancelZhu"
            isGuanZhu = 2
            this.guanZhu(url, isGuanZhu)

        }

    },
    guanZhu(url) {
        wx.request({
            url: url,
            data: {
                userId: this.data.userId,
                postedId: this.data.postedId,
            },
            method: "POST",
            success: (res) => {
                if (res.data.msg == "关注成功" || res.data.msg == "取消成功") {
                    wx.showToast({
                        title: res.data.msg
                    })
                    if (res.data.msg == "关注成功") {
                        var isGuanZhu = 1
                    } else {
                        var isGuanZhu = 2
                    }
                    this.setData({
                        isGuanZhu: isGuanZhu
                    })
                }

                wx.showToast({
                    title: res.data.msg,
                    icon: "none"
                })
            }
        })
    },
    onReachBottom() {
        if (this.data.pages < this.data.allpage) {
            this.setData({
                pages: this.data.pages + 1
            })
            this.request(this.data.postedId)
        } else {
            wx.showToast({
                title: "暂无更多数据",
                icon: "none"
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})