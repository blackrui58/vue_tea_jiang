Vue.component('comment_content',{
		template:`
		<div><!--顶级部分-->		
			<!--评论展示部分::::用组件的方式嵌入-->
			<div class="comments">
				<ul>
				
					<li v-for="item in users">
						<comment_item :item='item' :trans_index='content_index'></comment_item>						
					</li>					
				</ul>
			</div>
		</div><!--顶级部分-->
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
		computed:{

		},
		methods:{
		
			
		}
	})