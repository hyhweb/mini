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
    textareaH:0,
    mywxOpenId: app.globalData.wxOpenId,
    now: app.getNow(),
    userInfo:{}
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
          wx.hideLoading()
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
          wx.hideLoading()
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
  submitMsg(e) {
     console.log(e,'e')
     wx.showModal({
       title: e.detail.formId,
       content: e.detail.formId,
     })
    var mubanParam = {
      "touser": this.data.info.wxOpenId,
      "template_id": "5zGnhTCFA83voSId6p_5cI-RCEnUAoPR-0AjV5bjct4",
      "page": "pages/plan/home/index",
      "form_id": e.detail.formId,
      "data": {
        "keyword1": {
          "value": this.data.info.title
        },
        "keyword2": {
          "value": this.data.inputValue
        },
        "keyword3": {
          "value": this.data.now.year + '-' + this.data.now.month + '-' + this.data.now.hao
        },
        "keyword4": {
          "value": this.data.userInfo.nickName
        }
      },
      "emphasis_keyword": this.data.info.title
    }

   wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx7cf8e16886c6f896&secret=d2d1826c8f5a7eaa6ce782fbdfd898ab',
      success: (res) => {
        var access_token = res.data.access_token;
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
          method:'post',
          data: mubanParam,
          success:(res)=>{
            console.log(res,'发送成功')
          }
        })
        console.log(res, 'res')
      }
    })
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
      id: options.id,
      mywxOpenId: app.globalData.wxOpenId,
      userInfo: app.globalData.userInfo
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
      return {
        title: this.data.info.title,
        path: '/pages/plan/plandetail/index?id=' + id,
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