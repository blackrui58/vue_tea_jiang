<template>
	<div class="articlelist">
		<!--面包屑部分-->
		<el-breadcrumb separator="/" class='miaobaoxie'>
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/article/list' }">文章管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/article/list' }">文章列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--面包屑部分:::end-->

		<!--搜索部分-->
		<el-row class='search'>
			<el-col :span='4'>
				<el-input v-model="filterText" placeholder="请输入内容"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type="primary" @click = "filterM">查询</el-button>
			</el-col>
			<el-col :span='2'>
				<!--<el-button type="primary">新增</el-button>-->
				<!--<el-button type="primary" @click="dialogTableVisible = true">新增</el-button>-->
				<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
				<!--<el-button type="primary" >新增</el-button>-->
			</el-col>
		</el-row>
		<!--搜索部分:::end-->
		
		
		

		<!--带多选的部分-->
		<!--文章表格:::正式部分-->
		<!--handleSelectionChange-->
		<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" align='center' v-loading='loading'>
			<!--1.多选框-->
			<el-table-column type="selection" width="55">
			</el-table-column>
			<!--2.默认序列-->
			<el-table-column type="index" width="55">
			</el-table-column>
			<!--3.旋转按钮::里面显示文章内容-->
			<el-table-column type="expand" width="55" prop="text">
				 
			  
				  <template scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="文章内容">
			            <span>{{ props.row.description}}</span>
			          </el-form-item>
			         
			        </el-form>
			      </template>
			</el-table-column>
			<!--4.书名-->			
			<el-table-column prop="name" label="书名" align='center'>
			</el-table-column>
			<!--5.作者-->
			<el-table-column prop="author" label="作者" width="120" align='center'>
			</el-table-column>
			<!--6.出版日期-->
			<el-table-column prop="publishAt" label="出版日期" width="180" align='center'>
				
			</el-table-column>
			
			<!--7.操作-->
			<el-table-column label="操作" align='center'>
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			
		</div><!--带多选的部分-->




		
		
		
		<!--添加文章:::dialog框-->
		<el-dialog title="添加文章" :visible.sync="dialogFormVisible">
		  <!--form表单部分-->
		  <el-form :model="addform" ref='addForm'>
			  	<!--1.书名-->
			    <el-form-item label="书名" :label-width="formLabelWidth">
			      <el-input v-model="addform.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <!--2.作者-->
			    <el-form-item label="作者" :label-width="formLabelWidth">
			      <el-input v-model="addform.author" auto-complete="off"></el-input>
			    </el-form-item>
			    <!--3.出版日期-->
			    <el-form-item label="出版日期" :label-width="formLabelWidth">
			    	 <el-date-picker type="date" placeholder="选择日期" v-model="addform.publishAt" style="width: 100%;"></el-date-picker>
			      
			    </el-form-item>
			    <!--4.本书内容-->
			    <el-form-item label="本书内容" :label-width="formLabelWidth">
			      <el-input type="description" v-model="addform.text"></el-input>
			    </el-form-item>
		  </el-form>
		  <!--取消||确定部分-->
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addBooks">确 定</el-button>
		  </div>
		</el-dialog><!--添加文章:::dialog框:::end-->
		
		
		
		<!--编辑编辑编辑文章:::dialog框-->
		<el-dialog title="编辑文章" :visible.sync="editDialogFormVisible">
		  <!--form表单部分-->
		  <el-form :model="addform" ref='editForm'>
			  	<!--1.书名-->
			    <el-form-item label="书名" :label-width="formLabelWidth">
			      <el-input v-model="addform.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <!--2.作者-->
			    <el-form-item label="作者" :label-width="formLabelWidth">
			      <el-input v-model="addform.author" auto-complete="off"></el-input>
			    </el-form-item>
			    <!--3.出版日期-->
			    <el-form-item label="出版日期" :label-width="formLabelWidth">
			    	 <el-date-picker type="date" placeholder="选择日期" v-model="addform.publishAt" style="width: 100%;"></el-date-picker>
			      
			    </el-form-item>
			    <!--4.本书内容-->
			    <el-form-item label="本书内容" :label-width="formLabelWidth">
			      <el-input type="textarea" v-model="addform.description"></el-input>
			    </el-form-item>
		  </el-form>
		  <!--取消||确定部分-->
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editDialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editSubmit">确 定</el-button>
		  </div>
		</el-dialog> 
			
		<!--编辑编辑编辑文章:::dialog框:::end-->

		<!--批量删除及页码-->
		<el-row>
			<el-col :span='12'>
				<!--当点击该按钮的时候,运行batchDeleteBook函数-->
				<!--当this.sels.length == 0的时候,即没有选中的文章的时候,该标签禁用-->
				<el-button type="danger" @click = "batchDeleteBook" :disabled="this.sels.length == 0">批量删除</el-button>
			</el-col>
			
			<el-col :span='12'>
				<div class="block">
					<el-pagination layout="prev, pager, next" :total="total" @current-change="getBooks">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<!--批量删除及页码:::end-->
	</div>
	
</template>

<script>
	//将该模块引入,赋值给变量Books,获取了里面的数据
	//这种方式获取的是固态数据,----而我们尽量要模拟真实的前后端配合的状态,从接口请求数据
//	import Books from '../../data/DataBook.js';
	
	//引入该axios模块,专门用来进行类似ajax请求
	import axios from 'axios'
	
	export default {
		data() {
			return {
				input: '',
				tableData:[] ,
				loading:false,
		        multipleSelection: [],
		        //过滤器输入框内容
		        filterText:'',
		        
				//添加文章dialog相关的数据:::该dialog默认为隐藏,dialogFormVisible属性控制其是否显示
		        dialogFormVisible: false,
		        
		        addform: {
		          name: '',
		          author:'',
		          publishAt:'',
		          description:'',
		        },
		        formLabelWidth: '120px',
		        
		        //编辑文章dialog相关的数据::::该editDialogFormVisible显示该[编辑]的dialog是否显示
		        editDialogFormVisible:false,
		        
		        
		        //多选文章列表的数组汇总
		        sels:[],
		        
		        
		        //分页的相关数据
		        total:10,
		        page:1,
			}
		},
		//钩子函数:::挂载之后执行
		mounted(){
			//当页面加载之后,执行从接口请求数据的函数
			//该函数名是自己定义的,在函数中进行定义,这里仅仅是调用该函数//是为了函数更好的复用
			this.getBooks()
		},
		//相关方法
		methods: {
			//目前删选功能还尚未实现:::::未实现
			filterM(){
				var filterText = this.filterText;
					console.log(filterText)
					var filterArr = newArr.filter(function(ele){
						console.log(ele.name)
//						console.log(ele.name.includes( filterText ))
//						console.log(ele.name.includes( '郭' ))
//						s.includes('o') // true
						if(ele.name.includes( filterText )){
							console.log(ele)
							return ele
						}
						this.tableData = filterArr;
//						return ele.name.includes( filterText )
					})
//					console.log(filterArr)
//		      		this.tableData = newArr;
			},
			getBooks(pageee){
				//当没有选定页数的时候,默认其为1
				this.page = pageee || 1;
		      	//在获取数据之前,让页面显示正在加载的显示,所以这里设置相关的变量
		      	this.loading = true;
		      	//用axios来进行ajax请求
		      	axios.get('/api/articlelist').then((res)=>{
//		      		console.log(res.data.books)
					//对前端接收的数据进行相关的截取处理,从而制造分页的效果
//					console.log(this.page)
					this.total = res.data.books.length;
			        var start = (this.page -1)*10;
			        var end = start + 10;
			        var tend = end>this.total ?this.total : end;
			        var newArr = res.data.books.slice(start,end);
//			        this.books = newArr;
		      		//res.data.变量名  -->获取到后台传递过来的数据
		      		//将后台传递过来的数据赋值给自定义的变量
//		      		this.tableData = res.data.books
					
//					console.log(filterArr)
		      		this.tableData = newArr;
		      		
		      		this.loading = false;
		      	})
		      },
			//当表格selection-change事件发生的时候所运行的方法
			//该事件表示为:::当其中的任意一条选择项发生改变的时候触发   该   事件
			selsChange(sels){
				//参数sels是一个数组,数组的每一项代表一条状态改变的对象的信息对象
				//将该值赋值到data对象中去,方便后续的调用于处理
	       		this.sels = sels;				
			},
			//批量删除函数
			
			batchDeleteBook: function () {
				//this.sels.map(item => item.id) -->该函数是将sels数组进行处理,即取出sels数组中每个元素的id值,从新组成一个新的数组,
				//将该数组转换为一个字符串
		        var ids = this.sels.map(item => item.id).toString();
		        console.log(ids);
		        this.$confirm('确认删除选中记录吗？', '提示', {
		          type: 'warning'
		        }).then(() => {
		        	//当点击[确认]按钮的时候
		        	
		        	//页面加载显示为true
		          this.loading = true;
		          
		          let para = {ids: ids};
		          axios.get('/book/batchdelete',{params: para}).then((res) => {
		            this.loading = false;
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            //当想后台传递了删除指定元素的请求后,再次重新获取相关数据,也就是被处理过之后的数据
		            this.getBooks();
		          });
		        }).catch(() => {
		
		        });
		    },
		    //批量删除函数:::::end
		    
		    
		    
				//图书编辑相关代码--->仅仅将编辑框显示并将原来内容添加到编辑框中
				handleEdit(index, row) {
					//将相关的dialog显示
					this.editDialogFormVisible = true;
//					console.log(index, row);
					//从后台获取指定id的内容,隐射到该弹出框里面
					this.addform = row;

					//执行下面的函数
					
					
				},
				
				editSubmit: function () {
			        this.$refs.editForm.validate((valid) => {
//			        	console.log(valid)
			          if (valid) {
			            this.$confirm('确认提交吗？', '提示', {}).then(() => {
			            //这里写的代码是运行点击[确定]按钮之后要运行的代码
			              //页面加载画面显示为true
			              this.loading = true;
			              //NProgress.start();
			              
			              //这里就和添加数据一样,编辑数据不过是删除一条数据同时又添加一条新的数据进去
			              console.log(this.addform)
			              let para = Object.assign({}, this.addform);
//			              console.log(para.publishAt);
						//这里对时间进行一定的处理
			             var cDate = new Date(para.publishAt);  
						para.publishAt = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate()
//			              para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
						console.log(para)
			              axios.get('/book/edit',{params: para}).then((res) => {
			                this.loading = false;
			                this.$message({
			                  message: '提交成功',
			                  type: 'success'
			                });
			                
			                //这里应该是重置了一下
			                this.$refs['editForm'].resetFields();
			                
			                //将编辑框隐藏了
			                this.editDialogFormVisible = false;
			                //在重新获取一次数据
			                this.getBooks();
			              });
			            });
			          }
			        });
			    },

				
				
				//还缺分页代码
				
				
				
				//新增图书相关函数
				addBooks(){
					//该dialogFormVisible属性来控制该dialog是否显示
					this.dialogFormVisible = false;
				
				
			        this.$refs.addForm.validate((valid) => {
			        	
			        	//valid是bollean,代表验证是否通过
			        	
			        	
			          if (valid) {
//			          	console.log('进来了')
			            this.addLoading = true;
//						console.log(this.addform);//这里的addform就是form表单的所有选项的值::是一个对象
						//下面的操作将一个观察这模式的对象通过浅复制,获取可变量的属性组成的对象
			            let para = Object.assign({}, this.addform);
//			            console.log(para);
			            //这里获取的事件为那种原始化的数据,而我们需要的是经过处理的仅仅显示日期的时间
			            //这里缺乏相关的函数-->就是对时间对象进行相关的处理
//			            para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
						var cDate = new Date(para.date);  
						para.date = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate()
						//现在开始请求相关的接口-->即添加文章的接口
						//有相关的接口和参数数据
			            axios.get('/book/add',{params: para}).then((res) => {
			              this.addLoading = false;
			              this.$message({
			                message: '提交成功',
			                type: 'success'
			              });
//			              this.$refs['addForm'].resetFields();
//			              this.addFormVisible = false;
			              this.getBooks();
			            });
			          }
			        });
			   },
	      		//以上为新增图书相关的代码函数
	      
				
				
				
				////删除某一个文章的函数
				handleDelete(index, row) {
					//因为删除操作的敏感性,所以在执行删除操作之后,还需要再一次确实是否真正执行删除操作,从而避免了用户的误操作
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	//点击[确定]的部分执行的操作
			        	this.loading = true
			        	//此时-->访问后端的删除接口,让后端执行相关操作,接收后端传递过来的相关数据来进行各种操作,并重新从后端获取文章数据
			        	let para = {id:row.id}
			        	axios.get('/book/delete',{params:para}).then((res) => {
			        		this.loading = false,
					        this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        //这是已经删除成功,再次实现获取操作//从后台获取到处理过的数据
					        this.getBooks();
			        	})
			          
			        }).catch(() => {
			        	//点击[取消]的部分执行的操作
			        	
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
//					console.log(index, row);
				},
			  toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		      },
		      handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		      
		      //
		      
		      
		      
		},
	}
</script>

<style scoped>
	.articlelist {
		margin-left: 10px;
	}
	
	.miaobaoxie {
		margin-top: 20px;
		margin-bottom: 20px;
		line-height: 30px;
		font-size: 30px;
	}
	
	.search {
		margin-bottom: 20px;
	}
</style>