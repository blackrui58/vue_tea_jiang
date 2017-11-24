import Vue from 'vue'

export default Vue.filter('filt',function(arr,cont){
	return arr.filter(function(ele){
		ele.includes(cont)
	})
})


