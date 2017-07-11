import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'
import Search from '@/pages/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index},
    {path: '/search',component: Search}
  ]
})
