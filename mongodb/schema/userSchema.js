const db = require('../db');


// String      字符串
// Number      数字
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID
// Array       数组

// 主要用于后台表格的标题 每一个value 对应schema的key
let schemaDesc = [
  {"value": "name", 'text':"姓名", "align": 'left',
    "sortable": false,},
  {'value': 'tel', 'text':"电话", "align": 'left',
    "sortable": false },
  {'value': 'score', 'text':"分数", "align": 'left',
    "sortable": false },
  {'value': 'q1', 'text':'第一题' },
  {'value': 'q2', 'text':'第一题' },
  {'value': 'q3', 'text':'第一题' },
  {'value': 'q4', 'text':'第一题' },
  {'value': 'q5', 'text':'第一题' },
  {'value': 'q6', 'text':'第一题' },
  {'value': 'q7', 'text':'第一题' },
  {'value': 'q8', 'text':'第一题' },
  {'value': 'q9', 'text':'第一题' },
  {'value': 'q10', 'text':'第一题' },
  {'value': 'q11', 'text':'第一题' },
  {'value': 'q12', 'text':'第一题' },
  {'value': 'q13', 'text':'第一题' },
  {'value': 'q14', 'text':'第一题' },
  {'value': 'q15', 'text':'第一题' },
  {'value': 'q16', 'text':'第一题' },
  {'value': 'q17', 'text':'第一题' },
  {'value': 'q18', 'text':'第一题' },
  {'value': 'q19', 'text':'第一题' },
  {'value': 'q20', 'text':'第一题' },
  {'value': 'q21', 'text':'第一题' },
  {'value': 'q22', 'text':'第一题' },
  {'value': 'q23', 'text':'第一题' },
  {'value': 'q24', 'text':'第一题' },
  {'value': 'q25', 'text':'第一题' }
]

let schemaTable = {
  "name" : { "type":"string" },
  "tel" : { "type":"string" },
  "q1" : { "type": "Mixed"},
  "q2" : { "type": "Mixed"},
  "q3" : { "type": "Mixed"},
  "q4" : { "type": "Mixed"},
  "q5" : { "type": "Mixed"},
  "q6" : { "type": "Mixed"},
  "q7" : { "type": "Mixed"},
  "q8" : { "type": "Mixed"},
  "q9" : { "type": "Mixed"},
  "q10" : { "type": "Mixed"},
  "q11" : { "type": "Mixed"},
  "q12" : { "type": "Mixed"},
  "q13" : { "type": "Mixed"},
  "q14" : { "type": "Mixed"},
  "q15" : { "type": "Mixed"},
  "q16" : { "type": "Mixed"},
  "q17" : { "type": "Mixed"},
  "q18" : { "type": "Mixed"},
  "q19" : { "type": "Mixed"},
  "q20" : { "type": "Mixed"},
  "q21" : { "type": "Mixed"},
  "q22" : { "type": "Mixed"},
  "q23" : { "type": "Mixed"},
  "q24" : { "type": "Mixed"},
  "q25" : { "type": "Mixed"},
  "score" : { "type": "Number"}
}

let schema = new db.Schema(schemaTable, {timestamps: true , wtimeout: 10000});

//methods 只能document 用 (model实例)

//statics 只能model 用 document 不能用

schema.statics.findById = function (){
  return {'result':1};
}

module.exports = {
  model:schema,
  desc:schemaDesc
};