// 引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import Center from '@/views/Center'
// 引入二级路由组件

import GroupOrder from '@/views/Center/groupOrder'


// 路由配置信息
export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: () => import('../views/Center/groupOrder')
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            // 重定向
            // 或：把 myOrder组件的path值设置为空字符串,此时myOrder为默认子路由，一进入center页面，会默认展示myOrder
            {
                path: '/center',
                redirect: '/center/myorder'
            }

        ]
    },
    {
        path: '/paysuccess',
        component: () => import('../views/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid?',
        component: () => import('../views/Detail'),
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