class handleModel {
  constructor(data, message) {
    if(typeof data === 'string') {
        this.data = data
        data = null
        message = null
    }
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}

class SuccessHandleModel extends handleModel {
  constructor(data, message) {
    super(data, message)
    this.error = 0
  }
}
class ErrorHandleModel extends handleModel {
  constructor(data, message) {
    super(data, message)
    this.error = -1
  }
}

module.exports = {
  ErrorHandleModel,
  SuccessHandleModel
}
