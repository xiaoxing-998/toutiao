import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

import Default from '../views/home/default'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'// 默认访问登录页
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Default// 默认二级路由 显示的组件
    }, {
      path: 'comment', // 评论列表
      component: () => import('../views/comment')// 按需加载
    },
    {
      path: 'articles', // 内容列表
      component: () => import('../views/articles')
    }
    ]
  },
  {
    // 登录页
    path: '/login',
    component: Login
  }
  // {
  // path: '/about',
  // name: 'about',
  // // route level code-splitting
  // // this generates a separate chunk (about.[hash].js) for this route
  // // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
