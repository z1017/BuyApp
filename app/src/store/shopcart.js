import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车某一个产品
    // eslint-disable-next-line no-unused-vars
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 修改购物车某一个产品的选中状态
    // eslint-disable-next-line no-unused-vars
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库，commit【提交mutations修改state】getter【计算属性】dispatch【派发action】state【当前仓库数据】
        // 获取购物车中全部的商品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            // 将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        });

        return Promise.all(PromiseAll)

    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        // 数组
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise)
        });
        // 最终返回的结果
        return Promise.all(promiseAll)
    }

}
const getters = {
    cartList() {
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}