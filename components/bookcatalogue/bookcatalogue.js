import Toast from '@vant/weapp/toast/toast';
const mulu = require("../../data/mulu.js")
var initList  = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
   bookCatalogue:[],
   index:0,
   currentNum:50,
   showPageData:[],
   isLoadMore: true,
   id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let id = options.id
    this.setData({
      id:options.id,
      showPageData:mulu.default.catalog
    })

  // this.getCatalogueData(id)


  },

   onReachBottom() {
     this.getLazyLoadData()
   },

  getLazyLoadData(){
   this.setData({
    isLoadMore: false
   })
   var totalList = this.data.bookCatalogue
    var currentNum = this.data.currentNum
    var initList = []

    if(currentNum >= totalList.length){
      this.setData({
        isLoadMore: true,
      })
      Toast({
        type: 'fail',
        message: '已经到底了...',
        duration:1000,
        context:this,
        onClose: () => {}
      })
      return
    }

    for(let i = 0; i < currentNum + 50; i++) {
      initList.push(totalList[i])
    }
    setTimeout(() => {
      this.setData({
        currentNum: currentNum + 50,
        isLoadMore: true,
        showPageData: initList
      })
    }, 1000)
  },

  // getCatalogueData(id){
  //   let that = this
  //   wx.request({
  //     url: 'https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=' + id,
  //     success(res) {
  //       that.setData({
  //         bookCatalogue:res.data.data.catalog,
  //       })
  //       initList = []
  //       var totalList = that.data.bookCatalogue
  //       for(let i = 0; i < 50; i++) {
  //         initList.push(totalList[i])
  //       }
      
  //       that.setData({
  //         showPageData:initList
  //       })
  //     }
  //   })


  // },
  clickRouterChapters(e){
    let id = this.data.id
    let uuid = e.target.dataset.id
    wx.navigateTo({
      url: `../../components/chapterscontent/chapterscontent?id=${id}&uuid=${uuid}`,
    })
  }
  
})