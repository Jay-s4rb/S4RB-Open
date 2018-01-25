import Vue from 'vue'
import Vuex from 'vuex'

import complaints from './complaints'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    complaints
  }
})
