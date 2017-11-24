<template>
	<div id='bigbox'>
					
		<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		 
		  	
		  		<el-menu-item index="3" class='left'>管理系统后台</el-menu-item>
		  	
		  	
		  		
			  <el-submenu index="2" class="right" >
			    <template slot="title" >您好,{{username}}</template>
			    <el-menu-item index="2-1">
			    	<router-link to='/user/userinfo'>个人信息</router-link>
			    </el-menu-item>
			    <el-menu-item index="2-2">
			    	<router-link to='/user/changePassword'>更改密码</router-link>
			    </el-menu-item>
			    <el-menu-item index="2-3" @click='quit'>退出登录</el-menu-item>
			     
			  </el-submenu>
		  	
		  
		 
		</el-menu>
		
		<el-row>
			<!--侧边栏-->
			<el-col :span=4>
				<el-row class="tac">
				  <el-col >
				    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				     <!--导航1-->
				     <el-menu-item index="1">
				     	<i class="el-icon-menu">
				     		
				     	</i>
				     	<router-link to="/">首页</router-link>
				     </el-menu-item><!--导航1::end-->
				     
				     <!--导航2-->
				      <el-submenu index="2">
				        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
				        
				        <el-menu-item-group>
				          <el-menu-item index="1-1">
				          	<router-link to="/user/list">用户列表</router-link>
				          </el-menu-item>
				          
				        </el-menu-item-group>
				        
				      </el-submenu><!--导航2:::end-->
				      
				      <!--导航3-->
				      <el-submenu index="3">
				        <template slot="title"><i class="el-icon-message"></i>文章管理</template>
				        <!--导航3::下拉部分-->
				        <el-menu-item-group>
				          <el-menu-item index="1-1">
				          	<router-link to="/article/list">文章列表</router-link>
				          </el-menu-item>
				          <el-menu-item index="1-2">
				          	<router-link to="/article/category">文章分类</router-link>
				          </el-menu-item>
				        </el-menu-item-group>
				        
				      </el-submenu><!--导航3:::end-->
				    </el-menu>
				  </el-col>
				</el-row>
			</el-col><!--侧边栏尾部-->
			<el-col :span=20>
				<router-view>
					<dashboard></dashboard>
				</router-view>
			</el-col>
		</el-row>

		
		
		
	</div>
	
</template>

<script>
	import Dashboard from './Dashboard'
	import Bus from '../Vuejs/vue'
	export default{
		components:{Dashboard},
		name:'Modal',
		data() {
	      return {
	        activeIndex: '1',
	        activeIndex2: '1',
	        
	        //用户名
	        username:'root',
	      };
	    },
		methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      
	      //该函数是点击退出登录之后的操作
	      quit(){
			    this.$confirm('再次确定是否要退出登录?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '退出登录成功!'
		          });
		          //当退出登录之后,
		          //1.需要清除sessionStorage
		          //2.跳转到login登录页
		          sessionStorage.removeItem('userinfo');
		          this.$router.push('/login')
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消退出登录'
		          });          
		        });
	      }
	    },
		
		//运用了钩子函数,当该页面挂载上以后,运行
	    mounted: function(){
	      	
	      	var info = sessionStorage.getItem('userinfo');
	      	
	      	this.username = JSON.parse(info).name;
	    },
	    
	    
	    created:function(){
	    	Bus.$on('changename',(val) => {
	    		this.username = val;
	    	})
	    }
	}
	

	

</script>

<style scoped>
	#bigbox{
		margin:0,;
		padding: 0;
	}
	.left{
		float: left;
		margin-left: 80px;
	}
	.right{
		float: right;
		margin-right: 100px;
	}
</style>