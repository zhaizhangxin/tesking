<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<el-row :gutter="24">
					<el-col :span="24">
						<span>创建考试</span>
						<span style="margin: 0 1%;">|</span>
						<span>步骤一：填写考试信息</span>											
					</el-col>
				</el-row>
				<div class="line"></div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 2%;">
					<el-form-item label="考试类型" prop="testType">
						<el-radio-group v-model="ruleForm.testType">
							<el-radio label="1">正考</el-radio>
							<el-radio label="2">补考</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="考试名称" prop="name">
						<el-col :span="14">
							<el-input v-model="ruleForm.name"></el-input>							
						</el-col>
					</el-form-item>
					<el-form-item label="考试时间" required>
						<el-col :span="8">
							<el-form-item prop="startTime">
								<el-date-picker type="date" placeholder="请设置考试开始时间" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="2" style="text-align: center;">至</el-col>
						<el-col :span="8">
							<el-form-item prop="endTime">
								<el-date-picker type="date" placeholder="请设置考试截止时间" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="答卷限时" prop="timeLimit">
						<el-col :span="6">
							<el-input v-model="ruleForm.timeLimit"></el-input>
						</el-col>
						<el-col :span="2" style="text-align: center;">分钟</el-col>
					</el-form-item>
					<el-form-item label="补考条件" prop="condition">
						<el-row style="display: flex;">
							<p>正考小于</p>
							<el-col :span="4" style="margin: 0 2%;">
								<el-input v-model="ruleForm.condition"></el-input>
							</el-col>
							<p>分需参加补考</p>
						</el-row>
					</el-form-item>
					<el-form-item label="补考名单" prop="retakeList">
						<el-button type="primary" style="margin-left: 2%;">查看名单</el-button>
					</el-form-item>
					<el-form-item label="考试限制" prop="examLimit">
						<el-radio-group v-model="ruleForm.examLimit">
							<el-radio label="1">不限制</el-radio>
							<el-radio label="2">仅网页</el-radio>
							<el-radio label="3">仅客户端</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="考试题型及权重" prop="weights">
						<el-checkbox-group v-model="ruleForm.weights">
							<el-col :span="8" style="display: flex;">
								<el-checkbox label="1">客观题</el-checkbox>
								<el-col :span="8" style="margin: 0 2%;">
									<el-input v-model="ruleForm.weiNum"></el-input>
								</el-col>
								<el-button type="text" style="color: #101010;">%</el-button>
							</el-col>
							<el-col :span="8" style="display: flex;">
								<el-checkbox label="2" disabled>主观题</el-checkbox>									
								<el-col :span="8" style="margin: 0 2%;">
									<el-input disabled></el-input>
								</el-col>
								<el-button type="text" style="color: #999;">%</el-button>
							</el-col>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="成绩公布" prop="resultAnnounce">
						<el-row style="display: flex;">
							<p>考试截止</p>
							<el-col :span="4" style="margin: 0 2%;">
								<el-input v-model="ruleForm.resultAnnounce"></el-input>
							</el-col>
							<p>天后公布</p>
						</el-row>
					</el-form-item>
					<el-form-item label="防止作弊" prop="cheating">
						<el-switch v-model="ruleForm.prevent" active-text="已开启" inactive-text="已关闭" @change="prevents($event)"></el-switch>
						<el-col :span="16" style="display: flex;margin-left: 4%;float: right;">
							<p>离开页面</p>
							<el-col :span="4" style="margin: 0 2%;">
								<el-input v-model="ruleForm.cheating"></el-input>
							</el-col>
							<p>次强制交卷</p>
						</el-col>
					</el-form-item>
					<el-form-item label="参加条件" prop="conditions">
						<el-row style="display: flex;">
							<p>学习进度</p>
							<el-col :span="4" style="margin: 0 2%;"> 
								<el-input v-model="ruleForm.conditions"></el-input>
							</el-col>
							<p>%即可参加考试</p>
						</el-row>
					</el-form-item>
					<el-form-item label="试题顺序" prop="sequence">
						<el-radio-group v-model="ruleForm.sequence">
							<el-radio label="1">乱序</el-radio>
							<el-radio label="2">非乱序</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="选项顺序" prop="order">
						<el-radio-group v-model="ruleForm.order">
							<el-radio label="1">乱序</el-radio>
							<el-radio label="2">非乱序</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item style="text-align: center;">
						<el-button type="primary" @click="returns" style="background: #E5E5E5;">取消   返回</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">保存    下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-main>

</template>
<script>

	export default {
		data() {
			return {
				ruleForm:{
					testType:'',
					name:'',
					startTime:'',
					endTime:'',
					timeLimit:'',
					condition:'',
					examLimit:'',
					weights:[],
					weiNum:'',
					resultAnnounce:'',
					cheating:'',
					prevent:true,
					conditions:'',
					sequence:'',
					order:''
				},
				rules:{
					testType:[
						{required:true,message:'请选择考试类型',trigger:'change'}
					],
					name:[
						{required:true,message:'请输入考试名称',trigger:'blur'}
					],
					startTime:[
						{required:true,message:'请设置考试开始时间',trigger:'change'}
					],
					endTime:[
						{required:true,message:'请设置考试截止时间',trigger:'change'}
					],
					timeLimit:[
						{required:true,message:'请输入答卷限时',trigger:'blur'}
					],
					condition:[
						{required:true,message:'请输入补考条件',trigger:'blur'}
					],
					examLimit:[
						{required:true,message:'请选择考试限制',trigger:'change'}
					]
				}
			}
		},
		methods: {
//			防止作弊
			prevents(event){
				console.log(event)
			},
//			取消编辑
			returns(){
				this.$router.push({path:'/chapterContent/examination'})
			},
//			保存 下一步
			submitForm(formName){
				this.$router.push({
					path: '/chapterContent/createExamSecond',
//					name:'materials',
//					query:{
//						name:'name',
//						id:result.data.course.id
//					}
				})
				
//				this.$refs[formName].validate((valid) => {
//					if(valid){
//						console.log(11)
//						
//					}else{
//						alert('请补全考试信息')
//						return false;
//					}
//				})
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
	
	.certs {
		padding: 2%;
		background-color: #fff;
		text-align: left;
	}
	.line{
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #EDEDED;
	}
</style>