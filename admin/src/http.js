import Vue from 'vue'
import axios from 'axios'
import config from './config.sample.js'

// enable mock
import mock from './mock'
if (!config.debug.mock) {
  mock.restore()  //移除模拟行为
}

axios.defaults.timeout = 5000
axios.defaults.baseURL = config.api
axios.defaults.headers.common['Content-Type'] = 'application/json'
// var http = axios.create({
//   baseURL: config.api,
//   timeout: 5000
//   // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
// })
axios.interceptors.request.use(function (request) {

  return request
}, function (error) {
  console.log('request:'+error)
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  const request = response.config
  if (config.debug.http) {
    console.log(
      '>>>', request.method.toUpperCase(), request.url, request.params,
      '\n   ', response.status, response.data
    )
  }
  return response
}, function (error) {
  console.log('response:'+ error)
  if (config.debug.http) {
    let { response, config: request } = error
    if (request) {
      console.log(
        '>>>', request.method.toUpperCase(), request.url, request.params,
        '\n   ', response.status, response.data
      )
    }
  }
  // Do something with response error
  return Promise.reject(error)
})
Vue.prototype.$http = axios
