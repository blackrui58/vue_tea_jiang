<template>
	<div>
		<!--头部-->
		<h1>{{head}}</h1>
		<!--身体数据,--外部传入-->
		<!--<slot name="body"></slot>-->
		
		<slot></slot>
		<!--尾部数据-->
		<div >
			<button @click="ok_click">{{confirm}}</button>
			<button @click="no_click">{{cancel}}</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'mod',
		methods:{
			ok_click:function(){
				this.$emit('ok_click')
			},
			no_click:function(){
				this.$emit('no_click')
			},
		},
			
		props:{
			head:{
				type:String,
				default:function(){
					return '子标题'
				},
			},
			confirm:{
				type:String,
				default:function(){
					return '确定'
				},
			},
			cancel:{
				type:String,
				default:function(){
					return '取消'
				},
			},
			
		},
	}
			
</script>

<style>
</style>