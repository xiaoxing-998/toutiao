<template>
  <div class="img-cover">
    <div class="img-item" v-for="(item,index) in imageList" :key="index">
      <div class="title">点击选择图片</div>
      <img src="../../assets/img/pic_bg.png" alt="defaultbg" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['imageList']
}
</script>

<style lang="less" scoped>
.img-cover {
  display: flex;
  margin:0 0 20px 80px;
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
