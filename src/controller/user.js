
const loginCheck = (data) => {
  const name = data.name || ''
  const password = data.password || ''
  return true
}

module.exports = {
  loginCheck
}