'use strict';

const config = require('../../config/env.json')[process.env.NODE_ENV || 'development'];

const formidable = require('../../node_modules/formidable');
const fs = require('fs');
const path = require('path');

module.exports = {
  getListSingle: getListSingle,
  getList: getList,
  modify: modify,
  remove: remove,
  add: add,
  testforall: testforall,
  upload: upload
};


function upload(req, res) {

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname, "../../public/upload");
  form.keepExtensions = true;//保留后缀
  let result ={};
  //处理图片

  form.parse(req, function (err, fields, files) {

    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    var filename = files.upload_file.name;
     var newPath = form.uploadDir + "/" + filename;
     fs.renameSync(files.upload_file.path, newPath);  //重命名

    result = {
      name: filename,
      url: "/upload/" + filename,
      //width:fields.width,
      //height:fields.height,
      size:fields.size,
      type:fields.type
    };

    res.json(result);
  })
}


function testforall(req, res) {
  let db = require('../../mongodb')('user');

  db.model.update({}, {isShow: true}, {multi: true}, (err, result)=> {
    res.json({
      ok: 1
    })
  })
}


function add(req, res) {
  let db = req.query.db;
  let saveData = req.body || "";

  db.model.create(saveData, err=> {
    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    else {
      res.json({
        succeed: true,
        errorCode: '0000000',
        errorMsg: '',
        data: {}
      })
    }
  })
}


function remove(req, res) {
  let db = req.query.db;
  let id = req.body.id || "";

  db.model.update({_id: id}, {isShow: false}, {}, err=> {
    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    else {
      res.json({
        succeed: true,
        errorCode: '0000000',
        errorMsg: '',
        data: {}
      })
    }
  })
}


function modify(req, res) {
  let db = req.query.db;
  /*
   提交信息
   id: 数据id (如果有的话)
   */
  let id = req.params.id || "";
  let resData = req.body || "";
  delete resData.collection;



  db.model.update({_id: id}, resData, {}, (err, result)=> {
    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    else {
      res.json({
        succeed: true,
        errorCode: '0000000',
        data: result
      });
    }
  })
}


function getListSingle(req, res) {

  /*
   列表详情
   collection: 数据库编号
   id: 数据id
   */
  /*
   * pageSize,curPageNo 不填   返回所有信息
   *
   * */
  /*
   *
   * {
   'model': data.types[params.id - 1],
   'fields': {
   'name': {
   'label': 'Name',
   'required': true
   }
   }
   }
   * */
  let db = req.query.db;
  let id = req.query.id;

  db.model.find({_id: id}).exec((err, result)=> {
    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    else {
      let resData;
      resData = result[0];
      res.json({
        succeed: true,
        errorCode: '0000000',
        data: resData
      });
    }
  })
}


function getList(req, res) {
  let db = req.query.db;

  /*
   列表信息
   * query  pageSize: 每页数量
   *      curPageNo:当前页码
   *      collection: 数据库编号
   *      sortBy: 根据字段排序
   *      descending: 是否是倒叙  boolean
   *      show: 需要显示的字段
   */
  /*
   * pageSize,curPageNo 不填   返回所有信息
   *
   * */
  let pageSize = +req.query.pageSize || "";
  let curPageNo = +req.query.curPageNo || "";

  let sortBy = req.query.sortBy || "";
  let descending = req.query.descending ? JSON.parse(req.query.descending) : "";
  let show = req.query.show ? req.query.show.split(",") : "";
  let resArray = [];
  let pageCount = 0;




  let sortParams = {};
  let showData = {};
  let showDesc = [];
  if (show) {
    show.map((item, index)=> {
      showData[item] = 1;
      db.desc.map((item1, index1)=> {
        if (item == item1.value) {
          showDesc.push(item1);
        }
      })
    });
  }
  else{
    showDesc = db.desc;
  }
  if (sortBy) {
    sortParams = {
      [sortBy]: descending ? "1" : "-1"
    };
  }


  //user.model.find(null, null, {skip:pageSize*curPageNo, limit:pageSize},(err, result)=>{
  db.model.find({isShow: true}, showData).sort(sortParams).exec((err, result)=> {
    if (err) {
      res.json({
        succeed: false,
        errorCode: '0000001',
        errorMsg: err
      })
    }
    else {
      if (!pageSize || !curPageNo) {
        resArray = result;
        pageCount = result.length
      }
      else {
        resArray = result.slice(pageSize * (curPageNo - 1), pageSize * (curPageNo - 1) + pageSize);
        pageCount = Math.ceil(result.length / pageSize);
      }

      res.json({
        succeed: true,
        errorCode: '0000000',
        data: {
          list: resArray,
          desc: showDesc,
          pageInfo: {
            curPageNo: curPageNo,
            pageSize: pageSize,
            pageCount: pageCount,
            recordCount: result.length
          }
        }
      });
    }
  });
}