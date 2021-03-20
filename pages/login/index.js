// pages/login/index.js
Page({
  
  GetUserInfo(e){
    // 将个人信息保存在缓存当中
    const {userInfo} = e.detail;
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})