import { request } from "../../request/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    LeftContent: [],
    RightContent: [],
    currentIdex: 0,
    // 距离顶部的值
    scrollTop: 0
  },
  Cates: null,
  onLoad: function (options) {
    // 获取本地的存储数据
    const Cates = wx.getStorageSync('cates');
    // 判断本地数据是否已经存在 如果不存在就发送数据
    if (!Cates) {
      this.getCates();
    } else {
      // 有旧的时间定义过期时间
      if (Date.now() - Cates.time > 1000 * 300) {
        // 时间过了以后重新发送数据请求
        this.getCates();
      } else {
        // 获取本地数据 进行页面的渲染
        this.Cates = Cates.data;
        let LeftContent = this.Cates.map(v => v.cat_name);
        let RightContent = this.Cates[0].children;
        this.setData({
          LeftContent,
          RightContent
        })
      }
    }
  },
  async getCates() {
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   this.Cates = res.data.message;
    //   // 把接口数据保存到本地存储当中
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    //   let LeftContent = this.Cates.map(v => v.cat_name);
    //   let RightContent = this.Cates[0].children;
    //   this.setData({
    //     LeftContent,
    //     RightContent
    //   })
    // })
    /**
     * 
     * 使用async语法
     */
    const res = await request({ url: "/categories" });
    this.Cates = res;
    // 把接口数据保存到本地存储当中
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    let LeftContent = this.Cates.map(v => v.cat_name);
    let RightContent = this.Cates[0].children;
    this.setData({
      LeftContent,
      RightContent
    })
  },
  itemClick(e) {
    let { index } = e.currentTarget.dataset;
    let RightContent = this.Cates[index].children;
    this.setData({
      currentIdex: index,
      RightContent,
      // 每次点击完都是顶部
      scrollTop: 0
    })
  }
})