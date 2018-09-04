<template>
	<el-container>
		
		<el-aside width="200px" class="left">			
			<p-system></p-system>
		</el-aside>
		
		<el-main style="margin-top: 2%;">
			
			<el-header class="cert">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">标签管理 </p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="姓名/标签" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
				
			<el-main style="background-color: #FFFFFF;" class="cert">
				<el-table :data="tableData" stripe border style="width: 100%">
					<el-table-column prop="tabs" label="标签" align="center"></el-table-column>
					<el-table-column prop="userNum" label="用户数" align="center"> </el-table-column>
					<el-table-column prop="courpon" label="创建人" align="center"> </el-table-column>
					<el-table-column prop="courtime" label="创建时间" align="center"> </el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<!--<router-link to="/editSInformation">-->
								<el-button type="text" size="small">编辑</el-button>									
							<!--</router-link>-->
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
	import systemManagement from '@/components/tableContents/systemManagement'
	
	export default {
		'/labelManagement': 'labelManagement',
		data() {
			return {
				tableData: [
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'},
					{tabs:'稳重',userNum:'10',courpon:'李美丽',courtime:'2018-06-01'}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      }
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
	
	.grid-content {
		line-height: 30px;
	}
	.cert{
		margin: auto;
		width: 80%;
	}
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	.el-tag{
		background-color: transparent;
		border: none;
	}
	.el-input {
		width: 74%;
	}
	
	.username{
		color: #3dc1ff;
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