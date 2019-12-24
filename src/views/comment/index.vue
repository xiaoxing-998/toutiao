<template>
  <el-card  v-loading="loading">
    <!-- 面包屑组件传给card的具名插槽 -->
    <bread-crumb slot="header">
      <!-- 传入插槽内容 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="tableData">
      <el-table-column prop="title" width="550" label="标题"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="formatBool"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
    <el-pagination background layout="prev, pager, next"
    :page-size="pageData.pageSize"
    :total="pageData.total"
    :current-page="pageData.currentPage"
    @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      // 分页数据对象
      pageData: {
        total: 0, // 数据总条数
        pageSize: 10, // 默认每页条数
        currentPage: 1 // 当前默认页数
      },
      loading: false // 数据加载前的动画 默认关闭
    }
  },
  methods: {
    // 请求列表数据
    getComment () {
      this.loading = true // 加载数据前打开
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.pageData.currentPage, per_page: this.pageData.pageSize }
      }).then(res => {
        this.tableData = res.data.results // 获取评论列表数据
        this.pageData.total = res.data.total_count // 文章总页数
        this.loading = false // 加载数据后关闭
      })
    },
    // 将函数作为一个对象的写法  转化评论状态
    formatBool: function (row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      // let mess = row.comment_status ? '关闭' : '打开'
      let mess = ''
      console.log(row.comment_status)
      if (row.comment_status) {
        mess = '关闭评论将清除所有评论，读者也不能再进行评论，是否进行此操作?'
      } else {
        mess = '此操作将开启评论，是否进行此操作?'
      }
      this.$confirm(`${mess}`, '提示', { type: 'warning' }).then(() => {
        // 当他是关闭的时候状态为true 按下确定按钮进入then ，那么请求接口传入参数的时候要为false 不允许评论
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString() // 转为字符串 正确的id 不失真
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(res => {
          // 打开或关闭评论成功返回提示
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 再次调用渲染
        })
      })
    },
    changePage (newPage) {
      // 当前点击页
      this.pageData.currentPage = newPage
      // 再次调用
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
