<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单主体内容 -->
    <el-form
      ref="publishForm"
      style="margin-left:60px"
      label-width="80px"
      :model="formData"
      :rules="publishRules"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:30%" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="10" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- {{formData.cover.type}} -->
      <el-form-item label="封面" prop="type">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- {{channels}} -->
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkoutForm()">发表</el-button>
        <el-button @click="checkoutForm(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 存储图片地址
        },
        channel_id: null // 默认无频道id
      },
      // 定义规则对象 校验字段有prop设置 由于radio无论如何都有一个默认值所有必填不用写
      publishRules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度需在5-30之间' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  methods: {
    // 获取频道
    async getChannelsData () {
      let res = await this.$axios({
        url: '/channels'
      })
      this.channels = res.data.channels
    },
    // 文章表单整体校验&发布文章 draft为true是草稿
    checkoutForm (draft) {
      this.$refs.publishForm.validate(success => {
        if (success) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft },
            data: this.formData
          }).then(res => {
            // 发布成功 跳转到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannelsData() // 获取下拉频道数据
  }
}
</script>

<style lang="less" scoped>
</style>
