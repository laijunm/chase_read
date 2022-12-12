import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    userHeadImg:'',
    userOriginData:{},
    userLoginNumber:{}
  },
 
  // toggleHeadImg(){
 
  // },
  onLoad(options) {
   this.setData({
    userOriginData:wx.getStorageSync('userData'),
    userLoginNumber:wx.getStorageSync('numPass')
   })
  },

  userFormSubmit(e){

let userName = e.detail.value.nicheng
let userMobNum = e.detail.value.mobNum
let userSign = e.detail.value.sign
let password = this.data.userLoginNumber.pass

let userData = {
  name:userName,
  mobNum:userMobNum,
  sign:userSign  == '' ? '你还没有个性签名呢！' : userSign
}



if(userMobNum != '') {
  let regMobile = /^1[3|4|5|7|8][0-9]{9}$/
if(regMobile.test(userMobNum) !== true) {
  Toast({
    type:"fail",
    message:"号码格式不对",
    context:this ,
    duration:3000,
  });
return
}
  this.data.userLoginNumber = {
    num:userMobNum,
    pass:password
  }

  wx.setStorageSync('numPass', this.data.userLoginNumber)
}

if(userName != ''  || userSign != '') {
  wx.setStorageSync('userData', userData)
  Toast({
    type: 'loading',
    message: '加载中',
    context:this,
    onClose: () => {
      Toast({
        type: 'success',
        message: '修改成功',
        context:this,
        onClose: () => {
         wx.reLaunch({
           url: '/pages/user/user',
         })
        },
      });
    },
  });
  this.onLoad()
}

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  
}
})