<template>
  <div class="img-cover">
    <div @click="openDialog(index)" class="img-item" v-for="(item,index) in imageList" :key="index">
      <div class="title">点击选择图片</div>
      <!-- {{item}} -->
      <img :src="item?item:defaultbg" alt="defaultbg" />
    </div>
    <el-dialog :visible="status" @close="closeDialog">
      <select-img @selectImgUrl="receiveImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['imageList'],
  data () {
    return {
      defaultbg: require('../../assets/img/pic_bg.png'),
      status: false,
      selectIndex: -1 // 用户点击图片时的下标 (三图为0,1,2  单图为0  默认无图)
    }
  },
  methods: {
    // 接收儿子传来的图片
    receiveImg (img) {
      // alert('收到了' + img)
      this.$emit('selectImg', img, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) {
      // alert(index)
      this.selectIndex = index // 当前点击的下标
      this.status = true // 打开弹层
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
