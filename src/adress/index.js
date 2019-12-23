
const BASEURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
var list = [
  {
    // 修改文章评论状态
    path: {
      name: 'status',
      status: `${BASEURL}/comments/status`
    },
    code: [
      { 400: '请求参数错误' }
    ]

  }, {
    // 删除文章
    path: {
      name: 'delArticles',
      delArticles: `${BASEURL}/articles/:target`
    },
    code: [
      { 400: '指定文章有误' },
      { 500: '服务器错误' }
    ]
  }, {
    // 用户登录
    path: {
      name: 'authorizations',
      authorizations: `${BASEURL}/authorizations`
    },
    code: [
      { 400: '手机号格式不正确或验证码失效' },
      { 403: ' 用户非实名认证用户，无权限登录' }
    ]

  }
]
export default list
