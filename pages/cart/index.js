// pages/cart/index.js
// 获取用户的收货地址 chooseAddress
// 获取用户对收货地址的权限 scope authSetting scope.address
// 假设用户点及了取消 此时的scope 变成了false、
// 假设用户没有点击获取地址 scope 是undefined
// 5.总价钱和总数量
// 6全选和反选
// 7 商品数量的编辑
import { showToast } from "../../utils/asyncWx.js"
Page({
  data: {
    address: {},
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    /* 获取收货地址的缓存 */
    const address = wx.getStorageSync("address") || [];
    // 获取详情页面的数据到购物车
    const cart = wx.getStorageSync('cart');
    // 全选 every 所以的值都是true的时候才返回 true  空数组的时候也会返回true
    this.setData({ address })
    this.setCart(cart);

  },
  // 子組件传递归来的对象
  itemChange(e) {
    // 更新缓存中的东西哦
    const { cart } = e.detail;
    this.setCart(cart);
    wx.setStorageSync('cart', cart)
  },
  // 更新cart
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 判断cart是否是空数组
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  },
  // 全选按钮
  allChange() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
    wx.setStorageSync('cart', cart);
    this.setData({
      cart
    })
  },
  /* 
  *商品数量的加减
  */
  numChange(e) {
    const { cart } = e.detail;
    // 更新缓存中的东西哦
    this.setCart(cart);
    wx.setStorageSync('cart', cart)
  },
  /**
   * 
   * 商品结算功能
   * 
   */
  async handlePay() {
    const {address , totalNum} = this.data;
    /* 
    * 判断是否填写了收货地址
    */
    if(!address.userName){
      await showToast({title:"请填写收货地址"});
      return;
    }
    /**
     * 
     * 判断 购买数量是否存在
     */
    if(totalNum === 0){
      await showToast({title: "您还没有选购"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }

})