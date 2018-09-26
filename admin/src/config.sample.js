const baseUrl = 'http://127.0.0.1:3000'
const config = {
  locale: 'en-US', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/admin/api/upload`,
  debug: {
    mock: false, // enable mock
    http: false // http request log
  },
  api: `${baseUrl}/api/admin`
  // locale: 'en', //en
  // api: 'http://192.168.1.108:3333/admin/api'
}

global.config = config

export default config
