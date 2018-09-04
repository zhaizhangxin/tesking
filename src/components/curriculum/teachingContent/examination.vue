<template>
	<el-main style="padding: 0;">
		
		<div class="certs">
			<el-row :gutter="24">
				<el-col :span="8" style="text-align: left;">
					<p class="grid-content" style="line-height: 40px;">考试</p>
				</el-col>
				<el-col :span="16" style="text-align: right;">
					<el-button type="text">导出列表</el-button>
					<el-button type="primary" style="float: right;margin-left: 0;">搜索</el-button>
					<el-col :span="10" style="float: right;padding-right: 0;">
						<el-input placeholder="考试名称/类型/老师" prefix-icon="el-icon-search"></el-input>									
					</el-col>
				</el-col>
			</el-row>
	
			<div class="line"></div>
	
			<el-row :gutter="24" style="margin-top: 2%;">
				
				<el-col :span="18">
					<el-col :span="4" style="text-align: left;">
						<p style="color: #3DC1FF;font-size: 12px;line-height: 40px;">全部421场</p>
					</el-col>
					<el-col :span="6">
						<el-select v-model="value" placeholder="按类型筛选">
							<el-option v-for="item in courseSearch" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="sorts" placeholder="按状态筛选">
							<el-option v-for="item in courseSorts" :key="item.sorts" :label="item.courseSorts" :value="item.sorts"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="teacher" placeholder="按任课老师筛选">
							<el-option v-for="item in chooseTeacher" :key="item.teacher" :label="item.chooseTeacher" :value="item.teacher"></el-option>
						</el-select>
					</el-col>
				</el-col>
	
				<el-col :span="6" style="text-align: right;">
					<el-button type="text" class="buttonText" @click="deleteKey" v-if="decide == false">删除</el-button>
					<el-button type="text" @click="deletes" v-if="decide == true">删除</el-button>
					<el-button type="text" class="buttonText" @click="cancel" v-show="cancels">取消</el-button>
					<router-link to="/chapterContent/createExamFirst">
						<el-button type="primary" style="margin-left: 2%;">创建考试</el-button>						
					</router-link>
				</el-col>
			</el-row>
	
			<el-table :data="tableData" border style="margin-top: 4%;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" v-if="selections"></el-table-column>
				<el-table-column prop="testName" label="考试名称" align="center"></el-table-column>
				<el-table-column prop="typesOf" label="类型" align="center"></el-table-column>
				<el-table-column prop="status" label="状态" align="center"></el-table-column>
				<el-table-column prop="startingTime" label="开始时间" align="center" width="140"></el-table-column>
				<el-table-column prop="filingDeadling" label="提交截止时间" align="center" width="140"></el-table-column>
				<el-table-column prop="instructor" label="任课老师" align="center"></el-table-column>
				<el-table-column prop="submissionStatus" label="提交情况" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="140">
					<template slot-scope="scope">
						<el-button type="text" class="buttonText" size="small" @click="examination(scope.row.testName,scope.row.id)">查看</el-button>
						<el-button type="text" class="buttonText" size="small" @click="recording(scope.row.id)">学生作答记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<el-dialog :visible.sync="examin" width="40%" center>
				<span slot="title">{{examinTitle}}</span>
				<div>
					<div style="display: flex;justify-content: space-around;font-size: 12px;color: #999999;">
						<p>考试时长：{{examinTime}}分钟</p>
						<p>考试时间：{{startTime}}至{{endTime}}</p>
						<p>满分：{{fraction}}分</p>
					</div>
					<div class="line"></div>
					<div style="margin-top: 4%;">
						<b>1、单选题（共2题）</b>
						<div style="margin-top: 4%;font-size: 12px;">
							<p>1、下列关于递归描述错误的是？</p>
							<el-radio-group v-model="radios">
								<el-radio :label="1" style="display: block;margin-left: 30px;margin-top: 2%;">A、递归就是在方法内部调用方法本身</el-radio>
								<el-radio :label="2" style="display: block;margin-top: 2%;">B、递归必须有结束条件</el-radio>
								<el-radio :label="3" style="display: block;margin-top: 2%;">C、递归调用时会传递写参数，每次调用都会将一个新的参数传递给自己</el-radio>
								<el-radio :label="4" style="display: block;margin-top: 2%;">D、递归可以没有结束条件</el-radio>
							</el-radio-group>
						</div>
					</div>
				</div>
				
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="examin = false">确定</el-button>
					<el-button @click="examin = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
			
			<el-dialog title="学生作答详情" :visible.sync="record" width="50%" center>
				<div style="padding: 0 4%;">
					<el-row :gutter="24">
						<el-col :span="24" style="text-align: right;">
							<el-button style="float: right;" type="primary">搜索</el-button>
							<el-col :span="10" style="float: right;padding-right: 0;">
								<el-input prefix-icon="el-icon-search" v-model="recondName"></el-input>
							</el-col>
						</el-col>
					</el-row>
					<el-table :data="recordData" border style="margin-top: 4%;">
						<el-table-column prop="testName" label="学生" align="center"></el-table-column>
						<el-table-column prop="typesOf" label="班组" align="center"></el-table-column>
						<el-table-column prop="status" label="提交状态" align="center"></el-table-column>
						<el-table-column prop="startingTime" label="提交时间" align="center" width="140"></el-table-column>
						<el-table-column prop="filingDeadling" label="测验得分" align="center" width="140"></el-table-column>
					</el-table>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="record = false">确定</el-button>
					<el-button @click="record = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
		</div>
	</el-main>
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
				record:false,//学生作答详情弹框的显示
				recondName:'',//学生作答详情搜索
				examin:false,//查看考试
				examinTitle:'',//考试名称
				examinTime:'60',//考试时长
				startTime:'2018-06-27 10:21',//考试开始时间
				endTime:'2018-06-28 10:21',//考试结束时间
				fraction:'100',//考试分数
				radios:4,
				tableData: [
					{id:1,testName:'计算机网络',typesOf:'正考',status:'未考试',startingTime:'2018-07-21 15:20',filingDeadling:'2018-07-25 15:20',instructor:'郭大宇',submissionStatus:'暂无'},
					{id:2,testName:'计算机网络',typesOf:'正考',status:'未考试',startingTime:'2018-07-21 15:20',filingDeadling:'2018-07-25 15:20',instructor:'郭大宇',submissionStatus:'暂无'},
					{id:3,testName:'计算机网络',typesOf:'正考',status:'未考试',startingTime:'2018-07-21 15:20',filingDeadling:'2018-07-25 15:20',instructor:'郭大宇',submissionStatus:'暂无'},
					{id:4,testName:'计算机网络',typesOf:'正考',status:'未考试',startingTime:'2018-07-21 15:20',filingDeadling:'2018-07-25 15:20',instructor:'郭大宇',submissionStatus:'暂无'}
				],
				recordData:[
					{id:1,testName:'张宁宁',typesOf:'默认分组',status:'已提交',startingTime:'2018-07-21 15:20',filingDeadling:'待平分'},
					{id:2,testName:'张宁宁',typesOf:'默认分组',status:'已提交',startingTime:'2018-07-21 15:20',filingDeadling:'待平分'},
					{id:3,testName:'张宁宁',typesOf:'默认分组',status:'已提交',startingTime:'2018-07-21 15:20',filingDeadling:'待平分'}
					
				],
				courseSearch: [{
						label: '课程搜索',
						value: '1'
					},
					{
						label: '课程搜索',
						value: '2'
					},
					{
						label: '课程搜索',
						value: '3'
					},
					{
						label: '课程搜索',
						value: '4'
					},
				],
				courseSorts: [{
						courseSorts: '课程分类',
						sorts: '1'
					},
					{
						courseSorts: '课程分类',
						sorts: '2'
					},
					{
						courseSorts: '课程分类',
						sorts: '3'
					}
				],
				chooseTeacher: [{
						chooseTeacher: '选择教师',
						teacher: '1'
					},
					{
						chooseTeacher: '选择教师',
						teacher: '2'
					},
					{
						chooseTeacher: '选择教师',
						teacher: '3'
					}
				],
				
			}
		},
		created(){
			
		},
		methods: {
			//多选框选中的值
			handleSelectionChange(val) {
				this.multipleSelection = val;
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
				console.log(id)
//				this.$api.CourseApi.deleteCourseEvaluation(id, result => {
//					console.log(result)
//					if(result.success == true){
//						this.courseEvaluations();
//						this.selections = false;
//						this.decide = false; //删除选择
//						
//					}else{
//						console.log(result.errors)
//					}
//				})
				
			},
			//			取消删除,复选框隐藏
			cancel() {
				this.cancels = false; //取消选择
				this.selections = false; //多选框的隐藏与显示
				this.decide = false; //删除选择
			},
//			学生作答详情
			recording(id){
				console.log(id);
				this.record = true;
			},
//			查看考试
			examination(name,id){
				console.log(id);
				this.examinTitle = name;//考试名称
				this.examin = true;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.courseEvaluations();
				console.log(`当前页: ${val}`);
			}
			
		},
		components: {

		}
	}
</script>

<style>
	.certs{
		padding: 2%;
		background-color: #fff;
		text-align: left;
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
	.el-radio__label{
		font-size: 12px;
	}
</style>