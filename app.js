const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require("querystring")

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({})
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      postData = querystring.parse(postData)
      console.log(postData)
      if(!postData) {
        resolve({})
      }
      resolve(postData)
    })
  })
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  getPostData(req).then((postData) => {
    console.log('postData', postData)
    req.body = postData
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if(blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res)

    if(userData) {
      res.end(
        JSON.stringify(userData)
      )
      return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })
  
}

module.exports = serverHandle