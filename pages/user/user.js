import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  
  data: {
    nigheMode:false,
    isNoLogin:false,
    userData:{},
    isNotLogin:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isNoLogin:wx.getStorageSync('isNotLogin'),
      nigheMode:wx.getStorageSync('isNightModel'),
      isNotLogin:wx.getStorageSync('isNotLogin')
    })
    let isNotLogin = wx.getStorageSync('isNotLogin')
    if(isNotLogin == true) {
      this.setData({
        userData:wx.getStorageSync('userData'),
      })
    }
  },

  toggleMode(){
    this.setData({
      nigheMode:!this.data.nigheMode
    })
    wx.setStorageSync('isNightModel', this.data.nigheMode)
    this.onLoad()
  },

  routerLoginPage(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  quitLogin(){
    Toast({
      type: 'loading',
      message: '加载中',
      context:this,
      onClose: () => {
        Toast({
          type: 'success',
          message: '退出成功',
          context:this,
          onClose: () => {
            wx.setStorageSync('isNotLogin', false)
            this.onLoad()
          },
        });
      },
    });
  },

  routerEditPage(){

    let isNotLogin = wx.getStorageSync('isNotLogin')
  
        Toast({
      type: 'loading',
      message: '加载中',
      duration:400,
      context:this,
      onClose: () => {
        if(isNotLogin == true) {
          wx.navigateTo({
         url: '../../components/edituserpage/edituserdata'
       })
       return
       }
        Toast({
          type: 'fail',
          message: '未登录',
          context:this,
          onClose: () => {
          },
        });
      },
    });
  

  },

  removeLoginNum(){
    let numPass = wx.getStorageSync('numPass')
    if(this.data.isNotLogin == true ) {
       if(numPass) {
      Dialog.confirm({
        message: '确定要注销吗',
        context:this
      }).then(() => {
        wx.removeStorageSync('numPass')
        wx.setStorageSync('isNotLogin', false)
        Toast({
          type: 'loading',
          message: '加载中',
          context:this,
          onClose: () => {
            Toast({
              type: 'success',
              message: '账号注销成功',
              context:this,
              onClose: () => {
                this.onLoad()
              },
            });
          },
        });
      }) .catch(() => {
        return
      });
     return
    }
    }
   
   
  },

  routerHistoryPage(){
    wx.navigateTo({
      url: '../../components/borwsinghistory/borwsinghistory'
    })
  },
  routerUserAgreementPage(){
    wx.navigateTo({
      url: '../../components/useragreement/useragreement'
    })
  },
  routerPrivacyPolicyPage(){
    wx.navigateTo({
      url: '../../components/privacypolicy/privacypolicy'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
})