
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    progress: 0,
    completeContent: "",
    images: [],
    planList: [{
      "planOfListId": 234230,
      "text": "1,22324 2,32434",
      "status": 0,
      "checked":false
    },
      {
        "planOfListId": 11123412342,
        "text": "已完成已完成已完成已完成已完成已完成已完成",
        "status": 1,
        "checked": true
      }],
    checkedIds:[]
  },
  finishPlanListHandle(data){
    var param = {
      url:'/api/services/SCMS/planService/UpdatePlanOfListStatus',
      method:'post',
      data:data,
      success:(res)=>{

      }
    }
   app.ajax(param)
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e);
   
    var planList = this.data.planList, values = e.detail.value;
    for (var i = 0, lenI = planList.length; i < lenI; ++i) {
      planList[i].status = 0;
      planList[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (planList[i].planOfListId == values[j]) {
          planList[i].status = 1;
          planList[i].checked = true;
          break;
        }
      }
    }

    if (e.detail.value.length > this.data.checkedIds.length){
      console.log('选中', e.detail.value.slice(-1)[0])
   }else{
      console.log('取消', this.data.checkedIds.slice(-1)[0])
   }
    this.setData({
      planList: planList,
      checkedIds: e.detail.value
    });

    
    console.log(planList,'planList')
    if (e.detail.value.length != 0){
      console.log(e.detail.value[e.detail.value.length - 1])
    }
   
  },
  bindInput(e) {
    this.setData({
      completeContent: e.detail.value
    })
  },
  getDetail() {
    var params = {
      method: 'post',
      url: '/planService/getplan',
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
  removePic:function(e){
   var index = e.currentTarget.dataset.index
   this.data.images.splice(index, 1);
   this.setData({
     images: this.data.images
   })
  },
  previewImage: function(e){
    // var current = e.target.dataset.src;
    // var imageList = this.data.images.map(function(item,key){
    //   return item.imgUrl
    // });
    // wx.previewImage({
    //   current: current, // 当前显示图片的http链接  
    //   urls: imageList // 需要预览的图片http链接列表  
    // })  
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       
        res.tempFilePaths.map((item) => {

          wx.showLoading({
            title:'图片上传中...'
          })
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
      if (param.completeContent.length >1000){
        wx.showToast({
          title: '完成情况不能超过1000个文字',
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
    var listIds = []
    this.data.planList.map((item)=>{
      if(item.status == 1){
        listIds.push(item.planOfListId)
      }
    })
    this.setData({
      checkedIds: listIds
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