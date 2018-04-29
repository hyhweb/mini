// pages/plan/editfield/title/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cursor:0,
    inputText: ''
  },
  bindInput(e) {
    // var value = e.detail.value
    // var cursor = e.detail.cursor
    // this.setData({
    //   cursor: cursor,
    //   //inputText: e.detail.value
    // })
    // console.log(cursor, 'cursor')
    // return   e.detail.value;

    
  },
  confirmHandle(e) {
    var value = e.detail.value.inputText;
    this.setData({
      inputText: value
    })
    console.log(e)
    if (this.data.inputText == "") {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none'
      })
      return;
    }
    if (this.data.inputText.length > 30) {
      wx.showToast({
        title: '名称不能超过30文字',
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