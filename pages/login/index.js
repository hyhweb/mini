const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    passWord: ''
  },
  formSubmit: function (e) {
    console.log(e.detail);
    wx.showToast({
      title: e.detail.value.userName + '&' + e.detail.value.passWord
    })
    wx.request({
      method: 'get',
      url: app.globalData.apiUrl + '/login.json', //仅为示例，并非真实的接口地址
      data: e.detail.value,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.success) {
          wx.showToast({
            title: data.message
          })
          wx.switchTab({
            url: '/pages/photowall/home/index'
          })

        }

        console.log(res.data)
      }
    })

  },
  formReset() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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