const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    userData: {},
    SumPlanByMe:{}
  },
  getSumPlanByMe(){
    var params = {
      url:'/planService/SumPlanByMe',
      method:'post',
      data: { sumType:99 },
      success:(res)=>{
        this.setData({
          SumPlanByMe:res.data.content
        })
      }
    }
    app.ajax(params)
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
    this.getSumPlanByMe()
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
 
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
  onShareAppMessage: function (res) {
    if (res.from !== 'button') {
      return {
        title: '制定计划，做生活的主导者',
        path: '/pages/plan/home/index',
        imageUrl: 'http://chunchenji.com/webImages/chunchenjishareImg.png',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  }
})