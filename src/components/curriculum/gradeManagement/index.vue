<template>
	<el-main style="padding: 0;">
		
		<div class="cert">
			
			<el-row :gutter="24">
				<el-col :span="8" style="text-align: left;">
					<p style="line-height: 40px;">成绩管理</p>
				</el-col>
				<el-col :span="16" style="text-align: right;">
					<el-button style="float: right;" type="primary">搜索</el-button>
					<el-col :span="10" style="float: right;padding-right: 0;">
						<el-input placeholder="学号/姓名/手机号" prefix-icon="el-icon-search" v-model="input"></el-input>
					</el-col>
				</el-col>
			</el-row>
			
			<div class="line"></div>
			
			<el-row :gutter="24" style="text-align: left;margin-top: 2%;">
				<el-col :span="4">
					<el-select v-model="allTeamsValue" placeholder="全部班组">
						<el-option v-for="item in allTeams" :key="item.allTeamsValue" :label="item.label" :value="item.allTeamsValue"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="allStudentValue" placeholder="全部学员状态">
						<el-option v-for="item in allStudent" :key="item.allStudentValue" :label="item.label" :value="item.allStudentValue"></el-option>
					</el-select>
				</el-col>
				<el-col :span="12">
					<el-button type="text" style="color: #12aef7;">导出到Excel</el-button>
					<el-button type="text" style="color: #12aef7;">导入线下成绩</el-button>
					<el-button type="text" style="color: #12aef7;">下载导入模板</el-button>
				</el-col>
			</el-row>
			
			<!--<el-table :data="tableData" @sort-change="sortChange">-->
			<el-table :data="tableData" border style="margin-top: 2%;">
				<el-table-column prop="student" label="学生" align="center"></el-table-column>
				<el-table-column prop="overallResult" label="总成绩" sortable width="90" align="center"></el-table-column>
				<el-table-column prop="videoScore" label="视频成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="testScore" label="测验成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="jobScore" label="作业成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="disScore" label="讨论成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="emScore" label="考试成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="offlineScore" label="线下成绩" sortable width="110" align="center"></el-table-column>
				<el-table-column prop="class" label="班组" align="center"></el-table-column>
				<el-table-column prop="status" label="认证状态" align="center"></el-table-column>
			</el-table>
			
		</div>
	</el-main>
</template>

<script>
	export default{
		data(){
			return{
				input:'',
				allTeamsValue:'',
				allStudentValue:'',
				allTeams:[
					{allTeamsValue:'1',label:'全部班组'},
					{allTeamsValue:'2',label:'班组'},
					{allTeamsValue:'3',label:'全部'}
				],
				allStudent:[
					{allStudentValue:'1',label:'全部学员状态'},
					{allStudentValue:'2',label:'全部学员'}
				],
				tableData:[
					{student:'郭佳佳',overallResult:'98',videoScore:'60',testScore:'72',jobScore:'84',disScore:'60',emScore:'96',offlineScore:'89',class:'默认分组',status:'已认证'},
					{student:'郭佳',overallResult:'98',videoScore:'60',testScore:'72',jobScore:'84',disScore:'60',emScore:'96',offlineScore:'89',class:'默认分组',status:'已认证'},
					{student:'郭大宇',overallResult:'98',videoScore:'60',testScore:'72',jobScore:'84',disScore:'60',emScore:'96',offlineScore:'89',class:'默认分组',status:'已认证'},
					{student:'佳佳',overallResult:'98',videoScore:'60',testScore:'72',jobScore:'84',disScore:'60',emScore:'96',offlineScore:'89',class:'默认分组',status:'已认证'},
					{student:'搜佳佳',overallResult:'98',videoScore:'60',testScore:'72',jobScore:'84',disScore:'60',emScore:'96',offlineScore:'89',class:'默认分组',status:'已认证'}
				]
			}
		}
	}
	
</script>

<style>
	.cert {
		padding: 2%;
		background-color: #fff;
		text-align: left;
	}
	.line{
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #EDEFFB;
	}
	
</style>