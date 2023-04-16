import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api'
// home 模块的小仓库
const state = {
    // state中数据默认初始值不能乱写；服务器返回对象，初始值就是对象；返回数组，初始值就是数组，
    // 根据接口返回值初始化
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    floorList: []
};
const mutations = {
    CATEGORTLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
        console.log(state.bannerList);
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        console.log('获取服务器数据');
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORTLIST", result.data);
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },

    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            // 提交mutation
            commit('GETFLOORLIST', result.data);
        }
    },
}
// 计算属性
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}