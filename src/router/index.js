import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index}
  ]
})
