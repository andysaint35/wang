const dbSchema = require('./db.schema.json');

function getDB(req, res, next){
  let dbNumber = req.params.dbNumber;
  let collection = dbSchema['collection'][+dbNumber];
  if(!collection){
    res.json({
      succeed: false,
      errorCode: '0000001',
      errorMsg: '未选择数据库'
    })
  }
  //let db = require('../../mongodb')(collection);
  req.query.db =require('../../mongodb')(collection);
  next();
}

module.exports = getDB;