'use strict';

const config = require('../../config/env.json')[process.env.NODE_ENV || 'development'];
const instance = require('../axios')({
  baseURL: config['PROD_SERVER']
});
const user = require('../../../mongodb')('user');
const exec = require('child_process').exec;

module.exports = {
  buildcsv:buildcsv
};


function buildcsv(req, res){
  exec('/root/mongodb-linux-x86_64-3.0.6/bin/mongoexport -d wj -c users -f name,tel,score,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24,q25 --type=csv -o /root/wang/public/user.csv', (error, stdout, stderr) =>{
  // mongo 自带应用程序 mongoexport 生成  -d 数据名称  -c collection名  -f 需要生成excel的字段  excel 后缀名 --type=csv  -o 生成位置
    if(error){
      res.json({
        succeed: true,
        errorCode:'0000001',
        errorMsg:error
      })
    }
    else{
      res.json({
        succeed: true,
        errorCode:'0000000'
      })
    }
  })
}