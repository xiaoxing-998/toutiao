<template>
  <el-card class="articlesList">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 选项区域 start -->
    <!-- 文章状态 -->
    <el-row class="articlesTool"  type="flex" align="middle">
      <el-col :span="2">
        <span>文章状态:</span>
      </el-col>
      <!-- {{formdata.radio}} -->
      <el-col :span="22">
        <el-radio-group v-model="formdata.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
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
        <el-select v-model="formdata.channels_id" placeholder="请选择" style=" width: 350px">
          <el-option
           v-for="item in channels"
           :key="item.id"
           :label="item.name"
           :value="item.id">
           </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 时间选择 -->
    <el-row class="articlesTool"  type="flex" align="middle">
      <el-col :span="2">
        <span>时间选择:</span>
      </el-col>
      {{formdata.pubdate}}
      <el-col :span="22">
        <el-date-picker
          v-model="formdata.pubdate"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 选项区域 end -->
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
      channels: [] // 文章频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道
  }
}
</script>

<style lang="less" scoped>
.articlesList {
  .articlesTool {
    height: 60px;
    padding-left: 50px;
  }
  .el-col-22 {
      margin-left: 20px!important;
  }
}
</style>
