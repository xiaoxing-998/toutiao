import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'// 引入提示对象
// import adress from '../adress'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共全局请求前缀
// 请求拦截器
axios.interceptors.request.use(function (config) {
  //   执行OK
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  //   console.log(config)
  return config
}, function (error) {
  //   执行失败
  // reject 状态是承诺失败 将在catch中接收
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  //   console.log(response)
  // 处理成功响应数据
  return response.data ? response.data : {}
}, function (error) {
  console.log(error)
  // 处理响应错误
  let status = error.response.status //   当前状态码
  let configurl = error.request.responseURL //   请求地址
  let message = '' // 提示信息
  //   console.log(adress)
  if (configurl === 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations' && status === 403) {
    message = '用户非实名认证用户，无权限登录'
  } else if (configurl === 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations' && status === 400) {
    message = '参数缺失、手机号格式不正确、验证码失效'
  } else if (status === 400) {
    message = '请求参数错误'
  } else if (status === 401) {
    //    token过期
    window.localStorage.removeItem('user-token')// 无用token就不可进入
    router.push('/login')
  } else if (status === 403) {
    window.localStorage.removeItem('user-token')
    router.push('/login')
  } else if (status === 404) {
    message = '手机号不正确'
  } else if (status === 507) {
    message = '服务器数据库异常'
  }
  Message({ type: 'warning', message })// 提示消息
})
export default axios
