//注册全局组件comment
//这个组件是评论的最大的组件
	Vue.component('comment',{
		template:`
		<div><!--顶级部分-->
		
		
			<!--发表评论部分::::用组件的方式嵌入-->
			<post_comment  @post_data='post_data' ></post_comment>
			
			<!--评论展示部分::::用组件的方式嵌入-->
			<comment_content :users='users'></comment_content>
			
			
		</div><!--顶级部分-->
		`,
		props:{
			users:{
				type:Array,
				
			}
		},
		data:function(){
			return{
				
			}
		},
		computed:{
			
		},
		methods:{
			post_data:function(textarea_content){
				var obj = {
					name:'Alex',
					content:`${textarea_content}`	
				}

				this.users.unshift(obj)
			}
		}
	})