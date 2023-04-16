// 当前模块：对 API接口进行统一管理
import requests from "@/api/request";


import mockRequests from "./mockAjax";
// 三级联动的接口 
// 请求地址：api/product/getBaseCategoryList  （ get 请求）无参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起get请求、获取三级菜单数据。当前这个函数只需要把服务器返回结果返回即可

// axios有两种调用方式：（1）axios.get('url')  （2） axios({})   
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`);

// 第二种
/* export const reqCategoryList = () => {
    // 发请求: axios 发请求返回的结果是 promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
} */
// 获取banner （Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list  请求方式：post  参数：需要带参数
/* 
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": [
        "1:1700-2799:价格",
        "2:6.65-6.74英寸:屏幕尺寸"
    ],
    "trademark": "4:小米"
}
*/

// 当前这个接口，给服务器传递参数params，至少是一个空对象
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url: '/list',method: 'post', data: params})