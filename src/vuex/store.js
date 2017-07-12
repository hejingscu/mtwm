import Vue from 'vue'
import Vuex from 'vuex'

import publicStore from './public.js'//公共内容

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    publicStore
  }
})

