const db = require('../db');


// String      字符串
// Number      数字
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID
// Array       数组

let schemaTable = {
  "name" : { "type":"string" },
  "title" : { "type":"date" }
}

let schema = new db.Schema(schemaTable, {timestamps: true , wtimeout: 10000});

//methods 只能document 用 (model实例)

//statics 只能model 用 document 不能用

schema.statics.findById = function (){
  return {'result':1};
}

module.exports = schema;