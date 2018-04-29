const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion:"",
    disabled:false
  },
  bindInput(e) {
    this.setData({
      suggestion: e.detail.value
    })
  },
  submit(){
    if (this.data.suggestion == ""){
      wx.showToast({
        title: '意见或建议不能为空',
        icon:'none'
      })
      return;
    }
   
    var data ={
      content: this.data.suggestion
    }
    wx.showLoading({
      title: '提交中...',
    })
    this.setData({
      disabled:true
    })
    var param = {
      method:'post',
      url:'/commonService/Feedback',
      data:data,
      success:(res)=>{
        var data = res.data
        if (data.code == 1000) {
          wx.showToast({
            title: '提交成功',
          })
        }else{
          wx.showToast({
            title: '提交失败，请重新提交',
            icon:'none'
          })
        }
        this.setData({
          disabled: false
        })
        wx.switchTab({
          url: '/pages/plan/my/index',
        })
      },
      complete:()=>{
        this.setData({
          disabled: false
        })
      }
    };
    app.ajax(param)
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