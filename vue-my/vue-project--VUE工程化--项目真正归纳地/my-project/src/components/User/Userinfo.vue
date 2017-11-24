<template>
	<div>
		<el-row>
			<el-col :span='8'>
				

				<el-form   label-width="100px" class="demo-dynamic" v-model='formName'>
					<!--1.账号:::部分-->
					<el-form-item label="账号">
						<el-input placeholder="请输入内容" v-model="input1" :disabled="true"></el-input>

					</el-form-item>
					<!--2.昵称:::部分-->
					<el-form-item  :label="'昵称'"  :prop="formName.username" :rules="{
							      required: true, message: '昵称不能为空', trigger: 'blur'
							    }">
						<el-input v-model="formName.username"></el-input>

					</el-form-item>
					<!--3.邮箱:::部分-->
					<el-form-item prop="email" label="邮箱" :rules="[
							      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
							      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
							    ]">
						<el-input v-model="formName.email"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm(formName)">提交</el-button>

					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import Bus from '../../Vuejs/vue'
	
	export default {
		data() {
			return {
				input1: '',
				formName:{
					username:'',
					email:'guoruirui@qq.com',
				},
				
			};
		},
		mounted(){
//			alert('挂载完毕')
			//获取sessionStorage
			var userinfo = JSON.parse(sessionStorage.getItem('userinfo')) 
			this.username = userinfo.name;
		},
		methods: {
			submitForm(formName) {
//				//当更改用户名和邮箱之后,将新的值存入sessionStorage中去
//				//console.log(formName.username)
//				var formData = {
//					name:this.formName.username,
//					pass:'jiahui',
//				}
//				var form = JSON.stringify(formData);
//				sessionStorage.setItem('userinfo',form)

				Bus.$emit('changename',this.formName.username)
				
				
			},
			resetForm(formName) {
				
			},
			removeDomain(item) {
				
			},
			addDomain() {
				
			}
		}
	}
</script>

<style>

</style>