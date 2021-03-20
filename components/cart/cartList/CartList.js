// components/cart/cartList/CartList.js
import {showModal} from "../../../utils/asyncWx.js"
Component({
  /**
   * 组件的属性列表
   */
  data: {

  },
  properties: {
    cart: {
      type: Array,
      value: []
    }
  },
  methods: {
    headleItemChange(e) {
      const goods_id = e.currentTarget.dataset.id;
      let { cart } = this.data;
      let index = cart.findIndex(v => v.goods_id === goods_id);
      cart[index].checked = !cart[index].checked;
      this.triggerEvent('itemChange', { cart })
      // console.log(cart[0].num);
    },
    async numChange(e) {
      const { id, operation } = e.currentTarget.dataset;
      let { cart } = this.data;
      let index = cart.findIndex(v => v.goods_id === id);
      // 是否商品的删除
      if (cart[index].num === 1 && operation === -1) {
        const res = await showModal();
        if(res.confirm){
          cart.splice(index , 1);
          this.triggerEvent('numChange', { cart });
        }
      }else{
        cart[index].num += operation;
        this.triggerEvent('numChange', { cart });
      }
    }
  },

})
