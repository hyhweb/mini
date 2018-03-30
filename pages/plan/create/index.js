const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImg: 'http://chunchenji.com/wximages/default_banner_img.png',
    objectTypeArray: app.globalData.visibleType,
    objectType: 1,
    nickType: 0,
    type: 0,
    date: (app.getNow()).year + '-' + (app.getNow()).month + '-' + (app.getNow()).day,
    typeArray: app.globalData.infoType,
    nickArray: app.globalData.nickNameType,
    title: '',
    text: '',
    form: {
      objectType: 1,
      nickType: 0,
      type: 0
    },
    disabled: false
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
            if (data.code == 1000){
              this.setData({
                bannerImg:data.content.imgUrl
              })
              wx.showToast({
                title: '图片上传成功',
                duration: 3000
              })
            }else{
              wx.showToast({
                title: '图片上传失败',
                icon: 'none',
                duration: 3000
              })
            }
           
           
          
          },
          complete: function (res) {

          }
        })
      }
    })
  },
  submint() {
   
    if (this.data.title == "") {
        wx.showToast({
          title: '请填写春晨计的名称',
          icon: 'none'
        })

      return;
    }
    if (this.data.text == "") {
        wx.showToast({
          title: '请填写春晨计的描述',
          icon: 'none'
        })
      return;
    }
    this.setData({
      disabled: true
    })
    app.loginAfterHandle(() => {
     
      var formData = {
        bannerImg: this.data.bannerImg,
        title: this.data.title,
        content: this.data.text,
        planType: this.data.form.type,
        completeTime: this.data.date,
        public: this.data.form.objectType,
        nickName: app.globalData.nickNameType[this.data.form.nickType].text

      }
      if (formData.nickName =="匿名"){
        formData.isNick =1;
      }else{
        formData.isNick = 0;
      }
      if (formData.bannerImg =="http://chunchenji.com/wximages/default_banner_img.png"){
        formData.bannerImg = "";
      }
      var params = {
        method: 'post',
        url: '/planService/SavePlan',
        data: formData,
        success: (res) => {
          var id = res.data.content.planId;
          wx.navigateTo({
            url: '/pages/plan/createfinish/index?id=' + id,
            success: () => {
              this.setData({
                bannerImg: 'http://chunchenji.com/wximages/default_banner_img.png',
                objectType: 1,
                nickType: 0,
                type: 0,
                date: (app.getNow()).year + '-' + (app.getNow()).month + '-' + (app.getNow()).day,
                title: '',
                text: '',
                form: {
                  objectType: 1,
                  nickType: 0,
                  type: 0
                }
              })
              wx.removeStorageSync('titleField')
              wx.removeStorageSync('desField')
            }
          })

        }
      }
      app.ajax(params)

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

    var title = wx.getStorageSync('titleField');
    var text = wx.getStorageSync('desField');
    if (title != "") {
      this.setData({
        title: title
      })
    } else {
      this.setData({
        title: ''
      })
    }
    if (text != "") {
      this.setData({
        text: text
      })
    } else {
      this.setData({
        text: ''
      })
    }
    this.setData({
      disabled: false
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