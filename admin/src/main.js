import Vue from 'vue'
import helper from './helper'
global.helper = helper
import config from '@/config.sample.js'
import store from './store/'
global.store = store
import validate from 'validate'
global.validate = validate
import router from './router'
import i18n from './i18n/'
// import menu from './menu'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import './http'

import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
import '@/styles/main.styl'

import App from './App.vue'

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: config.locale,
  locales: {
    'en': require('vue-timeago/locales/en-US.json'),
    [config.locale]: require(`vue-timeago/locales/${config.locale}.json`)
  }
})

import Dropzone from 'vue2-dropzone' //上传插件
Vue.component('dropzone', Dropzone)
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import VueQuillEditor from 'vue-quill-editor' // 富文本编辑框
Vue.use(VueQuillEditor)

//import VueSocketio from 'vue-socket.io'; //socket.io

// Vue.use(new VueSocketio({
//   debug: true,
//   connection: 'http://127.0.0.1:3500',
//   options: {
//     transports: ['websocket']
//   }
// }));

// import validator from 'indicative'
import validator from 'Validator'
global.validator = validator

import VForm from './components/Form.vue'
import VGrid from './components/Grid.vue'
import VField from './components/Field.vue'

// import Modal from './components/Modal'
// Vue.use(Modal)

Vue.component('v-form', VForm)
Vue.component('v-grid', VGrid)
Vue.component('v-field', VField)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
  mounted() {

  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    // this.$http.get('/users/1').then(({data}) => console.log(data))
    global.$t = this.$t
    // fetch menu from server

    this.$store.dispatch('checkPageTitle', this.$route.path)
    this.$store.dispatch('checkAuth')
  }
})
