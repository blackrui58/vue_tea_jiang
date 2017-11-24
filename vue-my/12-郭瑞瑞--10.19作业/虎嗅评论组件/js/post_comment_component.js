Vue.component('post_comment',{
		template:`
		
			<!--发表评论部分-->
			<div class="publish">
				<strong>发表评论</strong>
				<!--警告弹出框部分-->
				<div class="alert" v-show='isshow'>客观,8个字起评,不讲价哦</div>
				
				<div class="head">
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
			users:{
				type:Array,
				
			}
		},
		data:function(){
			return{
				textarea_content:'',
				isshow:false,
			}
		},
		computed:{
			
		},
		methods:{
			post_data:function(){
				if(this.textarea_content.trim().length < 8){
					this.isshow = true
					//当警示框弹出之后,两秒之后自动消失
					//因为需要这里的this值还是指该定义是的对象,这样箭头函数可以满足这样的要求
					setTimeout(() => {
						this.isshow = false;
					},2000)
				}else{
					//只有当数据验证通过的时候,才允许向上发射数据
				//console.log(this.textarea_content)//验证通过
				this.$emit('post_data',this.textarea_content)	
				}

				//当将数据发布之后,将文本框里面的数据清空
				this.textarea_content =''
			}
		}
	})
	