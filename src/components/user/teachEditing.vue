<template>
	<el-container class="cont">
		
		<el-aside width="200px" class="left">
			<p-school></p-school>
		</el-aside>
		<el-main style="margin-top: 2%;">
			
			<el-header class="heads cert">
				<el-row :gutter="20" class="line">
					<el-col style="text-align: left;">
						<p class="grid-content" >编辑老师信息</p>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="background-color: #FFFFFF;" class="cert">
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							学号<span class="import">*</span>
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							真实姓名<span class="import">*</span>
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							手机
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							邮箱
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut" style="text-align: left;">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							性别
						</div>
					</el-col>
					<el-col :span="8">
						<el-radio v-model="radio" label="1">男</el-radio>
						<el-radio v-model="radio" label="2">女</el-radio>
					</el-col>
				</el-row>
				
				<div class="line" style="margin-top: 30px;"></div>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							院系名称
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							专业
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							年级
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							班级
						</div>
					</el-col>
					<el-col :span="8">
						<el-input class="editInput"></el-input>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							学科
						</div>
					</el-col>
					<el-col :span="8">
						<el-select v-model="value" placeholder="请选择" style="width: 100%;">
						    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="width: 100%;">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							学历
						</div>
					</el-col>
					<el-col :span="8">
						<el-select v-model="values" placeholder="请选择" style="width: 100%;">
						    <el-option v-for="item in education" :key="item.values" :label="item.label" :value="item.values" style="width: 100%;">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				
				<el-row :gutter="10" class="gut">
					<el-col :span="6" style="text-align: right;padding-right: 30px;">
						<div class="demo-input-suffix">
							标签
						</div>
					</el-col>
					<el-col :span="8" style="text-align: left;">
						<el-checkbox-group v-model="checkList">
							<el-checkbox v-for="grop in grops" :label="grop" :key="grop">{{grop}}</el-checkbox> 
						</el-checkbox-group>
					</el-col>
				</el-row>
				
				<div class="line" style="margin-top: 50px;"></div>
				
				<p class="grid-content grid-time" >导入时间
					<span class="times">2018-5-2  12：20：21</span>
				</p>
				
				<p class="grid-content grid-time" >认证时间
					<span class="times">2018-5-2  12：20：21</span>
					<el-button type="text" style="margin-left: 2%;">解除认证</el-button>
				</p>
				
				<div class="line"></div>
				
				<div class="foot">
					<el-button type="primary">保存</el-button>
					<el-button type="text" class="exits">取消</el-button>
				</div>
			</el-main>
			
		</el-main>

	</el-container>

</template>

<script>
	import schoolManagementCenter from '@/components/tableContents/schoolManagementCenter'
	
	export default {
		'/editSInformation': 'editSInformation',
		data() {
			return {
				radio:'1',
				value:'',
				values:'',
				checked:true,
				options:[
					{value:'选项1',label:'教育学'},
					{value:'选项2',label:'军事学'},
					{value:'选项3',label:'哲学'},
					{value:'选项4',label:'历史学'},
					{value:'选项5',label:'文学'}
				],
				education:[
					{values:'选项1',label:'专科'},
					{values:'选项2',label:'本科'},
					{values:'选项3',label:'硕士'},
					{values:'选项4',label:'博士'}
				],
				checkList:['恬静','成熟'],
				grops:['恬静','沉稳','学霸','成熟','活泼','呆萌','文艺','乐观']
			}
		},
		components:{
			'p-school':schoolManagementCenter
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		/*margin: 0 10px;*/
	}
	
	a {
		color: #42b983;
	}
	.cert{
		margin: auto;
		width: 80%;
	}
	.cont{
		margin: auto;
		width: 80%;
		background-color: #fff;
	}
	.editInput{
		width: 100%;
	}
	/*.el-input{
		width: 100%;
	}*/
	.heads{
		line-height: 60px;
	}
	.line{
		border-bottom: 1px solid #e9e9e9;		
	}
	.demo-input-suffix{
		color: #001380;
	}
	.import{
		margin-left: 4px;
		color: #e51c23;
	}
	.gut{
		margin-top: 30px;
		line-height: 40px;
	}
	.el-select-dropdown__item{
		display: block;
	}
	.grid-time{
		margin-left: 20%;
		margin-top: 20px;
		text-align: left;
		color: #001380;
	}
	.times{
		margin-left: 8%;
		color: #020d4a;
	}
	.el-button--primary{
		background-color: #FF9800;
		border: #FF9800;
	}
	.foot{
		margin: auto;
		margin: 4% 42% 4% 19%;
	}
	.exits{
		color: #999;
	}
	.el-checkbox{
		width: 80px;
	}
	.el-checkbox+.el-checkbox{
		margin: 0;
	}
</style>