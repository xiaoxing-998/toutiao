import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'// 导航守卫
import ElementUI from 'element-ui' // 引入ui框架
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
import './styles/index.less'
import axios from './utils/request.js'// 引入自定义的axios工具
import Component from './components' // 引入导出的自定义插件对象
Vue.prototype.$axios = axios // 赋值给全局属性  所有的vue实例都可使用
Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册
Vue.use(Component)// 全局注册组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
