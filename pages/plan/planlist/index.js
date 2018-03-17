const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    listData: [],
    maxId: 0,
    noMoreData: false
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  bindDownLoad() {
    var data = this.data.listData;
    var list = data.concat(app.globalData.pageList)
    this.setData({
      listData: list
    })
  },
  refresh(){
    var data = this.data.listData;
    this.setData({
      listData: data
    })
  },
  getGridData(count, sinceId, maxId, id) {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "count": count || 10,
        "sinceId": sinceId || 0,
        "maxId": maxId || 0,
        "id": undefined,
        "wxOpenId":undefined
      },
      success: (res) => {
        if (res.data.content.length == 0) {
          this.setData({
            noMoreData: true
          })
          return;
        }
        var data = this.data.listData
        this.setData({
          listData: data.concat(res.data.content),
        })
        if (res.data.content.length !== 0){
          var maxId = res.data.content[res.data.content.length - 1].planId
          this.setData({
          maxId: maxId
          })
        }
      }
    }
    app.ajax(params)
  },
  init() {
    this.getGridData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    this.getGridData(undefined, undefined, this.data.maxId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})