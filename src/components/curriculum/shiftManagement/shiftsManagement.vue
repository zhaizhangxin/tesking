<template>
	<div class="el-curriculum">
		<el-row>
			<el-col :span="24" style="text-align: left;">
				<p>课程列表</p>
			</el-col>
		</el-row>

		<div class="line"></div>

		<el-row style="margin-top: 2%;">
			<el-col :span="24" style="text-align: right;">
				<router-link to="/openShift">
					<el-button type="primary" style="margin-left: 2%;float: right;">创建课程</el-button>
				</router-link>
				
				<el-button type="primary" style="float: right;" @click="search">搜索</el-button>
				
				<el-col :span="6" style="float: right;padding-right: 0;">
					<el-input placeholder="请输入课程名称/ID" prefix-icon="el-icon-search" v-model="input"></el-input>
				</el-col>
			</el-col>
		</el-row>

		<el-row style="margin-top: 2%;">
			<el-col :span="30" v-for="(project,index) in allprojects" :id="project.id" style="margin-top: 2%;width: 100%;">
				<el-card class="cord">
					<div class="image">
						<!--<img :src="project.coverPath" alt="" class="img" />-->
						<img :src="project.openCover" alt="" class="img" />
						
					</div>
					<div class="wind">
						<div class="win">
							<b style="font-size: 18px;">{{project.openName}}</b>
							<div>
								<el-button type="text" style="color: #999999;">售卖</el-button>
								<el-button type="text" class="buttonText">二维码</el-button>
								<el-button type="text" class="buttonText" @click="edits(project.id)">编辑</el-button>
								
								<el-button type="text" class="buttonText" @click="copys(project.id)">复制</el-button>

								<el-dialog title="复制" :visible.sync="copy" center>
									<el-form :model="form">
										<el-form-item label="开课时间">
											<el-col :span="16" style="text-align: left;">
												<el-date-picker v-model="form.beginTime" type="date" placeholder="请选择开课时间"></el-date-picker>
											</el-col>
										</el-form-item>
										<el-form-item label="结课时间">
											<el-col :span="16" style="text-align: left;">
												<el-date-picker v-model="form.endTime" type="date" placeholder="请选择结课时间"></el-date-picker>
											</el-col>
										</el-form-item>
										<el-form-item label="课程名称">
											<el-col :span="16" style="text-align: left;">
												<el-input v-model="form.openName"></el-input>
											</el-col>
										</el-form-item>
										<el-form-item label="改课程含有考试，是否同时复制考卷？">
											<el-radio-group v-model="form.copyInfo" style="width: 100%;">
												<el-radio label="复制考试信息"></el-radio>
												<el-radio label="不复制考试信息"></el-radio>
											</el-radio-group>
										</el-form-item>

										<el-button type="primary" :id="project.id" @click="determineCopy">确定</el-button>
										<el-button @click="copy = false" type="text" style="color: #B5C0FF;">取消</el-button>
									</el-form>
								</el-dialog>

								<el-button type="text" class="buttonText" @click="butDelete(project.id,project.openName)">删除</el-button>

								<el-dialog title="关闭" :visible.sync="close" center>
									<span>确认关闭"{{courseName}}"吗？关闭后将不再显示</span>
									<span slot="footer" class="dialog-footer">
										<el-button type="primary" :id="project.id" @click="deletes">确定</el-button>
										<el-button @click="close = false" type="text" style="color: #B5C0FF;">取消</el-button>
									</span>
								</el-dialog>

							</div>
						</div>
						<div class="num">
							<span>课程ID：{{project.id}}</span>
							<span style="margin-left: 6%;" v-if="project.studentNum != null ">督学学生数：{{project.studentNum}}</span>
							<span style="margin-left: 6%;" v-if="project.studentNum == null ">督学学生数：0</span>
						</div>
						<div class="line"></div>
						<div class="nums">
							<div class="currTime">
								<p>课程时间：{{project.beginTime|moment("YYYY-MM-DD HH:mm:ss")}}~{{project.endTime|moment("YYYY-MM-DD HH:mm:ss")}}</p>
								<p>所属学校：{{project.schoolName}}</p>

								<p v-if="project.openMode == 10">开课范围：教师导入</p>
								<p v-if="project.openMode == 20">开课范围：本校学生</p>
								<p v-if="project.openMode == 30">开课范围：全部学员</p>

							</div>
							<div class="published">
								<el-button v-if="project.publishFlag == 2" type="text" @click="postStatus(project.id)" style="color: #FF9800;">未发布</el-button>
								<el-button v-if="project.publishFlag == 1" type="text" style="color: #999999;">已发布</el-button>

								<el-dialog title="发布" :visible.sync="release" center>
									<span>您的所选班次未"未发布"状态，确认发布此班次吗？</span>
									<span slot="footer" class="dialog-footer">
												<el-button type="primary" @click="confirmRelease">确定</el-button>
												<el-button @click="release = false" type="text" style="color: #B5C0FF;">取消</el-button>
											</span>
								</el-dialog>
								<el-button type="primary" class="pub" @click="chapterContent(project.id)">教学管理</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<div class="block" style="margin-top: 4%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				close: false,
				release: false,
				copy: false,
				allprojects: [],
				currentPage: 1,
				total: 0,
				input: '',
				listIndex: '',
				postStatusId: '',
				copyId: '',
				courseName:'',
				form: {
					beginTime: '',
					endTime: '',
					openName: '',
					copyInfo: ''
				}
			}
		},
		created() {
			if(this.$route.query.dataObj) {
				this.courseDetailsList();
			} else {
				this.courseDetailsAllList();
			}
		},
		methods: {
//			教学管理
			chapterContent(id){
				localStorage.setItem('id',id);
				this.$router.push({
					path: '/chapterContent',
					name:'chapterContent'
				})
			},
//			搜索
			search(){
				this.searchs();
			},
			searchs(){
				this.$api.CourseApi.reaching_opens(this.currentPage,10,this.input, result => {
					console.log(result);
					if(result.success == true){
						this.total = result.data.pager.total
						this.allprojects = result.data.pager.list;
					}else{
						console.log(result.errors)
					}
				})
			},
//			编辑
			edits(id){
				this.$router.push({
					path: '/openShift',
					name:'openShift',
					query:{
						name:'name',
						id:id
					}
				})
			},
			//发布状态
			postStatus(id) {
				this.postStatusId = id;
				this.release = true;
			},
			//			确认发布
			confirmRelease() {
				let statusId = this.postStatusId;
				console.log(statusId);
				this.release = false;
				this.$api.CourseApi.whetherPublish(statusId, result => {
					console.log(result);
					if(result.success == true){
						this.release = false;
						if(this.$route.query.dataObj) {
							this.courseDetailsList();
						} else {
							this.courseDetailsAllList();
						}
					}else{
						console.log(result.errors)
					}
				})
			},
			//			是否删除
			butDelete(id,name) {
				this.close = true;
				this.listIndex = id;
				this.courseName = name;
			},
			//			确认删除
			deletes() {
				let dataId = this.listIndex;
				console.log(dataId)
				this.close = false;
				this.$api.CourseApi.shiftDelete(dataId, result => {
					console.log(result)
					if(result.success == true){
						this.close = false;
						if(this.$route.query.dataObj) {
							this.courseDetailsList();
						} else {
							this.courseDetailsAllList();
						}
					}else{
						console.log(result.errors)
					}
				})
			},
			//			复制
			copys(id) {
				this.copy = true;
				this.copyId = id;
			},
			//			确认复制
			determineCopy() {
				let copyId = this.copyId;
				console.log(copyId);
				this.copy = false;
				if(this.form.copyInfo == '复制考试信息'){
					this.form.copyInfo = 1
				}else{
					this.form.copyInfo = 2
				}
				console.log(this.form)
				this.$api.CourseApi.copyCourse(copyId, this.form, result => {
					console.log(result)
					if(result.success == true){
						if(this.$route.query.dataObj) {
							this.courseDetailsList();
						} else {
							this.courseDetailsAllList();
						}
					}else{
						console.log(result.errors)
					}
				})
			},
			//			课程详情
			courseDetailsList() {
				this.$api.CourseApi.courseDetailsList(this.currentPage, 10, this.$route.query.dataObj, result => {
					console.log(result)
					this.total = result.data.pager.total;
					this.allprojects = result.data.pager.list;
				})
			},
			//			班次列表（全部）
			courseDetailsAllList() {
				console.log(this.currentPage)
				this.$api.CourseApi.courseDetailsAllList(this.currentPage, 10, result => {
					console.log(result)
					this.total = result.data.pager.total
					this.allprojects = result.data.pager.list;
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			//			下一页
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(this.$route.query.dataObj)
				if(this.$route.query.dataObj) {
					this.courseDetailsList();
				}else{
					this.courseDetailsAllList();
				}
				
//				if(this.input != undefined){
//					this.searchs();
//				}
				console.log(`当前页: ${val}`);
			}
		},
		watch: {
			'$route': 'getParams'
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
		width: 70%;
	}
	
	.line {
		width: 100%;
		height: 1px;
		background: #D5D5D5;
	}
	
	.cord .el-card__body {
		display: flex;
		padding: 2%;
	}
	
	.image {
		width: 20%;
		height: 150px;
	}
	
	.img {
		width: 100%;
		height: 100%;
	}
	
	.wind {
		margin-left: 2%;
		width: 80%;
	}
	
	.win {
		display: flex;
		justify-content: space-between;
		/*line-height: 40px;*/
	}
	
	.num {
		margin-bottom: 2%;
		text-align: left;
		color: #999999;
	}
	
	.nums {
		display: flex;
		justify-content: space-between;
	}
	
	.currTime {
		margin-top: 1%;
		text-align: left;
	}
	
	.currTime p {
		color: #999999;
	}
	
	.published {
		margin-top: 4%;
	}
	
	.el-dialog--center .el-dialog__body {
		text-align: center;
	}
</style>