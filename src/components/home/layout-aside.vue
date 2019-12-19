<template>
  <div class="navAside">
    <div class="logo">
      <img src="../../assets/img/logo_admin.png" alt="logo" />
    </div>
    <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#409eff">
      <el-menu-item>首页</el-menu-item>
      <el-submenu index="1">
        <span slot="title">内容管理</span>
        <el-menu-item-group>
          <el-menu-item>发布文章</el-menu-item>
          <el-menu-item>内容列表</el-menu-item>
          <el-menu-item>评论列表</el-menu-item>
          <el-menu-item>素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <span slot="title">粉丝管理</span>
        <el-menu-item-group>
          <el-menu-item>图文数据</el-menu-item>
          <el-menu-item>粉丝概况</el-menu-item>
          <el-menu-item>粉丝画像</el-menu-item>
          <el-menu-item>粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.navAside {
    width: 201px;
    .logo {
        text-align: center;
        background-color: #2e2f32;
        padding:10px;
        img {
            height: 30px;
        }
    }
}

</style>
