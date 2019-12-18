<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="logo" />
      </div>
      <!-- 登录表单容器 -->
      <el-form style="margin-top:30px">
        <!-- 表单域 一行一个域 -->
        <el-form-item>
          <!-- 手机号输入框 -->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input style="width:65%" placeholder="请输入验证码"></el-input>
            <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox>我已阅读并同意不敲代码</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 460px;
    height: 360px;
    .logo {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
