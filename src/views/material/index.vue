<template>
    <el-card>
       <bread-crumb slot="header">
       <template slot="title">素材管理</template>
       </bread-crumb>
       <el-tabs v-model="activeName" @tab-click="changeTab">
             <el-tab-pane label="全部素材" name="all">
                <div class="img-list">
                    <el-card class="all-img" v-for="item in allData" :key='item.id'>
                        <img :src="item.url" alt="all-poto">
                        <el-row type="flex" align="middle" justify="space-around" class="icon-font">
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
             </el-tab-pane>
             <el-tab-pane label="收藏素材" name="collect">
                  <div class="img-list">
                    <el-card class="all-img" v-for="item in allData" :key='item.id'>
                        <img :src="item.url" alt="all-poto">
                    </el-card>
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
      allData: []// 接收全部数据
    }
  },
  methods: {
    // tab切换事件
    changeTab () {
    //   alert(this.activeName)
    // 一旦切换则再次发请求查询
      this.getAllMaterial()
    },
    //   获取全部素材
    getAllMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect' // true则查收藏
        }
      }).then((res) => {
        this.allData = res.data.results
      })
    }
  },
  created () {
    this.getAllMaterial()// 获取所有素材
  }
}
</script>

<style lang="less" scoped>
    .img-list {
        display: flex;
        flex-wrap: wrap;
        .all-img {
            width: 200px;
            height: 200px;
            margin: 20px 50px;
            position: relative;
            img {
                width: 100%;
                height: 100px;
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
            }
        }
    }
</style>
