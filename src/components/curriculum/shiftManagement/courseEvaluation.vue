<template>
	<div class="el-curriculum">
		<p style="text-align: left;">课程评价</p>

		<div class="line"></div>

		<el-row :gutter="24" style="margin-top: 4%;">
			<el-col :span="20">
				<el-col :span="6">
					<el-select v-model="sorts" placeholder="全部课程分类" @visible-change="course_Sorts">
						<el-option v-for="item in courseSorts" :key="item.id" :label="item.label" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="teacher" placeholder="全部授课老师" @visible-change="open_teachers">
						<el-option v-for="item in chooseTeacher" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="search">搜索</el-button>
				</el-col>
			</el-col>

			<el-col :span="4" style="text-align: right;">
				<el-button type="text" class="buttonText" @click="deleteKey" v-if="decide == false">删除</el-button>
				<el-button type="text" @click="deletes" v-if="decide == true">删除</el-button>
				<el-button type="text" class="buttonText" @click="cancel" v-show="cancels">取消</el-button>

			</el-col>
		</el-row>

		<el-table :data="tableData" border style="margin-top: 4%;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" v-if="selections"></el-table-column>

			<el-table-column prop="studentNo" label="学号" align="center"></el-table-column>
			<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
			<el-table-column prop="openName" label="课程名称" align="center"></el-table-column>
			<el-table-column label="评价" align="center" width="150">
				<template slot-scope="scope">
					<el-rate v-model="scope.row.evaluate" disabled></el-rate>
				</template>
			</el-table-column>
			<el-table-column prop="categoryName" label="所属一级分类" align="center"></el-table-column>
			<el-table-column prop="teacherName" label="授课老师" align="center"></el-table-column>
			<el-table-column label="是否显示" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.isShow" @change="switchChange($event,scope.row.id)"></el-switch>
					<!--<el-switch v-model="scope.row.isShow" active-value="1" inactive-value="0" @change="switchChange($event,scope.row.id)"></el-switch>-->
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-popover trigger="click" width="400">
						<el-col :span="20" class="pop">
							<img :src="scope.row.avatar" alt="" class="userPic" />
							<span style="margin-left: 2%;">{{scope.row.userName}}</span>
						</el-col>
						<el-col :span="20" class="pop">
							<p>课程：{{scope.row.openName}}</p>
						</el-col>
						<el-col :span="20" class="pop">
							<p>课程所属分类：{{scope.row.categoryName}}</p>
						</el-col>
						<el-col :span="20" class="pop">
							<p v-for="(item,index) in scope.row.teacherName">任课老师：{{item}}</p>
						</el-col>
						<el-col :span="20" class="pop">
							<p>评价：{{scope.row.evaluate}}星</p>
						</el-col>
						<el-col :span="20" class="pop">
							<p>评价内容：{{scope.row.evaluateContent}}</p>
						</el-col>
						<el-button slot="reference" type="text" size="small" class="buttonText">详情</el-button>
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" style="margin-top: 4%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import imgUrl from '@/assets/addr.png'
	export default {
		data() {
			return {
				value:'',
				sorts:'',
				teacher:'',
				selections: false,
				decide: false,
				cancels: false,
				multipleSelection: '',
				currentPage: 1,
				total: 0,
				tableData: [],
				courseSorts: [],
				chooseTeacher: [],
				
			}
		},
		created(){
			this.courseEvaluations();
		},
		methods: {
			courseEvaluations: function() {
				this.$api.CourseApi.courseEvaluation(this.currentPage, 10, result => {
					console.log(result)
					this.total = result.data.pager.total
					this.tableData = result.data.pager.list;
				})
			},
//			搜索全部课程分类(请求所有课程接口)
			course_Sorts(event){
				if(event == true){
					this.$api.CourseApi.firstCategories(result => {
//						console.log(result)
						this.courseSorts = result.data.pager
					})
				}
			},
//			搜索全部授课老师(请求所有授课老师接口)
			open_teachers(event){
				if(event == true){
					this.$api.CourseApi.open_teachers(result => {
//						console.log(result)
						this.chooseTeacher = result.data.pager.list
					})
				}
			},
//			搜索课程评价
			search(){
				this.search_evaluation();
			},
			search_evaluation(){
				let categoryId = this.sorts;
				let teacherId = this.teacher;
				if(categoryId == ''){
					categoryId = 0
				}
				if(teacherId == ''){
					teacherId = 0
				}
				this.$api.CourseApi.openEvaluates(this.currentPage,10,categoryId,teacherId,result => {
					if(result.success == true){
						if(result.data.pager != null){
							this.total = result.data.pager.total;
							this.tableData = result.data.pager.list;												
						}else{
							this.tableData = [];
							console.log(this.tableData)
						}
					}else{
						
					}
				})
			},
			//多选框选中的值
			handleSelectionChange(val) {
//								console.log(val)
				this.multipleSelection = val;
			},
//			是否显示
			switchChange($event, switchId) {
				let form ={
					isShow:$event
				};
				this.$api.CourseApi.courseEvaluate(switchId,form, result => {
//					console.log(result)
					if(result.success == true){
			  			this.courseEvaluations();
					}else{
						console.log(result.errors)
					}
				})
			},
			//		   	点击删除出现多选框
			deleteKey() {
				this.cancels = true; //取消选择
				this.selections = true; //多选框的隐藏与显示
				this.decide = true; //删除选择
			},
			//			选择完之后点击删除隐藏多选框
			deletes() {
				let multiple = this.multipleSelection;
				let id = [];
				multiple.forEach(function(item, index) {
					let multId = item.id;
					id.push(multId)
				})
				this.$api.CourseApi.deleteCourseEvaluation(id, result => {
//					console.log(result)
					if(result.success == true){
						this.courseEvaluations();
						this.selections = false;
						this.decide = false; //删除选择
						this.cancels = false; //取消选择
					}else{
						console.log(result.errors)
					}
				})
				
			},
			//			取消删除,复选框隐藏
			cancel() {
				this.cancels = false; //取消选择
				this.selections = false; //多选框的隐藏与显示
				this.decide = false; //删除选择
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				if(this.sorts || this.teacher){
					this.search_evaluation();
				}else{					
					this.courseEvaluations();
				}
				console.log(`当前页: ${val}`);
			}
			
		},
		components: {

		}
	}
</script>

<style>
	.el-curriculum {
		margin: auto;
		margin-top: 2%;
		padding: 2%;
		background: #FFFFFF;
		width: 80%;
	}
	
	.line {
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #D5D5D5;
	}
	
	.pop {
		margin-top: 4%;
	}
	
	.userPic {
		width: 20%;
		border-radius: 50%;
	}
	
</style>