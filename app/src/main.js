import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---注册为全局组件,任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'

// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

// 引入MockServe.js-----mock数据
import '@/mock/mockServe'
// 引入swiper样式 ; swiper6 引入swiper/swiper-bundle.min.css
import 'swiper/css/swiper.css'

// eslint-disable-next-line no-unused-vars
import { reqGetSearchInfo } from './api'

// 引入路由
import router from '@/router'
// 引入仓库
import store from './store'


Vue.config.productionTip = false

new Vue({
  // 注册路由：底下的写法是KV一致省略V （router小写
  // 组件身上都拥有 $router,$route属性
  router,
  render: h => h(App),
  // 全局事件总线$bus设置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册store,此时组件中都会拥有$store
  store
}).$mount('#app')
