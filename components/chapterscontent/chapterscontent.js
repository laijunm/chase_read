var WxParse = require('../../pages/wxParse/wxParse')
var initList  = []
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    title:[],
    show:false,
    contentEmpty:false,
    showLeft:false,
    showPageData:[],
    bookCatalogue:[],
    isLoadMore: true,
    id:'',
    currentNum:50,
    chaptersContent:[],
    chaptersId:'',
    currentHight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    let uuid = options.uuid
   let haedTitle = options.title

    wx.setNavigationBarTitle({
      title: haedTitle,

    })

    this.setData({
      id,
      chaptersId:uuid
    })
  this.getChapterscontent(id,uuid)
    // this.dataHandel()
this.getCatalogueData(id)

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  showPopup() {
    this.setData({ 
      show: !this.data.show,
      showLeft:false
     });
  },

  getChapterscontent(id,uuid){
    if(uuid == undefined) {
      that.setData({
        contentEmpty:true
      })
      return
    } else {
      let that = this
      wx.request({
        url: `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${id}&content_uuid=${uuid}`,
        success(res) {
  
          that.setData({
            content:res.data.data?.content

          })
          WxParse.wxParse('content', 'html', that.data.content, that,5)
          that.currentHighlight()
        }
      })
    }
   
  },
showLeftPopop(){
  this.setData({
    showLeft:!this.data.showLeft
  })
  this.getCatalogueData(this.data.id)
},
getCatalogueData(id){
  let that = this
  wx.request({
    url: 'https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=' + id,
    success(res) {
      that.setData({
        bookCatalogue:res.data.data.catalog,
        chaptersContent:res.data.data.catalog
      })
      initList = []
      var totalList = that.data.bookCatalogue
      for(let i = 0; i < totalList.length; i++) {
        initList.push(totalList[i])
      }
      that.setData({
        showPageData:initList
      })
    }
  })


},

getChaptersNewData(e){
let uuid = e.target.dataset.id

this.getChapterscontent(this.data.id,uuid)
this.setData({
  chaptersId:uuid,
  show:false,
  showLeft:false
})
},

getChaptersIndex(){
  this.getCatalogueData(this.data.id)
  let chaptersContent = this.data.chaptersContent

    let mid = this.data.chaptersId

    var iii = chaptersContent.findIndex((f) => {
      return f.uuid == mid
    })

    if(iii - 1  >= 0) {
      let uuid = chaptersContent[iii - 1]?.uuid

      this.getChapterscontent(this.data.id,uuid)
      this.setData({
        chaptersId:uuid,
        show:false,
        showLeft:false
      })
      return
    } 
 
        Toast({
          type: 'fail',
          message: '到顶了',
          context:this,
          onClose: () => {
          },
        });
    
  
  
},
getChaptersXiaIndex(){
  this.getCatalogueData(this.data.id)
  let chaptersContent = this.data.chaptersContent

    let mid = this.data.chaptersId

    var iii = chaptersContent.findIndex((f) => {
      return f.uuid == mid
    })
    if(iii + 1  < chaptersContent.length) {
      let uuid = chaptersContent[iii + 1]?.uuid
      this.getChapterscontent(this.data.id,uuid)
      this.setData({
        chaptersId:uuid,
        show:false,
        showLeft:false
      })
      return
    } 
    Toast({
      type: 'fail',
      message: '没有更多了',
      context:this,
      onClose: () => {
      },
    });
  
  
},

currentHighlight(){
  let chaptersContent = this.data.chaptersContent

    let mid = this.data.chaptersId

    var iii = chaptersContent.findIndex((f) => {
      return f.uuid == mid
    })
 
     
    this.setData({
      currentHight:iii > 0 ? iii : 0
    })


}


})