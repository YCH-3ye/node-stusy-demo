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
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if(!postData) {
        resolve({})
      }
      console.log('postData11', postData )
      console.log('postData', JSON.parse(postData))
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  getPostData(req).then((postData) => {
    req.body = postData
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    console.log(1)
    if(blogData) {
      blogData.then(blogList => {
        res.end(
          JSON.stringify(blogList)
        )
      })
      return
    }
    console.log(2)
    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    console.log('userData', userData)
    if(userData) {
      userData.then(data => {
        res.end(
          JSON.stringify(data)
        )
      })
      return
    }
    

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })
  
}

module.exports = serverHandle