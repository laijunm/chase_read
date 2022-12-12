// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  next_calculator:function (e) {
     
    let id = e.currentTarget.dataset.id
    let img =  e.currentTarget.dataset.img

    wx.navigateTo({
      url: '/components/bookpage/bookpage?id=' + id,
    })

    wx.setStorageSync('bookImg', img)
    
  }
})
