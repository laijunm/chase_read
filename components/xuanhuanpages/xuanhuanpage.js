const app = getApp()
const xuanhuan = require("../../data/xuanhuan")
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
        cityList:xuanhuan.default.list
      })
    }
  },

  methods:{
        // 都市数据
      //   geCityListData(){
      //     wx.request({
      //       url: 'https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=1&page=6',
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
