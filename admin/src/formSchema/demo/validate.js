
const commonValid = require("../commonValid");

let validSchema = {
  name: {
    type: String,
    required: true,
    use: {mobileCheck: commonValid.mobileCheck},
    message: {
      required: '姓名不能为空'
    }
  },
  logo: {
    type: String
  },
  date: {
    type: String,
    //length: {min: 11, max: 11},
    required: true,
    message: {
      required: '日期不能为空',
      //length: '手机号长度不正确'
    }
  },
  type: {
    type: Number,
  },
  status: {
    type: Number,
    required: true,
    message: {
      required: '状态不能为空'
    }
  },
  switch: {
    type: Boolean
  },
  tags: {
    type: Number
  },
  tags1: {
    type: Boolean
  },
  tags2: {
    type: Boolean
  },
  description: {
    type: String
  },
  intro: {
    type: String
  }
}

let valid = new validate(validSchema);
valid.message({
  mobileCheck: path => `输入的手机格式有误`
})

module.exports = valid;
