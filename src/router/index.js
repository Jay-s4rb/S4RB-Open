import Vue from 'vue'
import Router from 'vue-router'
import table from '@/components/table.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/Month'},
    {
      path: '/:bBy',
      name: 'table',
      component: table,
      props: {}
    }
  ]
})
