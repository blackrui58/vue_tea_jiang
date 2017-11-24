<template>
	
  <div id="app">
    	<router-link to = "/" exact event ="mouseover">首页</router-link>
    	<router-link to="/user" >user</router-link>
    	<router-link to = "/components" event ="mouseover">组件列表</router-link>
    	<router-link to = "/task" event ="mouseover">日程管理</router-link>

    <!--<router-view name="slider"></router-view>-->
   <transition >
   <router-view class  = "allclass"></router-view>
   </transition>

  </div>
</template>

<script>
export default {
  name: 'app',
  
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
.v-enter{
	opacity: 0;
}
.v-enter-to{
	opacity:1;
}
.v-enter-active{
	transition: 1s;
}
.v-leave{
	opacity: 1;
}
.v-leave-to{
	opacity:0;
}
.v-leave-active{
	transition: 1s;
}
.is-active{
	border:1px solid red;
}

.allclass{
	background: #ccc;
	position: absolute;
	top:100px;
	left:0px;
	width:100%;
}

</style>
