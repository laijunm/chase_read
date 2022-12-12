const app = getApp()
const xuanyi = require("../../data/xuanyi")
Component({
 
  data:{
    cityList:[]
  },

  lifetimes:{
    created(){
// this.geCityListData()
    },
    ready(){
      this.setData({
        cityList:xuanyi.default.list
      })
    }
  },

  methods:{
        // 都市数据
      //   geCityListData(){
      //     wx.request({
      //       url: 'https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=5&page=6',
      //       header:{
      //         'Content-Type': 'application/json'
      //       },
            
      //       success:(res) => {
      //         this.setData({
      //           cityList:[...res.data.list] 
      //         })
      //       },
            
      // })
      //   },
        clickUseFunction:function(e){
          app.next_calculator(e)
       }
}

})
