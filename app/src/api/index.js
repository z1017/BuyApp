// 当前模块：对 API接口进行统一管理
import requests from "@/api/request";

// 三级联动的接口 
// 请求地址：api/product/getBaseCategoryList  （ get 请求）无参数

export const reqCategoryList = () => {
    // 发请求: axios 发请求返回的结果是 promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })

}