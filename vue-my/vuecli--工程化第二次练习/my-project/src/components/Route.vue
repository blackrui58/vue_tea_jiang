<template>
	<div class="clear toperji">
		<!--Router:::路由部分-->
		<div class="luyouerji clear">
			<router-link to='/route/modal' tag='li' class='erji'>模态框</router-link>
			<router-link to='/route/alert' tag='li' class='erji'>提醒框件</router-link>
			<router-link to='/route/huxiu' tag='li' class='erji'>虎嗅评论</router-link>
		</div>
			
		<router-view class='erjiview'></router-view>
		
	</div>
</template>

<script>
	export default{
		name:'Route'
	}
</script>

<style>
	.clear:after{
		content: '';
		display: block;
		clear: both;
	}
	.toperji{
		width: 100%;
	}
	.luyouerji{
		float: left;
		width: 100px;
	}
	.erji{
		float: none;
		margin-bottom: 40px;
		/*width:60px;*/
	}
	.erjiview{
		float: right;
		width: 1400px;
		height: 300px;
		background: blanchedalmond;
		opacity: 0.5;
	}
</style>