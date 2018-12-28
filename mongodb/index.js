//schema    model = new mongoose.Schema    document = new model
const db = require('./db');

module.exports = function(collections){
  let model = require(`./schema/${collections}/index.js`);
  return {
    model: db.model(collections, model.model),
      desc: model.desc||''
  };
}