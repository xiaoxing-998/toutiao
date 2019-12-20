<template>
  <el-row class="topTitle" type="flex" justify="space-between" align="middle">
    <!-- 头部左侧 -->
    <el-col :span="6" class="left-contnet">
      <i class="el-icon-s-unfold h-title"></i>
      <span>野原 しんのすけ株式会社</span>
    </el-col>
    <!-- 头部右侧 -->
    <el-col :span="4">
      <div style="float:right" >
        <el-row type="flex" class="right-contnet" align="middle" >
          <!-- 用户头像 -->
          <img src="../../assets/img/少女小埋.jpg" alt="photo"/>
          <!-- 用户昵称 -->
          <el-dropdown trigger="click">
            <span class="user-name">
              蜡笔小新
              <i class="el-icon-caret-bottom"></i>
            </span>
             <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.topTitle {
  height: 50px;
  .left-contnet {
    font-size: 18px;
    .h-title {
      cursor: pointer;
    }
    span {
      color: #2c3e50;
      padding: 0 10px;
      font-size: 16px;
    }
  }
  .right-contnet {
    img {
      width: 35px;
      border-radius: 50%;
    }
    .user-name {
      margin-left: 10px;
      cursor: pointer;
      i {
          padding-left: 3px;
      }
    }
  }
}
</style>
