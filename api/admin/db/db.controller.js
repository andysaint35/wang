
'use strict';

const config = require('../../../config/env.json')[process.env.NODE_ENV || 'development'];
const instance = require('../../axios')({
  baseURL: config['PROD_SERVER']
});
const user = require('../../../mongodb')('user');
const home = require('../../../mongodb')('home');
const shop = require('../../../mongodb')('shop');

module.exports = {
  add: add,
  modify: modify,
  searchFor: searchFor,
  del: del
};


function add(req, res){
  shop.create({name:"hfjagfhjwfweg", title:13412345445, time: '827144'}, function(err, doc1){
      if(err) return res.json(err);
      res.json(err);

  })
}

function modify(req, res){

  var tt1 = new user();
  res.json(tt1.findById());

}
function searchFor(req, res){
  user.find({}, (err, result)=>{
    res.json(result);
  })
}
function del(req, res){
  user.find({}, (err, result)=>{
    res.json(result);
  })
}