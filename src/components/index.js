import navAside from './home/layout-aside.vue'
import topTitle from './home/layout-header.vue'

export default {
  install (Vue) {
    Vue.component('navAside', navAside)
    Vue.component('topTitle', topTitle)
  }
}
