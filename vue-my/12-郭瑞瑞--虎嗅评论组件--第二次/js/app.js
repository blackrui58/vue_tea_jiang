

//实例化VUE
	var vm = new Vue({
		el:'#app',
		data:{
			users,
		},
		computed:{
			
		},
		methods:{
			post_data:function(textarea_content){
//				console.log(textarea_content)//数据从子组件传递过来验证通过
				var obj = {
					name:'Alex',
					content:`${textarea_content}`	
				}
//				console.log(obj)//数据验证通过
				//将该obj数据--插入到数组中
				this.users.unshift(obj)
				console.log(this.users)
			}
		}
		
	})