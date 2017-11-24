Vue.component("postComment", {
	data() {
		return {
			postContent: "",
			errorMessage: false
		};
	},
	template: `
					<div class = "post-box">
						<div class = "post-header" v-if = "showUser" >
							<span class="span-mark-author active">发表评论</span>
							<div class = "pl-form-author">
								<img class = "author-face" :src="userData.imgUrl" alt="" />
								<span class = "author-name">{{userData.userName}}</span>
							</div>
						</div>
						<div class = "pl-form-box">
							<textarea class = "form-control" placeholder="客官，8个字起评，不讲价哟" v-model = "postContent"></textarea>
						</div>
						<div v-if = "errorMessage" class = "error-message" >客官，8个字起评，不讲价哟</div>
						<button class="btn btn-article" @click = "postMessage">发表</button>
					</div>
				`,
	props: {
		userData: {
			type: Object,
			required: true
		},
		showUser: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		postMessage() {
			if(this.postContent.trim().length < 8) {
				this.errorMessage = true;
				//最好是用箭头函数
				setTimeout(() => {
					this.errorMessage = false;
				}, 2000);
			} else {
				var obj = {
					imgUrl: this.userData.imgUrl,
					userName: this.userData.userName,
					postTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
					postContent: this.postContent.trim(),
					good:0,
					bad:0
				};
				this.postContent = "";
				this.$emit("postdata", obj);
			}
		}
	}
});