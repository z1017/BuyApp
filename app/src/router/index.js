import Vue from "vue";
import VueRouter from 'vue-router'
import routes from './routes'
// 引入store
import store from '@/store'

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
let router = new VueRouter({
    // 配置路由
    // KV一致省略V
    routes,
    // 滚动行为
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        // 返回的y=0；代表的是滚动条在最上方
        return { y: 0 }
        // return 期望滚动到哪个的位置
    },
})

// 全局前置守卫：在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
    // to:可以获取到: 要跳转到哪个路由的信息
    // from：可以获取到: 从哪个路由而来
    // next：放行函数；next() 放行；next('/') 放行到指定路由      next(false)中断当前的导航
    // next()
    // 用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已经登陆了
    if (token) {
        // 用户已经登录了还想去login【不能去，使其停留在首页】
        if (to.path == '/login') {
            next('/home')
        } else {
            //登陆了，但是去的不是login 
            // 如果用户名已有
            if (name) {
                next()
            } else {
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了，重新登录
                    await store.dispatch('userLogout')
                    next('/')
                }
            }
        }
    } else {
        // 未登录暂时没有处理完毕，后期再处理
        next()
    }


})

export default router