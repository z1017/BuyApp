// 对于axios 进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start:进度条开始  done:进度条结束
import store from '@/store'
// 在当前模块中引入store


// 引入进度条样式
import 'nprogress/nprogress.css'


// 1. 利用 axios 对象的方法create，去创建一个 axios 实例
// 2. request 就是 axios, 只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径当中会出现api
    baseURL: "/api",
    // 代表请求请求超时的时间 5s
    timeout: 5000,
})

// 请求拦截器：在发请求之前。请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config: 配置对象，对象里面有一个属性很重要：headers请求头
    // config内主要是对请求头 Header 配置 ， 比如添加 token

    if(store.state.detail.uuid_token){
        // 请求头添加一个字段（userTemId）
        config.headers.userTempId = store.state.detail.uuid_token;
    }

    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    nprogress.start();
    return config
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后，相应拦截器可以检测到，可以做一些事情

    // 进度条结束
    nprogress.done()
    return res.data

    // eslint-disable-next-line no-unused-vars
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('fail'));
})

// 对外暴露
export default requests;