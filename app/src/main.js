import Vue from 'vue'
import App from './App.vue'





// 三级联动组件---注册为全局组件,任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'
import {
  Button, MessageBox, Form, FormItem, Input,
  InputNumber,
} from 'element-ui'
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);

// 全局组件： 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

// 注册全局组件
Vue.component(Button.name, Button)
// ElementUI注册组件的时候，还有一种写法：挂在原型上（先引入
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入MockServe.js-----mock数据
import '@/mock/mockServe'
// 引入swiper样式 ; swiper6 引入swiper/swiper-bundle.min.css
import 'swiper/css/swiper.css'

// 引入图片
import kangna from '@/assets/nn.jpg'


// 引入VueLazyload插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: kangna,
})

// 引入路由
import router from '@/router'
// 引入仓库
import store from './store'

// 统一接口api文件夹里面全部的请求函数
// 统一引入
import * as API from './api'

new Vue({
  // 注册路由：底下的写法是KV一致省略V （router小写
  // 组件身上都拥有 $router,$route属性
  router,
  render: h => h(App),
  // 全局事件总线$bus设置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册store,此时每一个组件都会拥有$store这个属性
  store

}).$mount('#app')
