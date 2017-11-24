// 存取localstorage中的数据
var store = {
	save(key,value){
		//stringify()用于从一个对象解析出字符串
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		//JSON.parse用于从一个字符串中解析出json对象
		return JSON.parse(localStorage.getItem(key)) || [];
	}
};
//取出list中所有的值
var list = store.fetch("listData");
var filter = {
	all:function(list){
		return list;
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isChecked;
		});
	},
	unfinished:function(list){
		return list.filter(function(item){
			return !item.isChecked;
		});
	}
};
var v = new Vue({
	el:".main",
	data:{
		list:list,
		newTodo:"", //新建任务框文本
		editItem:'', //记录正在编辑的任务项
		beforeTitle:'', //记录正在编辑的数据的title
		visibility:"all"  //通过这个属性值的变化对数据进行筛选
	},
	computed:{
		noCheckedLength:function(){
			return this.list.filter(function(item){
				return !item.isChecked;
			}).length;
		},
		filterList:function(){
			//三种情况： all  finished  unfinished 
			return filter[this.visibility] ? filter[this.visibility](this.list) : this.list;
		}
	},
	watch:{
		list:{//监控list属性，当属性对应的值发生变化就会执行函数
			handler:function(){
				store.save("listData",this.list);
			},
			deep: true   //深度监控
		}
	},
	methods:{
		addTodo(pram,ev){ //添加任务
			//向list中添加一项任务
			//事件处理函数中的this指向的是当前这个Vue根实例
			//能不驱动DOM尽量不驱动DOM，以纯数据来驱动视图
			if(this.newTodo != ''){
				this.list.push({
					title: this.newTodo,
					isChecked: false
				});
				this.newTodo = '';
			}
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
	//自定义指令
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

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	v.visibility = hash;
};

watchHashChange();

window.addEventListener("hashchange",watchHashChange);









