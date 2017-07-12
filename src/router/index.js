import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index.vue'
import Search from '@/pages/search.vue'

Vue.use(Router)
const scrollBehavior = (to, from, savedPosition) => {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
}

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
	    {path: '/',component: Index},
	    {path: '/index',component: Index},
	    {path: '/search',component: Search}
	 ],
  	scrollBehavior
})
