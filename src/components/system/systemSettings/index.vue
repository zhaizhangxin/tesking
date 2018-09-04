<template>
		<el-main style="margin-top: 2%;"> 
			
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">系统设置 
							<span style="color: #999999;font-size: 12px;margin-left: 10px;">全部{{num}}项</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="配置项/时间" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<div style="text-align: right;">
					<el-button type="text" class="delete">删除</el-button>
					<el-button type="primary">添加配置项</el-button>
				</div>
				
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column prop="conitem" label="配置项" align='center'></el-table-column>
						<el-table-column label="状态" align='center'>
							<template scope="props">
								<el-switch v-model="tableData[props.$index].status" :active-value="1" :inactive-value="0" active-color="#13ce66" >
								
								</el-switch>
							</template>
						</el-table-column>
						<el-table-column prop="courpon" label="添加人" align='center'> </el-table-column>
						<el-table-column prop="courtime" label="添加事件" align='center'> </el-table-column>
						<el-table-column label="操作" align='center'>
							<template slot-scope="scope">
								<!--<router-link to="/editSInformation">-->
									<el-button type="text" size="small" class="delete">编辑</el-button>									
								<!--</router-link>-->
							</template>
						</el-table-column>
					</el-table>
				</div>
				
			</el-main>
			
		</el-main>

</template>
<script>

	
	export default {
		'/labelManagement': 'labelManagement',
		data() {
			return {
				num:'11',
				tableData: [
					{conitem:'张宁宁', status: 1,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 0,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 1,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 0,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 1,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 0,courpon:'李美丽',courtime:'欧阳倩'},
					{conitem:'张宁宁', status: 1,courpon:'李美丽',courtime:'欧阳倩'}
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
	.delete{
		color: #FF9800;
	}
</style>