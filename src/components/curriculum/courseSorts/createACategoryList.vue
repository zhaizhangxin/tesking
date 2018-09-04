<template>
	<div class="shift">
		<div class="list">
			<el-row>
				<el-col :span="24">
					<p class="grid">创建分类列表</p>
				</el-col>
			</el-row>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

			<el-form-item label="分类名称" prop="label" style="text-align: left;">
				<el-input v-model="ruleForm.label"></el-input>
			</el-form-item>

			<el-form-item label="上级分类" prop="parentId" style="text-align: left;">
				<el-input v-model="ruleForm.parentId" disabled></el-input>
				<p style="color: #999999;font-size: 12px;">(不选择分类默认为顶级分类)</p>
			</el-form-item>

			<el-form-item label="封面" prop="imageUrl" style="text-align: left;">
				<el-upload class="avatar-uploader" :http-request="uploadImg" action="#" :show-file-list="false" :before-upload="beforeAvatarUpload">
					<el-button type="primary">上传图片</el-button>
					<span style="color: #999999;font-size: 12px;">建议尺寸800*800px</span>
				</el-upload>

				<img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">

			</el-form-item>

			<el-form-item label="课程关键词" prop="keyWord" style="text-align: left;">
				<el-input v-model="ruleForm.keyWord"></el-input>
			</el-form-item>

			<el-form-item label="是否显示" prop="isShow" style="text-align: left;">
				<el-radio-group v-model="ruleForm.isShow">
					<el-radio :label="1" value="true">是</el-radio>
					<el-radio :label="2" value="true" disabled>否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="分类描述" prop="description" style="text-align: left;">
				<el-input v-model="ruleForm.description" type="textarea"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
		<!--<el-button @click="add">上传</el-button>-->
	</div>

</template>
<script>
	//	import crypto1 from '@/components/index'
	export default {
		data() {
			return {
				ruleForm: {
					label: '',
					imageUrl: '',
					keyWord: '',
					isShow: '',
					description: '',
					parentId: ''
				},
				rules: {
					label: [{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}],
					isShow: [{
						required: true,
						message: '请选择是否显示',
						trigger: 'change'
					}],
					description: [{
						required: true,
						message: '请输入分类描述',
						trigger: 'blur'
					}]
				}

			}

		},
		methods: {
			uploadImg(file) {
				let that = this;
				const uuidv1 = require('uuid/v1');
				let filename = file.ext +"/"+uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
 
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
						that.ruleForm.imageUrl = result.url;
						
					} catch(err) {
						console.log(err);
					}
				}
				put();
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.ruleForm.parentId == '') {
							this.ruleForm.parentId = 0
						}
						if(this.ruleForm.isShow == '1') {
							this.ruleForm.isShow = true
						} else {
							this.ruleForm.isShow = false
						}
						
						this.$api.CourseApi.course_category(this.ruleForm, result => {
							console.log(result)
							if(result.success == true) {
								this.$router.push({
									path: '/courseSorts'
								})
							} else {
								console.log(success.errors)
							}
						})
						console.log(this.ruleForm)
						//跳转到校管中心的课程分类
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		components: {
			//			'el-crypto':crypto1
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
		margin-top: 6%;
		width: 60%;
		color: #001380;
	}
	
	.avatar-uploader .el-upload {
		/*border: 1px dashed #d9d9d9;*/
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 280px;
		height: 280px;
		line-height: 280px;
		text-align: center;
	}
	
	.el-form-item__label {
		color: #001380;
	}
	
	.avatar {
		margin-top: 10px;
		width: 280px;
		height: 280px;
		display: block;
	}
</style>