import Toast from '@vant/weapp/toast/toast';
// const bookDetail = require("../../data/bookDetail.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
       id:'',
       bookDetails:[],
       bookDataObj:[],
       booksListArray:[],
       collectionOrNot:[],
       isNotCollect:false,
       arr:[],
       bookIsNotCollect:false,
       bookImg:'',
       zhangjienum:'',
       chaptersId:'',
       loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var booksList = wx.getStorageSync('bookDataObj')
    let mid = options.id
    let filterIfBookItemCollect = null

   if(booksList) {
    let ifBookItemCollect = booksList?.map(item => item.id == mid)
     filterIfBookItemCollect = ifBookItemCollect.filter(it => it)
    var iii = booksList.findIndex((f) => {
      return f.id == mid
    })
     this.setData({
      booksListArray:booksList
     })
     if(filterIfBookItemCollect != '') {
      this.setData({
        bookIsNotCollect:booksList[iii].isNCollect
      })
    }
   }

  
     this.setData({
       id:mid,
      //  zhangjienum:'终章 刘笑',
      //  bookDetails:bookDetail.default.entry,
      //  bookImg:wx.getStorageSync('bookImg')
     })

    // wx.setNavigationBarTitle({
    //       title:this.data.bookDetails.title,
    //     })
        this.loadingBookPage()
    this.getBookCatalogurId()
  },


  loadingBookPage(){
    let id = this.data.id
    let url = "https://apis.netstart.cn/yunyuedu/book/getsub.json?id=" + id
    let that = this
    this.setData({
      loading:true
    })

    wx.request({
      url: url,
      success (res) {
       wx.setNavigationBarTitle({
        title:res.data.feed.entry?.title,
      })
        that.setData({
          bookDetails:res.data.feed.entry,
          bookImg:wx.getStorageSync('bookImg')
        })
       
      } 
     
    }),
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/book/simpleInfo.json?id=' + id,
      success(r) {
        that.setData({
          zhangjienum:r.data.item?.latestArticleTitle,
        })

         that.setData({
            loading:false
          })
   
      }
    })

     
    
  },

  dataStroage(e){
  let bookDataObj= this.data.bookDataObj
  var bookDataList = wx.getStorageSync('bookDataObj')
  let eId =  e.currentTarget.dataset.id
  let isLogin = wx.getStorageSync('isNotLogin')
  let time = this.getDateData()
  // 书本数据
  bookDataObj = {
    id:this.data.bookDetails.id,
    img:this.data.bookImg,
    name:this.data.bookDetails.title,
    isNCollect:true,
    collectionTime:time,
    author:this.data.bookDetails.author.name,
    introduce:this.data.bookDetails.content.text
  }

  if(isLogin != true) {
    wx.navigateTo({
      url: '../../pages/login/login',
    })
    return
  }

  if(!bookDataList)  {
    var bookDataList = this.data.arr
  }
  let ifFalse = bookDataList.map(item => item.id == bookDataObj.id)
  let  isEmpty = ifFalse.filter(i => i)
  if (isEmpty == '') {
    bookDataList.push(bookDataObj)
    Toast({
      type: 'loading',
      message: '加载中',
      duration:400,
      context:this,
      onClose: () => {
        this.setData({
          bookIsNotCollect:true
         })
        Toast({
          type: 'success',
          message: '已收藏',
          context:this,
          onClose: () => {
            wx.setStorageSync('borwsingHistory', bookDataList)
          },
        });
      },
    });
   
  } else {
    var index = bookDataList.findIndex((v) => {
      return v.id == eId
    })
    bookDataList.splice(index,1)
    Toast({
      type: 'loading',
      message: '加载中',
      duration:400,
      context:this,
      onClose: () => {
        this.setData({
          bookIsNotCollect:false
         })
        Toast({
          type: 'success',
          message: '已取消收藏',
          context:this,
          onClose: () => {  
          },
        });
      },
    });
  }
  this.setData({
    isNotCollect:!this.data.isNotCollect,
    arr:bookDataList
  })
  wx.setStorageSync('bookDataObj', this.data.arr)
},

getBookCatalogurId() {
  let that = this
   wx.request({
     url: 'https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=' + this.data.id,
     success(res) {
       that.setData({
        chaptersId:res.data.data.catalog[0]?.uuid
       })
     }
   })

},

// 时间格式转换
 getDateData() {
   let time = new Date()
   let year = time.getFullYear()
   let mon  = time.getMonth() + 1
   let day  = time.getDate()
   let hour = time.getHours()
   let min  = time.getMinutes()
   let sec  = time.getSeconds()

   mon = mon >=  10 ? mon : "0" + mon
   day = day >=  10 ? day : "0" + day
   hour = hour >=  10 ? hour : "0" + hour
   min = min >=  10 ? min : "0" + min
   sec = sec >=  10 ? sec : "0" + sec
   return year + "-" + mon + "-" + day  + " " + hour + ":" + min + ":" + sec 
 },

 routerCatalogue(e){
   let id =  e.currentTarget.dataset.uid
   wx.navigateTo({
     url: '../../components/bookcatalogue/bookcatalogue?id=' + id,
   })
 },
 routerChaptersContent(e){
   let id =  e.currentTarget.dataset.mid
   wx.navigateTo({
     url: `../../components/chapterscontent/chapterscontent?id=${id}&uuid=${this.data.chaptersId}&title=${this.data.bookDetails.title}`,
   })
 }

})
