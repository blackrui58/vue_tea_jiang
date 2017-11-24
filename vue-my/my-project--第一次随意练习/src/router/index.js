import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import User from '@/components/User'
//import Detail from '@@/Detail'
import Directive from '@/components/Directive'
import Component from '@/components/Component'
import Route from '@/components/Route'
import Error from '@/components/Error'

//route部分的二级路由组件引入
import Modal from '@/components/modal/Modal'
import Alert from '@/components/alert/Alert'
import Huxiu from '@/components/huxiu/Huxiu'

Vue.use(Router)

//export default new Router({
//routes: [
//  {
//    path: '/',
//    name: 'Hello',
//    component: HelloWorld
//  },
//  {
//  	path:'/user',
//  	name:'jiahui',
//  	component:User,
//  },
//  {
//  	path:'/detail',
//  	name:'nana',
//  	component:Detail,
//  }
//  
//],
//	mode:'history',
////	linkExactActiveClass:'router-link-exact-active',
//	linkExactActiveClass:'exact',
//})

export default new Router({
	routes:[
		{
			path:'/directive',
			name:'directive',
			component:Directive,
		},
		{
			path:'/component',
			name:'component',
			component:Component,
		},
		{
			path:'/route',
			name:'route',
			component:Route,
			children:[
				{
					path:'modal',
					name:'modal',
					component:Modal,
				},
				{
					path:'alert',
					name:'alert',
					component:Alert,
				},
				{
					path:'huxiu',
					name:'huxiu',
					component:Huxiu,
				},
			]
		},
		//设置默认路由,当该路由不存在的时候,,显示该组件信息,或者通过设置redirect重定向到某一路由,加载该组件
		{
			path:'*',
			redirect:'/directive'
			
		}
	]
})
