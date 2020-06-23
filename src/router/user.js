const { loginCheck } = require('../controller/user')
const { SuccessHandleModel, ErrorHandleModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登陆
  if(method === 'POST' && path === '/api/user/login') {
    const res = loginCheck(req.body)
    return res.then((data) => {
      if(data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessHandleModel()
      } else {
        console.log(new ErrorHandleModel('登陆失败'))
        return new ErrorHandleModel('登陆失败')
      }
    })
  }
}

module.exports = handleUserRouter