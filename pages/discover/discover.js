const app = getApp()
const seachRecommend = require("../../data/seachrecommend.js");
const seachResult = require("../../data/seachResult.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    seachText:'',
    seachHistoryArray:[],
    showHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        seachHistoryArray:seachRecommend.default.books
      })

  },

 discoverFromHandel(e) {
   let book = e.detail.value.bookName

   this.setData({
    seachText:book,
   })

   if(book == '') {
     return
   }
this.getSeachData(book)
 },
 getSeachData(book){
   let that = this
  wx.request({
    url: 'https://apis.netstart.cn/yunyuedu/search/book.json?keyword=' + book,
    success(res) {
      that.setData({
        books:res.data.data.books,
        showHidden:true       
      })
    }
  })
  // this.setData({
  //   books:seachResult.default.books,
  //   showHidden:true       
  // })
 },

 recommendItemClick(e) {
  let text = e.target.dataset.text
  this.getSeachData(text)
 },

 clickUseFunction:function(e){
  app.next_calculator(e)
},
})