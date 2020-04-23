Page({
  data: {
    isShow: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.getSetting();    
  },
  getSetting() {
    let that = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log('用户已经授权过')
          that.setData({
            isShow: false
          })
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              console.log('执行跳转页面')
            }
          })
        }
        else {
          console.log('用户未授权过')
          that.setData({
            isShow: true
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    this.getSetting();
  }
})