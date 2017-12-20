import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'

import Shop from '@/pages/shop/list.vue'
import ShopSingle from '@/pages/shop/manage.vue'

import Banner from '@/pages/banner/list.vue'
import Test from '@/pages/test.vue'

import Category from '@/pages/category/list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index},
    {path: '/shop',component: Shop, name: '店铺管理'},
    {path: '/shop/manage',component: ShopSingle, name: '商家信息配置'},
    {path: '/banner',component: Banner, name: 'banner管理'},
    {path: '/category',component: Category, name: '类目管理'},
    {path: '/test',component: Test, name: '测试'}
  ]
})
