// pages/plan/editfield/title/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cursor: 0,
    inputText: '',
    dataList: [{ text:""}]
  },
  removeRow(e){
    var list = this.data.dataList;
    var index = e.currentTarget.dataset.index
    if(list.length ==1){
      wx.showToast({
        title: '不能删除全部的清单',
        icon:'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除该清单？',
      success:(res)=>{
        if(res.confirm){
         
          list.splice(index,1)
          this.setData({
            dataList:list
          })
        } else if(res.cancel){

        }
      }
    })
  },
  bindInput(e) {
    var id = e.currentTarget.id
    var list = this.data.dataList;
    list[id] = { text:e.detail.value}
    this.setData({
      dataList:list
    })
  },
  addList() {
    var item = { text: '' },
      list = this.data.dataList;
    for(let key in list){
      if (list[key].text==""){
        wx.showToast({
          title: '新增的清单不能为空',
          icon: 'none'
        })
        return ;
      } 
    }

    list.push(item)
    this.setData({
      dataList: list
    })
   
  },
  confirmHandle(e) {
    var value = e.detail.value;
    var list = [];
    for (let key in value){
      if (value[key] == ""){
        wx.showToast({
          title: '还有清单为空，请输入内容或者删除',
          icon: 'none'
        })
        return;
      }
      list.push({ text:value[key]})

    }
    this.setData({
      dataList: list
    })

    
    wx.setStorageSync('listField', this.data.dataList)
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.barTitle
    })
    var dataList = (wx.getStorageSync('listField') == "") ? [{ text: '' }] : wx.getStorageSync('listField')
    this.setData({
      dataList: dataList
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})