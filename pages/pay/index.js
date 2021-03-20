Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    /* 获取收货地址的缓存 */
    const address = wx.getStorageSync("address") || [];
    // 获取详情页面的数据到购物车
    let cart = wx.getStorageSync('cart');
    // 全选 every 所以的值都是true的时候才返回 true  空数组的时候也会返回true
   /**
    * 在支付的界面只有选中的账号    
    * 在购物车中可能有没有选中的商品 
    * 此时就需要过滤一下商品在商品支付见面
    * 
    */
    cart = cart.filter( v => v.checked);
    this.setCart(cart);
    this.setData({ address });

  },
  setCart(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
})