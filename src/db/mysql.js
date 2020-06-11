const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

console.log('MYSQL_CONF', MYSQL_CONF)
// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    console.log('111---')
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      console.log('result', result)
      resolve(result)
    })
  })
  return promise
}
// con.end()


module.exports = {
  exec
}