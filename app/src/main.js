import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---注册为全局组件
import TypeNav from '@/views/Home/TypeNav'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)


// 引入路由
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  // 注册路由：底下的写法是KV一致省略V （router小写
  router,
  render: h => h(App),
}).$mount('#app')
