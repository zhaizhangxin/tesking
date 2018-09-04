<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">标签管理
							<span style="color: #999;font-size: 12px;margin-left: 10px;">全部{{allnum}}人</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="姓名/学号" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<div style="text-align: right;">
					<el-button type="text" class="resert">重置</el-button>
					<el-button type="text" class="resert">删除</el-button>
					<el-button type="primary" style="margin-left: 10px;">查看标签</el-button>
				</div>
				
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column prop="tabs" label="标签" align="center"></el-table-column>
						<el-table-column prop="usernum" label="用户数" align="center"> </el-table-column>
						<el-table-column prop="scholar" label="创建人" align="center"> </el-table-column>
						<el-table-column prop="time" label="倒入时间" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="resert">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					
				</div>
			</el-main>

		</el-main>

</template>

<script>

	
	export default {
		data() {
			return {
				allnum: '421',
				tableData: [
					{tabs:'稳重',usernum:'10',scholar:'李雯雯',time:'2018-06-05'},
					{tabs:'稳重',usernum:'10',scholar:'李雯雯',time:'2018-06-05'},
					{tabs:'稳重',usernum:'10',scholar:'李雯雯',time:'2018-06-05'},
					{tabs:'稳重',usernum:'10',scholar:'李雯雯',time:'2018-06-05'}
				],
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
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
		padding-bottom: 30px;
	}
	.el-select-dropdown__item{
		display: block;
	}
	.resert{
		color: #FF9800;
	}
</style>