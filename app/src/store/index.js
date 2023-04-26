// 引入Vue
import Vue from "vue";
// 引入Vuex相当于最大的仓库
import Vuex from 'vuex'

Vue.use(Vuex) // 应用 Vuex插件

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from "./shopcart";
import user from "./user";
import trade from './trade'

// 创建并对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现 Vuex 仓库 模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})