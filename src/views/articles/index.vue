<template>
  <el-card>
    <el-card class="articlesTop">
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <!-- 选项区域 start -->
      <!-- 文章状态 -->
      <el-row class="articlesTool" type="flex" align="middle">
        <el-col :span="2">
          <span>文章状态:</span>
        </el-col>
        <!-- {{formdata.radio}} -->
        <el-col :span="22">
          <el-radio-group @change="changeCondition" v-model="formdata.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">已发表</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 频道列表 -->
      <el-row class="articlesTool" type="flex" align="middle">
        <el-col :span="2">
          <span>频道列表:</span>
        </el-col>
        <!-- {{formdata.channels_id}} -->
        <el-col :span="22">
          <el-select
            @change="changeCondition"
            v-model="formdata.channels_id"
            placeholder="请选择"
            style=" width: 350px"
          >
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 时间选择 -->
      <el-row class="articlesTool" type="flex" align="middle">
        <el-col :span="2">
          <span>时间选择:</span>
        </el-col>
        <!-- {{formdata.pubdate}} -->
        <el-col :span="22">
          <el-date-picker
            @change="changeCondition"
            v-model="formdata.pubdate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <!-- 选项区域 end -->
    </el-card>
    <!-- 间距 -->
    <el-row>
      <el-col :span="24">
        <div style="height: 14px; background-color: rgba(26, 24, 24, 0.03);"></div>
      </el-col>
    </el-row>
    <!-- 页面主体结构  start-->
    <el-card class="articlesList">
      <!-- 主体标题 -->
      <el-row class="count">
        <span>共找到{{page.count}}条符合条件的内容</span>
      </el-row>
      <!-- 循环的数据模板 -->
      <el-row
        type="flex"
        v-for="item in list"
        :key="item.id.toString()"
        justify="space-between"
        class="articles-item"
      >
        <!-- {{item.cover.images.length}} -->
        <!-- 左侧内容 -->
        <el-col :span="14">
          <el-row type="flex">
            <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="avatar" />
            <div class="info">
              <span class="title">{{item.title}}</span>
              <el-tag :type="item.status|filterType" class="tag">{{item.status|filterStatus}}</el-tag>
              <span class="time">{{item.pubdate}}</span>
            </div>
          </el-row>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :span="6">
          <el-row type="flex" justify="end" class="operation">
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span>
              <i class="el-icon-delete"></i>删除
            </span>
          </el-row>
        </el-col>
      </el-row>
      <!-- 页面主体结构  end-->
      <el-row type="flex" justify="center" align="middle" style="height:80px">
        <!-- 分页插件 start -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.count"
          :current-page="page.currentPage"
          :page-size="page.per_page"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        status: 5, // 文章状态默认显示全部
        channels_id: null, // 频道列表框默认没有选择值
        pubdate: [] // 文章起始时间、截止时间
      },
      page: {
        currentPage: 1, // 当前页码 默认第一页
        per_page: 12, // 每页页数 显示条目个数
        count: 0 // 文章总数
      },
      channels: [], // 文章频道数据
      list: [], // 接受文章列表数据
      defaultImg: require('../../assets/img/小埋.png')
    }
  },
  filters: {
    //   显示标签状态内容
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 显示标签类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 改变分页事件
    changePage (page) {
      // 当前点击页码 赋值当前最新页
      this.page.currentPage = page
      this.getConditionArticles()
    },
    // 改变条件
    changeCondition () {
      //   alert(1)
      this.page.currentPage = 1 // 当改变条件时 强制将当前页码返回到第一页
      this.getConditionArticles()
    },
    // 封装请求列表数据&分页数据的方法   改变页码 改变条件
    getConditionArticles () {
      let params = {
        page: this.page.currentPage, // 请求的页数
        per_page: this.page.per_page, // 请求每页条目数
        status: this.formdata.status === 5 ? null : this.formdata.status, // 为5显示不传 则查全部
        channel_id: this.formdata.channels_id, // 下拉框显示值
        begin_pubdate:
          this.formdata.pubdate.length > 0 ? this.formdata.pubdate[0] : null,
        end_pubdate:
          this.formdata.pubdate.length > 1 ? this.formdata.pubdate[1] : null
      }
      this.getArticles(params)
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表/分页数据 条件切换
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results // 接受文章列表数据
        this.page.count = res.data.total_count
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道
    this.getArticles() // 调用获取文章列表
  }
}
</script>

<style lang="less" scoped>
.articlesTop {
  .articlesTool {
    height: 60px;
    padding-left: 50px;
  }
  .el-col-22 {
    margin-left: 20px !important;
  }
}
.articlesList {
  .count {
    border-bottom: 1px dashed #ccc;
    margin: 0 5px;
    padding: 0 10px;
    font-size: 14px;
    height: 35px;
    color: #323745;
  }
  .articles-item {
    margin: 0 5px;
    padding: 15px 10px;
    overflow: hidden;
    border-bottom: 1px solid #f2f3f5;
    img {
      width: 150px;
      height: 120px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .info {
      display: flex;
      flex-direction: column;
      //   justify-content: space-between;
      height: 120px;
      .title {
        font-size: 14px;
      }
      .tag {
        margin: 15px 0;
        width: 58px;
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .operation {
      span {
        margin-left: 20px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
