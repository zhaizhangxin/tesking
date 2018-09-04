<template>
	<el-main style="padding: 0;">
		<div class="certs">
			<el-row :gutter="24">
				<el-col :span="24">
					<span>创建考试</span>
					<span style="margin: 0 1%;">|</span>
					<span>步骤二：创建试卷内容</span>											
				</el-col>
			</el-row>
			<div class="line"></div>
			<div style="display: flex;">
				<div style="width: 80%;border-right: 1px solid #E0E0DD;">
					<p class="title">{{title}}</p>
					<div style="display: flex;justify-content: space-around;">
						<p class="examin">考试时长：{{time}}分钟</p>
						<p class="examin">考试时间：{{startTime}}至{{endTime}}</p>
						<p class="examin">满分{{score}}分</p>
					</div>
					<div style="margin-top: 4%;">
						<!--<p class="examText" v-if="single_selection == []">一、单选题【本类共0题】</p>-->
						<p class="examText" >一、单选题【本类共10题,每题5分，共50分】</p>
						<!--<div v-for="item in single_selection" style="margin: 2%;">
							<p style="color: #101010;font-size: 14px;">{{item.title}}</p>
							<div v-for="(singItem,singIndex) in item.sing" style="margin: 2%;">
								<el-radio-group v-model="radios[singIndex]" style="color: #101010;font-size: 12px;">
									<el-radio v-model="singItem.isShow" :label="singItem.id">{{singItem.label}}</el-radio>									
								</el-radio-group>
							</div>
						</div>-->
						<p class="examText">二、多选题【本类共0题】</p>						
						<p class="examText">三、判断题【本类共0题】</p>
						<div v-for="item in single_selection" style="margin: 2%;">
							<p style="color: #101010;font-size: 14px;">{{item.title}}</p>
							<div v-for="(singItem,singIndex) in item.sing" style="margin: 2%;">
								<el-radio-group v-model="radios[singIndex]" style="color: #101010;font-size: 12px;">
									<el-radio v-model="singItem.isShow" :label="singItem.id">{{singItem.label}}</el-radio>									
								</el-radio-group>
							</div>
						</div>
					</div>
					<div style="margin-top: 20%;text-align: center;">
						<el-button type="primary" @click="returns">上一步</el-button>
						<el-button type="primary">保存  下一步</el-button>
					</div>
				</div>
				<div style="width: 20%;text-align: center;">
					<p class="title">试题卡</p>
					<el-button class="templates" style="margin: auto;margin-top: 6%;" @click="templatesGuide">模板导题</el-button>
					<el-button class="templates" style="margin: auto;margin-top: 6%;" @click="smart">智能选题</el-button>
					<el-button class="templates" style="margin: auto;margin-top: 6%;" @click="manualSection">手工选题</el-button>
					
					<el-button class="singText" type="text" style="margin: auto;margin-top: 18%;display: block;color: #001380;" @click="single('10')">单选题</el-button>
					<el-button class="singText" type="text" style="margin: auto;margin-top: 8%;display: block;color: #001380;" @click="choice('20')">多选题</el-button>
					<el-button class="singText" type="text" style="margin: auto;margin-top: 8%;display: block;color: #001380;" @click="judgment('30')">判断题</el-button>
				</div>
				
				<!--模板导题-->
				<el-dialog title="模板导题" :visible.sync="guideSelection" width="50%" center>
					<el-button type="primary" class="templates_guide">下载模板</el-button>
					<el-button type="primary" class="templates_guide">导入试题</el-button>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary">完成</el-button>
						<el-button @click="guideSelection = false" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>
				<!--智能选题-->
				<el-dialog title="智能选题" :visible.sync="smartTopic" width="50%" center>
					<el-form :model="topicSelect">
						<el-form-item>
							<el-col :span="6" style="text-align: right;">{{topTitle}}（共{{number}}题）</el-col>
							<el-col :span="10" style="margin-left: 2%;">
								<el-input placeholder="请输入要添加多少题" v-model="topicSelect.num"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-col :span="6" style="text-align: right;">共</el-col>
							<el-col :span="6" style="margin: 0 2%;">
								<el-input v-model="topicSelect.fraction"></el-input>
							</el-col>
							分
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finishedSelect">完成</el-button>
						<el-button @click="smartTopic = false" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>
				<!--手工选题-->
				<el-dialog title="手工选题" :visible.sync="manual" width="50%" center>
					<p>{{topTitle}}（共{{number}}题）</p>
					<div>
						<el-checkbox-group v-model="topManual">
							<div v-for="item in manuals">
								<el-checkbox :label="item.id" style="margin-top: 4%;">{{item.label}}</el-checkbox>
								<div v-for="(titleItem,titleIndex) in item.title">
									<p>{{titleItem.label}}</p>
								</div>
								gjkkghjj
							</div>
						</el-checkbox-group>
						
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finishedManual">完成</el-button>
						<el-button @click="manual = false" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
	</el-main>
</template>

<script>
	export default{
		data(){
			return{
				title:'计算机网络',
				time:'60',
				startTime:'2018-07-03  14:20',
				endTime:'2018-07-03 15:20',
				score:'100',
				topTitle:'',//智能选题类型
				number:'50',//共多少题
				singles:'',//选题类型
				single_selection:[
					{
						title:'1:下列关于递归描述错误的是？',
						sing:[
							{label:'A、递归就是在方法内部调用方法本身',id:1},
							{label:'B、递归必须有结束条件',id:2}
						]							
					},
					{
						title:'2:下列关于递归描述错误的是？',
						sing:[
							{label:'A、递归就是在方法内部调用方法本身',id:3},
							{label:'B、递归必须有结束条件',id:4}
						]							
					}
				],//单选题
				radios:[1,4],//单选
				guideSelection:false,//模板导题
				smartTopic:false,//智能选题（单选）
				topicSelect:{
					num:'',
					fraction:''
				},
				manual:false,//手工选题
				topManual:[],
				manuals:[{
					id:1,
					label:'1:有关字段属性，下列叙述错误的是？',
					title:[
						{label:'不同的字段类型，其字段属性有所不同'},
						{label:'并不是任意类型的字段都能设置默认值属性'}
					]},{
						id:2,
						label:'2:有关字段属性，下列叙述错误的是？',
						title:[
						{label:'不同的字段类型，其字段属性有所不同'},
						{label:'并型的字段都能设置默认值属性'}
					]},{id:3,
						label:'3:有关字段属性，下列叙述错误的是？',
						title:[
						{label:'其字段属性有所不同'},
						{label:'并不是任意类型的字段都能设置默认值属性'}
					]}
				]
			}
		},
		methods:{
//			返回
			returns(){
				this.$router.push({path:'/chapterContent/createExamFirst'})
			},
//			单选
			single(val){
				this.singles = val;
			},
//			多选
			choice(val){
				this.singles = val;
			},
//			判断
			judgment(val){
				this.singles = val;
			},
//			模板导题（单选）
			templatesGuide(){
				this.guideSelection = true;
			},
//			智能选题
			smart(){
				if(this.singles == 10){
					this.topTitle = '单选题';
				}else if(this.singles == 20){
					this.topTitle = '多选题';
				}else{
					this.topTitle = '判断题';
				}
				this.smartTopic = true;
			},
//			智能单选完成
			finishedSelect(){
				this.smartTopic = false;
				console.log(this.topicSelect)
				this.topicSelect = {
					num:'',
					fraction:''
				}
			},
//			手工选题
			manualSection(){
				if(this.singles == 10){
					this.topTitle = '单选题';
				}else if(this.singles == 20){
					this.topTitle = '多选题';
				}else{
					this.topTitle = '判断题';
				}
				this.manual = true;
				console.log(this.single_selection)
			},
//			手工选题完成
			finishedManual(){
				this.manual = false;
				this.single_selection = [
					
				]
				console.log(this.topManual)
				console.log(this.single_selection)
				
			}
		}
	}
</script>

<style>
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
	.title{
		text-align: center;
		height: 60px;
		line-height: 60px;
	}
	.examin{
		font-size: 12px;
		color: #999999;
	}
	.examText{
		margin-top: 4%;
		color: #001380;
		font-size: 14px;
	}
	.templates{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
		display: block;
	}
	.templates:hover{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
		display: block;
	}
	.templates:focus{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
		display: block;
	}
	.templates_guide{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
	}
	.templates_guide:hover{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
	}
	.templates_guide:focus{
		background: rgba(181, 192, 255, 0.5);
		color: #001380;
		border: 1px solid #B5C0FF;
	}
	.singText{
		width: 80%;
	}
	.singText:hover{
		width: 80%;
		background: rgba(181, 192, 255, 0.24);
	}
</style>