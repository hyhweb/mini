const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    listData: [],
    maxId: 0,
    noMoreData: false,
    wxOpenId:''
  },
  getGridData(count, sinceId, maxId, id) {
    var params = {
      method: 'post',
      url: '/planService/GetListByMe',
      data: {
        "count": count || 10,
        "sinceId": sinceId || undefined,
        "maxId": maxId || 0,
        "id": undefined,
        "wxOpenId": this.data.wxOpenId
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
    this.getGridData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.stringify(options),'info')
    var id = options.id,
      wxAvatarUrl = options.wxAvatarUrl,
      nickName = options.nickName;
      this.setData({
        wxOpenId:id
      })

    this.init();
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //   }
    // })
    this.setData({
          userInfo: {
            avatarUrl: wxAvatarUrl,
            nickName: nickName
          }
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
    this.getGridData(undefined, undefined, this.data.maxId)
  },

  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: '制定计划，做生活的主导者',
        imageUrl: 'http://chunchenji.com/webImages/chunchenjishareImg.png',
        path: '/pages/plan/profile/index?id=' + this.data.wxOpenId,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    } else {

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