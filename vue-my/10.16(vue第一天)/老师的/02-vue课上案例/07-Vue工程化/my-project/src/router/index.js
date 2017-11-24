import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import components from '@/components/components'
import task from '@/components/task'
import notFound from '@/components/404'
import user from '@/components/user'

import alert from '@/views/alert'
import comments from '@/views/comments'
import modal from '@/views/modal'
import slider from '@/views/slider'

Vue.use(Router)


export default new Router({
  mode:'history',
  linkActiveClass:'is-active',
  scrollBehavior (to, from, savedPosition) {
  	//点击浏览器的前进后退或切换
    // to 和 from 都是 路由信息对象
    //console.log(to);//要进入的目标路由对象 要去向哪里
    //console.log(from);//离开的路由对象 从哪里来
    //console.log(savedPosition);//记录滚动条的坐标， 点击前进后退的时候记录值
    
    if(savedPosition){
    		return savedPosition; //记录滚动条的滚动位置
    }else{
    		return {
    			x:0,
    			y:0
    		};
    }

// 记录hash值
//	if(to.hash){
//		return {
//			selector: to.hash
//		}
//	}


  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home,
      alias:["/index","/home"]
    },
    {
    		path:'/user/:tip?/:userId?', // /user/1  /user/2  /user
    		component:user
    },
    {
      path: '/components',
      //name: 'Comment',
      component: components,
      children:[
      	{
      		//path: 'comments',
      		path:'', //默认子路由
      		name:'Comments',
      		component: comments
      	},
      	{
      		path: 'alert',
      		name:'Alert',
      		component: alert
      	},
      	{
      		path: 'modal',
      		name:'Modal',
      		component: modal
      	}
      ]
    },
    {
      path: '/task',
      name: 'Task',
      components:{
      	default:task,
      	slider:slider
      }
    },
    {
    		path:'*',
    		//component : notFound
    		//重定向
    		//redirect:{path:'/'}
    		//redirect:{name:"Home"}
    		redirect:(to)=>{
    			//动态设置重定向,就是访问的路径的路由信息
    			//console.log(to); //目标路由信息
    			if(to.path === '/1234'){
    				return '/'
    			}else if(to.path === '/456'){
    				return {path:'/task'};
    			}else{
    				return {name:'Modal'}
    			}
    		}
    }
    ]
})
