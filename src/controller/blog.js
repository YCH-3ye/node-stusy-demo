const { exec }  = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1`
  if(author) {
    sql += `and author = '${author}'`
  }
  if(keyword) {
    aql +=  `and title like '%${keyword}%'`
  }

  return exec(sql)
}
const getDetail = (id) => {
  return [
    {
      id: "3",
      title: '标题3',
      content: '内容C',
      createTime: 1591628849091,
      author: 'wangwu'
    }
  ]
}
const addBlog = (data ={}) => {
  console.log('data', data)
  return {
    id: 03
  }
}
const updateBlog = (data = {}) => {
  const id = data.id || ''
  return true
}
const delBlog = (data = {}) => {
  const id = data.id || ''
  return true
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}