const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    current:0,
    visibleType: app.globalData.visibleType,
    nickNameType: app.globalData.nickNameType
  },
  getGridData(count, sinceId, id) {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "count": count || 10,
        "sinceId": sinceId || 0,
        "id": id || null
      },
      success: (res) => {
        console.log(res, 'res');
        this.setData({
          listData: res.data.content
        })
      }
    }
    app.ajax(params)
  },
  init() {
    this.getGridData()
  },
  bindchange(event){
    this.setData({
      current: event.detail.current
    })
    
  },
  editplan() {
    wx.navigateTo({
      url: '/pages/plan/editplan/index?current=' + this.data.current
    })
  },
  finishplan() {
    wx.navigateTo({
      url: '/pages/plan/myplan/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current: (options.current||0)
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
    this.init()
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
    this.setData({
      count: 10
    });
    this.getGridData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var count = this.data.count + 10;
    this.setData({
      count: this.data.count + 10
    });
    var sinceId = 0;
    this.getGridData(count, sinceId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})