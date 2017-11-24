Vue.component('comment_content',{
	//2.评论展示组件
	//2.评论展示组件::::该组件是由一个一个评论组成命名为comment_item
	template:`
			<div class="comments">
				<ul>
					<li v-for="item in users">
						<comment_item :item='item' :trans_index='content_index'></comment_item>						
					</li>					
				</ul>
			</div>
		`,
	props:{
		users:{
			type:Array,
		},
		content_index:{
			type:Number,
			default:0
		}
	},
	data:function(){
		return{
			toggle:true,
			
		}
	},
})
