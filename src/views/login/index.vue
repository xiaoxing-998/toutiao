<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img class="logo-img" src="../../assets/img/logo_index.png" alt="logo" />
      </div>
      <img class="card-gif" src="../../assets/img/叮当猫.gif" alt="gif" />
      <!-- 登录表单容器 -->
      <el-form ref="myForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
        <!-- 表单域 一行一个域 -->
        <el-form-item prop="mobile">
          <!-- 手机号输入框 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">我已阅读并同意不敲代码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据 是一个对象
      loginForm: {
        //   手机号
        mobile: '',
        // 验证码
        code: '',
        // 是否同意
        agree: false
        // 当前登录状态码
        // statuscode: ''
      },
      //   验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ],
        // 自定义函数
        agree: [
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback() // 认为通过
              } else {
                callback(new Error('请同意此协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submitData () {
      this.$refs.myForm.validate(success => {
        if (success) {
          // 调接口发请求 请求数据库---校验
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          })
            .then(res => {
              // this.statuscode = res.status
              console.log(res)
              window.localStorage.setItem('user-token', res.data.data.token)
              this.$router.push('/home') // 成功后跳到主页
            })
            .catch(() => {
              this.$message({
                message: '警告，您的手机号或验证码不正确',
                type: 'warning'
              })
              // 用户非实名认证用户
              // console.log(this.statuscode)
              // if (res.status === 403)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;
  height:100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 460px;
    height: 360px;
    position: relative;
    .logo {
      text-align: center;
      .logo-img {
        height: 45px;
      }
    }
  }
  .card-gif {
    position: absolute;
    left: 160px;
    bottom: 72px;
    width: 280px;
  }
}
</style>
