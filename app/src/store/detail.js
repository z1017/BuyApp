import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
const state = {
    goodInfo: {}
}
const mutations = {
    GETDOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuid) {
        // eslint-disable-next-line no-undef
        let result = await reqGoodsInfo(skuid);
        if (result.code == 200) {
            commit("GETDOODINFO", result.data);
        }
    },
    // 将产品添加到购物车中
    // eslint-disable-next-line no-unused-vars
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的解构
        // 加入购物车以后(发请求) ，前台将参数带给服务器
        // 服务器写入数据成功， 并没有返回其他的数据，只是返回 code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，因此不需要三连环存储数据
        // 注意：async函数执行返回的结果一定是一个promise【要么成功要么失败】
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 代表服务器加入购物车成功
        if(result.code == 200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
// 简化数据而生
const getters = {
    // 路径导航简化的信息
    categoryView(state) {
        // 报错：能显示但是报错 category1Name没定义
        // 原因：最开始数据没回来的时候 dom渲染找不到就会报错
        // 解决： 在 getters里 return的时候加上 || {}，
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}