var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/1', function(req, res, next) {
	res.render('index1', { title: 'Express' });
});

router.get('/socket', function(req, res, next) {
	res.render('socket', { title: 'socket' });
});


router.get('/echart', function(req, res, next) {
	res.render('echart', { title: 'Express' });
});

router.get('/echart1', function(req, res, next) {
	res.render('echart1', { title: 'Express' });
});

router.get('/echart2', function(req, res, next) {
	res.render('echart2', { title: 'Express' });
});


module.exports = router;
