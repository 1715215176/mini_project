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
  },
  cartAdd(){
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    // 判断商品是否存在于数组的购物车当中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if(index === -1){
      this.goodsInfo.checked = true;
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo);
    }else{
      cart[index].num ++;
    }
    // 重新把购物车添加到缓存当中
    wx.setStorageSync("cart",cart);
    // 弹窗提示
    wx.showToast({
      title: '添加成功',
      icon : 'success',
      // 防止手抖
      mast: true
    })
  }
})