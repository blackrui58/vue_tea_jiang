

Vue.component("comment", {
	
	template: `<div class = "pl-box-wrap">
					<ul>
						<li  v-for = "(list,index) in listData" :style="[stylePadding]" >
							<comment-item :increment-count = "count" :list = "list" :userinfo = "userinfo" :col = "index"></comment-item>
						</li>
					<ul>
				</div>`,
	props: {
		listData: {
			type: Array,
			default: function() {
				return [];
			}
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
		goodClick(i){
			this.$emit("good", i);
		},
		badClick(i, v){
			this.$emit("bad", i);
		}
	},
	computed: {
		count() {
			var c = this.incrementCount;
			return ++c;
		},
		stylePadding() {
			return {
				'padding-left': this.incrementCount * 25 + 'px'
			}
		}
	}

});