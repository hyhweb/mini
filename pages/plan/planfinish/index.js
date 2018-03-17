// pages/plan/planfinish/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    progress: 0,
    completeContent: "",
    images: []
  },
  getDetail() {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        console.log(res, 'res');
        this.setData({
          progress: res.data.content[0].progress || 0,
          completeContent: res.data.content[0].completeContent,
          images: res.data.content[0].images
        })
      }
    }
    app.ajax(params)
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var images = res.tempFilePaths.map((item)=>{
          return { imgUrl:item}
        })
        that.setData({
          images: that.data.images.concat(images)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  savePlan(option) {
    var params = {
      method: 'post',
      url: '/planService/SavePlanOther',
      data: option,
      success: (res) => {
        console.log(res, 'res');
        wx.navigateTo({
          url: '/pages/plan/planfinishsuccess/index?id='+this.data.id,
        })
      }
    }
    app.ajax(params)
  },
  formSubmit: function (e) {
    var param = {
      ...e.detail.value,
      images: this.data.images,
      id: this.data.id
    }
    this.savePlan(param);
    
    console.log('form发生了submit事件，携带数据为：', param)
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
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