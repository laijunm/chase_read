const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    booksBirthTitleList:[],
    orderOfbirthUrl:'',
    booksDataArray:[],
    default:"/store/rankList.json?rankType=34&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0"
  },

  activeClickToggle(e){
    this.setData({
      active:e.target.dataset.index,
      orderOfbirthUrl:e.target.dataset.url
    })

    this.getBooksListData(this.data.orderOfbirthUrl)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

this.getOrderOfBrithList()
this.getBooksListData(this.data.default)
  },

   getOrderOfBrithList(){
     let that = this
     wx.request({
       url: 'https://apis.netstart.cn/yunyuedu/store/merged/rankNavi.json',
       success(res) {
        that.setData({
            booksBirthTitleList:res.data.data.list[0].subNavis
           })
       }
      
     })

   },

   getBooksListData(id){
     let that = this
     wx.request({
       url: 'https://apis.netstart.cn/yunyuedu' + id,
       success(res) {
         that.setData({
          booksDataArray:res.data.list
         })
       }
     })
   },
   clickUseFunction:function(e){
    app.next_calculator(e)
 },

})