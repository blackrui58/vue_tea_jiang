	/////该模块的作用是模拟一个后端接口,并提供相关的数据,
	//从而彻底实现前后端的分离
	
	
	
	//引入axios该模块,用来进行
	import axios from 'axios'
	//引入axios-mock-adapter::用来虚拟出来一个类似于网络接口的框架
    import MockAdapter from 'axios-mock-adapter'
    //引入相关的数据,从该组件中,在该组件中,模拟生成了相关的数据
    import Users from '../data/DataUser'
    //这里获取的Books是一个常量,不能改变,---->若想对其进行相应的操作,进行改变,就需要将其赋值给一个其他变量
    import Books from '../data/DataBook'
	var _books = Books
	
    export default {
    	////声明了一个函数
    	init(){
    		////实例化了一个axios-mock-adapter对象,而MockAdapter不过是axios-mock-adapter对象的一个变量值////相关赋值在上面写过了
    		 let mock = new MockAdapter(axios);
    		 // 获取用户列表
    		 
    		 ////虚拟一个get接口,方法就是onGet()方法,接口为'/api/userlist'
    		 ////reply::答复的意思
    		 mock.onGet('/api/userlist').reply(config => {
    
    		 	return new Promise((resolve, reject) => {
    		 		////延迟500毫秒
    		 		setTimeout(() => {
    		 			//返回的结果是一个数组,第一个选项是一个状态码,第二个选项是一个数组
    		 			//其中users: Users  是将上面从其他组件引入进来的数据Users赋值给这里的变量users
    		 			resolve([200, {
    						users: Users
    		 			}])
    		 		}, 30)
    		 	})
    		 });
    		 
    		 
    		 //模拟另一个后端接口//
    		 //函数说明:当请求'/api/articlelist'的时候,1000毫秒之后返回一个数组,第一个选项代表状态码,第二个选项代表返回的数据
    		 mock.onGet('/api/articlelist').reply(config=>{
    		 	return new Promise((resolve,reject)=>{
    		 		//设置一个延迟函数
    		 		setTimeout(()=>{
    		 			resolve([200,{
    		 				books:_books
    		 			}])
    		 		},30)
    		 	})
    		 })
    		 
    		 //删除文章接口
    		 mock.onGet('/book/delete').reply(config => {
    		 	//这里的config.params获取到的是前端get方式传递过来的参数的集合,是一个对象
    		 	//在这里用了:解构赋值
    		 	let {id} = config.params;
    		 	//用filter函数对数组数据进行了过滤
    		 	//测试前端已经通过该接口获取到了相应的数据---即过滤之后的文章内容
    		 	_books = _books.filter(ele => ele.id!== id);
    		 	//但是删除接口自己的向前传递的数据为以下
    		 	return new Promise((resolve,reject) => {
    		 		setTimeout(() => {
    		 			resolve([200,{
    		 				code:200,
    		 				msg:'删除成功',
    		 			}])
    		 		},100)
    		 	})
    		 	
    		 })
    		 
    		 //新增图书的模拟接口
    		 
			    mock.onGet('/book/add').reply(config => {
			    	
			    	let {
			    		name,
			    		author,
			    		date,
			    		text,
			    	} = config.params
			    	//console.log(config.params)
			    	_books.unshift({
			    		name: name,
			    		author: author,
			    		description: text,
			    		publishAt: date,
			    	})
			    	return new Promise((resolve, reject) => {
			    		setTimeout(() => {
			    			resolve([200, {
			    				code: 200,
			    				msg: '新增成功'
			    			}])
			    		}, 50)
			    	})
			    });
			    
			    
			//编辑图书接口
			mock.onGet('/book/edit').reply(config => {
		    	let {
		    		id,
		    		name,
		    		author,
		    		description,
		    		publishAt
		    	} = config.params
		    	
		    	//some函数//
		    	// JavaScript数组some()方法测试数组中的某个元素是否通过由提供的功能来实现测试。
		    	_books.some(u => {
		    		if(u.id === id) {
		    			u.name = name
		    			u.author = author
		    			u.description = description
		    			u.publishAt = publishAt
		    			return true
		    		}
		    	})
		    
		    	return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '编辑成功'
		    			}])
		    		}, 50)
		    	})
		    });
			//编辑图书接口:::end
			
			//图书[批量删除]删除接口设计
			mock.onGet('/book/batchdelete').reply(config => {
				//config.params接收的是前端传递过来的参数信息//将其进行结构赋值,从而方便进行数据处理				
		    	let {
		    		ids
		    	} = config.params
		    	ids = ids.split(',')
		    	//对_books数据进行一个处理-->通过filter函数来将前端传递过来的id值得数据给过滤掉
		    	
		    	//这里的u作为filter函数的第一个参数,代表的是_books的所有数据单个数据
		    	_books = _books.filter(ele => !ids.includes(ele.id))
//		    	_books = _books.filter(u => !ids.includes(u.id))
		    	return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '删除成功'
		    			}])
		    		}, 50)
		    	})
		    });
		    //图书[批量删除]删除接口设计:::end
    		 
    	}
    }