<template>
	<div>我是user
		<div class="user-list">
			<router-link style = "padding:0px 20px;" :to = "'/user/'+item.tip+'/'+item.id" v-for = "(item, index) in userList" :key = "index">{{item.userName}}</router-link>
			<div v-if = "userInfo.userName">
				<p>姓名： {{userInfo.userName}}</p>
				<p>性别： {{userInfo.sex}}</p>
				<p>爱好： {{userInfo.hobby}}</p>
			</div>
		</div>	
		<div class="info-list">
			<!--<router-link to = "?info=follow" exact>我的关注</router-link>
			<router-link to = "?info=share" exact>我的分享</router-link>-->
			<router-link exact :to="{path:'' , query:{info:'follow' , 'abc': '123'}}">我的关注</router-link>
			{{$route.query}}
		</div>
	</div>
</template>

<script>
let data = [
        {
            id:1,
            tip:'vip',
            userName:"leo1",
            sex:'男',
            hobby:'写代码'
        },
        {
            id:2,
            tip:'common',
            userName:"leo2",
            sex:'男',
            hobby:'唱歌'
        },
        {
            id:3,
            tip:'vip',
            userName:"leo3",
            sex:'男',
            hobby:'读书'
        }
    ];
	export default{
		data(){
			return {
				userList: data,
				userInfo:{}
			};
		},
		watch:{
			$route(){
				//console.log(this.$route.params.userId);
				//路径发生变化，$route 会重新赋值，监控了这个属性，监控了这个属性，会执行这个函数
				this.getData();
			}	
		},
		created(){
			//渲染这个组件会调用一次这个生命周期函数
			//复用这个组件，这个函数不会被再次被调用了
			//地址一旦发生变化，$route会重新生成一个路由信息对象
			this.getData();
	 	},
		 methods:{
		 	getData(){
		 		let id = this.$route.params.userId;
					if(id){
						this.userInfo = this.userList.filter((item)=>{ 
							return item.id == id; 
						})[0];
					}else{
						this.userInfo = {};
					}
			  		console.log(this.$route.params);
				}
		 	}
		}
</script>

<style>
</style>