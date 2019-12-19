<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside width="200px" class="navaside">
      <navAside></navAside>
    </el-aside>
    <!-- 中间内容容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>头部</el-header>
      <!-- 二级视图 -->
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import navAside from '../../components/home/layout-aside'
export default {
  // 局部注册组件
  components: {
    navAside
  }
}
</script>

<style  lang="less" scoped>
.navaside {
  background-color: #353b4e;
  height: 100vh;
  overflow: hidden;

}
</style>
