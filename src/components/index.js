import navAside from './home/layout-aside.vue'
import topTitle from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('navAside', navAside)
    Vue.component('topTitle', topTitle)
    Vue.component('bread-crumb', breadCrumb)// 面包屑组件
  }
}
