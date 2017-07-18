import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'
import Search from '@/pages/search.vue'

import ShopDetail from '@/pages/shop/detail.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
	    {path: '/',component: Index, meta: { keepAlive: true }},
	    {path: '/index',component: Index, meta: { keepAlive: true }},
	    {path: '/search',component: Search},
	    {path: '/shop/detail',component: ShopDetail}
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
