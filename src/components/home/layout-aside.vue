<template>
  <div class="navAside">
    <div class="logo">
      <img src="../../assets/img/logo_admin.png" alt="logo" />
    </div>
    <el-menu :router="true" background-color="#353b4e" text-color="#adafb5" active-text-color="#409eff">
      <el-menu-item class="align">首页</el-menu-item>
      <!-- 二级导航 -->
      <el-submenu index="1" class="align">
        <span slot="title">内容管理</span>
        <el-menu-item-group>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" class="align">
        <span slot="title">粉丝管理</span>
        <el-menu-item-group>
          <el-menu-item index="/home/image">图文数据</el-menu-item>
          <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fansavatar">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/home/account" class="align">账户信息</el-menu-item>
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
    .el-menu-item{
        padding-left:40px !important;
    }
    .el-submenu__title span{
        padding-left:20px !important;
    }
}

</style>
