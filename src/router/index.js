import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/pages/Home'
import Complaints from '@/components/pages/Complaints'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/complaints',
      name: 'Complaints',
      component: Complaints
    }
  ]
})
