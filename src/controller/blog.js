const { exec }  = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  console.log('sql', sql)
  if(author) {
    sql += `and author = '${author}'`
  }
  console.log('sql', sql)

  if(keyword) {
    sql +=  `and title like '%${keyword}%'`
  }
  console.log('---sql', sql)
  return exec(sql)
}
const getDetail = (id) => {
  let sql = `select * from blogs where id = ${id}`
  console.log(exec(sql))
  return exec(sql)
}
const addBlog = (data ={}) => {
  const { title, content, author } = data
  const createtime = new Date()
// insert into 表名 (键1, 键2, 键3, ...) values (值1, 值2, 值3, ...)
  let sql = `insert into blogs (title, content, author, createtime ) values ( '${title}', '${content}', '${author}', '${createtime}' )`
  return exec(sql)
}
const updateBlog = (data = {}) => {
  const id = data.id || ''
  const { content, author } = data
  let sql = `update blogs set content='${content}', author='${author}' where id = ${id};`
  return exec(sql)
}
const delBlog = (data = {}) => {
  const id = data.id || ''
  let sql = `delete from blogs where id=${id};`
  return exec(sql)
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}