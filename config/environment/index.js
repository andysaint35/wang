'use strict';

let all = {
  secrets: {
    session: 'hah',
    sessionExpire: '30m',
    refresh: 'yo',
    refreshExpire: '7d'
  },
  clusterEnabled: false,
  // logger level
  loggerLevel: process.env.LOGGER_LEVEL || 'info',
  // logger file keep days
  loggerKeepDays: 7,
  // Server port
  port: process.env.PORT || 3000,
  // Codis Server
  codis: {
    host: '192.168.3.111',
    port: 29000,
    password: 'redis'
  },
  dataBaseUrl:'localhost:27017',
  dataBaseName:'test001',
  // Signature Auth
  signAuth: false,
  signAuthIgnore: false,
  // Signature
  signatures: {
    bbs: 'Maizijf2018'
  }
};

module.exports = Object.assign(
  all,
  require('./' + matchMock()) || {}
);

function matchMock(){
  if(!process.env.NODE_ENV){
    return 'development.js';
  }
  let Regex =/^([a-zA-Z]*)(\d+)$/;
  return process.env.NODE_ENV.match(Regex)?process.env.NODE_ENV.replace(Regex,"$1")+"mock.js":process.env.NODE_ENV+".js";
}