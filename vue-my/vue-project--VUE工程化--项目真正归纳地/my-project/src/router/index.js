import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Frame from '@/components/Frame'

import User from '@/components/User/User'
import UserList from '@/components/User/UserList'
import Userinfo from '@/components/User/Userinfo'
import changePassword from '@/components/User/changePassword'

import Article from '@/components/Article/Article'
import ArticleList from '@/components/Article/ArticleList'
import ArticleCategory from '@/components/Article/ArticleCategory'

//登录路由
import Login from '@/components/login'

Vue.use(Router)

var admin_router = new Router({
routes: [
		{
	  		path:'/login',
	  		component:Login,
	  },
    {
      path: '/',
      component: Frame,
      redirect: 'dashboard',
      children:[
      	{
      		path:'dashboard',
      		component:Dashboard,
      	},
		   
      	{
      		path:'user',
      		name: 'user',
      		component: User,
      		children:[
      			{
      				path:'list',
      				component: UserList,
      			},
      			{
      				path:'userinfo',
      				component: Userinfo,
      			},
      			{
      				path:'changePassword',
      				component: changePassword,
      			}
      		],  		
      	},
      	{
      		path:'article',
      		component:Article,
      		children:[
      			{
      				path:'list',
      				component: ArticleList,
      			},
      			{
      				path:'category',
      				component: ArticleCategory,
      			},
      		]
      	},
      ]
    },
    
],
mode:'history'
})

//全局前置守卫//在路由正式改变之前进行转变
admin_router.beforeEach((to,from,next) => {
	
	//如果要进入的路由是/login,放行通行
	if(to.path == '/login'){
		next()
	}else{
		//如果进入的路由不是/login,这需要进行sessionStorage验证
		
		//当该sessionStorage存在
		if(sessionStorage.getItem('userinfo')){
			next()
		}else{
			//这里sessionStorage不存在//则跳转到/login页面,
			next('/login')
			console.log('请先登录')
			
		}
	}
	
})
export default admin_router

//export default new Router({
//routes: [
//  {
//    path: '/',
//    component: Frame,
//    redirect: '/dashboard',
//    children:[
//    	{
//    		path:'dashboard',
//    		component:Dashboard,
//    	},
//    	{
//    		path:'/user',
//    		name: 'user',
//    		component: UserList,
//    		redirect: '/list',
//    		children:[{
//    			path: 'list',
//    			component: UserList
//    		}],      		
//    	},{
//    		path:'/article',
//    		name:'article',
//    		component:ArticleList,
//    		redirect: '/list',
//    		children:[{
//    			path: 'list',
//    			component: ArticleList,
//    		}],  
//    	}
//    ]
//  }
//],
//mode:'history'
//})
