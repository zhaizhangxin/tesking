 <template>
	<el-container>
		<el-aside width="200px" class="left">
			<p-school></p-school>
		</el-aside>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">权限管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<span class="grid-content grid" style="color: #001380;">导出所有学生</span> 
						<span class="grid-content grid" style="color: #3dc1ff;margin-left: 20px;margin-right: 20px;">＋导入学生</span>
						<div class="active">
							<el-input placeholder="账号/姓名" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="background-color: #FFFFFF;" class="cert">
				<el-table :data="tableData" stripe border style="width: 100%">
					<el-table-column prop="username" label="姓名" align="center"> </el-table-column>
					<el-table-column prop="phone" label="账号" align="center"> </el-table-column>
					<el-table-column prop="scholar" label="角色" align="center"> </el-table-column>
					<el-table-column prop="time" label="添加时间" align="center"> </el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button @click="edits" type="text" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
				    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
				    
				    </el-pagination>
				</div>
			</el-main>
			
		</el-main>

	</el-container>

</template>

<script>
	import schoolManagementCenter from '@/components/tableContents/schoolManagementCenter'
	
	export default {
		'/authority': 'authority',
		data() {
			return {
				activeName: 'first',
				tableData: [
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师 讲课老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师 讲课老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师 讲课老师',time:'2018.06.01'},
					{username:'张宁宁',phone:'youye@zaixianxuexi.com',scholar:'导学老师',time:'2018.06.01'}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
		      edits(){
		      	
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
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	.cert{
		margin: auto;
		width: 80%;
	}
	.grid-content {
		line-height: 30px;
	}
	
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	
	.el-input {
		width: 74%;
	}
	
	.active {
		display: inline-block;
		/*width: 30%;*/
	}
	
	.el-button--primary {
		background-color: #ff9800;
		border-color: #ff9800;
	}
	
	.has-gutter {
		text-align: center;
	}
	
	.el-table_1_column_1 {
		color: #3dc1ff;
	}
	.block{
		margin-top: 50px;
	}
</style>