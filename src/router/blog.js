const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessHandleModel, ErrorHandleModel } = require('../model/resModel')


const handlerBlogRouter = (req, res) => {
  const { method, path } = req
  console.log(method, path)

  // 获取博客列表
  if(method === 'GET' && (path === '/' || path === '/api/blog/list')) {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    return getList(author, keyword).then((listDate) => {
       console.log('listDate', new SuccessHandleModel(listDate))
      return new SuccessHandleModel(listDate)
    })

    // return new SuccessHandleModel(getList(author, keyword))
  }

  // 获取博客详情
  if(method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id || ''
    return getDetail(id).then( (res) => {
      console.log('id', res)
      return new SuccessHandleModel(res[0])
    })
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const author = '赵云'
    return addBlog(req.body).then( (res) => {
      const  id = res.insertId
      return new SuccessHandleModel(id)
    })
  }
  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    return updateBlog(req.body).then((res) => {
      if(res.affectedRows === 1) {
        return true
      } else {
        return false
      }
    })

  }
  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {

    return delBlog(req.body).then((res) => {
      if(res.affectedRows === 1) {
        return true
      } else {
        return false
      }
    })
  }
}
module.exports = handlerBlogRouter