// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
 data: {
    tabs: [{
      id: 0,
      value: "商品收藏",
      isActive: true
    },
    {
      id: 1,
      value: "品牌收藏",
      isActive: false
    },
    {
      id: 2,
      value: "店铺收藏",
      isActive: false
    },{
      id: 3,
      value: "浏览器足迹",
      isActive: false
    }],
    goodsList: []
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const collect = wx.getStorageSync('collect')||[];
    this.setData({
      goodsList:collect
    })
  },
})