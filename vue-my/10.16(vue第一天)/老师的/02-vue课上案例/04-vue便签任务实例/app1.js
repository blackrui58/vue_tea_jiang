// 存取localstorage中的数据
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
};

var list = [
	{
		title:'打豆豆',
		isChecked:false //是否完成任务状态
	},
	{
		title:'打豆豆',
		isChecked:true
	}
];

new Vue({
	el:".main",
	data:{
		list:list,
		newTodo:"", //新建任务框文本
		editItem:'', //记录正在编辑的任务项
		beforeTitle:'' //记录正在编辑的数据的title
	},
	methods:{
		addTodo(pram,ev){ //添加任务
			//向list中添加一项任务
			//事件处理函数中的this指向的是当前这个Vue根实例
			//能不驱动DOM尽量不驱动DOM，以纯数据来驱动视图
			this.list.push({
				title:this.newTodo,
				isChecked:false
			});
			this.newTodo = '';
		},
		deletePlan(nowItem){ //删除任务
			var index = this.list.indexOf(nowItem);
			this.list.splice(index,1);
		},
		edit(itemData){ //编辑任务
			//编辑任务的时候，记录一下编辑这条任务的title，方便在取消编辑的时候重新赋给
			this.beforeTitle = itemData.title;

			this.editItem = itemData;
		},
		editorOk(){
			this.editItem = '';
		},
		cancelEdit(itemData){ 	//取消编辑任务
			itemData.title = this.beforeTitle;
			this.beforeTitle = '';
			this.editItem = '';
		}
	},
	directives:{
		"focus":{
			update(el,binding){
				if(binding.value == true){
					el.focus();
				}
			}
		}
	}
});













