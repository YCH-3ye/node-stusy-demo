const getList = (author, keyword) => {
  return [{
      id: "1",
      title: '标题1',
      content: '内容A',
      createTime: 1591627166164,
      author: 'zhangsan'
    },
    {
      id: "2",
      title: '标题2',
      content: '内容B',
      createTime: 1591627213461,
      author: 'lisi'
    }
  ]
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
module.exports = {
  getList,
  getDetail
}