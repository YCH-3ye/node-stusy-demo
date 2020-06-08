const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登陆
  if(method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是登陆的接口'
    }
  }
}

module.exports = handleUserRouter