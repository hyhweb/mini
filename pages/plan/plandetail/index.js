const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    listData: [],
    id: '',
    inputValue:''
  },
  handleLike() {
    var params = {
      url: '/planService/LikePlan',
      method: 'post',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        if (res.data.code == 1000) {
          this.setData({
            info: {
              ...this.data.info,
              likeCount: res.data.content.likeCount
            }
          })
          wx.showToast({
            title: '点赞成功',
            icon: 'success'
          })
        }
      }
    }
    app.ajax(params)
  },
  handleFriend() {
    var params = {
      url: '/friendshipService/Save',
      method: 'post',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        if (res.data.code == 1000) {
          this.setData({
            info:{
              ...this.data.info,
              friendCount: res.data.content.friendCount
            }
           
          })
          wx.showToast({
            title: '关注成功',
            icon: 'success'
          })
        }
        console.log(res);
      }
    }
    app.ajax(params)
  },
  getLeaveMessage(count, sinceId, id) {
      var params = {
        method: 'post',
        url: '/messageService/GetList',
        data: {
          "count": count || 10000,
          "sinceId": sinceId || 0,
          "planId": this.data.id || null
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
          info: res.data.content[0]
        })
      }
    }
    app.ajax(params)
  },
  writeMsg(event){
    console.log(event.detail)
    this.setData({
      inputValue: event.detail.value
    })
    
  },
  submitMsg() {
    if (this.data.inputValue ==""){
      wx.showToast({
        title: '留言不能为空',
      })
      return;
    }
   var dataParams = {
      "planId": this.data.id,
      "content": this.data.inputValue
    }
   var params = {
     method: 'post',
     url: '/messageService/Save',
     data: dataParams,
     success: (res) => {
       this.setData({
         inputValue:''
       })
       this.getLeaveMessage()
       
     }
   }
   app.ajax(params)
  },
  init() {
    this.getDetail()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getLeaveMessage()
    this.getDetail()
   
    console.log(options, 'options')
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