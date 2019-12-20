<template>
  <el-row class="topTitle" type="flex" justify="space-between" align="middle">
    <!-- 头部左侧 -->
    <el-col :span="6" class="left-contnet">
      <i class="el-icon-s-unfold h-title"></i>
      <span>野原 しんのすけ株式会社</span>
    </el-col>
    <!-- 头部右侧 -->
    <el-col :span="4">
      <div style="float:right">
        <el-row type="flex">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="right-contnet">
              <!-- 用户头像 -->
              <img :src="!userInfo.photo ? userInfo.photo: defaultAvatar" alt="avatar">
              <!-- <img src="../../assets/img/少女小埋.jpg" alt="photo" /> -->
              <!-- 用户昵称 -->
              <span class="user-name" v-html="!userInfo.name?`${userInfo.name}&nbsp;&nbsp;<i class=el-icon-caret-bottom></i>`:`野原新之助&nbsp;&nbsp;<i class=el-icon-caret-bottom></i>`">
                <!-- {{userInfo.name}} -->
                <!-- <i class="el-icon-caret-bottom"></i> -->
              </span>
            </div>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>

export default {
  data () {
    return {
      // 用来接收接口用户数据
      userInfo: {},
      defaultAvatar: require('../../assets/img/少女小埋.jpg')
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data.data)
      this.userInfo = res.data.data
    })
  },
  methods: {
    handleCommand (data) {
      if (data === 'exit') {
        // 删除令牌
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (data === 'git') {
        location.assign('https://github.com/xiaoxing-998/toutiao')
      }
    }
  }
}
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
    // display: flex;
    // justify-content: center;
    // align-items: center;
    cursor: pointer;
    img {
      vertical-align: middle;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .user-name {
      margin-left: 10px;
      i {
        // padding-left: 13px;
      }
    }
  }
}
</style>
