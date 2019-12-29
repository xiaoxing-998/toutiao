<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="material-list">
        <el-card class="material-item" v-for="item in list" :key="item.id">
          <img :src="item.url" @click="clickImgUrl(item.url)" alt="material-item" />
        </el-card>
      </div>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" style="margin-top:14px;">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :current-page='page.currentPage'
        :page-size="page.pageSize"
        @current-change="changePage"></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传的图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中素材库
      list: [], // 接受接口传来的图片数据
      page: {
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示条目个数
        total: 0 // 总条目数
      }
    }
  },
  methods: {
    // 接收当前点击图片地址
    clickImgUrl (url) {
      // alert(url)
      this.$emit('selectImgUrl', url)
    },
    //   获取分页数据
    changePage (page) {
      this.page.currentPage = page
      this.getAllImg()
    },
    // 获取所有图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg() // 获取素材库全部图片
  }
}
</script>

<style lang="less" scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .material-item {
    width: 120px;
    height: 120px;
    margin: 6px 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
