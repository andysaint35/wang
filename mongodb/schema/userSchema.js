const db = require('../db');

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