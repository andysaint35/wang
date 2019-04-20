const db = require('../../db');
const schema = require('./schema');
// String      字符串
// Number      数字
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID
// Array       数组

// 主要用于后台表格的标题 每一个value 对应schema的key

let dbschema = new db.Schema(schema.model, {
  timestamps: true,
  wtimeout: 10000,
  minimize: false, //默认不保存空对象  加上这个将保存空对象
  strict: true  //默认为true 这意味着你不能 save schema 里没有声明的属性。
});

//methods 只能document 用 (model实例)
//statics 只能model 用 document 不能用

module.exports = {
  model: dbschema,
  desc: schema.desc
};