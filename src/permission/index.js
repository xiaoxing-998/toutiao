import router from '../router'// 引入路由实例
// vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航
// 注册一个全局前置守卫
router.beforeEach(function (to, from, next) {
  let usertoken = window.localStorage.getItem('user-token')
  if (to.path.startsWith('/home')) {
    // 判断令牌
    if (usertoken) {
      next()// 放行
    } else {
      next('/login')// 无令牌去登录
    }
  } else {
    //   否则  不是home开头 则是登录页面 直接放行
    next()
  }
})
