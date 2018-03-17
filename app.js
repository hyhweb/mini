//app.js
var common = require('./common.js');
//wxapi.chunchenji.com
var apiUrl = 'https://wxapi.chunchenji.com/api/services/SCMS',
  wxOpenId = "",
  wxAvatarUrl = "",
  nickName = "";

App({

  onLaunch: function () {
    common.sayHello();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res, 'code')
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7cf8e16886c6f896&secret=d2d1826c8f5a7eaa6ce782fbdfd898ab&js_code=' + res.code + '&grant_type=authorization_code'
        wx.request({
          url: url,
          success: (result) => {
            var data = result.data;
            wxOpenId = data.openid;
            this.globalData.wxOpenId = data.openid;
            console.log(result,'result')
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wxAvatarUrl = res.userInfo.avatarUrl;
              nickName = res.userInfo.nickName;
              this.globalData.nickNameType[0].text = res.userInfo.nickName
              this.globalData.nickNameType[0].value = res.userInfo.nickName
              this.globalData.wxAvatarUrl = res.userInfo.AvatarUrl;
              console.log(res.userInfo, 'res.userInfo')
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //拒绝授权处理
          this.failAUTHandle()
        }
      }
    })
  },
  failAUTHandle() {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '拒接授权将无法正常展示个人信息和正常使用该小程序，请点击确定重新授权，',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '授权成功',
          })

          wx.openSetting({
            success: function (data) {
              if (data) {
                if (data.authSetting["scope.userInfo"] == true) {

                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      that.globalData.userInfo = res.userInfo
                      wxAvatarUrl = res.userInfo.avatarUrl;
                      nickName = res.userInfo.nickName;
                      that.globalData.nickNameType[0].text = res.userInfo.nickName
                      that.globalData.nickNameType[0].value = res.userInfo.nickName
                      that.globalData.wxAvatarUrl = res.userInfo.AvatarUrl;
                      console.log(res.userInfo, 'res.userInfo')
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }
                    }
                  })



                }
              }
            },
            fail: function () {
              console.info("设置失败返回数据");
            }
          });




        } else if (res.cancel) {
          wx.showToast({
            title: '授权失败',
          })
          that.failAUTHandle()
        }
      }
    })
  },
  arrFindIndex: (arr, key, value) => {
    return arr.findIndex(function (item) { return item[key] == value })
  },
  ajax: (option,callback) => {
    if (wxOpenId==""){

      
      setTimeout(() => {
        var timeStamp = (new Date().getTime()).toString();

        var data = {

          wxOpenId: wxOpenId,
          wxAvatarUrl: wxAvatarUrl,
          nickName: nickName,
          timeStamp: timeStamp,
          sign: 't324096837982gghdlsjk' + timeStamp,
          ...option.data
        }
        console.log(JSON.stringify(data), '参数0')
        wx.request({
          url: apiUrl + option.url, //仅为示例，并非真实的接口地址
          method: option.method || 'get',
          data: data,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: option.success,
          fail: (res) => {
            wx.showToast({
              title: '网络错误，请稍后'
            })
          }
        })
      }, 2000)
    }else{
      var timeStamp = (new Date().getTime()).toString();

      var data = {

        wxOpenId: wxOpenId,
        wxAvatarUrl: wxAvatarUrl,
        nickName: nickName,
        timeStamp: timeStamp,
        sign: 't324096837982gghdlsjk' + timeStamp,
        ...option.data
      }
      console.log(JSON.stringify(data), '参数1')
      wx.request({
        url: apiUrl + option.url, //仅为示例，并非真实的接口地址
        method: option.method || 'get',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: option.success,
        fail: (res) => {
          wx.showToast({
            title: '网络错误，请稍后'
          })
        }
      })
    }
    
   
  },
  getNow: function () {
    var now = {};
    var time, week, checkDate = new Date(new Date());
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    time = checkDate.getTime();
    checkDate.setMonth(0);
    checkDate.setDate(1);
    week = Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
    now.year = new Date().getFullYear();
    now.month = new Date().getMonth() + 1;
    if (now.month < 10) {
      now.month = "0" + now.month;
    }
    now.day = new Date().getDate();
    now.hao = new Date().getDate();
    if (now.day < 10) {
      now.day = "0" + now.day;
    }
    now.week = week;
    return now;
  },
  globalData: {
    userInfo: null,
    apiUrl: apiUrl,
    wxOpenId: '',
    wxAvatarUrl: '',
    infoType: [
      {
        value: 0, text: '生活'
      },
      {
        value: 1, text: '事业'
      },
      {
        value: 2, text: '学习'
      },
      {
        value: 3, text: '财富'
      },
      {
        value: 4, text: '健康'
      },
      {
        value: 5, text: '旅行'
      },
      {
        value: 6, text: '技能'
      },
      {
        value: 7, text: '公益'
      },
      {
        value: 9999, text: '其它'
      }
    ],
    visibleType: [
      {
        value: 0, text: '所有人可见'
      },
      {
        value: 1, text: '仅自己可见'
      }
    ],
    nickNameType: [
      {
        value: 0, text: '微信昵称'
      },
      {
        value: 1, text: '匿名'
      }
    ],
    detail: {
      "title": "学习人工智能",
      "des": "随着输入内容的多少自动增减输入区域的高度，自动换行",
      "type": "生活",
      "start": "2018-02-01",
      "end": "2018-05-01",
      "visit": "所有人可见",
      "name": "匿名",
      "iscomplate": true,
      "complatelist": [
        {
          "url": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "url": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          "url": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        }
      ],
      "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
    },
    leaveMsg: [
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      },
      {
        "img": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "text": "非常给力，支持！！！",
        "date": "2018-02-22"
      }
    ],
    pageList: [
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
    ]
  }
})