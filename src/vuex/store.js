import Vue from 'vue'
import Vuex from 'vuex'

import publicStore from './public.js'//公共内容
import shop from './shop.js'//下单相关

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    publicStore, shop
  }
})

