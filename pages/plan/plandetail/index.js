const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    listData: [],
    id: '',
    inputValue: '',
    notdel:true,
    textareaH:0
  },
  heightHandle(event){
    console.log(event.detail.heightRpx)
  this.setData({
    textareaH: event.detail.heightRpx
  })
  },
  handleLike() {
    app.loginAfterHandle(() => {
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
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
      app.ajax(params)
    })
  },
  handleFriend() {
    app.loginAfterHandle(() => {
      var params = {
        url: '/friendshipService/Save',
        method: 'post',
        data: {
          "planId": this.data.id
        },
        success: (res) => {
          if (res.data.code == 1000) {
            this.setData({
              info: {
                ...this.data.info,
                friendCount: res.data.content.friendCount
              }

            })
            wx.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
      app.ajax(params)
    })
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
      url: '/planService/GetPlan',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        if(res.data.content.length == 0){
          this.setData({
            notdel:false
          })
        }
        this.setData({
          info: res.data.content[0]
        })
      }
    }
    app.ajax(params)
  },
  writeMsg(event) {
    this.setData({
      inputValue: event.detail.value
    })

  },
  submitMsg() {
    app.loginAfterHandle(() => {
      if (this.data.inputValue == "") {
        wx.showToast({
          title: '留言不能为空',
        })
        return;
      }
      if (this.data.inputValue.length >50){
        wx.showToast({
          title: '留言不能超过50个文字',
          icon:'none'
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
          if (res.data.code == 1000) {
            wx.showToast({
              title: '留言成功',
              duration: 3000
            })
            this.setData({
              inputValue: ''
            })
            this.getLeaveMessage()
          } else {
            wx.showToast({
              title: '留言失败',
              icon: 'none',
              duration: 3000
            })
          }


        }
      }
      app.ajax(params)
    })
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
  onShareAppMessage: function (res) {
    
    if (res.from === 'button') {
       wx.showToast({
         title: 'button',
       })
      return {
        title: this.data.info.title,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
     
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