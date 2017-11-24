<template>
	<div class="alert " :class='type'>
		<div class="close" v-if="closeable">&times;</div>
		{{type}}
		<slot></slot>
	</div>
</template>

<script>
	export default{
		props:{
			type:{
				type:String,
				default:function(){
					return 'info'
				},
			},
			closeable:{
				default:function(){
					return false
				},
			}
		}
	}
</script>

<style >
	
	.alert{
		width:500px;
		height: 100px;
		border: 1px solid red;
		margin: 10px;
	}
	.close{
		font-size: 30px;
		float: right;
		background: #ccc;
	}
	.info{
		background:indianred;
	}
	.warning{
		background:yellowgreen;
	}
	.success{
		background:blanchedalmond;
	}
	.error{
		background:gold;
	}
</style>