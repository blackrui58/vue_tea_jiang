<template>
  <div id="app">
   <!-- <img src="./assets/logo.png">-->
    <!--<a href="/user">用户列表</a>
    <a href="/detail">详情列表</a>-->
    
    <!--<router-link :to='{name:"Hello"}' exact active-class='first'>首页</router-link>
    <router-link :to='{name:"jiahui"}' active-class='second'>用户列表link版</router-link>
    <router-link :to='{name:"nana"}' active-class='three'>详情列表link版</router-link>-->
    
    <!--<router-link to='user'>用户列表link版</router-link>
    <router-link to='detail'>详情列表link版</router-link>-->
    
    <!--<router-link to='user' tag='h1'>用户列表p版</router-link>
    <router-link to='detail' tag='p'>详情列表div版</router-link>-->
    
    <ul class="clear">
    	<router-link to='directive' tag='li'>Vue指令</router-link>
    	<router-link to='component' tag='li'>Vue组件</router-link>
    	<router-link to='route' tag='li'>Vue路由</router-link>
    	<!--<li>Vue指令</li>
    	<li>Vue指令</li>
    	<li>Vue路由</li>-->
    </ul>
    <router-view class='router-view'/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-view{
	background: #ccc;
	width: 200px;
}
*{
	list-style: none;
}
.clear:after{
	content: '';
	display: block;
	clear: both;
}
ul{
	
}
li{
	float: left;
	margin-right: 40px;
	width: 100px;
	height: 40px;
	background: greenyellow;
	border-radius: 10px;
	line-height: 40px;
	text-align: center;
}

/*.router-link-active{
	color:orange;
}
.router-link-exact-active{
	color:mediumvioletred;
}
.exact{
	color:green
}
.first{
	color:yellow
}
.second{
	color:green
}
.three{
	color:blue
}*/
</style>
