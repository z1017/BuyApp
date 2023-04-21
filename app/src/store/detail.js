import { reqGoodsInfo } from "@/api"
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
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}