import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入ui框架
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
import './styles/index.less'
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共全局请求前缀
Vue.prototype.$axios = axios // 赋值给全局属性  所有的vue实例都可使用
Vue.config.productionTip = false

Vue.use(ElementUI)// 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
