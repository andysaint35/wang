// api

var express = require('express');
var router = express.Router();
const db = require('./db');
const controller =  require('./db.controller');
const dbSchema = require('./db.schema.json');
/* GET home page. */
router.use('/db', db);

router.get('/getList', controller.getList);

router.get('/getListSingle', controller.getListSingle);

router.post('/modify/:id', controller.modify);

router.post('/remove', controller.remove);

router.post('/add', controller.add);

router.get('/testforall', controller.testforall);



module.exports = router;
