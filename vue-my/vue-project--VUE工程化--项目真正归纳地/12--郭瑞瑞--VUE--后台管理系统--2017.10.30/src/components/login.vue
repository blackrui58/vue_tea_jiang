<template>
  <div class="login">
    <h3>系统登录</h3>
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-input v-model="ruleForm.name" placeholder="请输入用户名" class="gf"></el-input>
	    <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码" class="gf"></el-input>
    <el-checkbox v-model="checked">记住密码</el-checkbox>
    <el-button type="primary" @click="submitForm()" class="lk">登录</el-button>
  </el-form>
  


  </div>
</template>

<script>
export default {
  name:'login',
  data() {
    return{
    	ruleForm:{
    		name:'guorui',
    		pass:'jiahui',
    	},
    	checked:false,
    	
    }
  },
  methods: {
  		//当用户名或密码错误时执行该函数,所以在这里定义函数,在相关的地方调用该函数
  	 openAlert() {
        this.$message.error('用户名或密码错误');
     },
      submitForm() {
      	
//    	 console.log(this.$router)
//       //当点击之后,检测记住密码选框是否勾选,若勾选,将该信息存储为一个sessionStorage
//       if(this.checked === false){
//       	console.log('false')
//       }else{
//       	//这里是勾选了//所以要存储为sessionStorage
//       	sessionStorage.setItem('sessionStorageName',JSON.stringify(this.ruleForm))
//       	console.log('true')
//       }
//       this.$router.push('/user/list')

				//第二次重构写法
				//当账号和密码是guorui和jiahui的话,就正确,
				if(this.ruleForm.name == 'guorui' && this.ruleForm.pass == 'jiahui'){
					console.log('dengl')
					//当用户名和密码正确之后,将其值存储在一个sessionStorage中,从而可以在其他页面获取到该用户是否已经登录
					//因为不论数据库还是前端中的cookie,localStorage,sessionStorage,还是存储在服务器端的session,都应该为字符串格式,//需要将数组,json等对象格式的转换为字符串
					this.ruleForm = JSON.stringify(this.ruleForm)
					sessionStorage.setItem('userinfo',this.ruleForm)
					
					//让页面跳转到后台首页
					this.$router.push('/')
				}else{
					//这里是用户名或密码错误,弹出一个警示框
					console.log('用户名或密码错误')
					this.openAlert()
					//当密码错误的时候,清除userinfo
					sessionStorage.removeItem('userinfo')
					
				}
      },
     
	}
}
</script>

<style>
h3{margin:30px 0;text-align:center;}
.login{width:340px;height:340px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;box-shadow:0 0 20px 0px black;padding:0 50px;}
.gf{margin:10px 0;}
.el-checkbox{float:left;margin:5px 0;}
.el-checkbox__label{position:relative;top:-2px;}
.lk{clear:both;width:100%;position:relative;top:30px;}
</style>