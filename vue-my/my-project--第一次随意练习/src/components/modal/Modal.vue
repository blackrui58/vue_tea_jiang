<template>
	<div >
		modal::::模态框部分:::
		<modal @no_click='no_click' @ok_click='ok_click' :head = 'header' :confirm = 'confirm' :cancel = 'cancel' >
			<div>{{default_text}}</div>
		</modal>	
		<modal @no_click='no_click' @ok_click='ok_click' :head = 'header' :confirm = 'confirm' :cancel = 'cancel' >
			<div>{{default_text}}</div>
		</modal>
	</div>
</template>

<script>
	import modal from './modal_component'
	export default{
		components:{modal},
		name:'Modal',
		data:function(){
			return{
				header:'子组件标题',
				confirm:'确定',
				cancel:'取消',
				default_text:'消息主体内容',
			}
		},
		methods:{
			ok_click(){
				console.log('点击了确定按钮')
			},
			no_click(){
				console.log('点击了取消按钮')
			}
		}
	}
</script>

<style>
</style>