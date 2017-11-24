Vue.component('comment_item',{
		template:`
				<!--仅仅就是一条一级评论的组件-->
				<div class="content" >
					{{item_index}}
					
					<div class="head">
						<span class="icon"><img src="images/1.jpg" alt="" /></span>
						<span class="name">{{item.name}}</span>
						<span class="date">2017-8-17</span>
						<span class='contractive sanjiao' @click='contractive' :class="{'isshow':isshow}"></span>{{isshow}}
					</div>
					<div class="context">
						{{item.content}}
					</div>
					<div class="gocomment">
						<button class='mygocom' @click="toggle" v-show='item_index === 1'>我要点评</button>
						<button class='mygocom' @click="toggle" v-show='item_index !== 1'>回复</button>
						<span @click="addzan">顶{{zan}}</span>						
						<span @click="jianzan">踩{{zan}}</span>
					</div>
					
					<!--发表评论总框的组件引用:::也就是对父组件的反引用,从而实现数据的多层加载-->
					<comment_content :users='item.children' :content_index='item_index' v-show = 'isshow'></comment_content>
					<!--发表评论的组件引用-->
					<post_comment v-show='toggle_post' :item_index='item_index' @post_data='post_data'></post_comment>
				</div>
			
		`,
		props:{
			item:{
				type:Object,
				
			},
			trans_index:{
				type:Number,
//				default:function(){
//					return 
//				}
			}
		},
		data:function(){
			return{
				toggle_post:false,
//				item_index:1
//				now_content_index:item_index
				isshow:false,
				zan:0,
			}
		},
		computed:{
			item_index:function(){
				return this.trans_index + 1;
			},
			
		},
		methods:{
		
			toggle:function(){
				this.toggle_post = !this.toggle_post;
			},
			post_data:function(textarea_content){
				//替换相关数据
				var obj = {
					name:'Alex',
					content:`${textarea_content}`	
				}
				//若该组件的所在层次已经有了子元素,也就是有了一个子元素数组,只需要往这个数组后追加内容
				//若刚开始没有子元素,也就是没有相关数据,那么往数组追加数据的方法就会失败
				//所以就需要对该子元素层次进行一个判断
				//若没有子元素,就给其添加一个子元素,为一个空数组,有了数组,就可以往里面添加数据了
				
				if(this.item.children){
					//此时,元素有子元素
					this.item.children.push(obj)
				}else{
					//此时,没有子元素和数组
					//创建一个子元素数组
					Vue.set(this.item,'children',[])
//					this.item.children = [];
					//当有数组之后,往里面添加数据
					this.item.children.push(obj)
				
				}
			},
			//收缩函数
			contractive:function(){
				this.isshow = !this.isshow;
				
			},
			addzan:function(){
				this.zan++
			},
			jianzan:function(){
				this.zan--
			}
		}
	})