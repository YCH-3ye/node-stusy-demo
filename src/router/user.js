const { login } = require('../controller/user')
const { SuccessHandleModel, ErrorHandleModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登陆
  if(method === 'POST' && path === '/api/user/login') {
    const status = login(req.body)
    if(status) {
      return new SuccessHandleModel(status)
    } else {
      return new ErrorHandleModel(status)
    }
  }
}

module.exports = handleUserRouter