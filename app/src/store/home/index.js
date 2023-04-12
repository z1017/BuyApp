import { reqCategoryList } from '@/api'
// home 模块的小仓库
const state = {
    // state中数据默认初始值不能乱写；服务器返回对象，初始值就是对象；返回数组，初始值就是数组，
    // 根据接口返回值初始化
    categoryList: [],
};
const mutations = {
    CATEGORTLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORTLIST", result.data);
        }
    }
}
const getters = {}

export default {
    
    state,
    mutations,
    actions,
    getters
}