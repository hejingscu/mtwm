import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'
import Search from '@/pages/search.vue'
import PageOrder from '@/pages/order.vue'
import PageMine from '@/pages/mine.vue'

import PageLogin from '@/pages/login.vue'

import ShopDetail from '@/pages/shop/detail.vue'

Vue.use(Router)

const routerPath = '/mtwm/dist/'

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
	    {path: routerPath + '',component: Index, meta: { keepAlive: true }},
	    {path: routerPath + 'login',component: PageLogin, meta: {requireAuth: true}},
	    {path: routerPath + 'index',component: Index, meta: { keepAlive: true }},
	    {path: routerPath + 'search',component: Search, meta: {requireAuth: true}},
	    {path: routerPath + 'shop/detail',component: ShopDetail},
	    {path: routerPath + 'order',component: PageOrder},
	    {path: routerPath + 'mine',component: PageMine}
	 ],
  	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0}
		}
	}
})
