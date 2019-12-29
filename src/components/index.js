import navAside from './home/layout-aside.vue'
import topTitle from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import imgCover from './publish/img-cover.vue'
import selectImg from './publish/select-img.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('navAside', navAside)
    Vue.component('topTitle', topTitle)
    Vue.component('bread-crumb', breadCrumb)// 面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('img-cover', imgCover) // 图片封面组件
    Vue.component('select-img', selectImg) // 选择素材组件
  }
}
