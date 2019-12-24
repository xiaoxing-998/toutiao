<template>
  <el-card  v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end" align="middle">
      <el-upload action :show-file-list="false" :http-request="uploadImg">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <div class="all-img" v-for="item in allData" :key="item.id">
            <img :src="item.url" alt="all-poto" />
            <el-row type="flex" align="middle" justify="space-around" class="icon-font">
              <i @click="changeColor(item.id,item.is_collected)" class="el-icon-star-on" v-bind:style="{color:item.is_collected?'red':''}"></i>
              <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </div>
        </div>
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination background layout="prev, pager, next"
          :total="page.total_count"
          :page-size="page.per_page"
          :current-page="page.page"
          @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <div class="all-img" v-for="item in allData" :key="item.id">
            <img :src="item.url" alt="all-poto" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认选中全部
      activeName: 'all', // 点击切换时将被改变为当前切换的name
      allData: [], // 接收全部数据
      loading: false, // 默认加载进度条动画关闭
      page: {
        total_count: 0, // 图片总数
        page: 1, // 当前页数
        per_page: 10 // 每页数量
      }

    }
  },
  methods: {
    // 删除图片素材

    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: `user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllMaterial()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 改变收藏的颜色
    // 图片id 以及图片目前是否被收藏 已被收藏为true
    changeColor (id, collectStatus) {
      this.$axios({
        url: `user/images/${id}`,
        method: 'put',
        data: {
          collect: !collectStatus // 收藏改为取消
        }

      }).then((res) => {
        this.getAllMaterial()
      })
    },
    // 上传文件
    uploadImg (params) {
      this.loading = true // 请求接口时打开进度条
      // console.log(params) 对象  需用到里面的file对象
      let formData = new FormData()
      formData.append('image', params.file) // 接口参数名 +上传的文件  添加文件到formdata

      this.$axios({
        url: 'user/images',
        method: 'post',
        data: formData // 接口要求formdata数据
      }).then((res) => {
        this.loading = false // 数据返回成功时关闭进度条
        // 重新刷新
        this.getAllMaterial()
      })
    },
    // 分页切换事件
    changePage (currentPage) {
      this.page.page = currentPage // 最新页码
      this.getAllMaterial()
    },
    // tab切换事件
    changeTab () {
      //   alert(this.activeName)
      // 一旦切换则再次发请求查询
      this.page.page = 1 // 选项变了需要重置为1  比如现在all点击了3 那么不重置会去找3的参数 但是收藏的页数没有3呢 找不到对应的页码？
      this.getAllMaterial()
    },
    //   获取全部素材
    getAllMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect', // true则查收藏
          page: this.page.page, // 当前页数
          per_page: this.page.per_page /// / 每页数量

        }
      }).then(res => {
        this.allData = res.data.results
        this.page.total_count = res.data.total_count
      })
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .all-img {
    width: 150px;
    height: 150px;
    margin: 20px 50px;
    position: relative;
    padding: 0px !important;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .icon-font {
      // text-align: center;
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
