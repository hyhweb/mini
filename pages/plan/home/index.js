const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    sinceId:0,
    maxId: 0,
    now: app.getNow(),
    listData: [],
    myPlanData:[],
    SumPlanByMe:{},
    userInfo:{},
    progress: parseInt((app.getNow().week/52)*100),
    noMoreData:false
  },
  toAdd(){
    wx.switchTab({
      url: '/pages/plan/create/index'
    })
  },
  getSumPlanByMe() {
    var params = {
      url: '/planService/SumPlanByMe',
      method: 'post',
      data: { sumType: 99 },
      success: (res) => {
        this.setData({
          SumPlanByMe: res.data.content
        })
      }
    }
    app.ajax(params)

    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  getMyPlanData(count, sinceId, maxId, id) {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "count": 10000,
        "sinceId": sinceId || 0,
        "maxId": maxId ||0,
        "id": id || undefined
      },
      success: (res) => {
        this.setData({
          myPlanData: res.data.content
        })
      }
    }
    app.ajax(params)
  },


  getGridData(count, sinceId, maxId, id) {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "count": count || 5,
        "sinceId": sinceId || 0,
        "maxId": maxId || 0,
        "id": id || undefined,
        "wxOpenId": undefined
      },
      success: (res) => {
        if(res.data.content.length == 0){
          this.setData({
            noMoreData:true          
          })
          return;
        }
       
        this.setData({
          listData: res.data.content,
        })
        if (res.data.content.length !== 0) {
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
    this.getSumPlanByMe()
    this.getGridData()
    this.getMyPlanData()
  },
  loadMore(){
    wx.switchTab({
      url: '/pages/plan/planlist/index',
    })
    //this.getGridData(undefined, undefined, this.data.maxId)
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