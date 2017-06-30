import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'

import Shop from '@/pages/shop.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index},
    {path: '/shop',component: Shop, name: '店铺管理'}
  ]
})
