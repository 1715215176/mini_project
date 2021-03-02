import { request } from "../../request/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  goodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id);
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.goodsInfo = goodsObj;
    this.setData({
      // goodsObj 直接赋值的话 有太多的属性用不着
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 部分iPhone手机不支持webp格式的照片 需要转化一下格式
        // 一般情况下需要联系后台人员 不建议自己修改
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  // 点击轮播图 出现放大的效果
  handlePrevewImage(e){
    const current = e.currentTarget.dataset.url
    const urls = this.goodsInfo.pics.map(v =>v.pics_mid)
    wx.previewImage({
      urls,
      current
    })
  }
})