import { request } from "../../request/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js";
// import { debounce } from "../../utils/debounce.js"
Page({
  data() {
    goods:{}
    isShow: false
  },
  timer: -1,
  headleInputChange(e){
    const { value } = e.detail;
    if(!value.trim()){
      this.setData({
        isShow: false,
        goods:{},
        inputValue:""
      })
      return;
    }
    this.setData({
      isShow: true
    })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.qserach(value);
    }, 1000);
  },
  async qserach(query){
    const res = await request({url: "/goods/qsearch" , data:{query}});
    this.setData({
      goods: res
    })
  },
  // 清除输入框的值
  cancel(){
    this.setData({
      goods:[],
      isShow:false,
      inputValue:""
    })
  }
})