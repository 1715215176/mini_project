import { request } from "../../request/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "综合价格",
      isActive: false
    }],
    goodsList: []
  },
  // 接口需要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid|| "";
    this.QueryParams.query= options.query|| "";
    this.getGoodsList();
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 标题点击事件 从子组件传递过来的
  tabsItemChange(e) {
    // 获取被点击的标题的索引
    const { index } = e.detail;
    // 修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);

    this.setData({
      // 赋值到原数组
      tabs
    })
  },
  // 滚动条触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据了~',
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList();
  }
})
