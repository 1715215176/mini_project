// components/cart/address/Address.js
import { getSetting, chooseAddress, openSetting } from '../../../utils/asyncWx.js'
import regeneratorRuntime from "../../../lib/runtime/runtime.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      value: {}
    }
  },
  methods: {
    
async chooseAddress() {
    try {
      // 1. 获取用户权限
      const res1 = await getSetting();
      /* 
      * 判断用户的权限状态
      */
      const scopeAddress = res1.authSetting["scope.address"];
      // 如果是false 则诱导用户打开权限
      if (scopeAddress === false) {
        await openSetting();
      }
      // 无论是否打开权限最终都要执行打开收货地址
      let address = await chooseAddress();
      // 吧当前数据加入到缓存
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  }
  },
})
