const commonValid = require("../commonValid");

let validSchema = {
  username: {
    type: String,
    required: true,
    message: {
      required: '用户名不能为空'
    }
  },
  password: {
    type: String,
    required: true,
    message: {
      required: '密码不能为空'
    }
  }
}

let valid = new validate(validSchema);
valid.message({
  mobileCheck: path => `输入的手机格式有误`
})

module.exports = valid;
