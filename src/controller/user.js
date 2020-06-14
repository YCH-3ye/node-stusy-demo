const { exec }  = require('../db/mysql')
const loginCheck = (data) => {
  const username = data.username || ''
  const password = data.password || ''
  let sql = `select * from users where username = '${username}' and password = ${password}`
  return exec(sql)
}

module.exports = {
  loginCheck
}