const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require("querystring")

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is ', d.toGMTString())
  return d.toGMTString()
}


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
const SESSION_DATA = {}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])


  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  console.log(cookieStr)
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid
  if (userId) {
      if(!SESSION_DATA[userId]) {
          SESSION_DATA[userId] = {}
      }
      req.session = SESSION_DATA[userId]
  } else {
      needSetCookie = true 
      userId = `${Date.now()}_${Math.random()}`
      SESSION_DATA[userId] = {}
  }
  
  req.session = SESSION_DATA[userId]


  getPostData(req).then((postData) => {
    req.body = postData
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if(blogData) {
      blogData.then(blogList => {
        if( needSetCookie ) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogList)
        )
      })
      return
    }
    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    console.log('userData', userData)
    if(userData) {
      userData.then(data => {
        if( needSetCookie ) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;  expires=${getCookieExpires()}`)
        }
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