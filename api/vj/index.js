var express = require('express');
var router = express.Router();
var mammoth = require('mammoth');
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  //上传文件存放地址
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, './upload/'));
  },
  //上传文件重新命名
  filename: function(req, file, cb) {
    let fileArray = file.originalname.split('.');
    let suffix = fileArray.splice(fileArray.length - 1, 1);
    let filename = fileArray.join(',') + '-' + Date.now() + '.' + suffix;
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });

router.post('/docxtohtml', upload.single('uploadDoc'), (req, res, next) => {
  mammoth
    .convertToHtml({
      path: path.join(__dirname, `upload/${req.file.filename}`)
    })
    .then(result => {
      var text = { content: result.value }; // The raw text
      fs.writeFileSync(
        `/Users/wangyang/project/vjh5/src/pages/template/auto/data/${
          req.body.name
        }.json`,
        JSON.stringify(text)
      );
    })
    .done();
  res.send({ res: `生成文件 ${req.body.name}.json` });
});

router.get('/docxtohtml', (req, res, next) => {
  mammoth
    .convertToHtml({
      path: path.join(
        __dirname,
        './【风险保障计划标准条款】- 20190823final-快闪卡贷.docx'
      )
    })
    .then(result => {
      var text = result.value; // The raw text
      console.log(text);
      var messages = result.messages;
      console.log(result);
    })
    .done();
});

module.exports = router;
