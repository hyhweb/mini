const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    bannerImg: '',
    objectTypeArray: app.globalData.visibleType,
    title: '',
    des: '',
    objectType: 0,
    nickType: 0,
    type: 0,
    date: '',
    typeArray: app.globalData.infoType,
    nickArray: app.globalData.nickNameType
  },
  getDetail() {
    var params = {
      method: 'post',
      url: '/planService/GetPlan',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        this.setData({
          bannerImg: res.data.content[0].bannerImg,
          title: res.data.content[0].title,
          des: res.data.content[0].content,
          objectType: res.data.content[0].public,
          nickType: (res.data.content[0].nickName == "匿名" ? 1 : 0),
          type: res.data.content[0].planType,
          date: res.data.content[0].completeTime
        })
      }
    }
    app.ajax(params)
  },

  savePlan(e) {
    this.setData({
      title: e.detail.value.title
    })
    if (this.data.title == "") {
      wx.showToast({
        title: '请填写春晨计的名称',
        icon: 'none'
      })

      return;
    }
    if (this.data.des == "") {
      wx.showToast({
        title: '请填写春晨计的描述',
        icon: 'none'
      })
      return;
    }
    app.loginAfterHandle(() => {

      var formData ={
        "planId": this.data.id,
        "bannerImg": this.data.bannerImg,
        "title": this.data.title,
        "content": this.data.des,
        "planType": this.data.type,
        "completeTime": this.data.date,
        "public": this.data.objectType,
        "nickName": this.data.nickArray[this.data.nickType].text
      }
      if (formData.nickName == "匿名") {
        formData.isNick = 1;
        formData.nickName = app.globalData.nickNameType[0].text
      } else {
        formData.isNick = 0;
      }
      if (formData.bannerImg == "http://chunchenji.com/wximages/default_banner_img.png") {
        formData.bannerImg = "";
      }
      var params = {
        method: 'post',
        url: '/planService/SavePlan',
        data: formData,
        success: (res) => {
          wx.navigateBack({
            delta: 1
          })
           wx.removeStorageSync('titleField')
           wx.removeStorageSync('desField')
          // wx.navigateTo({
          //   url: '/pages/plan/myplan/index?current=' + this.data.current,
          //   success: () => {
          //     wx.removeStorageSync('titleField')
          //     wx.removeStorageSync('desField')
          //   }
          // })
        }
      }
      app.ajax(params)
    })
  },

  deletePlan() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '计划删除将无法恢复，确定删除？',
      success: function (res) {
        if (res.confirm) {
          app.loginAfterHandle(() => {
            var params = {
              method: 'post',
              url: '/planService/DeletePlan',
              data: {
                "planId": that.data.id
              },
              success: (res) => {
                wx.navigateTo({
                  url: '/pages/plan/myplan/index'
                })
              }
            }
            app.ajax(params)
          })
        } else if (res.cancel) {
         
        }
      }
    })

  },
  uploaderImg() {
    wx.chooseImage({
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          prevImg: tempFilePaths[0]
        })
        wx.uploadFile({
          url: 'https://wxapi.chunchenji.com/api/services/SCMS/commonService/UploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'imgUrl': tempFilePaths[0]
          },
          success: (res) => {
            var data = JSON.parse(res.data)
            if (data.code == 1000) {
              this.setData({
                bannerImg: data.content.imgUrl
              })
              wx.showToast({
                title: '图片上传成功'
              })
            } else {
              wx.showToast({
                title: '图片上传失败',
                icon: 'none'
              })
            }
          },
          complete: function (res) {

          }
        })
      }
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      type: e.detail.value,
      form: {
        ...this.data.form,
        type: e.detail.value
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindObjcetTypeChange: function (e) {
    this.setData({
      objectType: e.detail.value,
      form: {
        ...this.data.form,
        objectType: e.detail.value
      }
    })
  },
  bindNickChange: function (e) {
    this.setData({
      nickType: e.detail.value,
      form: {
        ...this.data.form,
        nickType: e.detail.value
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current: (options.current || 0)
    })
    this.setData({
      id: options.id
    })
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
    //var title = wx.getStorageSync('titleField');
    var des = wx.getStorageSync('desField');
    // if (title != "") {
    //   this.setData({
    //     title: title
    //   })
    // }
    if (des !="") {
      this.setData({
        des: des.trim()
      })
    }

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