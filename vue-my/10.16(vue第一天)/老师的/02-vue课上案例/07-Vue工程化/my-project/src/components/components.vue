<template>
	<div>
		<h2>评论</h2>
		<ul>
			<router-link to="/components" tag="li" exact>
				<a>评论组件</a>
			</router-link>
			<router-link to = "/components/modal" tag = "li">
				<a>模态框组件</a>
			</router-link>
			<router-link to = "/components/alert" tag = "li">
				<a>提示框组件</a>
			</router-link>
			
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {}
</script>

<style>
</style>