<template>
	<div class="userlist">
		<!--面包屑部分-->
		<el-breadcrumb separator="/" class='miaobaoxie'>
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<!--面包屑部分:::end-->

		<!--搜索部分-->
		<el-row class='search'>
			<el-col :span='4'>
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type="primary">文字按钮</el-button>
			</el-col>
		</el-row>
		<!--搜索部分:::end-->

		<!--信息显示部分-->
		
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%"   v-loading='loading'>
			<!--1.序列-->
			<el-table-column type="index" width="80" >
			</el-table-column>
			<!--2.姓名-->
			<el-table-column property="name" label="姓名" width="120" align='center'>
			</el-table-column>
			<!--3.性别-->
			<el-table-column property="sex" label="性别" width="100" align='center' :formatter='formatter'>
			</el-table-column>
			<!--4.年龄-->
			<el-table-column property="age" label="年龄" width="120" align='center'>
			</el-table-column>
			<!--5.生日-->
			<el-table-column property="birth" label="生日" width="120" align='center'>
			</el-table-column>
			<!--6.地址-->
			<el-table-column property="address" label="地址" align='center' width="360">
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	//引入DateUser文件中的数据,并将其赋值给User变量,从而在下面可以引用
//	import User from '../../data/DataUser'
	
	//引入该axios模块,专门用来进行类似ajax请求
	import axios from 'axios'
	
  
	
	export default {
		
		name: 'UserList',
		data() {
			return {
				msg: 'userlist',
				input: '',

				//表格数据
				tableData: [],
				currentRow: null,
				//数据加载的缓存加载页面:默认设置为false
				loading:false,

			}
		},
		//mounted这是一个钩子函数,代表该组件挂载之后
		//在这里意思是//当该组件挂载之后,执行里面的函数
		mounted(){
			//当该组件挂载之后,执行函数:getUser//该函数已经在methods中定义
			//getUser()函数用来异步获取相关数据
			this.getUser();
		},
		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			
			
			//该函数用来将后端传来的用0/1代表性别的符合改为对应的用男/女 来表示
			formatter(row, column) {
					return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			
			//获取用户列表函数定义,在上面进行调用//在这里,其被调用于该组件被挂载之后
	    getUser: function(){
	    		////数据加载的缓存加载页面:默认设置为false:::当数据开始请求的时候,让其显示出来
					this.loading = true;
	        axios.get('/api/userlist').then((res) => {
//	        	console.log(res)
	        	//请求过来的数据是放到函数的参数中的,
	        	//将数据赋值给这里的相关参数
	        	this.tableData = res.data.users;
	        	//当数据加载完毕,继续让其消失
	        	this.loading = false;
	         	//this.userLists = res.data.users;
	        });
	    },
	    
	    //性别显示转换:::相关函数
	    formatSex: function (row, column) {
	        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
	    },
	    
	    
		},
	}
	//export default {
	//name: 'HelloWorld',
	//data () {
	//  return {
	//    msg: 'Welcome to Your Vue.js App'
	//  }
	//}
	//}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.userlist {
		margin-left: 10px;
	}
	
	.miaobaoxie {
		margin-top: 20px;
		margin-bottom: 20px;
		line-height: 30px;
		font-size: 30px;
	}
	
	.search {
		margin-bottom: 20px;
	}
</style>