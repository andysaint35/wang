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
    required: false
  }
}

let valid = new validate(validSchema);

module.exports = valid;
