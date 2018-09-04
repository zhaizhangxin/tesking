<template>
	<el-container class="cont">
		
		<el-aside width="200px" class="left">			
			<p-system></p-system>
		</el-aside>
		
		<el-main style="margin-top: 2%;">
			<el-header style="line-height: 60px;" class="cert">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">选课管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<el-button type="primary">创建选课</el-button>
					</el-col>
				</el-row>
				<div class="line"></div>
				
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content gridcon">有{{num}}个选课</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<el-button type="text">删除</el-button>
					</el-col>
				</el-row>
			</el-header>
			<el-main style="background-color: #FFFFFF;margin-top: 100px;" class="cert">
				<el-table :data="tableData" stripe border>
					<el-table-column prop="title" label="选课标题" align="center"></el-table-column>
					<el-table-column prop="bigtime" label="开课时间" align="center"></el-table-column>
					<el-table-column prop="restime" label="截止时间" align="center"></el-table-column>
					<el-table-column prop="elections" label="选课名单人数" align="center"></el-table-column>
					<el-table-column prop="number" label="已选课人数" align="center"></el-table-column>
					<el-table-column prop="types" label="状态" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
				      <template slot-scope="scope">
				        <el-button type="text" size="small">编辑</el-button>
				      </template>
				    </el-table-column>
				</el-table>
				<div class="block">
				    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="10">
				    
				    </el-pagination>
				</div>
			</el-main>
		</el-main>
		
	</el-container>

</template>

<script>
	import systemManagement from '@/components/tableContents/systemManagement'
	
	
	export default {
		'/electiveManagement': 'electiveManagement',
		data() {
			return {
				num:'251',
				tableData: [
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'未发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'已发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'已发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'未发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'已发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'已发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'已发布'},
					{title:'27045',bigtime:'2018-06-01  08:00',restime:'2018-06-01  08:00',elections:'12',number:'10',types:'未发布'}
				]
			}
		},
		methods:{
			
		},
		components:{
			'p-system':systemManagement
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
	}
	.line{
		width: 100%;
		height: 1px;
		background-color: #E4E4E7;
	}
	.gridcon{
		text-align: left;
		color: #999999;
		font-size: 12px;
	}
	.block{
		margin-top: 50px;
	}
</style>