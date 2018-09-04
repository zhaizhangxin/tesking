<template>

	<el-main style="padding: 0;">
		<div class="cert">
			<el-row>
				<el-col :span="24">
					<p style="height: 50px;line-height: 50px;">班级成员&nbsp;&nbsp;|&nbsp;&nbsp;学习授权</p>
				</el-col>
			</el-row>

			<div class="line"></div>

			<div class="courseRange">
				<div class="radios">
					<el-row :gutter="20">
						<el-col :span="4">
							<span class="study">开放范围：</span>
						</el-col>
						<el-col :span="16">
							<el-radio-group v-model="form.openMode">
								<el-radio :label="10">选课名单学员</el-radio>
								<el-radio :label="20">本校学员</el-radio>
								<el-radio :label="30">全部学员</el-radio>
							</el-radio-group>
						</el-col>
					</el-row>
				</div>
				<div class="radios" style="line-height: 38px;">
					<el-row :gutter="20">
						<el-col :span="4">
							<span class="study">退课权限：</span>
						</el-col>
						<el-col :span="16">
							<div class="withdrawals" style="width: 100%;display: flex;justify-content: space-between;">
								<el-checkbox v-model="form.dropCourse">允许退课</el-checkbox>
								<el-button type="primary" @click="authorization">保存</el-button>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="line" style="margin-top: 4%;"></div>

			<div class="teach">
				<el-tabs @tab-click="headleClick">
					<el-tab-pane label="学生">
						<el-row :gutter="24">
							<el-col :span="12" style="text-align: left;">
								<el-button type="text" class="texts" @click="batchDeletion">批量删除</el-button>
							</el-col>
							<el-col :span="12" style="text-align: right;">
								<el-button type="primary">添加学生</el-button>
								<el-button type="primary">导入选课</el-button>
							</el-col>
						</el-row>
						<div class="line"></div>
						<el-row :gutter="24" style="margin-top: 2%;">
							<el-col :span="24" style="text-align: right;">
								<el-button type="primary" style="float: right;" @click="search">搜索</el-button>
								<el-col :span="6" style="float: right;padding-right: 0;">
									<el-input placeholder="姓名/学号" prefix-icon="el-icon-search" v-model="course_Name"></el-input>
								</el-col>
							</el-col>
						</el-row>
						<el-table class="el_table" :data="studentsList" border ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" align="center"></el-table-column>
							<el-table-column prop="studentNo" label="学号" align="center"></el-table-column>
							<el-table-column prop="realName" label="真实姓名" align="center"></el-table-column>
							<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
							<el-table-column label="认证状态" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.activationStatus == 1">已认证</span>
									<span v-if="scope.row.activationStatus == 2">未认证</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button type="text" class="buttonText" size="small">退课</el-button>
								</template>
							</el-table-column>
						</el-table>
						
						<div class="block" style="margin-top: 4%;text-align: center;">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
							</el-pagination>
						</div>
						
					</el-tab-pane>

					<el-tab-pane label="辅导老师">
						<el-row :gutter="20">
							<el-col :span="6" style="text-align: left;line-height: 40px;">
								<span class="texts">辅导老师</span>
								<span style="color: #999;margin-left: 10px;font-size: 12px;">共{{number}}人</span>
							</el-col>
							<el-col :span="18" style="text-align: right;">
								<el-button type="text" class="buttonText" @click="deleteTeacher">删除</el-button>
								<el-button type="primary">添加老师</el-button>
								<el-button type="primary">批量设置班组</el-button>
							</el-col>
						</el-row>

						<el-table class="el_table" :data="teacher" border ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelection">
							<el-table-column type="selection" width="55" align="center"></el-table-column>
							<el-table-column prop="id" label="ID" align="center"></el-table-column>
							<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
							<el-table-column prop="email" label="邮箱" align="center" width="240" style="font-size: 12px;"></el-table-column>
							<el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
							<el-table-column label="管理班组" align="center">
								<template slot-scope="scope" class="cellscope">
									<span style="line-height: 40px;float: left;" v-for="item in scope.row.groupNameList">{{item}}，</span>
									<el-button type="text" style="color: #3DC1FF;float: right;">添加</el-button>
								</template>
							</el-table-column>
						</el-table>
						
						<div class="block" style="margin-top: 4%;text-align: center;">
							<el-pagination @size-change="teacherChange" @current-change="teacherCurrentChange" :current-page="teacherCurrentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="teacherTotal">
							</el-pagination>
						</div>
						
					</el-tab-pane>
					<el-tab-pane label="班组">
						<el-row :gutter="20" style="text-align: right;">
							<el-button type="text" class="buttonText" @click="deleteClass">删除</el-button>
							<el-button type="primary">添加班组</el-button>
							<el-button type="primary">批量设置辅导老师</el-button>
						</el-row>

						<el-table class="el_table" :data="classLists" border ref="multipleTable" tooltip-effect="dark" @selection-change="handleClassChange">
							<el-table-column type="selection" width="55" align="center"></el-table-column>

							<el-table-column prop="groupName" label="班组名称" align="center"></el-table-column>
							<el-table-column label="班组人数" align="center">
								<template slot-scope="scope">
									<span style="line-height: 40px;float: left;">{{scope.row.userCount}}</span>
									<el-button type="text" style="color: #3DC1FF;float: right;">查看</el-button>
								</template>
							</el-table-column>
							<el-table-column label="辅导老师" align="center">
								<template slot-scope="scope">
									<span style="line-height: 40px;float: left;" v-for="item in scope.row.userNameList">{{item}}，</span>
									<el-button type="text" style="float: right;color: #3DC1FF;">添加</el-button>
								</template>
							</el-table-column>
							<el-table-column label="邀请码" align="center">
								<template slot-scope="scope">
									<el-button type="text" class="buttonText" size="small">预览</el-button>
								</template>
							</el-table-column>
						</el-table>

						<div class="block" style="margin-top: 4%;text-align: center;">
							<el-pagination @size-change="classChange" @current-change="classCurrentChange" :current-page="classCurrentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="classTotal">
							</el-pagination>
						</div>
					
					</el-tab-pane>
				</el-tabs>
			</div>

		</div>

	</el-main>

</template>
<script>
	export default {
		data() {
			return {
				id:'',
				form:{
					openMode:'',
					dropCourse:''
				},
				number:'1',
//				学生列表分页
				currentPage:1,
				total: 0,
				course_Name:'',
        statusName:'',
        statusNo:'',
//				老师列表分页
				teacherCurrentPage:1,
				teacherTotal: 0,
//				班组列表分页
				classCurrentPage:1,
				classTotal:0,
				studentsList:[],
				teacher:[],
				classLists:[],
				multipleSelection: [],//批量删除学生的值
				multipleTeacher:[],//批量删除老师的值
				multipleClass:[],//批量删除班组的值
				checkboxInit(row, index) {
					if(xxx)
						return 0; //不可勾选
					else
						return 1; //可勾选
				},
			}
		},
		created(){
			this.id = localStorage.getItem('id');
			this.learningAuth();
			this.studentList();
		},
		methods: {
//			切换tabs
			headleClick(tab,event){
				if(tab.index == '0'){
					this.studentList();
				}else if(tab.index == '1'){
					this.teacherList();
				}else{
					this.classList();
				}
			},
//			获取学习授权模式
			learningAuth(){
				this.$api.ClassNumber.learningAuth(this.id,result => {
					console.log(result)
					if(result.success == true){
						this.form = result.data.openStudyAuthorizeDto
						if(this.form.dropCourse == 1){
							this.form.dropCourse = true;
						}else{
							this.form.dropCourse = false;							
						}
					}else{
						console.log(result.errors)
					}
				})
			},
//			修改学习授权模式
			authorization(){
				if(this.form.dropCourse == true){
					this.form.dropCourse = 1;
				}else{
					this.form.dropCourse = 2;							
				}
				this.$api.ClassNumber.modifyAuth(this.id,this.form,result => {
					if(result.success == true){
						this.learningAuth();
					}else{
						console.log(result.errors)
					}
				})
			},
      // 搜索学生
      search(){
        if(isNaN(this.course_Name) == true){
          this.statusName = this.course_Name;
          console.log(this.statusName);
        }else{
          this.statusNo = this.course_Name;
          console.log(this.statusNo);
        }
        this.searchStudent();
      },
      searchStudent(){
        console.log(this.statusName);
        console.log(this.statusNo);

        this.$api.ClassNumber.searchUser(this.id,this.currentPage,10,this.statusName,this.statusNo,result => {
          console.log(result);
          if(result.success == true){
            if(result.data.pager == null){
              this.studentsList = [];
            }else{
              this.total = result.data.pager.total;
              this.studentsList = result.data.pager.list;
              this.statusName = '';
              this.statusNo = '';
            }
          }else{
            console.log(result.errors)
          }
        })
      },
//			学生列表
			studentList(){
				this.$api.ClassNumber.studentList(this.currentPage,10,this.id,result => {
					console.log(result)
					if(result.success == true){
						if(result.data.pager == null){
							this.studentsList = [];
						}else{
							this.total = result.data.pager.total;
							this.studentsList = result.data.pager.list							
						}
					}else{
						console.log(result.errors)
					}
				})
			},
			//			学生多选框的值
			handleSelectionChange(val) {
				let id = [];
				val.forEach(function(item, index) {
					id.push(item.id)
				})
				this.multipleSelection = id;
			},
			//		   学生批量删除
			batchDeletion() {
				console.log(this.multipleSelection)
				this.$api.ClassNumber.deleteStudent(this.id,this.multipleSelection,result => {
					if(result.success == true){
						this.studentList();
					}else{
						console.log(result.errors)
					}
				})
			},
//			老师列表
			teacherList(){
				this.$api.ClassNumber.teacherList(this.teacherCurrentPage,10,this.id,result => {
					console.log(result)
					if(result.success == true){
						if(result.data.pager == null){
							this.teacher = [];
						}else{
							this.teacherTotal = result.data.pager.total;
							this.teacher = result.data.pager.list							
						}
					}else{
						console.log(result.errors)
					}
				})
			},
//			老师多选框的值
			handleSelection(val){
				let id = [];
				val.forEach(function(item, index) {
					id.push(item.id)
				})
				this.multipleTeacher = id;
			},
//			老师批量删除
			deleteTeacher(){
				console.log(this.multipleTeacher)
				this.$api.ClassNumber.deleteTeacher(this.id,this.multipleTeacher,result => {
					if(result.success == true){
						this.teacherList();
					}else{
						console.log(result.errors)
					}
				})
			},
//			班组列表
			classList(){
				this.$api.ClassNumber.classList(this.classCurrentPage,10,this.id,result => {
					console.log(result)
					if(result.success == true){
						if(result.data.pager == null){
							this.classLists = [];
						}else{
							this.classTotal = result.data.pager.total;
							this.classLists = result.data.pager.list							
						}
					}else{
						console.log(result.errors)
					}
				})

			},
//			班组多选框的值
			handleClassChange(val){
				let id = [];
				val.forEach(function(item, index) {
					id.push(item.id)
				})
				this.multipleClass = id;
			},
//			班组批量删除
			deleteClass(){
				console.log(this.multipleClass)
				this.$api.ClassNumber.deleteClass(this.multipleClass,result => {
					if(result.success == true){
						this.classList();
					}else{
						console.log(result.errors)
					}
				})
			},
//			学生列表分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.studentList();
				console.log(`当前页: ${val}`);
				if(this.course_Name){
				  this.searchStudent();
        }
        if(this.statusNo){
          this.searchStudent();
        }
			},
//			老师列表分页
			teacherChange(val){
				console.log(`每页 ${val} 条`);
			},
			teacherCurrentChange(val){
				this.teacherCurrentPage = val;
				this.teacherList();
				console.log(`当前页: ${val}`);
			},
//			班组列表分页
			classChange(val){
				console.log(`每页 ${val} 条`);
			},
			classCurrentChange(val){
				this.classCurrentPage = val;
				this.classList();
				console.log(`当前页: ${val}`);
			}

		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	.cert {
		padding: 2%;
		background-color: #fff;
		text-align: left;
	}
	
	.line {
		margin: 1% 0;
		width: 100%;
		height: 1px;
		background-color: #E9E9E9;
	}
	
	.courseRange {
		margin: auto;
		width: 70%;
	}
	
	.radios {
		margin-top: 6%;
	}
	
	.study {
		color: #001380;
		font-size: 12px;
	}
	
	.teach {
		padding: 2%;
	}
	
	.el_table {
		margin-top: 4%;
	}
	
	.texts {
		color: #3DC1FF;
		font-size: 14px;
	}
</style>
