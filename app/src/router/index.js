import Vue from "vue";
import VueRouter from 'vue-router'
import routes from './routes'

// 使用插件
Vue.use(VueRouter)

// 重写 VueRouter.prototype原型对象身上的 push/replace 方法
// 先把 VueRouter 原型对象的 push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 VueRouter.prototype身上的 push 方法
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）; 第二个参数：成功回调 ; 第三个参数：失败回调

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
    // KV一致省略V
    routes,
    // 滚动行为
    // eslint-disable-next-line no-unused-vars
    scrollBehavior (to, from, savedPosition) {
        // 返回的y=0；代表的是滚动条在最上方
        return {y:0}
        // return 期望滚动到哪个的位置
      }
})