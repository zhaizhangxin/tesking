<template>
	<div class="shift">
		<div class="list">
			<el-row>
			  <el-col :span="24">
			  	<p class="grid">课程信息</p>
			  </el-col>
			</el-row>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
			<el-form-item label="课程名称" prop="courseTitle" style="text-align: left;">
				 <el-input v-model="ruleForm.courseTitle" maxlength="120"></el-input>
				 <p class="limit">字数请限制在<span>120</span>字之内</p>
			</el-form-item>
		
			<el-form-item label="一句话简介" prop="Introduction" maxlength="64" style="text-align: left;">
			    <el-input v-model="ruleForm.Introduction" type="textarea"></el-input>
				 <p class="limit">请用简洁的话描述清楚这个课程是什么，字数请限制在<span>64</span>字之内</p>
			</el-form-item>
			
			<el-form-item label="授课老师" prop="Instructor" style="text-align: left;">
			    <el-input v-model="ruleForm.Instructor"></el-input>
			</el-form-item>
			
			<el-form-item label="课程介绍" prop="desc">
				<div class='tinymce'>
				    <editor class="editor" :value="ruleForm.desc"  :setting="editorSetting" @input="(content)=> content = content"></editor>
				</div>
				 <p class="limit" style="text-align: left;">请详细介绍该课程包含哪些内容，字数请限制在<span>2000</span>字之内</p>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary"  @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import editor from '@/components/ue'

	export default {
		data() {
			return {
				classList: [
					"el-icon-message",
					"el-icon-menu",
					"el-icon-setting",
					"el-icon-setting"
				],
				editorSetting: {
					height: 200,
				},
				ruleForm: {
					courseTitle:'',
					Introduction:'',
					Instructor:'',
					desc:''
				},
				rules: {
					courseTitle: [{
						required: true,
						message: '请输入课程名称',
						trigger: 'blur'
					}],
					Instructor:[{
						required: true,
						message: '请输入授课老师',
						trigger: 'blur'
					}],
				}

			}

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$router.push({path:'/curriculumCenter'})
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
		margin-top: 4%;
		padding-bottom: 4%;
		background: #FFFFFF;
		width: 70%;
	}
	
	.demo-ruleForm {
		margin: auto;
		margin-top: 50px;
		width: 60%;
		color: #001380;
	}
	.limit{
		color: #999999;
		font-size: 12px;
	}
	.limit span{
		color: #e9494e;
	}
</style>