import { request } from "../../request/request.js"
Page({
  data: {
    swiperList: [],
    cateList: []
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
  },
  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(
      result => {
        this.setData({
          swiperList: result.data.message
        })
      }
    )
  },
  getCateList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(
      result => {
        console.log(result);
        this.setData({
          cateList: result.data.message
        })
      }
    )
  }
});
