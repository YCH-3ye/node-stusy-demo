const { login } = require('../controller/user')
const { SuccessHandleModel, ErrorHandleModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登陆
  if(method === 'POST' && path === '/api/user/login') {
    const status = login(req.body)
    if(status) {
      return new SuccessHandleModel()
    } else {
      return new ErrorHandleModel('登陆失败')
    }
  }
}

module.exports = handleUserRouter