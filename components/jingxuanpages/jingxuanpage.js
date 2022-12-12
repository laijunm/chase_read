const app = getApp()
const tuijian = require("../../data/tuijian.js")
const yuepiao = require("../../data/yuepiao.js")
const fenxiang = require("../../data/fenxiang.js")
const xuanyi = require("../../data/xuanyi.js")
const newbooks = require("../../data/newbooks.js")
const dushi = require("../../data/dushi.js")
const wanben = require("../../data/wanben.js")
Page({
  data:{
    isNightModel:false
  },
  onshow(){
    this.setData({
      isNightModel:wx.getStorageSync('isNightModel')
    }) 
     console.log(this.data.isNightModel);
  }

})
Component({
  properties:{
    wanBen:{
      type:Array,
      value:''
    }
  },
  data:{
    monList:[],
    shareList:[],
    newBooksList:[],
    cityList:[],
    suspenseList:[],
    wanBen:[],
    wanBenList:[]
  },
  

  lifetimes:{
    created(){
      // this.getSharListData(),
      // this.getMonListData(),
      // this.getNewBooksListData(),
      // this.getWanBenListData(),
      // this.getRecommendListData(),
      // this.geCityListData(),
      // this.geSuspenseListData(),  
    },
    ready(){
       this.setData({
        wanBen:tuijian.default.list,
        wanBenList:wanben.default.list,
        cityList:dushi.default.list,
        newBooksList:newbooks.default.list,
        shareList:fenxiang.default.list,
        suspenseList:xuanyi.default.list,
        monList:yuepiao.default.list,
      })
    }
  },

  
  methods:{ 
//     // 分享
//     getSharListData(){
//       wx.request({
//         url: 'https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=504&uuid=b5648dd3c4f24d9796f590cd81ca076e&all=0',
//         header:{
//           'Content-Type': 'application/json'
//         },
        
//         success:(r) => {
//          this.setData({
//             shareList:[...r.data.list]
//           })
//         }
//   })
//     },
//     // 月票
//     getMonListData(){
//          wx.request({
//           url: 'https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=34&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0',
//           header:{
//             'Content-Type': 'application/json'
//           },
          
//           success:(res) => {
//             this.setData({
//              monList:[...res.data.list]
//             })
//           }
//     })
//     },
// //  新书数据
//     getNewBooksListData(){
//       wx.request({
//         url: 'https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=26&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0',
//         header:{
//           'Content-Type': 'application/json'
//         },
        
//         success:(res) => {
//           this.setData({
//             newBooksList:[...res.data.list]
//           })
//         }
//   })
//     },
//     // 完本数据
//     getWanBenListData(){
//       wx.request({
//         // url: 'https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=804&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0',
//         header:{
//           'Content-Type': 'application/json'
//         },
        
//         success:(res) => {
//           this.setData({
//             wanBenList:[...res.list]
//             // wanBenList:[...res.data?.list]
//           })
//         }
//   })
//     },
// // 推荐
//     getRecommendListData(){
//       wx.request({
//         // url: 'https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=804&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0',
//         header:{
//           'Content-Type': 'application/json'
//         },
//         success:(res) => {
//           console.log(res);
//           this.setData({
//           wanBen :tuijian
//           // wanBen :[...res.data?.list]
//           })
//         }
//       })
//     },
//         // 都市数据
//     geCityListData(){
//       wx.request({
//         url: 'https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=7&page=5',
//         header:{
//           'Content-Type': 'application/json'
//         },
        
//         success:(res) => {
//           this.setData({
//             cityList:[...res.data.list] 
//           })
//         },
        
//   })
//     },
// //  悬疑数据
//     geSuspenseListData(){
//       wx.request({
//         url: 'https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=5&page=5',
//         header:{
//           'Content-Type': 'application/json'
//         },
        
//         success:(res) => {
//           this.setData({
//             suspenseList:[...res.data.list] 
//           })
//         },
        
//   })
//     },
 clickUseFunction:function(e){
    app.next_calculator(e)
 },
 routerOrderOfBirth(){
   wx.navigateTo({
     url: '../../components/orderofbirth/orderofbirth',
   })
},
 routerStackRoom(){
   wx.navigateTo({
     url: '../../components/stackroom/stackroom',
   })
},
 routeNewBooks(){
   wx.navigateTo({
     url: '../../components/newbooks/newbooks',
   })
},
 routerNoMoney(){
   wx.navigateTo({
     url: '../../components/nomoney/nomoney',
   })
},
 routerWanBen(){
   wx.navigateTo({
     url: '../../components/wanbenspecial/wanbenspecial',
   })
},

}
})