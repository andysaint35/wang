const commonValid = require("../commonValid");

let validSchema = {
  name: {
    type: String,
    required: true,
    message: {
      required: '不能为空'
    }
  }
}

let valid = new validate(validSchema);
valid.message({
  mobileCheck: path => `输入的手机格式有误`
})

module.exports = valid;
