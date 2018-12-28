var express = require('express');
var router = express.Router();
const controller =  require('./module.controller');


// 通过数据库 生成excel
router.get('/buildcsv', controller.buildcsv);