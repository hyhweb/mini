const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
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
      url: '/planService/GetList',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        console.log(res, 'res');
        this.setData({
          bannerImg: res.data.content[0].bannerImg,
          title: res.data.content[0].title,
          des: res.data.content[0].content,
          objectType: res.data.content[0].public,
          nickType:(res.data.content[0].nickName =="匿名"?1:0),
          type: res.data.content[0].planType,
          date: res.data.content[0].completeTime
        })
      }
    }
    app.ajax(params)
  },
  
  savePlan(){
    var params = {
      method: 'post',
      url: '/planService/SavePlan',
      data: {
        "id":this.data.id,
        "bannerImg": this.data.bannerImg,
        "title": this.data.title,
        "content": this.data.des,
        "planType": this.data.type,
        "completeTime": this.data.date,
        "public": this.data.objectType,
        "nickName": this.data.nickArray[this.data.nickType].text
      },
      success: (res) => {
        console.log(res, 'res');
        wx.navigateTo({
          url: '/pages/plan/myplan/index?current=' + this.data.current
        })
      }
    }
    app.ajax(params)
  },

  deletePlan(){
    var params = {
      method: 'post',
      url: '/planService/DeletePlan',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        console.log(res, 'res');
        wx.navigateTo({
          url: '/pages/plan/myplan/index'
        })
      }
    }
    app.ajax(params)
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
          success: (res) => {
            var data = JSON.parse(res.data)
            console.log(data, 'data')
            this.setData({
              bannerImg: 'http://' + data.content.imgUrl
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
    this.savePlan()
   
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
      id:options.id
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
    var title = wx.getStorageSync('titleField');
    var des = wx.getStorageSync('desField');
    if (title) {
      this.setData({
        title: title
      })
    }
    if (des) {
      this.setData({
        des: des
      })
    }

    console.log(title, 'title')
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