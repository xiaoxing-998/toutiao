<template>
  <div class="img-cover">
    <div @click="openDialog" class="img-item" v-for="(item,index) in imageList" :key="index">
      <div class="title">点击选择图片</div>
      <!-- {{item}} -->
      <img :src="item?item:defaultbg" alt="defaultbg" />
    </div>
    <el-dialog :visible="status" @close="closeDialog">
      <select-img>123</select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['imageList'],
  data () {
    return {
      defaultbg: require('../../assets/img/pic_bg.png'),
      status: false
    }
  },
  methods: {
    openDialog () {
      this.status = true
    },
    closeDialog () {
      this.status = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-cover {
  display: flex;
  margin: 0 0 20px 80px;
  .img-item {
    width: 242px;
    height: 220px;
    border: 1px solid #ccc;
    position: relative;
    .title {
      position: absolute;
      top: 10px;
      left: 69px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
