import { request } from "../../request/request.js"
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //页面开始加载的时候
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //       console.log(result);
    //     this.setData({
    //       swiperList : result.data.message
    //     })
    //   }
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(
      result => {
        this.setData({
          swiperList: result
        })
      }
    )
  },
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(
      result => {
        this.setData({
          cateList: result
        })
      }
    )
  },
  getFloorList() {
    request({
      url: "/home/floorData"
    }).then(
      result => {
        console.log(result);
        this.setData({
          floorList: result
        })
      }
    )
  }
});
