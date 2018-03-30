// pages/plan/editfield/title/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: ''
  },
  bindInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  confirmHandle() {
    if (this.data.inputText == "") {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none'
      })
      return;
    }
    if (this.data.inputText.length > 50) {
      wx.showToast({
        title: '名称不能超过50文字',
        icon: 'none'
      })
      return;
    }
    wx.setStorageSync('titleField',this.data.inputText)
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.barTitle
    })
    this.setData({
      inputText: options.inputText
    })
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