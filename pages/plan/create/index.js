const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    objectTypeArray: app.globalData.visibleType,
    objectType: 0,
    nickType: 0,
    type: 0,
    date: (app.getNow()).year + '-' + (app.getNow()).month + '-' + (app.getNow()).day ,
    typeArray: app.globalData.infoType,
    nickArray: app.globalData.nickNameType,
    title: '',
    text: '',
    form: {
      objectType: 0,
      nickType: 0,
      type: 0
    }
  },
  uploaderImg() {
    wx.chooseImage({
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          prevImg: tempFilePaths[0]
        })
        console.log(tempFilePaths, 'tempfilepaths')
        wx.uploadFile({
          url: 'https://wxapi.chunchenji.com/api/services/SCMS/commonService/UploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'imgUrl': tempFilePaths[0]
          },
          success:  (res) => {
            var data = JSON.parse(res.data)
            console.log(data, 'data')
            this.setData({
              bannerImg:'http://'+data.content.imgUrl
            })
            //do something
          },
          complete: function (res) {
          
          }
        })
      }
    })
  },
  submint() {
    if (this.data.title == ""){
      wx.showToast({
        title: '请填写春晨计的名称',
        icon:'none'
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
    var fornData = {
      bannerImg: this.data.bannerImg,
      title: this.data.title,
      content: this.data.text,
      planType: this.data.form.type,
      completeTime: this.data.date,
      public: this.data.form.objectType,
      nickName: app.globalData.nickNameType[this.data.form.nickType].text
     
    }
    var params = {
      method: 'post',
      url: '/planService/SavePlan',
      data: fornData,
      success: (res) => {
        console.log(res, 'res');
        var id = res.data.content.planId ;
        wx.navigateTo({
          url: '/pages/plan/createfinish/index?id=' + id,
          success:()=>{
            this.setData({
              bannerImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
              objectType: 0,
              nickType: 0,
              type: 0,
              date: (app.getNow()).year + '-' + (app.getNow()).month + '-' + (app.getNow()).day,
              title: '',
              text: '',
              form: {
                objectType: 0,
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
    console.log(fornData, 'form')
    
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
    //console.log(app.globalData.nickNameType,'app.globalData.nickNameType')
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log(app.globalData.userInfo, '1223354')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var title = wx.getStorageSync('titleField');
    var text = wx.getStorageSync('desField');
    if (title !="") {
      this.setData({
        title: title
      })
    }else{
      this.setData({
        title: ''
      })
    }
    if (text != "") {
      this.setData({
        text: text
      })
    }else{
      this.setData({
        text: ''
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
  onShareAppMessage: function () {

  }
})