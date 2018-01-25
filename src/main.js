import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import moment from 'moment'

// import CSS - vendor and custom sass files.
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.min.css'
import './assets/css/scss/style.scss'
UIkit.use(Icons)

// components
Vue.config.productionTip = false

// filters
Vue.filter('niceDate', (date) => {
  return moment(date).format('D MMMM YYYY')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
