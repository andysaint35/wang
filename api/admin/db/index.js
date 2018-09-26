
var express = require('express');
var router = express.Router();
const controller =  require('./db.controller');


/* GET home page. */
router.get('/add', controller.add);
router.get('/modify', controller.modify);
router.get('/searchFor', controller.searchFor);
router.get('/del', controller.del);

module.exports = router;
