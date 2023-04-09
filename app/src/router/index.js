// 配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search';
// 先把 VueRouter 原型对象的 push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push/replace
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调

// call,apply区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递函数：call 传递函数用逗号隔开；apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            name: 'search',
            path: '/search/:keyWord?',
            component: Search,
            meta: { show: true }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        // 重定向：在项目跑起来的时候，访问'/'，立马让他定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})