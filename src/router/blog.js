const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessHandleModel, ErrorHandleModel } = require('../model/resModel')


const handlerBlogRouter = (req, res) => {
  const { method, path } = req
  console.log(method, path)

  // 获取博客列表
  if(method === 'GET' && (path === '/' || path === '/api/blog/list')) {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    return new SuccessHandleModel(getList(author, keyword))
  }

  // 获取博客详情
  if(method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id || ''
    return new SuccessHandleModel(getDetail(id))
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const data = addBlog(req.body)
    if(data) {
      return new SuccessHandleModel(data)
    } else {
      return new ErrorHandleModel(data)
    }
  }
  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const status = updateBlog(req.body)
    if(status) {
      return new SuccessHandleModel()
    } else {
      return new ErrorHandleModel()
    }
  }
  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const status = delBlog(req.body)
    if(status) {
      return new SuccessHandleModel()
    } else {
      return new ErrorHandleModel()
    }
  }
}
module.exports = handlerBlogRouter