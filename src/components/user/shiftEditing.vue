<template>
	<div class="shift">
		<div class="list">
			<el-row>
				<el-col :span="24">
					<p class="grid">
						<!--<router-link to="/curriculumCenter">
			  			<span style="color: #3DC1FF;">返回课程列表</span>			  			
			  		</router-link>
			  		&nbsp;&nbsp;|&nbsp;&nbsp;
			  		<span>我的课程&nbsp;&nbsp;&nbsp;1.填写课程信息</span>-->
						1.填写课程模板信息
					</p>
				</el-col>
			</el-row>
		</div>
		<el-form :model="ruleForm" style="margin-top: 2%;" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="课程分类" style="text-align: left;">
				<el-select v-model="ruleForm.firstCategoryId" placeholder="分类" @change="firstCate" @visible-change="firstCategories">
					<el-option v-for="item in pager" :key="item.id" :label="item.label" :value="item.id">
					</el-option>
				</el-select>
				<el-select v-model="ruleForm.categoryId" placeholder="课程" @visible-change="secondCategories">
					<el-option v-for="item in secondpager" :key="item.id" :label="item.label" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="课程名称" prop="courseName" style="text-align: left;">
				<el-col :span="20">
					<el-input v-model="ruleForm.courseName"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程封面" prop="courseCover" style="text-align: left;">
				<el-upload class="avatar-uploader" :http-request="uploadImg" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<el-button type="primary">上传图片</el-button>
					<span style="color: #999999;font-size: 12px;">建议尺寸800*800px</span>
				</el-upload>

				<img v-if="ruleForm.courseCover" :src="ruleForm.courseCover" class="avatar">

			</el-form-item>
			<el-form-item label="课程关键词" prop="keyWord" style="text-align: left;">
				<el-col :span="20">
					<el-input v-model="ruleForm.keyWord"></el-input>
					<p style="color: #999999;font-size: 12px;">关键字之间用";"隔开，最多支持5个关键词</p>
				</el-col>
			</el-form-item>
			<el-form-item label="课程价格" prop="courseFree" style="text-align: left;">
				<el-radio-group v-model="ruleForm.courseFree">
					<el-radio :label="1" style="float: left;">免费</el-radio>
					<el-radio :label="2" disabled style="float: left;">收费</el-radio>
					<el-col :span="10" style="margin-left: 4%;overflow: hidden;height: 18px;">
						<span style="color: #999999;font-size: 12px;float: left;">￥</span>
						<el-col :span="8">
							<el-input :disabled="true" style="height: 18px;line-height: 18px;"></el-input>
						</el-col>
						<span style="color: #999999;font-size: 12px;margin-left: 1%;">元</span>
					</el-col>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="授课老师" prop="teacherId" style="text-align: left;">
				<el-col :span="14" v-if="this.$route.query.id">
						<el-select value-key="id" v-model="teachers" multiple style="width: 100%;" @change="teach" @visible-change="visiChange">
							<el-option v-for="item in courseTeacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="14" v-else>
						<el-select v-model="ruleForm.teacherId" multiple style="width: 100%;" @change="teach" @visible-change="visiChange">
							<el-option v-for="item in courseTeacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button type="primary" @click="teacher = true">创建授课老师</el-button>
				</el-col>

				<el-dialog title="创建授课老师" :visible.sync="teacher" center>
					<el-form ref="form" :model="form">
						<el-form-item>
							<el-row :gutter="24" style="text-align: left;">
								<el-col :span="6" style="text-align: right;">
									<p>名师照片：</p>
								</el-col>
								<el-col :span="14">
									<el-upload class="avatar-uploader" :http-request="uploadHead" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<el-button type="primary">上传图片</el-button>
										<span style="color: #999999;font-size: 12px;">請长传不小于15KB的jpg或png图片</span>
									</el-upload>
									<img v-if="form.teacherAvatar" :src="form.teacherAvatar" class="avatars">
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师姓名：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.teacherName"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师头衔：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.teacherType"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师介绍：</p>
								</el-col>
								<el-col :span="14">
									<el-input type="textarea" v-model="form.teacherInfo"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>新浪微博：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.micoBlog"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>微信：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.weChat"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>标签：</p>
								</el-col>
								<el-col :span="14" >
									<el-input v-model="form.type"></el-input>
									<p style="color: #999999;font-size: 12px;text-align: left;">多个标签以";"隔开</p>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finished">完成</el-button>
						<el-button @click="resetForm" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>

			</el-form-item>
			<el-form-item label="导学老师" prop="userId" style="text-align: left;">
				<el-col :span="14" v-if="this.$route.query.id">
						<el-select value-key="id" v-model="openTeacher" multiple style="width: 100%;" @change="teach" @visible-change="visiChanges">
							<el-option v-for="item in userDtoList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="14" v-else>
						<el-select v-model="ruleForm.userId" multiple style="width: 100%;" @change="teach" @visible-change="visiChanges">
							<el-option v-for="item in userDtoList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
						</el-select>
				</el-col>

			</el-form-item>
			<!--<el-form-item label="权限设置" prop="visibleRange" style="text-align: left;">
				<span style="color: #001380;">可见范围：</span>
				<el-radio-group v-model="ruleForm.visibleRange">
					<el-radio :label="1">全部可见</el-radio>
					<el-radio :label="2" @change="visibles">部分可见</el-radio>
				</el-radio-group>

				<el-checkbox-group v-model="ruleForm.userId" v-if="ruleForm.visibleRange == '2'">
					<el-checkbox v-for="item in userDtoList" :label="item.id" :key="item.id" :value="item.id">{{item.userName}}</el-checkbox>
				</el-checkbox-group>

			</el-form-item>-->
			<el-form-item label="课程介绍" prop="courseIntroduction">
				<el-col :span="20">
					<div class='tinymce'>
						<editor class="editor" v-model="ruleForm.courseIntroduction" :setting="editorSetting" @input="(content)=> content = content"></editor>
					</div>
				</el-col>
			</el-form-item>
			<el-form-item style="margin-top: 4%;">
				<el-button type="primary" @click="returns">取消编辑 返回</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">下一步 填写课程信息</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import editor from '@/components/ue'

	export default {
		'/shiftEditing': 'shiftEditing',
		data() {
			return {
				labelID:'',//一级分类的id
				teacher: false,//创建老师
				courseTeacherList:[],//授课老师
				userDtoList:[],//导学老师
				teacherId:[],//授课老师
				teachers:[],
				openTeacher:[],
				course:[],
				classList: [
					"el-icon-message",
					"el-icon-menu",
					"el-icon-setting",
					"el-icon-setting"
				],
				editorSetting: {
					height: 200,
					encoding: 'html'
				},
				//创建授课老师
				form: {
					teacherAvatar: '',
					teacherName: '',
					teacherType: '',
					teacherInfo: '',
					micoBlog: '',
					weChat: '',
					type:'',
					tagName: [],

				},
//				提交表单
				ruleForm: {
					firstCategoryId:'',//一级分类id
					categoryId: '',
					courseName: '',
					courseFree: '',
					courseIntroduction: '',
					courseCover: '',
					keyWord: '',
					teacherId:[],
					userId: [],
					courseTeacherList:[],
					userDtoList:[]
				},
				pager: [],//一级分类
				secondpager: [],//二级分类
				userDtoList:[],//部分可见
				rules: {
					region: [{
						required: true,
						message: '请输入课程名称',
						trigger: 'blur'
					}],
					//					courseCover:[{
					//						required: true,
					//						message: '请上传课程封面',
					//						trigger: 'change'
					//					}],
					keyWord: [{
						required: true,
						message: '请输入课程关键词',
						trigger: 'blur'
					}],
//					teacherId: [{
//						required: true,
//						message: '请输入授课老师',
//						trigger: 'change'
//					}],
					courseFree: [{
						required: true,
						message: '请选择课程价格',
						trigger: 'change'
					}],
					//					courseIntroduction: [{
					//						required: true,
					//						message: '请填写课程介绍',
					//						trigger: 'blur'
					//					}]
				}

			}

		},
		created() {
			if(this.$route.query.id){
				this.editCourse();
				this.courses();
				this.openRoleUser();
				this.firstCourseCate();
//				this.secondCourse();
			}

		},
		methods: {
			editCourse(){
				this.$api.CourseApi.editsCourse(this.$route.query.id,result => {
					console.log(result)
					if(result.success == true){
						let that = this;
						this.ruleForm = result.data.course;
						this.labelID = this.ruleForm.firstCategoryId
						if(this.labelID){
							this.secondCourse();
						}
						let teacher = this.ruleForm.courseTeacherList;
						let openTea = this.ruleForm.userDtoList;
						
						teacher.forEach(function(item,index){
							that.teachers.push(item.id)
						})
						openTea.forEach(function(item,index){
							that.openTeacher.push(item.id)
						})			
						
					}
				})
			},
//			添加一级分类
			firstCategories(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.firstCourseCate();
					}					
				}
			},
			firstCourseCate(){
				this.$api.CourseApi.firstCourseCategories(result => {
					console.log(result)
					if(result.success == true){
						this.pager = result.data.firstCourseCategoryList;
					}else{
						console.log(result.errors)
					}
				})
			},
//			选择一级分类的id
			firstCate(event){
				console.log(event)
				this.labelID = event;
			},
//			添加二级分类
			secondCategories(event){
				if(this.$route.query.id){
					if(this.labelID != ''){
						this.secondCourse();
					}
				}else{
					if(event == true){
						this.secondCourse();
					}					
				}
			},
			secondCourse(){
				this.$api.CourseApi.secondCourseCategories(this.labelID,result => {
//					console.log(result)
					if(result.success == true){
						this.secondpager = result.data.secondCourseCategoryList;
					}else{
						console.log(result.errors)
					}
				})
			},
//			权限的可见范围
			visibles() {
				this.$api.CourseApi.roleUser(result => {
					if(result.success == true){
						this.userDtoList = result.data.userDtoList;
					}else{
						console.log(result.errors)
					}
				})
			},
			//			导学老师
			openRoleUser(){
				this.$api.CourseApi.openRoleUser(result => {
					console.log(result)
					if(result.success == true){
						this.userDtoList = result.data.userDtoList;
					}else{
						console.log(result.errors)
					}
				})
			},
			visiChanges(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.openRoleUser();
					}					
				}
			},
//			多选授课老师失去焦点时获取
			teach(event){
//				console.log(event)
			},
			courses(){
				this.$api.CourseApi.courseTeacherName(result => {
					if(result.success == true){
						this.courseTeacherList = result.data.courseTeacherList;
					}else{
						console.log(result.errors)
					}
				})
			},
//			下拉触发(请求老师接口)
			visiChange(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.courses();
					}					
				}
			},
//			确认创建老师
			finished(){
//				以分号切割标签
				let types = this.form.type;
				var paramsList = types.split(";");
				var newlist = new Array();
				for(var i = 0;i < paramsList.length;i++){
					 //判断是否包含中文分号，如果包含再次切割；
					 if(paramsList[i].indexOf("；") > -1){
						 newlist.push.apply(newlist,paramsList[i].split("；"));
					 }else{
						 //将没有中文分号的数据添加到数组中
						 newlist.push(paramsList[i]);
					 }
				}
				var numberList = newlist;
				this.form.tagName = numberList;
//				console.log(this.form)
				this.$api.CourseApi.courseTeacher(this.form, result => {
					if(result.success == true){
						this.teacher = false;
						this.form = {
							teacherAvatar: '',
							teacherName: '',
							teacherType: '',
							teacherInfo: '',
							micoBlog: '',
							weChat: '',
							type:'',
							tagName: []
						}
					}else{
						console.log(result.errors)
					}
				})
				
			},
//			取消创建老师
			resetForm(){
				this.teacher = false;
				this.form = {
					teacherAvatar: '',
					teacherName: '',
					teacherType: '',
					teacherInfo: '',
					micoBlog: '',
					weChat: '',
					type:'',
					tagName: []
				}
			},
//			上传课程封面
			uploadImg(file) {
				let that = this;
				const uuidv1 = require('uuid/v1');
				let filename = file.file.type + "/" + uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

				let OSS = require('ali-oss');
				let client = new OSS({
					region: 'oss-cn-beijing',
					accessKeyId: 'LTAIZsHOKiz23lz7',
					accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
					bucket: 'tskedu-course'
				});
				async function put() {
					try {
						let result = await client.put(filename, file.file);
						that.ruleForm.courseCover = result.url;
					} catch(err) {
						console.log(err);
					}
				}
				put();
			},
//			上传老师照片
			uploadHead(file) {
				let that = this;
				const uuidv1 = require('uuid/v1');
				let filename = file.file.type + "/" + uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

				let OSS = require('ali-oss');
				let client = new OSS({
					region: 'oss-cn-beijing',
					accessKeyId: 'LTAIZsHOKiz23lz7',
					accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
					bucket: 'tskedu-course'
				});
				async function put() {
					try {
						let result = await client.put(filename, file.file);
						that.form.teacherAvatar = result.url;
					} catch(err) {
						console.log(err);
					}
				}
				put();
			},
//			取消编辑
			returns() {
				this.$router.push({path:'/curriculumCenter'})
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
//			下一步
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.ruleForm.courseFree == '1'){
							this.ruleForm.courseFree = 1
						}else{
							this.ruleForm.courseFree = 2
						}
//						if(this.ruleForm.visibleRange == '1'){
//							this.ruleForm.visibleRange = 1
//						}else{
//							this.ruleForm.visibleRange = 2
//						}
						if(this.$route.query.id){
							this.ruleForm.teacherId = this.teachers;							
						}
						if(this.$route.query.id){
							this.ruleForm.userId = this.openTeacher;
						}
						console.log(this.ruleForm);
						if(this.$route.query.id){							
							this.$api.CourseApi.firstEditCourse(this.ruleForm,result => {								
								console.log(result);
								if(result.success == true){
//									console.log(result.data.course.id)
									this.$router.push({
										path: '/materials',
										name:'materials',
										query:{
											name:'name',
											id:result.data.course.id
										}
									})
								}else{
									console.log(result.errors)
								}
							})
						}else{
							this.$api.CourseApi.firstCourse(this.ruleForm,result => {
								console.log(result)
								if(result.success == true){
//									console.log(result.data.course.id)
									this.$router.push({
										path: '/materials',
										name:'materials',
										query:{
											name:'name',
											id:result.data.course.id
										}
									})
								}else{
									console.log(result.errors)
								}
							})
							
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		components: {
			//使用编辑器
			'editor': editor
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.list {
		margin: 0 4%;
		min-height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #E0E0DD;
		text-align: left;
	}
	
	.shift {
		margin: auto;
		margin-top: 2%;
		padding-bottom: 2%;
		background: #FFFFFF;
		width: 70%;
	}
	
	.demo-ruleForm {
		margin: auto;
		margin-top: 2%;
		width: 60%;
		color: #001380;
	}
	
	.avatar-uploader .el-upload {
		border-radius: 6%;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.el-form-item__label {
		color: #001380;
	}
	
	.avatar {
		margin-top: 2%;
		width: 280px;
		height: 280px;
		display: block;
	}
	
	.avatars {
		margin-top: 2%;
		width: 160px;
		height: 160px;
		display: block;
		border-radius: 50%;
	}
</style>