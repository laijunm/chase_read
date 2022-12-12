import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggleLogin:false,
    radioValue:false,
    replaceTotalTime:10,
    replaceNumVer:null,
    replaceContent:'获取验证码',
    changeColour:false,
    inputContent:'',
    numAndPass:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

toggleLoginHandel(){
  this.setData({
    toggleLogin:!this.data.toggleLogin
  })
},

toggleRadio(){
  this.setData({
    radioValue:!this.data.radioValue
  })
},
formSubmit(e){
  let that = this
  let num = e.detail.value?.number
  let ver = e.detail.value?.verification
  let pass = e.detail.value?.password
  let radioValue = that.data?.radioValue
  let toggleLoginValue = this.data.toggleLogin
 
  let numberAndPassword = wx.getStorageSync('numPass')
  this.setData({
    numAndPass:{
      num:numberAndPassword.num,
      pass:numberAndPassword.pass
    }
  })
  console.log(this.data.numAndPass);
   


  if (radioValue === false) {
    Toast({
      type:"fail",
      message:"请勾选协议",
      context:this ,
      duration:3000,
    })
    return
  }
  if (num == '' || ver == '') {
    Toast({
      type:"fail",
      message:"请输入",
      context:this ,
      duration:3000,
    });
    return
  }
  let regMobile = /^1[3|4|5|7|8][0-9]{9}$/
  if(regMobile.test(num) !== true) {
    Toast({
      type:"fail",
      message:"格式不正确",
      context:this ,
      duration:3000,
    });
return
  }
  
  if(!numberAndPassword) {
    Dialog.confirm({
      message: `账号不存在，是否创建`,
      context:this
    }).then(() => {
        if(this.data.toggleLogin === false) {
          let numPass = {
          num,
          pass:ver
        }
        wx.setStorageSync('numPass', numPass)
        Toast({
          type: 'loading',
          message: '加载中',
          context:this,
          onClose: () => {
            Toast({
              type: 'success',
              message: '登陆成功',
              context:this,
              onClose: () => {
               wx.reLaunch({
                 url: '/pages/index/index',
               })
               wx.setStorageSync('isNotLogin', true)
              },
            });
          },
        });
        return
        } else if (this.data.toggleLogin === true) {
          let numPass = {
            num,
            pass
          }
          wx.setStorageSync('numPass', numPass)
          Toast({
            type: 'loading',
            message: '加载中',
            context:this,
            onClose: () => {
              Toast({
                type: 'success',
                message: '登陆成功',
                context:this,
                onClose: () => {
                 wx.reLaunch({
                   url: '/pages/index/index',
                 })
                 wx.setStorageSync('isNotLogin', true)
                },
              });
            },
          });
        
          return
        }
      })
      .catch(() => {
      });
      return
  } 


    if(numberAndPassword && toggleLoginValue == false) {  
      if (num === this.data.numAndPass.num ) {
        Toast({
          type: 'loading',
          message: '加载中',
          context:this,
          onClose: () => {
            Toast({
              type: 'success',
              message: '登陆成功',
              context:this,
              onClose: () => {
               wx.reLaunch({
                 url: '/pages/index/index',
               })
               wx.setStorageSync('isNotLogin', true)
              },
            });
          },
        });
        return
      }
      Toast({
        type: 'loading',
        message: '加载中',
        context:this,
        onClose: () => {
          Dialog.alert({
            message: `账号错误`,
            context:this
          }).then(() => {
           
          });
        },
      });
      return
    } else {
      if (num === this.data.numAndPass.num && pass === this.data.numAndPass.pass) {
        Toast({
          type: 'loading',
          message: '加载中',
          context:this,
          onClose: () => {
            Toast({
              type: 'success',
              message: '登陆成功',
              context:this,
              onClose: () => {
               wx.reLaunch({
                 url: '/pages/index/index',
               })
               wx.setStorageSync('isNotLogin', true)
              },
            });
          },
        });
        return
      }
      Toast({
        type: 'loading',
        message: '加载中',
        context:this,
        onClose: () => {
          Dialog.alert({
            message: `账号或密码错误`,
            context:this
          }).then(() => {
           
          });
        },
      });
      
      return
    }
    


},


 // 验证码
       getReplaceVerification(){
        if ( this.data.replaceTotalTime < 10) {
            return;
            }
         let num = "";
         for (let i = 0; i < 6; i++) {
    let numVerifi = Math.floor(Math.random() * 10);
    num += numVerifi;
          }
          this.data.replaceNumVer = num;
  this.getReplaceVerificationTime();
  Dialog.alert({
    message: `你的验证码为${num}`,
    context:this
  }).then(() => {
    this.setData({
      inputContent:num
    })
  });
 
},
// 获取验证码倒计时
getReplaceVerificationTime() {
 
  let setIntervalHandel =  setInterval(() => {
    this.setData({
      replaceContent :  this.data.replaceTotalTime + "s后再次发送",
      changeColour:true
    })
      
       this.data.replaceTotalTime--;
    if ( this.data.replaceTotalTime == 0) {
      this.setData({
        replaceTotalTime : 10,
        replaceContent : "获取验证码",
        changeColour:false
    
      })
       clearInterval(setIntervalHandel);
    }
  }, 1000);
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },



})