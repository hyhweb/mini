var url = "http://rap2api.taobao.org/app/mock/4987/GET/getPageList";
var page = 1;
var now = new Date();
console.log(now.getMonth(0))
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  // wx.request({
  //   url: url,
  //   data: {
  //     pageSize: 10,
  //     pageNo: page
  //   },
  //   success: function (res) {
    //  console.log(res,'res')
      var l = that.data.list
      var data = [
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "title": "学习人工智能",
          "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
          "type": "生活",
          "start": "2018-02-01",
          "end": "2018-05-01",
          "visit": "所有人可见",
          "name": "匿名",
          "focus": 20,
          "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        }
      ];
      for (var i = 0; i < data.length; i++) {
        l.push(data[i])
      }
      that.setData({
        list: l
      });
      page++;
      that.setData({
        hidden: true
      });
  //   }
  // });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉");
  }
})  