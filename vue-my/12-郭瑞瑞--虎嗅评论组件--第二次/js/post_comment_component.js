//<!--1.发表评论组件-->
Vue.component('post_comment',{
		template:`
		
			<!--发表评论部分-->
			<div class="publish">
				<strong>发表评论</strong>
				<!--警告弹出框部分-->
				<div class="alert" v-show='isshow'>客观,8个字起评,不讲价哦</div>
				
				<div class="head" v-show='item_index == 1'>
					<span class="icon"><img src="images/1.jpg" alt="" /></span>
					<span class="name">Alex</span>
				</div>
				<div class="body">
					<textarea name="" rows="" cols="" placeholder="客观,8个字起评,不讲价哦" v-model='textarea_content'>
						
					</textarea>
				</div>
				<div class="pub" @click="post_data">
					发表
				</div>
			</div>		
		`,
		props:{
			item_index:{
				type:Number,
			}
		},
		data:function(){
			return{
				textarea_content:'',
				//设置警示框是否显示初始数据:为false
				isshow:false,
			}
		},
		methods:{
			post_data:function(){
				if(this.textarea_content.trim().length < 8){
					//将警示框显示
					this.isshow = true;
					//两秒之后,将警示框自己隐藏
					//因为需要这里的this值还是指该定义是的对象,这样箭头函数可以满足这样的要求
					setTimeout(() => {
						this.isshow = false;
					},2000)
				}else{
					//这时,数据满足要求,可以将事件进行向上发送
					this.$emit('post_data',this.textarea_content)
				}
				//当将数据发布之后,将文本框里面的数据清空
				this.textarea_content =''
				
			}
		}
})


	