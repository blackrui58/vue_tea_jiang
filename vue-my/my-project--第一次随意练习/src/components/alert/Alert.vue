<template>
	<div >
		alert::::alert部分::::
		<alert type='info'></alert>
		<alert type='warning'></alert>
		<alert type='success'></alert>
		<alert type='error'></alert>
		<alert type='error' closeable='true'></alert>
		<alert>
			<h1>自己定制的内容</h1>
		</alert>
		<alert></alert>
	</div>
</template>

<script>
	import alert from './alert_component'
	export default{
		components:{
			alert
		},
		
	}
</script>

<style>
	
</style>