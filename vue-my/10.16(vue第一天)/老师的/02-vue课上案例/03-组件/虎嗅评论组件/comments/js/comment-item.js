

Vue.component("comment-item", {
	data() {
		return {
			editingMessage: false,
			toggle:true
		};
	},
	template: `<div class = "comment-item">{{incrementCount}}
				<button @click = "toggleBtn">toggle</button>
				<div class = "pl-form-author">
					<img class = "round author-face" :src="list.imgUrl" alt="" />
					<span class = "author-name">{{list.userName}}</span>
					<span class = "time">{{list.postTime}}</span>
				</div>
							
				<div class = "post-content">{{list.postContent}}</div>
					
				<comment  v-if = "toggle" :increment-count = "incrementCount" :list-data = "list.subComments"  :userinfo = "userinfo"></comment>
				
				<div class = "post-content">
					<div class = "post-left">
						<i v-if = "incrementCount == 1" class="icon icon-dp"></i>
						<button  class = "link" :class = "{dianping: incrementCount == 1}" @click = "replyMessage">{{replyTitle}}</button>
					</div>
					<post-comment v-show = "editingMessage" :user-data = "userinfo"  @postdata = "newComment" :show-user = "false"  ></post-comment>
					<div v-if = "incrementCount == 1" class = "post-right">
						<i class="icon icon-like" @click = "goodClick(index)"></i><span>{{list.good}}</span>
						<i class="icon icon-no-like" @click = "badClick(index)"></i><span>{{list.bad}}</span>
					</div>
				</div>						
			</div>`,
	props: {
		list: {
			type: Object,
			require:true
		},
		userinfo: {
			type: Object,
			required: true
		},
		incrementCount:{
			type: Number,
			default: 0
		}
	},
	methods: {
		toggleBtn(){
			this.toggle = !this.toggle;
		},
		newComment(v) {	
			this.editingMessage = false;
			console.log(v);
			if(this.list.subComments ){
				//console.log('已经存在子评论');
				this.list.subComments.push(v);
			}else{
				//console.log('没有任何子评论');
				Vue.set( this.list,'subComments',new Array(v)); //必须用Vue内置的方法进行属性的添加或删除
				//this.list.subComments = new Array(v);
			}
			
			
						
		},
		goodClick(i){
			this.$emit("good", i);
		},
		badClick(i, v){
			this.$emit("bad", i);
		},
		replyMessage() {
			this.editingMessage = !this.editingMessage;
		}
	},
	computed: {
		replyTitle(){
			if(this.incrementCount == 1){
				return '我要点评';
			}
			else{
				return '回复';
			}
		},
		stylePadding() {
			return {
				'padding-left': this.incrementCount * 25 + 'px'
			}
		}
	}

});