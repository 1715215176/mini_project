// 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/* 
* 获取用户的收货地址
*/
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/***
 * 
 * 
 * 调起客户端小程序设置界面，返回用户设置的操作结果
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
// 是否删掉购物车里的商品
export const showModal = () => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '确定删除此商品',
      success(res) {
        resolve(res)
       },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// 结算按钮的功能
export const showToast = ({title}) => {
  return new Promise((resolve,reject) =>{
    wx.showToast({
      title: title,
      icon: 'error',
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}