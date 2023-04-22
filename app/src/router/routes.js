// 引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search';
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'

// 路由配置信息
export default [
    {
        name:'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    // 重定向：在项目跑起来的时候，访问'/'，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]