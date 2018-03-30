
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    progress: 0,
    completeContent: "",
    images: []
  },
  bindInput(e) {
    this.setData({
      completeContent: e.detail.value
    })
  },
  getDetail() {
    var params = {
      method: 'post',
      url: '/planService/GetList',
      data: {
        "planId": this.data.id
      },
      success: (res) => {
        this.setData({
          progress: res.data.content[0].progress || 0,
          completeContent: (res.data.content[0].completeContent == null ? "" : res.data.content[0].completeContent),
          images: res.data.content[0].images
        })
      }
    }
    app.ajax(params)
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        res.tempFilePaths.map((item) => {


          wx.uploadFile({
            url: 'https://wxapi.chunchenji.com/api/services/SCMS/commonService/UploadImg', //仅为示例，非真实的接口地址
            filePath: item,
            name: 'file',
            formData: {
              'imgUrl': item
            },
            success: (res) => {
              var data = JSON.parse(res.data)
              if (data.code == 1000) {
                var images = [];
                images.push({ imgUrl:data.content.imgUrl })
                that.setData({
                  images: that.data.images.concat(images)
                });
                wx.showToast({
                  title: '图片上传成功'
                })

              }else{
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'none'
                })
              }
             

              //do something
            },
            complete: function (res) {

            }
          })






        })










      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  savePlan(option) {
    var params = {
      method: 'post',
      url: '/planService/SavePlanOther',
      data: option,
      success: (res) => {
        wx.navigateTo({
          url: '/pages/plan/planfinishsuccess/index?id=' + this.data.id,
        })
      }
    }
    app.ajax(params)
  },
  formSubmit: function (e) {
    app.loginAfterHandle(() => {
      var param = {
        ...e.detail.value,
        images: this.data.images,
        id: this.data.id
      }
      if (param.completeContent.length >200){
        wx.showToast({
          title: '完成情况不能超过200个文字',
          icon:'none'
        })
        return;
      }
      console.log(param,'param')
      this.savePlan(param);
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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