const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeActive:0,
    classifyList:[],
    url:7,
    classifyItemList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getClassifyData()
  },
  onReady(){
this.getClassifyItemDataTwo()
  },


  clickToggleType(e) {
   this.setData({
    typeActive:e.target.dataset.index,
    url:e.target.dataset.url
   })

   this.getClassifyItemDataTwo(this.data.url)
  },
  

  getClassifyData(){
    let that = this
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/simpleCategroy.json',
      success(res){
          that.setData({
            classifyList:res.data[0].cates
          })
      }
    })
  },

  getClassifyItemDataTwo(id) {
    let that = this
    wx.request({
      url: `https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=${id ? id : 7}&wordCount=0&pay=0&bookStatus=2`,
      success(res) {
      that.setData({
        classifyItemList:res.data.list
      })
      }
    })
  },
  clickUseFunction:function(e){
    app.next_calculator(e)
 },
})