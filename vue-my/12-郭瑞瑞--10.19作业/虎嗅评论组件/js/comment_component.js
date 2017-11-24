//注册全局组件comment
	Vue.component('comment',{
		template:`
		<div><!--顶级部分-->
		
		
			<!--发表评论部分::::用组件的方式嵌入-->
			<post_comment  @post_data='post_data'></post_comment>
			
			
			
			<!--评论展示部分-->
			<div class="comments">
				<strong>默认评论</strong>
				<hr />
				<ul>
					<li class="content" v-for="item in users">
						<div class="head">
							<span class="icon"><img src="images/1.jpg" alt="" /></span>
							<span class="name">{{item.name}}</span>
							<span class="date">2017-8-17</span>
						</div>
						<div class="context">
							{{item.content}}
						</div>
						<div class="gocomment">
							<span class='mygocom'></span>
						</div>
					</li>
				</ul>
			</div>
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
//				console.log(textarea_content)//验证通过,数据已经从子组件传递成功
				this.$emit('post_data',textarea_content)
			}
		}
	})