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
        <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
      </el-form-item>
      <!-- {{formData.cover}} -->
      <el-form-item label="封面" prop="type"  style="margin-top:120px">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
       <!-- 放置一个封面组件 -->
      <img-cover @selectImg="getCover" :imageList="formData.cover.images"></img-cover>
      <!-- {{channels}} -->
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle()">发表</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
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
  watch: {
    //   监控路由 两个路由共用一个组件跳转时  组件没有被销毁
    $route (to, from) {
      if (Object.keys(to.params).length) {
        //   有参数则是修改 重新获取数据
        this.getArticleById(to.params.articleId)
      } else {
        //   没有参数 则清空--发布页面
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储图片地址
          }
        }
      }
    }
    // 监控type的变化决定images的长度 此方法type变了就会将地址赋空  不正确
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图或者自动模式
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     //   单图模式
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     //   三图模式
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    // 得到儿子传来的下标和孙子的图片地址
    getCover (img, index) {
      // alert(img + index + '哈哈哈')
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     return img
      //   }
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => index === i ? img : item)
    },
    //   切换类型时赋空 未点击切换则是接口赋值的图片地址
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        //   单图模式
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        //   三图模式
        this.formData.cover.images = ['', '', '']
      }
    },
    // 获取频道
    async getChannelsData () {
      let res = await this.$axios({
        url: '/channels'
      })
      this.channels = res.data.channels
    },
    // 文章表单整体校验  draft为true是草稿 否则非草稿
    // 修改&发布
    publishArticle (draft) {
      this.$refs.publishForm.validate(success => {
        if (success) {
          //   如果存在则是修改
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(res => {
            // 发布成功 跳转到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 通过id获取指定文章详情
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`,
        method: 'get'
      }).then(res => {
        this.formData = res.data // 将此id的文章数据赋值 并渲染
      })
    }
  },
  created () {
    this.getChannelsData() // 获取下拉频道数据
    let { articleId } = this.$route.params // 判断是哪个页面
    articleId && this.getArticleById(articleId) // 将id传入获取文章数据方法
  }
}
</script>

<style lang="less" scoped>
</style>
