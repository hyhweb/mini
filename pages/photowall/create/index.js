
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesList: [],
    files: []
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  uploadFile: function (filePath, param, callback) {
    wx.uploadFile({
      url: app.globalData.apiUrl + '/login.json',
      filePath: filePath,
      name: 'file',
      formData: param || {},
      success(res) {
        if (callback) {
          callback()
        }
        var data = res.data;
        console.log(data)
      }
    })
  },
  submitHandle: function () {
    if (this.data.files.length > 0) {
      this.data.files.map(function (item, key, arr) {

        wx.uploadFile({
          url: app.globalData.apiUrl + '/login.json',
          filePath: item,
          name: 'file',
          formData: { 'name': '111' },
          success(res) {
            var data = res.data;
            console.log(data)
          },
          fail: function (res) {
            console.log(res, 'error')
          },
          complete: function (res) {
            if (res.statusCode == "405") {
              wx.showToast({
                title: '上传失败'
              })
            }
            console.log(res, 'complete')
          }
        })

      })
    }

  },
  uploadImg: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imagesList: tempFilePaths
        })
        console.log(that.imagesList, 'this.imagesList')
        wx.uploadFile({
          url: app.globalData.apiUrl + 'login.json',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'hyh'
          },
          success: function (res) {
            var data = res.data;
            console.log(data)
          },
          fail: function (res) {
            console.log(res, 'error')
          }
        })
        console.log(res)
      },
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