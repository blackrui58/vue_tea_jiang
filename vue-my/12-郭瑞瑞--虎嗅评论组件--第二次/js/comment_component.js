//comment一级组件
Vue.component('comment',{
	//这个评论大组件也是又两个组件组成
	//1.发表评论组件
	//2.评论展示组件
	template:`
		<div>
			<!--1.发表评论组件-->
			<post_comment @post_data='post_data'></post_comment>
			<!--2.评论展示组件-->
			<comment_content :users='users'></comment_content>
		</div>
	`,
	props:{
		users:{
			type:Array,
			
		}
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


