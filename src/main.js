import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入ui框架
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
Vue.config.productionTip = false

Vue.use(ElementUI)// 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
