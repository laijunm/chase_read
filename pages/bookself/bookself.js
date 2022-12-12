const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksList:[],
    books:[],
    deleteBookButton:false,
    isNightModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let isLogin = wx.getStorageSync('isNotLogin')

    if(isLogin != true) {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
  
   var book = wx.getStorageSync('bookDataObj')
   this.setData({
    booksList:book,
    isNightModel:wx.getStorageSync('isNightModel')
   })
  },
  clickUseFunction:function(e){
    app.next_calculator(e)
    bindtap.stop()
 },
 clickDeteletBook(e){
   let booksList = wx.getStorageSync('bookDataObj')
let id = e.target.dataset.val
var index = booksList.findIndex((v) => {
  return v.id == id
})
booksList.splice(index,1)
wx.setStorageSync('bookDataObj', booksList)
this.onLoad()
 },
 clickShowHiddenDeleteButton() {
   this.setData({
    deleteBookButton:!this.data.deleteBookButton
   })
 },

 clickClearBooksList(){
    wx.removeStorageSync('bookDataObj')
    this.onLoad()
 },

 onShow(){
   this.onLoad()
 }


})