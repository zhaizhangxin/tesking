<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">菜单管理
							<span class="gridcont">全部{{num}}项</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<el-input placeholder="菜单名称" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<div style="text-align: right;">
					<el-button type="text" class="delete">删除</el-button>
					<el-button type="primary">创建菜单</el-button>
				</div>
				
				<div style="background: #FFFFFF;">
					<el-table :data="tableData" stripe border style="width: 100%;margin-top: 20px;">
						<el-table-column prop="menuCode" label="菜单编码" align="center"> </el-table-column>
						<el-table-column prop="menuName" label="菜单名" align="center"> </el-table-column>
						<el-table-column prop="parentMenu" label="父级菜单" align="center"> </el-table-column>
						<el-table-column prop="creationTime" label="创建时间" align="center"> </el-table-column>
						<el-table-column prop="founder" label="创建人" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="delete">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					
					
				</div>
				
			</el-main>
			
		</el-main>
		

</template>

<script>

	
	
	export default {
		'/menuManagement': 'menuManagement',
		data() {
			return {
				page:'1',
				num: '19',
				tableData: [
					{menuCode: '00521',menuName: '用户管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'},
					{menuCode: '00521',menuName: '教师管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'},
					{menuCode: '00521',menuName: '班次管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'},
					{menuCode: '00521',menuName: '文档管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'},
					{menuCode: '00521',menuName: '课程管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'},
					{menuCode: '00521',menuName: '用户管理',parentMenu: '用户管理',creationTime: '208.05.26',founder: '创建人'}
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
	.gridcont{
		margin-left: 10px;
		font-size: 12px;
		color: rgba(0,0,0,0.54);
	}
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	
	.el-input {
		width: 30%;
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
	.el-message-box__message{
		display: inline-block;
	}
	.el-message-box__input{
		margin-left: 10px;
		display: inline-block;
	}
	.delete{
		color: #FF9800;
	}
</style>