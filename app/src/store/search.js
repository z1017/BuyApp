import { reqGetSearchInfo } from "@/api";
// search 模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search 模块数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 计算属性，在项目中，为了简化数据而生
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便啊】
const getters = {
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state) {
        // state.searchList.goodsList，如果服务器数据回来了，是一个数组
        // 假如网络不给力 / 没有网络state.searchList.goodsList应该返回的是undefined
        // 计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}