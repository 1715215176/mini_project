// pages/cart/index.js
// 获取用户的收货地址 chooseAddress
// 获取用户对收货地址的权限 scope authSetting scope.address
// 假设用户点及了取消 此时的scope 变成了false、
// 假设用户没有点击获取地址 scope 是undefined
Page({
  data: {
    address: {},
    cart: []
  },
  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync('cart')
    this.setData({
      address,
      cart
    })
  }
})